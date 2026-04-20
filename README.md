# 金花樓 · Goldenflower — Design Handoff

A hand-pressed soap brand from Taipei. This package contains a complete, working HTML/React prototype of the brand site and is ready for handoff to **Claude Code** (or any front-end dev) to be productionised.

---

## 0. What's in the box

```
design_handoff_goldenflower_site/
├── README.md                       ← you are here
├── Goldenflower Site.html          ← entry point — open this in a browser
└── site/
    ├── App.jsx                     ← tab router + Tweaks panel + logo state
    ├── Chrome.jsx                  ← Header, Footer, announcement bar, tab nav
    ├── GoldenFlower.jsx            ← The house mark — 7 SVG variants + helpers
    ├── Illustrations.jsx           ← All hand-drawn SVG illustrations
    ├── About.jsx                   ← About tab (story, manifesto, 5 ritual bars)
    ├── Products.jsx                ← Products tab (12 bars, ad-style stills)
    ├── Process.jsx                 ← Process & Ingredients tab (7 steps)
    └── Shop.jsx                    ← Shop & Stockists tab (cart + 5 Taipei shops)
```

To preview: open `Goldenflower Site.html` directly in any modern browser. No build step.

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

### 1.1 Design tokens (defined in `Goldenflower Site.html` `:root`)

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

Loaded via Google Fonts in the `<head>` of `Goldenflower Site.html`. Convenience CSS classes:
- `.tc` → Noto Serif TC
- `.italic` → Cormorant Garamond italic
- `.mono` → DM Mono uppercase utility

---

## 2. Architecture (current prototype)

This is a **single-file HTML prototype** that loads React 18 + Babel from CDN and a sequence of `<script type="text/babel">` JSX files from `site/`. There is no bundler.

### 2.1 Load order (declared in `Goldenflower Site.html`)

```
1. React + ReactDOM + Babel (CDN, pinned + integrity-hashed)
2. site/GoldenFlower.jsx     ← exports GoldFlower, PhotoPlaceholder, Divider to window
3. site/Illustrations.jsx    ← exports Ill* components to window
4. site/Chrome.jsx           ← exports Header, Footer to window
5. site/About.jsx            ← exports About to window
6. site/Products.jsx         ← exports Products to window
7. site/Process.jsx          ← exports Process to window
8. site/Shop.jsx             ← exports Shop to window
9. site/App.jsx              ← root — renders into #root
```

Each JSX file ends with `Object.assign(window, { ... })` because each `<script type="text/babel">` gets its own scope after Babel transpilation. **When porting to a real bundler (Vite / Next), replace the `window` exports with real ES `export`s and `import` from each file.**

### 2.2 State

Two pieces of app state live in `App` and persist to `localStorage`:

| Key | Purpose | Default |
|---|---|---|
| `gf_tab` | Currently active tab (`about` / `products` / `process` / `shop`) | `about` |
| `gf_logo` | Currently selected logo variant (see §4) | `lily-light` |

The cart in `Shop.jsx` uses local React state only — **not yet persisted**; see §7 (Productionisation TODO).

### 2.3 Tweaks panel (design-time only)

`App.jsx` implements the host's `__activate_edit_mode` / `__deactivate_edit_mode` postMessage protocol. When tweaks are active, a panel docked bottom-right lets the operator cycle through the 7 logo variants. **Strip this entirely for production** — see §7.

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

## 7. Productionisation TODO (for Claude Code)

A prioritised list of what to do next.

### 7.1 Required for production

1. **Convert from CDN React + Babel to a real bundler** (Vite + React 18 recommended; or Next.js if SSR/SEO matters — the site is content-heavy and bilingual, so SSR is probably worth it).
   - Replace `window.X = X` exports in every JSX file with real ESM `export`s.
   - Move design tokens out of inline `<style>` and into a CSS module / Tailwind config.
   - Self-host fonts (Noto Serif TC, Cormorant Garamond, DM Mono) for performance and offline support; don't rely on Google Fonts at runtime.
