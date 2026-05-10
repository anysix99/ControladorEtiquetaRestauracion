# HTTPS 部署说明

这个项目是静态 PWA，不需要服务器程序。长期给多台手机使用时，把整个 `ShianXiaoqi_Android` 文件夹部署到 HTTPS 网站即可。

## 推荐方式：Netlify

适合不想配置服务器的情况。

1. 打开 `https://app.netlify.com/drop`。
2. 登录 Netlify。
3. 把整个 `ShianXiaoqi_Android` 文件夹拖进去。
4. Netlify 会生成一个类似 `https://xxxx.netlify.app` 的 HTTPS 地址。
5. 用每台手机的 Chrome 打开这个地址。
6. Android：Chrome 菜单 > `添加到主屏幕`。
7. iPhone：Safari 分享按钮 > `添加到主屏幕`。

如果以后更新 app，再把更新后的 `ShianXiaoqi_Android` 文件夹拖到同一个 Netlify 站点的 Deploys 页面即可。

## 可选方式：GitHub Pages

适合你会用 GitHub，并且希望每次提交代码后自动更新网站。

1. 新建一个 GitHub 仓库。
2. 上传 `ShianXiaoqi_Android` 里面的所有文件。
3. 在仓库里进入 `Settings` > `Pages`。
4. Source 选择主分支，目录选择根目录。
5. GitHub 会生成类似 `https://用户名.github.io/仓库名/` 的 HTTPS 地址。

## 多台手机共享数据

只部署 HTTPS 网站，只能让多台手机打开同一个 app。默认数据仍然保存在每台手机自己的浏览器里。

如果要让多台手机看到同一批食品、模板和设置，需要配置 Supabase：

1. 创建 Supabase 项目。
2. 在 Supabase 的 SQL Editor 执行 `supabase_setup.sql`。
3. 打开 app 的 `Ajustes` > `Sincronización Supabase`。
4. 填写 `Project URL`、`Anon key`、`Tabla` 和 `ID restaurante`。
5. 点击 `Guardar conexión`。
6. 点击 `Probar`，成功后点击 `Subir` 或 `Descargar`。
7. 开启 `Sincronizar automáticamente al guardar`。

注意：只能填写 Supabase 的 `anon/public key`，不要把 `service_role` key 放进手机 app。

## 更新版本

这个 app 有离线缓存。每次正式更新 `app.js`、`styles.css` 或页面内容时，建议同时修改 `sw.js` 里的缓存版本号，例如：

```js
const CACHE_NAME = "food-expiry-manager-v8";
```

这样已经安装到手机桌面的 app 更容易更新到新版本。
