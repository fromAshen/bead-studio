# 拼豆图纸生成器（Ashen 图纸库）

上传图片自动生成拼豆（Perler Beads / Hama）图纸的单页 Web 工具。纯前端实现，无需后端、无需联网。

## 在线使用

访问 GitHub Pages 地址即可（本仓库 Settings → Pages 开启）：

```
https://<你的用户名>.github.io/bead-studio/
```

iPad / iPhone 上用 Safari 打开后，点「分享 → 添加到主屏幕」，可以用全屏独立 App 的方式使用（无地址栏）。

## 功能

- 上传图片自动转拼豆图纸，可调格数（如 52×52 / 78×78 / 104×104）
- 自定义调色板（MARD 色号），显示用料统计
- 图层、局部细化、精简用色、描边、填充等编辑工具
- 导出高清图纸 PNG（可内嵌色号数据）
- 工程文件为纯 JSON，可保存后再次载入继续编辑
- 草稿箱自动保存（浏览器 localStorage）

## 本地开发

整个应用是**单个 HTML 文件**（`index.html`），包含全部 CSS / JS，无构建步骤、无外部依赖。

直接用浏览器打开 `index.html` 即可运行。

> 注意：用 `file://` 直接打开时，浏览器会限制 localStorage，草稿保存可能失效。
> 需要完整功能请通过 Pages（https）或本地 http 服务访问，例如：

```bash
python3 -m http.server 8000
# 然后访问 http://localhost:8000/
```

## 技术

- 原生 HTML / CSS / JavaScript，无框架
- Canvas 2D 渲染网格与豆子
- PWA（Web App Manifest + apple-mobile-web-app meta），支持添加到主屏幕全屏运行

## 许可

Apache License 2.0，详见 [LICENSE](LICENSE)。署名信息见 [NOTICE](NOTICE)。

根据 Apache 2.0 的要求，二次分发时请保留 `LICENSE` 与 `NOTICE` 文件。