2. **Strip the Tweaks panel** (entire `TweaksPanel` component in `App.jsx`, plus the `__edit_mode_*` postMessage listener and the `EDITMODE-BEGIN/END` JSON block). Pick **one** logo variant and hard-code it.
3. **Replace illustrations with real photography** for the Products grid and the Five Bars section. The illustration components are placeholders — they were drawn to set the layout and tone. Keep the wrappers (frame, chip, caption). Recommended shot list:
   - 12 product hero stills (one per bar in `PRODUCTS`)
   - 5 use-case lifestyle shots (one per ritual bar in About §3.1.1)
   - 1 founder-at-workbench shot (replaces `IllWorkbench` in About hero)
   - 7 process step shots (replaces `IllStep` in Process)
   - 1 ingredient grid (replaces `IllIngredient` × N in Process)
4. **Wire the cart to a real backend** (Shopify Storefront API, Stripe, or whatever the brand picks). The current `Shop.jsx` cart is local React state. Add localStorage persistence at minimum. Implement: add / remove / update qty / shipping calc / checkout handoff.
5. **Real stockist data.** The 5 Taipei shops in `STOCKISTS` are placeholder names — verify with the brand. Add proper geocoding if a map view is wanted.
6. **i18n properly.** The current site bakes both languages into the JSX. Extract to a translation table (e.g. `react-i18next`) keyed by zh-Hant / en, so future locales (ja, ko) are cheap.
7. **SEO + meta.** Per-tab `<title>`, OG image (use `medallion` variant rendered to PNG), structured data for products.
8. **Accessibility.** Audit:
   - All SVG illustrations need real `<title>` / `aria-label`.
   - Tab nav in `Header` should be a real `<nav>` with proper `aria-current`.
   - Cart drawer needs focus trap + ESC to close.
   - Color contrast for `gold-3` on `paper` is borderline — verify WCAG AA for body copy.

### 7.2 Nice to have

- **Mobile design.** The current prototype is desktop-first (1280 max-width; multi-column grids). All sections need mobile breakpoints; the hero typography especially will need scaling rules.
- **Journal / blog.** Footer references "Journal" but no route exists.
- **Subscription product.** Footer references "Subscription" but no flow exists.
- **Dark mode.** The brand's sumi/paper palette is monochrome enough that an inverted dark mode could be elegant. Optional.
- **Print stylesheet** for product pages (cards, tasting notes — feels on-brand for this house).

### 7.3 Things NOT to change without asking

- The five-bar use-case structure in About (`§3.1.1`) — this is the most recent brand decision and the copy has been carefully tuned.
- The 7 logo variants in `GoldenFlower.jsx` — keep them all, even if only one is shipping. They're a system.
- The vertical Chinese typesetting in the manifesto — `writing-mode: vertical-rl` is intentional.
- The `ritual —` line treatment — it's the single most distinctive voice element on the site.

---

## 8. Quick reference

**Run locally:** open `Goldenflower Site.html` in a browser. That's it.

**Edit a section:**
- About story → `site/About.jsx`
- 12 product catalog → `PRODUCTS` array at top of `site/Products.jsx`
- 7 process steps → `steps` array inside `Process()` in `site/Process.jsx`
- Cart / stockists → `site/Shop.jsx`
- Logo / house mark → `site/GoldenFlower.jsx`
- Header / footer / tab nav → `site/Chrome.jsx`
- Design tokens → `:root` block in `Goldenflower Site.html`

**Add a new tab:**
1. Add an entry to `TABS` in `App.jsx`.
2. Create a new `site/<Tab>.jsx` exporting the component to `window`.
3. Add a `<script type="text/babel" src="site/<Tab>.jsx"></script>` to `Goldenflower Site.html` *before* `App.jsx`.
4. Add the conditional render in `App.jsx`'s `<main>`.

**Change the default logo variant:** edit the `TWEAK_DEFAULTS.logoVariant` value at the top of `App.jsx` (or, post-Tweaks-removal, hard-code the prop on `<Header>` and `<Footer>`).

---

*Pressed in Taipei. Handoff prepared 2026.*
