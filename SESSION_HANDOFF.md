# 廣告 Campaign Build · Session Handoff

> 寫於 2026-05-21 by Claude Opus 4.7 · session 主 context 已飽和、需要 fresh session 接手
> Campaign draft 已在 Google Ads 後台 auto-saved、可從中斷點繼續走、不用重來

---

## 🎯 一句話 mission

從「**關鍵字和廣告**」step 開始、照 [AD_CAMPAIGN.md](AD_CAMPAIGN.md) § 1-7 把 campaign 跑完
（**status: paused**、不要 enable）── 老闆娘 review 截圖 OK 後她自己按 enable 開跑。

---

## 📍 當前狀態（上次 session 留下的）

### 已完成 steps（從新建 → bidding 前）
1. ✅ 商家：金花樓手工皂、URL https://jinhuasoap.com/
2. ✅ 目標：不依據廣告指引建立
3. ✅ 類型：搜尋 (Search)
4. ✅ Conversion goal：購買（label `AW-18123111692/1Yp6CMzp47AcEIz64sFD`）
5. ✅ 廣告活動目標：網站造訪（URL pre-filled）
6. ✅ 名稱：**金花樓_試水溫_Search_NT500**

### 老闆娘已手動推進
- 從 bidding step 點到 **關鍵字和廣告** step（左 sidebar 第 6 個）
- Chrome extension 還連著、SSO cookie 共享、navigate 進 ads.google.com 就直接 logged in

### 還沒設定的（剩餘）
Sidebar 左側順序：

| Step | 對應 AD_CAMPAIGN.md | 重點 |
|---|---|---|
| **出價** | § 1 | 盡量爭取點擊 + CPC cap **NT$15** |
| **廣告活動設定** | § 1 | 地區=台北/新北/桃園/新竹（人在當地）、語言=繁中、年齡 25-64、女性 +15%、平板 -100%、**取消勾「搜尋夥伴」+「多媒體聯播網」**、排程 11:00-23:00 |
| **AI Max** | （spec 沒提）| 預設關 / 或最小化 ── 避免 Google 自動擴詞炸預算 |
| **關鍵字和廣告** ⬅ 現在這裡 | § 2-4 | 創 3 個 ad groups（敏感肌主打 / 產品識貨族 / 換季場景）、每組 15 headlines + 4 descriptions + 12 keywords（phrase match 加雙引號）|
| **預算** | § 1 | **NT$100/日** |
| **查看** | § 5, 6 | 加 60 個否定字 + Assets（sitelinks/callouts/snippets/images/promotion）+ 最後 **保存 paused** |

---

## 🛠 Browser MCP 使用注意（上次 session 踩過的雷）

1. **每次 click 後 refs 都 invalidate** ── 不要在同一個 batch 內 sequential click-after-click（第二個會 ref 失效）。每 click 一次 → wait → re-read_page or find by text。
2. **`find` tool by text 比 ref-based 穩** ── 跨 re-render 用 query 找 element 比直接記 ref 安全
3. **read_page 用 `filter: "interactive"` + `depth: 6-8`** ── 比 `filter: "all"` 省 60% context
4. **`screenshot` 只在 user 需要看時才 `save_to_disk: true`** ── 否則 token 浪費
5. **`form_input` 對 textbox 比 `computer type` 穩**、`form_input` 用 ref + value 一次設定
6. **Click 後預留 wait 3-5 秒** ── Google Ads SPA navigation 重、太快 read 看到 stale state
7. **下拉選單 option click** ── 用 `javascript_tool` 跑 `[...document.querySelectorAll('[role="option"]')].find(o => o.textContent.includes('XXX')).click()` 最穩（by text）

### Resume browser session（下個 session 開場做的）

```
1. mcp__Claude_in_Chrome__list_connected_browsers  → 看連著的 Chrome
2. mcp__Claude_in_Chrome__switch_browser  → broadcast confirmation、老闆娘按 Connect 想用的那台
3. mcp__Claude_in_Chrome__tabs_context_mcp({ createIfEmpty: true })  → 拿 tabId
4. navigate to https://ads.google.com/aw/campaigns?status=draft
   → 找到 "金花樓_試水溫_Search_NT500" draft、點進去 resume
   OR
   直接 navigate 到老闆娘 paste 過來的 draft URL
```

---

## 📦 Quick Reference

| 項目 | 值 |
|---|---|
| Conversion label | `AW-18123111692/1Yp6CMzp47AcEIz64sFD` |
| Conversion 預設 value | NT$300（Cart.jsx 實際用 order total override）|
| Daily budget | NT$100/日 × 5 天 = NT$500 |
| CPC cap | NT$15 |
| Target locations | 台北、新北、桃園、新竹市、新竹縣（people IN locations） |
| Final URLs by ad group | A: `/?tab=shop` / B: `/?tab=products` / C: `/?tab=shop` |
| Google Ads account | tsghsunlee@gmail.com（金花樓手工皂、Visa 7604）|
| Production AW tag | 已 inline 在 index.html ([commit 3e04f80](https://github.com/tsglee/jinhuasoap/commit/3e04f80)) |

---

## ✅ 結束時 checklist（campaign build 完成標準）

- [ ] 6 個 sidebar step 都打勾 / 走完
- [ ] 3 個 ad groups 各有 ≥10 headlines + ≥3 descriptions + ≥10 keywords
- [ ] 否定關鍵字 list ≥ 50 個（campaign level）
- [ ] 4-6 sitelinks + 10 callouts + structured snippets + 4 image assets + promotion 都加
- [ ] CPC cap NT$15 確認設定
- [ ] 預算 NT$100/日 確認
- [ ] 地區只有北部 5 個（**沒有**「全台灣」/「美國」/「其他位置」）
- [ ] 廣告聯播網**沒勾**「搜尋夥伴」+「多媒體聯播網」
- [ ] 排程 11:00-23:00
- [ ] 平板 -100%
- [ ] **最後一步「保存」、status 顯示「已暫停」（不是「進行中」）**
- [ ] Campaign overview 截圖貼到 chat 給老闆娘 review

---

## 🚦 下個 session 開場 prompt（老闆娘複製貼上）

```
接手 Google Ads campaign build。
讀 SESSION_HANDOFF.md + AD_CAMPAIGN.md。
我已手動推進到「關鍵字和廣告」step、Chrome extension 還連著。
請繼續走完 campaign（status: paused）、最後截 overview 給我 review。
```

下個 Claude 收到這個 prompt → 讀 SESSION_HANDOFF.md + AD_CAMPAIGN.md → list_connected_browsers → switch_browser → navigate to draft → 從關鍵字和廣告 step 繼續。

---

## 📝 寫這份文件的 session 故事（debug 紀錄）

上次 session 從早上 debug GA4 到下午、最終決定全部刪掉重來、改用 Google Ads manual conversion event 路線。之後做 buyer email + favicon center crop + logo metadata + AD_CAMPAIGN.md spec、最後嘗試用 Claude in Chrome 直接 click 建 campaign。Click 到 bidding step（第 7 個 screen）時 context 已飽和、決定 handoff。

學到：Claude in Chrome 對 Google Ads 這種高 reactivity SPA、每 click re-render 嚴重 ref churn、每個小 step 都要 3-5 tool calls。完整 campaign build 估算 100-200 turns、單一 session 撐不完。**下次 fresh session、開頭 budget 充裕 + 用上面學到的 pattern（find by text、避免 batch click chain、conservative screenshot）、應該能單一 session 走完**。
