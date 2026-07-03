// Header (top nav) + Footer for the site
import { useEffect, useState } from 'react';
import { GoldFlower } from './GoldenFlower.jsx';
import { useIsMobile } from '../hooks/useIsMobile.js';
import { useCart } from '../state/CartContext.jsx';
import { useLocale, useT } from '../i18n/index.jsx';

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

// Lucide-style shopping bag — pairs visually with HamburgerIcon's stroke style.
export function CartIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

// Receipt / document — represents the order itself rather than the box it
// ships in. Pairs better with the shopping bag (container vs. content).
// Three short text lines, last one shortened to suggest a signature.
export function PackageIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="5" y="3" width="14" height="18" rx="1" ry="1" />
      <line x1="8" y1="8" x2="16" y2="8" />
      <line x1="8" y1="12" x2="16" y2="12" />
      <line x1="8" y1="16" x2="13" y2="16" />
    </svg>
  );
}

export function Header({ tab, setTab, tabs, navigate }) {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const { locale, setLocale } = useLocale();
  const tr = useT();

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
        // Desktop: header uses display:contents so the inner <nav> can stick
        // to the document, not just within header's bounds. Mobile keeps the
        // full header sticky so the hamburger stays reachable.
        display: isMobile ? 'block' : 'contents',
        position: isMobile ? 'sticky' : 'relative',
        top: 0,
        zIndex: 20,
        background: 'rgba(248,245,235,0.92)',
        backdropFilter: isMobile ? 'blur(6px)' : 'none',
        WebkitBackdropFilter: isMobile ? 'blur(6px)' : 'none',
        borderBottom: isMobile ? '1px solid var(--ink-15)' : 'none',
      }}
    >
      {/* 促銷 banner 已移除（2026-07 精簡）：全站紅底條違反 Single Seal Rule
          且與「never discount-led」相左。滿額規則改由 04 購皂頁頂的
          TierNotice + 購物籃內的動態提示承載。 */}
      <div
        className="gf-pad-md"
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 44px',
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
          <GoldFlower size={isMobile ? 100 : 144} />
        </button>

        {/* Right: order lookup + cart */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: isMobile ? 4 : 8,
            fontFamily: '"DM Mono", monospace',
            fontSize: 12,
            letterSpacing: 1.5,
            textTransform: 'uppercase',
            color: 'var(--sumi)',
          }}
        >
          {/* 語言切換按鈕暫時隱藏 ── 2026-05 老闆娘 focus 中文版。
              i18n 基建（LocaleProvider / 12 產品英譯 / 27 篇 metadata 英譯）
              留著、未來補完 Cart/Footer/About/Process i18n + Top 5 文章 body
              翻譯後再打開這段就好。 */}
          {false && (
            <button
              type="button"
              onClick={() => setLocale(locale === 'zh' ? 'en' : 'zh')}
              aria-label={locale === 'zh' ? 'Switch to English' : '切換為中文'}
              style={{
                marginRight: 12,
                color: 'var(--gold-3)',
                padding: '4px 10px',
                border: '1px solid var(--ink-15)',
                fontSize: 11,
                letterSpacing: 1,
                minWidth: 36,
                minHeight: isMobile ? 36 : undefined,
              }}
            >
              {tr('nav.languageToggle')}
            </button>
          )}
          <button
            onClick={() => navigate && navigate('/order')}
            aria-label={tr('nav.orderLookup')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              padding: isMobile ? 0 : '6px 10px',
              color: 'var(--sumi)',
              minWidth: isMobile ? 44 : undefined,
              minHeight: isMobile ? 44 : undefined,
            }}
          >
            <PackageIcon size={isMobile ? 22 : 18} />
            {!isMobile && <span>{tr('nav.orderLookup')}</span>}
          </button>
          <button
            onClick={() => navigate && navigate('/cart')}
            aria-label={`${tr('nav.cart')}，${itemCount}`}
            style={{
              position: 'relative',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              padding: isMobile ? 0 : '6px 10px',
              color: 'var(--red)',
              minWidth: isMobile ? 44 : undefined,
              minHeight: isMobile ? 44 : undefined,
            }}
          >
            <CartIcon size={isMobile ? 22 : 18} />
            {!isMobile && (
              <span>
                {tr('nav.cart')} · {itemCount}
              </span>
            )}
            {isMobile && itemCount > 0 && (
              <span
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: 4,
                  right: 2,
                  minWidth: 16,
                  height: 16,
                  padding: '0 4px',
                  borderRadius: 8,
                  background: 'var(--red)',
                  color: 'var(--paper)',
                  fontSize: 10,
                  fontWeight: 600,
                  lineHeight: '16px',
                  textAlign: 'center',
                  letterSpacing: 0,
                  fontFamily: '"DM Mono", monospace',
                }}
              >
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Tab bar (desktop) — sticks to top after the hero/logo scrolls past */}
      {!isMobile && (
        <nav
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 20,
            borderTop: '1px solid var(--ink-08)',
            borderBottom: '1px solid var(--ink-08)',
            background: 'rgba(248,245,235,0.92)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
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
                      fontSize: 12,
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
                    {tr(`nav.tabs.${t.id}`)}
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
                    fontSize: 12,
                    color: active ? 'var(--red)' : 'var(--gold-3)',
                  }}
                >
                  0{i + 1}
                </span>
                <span className="tc" style={{ fontSize: 17, letterSpacing: 4 }}>
                  {tr(`nav.tabs.${t.id}`)}
                </span>
              </button>
            );
          })}
        </nav>
      )}
    </header>
  );
}

