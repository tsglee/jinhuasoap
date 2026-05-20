# Nanobanana prompts — 12 產品 × 8 視角 = 96 張

每個產品 8 張不同角度的圖，會在 02 十二花 與 04 購皂的 carousel 裡輪播 + 點擊放大。

## 共用前綴（風格控制）

跟 [journal/PROMPTS.md](../journal/PROMPTS.md) 同調，但比例改 1:1：

```
Editorial product photo, East Asian artisanal soap atelier mood,
soft natural daylight, low saturation warm neutral palette
(raw linen beige, ink black, muted gold #C8A24A, charcoal),
shallow depth of field, 1:1 aspect ratio, 1200×1200, no people,
no text, no logos, no modern packaging, slight grain, materials:
aged wood tabletop, raw linen cloth, ceramic saucer.
```

## 8 視角指令模板

```
Subject: a hand-pressed natural soap bar of {{產品名}}, rectangular
shape (105 g), surface tone {{色調}}, with embedded {{核心原料視覺}}.
Composition: {{ANGLE}}.
```

8 個 ANGLE：

1. `front-on hero shot, centered on raw linen, soft directional light from upper-left, single bar`
2. `45-degree three-quarter angle, slight tilt, ceramic saucer beneath, side rim light`
3. `macro close-up of surface texture filling the frame, shallow DOF, dust of {{原料粉}} visible`
4. `top-down flat lay arrangement: soap bar + raw {{花材}} + small bottle of {{油}} + linen napkin folded`
5. `cross-section view of a cut bar showing inner colour and embedded particles, on a wooden block`
6. `damp soap bar with single bubble forming on edge, dark slate background, dramatic side light`
7. `wrapped in unbleached kraft paper tied with twine, sealed with red wax stamp (no logo), beside an extra unwrapped bar`
8. `lifestyle scene: bathroom corner with brass dish, folded towel, soft window light, soap as hero`

## 12 產品變數

填進上面 ANGLE 1-8 中的 `{{...}}`：

| 產品名 | 色調 | 核心原料視覺 | 原料粉 | 花材 | 油 |
|---|---|---|---|---|---|
| 海棠修復 · 碧玉 | deep jade-green to muddy-brown | tiny dark green tamanu nuts | tamanu powder | dried calophyllum leaves | tamanu oil (deep green) |
| 槐花蜜潤 · 霧蜜 | warm honey-cream | honeycomb fragments and amber drips | honey crystals | dried sophora japonica blossoms | local honey jar (amber) |
| 綠豆清芳 · 澡豆 | pale beige with green flecks | mung bean powder grains | mung bean powder | whole dried mung beans | olive oil (light golden) |
| 藍蝶清瑩 · 蝶豆 | deep blue to purple gradient | dried butterfly pea petals | butterfly pea petal dust | dried butterfly pea flowers | butterfly pea infused oil (blue tint) |
| 金盞舒緩 · 長金 | golden orange with petal flecks | calendula petals embedded | calendula petal dust | dried calendula flower heads | calendula infused olive oil (golden) |
| 稻花暖心 · 星米 | soft cream with pale yellow tone | rice bran specks | rice bran powder | a small bundle of rice stalks with grains | rice bran oil (pale gold) |
| 杜康醉月 · 酒粕 | ivory cream with amber streaks | sake lees fragments | sake lees powder | a small ceramic sake cup with rice grains | rice bran oil (golden) |
| 桂月流金 · 桂花 | cream with tiny orange flecks | osmanthus petals | osmanthus petal dust | a sprig of dried osmanthus flowers | osmanthus infused olive oil (pale gold) |
| 山茶淨髮 | olive-green with pale brown undertones | camellia oil sheen, hair-bar shaped (rounder, flatter) | camellia oil residue | dried camellia flower | camellia oil (light green-amber) |
| 茉莉沐膚 | cream-white with tiny yellow flecks, body-bar shape | jasmine petal dust | jasmine flower powder | fresh jasmine flowers | jasmine infused base (pale) |
| 一皂到底 · 清爽款 | pale lavender-grey | jojoba oil sheen and dried lavender flecks | dried lavender powder | dried lavender stems | jojoba oil (pale gold) |
| 一皂到底 · 保濕款 | warm cream-ivory | smooth uniform surface (no embedded particles) | — | — | jojoba oil + olive oil mix |

> 「一皂到底 · 保濕款」目前 subtitle 待你定，原料也可調整。

## 流程

1. 開 Google AI Studio → 選 Nanobanana / Gemini Image。
2. 對每個產品：
   - 共用前綴 + ANGLE 1（hero）→ 產 → 滿意就存
   - 換 ANGLE 2 ~ 8 連產 7 張
   - 期間記得保持同一個產品的 prompt context（讓模型維持風格一致）
3. 一個產品 8 張存成：
   ```
   public/images/products/<產品中文名>/01.png   ← ANGLE 1 hero
   public/images/products/<產品中文名>/02.png   ← ANGLE 2
   ...
   public/images/products/<產品中文名>/08.png   ← ANGLE 8
   ```
   產品中文名直接用「海棠」「霧蜜」「綠豆」「蝶豆花」「金盞花」「大米」「酒粕」「桂花」「山茶淨髮」「茉莉沐膚」「一皂到底清爽」「一皂到底保濕」這 12 個資料夾名稱（已建好）。
4. 全部到位後跑 `npm run optimize:images` 產 AVIF + WebP。
5. 我會把 [products.js](../../../src/data/products.js) 每個產品的 `photos` 陣列填好 8 張：
   ```js
   photos: [
     '/images/products/海棠/01.png',
     '/images/products/海棠/02.png',
     ...
     '/images/products/海棠/08.png',
   ]
   ```

## 風格一致性提示

- 一個產品 8 張之間，**色調 / 光影 / 木桌紋路** 要看起來像同一場拍攝
- 不同產品之間，**整體色彩 grading 一致**（暖中性、低飽和、金米墨黑）
- 避免：白背景影棚感、銳利反光、現代品牌包裝、寫實人臉、文字浮水印
- 一塊純色冷壓皂的形狀比模型自由發揮的有機塊要好認。可以強調「edge slightly chamfered, hand-pressed, not machine-cut」。
