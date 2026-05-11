package com.anysix.d35bttest;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothGatt;
import android.bluetooth.BluetoothGattCallback;
import android.bluetooth.BluetoothGattCharacteristic;
import android.bluetooth.BluetoothGattDescriptor;
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
import android.text.method.ScrollingMovementMethod;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.ScrollView;
import android.widget.TextView;
import android.widget.Toast;

import java.nio.charset.Charset;
import java.util.ArrayDeque;
import java.util.HashSet;
import java.util.Locale;
import java.util.Queue;
import java.util.Set;
import java.util.UUID;

public class BleTestActivity extends Activity {
    private static final int PERMISSION_REQUEST = 35;
    private static final UUID UUID_CLIENT_CONFIG =
            UUID.fromString("00002902-0000-1000-8000-00805f9b34fb");

    // UUIDs found in HereSet_1.0.13.apk. The code still falls back to any writable characteristic.
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

    private LinearLayout deviceList;
    private TextView logView;
    private Button scanButton;
    private Button stopButton;
    private Button printButton;
    private Button disconnectButton;

    private boolean scanning = false;
    private boolean writing = false;
    private int payloadSize = 20;

    private final ScanCallback scanCallback = new ScanCallback() {
        @Override
        public void onScanResult(int callbackType, ScanResult result) {
            BluetoothDevice device = result.getDevice();
            String address = device.getAddress();
            if (seenDevices.contains(address)) return;
            seenDevices.add(address);
            addDeviceButton(device, result.getRssi());
        }

        @Override
        public void onScanFailed(int errorCode) {
            log("Scan failed: " + errorCode);
            scanning = false;
        }
    };

    private final BluetoothGattCallback gattCallback = new BluetoothGattCallback() {
        @Override
        public void onConnectionStateChange(BluetoothGatt gatt, int status, int newState) {
            log("Connection state status=" + status + " newState=" + newState);
            if (newState == BluetoothProfile.STATE_CONNECTED) {
                log("Connected. Discovering services...");
                if (hasConnectPermission()) {
                    gatt.requestMtu(247);
                    gatt.discoverServices();
                }
            } else if (newState == BluetoothProfile.STATE_DISCONNECTED) {
                writeCharacteristic = null;
                runOnUiThread(() -> printButton.setEnabled(false));
                log("Disconnected.");
            }
        }

        @Override
        public void onMtuChanged(BluetoothGatt gatt, int mtu, int status) {
            payloadSize = Math.max(20, mtu - 3);
            log("MTU changed: " + mtu + ", payload=" + payloadSize + ", status=" + status);
        }

        @Override
        public void onServicesDiscovered(BluetoothGatt gatt, int status) {
            log("Services discovered status=" + status);
            dumpServices(gatt);
            writeCharacteristic = findWriteCharacteristic(gatt);
            if (writeCharacteristic == null) {
                log("No writable characteristic found.");
                return;
            }
            log("Writable characteristic: " + writeCharacteristic.getUuid());
            enableNotificationsIfPresent(gatt);
            runOnUiThread(() -> printButton.setEnabled(true));
        }

        @Override
        public void onCharacteristicWrite(BluetoothGatt gatt, BluetoothGattCharacteristic characteristic, int status) {
            writing = false;
            if (status != BluetoothGatt.GATT_SUCCESS) {
                log("Write failed status=" + status);
                return;
            }
            writeNextChunk();
        }

        @Override
        public void onCharacteristicChanged(BluetoothGatt gatt, BluetoothGattCharacteristic characteristic) {
            byte[] value = characteristic.getValue();
            log("Notify " + characteristic.getUuid() + ": " + bytesToHex(value));
        }

        @Override
        public void onCharacteristicChanged(BluetoothGatt gatt, BluetoothGattCharacteristic characteristic, byte[] value) {
            log("Notify " + characteristic.getUuid() + ": " + bytesToHex(value));
        }
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        buildUi();

        BluetoothManager manager = (BluetoothManager) getSystemService(Context.BLUETOOTH_SERVICE);
        adapter = manager == null ? null : manager.getAdapter();
        scanner = adapter == null ? null : adapter.getBluetoothLeScanner();

        if (adapter == null) {
            log("Bluetooth not available.");
            return;
        }
        requestNeededPermissions();
    }

    @Override
    protected void onDestroy() {
        stopScan();
        disconnect();
        super.onDestroy();
    }

