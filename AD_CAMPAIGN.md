# 金花樓 · 廣告投放手冊（第一輪 · NT$500 試水溫）

> 用法：你 follow 這份 spec 在 Google Ads 後台建 campaign、跑 5 天、每天 5 分鐘
> 截 2 張 dashboard 進 chat 給我、我直接 update 這份文件「Daily Log」section
> + 回你具體調整指令。文件本身就是 single source of truth。

> 開始於：2026-05-21 · 目標部署日 Day 1
> 帳號：**燦果文化**（金花樓母公司、MCC manager）
> Conversion action: `AW-18179582977/VZRdCPbji7EcEIHY2dxD`（Jinhuasoap Order）

---

## 📍 目前狀態

- ✅ Conversion tracking pipeline 完整串通（preview 驗到 6 個 Google Ads beacon）
- ✅ Production live：`AW-18179582977` gtag library + Cart.jsx purchase event
- ⏳ **下一步：你照 Day 1 Spec 建 campaign（status: paused）→ 我 review → 你按 enable**

---

## 🧪 Day 0 ── 開跑前 Pre-flight Check

**絕對先做**：

1. **無痕視窗**進 `https://jinhuasoap.com`
2. F12 → Network tab → filter `doubleclick`
3. 真實下一筆假測試訂單（金額多少都 OK）
4. Success 頁顯示後、Network 應該看到：
   ```
   POST googleads.g.doubleclick.net/pagead/conversion/18123111692/?...
   ```
5. **看到** → conversion fire 機制 OK、可以下 Day 1
6. **沒看到** → 跟我說、我 debug（極不可能、preview 已驗）

---

## 1️⃣ Day 1 · Campaign 整體設定

| 欄位 | 值 |
|---|---|
| 廣告活動類型 | 搜尋 (Search) |
| 目標 | 「在沒有目標指引的情況下建立廣告活動」→ 網站造訪 |
| URL | `https://jinhuasoap.com` |
| 廣告活動名稱 | `金花樓_試水溫_Search_NT500` |
| 出價策略 | 盡量爭取點擊 (Maximize clicks) |
| CPC 上限 | **NT$15** ✅ 勾選「設定每次點擊出價上限」|
| 廣告聯播網 | ❌ 取消「搜尋夥伴」+「多媒體聯播網」（只跑 Google search）|
| 地區 | 台北市、新北市、桃園市、新竹市、新竹縣（**只**這 5 個）|
| 地區 targeting 模式 | 「目標位置中的使用者」（不選「對該位置感興趣」）|
| 語言 | 繁體中文 |
| 受眾客層 | 年齡 25-64、女性 +15% bid adjustment |
| 每日預算 | **NT$100/日** × 5 天 = NT$500 |
| 廣告排程 | 週一-週日、11:00-23:00（避開深夜冷流量）|
| 裝置出價調整 | 平板 -100% / Mobile +0% / Desktop +0% |

---

## 2️⃣ Ad Group A · 敏感肌主打

**Final URL**: `https://jinhuasoap.com/products/concern/sensitive`

### 15 Headlines（每條 ≤ 30 字）

```
1.  敏感肌的手工皂｜林口本舍
2.  不再洗完臉緊繃｜冷製皂
3.  瓊崖海棠修復 NT$380
4.  八週熟成 · 配方扎實
5.  走過皮膚科藥膏的人都試過
6.  天然冷製 · 無皂鹼香精
7.  異位、乾癢、敏感肌適用
8.  林口小批手作 · 限量
9.  一塊皂洗到底·不再瓶瓶罐罐
10. 已 1000+ 敏感肌回購
11. 加 LINE 客製洽詢
12. 金花樓 · 林口手工皂舍
13. 義大利橄欖油 + 乳油木果脂
14. 配方師親自把關
15. 滿 NT$1000 免運
```

### 4 Descriptions（每條 ≤ 90 字）

```
1. 每週手壓一批冷製天然皂，瓊崖海棠、霧蜜、金盞花，皆為敏感肌設計，八週熟成不刺激。
2. 林口本舍 · 夫妻檔小批手作。配方師親自設計脂肪酸比例，給走過皮膚科的人一塊安心的皂。
3. 不打療效、不放香精。義大利橄欖油 + 乳油木果脂為底，敏弱、痘痘、修護期都能用。
4. 滿 NT$1000 免運 · 全省宅配。加 LINE @jinhuasoap 客製洽詢。
```

### 12 Keywords（全用 Phrase Match · 加雙引號）

