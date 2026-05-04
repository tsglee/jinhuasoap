# 金花樓 · Goldenflower

A hand-pressed soap brand from Taipei. Brand site, deployed to **Cloudflare Workers Static Assets**.

---

## Picking up where we are

If you (or a fresh Claude session) are coming back to this project cold, this is everything you need to orient.

**Live URLs**
- Default: `https://jinhuasoap.tsghsunlee.workers.dev`
- Custom domain: `jinhuasoap.com` — registered on Cloudflare under `tsghsunlee@gmail.com`. **Attachment to the Worker is one click in the Cloudflare dashboard pending whenever you're ready.**

**Current state of the live site (latest on `main`)**
- Vite + React 18 build deployed on Cloudflare Workers Static Assets
- Push to `main` → auto-builds + deploys in ~60 seconds
- Cart is real — persisted to localStorage, "Request order" POSTs to `/api/order`, Worker emails via Resend, end-to-end test passed
- Mobile responsive (≤900 px breakpoint, hamburger nav, full-width cart)
- Paper tokens are in their **Phase J.3 ivory state**: `--paper #f8f5eb`, `--paper-2 #fcfaf2`, `--paper-3 #ece4d0` (owner-approved 暖色的象牙白)
- Shop tab is **online-only** — no physical stockists. Subtitle is the Chinese-only line about 3-day shipping + 7-11/全家 店到店付款
- SEO basics shipped (meta + JSON-LD `Organization` + favicon + robots + sitemap)
- All hand-drawn SVG illustrations still in place as photography placeholders

**Where to look first**
1. **This README** — architecture, file layout, deploy, secrets, conventions.
2. **[`VERSIONING.md`](VERSIONING.md)** — version rules（SemVer），rollback paths，Cloudflare vars vs. secrets 陷阱。
3. **`/Users/tsglee/.claude/plans/go-ahead-and-read-expressive-nygaard.md`** — full plan history, every decision the owner has locked in (with reasoning), execution log of every phase, open follow-ups.
4. **`public/images/README.md`** — the photography supply contract (filenames, aspect ratios, format specs, batch workflow).

**Open follow-ups (none blocking, all owner-side)**
1. **Attach `jinhuasoap.com`** to the Worker (Cloudflare dashboard click).
2. **Real photography** — drop batches into `public/images/` per the contract; I create a `photos-<batch>` branch and wire each batch up.
3. **Logo variant** — only the lily mark exists in code; §4 documents 7 aspirational variants.
4. **Plausible analytics** signup, **legal copy** (privacy / T&Cs / returns), **Resend domain verify** (so we can switch `ORDER_FROM_EMAIL` from `onboarding@resend.dev` to `noreply@jinhuasoap.com`), **OG image** (replace favicon fallback with a real 1200×630 PNG).

**Recently shipped (commit history on `main` is the source of truth)**
- `c4400f7` Phase J.3 — paper to `#f8f5eb` (owner-specified ivory)
- `e64f66b` Phase J.2 — paper toward 暖色的象牙白
- `503ede9` Phase I — `public/images/` scaffold + naming contract
- `bb57e75` Phase H + J.1 — Shop simplified to online-only (stockists deleted), paper tokens lifted
- `6c7114f` SEO basics
- `c19e9ad` Phase C — cart persistence + order endpoint
- `8cdc1f3` Phase B — full mobile responsive pass

Phase K (a SHIRO-style visual restyle on a `redesign-shiro` branch) was tried and **discarded** by owner choice. No trace on `main`. The branch-workflow we used is documented in §0.5 below — useful for any future redesign experiment.

---

## 0. Project layout

