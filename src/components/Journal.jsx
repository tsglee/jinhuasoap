// Journal — long-form essays. Static array of posts, no CMS.
import { useEffect } from 'react';

const POSTS = [
  {
    slug: 'three-oils',
    kicker: '原料之念',
    title: '本舍用什麼油',
    lead: '一塊皂為什麼要混不同油？因為每種油負責不同的事。',
    body: [
      '一塊皂從來不是單一油做的。我們每張配方都有三個角色：主體、清潔、功能 ── 它們在皂裡分別給「保濕」、「起泡」、「泡沫穩定」這三件事。',
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
    body: [
      '剛開始做皂的人，會很快發現一個秘密：不同的植物油，進到皂裡之後，「名字」就不重要了 ── 重要的是各自帶了什麼比例的脂肪酸。',
      '橄欖油是「油酸」家族 ── 給的是保濕與滑順。椰子油是「月桂酸」家族 ── 給的是清潔與泡沫。棕櫚油是「棕櫚酸」家族 ── 給的是硬度。蓖麻油是「蓖麻油酸」家族 ── 給的是泡沫細緻度。',
      '一塊皂的洗感，就是這些脂肪酸按比例混合出來的結果。油是載體，脂肪酸才是本質 ── 這句話是整個配方設計的起點。',
      '學會這件事之後，就會有「五力」──',
      '清潔力、泡沫力、溫潤度、保濕、硬度。',
      '這五個維度，對應五組脂肪酸；每一款配方都可以拉出一張五邊形圖，看它偏哪一邊、欠哪一邊。我們在鍋邊壓了一張檢查表，每一款新配方投產前，都要先算過一遍五力 ── 清潔不能太高（太乾），泡沫不能太低（不起泡），保濕不能太低（用完皮膚繃），硬度不能太低（變形），溫潤度則視皂的用途調整。',
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
    body: [
      '手工皂背後的化學其實很簡單：油脂遇到鹼，中和之後，生成皂跟甘油。',
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
    body: [
      '冷製皂有一個關鍵時刻叫 trace。',
      '油跟鹼在鍋裡攪拌，一開始是清的、像油湯。攪著攪著，質地慢慢變濃，從油湯變成稀粥，再變成像濃湯的奶醬狀。攪拌棒拉起來的時候，落下去的皂液會在表面留下一道短短的痕跡 ── 那就是 trace。表示皂化反應已經發動，現在可以入模了。',
      'Trace 有三個層次：輕、中、重。輕 trace 是痕跡剛出現、流動性還高，適合做渲染、分層；中 trace 是痕跡明顯、可順利倒入模，是一般皂的入模時機；重 trace 像美乃滋一樣濃，適合快速入模或塑形。',
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
    body: [
      '棕櫚油是一個會被討論的原料。它的爭議很真實：過去半個世紀東南亞的雨林大規模被開墾種棕櫚樹，棲地被破壞、生物多樣性受損 ── 這是它最直接的成本。很多手工皂品牌會直接拒用，貼上「No Palm」當作態度。',
      '我們選擇用，但要把為什麼說清楚。',
      '棕櫚油在配方裡的角色是結構油。棕櫚酸（Palmitic Acid）佔它 45%，給的是硬度與穩定性。一塊皂如果沒有結構油，洗到一半就會塌掉、變形、沖一沖就化。在台灣這種潮濕的氣候，這件事特別敏感。',
      '要替代棕櫚？技術上可以 ── 用乳木果脂、可可脂、或拉長熟成時間。我們也試過，但結果是：成品會稍微軟、保存期短一點、運送過程容易變形。對一個手工小批次來說，成本反映在價格與良率上。',
      '值得攤開來看的是這組數字：同樣一公頃的土地，棕櫚一年產的油是大豆的 8 倍、是橄欖的 10 倍。換一個角度想：如果全世界禁用棕櫚改用其他植物油，需要砍掉的雨林面積會是現在的好幾倍。「No Palm」這件事，只在你能保證上游可追溯的前提下才是真的環保選擇；否則只是把問題推到別的作物頭上。',
      '我們選擇的方式有幾條：盡量用可追溯來源的棕櫚油；配方裡棕櫚比例壓到 10–20%，不超過；每批配方比例公開（產品頁可以看到）；透過讓皂耐用（陳化時間長、不易消耗）來把總體用量壓低。',
      '一塊耐用、不易消耗的皂，本身就是一種環保。',
    ],
  },
];

function PageHeader({ kicker, title, subtitle }) {
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
          {POSTS.map((p) => (
            <article
              key={p.slug}
              style={{
                padding: 32,
                border: '1px solid var(--ink-15)',
                background: 'var(--paper)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div className="mono" style={{ color: 'var(--red)' }}>
                {p.kicker}
              </div>
              <h2
                className="tc"
                style={{
                  fontSize: 32,
                  fontWeight: 500,
                  letterSpacing: 6,
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
                  讀下去 →
                </InkLink>
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

  useEffect(() => {
    if (post) document.title = `${post.title} · 本舍小記 · 金花樓`;
  }, [post]);

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
      <PageHeader kicker={post.kicker} title={post.title} subtitle={post.lead} />
      <article
        className="gf-pad-md"
        style={{
          maxWidth: 720,
          margin: '0 auto',
          padding: '20px 44px 80px',
        }}
      >
        {post.body.map((para, i) => (
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
            {para}
          </p>
        ))}

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
          <span
            className="mono"
            style={{ color: 'var(--gold-3)', fontSize: 10 }}
          >
            金花樓 · {post.kicker}
          </span>
        </div>
      </article>
    </div>
  );
}
