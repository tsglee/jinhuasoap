// Legal pages — Privacy, Returns, Terms. Brand-voiced, not lawyer-voiced.
import { useEffect } from 'react';

const PAGES = {
  privacy: {
    kicker: '法律 · 隱私',
    title: '隱私權聲明',
    subtitle: '我們如何處理你交給我們的資訊',
    sections: [
      {
        h: '我們收集什麼',
        p: [
          '當你向本舍下訂一筆訂單時，我們會收集：姓名（買家、收件人若不同則一併）、電子郵件、電話、配送地址或超商店號，以及你在留言欄寫下的話。',
          '當你造訪這個網站時，Cloudflare 會記錄基本的連線資訊（IP、使用者代理、時間）以作安全防護之用 ── 我們不使用第三方分析工具（Google Analytics、Facebook Pixel、Hotjar 都沒有）。',
        ],
      },
      {
        h: '為什麼收集',
        p: [
          '為了完成訂單 ── 把皂包好、寫地址、交給物流 ── 我們需要這些資訊。留言欄的內容會一併進入我們的信箱，讓我們知道你偏好什麼或要注意什麼。',
        ],
      },
      {
        h: '誰會看到',
        p: [
          '本舍只有我們兩個人（一對夫妻）會看到完整訂單資訊。除此之外有三個外部服務：',
          '· Resend ── 把訂單通知從網站寄到我們信箱的郵件服務商。',
          '· Cloudflare ── 網站代管與 DNS 服務商。',
          '· Google Fonts ── 字型 CDN（只會載到匿名的字型檔請求）。',
          '配送時我們會把姓名、地址、電話給物流商（黑貓或統一/全家超商系統）。',
        ],
      },
      {
        h: '存多久',
        p: [
          '訂單資料在我們信箱保存至少六年（稅法與帳務需求）。若你希望我們刪除某一筆早期訂單，來信告知即可。',
        ],
      },
      {
        h: '你的權利',
        p: [
          '你可以隨時來信 hi@jinhuasoap.com，請我們：告知我們存了你哪些資料、更正錯誤、或在法律允許的範圍內刪除。',
        ],
      },
      {
        h: 'Cookies',
        p: [
          '我們只在你的瀏覽器存一個 localStorage 項目，記住你看到哪一頁分頁（購物籃、本舍、十二花、製皂）。這個值待在你的瀏覽器、伺服器拿不到、也跟身分無關。',
        ],
      },
    ],
    note: '這頁用人話寫的。若對條款有疑問，來信給我們就好。',
  },
  returns: {
    kicker: '法律 · 退換',
    title: '退換貨辦法',
    subtitle: '消費者保護法 · 七日鑑賞期',
    sections: [
      {
        h: '七日鑑賞期',
        p: [
          '依照《消費者保護法》第十九條，你收到商品後有七天的鑑賞期（非試用期）── 這段期間內可以無條件退貨。',
          '鑑賞期從你收到包裹的翌日起算。',
        ],
      },
      {
        h: '哪些情況可以退',
        p: [
          '· 未拆封、外觀完好的皂 ── 直接退。',
          '· 外包裝已拆但皂本身未動用 ── 可退，只是因為紅蠟與楮紙是一次性封緘，我們會以八折價接收。',
          '· 已開始使用 ── 這種情況下依衛福部規範，皂類屬「個人衛生用品」，一旦使用不再退換；但若皂有瑕疵（見下一條），仍可處理。',
        ],
      },
      {
        h: '瑕疵品',
        p: [
          '若收到的皂有運送造成的破損、生產瑕疵（如裂痕、脫鹼、異味）、或寄錯款式，請在收件後三日內來信，附上照片。我們會先與你確認，然後免費補寄或全額退款，運費歸我們。',
        ],
      },
      {
        h: '退貨流程',
        p: [
          '1. 來信 hi@jinhuasoap.com，主旨寫「退貨」加上訂單編號。',
          '2. 我們回信給你退貨地址。',
          '3. 你把商品寄回（非瑕疵品的退貨運費由買家負擔）。',
          '4. 我們收到後三個工作日內確認並退款。',
        ],
      },
      {
        h: '退款方式',
        p: [
          '退款循原付款路徑退回 ── 轉帳付款退到原帳戶、超商付款退到你指定的帳戶。超商退款會扣除轉帳手續費（約 15 元）。',
        ],
      },
      {
        h: '無法退換的情況',
        p: [
          '· 禮盒（客製手書卡片後）。',
          '· 已使用之皂（衛生考量）。',
          '· 超過七日鑑賞期之無瑕疵品。',
        ],
      },
    ],
    note: '我們是小舍、只有兩個人，處理會比大電商慢一點（但我們會回信）。',
  },
  terms: {
    kicker: '法律 · 條款',
    title: '服務條款',
    subtitle: '購買、定價、智財、免責',
    sections: [
      {
        h: '購買流程',
        p: [
          '1. 你在網站加入購物籃、填寫訂單表單、按送出。',
          '2. 訂單會進我們信箱。本舍不設即時付款 ── 我們會在 24 小時內回信，提供匯款或超商代收資訊。',
          '3. 收到你的付款確認後，我們開始準備包裹；若遇週末或連假可能順延一日。',
          '4. 出貨後會來信提供物流單號。',
        ],
      },
      {
        h: '定價與庫存',
        p: [
          '網站顯示的價格以新台幣（NTD）計算，含稅。',
          '手作皂庫存以「批次」為單位 ── 某款可能在熟成中暫時無法出貨，頁面會標示「慢製中」。我們會儘快通知預計可出貨日。',
          '我們保留因明顯標價錯誤（例如 NT$38 應為 NT$380）取消訂單的權利；遇到這種狀況會主動來信說明。',
        ],
      },
      {
        h: '智慧財產',
        p: [
          '本網站所有文字、攝影、插畫、配方、品牌標誌均屬金花樓所有。歡迎分享連結、引用短段落；若要轉載全文或商業使用，請來信詢問。',
          '「金花樓」品牌名與金花花卉紋樣保留權利。',
        ],
      },
      {
        h: '免責',
        p: [
          '我們的皂依台灣法規歸類為清潔用品，這頁不出現任何療效宣稱。若你對某種成分過敏（例如堅果油、蜂蜜、針葉精油），請先看商品頁的「過敏原」欄位。',
          '每一批皂在正式出貨前都會由我們親自試用 ── 但肌膚狀況因人而異，若使用後有不適請立即停止並來信告知。',
          '若你有嚴重的皮膚疾病或正在治療中，建議先諮詢醫師。',
        ],
      },
      {
        h: '爭議處理',
        p: [
          '若有爭議，請先來信 hi@jinhuasoap.com ── 我們會在三個工作日內回覆。絕大多數問題都能直接處理掉。',
          '若走到正式爭議階段，以中華民國法律為準據法，臺灣臺北地方法院為第一審管轄法院。',
        ],
      },
      {
        h: '條款變更',
        p: [
          '條款若有變更，會在本頁更新並註明修訂日；對已下訂單的條件不受影響。',
        ],
      },
    ],
    note: '最後一次更新：2026-04-22。',
  },
};

