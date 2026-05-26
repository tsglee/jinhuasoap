// 客戶心得 — 04 購皂頁底（catalog 之後、節禮 · 婚禮 客製段之前）
//
// 編輯規則：
// - 每條心得提到至少一個具體本舍產品（從 products.js）
// - 場景具體（哪種膚況 / 哪個季節 / 哪個情境）
// - 不寫「療效宣稱」（醫療化妝品法規）
// - 簽名格式：稱呼 · 地區 · 一句話標籤
// - 想加新條心得 push 進這陣列即可；UI 自動 carousel 排版
//
// Image:
//   /images/testimonials/<id>.jpg  + .avif + .webp（pipeline 同 journal/products）
//   1:1 square、800×800 以上、editorial headshot 或 沐浴情境
//   prompts in public/images/testimonials/PROMPTS.md
export const TESTIMONIALS = [
  {
    id: 'lin',
    image: '/images/testimonials/lin.jpg',
    quote:
      '我從學生時代肌膚就比較敏感，貴的便宜的洗面乳都沒辦法用滿兩瓶。三個月前換成本舍的海棠潤澤皂，洗完不緊、不需要立刻擦精華液。現在桂月流金、海棠輪著用。',
    name: '林小姐',
    tag: '內湖 · 敏感肌',
  },
  {
    id: 'chen',
    image: '/images/testimonials/chen.jpg',
    quote:
      '以前覺得手工皂太娘跟我無關，是太太硬塞一塊一皂到底·清爽款給我。每天早上跑步回家用，比沐浴乳清爽得多，現在運動包都自帶一塊。家裡四塊在輪。',
    name: '陳先生',
    tag: '新竹 · 慢跑族',
  },
  {
    id: 'wang',
    image: '/images/testimonials/wang.jpg',
    quote:
      '產後皮膚變得很敏感，加上哺乳期衣服總是汗濕，本舍的山茶淨髮餅救了我 ── 連洗到不用每天擔心頭髮悶。也用瓊崖海棠洗澡，泡泡多到寶寶會看著好奇。',
    name: '王媽媽',
    tag: '林口 · 哺乳期',
  },
  {
    id: 'li',
    image: '/images/testimonials/li.jpg',
    quote:
      '七十歲後冬天小腿乾乾癢癢的，女兒寄了三塊霧蜜過來。配方厚實、洗起來不緊；現在我每兩個月自己上來訂一塊放浴室、一塊放抽屜。',
    name: '李伯伯',
    tag: '台中 · 銀髮',
  },
  {
    id: 'mandy',
    image: '/images/testimonials/mandy.jpg',
    quote:
      '從國中肌膚就比較困擾。看了本舍小記〈青春期的痘〉發現我洗臉太頻繁，改成早晚各一次配綠豆清芳。最重要的是不再覺得自己皮膚難搞。',
    name: 'Mandy',
    tag: '高雄 · 大學生',
  },
  {
    id: 'huang',
    image: '/images/testimonials/huang.jpg',
    quote:
      '公司年節送客戶想找有質感又不踩雷的選擇，挑了三家本舍最對眼。訂了 60 份桂花潤膚每份別緻包好，客戶反饋意外好 ── 「實際用得到的禮」是他們的回饋。已經連續兩年都找本舍。',
    name: '黃先生',
    tag: '台北 · 企業客戶',
  },
  {
    id: 'tina',
    image: '/images/testimonials/tina.jpg',
    quote:
      '我評過台灣、日本、韓國至少 30 種手工皂。本舍最讓我意外的是配方扎實 ── 不像很多手工皂只靠花俏的添加物去包裝「天然」。脂肪酸配比看得出有設計過。最常推給敏感肌跟想入門的朋友。',
    name: 'Tina',
    tag: '部落客 · 肌膚紀錄',
  },
  {
    id: 'chou',
    image: '/images/testimonials/chou.jpg',
    quote:
      '五十歲後皮膚變得偏乾，以前用得好的化妝水換季就不順了。換用霧蜜跟桂月流金洗澡之後，整個沐浴儀式變得很安頓。',
    name: '周阿姨',
    tag: '桃園 · 更年期',
  },
];
