// Journal — long-form essays. Static array of posts, no CMS.
//
// Schema per post:
//   slug, kicker, title, lead       (既有)
//   date         YYYY-MM-DD（台灣時區）— JournalIndex 排序用
//   cover        { src, alt, fallback: { tone, flower } } — img with SVG fallback
//   description  60–155 字，給 meta description / og:description
//   keywords     字串陣列，BlogPosting JSON-LD 的 keywords
//   related      其他 POSTS slug 陣列，文末「延伸閱讀」用
//   body         陣列：純字串 → <p>；{type:'h2',text} → <h2>；{type:'faq',items} → FAQ block
//
// Per-article SEO 由 useArticleMeta() 在 JournalPost mount 時注入到 <head>，
// 同時插入 BlogPosting + (有 FAQ 時) FAQPage JSON-LD。
import { useEffect, useState } from 'react';
import { IllSoap } from './Illustrations.jsx';

const SITE_URL = 'https://jinhuasoap.com';
const AUTHOR = '趙老闆娘';
const PUBLISHER = '金花樓';

const POSTS = [
  {
    slug: 'three-oils',
    kicker: '原料之念',
    title: '本舍用什麼油',
    lead: '一塊皂為什麼要混不同油？因為每種油負責不同的事。',
    date: '2025-05-15',
    cover: {
      src: '/images/journal/three-oils.png',
      alt: '工坊木桌上排成一列的橄欖油、椰子油與蓖麻油，金黃色的下午光斜斜照進來',
      fallback: { tone: 'warm', flower: 'rose' },
    },
    description:
      '一塊冷製手工皂為什麼要混橄欖、椰子、蓖麻三種油？因為它們各自帶來不同的脂肪酸 ── 橄欖給保濕、椰子給清潔、蓖麻給泡沫穩定。理解這個你就懂得看任何配方。',
    keywords: ['手工皂配方', '橄欖油', '椰子油', '蓖麻油', '脂肪酸', '冷製皂'],
    related: ['ffa-five-forces', 'saponification'],
    body: [
      '一塊皂從來不是單一油做的。我們每張配方都有三個角色：主體、清潔、功能 ── 它們在皂裡分別給「保濕」、「起泡」、「泡沫穩定」這三件事。',
      { type: 'figure', src: '/images/journal/inline/three-oils-1.png', alt: '三瓶油同時注入一只攪拌缽的手繪示意 ── 橄欖、椰子、棕櫚三種油匯流入皂', caption: '橄欖、椰子、棕櫚 ── 三油各司其職，匯成一塊皂' },
      '主體油是橄欖油 ── 配方裡比例最高的那支，通常 40–70%。它的油酸（Oleic Acid）佔 65–75%，是手工皂保濕的核心。少了它，皂洗起來會澀。經典的馬賽皂直接拉到 70% 橄欖；敏感肌洗臉皂可以再多一點。',
      '清潔油是椰子油 ── 給泡沫、給清潔。月桂酸（Lauric Acid）在它身上佔 48%，是最會「洗掉東西」的脂肪酸。但有另一面：超過 25%，洗完皮膚會緊。所以椰子油通常 15–20%，洗髮皂可以拉到 20–30%，鹽皂跟家事皂才會用 70%+。',
      '功能油是蓖麻油 ── 最不起眼但最關鍵。蓖麻油酸（Ricinoleic Acid）在它身上佔 85–95%，在天然植物油裡是獨一份。它的羥基結構讓泡沫變細緻、停留更久。配方裡只放 5–15%，多了會太黏膩。',
      '為什麼一定要這三組？因為手工皂是脂肪酸的拼圖。油是載體，脂肪酸才是本質 ── 這句話是配方設計的起點。橄欖給保濕、椰子給清潔、蓖麻給泡沫穩定，三個角色各司其職，加起來才是一塊完整的皂。',
      '馬賽皂的經典配方：橄欖 70 / 椰子 15 / 棕櫚 15。三種油，五個洗感全站得住 ── 這就是它兩百年來的理由。',
    ],
  },
  {
    slug: 'ffa-five-forces',
    kicker: '設計之念',
    title: '脂肪酸與五力',
    lead: '油只是載體，脂肪酸才是本質。五力，是一塊皂的健康檢查表。',
    date: '2025-11-04',
    cover: {
      src: '/images/journal/ffa-five-forces.png',
      alt: '老闆娘鍋邊壓著一張手寫的五力雷達圖，表格上有清潔、泡沫、保濕、硬度、溫潤的數字',
      fallback: { tone: 'deep', flower: 'mugwort' },
    },
    description:
      '油只是載體，脂肪酸才是手工皂的本質。學會看油酸、月桂酸、棕櫚酸、蓖麻油酸的比例，你就能讀懂任何配方的洗感。「五力」是老闆娘在鍋邊用的健康檢查表。',
    keywords: ['脂肪酸', '油酸', '月桂酸', '蓖麻油酸', '配方設計', '五力', '冷製皂'],
    related: ['three-oils', 'ins-value'],
    body: [
      '剛開始做皂的人，會很快發現一個秘密：不同的植物油，進到皂裡之後，「名字」就不重要了 ── 重要的是各自帶了什麼比例的脂肪酸。',
      '橄欖油是「油酸」家族 ── 給的是保濕與滑順。椰子油是「月桂酸」家族 ── 給的是清潔與泡沫。棕櫚油是「棕櫚酸」家族 ── 給的是硬度。蓖麻油是「蓖麻油酸」家族 ── 給的是泡沫細緻度。',
      '一塊皂的洗感，就是這些脂肪酸按比例混合出來的結果。油是載體，脂肪酸才是本質 ── 這句話是整個配方設計的起點。',
      '學會這件事之後，就會有「五力」──',
      '清潔力、泡沫力、溫潤度、保濕、硬度。',
      '這五個維度，對應五組脂肪酸；每一款配方都可以拉出一張五邊形圖，看它偏哪一邊、欠哪一邊。我們在鍋邊壓了一張檢查表，每一款新配方投產前，都要先算過一遍五力 ── 清潔不能太高（太乾），泡沫不能太低（不起泡），保濕不能太低（用完皮膚繃），硬度不能太低（變形），溫潤度則視皂的用途調整。',
      { type: 'figure', src: '/images/journal/inline/ffa-five-forces-1.png', alt: '五邊形雷達圖手繪示意 ── 五個頂點分別代表清潔、泡沫、溫潤、滑順、硬度', caption: '五力雷達圖 ── 一塊皂的健康檢查表' },
      '五樣都顧到，才算是一塊對得起肌膚的皂。',
      '這也是我們為什麼敢說「花材只是風韻」── 桂花、艾草、玫瑰，它們都是加在底層五力已經站穩的皂上的裝飾。如果五力不穩，花再香也救不回來。',
      '一個配方的尊嚴，是從脂肪酸開始的。',
    ],
  },
  {
    slug: 'saponification',
    kicker: '工藝之念',
    title: '油遇到鹼，就成了皂',
    lead: '手工皂為什麼洗後不乾澀？因為甘油是這個反應自然生出來的副產物。',
    date: '2025-07-08',
    cover: {
      src: '/images/journal/saponification.png',
      alt: '冷製鍋裡剛打完 trace 的皂液，淡黃色濃稠表面留下一道攪拌棒滑過的痕跡',
      fallback: { tone: 'cool', flower: 'chrysanthemum' },
    },
    description:
      '手工皂的化學其實很簡單：油脂遇到鹼，中和之後生成皂跟甘油。為什麼洗手工皂不乾澀？因為這個甘油（Glycerin）是反應自然生出來的副產物 ── 工業洗劑會抽走它，手工皂保留下來。',
    keywords: ['皂化反應', '甘油', '手工皂保濕', '冷製皂', 'NaOH', '氫氧化鈉'],
    related: ['three-oils', 'trace', 'cold-vs-hot-process'],
    body: [
      '手工皂背後的化學其實很簡單：油脂遇到鹼，中和之後，生成皂跟甘油。',
      { type: 'figure', src: '/images/journal/inline/saponification-1.png', alt: '兩個玻璃量杯倒入第三個燒瓶的手繪示意，箭頭標示化學反應', caption: '油脂 + 鹼 → 皂 + 甘油 ── 百年沒變的化學' },
      '油是配方裡的脂肪酸；鹼是氫氧化鈉（NaOH，做固體皂）或氫氧化鉀（KOH，做液態皂）；水把鹼溶解，讓反應跑得起來。中和之後，原本的油脂分子變成「脂肪酸鈉鹽」── 這就是皂。同時還生出一份甘油（Glycerin）── 天然的保濕分子。',
      '甘油是這個反應的副產物，不需要另外加。它在皂體裡均勻分佈，洗手時會留一層薄薄的水分在皮膚上 ── 這就是為什麼很多人洗完手工皂之後不需要急著擦乳液，那層感覺，是甘油給的。',
      '工業洗劑的做法不一樣。它們從合成的界面活性劑出發，配方設計優先考慮「穩定」── 為了讓商品從工廠到貨架到家裡都不變質，甘油在生產過程中通常會被抽掉、另外賣出去。少了甘油，洗起來才會「乾淨利落」── 那個利落，就是肌膚水分被一起帶走的感覺。',
      '理論上完全皂化不會殘留鹼。配方計算時鹼會稍微比理論值少一點（叫做 superfat，留 5–8% 的油不被反應掉），確保所有鹼都用光。剩下的那點油就是「自由油」── 它不洗，它在皂裡幫你保濕。',
      '冷製皂的這套化學百年沒變過。我們做的，只是把它做慢、做細而已。',
    ],
  },
  {
    slug: 'trace',
    kicker: '工藝之念',
    title: 'Trace 是判斷的時刻',
    lead: '把皂液攪到能在表面留下痕跡 ── 那就是 trace，可以入模了。',
    date: '2025-09-12',
    cover: {
      src: '/images/journal/trace.png',
      alt: '攪拌棒拉起來的瞬間，淡黃色皂液在鍋面落下一道短短的線狀痕跡',
      fallback: { tone: 'cool', flower: 'pine' },
    },
    description:
      'Trace 是冷製皂判斷可以入模的關鍵時刻。皂液變濃、攪拌棒拉起留痕的那一瞬間，就是。輕、中、重三個 trace 對應不同入模需求，這篇講判斷的眉角。',
    keywords: ['trace', '冷製皂', '皂化', '入模', '手工皂教學'],
    related: ['saponification', 'cold-vs-hot-process'],
    body: [
      '冷製皂有一個關鍵時刻叫 trace。',
      '油跟鹼在鍋裡攪拌，一開始是清的、像油湯。攪著攪著，質地慢慢變濃，從油湯變成稀粥，再變成像濃湯的奶醬狀。攪拌棒拉起來的時候，落下去的皂液會在表面留下一道短短的痕跡 ── 那就是 trace。表示皂化反應已經發動，現在可以入模了。',
      { type: 'figure', src: '/images/journal/inline/trace-1.png', alt: '攪拌缽中皂液與木勺落下時留下的緞帶痕跡 ── trace 的瞬間', caption: 'Trace 的那一瞬間 ── 木勺拉起，皂液落下留痕' },
      'Trace 有三個層次：輕、中、重。輕 trace 是痕跡剛出現、流動性還高，適合做渲染、分層；中 trace 是痕跡明顯、可順利倒入模，是一般皂的入模時機；重 trace 像美乃滋一樣濃，適合快速入模或塑形。',
      { type: 'figure', src: '/images/journal/inline/trace-stages-2.png', alt: '三個攪拌缽並排，分別呈現輕中重三個 trace 階段的稠度差異', caption: '輕、中、重 trace ── 同一鍋皂液的三段時間' },
      '判斷哪一階段，要看這支配方做的是什麼。要做漂亮渲染就停在輕 trace；要做緊實的方塊皂就拉到中 trace；要捏出造型就直接打到重。',
      '精油、植萃粉、咖啡渣、礦泥這些添加物，會在 trace 後加。原因有兩個：太早加會被中和過程影響、太晚加皂液已凝固難拌均勻。trace 出現後是一個短暫的窗口，我們會把所有添加物排好順序、一個一個下進去。',
      '會影響 trace 速度的東西很多 ── 蜂蜜跟糖會加速（溫度上升）；酒類（清酒酒粕、米酒）會延緩；椰子油比例高 trace 變快（短鏈反應快）；油酸高的純橄欖配方 trace 慢，要更耐心。',
      'Trace 不是公式能算的時刻 ── 它是一個由眼睛、攪拌棒、與經驗告訴你的瞬間。我們鍋邊都會放一張秒錶，但決定下模的還是手感。',
    ],
  },
  {
    slug: 'yes-palm',
    kicker: '原料之念',
    title: '為什麼我們也用棕櫚油',
    lead: '棕櫚油的爭議我們知道，但配方需要它的硬度，而它的資源效率反而最高。',
    date: '2025-12-20',
    cover: {
      src: '/images/journal/yes-palm.png',
      alt: '棕櫚樹下盛裝在玻璃瓶裡的金紅色棕櫚油，旁邊是一塊已熟成的方形手工皂',
      fallback: { tone: 'warm', flower: 'osmanthus' },
    },
    description:
      '棕櫚油在手工皂界有爭議，但禁用棕櫚油不一定是更環保的選擇。同樣土地產油效率：棕櫚是大豆的 8 倍、橄欖的 10 倍。我們選擇用，但把為什麼說清楚 ── 可追溯來源、低比例、長熟成。',
    keywords: ['棕櫚油', 'No Palm', '永續', '手工皂環保', '硬度油'],
    related: ['three-oils', 'ffa-five-forces'],
    body: [
      '棕櫚油是一個會被討論的原料。它的爭議很真實：過去半個世紀東南亞的雨林大規模被開墾種棕櫚樹，棲地被破壞、生物多樣性受損 ── 這是它最直接的成本。很多手工皂品牌會直接拒用，貼上「No Palm」當作態度。',
      '我們選擇用，但要把為什麼說清楚。',
      '棕櫚油在配方裡的角色是結構油。棕櫚酸（Palmitic Acid）佔它 45%，給的是硬度與穩定性。一塊皂如果沒有結構油，洗到一半就會塌掉、變形、沖一沖就化。在台灣這種潮濕的氣候，這件事特別敏感。',
      '要替代棕櫚？技術上可以 ── 用乳木果脂、可可脂、或拉長熟成時間。我們也試過，但結果是：成品會稍微軟、保存期短一點、運送過程容易變形。對一個手工小批次來說，成本反映在價格與良率上。',
      '值得攤開來看的是這組數字：同樣一公頃的土地，棕櫚一年產的油是大豆的 8 倍、是橄欖的 10 倍。換一個角度想：如果全世界禁用棕櫚改用其他植物油，需要砍掉的雨林面積會是現在的好幾倍。「No Palm」這件事，只在你能保證上游可追溯的前提下才是真的環保選擇；否則只是把問題推到別的作物頭上。',
      { type: 'figure', src: '/images/journal/inline/yes-palm-1.png', alt: '棕櫚樹與棕櫚油瓶之間的天平秤手繪示意，暗示產量效率', caption: '一公頃的產出比 ── 棕櫚 vs 大豆 vs 橄欖' },
      '我們選擇的方式有幾條：盡量用可追溯來源的棕櫚油；配方裡棕櫚比例壓到 10–20%，不超過；每批配方比例公開（產品頁可以看到）；透過讓皂耐用（陳化時間長、不易消耗）來把總體用量壓低。',
      '一塊耐用、不易消耗的皂，本身就是一種環保。',
    ],
  },

  // ============== 新文章 ==============

  {
    slug: 'skin-ph-acid-mantle',
    kicker: '皮膚之念',
    title: '臉、身體、頭髮的清潔密碼',
    lead: '健康皮膚是 pH 4.5–5.5 的弱酸性，但冷製皂洗起來是鹼性 ── 為什麼還能用？什麼時候不能用？',
    date: '2026-01-25',
    cover: {
      src: '/images/journal/skin-ph-acid-mantle.png',
      alt: '溫水中浸著兩塊皂 ── 一塊琥珀色的冷製皂、一塊奶白色的弱酸皂餅，旁邊放一支 pH 試紙',
      fallback: { tone: 'warm', flower: 'osmanthus' },
    },
    description:
      '健康皮膚是 pH 4.5–5.5 的弱酸性，冷製手工皂卻是 pH 8–10 的鹼性。為什麼洗身體 OK、洗臉可能緊繃？老闆娘用皮脂膜的概念解釋鹼性皂跟弱酸皂餅的分工，幫你判斷哪個部位適合哪一種。',
    keywords: ['皮脂膜', 'pH 值', '弱酸性肥皂', '皮膚酸鹼', '洗臉皂', '弱酸皂餅', 'acid mantle'],
    related: ['saponification', 'three-oils', 'botanical-design-truth'],
    body: [
      '健康皮膚的表面是 pH 4.5–5.5 的弱酸性，這層東西叫做「皮脂膜（acid mantle）」── 由皮脂、汗、與最外層的角質細胞混合形成。它的作用是保護表面、降低外刺激、不讓水分跑光。',
      '冷製手工皂是鹼性的（pH 約 8–10）。意思是你拿它洗澡那一瞬間，皮膚表面的酸鹼會被暫時推上去。「暫時」兩個字很重要 ── 健康皮膚 30–60 分鐘可以自己拉回弱酸。問題在於：不是每個部位、每種皮膚都這麼快回得來。',
      { type: 'figure', src: '/images/journal/inline/skin-ph-acid-mantle-1.png', alt: 'pH 標尺手繪示意 ── 從酸到鹼，標出皮膚、冷製皂、皂餅各自的 pH 位置', caption: 'pH 標尺與三個部位 ── 為什麼一塊皂走天下不夠' },
      { type: 'h2', text: '不同部位的故事不一樣' },
      '身體（軀幹、手腳）皮膚比較厚、皮脂膜恢復力也好，多數人用冷製皂沒問題。這也是為什麼一塊好的冷製沐浴皂可以用很久 ── 它跟你的皮膚有相容空間。',
      '臉就比較敏感。臉部皮膚薄、皮脂分泌的節律也跟身體不一樣，洗完緊繃感會比較明顯，特別是中性偏乾的肌膚。如果洗完臉之後一定要立刻擦乳液、不擦就乾澀，這個訊號可能是：你的臉不適合鹼性皂，至少不是天天用。',
      '頭髮跟頭皮對 pH 最敏感。鹼性會讓毛鱗片打開、頭髮澀、纏在一起 ── 很多人試過冷製洗髮皂之後說「澀死了」就是這個原因。要解決得另外配「酸洗」（檸檬水、醋水）來收回毛鱗片，但這層額外動作不是每個人都願意做。',
      { type: 'h2', text: '弱酸皂餅是另一條路' },
      '弱酸皂餅（pH 5–6）不靠皂化反應，靠的是溫和界面活性劑的組合 ── SCI、SCS、APG、CAPB-LPB 這幾支配出來。它本質上不是皂，是用「皂的形狀」做的弱酸性洗劑。',
      '為什麼老闆娘的「五皂五境」要分這麼細？因為臉、身體、頭髮、洗手對 pH 的耐受度不一樣。一塊皂走天下是浪漫，但對皮膚不是最好的。',
      { type: 'h2', text: '判斷你需要哪一種' },
      '健康、青壯年、皮膚耐操 → 冷製皂洗全身可以。',
      '熟齡、敏感肌、異位性皮膚炎傾向 → 身體用冷製、臉用弱酸皂餅。',
      '頭皮油 / 頭髮容易毛躁 → 至少頭髮用弱酸洗髮餅。',
      '小孩、嬰兒 → 弱酸皂餅為主，皮脂膜還沒完全成熟。',
      {
        type: 'faq',
        items: [
          {
            q: '冷製手工皂的 pH 真的有 8–10 那麼鹼嗎？',
            a: '是的。完全皂化的冷製皂，pH 試紙測下去通常落在 8–10。這是皂化反應的本質決定的，不是「處理不好」造成的。',
          },
          {
            q: '聽說手工皂是「弱酸性」的？',
            a: '常見的誤解。手工皂的化學本質就是鹼性。所謂「弱酸皂」、「pH 5.5 皂餅」其實是不靠皂化反應做出來的弱酸性洗劑，跟傳統手工皂是兩件事。',
          },
          {
            q: '我用冷製皂洗臉很多年都沒事，是不是我特別？',
            a: '不是特別 ── 皮脂膜恢復力強的人多得很。但隨著年齡增加，恢復力會慢慢降，所以年輕時 OK 不代表永遠 OK。觀察自己洗完的感受，緊繃感變強是訊號。',
          },
          {
            q: '弱酸皂餅看起來像皂、洗起來像皂，跟一般沐浴乳的差別在哪？',
            a: '差別在配方透明度跟添加物。沐浴乳通常含香精、防腐劑、增稠劑；弱酸皂餅是把幾支溫和界面活性劑用粉壓成形，配方乾淨、不需防腐劑（含水率低）。',
          },
        ],
      },
    ],
  },

  {
    slug: 'cold-vs-hot-process',
    kicker: '工藝之念',
    title: '冷製、熱製、融化再造 ── 為什麼我們堅持冷壓',
    lead: '同樣是手工皂，工法不同，洗感差很多。冷製、熱製、融化再造三條路，差在溫度、時間、跟甘油去哪裡。',
    date: '2026-02-18',
    cover: {
      src: '/images/journal/cold-vs-hot-process.png',
      alt: '工坊木桌並列三塊皂 ── 左邊是冷製的米色方塊、中間是熱製的偏黃色塊、右邊是融化再造的透明琥珀皂',
      fallback: { tone: 'deep', flower: 'pine' },
    },
    description:
      '冷製皂（CP）、熱製皂（HP）、融化再造（MP）是手工皂三種主要工法。冷製在 40°C 慢慢反應、保留甘油與香氣完整；熱製加熱讓皂化更快但顏色偏黃；MP 是用現成皂基塑型。為什麼金花樓堅持冷壓？',
    keywords: ['冷製皂', '熱製皂', '融化再造', 'CP HP MP', '手工皂工法比較', '冷壓皂'],
    related: ['saponification', 'trace', 'three-oils'],
    body: [
      '台灣市面上常聽到的「手工皂」其實是三條路：冷製（CP, Cold Process）、熱製（HP, Hot Process）、融化再造（MP, Melt and Pour）。三條路做出來的東西都叫「手工皂」，但骨子裡差很多。',
      '我們做的是冷製，這篇講為什麼。',
      { type: 'figure', src: '/images/journal/inline/cold-vs-hot-process-1.png', alt: '冷製、熱製、融化再造三種工法的時間軸對照手繪示意，標示溫度與順序', caption: '三條路 ── 冷製、熱製、融化再造的時間軸對照' },
      { type: 'h2', text: '差別一：溫度' },
      '冷製在約 40°C 進行 ── 油跟鹼液都調到 40–45°C，倒在一起、慢慢攪拌到 trace、入模。整個製作時間反應沒有「強制完成」，靠的是 24 小時保溫 + 4–6 週熟成讓反應自然走完。',
      '熱製是把油鹼直接加熱到 80–100°C，用火力把皂化反應推到底。優點是當天就完皂、鹼性殘留低；缺點是高溫會讓皂體偏黃、香氣損失大、外觀粗糙（像粥）。',
      '融化再造（MP）其實不是真的「做」皂 ── 是買現成的皂基塊（已經皂化好的），融化、加色加香、倒模。它做出來的是「客製化造型」而不是「客製化配方」。',
      { type: 'h2', text: '差別二：甘油去哪裡' },
      '皂化反應的副產物是甘油（Glycerin）── 它是手工皂保濕的核心。',
      '冷製：甘油完整保留在皂體裡。',
      '熱製：高溫過程部分甘油會被蒸散或結構破壞，但仍多數留下。',
      'MP：皂基本身的甘油保留度看製造商；多數市售透明皂基會額外加入甘油與多元醇來達到透明感。',
      '工業洗劑：甘油在生產過程通常會被抽走、單獨包裝賣（甘油是高價副產品）。這就是為什麼一般肥皂洗完皮膚會有「乾淨」的緊繃感。',
      { type: 'h2', text: '差別三：精油與植萃的命運' },
      '精油怕熱。精油的香氣分子在高溫下揮發，這是物理事實。冷製在 40°C 加入精油（trace 後），香氣完整保留；熱製在 80–100°C 加，香氣會掉一大截，所以熱製皂很多會用合成香精補。',
      '植萃也類似。咖啡粉、礦泥、薑黃這些粉類添加物，冷製在 trace 後拌進去就好；熱製要看皂液冷下來才能加，操作窗口短。浸泡油在冷製裡完整保留脂溶性活性成分；熱製有部分熱破壞。',
      { type: 'h2', text: '為什麼我們堅持冷壓' },
      '對一個小批次、講究每塊皂手感的工坊，冷製的所有「缺點」（慢、要熟成、要等）反而是它的價值：',
      '— 香氣完整：精油不被熱破壞，每塊皂的氣味都接近你買到時的樣子',
      '— 甘油保留：洗後不需要急著擦乳液',
      '— 配方自由：油脂、植萃、添加物的組合彈性最大',
      '— 外觀細緻：冷製皂可以做出渲染、層次、嵌入式的圖樣，熱製做不到',
      '4–6 週的等待是工法的代價，也是工法的尊嚴。我們鍋邊那張秒錶從來沒有催過皂化反應 ── 它只記錄我們的手。',
      {
        type: 'faq',
        items: [
          {
            q: '冷製皂跟熱製皂哪個比較安全？',
            a: '兩種都安全 ── 只要鹼用量計算正確，皂化反應完成後都不會殘留鹼。熱製的「優勢」是當天就能用，但冷製靠 4–6 週熟成同樣達到完全皂化。',
          },
          {
            q: 'MP（融化再造）算手工皂嗎？',
            a: '工法上是「手工製作」，但本質上是用現成皂基的造型工藝。如果你看重的是配方來源透明，建議找冷製或熱製；如果你看重造型彈性、不在乎配方細節，MP 是合理選擇。',
          },
          {
            q: '為什麼有些手工皂網站說自己是「冷製」但顏色偏黃？',
            a: '原因可能是：橄欖油比例非常高（橄欖原本就帶綠黃）、有用蜂蜜或牛奶（焦糖化）、熟成時間不足。純白色其實在冷製裡反而不容易，要靠特定油脂組合或鈦白粉。',
          },
          {
            q: '冷製皂可以馬上用嗎？',
            a: '不建議。雖然 24 小時就能脫模切皂，但皂化反應跟水分蒸發要 4–6 週才完成。提早用會偏鹼、洗感差、皂體易軟化變形。',
          },
        ],
      },
    ],
  },

  {
    slug: 'ins-value',
    kicker: '設計之念',
    title: 'INS 值 ── 老闆娘看配方第一個看的數字',
    lead: 'INS 值是看一塊皂硬不硬、平不平衡的速查指標。140–160 是甜蜜帶 ── 太低太軟、太高太脆。',
    date: '2026-03-12',
    cover: {
      src: '/images/journal/ins-value.png',
      alt: '配方表上手寫著各油脂比例與 INS 計算結果，旁邊放著老闆娘的鉛筆與小型秤',
      fallback: { tone: 'deep', flower: 'mugwort' },
    },
    description:
      'INS 值（International Numeric Standard）是看一塊手工皂整體平衡度的速查指標 ── 由配方中各油脂的 INS 參考值依比例加權得出。140–160 是常見的甜蜜帶。這篇教你看懂 INS、為什麼老闆娘看配方第一個看它。',
    keywords: ['INS 值', '皂化值', '配方計算', '皂硬度', 'SoapCalc', '手工皂配方'],
    related: ['three-oils', 'ffa-five-forces'],
    body: [
      'INS 值是看一塊皂硬不硬、平不平衡的速查指標。每支油脂都有自己的 INS 參考值，配方整體 INS = 各油比例乘以該油 INS 加權平均。實務上不用手算，丟進 SoapCalc 之類的計算器就好。',
      { type: 'figure', src: '/images/journal/inline/ins-value-1.png', alt: '手繪配方計算紙 ── 四支油的名稱與對應數值，加總到底部的 INS 結果', caption: 'INS 計算 ── 油的加權平均，配方平衡的速查' },
      '為什麼老闆娘看配方第一個看 INS？因為它是一個「整體平衡」的訊號 ── 在你還沒細看每支油脂的脂肪酸組成之前，INS 已經告訴你這配方大概落在哪一檔。',
      { type: 'h2', text: '建議範圍 ── 140–160 的甜蜜帶' },
      'INS 太低（< 130）：皂體會太軟，熟成期長、容易出汗、保存不易。',
      'INS 太高（> 170）：皂體會太脆，洗起來碎屑多、洗感乾澀。',
      '甜蜜帶是 140–160：硬度合理、洗感平衡、適合日常使用。',
      '經典的馬賽皂（橄欖 70 / 椰子 15 / 棕櫚 15）INS 約 140–150，落在甜蜜帶下緣。它的特色是溫潤、保濕高、清潔力溫和 ── 是 INS 數字背後的洗感翻譯。',
      { type: 'h2', text: 'INS 跟其他指標的關係' },
      '一張完整的配方表通常會有四個數字：INS、硬度、清潔、保濕。它們互相牽動但不是同一件事：',
      '硬度（Hardness）30–45 ── 結構穩定，洗到後段不變形',
      '清潔力（Cleansing）12–20 ── 適中、不刺激；超過 25 會乾澀',
      '保濕（Conditioning）40 以上 ── 越高越不乾澀，但太高皂太軟',
      'INS 140–160 ── 整體平衡',
      'INS 是綜合分數，硬度是骨架、清潔是手感、保濕是洗後感受。看配方時這四個數字一起看，才知道它要往哪個方向走。',
      { type: 'h2', text: 'INS 不能取代五力' },
      'INS 是「配方整體偏哪邊」的速查，但它不會告訴你配方裡的每個面向是不是穩。',
      '舉例：兩個 INS 都是 150 的配方，一個是椰子 30 / 橄欖 40 / 棕櫚 30（清潔偏高、可能會乾），另一個是椰子 15 / 橄欖 60 / 棕櫚 15 / 蓖麻 10（溫潤平衡）。INS 一樣，洗感差很多。',
      '所以實際在做配方時，順序是：用途 → 五力目標 → 脂肪酸比例 → 選油 → 用 INS / 硬度 / 清潔 / 保濕 數值檢查 → 加精油 / 添加物。INS 是「驗算」，不是「設計」。',
      { type: 'h2', text: '怎麼學會看 INS' },
      '最快的方式：找你日常洗的某塊手工皂的配方表，對照它的 INS 跟你的洗感體驗。如果 INS 145、洗起來剛好硬度足、不乾澀，那這個 INS 數字之後就是你的「對照組」。',
      '老闆娘鍋邊那張表上常看到的是：145 / 32 / 14 / 56 ── 一個典型「適合每天用的沐浴皂」的數字組合。',
      {
        type: 'faq',
        items: [
          {
            q: 'INS 值 145 是好還是不好？',
            a: '145 在甜蜜帶（140–160）裡，是個好的中間值。實際洗感還要看脂肪酸組成 ── INS 同分數的兩支配方，洗感可能差很多。',
          },
          {
            q: '怎麼算 INS？',
            a: '公式：把配方中每支油的「比例 × 該油的 INS 參考值」加總。實務上用 SoapCalc / Soap Maker / 各家計算器自動跑，不用手算。',
          },
          {
            q: '熟成時間會影響 INS 嗎？',
            a: '不會。INS 是配方層面的數字，由油脂組成決定，做出來那一刻就確定了。熟成影響的是水分含量跟皂化完整度，但 INS 不變。',
          },
          {
            q: '為什麼有些網站會建議 INS 160 以上？',
            a: '看用途。160+ 適合做家事皂、鹽皂這類追求超硬皂體；日常沐浴 / 洗臉皂建議 145–160 比較不刺激。',
          },
        ],
      },
    ],
  },

  {
    slug: 'botanical-design-truth',
    kicker: '設計之念',
    title: '加了牛奶咖啡就會變好用？植萃設計的真相',
    lead: '初學者最常想：皂太乾就加牛奶蜂蜜試試。錯。脂肪酸是骨架，植萃是裝飾 ── 順序不能反。',
    date: '2026-04-22',
    cover: {
      src: '/images/journal/botanical-design-truth.png',
      alt: '工坊桌上排成弧線的植萃材料 ── 咖啡粉、薑黃粉、礦泥、紫草根，旁邊有一個冷凍成冰塊的牛奶模具',
      fallback: { tone: 'warm', flower: 'osmanthus' },
    },
    description:
      '初學者常想：皂太乾就加牛奶或蜂蜜試試。錯。植萃（牛奶、咖啡、礦泥、浸泡油）是讓皂加分的裝飾，不是修補配方的補丁。三種設計法（浸泡油 / 粉類 / 水相替代）何時用、不能犯什麼錯。',
    keywords: ['植萃設計', '牛奶皂', '咖啡皂', '浸泡油', '礦泥皂', '手工皂添加物', '植物油'],
    related: ['ffa-five-forces', 'three-oils', 'trace'],
    body: [
      '一個常見的問題：「我做的皂太乾，加牛奶或蜂蜜會變好用嗎？」',
      '答：不會。',
      { type: 'figure', src: '/images/journal/inline/botanical-design-truth-1.png', alt: '一塊樸素皂與一塊堆滿植萃的皂並排對照手繪示意', caption: '光禿 vs 過度裝飾 ── 順序不能反' },
      '植萃（牛奶、咖啡、蜂蜜、礦泥、浸泡油）能做的事，是讓一塊本來就站得住的皂多一個層次的香氣、顏色、觸感。它不能修補一張不平衡的配方。如果你的皂洗起來乾澀，是脂肪酸比例的問題，不是缺一勺蜂蜜。',
      { type: 'h2', text: '正確的設計順序' },
      '老闆娘鍋邊壓的順序是：① 先設計脂肪酸 → ② 再選油脂 → ③ 最後加入植萃。',
      '這個順序不能反。理由很簡單：脂肪酸決定洗感的骨架（清潔、泡沫、保濕、硬度），這個底層如果歪了，加再多牛奶都壓不住。植萃的價值在「之上」── 提升使用體驗、增加產品特色、建立品牌風格 ── 不在「修補底層」。',
      { type: 'h2', text: '三種主要的植萃設計法' },
      '第一種：浸泡油（Infused Oil）。把植物（金盞花、薰衣草、紫草、洋甘菊）泡在植物油裡 2–4 週，過濾後取代配方中部分油脂。它帶出來的是脂溶性的活性成分。加入時機跟其他油脂一起秤、一起加熱。',
      '第二種：粉類添加。咖啡粉、礦泥、抹茶、薑黃、紫草粉這些。比例抓在油重的 2–5%，加入時機是 trace 後 ── 太早會被打散、沉底。代表配方：咖啡磨砂皂、海泥礦鹽皂。',
      '第三種：水相替代。把配方裡的水部分或全部換成酒、牛奶、豆漿、米漿、花水。關鍵：必須冷凍成冰塊再溶鹼 ── 不冷凍直接加 NaOH，蛋白質跟糖分會焦化，皂體變深褐色、有臭味。代表配方：蜂蜜牛奶皂、燒酒紅酒皂、豆漿皂。',
      { type: 'h2', text: '顏色跑掉是常態' },
      '植萃在鹼性環境裡很多會變色，這個要先預期：',
      '紅色花青素（紅酒、玫瑰）→ 變褐 / 灰',
      '綠色葉綠素 → 大部分褪成土黃',
      '穩定能保色的：咖啡粉（褐）、礦泥（藍灰 / 粉紅）、紫草（紫）、薑黃（黃）',
      '所以你若想做「玫瑰色的玫瑰皂」── 用玫瑰花瓣會失敗，要用粉紅礦泥或紫草搭配玫瑰精油。植萃設計的功課裡很大一塊是「預測它在皂裡會變什麼顏色」，這要做幾批才知道。',
      { type: 'h2', text: '初學者最常犯的錯' },
      '植萃加太多 → trace 速度失控、皂體結構鬆散',
      '未冷凍的牛奶 / 豆漿 + NaOH → 蛋白質焦化（深褐色 + 臭味）',
      '粉類加太早（trace 前）→ 被打散 / 沉底，皂面有色塊不均勻',
      '精油在高溫加 → 香氣完全揮發',
      '把這幾個錯避開，植萃就會做你想要它做的事。',
      {
        type: 'faq',
        items: [
          {
            q: '我配方很基礎（只有橄欖椰子棕櫚），加牛奶蜂蜜會升級嗎？',
            a: '會增加層次（牛奶帶滑順、蜂蜜帶滋潤），但前提是你的脂肪酸組合本來就平衡。如果你目前洗感已經 OK，加植萃是「錦上添花」；如果洗感本身有問題（乾、不起泡、太軟），先回去改配方。',
          },
          {
            q: '咖啡皂真的能去角質嗎？',
            a: '可以。咖啡粉是物理性磨砂顆粒，洗時帶輕度去角質效果。比例 3–5% 是體感剛好的，超過 5% 洗起來會太刮。咖啡因經皮吸收的「提神」「消脂」訴求多半是行銷話術，不要當作藥用。',
          },
          {
            q: '為什麼我做的牛奶皂變成深褐色？',
            a: '幾乎是 100% 因為牛奶沒冷凍直接加 NaOH。蛋白質跟乳糖在高溫下焦化，產生深色 + 異味。下次先把牛奶冷凍成冰塊，溶鹼時用冰塊狀的牛奶代替水，全程低溫操作。',
          },
          {
            q: '浸泡油是不是加越多越好？',
            a: '不是。浸泡油只取代配方中部分（通常 10–30%）的同類植物油。比例太高會稀釋你原本的脂肪酸設計，浸泡的活性成分也用不到那麼多。',
          },
        ],
      },
    ],
  },

  // ============== 置頂與選皂 ==============

  {
    slug: 'how-to-choose-soap',
    kicker: '皮膚之念',
    title: '怎麼挑一塊皂 ── 從你身上開始',
    lead: '從肌膚、季節、用途三個角度走 ── 老闆娘的選皂三問。挑對了，每塊皂用到底都會記得。',
    date: '2026-05-05',
    pinned: true,
    cover: {
      src: '/images/journal/how-to-choose-soap.png',
      alt: '工坊木桌上排成一個半圓 ── 不同顏色的皂塊，從米白、淡綠、橘黃到深褐，旁邊一張手寫的選皂筆記',
      fallback: { tone: 'warm', flower: 'osmanthus' },
    },
    description:
      '金花樓十二款皂、兩款餅，挑哪一塊？老闆娘的選皂三問 ── 你哪一種皮膚、哪一個季節、洗哪一個部位。看完這篇，你會有自己的第一塊。',
    keywords: [
      '手工皂選購',
      '敏感肌手工皂',
      '皂的選擇',
      '金花樓十二花',
      '皂餅推薦',
      '季節皂',
      '部位皂',
    ],
    related: ['why-handmade-soap', 'skin-ph-acid-mantle', 'cold-vs-hot-process'],
    body: [
      '十二款皂兩款餅 ── 第一塊到底要從哪一塊開始？',
      '老闆娘鍋邊的回答從來只有一句：別看花、別看香 ── 看你自己。挑對皂跟挑對牛仔褲一樣，重點不是潮不潮，是合不合身。我們把它整理成「選皂三問」：你是什麼皮膚、什麼季節、洗哪裡 ── 三題答完，第一塊就會自己冒出來。',
      { type: 'h2', text: '第一問：你是什麼皮膚？' },
      '「我是混合肌啦」── 這句話幾乎人人都會說。但混合到底是什麼跟什麼混？',
      '皮膚科分五型：敏感、乾燥、油性、混合、一般。一句話版本 ── 敏感是容易紅癢、乾燥是洗完緊繃、油性是 T 字會反光、混合是 T 字油雙頰乾、一般是「我都沒在管它」那群幸運的人（通常 12 歲以後就告別了）。',
      {
        type: 'figure',
        src: '/images/journal/inline/how-to-choose-soap-1.png',
        alt: '五型皮膚一字排開的手繪小頭像 ── 敏感肌泛紅、乾燥肌脫屑、油性肌 T 字亮、混合肌 T 字油雙頰乾、一般肌平和',
        caption: '五型一字排開 ── 同一張臉，狀況可以不一樣',
      },
      '懶得查資料？做個 30 秒測試 ── 早上溫水洗完臉，什麼都不擦，等 30 分鐘。兩頰緊繃 = 偏乾；T 字發亮 = 偏油；兩種同時出現 = 混合；發紅刺癢 = 敏感；都沒事 = 一般（請珍惜）。',
      {
        type: 'figure',
        src: '/images/journal/inline/how-to-choose-soap-2.png',
        alt: '30 秒自測法的手繪示意 ── 鏡子前的臉、沙漏、水滴',
        caption: '30 分鐘 ── 皮膚自己會招供',
      },
      '對到金花樓的選法（這份不用背、有點概念就好）：',
      '敏感、痘痘、瑕疵 → 花神守護系列（海棠 / 金盞 / 綠豆 / 蝶豆）。配方共識：椰子油壓低、橄欖跟乳油木果脂多一點，洗完不緊。',
      '乾燥、熟齡、被刺激過 → 霧蜜、桂花。蜂蜜跟桂花浸泡油把保濕拉到最高，配方厚實 ── 冬天的好朋友。',
      '油性、混合、會出油 → 綠豆、蝶豆。研磨綠豆粉跟蝶豆花走「清而不剝」 ── 把該代謝的代謝掉，但不會洗到緊。',
      '一般肌 → 大米、酒粕、桂花。這三款最溫吞，每天用都適合，也是送人不會出錯的安全牌。',
      { type: 'h2', text: '第二問：你在哪個季節？' },
      '七月午後慢跑回家、十二月寒流洗完手連擦護手霜都來不及 ── 同一個人，兩種畫面，需要的皂差很多。',
      '我們不是先想季節再湊配方，是反過來 ── 看每支油料能做什麼，再對應到什麼天氣最舒服。夏天我們挑荷荷芭、薰衣草粉、綠豆粉、蝶豆花（清爽不悶）；冬天蜂蜜、瓊崖海棠油、乳油木果脂、桂花浸泡油（保濕鎖水）；春秋換季最敏感，金盞、米糠、酒粕當溫和過渡。',
      {
        type: 'figure',
        src: '/images/journal/inline/how-to-choose-soap-3.png',
        alt: '夏 / 冬 / 春秋三組原料的等距俯視拼盤手繪',
        caption: '三季原料拼盤 ── 配方先看原料能做什麼，季節是後話',
      },
      '把原料放回畫面，立刻有感覺：',
      '七月慢跑回家想沖澡 → 一皂到底·清爽款（荷荷芭 + 薰衣草粉）。汗、油、體味一塊洗掉，沖完還帶點涼。',
      '十二月寒流洗手乾裂 → 桂花潤膚或霧蜜。洗完雙手不用追著擦護手霜，皂體自己留下一層滋潤。',
      '過年回中部換水換氣候，臉開始發癢 → 金盞舒緩。換水換床單最不耐煩那幾天，金盞花溫和過渡。',
      { type: 'h2', text: '第三問：你要洗哪個部位？' },
      '人體不是只有一塊皮膚 ── 它是好幾種皮膚的拼貼。臉角質薄、頭皮毛囊密、軀幹皮脂厚、手腳更厚。同一塊皂從頭洗到腳，臉一定先抗議。',
      '所以皂分三條路：身體用任何一款冷製皂都行，看順眼順鼻就好；臉看膚況 ── 健康肌冷製沒事，敏感或偏乾選溫和款（海棠、金盞）或弱酸皂餅（茉莉沐膚）；頭髮獨立 ── 山茶淨髮髮餅 pH 5–6，跟頭皮原生酸鹼合得來，不用再酸洗收尾。旅行就帶一皂到底（清爽 / 保濕），固體不漏、機場安檢無痛。',
      {
        type: 'figure',
        src: '/images/journal/inline/how-to-choose-soap-4.png',
        alt: '一張人體側影 ── 頭、臉、肩三個部位連到對應的髮餅、臉皂、身體皂',
        caption: '皂分三條路 ── 一塊不夠，但兩塊就剛好',
      },
      { type: 'h2', text: '一張對照表' },
      '三問疊起來，懶得讀全文也能一眼挑（每行附「為什麼」）：',
      '冬天敏感肌全身用 → 海棠 / 金盞 / 霧蜜｜瓊崖海棠油修復屏障、長濱金盞花溫和舒緩、霧峰蜂蜜深度鎖水',
      '夏天油性肌全身用 → 蝶豆 / 綠豆 / 一皂到底·清爽｜蝶豆花抗氧化提亮、綠豆粉幫角質代謝、荷荷芭油平衡皮脂',
      '日常洗臉 → 茉莉沐膚（弱酸皂餅）／海棠（冷製，敏感肌）｜茉莉沐膚 pH 5–6 接近肌膚原生酸鹼；海棠最修復',
      '日常洗頭 → 山茶淨髮髮餅｜pH 5–6 不打開毛鱗片、山茶花油給髮絲輕脂、蠶絲蛋白順髮',
      '旅行 / 運動一塊到底 → 一皂到底·清爽（夏）／保濕（冬）｜荷荷芭油同源皮脂全身能洗，固體不漏',
      '送禮 → 桂月流金·桂花｜桂花浸泡油甜香不挑人、配方溫和、外觀米黃帶桂花橙點',
      { type: 'h2', text: '選定一塊，用四週看看' },
      '冷製皂不是工業洗劑那種「一試就知道好不好」的東西 ── 它跟皮膚有相性，需要時間。建議的方法很簡單：選一塊，每天用，連用四週。皮膚自己會告訴你答案。',
      {
        type: 'figure',
        src: '/images/journal/inline/how-to-choose-soap-5.png',
        alt: '一條皂塊從新到用小、四週的手繪變化序列，上方有月曆',
        caption: '一塊用四週 ── 皂塊變小、皮膚變平穩，那就是你的那一塊',
      },
      '四週後皮膚平穩、洗完不緊、每天願意拿起來，那就對了。如果還是微微緊或乾，換鄰近一級（例如海棠 → 霧蜜往厚實移一檔）。一塊大概用兩個多月，慢慢洗、慢慢挑。',
      {
        type: 'faq',
        items: [
          {
            q: '我同時是敏感又油性，該選哪一邊？',
            a: '優先選「溫和」這一邊 ── 蝶豆或綠豆。這兩款設計兼顧角質代謝跟低刺激，比較不會洗完反而冒更多油出來。',
          },
          {
            q: '怎麼知道一塊皂適不適合我？',
            a: '看洗完當下跟半小時後的感受。「洗完緊、半小時恢復」是正常範圍；「洗完緊到必須立刻擦保養品」就是太鹼或不夠溫和，換一檔。',
          },
          {
            q: '一塊可以洗臉又洗身體嗎？',
            a: '技術上可以，但臉皮膚比較薄，鹼性衝擊比身體明顯。如果洗臉只有「一點點緊」OK，那就一塊到底；緊到不舒服，分兩塊（身體用冷製、臉用弱酸皂餅）穩當多。',
          },
          {
            q: '送禮三塊組怎麼搭？',
            a: '「日常香氣 + 冬天修復 + 夏天清爽」三層最保險。例：桂花（不挑人）+ 海棠（敏感肌都行）+ 一皂到底·清爽（運動 / 夏日）。對方頭皮敏感再加一塊山茶淨髮。送禮核心是「他都用得到」 ── 三塊覆蓋不同情境最不會 NG。',
          },
        ],
      },
    ],
  },

  {
    slug: 'why-handmade-soap',
    kicker: '設計之念',
    title: '為什麼用手工皂 ── 跟皂餅的差別在哪',
    lead: '市售肥皂洗完緊、沐浴乳一瓶接一瓶。手工皂跟弱酸皂餅各自解一塊問題 ── 你不一定要二選一。',
    date: '2026-05-04',
    cover: {
      src: '/images/journal/why-handmade-soap.png',
      alt: '工坊桌面三件並排 ── 一塊冷製皂、一塊弱酸皂餅、一瓶開蓋的市售沐浴乳，光線從左斜入',
      fallback: { tone: 'cool', flower: 'pine' },
    },
    description:
      '手工皂 vs 皂餅 vs 工業沐浴乳：差別在哪、適合誰用？冷製手工皂保留甘油、洗完不緊；皂餅 pH 5–6 對臉與頭皮更友善。一篇說清楚兩者的設計用意。',
    keywords: [
      '手工皂',
      '皂餅',
      '弱酸皂餅',
      '沐浴乳比較',
      'SCI',
      '表面活性劑',
      '為什麼用手工皂',
    ],
    related: ['skin-ph-acid-mantle', 'saponification', 'cold-vs-hot-process'],
    body: [
      '常被問三個問題：為什麼要用手工皂？跟一般肥皂差在哪？跟皂餅又是什麼關係？這篇一次講清楚 ── 因為它們不是「誰比較好」的競爭關係，是各解一塊問題的工具。',
      { type: 'h2', text: '為什麼用手工皂' },
      '冷製手工皂跟工業沐浴乳，本質是兩種不同的清潔思路。',
      '甘油保留：皂化反應的副產物是甘油（Glycerin），它是天然的保濕分子。冷製皂把甘油完整留在皂體裡，洗完手腳不需要急著擦乳液 ── 那層薄薄的滋潤感，是甘油給的。工業沐浴乳的甘油在生產過程通常會被抽走（甘油是高價副產品另外賣），所以洗完才會「乾淨利落」── 那個利落，其實是肌膚水分被一起帶走的感覺。',
      '配方透明：一張冷製皂的配方表，每一支油是什麼、佔多少、為什麼這樣配，都可以攤開講。橄欖、椰子、棕櫚、蓖麻、乳油木果脂這些材料 ── 看得到、問得到。市售沐浴乳的成分表常常只列「水、清潔成分、香料、防腐劑」── 細節是商業機密。',
      '香氣完整：精油怕熱。冷製皂在 40°C 加入精油，香氣完整保留；工業洗劑為了穩定，多用合成香精，氣味會更「強」但層次少。',
      '用得久：一塊 100g 左右的手工皂，每天用大約能撐兩個多月。算下來，比買瓶身大一點的沐浴乳便宜 ── 而且少一個塑膠瓶。',
      { type: 'h2', text: '工業洗劑的設計目的不一樣' },
      '我們不會說「沐浴乳就是不好」── 因為它的設計目標不一樣。沐浴乳要在貨架上放半年不變質、要在不同硬度的水裡都起泡、要香氣跨季節穩定。為了達到這些，配方裡會多防腐劑、增稠劑、起泡劑、合成香精 ── 這些不是「壞」，是「設計取捨」。',
      '手工皂從來不是要取代沐浴乳所有的功能，是給願意花一點時間挑、用、體會的人，另一條洗澡的路。',
      { type: 'h2', text: '那皂餅又是什麼？' },
      '皂餅看起來像皂、洗起來像皂，但化學上其實不是皂。',
      '冷製手工皂的本質是「皂化反應」── 油脂跟強鹼中和生成脂肪酸鹽。pH 8–10，鹼性。',
      '弱酸皂餅的本質是「界面活性劑混合」── 把幾支溫和的天然來源界面活性劑（SCI、SCS、APG、CAPB-LPB 這幾支）跟結構粉混合、壓成型。pH 5–6，弱酸性。它不靠皂化反應，所以嚴格說它不是皂。',
      '為什麼還叫「皂餅」？因為形狀像、使用方式像 ── 一塊固體放在皂盤上、用水搓出泡沫洗。但骨子裡是「弱酸性洗劑壓成形」。這也是它跟冷製皂最大的差異 ── 不是工法不同，是化學完全不同。',
      { type: 'figure', src: '/images/journal/inline/why-handmade-soap-1.png', alt: '冷製皂、皂餅、沐浴乳三種清潔劑並排手繪示意，下方標示各自 pH', caption: '三種清潔劑 ── 同形狀、不同化學、不同 pH' },
      { type: 'h2', text: '什麼人適合用皂餅' },
      '皂餅最大的優勢是 pH 跟肌膚相近 ── 不會打亂表面酸鹼。所以下面這幾種狀況，皂餅是更好的選擇：',
      '頭髮 / 頭皮：鹼性會讓毛鱗片打開、頭髮澀、糾結。弱酸髮餅（山茶淨髮）這條路比較友善 ── 洗完不需要再做酸洗收尾。',
      '臉：臉部皮膚薄、皮脂膜恢復力比身體弱。如果你洗冷製皂之後覺得「緊到必須立刻擦保養」，皂餅是另一個方向。',
      '嬰幼兒：皮脂膜還沒完全成熟。pH 5–6 的弱酸皂餅比鹼性冷製皂保險。',
      '異位性皮膚炎、極敏感肌：鹼性可能誘發刺激，弱酸環境是相對安全的選擇。',
      '旅行：固體不會漏、不算液體、機場安檢沒問題。',
      { type: 'h2', text: '我們為什麼兩種都做' },
      '因為人不只一塊皮膚。臉、身體、頭髮對 pH 的耐受度本來就不一樣。十二款冷製皂 + 兩款弱酸皂餅，是回應「不同部位需要不同 pH」這個事實。',
      '不是「皂餅取代手工皂」，是「各自適合不同部位」── 全身用冷製、頭髮用弱酸髮餅、臉視膚況選擇。一張完整的洗澡日常，可能會用到兩種。',
      '你不一定要二選一。',
      {
        type: 'faq',
        items: [
          {
            q: '皂餅洗起來真的像皂嗎？',
            a: '泡沫綿密、洗感乾淨、最後一塊一塊地用 ── 體感跟皂很像。差別在 pH（弱酸 vs 鹼性）跟洗後膚感（皂餅較不緊繃、冷製皂較有「皂的清爽感」）。',
          },
          {
            q: '皂餅是化學的嗎？我以為它是天然的',
            a: '皂餅用的界面活性劑（SCI、SCS、APG、CAPB-LPB）多數是椰子油或棕櫚油的衍生物 ── 來源是天然，但要經過化學處理才能成為穩定的界面活性劑。所以「天然」跟「化學」不是對立的兩端。重點是配方乾淨、無香精防腐劑、低敏。',
          },
          {
            q: '皂餅為什麼比一般肥皂貴？',
            a: '原料成本：界面活性劑（特別是 SCI 這支）的單價比植物油高很多；製作工序：要混合、定型、低含水率烘乾，比冷製皂多一道。一塊小小的皂餅原料成本可以是一塊冷製皂的 2–3 倍。',
          },
          {
            q: '我是健康肌膚，全身都用冷製皂就好嗎？',
            a: '可以。健康肌膚的皮脂膜恢復力強，冷製皂洗完 30–60 分鐘自己會回到弱酸。但建議頭髮還是另選弱酸髮餅 ── 不是因為頭皮，是因為頭髮（毛鱗片）對鹼性比較敏感。',
          },
        ],
      },
    ],
  },

  // ============== 儀式之念 ==============

  {
    slug: 'gift-soap',
    kicker: '儀式之念',
    title: '送一塊皂',
    lead: '婚禮、節期、新居、生日 ── 一塊皂能不能當禮，端看你看到對方的什麼。',
    date: '2026-05-15',
    cover: {
      src: '/images/journal/gift-soap.png',
      alt: '工坊木桌上三個用未漂紙包好、繫上麻繩的皂禮，旁邊放一束乾燥小花與一截朱色封蠟',
      fallback: { tone: 'warm', flower: 'osmanthus' },
    },
    description:
      '送一塊皂該怎麼挑？老闆娘的「送禮三問」── 對方是誰、什麼場合、要不要客製。從家人朋友的日常陪伴，到婚禮節期的鄭重小物 ── 一塊皂裡裝的是你看到對方的什麼。',
    keywords: ['手工皂送禮', '婚禮小物', '節日禮品', '客製禮盒', '皂禮', '伴手禮'],
    related: ['how-to-choose-soap', 'why-handmade-soap', 'last-sliver'],
    body: [
      '送禮這件事，比挑自用還難 ── 因為對方的需求你不一定清楚。',
      '老闆娘鍋邊收到最多客製訊息的時候，是過年前後跟夏秋婚季 ── 一句最常聽到的問題：「送一塊皂可以嗎？對方會不會覺得太普通？」',
      '一塊皂能不能當禮，端看你看到對方的什麼。把它做成「對方某個生活情境的補位」，那塊皂會被記住；如果只是「我家有就送你一塊」，它就只是一塊皂。',
      '我們把選禮這件事整理成「送禮三問」── 對方是誰、什麼場合、要不要客製。三題答完，這一份禮會自己浮出來。',
      { type: 'h2', text: '第一問：對方是誰？' },
      '人不一樣，禮就不一樣。最常被問到的五種對象：',
      '給長輩 → 桂花、酒粕、海棠。長輩偏愛清淡甜香（不要花露蓋過去）、洗感要溫潤不刺、配方不能太活潑。桂月流金的桂花溫吞、杜康醉月的酒粕滋潤、瓊崖海棠修復力強 ── 三選一都不會踩雷。',
      '給朋友（同齡）→ 看對方的生活狀態。常運動的朋友 → 一皂到底·清爽；夜班族 / 壓力大的朋友 → 蝶豆（提亮抗氧化）；剛搬家的朋友 → 山茶淨髮髮餅（搬家最容易顧不上頭髮）。',
      '給家人 → 桂花或大米。每天會用、不會挑、洗起來都覺得好 ── 一週兩塊在家裡的浴室、在家人手上是一份穩定的陪伴。',
      '給新手媽媽 → 海棠 + 山茶髮餅這兩件組。產後敏感肌、哺乳期容易流汗、頭髮也常常顧不上 ── 一塊救臉、一餅救頭，比花俏的禮盒實用十倍。',
      '給男性朋友 → 一皂到底·清爽 + 山茶淨髮髮餅。男性多數懶得分臉皂身皂，「一塊到底」最對胃口；山茶淨髮對短髮男性特別好（pH 5–6 不澀、洗完蓬鬆）。',
      {
        type: 'figure',
        src: '/images/journal/inline/gift-soap-1.png',
        alt: '三個用麻繩繫起的皂禮並排手繪示意，每個包裝形狀略有不同，附小卡',
        caption: '三個對象、三種包裝 ── 一份禮的形狀也要對人',
      },
      { type: 'h2', text: '第二問：什麼場合？' },
      '同樣一塊皂，在不同場合說的話不一樣 ── 婚禮上是「願日常都好」、節期裡是「換季多保重」、新居裡是「新地方好好洗一個澡」。',
      '婚禮小物 → 桂花、星米、長金。十二塊起跳（最低訂量），統一配方統一包裝，繫一條紅麻繩附手寫小卡。客人帶回家洗到，就會記得你的婚禮。',
      '節期禮（年節 / 中秋 / 母親節）→ 三塊組為主。常見搭配：「日常香氣 + 季節修復 + 家人共用」── 例如桂花 + 海棠 + 大米。',
      '新居入厝 → 一皂到底（清爽 / 保濕）+ 山茶髮餅。剛搬家什麼都還沒整理好，一份「不挑、好用、能立刻洗澡」的禮最被感謝。',
      '生日 → 對方生日季節對應的皂。夏天生的送清爽款、冬天生的送桂花或霧蜜 ── 一塊生日當下會被使用的皂，比放在抽屜裡的還好。',
      '商務 / 回禮 → 桂花潤膚或茉莉沐膚。香氣不挑性別、配方溫和、外觀斯文 ── 出禮失誤率最低的兩款。',
      { type: 'h2', text: '第三問：要不要客製？' },
      '一般送禮選現成的就好。但有些情境只有客製能接住 ── 婚禮想要兩位新人名字燙金、企業客戶想印 logo 紙籤、家族長輩八十大壽想要一支「家族配方」。',
      '04 購皂頁底部新加了「節禮 · 婚禮」洽詢入口 ── 客製可以做的事：訂量（十二塊起跳）、配方微調（在十二款基礎上調香或調油，成本會反映）、包裝（紙色、繩色、燙金、附卡）。加我們 Line 一敘。',
      '我們從來不接「全新獨家配方」── 一支配方從研發到熟成要一年以上，不可能為單一客戶開模。但「在既有十二款上做包裝跟組合」是我們很樂意一起想的事。',
      { type: 'h2', text: '推薦組合（直接抄）' },
      '三塊組（家人 / 同事日常）→ 桂花 + 海棠 + 一皂到底·清爽。三層覆蓋日常香氣、敏感肌、運動／夏日，對方都用得到。',
      '六塊禮盒（節期送長輩 / 重要客戶）→ 桂花 + 酒粕 + 海棠 + 霧蜜 + 大米 + 山茶髮餅。冬季偏厚實，配酒粕的甜香跟桂花的甘潤 ── 給上一輩最穩當。',
      '十二塊婚禮 / 公司禮盒 → 客製訂單。建議統一兩款內容（例如 桂花 + 大米 各 6 塊），包裝統一、附手寫小卡。完整十二款各一塊也可，但太「展示」── 婚禮回禮以「對方都用得到」為先，不要展示我們有多少款。',
      { type: 'h2', text: '想避開的雷' },
      '別送香氣很重的給香氣偏好不明的人。第一次送禮選甜香（桂花）跟米香（大米、酒粕）最安全 ── 玫瑰艾草都有人會過敏。',
      '別送單塊「貴的那塊」── 對方拿到一塊很厚很貴的皂，反而會覺得「我捨不得用」放著放著就忘了。三塊組的訊息更清楚：「就拿來洗，洗完再說」。',
      '別在春夏潮濕季送沒拆封的禮盒堆著。冷製皂熟成期長、本質耐放，但已開封的禮盒在浴室外接觸潮氣容易軟化 ── 提醒對方「拆了直接放浴室、別再封回去」。',
      '送一塊皂，是把一段日常給對方。',
      {
        type: 'faq',
        items: [
          {
            q: '送一塊還是送一組？',
            a: '送一塊容易讓對方「捨不得用」結果忘記。送三塊以上對方反而知道「就是要每天用」── 三塊組是最低有效送禮量。',
          },
          {
            q: '對方有過敏怎麼辦？',
            a: '事先問一句最保險。若不方便問，挑最低敏的兩款 ── 大米（無香）、海棠（修復款，本來就為敏感肌設計）。這兩款踩到敏感的機率最低。',
          },
          {
            q: '送禮要不要附手寫小卡？',
            a: '比起寫得多漂亮，內容寫對更重要。一句「夏天到了想到你常運動」比「祝身體健康」貼心十倍。一塊皂的禮是訊息載體，卡上的話是訊息本身。',
          },
          {
            q: '婚禮回禮十二塊起跳，數量怎麼算？',
            a: '一般小型婚禮 50–80 份，建議直接訂 60 份 / 80 份的整批，省得單份單份算。我們依總數量給折扣（看複雜度）── 加 Line 給我們大致數字，會回一份報價。',
          },
          {
            q: '禮盒包裝要不要先看？',
            a: '客製案會先發樣張（紙色、繩色、燙金、小卡草稿）給你過目，確認後才正式打包 ── 不會發生「收到才發現跟想像不一樣」的情況。',
          },
        ],
      },
    ],
  },
];

