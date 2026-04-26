// Journal — long-form essays. Static array of posts, no CMS.
import { useEffect } from 'react';

const POSTS = [
  {
    slug: 'no-palm',
    kicker: '原料之念',
    title: '為什麼不用棕櫚油',
    lead: '棕櫚油產量效率高、皂硬度也好 ── 這是我們不用它的理由之一。',
    body: [
      '棕櫚油其實是一個很會做皂的油。它給硬度、給結構，讓一塊皂「不容易化掉」；在台灣的潮濕氣候裡，這是一個實際的優點。單位土地的產量也高得驚人 ── 同樣一公頃的地，棕櫚出的油是大豆的八倍、是橄欖的十倍。',
      '但我們還是選擇不用。',
      '原因有兩層。第一層是顯性的：棕櫚在東南亞的擴張，過去半個世紀毀了婆羅洲與蘇門答臘大片的原始雨林，把紅毛猩猩的棲地切成碎片。這件事有很多版本、很多立場，我們只認一個最簡單的：當一個原料的上游是這樣的故事，我們不願意把它放進「清洗」這個日常的儀式裡。',
      '第二層比較冷靜。棕櫚油在配方裡的角色是「硬度」── 而「硬度」這件事，其實可以用別的方法補。我們把它交給兩個東西：熟成時間（四十二日，晶體結構會慢慢鎖定），以及乳木果脂與可可脂的少量搭配。成品會稍微軟一點、化得稍微快一點 ── 大約少撐一個禮拜 ── 這個代價我們可以吃下來。',
      '不用棕櫚油，不是在說「棕櫚油很壞」；它是一個工業配方的合理選擇。我們只是選擇了另一條比較慢的路，把原料的源頭想得稍微乾淨一點。',
      '一塊皂不會改變世界，但如果它要陪一個人一整個月、一年、十年，它的源頭我們會挑得認真一點。',
    ],
  },
  {
    slug: '42-days',
    kicker: '工藝之念',
    title: '四十二日熟成是什麼',
    lead: '皂化反應其實幾小時就完成。四十二日熟成，是為了退鹼、穩定 pH、讓晶體鎖定。',
    body: [
      '冷製皂的化學很簡單：油脂遇到鹼（氫氧化鈉），中和，生成皂（脂肪酸鈉鹽）與甘油。這個反應用不了多久 ── 倒模之後幾個小時，主要的皂化就完成了。',
      '但「皂化完成」不等於「可以用」。',
      '剛脫模的皂還帶著一點點沒反應完的鹼，pH 通常在 10 出頭；摸上去略有澀感，對皮膚刺激。這時候皂體的晶體結構也還沒穩定 ── 像剛烘好的麵包，外表看起來熟了，內裡卻還在調整。',
      '熟成期做的事就是讓「後半場」發生：剩下的鹼慢慢與水氣、空氣中的二氧化碳反應，pH 逐步降到 9 左右；水分緩緩蒸散，皂體變硬；脂肪酸鈉鹽的晶格重新排列，變得更規整、更耐用。',
      '四十二日不是神秘的數字。十四日太短 ── pH 還偏高，用起來澀；九十日太長 ── 花材與精油的香氣退得厲害。我們在這兩者之間選一個中間值，大約對應傳統冷製皂在溫帶氣候的經驗值。',
      '這一步，機器催不了。有人做「熱製皂」，直接把皂煮熟再包；也有人用工業除濕櫃快速脫水 ── 都可以加速，但代價是晶體結構粗一點、泡沫質地也會散一點。我們寧願多等一個月。',
      '所以當你收到一塊金花樓的皂，它已經在雪松架上安安靜靜地待了四十二天。那不是行銷話術，是它該有的年紀。',
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
    slug: 'yangmingshan-water',
    kicker: '本土之念',
    title: '陽明山泉水的故事',
    lead: '從我們的小廚房到竹子湖山口，車程剛好四十分鐘。每週五清晨取水。',
    body: [
      '製皂要的水不是礦泉水，也不是純水。它要「軟」── 礦物含量低、鐵與鈣少 ── 這樣皂體不易濁、泡沫也乾淨。',
      '台北這座城市有一件很稀有的事：它北邊就是陽明山。從艋舺開上仰德大道，轉進竹子湖，一路往上，會在某個轉彎撞見一眼安安靜靜的泉水 ── 山裡的鄰居們一直都用它泡茶、燒飯。',
      '我們每週五清晨出發，車上擺四只十公升的玻璃瓶。取水、秤重、貼上日期標 ── 這批水屬於哪一批皂，紀錄得清清楚楚。',
      '為什麼是週五？因為週一要親採花材、週二調鹼、週三入模、週四切皂。水必須在週日之前調好，才能銜接下一輪。這個節奏跑了幾個月，慢慢成了我們家的小習慣。',
      '有人問，自來水過濾一下不就好了嗎？可以的，我們也做過對照 ── 自來水煮沸再過濾，皂體會偏灰一點、泡沫會稍微鬆散。差別不大，但存在。',
      '山泉是本舍願意花的那一點小時間。這一道工序沒有效率、沒有規模、也沒有很好的商業理由 ── 它只是我們喜歡每週五清晨開一段山路的那個習慣，順便把水帶回家。',
      '如果你手上的皂，是三月那一批，那瓶水是從三月陽明山的那場小雨裡來的。',
    ],
  },
  {
    slug: 'soap-ritual',
    kicker: '日常之念',
    title: '用一塊皂的儀式',
    lead: '從清晨的第一盆涼水，到夜裡長路歸來的那一瓢。',
    body: [
      '我們不賣「功效」。我們賣的，比較像是一個日常裡的標點符號。',
      '清晨洗臉那十秒 ── 把昨夜的夢、未寫完的訊息、尚未回的信都沖走。這是一個開機儀式，像按下電腦的電源鍵。那一塊小小的洗面皂，溫潤、不刺激、不醒腦，只是一道輕輕的分界線。',
      '白天洗手那幾次 ── 走進店、走進家、吃飯前、泡茶前。一塊皂的香氣在掌間停留幾秒，是身體對自己說「好，換個場景」的那個瞬間。',
      '運動之後那場熱水澡 ── 四十公里的騎行、十公里的路跑、一個下午的汗。那塊壓得很緊的運動皂，把汗油帶走，把薄荷的涼留下，像是替一個疲憊的身體按一下重置。',
      '夜裡長路歸來那一瓢 ── 出差的最後一晚、加班的最後一小時、吵架之後的那個深夜。沐浴皂是為了那一刻而陳的 ── 熟成六十日、泡沫綿厚、香氣是十二月的屏東柚子皮。洗完，一個人有了回家的感覺。',
      '這些時刻並不罕見 ── 它們每天都在發生，只是大部分時候我們沒有把它當作一件事。一塊好皂的作用，是讓這些小時刻擁有一個「質地」── 一種不急不慢的觸感，一種願意停下來的理由。',
      '我們做的，是那個停下來的理由。',
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
    document.title = '金花樓日誌 · 金花樓';
  }, []);

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <PageHeader kicker="金花樓 · 日誌" title="金花樓日誌" subtitle="慢慢寫 · 慢慢讀" />
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
          沒有 SEO，不為演算法 ── 只是把手邊的想法寫下來。
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
    if (post) document.title = `${post.title} · 金花樓日誌 · 金花樓`;
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
