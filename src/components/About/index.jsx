// About — variant picker. Renders Desktop or Mobile layout based on
// viewport width, swapping live on resize / orientation change.
//
// Both variants are statically imported (no React.lazy / Suspense): each
// is small, ships in the main bundle, and avoids a paint-flash when the
// variant first mounts. Mobile is the simpler 4-section story; Desktop
// is the full long-form page (manifesto, water interlude, 五皂五境...).
import { useSyncExternalStore } from 'react';
import { AboutDesktop } from './Desktop.jsx';
import { AboutMobile } from './Mobile.jsx';

const MOBILE_QUERY = '(max-width: 900px)';

const subscribe = (cb) => {
  const mql = window.matchMedia(MOBILE_QUERY);
  mql.addEventListener('change', cb);
  return () => mql.removeEventListener('change', cb);
};
const getSnapshot = () => window.matchMedia(MOBILE_QUERY).matches;
// SSR fallback — we don't render on the server, but useSyncExternalStore
// still asks for it. Default to desktop layout (matches typical SEO bots).
const getServerSnapshot = () => false;

export function About(props) {
  const isMobile = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return isMobile ? <AboutMobile {...props} /> : <AboutDesktop {...props} />;
}
