import { useEffect, useState } from 'react';

/**
 * Returns true when the viewport is at or below `bp` pixels wide.
 * Defaults to 900 (the --bp-md breakpoint in tokens.css).
 *
 * SSR-safe: returns `false` on first render in any non-browser environment.
 */
export function useIsMobile(bp = 900) {
  const getMatch = () => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia(`(max-width: ${bp}px)`).matches;
  };

  const [isMobile, setIsMobile] = useState(getMatch);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia(`(max-width: ${bp}px)`);
    const onChange = (e) => setIsMobile(e.matches);
    // Sync on mount in case the initial state was stale (e.g., SSR hydration).
    setIsMobile(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [bp]);

  return isMobile;
}
