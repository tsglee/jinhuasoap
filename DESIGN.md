---
name: 金花樓 Goldenflower
description: An ink-wash handscroll for a two-person mountain soap studio — ivory paper, pine-soot ink, a single cinnabar seal.
colors:
  paper: "#f8f5eb"
  paper-raised: "#fcfaf2"
  paper-aged: "#ece4d0"
  ink: "#1a1512"
  ink-muted: "#1a151299"
  cinnabar: "#8a2a22"
  cinnabar-deep: "#6e2019"
  gold: "#c69a3a"
  gold-light: "#e8cd78"
  gold-dark: "#8a6420"
  clay: "#b4956b"
  tea-green: "#4d6b4b"
typography:
  display:
    fontFamily: "Cormorant Garamond, Noto Serif TC, serif"
    fontSize: "clamp(2.75rem, 7vw, 5rem)"
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: "0.06em"
  headline:
    fontFamily: "Noto Serif TC, serif"
    fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)"
    fontWeight: 500
    lineHeight: 1.35
    letterSpacing: "0.04em"
  body:
    fontFamily: "Noto Serif TC, serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.9
    letterSpacing: "0.06em"
  label:
    fontFamily: "DM Mono, monospace"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "1.5px"
rounded:
  sharp: "0"
  hairline: "2px"
spacing:
  xs: "8px"
  sm: "14px"
  md: "24px"
  lg: "48px"
  xl: "96px"
components:
  button-primary:
    backgroundColor: "{colors.cinnabar}"
    textColor: "{colors.paper}"
    rounded: "{rounded.sharp}"
    padding: "16px 28px"
    typography: "{typography.body}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.sharp}"
    padding: "10px 18px"
  button-outline-added:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.cinnabar}"
    rounded: "{rounded.sharp}"
    padding: "10px 18px"
  chip-filter:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.sharp}"
    padding: "8px 16px"
  input-field:
    backgroundColor: "{colors.paper-raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sharp}"
    padding: "12px 14px"
---

# Design System: 金花樓 Goldenflower

## 1. Overview

**Creative North Star: "The Ink-Wash Handscroll (山居手卷)"**

The site unrolls like a literati ink-wash handscroll. The ground is unbleached
paper; the marks are pine-soot ink; the brand signs itself once, in cinnabar, the
way a painter presses a seal; gold leaf catches the light only where it matters.
Nothing hurries. The reader moves through it at reading pace — a two-person
mountain studio's forty-two-day patience, made into a surface you scroll.

This is a **brand** system: the design *is* the product. It serves a self-care
regular who buys for themselves and returns — so the work is to make the slow
craft *felt* and the path back to a favourite bar calm, not to run a conversion
funnel. The register's discipline is **quietly premium**: restraint is the luxury.
Space, hairlines, and one well-placed seal-red do the talking; the page never
raises its voice.

It explicitly rejects the four nearby cliffs: the **generic e-commerce** grid of
boxed product cards and sale badges; the **drugstore promo** wall of discounts and
"100% 天然!"; the **clinical cosmetic-science** look of lab-white and
ingredient-percentage charts; and **trendy startup minimalism** (big geometric
sans, gradient blobs). It also stays clear of the **editorial-magazine reflex** —
this serif is a Traditional-Chinese literati voice, not italic-display-plus-mono-
label cosplay.

**Key Characteristics:**
- Warm ivory paper ground with a faint ink-dot grain and three soft radial glows.
- Pine-soot ink for text; a single cinnabar seal-red for the one thing that matters.
- Three type voices, each with one job: Cormorant Garamond (Latin/numerals),
  Noto Serif TC (the Chinese voice), DM Mono (quiet uppercase labels).
- Flat by default. Depth comes from hairline borders and gold dotted rules, never
  drop shadows. The only "lift" is a slow image zoom on hover.
- Near-square edges (0–2px). Forms read as pressed bars and pressed seals.
- Products are presented as alternating editorial rows, not a card grid.

## 2. Colors

A scholar's-desk palette: unbleached paper, soot ink, a cinnabar seal, gold leaf,
with clay and tea-green carried in from the botanicals. Warmth lives in the hue,
never in loudness.

### Primary
- **Cinnabar Seal** (`#8a2a22`): the brand's single accent. The active nav
  underline, the one primary action (送出訂購), the kicker dashes, the price on a
  product page. Pressed once, like a 朱印 seal — its rarity is the point.
- **Cinnabar Deep** (`#6e2019`): the pressed/hover state of the seal red.

