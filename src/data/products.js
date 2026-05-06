// Shared product catalogue.
// - Products.jsx (02 十二花) renders the full detail cards (spec sheet,
//   add-to-cart, etc.) from this list.
// - About/Mobile.jsx renders a compact 2-col grid of all 12 at the bottom
//   of the mobile About page.
// `price` placeholders pending owner confirmation; the buy button shows
// 「待定」 when price is 0 to avoid a misleading checkout. Items where the
// wiki/draft inferences fill the gaps are marked `draft: true`.
export const PRODUCTS = [
  // 【一、花神守護系列 — 修復與潤澤】
  {
    num: '壹',
    series: '花神守護',
    seriesNote: '修復與潤澤',
    zh: '海棠修復 · 碧玉',
    subtitle: '瓊崖海棠修復皂',
    photos: [
      '/images/products/海棠/01.png',
      '/images/products/海棠/02.png',
      '/images/products/海棠/03.png',
      '/images/products/海棠/04.png',
      '/images/products/海棠/05.png',
      '/images/products/海棠/06.png',
    ],
    weight: '105 g',
    price: 380,
    skinType: '敏弱肌、痘痘困擾肌、瑕疵受損肌。',
    coreIngredients:
      '有機初榨瓊崖海棠油、義大利純橄欖油、精製乳油木果脂、甜杏仁油、蓖麻油、椰子油、棕櫚油。',
    oilProfile:
      '瓊崖海棠油提供強大修復力，乳油木果脂則如厚實護盾鎖住水分。',
    washFeel:
      '帶有深沉的木質堅果香，泡泡細緻如凝脂，沖水後皮膚呈現溫潤的玉石光澤。',
    draft: false,
  },
  {
    num: '貳',
    series: '花神守護',
    seriesNote: '修復與潤澤',
    zh: '槐花蜜潤 · 霧蜜',
    subtitle: '霧峰蜜 · 潤玉皂',
    photos: [
      '/images/products/霧蜜/01.png',
      '/images/products/霧蜜/02.png',
      '/images/products/霧蜜/03.png',
      '/images/products/霧蜜/04.png',
      '/images/products/霧蜜/05.png',
      '/images/products/霧蜜/06.png',
    ],
    weight: '105 g',
    price: 300,
    skinType: '極乾燥肌、熟齡肌。',
    coreIngredients:
      '霧峰特產純蜂蜜、義大利純橄欖油、乳油木果脂、甜杏仁油、蓖麻油、椰子油、棕櫚油。',
    oilProfile:
      '取霧峰百花蜜之精萃，蜂蜜中的天然保濕因子能深度抓水。',
    washFeel:
      '泡沫綿密如奶，洗時釋出淡淡蜜香；沖水後肌膚飽滿溫潤、不留澀感。',
    draft: true,
  },
  {
    num: '參',
    series: '花神守護',
    seriesNote: '修復與潤澤',
    zh: '綠豆清芳 · 澡豆',
    subtitle: '潤玉澡豆',
    photos: [
      '/images/products/綠豆/01.png',
      '/images/products/綠豆/02.png',
      '/images/products/綠豆/03.png',
      '/images/products/綠豆/04.png',
      '/images/products/綠豆/05.png',
      '/images/products/綠豆/06.png',
    ],
    weight: '100 g',
    price: 280,
    skinType: '角質肥厚、膚色暗沉、粉刺肌。',
    coreIngredients:
      '研磨綠豆粉、本草萃取粉、義大利純橄欖油、乳油木果脂、椰子油、棕櫚油。',
    oilProfile:
      '研磨綠豆粉細微如塵，輕拭即代謝表皮；本草萃取粉舒緩深層粉刺。',
    washFeel:
      '泡沫綿密帶涼，沖水後肌膚透出本來的明亮，毛孔感覺被收束。',
    draft: true,
  },
  {
    num: '肆',
    series: '花神守護',
    seriesNote: '修復與潤澤',
    zh: '藍蝶清瑩 · 蝶豆',
    subtitle: '蝶豆花美顏皂',
    photos: [
      '/images/products/蝶豆花/01.png',
      '/images/products/蝶豆花/02.png',
      '/images/products/蝶豆花/03.png',
      '/images/products/蝶豆花/04.png',
      '/images/products/蝶豆花/05.png',
      '/images/products/蝶豆花/06.png',
    ],
    weight: '100 g',
    price: 320,
    skinType: '疲憊暗沉肌、輕熟齡肌、需加強代謝之肌膚。',
    coreIngredients:
      '蝶豆花浸泡橄欖油、甜杏仁油、米糠油、乳油木果脂、椰子油、棕櫚油。',
    oilProfile:
      '蝶豆花富含花青素，具備極佳的抗氧化與防禦能力，能提亮肌膚並延緩老化。',
    washFeel:
      '泡泡輕盈細膩，洗臉時如同沐浴在清晨的藍色星光下，洗後肌膚感覺清透、充滿彈性與光澤。',
    draft: false,
  },

  // 【二、花韻時節系列 — 風土與暖心】
  {
    num: '伍',
    series: '花韻時節',
    seriesNote: '風土與暖心',
    zh: '金盞舒緩 · 長金',
    subtitle: '長濱金 · 舒膚皂',
    photos: [
      '/images/products/金盞花/01.png',
      '/images/products/金盞花/02.png',
      '/images/products/金盞花/03.png',
      '/images/products/金盞花/04.png',
      '/images/products/金盞花/05.png',
      '/images/products/金盞花/06.png',
    ],
    weight: '110 g',
    price: 320,
    skinType: '敏感肌、過冬乾燥肌、走過幾道刺激的肌膚。',
    coreIngredients:
      '長濱金盞花浸泡油、義大利純橄欖油、乳油木果脂、甜杏仁油、椰子油、棕櫚油。',
    oilProfile:
      '長濱金盞花於橄欖油中浸泡四週，金盞花烯與類黃酮慢慢釋進油裡；乳油木果脂接在後面把修護鎖住。',
    washFeel:
      '泡沫溫潤敦厚，洗時帶一抹金，洗完肌膚柔軟、不緊繃。',
    draft: true,
  },
  {
    num: '陸',
    series: '花韻時節',
    seriesNote: '風土與暖心',
    zh: '稻花暖心 · 星米',
    subtitle: '三星米 · 暖心皂',
    photos: [
      '/images/products/大米/01.png',
      '/images/products/大米/02.png',
      '/images/products/大米/03.png',
      '/images/products/大米/04.png',
      '/images/products/大米/05.png',
      '/images/products/大米/06.png',
    ],
    weight: '105 g',
    price: 300,
    skinType: '偏乾肌、季節敏感肌、需要溫和滋潤者。',
    coreIngredients:
      '宜蘭三星米漿、米糠油、義大利純橄欖油、乳油木果脂、椰子油、棕櫚油。',
    oilProfile:
      '三星米漿入皂時為水相替換；米糠油富含 γ-穀維素與生育三烯酚 ── 給肌膚溫潤的米光。',
    washFeel:
      '泡沫綿密如奶，洗後留一層淡淡米香，肌膚像剛收的新米般柔潤。',
    draft: true,
  },
  {
    num: '柒',
    series: '花韻時節',
    seriesNote: '風土與暖心',
    zh: '杜康醉月 · 酒粕',
    subtitle: '醉月酒粕',
    photos: [
      '/images/products/酒粕/01.png',
      '/images/products/酒粕/02.png',
      '/images/products/酒粕/03.png',
      '/images/products/酒粕/04.png',
      '/images/products/酒粕/05.png',
      '/images/products/酒粕/06.png',
    ],
    weight: '105 g',
    price: 320,
    skinType: '暗沉肌、紋路深沉肌、需要光澤感的成熟肌。',
    coreIngredients:
      '清酒酒粕精華、米糠油、義大利純橄欖油、乳油木果脂、椰子油、棕櫚油。',
    oilProfile:
      '酒粕含氨基酸與酵素，能溫和代謝表皮；米糠油與橄欖油底層厚實滋潤。',
    washFeel:
      '泡沫細緻如絹，洗時有微微酒香，洗後肌膚透出絲絨般的光澤。',
    draft: true,
  },
  {
    num: '捌',
    series: '花韻時節',
    seriesNote: '風土與暖心',
    zh: '桂月流金 · 桂花',
    subtitle: '桂花潤膚皂',
    photos: [
      '/images/products/桂花/01.png',
      '/images/products/桂花/02.png',
      '/images/products/桂花/03.png',
      '/images/products/桂花/04.png',
      '/images/products/桂花/05.png',
      '/images/products/桂花/06.png',
    ],
    weight: '105 g',
    price: 360,
    skinType: '一般肌、追求香氣的日常肌、皮膚薄者。',
    coreIngredients:
      '桂花浸泡橄欖油、甜杏仁油、米糠油、乳油木果脂、椰子油。',
    oilProfile:
      '桂花浸泡橄欖油四週，金秋桂花的甜香釋進油裡；甜杏仁油與米糠油給薄皮肌的親膚滋潤。',
    washFeel:
      '泡沫輕盈，洗時是一抹清淡的桂花蜜香，洗後肌膚柔軟、香氣留半日。',
    draft: true,
  },

  // 【三、花露淨髮餅系列 — 髮沐】
  {
    num: '玖',
    series: '花露淨髮餅',
    seriesNote: '髮沐',
    zh: '山茶淨髮',
    subtitle: '植萃髮餅',
    photos: [
      '/images/products/山茶淨髮/01.png',
      '/images/products/山茶淨髮/02.png',
      '/images/products/山茶淨髮/03.png',
      '/images/products/山茶淨髮/04.png',
      '/images/products/山茶淨髮/05.png',
      '/images/products/山茶淨髮/06.png',
    ],
    weight: '90 g',
    price: 320,
    skinType: '一般髮質、敏感頭皮、追求弱酸護髮者。',
    coreIngredients: '山茶花油、蠶絲蛋白萃取液、玉米澱粉、甘油。',
    oilProfile:
      'pH 5–6 弱酸貼近頭皮原生酸鹼；蠶絲蛋白多胜肽順毛鱗片、洗後不澀不打結；玉米澱粉扛起成型。',
    washFeel:
      '起泡細密，山茶花淡香；洗後髮絲滑順、頭皮清爽。',
    draft: true,
  },
  {
    num: '拾',
    series: '花露淨髮餅',
    seriesNote: '髮沐',
    zh: '茉莉沐膚',
    subtitle: '香氛沐浴餅',
    photos: [
      '/images/products/茉莉沐膚/01.png',
      '/images/products/茉莉沐膚/02.png',
      '/images/products/茉莉沐膚/03.png',
      '/images/products/茉莉沐膚/04.png',
      '/images/products/茉莉沐膚/05.png',
      '/images/products/茉莉沐膚/06.png',
    ],
    weight: '100 g',
    price: 320,
    skinType: '全身肌、夏日想要香氛體驗者。',
    coreIngredients: '茉莉花萃取粉、玉米澱粉、甘油。',
    oilProfile:
      '弱酸表活組合 (pH 5–6) 為骨架；茉莉花萃取粉是真實花瓣磨成粉。遇水釋出香氣。',
    washFeel:
      '泡沫綿密細緻，洗時香氣慢慢開出來；洗後全身微微涼意，茉莉香留一夜。',
    draft: true,
  },

  // 【四、全能日常系列 — 一皂到底】
  {
    num: '拾壹',
    series: '全能日常',
    seriesNote: '一皂到底',
    zh: '一皂到底 · 清爽款',
    subtitle: '水仙清透',
    photos: [
      '/images/products/一皂到底清爽/01.png',
      '/images/products/一皂到底清爽/02.png',
      '/images/products/一皂到底清爽/03.png',
      '/images/products/一皂到底清爽/04.png',
      '/images/products/一皂到底清爽/05.png',
      '/images/products/一皂到底清爽/06.png',
    ],
    weight: '110 g',
    price: 320,
    skinType: '運動後肌、油脂分泌旺、夏日想清爽過一天的全身肌。',
    coreIngredients: '荷荷芭油、薰衣草粉、植物性甘油。',
    oilProfile:
      '荷荷芭脂肪酸結構與肌膚皮脂幾乎同源，運動後油脂分泌變多時反而能起平衡；薰衣草粉走粉類植萃路線，量壓低位。',
    washFeel:
      '起泡輕盈快速，徹底洗去汗與油；沖完全身有微涼的草本氣息。',
    draft: true,
  },
  {
    num: '拾貳',
    series: '全能日常',
    seriesNote: '一皂到底',
    zh: '一皂到底 · 保濕款',
    subtitle: '待命名',
    photos: [
      '/images/products/一皂到底保濕/01.png',
      '/images/products/一皂到底保濕/02.png',
      '/images/products/一皂到底保濕/03.png',
      '/images/products/一皂到底保濕/04.png',
      '/images/products/一皂到底保濕/05.png',
      '/images/products/一皂到底保濕/06.png',
    ],
    weight: '110 g',
    price: 320,
    skinType: '乾燥肌、季節敏感肌、追求一塊到底滋潤者。',
    coreIngredients: '成分待補。',
    oilProfile: '原料特性待補。',
    washFeel: '洗感感受待補。',
    draft: true,
  },
];