```
jinhuasoap/
├── README.md                  ← you are here
├── index.html                 ← Vite entry; static <head> with SEO meta + JSON-LD
├── package.json               ← npm scripts + deps
├── vite.config.js             ← Vite + React config
├── wrangler.jsonc             ← Cloudflare deploy config (Workers Static Assets)
├── .nvmrc                     ← Node 20
├── .eslintrc.cjs / .prettierrc
├── public/
│   ├── favicon.svg            ← simplified lily mark (also acts as OG fallback)
│   ├── robots.txt
│   ├── sitemap.xml
│   └── images/                ← real photography drops here per the contract
│       ├── README.md          ← filename + aspect-ratio + format spec
│       ├── products/          ← 12 product hero shots
│       ├── rituals/           ← 5 About-page lifestyle shots
│       ├── process/           ← 7 process step shots
│       └── ingredients/       ← 8 raw-material tiles
└── src/
    ├── main.jsx               ← React mount point
    ├── App.jsx                ← tab router + CartProvider
    ├── worker.js              ← Cloudflare Worker — POST /api/order → Resend
    ├── styles/
    │   ├── tokens.css         ← brand design tokens (paper / sumi / gold / red)
    │   ├── base.css           ← global reset + .mono / .italic / .tc utilities
    │   └── responsive.css     ← mobile-first overrides (≤900 px)
    ├── hooks/
    │   └── useIsMobile.js     ← matchMedia hook used by the header
    ├── state/
    │   └── CartContext.jsx    ← localStorage-backed cart state
    └── components/
        ├── Chrome.jsx         ← Header (with mobile hamburger), Footer
        ├── GoldenFlower.jsx   ← The house mark + Divider + PhotoPlaceholder
        ├── Illustrations.jsx  ← All hand-drawn SVG illustrations (placeholders for photos)
        ├── About.jsx          ← About tab — story, pillars, manifesto, 5 ritual bars
        ├── Products.jsx       ← Products tab — 12 bars, Add-to-basket
        ├── Process.jsx        ← Process & Ingredients tab — 7 steps, 8 ingredients, no-list
        └── Shop.jsx           ← Shop tab — online-only cart + order request form
```

### Local development

```bash
nvm use                    # Node 20 (per .nvmrc)
npm install
npm run dev                # Vite dev server at http://localhost:5173
npm run build              # produces dist/
npm run preview            # serves dist/ on http://localhost:4173
npm run lint               # ESLint
npm run format             # Prettier
```

To test the `/api/order` Worker locally: `npx wrangler dev` after `npm run build`. (The wrangler config points `assets.directory` at `./dist/` so you need a build first.)

### Deploy

Pushes to `main` auto-deploy via Cloudflare Workers' Git integration. Build settings live in the Cloudflare dashboard; the source of truth for runtime config is `wrangler.jsonc`. To trigger a redeploy without code changes, push an empty commit.

### 0.5 Branch workflow for experiments

For any non-trivial change — a redesign experiment, a photography batch wire-up, a copy overhaul — work on a feature branch, never directly on `main`. Cloudflare auto-builds a **preview URL for every branch push**, so the owner can review on a real device before the change touches production.

```bash
git checkout main && git pull
git checkout -b <branch-name>           # e.g. redesign-shiro, photos-products-batch-1, copy-overhaul
# … edit, build, push …
git push -u origin <branch-name>
```

Within ~60 s of the first push, the preview is live at:

```
https://<branch-name>-jinhuasoap.tsghsunlee.workers.dev
```

Note the **dash** between `<branch-name>` and `jinhuasoap` (not a dot). Cloudflare's Deployments tab in the dashboard always shows the canonical URL for each push.

After review, three outcomes:

- **Merge to main** → `git checkout main && git merge <branch-name> && git push` → site updates in ~60 s.
- **Discard** → `git checkout main && git branch -D <branch-name> && git push origin --delete <branch-name>`. Cloudflare auto-cleans the preview deployment when the branch disappears. Zero trace on `main`.
- **Cherry-pick** → keep some commits, drop others; `git checkout main && git cherry-pick <commit-hashes>`.

Photography batches and visual restyle experiments both use this workflow. The plan file documents the SHIRO-restyle Phase K experiment as a worked example (it was discarded after review — the right call, the editorial gold-ink voice is part of the brand identity).

### 0.6 桌面為主 + 手機補充的協作模式

**主要流程在桌面端 Claude Code**：多檔改動、改 UI、加套件、跑 build、debug 都是桌面做。Claude.ai 手機 App 只在「人不在電腦前但有小事要改」時用 — 例如改錯字、商品文案調整、緊急 rollback。

#### 桌面端（主要）
跟桌面 Claude Code 講需求 → Claude 開 feature branch + PR → 在本機跑 build / 打開 [branch preview URL](javascript:void(0))（`<branch>-jinhuasoap.tsghsunlee.workers.dev`）→ merge → Cloudflare auto-deploy。所有非 trivial 改動（多檔、改 UI 結構、build/deploy 設定、photography batch 接入、redesign）都走這條。

