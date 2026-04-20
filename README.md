# 金花樓 · Goldenflower

A hand-pressed soap brand from Taipei. Brand site, deployed to **Cloudflare Workers Static Assets** at `https://jinhuasoap.com` (custom domain pending) and `https://jinhuasoap.tsghsunlee.workers.dev` (default).

> **History:** this repo started as a single-file CDN+Babel prototype handed off as a design package. It has since been migrated to a real Vite + React build, deployed on Cloudflare, with a Worker at `/api/order` for the "checkout later" order-request flow. The brand sections below (§1, §3–§6) are still the canonical brand reference; the architecture sections (§0, §2, §7, §8) have been updated for the production codebase.

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
│   ├── favicon.svg            ← simplified lily mark
│   ├── robots.txt
│   └── sitemap.xml
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
        ├── Illustrations.jsx  ← All hand-drawn SVG illustrations
        ├── About.jsx          ← About tab
        ├── Products.jsx       ← Products tab (12 bars, Add-to-basket)
        ├── Process.jsx        ← Process & Ingredients tab
        └── Shop.jsx           ← Shop & Stockists tab + cart + order form
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
--paper:   #ece3cf;    /* primary canvas */
--paper-2: #f4ecd7;    /* warmer surface */
--paper-3: #e0d5bd;    /* deeper paper */
--sumi:    #1a1512;    /* near-black text */
--ink-60:  rgba(26,21,18,0.6);
--ink-40:  rgba(26,21,18,0.4);
--ink-15:  rgba(26,21,18,0.15);   /* hairline borders */
--ink-08:  rgba(26,21,18,0.08);
--clay:    #b4956b;    /* soap body */
--tea:     #4d6b4b;    /* botanical accent */
--red:     #8a2a22;    /* 朱紅 — accent / chops */
--red-2:   #6e2019;    /* deep chop red */
--gold-1:  #c69a3a;    /* primary gold ink */
--gold-2:  #e8cd78;    /* light gold (highlights) */
--gold-3:  #8a6420;    /* deep gold (shadows) */
```

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

### 3.4 Shop & Stockists (`site/Shop.jsx`)

Three components:
1. **Cart drawer** — slide-in from the right; uses local React state. Items match products by zh name. Shipping rule: free over NT$1,200.
2. **Stockists list** — 5 Taipei shops with addresses, hours, neighbourhoods. Filterable by city chip (currently only Taipei is populated; "All" is the default).
3. **Newsletter / journal CTA**.

```
CART_ITEMS (initial cart for the prototype):
  · 玫瑰 × 1
  · 桂花 × 2
  · 艾草 × 1

STOCKISTS (5 shops, all Taipei):
  · 金花樓本店       — 艋舺 (Wanhua) flagship
  · 小器藝廊         — 中山
  · 富錦樹台菜香檳   — 民生社區
  · 朋丁              — 中山
  · 永心堂            — 永康街
```

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

This section used to be a TODO list for productionisation. Most of it has shipped — see `/Users/tsglee/.claude/plans/go-ahead-and-read-expressive-nygaard.md` for the full launch plan and execution log.

### 7.1 Done

- ✅ Vite + React 18 build (replaces CDN+Babel prototype)
- ✅ ESM modules, ESLint, Prettier, .nvmrc (Node 20)
- ✅ Cart persisted to localStorage via `CartContext`; `Add to basket` wired
- ✅ Order request endpoint (`POST /api/order`) → Resend → Gmail
- ✅ Mobile responsive pass (all tabs, hamburger nav, touch targets)
- ✅ Hosted on Cloudflare Workers Static Assets, push-to-deploy from `main`
- ✅ Domain `jinhuasoap.com` registered (custom-domain attachment pending)
- ✅ SEO basics: title, meta description, OG/Twitter cards, JSON-LD
  Organization + LocalBusiness, favicon, robots.txt, sitemap.xml

### 7.2 Open before launch (owner sign-off needed)

1. **Logo variant** — currently hardcoded to the lily mark; the README originally proposed 7 variants but only the lily exists in code. Confirm or expand.
2. **Real photography** to replace `IllSoap`, `IllProductHero`, `IllWorkbench`, `IllStep`, `IllIngredient` (per the original §7.1 shot list — 12 product stills, 5 ritual lifestyle shots, founder-at-workbench, 7 process steps, ingredient grid).
3. **Real stockist data** — verify the 5 Taipei addresses in `STOCKISTS` (`src/components/Shop.jsx`).
4. **Legal copy** — privacy policy, T&Cs, returns/refund policy. Owner-reviewed text needed; not blocking deploy but blocking real commerce.
5. **Brand inbox** — set up `hello@jinhuasoap.com` via Cloudflare Email Routing (free, forward to Gmail) or Google Workspace ($6/user/mo).
6. **Verify `jinhuasoap.com` in Resend** — adds 3 DNS records to Cloudflare zone, then we switch `ORDER_FROM_EMAIL` from `onboarding@resend.dev` to `noreply@jinhuasoap.com`.
7. **OG image** — currently using favicon.svg as placeholder; replace with a 1200×630 PNG once real photography lands.

### 7.3 Future / nice-to-have

- **Plausible analytics** — sign up + add the snippet (≈$9/mo managed, no cookie banner needed).
- **Journal / blog** — footer references it; no route yet.
- **Subscription product** — footer references it; no flow yet.
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
- Cart / stockists / order form → `src/components/Shop.jsx`
- Logo / house mark → `src/components/GoldenFlower.jsx`
- Header / footer / mobile drawer → `src/components/Chrome.jsx`
- Design tokens → `src/styles/tokens.css`
- Mobile overrides → `src/styles/responsive.css`
- Order email template → `renderOrderEmailHtml` in `src/worker.js`

**Add a new tab:**
1. Add an entry to `TABS` in `src/App.jsx`.
2. Create `src/components/<Tab>.jsx` exporting a default component.
3. Import + add the conditional render inside `<main>` in `src/App.jsx`.

**Change the default logo variant:** the current code only renders the lily mark via `GoldFlower size={...}`. To support the full 7-variant system from §4, extend `src/components/GoldenFlower.jsx` to switch on a `variant` prop and pass it through `Header`/`Footer`.

**Push to production:** `git push origin main`. Cloudflare auto-builds and deploys in ~60 seconds.

---

*Pressed in Taipei. Handoff prepared 2026.*
