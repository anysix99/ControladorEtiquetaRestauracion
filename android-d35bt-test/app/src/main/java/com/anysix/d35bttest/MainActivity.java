package com.anysix.d35bttest;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.AlertDialog;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothGatt;
import android.bluetooth.BluetoothGattCallback;
import android.bluetooth.BluetoothGattCharacteristic;
import android.bluetooth.BluetoothGattService;
import android.bluetooth.BluetoothManager;
import android.bluetooth.BluetoothProfile;
import android.bluetooth.le.BluetoothLeScanner;
import android.bluetooth.le.ScanCallback;
import android.bluetooth.le.ScanResult;
import android.content.Context;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.view.ViewGroup;
import android.webkit.JavascriptInterface;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.ScrollView;
import android.widget.TextView;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONObject;

import java.nio.charset.Charset;
import java.util.ArrayDeque;
import java.util.HashSet;
import java.util.Locale;
import java.util.Queue;
import java.util.Set;
import java.util.UUID;

public class MainActivity extends Activity {
    private static final int PERMISSION_REQUEST = 35;

    private static final UUID UUID_HPRT_A =
            UUID.fromString("dfce9998-a259-11ef-b0a1-043f72a0b6f2");
    private static final UUID UUID_HPRT_B =
            UUID.fromString("dfce2fc5-a259-11ef-b0a1-043f72a0b6f2");

    private final Handler main = new Handler(Looper.getMainLooper());
    private final Set<String> seenDevices = new HashSet<>();
    private final Queue<byte[]> pendingChunks = new ArrayDeque<>();

    private BluetoothAdapter adapter;
    private BluetoothLeScanner scanner;
    private BluetoothGatt gatt;
    private BluetoothGattCharacteristic writeCharacteristic;
    private String pendingTspl;
    private boolean scanning = false;
    private boolean writing = false;
    private int payloadSize = 20;

    private AlertDialog chooserDialog;
    private LinearLayout chooserList;
    private TextView chooserStatus;

    private final ScanCallback scanCallback = new ScanCallback() {
        @Override
        public void onScanResult(int callbackType, ScanResult result) {
            BluetoothDevice device = result.getDevice();
            String address = device.getAddress();
            if (seenDevices.contains(address)) return;
            seenDevices.add(address);
            addDeviceToChooser(device, result.getRssi());
        }

        @Override
        public void onScanFailed(int errorCode) {
            scanning = false;
            showToast("BLE scan failed: " + errorCode);
            setChooserStatus("Scan failed: " + errorCode);
        }
    };

    private final BluetoothGattCallback gattCallback = new BluetoothGattCallback() {
        @Override
        public void onConnectionStateChange(BluetoothGatt gatt, int status, int newState) {
            if (newState == BluetoothProfile.STATE_CONNECTED) {
                setChooserStatus("Connected. Discovering services...");
                if (hasConnectPermission()) {
                    gatt.requestMtu(247);
                    gatt.discoverServices();
                }
            } else if (newState == BluetoothProfile.STATE_DISCONNECTED) {
                writeCharacteristic = null;
                setChooserStatus("Disconnected.");
            }
        }

        @Override
        public void onMtuChanged(BluetoothGatt gatt, int mtu, int status) {
            payloadSize = Math.max(20, mtu - 3);
        }

        @Override
        public void onServicesDiscovered(BluetoothGatt gatt, int status) {
            writeCharacteristic = findWriteCharacteristic(gatt);
            if (writeCharacteristic == null) {
                setChooserStatus("No writable BLE characteristic found.");
                showToast("No writable BLE characteristic found.");
                return;
            }
            setChooserStatus("Ready: " + writeCharacteristic.getUuid());
            if (pendingTspl != null) {
                String tspl = pendingTspl;
                pendingTspl = null;
                enqueueWrite(tspl.getBytes(Charset.forName("GBK")));
            }
        }

        @Override
        public void onCharacteristicWrite(BluetoothGatt gatt, BluetoothGattCharacteristic characteristic, int status) {
            writing = false;
            if (status != BluetoothGatt.GATT_SUCCESS) {
                showToast("BLE write failed: " + status);
                return;
            }
            writeNextChunk();
        }
    };

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        BluetoothManager manager = (BluetoothManager) getSystemService(Context.BLUETOOTH_SERVICE);
        adapter = manager == null ? null : manager.getAdapter();
        scanner = adapter == null ? null : adapter.getBluetoothLeScanner();