### Secondary
- **Gold Leaf** (`#c69a3a`) / **Lamplight Gold** (`#e8cd78`): the logo, hairline
  flourishes, the faint top glow on the paper. Light catching gilt, not a fill.
- **Gold Ink** (`#8a6420`): the workhorse gold for small uppercase kickers and
  dotted provenance rules (`.edu-label`, `.edu-block`). Darker, so it reads on paper.

### Tertiary
- **Clay** (`#b4956b`) and **Tea Green** (`#4d6b4b`): botanical notes drawn from the
  花材. Used sparingly for series cues and illustration accents, never as UI fills.

### Neutral
- **Warm Ivory** (`#f8f5eb`): the body ground. Unbleached paper, *not* a tinted
  near-white "for elegance" — a committed, culturally specific ivory.
- **Raised Paper** (`#fcfaf2`): lifted surfaces — input fields, the tier bar, inset panels.
- **Aged Paper** (`#ece4d0`): hairline borders, dividers, the browser theme-color.
- **Pine-Soot Ink** (`#1a1512`): all primary text. Carried at 60/40/15/8% opacity
  (`--ink-60…08`) for secondary text, captions, hairlines, and ghost fills.

### Named Rules
**The Single Seal Rule.** Cinnabar appears on ≤10% of any screen and never as a
large fill — one active nav mark, one primary button, the price, the kicker dash.
If two cinnabar elements compete on a screen, one is wrong.

**The Warmth-in-Hue Rule.** Warmth is carried by the paper's hue and the gold, never
by raising saturation or shouting. A louder screen is an off-brand screen.

## 3. Typography

**Display / Latin Font:** Cormorant Garamond (with Noto Serif TC, serif fallback)
**Body / Chinese Font:** Noto Serif TC (300–900)
**Label / Mono Font:** DM Mono (300–500)

**Character:** A literati hand. Cormorant lends Latin numerals and Roman caps
("NT$", "JIN HUA LOU", 壹貳參) an old-print elegance; Noto Serif TC carries the
Chinese voice with the weight range to whisper (300) or state (500–700); DM Mono is
the quiet clerk that labels things in tracked uppercase. The pairing reads as
*considered*, never decorative.

### Hierarchy
- **Display** (500, `clamp(2.75rem, 7vw, 5rem)`, lh 1.12, tracking +0.06em): hero
  and page titles (山中一盞金花, 購皂, 本舍手工皂). CJK display uses *positive* wide
  tracking — characters breathe apart; this is the inverse of Latin display.
- **Headline** (500, `clamp(1.6rem, 3.5vw, 2.4rem)`, lh 1.35): section titles.
- **Body** (400, 15px, lh 1.9, tracking +0.06em): prose and the 本舍小記 journal. The
  generous 1.9 line-height is the unhurried pace; keep CJK measure ~28–36 字 per line.
- **Label** (DM Mono 400, 12px, uppercase, tracking 1.5px): the `.mono` kicker, nav
  numerals (01–05), prices, metadata. The 10px gold `.edu-label` is its smaller sibling.

### Named Rules
**The Three-Hand Rule.** Three faces, three jobs — Cormorant for Latin/numerals,
Noto Serif TC for Chinese, DM Mono for labels. Never set Chinese in a fourth face;
never set body copy in DM Mono.

**The Em-Dash Rule.** The brand's voice breathes with the full-width em-dash (──) and
the full-width middot separator (　·　). Those are intentional CJK typography, not
stray whitespace — preserve them.

## 4. Elevation

This system is **flat**. Surfaces sit directly on the paper; there are essentially no
drop shadows. Depth is built from three things instead: **hairline borders**
(1px `--ink-15` / aged-paper), **gold dotted rules** above provenance blocks
(`border-top: 1px dotted var(--gold-3)`), and the **paper itself** — a fixed ink-dot
grain (`body::before`, 4px radial dots at 5% ink) plus three soft radial glows in
gold, clay, and cinnabar. The only motion-borne lift is a slow image zoom on hover.

### Named Rules
**The Flat Paper Rule.** Surfaces are flat at rest. If you reach for a `box-shadow`
to separate two things, use a hairline, a gold dotted rule, or whitespace instead.
A shadowed card here reads as a foreign object.

**The Slow-Zoom Rule.** Imagery is the one element allowed to move: `transform: scale`
to ~1.04–1.08 over 400–700ms `ease-out` on hover. No other element animates layout.

## 5. Components

