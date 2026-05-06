// Multi-image product gallery — used by 02 十二花 and 04 購皂.
//
// Two pieces:
//   <ProductCarousel> — inline scroll-snap mini carousel with arrows,
//     dots, keyboard support, and click-to-zoom callback.
//   <ProductLightbox> — fullscreen modal portalled to document.body with
//     its own scroll-snap carousel, ESC + arrow keys, click-backdrop close.
//
// Implementation choices:
//   - Native overflow-x + scroll-snap handles touch swipe for free, so we
//     don't bind any touch events ourselves.
//   - We track active index from `scroll` (cheaper than IntersectionObserver
//     and updates smoothly during a drag).
//   - <picture> with AVIF → WebP → fallback chain matches the rest of the
//     site (ProductPhoto, SoapPhoto, IngredientPhoto).

import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';

function stripExt(src) {
  return src.replace(/\.(png|jpe?g|webp|avif)$/i, '');
}

function ResolvedImage({ src, alt, fit = 'cover', loading = 'lazy', draggable = true }) {
  const base = stripExt(src);
  return (
    <picture>
      <source type="image/avif" srcSet={`${base}.avif`} />
      <source type="image/webp" srcSet={`${base}.webp`} />
      <img
        src={`${base}.webp`}
        alt={alt}
        loading={loading}
        decoding="async"
        draggable={draggable}
        style={{
          width: '100%',
          height: '100%',
          objectFit: fit,
          display: 'block',
          userSelect: draggable ? 'auto' : 'none',
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
  fontFamily: 'serif',
  lineHeight: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backdropFilter: 'blur(2px)',
  transition: 'opacity 200ms',
  padding: 0,
};

function dotStyle(active) {
  return {
    width: 6,
    height: 6,
    borderRadius: '50%',
    background: active ? 'var(--gold-2)' : 'rgba(248,245,235,0.5)',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    transition: 'background 200ms, transform 200ms',
    transform: active ? 'scale(1.3)' : 'scale(1)',
    minHeight: 0,
  };
}

export function ProductCarousel({ photos, alt, ratio = '1/1', onZoom }) {
  const containerRef = useRef(null);
  const [active, setActive] = useState(0);
  const single = !photos || photos.length <= 1;
  const list = photos || [];

  useEffect(() => {
    if (single) return;
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => {
      if (!el.clientWidth) return;
      const i = Math.round(el.scrollLeft / el.clientWidth);
      setActive(Math.max(0, Math.min(list.length - 1, i)));
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [list.length, single]);

  const goto = useCallback((i) => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' });
  }, []);

  const wrapNext = () => goto((active + 1) % list.length);
  const wrapPrev = () => goto((active - 1 + list.length) % list.length);

  const onKeyDown = (e) => {
    if (single) return;
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
      style={{ position: 'relative', width: '100%', aspectRatio: ratio }}
      onKeyDown={onKeyDown}
    >
      <div
        ref={containerRef}
        className="gf-carousel-track"
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          overflowX: single ? 'hidden' : 'auto',
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth',
          scrollbarWidth: 'none',
        }}
      >
        {list.map((src, i) => (
          <button
            type="button"
            key={`${src}-${i}`}
            onClick={() => onZoom && onZoom(i)}
            aria-label={
              onZoom
                ? `放大第 ${i + 1} 張，共 ${list.length} 張`
                : `第 ${i + 1} 張，共 ${list.length} 張`
            }
            tabIndex={i === active ? 0 : -1}
            style={{
              flex: '0 0 100%',
              scrollSnapAlign: 'start',
              padding: 0,
              border: 'none',
              background: 'transparent',
              cursor: onZoom ? 'zoom-in' : 'default',
              minHeight: 0,
              display: 'block',
            }}
          >
            <ResolvedImage src={src} alt={alt} />
          </button>
        ))}
      </div>

      {!single && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              wrapPrev();
            }}
            aria-label="上一張"
            style={{
              ...arrowBaseStyle,
              left: 8,
              width: 32,
              height: 32,
              fontSize: 20,
              cursor: 'pointer',
              minHeight: 0,
            }}
          >
            ‹
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              wrapNext();
            }}
            aria-label="下一張"
            style={{
              ...arrowBaseStyle,
              right: 8,
              width: 32,
              height: 32,
              fontSize: 20,
              cursor: 'pointer',
              minHeight: 0,
            }}
          >
            ›
          </button>
          <div
            style={{
              position: 'absolute',
              bottom: 8,
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
              gap: 6,
              pointerEvents: 'none',
            }}
          >
            {list.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goto(i);
                }}
                aria-label={`第 ${i + 1} 張`}
                aria-current={i === active}
                style={{ ...dotStyle(i === active), pointerEvents: 'auto' }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function ProductLightbox({ photos, alt, initialIndex = 0, onClose }) {
  const containerRef = useRef(null);
  const closeBtnRef = useRef(null);
  const [active, setActive] = useState(initialIndex);
  const list = photos || [];

  // Lock body scroll while open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Initial scroll position — use layout effect to avoid first-paint jump.
  // We do this without smooth so the lightbox opens already on the right slide.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollLeft = initialIndex * el.clientWidth;
    closeBtnRef.current?.focus();
  }, [initialIndex]);

  // Sync scroll when active changes via keyboard or arrow click
  const programmaticScroll = useRef(false);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    programmaticScroll.current = true;
    el.scrollTo({ left: active * el.clientWidth, behavior: 'smooth' });
    const t = window.setTimeout(() => {
      programmaticScroll.current = false;
    }, 400);
    return () => window.clearTimeout(t);
  }, [active]);

  // Keyboard
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        setActive((i) => (i + 1) % list.length);
      } else if (e.key === 'ArrowLeft') {
        setActive((i) => (i - 1 + list.length) % list.length);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [list.length, onClose]);

  const onScroll = () => {
    if (programmaticScroll.current) return;
    const el = containerRef.current;
    if (!el || !el.clientWidth) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    setActive(Math.max(0, Math.min(list.length - 1, i)));
  };

  if (!list.length) return null;

  const single = list.length <= 1;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="產品圖片放大檢視"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(20,18,16,0.94)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 16,
          color: 'var(--gold-2)',
          fontFamily: '"DM Mono", monospace',
          fontSize: 12,
          letterSpacing: 2,
          flexShrink: 0,
        }}
      >
        <span>
          {active + 1} / {list.length}
        </span>
        <button
          ref={closeBtnRef}
          type="button"
          onClick={onClose}
          aria-label="關閉"
          style={{
            background: 'transparent',
            border: '1px solid rgba(248,245,235,0.3)',
            color: 'inherit',
            width: 36,
            height: 36,
            fontSize: 18,
            cursor: 'pointer',
            borderRadius: '50%',
            minHeight: 0,
          }}
        >
          ✕
        </button>
      </div>

      <div
        ref={containerRef}
        onScroll={onScroll}
        style={{
          flex: 1,
          display: 'flex',
          overflowX: 'auto',
          overflowY: 'hidden',
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth',
          scrollbarWidth: 'none',
        }}
      >
        {list.map((src, i) => (
          <div
            key={`${src}-${i}`}
            onClick={(e) => {
              if (e.target === e.currentTarget) onClose();
            }}
            style={{
              flex: '0 0 100%',
              scrollSnapAlign: 'start',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 4vw',
              minWidth: 0,
            }}
          >
            <picture>
              <source type="image/avif" srcSet={`${stripExt(src)}.avif`} />
              <source type="image/webp" srcSet={`${stripExt(src)}.webp`} />
              <img
                src={`${stripExt(src)}.webp`}
                alt={`${alt} 第 ${i + 1} 張`}
                draggable={false}
                style={{
                  maxWidth: '100%',
                  maxHeight: '85vh',
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain',
                  userSelect: 'none',
                  display: 'block',
                }}
              />
            </picture>
          </div>
        ))}
      </div>

      {!single && (
        <>
          <button
            type="button"
            onClick={() => setActive((i) => (i - 1 + list.length) % list.length)}
            aria-label="上一張"
            style={{
              ...arrowBaseStyle,
              left: 16,
              width: 48,
              height: 48,
              fontSize: 28,
              cursor: 'pointer',
              minHeight: 0,
            }}
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => setActive((i) => (i + 1) % list.length)}
            aria-label="下一張"
            style={{
              ...arrowBaseStyle,
              right: 16,
              width: 48,
              height: 48,
              fontSize: 28,
              cursor: 'pointer',
              minHeight: 0,
            }}
          >
            ›
          </button>
        </>
      )}
    </div>,
    document.body,
  );
}

// Convenience wrapper: a carousel that opens its own lightbox on click.
export function ProductGallery({ photos, alt, ratio = '1/1' }) {
  const [zoomIndex, setZoomIndex] = useState(null);
  return (
    <>
      <ProductCarousel
        photos={photos}
        alt={alt}
        ratio={ratio}
        onZoom={(i) => setZoomIndex(i)}
      />
      {zoomIndex !== null && (
        <ProductLightbox
          photos={photos}
          alt={alt}
          initialIndex={zoomIndex}
          onClose={() => setZoomIndex(null)}
        />
      )}
    </>
  );
}
