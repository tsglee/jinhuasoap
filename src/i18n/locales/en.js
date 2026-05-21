// English locale ── mirrors zh.js structure.
// Keep brand name "金花樓" untransliterated where appropriate, or use
// "Goldenflower" / "Jin Hua Lou" depending on context.
export default {
  nav: {
    tabs: {
      about: 'Atelier',
      products: 'The Twelve',
      process: 'Process',
      shop: 'Shop',
      journal: 'Journal',
    },
    cart: 'Cart',
    orderLookup: 'Order',
    languageToggle: '中',
  },
  banner: {
    full: 'NT$1,000 → 10% off · Free shipping on orders NT$500+',
    mobile: 'Free shipping on orders NT$500+',
  },
  buttons: {
    addToCart: 'Add to cart',
    submitOrder: 'Place order',
    backHome: 'Back home',
    continueShopping: 'Browse the Twelve  ▸',
    query: 'Look up',
    readMore: 'Read more →',
    contactLine: 'Add us on Line',
    backToJournal: 'Back to Journal',
  },
  pages: {
    products: {
      kicker: 'The Twelve · Full Series',
      title: 'Goldenflower Soaps',
      subtitle: 'One bar a month · One flower per bar',
      description:
        'Twelve recipes across four series ── Flower Guardians, Seasonal Blooms, Botanical Hair Bars, and All-Day Essentials. Each bar is cold-pressed by hand, cured for forty-two days, and wrapped in unbleached paper.',
      detailLabels: {
        skinType: 'For skin',
        coreIngredients: 'Core ingredients',
        oilProfile: 'Oil profile',
        washFeel: 'Wash feel',
        batchDate: 'Batch cured',
      },
    },
    shop: {
      kicker: 'Shop online',
      title: 'Shop',
      description: 'Ships within three working days · 7-11 and FamilyMart pickup supported',
      catalog: {
        kicker: 'Choose · 選皂',
        title: 'Twelve bars · Pick one at a time',
        subtitle: 'For full origin notes and formulas, see 02 The Twelve',
      },
      testimonials: {
        kicker: 'What customers say',
        title: 'In their own words',
      },
      custom: {
        kicker: 'Custom orders',
        title: 'Gifts · Weddings',
        body:
          'For wedding favors, holiday gifts, or other custom requests, reach us on Line ── we will craft a soap gift that fits the occasion.',
      },
    },
    journal: {
      kicker: 'Goldenflower · Atelier',
      title: 'Journal',
      subtitle: 'Written slowly · Read slowly',
      intro:
        'A note or two each week ── about oils, alkali, water, and ourselves. Written for ourselves first, then kept here.',
      searchPlaceholder: 'Search articles ── title / keywords',
      filterAriaLabel: 'Filter articles by category',
      categoryAll: 'All',
      emptyResult: 'No articles matching "{query}" ── try other keywords or remove the category filter.',
      pinnedLabel: 'Featured',
      backTitle: 'Back to Journal',
    },
    order: {
      kicker: 'Order Status',
      title: 'Track your order',
      description: 'Your order ID is in the confirmation email ── format like JH-260510-MZ9M.',
      placeholder: 'JH-YYMMDD-XXXX',
      loading: 'Looking up...',
      statusLabel: 'Current status',
      logisticsLabel: 'Shipment ID · ',
      labels: {
        orderId: 'Order ID',
        createdAt: 'Placed at',
        recipient: 'Recipient',
        shipMethod: 'Shipping method',
        store: 'Pickup store',
        note: 'Note',
        items: 'Items',
        total: 'Total',
      },
      status: {
        pending: 'Order received, processing',
        processing: 'Shipment created, awaiting dispatch',
      },
      errors: {
        format: 'Order ID format is JH-YYMMDD-XXXX. Please check your email.',
      },
    },
    notfound: {
      kicker: '404 · Wrong turn',
      title: 'Page not found',
      body: 'This URL may have moved, or you may have typed it wrong. Start again from one of these ──',
      goHome: 'Home · Atelier',
      goJournal: 'Journal',
    },
  },
  footer: {
    columns: {
      shop: 'Shop',
      atelier: 'Atelier',
      shipping: 'Shipping',
      legal: 'Legal',
    },
    items: {
      allSeries: 'Full series',
      giftBox: 'Gift sets',
      process: 'Process',
      ingredients: 'Botanicals',
      journal: 'Journal',
      taiwan: 'Taiwan (main island)',
      offshore: 'Offshore islands',
      sevenEleven: '7-11 pickup',
      familyMart: 'FamilyMart pickup',
      orderQuery: 'Track order',
      privacy: 'Privacy',
      returns: 'Returns',
      terms: 'Terms',
    },
    contact: {
      title: 'Contact',
    },
  },
  cart: {
    title: 'Cart',
    empty: 'Your cart is empty ── browse The Twelve?',
    summary: {
      subtotal: 'Subtotal',
      shipping: 'Shipping · Taiwan',
      freeShipping: 'Free',
      discount: '10% off',
      total: 'Total',
    },
    form: {
      title: 'Order details',
      instruction: 'After submitting, please add us on Line and share your order ID. We will reply within 24 hours with payment and shipping instructions. No payment required upfront.',
      fields: {
        name: 'Name',
        email: 'Email',
        phone: 'Mobile (09XX-XXX-XXX)',
        phoneError: "That doesn't look like a Taiwan mobile ── should start with 09 and be ten digits.",
        shipMethodPlaceholder: '── Select shipping method ──',
      },
    },
    success: {
      orderIdLabel: 'Order ID · please keep this',
      instruction: 'Please add us on Line (green button at bottom right) and share this order ID. We will reply within 24 hours.',
      checkStatus: 'Track this order  ▸',
    },
  },
};
