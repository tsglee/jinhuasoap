# Nanobanana prompts — 我們二人 portraits

兩位夫妻檔的手繪寫生 portrait。共用 style trailer 鎖死視覺一致性，主體
段不同。Tool: Gemini 2.5 Flash Image (`models/gemini-2.5-flash-image`).

跑 prompt 的 script: [scripts/generate-portraits.js](../../../scripts/generate-portraits.js)

```bash
node scripts/generate-portraits.js          # 兩張一起跑
node scripts/generate-portraits.js wife     # 只跑老婆
node scripts/generate-portraits.js husband  # 只跑老公
```

需要 .env.local 裡有 `GEMINI_API_KEY`。

---

## 重要學到的事 — Nanobanana 行為觀察

1. **Single-line negative cue 不夠力**。第一次跑時 prompt 末尾寫了
   `no border frame, no decorative corners`，模型還是在 illustration 外圍畫了
   一圈 sepia 線條的方框。修正：把 no-border 規則 prepend 到 prompt 開頭、
   重複講、用 positive framing（"the paper itself IS the only edge"）。
2. **Likeness instruction 要明確**。第一次跑時老婆畫成長髮、老公沒戴眼鏡。
   修正：把 "SHORT haircut (chin-length bob or shorter, NOT long hair)"、
   "WEARING ROUND EYEGLASSES (clearly visible on his face)" 寫成大寫加括號
   排除清單。
3. **Mat board 雙色背景陷阱**。第二次跑時模型把 canvas 切成「中央深米色
   illustration paper + 外圍淺米色 margin」兩塊，視覺上像 illustration
   貼在 mat board 上的相框感。修正：在 NO_BORDER 段加 "the ENTIRE canvas
   is ONE single uniform beige paper color edge-to-edge — NO darker inner
   rectangle, NO lighter outer margin, NO mat board effect, NO inset panel"。

---

## wife.png — 研發的老婆大人（短髮）

Prepend the no-border rule, then style head, then subject. Live prompt is
in [generate-portraits.js](../../../scripts/generate-portraits.js)
`PROMPTS.wife`. Subject highlights:

- East Asian woman soap-maker, late thirties, **short bob haircut**
- Stirring small copper pot, three-quarter isometric from upper-left
- Counter: formula notebook + glass jars of dried botanicals + mortar
- Cedar-wood shelf above with curing soap bars
- Linen apron, sleeves rolled

## husband.png — 寫字的創作老公（戴眼鏡）

Same lead-in, then subject. Live prompt is `PROMPTS.husband`. Subject
highlights:

- East Asian man, late thirties, **wearing round eyeglasses**
- Writing with fountain pen at small wooden desk, three-quarter isometric
  from upper-right
- Desk: steaming coffee cup + stack of books + ink bottle + loose papers
- Pair of running shoes tucked under the desk
- Long-sleeve shirt, sleeves slightly rolled

---

## 風格鎖（共用 STYLE_HEAD + STYLE_TRAILER）

- Hand-drawn pen-and-ink line sketch
- Single warm sepia / amber-brown ink, no color fill, no shading blocks
- Raw linen beige #F0E8D8 paper background
- 1:1 square 1024×1024
- Style aligned with East Asian artisanal soap atelier illustration tradition
- Negative cues 全在 STYLE_TRAILER：no photograph / glossy AI render / color
  blocks / text / Chinese characters / logos / signature / 邊框 / frame /
  rectangular line / decorative corners

對齊基準：[journal/PROMPTS.md](../journal/PROMPTS.md) 共用前綴 +
products/ 資料夾既有 12 × 6 視角寫生風。如果新一次跑出來還飄，先看是不是
NO_BORDER 段被刪了，再考慮 prepend `Vector-style line illustration —`。
