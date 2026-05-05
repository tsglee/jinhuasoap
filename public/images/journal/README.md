# Journal cover photography contract

每一篇 `本舍小記` 文章配一張 cover 照片。檔案命名跟 slug 對齊。

## 命名規則

```
public/images/journal/<slug>.jpg
public/images/journal/<slug>.webp   ← 後續 sharp script 自動產
```

`<slug>` 對應 `src/components/Journal.jsx` POSTS 陣列裡每篇的 slug。例：
- `three-oils.jpg`
- `skin-ph-acid-mantle.jpg`
- `cold-vs-hot-process.jpg`

## 規格

| 項目 | 值 | 為什麼 |
|---|---|---|
| 比例 | **4:3**（橫式） | thumbnail 卡片 + article hero 共用 |
| 尺寸 | **1200×900** | 高 DPR 螢幕清晰、不過份肥 |
| 格式 | JPG（quality 80%）+ WebP | JPG 通用、WebP 輕量 |
| 檔案大小 | < 250 KB（JPG）/ < 120 KB（WebP） | 行動網路友善 |
| 色彩 | sRGB | 跨裝置一致 |

## Alt text 怎麼寫（SEO 與無障礙）

每篇文章的 `cover.alt` 在 `Journal.jsx` 已經寫好範本。**真照片到位後，請審視 alt 還精準** ── 如果照片內容跟原本想像差，要改 alt 對應到實際畫面。

寫法：**具體場景 + 關鍵字 + 氛圍**

✅ 好：「工坊木桌上的橄欖油與椰子油，金黃色的下午光斜斜照進來」
❌ 差：「圖片」「相片」「金花樓 cover」

## 照片風格指引（給之後拍攝者）

對齊全站既有 SHIRO-style 編輯感：
- 自然光、不打閃燈
- 木桌、米色 / 象牙白 / 灰白背景
- 物件少而具體（一塊皂、一支油、一張紙）
- 色調偏暖：金、米、墨黑
- 不擺直視鏡頭的人臉
- 產品旁可帶植材碎片、紙條、紙絲

## 還沒到位前怎麼辦

`Journal.jsx` 對每篇文章都有 `cover.fallback`，是 `IllSoap` SVG illustration variant。`<img>` 找不到實際檔案會 onError 切到 fallback ── 不會破版。等你 drop 進真照片，重新 build / deploy 後自動套用。

## 跟 `public/images/README.md` 的關係

那是品牌主視覺攝影 contract（products / rituals / process / ingredients）。Journal 是文章插圖，獨立一條 contract，不跟主視覺照片混。