#### 手機 App（小事補充）
iPhone Claude.ai App + GitHub connector：

1. App 內對話：「幫我把首頁 X 改成 Y」（單檔文案、設定值、Journal 文章）
2. Claude 開 feature branch + PR
3. GitHub mobile App 看 PR，點 preview URL 確認，按 Merge

**適合手機的限度**：單一檔案的文案 / 設定改動、approve & merge PR、緊急 rollback（透過 Cloudflare dashboard 網頁版）。多檔重構、新 dependency、build 改動 — 留給桌面 session。

#### 通用規則
- 不論桌面 / 手機，所有改動走 PR（`main` 分支已啟用 branch protection，禁止直接 push）
- 重要 release 跟 Claude 喊「打 tag」走 [VERSIONING.md](VERSIONING.md) 流程
- 接入 jh_mk 知識庫：太太的做皂技術 wiki（`tsglee/goldenflower-soap-wiki`）已是 GitHub repo，桌面或手機 Claude 都可以加進 GitHub connector，寫教育型文案時抓 wiki 為事實來源

### 0.7 Operations playbook（出事怎麼救）

三個常見場景的 SOP。

**1. 網頁看起來壞了 / 掛了**

→ [VERSIONING.md](VERSIONING.md) Path A：Cloudflare Dashboard → Workers & Pages → `jinhuasoap` → Deployments → 找上一個正常的 deploy → 點 **Rollback**。即時生效，不用 push、不用等 build。

**2. 合併錯 PR 進 main**

→ 兩個選擇：
- GitHub web/mobile 開那個 PR → 點 **Revert** 按鈕 → 它會幫你開一個 revert PR → merge 即可。
- 或在桌面端 `git revert <commit-hash> && git push origin main`。

兩條路徑最後都觸發 Cloudflare 重新 deploy。**不要用 `git push --force` 直接抹掉 commit**，那會讓歷史不一致；revert 是 forward-only safe 的方式。

**3. 訂單 email 沒收到（Resend 出事）**

→ 排查順序：
- a. Cloudflare Dashboard → Workers & Pages → `jinhuasoap` → **Logs**（即時 tail），看 `/api/order` 有沒有 5xx 錯誤。
- b. 開 https://resend.com/emails，確認當天有沒有寄出紀錄。
- c. 如果使用者拿到「訂單編號 JH-XXX，我們稍後會主動聯繫」的訊息，代表 fallback 啟動了 — 訂單 payload 在 `ORDER_FALLBACK` KV namespace 裡（30 天 TTL）。在 Cloudflare Dashboard → Workers & Pages → KV → `gf-order-fallback` 用 prefix `order/` 撈出來，靠 `orderId` 比對 → 人工聯絡客戶 follow up。

> 訂單 fallback 機制：每筆訂單**先寫進 KV**再呼叫 Resend，寄信成功後刪 KV、寄信失敗就保留 KV。實作見 [src/worker.js](src/worker.js) `handleOrder()`、binding 見 [wrangler.jsonc](wrangler.jsonc)。

### Required Cloudflare dashboard secrets/vars

Set under your Worker → **Settings** → **Variables and Secrets**:

