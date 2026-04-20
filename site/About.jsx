// About tab — brand story, heritage, philosophy, founders
function About() {
  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      {/* Hero */}
      <section style={{
        maxWidth: 1280, margin: "0 auto",
        padding: "80px 44px 60px",
        display: "grid",
        gridTemplateColumns: "1.1fr 1fr",
        gap: 80, alignItems: "center",
      }}>
        <div>
          <div className="mono" style={{ color: "var(--red)", marginBottom: 24 }}>
            Our Story · 本舍小記
          </div>
          <h1 className="tc" style={{
            fontSize: 72, fontWeight: 500, lineHeight: 1.05,
            letterSpacing: 4, margin: 0, color: "var(--sumi)",
          }}>
            山中<br/>
            一盞<br/>
            <span style={{ color: "var(--red)" }}>金花。</span>
          </h1>
          <div className="italic" style={{
            marginTop: 24, fontSize: 26, lineHeight: 1.35,
            color: "var(--gold-3)", maxWidth: 480,
          }}>
            A single goldenflower<br/>
            on the mountain —<br/>
            soap, to wash the dust of mind.
          </div>
          <div style={{ marginTop: 32, maxWidth: 480, fontSize: 17, lineHeight: 1.7, color: "var(--sumi)" }}>
            金花樓 is a small soap house in Taipei. We press bars by hand from oils, botanicals, and water drawn on the island — one recipe at a time, one batch at a time, cured for six weeks before we'll let them go.
          </div>
        </div>
        <div style={{ position: "relative" }}>
          <div style={{
            position: "absolute", inset: -20,
            border: "1px solid var(--gold-3)", opacity: 0.35,
          }} />
          <IllWorkbench label="founder at workbench · morning light" ratio="3/4" />
          <div style={{
            position: "absolute", bottom: -20, right: -20,
            background: "var(--paper)", padding: "14px 18px",
            border: "1px solid var(--ink-15)",
            fontFamily: '"DM Mono", monospace', fontSize: 10,
            letterSpacing: 2, textTransform: "uppercase",
            color: "var(--gold-3)",
          }}>Taipei · 艋舺 · 2026</div>
        </div>
      </section>

      {/* Three pillars */}
      <section style={{
        borderTop: "1px solid var(--ink-15)",
        borderBottom: "1px solid var(--ink-15)",
        background: "rgba(244,236,215,0.5)",
      }}>
        <div style={{
          maxWidth: 1280, margin: "0 auto",
          padding: "60px 44px",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 60,
        }}>
          {[
            { zh:"純手工", en:"By hand, only.", body:"Every bar is cut, stamped, and wrapped by one of four people in our studio. No machines press our soap." },
            { zh:"天然材料", en:"Nothing synthetic.", body:"Cold-pressed oils, stone-ground botanicals, spring water from Yangmingshan. No palm, no fragrance, no dye." },
            { zh:"慢製", en:"Slow-cured.", body:"We don't rush. Every bar cures forty-two days on cedar racks before it reaches the shelf — so it lasts, and so it's kind." },
          ].map((p,i) => (
            <div key={i}>
              <div className="tc" style={{
                fontSize: 48, fontWeight: 300, letterSpacing: 8,
                color: "var(--red)",
              }}>{p.zh}</div>
              <div className="italic" style={{
                fontSize: 22, marginTop: 4, color: "var(--gold-3)",
              }}>{p.en}</div>
              <Divider />
              <div style={{
                marginTop: 16, fontSize: 16, lineHeight: 1.65,
                color: "var(--sumi)", maxWidth: 300,
              }}>{p.body}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Manifesto — vertical chinese + horizontal english */}
      <section style={{
        maxWidth: 1280, margin: "0 auto",
        padding: "90px 44px",
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gap: 80,
      }}>
        <div style={{
          writingMode: "vertical-rl",
          fontFamily: '"Noto Serif TC", serif',
          fontSize: 30, lineHeight: 2.4,
          letterSpacing: 10, color: "var(--sumi)",
          height: 460,
        }}>
          以天然之物 · 慢製一方肥皂 · 洗塵心
          <span style={{ color: "var(--red)" }}> · 照夜夢</span>
        </div>
        <div>
          <div className="mono" style={{ color: "var(--gold-3)", marginBottom: 20 }}>Manifesto · 本舍之約</div>
          <div className="italic" style={{ fontSize: 30, lineHeight: 1.4, color: "var(--sumi)", maxWidth: 620 }}>
            We believe a bar of soap can be a small ceremony — the first cold water of the morning, the last warm water of the night.
          </div>
          <div style={{
            marginTop: 40, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40,
            fontSize: 16, lineHeight: 1.7, color: "var(--sumi)",
          }}>
            <p>We started in a kitchen in Wanhua with one recipe and an olive oil press. The first batch — twelve bars of mugwort — sold out to neighbours in an afternoon, and we've been pressing a new batch every Thursday since.</p>
            <p>Our rule is simple: if we wouldn't put it on our grandmother's skin, it doesn't go in our soap. That quietly rules out most of what the big factories make — and it gives us room to do the small thing very, very well.</p>
          </div>
        </div>
      </section>

      {/* Five bars, five rituals */}
      <section style={{
        background: "var(--paper-3)",
        borderTop: "1px solid var(--ink-15)",
      }}>
        <div style={{
          maxWidth: 1280, margin: "0 auto",
          padding: "80px 44px 90px",
        }}>
          <div className="mono" style={{ color: "var(--red)", textAlign: "center", marginBottom: 8 }}>
            Five Bars · 五皂五境
          </div>
          <h2 className="tc" style={{
            textAlign: "center", fontSize: 44, fontWeight: 400,
            letterSpacing: 10, margin: "0 0 14px", color: "var(--sumi)",
          }}>一皂一境</h2>
          <div className="italic" style={{
            textAlign: "center", fontSize: 22, color: "var(--gold-3)",
            maxWidth: 640, margin: "0 auto 56px", lineHeight: 1.45,
          }}>
            One bar for every ritual — from the morning shower<br/>to the long ride home. Each pressed for a different kind of day.
          </div>

          {/* Hero scene — the all-in-one bar (largest tile) */}
          {(() => {
            const scene = {
              zh: "一塊走天下",
              en: "The All-in-One Bar",
              subtitle: "髮 · 身 · 面 一塊搞定",
              tagline: "From crown to heel, one bar.",
              palette: { tone: "warm", flower: "rose" },
              kicker: "NO. 01 · ALL-OVER",
              body: "Pressed for the traveller, the minimalist, the small bathroom. A gentle castile base with oat milk and chamomile — soft enough for hair, strong enough to take the day off your shoulders. Lathers the same in hard tap water or hot-spring water; rinses without residue.",
              tags: ["castile base", "oat milk · chamomile", "pH 8.9", "hair · face · body", "105 g bar"],
              note: "ritual — pack one bar for a three-day trip, unwrap the cedar paper at the hotel, and your whole routine fits in a pocket.",
            };
            return (
              <div style={{
                display: "grid",
                gridTemplateColumns: "1.05fr 1fr",
                gap: 60, alignItems: "center",
                padding: "44px 0",
                borderTop: "1px solid var(--ink-15)",
                borderBottom: "1px solid var(--ink-15)",
                marginBottom: 60,
              }}>
                <div style={{ position: "relative" }}>
                  <div style={{
                    position: "absolute", inset: -16,
                    border: "1px solid var(--gold-3)", opacity: 0.3,
                  }} />
                  <IllSoap
                    label="all-in-one bar · oat milk + chamomile"
                    tone={scene.palette.tone}
                    flower={scene.palette.flower}
                    ratio="5/4"
                  />
                  <div style={{
                    position: "absolute", bottom: -16, left: -16,
                    background: "var(--sumi)", color: "var(--gold-2)",
                    padding: "10px 14px",
                    fontFamily: '"DM Mono", monospace', fontSize: 10,
                    letterSpacing: 2, textTransform: "uppercase",
                  }}>HERO · {scene.kicker}</div>
                </div>
                <div>
                  <div className="mono" style={{ color: "var(--red)" }}>{scene.kicker}</div>
                  <h3 className="tc" style={{
                    fontSize: 52, fontWeight: 400, letterSpacing: 6,
                    margin: "10px 0 6px", color: "var(--sumi)",
                  }}>{scene.zh}</h3>
                  <div className="tc" style={{
                    fontSize: 18, letterSpacing: 6,
                    color: "var(--gold-3)",
                  }}>{scene.subtitle}</div>
                  <div className="italic" style={{
                    marginTop: 18, fontSize: 26, lineHeight: 1.35,
                    color: "var(--gold-3)",
                  }}>{scene.tagline}</div>
                  <Divider />
                  <p style={{
                    marginTop: 18, fontSize: 17, lineHeight: 1.7,
                    color: "var(--sumi)", maxWidth: 520,
                  }}>{scene.body}</p>
                  <div style={{
                    marginTop: 22, display: "flex", flexWrap: "wrap", gap: 8,
                  }}>
                    {scene.tags.map(t => (
                      <span key={t} className="mono" style={{
                        border: "1px solid var(--gold-3)",
                        color: "var(--gold-3)",
                        padding: "4px 10px",
                        fontSize: 9, letterSpacing: 2,
                      }}>{t}</span>
                    ))}
                  </div>
                  <div className="italic" style={{
                    marginTop: 22, fontSize: 15, color: "var(--ink-60)",
                    paddingLeft: 14, borderLeft: "2px solid var(--red)",
                    maxWidth: 520,
                  }}>{scene.note}</div>
                </div>
              </div>
            );
          })()}

          {/* Four smaller scene tiles */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 36,
          }}>
            {[
              {
                kicker: "NO. 02 · HAIR",
                zh: "髮餅",
                en: "Hair Cake",
                subtitle: "洗髮皂 · for the head",
                tagline: "The morning bar — for hair that smells of rice water and rest.",
                body: "Fermented rice water, camellia oil, and shikakai — a long recipe from the island's grandmothers, pressed into a cake that lasts roughly 60 washes. Rinse with a splash of cool water; finish with a rice-vinegar tea if your hair is long.",
                tags: ["camellia · shikakai", "rice water ferment", "~60 washes", "90 g cake"],
                note: "ritual — use on the morning of a long walk; the scent carries for a day.",
                tone: "warm", flower: "chrysanthemum",
              },
              {
                kicker: "NO. 03 · FACE",
                zh: "洗面皂",
                en: "Face Bar",
                subtitle: "洗臉用 · for the face",
                tagline: "For the 10-second pause before mirror and morning.",
                body: "Goat-milk and honey base with a whisper of ground azuki. A small bar — sized for one cupped palm — built around gentleness. No fragrance, no essential oils near the eyes. Works the same under eye makeup as it does after a long cry.",
                tags: ["goat milk · honey", "azuki flour", "fragrance-free", "60 g small bar"],
                note: "ritual — wet your hands first, not the bar. Two slow circles between the palms, then the face.",
                tone: "cool", flower: "pine",
              },
              {
                kicker: "NO. 04 · BODY",
                zh: "沐浴皂",
                en: "Bathing Bar",
                subtitle: "身體沐浴 · for the bath",
                tagline: "For the long shower on a cold Taipei evening.",
                body: "Cold-pressed olive and sweet-almond oil, cured long enough that the lather is slow and cream-thick. Generous 120g — two palms' worth — scented only with yuzu peel from Pingtung farms, pressed in December for the new year.",
                tags: ["olive · sweet almond", "yuzu peel", "creamy lather", "120 g bar"],
                note: "ritual — draw a hot bath; the bar floats. Keep it on a cedar rack so it dries between uses.",
                tone: "deep", flower: "rose",
              },
              {
                kicker: "NO. 05 · ATHLETE",
                zh: "運動皂",
                en: "Athlete's Bar",
                subtitle: "運動後全身皂 · after the ride",
                tagline: "Built for the 40km ride, the 10km run, the 5am pool.",
                body: "Activated charcoal and bentonite clay draw out the day's sweat; peppermint and eucalyptus lift sore calves and shoulders. Firmer press, longer cure — it survives a gym-bag shuttle and outlasts its bottle-shampoo cousins by a factor of three.",
                tags: ["charcoal · bentonite", "peppermint · eucalyptus", "gym-bag tough", "110 g bar"],
                note: "ritual — wrap it in linen, toss it in the pannier bag. It dries itself between workouts.",
                tone: "cool", flower: "mugwort",
              },
            ].map((s, i) => (
              <div key={i} style={{
                display: "grid",
                gridTemplateColumns: "1fr 1.2fr",
                gap: 24,
                padding: 24,
                background: "var(--paper)",
                border: "1px solid var(--ink-15)",
                position: "relative",
              }}>
                <div style={{ position: "relative" }}>
                  <IllSoap
                    label={`${s.en} · ${s.zh}`}
                    tone={s.tone}
                    flower={s.flower}
                    ratio="4/5"
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div className="mono" style={{ color: "var(--red)", fontSize: 10 }}>{s.kicker}</div>
                  <div className="tc" style={{
                    fontSize: 32, fontWeight: 500, letterSpacing: 6,
                    marginTop: 6, color: "var(--sumi)", lineHeight: 1,
                  }}>{s.zh}</div>
                  <div className="italic" style={{
                    marginTop: 2, fontSize: 16, color: "var(--gold-3)",
                  }}>{s.en} · <span style={{ fontStyle: "normal" }} className="mono">{s.subtitle.split(" · ")[1]}</span></div>
                  <div className="italic" style={{
                    marginTop: 12, fontSize: 17, lineHeight: 1.35,
                    color: "var(--gold-3)",
                  }}>{s.tagline}</div>
                  <div style={{
                    marginTop: 12, fontSize: 14.5, lineHeight: 1.6,
                    color: "var(--sumi)",
                  }}>{s.body}</div>
                  <div style={{
                    marginTop: "auto", paddingTop: 14,
                    display: "flex", flexWrap: "wrap", gap: 6,
                  }}>
                    {s.tags.map(t => (
                      <span key={t} className="mono" style={{
                        border: "1px solid var(--ink-15)",
                        color: "var(--gold-3)",
                        padding: "3px 8px",
                        fontSize: 9, letterSpacing: 1.5,
                      }}>{t}</span>
                    ))}
                  </div>
                  <div className="italic" style={{
                    marginTop: 12, fontSize: 13, color: "var(--ink-60)",
                    paddingLeft: 10, borderLeft: "2px solid var(--red)",
                    lineHeight: 1.4,
                  }}>{s.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

window.About = About;
