# 金花樓 repo · 結構導覽

最後更新：2026-05-22

新人來看 repo 從這份開始。讀 [CLAUDE.md](../CLAUDE.md) 之前先掃這份知道每樣東西放哪。

---

## 🧭 Root layout

```
goldenflower_site/
├── CLAUDE.md             ← 給 agent 看的 stack overview + routing table + workflow
├── README.md             ← 給人類看的 image supply contract + 開發 quick start
├── AD_CAMPAIGN.md        ← 當前 active campaign（Google Ads 試水溫 NT$500）
│                            完成上線後可移到 docs/ARCHIVE/
├── index.html            ← Vite entry
├── package.json          ← scripts + deps
├── vite.config.js        ← build config
├── wrangler.jsonc        ← Cloudflare Pages + Worker config
├── .env.example          ← env var template（實際 .env 不版控）
├── .eslintrc.cjs / .prettierrc / .nvmrc  ← tooling configs
│
├── docs/                 ← 文件、handoff、長期保存的決策
│   ├── STRUCTURE.md            ← 這份（repo 導覽）
│   ├── SESSION_HANDOFF.md      ← 跨 session 接手紀錄
│   ├── VERSIONING.md           ← release / changelog 慣例
│   └── google-ads-api-design.md  ← Google Ads API design doc（給 reviewer）
│
├── src/                  ← React app source
│   ├── App.jsx                 ← SPA router (parseRoute) + tab state
│   ├── main.jsx                ← entry, mounts App
│   ├── components/             ← UI components
│   │   ├── Chrome.jsx               Header + Footer + nav
│   │   ├── About/                   01 本舍（Desktop + Mobile + index）
│   │   ├── Products.jsx             02 十二花（完整產品介紹 + ProductDetailCard export）
│   │   ├── ProductDetail.jsx        /products/:slug 個別產品頁
│   │   ├── CategoryListing.jsx      /products/concern/:slug TA cluster 列表
│   │   ├── ProductGallery.jsx       多圖 carousel + lightbox（無第三方依賴）
│   │   ├── Process.jsx              03 製皂
│   │   ├── Shop.jsx                 04 購皂（catalog + 結帳前頁）
│   │   ├── Journal.jsx              05 本舍小記（index + 單篇）
│   │   ├── Cart.jsx                 /cart 結帳
│   │   ├── OrderTracking.jsx        /order/:orderId 無會員自助查詢
│   │   ├── Legal.jsx                /legal/{privacy,returns,terms}
│   │   ├── BuyButton.jsx            AddToCartButton 共用
│   │   ├── TestimonialCarousel.jsx  04 頁底心得旋轉木馬
│   │   ├── TierNotice.jsx           滿千 9 折 + 滿 500 免運 通知條
│   │   ├── GoldenFlower.jsx         Divider 等 brand SVG / ornament
│   │   └── LineFloat.jsx            右下浮動 LINE 按鈕
│   ├── data/                   ← 內容資料（component-level、非 secret）
│   │   ├── products.js              12 個產品 + CONCERNS cluster 定義
│   │   ├── testimonials.js          8 條客戶心得 + headshot 路徑
│   │   └── posts.en.js              Journal 英譯 metadata（body 暫停）
│   ├── i18n/                   ← LocaleProvider + useT() hook + 翻譯
│   ├── state/                  ← CartContext 等
│   ├── styles/                 ← 三檔 CSS
│   │   ├── tokens.css                color / font / breakpoint vars
│   │   ├── base.css                  global + body::before noise
│   │   └── responsive.css            ≤900px overrides via utility classes
│   ├── utils/                  ← phone normalize 等小工具
│   └── worker.js               ← Cloudflare Worker（/api/order + /api/store-callback）
│
├── public/               ← Vite 靜態檔（直接複製到 dist）
│   ├── images/                 ← 圖庫
│   │   ├── about/                   01 本舍 hero / 工坊
│   │   ├── process/                 03 製皂 stage 圖
│   │   ├── landingmedia/            首頁 hero illustration + poster
│   │   ├── ingredients/             八樣花材
│   │   ├── products/                12 個產品子資料夾、各 8 張 + PROMPTS.md
│   │   ├── journal/                 27 篇文章 cover + 16 inline + PROMPTS.md + README.md
│   │   ├── testimonials/            8 個客戶 headshot + PROMPTS.md + README.md
│   │   └── thanku/                  下單成功頁圖
│   ├── sitemap.xml             ← 31 + 19 = 50 URL（home/journal/products/clusters/legal）
│   ├── robots.txt
│   └── _redirects              ← Cloudflare Pages SPA fallback（如有）
│
├── scripts/              ← build / image / data pipeline
│   ├── optimize-images.js          sharp、PNG/JPG → AVIF + WebP
│   ├── strip-redundant-pngs.js     build 後刪 dist 大 PNG（picture 走 AVIF/WebP）
│   ├── generate-images.js          Gemini API 產圖（cover / inline / headshot）
│   └── tasks/                      生圖 task JSON
│       ├── journal-cover-tasks.json
│       ├── journal-inline-tasks.json
│       ├── product-real-tasks.json
│       └── testimonial-headshot-tasks.json
│
├── dist/                 ← npm run build 產物（gitignore）
├── node_modules/         ← (gitignore)
├── .git/, .github/, .claude/, .vscode/  ← (各 tool 自家)
```

---

## 🌐 Routing

| URL | Component | 備註 |
|---|---|---|
| `/` | `<About>`（01 本舍） | tab 預設 |
| `/?tab=products` | `<Products>` | 同 below、URL 認 `?tab=` |
| `/?tab=process` | `<Process>` | |
| `/?tab=shop` | `<Shop>` | 廣告 ad-friendly URL |
| `/products/:slug` | `<ProductDetail>` | 12 個產品個別頁 |
| `/products/concern/:slug` | `<CategoryListing>` | 7 個 TA cluster |
| `/journal` / `/journal/:slug` | `<JournalIndex>` / `<JournalPost>` | 27 篇 |
| `/cart` | `<Cart>` | 結帳 |
| `/order/:orderId` | `<OrderTracking>` | 自助查詢 |
| `/legal/:page` | `<Legal>` | privacy / returns / terms |
| else | `<NotFound>` | 404 + noindex |

---

## 🚦 Workflow / 安全規則

詳見 [CLAUDE.md](../CLAUDE.md) workflow section。

簡版：
- 預設工作分支 `journal-expansion`、現用 worktree 上 `claude/<...>`
- 主分支 `main` 永不直接 push、Cloudflare Pages auto-deploy from main
- 每次 merge main 要老闆娘 explicit「正式發佈」授權
- UI 改完跑 `npm run build && npm run preview`、用 Chrome MCP screenshot 驗

---

## 📂 不在 git 的東西

| 路徑 | 為什麼 |
|---|---|
| `.env` | secrets、Resend key / Worker token 等 |
| `node_modules/` | npm install 即可重建 |
| `dist/` | build artifact、可 regenerate |
| `~/Documents/jh_mk/knowledge_base/` | KB 是另一個 private GitHub repo、跨機器靠 git clone 同步 |

---

## 🔁 平行的 worktrees

我們用 git worktree 跑多個 session 並行：
```
~/Documents/goldenflower_site/
├── (本機 main worktree)
└── .claude/worktrees/
    ├── compassionate-napier-13103c/   ← 當前 session worktree
    └── 其他/                            ← 之前 session 留下、定期 cleanup
```
