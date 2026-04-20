// Header (top nav) + Footer for the site
import { GoldFlower } from './GoldenFlower.jsx';

export function Header({ tab, setTab, tabs }) {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 20,
        background: 'rgba(236,227,207,0.92)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        borderBottom: '1px solid var(--ink-15)',
      }}
    >
      {/* Announcement bar */}
      <div
        style={{
          background: 'var(--red-2)',
          color: 'var(--gold-2)',
          textAlign: 'center',
          padding: '6px 20px',
          fontFamily: '"DM Mono", monospace',
          fontSize: 10,
          letterSpacing: 3,
          textTransform: 'uppercase',
        }}
      >
        春日新品 · Spring collection no. VII now pressing · free island shipping over NT$1,200
      </div>

      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '18px 44px',
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          gap: 20,
        }}
      >
        {/* Left: tagline */}
        <div className="mono" style={{ color: 'var(--gold-3)' }}>
          Taipei · Est. MMXXVI
        </div>

        {/* Center: logo */}
        <button
          onClick={() => setTab('about')}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <GoldFlower size={56} />
          <div
            className="tc"
            style={{
              fontWeight: 500,
              fontSize: 20,
              letterSpacing: 6,
              lineHeight: 1,
            }}
          >
            金花樓
          </div>
          <div
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontStyle: 'italic',
              fontSize: 11,
              letterSpacing: 4,
              color: 'var(--gold-3)',
            }}
          >
            Goldenflower
          </div>
        </button>

        {/* Right: cart + search */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 22,
            fontFamily: '"DM Mono", monospace',
            fontSize: 11,
            letterSpacing: 2,
            textTransform: 'uppercase',
            color: 'var(--sumi)',
          }}
        >
          <button>Search</button>
          <button>Journal</button>
          <button style={{ color: 'var(--red)' }}>Cart · 2</button>
        </div>
      </div>

      {/* Tab bar */}
      <nav
        style={{
          borderTop: '1px solid var(--ink-08)',
          borderBottom: '1px solid var(--ink-08)',
          background: 'rgba(244,236,215,0.6)',
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'center',
            gap: 0,
          }}
        >
          {tabs.map((t) => {
            const active = t.id === tab;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                style={{
                  padding: '16px 28px',
                  position: 'relative',
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: 17,
                  letterSpacing: 2,
                  color: active ? 'var(--red)' : 'var(--sumi)',
                  fontStyle: active ? 'italic' : 'normal',
                  fontWeight: active ? 500 : 400,
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 10,
                }}
              >
                <span
                  className="mono"
                  style={{
                    fontSize: 10,
                    color: active ? 'var(--red)' : 'var(--gold-3)',
                    opacity: 0.9,
                  }}
                >
                  0{tabs.indexOf(t) + 1}
                </span>
                <span
                  className="tc"
                  style={{
                    fontSize: 15,
                    letterSpacing: 4,
                  }}
                >
                  {t.zh}
                </span>
                <span style={{ opacity: 0.5, fontSize: 14 }}>·</span>
                <span style={{ letterSpacing: 2 }}>{t.en}</span>
                {active && (
                  <span
                    style={{
                      position: 'absolute',
                      left: 16,
                      right: 16,
                      bottom: 0,
                      height: 2,
                      background: 'var(--red)',
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer
      style={{
        marginTop: 100,
        background: 'var(--sumi)',
        color: 'var(--paper)',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '60px 44px 30px',
          display: 'grid',
          gridTemplateColumns: '1.3fr 1fr 1fr 1fr',
          gap: 40,
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
            <GoldFlower size={56} />
            <div>
              <div
                className="tc"
                style={{
                  fontSize: 24,
                  letterSpacing: 6,
                  color: 'var(--paper)',
                }}
              >
                金花樓
              </div>
              <div
                className="italic"
                style={{
                  fontSize: 13,
                  letterSpacing: 3,
                  color: 'var(--gold-2)',
                }}
              >
                Goldenflower Soap Works
              </div>
            </div>
          </div>
          <div
            className="italic"
            style={{
              fontSize: 15,
              lineHeight: 1.65,
              color: 'rgba(236,227,207,0.7)',
              maxWidth: 320,
            }}
          >
            A small soap house in Taipei, pressing natural soap by hand since the spring of 2026.
          </div>
        </div>

        {[
          ['Shop', ['All soap', 'Gift sets', 'Gifting cloth', 'Subscription']],
          ['House', ['Our story', 'The process', 'Ingredients', 'Journal']],
          ['Stockists', ['Taipei flagship', 'Partner shops', 'International', 'Wholesale']],
        ].map(([title, items]) => (
          <div key={title}>
            <div className="mono" style={{ color: 'var(--gold-2)', marginBottom: 18 }}>
              {title}
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10 }}>
              {items.map((x) => (
                <li
                  key={x}
                  className="italic"
                  style={{ fontSize: 15, color: 'rgba(236,227,207,0.85)' }}
                >
                  {x}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div
        style={{
          borderTop: '1px solid rgba(200,162,74,0.2)',
          padding: '18px 44px',
          display: 'flex',
          justifyContent: 'space-between',
          fontFamily: '"DM Mono", monospace',
          fontSize: 10,
          letterSpacing: 2,
          textTransform: 'uppercase',
          color: 'rgba(236,227,207,0.55)',
          maxWidth: 1280,
          margin: '0 auto',
        }}
      >
        <span>© MMXXVI 金花樓 · All rights reserved</span>
        <span>pressed in taipei · 台北艋舺</span>
      </div>
    </footer>
  );
}
