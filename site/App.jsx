// App — tab router
const { useState, useEffect } = React;

const TABS = [
  { id: "about",    zh: "本舍",     en: "About Us" },
  { id: "products", zh: "十二花",   en: "Products" },
  { id: "process",  zh: "製皂",     en: "Process & Ingredients" },
  { id: "shop",     zh: "購皂",     en: "Shop & Stockists" },
];

function App() {
  const [tab, setTab] = useState(() => {
    try { return localStorage.getItem("gf_tab") || "about"; } catch { return "about"; }
  });
  useEffect(() => {
    try { localStorage.setItem("gf_tab", tab); } catch {}
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [tab]);

  return (
    <div data-screen-label={`Goldenflower · ${tab}`}>
      <Header tab={tab} setTab={setTab} tabs={TABS} />
      <main>
        {tab === "about"    && <About />}
        {tab === "products" && <Products />}
        {tab === "process"  && <Process />}
        {tab === "shop"     && <Shop />}
      </main>
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
