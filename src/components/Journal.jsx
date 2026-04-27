// Journal — long-form essays. Static array of posts, no CMS.
import { useEffect } from 'react';

const POSTS = [
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
