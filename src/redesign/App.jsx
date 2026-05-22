import { useEffect, useState } from 'react';
import { Landing } from './pages/Landing.jsx';
import { Soap } from './pages/Soap.jsx';

// Two routes total. Path is always /redesign.html (Cloudflare serves the
// built asset directly); page selection is via ?p= query.
function parseRoute() {
  if (typeof window === 'undefined') return { page: 'landing' };
  const params = new URLSearchParams(window.location.search);
  const p = params.get('p');
  if (p === 'haitang') return { page: 'soap' };
  return { page: 'landing' };
}

export function RedesignApp() {
  const [route, setRoute] = useState(parseRoute);

  useEffect(() => {
    const onPop = () => setRoute(parseRoute());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // Scroll to top on every navigation.
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [route.page]);

  function navigate(path) {
    // External or root site links: full-page nav, let browser handle.
    if (!path.startsWith('/redesign.html')) {
      window.location.href = path;
      return;
    }
    window.history.pushState({}, '', path);
    setRoute(parseRoute());
  }

  if (route.page === 'soap') return <Soap navigate={navigate} />;
  return <Landing navigate={navigate} />;
}
