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

- **12 產品 × 8 張產品圖**（Google AI Studio Nanobanana，使用者自產）── 還沒做
- **「一皂到底·保濕款」subtitle 待命名**（products.js 註記中）── 還沒做

本舍小記 cover + inline 圖 在 2026-05 session 全自動產完（用 scripts/generate-images.js
透過 Gemini API），27 篇都有 cover、16 篇新題加 inline 手繪圖。下次要再產圖直接套
這個 pipeline：寫 tasks JSON → 跑 generate-images.js → 跑 optimize:images。

## 上次 session 尾聲（2026-05-10）

| 已上線 main | Commit |
|---|---|
| 16 篇新題本舍小記文章（生活運用 / 皮膚紀錄 / 儀式感受 三類擴充） | `e7dab9a` ~ `dfd9c26` |
| 16 張 cover 圖 + 16 張 inline 手繪圖 + PROMPTS.md 更新 | `0ec409b` `25f7b15` |
| Journal kicker 改名（之念 → 手記/方針/技術/紀錄/運用/感受）+ category filter chips | `970e295` `5199b3d` |
| ECPay 物流 bug 連環修：寄件人手機 886 → 0、列印 path /Helper/ → /Express/、CVSValidationNo 必帶 | `0f2d7c4` `298a064` `154d217` `c086762` |
| 購物車表單手機欄位 inline 驗證（red border + normalize on blur）+ 抽 src/utils/phone.js 共用 | `298a064` |
| 拿掉 NT$500 95 折，只留 NT$1000 9 折 + NT$500 免運 | `4577a92` |

main HEAD = `4577a92`（2026-05-10）。所有 feature branch commits 都已 ff merge 到 main 並 push。

## 旅行 / 跨機器同步

兩台 Mac 都用同一個 GitHub 帳號 `tsglee`：
- 程式碼 → `git clone https://github.com/tsglee/jinhuasoap.git`
- KB → `git clone https://github.com/tsglee/goldenflower-soap-wiki.git`
- `gh auth login`、`npm install` 一次後就能連續工作
- 工作前 `git pull`、收工 `git push`，永遠用 feature branch 不直接動 main

我的記憶檔（`~/.claude/`）不跨機器，跨機器靠這份 CLAUDE.md 重建上下文。
