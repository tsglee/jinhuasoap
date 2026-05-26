// English translations for all 27 Journal posts.
// Keyed by slug. Each entry contains the metadata fields needed for
// JournalIndex (title, lead, description, kicker, keywords) and an
// optional `body` field — when present, the post is fully translated
// and the post page renders the English body; when absent, the page
// shows a "Full English translation in progress" notice and links to
// the Chinese version.
//
// Kicker map: 原料手記 = Ingredient Notes / 設計方針 = Design Principles /
// 工藝技術 = Craft Techniques / 皮膚紀錄 = Skin Records /
// 生活運用 = Daily Use / 儀式感受 = Ritual Notes
//
// Maintenance:
// - To translate a new article body, add `body: [...]` to its entry here.
// - The body schema mirrors the Chinese POSTS body (strings, {type:'h2'},
//   {type:'figure'}, {type:'faq', items: [{q, a}]}).
export const POSTS_EN = {
  // ===== Existing 11 — metadata only (body to translate in future passes) =====
  'three-oils': {
    title: 'What Oils We Use',
    lead: 'Why a soap mixes different oils — each plays a different role.',
    description:
      'Why does a cold-process soap mix olive, coconut, and castor? Each brings a different fatty acid family — olive for moisture, coconut for cleanse, castor for stable lather. Understand this and you can read any soap recipe.',
    kicker: 'Ingredient Notes',
    keywords: ['soap recipe', 'olive oil', 'coconut oil', 'castor oil', 'fatty acids', 'cold-process soap'],
  },
  'ffa-five-forces': {
    title: 'Fatty Acids & The Five Forces',
    lead: 'Oil is the carrier; fatty acids are the substance. The Five Forces are a soap\'s health check.',
    description:
      'Oils are just carriers; fatty acids are the substance of soap. Learn to read the ratios of oleic, lauric, palmitic, ricinoleic acids and you can predict any recipe\'s wash feel. The Five Forces is the chart our maker keeps next to the cauldron.',
    kicker: 'Design Principles',
    keywords: ['fatty acids', 'oleic acid', 'lauric acid', 'soap formulation', 'five forces', 'cold-process'],
  },
  saponification: {
    title: 'Oil Meets Lye, Becomes Soap',
    lead: 'Why cold-process soap leaves no tight feeling? Because glycerin is born as a natural by-product.',
    description:
      'The chemistry behind handmade soap is simple: oils react with alkali to form soap plus glycerin. That glycerin — a natural humectant — is why washing with handmade soap doesn\'t leave skin tight. Industrial detergents extract it; we keep it.',
    kicker: 'Craft Techniques',
    keywords: ['saponification', 'glycerin', 'cold-process moisture', 'NaOH', 'soap chemistry'],
  },
  trace: {
    title: 'Trace: The Moment of Judgment',
    lead: 'When the batter holds a mark on its own surface — that\'s trace, and time to mold.',
    description:
      'Trace is the critical moment in cold-process soap — the point at which oil and lye have emulsified enough that a trail stays on the surface. Light, medium, heavy trace each suit different molding goals. This piece is about the eye-and-feel of catching it.',
    kicker: 'Craft Techniques',
    keywords: ['trace', 'cold-process soap', 'saponification', 'molding', 'soap making'],
  },
  'yes-palm': {
    title: 'Why We Use Palm Oil',
    lead: 'Palm is controversial. Refusing it isn\'t always the greener choice — our recipe explains why.',
    description:
      'Palm oil has real environmental costs but also unmatched yield. Per hectare, palm produces 8× the oil of soy and 10× of olive. Boycotting palm without thinking can push the deforestation pressure to other crops. Here\'s how we use palm responsibly.',
    kicker: 'Ingredient Notes',
    keywords: ['palm oil', 'no palm', 'sustainability', 'hardening oil', 'environmental soap'],
  },
  'skin-ph-acid-mantle': {
    title: 'Cleansing Codes for Face, Body, Hair',
    lead: 'Healthy skin is pH 4.5–5.5 — slightly acidic. Cold-process soap is alkaline. Why does it still work? When does it not?',
    description:
      'Skin\'s acid mantle sits at pH 4.5–5.5, but cold-process soap reads pH 8–10. Why doesn\'t the body mind, but the face sometimes does? This piece explains the role of the acid mantle and when to switch to a mild-acid bar.',
    kicker: 'Skin Records',
    keywords: ['acid mantle', 'skin pH', 'face wash', 'mild-acid bar', 'cold-process'],
  },
  'cold-vs-hot-process': {
    title: 'Cold, Hot, and Re-Batched',
    lead: 'Three soap-making methods, three different outcomes — why we stick with cold-pressed.',
    description:
      'Cold-process, hot-process, and re-batched soaps differ in time, color, scent, and gentleness. We chose cold-process not for tradition but for what it preserves — glycerin, scent, and the full natural color of the oils.',
    kicker: 'Craft Techniques',
    keywords: ['cold-process', 'hot-process', 're-batch', 'soap method comparison'],
  },
  'ins-value': {
    title: 'INS Value: The First Number on the Recipe Sheet',
    lead: 'Our maker checks one number before any other — the INS value. It tells you whether a soap will hold its shape.',
    description:
      'The INS value is a quick weighted-average of a soap\'s oil composition. 140–160 is the sweet spot for balanced firmness, lather, and moisture. This piece explains how to read it and why it doesn\'t replace deeper Five-Forces analysis.',
    kicker: 'Design Principles',
    keywords: ['INS value', 'soap formulation', 'recipe calculation', 'soap balance'],
  },
  'botanical-design-truth': {
    title: 'Does Adding Milk or Coffee Make Soap Better?',
    lead: 'Botanicals (milk, coffee, honey, clay) are accents — not patches. A bad foundation can\'t be saved by sprinkles.',
    description:
      'Many handmade soaps lean on botanical add-ins (milk, coffee, honey, clay) for marketing. The truth: these are accents. A soap\'s foundation is its fatty acid composition. If the base is wrong, no amount of botanical can save it.',
    kicker: 'Design Principles',
    keywords: ['botanical additives', 'milk soap', 'coffee soap', 'honey soap', 'soap design'],
  },
  'how-to-choose-soap': {
    title: 'How to Choose a Soap Bar — Starting From You',
    lead: 'Three questions from our maker: your skin type, your season, your body part. Answer them, and the right soap appears.',
    description:
      'With 12 cold-process bars and 2 mild-acid wash bars, where do you start? Our maker\'s three-question framework: skin type, season, body part. Pick one, use it for four weeks, and your skin will tell you the answer.',
    kicker: 'Skin Records',
    keywords: ['soap selection guide', 'sensitive skin soap', 'goldenflower 12 series', 'seasonal soap', 'body part soap'],
  },
  'why-handmade-soap': {
    title: 'Why Handmade Soap — And How Mild-Acid Bars Differ',
    lead: 'Industrial soap leaves skin tight. Liquid washes pile up plastic bottles. Cold-process soap and mild-acid wash bars each solve a different problem.',
    description:
      'Cold-process soap vs. mild-acid wash bars vs. industrial body wash: differences in pH, glycerin retention, environmental impact. One piece explaining what each format is designed for — and why you might want both.',
    kicker: 'Design Principles',
    keywords: ['handmade soap', 'wash bar', 'cold-process', 'mild-acid soap', 'body wash comparison'],
  },

  // ===== New 16 articles (this 2026-05 session) — metadata translated =====
  'soap-storage': {
    title: 'A Soap\'s Home: Storage & Longevity',
    lead: 'A soap\'s life depends mostly on where you put it. Soap dish, drainage, dry storage — small things, big difference.',
    description:
      'A cold-process soap can last 60 days or three weeks — and the difference is usually how you store it. This piece covers soap dishes, drainage, bathroom humidity, and how to make one bar last twice as long.',
    kicker: 'Daily Use',
    keywords: ['soap storage', 'soap dish', 'bar lifespan', 'bathroom organization', 'cold-process care'],
  },
  'travel-soap': {
    title: 'The Soap You Take On the Road',
    lead: 'Business trip, gym, family vacation — one cold-process bar replaces three plastic bottles.',
    description:
      'Why packing a bar of soap beats three travel-size plastic bottles: lighter, no liquid restrictions at airport security, less plastic waste. Includes packing methods (beeswax wrap, silicone case) for three travel scenarios.',
    kicker: 'Daily Use',
    keywords: ['travel soap', 'business travel', 'gym soap', 'minimal packing', 'reduce plastic'],
  },
  'after-sweat': {
    title: 'After You Sweat',
    lead: 'Workout, bike ride, full day outdoors — the 30-minute window after sweating is when soap matters most.',
    description:
      'Why showering within 30 minutes after sweating matters: salt crystals and bacterial breakdown of sweat\'s urea start in that window. Three exercise intensities and the right soap and water temperature for each.',
    kicker: 'Daily Use',
    keywords: ['post-workout shower', 'sweat skin care', '30 minute window', 'summer cleansing', 'exercise soap'],
  },
  'taiwan-water': {
    title: 'This Island\'s Water and Soap',
    lead: 'Move from Taipei to Kaohsiung and your soap suddenly feels different. It\'s the water, not the soap.',
    description:
      'Taiwan\'s tap water varies — softer in the north, harder in the south. Same cold-process soap, different experience. This piece explains hard vs. soft water effects on lather and skin, plus practical adjustments per region.',
    kicker: 'Daily Use',
    keywords: ['hard water soap', 'soft water soap', 'Taiwan water', 'regional soap care', 'lather science'],
  },
  'baby-soap': {
    title: 'Babies & Cold-Process Soap',
    lead: 'Infant acid mantle isn\'t fully developed; postpartum mothers\' hands crack from constant washing — a bar of soap meets both.',
    description:
      'Can babies use cold-process soap? Three stages — newborn (0–1m), infant (1–6m), 6+ months — each with different recommendations. Plus what mothers in lactation need for their own skin. Conservative, evidence-aligned guidance.',
    kicker: 'Skin Records',
    keywords: ['baby soap', 'newborn skincare', 'postpartum skin', 'lactation', 'sensitive infant'],
  },
  'menopause-skin': {
    title: 'Skin in Menopause',
    lead: 'The soap you loved for years suddenly feels harsh — not because the soap changed. Your skin changed seasons.',
    description:
      'Estrogen decline through menopause directly affects sebum, collagen, and barrier care. The soaps you used at 40 may feel wrong at 55. Why, and what to switch to — more nourishing bars, mild-acid for the face.',
    kicker: 'Skin Records',
    keywords: ['menopause skin', 'mature skin care', 'thinning skin', 'hormones and skin', '50+ skincare'],
  },
  'teen-acne': {
    title: 'Teenage Acne',
    lead: 'Wash too much and skin overproduces oil. Wash too little and acne thrives. The line between them.',
    description:
      'Why teens often face the "wash 7 times a day and still oily" loop. Sebum, keratin, bacteria — the three conditions for acne, and how to break one without breaking the barrier. Plus soap recommendations balancing cleanse and gentleness.',
    kicker: 'Skin Records',
    keywords: ['teen acne', 'oily skin', 'pubescent skin', 'gentle cleansing', 'acne soap'],
  },
  'elderly-winter-itch': {
    title: 'Winter Itch in Later Years',
    lead: 'After seventy, the body\'s natural oils halve. Add winter dryness and indoor heating — itching starts.',
    description:
      'Elderly winter pruritus has clear causes: reduced sebum, low humidity, indoor heating, hot showers. Four small adjustments that help — and the nourishing soaps best suited to thinned skin.',
    kicker: 'Skin Records',
    keywords: ['winter dryness', 'elderly skin care', 'pruritus', 'senior skincare', 'moisturizing soap'],
  },
  'housewife-eczema': {
    title: 'Hands That Wash All Day',
    lead: 'Dishes, hand wash, alcohol — your hands undergo 30 cleansing events daily. No barrier survives that.',
    description:
      'Hands have no sebaceous glands. Each wash strips a little oil; a typical day sees 30+ cleansing events. Two axes to manage: reduce damage (gentler soaps, gloves, less alcohol) and repair (immediate cream after wash, nighttime balm). Practical advice.',
    kicker: 'Skin Records',
    keywords: ['hand eczema', 'housewife hands', 'frequent hand washing', 'barrier care', 'gentle hand soap'],
  },
  'menstrual-skin': {
    title: 'Skin Through the Menstrual Cycle',
    lead: 'Your skin changes across 28 days. So can the soap you reach for.',
    description:
      'The four phases of the menstrual cycle each bring different sebum patterns and skin sensitivity. Same person, four skins. This piece walks through each phase and suggests how to rotate soaps in step with your body.',
    kicker: 'Skin Records',
    keywords: ['menstrual skin', 'cycle skincare', 'hormones skin', 'PMS skin', 'cyclical skin care'],
  },
  'allergy-flare': {
    title: 'Those Days When Allergies Flare',
    lead: 'When skin is red, itchy, swollen — what NOT to do is more important than what to do.',
    description:
      'Allergy flare-up: skin barrier is already compromised. Adding more (toners, serums, scrubs) often makes it worse. This piece offers a subtraction protocol: cut 80% of skincare, switch to fragrance-free soap, lukewarm water, see a dermatologist when symptoms escalate.',
    kicker: 'Skin Records',
    keywords: ['allergy skincare', 'sensitive skin emergency', 'compromised barrier', 'fragrance-free soap', 'minimal routine'],
  },
  'humid-island-feet': {
    title: 'Feet in a Humid Climate',
    lead: 'Taiwan\'s summer turns shoes into mini greenhouses — athlete\'s foot, sweat, odor mostly trace back to "trapped".',
    description:
      'Why foot problems plague humid-climate populations: shoes that don\'t breathe, soles without sebaceous glands, and the bacterial-fungal feast that sweat enables. Daily practices and the soap formulations best suited to feet.',
    kicker: 'Skin Records',
    keywords: ['foot care', 'humid climate skin', 'athlete\'s foot awareness', 'foot odor'],
  },
  'last-sliver': {
    title: 'Saying Goodbye to a Soap Bar',
    lead: 'When a bar is down to a sliver — too small to grip, too good to discard. That small piece is the last chapter.',
    description:
      'A cold-process soap takes 60 days to make and 60 days to use. The last sliver is your relationship with it ending. Three ways to extend the final stretch — soap saver bag, chain bonding, soap paste — and a small ritual of letting go.',
    kicker: 'Ritual Notes',
    keywords: ['soap saver bag', 'soap remnants', 'bar lifespan', 'frugal living', 'soap rituals'],
  },
  'gift-soap': {
    title: 'Giving a Soap as a Gift',
    lead: 'Wedding, holiday, housewarming, birthday — what a soap gift says depends on what you see in the recipient.',
    description:
      'Three questions for choosing a soap gift: who is it for, what occasion, do you need customization? From immediate-use bars for close family to ceremonial wedding favors and corporate seasonal gifts. Also pitfalls to avoid (scent allergies, over-precious wrapping).',
    kicker: 'Ritual Notes',
    keywords: ['soap gift', 'wedding favor', 'holiday gift', 'custom soap', 'gift box ideas'],
  },
  'slow-bath': {
    title: 'A Slower Bath',
    lead: 'One soap, one candle, one tea, one book — the bathroom is the most private of private times. Give it back to yourself.',
    description:
      'Most of us no longer treat a bath as an event. A 5-minute wash is closing time; a 30-minute slow bath is reopening time — for yourself. This piece is about the small tools of a slow bath, the body\'s rhythm, and which scents help.',
    kicker: 'Ritual Notes',
    keywords: ['slow living', 'mindful bathing', 'bath ritual', 'aromatic soap', 'self-care'],
  },
  'scent-and-memory': {
    title: 'Scent and Memory',
    lead: 'Why does a certain essential oil bring back a person, a place, an afternoon you thought was lost? Scent is memory\'s fastest path.',
    description:
      'The olfactory nerve is the only sense that bypasses the thalamus, going straight to the hippocampus and amygdala. Why a smell triggers memory faster than sight or sound. A scent map of the 12 Goldenflower soaps, and why certain scents make you cry.',
    kicker: 'Ritual Notes',
    keywords: ['scent memory', 'Proust effect', 'olfactory neuroscience', 'essential oils', 'soap fragrance'],
  },
};

// Helper: get translated post or null if not translated
export function getTranslatedPost(slug, locale) {
  if (locale !== 'en') return null;
  return POSTS_EN[slug] || null;
}