export function Footer({ navigate, setTab }) {
  // 精簡 footer（2026-07）：四欄 nav 收成一列安靜連結，非連結的寄送說明
  // 全數移除（寄送細節在購皂頁與訂購流程裡講）。手機版本來就只剩品牌 +
  // 聯絡 + 版權，desktop 向它看齊。
  const links = [
    { label: '全系列', tab: 'products' },
    { label: '禮盒', href: '/gift' },
    { label: '製皂之序', tab: 'process' },
    { label: '本舍小記', href: '/journal' },
    { label: '查詢訂單', href: '/order' },
    { label: '隱私權', href: '/legal/privacy' },
    { label: '退換貨', href: '/legal/returns' },
    { label: '服務條款', href: '/legal/terms' },
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
          gridTemplateColumns: '1.3fr 4fr',
          gap: 40,
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
            <GoldFlower size={120} />
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
            一間位於林口的小小皂舍。自 2022 年春起，每週手壓一批天然皂 ── 慢火、細料、日復一日。
          </div>
          <div
            style={{
              marginTop: 24,
              paddingTop: 18,
              borderTop: '1px solid rgba(200,162,74,0.18)',
              maxWidth: 320,
            }}
          >
            <div className="mono" style={{ color: 'var(--gold-2)', marginBottom: 14 }}>
              聯絡 · Contact
            </div>
            <div
              className="tc"
              style={{
                fontSize: 14,
                lineHeight: 1.95,
                color: 'rgba(248,245,235,0.7)',
              }}
            >
              <div>
                Line ·{' '}
                <a
                  href="https://lin.ee/7m167md"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'inherit' }}
                >
                  lin.ee/7m167md
                </a>
              </div>
              <div>
                Email ·{' '}
                <a
                  href="mailto:contact@jinhuasoap.com"
                  style={{ color: 'inherit' }}
                >
                  contact@jinhuasoap.com
                </a>
              </div>
              <div>
                Instagram ·{' '}
                <a
                  href="https://www.instagram.com/jinhuasoap/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'inherit' }}
                >
                  @jinhuasoap
                </a>
              </div>
            </div>
          </div>
        </div>

        <div
          className="gf-hide-md"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignContent: 'center',
            justifyContent: 'flex-end',
            gap: '14px 28px',
          }}
        >
          {links.map((x) =>
            x.tab && setTab ? (
              <button
                key={x.label}
                type="button"
                onClick={() => setTab(x.tab)}
                className="tc"
                style={{
                  fontSize: 14,
                  letterSpacing: 2,
                  color: 'rgba(248,245,235,0.85)',
                  background: 'transparent',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  minHeight: 0,
                }}
              >
                {x.label}
              </button>
            ) : (
              <a
                key={x.label}
                href={x.href}
                onClick={(e) => {
                  if (e.metaKey || e.ctrlKey || e.shiftKey) return;
                  e.preventDefault();
                  if (navigate) navigate(x.href);
                }}
                className="tc"
                style={{
                  fontSize: 14,
                  letterSpacing: 2,
                  color: 'rgba(248,245,235,0.85)',
                }}
              >
                {x.label}
              </a>
            ),
          )}
        </div>
      </div>
      <div
        style={{
          borderTop: '1px solid rgba(200,162,74,0.2)',
          padding: '18px 44px',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 8,
          fontFamily: '"DM Mono", monospace',
          fontSize: 12,
          letterSpacing: 2,
          textTransform: 'uppercase',
          color: 'rgba(248,245,235,0.55)',
          maxWidth: 1280,
          margin: '0 auto',
        }}
      >
        <span>
          © 2026 金花樓 · 版權所有
          <span
            className="gf-mobile-inline"
            style={{ color: 'rgba(248,245,235,0.4)' }}
          >
            {' · '}
            <a
              href="/legal/privacy"
              onClick={(e) => {
                if (e.metaKey || e.ctrlKey || e.shiftKey) return;
                e.preventDefault();
                navigate && navigate('/legal/privacy');
              }}
              style={{ color: 'inherit' }}
            >
              隱私權
            </a>
            {' · '}
            <a
              href="/legal/returns"
              onClick={(e) => {
                if (e.metaKey || e.ctrlKey || e.shiftKey) return;
                e.preventDefault();
                navigate && navigate('/legal/returns');
              }}
              style={{ color: 'inherit' }}
            >
              退換貨
            </a>
            {' · '}
            <a
              href="/legal/terms"
              onClick={(e) => {
                if (e.metaKey || e.ctrlKey || e.shiftKey) return;
                e.preventDefault();
                navigate && navigate('/legal/terms');
              }}
              style={{ color: 'inherit' }}
            >
              服務條款
            </a>
          </span>
        </span>
        <span>手壓於林口</span>
      </div>
    </footer>
  );
}
