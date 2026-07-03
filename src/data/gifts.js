// 禮盒 — /gift 頁的固定禮盒 + 客製洽詢文案。
//
// ⚠ 佔位資料：內容組合與售價等老闆娘拍板。price: 0 時前端顯示「取貨約訂」
// 且不可加入購物籃 —— 頁面可以先上線，定價後把數字填進來即可開賣。
// photos 空陣列時該格不出圖（皂餅禮盒實拍照路徑確認後填入）。
//
// 加入購物籃時的 cart item shape 同 products.js（num / zh / lat / price）；
// num 用「禮」字輩避免與十二花的 壹–拾貳 相撞。
export const GIFT_SETS = [
  {
    num: '禮壹',
    zh: '三皂禮盒',
    lat: 'Gift of Three',
    contents: ['海棠潤澤 · 碧玉', '桂花潤膚 · 流金', '茉莉沐膚 · 夜香'],
    line: '三款一盒 ── 未漂紙裹好、粉紗緞帶，附手寫小卡。',
    price: 0, // 待定價
    photos: ['/images/products/一皂到底清爽/08.jpg'],
  },
  {
    num: '禮貳',
    zh: '雙皂禮盒',
    lat: 'Gift of Two',
    contents: ['依季節與庫存搭配兩款', '可於備註指定'],
    line: '小小的一盒心意 ── 適合節禮與回禮。',
    price: 0, // 待定價
    photos: ['/images/products/一皂到底清爽/07.jpg'],
  },
];

export const GIFT_CUSTOM = {
  title: '節禮 · 婚禮 · 企業客製',
  body:
    '數量、皂款、包裝與小卡文字，都可以慢慢談。' +
    '婚禮小物、年節送客戶、新居入厝 ── 跟我們說場合與預算，' +
    '老闆娘會給你一個實在的建議。',
  note: '曾為企業客戶包過六十份年節禮 ── 每一份都手工包好、逐一檢查。',
};