```
"敏感肌 手工皂"
"異位性 沐浴"
"敏感肌 洗面皂"
"無皂鹼 沐浴"
"異位性皮膚炎 推薦"
"敏感肌 推薦"
"皮膚科 手工皂"
"敏感肌 不刺激"
"瓊崖海棠 皂"
"金花樓"
"金花樓 手工皂"
"林口 手工皂"
```

---

## 3️⃣ Ad Group B · 產品識貨族

**Final URL**: `https://jinhuasoap.com/products/concern/mature`

### 15 Headlines

```
1.  瓊崖海棠修復皂 · 碧玉
2.  八週熟成 · 105g NT$380
3.  義大利橄欖油 · 乳油木果脂
4.  冷製天然 · 不含香精皂鹼
5.  林口手工皂舍 · 金花樓
6.  配方師親調 · 五力指標
7.  看得到的成分 · 透明配方
8.  敏感肌專用 · 已 1000+ 回購
9.  限量小批 · 每週一壓
10. 滿千免運 · 全省宅配
11. 十二款手工皂 · 四個系列
12. 部落客評過 30+ 款最推這個
13. 不靠花俏添加物 · 配方扎實
14. 加 LINE @jinhuasoap 詢問
15. 一月一方 · 一皂一花
```

### 4 Descriptions

```
1. 瓊崖海棠油 + 義大利橄欖油 + 乳油木果脂，脂肪酸比例經配方師設計，八週熟成。
2. 不靠花俏添加物包裝「天然」，配方扎實是部落客評過 30+ 款最推薦的原因。
3. 12 款配方分四系列：花神守護、花韻時節、花露淨髮餅、全能日常。每塊冷製手壓 42 日。
4. 林口本舍 · 夫妻檔小批手作。加 LINE @jinhuasoap 客製節禮 · 婚禮諮詢。
```

### 12 Keywords

```
"冷製皂 推薦"
"天然手工皂 推薦"
"無香精 沐浴"
"無添加 手工皂"
"成分扎實 手工皂"
"純橄欖 手工皂"
"乳油木果脂 手工皂"
"瓊崖海棠油"
"洗髮餅 推薦"
"沐浴餅 推薦"
"植萃手工皂"
"台灣 冷製皂"
```

---

## 4️⃣ Ad Group C · 換季 / 乾癢場景

**Final URL**: `https://jinhuasoap.com/products/concern/baby`

### 15 Headlines

```
1.  換季手腳乾癢嗎？
2.  試試一塊冷製手工皂
3.  林口本舍 · 為敏弱肌設計
4.  霧蜜潤膚皂 NT$300
5.  槐花蜜 · 深層保濕
6.  不緊繃、不刺、不癢
7.  走過皮膚科的人都試過
8.  八週熟成 · 無皂鹼
9.  已 1000+ 敏感肌回購
10. 滿千免運 · 全省宅配
11. 冬天手破適用
12. 異位濕疹友善
13. 寶寶哺乳期可用 · 無香精
14. 配方師親自把關
15. 加 LINE @jinhuasoap 諮詢
```

### 4 Descriptions

```
1. 換季皮膚乾癢、洗完緊繃、藥膏依賴？試一塊霧蜜潤膚皂，槐花蜜 + 乳油木果脂深層保濕。
2. 林口本舍每週手壓一批冷製天然皂，八週熟成。給走過皮膚科的人一塊真的能日常用的皂。
3. 寶寶哺乳期、產後敏感、過敏體質都試過。配方師親自設計、不打療效、扎實安心。
4. 滿 NT$1000 免運 · 加 LINE @jinhuasoap 客製洽詢節禮 / 婚禮 / 月子禮。
```

### 11 Keywords

```
"換季 乾癢"
"冬天 手破"
"乾癢 沐浴"
"癢 推薦"
"異位濕疹"
"寶寶 沐浴"
"哺乳期 沐浴"
"月子 手工皂"
"產後 敏感"
"小腿 乾癢"
"皮膚 緊繃"
```

---

## 5️⃣ Campaign-level Negative Keywords（**必加 · 救你 50% 預算**）

設定路徑：廣告活動 → 關鍵字 → 「否定關鍵字」分頁 → 廣告活動層級新增

