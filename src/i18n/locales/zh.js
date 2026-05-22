// Default locale (zh-Hant) ── 既有中文文案的 key 對應。
// 加新 key 時兩個 locale 都要補。
export default {
  nav: {
    tabs: {
      about: '本舍',
      products: '十二花',
      process: '製皂',
      shop: '購皂',
      journal: '本舍小記',
    },
    cart: '購物籃',
    orderLookup: '查詢訂單',
    languageToggle: 'EN',
  },
  banner: {
    full: '滿 NT$1,000 享 9 折 · 本島滿 NT$500 免運',
    mobile: '本島滿 NT$500 免運',
  },
  buttons: {
    addToCart: '加入購物籃',
    submitOrder: '送出訂購',
    backHome: '回首頁',
    continueShopping: '繼續逛十二花',
    query: '查詢',
    readMore: '繼續閱讀 →',
    contactLine: '加入好友洽詢',
    backToJournal: '回日誌',
  },
  pages: {
    products: {
      kicker: '十二花 · 全系列',
      title: '本舍手工皂',
      subtitle: '一月一方 · 一皂一花',
      description:
        '12 款配方分作四個系列 ── 花神守護、花韻時節、花露淨髮餅、全能日常。每一塊皆冷製手壓、熟成四十二日，以未漂紙包裹。',
      detailLabels: {
        skinType: '適合膚質',
        coreIngredients: '核心成分',
        oilProfile: '原料特性',
        washFeel: '洗感感受',
        batchDate: '本批熟成',
      },
    },
    shop: {
      kicker: '線上購皂',
      title: '購皂',
      description: '收到訂單後三個工作天內寄出 · 支援 7-11 與全家店到店付款',
      catalog: {
        kicker: '選皂 · choose',
        title: '十二款 · 一塊一塊挑',
        subtitle: '想看完整風土與配方，請至 02 十二花',
      },
      testimonials: {
        kicker: '客人怎麼說',
        title: '真實心得',
      },
      custom: {
        kicker: '客製合作',
        title: '節禮 · 婚禮',
        body:
          '若您有婚禮小物、節日禮品或其他客製需求，歡迎加我們 Line 一敘 ── 一同為您構思一份合宜的皂禮。',
      },
    },
    journal: {
      kicker: '金花樓 · 本舍',
      title: '本舍小記',
      searchPlaceholder: '搜尋文章 ── 標題 / 關鍵字',
      filterAriaLabel: '按類別篩選文章',
      categoryAll: '全部',
      emptyResult: '找不到符合「{query}」的文章 ── 試試其他關鍵字、或拿掉類別篩選。',
      pinnedLabel: '編輯精選',
      backTitle: '回日誌',
    },
    order: {
      kicker: '訂單查詢 · Order Status',
      title: '查詢訂單',
      description: '訂單編號可從 email 通知裡找到，格式類似 JH-260510-MZ9M。',
      placeholder: 'JH-YYMMDD-XXXX',
      loading: '查詢中...',
      statusLabel: '目前狀態',
      logisticsLabel: '物流單號 · ',
      labels: {
        orderId: '訂單編號',
        createdAt: '下單時間',
        recipient: '收件人',
        shipMethod: '寄送方式',
        store: '取件門市',
        note: '備註',
        items: '品項',
        total: '合計',
      },
      status: {
        pending: '訂單收到、處理中',
        processing: '物流單已建、等待出貨',
      },
      errors: {
        format: '訂單編號格式為 JH-YYMMDD-XXXX，請檢查 email 上的編號',
      },
    },
    notfound: {
      kicker: '404 · 走錯了',
      title: '找不到頁面',
      body: '這條路徑可能已經搬家、或者你輸入的網址不對。從下面任一個地方重新開始 ──',
      goHome: '回首頁 · 本舍',
      goJournal: '本舍小記',
    },
  },
  footer: {
    columns: {
      shop: '購皂',
      atelier: '本舍',
      shipping: '寄送',
      legal: '法律',
    },
    items: {
      allSeries: '全系列',
      giftBox: '禮盒',
      process: '製皂之序',
      ingredients: '花材',
      journal: '本舍小記',
      taiwan: '臺灣本島',
      offshore: '離島',
      sevenEleven: '7-11 店到店',
      familyMart: '全家 店到店',
      orderQuery: '查詢訂單',
      privacy: '隱私權',
      returns: '退換貨',
      terms: '服務條款',
    },
    contact: {
      title: '聯絡 · Contact',
    },
  },
  cart: {
    title: '購物籃',
    empty: '購物籃還是空的 ── 去十二花挑一塊？',
    summary: {
      subtotal: '小計',
      shipping: '運費 · 本島',
      freeShipping: '免運',
      discount: '9 折優惠',
      total: '合計',
    },
    form: {
      title: '訂購單',
      instruction: '送出後請加我們 Line 並告知訂單編號，我們會在 24 小時內回覆付款與寄送方式。無需先付款。',
      fields: {
        name: '姓名',
        email: '電子郵件',
        phone: '手機號碼（09XX-XXX-XXX）',
        phoneError: '看起來不像台灣手機 ── 應為 09 開頭、共十碼。',
        shipMethodPlaceholder: '── 選擇寄送方式 ──',
      },
    },
    success: {
      orderIdLabel: '訂單編號 · 請保留',
      instruction: '接下來請加我們 Line（右下角的綠色按鈕）並告知這個編號，我們會在 24 小時內回覆付款與寄送方式。',
      checkStatus: '查詢訂單狀態  ▸',
    },
  },
};
