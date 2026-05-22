// Shared product catalogue.
// - Products.jsx (02 十二花) renders the full detail cards (spec sheet,
//   add-to-cart, etc.) from this list.
// - About/Mobile.jsx renders a compact 2-col grid of all 12 at the bottom
//   of the mobile About page.
// - ProductDetail.jsx renders a single product by `slug` (URL like
//   /products/haitang-xiufu).
// - CategoryListing.jsx filters by `concerns` (URL like
//   /products/concern/sensitive).
//
// Required fields:
//   slug      — lowercase latin pinyin, used as the URL path segment
//   concerns  — array of cluster slugs from CONCERNS below (TA grouping
//               for ad campaigns; a product can belong to multiple)
//
// Optional fields:
//   batchDate — 本批熟成日（YYYY-MM-DD 或自由文字）。設了會在 02 十二花顯示
//   「本批熟成」一行；不設則 row 自動隱藏。透明度品牌信任、買家清楚知道
//   皂的新鮮度。

// TA cluster definitions. Each product carries one or more `concerns`
// matching the slugs below; ad campaigns and category filter chips both
// key off this list. Series (花神守護 / 花韻時節 / 花露淨髮餅 / 全能日常)
// remains the brand narrative inside the product detail card.
export const CONCERNS = [
  { slug: 'sensitive', zh: '修護專科', desc: '敏弱肌、痘痘、走過皮膚科的人' },
  { slug: 'mature', zh: '抗老提亮', desc: '熟齡、暗沉、撫紋、追求光澤' },
  { slug: 'oily', zh: '控油角質', desc: '粉刺、油性肌、角質肥厚' },
  { slug: 'fragrance', zh: '香氛日常', desc: '一般肌、薄皮、香氛禮品' },
  { slug: 'hair', zh: '髮 × 頭皮', desc: '洗髮餅、敏感頭皮、無矽靈' },
  { slug: 'daily', zh: '一塊到底', desc: '運動、全身、家庭日常' },
  { slug: 'baby', zh: '寶寶月子', desc: '新生兒、產後敏感、月子禮' },
];

