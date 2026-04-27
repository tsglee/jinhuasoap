// App — tab router + minimal path-based routes for /journal and /legal/*
import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { Header, Footer } from './components/Chrome.jsx';
import { About } from './components/About/index.jsx';
import { CartProvider } from './state/CartContext.jsx';

// About is the default tab — kept in the main bundle for instant first
// paint. Everything else loads on tab switch / direct navigation. The
// .then(m => ({ default: ... })) shim adapts our named exports to React.lazy's
// default-export contract.
const Products = lazy(() =>
  import('./components/Products.jsx').then((m) => ({ default: m.Products })),
);
const Process = lazy(() =>
  import('./components/Process.jsx').then((m) => ({ default: m.Process })),
);
const Shop = lazy(() =>
  import('./components/Shop.jsx').then((m) => ({ default: m.Shop })),
);
const JournalIndex = lazy(() =>
  import('./components/Journal.jsx').then((m) => ({ default: m.JournalIndex })),
);
const JournalPost = lazy(() =>
  import('./components/Journal.jsx').then((m) => ({ default: m.JournalPost })),
);
const Legal = lazy(() =>
  import('./components/Legal.jsx').then((m) => ({ default: m.Legal })),
);

// Empty placeholder while a lazy chunk loads. Sized to roughly match the
// first viewport so the page doesn't snap shorter during the brief load.
const TabFallback = () => <div style={{ minHeight: '60vh' }} />;

const TABS = [
  { id: 'about', zh: '本舍' },
  { id: 'products', zh: '十二花' },
  { id: 'process', zh: '製皂' },
  { id: 'shop', zh: '購皂' },
  { id: 'journal', zh: '本舍小記', path: '/journal' },
];

function parseRoute() {
  if (typeof window === 'undefined') return { type: 'tab' };
  const path = window.location.pathname;
  const legal = path.match(/^\/legal\/(privacy|returns|terms)\/?$/);
  if (legal) return { type: 'legal', page: legal[1] };
  if (path === '/journal' || path === '/journal/') return { type: 'journal' };
  if (path.startsWith('/journal/')) {
    const slug = path.slice('/journal/'.length).replace(/\/+$/, '');
    if (slug) return { type: 'journal', slug };
  }
  return { type: 'tab' };
}

export default function App() {
  const [tab, setTab] = useState(() => {
    try {
      return localStorage.getItem('gf_tab') || 'about';
    } catch {
      return 'about';
    }
  });

  const [route, setRoute] = useState(parseRoute);

  useEffect(() => {
    const onPop = () => setRoute(parseRoute());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('gf_tab', tab);
    } catch {
      // localStorage may be unavailable (private browsing, quota); ignore.
    }
  }, [tab]);

  const navigate = useCallback((path) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    setRoute(parseRoute());
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const selectTab = useCallback(
    (id) => {
      const t = TABS.find((x) => x.id === id);
      if (t?.path) {
        navigate(t.path);
        return;
      }
      setTab(id);
      if (route.type !== 'tab') {
        navigate('/');
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
    },
    [navigate, route.type],
  );

  let body;
  if (route.type === 'journal' && route.slug) {
    body = <JournalPost slug={route.slug} navigate={navigate} />;
  } else if (route.type === 'journal') {
    body = <JournalIndex navigate={navigate} />;
  } else if (route.type === 'legal') {
    body = <Legal page={route.page} navigate={navigate} />;
  } else if (tab === 'about') {
    body = <About setTab={selectTab} />;
  } else if (tab === 'products') {
    body = <Products />;
  } else if (tab === 'process') {
    body = <Process />;
  } else if (tab === 'shop') {
    body = <Shop />;
  }

  const screenLabel = route.type === 'journal'
    ? (route.slug ? `journal/${route.slug}` : 'journal')
    : route.type === 'legal'
    ? `legal/${route.page}`
    : tab;

  const activeTabId = route.type === 'journal' ? 'journal' : tab;

  return (
    <CartProvider>
      <div data-screen-label={`Goldenflower · ${screenLabel}`}>
        <Header tab={activeTabId} setTab={selectTab} tabs={TABS} />
        <main>
          <Suspense fallback={<TabFallback />}>{body}</Suspense>
        </main>
        <Footer navigate={navigate} setTab={selectTab} />
      </div>
    </CartProvider>
  );
}