```
# 自己做的人（不會買成品）
教學
DIY
課程
材料
配方
製作
皂基
模具
打皂機
攪拌
氫氧化鈉
燒鹼
冷製課程
手工皂教學

# B2B（NT$500 不打）
工廠
批發
代工
OEM
ODM
量產
工作室
開店
創業
證照
證書

# 不是市場
二手
免費
試用
樣品
贈品

# 競品品牌（你不想跟人家搶這個字）
阿原
茶山房
青井
unicorn
mihong
南僑
椿
法朋
台灣茶摳

# 不相關
日本
韓國
泰國
韓劇
化妝品
保養品
精華液
面膜
乳液
身體乳

# 求職類
工作
徵才
job
履歷
```

---

## 6️⃣ Assets（免費、必加、CTR 翻倍）

### Sitelinks（6 條）

| 顯示文字 | URL |
|---|---|
| 02 十二花全系列 | `/?tab=products` |
| 04 線上購皂 | `/?tab=shop` |
| 敏感肌專欄 | `/journal` |
| 客戶心得 | `/?tab=shop` |
| 客製節禮 婚禮 | `https://lin.ee/7m167md` |
| 訂單查詢 | `/order` |

### Callouts（10 條）

```
八週熟成
冷製天然
配方師親調
義大利橄欖油
林口小批手作
無香精皂鹼
滿千免運
全省宅配
敏感肌專用
限量手壓
```

### Structured Snippets

- Header: **Types**（系列）
- Values: `花神守護、花韻時節、花露淨髮餅、全能日常`

### Image Assets（4 張、從 repo 抓）

- `public/images/products/海棠/01.png`
- `public/images/products/金盞花/01.png`
- `public/images/products/霧蜜/01.png`
- `public/images/products/桂花/01.png`

### Promotion Asset

- 促銷類型：**滿 NT$1,000 免運**
- 詳情：`本島 滿 NT$1,000 免運`

---

## 7️⃣ 操作順序 Walkthrough（30 分鐘）

```
ads.google.com → 左側「廣告活動」→ + 新增

1. 「在沒有目標指引的情況下建立」→「搜尋」→「網站造訪」+ URL
2. 名稱：金花樓_試水溫_Search_NT500
3. 出價策略：盡量爭取點擊 + CPC cap NT$15
4. 取消勾「搜尋夥伴」+「多媒體聯播網」
5. 地區：台北/新北/桃園/新竹 + 「目標位置中的使用者」
6. 語言：繁體中文
7. 預算：NT$100/日
8. 排程：11:00-23:00 週一到日
9. 裝置：平板 -100%
10. 受眾客層：25-64、女性 +15%

→ 建 Ad Group A「敏感肌主打」、貼 15+4+12 個 + Final URL
→ 建 Ad Group B「產品識貨族」、貼 15+4+12 個 + Final URL
→ 建 Ad Group C「換季場景」、貼 15+4+11 個 + Final URL

→ 回 Campaign 層級
   - 否定關鍵字：貼那 50+ 個
   - Assets：Sitelinks + Callouts + Snippets + Image + Promotion

→ Campaign status：「暫停」(paused)
→ 截圖整個 campaign overview 給我 review
```

---

## 8️⃣ Pre-launch Checklist（我 review 你的截圖時看這 7 項）

- [ ] CPC cap = NT$15
- [ ] 預算 = NT$100/日
- [ ] 地區 = 只北部 5 個（不能有「全台灣」）
- [ ] 否定字 ≥ 50 個
- [ ] 排程 = 11:00-23:00
- [ ] 平板 = -100%
- [ ] 廣告聯播網 = **沒勾** 搜尋夥伴 + 多媒體

7 個 ✅ → 你按 enable → 開跑。

---

## 9️⃣ Day 2-5 · 每日優化協定

### 每天早上 5 分鐘（你做的事）

