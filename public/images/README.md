# Goldenflower — image supply contract

This folder is where real photography lives once it's shot. Drop files here following the names + aspect ratios below, push the commit, and the matching component will render the photo in place of its SVG illustration.

**You don't have to shoot everything at once.** Drop images in any batch order. Each new batch ships as its own commit. Any file that isn't here yet falls back to the existing SVG illustration — no broken images.

---

## Folder layout

```
public/images/
├── README.md           ← this file
├── products/           12 bars
├── rituals/            5 About-page lifestyle shots
├── process/            7 step shots
├── ingredients/        8 raw-material tiles
├── landingmedia/       hero motion (MP4 for the About banner)
├── founder.jpg         About hero
├── giftbox.jpg         About + Products
└── og-image.jpg        social share card (1200×630)
```

---

## Naming contract

### `products/` — 12 bars

Names come from the lowercase English name in `src/components/Products.jsx`'s `PRODUCTS[]` array. Kebab-case for multi-word names. **Aspect 4:5 portrait, ~1600×2000 px.**

| File | Product |
|---|---|
| `rose.jpg` | 玫瑰 / Rose |
| `mugwort.jpg` | 艾草 / Mugwort |
| `pomelo.jpg` | 柚子 / Pomelo |
| `camellia.jpg` | 茶花 / Camellia |
| `turmeric.jpg` | 薑黃 / Turmeric |
| `osmanthus.jpg` | 桂花 / Osmanthus |
| `white-plum.jpg` | 白梅 / White Plum |
| `hinoki.jpg` | 檜木 / Hinoki |
| `raw-honey.jpg` | 蜂蜜 / Raw Honey |
| `sea-salt.jpg` | 海鹽 / Sea Salt |
| `moss.jpg` | 青苔 / Moss |
| `marigold.jpg` | 金盞花 / Marigold |

### `rituals/` — 5 About-page ritual bars

Names come from the 5 use-case bars in About §3.1.1. **Aspect 4:5 portrait, ~1600×2000 px.**

| File | Bar |
|---|---|
| `all-in-one.jpg` | NO. 01 · 一塊走天下 / All-in-One |
| `hair-cake.jpg` | NO. 02 · 髮餅 / Hair Cake |
| `face-bar.jpg` | NO. 03 · 洗面皂 / Face Bar |
| `bathing-bar.jpg` | NO. 04 · 沐浴皂 / Bathing Bar |
| `athletes-bar.jpg` | NO. 05 · 運動皂 / Athlete's Bar |

### `process/` — 7 step shots

Roman numeral + kebab-case English step name from `src/components/Process.jsx`. **Aspect 4:3 landscape, ~1600×1200 px.**

| File | Step |
|---|---|
| `i-gather.jpg` | I · 採集 / Gather |
| `ii-render.jpg` | II · 煉油 / Render |
| `iii-mix-the-lye.jpg` | III · 調鹼 / Mix the lye |
| `iv-pour.jpg` | IV · 入模 / Pour |
| `v-cut.jpg` | V · 切皂 / Cut |
| `vi-cure.jpg` | VI · 慢熟 / Cure |
| `vii-seal.jpg` | VII · 封蠟 / Seal |

### `ingredients/` — 8 raw-material tiles

Exact `kind` key from `src/components/Process.jsx`'s `ingredients` array. **Aspect 1:1 square, ~1200×1200 px.**

| File | Ingredient |
|---|---|
| `olive.jpg` | 橄欖油 / Olive oil |
| `coconut.jpg` | 椰子油 / Coconut oil |
| `castor.jpg` | 蓖麻油 / Castor oil |
| `water.jpg` | 山泉水 / Spring water |
| `lye.jpg` | 食用鹼 / Sodium hydroxide |
| `botanical.jpg` | 花材 / Botanicals |
| `salt.jpg` | 海鹽 / Sea salt |
| `honey.jpg` | 蜂蜜 / Raw honey |

### Single-file shots (top level)

| File | Aspect | Replaces | Used on |
|---|---|---|---|
| `founder.jpg` | **3:4 portrait**, ~1500×2000 px | `IllWorkbench` | About hero |
| `giftbox.jpg` | **4:3 landscape**, ~1600×1200 px | `IllGiftBox` | About + Products |
| `og-image.jpg` | **exactly 1200×630 px** | favicon fallback | Social share preview (Open Graph / Twitter Card) |

### `landingmedia/` — hero motion

A short, silent, looping video plays full-bleed at the top of the About (home) tab — the first thing a visitor sees. One file at a time; the About component hard-codes the path.

| File | Aspect | Used on |
|---|---|---|
| `Animated_Ocean_and_Cloud_Video.mp4` (current) | 16:9 landscape, ≤2 MB, H.264, silent | About hero banner |

- **Format:** MP4 (H.264, yuv420p). Silent — the element is muted and has no controls.
- **Length:** 5–12 s, designed to loop seamlessly.
- **Size:** keep it under ~2 MB. The banner autoplays on every visit — big files punish mobile users.
- **Swapping the file:** drop the new MP4 in this folder, then update the `<video src>` in [src/components/About.jsx](../../src/components/About.jsx). No build config to touch.

---

## Format specs

- **Format:** JPEG. PNG only if transparency is genuinely required (shouldn't be, for product photography).
- **Quality:** ~85%. Balance between file size and visible compression.
- **Colour profile:** sRGB. Avoid Adobe RGB / ProPhoto — they shift muddy in browsers.
- **Max dimension:** ~1600 px on the long edge (OG image is the exception at 1200×630). Going bigger wastes bandwidth — the site never displays anything larger.
- **Target file size:** under ~500 KB each. A well-compressed 1600×2000 JPEG should be ~200–400 KB.
- **Orientation:** respect the aspect ratios above. The wrappers (gold hairline frame, corner marks, mono caption chip) are built around them; different ratios break the layout.

---

## How a batch ships

1. You drop files into the right folder.
2. `git add public/images/…`
3. Tell me which batch you've added.
4. I create a feature branch (`photos-<batch-name>`).
5. I update the matching components to point at the new image paths — preserving the gold hairline frame, corner marks, and mono caption chip around each photo (those carry a lot of the brand feel; see README §5).
6. Push branch → Cloudflare builds a preview URL automatically → you review on a real device → merge to `main` → live in ~60 s.

---

## Accessibility

Every image gets proper `alt` text, derived from the existing `label` fields in the components (e.g., `"all-in-one bar · oat milk + chamomile"`). Non-negotiable — screen readers, Google image search, and slow networks all need it.

---

## Fallback behaviour

If an expected image is missing (e.g., you shot Rose but not Mugwort yet), the component falls back to its existing SVG illustration. No broken image icons. This is wired into the `<Photo>` wrapper I'll add the first time a batch lands.
