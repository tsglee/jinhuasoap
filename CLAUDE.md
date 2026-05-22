# 金花樓 · Goldenflower Soap Site

林口的小小皂舍。夫妻檔 — 太太是研發老闆娘（配方）、tsglee 顧網站與行銷。
2022 春起，每週手壓一批冷製天然皂。本 repo 是品牌官網。

## Stack

- **React 18 + Vite 5**，無 Next/Astro。SPA tab routing 自寫於 [App.jsx](src/App.jsx) 的 `parseRoute()`。
- **Vanilla CSS** 三檔：[tokens.css](src/styles/tokens.css)（色值、斷點）、[base.css](src/styles/base.css)、[responsive.css](src/styles/responsive.css)（mobile-first overrides，手機 ≤ 900px 用 `gf-stack-md` 之類 utility class 套 `!important`）。元件樣式以 inline style 為主。
- **Cloudflare Workers + Pages**。`/api/order` 透過 Resend 寄信給老闆娘 + 寫進 `ORDER_FALLBACK` KV（30 天 TTL，寄信失敗時保單）；`/api/store-callback` 接 ECPay eMap 超商選店。Worker 在 [src/worker.js](src/worker.js)，wrangler 在 [wrangler.jsonc](wrangler.jsonc)。
- **圖片 pipeline**：sharp via `npm run optimize:images`（[scripts/optimize-images.js](scripts/optimize-images.js)）— 遞迴掃描 `public/images/{products,journal,...}/`，每張 PNG/JPG 旁邊產 AVIF + WebP。`npm run build` 之後 [strip-redundant-pngs.js](scripts/strip-redundant-pngs.js) 把 dist 的大 PNG 砍掉（瀏覽器走 `<picture>` 拿 AVIF/WebP）。

## Routing 速查

| URL | Tab | File |
|---|---|---|
| `/` | 01 本舍 | [src/components/About/](src/components/About/) (Desktop / Mobile / index.jsx) |
| `/?tab=products` | 02 十二花（完整產品介紹） | [src/components/Products.jsx](src/components/Products.jsx) |
| `/?tab=process` | 03 製皂 | [src/components/Process.jsx](src/components/Process.jsx) |
| `/?tab=shop` | 04 購皂（商品 grid + 購物車 + 訂單表單） | [src/components/Shop.jsx](src/components/Shop.jsx) |
| `/journal` | 05 本舍小記 列表 | [src/components/Journal.jsx](src/components/Journal.jsx) `JournalIndex` |
| `/journal/<slug>` | 單篇文章 | [src/components/Journal.jsx](src/components/Journal.jsx) `JournalPost` |
| `/legal/{privacy,returns,terms}` | 法律頁 | [src/components/Legal.jsx](src/components/Legal.jsx) |

## 關鍵資料 + 元件

- 產品：[src/data/products.js](src/data/products.js) — 12 entries，schema 用 `photos: [...]` 陣列（目前每件 1 張，未來 8 張）
- 多圖 gallery：[src/components/ProductGallery.jsx](src/components/ProductGallery.jsx) — `<ProductCarousel>` + `<ProductLightbox>` + 包裝 `<ProductGallery>`，無第三方依賴（scroll-snap-x + IntersectionObserver + React Portal）
- 加購共用元件：[src/components/BuyButton.jsx](src/components/BuyButton.jsx) — 02 與 04 共用 `<AddToCartButton>`
- 購物車：[src/state/CartContext.jsx](src/state/CartContext.jsx)
- 文章：[src/components/Journal.jsx](src/components/Journal.jsx) `POSTS` 陣列。body 元素型別：純字串 → `<p>`、`{type:'h2', text}`、`{type:'faq', items:[{q,a}]}`、`{type:'illustration', kind:'skin-types'}`。排序：`pinned: true` 的在前，再按 `date` desc。
- Footer：[src/components/Chrome.jsx](src/components/Chrome.jsx) Footer 元件。手機版（<900px）只剩品牌 + 聯絡 + 版權（含 inline 法律連結），4 欄 nav 收進 `.gf-hide-md` wrapper。

## 知識庫（commercial-sensitive，私）

64 頁手工皂教材 PDF + 14h 授課錄音 + OCR + 44 頁 wiki，是配方知識的權威來源。

- **GitHub private repo**：https://github.com/tsglee/goldenflower-soap-wiki
- **Local path（家裡 Mac）**：`/Users/tsglee/Documents/jh_mk/knowledge_base/`
- **新機器初次設定**：
  ```bash
  git clone https://github.com/tsglee/goldenflower-soap-wiki.git ~/Documents/jh_mk/knowledge_base
  ```
  （父層 `jh_mk/` 只是放原始 mp3 + Audacity 專案的容器，那些檔太大不版控。新機器只 clone 知識庫本身就夠。）