| Name | Type | Required | Notes |
|---|---|---|---|
| `RESEND_API_KEY` | Secret | yes | Resend API key. Without this, `/api/order` returns 500. |
| `ORDER_TO_EMAIL` | Plain | no | Defaults to `tsghsunlee@gmail.com`. |
| `ORDER_FROM_EMAIL` | Plain | no | Defaults to `onboarding@resend.dev` (Resend's shared sender). Switch to `noreply@jinhuasoap.com` after you verify the domain in Resend. |

---

## 1. Brand at a glance

| Field | Value |
|---|---|
| **Brand name (zh)** | 金花樓 |
| **Brand name (en)** | Goldenflower / Goldenflower Soap Works |
| **City** | Taipei · 艋舺 (Wanhua) |
| **Founded** | Spring 2026 (MMXXVI) |
| **Category** | Hand-pressed natural soap |
| **House mark** | A gold line-art lily (7 variants — see §4) |
| **Voice** | Quiet, slow, ceremonial. Bilingual zh-Hant + English. Cormorant italics for the lyrical line, Noto Serif TC for headlines, DM Mono for utility. |
| **Aesthetic reference** | SHIRO-style editorial product stills, Japanese paper texture, vertical Chinese typesetting, gold + 朱紅 + sumi ink. |

### 1.1 Design tokens (defined in `src/styles/tokens.css` `:root`)

```css
/* Paper / canvas — Phase J.3 ivory (was #ece3cf in the prototype) */
--paper:   #f8f5eb;    /* primary canvas — owner-approved 暖色的象牙白 */
--paper-2: #fcfaf2;    /* warmer surface (banded sections) */
--paper-3: #ece4d0;    /* deeper paper (About Five-Bars, Process ingredients) */

/* Ink */
--sumi:    #1a1512;    /* near-black text */
--ink-60:  rgba(26,21,18,0.6);
--ink-40:  rgba(26,21,18,0.4);
--ink-15:  rgba(26,21,18,0.15);   /* hairline borders */
--ink-08:  rgba(26,21,18,0.08);

/* Botanical / brand accents */
--clay:    #b4956b;    /* soap body */
--tea:     #4d6b4b;    /* botanical accent */
--red:     #8a2a22;    /* 朱紅 — accent / chops */
--red-2:   #6e2019;    /* deep chop red */
--gold-1:  #c69a3a;    /* primary gold ink */
--gold-2:  #e8cd78;    /* light gold (highlights) */
--gold-3:  #8a6420;    /* deep gold (shadows) */
```

If you change `--paper`, also update the **hardcoded `rgba(...)` paper-on-sumi text colours** in `src/components/Chrome.jsx` (footer + sticky header) and `src/components/Shop.jsx` (wholesale + newsletter section), plus the email template `background:` in `src/worker.js`. They're all near-duplicates of `--paper` for use on dark backgrounds and don't auto-cascade.

### 1.2 Type system

```
Headlines (zh)        Noto Serif TC, weight 400–500, letter-spacing 4–10px
Lyrical line (en)     Cormorant Garamond italic
Body (en)             Cormorant Garamond regular
Body (zh inline)      Noto Serif TC
Utility / labels      DM Mono, 10–11px, uppercase, letter-spacing 2–3px
```

Loaded via Google Fonts in the `<head>` of `index.html`. Convenience CSS classes (defined in `src/styles/base.css`):
- `.tc` → Noto Serif TC
- `.italic` → Cormorant Garamond italic
- `.mono` → DM Mono uppercase utility

---

## 2. Architecture

```
   ┌─────────────────────────────────────────────┐
   │ Cloudflare                                   │
   │  ─ Registrar (jinhuasoap.com)                │
   │  ─ DNS + global CDN + automatic TLS          │
   │  ─ Workers Static Assets — serves dist/      │
   │  ─ Worker (src/worker.js): POST /api/order   │
   └─────────────────────────────────────────────┘
                      │
                      ▼
             ┌──────────────────┐
             │  Resend          │  3k emails/mo free
             │  → tsghsunlee@   │
             │    gmail.com     │
             └──────────────────┘
```

**No VM, no nginx, no GitHub Actions to maintain.** Cloudflare's Git integration handles build + deploy on every push to `main`. Static assets are served straight from the edge; the Worker is only invoked for `/api/order` (and any other unknown path, which it falls through to assets via `env.ASSETS.fetch`).

### 2.1 React app

A standard Vite + React 18 build. Components live in `src/components/`, each one is a real ES module with named exports — no more window-globals. The brand mark + illustrations are inline SVG (no asset deps). Entry: `src/main.jsx` mounts `<App />` into `#root` inside `<React.StrictMode>` and pulls in the three CSS files (`tokens.css`, `base.css`, `responsive.css`).

### 2.2 State

| Key | Stored in | Purpose | Default |
|---|---|---|---|
| `gf_tab` | `localStorage` | Active tab (`about` / `products` / `process` / `shop`) | `about` |
| `gf_cart` | `localStorage` | Cart contents (array of `{num, zh, en, qty, price, tone}`) | `[]` |

Cart state lives in `src/state/CartContext.jsx` and is exposed via the `useCart()` hook. The cart count in the header, the Add-to-basket buttons in Products, the cart drawer in Shop, and the order-request form all share the same context.

### 2.3 The order endpoint

`POST /api/order` accepts a JSON body of shape `{ name, email, note?, cart: [...], total }`, validates it, and forwards a bilingual HTML+plaintext email to `tsghsunlee@gmail.com` (or whatever `ORDER_TO_EMAIL` is set to) via Resend. Reply-To is set to the customer so the brand can reply directly. Source: `src/worker.js`. No payments, no DB — this is the "checkout later" model from the launch plan.

### 2.4 Mobile responsive layer

The components were authored desktop-first with inline styles. `src/styles/responsive.css` adds mobile overrides at the `≤900 px` breakpoint via utility classes (`gf-stack-md`, `gf-h1-md`, `gf-cart-md`, etc.) using `!important` to win over the inline styles. The header swaps its desktop tab bar for a hamburger drawer at the same breakpoint via `useIsMobile()` (`src/hooks/useIsMobile.js`).

---

## 3. Site map (4 tabs)

### 3.1 About (`site/About.jsx`)

| # | Section | Notes |
|---|---|---|
| 1 | **Hero** | Vertical Chinese headline 「山中／一盞／**金花。**」 + lyrical English subtitle + body copy. Right column: `IllWorkbench` illustration framed by a thin gold rule + corner Wanhua chip. |
| 2 | **Three pillars** | 純手工 / 天然材料 / 慢製. Three columns inside a paper-warm band. |
| 3 | **Manifesto** | Vertical Chinese (`writing-mode: vertical-rl`) running「以天然之物 · 慢製一方肥皂 · 洗塵心 · **照夜夢**」beside a 2-column English manifesto. |
| 4 | **Five Bars · 五皂五境** | **NEWEST SECTION (replaced the 製皂四人 founders block).** Five soap **use-cases / rituals**, presented as one large hero tile + four smaller tiles in a 2×2 grid. See §3.1.1 for the data. |

#### 3.1.1 Five Bars data (just below the manifesto)

The hero (large tile) and the four secondary tiles all share the same shape: `kicker / zh / en / subtitle / tagline / body / tags[] / note (ritual)`.

| # | zh | en | Subtitle | Hero notes |
|---|---|---|---|---|
| **01** *(hero)* | 一塊走天下 | The All-in-One Bar | 髮 · 身 · 面 一塊搞定 | castile + oat milk + chamomile, pH 8.9, 105g, hair·face·body |
| 02 | 髮餅 | Hair Cake | 洗髮皂 · for the head | rice-water ferment + camellia + shikakai, ~60 washes, 90g cake |
| 03 | 洗面皂 | Face Bar | 洗臉用 · for the face | goat-milk + honey + azuki flour, fragrance-free, 60g |
| 04 | 沐浴皂 | Bathing Bar | 身體沐浴 · for the bath | olive + sweet almond + Pingtung yuzu peel, 120g |
| 05 | 運動皂 | Athlete's Bar | 運動後全身皂 · after the ride | activated charcoal + bentonite + peppermint + eucalyptus, 110g |

Every tile carries a `ritual —` italic line, set off by a 2px red left border, that describes a **moment of use** rather than a product feature. **Maintain that voice when extending.**

### 3.2 Products (`site/Products.jsx`)

12 bars, named for the months / the 十二花. Each is a `PRODUCTS` entry:

```js
{
  zh, en, lat,                 // Chinese name, English name, Latin botanical
  price,                       // NTD, integer
  tone,                        // 'rose' | 'mugwort' | 'osmanthus' | ...
  num,                         // Roman numeral
  notes: [...],                // 2-3 scent notes, lowercase
  family,                      // Floral | Herbal | Citrus | Spice | Wood | Earth | Mineral | Food
  pitchZh, pitchEn,            // 2-line poem (zh uses \n)
  staging,                     // 'bowl' | 'kraft' — passes through to IllProductHero
}
```

Layout: a filterable grid with editorial ad-style stills via `IllProductHero` (in `Illustrations.jsx`). **The 9 family chips at the top filter the grid.**

### 3.3 Process & Ingredients (`site/Process.jsx`)

7 steps:
```
I   採集   Gather       — sourcing oils, botanicals, spring water
II  浸泡   Steep        — botanicals into oil for 4 weeks
III 皂化   Saponify     — measured lye + oils, slow stir
IV  入模   Mould        — cedar moulds, 24h rest
V   切方   Cut          — single bars, hand-stamped 金花
VI  陳化   Cure         — 42 days on cedar racks
VII 包裹   Wrap         — kraft paper, gold thread, ship
```
Followed by an Ingredients section using `IllIngredient` tiles, and a "What we don't use" `IllNoList` tile.

### 3.4 Shop (`src/components/Shop.jsx`)

Online-only since Phase H. Map and 5-shop stockist list deleted (the brand has no retail partners yet; placeholder data was misleading). Three sections:

1. **Header** — kicker `線上購皂 · Shop online`, h1 `購皂`, plus a Chinese-only subtitle: `我們在收到訂單後，三個工作天內寄出 · 支援 7-11 與全家店到店付款`. The Chinese-only subtitle is an intentional break from the bilingual pattern — convenience-store pickup is a Taiwan-specific feature.
2. **Cart** — single centred 560 px column. Items live in `CartContext` (`src/state/CartContext.jsx`), persisted to `localStorage[gf_cart]`. Shipping rule: free over NT$1,200, otherwise NT$120. **"Request order"** button opens an inline form (name + email + optional note) that POSTs cart contents to `/api/order`. The Worker emails the brand owner via Resend; cart clears on success.
3. **Wholesale + Newsletter** at the bottom — both inert text/forms for v1. Wholesale references `wholesale@jinhuasoap.com`. Newsletter is a Coming Soon placeholder; if you wire it later, keep the same `gf_*` localStorage namespace for consistency.

The actual 7-11/全家 fulfilment stays manual: customer submits Order Request → owner replies to the Resend email to arrange shipment + 店到店 payment. A real ECPay / 綠界 integration is a separate future project.

---

## 4. The house mark — `<GoldFlower variant="…" />`

`site/GoldenFlower.jsx` exports a single `GoldFlower` component that renders 7 hand-drawn gold-line SVG variants. All SVGs are inline (no asset deps), use the gold gradient `gold-2 → gold-1 → gold-3`, and scale via the `size` prop (default 120).

| `variant` | Description | Best at |
|---|---|---|
| `lily-light` *(default)* | 5-petal lily — simplified outlines, 2 stamens | Header, favicon, small surfaces (≤56px) |
| `lily` | 5-petal lily — full botanical, veins, 4 stamens, throat shading | Hero / large surfaces (≥120px) |
| `bud` | Single tight bud on a stem with 2 leaves | Vertical compositions, certificates |
| `peony` | Layered round bloom (7 outer + 6 inner petals + center cluster) | Soft / feminine product lines |
| `plum` | Horizontal branch with 3 blossoms | Wide banners, hero strips |
| `sprig` | Minimal flower-head + 3 leaves | Favicons, app icons, very small marks |
| `medallion` | Original golden-flower medallion with 金 character | Stamps, packaging, certificates of authenticity |

**API:**
```jsx
<GoldFlower size={56} variant="lily-light" tone="gold" />
//   tone: 'gold' (default) | 'dark' (uses gold-3 ink) | 'red' (medallion only)
```

The selected variant is wired through `App → Header → GoldFlower (size=56)` and `App → Footer → GoldFlower (size=56, tone="dark")` so changing it via the Tweaks panel updates the entire site live.

**Picking the production mark:** the brand has not yet committed to one. Default is `lily-light`. Treat the others as alternates / sub-marks (e.g. `medallion` as a packaging stamp, `sprig` as the favicon, `lily` as the about-page hero). **Confirm with the brand owner before shipping.**

---

## 5. Illustration system — `site/Illustrations.jsx`

All illustrations are **inline SVG** with hand-stylised paper grain (radial gradient + dot pattern). No external image assets.

| Component | Purpose | Used by |
|---|---|---|
| `PaperBg` | Wraps every illustration in a textured paper card | (internal) |
| `IllPortrait` | Stylized founder silhouette | (was used by 製皂四人 — block now removed) |
| `IllSoap` | Soap bar still life (tone × flower variants) | About §3.1.1 (5 ritual bars), Products card thumbnails |
| `IllStep` | Process step illustration (`step="I"…"VII"`) | Process tab |
| `IllGiftBox` | Cedar gift box | About / Shop |
| `IllNoList` | Crossed-out bottles ("the no list") | Process tab — what we don't use |
| `IllWorkbench` | Founder at workbench, morning light | About hero |
| `IllIngredient` | Ingredient photo tile (SHIRO-style) | Process — ingredient grid |
| `IllProductHero` | Editorial product still — soap on stone, soap with kraft | Products grid |

`IllSoap` API used by the **Five Bars** section:
```jsx
<IllSoap
  tone="warm"   // 'warm' | 'cool' | 'deep'
  flower="rose" // 'rose' | 'mugwort' | 'chrysanthemum' | 'pine' | 'osmanthus'
  ratio="4/5"   // any css aspect-ratio
  label="…"     // human label, used in alt-style overlay
/>
```

When swapping in real photography, **keep the wrapper proportions** (`aspect-ratio`, the thin gold rule frame, the bottom mono caption chip) — they carry a lot of the brand feel.

---

## 6. Voice & copy guidelines

This is the part that's easy to ruin. A few rules to maintain:

1. **Bilingual, always.** Every headline gets a Chinese half (Noto Serif TC, wide tracking) and an English half (Cormorant italic).
2. **The lyrical line** is one sentence, italic, in `var(--gold-3)`. It sits between the kicker and the body. Keep it under 18 words.
3. **`ritual —` lines** describe a **moment of use**, not a product feature. They start lowercase, after the em-dash, and are styled `font-style: italic; padding-left: 14px; border-left: 2px solid var(--red);`. Keep this voice for any new product or scene block.
4. **Numbers that matter** (pH, gram weights, cure days, recipe years) belong in `.mono` chips with a hairline gold border.
5. **No emoji**, ever. No exclamation points. No marketing-speak ("amazing", "premium", "luxurious"). The brand voice is closer to a quiet shopkeeper than a brochure.
6. **Roman numerals** for steps and product numbers (`NO. 01`, `I — VII`).
7. **Dates as MMXXVI** for the founding year on chips and footer; otherwise plain western dates are fine.

---

## 7. Production status

This section used to be a TODO list for productionisation. Most of it has shipped — see `/Users/tsglee/.claude/plans/go-ahead-and-read-expressive-nygaard.md` for the full execution log of every phase, with reasoning.

### 7.1 Done

- ✅ Vite + React 18 build (replaces CDN+Babel prototype)
- ✅ ESM modules, ESLint, Prettier, .nvmrc (Node 20)
- ✅ Cart persisted to localStorage via `CartContext`; `Add to basket` wired
- ✅ Order request endpoint (`POST /api/order`) → Resend → Gmail (verified end-to-end with a test order)
- ✅ Mobile responsive pass (all tabs, hamburger nav, ≥44 px touch targets)
- ✅ Hosted on Cloudflare Workers Static Assets, push-to-deploy from `main`
- ✅ Domain `jinhuasoap.com` registered on Cloudflare Registrar
- ✅ SEO basics: title, meta description, OG/Twitter cards, JSON-LD `Organization`, favicon.svg, robots.txt, sitemap.xml
- ✅ **Phase H** — Shop tab simplified to online-only (stockists deleted, footer "Stockists" column → "Ship to" with `7-11 店到店 / 全家 店到店`, JSON-LD `LocalBusiness` removed)
- ✅ **Phase I** — `public/images/` folder + naming contract for real photography supply
- ✅ **Phase J.1 → J.3** — paper tokens lifted from `#ece3cf` → `#f4ecd7` → `#f7f3e7` → `#f8f5eb` (owner-tuned 暖色的象牙白, three iterations)
- ⏹ **Phase K** — SHIRO-inspired visual restyle attempted on `redesign-shiro` branch; **discarded** by owner choice. The editorial gold-ink voice is part of the brand identity and the experiment confirmed that. No trace on `main`. Branch workflow we used is documented in §0.5.

### 7.2 Open (owner sign-off, none blocking)

1. **Custom domain attachment** — `jinhuasoap.com` to the Worker (one Cloudflare-dashboard click).
2. **Real photography** — drop batches into `public/images/` per `public/images/README.md`. I create a `photos-<batch>` branch per batch, wire each up via a thin `Photo` wrapper that preserves the existing frame/caption.
3. **Logo variant** — currently the single lily mark in code. README §4 documents an aspirational 7-variant system. Confirm or expand.
4. **Legal copy** — privacy / T&Cs / returns. Blocks real payment integration, not the current site.
5. **Brand inbox** — set up `hello@jinhuasoap.com` via Cloudflare Email Routing (free, forward to Gmail) or Google Workspace ($6/user/mo).
6. **Verify `jinhuasoap.com` in Resend** — adds 3 DNS records to Cloudflare zone, then switch `ORDER_FROM_EMAIL` from `onboarding@resend.dev` to `noreply@jinhuasoap.com`.
7. **OG image** — currently using favicon.svg as placeholder; replace with a real 1200×630 PNG once product photography lands.

### 7.3 Future / nice-to-have

- **Plausible analytics** — sign up + add the snippet (~$9/mo managed, no cookie banner needed).
- **Journal / blog** — footer references it; no route yet.
- **Subscription product** — footer references it; no flow yet.
- **Real ecommerce** — current cart is "checkout later" via Resend email. A real ECPay / 綠界 / 歐付寶 integration for 7-11/全家 店到店付款 is a separate future project (weeks, not days).
- **i18n** — bilingual is currently baked into JSX; extract to a translation table only when ja/ko become real plans.
- **A11y audit** — SVG `<title>`/`aria-label`, cart focus-trap + ESC-to-close, contrast check on `gold-3` body copy.
- **Self-host fonts** — Noto Serif TC subsetting is non-trivial; revisit only if Lighthouse flags the Google Fonts hop.

### 7.4 Things NOT to change without asking

- The five-bar use-case structure in About (`§3.1.1`) — this is the most recent brand decision and the copy has been carefully tuned.
- The 7-variant logo system documented in `§4` — even though only `lily-light` is in code, the spec is the brand's eventual direction.
- The vertical Chinese typesetting in the manifesto — `writing-mode: vertical-rl` is intentional (and switches to horizontal only at the mobile breakpoint).
- The `ritual —` line treatment — it's the single most distinctive voice element on the site.

---

## 8. Quick reference

**Run locally:** `npm install && npm run dev`. Vite dev server at `http://localhost:5173`. Use `npm run dev -- --host` to serve over LAN for phone testing.

**Edit a section:**
- About story → `src/components/About.jsx`
- 12 product catalog → `PRODUCTS` array at top of `src/components/Products.jsx`
- 7 process steps → `steps` array inside `Process()` in `src/components/Process.jsx`
- 8 ingredients → `ingredients` array in `Process()`
- Cart / order form → `src/components/Shop.jsx`
- Logo / house mark → `src/components/GoldenFlower.jsx`
- Header / footer / mobile drawer → `src/components/Chrome.jsx`
- Design tokens (paper, ink, gold, red) → `src/styles/tokens.css`
- Mobile overrides (`gf-stack-md` etc.) → `src/styles/responsive.css`
- Order email template → `renderOrderEmailHtml` in `src/worker.js`
- SEO `<head>` (meta tags, JSON-LD) → `index.html`

**Add a new tab:**
1. Add an entry to `TABS` in `src/App.jsx`.
2. Create `src/components/<Tab>.jsx` exporting a named component.
3. Import + add the conditional render inside `<main>` in `src/App.jsx`.

**Change the default logo variant:** the current code only renders the lily mark via `GoldFlower size={...}`. To support the full 7-variant system from §4, extend `src/components/GoldenFlower.jsx` to switch on a `variant` prop and pass it through `Header`/`Footer`.

**Wire a photography batch:**
1. Owner drops files into `public/images/<category>/<name>.jpg` per the contract in `public/images/README.md`.
2. Create a branch: `git checkout -b photos-<batch>`.
3. Add a thin `<Photo>` wrapper at `src/components/Photo.jsx` (~20 lines, keeps the existing frame + caption chip; falls back to the SVG illustration if the file is missing).
4. Replace the relevant `IllSoap` / `IllProductHero` / `IllWorkbench` / etc. call with `<Photo src="/images/products/rose.jpg" alt="…" />`.
5. Push the branch → preview URL → owner reviews → merge → live.

**Spin up a redesign experiment:** see §0.5 (branch workflow). Short version: `git checkout -b redesign-<name>`, commit + push, preview URL is `https://redesign-<name>-jinhuasoap.tsghsunlee.workers.dev`. Owner reviews, then merge or `git push origin --delete`.

**Push to production:** `git push origin main`. Cloudflare auto-builds and deploys in ~60 seconds.

**When the next session starts cold:** read **Picking up where we are** at the top of this README, then `/Users/tsglee/.claude/plans/go-ahead-and-read-expressive-nygaard.md` for full decision history, then `public/images/README.md` if photography is involved.

---

*Pressed in Taipei. Handoff prepared 2026.*
