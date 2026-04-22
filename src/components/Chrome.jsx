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
        background: 'rgba(248,245,235,0.92)',
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
          ? '本島滿 NT$1,200 免運'
          : '春日新品 · 第 VII 批慢製中 · 本島滿 NT$1,200 免運'}
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
        {/* Left: hamburger on mobile, empty spacer on desktop */}
        {isMobile ? (
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? '關閉選單' : '開啟選單'}
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
          <div />
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
        </button>

        {/* Right: cart only */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 0,
            fontFamily: '"DM Mono", monospace',
            fontSize: 11,
            letterSpacing: 2,
            textTransform: 'uppercase',
            color: 'var(--sumi)',
          }}
        >
          <button
            onClick={() => setTab('shop')}
            aria-label={`購物籃，${itemCount} 件`}
            style={{
              color: 'var(--red)',
              minWidth: isMobile ? 44 : undefined,
              minHeight: isMobile ? 44 : undefined,
            }}
          >
            購物籃 · {itemCount}
          </button>
        </div>
      </div>

      {/* Tab bar (desktop) */}
      {!isMobile && (
        <nav
          style={{
            borderTop: '1px solid var(--ink-08)',
            borderBottom: '1px solid var(--ink-08)',
            background: 'rgba(248,245,235,0.6)',
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
                    fontSize: 17,
                    letterSpacing: 2,
                    color: active ? 'var(--red)' : 'var(--sumi)',
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
                  fontSize: 18,
                  letterSpacing: 2,
                  fontWeight: active ? 500 : 400,
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
              </button>
            );
          })}
        </nav>
      )}
    </header>
  );
}

export function Footer({ navigate }) {
  const columns = [
    {
      title: '購皂',
      items: [{ label: '全系列' }, { label: '禮盒' }, { label: '包布' }, { label: '訂閱' }],
    },
    {
      title: '本舍',
      items: [
        { label: '本舍小記' },
        { label: '製皂之序' },
        { label: '食材' },
        { label: '誌', href: '/journal' },
      ],
    },
    {
      title: '寄送',
      items: [
        { label: '臺灣本島' },
        { label: '離島' },
        { label: '7-11 店到店' },
        { label: '全家 店到店' },
      ],
    },
    {
      title: '法律',
      items: [
        { label: '隱私權', href: '/legal/privacy' },
        { label: '退換貨', href: '/legal/returns' },
        { label: '服務條款', href: '/legal/terms' },
      ],
    },
  ];
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
          gridTemplateColumns: '1.3fr repeat(4, 1fr)',
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
                className="tc"
                style={{
                  fontSize: 12,
                  letterSpacing: 4,
                  color: 'var(--gold-2)',
                }}
              >
                手壓天然皂
              </div>
            </div>
          </div>
          <div
            className="tc"
            style={{
              fontSize: 15,
              lineHeight: 1.85,
              color: 'rgba(248,245,235,0.7)',
              maxWidth: 320,
            }}
          >
            一間位於臺北艋舺的小小皂舍。自 MMXXVI 年春起，每週手壓一批天然皂 ── 慢火、細料、日復一日。
          </div>
        </div>

        {columns.map(({ title, items }) => (
          <div key={title}>
            <div className="mono" style={{ color: 'var(--gold-2)', marginBottom: 18 }}>
              {title}
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10 }}>
              {items.map((x) => (
                <li
                  key={x.label}
                  className="tc"
                  style={{ fontSize: 15, letterSpacing: 2, color: 'rgba(248,245,235,0.85)' }}
                >
                  {x.href && navigate ? (
                    <a
                      href={x.href}
                      onClick={(e) => {
                        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
                        e.preventDefault();
                        navigate(x.href);
                      }}
                      style={{ color: 'inherit' }}
                    >
                      {x.label}
                    </a>
                  ) : (
                    x.label
                  )}
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
          color: 'rgba(248,245,235,0.55)',
          maxWidth: 1280,
          margin: '0 auto',
        }}
      >
        <span>© MMXXVI 金花樓 · 版權所有</span>
        <span>手壓於臺北艋舺</span>
      </div>
    </footer>
  );
}
