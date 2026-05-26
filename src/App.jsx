// App — tab router + minimal path-based routes for /journal and /legal/*
import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { Header, Footer } from './components/Chrome.jsx';
import { About } from './components/About/index.jsx';
import { LineFloat } from './components/LineFloat.jsx';
import { CartProvider } from './state/CartContext.jsx';
import { LocaleProvider } from './i18n/index.jsx';

// About is the default tab — kept in the main bundle for instant first
// paint. Everything else loads on tab switch / direct navigation. The
// .then(m => ({ default: ... })) shim adapts our named exports to React.lazy's
// default-export contract.
const Products = lazy(() =>
  import('./components/Products.jsx').then((m) => ({ default: m.Products })),
);
const ProductDetail = lazy(() =>
  import('./components/ProductDetail.jsx').then((m) => ({ default: m.ProductDetail })),
);
const CategoryListing = lazy(() =>
  import('./components/CategoryListing.jsx').then((m) => ({ default: m.CategoryListing })),
);
const Process = lazy(() =>
  import('./components/Process.jsx').then((m) => ({ default: m.Process })),
);
const Shop = lazy(() =>
  import('./components/Shop.jsx').then((m) => ({ default: m.Shop })),
);
const Cart = lazy(() =>
  import('./components/Cart.jsx').then((m) => ({ default: m.Cart })),
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
const OrderTracking = lazy(() =>
  import('./components/OrderTracking.jsx').then((m) => ({ default: m.OrderTracking })),
);

// Empty placeholder while a lazy chunk loads. Sized to roughly match the
// first viewport so the page doesn't snap shorter during the brief load.
const TabFallback = () => <div style={{ minHeight: '60vh' }} />;

const TABS = [
  { id: 'about', zh: '本舍', path: '/' },
  { id: 'products', zh: '十二花', path: '/products' },
  { id: 'process', zh: '製皂', path: '/process' },
  { id: 'shop', zh: '購皂', path: '/shop' },
  { id: 'journal', zh: '本舍小記', path: '/journal' },
];

// Valid tab ids that can be passed via `?tab=` query param on the root path
// (e.g. `/?tab=shop` from Google Ads landing URLs). Journal has its own
// `/journal` path so it's excluded here.
const TAB_QUERY_IDS = new Set(['about', 'products', 'process', 'shop']);

function parseRoute() {
  if (typeof window === 'undefined') return { type: 'tab' };
  const path = window.location.pathname;
  if (path === '/' || path === '') {
    // Read `?tab=` query param so ad landing URLs like `/?tab=shop` and
    // shareable deeplinks like `/?tab=products` actually switch tabs.
    const qs = new URLSearchParams(window.location.search);
    const queryTab = qs.get('tab');
    if (queryTab && TAB_QUERY_IDS.has(queryTab)) {
      return { type: 'tab', tab: queryTab };
    }
    // Bare `/` is the 本舍 tab. Make this explicit so navigating back to
    // home from a deep page (e.g. /products/<slug>) actually resets the
    // local tab state — the sync useEffect only fires when `route.tab` is
    // set, so a missing `.tab` would otherwise leave `tab` on whatever the
    // user was on before.
    return { type: 'tab', tab: 'about' };
  }
  const legal = path.match(/^\/legal\/(privacy|returns|terms)\/?$/);
  if (legal) return { type: 'legal', page: legal[1] };
  if (path === '/cart' || path === '/cart/') return { type: 'cart' };
  if (path === '/journal' || path === '/journal/') return { type: 'journal' };
  if (path.startsWith('/journal/')) {
    const slug = path.slice('/journal/'.length).replace(/\/+$/, '');
    if (slug) return { type: 'journal', slug };
  }
  // Clean tab URLs — 01-05 each get their own path. `/products` is the 02
  // 十二花 listing (note: must match BEFORE the /products/<slug> regex
  // below). `/journal` is handled above.
  if (path === '/products' || path === '/products/') return { type: 'tab', tab: 'products' };
  if (path === '/process' || path === '/process/') return { type: 'tab', tab: 'process' };
  if (path === '/shop' || path === '/shop/') return { type: 'tab', tab: 'shop' };
  // `/products/concern/<slug>` — TA cluster listing (e.g. /products/concern/nurture)
  const concernMatch = path.match(/^\/products\/concern\/([a-z0-9-]+)\/?$/);
  if (concernMatch) return { type: 'category', slug: concernMatch[1] };
  // `/products/<slug>` — single product detail (e.g. /products/haitang-biyu)
  const productMatch = path.match(/^\/products\/([a-z0-9-]+)\/?$/);
  if (productMatch) return { type: 'product', slug: productMatch[1] };
  const orderMatch = path.match(/^\/order\/(JH-\d{6}-[A-Z0-9]{4})\/?$/);
  if (orderMatch) return { type: 'order', orderId: orderMatch[1] };
  if (path === '/order' || path === '/order/') return { type: 'order' };
  return { type: 'notfound' };
}

function NotFound({ navigate }) {
  useEffect(() => {
    document.title = '找不到頁面 · 金花樓';
    // SEO: ask crawlers not to index this URL since it's a soft 404
    let meta = document.head.querySelector('meta[name="robots"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'robots');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', 'noindex, follow');
    return () => {
      // Restore default indexing on unmount
      meta.setAttribute('content', 'index, follow');
    };
  }, []);

  return (
    <section
      className="gf-pad-md"
      style={{
        maxWidth: 720,
        margin: '0 auto',
        padding: '120px 44px',
        textAlign: 'center',
      }}
    >
      <div className="mono" style={{ color: 'var(--red)', marginBottom: 24 }}>
        404 · 走錯了
      </div>
      <h1
        className="tc"
        style={{
          fontSize: 56,
          fontWeight: 500,
          letterSpacing: 10,
          margin: '0 0 24px',
          color: 'var(--sumi)',
        }}
      >
        找不到頁面
      </h1>
      <p
        className="tc"
        style={{
          fontSize: 16,
          lineHeight: 1.85,
          letterSpacing: 1,
          color: 'var(--ink-60)',
          margin: '0 0 40px',
        }}
      >
        這條路徑可能已經搬家、或者你輸入的網址不對。
        <br />
        從下面任一個地方重新開始 ──
      </p>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 16,
          justifyContent: 'center',
        }}
      >
        <button
          type="button"
          onClick={() => navigate('/')}
          className="mono"
          style={{
            padding: '12px 24px',
            background: 'var(--red)',
            color: 'var(--gold-2)',
            border: '1px solid var(--gold-1)',
            fontSize: 13,
            letterSpacing: 2,
            cursor: 'pointer',
          }}
        >
          回首頁 · 本舍
        </button>
        <button
          type="button"
          onClick={() => navigate('/journal')}
          className="mono"
          style={{
            padding: '12px 24px',
            background: 'transparent',
            color: 'var(--sumi)',
            border: '1px solid var(--ink-15)',
            fontSize: 13,
            letterSpacing: 2,
            cursor: 'pointer',
          }}
        >
          本舍小記
        </button>
      </div>
    </section>
  );
}