        WebView webView = new WebView(this);
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(true);
        webView.setWebViewClient(new WebViewClient());
        webView.addJavascriptInterface(new AndroidPrinterBridge(), "AndroidPrinter");
        setContentView(webView);

        requestNeededPermissions();
        webView.loadUrl("file:///android_asset/app/index.html");
    }

    @Override
    protected void onDestroy() {
        stopScan();
        disconnect();
        super.onDestroy();
    }

    public class AndroidPrinterBridge {
        @JavascriptInterface
        public boolean isAvailable() {
            return true;
        }

        @JavascriptInterface
        public void printLabel(String json) {
            main.post(() -> printFromWeb(json));
        }
    }

    private void printFromWeb(String json) {
        try {
            pendingTspl = buildTspl(new JSONObject(json));
            if (writeCharacteristic != null && gatt != null) {
                String tspl = pendingTspl;
                pendingTspl = null;
                enqueueWrite(tspl.getBytes(Charset.forName("GBK")));
                return;
            }
            startDeviceChooserScan();
        } catch (Exception error) {
            showToast("Print data error: " + error.getMessage());
        }
    }

    private String buildTspl(JSONObject label) {
        int widthMm = clamp(label.optInt("widthMm", 80), 30, 72);
        int heightMm = clamp(label.optInt("heightMm", 50), 20, 120);
        int x = 20;
        int y = 22;
        int line = 30;
        int maxY = heightMm * 8 - line;
        int maxRowUnits = widthMm <= 60 ? 34 : 42;
        int maxTitleUnits = widthMm <= 60 ? 22 : 28;
        JSONObject printLabels = label.optJSONObject("printLabels");

        StringBuilder tspl = new StringBuilder();
        tspl.append("SIZE ").append(widthMm).append(" mm,").append(heightMm).append(" mm\r\n");
        tspl.append("GAP 2 mm,0 mm\r\n");
        tspl.append("DIRECTION 1\r\n");
        tspl.append("CLS\r\n");
        tspl.append("TEXT ").append(x).append(",").append(y).append(",\"TSS24.BF2\",0,1,1,\"")
                .append(escapeTspl(shortenUnits(label.optString("name", ""), maxTitleUnits))).append("\"\r\n");
        y += line + 4;

        y = appendRow(tspl, x, y, labelText(printLabels, "code", "ID"), label.optString("code", ""), line, maxY, maxRowUnits);
        y = appendRow(tspl, x, y, labelText(printLabels, "storage", "Cons."), label.optString("storageText", label.optString("storage", "")), line, maxY, maxRowUnits);
        y = appendRow(tspl, x, y, labelText(printLabels, "make", "Elab."), label.optString("makeTimeText", ""), line, maxY, maxRowUnits);
        y = appendRow(tspl, x, y, labelText(printLabels, "expiry", "Cad."), label.optString("expiryTimeText", ""), line, maxY, maxRowUnits);
        y = appendRow(tspl, x, y, labelText(printLabels, "open", "Apert."), label.optString("openTimeText", ""), line, maxY, maxRowUnits);
        y = appendRow(tspl, x, y, labelText(printLabels, "thaw", "Desc."), label.optString("thawTimeText", ""), line, maxY, maxRowUnits);

        String allergens = joinArray(label.optJSONArray("allergens"));
        y = appendRow(tspl, x, y, labelText(printLabels, "allergens", "Alerg."), allergens, line, maxY, maxRowUnits);
        y = appendRow(tspl, x, y, labelText(printLabels, "use", "Uso"), label.optString("suggestion", ""), line, maxY, maxRowUnits);
        appendRow(tspl, x, y, labelText(printLabels, "lot", "Lote"), label.optString("note", ""), line, maxY, maxRowUnits);

        tspl.append("PRINT 1,1\r\n");
        return tspl.toString();
    }

    private int appendRow(StringBuilder tspl, int x, int y, String label, String value, int line, int maxY, int maxUnits) {
        String cleanValue = value == null ? "" : value.trim();
        if (cleanValue.isEmpty() || y > maxY) return y;
        String cleanLabel = label == null ? "" : label.trim();
        String text = cleanLabel.isEmpty() ? cleanValue : cleanLabel + ": " + cleanValue;
        tspl.append("TEXT ").append(x).append(",").append(y).append(",\"TSS24.BF2\",0,1,1,\"")
                .append(escapeTspl(shortenUnits(text, maxUnits))).append("\"\r\n");
        return y + line;
    }

    private String labelText(JSONObject labels, String key, String fallback) {
        if (labels == null) return fallback;
        String value = labels.optString(key, fallback);
        return value == null || value.trim().isEmpty() ? fallback : value;
    }

    private String shortenUnits(String value, int maxUnits) {
        String clean = value == null ? "" : value.replace("\r", " ").replace("\n", " ").trim();
        if (displayUnits(clean) <= maxUnits) return clean;
        int limit = Math.max(1, maxUnits - 1);
        StringBuilder out = new StringBuilder();
        int used = 0;
        for (int offset = 0; offset < clean.length(); ) {
            int codePoint = clean.codePointAt(offset);
            int units = codePoint <= 0x7f ? 1 : 2;
            if (used + units > limit) break;
            out.appendCodePoint(codePoint);
            used += units;
            offset += Character.charCount(codePoint);
        }
        return out.toString().trim() + ".";
    }

    private int displayUnits(String value) {
        int units = 0;
        for (int offset = 0; offset < value.length(); ) {
            int codePoint = value.codePointAt(offset);
            units += codePoint <= 0x7f ? 1 : 2;
            offset += Character.charCount(codePoint);
        }
        return units;
    }

    private String joinArray(JSONArray array) {
        if (array == null || array.length() == 0) return "";
        StringBuilder out = new StringBuilder();
        for (int i = 0; i < array.length(); i += 1) {
            if (i > 0) out.append(", ");
            out.append(array.optString(i));
        }
        return out.toString();
    }

    private String escapeTspl(String value) {
        return value == null ? "" : value.replace("\"", "'").replace("\r", " ").replace("\n", " ");
    }

    private int clamp(int value, int min, int max) {
        return Math.max(min, Math.min(max, value));
    }

    @SuppressLint("MissingPermission")
    private void startDeviceChooserScan() {
        if (adapter == null || scanner == null) {
            showToast("Bluetooth BLE not available.");
            return;
        }
        if (!adapter.isEnabled()) {
            showToast("请先打开蓝牙");
            return;
        }
        if (!hasScanPermission() || !hasConnectPermission()) {
            requestNeededPermissions();
            showToast("请允许蓝牙权限后再打印");
            return;
        }

        seenDevices.clear();
        showDeviceChooser();
        scanning = true;
        scanner.startScan(scanCallback);
        setChooserStatus("Scanning D35BT...");
        main.postDelayed(this::stopScan, 10000);
    }

    private void showDeviceChooser() {
        if (chooserDialog != null && chooserDialog.isShowing()) {
            chooserList.removeAllViews();
            return;
        }

        LinearLayout root = new LinearLayout(this);
        root.setOrientation(LinearLayout.VERTICAL);
        root.setPadding(24, 12, 24, 0);

        chooserStatus = new TextView(this);
        chooserStatus.setText("Scanning...");
        root.addView(chooserStatus);

        chooserList = new LinearLayout(this);
        chooserList.setOrientation(LinearLayout.VERTICAL);
        ScrollView scroll = new ScrollView(this);
        scroll.addView(chooserList);
        root.addView(scroll, new LinearLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                520
        ));

        chooserDialog = new AlertDialog.Builder(this)
                .setTitle("选择 D35BT 打印机")
                .setView(root)
                .setNegativeButton("取消", (dialog, which) -> stopScan())
                .create();
        chooserDialog.show();
    }

    @SuppressLint("MissingPermission")
    private void addDeviceToChooser(BluetoothDevice device, int rssi) {
        if (!hasConnectPermission()) return;
        String name = device.getName();
        String safeName = (name == null || name.trim().isEmpty()) ? "(no name)" : name;
        String label = safeName + "  " + device.getAddress() + "  RSSI " + rssi;

        Button button = new Button(this);
        button.setAllCaps(false);
        button.setText(label);
        button.setOnClickListener(v -> connect(device));
        if (chooserList != null) chooserList.addView(button);

        String lower = safeName.toLowerCase(Locale.US);
        if (lower.contains("d35") || lower.contains("hprt")) {
            setChooserStatus("Found likely printer: " + label);
        }
    }

    @SuppressLint("MissingPermission")
    private void connect(BluetoothDevice device) {
        if (!hasConnectPermission()) {
            requestNeededPermissions();
            return;
        }
        stopScan();
        disconnect();
        setChooserStatus("Connecting " + device.getAddress() + "...");
        gatt = device.connectGatt(this, false, gattCallback, BluetoothDevice.TRANSPORT_LE);
    }

    @SuppressLint("MissingPermission")
    private void stopScan() {
        if (!scanning || scanner == null || !hasScanPermission()) return;
        scanner.stopScan(scanCallback);
        scanning = false;
        setChooserStatus("Scan stopped.");
    }

    @SuppressLint("MissingPermission")
    private void disconnect() {
        if (gatt == null || !hasConnectPermission()) return;
        try {
            gatt.disconnect();
            gatt.close();
        } catch (Exception ignored) {
        }
        gatt = null;
        writeCharacteristic = null;
        pendingChunks.clear();
        writing = false;
    }

    private BluetoothGattCharacteristic findWriteCharacteristic(BluetoothGatt gatt) {
        BluetoothGattCharacteristic preferred = null;
        BluetoothGattCharacteristic fallback = null;

        for (BluetoothGattService service : gatt.getServices()) {
            for (BluetoothGattCharacteristic characteristic : service.getCharacteristics()) {
                if (!isWritable(characteristic)) continue;
                UUID uuid = characteristic.getUuid();
                if (UUID_HPRT_A.equals(uuid) || UUID_HPRT_B.equals(uuid)) preferred = characteristic;
                if (fallback == null) fallback = characteristic;
            }
        }
        return preferred != null ? preferred : fallback;
    }

    private boolean isWritable(BluetoothGattCharacteristic characteristic) {
        int props = characteristic.getProperties();
        return (props & BluetoothGattCharacteristic.PROPERTY_WRITE) != 0
                || (props & BluetoothGattCharacteristic.PROPERTY_WRITE_NO_RESPONSE) != 0;
    }

    private void enqueueWrite(byte[] data) {
        pendingChunks.clear();
        int size = Math.max(20, payloadSize);
        for (int offset = 0; offset < data.length; offset += size) {
            int length = Math.min(size, data.length - offset);
            byte[] chunk = new byte[length];
            System.arraycopy(data, offset, chunk, 0, length);
            pendingChunks.add(chunk);
        }
        writeNextChunk();
    }

    @SuppressLint("MissingPermission")
    private void writeNextChunk() {
        if (writing || writeCharacteristic == null || gatt == null) return;
        if (!hasConnectPermission()) return;

        if (pendingChunks.isEmpty()) {
            showToast("标签已发送到 D35BT");
            if (chooserDialog != null) chooserDialog.dismiss();
            return;
        }

        byte[] chunk = pendingChunks.poll();
        writeCharacteristic.setValue(chunk);
        if ((writeCharacteristic.getProperties() & BluetoothGattCharacteristic.PROPERTY_WRITE) != 0) {
            writeCharacteristic.setWriteType(BluetoothGattCharacteristic.WRITE_TYPE_DEFAULT);
        } else {
            writeCharacteristic.setWriteType(BluetoothGattCharacteristic.WRITE_TYPE_NO_RESPONSE);
        }
        writing = true;
        boolean ok = gatt.writeCharacteristic(writeCharacteristic);
        if (!ok) {
            writing = false;
            showToast("BLE write returned false");
        } else if (writeCharacteristic.getWriteType() == BluetoothGattCharacteristic.WRITE_TYPE_NO_RESPONSE) {
            main.postDelayed(() -> {
                writing = false;
                writeNextChunk();
            }, 35);
        }
    }

    private void requestNeededPermissions() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            requestPermissions(new String[]{
                    Manifest.permission.BLUETOOTH_SCAN,
                    Manifest.permission.BLUETOOTH_CONNECT
            }, PERMISSION_REQUEST);
        } else if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            requestPermissions(new String[]{Manifest.permission.ACCESS_FINE_LOCATION}, PERMISSION_REQUEST);
        }
    }

    private boolean hasScanPermission() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            return checkSelfPermission(Manifest.permission.BLUETOOTH_SCAN) == PackageManager.PERMISSION_GRANTED;
        }
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            return checkSelfPermission(Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED;
        }
        return true;
    }

    private boolean hasConnectPermission() {
        return Build.VERSION.SDK_INT < Build.VERSION_CODES.S
                || checkSelfPermission(Manifest.permission.BLUETOOTH_CONNECT) == PackageManager.PERMISSION_GRANTED;
    }

    private void setChooserStatus(String message) {
        main.post(() -> {
            if (chooserStatus != null) chooserStatus.setText(message);
        });
    }

    private void showToast(String message) {
        main.post(() -> Toast.makeText(this, message, Toast.LENGTH_SHORT).show());
    }
}
