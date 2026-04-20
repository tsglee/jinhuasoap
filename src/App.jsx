// App — tab router
import { useState, useEffect } from 'react';
import { Header, Footer } from './components/Chrome.jsx';
import { About } from './components/About.jsx';
import { Products } from './components/Products.jsx';
import { Process } from './components/Process.jsx';
import { Shop } from './components/Shop.jsx';
import { CartProvider } from './state/CartContext.jsx';

const TABS = [
  { id: 'about', zh: '本舍', en: 'About Us' },
  { id: 'products', zh: '十二花', en: 'Products' },
  { id: 'process', zh: '製皂', en: 'Process & Ingredients' },
  { id: 'shop', zh: '購皂', en: 'Shop' },
];

export default function App() {
  const [tab, setTab] = useState(() => {
    try {
      return localStorage.getItem('gf_tab') || 'about';
    } catch {
      return 'about';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('gf_tab', tab);
    } catch {
      // localStorage may be unavailable (private browsing, quota); ignore.
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [tab]);

  return (
    <CartProvider>
      <div data-screen-label={`Goldenflower · ${tab}`}>
        <Header tab={tab} setTab={setTab} tabs={TABS} />
        <main>
          {tab === 'about' && <About />}
          {tab === 'products' && <Products />}
          {tab === 'process' && <Process />}
          {tab === 'shop' && <Shop />}
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}