KB 內部有自己的 [CLAUDE.md](https://github.com/tsglee/goldenflower-soap-wiki/blob/main/CLAUDE.md) + [QUERY.md](https://github.com/tsglee/goldenflower-soap-wiki/blob/main/QUERY.md)，新 session 進去前先讀那兩份。

### 用 KB 寫文章 / 回答 / 設計時的紅線

- ✅ 引用業界通則：馬賽 70/15/15、椰子 15–25%、SCI/SCS/APG/CAPB-LPB、INS 140–160、皂化反應化學、五力指標
- ✅ 以方向詞描述金花樓配方：「椰子壓得低」「橄欖跟乳油木果脂多一點」「保濕拉到最高」
- ❌ 不寫**金花樓特定產品的具體比例**（例如「海棠皂的椰子佔 N%」）
- ❌ 不公開 KB 裡老師（金花 / Ampsoap）的私塾教材原文 — 只能間接引用觀念

products.js 的 `coreIngredients` 是已公開的成分名（無比例）— 可以自由引用。

## 文章 voice + 排版慣例

- **本舍小記** 11 篇都共用一致的文人語氣 — em-dash「──」分句、`老闆娘鍋邊` 的第一人稱、kicker 分四類（原料之念 / 設計之念 / 工藝之念 / 皮膚之念）。
- 平均 30–50 段、4–6 FAQ。長文加 h2 + FAQ；短文純段落。
- 寫新文章時讀過 [Journal.jsx](src/components/Journal.jsx) 既有篇章對齊風格再下筆。
- 描述產品按 series 與情境，不貼性能訴求（醫療化妝品法規）。

## Workflow / 安全規則

- 預設工作分支 `journal-expansion`。新 feature 從 `main` 開支線。
- **Never push to `main` directly without explicit per-merge authorization**。「這次正式發佈」是一次性授權，下次合併要再問。
- Commit 訊息中文、簡潔（看 git log 對齊風格）。Co-Authored-By: Claude Opus 4.7 一行。
- UI 改動務必用 preview tools 驗證（`preview_start` 跑 `web` config，port 5173）。
- 大改動前後跑 `npm run build` 確認 production 過。
- `npm run lint` — TierNotice.jsx 有 pre-existing 警告，不是這次的責任不要動它。

## 圖片資產目錄結構

```
public/images/
├── products/
│   ├── 海棠/01.{png,avif,webp}     ← 各產品子資料夾，01 為主圖
│   ├── 霧蜜/01.{png,avif,webp}
│   ├── ...（共 12 個子資料夾）
│   └── PROMPTS.md                   ← Nanobanana 8 視角 prompt
├── journal/
│   ├── <slug>.{jpg,avif,webp}       ← 11 篇文章 cover；目前空，等老闆娘產
│   ├── PROMPTS.md                   ← 11 篇 cover prompt
│   └── README.md                    ← 規格 contract
├── ingredients/                     ← 八樣花材
├── about/, process/, landingmedia/, thanku/
└── ...
```

## Pending（未做、等資料）

- **9 產品 × 8 張產品圖** ── 海棠 / 綠豆 / 金盞花 已用真實照 + Nanobanana
  跑完（每款 8 視角），剩 9 款（霧蜜 / 蝶豆花 / 大米 / 酒粕 / 桂花 / 山茶
  淨髮 / 茉莉沐膚 / 一皂到底×2）等老闆娘提供實拍照後同 pipeline 跑
- **「一皂到底·保濕款」subtitle 待命名**（products.js 註記中）
- **22 篇 Journal article body 英譯**（基建有、metadata 27 篇全英譯、
  body 還沒翻；Top 5 排序：D2 gift-soap / A1 soap-storage / D3 slow-bath /
  B1 baby-soap / A4 taiwan-water）── 英文版目前暫停、focus 中文版

本舍小記 cover + inline 圖 在 2026-05-10 session 全自動產完（用 scripts/generate-images.js
透過 Gemini API），27 篇都有 cover、16 篇新題加 inline 手繪圖。下次要再產圖直接套
這個 pipeline：寫 tasks JSON → 跑 generate-images.js → 跑 optimize:images。
產品實拍照走同 pipeline + referenceImagePath 參數（看 scripts/tasks/product-real-tasks.json）。

## 上次 session 尾聲（2026-05-21）

main HEAD = `7c4c47c`（2026-05-21）。全部已 ff merge + push origin/main、
Cloudflare Pages auto-deploy。

### 本輪上線重點

| 區塊 | 內容 | 關鍵 commit |
|---|---|---|
| **真實產品照** | 海棠 / 綠豆 / 金盞花 各 8 視角換新（用 ~/Desktop/realProducts 實拍照當 Nanobanana referenceImagePath、保留皂體只換背景）。products.js photos 陣列 6→8。剩 9 款待補。 | `3cec516` `cb26c60` |
| **客戶心得** | 04 購皂頁底加 8 條 testimonials。維護於 src/data/testimonials.js、push 進陣列即可。 | `f9466d1` |
| **訂單追蹤頁** | `/order/:orderId` 無會員自助查詢、worker GET endpoint 過濾敏感欄位。Cart success 跟 Footer 都接入口。 | `f37ae85` |
| ~~GA4 完整追蹤~~ | **2026-05-21 整個刪除** ── GA4 ingestion 持續不穩定（手動 fire 的 page_view / purchase 永遠不進報表、但 GA4 內建 session_start / user_engagement 進得去）debug 一整天定位不出 root cause。老闆娘決定清掉所有 Google stuff（前端 gtag library、所有 event fire、GA4 帳號、Google Ads 帳號）整個重來。未來考慮 Cloudflare Web Analytics（免費、無 tag、Cloudflare dashboard 一鍵開）或 Plausible（付費、隱私友善）。**不再用 GA4。** | `7554dbd` `f890545` |
| **SEO 基礎** | sitemap 11→31 URL（27 文章+3 法律頁+home+journal）、og:image 換成 hero-poster.jpg、404 頁面（noindex）、HTML lang sync。 | `28a1b78` |
| **設計刷新** | 字體加大、letter-spacing 收緊。`.mono` 11→12px、`gf-mono-md` 9→11px、Products DetailRow 10→12px、Journal date 10→12px、Journal CategoryChip 11→13px 等共 25+ 處對齊清潔保養品產業共識。 | `5b32f89` `354075e` |
| **內容調整** | 02 十二花 h1：本舍之皂→「本舍手工皂」、過度嬌情詞改具體洗感、Banner 拿掉「春日新品 · 第 VII 批慢製中」改規則 banner、全站 MMXXII（2022 建立年）清掉、「山中一盞金花。」拿句點 | `0a3e9d5` `3fc6add` `1a6c4ad` `939228b` |
| **04 購皂底部** | 「開店合作」改寫為「節禮 · 婚禮」客製洽詢段（連 D2 gift-soap 文章） | （舊 session） |
| **Footer** | 加 IG 連結 @jinhuasoap、寄送區加「查詢訂單」連結 | `1f9be10` |
| **i18n 基建（已暫停）** | LocaleProvider + useT() hook 已建。12 產品全英譯 + 27 篇 metadata 英譯 + Products / Shop / Journal 已 wire。**EN 切換按鈕暫時隱藏**（Chrome.jsx 用 `{false && ...}` 包住、要恢復改 true 即可）。導航 navigator.language 自動偵測也拿掉。 | `19367dc` `690caaf` `b167a14` |

### 重要技術細節

- **新增的 i18n 檔**：`src/i18n/index.jsx` + `src/i18n/locales/{zh,en}.js` + `src/data/posts.en.js`
- **新增的元件**：`src/components/OrderTracking.jsx`、`src/data/testimonials.js`、`src/utils/phone.js`
- **新增的 scripts/tasks/ JSON**：`journal-cover-tasks.json`、`journal-inline-tasks.json`、`product-real-tasks.json`

## 下一個 session：未定

GA / Google Ads 路線整個刪除重來（2026-05-21）。老闆娘還沒決定下一步要先處理 IG / Cloudflare Analytics / Plausible / Email Newsletter / 還是先做廣告。新 session 開頭問她。

**過往教訓（避免下次再踩）**：
- GA4「即時報表」是出名的不可靠 indicator ── 不要靠它來 debug 前端有沒 fire 事件。看 Network panel 的 collect 請求才是真相。
- Google Tag (gtag.js) 理論上「inline 後就 work」，實務上**新建 GA4 屬性的 ingestion 第一天常常顯示異常**（session_start 進去、但 page_view 沒進）── 沒有公開 SLA、沒有可靠 debug 方法。
- 接 Google Ads conversion 別走「GA4 import」黑盒路線、走「manual event snippet」直接路線比較 robust。
- 任何「dashboard 上手動設的 var」會被 `wrangler deploy` wipe 掉 ── 所有 plaintext config 必須寫進 [wrangler.jsonc](wrangler.jsonc) `vars` block。

## 旅行 / 跨機器同步

兩台 Mac 都用同一個 GitHub 帳號 `tsglee`：
- 程式碼 → `git clone https://github.com/tsglee/jinhuasoap.git`
- KB → `git clone https://github.com/tsglee/goldenflower-soap-wiki.git`
- `gh auth login`、`npm install` 一次後就能連續工作
- 工作前 `git pull`、收工 `git push`，永遠用 feature branch 不直接動 main

我的記憶檔（`~/.claude/`）不跨機器，跨機器靠這份 CLAUDE.md 重建上下文。
