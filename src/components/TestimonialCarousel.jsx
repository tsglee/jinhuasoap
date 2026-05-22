// 客戶心得 旋轉木馬 — 04 購皂頁底、一次顯示一條 + 頭像。
//
// 結構參考 ProductGallery.jsx 的 ProductCarousel：
//   native overflow-x + scroll-snap-x mandatory + onScroll index tracking
//   不依賴第三方 carousel 套件、touch swipe 由 browser 處理
//
// 多了一個 auto-rotate（6 sec interval、user hover 暫停）。
//
// Slide layout:
//   desktop: 圓形 image 左、quote/name/tag 右
//   mobile (≤900px): image 上、quote 下、stack vertical（responsive.css）

import { useState, useEffect, useRef, useCallback } from 'react';

const AUTO_ROTATE_MS = 6000;

function stripExt(src) {
  return src.replace(/\.(png|jpe?g|webp|avif)$/i, '');
}

function HeadshotImage({ src, alt }) {
  const base = stripExt(src);
  return (
    <picture>
      <source type="image/avif" srcSet={`${base}.avif`} />
      <source type="image/webp" srcSet={`${base}.webp`} />
      <img
        src={`${base}.webp`}
        alt={alt}
        loading="lazy"
        decoding="async"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          borderRadius: '50%',
        }}
        onError={(e) => {
          // Graceful placeholder: hide broken images, show ring only
          e.currentTarget.style.visibility = 'hidden';
        }}
      />
    </picture>
  );
}

const arrowBaseStyle = {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  borderRadius: '50%',
  background: 'rgba(20,18,16,0.55)',
  color: 'rgba(248,245,235,0.92)',
  border: 'none',
  width: 36,
  height: 36,
  fontFamily: 'serif',
  fontSize: 18,
  lineHeight: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backdropFilter: 'blur(2px)',
  cursor: 'pointer',
  zIndex: 2,
  padding: 0,
};

function dotStyle(active) {
  return {
    width: 8,
    height: 8,
    borderRadius: '50%',
    background: active ? 'var(--red)' : 'var(--ink-15)',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    transition: 'background 200ms, transform 200ms',
    transform: active ? 'scale(1.3)' : 'scale(1)',
    minHeight: 0,
  };
}

export function TestimonialCarousel({ testimonials }) {
  const containerRef = useRef(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const list = testimonials || [];

  // Track active slide from scroll position (matches ProductCarousel approach)
  useEffect(() => {
    const el = containerRef.current;
    if (!el || list.length <= 1) return;
    const onScroll = () => {
      if (!el.clientWidth) return;
      const i = Math.round(el.scrollLeft / el.clientWidth);
      setActive(Math.max(0, Math.min(list.length - 1, i)));
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [list.length]);

  const goto = useCallback((i) => {
    const el = containerRef.current;
    if (!el) return;
    const target = ((i % list.length) + list.length) % list.length;
    el.scrollTo({ left: target * el.clientWidth, behavior: 'smooth' });
  }, [list.length]);

  const wrapNext = useCallback(() => goto(active + 1), [goto, active]);
  const wrapPrev = useCallback(() => goto(active - 1), [goto, active]);

  // Auto-rotate, pause on hover or focus inside the carousel
  useEffect(() => {
    if (paused || list.length <= 1) return;
    const id = window.setInterval(() => {
      const el = containerRef.current;
      if (!el || !el.clientWidth) return;
      const next = (active + 1) % list.length;
      el.scrollTo({ left: next * el.clientWidth, behavior: 'smooth' });
    }, AUTO_ROTATE_MS);
    return () => window.clearInterval(id);
  }, [active, paused, list.length]);

  const onKeyDown = (e) => {
    if (list.length <= 1) return;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      wrapNext();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      wrapPrev();
    }
  };

  if (!list.length) return null;

  return (
    <div
      role="region"
      aria-label="客戶心得"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={onKeyDown}
      style={{ position: 'relative' }}
    >
      <div
        ref={containerRef}
        style={{
          display: 'flex',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth',
          scrollbarWidth: 'none',
        }}
      >
        {list.map((review, i) => (
          <article
            key={review.id}
            aria-roledescription="slide"
            aria-label={`${i + 1} / ${list.length}`}
            tabIndex={i === active ? 0 : -1}
            style={{
              flex: '0 0 100%',
              scrollSnapAlign: 'start',
              padding: '8px 8px 32px',
              boxSizing: 'border-box',
            }}
          >
            <div
              className="gf-testimonial-slide"
              style={{
                display: 'flex',
                gap: 44,
                alignItems: 'center',
                maxWidth: 880,
                margin: '0 auto',
                padding: '12px 24px',
              }}
            >
              {/* Image — round headshot */}
              <div
                style={{
                  flex: '0 0 200px',
                  width: 200,
                  height: 200,
                  borderRadius: '50%',
                  overflow: 'hidden',
                  background: 'var(--paper-3)',
                  border: '1px solid var(--ink-15)',
                  position: 'relative',
                }}
              >
                {review.image && <HeadshotImage src={review.image} alt={review.name} />}
              </div>

              {/* Quote block */}
              <figure style={{ margin: 0, flex: 1, minWidth: 0 }}>
                <div
                  aria-hidden="true"
                  className="italic"
                  style={{
                    fontSize: 56,
                    lineHeight: 0.6,
                    color: 'var(--gold-3)',
                    opacity: 0.5,
                    height: 22,
                    marginBottom: 8,
                  }}
                >
                  “
                </div>
                <blockquote
                  className="tc"
                  style={{
                    margin: 0,
                    fontSize: 16,
                    lineHeight: 1.95,
                    letterSpacing: 1,
                    color: 'var(--sumi)',
                  }}
                >
                  {review.quote}
                </blockquote>
                <figcaption
                  style={{
                    marginTop: 20,
                    paddingTop: 12,
                    borderTop: '1px dotted var(--ink-15)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 4,
                  }}
                >
                  <span
                    className="tc"
                    style={{
                      fontSize: 15,
                      letterSpacing: 2,
                      color: 'var(--sumi)',
                    }}
                  >
                    ── {review.name}
                  </span>
                  <span
                    className="mono"
                    style={{
                      fontSize: 11,
                      color: 'var(--gold-3)',
                      letterSpacing: 1.5,
                    }}
                  >
                    {review.tag}
                  </span>
                </figcaption>
              </figure>
            </div>
          </article>
        ))}
      </div>

      {list.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              wrapPrev();
            }}
            aria-label="上一條心得"
            style={{ ...arrowBaseStyle, left: -6 }}
          >
            ‹
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              wrapNext();
            }}
            aria-label="下一條心得"
            style={{ ...arrowBaseStyle, right: -6 }}
          >
            ›
          </button>

          {/* Dots */}
          <div
            style={{
              display: 'flex',
              gap: 8,
              justifyContent: 'center',
              marginTop: 4,
            }}
          >
            {list.map((review, i) => (
              <button
                key={review.id}
                type="button"
                onClick={() => goto(i)}
                aria-label={`第 ${i + 1} 條心得`}
                style={dotStyle(i === active)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