    private void buildUi() {
        LinearLayout root = new LinearLayout(this);
        root.setOrientation(LinearLayout.VERTICAL);
        root.setPadding(24, 24, 24, 24);

        TextView title = new TextView(this);
        title.setText("D35BT BLE Test");
        title.setTextSize(24);
        title.setTextColor(0xff14231e);
        root.addView(title);

        scanButton = button("扫描 BLE");
        stopButton = button("停止扫描");
        printButton = button("打印 TSPL 测试");
        disconnectButton = button("断开");
        printButton.setEnabled(false);

        scanButton.setOnClickListener(v -> startScan());
        stopButton.setOnClickListener(v -> stopScan());
        printButton.setOnClickListener(v -> printTestLabel());
        disconnectButton.setOnClickListener(v -> disconnect());

        LinearLayout actions = new LinearLayout(this);
        actions.setOrientation(LinearLayout.VERTICAL);
        actions.addView(scanButton);
        actions.addView(stopButton);
        actions.addView(printButton);
        actions.addView(disconnectButton);
        root.addView(actions);

        TextView devicesTitle = new TextView(this);
        devicesTitle.setText("设备");
        devicesTitle.setTextSize(18);
        devicesTitle.setPadding(0, 18, 0, 8);
        root.addView(devicesTitle);

        deviceList = new LinearLayout(this);
        deviceList.setOrientation(LinearLayout.VERTICAL);
        root.addView(deviceList);

        TextView logTitle = new TextView(this);
        logTitle.setText("日志");
        logTitle.setTextSize(18);
        logTitle.setPadding(0, 18, 0, 8);
        root.addView(logTitle);

        logView = new TextView(this);
        logView.setTextSize(13);
        logView.setTextColor(0xff102019);
        logView.setMovementMethod(new ScrollingMovementMethod());

        ScrollView scroll = new ScrollView(this);
        scroll.addView(logView);
        root.addView(scroll, new LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT, 0, 1));

