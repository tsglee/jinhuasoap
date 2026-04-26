// App — tab router + minimal path-based routes for /journal and /legal/*
import { useCallback, useEffect, useState } from 'react';
import { Header, Footer } from './components/Chrome.jsx';
import { About } from './components/About.jsx';
import { Products } from './components/Products.jsx';
import { Process } from './components/Process.jsx';
import { Shop } from './components/Shop.jsx';
import { JournalIndex, JournalPost } from './components/Journal.jsx';
import { Legal } from './components/Legal.jsx';
import { CartProvider } from './state/CartContext.jsx';

const TABS = [
  { id: 'about', zh: '本舍' },
  { id: 'products', zh: '十二花' },
  { id: 'process', zh: '製皂' },
  { id: 'shop', zh: '購皂' },
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

  return (
    <CartProvider>
      <div data-screen-label={`Goldenflower · ${screenLabel}`}>
        <Header tab={tab} setTab={selectTab} tabs={TABS} />
        <main>{body}</main>
        <Footer navigate={navigate} />
      </div>
    </CartProvider>
  );
}