1. 進 [ads.google.com](https://ads.google.com)
2. 截兩張 screenshot：
   - **A. 廣告活動總覽**（顯示昨天 spent / clicks / CTR / conversions / CPC）
   - **B. 搜尋字詞報表**（廣告活動 → 關鍵字 → 搜尋字詞、看實際 user query）
3. 兩張貼到我們這個 chat
4. 一句話：「Day 2 數據」/「Day 3 數據」...

### 我做的事

- 讀截圖、提取數字、update 這份文件的「📊 Daily Log」section（commit + push）
- 回你具體 adjust：
  - 「把字 X / Y / Z 加進否定字（燒錢 0 轉換）」
  - 「Ad Group B 的 headline #3 pause（CTR 0.5% 太低）」
  - 「Ad Group A bid +20%（轉換最好、加碼）」
  - 「Mobile 比 Desktop 貴 2x、Mobile 出價 -20%」
- 你照建議在後台調整、回我「改完了」就行

---

## 🔟 Day 6 · 復盤

### 截整段 5 天總數據給我（兩張）：
1. **廣告活動報表**（時間範圍：過去 5 天）
2. **搜尋字詞 report**（過去 5 天）

### 我會 update 文件的「📈 Day 6 Retrospective」section、含：
- 5 天 spent / clicks / impressions / CTR / avg CPC / total conversions / conversion rate
- 哪個 ad group 表現最好、為什麼
- 哪些 search terms 帶來轉換、加進下一輪
- 哪些 search terms 燒錢無轉換、永久 negative
- 哪些 headlines 表現好、保留
- 哪些 descriptions 表現差、改寫
- **下一輪建議**：要不要加碼預算？換什麼 channel？要不要做 landing page？

---

## 📊 Daily Log（我會逐日更新這 section）

> Format: 數字從你截圖提取、附我的快評。如果你直接貼數字而不截圖也行。

### Day 1（範本、實際開跑後 update）

```
日期: ____
Spent: NT$ __
Clicks: __
Impressions: __
CTR: __%
Avg CPC: NT$ __
Conversions: __
Conv. value: NT$ __
Conv. rate: __%

Top search terms:
1. ____ (clicks N, conv N)
2. ____ (clicks N, conv N)
...

快評: (我寫)
```

### Day 2-5、Day 6 同 format

---

## 🚨 Troubleshooting

### 「Conversion = 0、跑了 3 天」

**可能原因**：
- 預算太低、流量不夠 → 預期、NT$500 本來就可能 0 轉換、看 search terms 質量
- Conversion fire 機制壞 → F12 開 jinhuasoap.com → Network filter doubleclick → 下單測試
- Tag 沒裝對 → 看 [index.html](index.html) 是否有 AW-18179582977 那段 `<script>`

### 「CPC 暴衝超過 NT$15」

- CPC cap 沒設 → 進廣告活動設定確認「設定每次點擊出價上限 NT$15」勾起來
- 出價策略不對 → 應該是「盡量爭取點擊」、不是「目標 ROAS / CPA」

### 「Impression 很多但 click 很少（CTR < 1%）」

- Headlines 不吸引人 → pause 表現最差 3 條、加新的 → 跟我說我寫新版
- 關鍵字 match type 太寬 → 從 Phrase Match 改 Exact Match（加方括號）

### 「Click 很多但 conversion 0」

- 流量品質差 → 看 search terms、加否定字
- Landing page 不對 → Final URL 可能跑到首頁、改去 cluster URL（如 /products/concern/sensitive）
- 結帳流程卡 → 自己測一次下單流程、看哪步卡

---

## 📚 Glossary（不熟廣告術語的快查）

| 術語 | 意思 |
|---|---|
| CTR (Click-through rate) | 點擊率、impressions 中有多少 click |
| CPC (Cost per click) | 每次點擊花多少 |
| CPM (Cost per mille) | 每 1000 次 impression 花多少 |
| Impression | 廣告露出次數 |
| Conversion | 我們定義的「達成目標」── 對你來說就是下單成功 |
| Conv. rate | 轉換率、clicks 中有多少變 conversion |
| ROAS (Return on ad spend) | 廣告花的錢產生多少營收 |
| Match type | 關鍵字比對寬鬆度（Broad / Phrase / Exact）|
| Negative keyword | 否定字、不會被觸發的字 |
| Ad Group | 廣告群組、共用一組關鍵字 + 廣告文案 |
| Asset (extension) | 廣告擴充元件、sitelink/callout 等讓廣告版位更大 |
| RSA (Responsive Search Ad) | 自動組合廣告、Google 自動 mix 15 headlines |

---

## 🔗 重要連結

- 你的 Google Ads: [ads.google.com](https://ads.google.com)
- 你的 conversion list: [ads.google.com/aw/conversions](https://ads.google.com/aw/conversions)
- 你的 search terms report: 廣告活動 → 關鍵字 → 搜尋字詞
- 網站 production: [https://jinhuasoap.com](https://jinhuasoap.com)
- 訂單查詢: [https://jinhuasoap.com/order](https://jinhuasoap.com/order)
- LINE OA: [https://lin.ee/7m167md](https://lin.ee/7m167md)
- IG: [@jinhuasoap](https://www.instagram.com/jinhuasoap/)

---

## 📝 此文件版本歷史

- **v1.0** · 2026-05-21 · 初版 Day 1 spec + 追蹤協定