        setContentView(root);
    }

    private Button button(String text) {
        Button button = new Button(this);
        button.setText(text);
        button.setAllCaps(false);
        return button;
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

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode != PERMISSION_REQUEST) return;
        for (int result : grantResults) {
            if (result != PackageManager.PERMISSION_GRANTED) {
                toast("蓝牙权限未允许");
                return;
            }
        }
        log("Permissions granted.");
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

    @SuppressLint("MissingPermission")
    private void startScan() {
        if (scanner == null) {
            log("BLE scanner not available.");
            return;
        }
        if (!adapter.isEnabled()) {
            toast("请先打开蓝牙");
            return;
        }
        if (!hasScanPermission()) {
            requestNeededPermissions();
            return;
        }
        seenDevices.clear();
        deviceList.removeAllViews();
        scanning = true;
        scanner.startScan(scanCallback);
        log("Scanning...");
        main.postDelayed(this::stopScan, 12000);
    }

    @SuppressLint("MissingPermission")
    private void stopScan() {
        if (!scanning || scanner == null || !hasScanPermission()) return;
        scanner.stopScan(scanCallback);
        scanning = false;
        log("Scan stopped.");
    }

    @SuppressLint("MissingPermission")
    private void addDeviceButton(BluetoothDevice device, int rssi) {
        runOnUiThread(() -> {
            String name = device.getName();
            String label = (name == null || name.trim().isEmpty() ? "(no name)" : name)
                    + "  " + device.getAddress() + "  RSSI " + rssi;
            Button button = button(label);
            button.setOnClickListener(v -> connect(device));
            deviceList.addView(button);
            log("Found: " + label);
        });
    }

    @SuppressLint("MissingPermission")
    private void connect(BluetoothDevice device) {
        if (!hasConnectPermission()) {
            requestNeededPermissions();
            return;
        }
        stopScan();
        disconnect();
        log("Connecting to " + device.getAddress() + "...");
        gatt = device.connectGatt(this, false, gattCallback, BluetoothDevice.TRANSPORT_LE);
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
        if (printButton != null) printButton.setEnabled(false);
        log("Closed GATT.");
    }

    private void dumpServices(BluetoothGatt gatt) {
        for (BluetoothGattService service : gatt.getServices()) {
            log("Service " + service.getUuid());
            for (BluetoothGattCharacteristic characteristic : service.getCharacteristics()) {
                log("  Char " + characteristic.getUuid() + " props=" + props(characteristic.getProperties()));
            }
        }
    }

    private BluetoothGattCharacteristic findWriteCharacteristic(BluetoothGatt gatt) {
        BluetoothGattCharacteristic preferred = null;
        BluetoothGattCharacteristic fallback = null;

        for (BluetoothGattService service : gatt.getServices()) {
            for (BluetoothGattCharacteristic characteristic : service.getCharacteristics()) {
                if (!isWritable(characteristic)) continue;
                UUID uuid = characteristic.getUuid();
                if (UUID_HPRT_A.equals(uuid) || UUID_HPRT_B.equals(uuid)) {
                    preferred = characteristic;
                }
                if (fallback == null) fallback = characteristic;
            }
        }
        return preferred != null ? preferred : fallback;
    }

    @SuppressLint("MissingPermission")
    private void enableNotificationsIfPresent(BluetoothGatt gatt) {
        if (!hasConnectPermission()) return;
        for (BluetoothGattService service : gatt.getServices()) {
            for (BluetoothGattCharacteristic characteristic : service.getCharacteristics()) {
                int props = characteristic.getProperties();
                boolean canNotify = (props & BluetoothGattCharacteristic.PROPERTY_NOTIFY) != 0
                        || (props & BluetoothGattCharacteristic.PROPERTY_INDICATE) != 0;
                if (!canNotify) continue;
                gatt.setCharacteristicNotification(characteristic, true);
                BluetoothGattDescriptor descriptor = characteristic.getDescriptor(UUID_CLIENT_CONFIG);
                if (descriptor != null) {
                    descriptor.setValue(BluetoothGattDescriptor.ENABLE_NOTIFICATION_VALUE);
                    gatt.writeDescriptor(descriptor);
                    log("Notifications enabled for " + characteristic.getUuid());
                }
                return;
            }
        }
    }

    private boolean isWritable(BluetoothGattCharacteristic characteristic) {
        int props = characteristic.getProperties();
        return (props & BluetoothGattCharacteristic.PROPERTY_WRITE) != 0
                || (props & BluetoothGattCharacteristic.PROPERTY_WRITE_NO_RESPONSE) != 0;
    }

    private String props(int props) {
        StringBuilder out = new StringBuilder();
        if ((props & BluetoothGattCharacteristic.PROPERTY_READ) != 0) out.append(" READ");
        if ((props & BluetoothGattCharacteristic.PROPERTY_WRITE) != 0) out.append(" WRITE");
        if ((props & BluetoothGattCharacteristic.PROPERTY_WRITE_NO_RESPONSE) != 0) out.append(" WRITE_NR");
        if ((props & BluetoothGattCharacteristic.PROPERTY_NOTIFY) != 0) out.append(" NOTIFY");
        if ((props & BluetoothGattCharacteristic.PROPERTY_INDICATE) != 0) out.append(" INDICATE");
        return out.length() == 0 ? " none" : out.toString();
    }

    private void printTestLabel() {
        if (writeCharacteristic == null || gatt == null) {
            toast("未连接打印机");
            return;
        }
        String tspl = "SIZE 80 mm,50 mm\r\n"
                + "GAP 2 mm,0 mm\r\n"
                + "DIRECTION 1\r\n"
                + "CLS\r\n"
                + "TEXT 24,24,\"3\",0,2,2,\"TEST D35BT\"\r\n"
                + "TEXT 24,92,\"3\",0,1,1,\"TSPL BLE OK\"\r\n"
                + "BOX 20,140,620,360,3\r\n"
                + "TEXT 40,180,\"3\",0,1,1,\"Controlador Etiqueta\"\r\n"
                + "PRINT 1,1\r\n";
        enqueueWrite(tspl.getBytes(Charset.forName("US-ASCII")));
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
        log("Queued " + data.length + " bytes in " + pendingChunks.size() + " chunks.");
        writeNextChunk();
    }

    @SuppressLint("MissingPermission")
    private void writeNextChunk() {
        if (writing || writeCharacteristic == null || gatt == null || pendingChunks.isEmpty()) {
            if (pendingChunks.isEmpty()) log("Write complete.");
            return;
        }
        if (!hasConnectPermission()) return;

        byte[] chunk = pendingChunks.poll();
        writeCharacteristic.setValue(chunk);
        if ((writeCharacteristic.getProperties() & BluetoothGattCharacteristic.PROPERTY_WRITE_NO_RESPONSE) != 0) {
            writeCharacteristic.setWriteType(BluetoothGattCharacteristic.WRITE_TYPE_NO_RESPONSE);
        } else {
            writeCharacteristic.setWriteType(BluetoothGattCharacteristic.WRITE_TYPE_DEFAULT);
        }
        writing = true;
        boolean ok = gatt.writeCharacteristic(writeCharacteristic);
        log("Write " + chunk.length + " bytes: " + ok);
        if (!ok) {
            writing = false;
        }
    }

    private String bytesToHex(byte[] bytes) {
        if (bytes == null) return "";
        StringBuilder out = new StringBuilder();
        for (byte b : bytes) {
            out.append(String.format(Locale.US, "%02X ", b));
        }
        return out.toString().trim();
    }

    private void toast(String message) {
        runOnUiThread(() -> Toast.makeText(this, message, Toast.LENGTH_SHORT).show());
    }

    private void log(String message) {
        runOnUiThread(() -> {
            if (logView == null) return;
            logView.append(message + "\n");
        });
    }
}
