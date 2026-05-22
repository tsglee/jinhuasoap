import { haitang } from '../data/haitang.js';
import { Kicker } from '../components/Kicker.jsx';
import { ResolvedImage } from '../components/ResolvedImage.jsx';
import { RadarFive } from '../components/RadarFive.jsx';

export function Soap({ navigate }) {
  return (
    <>
      <Opener />
      <Gallery />
      <Formula />
      <Radar />
      <Skin />
      <Cta navigate={navigate} />
    </>
  );
}

/* ─── §1 章首 ────────────────────────────────────────────── */

function Opener() {
  return (
    <section className="s-opener">
      <Kicker>NO. 壹 / 拾貳 — 花神守護</Kicker>
      <h1 className="s-opener__title">海棠修復</h1>
      <div className="s-opener__sub">{haitang.subtitle}</div>
      <div className="s-opener__photo">
        <ResolvedImage
          src={haitang.photos[0]}
          alt={haitang.zh}
          fit="contain"
          loading="eager"
          fetchPriority="high"
        />
      </div>
      <div className="s-opener__meta">
        NT$ {haitang.price} · {haitang.weight}
      </div>
    </section>
  );
}

/* ─── §2 影 (8-angle scroll-snap gallery) ─────────────────── */

function Gallery() {
  return (
    <section className="s-gallery">
      <div className="s-gallery__heading">
        <Kicker>NO. 貳 · 影</Kicker>
        <h2 className="s-gallery__title">八面</h2>
      </div>
      <div className="s-gallery__track" tabIndex={0}>
        {haitang.photos.map((src, i) => (
          <div className="s-gallery__slide" key={src}>
            <span className="s-gallery__num">
              {String(i + 1).padStart(2, '0')} / 08
            </span>
            <ResolvedImage src={src} alt={`海棠修復 第 ${i + 1} 面`} fit="cover" />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── §3 配方 (Hierarchical ingredients) ─────────────────── */

function Formula() {
  const { lead, support, base: baseIngredients } = haitang.ingredientTiers;
  return (
    <section className="s-formula">
      <div className="s-formula__heading">
        <Kicker>NO. 參 · 配方</Kicker>
        <h2 className="s-formula__title">配方</h2>
      </div>

      <div className="s-formula__tier">
        <div className="s-formula__tier-kicker">
          <div className="s-formula__tier-zh">主役</div>
          <div className="s-formula__tier-en">Lead</div>
        </div>
        <ul className="s-formula__tier-items">
          {lead.map((name) => (
            <li key={name} className="s-formula__item--lead">
              {name}
            </li>
          ))}
        </ul>
      </div>

      <div className="s-formula__tier">
        <div className="s-formula__tier-kicker">
          <div className="s-formula__tier-zh">配方</div>
          <div className="s-formula__tier-en">Support</div>
        </div>
        <ul className="s-formula__tier-items">
          {support.map((name) => (
            <li key={name} className="s-formula__item--support">
              {name}
            </li>
          ))}
        </ul>
      </div>

      <div className="s-formula__tier">
        <div className="s-formula__tier-kicker">
          <div className="s-formula__tier-zh">基底</div>
          <div className="s-formula__tier-en">Base</div>
        </div>
        <ul className="s-formula__tier-items">
          {baseIngredients.map((name) => (
            <li key={name} className="s-formula__item--base">
              {name}
            </li>
          ))}
        </ul>
      </div>

      <p className="s-formula__profile">{haitang.oilProfile}</p>
    </section>
  );
}

/* ─── §4 五力 ─────────────────────────────────────────────── */

function Radar() {
  return (
    <section className="s-radar">
      <div className="s-radar__chart">
        <RadarFive axes={haitang.fiveAxis} />
      </div>
      <div className="s-radar__text">
        <Kicker>NO. 肆 · 洗感</Kicker>
        <p className="s-radar__quote">「{haitang.washFeel}」</p>
        <div className="s-radar__note">PROTOTYPE — 五力分布為示意，非定值</div>
      </div>
    </section>
  );
}

/* ─── §5 適膚 ────────────────────────────────────────────── */

function Skin() {
  return (
    <section className="s-skin">
      <div className="s-skin__heading">
        <Kicker>NO. 伍 · 適膚</Kicker>
      </div>
      <div className="s-skin__chips">
        {haitang.skinTypeChips.map((chip, i) => (
          <span key={chip} style={{ display: 'inline-flex', alignItems: 'baseline', gap: 32 }}>
            <span className="s-skin__chip">{chip}</span>
            {i < haitang.skinTypeChips.length - 1 && <span className="s-skin__sep">·</span>}
          </span>
        ))}
      </div>
      <p className="s-skin__ritual">{haitang.ritual}</p>
    </section>
  );
}

/* ─── §6 結 ──────────────────────────────────────────────── */

function Cta({ navigate }) {
  return (
    <section className="s-cta">
      <div className="s-cta__heading">
        <Kicker>NO. 陸 · 購</Kicker>
      </div>
      <div className="s-cta__links">
        <a href="/?tab=shop">前往購皂 →</a>
        <a
          href="/redesign.html"
          onClick={(e) => {
            if (e.metaKey || e.ctrlKey || e.shiftKey) return;
            e.preventDefault();
            navigate('/redesign.html');
          }}
        >
          ← 回花譜
        </a>
      </div>
      <div className="s-cta__meta">
        NT$ {haitang.price} · {haitang.weight} · 慢熟 42 日
      </div>
    </section>
  );
}
