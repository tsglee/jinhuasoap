// Process & Ingredients tab — how the soap is made, end to end
function Process() {
  const steps = [
    { n:"I",   zh:"採集", en:"Gather",    body:"Every Monday we drive to our growers in Yilan and Yangmingshan — oils, herbs, spring water. Everything is weighed before it leaves the farm." },
    { n:"II",  zh:"煉油", en:"Render",    body:"Oils are warmed to 40°C in a copper pot, stirred by hand. No heat above body temperature — this keeps the fatty acids intact." },
    { n:"III", zh:"調鹼", en:"Mix the lye", body:"Spring water meets food-grade sodium hydroxide. The solution cools overnight in a stoneware jar." },
    { n:"IV",  zh:"入模", en:"Pour",      body:"Oils and lye meet, we stir until trace, fold in the botanicals, and pour into cedar moulds lined with unbleached paper." },
    { n:"V",   zh:"切皂", en:"Cut",       body:"After 48 hours we unmould and slice by hand with a wire — each bar stamped with the golden flower seal." },
    { n:"VI",  zh:"慢熟", en:"Cure",      body:"Bars rest on cedar racks for forty-two days. They harden, mellow, and lose the last of their alkali — this is the step machines cannot hurry." },
    { n:"VII", zh:"封蠟", en:"Seal",      body:"Each bar is wrapped in kozo paper, tied with hemp, and sealed with a drop of red wax pressed with our chop." },
  ];

  const ingredients = [
    { kind:"olive",    zh:"橄欖油", en:"Olive oil",        origin:"Chiayi, TW",        ratio:"32%", benefit:"滋潤",   note:"The base. Gentle, conditioning, slow to lather." },
    { kind:"coconut",  zh:"椰子油", en:"Coconut oil",      origin:"Fair trade, PH",    ratio:"26%", benefit:"起泡",   note:"The lather. Crisp, bubbly, cleansing." },
    { kind:"castor",   zh:"蓖麻油", en:"Castor oil",       origin:"India",             ratio:"6%",  benefit:"潤滑",   note:"The finish. Silky, long-lasting bubbles." },
    { kind:"water",    zh:"山泉水", en:"Spring water",     origin:"Yangmingshan",      ratio:"14%", benefit:"淨",     note:"Drawn weekly from a mountain spring north of Taipei." },
    { kind:"lye",      zh:"食用鹼", en:"Sodium hydroxide", origin:"Food-grade, JP",    ratio:"12%", benefit:"皂化",   note:"Fully reacted in curing — no lye remains in the finished bar." },
    { kind:"botanical",zh:"花材",   en:"Botanicals",       origin:"Yilan growers",     ratio:"~8%", benefit:"香氣",   note:"Pressed, infused, or powdered — depending on the recipe." },
    { kind:"salt",     zh:"海鹽",   en:"Sea salt",         origin:"Tainan salt flats", ratio:"1%",  benefit:"礦物",   note:"A whisper of crunch and minerality, added after trace." },
    { kind:"honey",    zh:"蜂蜜",   en:"Raw honey",        origin:"Miaoli apiaries",   ratio:"1%",  benefit:"保濕",   note:"In select recipes. Mellowing, humectant, slightly sweet." },
  ];

  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      {/* Header */}
      <section style={{
        maxWidth: 1280, margin: "0 auto",
        padding: "80px 44px 40px",
        textAlign: "center",
      }}>
        <div className="mono" style={{ color: "var(--red)" }}>How it is made · 製皂之序</div>
        <h1 className="tc" style={{
          fontSize: 72, fontWeight: 500,
          letterSpacing: 16, margin: "16px 0 10px",
          color: "var(--sumi)",
        }}>七步慢皂</h1>
        <div className="italic" style={{
          fontSize: 22, color: "var(--gold-3)",
        }}>Seven steps, forty-two days, one small bar.</div>
      </section>

      {/* Timeline */}
      <section style={{
        maxWidth: 1280, margin: "0 auto",
        padding: "20px 44px 40px",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: 0,
          borderTop: "1px solid var(--ink-15)",
          borderBottom: "1px solid var(--ink-15)",
        }}>
          {steps.map((s, i) => (
            <div key={s.n} style={{
              padding: "24px 18px",
              borderRight: i < 6 ? "1px solid var(--ink-15)" : "none",
              position: "relative",
            }}>
              <div className="mono" style={{ color: "var(--gold-3)" }}>Step {s.n}</div>
              <div className="tc" style={{
                marginTop: 10, fontSize: 32,
                fontWeight: 500, letterSpacing: 4,
              }}>{s.zh}</div>
              <div className="italic" style={{
                fontSize: 16, color: "var(--red)", marginTop: 2,
              }}>{s.en}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Step details — alternating left/right */}
      <section style={{
        maxWidth: 1180, margin: "0 auto",
        padding: "40px 44px 60px",
      }}>
        {steps.map((s, i) => {
          const flip = i % 2 === 1;
          return (
            <div key={s.n} style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 60,
              alignItems: "center",
              padding: "50px 0",
              borderTop: i > 0 ? "1px dashed var(--ink-15)" : "none",
            }}>
              <div style={{ order: flip ? 2 : 1, position: "relative" }}>
                <IllStep
                  step={s.n}
                  ratio="4/3"
                  label={`step ${s.n} — ${s.en.toLowerCase()}`}
                />
                <div style={{
                  position: "absolute",
                  top: -18, [flip ? "right" : "left"]: -18,
                  background: "var(--red)", color: "var(--gold-2)",
                  width: 56, height: 56,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: '"Noto Serif TC", serif',
                  fontSize: 20, fontWeight: 500, letterSpacing: 2,
                  border: "2px solid var(--gold-1)",
                }}>{s.n}</div>
              </div>
              <div style={{ order: flip ? 1 : 2 }}>
                <div className="mono" style={{ color: "var(--gold-3)" }}>No. {s.n}</div>
                <div className="tc" style={{
                  fontSize: 48, fontWeight: 500, letterSpacing: 6,
                  margin: "10px 0 4px", color: "var(--sumi)",
                }}>{s.zh}</div>
                <div className="italic" style={{
                  fontSize: 26, color: "var(--red)", marginBottom: 18,
                }}>{s.en}</div>
                <div style={{ fontSize: 17, lineHeight: 1.7, color: "var(--sumi)", maxWidth: 460 }}>
                  {s.body}
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Ingredient grid — SHIRO-style photo tiles */}
      <section style={{
        background: "var(--paper-3)",
        borderTop: "1px solid var(--ink-15)",
        borderBottom: "1px solid var(--ink-15)",
      }}>
        <div style={{
          maxWidth: 1280, margin: "0 auto",
          padding: "80px 44px",
        }}>
          {/* Header block */}
          <div style={{
            textAlign: "center", marginBottom: 50,
          }}>
            <div className="mono" style={{ color: "var(--red)" }}>What's inside · 材料</div>
            <h2 className="tc" style={{
              fontSize: 64, fontWeight: 400,
              letterSpacing: 16, margin: "14px 0 8px",
              color: "var(--sumi)",
            }}>八樣材料</h2>
            <div className="italic" style={{ fontSize: 22, color: "var(--gold-3)" }}>
              Eight ingredients, nothing else.
            </div>
            <div style={{
              maxWidth: 560, margin: "18px auto 0",
              fontSize: 15, lineHeight: 1.7, color: "var(--ink-60)",
            }}>
              Ratios shift by recipe — a turmeric bar will lean harder on olive oil,
              a sea-salt bar on coconut. These are the house averages.
            </div>
          </div>

          {/* 4 × 2 photo grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 2,
            background: "var(--sumi)",
            border: "1px solid var(--sumi)",
          }}>
            {ingredients.map((x) => (
              <div key={x.en} style={{ position: "relative" }}>
                <IllIngredient
                  kind={x.kind}
                  zh={x.zh}
                  en={x.en}
                  benefit={x.benefit}
                />
                {/* Small metadata strip at bottom */}
                <div style={{
                  position: "absolute", left: 0, right: 0, bottom: 0,
                  padding: "10px 14px",
                  display: "flex", justifyContent: "space-between", alignItems: "baseline",
                  fontFamily: '"DM Mono", monospace',
                  fontSize: 10, letterSpacing: 2, textTransform: "uppercase",
                  color: "rgba(244,236,215,0.75)",
                  textShadow: "0 1px 6px rgba(0,0,0,0.5)",
                  pointerEvents: "none",
                }}>
                  <span>{x.origin}</span>
                  <span style={{ color: "var(--gold-2)" }}>{x.ratio}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Caption row beneath the grid — preserves the full notes */}
          <div style={{
            marginTop: 40,
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "28px 40px",
          }}>
            {ingredients.map((x) => (
              <div key={`note-${x.en}`}>
                <div style={{
                  display: "flex", alignItems: "baseline", gap: 10,
                  marginBottom: 6,
                }}>
                  <span className="italic" style={{ fontSize: 18, color: "var(--sumi)" }}>{x.en}</span>
                  <span className="mono" style={{ color: "var(--gold-3)" }}>· {x.ratio}</span>
                </div>
                <div style={{ fontSize: 14, lineHeight: 1.55, color: "var(--ink-60)" }}>
                  {x.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we don't use */}
      <section style={{
        maxWidth: 1280, margin: "0 auto",
        padding: "80px 44px",
      }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80,
          alignItems: "center",
        }}>
          <div style={{ position: "relative" }}>
            <IllNoList ratio="1/1" label="the no list" />
          </div>
          <div>
            <div className="mono" style={{ color: "var(--red)" }}>The "no" list · 不入之物</div>
            <h2 className="tc" style={{
              fontSize: 46, fontWeight: 400, letterSpacing: 8,
              margin: "14px 0 20px",
            }}>不做之事</h2>
            <div style={{
              display: "grid", gap: 16, fontSize: 17, color: "var(--sumi)",
            }}>
              {[
                { zh:"不用棕櫚油", en:"No palm oil — we replace it with Taiwan-pressed olive and coconut." },
                { zh:"不加香精", en:"No synthetic fragrance — scent comes from the botanical itself." },
                { zh:"不加色素", en:"No dye — colour comes from clay, turmeric, charcoal, and time." },
                { zh:"不過度包裝", en:"No plastic wrap — kozo paper, hemp string, a drop of wax." },
                { zh:"不催熟", en:"No accelerated cure — forty-two days, every time." },
              ].map((x, i) => (
                <div key={i} style={{
                  display: "grid", gridTemplateColumns: "auto 1fr", gap: 20,
                  alignItems: "baseline",
                  paddingBottom: 14, borderBottom: "1px dotted var(--ink-15)",
                }}>
                  <span className="tc" style={{
                    fontSize: 22, color: "var(--red)",
                    letterSpacing: 4, minWidth: 100,
                  }}>{x.zh}</span>
                  <span className="italic" style={{ fontSize: 17 }}>{x.en}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

window.Process = Process;
