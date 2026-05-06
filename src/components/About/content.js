// Shared content data for the About page. Both Desktop.jsx and Mobile.jsx
// read from here, so prose / image paths only need to be edited in one place.
// Sections that exist on Desktop only (manifesto, water interlude, 五皂五境)
// keep their data inline in Desktop.jsx.

export const HERO = {
  videoSrc: '/images/landingmedia/Animated_Ink_Wash_Banner_Scene_Generation.mp4',
  poster: '/images/landingmedia/hero-poster.webp',
  // Desktop renders these stacked with a <br> between; Mobile inlines them.
  titleLines: ['山中', '一盞', '金花。'],
  titleAccentIndex: 2, // index of the line painted in --red
  tagline: '一方小皂 · 洗塵心 · 照夜夢。',
  intro:
    '金花樓是林口的一間小小皂舍。用島上的油、花材、乾淨的純水，' +
    '一方一方手壓肥皂 ── 一次一個配方、一批四十二日，慢慢陳化。',
  caption: '手壓皂 · 林口 · MMXXII',
};

export const PILLARS = [
  {
    zh: '純手工',
    body:
      '每一塊皂的切、印、包，都從我們二人的手裡來 ── 就是我們夫妻兩人。' +
      '每一刀切、每一塊壓、每一張包裝都自己做。',
    tone: 'warm',
    photo: '/images/about/純手工.jpeg',
  },
  {
    zh: '天然材料',
    body: '冷壓油脂、石磨花材、乾淨的純水。只有親膚的天然材料。',
    tone: 'cool',
    photo: '/images/about/天然材料.png',
  },
  {
    zh: '慢製',
    body:
      '每一塊皂在架上陳化四十二日，才送出 ── ' +
      '這樣趙老闆娘說的，才溫柔咩。',
    tone: 'deep',
    photo: '/images/about/慢製.png',
  },
];

export const CREW = {
  micro: '工坊的人',
  title: '我們二人',
  subtitle: '一對夫妻 · 沒有別的員工',
  intro:
    '金花樓只有兩個人 ── 一位守著配方與鍋前，一位守著文字與頁面。' +
    '這一頁，是我們願意讓你知道的彼此。',
  members: [
    {
      roleMono: '配方 · 生產',
      roleZh: '研發的老婆大人',
      photo: '/images/about/crew/wife.png',
      photoAlt: '一張寫生風插畫 ── 廚房工坊一角，銅鍋與木勺、雪松架上熟成中的皂、敞開的配方筆記本與乾燥花材罐',
      body:
        '配方、手壓、切皂、熟成的守候 ── 都是她。廚房裡的那口銅鍋、' +
        '雪松架上的四十二日，都歸她管。第一批十二塊艾草皂，也是她做的。',
      edu:
        '她的口頭禪是：「自己的阿嬤皮膚不能用的，就不做。」' +
        '五力的自檢表壓在鍋邊，每一張新配方先過她那一關。',
    },
    {
      roleMono: '網頁 · 行銷',
      roleZh: '寫字的創作老公',
      photo: '/images/about/crew/husband.png',
      photoAlt: '一張寫生風插畫 ── 寫作者與跑者的書桌一角，敞開的筆記本與鋼筆、咖啡杯與書、桌底擱著一雙跑鞋',
      body:
        '這一頁的字是我寫的；皂是老闆娘做的。我把她的慢工，' +
        '用直白的方式說給更多人聽；網站、文案、寄件回信，也都在我這一端。',
      edu:
        '我相信一個品牌應該像一封信 ── 寫得慢、讀得久、節奏自己定。' +
        '我對這品牌的價值呢，就是直白描述真實故事。',
    },
  ],
};