export const PRODUCTS = [
  // 【一、花神守護系列 — 修復與潤澤】
  {
    num: '壹',
    slug: 'haitang-xiufu',
    concerns: ['sensitive'],
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
      '/images/products/海棠/07.png',
      '/images/products/海棠/08.png',
    ],
    weight: '105 g',
    price: 380,
    skinType: '敏弱肌、痘痘困擾肌、瑕疵受損肌。',
    coreIngredients:
      '有機初榨瓊崖海棠油、義大利純橄欖油、精製乳油木果脂、甜杏仁油、蓖麻油、椰子油、棕櫚油。',
    oilProfile:
      '瓊崖海棠油提供強大修復力，乳油木果脂則如厚實護盾鎖住水分。',
    washFeel:
      '帶深沉的木質堅果香，泡泡細緻，沖完肌膚柔軟、不緊不澀。',
    translations: {
      en: {
        series: 'Flower Guardians',
        seriesNote: 'Restore & soften',
        zh: 'Calophyllum Repair · Jade',
        subtitle: 'Calophyllum tamanu repair bar',
        skinType: 'Sensitive, blemish-prone, or recovering skin.',
        coreIngredients:
          'Organic cold-pressed tamanu (calophyllum) oil, Italian extra-virgin olive oil, refined shea butter, sweet almond, castor, coconut, palm.',
        oilProfile:
          'Tamanu oil offers deep repair; shea butter locks the moisture in like a soft shield.',
        washFeel: 'A deep, woody-nutty scent. Fine lather. After rinsing, skin feels soft, never tight.',
      },
    },
  },
  {
    num: '貳',
    slug: 'wumeng-runyu',
    concerns: ['mature'],
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
    translations: {
      en: {
        series: 'Flower Guardians',
        seriesNote: 'Restore & soften',
        zh: 'Honey Soothe · Mist',
        subtitle: 'Wufeng honey · soft jade bar',
        skinType: 'Very dry or mature skin.',
        coreIngredients:
          'Pure Wufeng honey, Italian olive oil, shea butter, sweet almond, castor, coconut, palm.',
        oilProfile:
          'The natural humectants in honey draw water deep into the skin barrier.',
        washFeel: 'Creamy milk-like lather with a soft honey scent. After rinsing, skin feels plump and never tight.',
      },
    },
  },
  {
    num: '參',
    slug: 'lvdou-zaodou',
    concerns: ['oily'],
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
      '/images/products/綠豆/07.png',
      '/images/products/綠豆/08.png',
    ],
    weight: '100 g',
    price: 280,
    skinType: '角質肥厚、膚色暗沉、粉刺肌。',
    coreIngredients:
      '研磨綠豆粉、本草萃取粉、義大利純橄欖油、乳油木果脂、椰子油、棕櫚油。',
    oilProfile:
      '研磨綠豆粉細微如塵，輕拭即代謝表皮；本草萃取粉舒緩深層粉刺。',
    washFeel:
      '泡沫綿密帶涼，沖完肌膚清爽明亮、毛孔有收束感。',
    translations: {
      en: {
        series: 'Flower Guardians',
        seriesNote: 'Restore & soften',
        zh: 'Mung Bean Fresh · Bath Bean',
        subtitle: 'Mung bean cleansing bar',
        skinType: 'Thick keratin, dull skin, congested pores.',
        coreIngredients:
          'Ground mung bean powder, herbal extract powder, Italian olive oil, shea butter, coconut, palm.',
        oilProfile:
          'Fine mung bean powder gently sloughs surface keratin; herbal extract calms deeper congestion.',
        washFeel: 'Cool, creamy lather. After rinsing, skin feels bright and pores look refined.',
      },
    },
  },
  {
    num: '肆',
    slug: 'diedou-meiyan',
    concerns: ['mature'],
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
      '泡泡輕盈細膩，洗完肌膚清透、有彈性與光澤。',
    translations: {
      en: {
        series: 'Flower Guardians',
        seriesNote: 'Restore & soften',
        zh: 'Butterfly Pea Brighten · Indigo',
        subtitle: 'Butterfly pea brightening bar',
        skinType: 'Tired, dull, or early-maturing skin in need of renewal.',
        coreIngredients:
          'Butterfly pea infused olive oil, sweet almond, rice bran, shea butter, coconut, palm.',
        oilProfile:
          'Butterfly pea is rich in anthocyanins — strong antioxidant defense that brightens and slows visible aging.',
        washFeel: 'Light, refined lather. After rinsing, skin feels clear, supple, and luminous.',
      },
    },
  },

  // 【二、花韻時節系列 — 風土與暖心】
  {
    num: '伍',
    slug: 'jinzhan-shufu',
    concerns: ['sensitive', 'baby'],
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
      '/images/products/金盞花/07.png',
      '/images/products/金盞花/08.png',
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
    translations: {
      en: {
        series: 'Seasonal Blooms',
        seriesNote: 'Earth & warmth',
        zh: 'Calendula Calm · Changbin Gold',
        subtitle: 'Changbin calendula soothing bar',
        skinType: 'Sensitive skin, winter-dry, or skin recovering from irritation.',
        coreIngredients:
          'Changbin calendula infused olive oil, Italian olive oil, shea butter, sweet almond, coconut, palm.',
        oilProfile:
          'Changbin calendula steeped in olive oil for four weeks releases calendulene and flavonoids; shea butter follows behind to lock the repair in.',
        washFeel: 'Warm, full-bodied lather with a hint of gold. After rinsing, skin feels soft and never tight.',
      },
    },
  },
  {
    num: '陸',
    slug: 'dami-nuanxin',
    concerns: ['baby'],
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
      '三星米漿入皂時為水相替換；米糠油富含 γ-穀維素與生育三烯酚 ── 給肌膚溫潤的養護。',
    washFeel:
      '泡沫綿密如奶，洗後留一層淡淡米香，肌膚柔潤、不緊繃。',
    translations: {
      en: {
        series: 'Seasonal Blooms',
        seriesNote: 'Earth & warmth',
        zh: 'Rice Warmth · Sanxing',
        subtitle: 'Sanxing rice warming bar',
        skinType: 'Slightly dry skin, seasonally sensitive, needing gentle nourishment.',
        coreIngredients:
          'Yilan Sanxing rice milk, rice bran oil, Italian olive oil, shea butter, coconut, palm.',
        oilProfile:
          'Sanxing rice milk replaces the water phase; rice bran oil is rich in γ-oryzanol and tocotrienols — gentle, deep nourishment.',
        washFeel: 'Milky creamy lather. After rinsing, skin keeps a soft hint of rice scent and feels soft, never tight.',
      },
    },
  },
  {
    num: '柒',
    slug: 'jiupo-zuiyue',
    concerns: ['mature'],
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
      '泡沫細緻，洗時有微微酒香，洗後肌膚柔軟、有光澤。',
    translations: {
      en: {
        series: 'Seasonal Blooms',
        seriesNote: 'Earth & warmth',
        zh: 'Sake Lees Glow · Moonlight',
        subtitle: 'Moonlight sake lees bar',
        skinType: 'Dull or mature skin, fine lines, in need of luminosity.',
        coreIngredients:
          'Sake lees essence, rice bran oil, Italian olive oil, shea butter, coconut, palm.',
        oilProfile:
          'Sake lees contain amino acids and enzymes that gently turn over surface keratin; rice bran and olive oils build a rich nourishing base.',
        washFeel: 'Fine lather with a soft sake scent. After rinsing, skin feels soft and luminous.',
      },
    },
  },
  {
    num: '捌',
    slug: 'guihua-runfu',
    concerns: ['fragrance'],
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
    translations: {
      en: {
        series: 'Seasonal Blooms',
        seriesNote: 'Earth & warmth',
        zh: 'Osmanthus Autumn · Gold',
        subtitle: 'Osmanthus moisturizing bar',
        skinType: 'Normal skin, thin or delicate skin, those who love a soft fragrance.',
        coreIngredients:
          'Osmanthus infused olive oil, sweet almond, rice bran, shea butter, coconut.',
        oilProfile:
          'Osmanthus blossoms steeped in olive oil for four weeks release autumn sweetness; sweet almond and rice bran oils nourish thin or delicate skin.',
        washFeel: 'Light lather with a soft osmanthus-honey scent. After rinsing, skin feels soft and the scent lingers for hours.',
      },
    },
  },

  // 【三、花露淨髮餅系列 — 髮沐】
  {
    num: '玖',
    slug: 'shancha-fa',
    concerns: ['hair'],
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
    translations: {
      en: {
        series: 'Botanical Hair Bars',
        seriesNote: 'Hair & shower',
        zh: 'Camellia Hair Bar',
        subtitle: 'Botanical hair-cleansing bar',
        skinType: 'All hair types, sensitive scalps, those seeking mild-acid hair care.',
        coreIngredients: 'Camellia oil, silk protein extract, corn starch, glycerin.',
        oilProfile:
          'pH 5–6 close to scalp\'s natural acidity; silk protein peptides smooth the cuticle for tangle-free hair; corn starch holds the bar shape.',
        washFeel: 'Fine lather with a soft camellia scent. After rinsing, hair feels smooth and scalp clean.',
      },
    },
  },
  {
    num: '拾',
    slug: 'moli-mufu',
    concerns: ['fragrance'],
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
    translations: {
      en: {
        series: 'Botanical Hair Bars',
        seriesNote: 'Hair & shower',
        zh: 'Jasmine Body Bar',
        subtitle: 'Fragrant body-cleansing bar',
        skinType: 'Whole-body skin, especially for summer fragrance lovers.',
        coreIngredients: 'Jasmine extract powder, corn starch, glycerin.',
        oilProfile:
          'Mild-acid surfactant blend (pH 5–6) as backbone; jasmine extract is real petals milled into powder, releasing scent on contact with water.',
        washFeel: 'Fine creamy lather. The scent unfolds slowly during the wash, leaving a cool, jasmine-lingering finish overnight.',
      },
    },
  },

  // 【四、全能日常系列 — 一皂到底】
  {
    num: '拾壹',
    slug: 'yizao-qingshuang',
    concerns: ['daily'],
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
    translations: {
      en: {
        series: 'All-Day Essentials',
        seriesNote: 'One bar, head to toe',
        zh: 'All-Day · Cool',
        subtitle: 'Narcissus crisp',
        skinType: 'Active skin, oily skin, anyone seeking a refreshing summer wash.',
        coreIngredients: 'Jojoba oil, lavender powder, vegetable glycerin.',
        oilProfile:
          'Jojoba mirrors human sebum almost exactly — balances oil production after exercise rather than overwhelming it. Lavender powder is dosed gently.',
        washFeel: 'Quick light lather that cuts through sweat and oil. After rinsing, a cool herbal note lingers on skin.',
      },
    },
  },
  {
    num: '拾貳',
    slug: 'yizao-baoshi',
    concerns: ['daily'],
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
    translations: {
      en: {
        series: 'All-Day Essentials',
        seriesNote: 'One bar, head to toe',
        zh: 'All-Day · Hydrate',
        subtitle: 'To be named',
        skinType: 'Dry skin, seasonally sensitive, seeking a one-bar hydrating wash.',
        coreIngredients: 'Ingredients pending.',
        oilProfile: 'Oil profile pending.',
        washFeel: 'Wash feel pending.',
      },
    },
  },
];