### Buttons
- **Shape:** square (0 radius). Buttons read as pressed bars, not pills.
- **Primary** (`button-primary`): cinnabar fill (`#8a2a22`), ivory text, ~16×28px
  padding, wide tracking. Exactly one per screen — the cart's 送出訂購 / 送出·NT$X.
- **Outline** (`button-outline`, the 加入購物籃 add-to-cart): transparent ground,
  1px pine-soot border, ink text, 10×18px (md) / 9×14px (sm), tracking 3px.
- **Added state:** on add, border + text flip to cinnabar on raised-paper with a
  "已加入購物籃 ✓" flash for ~1.4s, then settle. Transitions 200ms.
- **Disabled (取貨約訂):** 0.5 opacity, not-allowed cursor — for made-to-order bars.

### Chips (category filters)
- **Style:** transparent ground, 1px hairline border, ink label, square edges; the
  按膚況挑 / 全部 filters. Selected = ink border darkens / fills toward ink.
- Used as a quiet filter row, never as loud "pills."

### Cards / Containers
- **Used sparingly — by deliberate exception.** Products are **alternating editorial
  rows** (image one side, copy the other), *not* a card grid. The genuine card
  surfaces are the cart panel, the journal index tiles, and the order-tracking panel.
- **Corner:** square to 2px. **Background:** raised paper inside hairline borders.
  **Shadow:** none (see Elevation). **Padding:** generous (24–48px on desktop).

### Inputs / Fields
- **Style:** raised-paper ground, 1px hairline border, square edges, ~12×14px padding,
  body type with a placeholder that clears 4.5:1 (never light gray).
- **Focus:** border shifts toward ink / cinnabar; no glow.
- **Error:** inline cinnabar message beneath the field; the form keeps every value.

### Navigation
- **Top bar:** five numbered tabs (01 本舍 … 05 本舍小記) in DM Mono; active tab carries
  a cinnabar underline. A slim promo line and the logo sit above.
- **Mobile (<900px):** the tab row collapses into a hamburger that opens a full
  five-item menu; the icon toggles to an ✕. Cart + order-query icons stay in the bar.

### Signature — TierNotice & the Pressed Seal
- **TierNotice:** a single quiet bar — "滿 NT$1,000 享 9 折　·　本島滿 NT$500 免運" — with a
  live cinnabar progress line ("再買 NT$60 即享 9 折"). Information, never a promo banner.
- **The seal/logo** (金花樓 in a gold cartouche) is the recurring brand mark; treat it
  as the painter's seal, placed, not scattered.

## 6. Do's and Don'ts

### Do:
- **Do** keep cinnabar to one element per screen (The Single Seal Rule). Let the
  active nav, the one primary button, or the price carry it — never two at once.
- **Do** stay flat: hairline borders, gold dotted rules, and whitespace for
  separation; the only motion is the slow image zoom (400–700ms ease-out).
- **Do** preserve the em-dash (──) and full-width middot (　·　); they're the voice.
- **Do** present products as alternating editorial rows; reserve cards for the cart,
  journal, and order panels.
- **Do** keep body copy at ≥4.5:1 on the ivory paper. Push secondary text toward
  `--sumi`, not lighter — `--ink-60` on paper is the AA watch-point.
- **Do** honour `prefers-reduced-motion`: the hover zoom and any reveal need an
  instant / crossfade fallback.

### Don't:
- **Don't** turn the shop into **generic e-commerce** — no boxed product-card grid,
  no sale badges, no "Add to cart" sameness. Rows, not boxes.
- **Don't** add **drugstore mass-market promo** energy: loud discounts, busy banners,
  "100% 天然!" clichés.
- **Don't** drift **clinical / cosmetic-science**: no lab-white surfaces, no
  ingredient-percentage charts, no dermatology-brand coldness. (Also legal: no
  medical or efficacy claims, per 化妝品法規.)
- **Don't** slide into **trendy startup minimalism**: no big geometric sans, no
  gradient blobs, no interchangeable 2020s look.
- **Don't** use a **gradient on text** (`background-clip: text`) — emphasis comes from
  weight, size, or the single seal-red.
- **Don't** use **side-stripe borders** (a `border-left`/`right` > 1px as a colored
  accent). Use a full hairline, a gold dotted rule, or a leading numeral instead.
- **Don't** add **drop shadows** or glassmorphism to lift a surface — that's a foreign
  object on this paper (The Flat Paper Rule).
- **Don't** scaffold every section with a tiny uppercase tracked eyebrow or 01/02/03
  number unless it's a real sequence (the eight-step 製皂 flow earns its numbers; an
  About section does not).
