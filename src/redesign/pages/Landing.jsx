import { PRODUCTS } from '../../data/products.js';
import { Kicker } from '../components/Kicker.jsx';
import { ResolvedImage } from '../components/ResolvedImage.jsx';

export function Landing({ navigate }) {
  return (
    <>
      <Hero />
      <Manifesto />
      <Twelve navigate={navigate} />
      <Featured navigate={navigate} />
      <Coda />
    </>
  );
}

/* ─── §1 序章 ─────────────────────────────────────────────── */

function Hero() {
  return (
    <section className="r-hero">
      <Kicker className="r-hero__kicker-tl">MMXXII — TAIPEI · LINKOU</Kicker>
      <h1 className="r-hero__title" aria-label="金花樓">
        金花樓
      </h1>
      <div className="r-hero__kicker-br">手壓 · 慢熟 · 四十二日</div>
      <div className="r-hero__est">EST. 二〇二二</div>
    </section>
  );
}

/* ─── §2 銘 ──────────────────────────────────────────────── */

function Manifesto() {
  return (
    <section className="r-section r-manifesto">
      <div className="r-manifesto__left">
        <Kicker>NO. 序 · 銘</Kicker>
        <div className="r-manifesto__glyph">銘</div>
      </div>
      <div className="r-manifesto__body">
        <p>
          金花樓是林口的一間小小皂舍。用島上的油、花材、乾淨的純水 ──
          一方一方手壓肥皂，一次一個配方、一批四十二日，慢慢陳化。
        </p>
        <p>
          每一塊皂的切、印、包，都從我們二人的手裡來 ──
          就是我們夫妻兩人。每一刀切、每一塊壓、每一張包裝都自己做。
        </p>
        <p>
          一方小皂，洗塵心 · 照夜夢。
        </p>
      </div>
    </section>
  );
}

/* ─── §3 拾貳花譜 ───────────────────────────────────────── */

function Twelve({ navigate }) {
  return (
    <section className="r-section r-twelve">
      <div className="r-twelve__heading">
        <Kicker>NO. 壹 · 拾貳花譜</Kicker>
        <h2 className="r-twelve__title">十二款</h2>
      </div>
      <ul className="r-twelve__list">
        {PRODUCTS.map((p) => {
          const isHaitang = p.slug === 'haitang-xiufu';
          return (
            <li
              key={p.slug}
              className={`r-twelve__row ${isHaitang ? 'r-twelve__row--link' : ''}`}
              onClick={isHaitang ? () => navigate('/redesign.html?p=haitang') : undefined}
              role={isHaitang ? 'button' : undefined}
              tabIndex={isHaitang ? 0 : undefined}
              onKeyDown={
                isHaitang
                  ? (e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        navigate('/redesign.html?p=haitang');
                      }
                    }
                  : undefined
              }
            >
              <span className="r-twelve__num">{p.num}</span>
              <span className="r-twelve__name">{p.zh.split(' · ')[0]}</span>
              <span className="r-twelve__sub">{p.subtitle}</span>
              <span className="r-twelve__price">NT$ {p.price}</span>
              <span className="r-twelve__arrow">→</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/* ─── §4 主役 · 海棠 ────────────────────────────────────── */

function Featured({ navigate }) {
  const haitang = PRODUCTS[0];
  return (
    <section className="r-section r-featured">
      <div className="r-featured__photo">
        <ResolvedImage
          src="/images/products/海棠/03.png"
          alt="海棠修復 · 碧玉"
          fit="cover"
          loading="lazy"
        />
      </div>
      <div className="r-featured__text">
        <Kicker>NO. 壹 · 花神守護</Kicker>
        <h2 className="r-featured__title">海棠修復</h2>
        <p className="r-featured__quote">
          「為敏弱、痘困、走過幾道瑕疵的肌膚而壓 ──{' '}
          {haitang.washFeel.replace('。', '。')}」
        </p>
        <div className="r-featured__byline">── 趙老闆娘</div>
        <button
          type="button"
          className="r-featured__cta"
          onClick={() => navigate('/redesign.html?p=haitang')}
        >
          查看詳細 →
        </button>
      </div>
    </section>
  );
}

/* ─── §5 跋 ──────────────────────────────────────────────── */

function Coda() {
  return (
    <footer className="r-coda">
      <div className="r-coda__rule" />
      <div className="r-coda__glyph">了</div>
      <div className="r-coda__links">
        <a href="/">回到主站</a>
        <a href="/?tab=shop">前往購皂</a>
        <a href="https://lin.ee/7m167md" target="_blank" rel="noopener noreferrer">
          LINE @goldenflower
        </a>
      </div>
      <div className="r-coda__sig">MADE BY HAND · LINKOU · TAIPEI</div>
    </footer>
  );
}
