# D35BT BLE Test

Android 原生 BLE 测试工程，用来验证 HPRT/汉印 D35BT 是否可以通过 BLE 接收 TSPL 指令。

## 测试目标

先验证最小链路：

1. Android 扫描 BLE 设备。
2. 连接 D35BT。
3. 枚举 GATT services/characteristics。
4. 找到可写 characteristic。
5. 发送一条 ASCII TSPL 测试标签。

成功后，再把打印逻辑接入主 app。

## 使用方法

1. 用 Android Studio 打开 `android-d35bt-test` 文件夹。
2. 等待 Gradle sync。
3. 连接 Android 手机。
4. 手机打开蓝牙和定位权限。
5. 运行 app。
6. 点击 `扫描 BLE`。
7. 选择 D35BT / HPRT 相关设备。
8. 连接后点击 `打印 TSPL 测试`。

## 测试标签

当前只打印英文：

```text
TEST D35BT
TSPL BLE OK
Controlador Etiqueta
```

这是为了先确认 BLE 写入和 TSPL 指令是否有效。中文打印要在链路成功后再处理字体和编码。

## UUID 说明

从 `HereSet_1.0.13.apk` 中看到的疑似 UUID：

```text
dfce9998-a259-11ef-b0a1-043f72a0b6f2
dfce2fc5-a259-11ef-b0a1-043f72a0b6f2
00002902-0000-1000-8000-00805f9b34fb
```

测试 app 会优先使用前两个 UUID 中可写的 characteristic；如果找不到，会回退到第一个可写 characteristic。日志会显示所有 service 和 characteristic，方便确认。

## 注意

本机当前没有检测到 Android SDK/Gradle，所以这里无法直接编译 APK。需要在安装了 Android Studio 的机器上打开此目录运行。