export function Legal({ page, navigate }) {
  const data = PAGES[page];

  useEffect(() => {
    if (data) document.title = `${data.title} · 金花樓`;
  }, [data]);

  if (!data) {
    return (
      <div
        style={{
          maxWidth: 720,
          margin: '0 auto',
          padding: '120px 44px',
          textAlign: 'center',
        }}
      >
        <div className="mono" style={{ color: 'var(--red)' }}>
          404
        </div>
        <h1 className="tc" style={{ fontSize: 40, letterSpacing: 8, margin: '20px 0' }}>
          此頁未尋著
        </h1>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <section
        className="gf-pad-md gf-tight-md"
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: '80px 44px 40px',
          textAlign: 'center',
        }}
      >
        <div className="mono" style={{ color: 'var(--red)' }}>
          {data.kicker}
        </div>
        <h1
          className="tc gf-h1-md"
          style={{
            fontSize: 56,
            fontWeight: 500,
            letterSpacing: 12,
            margin: '16px 0 10px',
            color: 'var(--sumi)',
          }}
        >
          {data.title}
        </h1>
        <div
          className="tc"
          style={{ fontSize: 16, color: 'var(--gold-3)', letterSpacing: 4 }}
        >
          {data.subtitle}
        </div>
      </section>

      <article
        className="gf-pad-md"
        style={{
          maxWidth: 720,
          margin: '0 auto',
          padding: '20px 44px 60px',
        }}
      >
        {data.sections.map((s, i) => (
          <section key={i} style={{ marginBottom: 40 }}>
            <h2
              className="tc"
              style={{
                fontSize: 22,
                fontWeight: 500,
                letterSpacing: 4,
                margin: '0 0 14px',
                color: 'var(--sumi)',
                paddingLeft: 12,
                borderLeft: '3px solid var(--red)',
              }}
            >
              {s.h}
            </h2>
            {s.p.map((para, j) => (
              <p
                key={j}
                className="tc"
                style={{
                  fontSize: 15.5,
                  lineHeight: 1.9,
                  letterSpacing: 1,
                  color: 'var(--sumi)',
                  margin: '0 0 12px',
                }}
              >
                {para}
              </p>
            ))}
          </section>
        ))}

        <div
          className="edu-block"
          style={{ marginTop: 50 }}
        >
          <span className="edu-label">附記</span>
          <p className="edu-note">{data.note}</p>
        </div>

        <div
          style={{
            marginTop: 40,
            display: 'flex',
            gap: 22,
            flexWrap: 'wrap',
            fontSize: 13,
            letterSpacing: 2,
          }}
        >
          {[
            ['privacy', '隱私權'],
            ['returns', '退換貨'],
            ['terms', '服務條款'],
          ]
            .filter(([k]) => k !== page)
            .map(([k, label]) => (
              <a
                key={k}
                href={`/legal/${k}`}
                onClick={(e) => {
                  if (e.metaKey || e.ctrlKey || e.shiftKey) return;
                  e.preventDefault();
                  navigate(`/legal/${k}`);
                }}
                className="tc"
                style={{
                  color: 'var(--sumi)',
                  borderBottom: '1px solid var(--gold-3)',
                  paddingBottom: 2,
                }}
              >
                {label}
              </a>
            ))}
        </div>
      </article>
    </div>
  );
}