export default function App() {
  const [route, setRoute] = useState(parseRoute);

  const [tab, setTab] = useState(() => {
    // If the URL carries `?tab=<id>`, honour that on first paint (e.g.
    // someone landed from an ad). Otherwise fall back to the last tab the
    // user was on (localStorage), then default to about.
    if (route?.type === 'tab' && route.tab) return route.tab;
    try {
      return localStorage.getItem('gf_tab') || 'about';
    } catch {
      return 'about';
    }
  });

  // When parseRoute decides on a query-driven tab (e.g. `?tab=shop`), sync
  // local tab state so the tab nav highlights correctly.
  useEffect(() => {
    if (route?.type === 'tab' && route.tab && route.tab !== tab) {
      setTab(route.tab);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route]);

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
  if (route.type === 'notfound') {
    body = <NotFound navigate={navigate} />;
  } else if (route.type === 'cart') {
    body = <Cart navigate={navigate} />;
  } else if (route.type === 'journal' && route.slug) {
    body = <JournalPost slug={route.slug} navigate={navigate} />;
  } else if (route.type === 'journal') {
    body = <JournalIndex navigate={navigate} />;
  } else if (route.type === 'legal') {
    body = <Legal page={route.page} navigate={navigate} />;
  } else if (route.type === 'order') {
    body = <OrderTracking orderId={route.orderId} navigate={navigate} />;
  } else if (route.type === 'product' && route.slug) {
    body = <ProductDetail slug={route.slug} navigate={navigate} />;
  } else if (route.type === 'category' && route.slug) {
    body = <CategoryListing slug={route.slug} navigate={navigate} />;
  } else if (tab === 'about') {
    body = <About setTab={selectTab} navigate={navigate} />;
  } else if (tab === 'products') {
    body = <Products navigate={navigate} />;
  } else if (tab === 'process') {
    body = <Process />;
  } else if (tab === 'shop') {
    body = <Shop navigate={navigate} />;
  }

  const screenLabel = route.type === 'cart'
    ? 'cart'
    : route.type === 'journal'
    ? (route.slug ? `journal/${route.slug}` : 'journal')
    : route.type === 'legal'
    ? `legal/${route.page}`
    : route.type === 'order'
    ? (route.orderId ? `order/${route.orderId}` : 'order')
    : route.type === 'product'
    ? `product/${route.slug}`
    : route.type === 'category'
    ? `category/${route.slug}`
    : route.type === 'notfound'
    ? '404'
    : tab;

  const activeTabId =
    route.type === 'journal'
      ? 'journal'
      : route.type === 'product' || route.type === 'category'
      ? 'products'
      : tab;

  return (
    <LocaleProvider>
      <CartProvider>
        <div data-screen-label={`Goldenflower · ${screenLabel}`}>
          <Header tab={activeTabId} setTab={selectTab} tabs={TABS} navigate={navigate} />
          <main>
            <Suspense fallback={<TabFallback />}>{body}</Suspense>
          </main>
          <Footer navigate={navigate} setTab={selectTab} />
          <LineFloat />
        </div>
      </CartProvider>
    </LocaleProvider>
  );
}
