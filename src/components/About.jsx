// About tab — brand story, heritage, philosophy, founders
import { Divider } from './GoldenFlower.jsx';
import { IllSoap } from './Illustrations.jsx';

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
          src="/images/landingmedia/Chinese_Ink_Wash_Painting_Animation.mp4"
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
              body: '每一塊皂的切、印、包，都出自我們二人的手 ── 一對夫妻，沒有別人。不假機器、不外包代工。',
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
          <div className="edu-block" style={{ maxWidth: 620 }}>
            <span className="edu-label">設計之念</span>
            <p className="edu-note">
              一方皂的設計，我們只信一件事：油脂是載體，脂肪酸才是本質。
              每一張配方都先過「五力」自檢 ── 清潔、泡沫、溫潤、滑順、硬度 ──
              五樣顧到，才算是一塊對得起肌膚的皂。花材是風韻，不是救方：
              一撮桂花、一勺艾草，為的是讓皂更耐人尋味，不是用來補一張不夠好的配方。
            </p>
          </div>
        </div>
      </section>

      {/* Crew — the two people behind the soap */}
      <section
        className="gf-pad-md gf-tight-md"
        style={{
          maxWidth: 1180,
          margin: '0 auto',
          padding: '80px 44px',
          borderTop: '1px solid var(--ink-15)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 50 }}>
          <div className="mono" style={{ color: 'var(--red)' }}>
            工坊的人
          </div>
          <h2
            className="tc gf-h2-md"
            style={{
              fontSize: 56,
              fontWeight: 400,
              letterSpacing: 14,
              margin: '14px 0 8px',
              color: 'var(--sumi)',
            }}
          >
            我們二人
          </h2>
          <div
            className="tc"
            style={{ fontSize: 18, color: 'var(--gold-3)', letterSpacing: 6 }}
          >
            一對夫妻 · 沒有別的員工
          </div>
          <div
            className="tc"
            style={{
              maxWidth: 520,
              margin: '22px auto 0',
              fontSize: 15,
              lineHeight: 1.85,
              color: 'var(--ink-60)',
              letterSpacing: 1,
            }}
          >
            金花樓只有兩個人 ── 一位守著配方與鍋前，一位守著文字與頁面。
            這一頁，是我們願意讓你知道的彼此。
          </div>
        </div>

        <div
          className="gf-stack-md"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 40,
          }}
        >
          {[
            {
              roleMono: '配方 · 生產',
              roleZh: '研發的那位',
              body: '配方、手壓、切皂、熟成的守候 ── 都是她。廚房裡的那口銅鍋、雪松架上的四十二日，都歸她管。第一批十二塊艾草皂，也是她做的。',
              edu: '她的口頭禪是：「自己的阿嬤皮膚不能用的，就不做。」五力的自檢表壓在鍋邊，每一張新配方先過她那一關。',
            },
            {
              roleMono: '網頁 · 行銷',
              roleZh: '寫字的那位',
              body: '這一頁的字是我寫的 ── 但皂不是我做的。我的工作是把她的慢工，用不吵的方式說給更多人聽；網站、文案、寄件回信，也都在我這一端。',
              edu: '我相信一個品牌應該像一封信 ── 寫得慢、讀得久、不催促。這是我這一端的底線：不加上「amazing / premium / luxurious」這類詞彙。',
            },
          ].map((r, i) => (
            <div
              key={i}
              style={{
                padding: 32,
                background: 'var(--paper)',
                border: '1px solid var(--ink-15)',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: -12,
                  left: 24,
                  background: 'var(--sumi)',
                  color: 'var(--gold-2)',
                  padding: '6px 12px',
                  fontFamily: '"DM Mono", monospace',
                  fontSize: 10,
                  letterSpacing: 2,
                }}
              >
                {r.roleMono}
              </div>
              <div
                className="tc"
                style={{
                  fontSize: 32,
                  fontWeight: 500,
                  letterSpacing: 6,
                  color: 'var(--sumi)',
                  marginTop: 8,
                }}
              >
                {r.roleZh}
              </div>
              <p
                className="tc"
                style={{
                  marginTop: 18,
                  fontSize: 15.5,
                  lineHeight: 1.9,
                  letterSpacing: 1,
                  color: 'var(--sumi)',
                }}
              >
                {r.body}
              </p>
              <div className="edu-block">
                <span className="edu-label">手邊的原則</span>
                <p className="edu-note tc">{r.edu}</p>
              </div>
            </div>
          ))}
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
              edu: {
                label: '設計之念',
                body: '「一塊走天下」的設計，走的是五力中段 ── 以橄欖油為主的卡斯提亞家族，給的是「溫潤」與「滑順」。清潔力刻意收斂，才能同一塊同時走過頭皮、臉與身；燕麥乳與洋甘菊是緩衝，讓中段溫和得不容易有誰意外受傷。',
              },
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
                  <video
                    src="/images/about/oceanwithsoap.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    aria-label="一塊走天下 · 燕麥乳 · 洋甘菊"
                    style={{
                      width: '100%',
                      aspectRatio: '5/4',
                      objectFit: 'cover',
                      display: 'block',
                    }}
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
                  {scene.edu && (
                    <div className="edu-block" style={{ maxWidth: 520 }}>
                      <span className="edu-label">{scene.edu.label}</span>
                      <p className="edu-note tc">{scene.edu.body}</p>
                    </div>
                  )}
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
                edu: {
                  label: '設計之念',
                  body: '髮餅的設計有一處較真 ── pH 5–6，弱酸，貼近頭皮本來的酸鹼。另一處較真是 BTMS：陽離子的順毛鱗片成分，洗後不澀、不打結 ── 沒有它的洗髮皂，會變成「洗完澀澀的那種」，是太太做壞幾塊才學到的事。',
                },
                note: 'ritual — 走遠路的清晨用一塊，那香氣能跟著你一整天。',
                tone: 'warm',
                flower: 'chrysanthemum',
                photo: '/images/products/Gemini_Generated_Image_vxwmqbvxwmqbvxwm.png',
              },
              {
                kicker: 'NO. 03 · 面',
                zh: '洗面皂',
                subtitle: '洗臉用',
                tagline: '鏡前清晨，那短短十秒的停頓。',
                body: '羊乳與蜂蜜為底，加入磨得極細的紅豆粉。一塊小皂 ── 恰好一只掌心的大小 ── 以溫柔為尺度。不加香料，亦不加近眼的精油。妝前可用，一場久哭過後也可用。',
                tags: ['羊乳 · 蜂蜜', '紅豆粉', '無香', '60 g 小塊'],
                edu: {
                  label: '設計之念',
                  body: '洗面皂的五力刻意退 ── 清潔最淡，滑順推高，泡沫綿而不豐。羊乳與蜂蜜的油脂家族只給「溫潤」，不走脫脂；紅豆粉極細，只做一點物理輕拂。無香、無精油，是為了一場久哭後眼周也還能用。',
                },
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
                edu: {
                  label: '設計之念',
                  body: '沐浴皂走的是橄欖與甜杏仁的家族 ── 泡沫偏綿、滑順足、清潔中段。熟成走到六十日（多過日常的四十二日），硬度撐得住一整個月的日用而不酸敗。屏東柚子皮，十二月壓的那批，是為了新年浴才備的。',
                },
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
                edu: {
                  label: '設計之念',
                  body: '運動皂的清潔力往上推一檔 ── 但推的是竹炭與膨潤土的吸附，不是鹼度。汗油被拉走，皮脂膜仍在；薄荷與尤加利讓痠痛的小腿願意多站一分鐘。壓得更緊、陳得更久，為的是能扔進車包來回，不會輕易化掉。',
                },
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
                  {s.photo ? (
                    <img
                      src={s.photo}
                      alt={`${s.zh} · ${s.subtitle}`}
                      style={{
                        width: '100%',
                        aspectRatio: '4/5',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                  ) : (
                    <IllSoap label={s.zh} tone={s.tone} flower={s.flower} ratio="4/5" />
                  )}
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
                  {s.edu && (
                    <div className="edu-block">
                      <span className="edu-label">{s.edu.label}</span>
                      <p
                        className="edu-note tc"
                        style={{ fontSize: 13.5, lineHeight: 1.85 }}
                      >
                        {s.edu.body}
                      </p>
                    </div>
                  )}
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
