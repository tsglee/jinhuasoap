// Header (top nav) + Footer for the site
import { useEffect, useState } from 'react';
import { GoldFlower } from './GoldenFlower.jsx';
import { useIsMobile } from '../hooks/useIsMobile.js';
import { useCart } from '../state/CartContext.jsx';

function HamburgerIcon({ open }) {
  // 3 horizontal bars; rotates to an X when open
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {open ? (
        <>
          <line x1="4" y1="4" x2="18" y2="18" />
          <line x1="18" y1="4" x2="4" y2="18" />
        </>
      ) : (
        <>
          <line x1="3" y1="6" x2="19" y2="6" />
          <line x1="3" y1="11" x2="19" y2="11" />
          <line x1="3" y1="16" x2="19" y2="16" />
        </>
      )}
    </svg>
  );
}

export function Header({ tab, setTab, tabs }) {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount } = useCart();

  // Close the menu whenever the tab changes (after a tap) or on resize-up.
  useEffect(() => {
    setMenuOpen(false);
  }, [tab, isMobile]);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    if (!isMobile) return;
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen, isMobile]);

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
        className="gf-mono-md"
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
        {isMobile
          ? 'Free island shipping over NT$1,200'
          : '春日新品 · Spring collection no. VII now pressing · free island shipping over NT$1,200'}
      </div>

      <div
        className="gf-pad-md"
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '18px 44px',
          display: 'grid',
          gridTemplateColumns: isMobile ? 'auto 1fr auto' : '1fr auto 1fr',
          alignItems: 'center',
          gap: isMobile ? 12 : 20,
        }}
      >
        {/* Left: hamburger (mobile) or tagline (desktop) */}
        {isMobile ? (
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="gf-mobile-nav"
            style={{
              width: 44,
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--sumi)',
            }}
          >
            <HamburgerIcon open={menuOpen} />
          </button>
        ) : (
          <div className="mono" style={{ color: 'var(--gold-3)' }}>
            Taipei · Est. MMXXVI
          </div>
        )}

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
          <GoldFlower size={isMobile ? 40 : 56} />
          <div
            className="tc"
            style={{
              fontWeight: 500,
              fontSize: isMobile ? 16 : 20,
              letterSpacing: isMobile ? 4 : 6,
              lineHeight: 1,
            }}
          >
            金花樓
          </div>
          {!isMobile && (
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
          )}
        </button>

        {/* Right: cart (always) + search/journal (desktop only) */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: isMobile ? 0 : 22,
            fontFamily: '"DM Mono", monospace',
            fontSize: 11,
            letterSpacing: 2,
            textTransform: 'uppercase',
            color: 'var(--sumi)',
          }}
        >
          {!isMobile && (
            <>
              <button>Search</button>
              <button>Journal</button>
            </>
          )}
          <button
            onClick={() => setTab('shop')}
            aria-label={`Cart, ${itemCount} item${itemCount === 1 ? '' : 's'}`}
            style={{
              color: 'var(--red)',
              minWidth: isMobile ? 44 : undefined,
              minHeight: isMobile ? 44 : undefined,
            }}
          >
            Cart · {itemCount}
          </button>
        </div>
      </div>

      {/* Tab bar (desktop) */}
      {!isMobile && (
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
                  aria-current={active ? 'page' : undefined}
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
      )}

      {/* Mobile drawer (full-width dropdown under the header) */}
      {isMobile && menuOpen && (
        <nav
          id="gf-mobile-nav"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'var(--paper)',
            borderBottom: '1px solid var(--ink-15)',
            boxShadow: '0 12px 24px -12px rgba(26,21,18,0.25)',
          }}
        >
          {tabs.map((t, i) => {
            const active = t.id === tab;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                aria-current={active ? 'page' : undefined}
                style={{
                  width: '100%',
                  padding: '18px 24px',
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 12,
                  borderBottom: i < tabs.length - 1 ? '1px solid var(--ink-08)' : 'none',
                  background: active ? 'rgba(138,42,34,0.06)' : 'transparent',
                  color: active ? 'var(--red)' : 'var(--sumi)',
                  textAlign: 'left',
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: 18,
                  letterSpacing: 2,
                  fontStyle: active ? 'italic' : 'normal',
                }}
              >
                <span
                  className="mono"
                  style={{
                    fontSize: 10,
                    color: active ? 'var(--red)' : 'var(--gold-3)',
                  }}
                >
                  0{i + 1}
                </span>
                <span className="tc" style={{ fontSize: 17, letterSpacing: 4 }}>
                  {t.zh}
                </span>
                <span style={{ opacity: 0.4 }}>·</span>
                <span>{t.en}</span>
              </button>
            );
          })}
        </nav>
      )}
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
        className="gf-pad-md gf-stack-md"
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
