// 十二花 × 本舍小記 — 每款皂在單品頁尾連到一篇最相關的小記（深化信任，
// 不是推銷）。key 是 products.js 的產品 slug；value 是文章 slug + 標題
// （標題存這裡是刻意的 —— 避免單品頁 import Journal.jsx 的大 POSTS 陣列）。
// 老闆娘想換哪款對哪篇，改這個檔即可；拿掉某款的 entry 該區塊就不出現。
export const PRODUCT_JOURNAL = {
  'haitang-biyu': { slug: 'allergy-flare', title: '過敏發作的那幾天' },
  'wumeng-runyu': { slug: 'elderly-winter-itch', title: '冬天的癢' },
  'lvdou-zaodou': { slug: 'teen-acne', title: '青春期的痘' },
  'diedou-meiyan': { slug: 'botanical-design-truth', title: '加了牛奶咖啡就會變好用？植萃設計的真相' },
  'jinzhan-shufu': { slug: 'housewife-eczema', title: '反覆洗手的那雙手' },
  'dami-nuanxin': { slug: 'taiwan-water', title: '這座島的水與皂' },
  'jiupo-zuiyue': { slug: 'scent-and-memory', title: '香味與記憶' },
  'guihua-runfu': { slug: 'slow-bath', title: '洗澡可以慢一點' },
  'shancha-fa': { slug: 'skin-ph-acid-mantle', title: '臉、身體、頭髮的清潔密碼' },
  'moli-mufu': { slug: 'scent-and-memory', title: '香味與記憶' },
  'yizao-qingshuang': { slug: 'after-sweat', title: '流汗之後' },
  'yizao-baoshi': { slug: 'travel-soap', title: '出門那塊皂' },
};
