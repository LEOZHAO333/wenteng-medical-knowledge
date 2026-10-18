# 日宠通 PR #7｜最终 Logo 网页素材接入清单

日期：2026-10-18
目标：仅在 PR #7 待审核分支完成品牌素材接入；不得部署 / 合并 main / 解除 noindex。

## 已完成（本分支）
- 新增 `pet-site/pet/assets/favicon.svg`：用户提供的几何爪印 SVG，支持 16px 浏览器图标。
- `pet-site/api/pet.js` 已加入桌面版/手机紧凑版页眉 Logo、深绿反白页脚 Logo、分享图、iOS/Android 图标的引用模板。
- 更新页脚版权到 2026，并标注运营主体：文腾株式会社。
- 代码使用 `BRAND_ASSETS_READY = false`，二进制素材未进入仓库前不激活缺失图片引用；目前 favicon.svg 已可用。

## 待执行：将二进制文件放入同一目录
以用户上传的 `richongtong-web-assets.zip` 为权威源；提取文件到 `pet-site/pet/assets/`，保持原始文件名及内容，不得重新生成或改写 Logo。

**页眉桌面**：
- logo-header@2x.webp / logo-header@3x.webp
- logo-header@2x.png / logo-header@3x.png

**页眉手机**：
- logo-header-compact@2x.webp / logo-header-compact@3x.webp
- logo-header-compact@2x.png / logo-header-compact@3x.png

**深绿页脚（桌面/手机）**：
- logo-footer-reverse@2x.webp / logo-footer-reverse@3x.webp
- logo-footer-reverse@2x.png / logo-footer-reverse@3x.png
- logo-footer-reverse-compact@2x.webp / logo-footer-reverse-compact@3x.webp
- logo-footer-reverse-compact@2x.png / logo-footer-reverse-compact@3x.png

**浏览器/PWA**：
- favicon.ico、favicon-16.png、favicon-32.png、favicon-48.png
- apple-touch-icon.png
- icon-192.png、icon-512.png

**社交分享**：
- og-image.jpg（1200×630）；og-image.png 为可选原始备份。

## 二进制素材导入完毕之后
1. 在 `pet-site/api/pet.js` 将 `BRAND_ASSETS_READY` 设为 `true`。
2. 逐一检查资源 HTTP 返回、Content-Type、宽高、2x/3x、alt 文本与无横向溢出。
3. 用 390px 和 1280px 检查：页眉桌面完整、手机紧凑，深绿页脚有可辨认的米白 Logo。
4. 检查 favicon 16/32/48px、Safari 主屏幕图标、Android 192/512 和微信链接分享图。
5. 检查 OG 图片大小 1200x630、WebP/PNG 回退和首屏加载，确保导航、搜索、sitemap 不回归。
6. 保持 `INDEX_APPROVED = false`，无 `Medical Approved`、无购买/问诊微信入口。

## 素材核验结论
- 用户压缩包 26 个图片/图标文件，加 README，体积约 700KB。
- README 写有 `web_preview.png` 预览图，但原压缩包中**实际不存在**；不影响页面资源导入。
- SVG 几何爪印与“宠”字上的爪印并非完全同一图形；待品牌矢量定稿时再统一。
- 不得用 AI 效果图假称已替换真实页面，必须以代码运行画面为准。

状态：部分完成；因当前 GitHub 文本写入接口无法携带压缩包内二进制图片，完整激活仍待资源文件上传。