// ============== Helpers ==============

// 排序：pinned 在前、再 date desc — JournalIndex 直接吃這個
const POSTS_BY_DATE = [...POSTS].sort((a, b) => {
  if (!!a.pinned !== !!b.pinned) return a.pinned ? -1 : 1;
  return b.date.localeCompare(a.date);
});

function setMeta(attr, name, content) {
  let el = document.head.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(url) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', url);
}

function setJsonLd(id, data) {
  let el = document.head.querySelector(`script[data-jsonld="${id}"]`);
  if (!el) {
    el = document.createElement('script');
    el.setAttribute('type', 'application/ld+json');
    el.setAttribute('data-jsonld', id);
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

function removeJsonLd(id) {
  document.head.querySelector(`script[data-jsonld="${id}"]`)?.remove();
}

function buildArticleJsonLd(post, url, imageUrl, description) {
  const blogPosting = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description,
    image: imageUrl,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Person', name: AUTHOR },
    publisher: {
      '@type': 'Organization',
      name: PUBLISHER,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.svg` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    keywords: post.keywords?.join(', '),
    inLanguage: 'zh-Hant-TW',
    articleSection: post.kicker,
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '金花樓', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: '本舍小記', item: `${SITE_URL}/journal` },
      { '@type': 'ListItem', position: 3, name: post.title },
    ],
  };

  const faqNode = post.body.find((n) => n && typeof n === 'object' && n.type === 'faq');
  if (faqNode) {
    return [
      blogPosting,
      breadcrumb,
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqNode.items.map((qa) => ({
          '@type': 'Question',
          name: qa.q,
          acceptedAnswer: { '@type': 'Answer', text: qa.a },
        })),
      },
    ];
  }

  return [blogPosting, breadcrumb];
}

// 注入 per-article meta tags + JSON-LD；卸載時還原 base meta
function useArticleMeta(post) {
  useEffect(() => {
    if (!post) return undefined;

    const url = `${SITE_URL}/journal/${post.slug}`;
    const description = post.description || post.lead.slice(0, 155);
    const imageUrl = post.cover?.src
      ? `${SITE_URL}${post.cover.src}`
      : `${SITE_URL}/favicon.svg`;

    const baseTitle = '金花樓 · Goldenflower';
    const baseDescription = document.head
      .querySelector('meta[name="description"]')
      ?.getAttribute('content');
    const originalTitle = document.title;

    document.title = `${post.title} · 本舍小記 · 金花樓`;
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', `${post.title} · 本舍小記 · 金花樓`);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:image', imageUrl);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:type', 'article');
    setMeta('property', 'article:published_time', post.date);
    setMeta('property', 'article:author', AUTHOR);
    setMeta('property', 'article:section', post.kicker);
    if (post.keywords?.length) {
      setMeta('name', 'keywords', post.keywords.join(', '));
    }
    setCanonical(url);
    setJsonLd('article', buildArticleJsonLd(post, url, imageUrl, description));

    return () => {
      document.title = originalTitle || baseTitle;
      if (baseDescription) setMeta('name', 'description', baseDescription);
      setMeta('property', 'og:type', 'website');
      removeJsonLd('article');
      // og:title / og:description / og:image / og:url 不還原 — index.html 的初始值會在
      // 下次 router 進入時被 home / 其他頁面覆寫；強制復原會搶過 SPA 切頁的邏輯
    };
  }, [post]);
}

// Cover 圖：先試 <img>，找不到 fallback 到 IllSoap
function Cover({ post, ratio = '4/3' }) {
  const [errored, setErrored] = useState(false);
  const fb = post.cover?.fallback || { tone: 'warm', flower: 'rose' };

  if (errored || !post.cover?.src) {
    return <IllSoap tone={fb.tone} flower={fb.flower} ratio={ratio} label="" />;
  }

  // build/strip-redundant-pngs.js drops PNGs from dist when AVIF/WebP siblings
  // exist, so a bare <img src=".png"> would 404 in production. Use picture
  // with AVIF → WebP → PNG-fallback so the browser resolves a real file.
  const base = post.cover.src.replace(/\.(png|jpe?g|webp|avif)$/i, '');

  return (
    <div
      style={{
        aspectRatio: ratio,
        overflow: 'hidden',
        background: 'var(--paper-3)',
        position: 'relative',
      }}
    >
      <picture>
        <source type="image/avif" srcSet={`${base}.avif`} />
        <source type="image/webp" srcSet={`${base}.webp`} />
        <img
          src={`${base}.webp`}
          alt={post.cover.alt}
          loading="lazy"
          decoding="async"
          onError={() => setErrored(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </picture>
    </div>
  );
}

function FaqBlock({ items }) {
  return (
    <section
      style={{
        marginTop: 48,
        marginBottom: 16,
        background: 'var(--paper-2)',
        border: '1px solid var(--ink-15)',
        padding: '32px 28px',
      }}
    >
      <div
        className="mono"
        style={{ color: 'var(--gold-3)', marginBottom: 24, letterSpacing: 4 }}
      >
        常見問題 · FAQ
      </div>
      <dl style={{ margin: 0 }}>
        {items.map((qa, i) => (
          <div key={i} style={{ marginBottom: i === items.length - 1 ? 0 : 24 }}>
            <dt
              className="tc"
              style={{
                fontSize: 16,
                fontWeight: 500,
                color: 'var(--sumi)',
                letterSpacing: 2,
                marginBottom: 8,
              }}
            >
              Q. {qa.q}
            </dt>
            <dd
              className="tc"
              style={{
                fontSize: 15,
                lineHeight: 1.95,
                letterSpacing: 1,
                color: 'var(--ink-60)',
                margin: 0,
              }}
            >
              {qa.a}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

// 五種皮膚類型小圖示，文章 body 用 illustration block 嵌入。
// 線條畫風、品牌色，每張 80×80。flex-wrap 讓 mobile 自動換行。
function SkinTypeIcons() {
  const baseStroke = 'var(--gold-2)';
  const accent = 'var(--gold-3)';
  const fill = 'var(--paper)';
  const types = [
    {
      label: '敏感',
      svg: (
        <>
          <circle cx="40" cy="40" r="30" fill={fill} stroke={baseStroke} strokeWidth="1.2" />
          {[
            [32, 32, 2.2],
            [48, 34, 2],
            [38, 50, 2.5],
            [50, 48, 1.8],
            [42, 40, 1.6],
            [30, 44, 1.4],
          ].map(([cx, cy, r], i) => (
            <circle key={i} cx={cx} cy={cy} r={r} fill="var(--red)" opacity="0.55" />
          ))}
        </>
      ),
    },
    {
      label: '乾燥',
      svg: (
        <>
          <circle cx="40" cy="40" r="30" fill={fill} stroke={baseStroke} strokeWidth="1.2" />
          <path
            d="M 24 36 Q 32 40 40 38 Q 48 36 56 42"
            fill="none"
            stroke={accent}
            strokeWidth="0.7"
            opacity="0.85"
          />
          <path d="M 36 24 L 39 32" stroke={accent} strokeWidth="0.7" opacity="0.85" />
          <path d="M 46 27 L 48 35" stroke={accent} strokeWidth="0.7" opacity="0.85" />
          <path
            d="M 28 50 Q 38 53 50 51 Q 56 50 58 53"
            fill="none"
            stroke={accent}
            strokeWidth="0.7"
            opacity="0.85"
          />
          <path d="M 32 56 L 35 62" stroke={accent} strokeWidth="0.7" opacity="0.7" />
        </>
      ),
    },
    {
      label: '油性',
      svg: (
        <>
          <circle cx="40" cy="40" r="30" fill={fill} stroke={baseStroke} strokeWidth="1.2" />
          <ellipse cx="35" cy="32" rx="7" ry="3" fill="white" opacity="0.85" />
          <ellipse cx="50" cy="40" rx="4.5" ry="2.5" fill="white" opacity="0.7" />
          <ellipse cx="38" cy="50" rx="5.5" ry="2.7" fill="white" opacity="0.65" />
          <ellipse cx="48" cy="52" rx="3.5" ry="2" fill="white" opacity="0.55" />
        </>
      ),
    },
    {
      label: '混合',
      svg: (
        <>
          <circle cx="40" cy="40" r="30" fill={fill} stroke={baseStroke} strokeWidth="1.2" />
          <path d="M 40 10 A 30 30 0 0 1 40 70 Z" fill="white" opacity="0.55" />
          <ellipse cx="50" cy="38" rx="5" ry="2.5" fill="white" opacity="0.75" />
          <path d="M 28 36 Q 33 38 36 36" fill="none" stroke={accent} strokeWidth="0.6" opacity="0.7" />
          <path d="M 28 48 Q 33 50 36 48" fill="none" stroke={accent} strokeWidth="0.6" opacity="0.7" />
          <line
            x1="40"
            y1="10"
            x2="40"
            y2="70"
            stroke={accent}
            strokeWidth="0.5"
            strokeDasharray="2,2"
            opacity="0.6"
          />
        </>
      ),
    },
    {
      label: '一般',
      svg: (
        <>
          <circle cx="40" cy="40" r="30" fill={fill} stroke={baseStroke} strokeWidth="1.2" />
          <circle cx="40" cy="40" r="22" fill="none" stroke={accent} strokeWidth="0.5" opacity="0.55" />
          <circle cx="40" cy="40" r="14" fill="none" stroke={accent} strokeWidth="0.4" opacity="0.4" />
        </>
      ),
    },
  ];
  return (
    <div
      style={{
        margin: '24px 0 32px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: 18,
        justifyContent: 'center',
        padding: '20px 8px',
        background: 'var(--paper-2)',
        border: '1px solid var(--ink-15)',
      }}
    >
      {types.map((t) => (
        <figure
          key={t.label}
          style={{ margin: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}
        >
          <svg width="80" height="80" viewBox="0 0 80 80" aria-label={`${t.label}肌示意圖`}>
            {t.svg}
          </svg>
          <figcaption
            className="tc"
            style={{ fontSize: 12, letterSpacing: 3, color: 'var(--sumi)' }}
          >
            {t.label}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

function PostBody({ body }) {
  return (
    <>
      {body.map((node, i) => {
        if (typeof node === 'string') {
          return (
            <p
              key={i}
              className="tc"
              style={{
                fontSize: 17,
                lineHeight: 2,
                letterSpacing: 1.5,
                color: 'var(--sumi)',
                margin: '0 0 24px',
              }}
            >
              {node}
            </p>
          );
        }
        if (node && typeof node === 'object') {
          if (node.type === 'h2') {
            return (
              <h2
                key={i}
                className="tc"
                style={{
                  fontSize: 26,
                  fontWeight: 500,
                  letterSpacing: 5,
                  color: 'var(--sumi)',
                  margin: '40px 0 20px',
                  paddingTop: 8,
                  borderTop: '1px solid var(--ink-15)',
                }}
              >
                {node.text}
              </h2>
            );
          }
          if (node.type === 'faq') {
            return <FaqBlock key={i} items={node.items} />;
          }
          if (node.type === 'illustration' && node.kind === 'skin-types') {
            return <SkinTypeIcons key={i} />;
          }
          if (node.type === 'figure') {
            return (
              <figure
                key={i}
                style={{
                  margin: '36px auto',
                  maxWidth: 600,
                  textAlign: 'center',
                }}
              >
                <picture>
                  <source
                    type="image/avif"
                    srcSet={node.src.replace(/\.(png|jpe?g|webp)$/i, '.avif')}
                  />
                  <source
                    type="image/webp"
                    srcSet={node.src.replace(/\.(png|jpe?g)$/i, '.webp')}
                  />
                  <img
                    src={node.src.replace(/\.(png|jpe?g)$/i, '.webp')}
                    alt={node.alt || ''}
                    loading="lazy"
                    decoding="async"
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                    }}
                  />
                </picture>
                {node.caption && (
                  <figcaption
                    className="tc"
                    style={{
                      fontSize: 13,
                      color: 'var(--gold-3)',
                      marginTop: 12,
                      letterSpacing: 2,
                      lineHeight: 1.6,
                    }}
                  >
                    {node.caption}
                  </figcaption>
                )}
              </figure>
            );
          }
        }
        return null;
      })}
    </>
  );
}

function RelatedLinks({ slugs, navigate }) {
  if (!slugs?.length) return null;
  const related = slugs
    .map((s) => POSTS.find((p) => p.slug === s))
    .filter(Boolean);
  if (!related.length) return null;

  return (
    <section style={{ marginTop: 56, paddingTop: 32, borderTop: '1px solid var(--ink-15)' }}>
      <div
        className="mono"
        style={{ color: 'var(--gold-3)', marginBottom: 18, letterSpacing: 4 }}
      >
        延伸閱讀
      </div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 18 }}>
        {related.map((p) => (
          <li key={p.slug}>
            <a
              href={`/journal/${p.slug}`}
              onClick={(e) => {
                if (e.metaKey || e.ctrlKey || e.shiftKey) return;
                e.preventDefault();
                navigate(`/journal/${p.slug}`);
              }}
              className="tc"
              style={{ color: 'var(--sumi)', display: 'block' }}
            >
              <div
                style={{
                  fontSize: 18,
                  letterSpacing: 3,
                  borderBottom: '1px solid var(--gold-3)',
                  display: 'inline-block',
                  paddingBottom: 2,
                  marginBottom: 6,
                }}
              >
                {p.title}
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: 'var(--ink-60)',
                  lineHeight: 1.7,
                  letterSpacing: 1,
                }}
              >
                {p.lead}
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

function PageHeader({ kicker, title, subtitle, date }) {
  return (
    <section
      className="gf-pad-md gf-tight-md"
      style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: '80px 44px 40px',
        textAlign: 'center',
      }}
    >
      <div className="mono" style={{ color: 'var(--red)' }}>
        {kicker}
      </div>
      <h1
        className="tc gf-h1-md"
        style={{
          fontSize: 64,
          fontWeight: 500,
          letterSpacing: 14,
          margin: '16px 0 10px',
          color: 'var(--sumi)',
        }}
      >
        {title}
      </h1>
      {subtitle && (
        <div
          className="tc"
          style={{ fontSize: 18, color: 'var(--gold-3)', letterSpacing: 6 }}
        >
          {subtitle}
        </div>
      )}
      {date && (
        <time
          dateTime={date}
          className="mono"
          style={{
            display: 'inline-block',
            marginTop: 18,
            color: 'var(--ink-60)',
            fontSize: 11,
            letterSpacing: 3,
          }}
        >
          {date}
        </time>
      )}
    </section>
  );
}

function InkLink({ href, navigate, children, style }) {
  return (
    <a
      href={href}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
        e.preventDefault();
        navigate(href);
      }}
      className="tc"
      style={{
        color: 'var(--sumi)',
        borderBottom: '1px solid var(--gold-3)',
        paddingBottom: 2,
        ...style,
      }}
    >
      {children}
    </a>
  );
}

// ============== Pages ==============

export function JournalIndex({ navigate }) {
  useEffect(() => {
    document.title = '本舍小記 · 金花樓';
  }, []);

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <PageHeader kicker="金花樓 · 本舍" title="本舍小記" subtitle="慢慢寫 · 慢慢讀" />
      <section
        className="gf-pad-md"
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: '20px 44px 80px',
        }}
      >
        <div
          className="tc"
          style={{
            maxWidth: 620,
            margin: '0 auto 56px',
            fontSize: 16,
            lineHeight: 1.85,
            color: 'var(--ink-60)',
            letterSpacing: 1,
            textAlign: 'center',
          }}
        >
          一週寫一兩篇，關於油、關於鹼、關於水、也關於我們自己的這些慢工。
          為自己寫，把手邊的想法慢慢留下來。
        </div>
        <div
          className="gf-stack-md"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 40,
          }}
        >
          {POSTS_BY_DATE.map((p) => (
            <article
              key={p.slug}
              style={{
                padding: 0,
                border: `1px solid ${p.pinned ? 'var(--gold-3)' : 'var(--ink-15)'}`,
                background: 'var(--paper)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              {p.pinned && (
                <span
                  className="mono"
                  style={{
                    position: 'absolute',
                    top: 12,
                    left: 12,
                    zIndex: 2,
                    background: 'var(--red)',
                    color: 'var(--gold-2)',
                    padding: '5px 10px',
                    fontSize: 9,
                    letterSpacing: 3,
                    border: '1px solid var(--gold-1)',
                  }}
                >
                  編輯精選
                </span>
              )}
              <Cover post={p} ratio="4/3" />
              <div
                style={{
                  padding: 28,
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    gap: 12,
                    flexWrap: 'wrap',
                  }}
                >
                  <div className="mono" style={{ color: 'var(--red)' }}>
                    {p.kicker}
                  </div>
                  <time
                    dateTime={p.date}
                    className="mono"
                    style={{ color: 'var(--ink-60)', fontSize: 10, letterSpacing: 2 }}
                  >
                    {p.date}
                  </time>
                </div>
                <h2
                  className="tc"
                  style={{
                    fontSize: 28,
                    fontWeight: 500,
                    letterSpacing: 5,
                    margin: '14px 0 12px',
                    color: 'var(--sumi)',
                    lineHeight: 1.3,
                  }}
                >
                  {p.title}
                </h2>
                <p
                  className="tc"
                  style={{
                    fontSize: 15,
                    lineHeight: 1.85,
                    letterSpacing: 1,
                    color: 'var(--ink-60)',
                    margin: '0 0 22px',
                  }}
                >
                  {p.lead}
                </p>
                <div style={{ marginTop: 'auto' }}>
                  <InkLink
                    href={`/journal/${p.slug}`}
                    navigate={navigate}
                    style={{ fontSize: 14, letterSpacing: 3 }}
                  >
                    繼續閱讀 →
                  </InkLink>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export function JournalPost({ slug, navigate }) {
  const post = POSTS.find((p) => p.slug === slug);
  useArticleMeta(post);

  if (!post) {
    return (
      <div
        style={{
          maxWidth: 720,
          margin: '0 auto',
          padding: '120px 44px',
          textAlign: 'center',
        }}
      >
        <div className="mono" style={{ color: 'var(--red)' }}>
          404
        </div>
        <h1 className="tc" style={{ fontSize: 40, letterSpacing: 8, margin: '20px 0' }}>
          此文未尋著
        </h1>
        <p className="tc" style={{ color: 'var(--ink-60)' }}>
          也許已收進抽屜。
        </p>
        <div style={{ marginTop: 32 }}>
          <InkLink href="/journal" navigate={navigate}>
            回日誌
          </InkLink>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <PageHeader
        kicker={post.kicker}
        title={post.title}
        subtitle={post.lead}
        date={post.date}
      />
      <div
        style={{
          maxWidth: 1000,
          margin: '0 auto',
          padding: '0 44px 30px',
        }}
      >
        <Cover post={post} ratio="16/9" />
      </div>
      <article
        className="gf-pad-md"
        style={{
          maxWidth: 720,
          margin: '0 auto',
          padding: '20px 44px 80px',
        }}
      >
        <PostBody body={post.body} />

        <RelatedLinks slugs={post.related} navigate={navigate} />

        <div
          style={{
            marginTop: 60,
            paddingTop: 30,
            borderTop: '1px dotted var(--gold-3)',
            display: 'flex',
            justifyContent: 'space-between',
            gap: 20,
            flexWrap: 'wrap',
          }}
        >
          <InkLink href="/journal" navigate={navigate} style={{ fontSize: 14 }}>
            ← 回日誌
          </InkLink>
          <span className="mono" style={{ color: 'var(--gold-3)', fontSize: 10 }}>
            金花樓 · {post.kicker}
          </span>
        </div>
      </article>
    </div>
  );
}
