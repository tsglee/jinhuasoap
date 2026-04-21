// About tab — brand story, heritage, philosophy, founders
import { Divider } from './GoldenFlower.jsx';
import { IllSoap, IllWorkbench } from './Illustrations.jsx';

export function About() {
  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      {/* Hero video banner — full-bleed, autoplay muted loop */}
      <section
        className="gf-hero-video-md"
        aria-label="金花樓 · 手壓皂 · 序幕"
        style={{
          position: 'relative',
          width: '100vw',
          marginLeft: 'calc(50% - 50vw)',
          height: 'min(56vh, 560px)',
          overflow: 'hidden',
          background: 'var(--sumi)',
          borderBottom: '1px solid var(--ink-15)',
        }}
      >
        <video
          src="/images/landingmedia/Animated_Ocean_and_Cloud_Video.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label="手壓皂的動態影像"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
        {/* Soft fade to paper so the banner blends into the hero below */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 'auto 0 0 0',
            height: 120,
            background:
              'linear-gradient(to bottom, rgba(248,245,235,0) 0%, var(--paper) 100%)',
            pointerEvents: 'none',
          }}
        />
        {/* Mono caption chip — bottom-right, matches the existing site pattern */}
        <div
          className="mono"
          style={{
            position: 'absolute',
            bottom: 22,
            right: 24,
            background: 'var(--paper)',
            color: 'var(--gold-3)',
            padding: '10px 14px',
            border: '1px solid var(--ink-15)',
            fontSize: 10,
            letterSpacing: 2,
          }}
        >
          手壓皂 · 臺北艋舺 · MMXXVI
        </div>
      </section>

      {/* Hero */}
      <section
        className="gf-pad-md gf-stack-md gf-tight-md"
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '80px 44px 60px',
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr',
          gap: 80,
          alignItems: 'center',
        }}
      >
        <div>
          <div className="mono" style={{ color: 'var(--red)', marginBottom: 24 }}>
            本舍小記
          </div>
          <h1
            className="tc gf-h1-md"
            style={{
              fontSize: 72,
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: 4,
              margin: 0,
              color: 'var(--sumi)',
            }}
          >
            山中
            <br />
            一盞
            <br />
            <span style={{ color: 'var(--red)' }}>金花。</span>
          </h1>
          <div
            className="tc"
            style={{
              marginTop: 28,
              fontSize: 22,
              lineHeight: 1.6,
              letterSpacing: 4,
              color: 'var(--gold-3)',
              maxWidth: 480,
            }}
          >
            一方小皂 · 洗塵心 · 照夜夢。
          </div>
          <div
            className="tc"
            style={{
              marginTop: 32,
              maxWidth: 480,
              fontSize: 17,
              lineHeight: 1.9,
              letterSpacing: 1,
              color: 'var(--sumi)',
            }}
          >
            金花樓是臺北艋舺的一間小小皂舍。我們以島上的油、花材、山泉水，
            一方一方地手壓肥皂 ── 一次一個配方、一批四十二日，慢慢陳化，
            直到皂心乾實，才讓它走入別人的日常。
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              inset: -20,
              border: '1px solid var(--gold-3)',
              opacity: 0.35,
            }}
          />
          <img
            src="/images/about/workbench.JPG"
            alt="本舍手壓皂一批 · 金盞花與蜂巢皂塊陳列於工作檯"
            style={{
              width: '100%',
              aspectRatio: '3/4',
              objectFit: 'cover',
              display: 'block',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: -20,
              right: -20,
              background: 'var(--paper)',
              padding: '14px 18px',
              border: '1px solid var(--ink-15)',
              fontFamily: '"DM Mono", monospace',
              fontSize: 10,
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: 'var(--gold-3)',
            }}
          >
            臺北 · 艋舺 · MMXXVI
          </div>
        </div>
      </section>

      {/* Three pillars */}
      <section
        style={{
          borderTop: '1px solid var(--ink-15)',
          borderBottom: '1px solid var(--ink-15)',
          background: 'rgba(244,236,215,0.5)',
        }}
      >
        <div
          className="gf-pad-md gf-stack-md"
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '60px 44px',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 60,
          }}
        >
          {[
            {
              zh: '純手工',
              body: '每一塊皂 ── 切、印、包 ── 都由工坊裡四個人親手完成。從不假機器之力。',
            },
            {
              zh: '天然材料',
              body: '冷壓油脂、石磨花材、陽明山泉水。不加棕櫚油、不加香精、不加色粉。',
            },
            {
              zh: '慢製',
              body: '我們不趕工。每一塊皂在雪松架上陳化四十二日，才送到架上 ── 這樣它才耐用，才溫柔。',
            },
          ].map((p, i) => (
            <div key={i}>
              <div
                className="tc"
                style={{
                  fontSize: 48,
                  fontWeight: 300,
                  letterSpacing: 8,
                  color: 'var(--red)',
                }}
              >
                {p.zh}
              </div>
              <Divider />
              <div
                className="tc"
                style={{
                  marginTop: 16,
                  fontSize: 16,
                  lineHeight: 1.85,
                  letterSpacing: 1,
                  color: 'var(--sumi)',
                  maxWidth: 300,
                }}
              >
                {p.body}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Manifesto — vertical chinese + horizontal english */}
      <section
        className="gf-pad-md gf-stack-md gf-tight-md"
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '90px 44px',
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          gap: 80,
        }}
      >
        <div
          className="gf-vertical-md"
          style={{
            writingMode: 'vertical-rl',
            fontFamily: '"Noto Serif TC", serif',
            fontSize: 30,
            lineHeight: 2.4,
            letterSpacing: 10,
            color: 'var(--sumi)',
            height: 460,
          }}
        >
          以天然之物 · 慢製一方肥皂 · 洗塵心
          <span style={{ color: 'var(--red)' }}> · 照夜夢</span>
        </div>
        <div>
          <div className="mono" style={{ color: 'var(--gold-3)', marginBottom: 20 }}>
            本舍之約
          </div>
          <div
            className="tc"
            style={{
              fontSize: 28,
              lineHeight: 1.6,
              letterSpacing: 3,
              color: 'var(--sumi)',
              maxWidth: 620,
            }}
          >
            我們相信，一方肥皂也能是日常裡的小儀式 ── 清晨的第一盆涼水，夜裡的最後一盆溫水。
          </div>
          <div
            className="gf-stack-md"
            style={{
              marginTop: 40,
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 40,
              fontSize: 16,
              lineHeight: 1.9,
              letterSpacing: 1,
              color: 'var(--sumi)',
            }}
          >
            <p className="tc">
              本舍起於艋舺一間小廚房，一個配方、一台橄欖油壓。第一批 ──
              十二塊艾草皂 ── 一個下午就被街坊收光。從那以後，每個禮拜四，
              我們都壓一批新的。
            </p>
            <p className="tc">
              我們的規矩很簡單：自己的阿嬤皮膚不能用的，就不放進皂裡。
              這樣一來，大工廠做的大半東西都進不了我們的皂 ──
              我們也得以把這一件小事，慢慢地、好好地做。
            </p>
          </div>
        </div>
      </section>

      {/* Water interlude — echoes the 「涼水 / 溫水」 line in the manifesto */}
      <section
        className="gf-hero-video-md"
        aria-label="一盞涼水 · 一盞溫水"
        style={{
          position: 'relative',
          width: '100vw',
          marginLeft: 'calc(50% - 50vw)',
          height: 'min(48vh, 480px)',
          overflow: 'hidden',
          background: 'var(--sumi)',
          borderTop: '1px solid var(--ink-15)',
          borderBottom: '1px solid var(--ink-15)',
        }}
      >
        <video
          src="/images/about/water.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label="山泉水流動的影像"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
        <div
          className="mono"
          style={{
            position: 'absolute',
            bottom: 22,
            right: 24,
            background: 'var(--paper)',
            color: 'var(--gold-3)',
            padding: '10px 14px',
            border: '1px solid var(--ink-15)',
            fontSize: 10,
            letterSpacing: 2,
          }}
        >
          一盞涼水 · 一盞溫水
        </div>
      </section>

      {/* Five bars, five rituals */}
      <section
        style={{
          background: 'var(--paper-3)',
          borderTop: '1px solid var(--ink-15)',
        }}
      >
        <div
          className="gf-pad-md"
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '80px 44px 90px',
          }}
        >
          <div
            className="mono"
            style={{ color: 'var(--red)', textAlign: 'center', marginBottom: 8 }}
          >
            五皂五境
          </div>
          <h2
            className="tc gf-h2-md"
            style={{
              textAlign: 'center',
              fontSize: 44,
              fontWeight: 400,
              letterSpacing: 10,
              margin: '0 0 14px',
              color: 'var(--sumi)',
            }}
          >
            一皂一境
          </h2>
          <div
            className="tc"
            style={{
              textAlign: 'center',
              fontSize: 22,
              letterSpacing: 4,
              color: 'var(--gold-3)',
              maxWidth: 640,
              margin: '0 auto 56px',
              lineHeight: 1.7,
            }}
          >
            一方皂，一種日常 ── 從清晨的第一盆水，
            <br />
            到夜裡長路歸來的那一瓢。每一塊皂，都是為了那一刻。
          </div>

          {/* Hero scene — the all-in-one bar (largest tile) */}
          {(() => {
            const scene = {
              zh: '一塊走天下',
              subtitle: '髮 · 身 · 面 一塊搞定',
              tagline: '頂至踵，一塊即可。',
              palette: { tone: 'warm', flower: 'rose' },
              kicker: 'NO. 01 · 全能',
              body: '為旅人、極簡者、也為那間小浴室而壓。卡斯提亞皂基配上燕麥乳與洋甘菊 ── 溫和得能洗頭髮，也足以洗去一日的疲。硬水、熱泉水一樣能起泡，洗完不留皂垢。',
              tags: [
                '卡斯提亞皂基',
                '燕麥乳 · 洋甘菊',
                'pH 8.9',
                '髮 · 面 · 身',
                '105 g',
              ],
              note: 'ritual — 打包三天的行囊，只帶這一塊。旅店一進門拆開雪松紙，整套沐浴都進了你的口袋。',
            };
            return (
              <div
                className="gf-stack-md"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.05fr 1fr',
                  gap: 60,
                  alignItems: 'center',
                  padding: '44px 0',
                  borderTop: '1px solid var(--ink-15)',
                  borderBottom: '1px solid var(--ink-15)',
                  marginBottom: 60,
                }}
              >
                <div style={{ position: 'relative' }}>
                  <div
                    style={{
                      position: 'absolute',
                      inset: -16,
                      border: '1px solid var(--gold-3)',
                      opacity: 0.3,
                    }}
                  />
                  <IllSoap
                    label="一塊走天下 · 燕麥乳 · 洋甘菊"
                    tone={scene.palette.tone}
                    flower={scene.palette.flower}
                    ratio="5/4"
                  />
                  <div
                    className="mono"
                    style={{
                      position: 'absolute',
                      bottom: -16,
                      left: -16,
                      background: 'var(--sumi)',
                      color: 'var(--gold-2)',
                      padding: '10px 14px',
                      fontSize: 10,
                      letterSpacing: 2,
                    }}
                  >
                    主皂 · {scene.kicker}
                  </div>
                </div>
                <div>
                  <div className="mono" style={{ color: 'var(--red)' }}>
                    {scene.kicker}
                  </div>
                  <h3
                    className="tc"
                    style={{
                      fontSize: 52,
                      fontWeight: 400,
                      letterSpacing: 6,
                      margin: '10px 0 6px',
                      color: 'var(--sumi)',
                    }}
                  >
                    {scene.zh}
                  </h3>
                  <div
                    className="tc"
                    style={{
                      fontSize: 18,
                      letterSpacing: 6,
                      color: 'var(--gold-3)',
                    }}
                  >
                    {scene.subtitle}
                  </div>
                  <div
                    className="tc"
                    style={{
                      marginTop: 18,
                      fontSize: 24,
                      lineHeight: 1.45,
                      letterSpacing: 3,
                      color: 'var(--gold-3)',
                    }}
                  >
                    {scene.tagline}
                  </div>
                  <Divider />
                  <p
                    className="tc"
                    style={{
                      marginTop: 18,
                      fontSize: 17,
                      lineHeight: 1.9,
                      letterSpacing: 1,
                      color: 'var(--sumi)',
                      maxWidth: 520,
                    }}
                  >
                    {scene.body}
                  </p>
                  <div
                    style={{
                      marginTop: 22,
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 8,
                    }}
                  >
                    {scene.tags.map((t) => (
                      <span
                        key={t}
                        className="mono"
                        style={{
                          border: '1px solid var(--gold-3)',
                          color: 'var(--gold-3)',
                          padding: '4px 10px',
                          fontSize: 9,
                          letterSpacing: 2,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div
                    className="tc"
                    style={{
                      marginTop: 22,
                      fontSize: 15,
                      lineHeight: 1.7,
                      letterSpacing: 1,
                      color: 'var(--ink-60)',
                      paddingLeft: 14,
                      borderLeft: '2px solid var(--red)',
                      maxWidth: 520,
                    }}
                  >
                    {scene.note}
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Four smaller scene tiles */}
          <div
            className="gf-stack-md"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 36,
            }}
          >
            {[
              {
                kicker: 'NO. 02 · 髮',
                zh: '髮餅',
                subtitle: '洗髮皂',
                tagline: '清晨第一塊，洗出淡淡米水與歇息的香。',
                body: '發酵米水、茶花油、無患子 ── 一條長長的配方，從島上的阿嬤手裡傳下來，壓成一塊大約能洗六十次的皂餅。冷水一瓢沖淨；若頭髮長，再以米醋茶收尾。',
                tags: ['茶花油 · 無患子', '發酵米水', '約 60 次洗髮', '90 g 皂餅'],
                note: 'ritual — 走遠路的清晨用一塊，那香氣能跟著你一整天。',
                tone: 'warm',
                flower: 'chrysanthemum',
              },
              {
                kicker: 'NO. 03 · 面',
                zh: '洗面皂',
                subtitle: '洗臉用',
                tagline: '鏡前清晨，那短短十秒的停頓。',
                body: '羊乳與蜂蜜為底，加入磨得極細的紅豆粉。一塊小皂 ── 恰好一只掌心的大小 ── 以溫柔為尺度。不加香料，亦不加近眼的精油。妝前可用，一場久哭過後也可用。',
                tags: ['羊乳 · 蜂蜜', '紅豆粉', '無香', '60 g 小塊'],
                note: 'ritual — 先濕手、再沾皂。掌間慢慢繞兩圈，才輕輕帶到臉上。',
                tone: 'cool',
                flower: 'pine',
              },
              {
                kicker: 'NO. 04 · 身',
                zh: '沐浴皂',
                subtitle: '身體沐浴',
                tagline: '臺北微涼的夜裡，那一場長長的熱水澡。',
                body: '冷壓橄欖油與甜杏仁油，陳化得夠久，泡沫細而綿，如乳。120 g 的份量，兩掌可握。只以屏東柚子皮為香 ── 十二月壓的那批，為新年而備。',
                tags: ['橄欖 · 甜杏仁', '屏東柚子皮', '綿密泡沫', '120 g'],
                note: 'ritual — 放一缸熱水，皂會浮上來。洗完放在雪松架上，讓它好好乾燥。',
                tone: 'deep',
                flower: 'rose',
              },
              {
                kicker: 'NO. 05 · 動',
                zh: '運動皂',
                subtitle: '運動後全身皂',
                tagline: '為 40 公里的騎行、10 公里的路跑、清晨五點的泳池而做。',
                body: '竹炭與膨潤土拉走一日的汗；薄荷與尤加利喚醒痠了的小腿與肩。壓得更緊、陳化得更久 ── 能在運動袋裡與你一起來回，耐用得比瓶裝沐浴乳多上三倍。',
                tags: ['竹炭 · 膨潤土', '薄荷 · 尤加利', '耐裝耐帶', '110 g'],
                note: 'ritual — 以麻布包好，扔進自行車側包。它會在兩次訓練之間，自己風乾。',
                tone: 'cool',
                flower: 'mugwort',
              },
            ].map((s, i) => (
              <div
                key={i}
                className="gf-stack-md"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1.2fr',
                  gap: 24,
                  padding: 24,
                  background: 'var(--paper)',
                  border: '1px solid var(--ink-15)',
                  position: 'relative',
                }}
              >
                <div style={{ position: 'relative' }}>
                  <IllSoap label={s.zh} tone={s.tone} flower={s.flower} ratio="4/5" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div className="mono" style={{ color: 'var(--red)', fontSize: 10 }}>
                    {s.kicker}
                  </div>
                  <div
                    className="tc"
                    style={{
                      fontSize: 32,
                      fontWeight: 500,
                      letterSpacing: 6,
                      marginTop: 6,
                      color: 'var(--sumi)',
                      lineHeight: 1,
                    }}
                  >
                    {s.zh}
                  </div>
                  <div
                    className="tc"
                    style={{
                      marginTop: 6,
                      fontSize: 14,
                      letterSpacing: 4,
                      color: 'var(--gold-3)',
                    }}
                  >
                    {s.subtitle}
                  </div>
                  <div
                    className="tc"
                    style={{
                      marginTop: 12,
                      fontSize: 17,
                      lineHeight: 1.6,
                      letterSpacing: 2,
                      color: 'var(--gold-3)',
                    }}
                  >
                    {s.tagline}
                  </div>
                  <div
                    className="tc"
                    style={{
                      marginTop: 12,
                      fontSize: 14.5,
                      lineHeight: 1.85,
                      letterSpacing: 1,
                      color: 'var(--sumi)',
                    }}
                  >
                    {s.body}
                  </div>
                  <div
                    style={{
                      marginTop: 'auto',
                      paddingTop: 14,
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 6,
                    }}
                  >
                    {s.tags.map((t) => (
                      <span
                        key={t}
                        className="mono"
                        style={{
                          border: '1px solid var(--ink-15)',
                          color: 'var(--gold-3)',
                          padding: '3px 8px',
                          fontSize: 9,
                          letterSpacing: 1.5,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div
                    className="tc"
                    style={{
                      marginTop: 12,
                      fontSize: 13,
                      lineHeight: 1.7,
                      letterSpacing: 1,
                      color: 'var(--ink-60)',
                      paddingLeft: 10,
                      borderLeft: '2px solid var(--red)',
                    }}
                  >
                    {s.note}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
