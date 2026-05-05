# Nanobanana prompts — 本舍小記 cover images

9 篇文章各 1 張 cover。共用前綴控制風格一致，主視覺指令各自不同。

## 共用前綴（每張都帶）

```
Editorial still life photo, East Asian artisanal soap atelier mood,
soft overhead natural daylight from a north-facing window,
low saturation warm neutral palette (raw linen beige, ink black,
muted gold #C8A24A, charcoal), shallow depth of field, 4:3 aspect
ratio, 1200×900, no people, no text, no logos, no modern packaging,
slight grain, materials: aged wood tabletop, raw linen cloth,
ceramic saucer, dried botanicals.
```

## 各篇主視覺指令

接在共用前綴後面，告訴 Nanobanana 要畫什麼。

### 1. botanical-design-truth — 加了牛奶咖啡就會變好用？植萃設計的真相
```
Subject: a single plain pale-green hand-pressed soap bar sitting
elegantly on raw linen at left, while at right scattered tiny piles
of dry botanical powders (matcha, coffee grounds, dried flower petals)
and small glass vials look messy and over-decorative. The contrast
visually argues "less is more — the formula matters more than the
herbs sprinkled on top".
```

### 2. ins-value — INS 值，老闆娘看配方第一個看的數字
```
Subject: a hand-written formula sheet on aged paper showing oil names
in black ink with numbers next to them, beside it a small abacus
corner, a glass measuring cylinder half-full of golden olive oil,
and a slim drafting pencil. Reads like a soap-maker's working notes.
```

### 3. cold-vs-hot-process — 冷製、熱製、融化再造，為什麼我們堅持冷壓
```
Subject: three soap bars in a row on a long wood plank, distinctly
different textures — left bar smooth matte cream-coloured (cold
process), middle bar slightly glossy darker amber (hot process),
right bar with visible re-melted swirls and tiny chunks (re-batch).
Side warm light reveals each surface honestly.
```

### 4. skin-ph-acid-mantle — 臉、身體、頭髮的清潔密碼
```
Subject: a pH paper strip arranged in a gradient from yellow (acidic)
to blue (alkaline) curving across the wood surface, alongside a small
glass dropper, a single soap bar, and a tiny clear bottle of toner.
Quietly didactic mood, like a science still life.
```

### 5. yes-palm — 為什麼我們也用棕櫚油
```
Subject: a heavy cluster of fresh red-orange oil palm fruits resting
on the wood, beside a clear bottle of golden-amber palm oil and a
small folded paper card with a wax seal (suggesting certification)
on top. Warm, honest, agricultural.
```

### 6. trace — Trace 是判斷的時刻
```
Subject: top-down macro shot of pale soap batter mid-stir in a stainless
bowl, a wooden spoon being lifted out leaving a smooth ribbon trail
across the surface — the precise moment of "trace". Slight steam,
soft window light catching the ribbon's edge.
```

### 7. saponification — 油遇到鹼，就成了皂
```
Subject: two clear glass beakers side by side on the wood — left holds
a column of golden olive oil, right holds clear lye solution mid-pour
meeting the oil with a faint cloudy interface forming. Side light
turns the meeting line luminous. Quiet chemistry.
```

### 8. ffa-five-forces — 脂肪酸與五力
```
Subject: five small clear glass apothecary bottles in a tight row,
each holding a different oil with distinct colour (deep green olive,
golden coconut, amber palm, pale rice bran, dark sesame). A small
unmarked wood tag sits in front of each bottle. Library-of-oils mood.
```

### 9. three-oils — 本舍用什麼油
```
Subject: three taller bottles standing on raw linen — leftmost amber
glass with golden olive oil, centre frosted glass with pale coconut
oil, rightmost clear glass with deep amber palm oil. A small wooden
spoon and a single dried bay leaf rest in front. Foundational,
ceremonial.
```

## 流程

1. 開 [Google AI Studio](https://aistudio.google.com/) 選 Nanobanana / Gemini Image
2. 複製「共用前綴」+ 「主視覺指令」貼進去產
3. 不滿意就重 roll 直到風格吻合（建議一張平均 roll 3-5 次）
4. 下載 PNG，存成 `public/images/journal/<slug>.png`（slug 列在每段標題裡，例如 `three-oils.png`）
5. 全部到位後跑 `npm run optimize:images` 自動產 AVIF + WebP
6. 我會把 [Journal.jsx](../../../src/components/Journal.jsx) 每篇的 `cover.src` 從 fallback 改指向新檔，並按實際畫面微調 alt
