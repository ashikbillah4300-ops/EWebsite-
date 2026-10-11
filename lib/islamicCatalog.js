// THAWBIN — Official Islamic E-Commerce Catalog & Data Layer
// Complete, authentic Muslim lifestyle products with 0 unrelated items

export const ISLAMIC_CATEGORIES = [
  {
    _id: 'cat-panjabi',
    name: 'Panjabi & Men\'s Wear',
    nameBn: 'পাঞ্জাবি ও পুরুষদের ইসলামিক পোশাক',
    slug: 'panjabi',
    icon: '👔',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&q=80',
    description: 'প্রিমিয়াম সুতি, কাবলি, সাদা নামাজি পাঞ্জাবি ও ঐতিহ্যবাহী জুব্বা কালেকশন',
    isFeatured: true,
    orderBy: 1,
    subcategories: [
      { _id: 'sub-p1', name: 'Premium Panjabi', nameBn: 'প্রিমিয়াম পাঞ্জাবি', slug: 'panjabi' },
      { _id: 'sub-p2', name: 'Traditional Panjabi', nameBn: 'ঐতিহ্যবাহী পাঞ্জাবি', slug: 'panjabi' },
      { _id: 'sub-p3', name: 'White Panjabi', nameBn: 'সাদা পাঞ্জাবি', slug: 'panjabi' },
      { _id: 'sub-p4', name: 'Eid Panjabi', nameBn: 'ঈদ পাঞ্জাবি', slug: 'panjabi' },
      { _id: 'sub-p5', name: 'Embroidered Panjabi', nameBn: 'এমব্রয়ডারি পাঞ্জাবি', slug: 'panjabi' },
      { _id: 'sub-p6', name: 'Islamic Jubba', nameBn: 'ইসলামিক জুব্বা', slug: 'panjabi' },
      { _id: 'sub-p7', name: 'Thobe and Kameez', nameBn: 'থোব ও কামিজ', slug: 'panjabi' },
      { _id: 'sub-p8', name: 'Men\'s Islamic Sets', nameBn: 'পুরুষদের ইসলামিক পোশাক সেট', slug: 'panjabi' },
    ]
  },
  {
    _id: 'cat-attar',
    name: 'Attar & Fragrance',
    nameBn: 'আতর ও সুগন্ধি',
    slug: 'attar',
    icon: '✨',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=80',
    description: '১০০% অ্যালকোহলমুক্ত খাঁটি দেহন আল উদ, কস্তুরী মাস্ক ও এরাবিয়ান সুবাস',
    isFeatured: true,
    orderBy: 2,
    subcategories: [
      { _id: 'sub-a1', name: 'Alcohol-Free Attar', nameBn: 'অ্যালকোহলমুক্ত আতর', slug: 'attar' },
      { _id: 'sub-a2', name: 'Premium Attar', nameBn: 'প্রিমিয়াম আতর', slug: 'attar' },
      { _id: 'sub-a3', name: 'Oud and Musk', nameBn: 'উদ ও মাস্ক', slug: 'attar' },
      { _id: 'sub-a4', name: 'Arabian Fragrances', nameBn: 'অ্যারাবিয়ান সুগন্ধি', slug: 'attar' },
      { _id: 'sub-a5', name: 'Roll-On Perfume', nameBn: 'রোল-অন সুগন্ধি', slug: 'attar' },
      { _id: 'sub-a6', name: 'Gift Perfume Sets', nameBn: 'আতর গিফট সেট', slug: 'attar' },
    ]
  },
  {
    _id: 'cat-topi',
    name: 'Topi & Caps',
    nameBn: 'টুপি ও ইসলামিক এক্সেসরিজ',
    slug: 'topi',
    icon: '👑',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&q=80',
    description: 'তুর্কি, ওমানি, ঐতিহ্যবাহী সূচিকর্ম ও আরামদায়ক সাদা নামাজি টুপি',
    isFeatured: true,
    orderBy: 3,
    subcategories: [
      { _id: 'sub-t1', name: 'Men\'s Prayer Caps', nameBn: 'নামাজের টুপি', slug: 'topi' },
      { _id: 'sub-t2', name: 'White Namazi Topi', nameBn: 'সাদা নামাজি টুপি', slug: 'topi' },
      { _id: 'sub-t3', name: 'Embroidered Topi', nameBn: 'এমব্রয়ডারি টুপি', slug: 'topi' },
      { _id: 'sub-t4', name: 'Turkish Caps', nameBn: 'তুর্কি টুপি', slug: 'topi' },
      { _id: 'sub-t5', name: 'Islamic Scarves', nameBn: 'ইসলামিক স্কার্ফ ও রুমাল', slug: 'topi' },
      { _id: 'sub-t6', name: 'Prayer Beads Accessories', nameBn: 'তসবিহ ও এক্সেসরিজ', slug: 'topi' },
    ]
  },
  {
    _id: 'cat-prayer-mats',
    name: 'Prayer Mats',
    nameBn: 'জায়নামাজ ও নামাজের সামগ্রী',
    slug: 'prayer-mats',
    icon: '🕌',
    image: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&q=80',
    description: 'লাক্সারি তুর্কি ভেলভেট, সফট অর্থোপেডিক ফোম ও কমপ্যাক্ট ট্রাভেল জায়নামাজ',
    isFeatured: true,
    orderBy: 4,
    subcategories: [
      { _id: 'sub-m1', name: 'Premium Prayer Mats', nameBn: 'প্রিমিয়াম জায়নামাজ', slug: 'prayer-mats' },
      { _id: 'sub-m2', name: 'Soft Prayer Mats', nameBn: 'সফট জায়নামাজ', slug: 'prayer-mats' },
      { _id: 'sub-m3', name: 'Travel Prayer Mats', nameBn: 'ট্রাভেল জায়নামাজ', slug: 'prayer-mats' },
      { _id: 'sub-m4', name: 'Foldable Prayer Mats', nameBn: 'ভাঁজযোগ্য জায়নামাজ', slug: 'prayer-mats' },
      { _id: 'sub-m5', name: 'Prayer Mat Gift Sets', nameBn: 'জায়নামাজ গিফট সেট', slug: 'prayer-mats' },
      { _id: 'sub-m6', name: 'Prayer Garments', nameBn: 'নামাজের পোশাক', slug: 'prayer-mats' },
    ]
  },
  {
    _id: 'cat-tasbih',
    name: 'Tasbih & Dhikr',
    nameBn: 'তসবিহ ও জিকিরের সামগ্রী',
    slug: 'tasbih',
    icon: '📿',
    image: 'https://images.unsplash.com/photo-1584286595398-a59f21d313f5?w=800&q=80',
    description: 'প্রাকৃতিক জলপাই কাঠ, অনিক্স পাথর ও আধুনিক ডিজিটাল এলইডি তসবিহ',
    isFeatured: true,
    orderBy: 5,
    subcategories: [
      { _id: 'sub-ts1', name: 'Traditional Tasbih', nameBn: 'ঐতিহ্যবাহী তসবিহ', slug: 'tasbih' },
      { _id: 'sub-ts2', name: 'Digital Tasbih', nameBn: 'ডিজিটাল তসবিহ', slug: 'tasbih' },
      { _id: 'sub-ts3', name: 'Wooden Tasbih', nameBn: 'কাঠের তসবিহ', slug: 'tasbih' },
      { _id: 'sub-ts4', name: 'Stone Tasbih', nameBn: 'পাথরের তসবিহ', slug: 'tasbih' },
      { _id: 'sub-ts5', name: 'Premium Gift Tasbih', nameBn: 'প্রিমিয়াম গিফট তসবিহ', slug: 'tasbih' },
    ]
  },
  {
    _id: 'cat-quran-and-books',
    name: 'Quran & Books',
    nameBn: 'কুরআন ও ইসলামিক বই',
    slug: 'quran-and-books',
    icon: '📖',
    image: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&q=80',
    description: 'তাজবীদসহ পবিত্র কুরআনুল কারীম, সহীহ হাদিস ও প্রামাণ্য ইসলামিক গ্রন্থাবলী',
    isFeatured: true,
    orderBy: 6,
    subcategories: [
      { _id: 'sub-q1', name: 'Holy Quran', nameBn: 'পবিত্র কুরআনুল কারীম', slug: 'quran-and-books' },
      { _id: 'sub-q2', name: 'Bangla Translation of Quran', nameBn: 'বাংলা অনুবাদ কুরআন', slug: 'quran-and-books' },
      { _id: 'sub-q3', name: 'Quran with Tafsir', nameBn: 'তাফসীরসহ কুরআন', slug: 'quran-and-books' },
      { _id: 'sub-q4', name: 'Islamic Books', nameBn: 'ইসলামিক বই', slug: 'quran-and-books' },
      { _id: 'sub-q5', name: 'Hadith Books', nameBn: 'হাদিস গ্রন্থ', slug: 'quran-and-books' },
      { _id: 'sub-q6', name: 'Dua and Zikr Books', nameBn: 'দোয়া ও জিকিরের বই', slug: 'quran-and-books' },
      { _id: 'sub-q7', name: 'Children\'s Islamic Books', nameBn: 'শিশুদের ইসলামিক বই', slug: 'quran-and-books' },
      { _id: 'sub-q8', name: 'Arabic Learning Books', nameBn: 'আরবি শিক্ষা বই', slug: 'quran-and-books' },
    ]
  },
  {
    _id: 'cat-hijab-and-abaya',
    name: 'Hijab & Modest Wear',
    nameBn: 'হিজাব ও পর্দার পোশাক',
    slug: 'hijab-and-abaya',
    icon: '🧕',
    image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&q=80',
    description: 'দুবাই নিদাহ আবায়া, তুর্কি প্রিমিয়াম শিফন হিজাব ও ফ্রেঞ্চ খিমার সেট',
    isFeatured: true,
    orderBy: 7,
    subcategories: [
      { _id: 'sub-h1', name: 'Hijab', nameBn: 'হিজাব', slug: 'hijab-and-abaya' },
      { _id: 'sub-h2', name: 'Khimar', nameBn: 'খিমার', slug: 'hijab-and-abaya' },
      { _id: 'sub-h3', name: 'Abaya', nameBn: 'আবায়া', slug: 'hijab-and-abaya' },
      { _id: 'sub-h4', name: 'Burqa', nameBn: 'বোরকা', slug: 'hijab-and-abaya' },
      { _id: 'sub-h5', name: 'Prayer Hijab', nameBn: 'নামাজি হিজাব', slug: 'hijab-and-abaya' },
      { _id: 'sub-h6', name: 'Modest Islamic Dresses', nameBn: 'মার্জিত পোশাক', slug: 'hijab-and-abaya' },
      { _id: 'sub-h7', name: 'Women\'s Prayer Clothing', nameBn: 'নামাজের পোশাক', slug: 'hijab-and-abaya' },
    ]
  },
  {
    _id: 'cat-islamic-gifts',
    name: 'Islamic Gifts',
    nameBn: 'ইসলামিক গিফট ও গিফট বক্স',
    slug: 'islamic-gifts',
    icon: '🎁',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80',
    description: 'আতর, জায়নামাজ ও তসবিহ সম্বলিত প্রিমিয়াম ইসলামিক উপহার বক্স',
    isFeatured: true,
    orderBy: 8,
    subcategories: [
      { _id: 'sub-g1', name: 'Islamic Gift Boxes', nameBn: 'ইসলামিক গিফট বক্স', slug: 'islamic-gifts' },
      { _id: 'sub-g2', name: 'Attar Gift Sets', nameBn: 'আতর গিফট সেট', slug: 'islamic-gifts' },
      { _id: 'sub-g3', name: 'Prayer Gift Sets', nameBn: 'নামাজ উপহার সেট', slug: 'islamic-gifts' },
      { _id: 'sub-g4', name: 'Quran Gift Sets', nameBn: 'কুরআন উপহার সেট', slug: 'islamic-gifts' },
      { _id: 'sub-g5', name: 'Ramadan Gifts', nameBn: 'রমজান উপহার', slug: 'islamic-gifts' },
      { _id: 'sub-g6', name: 'Eid Gifts', nameBn: 'ঈদ উপহার', slug: 'islamic-gifts' },
      { _id: 'sub-g7', name: 'Wedding and Nikah Gifts', nameBn: 'নিকাহ ও বিয়ে উপহার', slug: 'islamic-gifts' },
      { _id: 'sub-g8', name: 'Personalized Islamic Gifts', nameBn: 'কাস্টমাইজড ইসলামিক গিফট', slug: 'islamic-gifts' },
    ]
  },
  {
    _id: 'cat-ramadan-and-eid',
    name: 'Ramadan & Eid',
    nameBn: 'রমজান ও ঈদের সামগ্রী',
    slug: 'ramadan-and-eid',
    icon: '🌙',
    image: 'https://images.unsplash.com/photo-1584286595398-a59f21d313f5?w=800&q=80',
    description: 'মদিনার খাঁটি আজওয়া খেজুর, ইসলামিক লণ্ঠন ও হিজরি ক্যালেন্ডার',
    isFeatured: true,
    orderBy: 9,
    subcategories: [
      { _id: 'sub-r1', name: 'Ramadan Essentials', nameBn: 'রমজানের প্রয়োজনীয় সামগ্রী', slug: 'ramadan-and-eid' },
      { _id: 'sub-r2', name: 'Ramadan Gift Sets', nameBn: 'রমজান গিফট সেট', slug: 'ramadan-and-eid' },
      { _id: 'sub-r3', name: 'Eid Gift Collections', nameBn: 'ঈদ গিফট কালেকশন', slug: 'ramadan-and-eid' },
      { _id: 'sub-r4', name: 'Iftar Accessories', nameBn: 'ইফতার সামগ্রী', slug: 'ramadan-and-eid' },
      { _id: 'sub-r5', name: 'Islamic Calendar', nameBn: 'ইসলামিক ক্যালেন্ডার', slug: 'ramadan-and-eid' },
      { _id: 'sub-r6', name: 'Ramadan Decorations', nameBn: 'রমজান ডেকোরেশন', slug: 'ramadan-and-eid' },
    ]
  },
  {
    _id: 'cat-children-islamic',
    name: 'Children\'s Islamic',
    nameBn: 'শিশুদের ইসলামিক পণ্য',
    slug: 'children-islamic',
    icon: '🧸',
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80',
    description: 'ছোটদের পাঞ্জাবি, টুপি, ছোট জায়নামাজ ও সহজ আরবি বর্ণমালা শেখার বোর্ড',
    isFeatured: false,
    orderBy: 10,
    subcategories: [
      { _id: 'sub-c1', name: 'Children\'s Panjabi', nameBn: 'শিশুদের পাঞ্জাবি', slug: 'children-islamic' },
      { _id: 'sub-c2', name: 'Children\'s Prayer Caps', nameBn: 'শিশুদের টুপি', slug: 'children-islamic' },
      { _id: 'sub-c3', name: 'Children\'s Prayer Mats', nameBn: 'শিশুদের জায়নামাজ', slug: 'children-islamic' },
      { _id: 'sub-c4', name: 'Islamic Learning Books', nameBn: 'শিশুদের ইসলামিক বই', slug: 'children-islamic' },
      { _id: 'sub-c5', name: 'Arabic Alphabet Materials', nameBn: 'আরবি বর্ণমালা শিক্ষা', slug: 'children-islamic' },
      { _id: 'sub-c6', name: 'Children\'s Gift Sets', nameBn: 'শিশুদের উপহার সেট', slug: 'children-islamic' },
    ]
  },
  {
    _id: 'cat-hajj-and-umrah',
    name: 'Hajj & Umrah',
    nameBn: 'হজ ও ওমরাহ সামগ্রী',
    slug: 'hajj-and-umrah',
    icon: '🕋',
    image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&q=80',
    description: '১০০% সুতি মিশরীয় ইহরাম, সিকিউরিটি বেল্ট ও ট্রাভেল হজ নির্দেশিকা',
    isFeatured: false,
    orderBy: 11,
    subcategories: [
      { _id: 'sub-hu1', name: 'Ihram Clothing', nameBn: 'ইহরামের পোশাক', slug: 'hajj-and-umrah' },
      { _id: 'sub-hu2', name: 'Ihram Belts', nameBn: 'ইহরামের বেল্ট', slug: 'hajj-and-umrah' },
      { _id: 'sub-hu3', name: 'Travel Prayer Mats', nameBn: 'সফরের জায়নামাজ', slug: 'hajj-and-umrah' },
      { _id: 'sub-hu4', name: 'Hajj and Umrah Bags', nameBn: 'হজ ও ওমরাহ ব্যাগ', slug: 'hajj-and-umrah' },
      { _id: 'sub-hu5', name: 'Pilgrimage Essentials', nameBn: 'হজের প্রয়োজনীয় সামগ্রী', slug: 'hajj-and-umrah' },
      { _id: 'sub-hu6', name: 'Hajj and Umrah Guidebooks', nameBn: 'হজ ও ওমরাহ গাইডবই', slug: 'hajj-and-umrah' },
    ]
  },
  {
    _id: 'cat-islamic-lifestyle',
    name: 'Islamic Home & Lifestyle',
    nameBn: 'ইসলামিক হোম ও লাইফস্টাইল',
    slug: 'islamic-lifestyle',
    icon: '🖼️',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&q=80',
    description: 'আয়াতুল কুরসি গোল্ড ক্যালিগ্রাফি, মেহগনি কাঠের রেহাল ও আসমাউল হুসনা ফ্রেম',
    isFeatured: false,
    orderBy: 12,
    subcategories: [
      { _id: 'sub-l1', name: 'Islamic Wall Art & Calligraphy', nameBn: 'ইসলামিক ওয়াল আর্ট', slug: 'islamic-lifestyle' },
      { _id: 'sub-l2', name: 'Islamic Calendars', nameBn: 'ইসলামিক ক্যালেন্ডার', slug: 'islamic-lifestyle' },
      { _id: 'sub-l3', name: 'Quran Stands (Rehal)', nameBn: 'রেহাল / কুরআন স্ট্যান্ড', slug: 'islamic-lifestyle' },
      { _id: 'sub-l4', name: 'Islamic Book Stands', nameBn: 'বই পড়ার স্ট্যান্ড', slug: 'islamic-lifestyle' },
      { _id: 'sub-l5', name: 'Decorative Islamic Items', nameBn: 'ইসলামিক শো-পিস', slug: 'islamic-lifestyle' },
      { _id: 'sub-l6', name: 'Muslim Lifestyle Accessories', nameBn: 'মুসলিম লাইফস্টাইল এক্সেসরিজ', slug: 'islamic-lifestyle' },
    ]
  }
];

export const ISLAMIC_PRODUCTS = [
  // ─── 1. Panjabi & Men's Islamic Clothing ───────────────────
  {
    _id: 'prod-pj-01',
    name: 'Royal Navy Premium Kabli Panjabi',
    nameBn: 'রয়্যাল নেভি প্রিমিয়াম কাবলি পাঞ্জাবি',
    slug: 'royal-navy-premium-kabli-panjabi',
    category: { _id: 'cat-panjabi', name: 'Panjabi & Men\'s Wear', slug: 'panjabi' },
    subcategory: 'Premium Panjabi',
    regularPrice: 3200,
    sellingPrice: 2850,
    stockQuantity: 18,
    stockStatus: 'in_stock',
    brand: 'Thawbin Signature',
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true,
    featuredImage: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&q=80',
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=800&q=80'
    ],
    sizes: ['38', '40', '42', '44'],
    colors: ['Royal Navy', 'Deep Charcoal'],
    fabric: '100% Premium Combed Cotton',
    description: 'উচ্চমানের ১০০% কম্বড সুতি কাপড়ে তৈরি এই রয়্যাল নেভি কাবলি পাঞ্জাবি। আরামদায়ক ফিটিং এবং মার্জিত বোতামের ফিনিশিং আপনাকে দিবে যেকোনো নামাজ, জুমা বা ইসলামিক অনুষ্ঠানে অনন্য শালীনতা।',
    descriptionBn: 'উচ্চমানের ১০০% কম্বড সুতি কাপড়ে তৈরি এই রয়্যাল নেভি কাবলি পাঞ্জাবি। আরামদায়ক ফিটিং এবং মার্জিত বোতামের ফিনিশিং আপনাকে দিবে যেকোনো নামাজ, জুমা বা ইসলামিক অনুষ্ঠানে অনন্য শালীনতা।',
    specification: 'ফেব্রিক: ১০০% সুতি | কলার: ব্যান্ড কলার | বোতাম: প্রিমিয়াম মেটালিক স্ন্যাপ বাটন | ফিটিং: রেগুলার কাবলি কাট | সাইজ: ৩৮, ৪০, ৪২, ৪৪',
    tags: ['panjabi', 'kabli', 'men', 'eid', 'islamic clothing']
  },
  {
    _id: 'prod-pj-02',
    name: 'White Platinum Namazi Panjabi',
    nameBn: 'ধবধবে সাদা প্ল্যাটিনাম নামাজি পাঞ্জাবি',
    slug: 'white-platinum-namazi-panjabi',
    category: { _id: 'cat-panjabi', name: 'Panjabi & Men\'s Wear', slug: 'panjabi' },
    subcategory: 'White Panjabi',
    regularPrice: 2250,
    sellingPrice: 1950,
    stockQuantity: 24,
    stockStatus: 'in_stock',
    brand: 'Thawbin Purity',
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    featuredImage: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=800&q=80'
    ],
    sizes: ['38', '40', '42', '44'],
    colors: ['Pure White'],
    fabric: 'Egyptian Soft Cotton',
    description: 'মসৃণ ও ঠান্ডা সুতি কাপড়ে তৈরি ধবধবে সাদা নামাজি পাঞ্জাবি। জুমা, পাঁচ ওয়াক্ত নামাজ এবং পবিত্র ইবাদতের জন্য অত্যন্ত আরামদায়ক ও বিনম্র পোশাক।',
    descriptionBn: 'মসৃণ ও ঠান্ডা সুতি কাপড়ে তৈরি ধবধবে সাদা নামাজি পাঞ্জাবি। জুমা, পাঁচ ওয়াক্ত নামাজ এবং পবিত্র ইবাদতের জন্য অত্যন্ত আরামদায়ক ও বিনম্র পোশাক।',
    specification: 'ফেব্রিক: খাঁটি সাদা মিশরীয় তুলা | পকেট: দুই পাশে ডাবল ডিপ পকেট | ঝুল: স্ট্যান্ডার্ড নামাজি দৈর্ঘ্য',
    tags: ['white panjabi', 'namazi', 'pure cotton']
  },
  {
    _id: 'prod-pj-03',
    name: 'Saudi Style Minimalist Jubba — Mocha',
    nameBn: 'সৌদি স্টাইল মিনিমালিস্ট জুব্বা — মোকা ব্রাউন',
    slug: 'saudi-style-minimalist-jubba-mocha',
    category: { _id: 'cat-panjabi', name: 'Panjabi & Men\'s Wear', slug: 'panjabi' },
    subcategory: 'Islamic Jubba',
    regularPrice: 3600,
    sellingPrice: 3200,
    stockQuantity: 12,
    stockStatus: 'in_stock',
    brand: 'Thawbin Thobe',
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: false,
    featuredImage: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&q=80'
    ],
    sizes: ['52', '54', '56', '58'],
    colors: ['Mocha Brown', 'Olive Green'],
    fabric: 'Wrinkle-Resistant Poly-Cotton',
    description: 'আরব দেশীয় মার্জিত সৌদি কাটিং জুব্বা। রিঙ্কেল-ফ্রি মসৃণ ফ্যাব্রিক এবং বুক পকেটে সূক্ষ্ম সেলাই কাজ। দিনভর কুঁচকে যাওয়া ছাড়াই পরিপাটি থাকে।',
    descriptionBn: 'আরব দেশীয় মার্জিত সৌদি কাটিং জুব্বা। রিঙ্কেল-ফ্রি মসৃণ ফ্যাব্রিক এবং বুক পকেটে সূক্ষ্ম সেলাই কাজ। দিনভর কুঁচকে যাওয়া ছাড়াই পরিপাটি থাকে।',
    specification: 'কাটিং: ক্লাসিক সৌদি থোব | কলার: স্ট্যান্ডিং ব্যান্ড কলার | কাফ: সফট বাটন কাফ',
    tags: ['jubba', 'thobe', 'saudi', 'modest']
  },

  // ─── 2. Attar & Fragrance ──────────────────────────────────
  {
    _id: 'prod-at-01',
    name: 'Royal Cambodian Dehn Al Oud 6ml',
    nameBn: 'রয়্যাল কম্বোডিয়ান দেহন আল উদ (৬ মি.লি.)',
    slug: 'royal-cambodian-dehn-al-oud-6ml',
    category: { _id: 'cat-attar', name: 'Attar & Fragrance', slug: 'attar' },
    subcategory: 'Oud and Musk',
    regularPrice: 4000,
    sellingPrice: 3500,
    stockQuantity: 15,
    stockStatus: 'in_stock',
    brand: 'Thawbin Oud Al Haram',
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true,
    featuredImage: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=80',
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=800&q=80'
    ],
    sizes: ['3ml', '6ml', '12ml'],
    fragranceNotes: 'উডি, স্মোকি অ্যারোমা, সুইট অ্যাম্বার বেস নোটস',
    alcoholFree: true,
    description: '১০০% খাঁটি অ্যালকোহলমুক্ত কম্বোডিয়ান আগর কাঠ থেকে ঐতিহ্যবাহী পদ্ধতিতে নিষ্কাশিত দেহন আল উদ। দীর্ঘস্থায়ী রাজকীয় সুবাস যা নামাজ ও ইবাদতের পরিবেশে আনে পরম প্রশান্তি।',
    descriptionBn: '১০০% খাঁটি অ্যালকোহলমুক্ত কম্বোডিয়ান আগর কাঠ থেকে ঐতিহ্যবাহী পদ্ধতিতে নিষ্কাশিত দেহন আল উদ। দীর্ঘস্থায়ী রাজকীয় সুবাস যা নামাজ ও ইবাদতের পরিবেশে আনে পরম প্রশান্তি।',
    specification: 'ভলিউম: ৬ মিলি (কাঁচের ক্রিস্টাল বোতল ও ড্রপার) | অ্যালকোহল: সম্পূর্ণ অ্যালকোহলমুক্ত | দীর্ঘস্থায়ীত্ব: ১২+ ঘণ্টা কাপড়ে স্থায়ী',
    tags: ['attar', 'oud', 'cambodian', 'alcohol-free', 'fragrance']
  },
  {
    _id: 'prod-at-02',
    name: 'White Musk Tahara Pure Oil 6ml',
    nameBn: 'হোয়াইট মাস্ক তাহারা সুগন্ধি আতর (৬ মি.লি.)',
    slug: 'white-musk-tahara-pure-oil-6ml',
    category: { _id: 'cat-attar', name: 'Attar & Fragrance', slug: 'attar' },
    subcategory: 'Alcohol-Free Attar',
    regularPrice: 1200,
    sellingPrice: 950,
    stockQuantity: 30,
    stockStatus: 'in_stock',
    brand: 'Thawbin Pure',
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    featuredImage: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=800&q=80'
    ],
    sizes: ['6ml', '12ml'],
    fragranceNotes: 'তাজা ভ্যানিলা, কটন ফ্লাওয়ার, হালকা মিষ্টি মাস্ক',
    alcoholFree: true,
    description: 'মসৃণ ঘন টেক্সচারের সুপরিচিত মাস্ক তাহারা। এর মৃদু, নির্মল ও স্নিগ্ধ সুবাস আপনাকে দিনভর স্নিগ্ধ ও সতেজ অনুভূতির ভেতর রাখবে।',
    descriptionBn: 'মসৃণ ঘন টেক্সচারের সুপরিচিত মাস্ক তাহারা। এর মৃদু, নির্মল ও স্নিগ্ধ সুবাস আপনাকে দিনভর স্নিগ্ধ ও সতেজ অনুভূতির ভেতর রাখবে।',
    specification: 'ঘনত্ব: থিক ক্রিম অয়েল | অ্যালকোহল: ০% অ্যালকোহল | ব্যবহার: শরীর ও কাপড়ে ব্যবহার উপযোগী',
    tags: ['musk tahara', 'white musk', 'attar']
  },

  // ─── 3. Topi & Islamic Accessories ─────────────────────────
  {
    _id: 'prod-tp-01',
    name: 'Turkish Velvet Embroidered Namazi Topi',
    nameBn: 'তুর্কি ভেলভেট সূচিকর্ম নামাজি টুপি',
    slug: 'turkish-velvet-embroidered-namazi-topi',
    category: { _id: 'cat-topi', name: 'Topi & Caps', slug: 'topi' },
    subcategory: 'Turkish Caps',
    regularPrice: 800,
    sellingPrice: 650,
    stockQuantity: 25,
    stockStatus: 'in_stock',
    brand: 'Thawbin Heritage',
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true,
    featuredImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&q=80'
    ],
    sizes: ['Medium (21.5")', 'Large (22.5")', 'XL (23.5")'],
    colors: ['Royal Green', 'Deep Black', 'White Gold'],
    description: 'তুর্কি ভেলভেট ফ্যাব্রিকে নিখুঁত সোনালী সুতোর জ্যামিতিক নকশায় তৈরি নামাজি টুপি। মাথায় সুন্দরভাবে বসে এবং ভাঁজ করে পকেটে রাখা যায়।',
    descriptionBn: 'তুর্কি ভেলভেট ফ্যাব্রিকে নিখুঁত সোনালী সুতোর জ্যামিতিক নকশায় তৈরি নামাজি টুপি। মাথায় সুন্দরভাবে বসে এবং ভাঁজ করে পকেটে রাখা যায়।',
    specification: 'উপাদান: তুর্কি নরম ভেলভেট | এমব্রয়ডারি: ডুরাবল মেটালিক সুতো | সাইজ: মিডিয়াম, লার্জ',
    tags: ['topi', 'turkish cap', 'namazi', 'prayer cap']
  },

  // ─── 4. Prayer Mats & Essentials ───────────────────────────
  {
    _id: 'prod-pm-01',
    name: 'Luxury Turkish Mihrab Velvet Prayer Mat',
    nameBn: 'লাক্সারি তুর্কি মিহরাব ভেলভেট জায়নামাজ',
    slug: 'luxury-turkish-mihrab-velvet-prayer-mat',
    category: { _id: 'cat-prayer-mats', name: 'Prayer Mats', slug: 'prayer-mats' },
    subcategory: 'Premium Prayer Mats',
    regularPrice: 2600,
    sellingPrice: 2250,
    stockQuantity: 20,
    stockStatus: 'in_stock',
    brand: 'Thawbin Sajadah',
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    featuredImage: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&q=80'
    ],
    dimensions: '70cm x 115cm',
    material: 'High-Density Turkish Velvet with Anti-Slip Base',
    description: 'মসৃণ তুর্কি ভেলভেটে তৈরি মিহরাব নকশার জায়নামাজ। এর নরম কুশনিং সিজদায় হাঁটুর ওপর চাপ কমায় এবং নিচের অ্যান্টি-স্লিপ গ্রিপ টাইলসে পিছলে যাওয়া রোধ করে।',
    descriptionBn: 'মসৃণ তুর্কি ভেলভেটে তৈরি মিহরাব নকশার জায়নামাজ। এর নরম কুশনিং সিজদায় হাঁটুর ওপর চাপ কমায় এবং নিচের অ্যান্টি-স্লিপ গ্রিপ টাইলসে পিছলে যাওয়া রোধ করে।',
    specification: 'আয়তন: ৭০ x ১১৫ সেমি | ওজন: ৯৫০ গ্রাম | বেস: নন-স্লিপ রাবারাইজড ডট গ্রিপ | মূল দেশ: তুরস্ক',
    tags: ['prayer mat', 'janamaz', 'turkish velvet', 'sajadah']
  },
  {
    _id: 'prod-pm-02',
    name: 'Compact Pocket Travel Prayer Mat with Compass',
    nameBn: 'কম্প্যাক্ট ট্রাভেল ওয়াটারপ্রুফ জায়নামাজ (কম্পাসসহ)',
    slug: 'compact-pocket-travel-prayer-mat-compass',
    category: { _id: 'cat-prayer-mats', name: 'Prayer Mats', slug: 'prayer-mats' },
    subcategory: 'Travel Prayer Mats',
    regularPrice: 550,
    sellingPrice: 450,
    stockQuantity: 40,
    stockStatus: 'in_stock',
    brand: 'Thawbin Travel',
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: false,
    featuredImage: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80'
    ],
    dimensions: '60cm x 100cm (Folded: 11cm x 15cm)',
    material: 'Waterproof Polyester with Weighted Corners',
    description: 'সফর বা অফিস ভ্রমণের জন্য অত্যন্ত উপযোগী পকেট সাইজের ওয়াটারপ্রুফ জায়নামাজ। চার কোণায় ছোট ওজন সংযুক্ত থাকায় বাতাসে উড়ে যায় না এবং পাউচে কিবলা কম্পাস রয়েছে।',
    descriptionBn: 'সফর বা অফিস ভ্রমণের জন্য অত্যন্ত উপযোগী পকেট সাইজের ওয়াটারপ্রুফ জায়নামাজ। চার কোণায় ছোট ওজন সংযুক্ত থাকায় বাতাসে উড়ে যায় না এবং পাউচে কিবলা কম্পাস রয়েছে।',
    specification: 'আয়তন: ৬০ x ১০০ সেমি | বৈশিষ্ট্য: কিবলা কম্পাস, কোণায় ব্যালেন্সিং মেটাল, জিপার পাউচ',
    tags: ['travel janamaz', 'prayer mat', 'pocket']
  },

  // ─── 5. Tasbih & Dhikr ─────────────────────────────────────
  {
    _id: 'prod-ts-01',
    name: 'Handcrafted Natural Olive Wood 99 Beads Tasbih',
    nameBn: 'প্রাকৃতিক জলপাই কাঠের ৯৯ দানার তসবিহ',
    slug: 'handcrafted-natural-olive-wood-99-beads-tasbih',
    category: { _id: 'cat-tasbih', name: 'Tasbih & Dhikr', slug: 'tasbih' },
    subcategory: 'Wooden Tasbih',
    regularPrice: 900,
    sellingPrice: 750,
    stockQuantity: 35,
    stockStatus: 'in_stock',
    brand: 'Thawbin Zikr',
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    featuredImage: 'https://images.unsplash.com/photo-1584286595398-a59f21d313f5?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1584286595398-a59f21d313f5?w=800&q=80'
    ],
    beadsCount: 99,
    material: 'Natural Olive Wood with Silk Tassel',
    description: 'জেরুজালেম ও ভূমধ্যসাগরীয় অঞ্চলের প্রাকৃতিক জলপাই কাঠ খোদাই করে তৈরি ৯৯ দানার তসবিহ। মসৃণ দানাগুলো হাতে নেওয়ার সাথে সাথেই আলাদা প্রশান্তি দেয়।',
    descriptionBn: 'জেরুজালেম ও ভূমধ্যসাগরীয় অঞ্চলের প্রাকৃতিক জলপাই কাঠ খোদাই করে তৈরি ৯৯ দানার তসবিহ। মসৃণ দানাগুলো হাতে নেওয়ার সাথে সাথেই আলাদা প্রশান্তি দেয়।',
    specification: 'দানা সংখ্যা: ৯৯ টি (প্রতি ৩৩ দানায় মার্কার) | ব্যাস: ৮ মি.মি. | সুতো: অতিরিক্ত শক্তিশালী বোনা রেশমি সুতো',
    tags: ['tasbih', 'olive wood', 'dhikr', 'wooden beads']
  },

  // ─── 6. Quran & Islamic Books ──────────────────────────────
  {
    _id: 'prod-qb-01',
    name: 'Holy Quran with Color Coded Tajweed & Bengali Translation',
    nameBn: 'পবিত্র কুরআনুল কারীম — তাজবীদ ও বাংলা অনুবাদসহ',
    slug: 'holy-quran-tajweed-bengali-translation',
    category: { _id: 'cat-quran-and-books', name: 'Quran & Books', slug: 'quran-and-books' },
    subcategory: 'Bangla Translation of Quran',
    regularPrice: 1850,
    sellingPrice: 1650,
    stockQuantity: 22,
    stockStatus: 'in_stock',
    brand: 'Islamic Foundation Approved',
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    featuredImage: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&q=80'
    ],
    edition: 'কালার কোডেড তাজবীদ সংস্করণ',
    language: 'আরবি ও বাংলা',
    binding: 'হার্ডবাউন্ড গোল্ড ফয়েল এমবসড',
    description: 'উচ্চমানের আর্ট পেপারে ছাপা কালার কোডেড তাজবীদসহ পবিত্র কুরআনুল কারীম। সহজ বাংলা অনুবাদ থাকায় প্রতিটি আয়াতের মর্মার্থ হৃদয়ঙ্গম করা সহজ হয়।',
    descriptionBn: 'উচ্চমানের আর্ট পেপারে ছাপা কালার কোডেড তাজবীদসহ পবিত্র কুরআনুল কারীম। সহজ বাংলা অনুবাদ থাকায় প্রতিটি আয়াতের মর্মার্থ হৃদয়ঙ্গম করা সহজ হয়।',
    specification: 'সাইজ: রয়েল সাইজ (৭.৫ x ১০ ইঞ্চি) | পৃষ্ঠা: ৮৫০+ | বাঁধাই: উন্নত লেমিনেটেড গোল্ড এমবসড হার্ডকভার | ফন্ট: বড় ও স্পষ্ট উসমানী স্ক্রিপ্ট',
    tags: ['quran', 'holy quran', 'tajweed', 'bangla translation', 'islamic books']
  },
  {
    _id: 'prod-qb-02',
    name: 'Hisnul Muslim (Fortress of the Muslim) Dua Collection',
    nameBn: 'হিসনুল মুসলিম — দৈনন্দিন জিকির ও দোয়ার প্রামাণ্য সংকলন',
    slug: 'hisnul-muslim-dua-collection',
    category: { _id: 'cat-quran-and-books', name: 'Quran & Books', slug: 'quran-and-books' },
    subcategory: 'Dua and Zikr Books',
    regularPrice: 260,
    sellingPrice: 220,
    stockQuantity: 50,
    stockStatus: 'in_stock',
    brand: 'Authentic Sunnah Library',
    isFeatured: false,
    isNewArrival: false,
    isBestSeller: true,
    featuredImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80'
    ],
    edition: 'সহীহ সনদ যাচাইকৃত পকেট সংস্করণ',
    language: 'আরবি, বাংলা উচ্চারণ ও অর্থসহ',
    description: 'রাসূলুল্লাহ (সা.)-এর সুন্নাহ ভিত্তিক দৈনন্দিন সকল মুহূর্তের দোয়া, জিকির ও আমলের নির্ভরযোগ্য পকেট গাইড হিসনুল মুসলিম।',
    descriptionBn: 'রাসূলুল্লাহ (সা.)-এর সুন্নাহ ভিত্তিক দৈনন্দিন সকল মুহূর্তের দোয়া, জিকির ও আমলের নির্ভরযোগ্য পকেট গাইড হিসনুল মুসলিম।',
    specification: 'পৃষ্ঠা: ২৪০ | সংস্করণ: পকেট সাইজ | বিষয়: সকাল-সন্ধ্যার জিকির, বিপদ ও আনন্দের দোয়া',
    tags: ['hisnul muslim', 'dua', 'zikr', 'sunnah']
  },

  // ─── 7. Hijab & Modest Wear ────────────────────────────────
  {
    _id: 'prod-hb-01',
    name: 'Dubai Nidha Premium Classic Black Abaya',
    nameBn: 'দুবাই নিদাহ প্রিমিয়াম ক্লাসিক কালো আবায়া',
    slug: 'dubai-nidha-premium-classic-black-abaya',
    category: { _id: 'cat-hijab-and-abaya', name: 'Hijab & Modest Wear', slug: 'hijab-and-abaya' },
    subcategory: 'Abaya',
    regularPrice: 4100,
    sellingPrice: 3600,
    stockQuantity: 14,
    stockStatus: 'in_stock',
    brand: 'Thawbin Modesty',
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true,
    featuredImage: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&q=80'
    ],
    sizes: ['52', '54', '56'],
    colors: ['Deep Jet Black'],
    fabric: 'Original Dubai Korean Nidha Fabric',
    description: 'খাঁটি দুবাই নিদাহ কাপড়ে তৈরি আরামদায়ক ও মার্জিত কালো আবায়া। ব্রিদেবল ও লাইটওয়েট ফেব্রিক যা বাংলাদেশের আবহাওয়ার জন্য সারাবছর উপযোগী।',
    descriptionBn: 'খাঁটি দুবাই নিদাহ কাপড়ে তৈরি আরামদায়ক ও মার্জিত কালো আবায়া। ব্রিদেবল ও লাইটওয়েট ফেব্রিক যা বাংলাদেশের আবহাওয়ার জন্য সারাবছর উপযোগী।',
    specification: 'ফ্যাব্রিক: অরিজিনাল কোরিয়ান নিদাহ | হাতা: স্ন্যাপ বাটন কাফ | কাটিং: ওয়াইড ফ্লেয়ার বাটারফ্লাই কাট',
    tags: ['abaya', 'hijab', 'burqa', 'dubai nidha', 'modest clothing']
  },

  // ─── 8. Islamic Gifts & Gift Boxes ─────────────────────────
  {
    _id: 'prod-gf-01',
    name: 'Thawbin Deluxe Islamic Gift Box',
    nameBn: 'থওবিন ডিলাক্স ইসলামিক গিফট বক্স',
    slug: 'thawbin-deluxe-islamic-gift-box',
    category: { _id: 'cat-islamic-gifts', name: 'Islamic Gifts', slug: 'islamic-gifts' },
    subcategory: 'Islamic Gift Boxes',
    regularPrice: 4600,
    sellingPrice: 3950,
    stockQuantity: 10,
    stockStatus: 'in_stock',
    brand: 'Thawbin Gift Collection',
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true,
    featuredImage: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80'
    ],
    boxIncludes: 'তুর্কি ভেলভেট জায়নামাজ + ৬মিলি দেহন আল উদ আতর + জলপাই কাঠের ৯৯ দানার তসবিহ + মার্জিত গোল্ড-ফয়েল গিফট বক্স',
    description: 'প্রিয়জনকে উপহার দেওয়ার মতো এক অতুলনীয় ইসলামিক উপহার সেট। সুন্দর উপহার বাক্সে সাজানো প্রিমিয়াম ভেলভেট জায়নামাজ, সুগন্ধি আতর ও কাঠের তসবিহ। নিকাহ, ঈদ বা যেকারো জন্য এক পবিত্র উপহার।',
    descriptionBn: 'প্রিয়জনকে উপহার দেওয়ার মতো এক অতুলনীয় ইসলামিক উপহার সেট। সুন্দর উপহার বাক্সে সাজানো প্রিমিয়াম ভেলভেট জায়নামাজ, সুগন্ধি আতর ও কাঠের তসবিহ। নিকাহ, ঈদ বা যেকারো জন্য এক পবিত্র উপহার।',
    specification: 'বাক্সের বিষয়বস্তু: ১টি তুর্কি জায়নামাজ, ১টি ৬মিলি আতর, ১টি ৯৯ দানার কাঠের তসবিহ, ১টি মোবারকবাদ শুভেচ্ছা কার্ড',
    tags: ['gift box', 'islamic gift', 'ramadan gift', 'eid gift', 'nikah gift']
  },

  // ─── 9. Ramadan & Eid ──────────────────────────────────────
  {
    _id: 'prod-re-01',
    name: 'Medina Pure Ajwa Dates Premium Pack 500g',
    nameBn: 'মদিনার খাঁটি আজওয়া খেজুর (৫০০ গ্রাম প্রিমিয়াম প্যাক)',
    slug: 'medina-pure-ajwa-dates-500g',
    category: { _id: 'cat-ramadan-and-eid', name: 'Ramadan & Eid', slug: 'ramadan-and-eid' },
    subcategory: 'Ramadan Essentials',
    regularPrice: 1400,
    sellingPrice: 1200,
    stockQuantity: 25,
    stockStatus: 'in_stock',
    brand: 'Thawbin Barakah',
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    featuredImage: 'https://images.unsplash.com/photo-1584286595398-a59f21d313f5?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1584286595398-a59f21d313f5?w=800&q=80'
    ],
    weight: '500 Grams Airtight Pack',
    origin: 'Madinah Al-Munawwarah, Saudi Arabia',
    description: 'পবিত্র মদিনা মুনাওয়ারা থেকে সরাসরি আমদানিকৃত ১০০% খাঁটি গ্রেড-১ আজওয়া খেজুর। ইফতার ও বরকতপূর্ণ খাবারের জন্য উৎকৃষ্ট খাদ্যগুণসমৃদ্ধ নির্বাচন।',
    descriptionBn: 'পবিত্র মদিনা মুনাওয়ারা থেকে সরাসরি আমদানিকৃত ১০০% খাঁটি গ্রেড-১ আজওয়া খেজুর। ইফতার ও বরকতপূর্ণ খাবারের জন্য উৎকৃষ্ট খাদ্যগুণসমৃদ্ধ নির্বাচন।',
    specification: 'উৎস: মদিনা শরীফ, সৌদি আরব | ওজন: ৫০০ গ্রাম | প্যাকেজিং: ফুড গ্রেড ভ্যাকুয়াম সিল প্যাক',
    tags: ['dates', 'ajwa', 'ramadan', 'iftar', 'barakah']
  },

  // ─── 10. Hajj & Umrah ──────────────────────────────────────
  {
    _id: 'prod-hu-01',
    name: 'Pure Egyptian Cotton Seamless Ihram Towels (Set of 2)',
    nameBn: 'খাঁটি মিশরীয় তুলার ইহরাম কাপড় (২ পিস সেট)',
    slug: 'egyptian-cotton-seamless-ihram-towels',
    category: { _id: 'cat-hajj-and-umrah', name: 'Hajj & Umrah', slug: 'hajj-and-umrah' },
    subcategory: 'Ihram Clothing',
    regularPrice: 2200,
    sellingPrice: 1850,
    stockQuantity: 18,
    stockStatus: 'in_stock',
    brand: 'Thawbin Pilgrimage',
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: false,
    featuredImage: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&q=80'
    ],
    dimensions: '110cm x 220cm each towel (1200 GSM Heavy Absorbent)',
    material: '100% Cotton Terry Jacquard',
    description: 'হজ ও ওমরাহর জন্য প্রস্তুত করা সেলাইবিহীন খাঁটি সুতি ইহরামের চাদর জোড়া। ঘাম শোষণ ক্ষমতা বেশি ও ত্বকবান্ধব হওয়ায় তাওয়াফ ও সাঈর সময়ে শরীর আরামদায়ক রাখে।',
    descriptionBn: 'হজ ও ওমরাহর জন্য প্রস্তুত করা সেলাইবিহীন খাঁটি সুতি ইহরামের চাদর জোড়া। ঘাম শোষণ ক্ষমতা বেশি ও ত্বকবান্ধব হওয়ায় তাওয়াফ ও সাঈর সময়ে শরীর আরামদায়ক রাখে।',
    specification: 'সেট: ২টি বড় চাদর | ওজন: প্রায় ১২০০ গ্রাম | সাইজ: ১১০ x ২২০ সেমি',
    tags: ['ihram', 'hajj', 'umrah', 'pilgrimage', 'cotton towels']
  },

  // ─── 11. Islamic Home & Lifestyle ──────────────────────────
  {
    _id: 'prod-ls-01',
    name: 'Ayatul Kursi Gold Calligraphy Acrylic Wall Art',
    nameBn: 'আয়াতুল কুরসি গোল্ড ক্যালিগ্রাফি ওয়াল আর্ট',
    slug: 'ayatul-kursi-gold-calligraphy-acrylic-wall-art',
    category: { _id: 'cat-islamic-lifestyle', name: 'Islamic Home & Lifestyle', slug: 'islamic-lifestyle' },
    subcategory: 'Islamic Wall Art & Calligraphy',
    regularPrice: 3200,
    sellingPrice: 2750,
    stockQuantity: 12,
    stockStatus: 'in_stock',
    brand: 'Thawbin Sanctum',
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true,
    featuredImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&q=80'
    ],
    dimensions: '24 x 18 inches (3D Shiny Mirror Acrylic + Wood Backing)',
    material: 'Premium Mirror Acrylic on Compressed Wood',
    description: 'ঘরের দেয়ালে মার্জিত ইসলামিক নান্দনিকতা আনতে ৩ডি গোল্ডেন আয়াতুল কুরসি ক্যালিগ্রাফি ফ্রেম। বৈঠকখানা বা নামাজের স্থানে আনে আধ্যাত্মিক আবহ।',
    descriptionBn: 'ঘরের দেয়ালে মার্জিত ইসলামিক নান্দনিকতা আনতে ৩ডি গোল্ডেন আয়াতুল কুরসি ক্যালিগ্রাফি ফ্রেম। বৈঠকখানা বা নামাজের স্থানে আনে আধ্যাত্মিক আবহ।',
    specification: 'সাইজ: ২৪ x ১৮ ইঞ্চি | উপাদান: গোল্ডেন মিরর অ্যাক্রিলিক | মাউন্টিং: ব্যাক হ্যাঙ্গারসহ ইনস্টলেশন প্রস্তুত',
    tags: ['calligraphy', 'wall art', 'ayatul kursi', 'islamic home', 'decor']
  },
  {
    _id: 'prod-ls-02',
    name: 'Carved Rosewood Folding Quran Stand (Rehal)',
    nameBn: 'খোদাই করা মেহগনি/শীশম কাঠের ফোল্ডিং রেহাল',
    slug: 'carved-rosewood-folding-quran-stand-rehal',
    category: { _id: 'cat-islamic-lifestyle', name: 'Islamic Home & Lifestyle', slug: 'islamic-lifestyle' },
    subcategory: 'Quran Stands (Rehal)',
    regularPrice: 1350,
    sellingPrice: 1150,
    stockQuantity: 16,
    stockStatus: 'in_stock',
    brand: 'Thawbin Craft',
    isFeatured: false,
    isNewArrival: false,
    isBestSeller: true,
    featuredImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80'
    ],
    dimensions: '14 inches Solid Handcrafted Wood',
    material: 'Natural Solid Rosewood',
    description: 'খাঁটি শক্ত কাঠে সুন্দর ইসলামিক জ্যামিতিক নকশায় খোদাই করা ফোল্ডিং রেহাল। কুরআন তিলাওয়াতের সময় অত্যন্ত সুবিধাজনক ও টেকসই।',
    descriptionBn: 'খাঁটি শক্ত কাঠে সুন্দর ইসলামিক জ্যামিতিক নকশায় খোদাই করা ফোল্ডিং রেহাল। কুরআন তিলাওয়াতের সময় অত্যন্ত সুবিধাজনক ও টেকসই।',
    specification: 'উপাদান: প্রাকৃতিক সলিড শীশম/মেহগনি কাঠ | সাইজ: ১৪ ইঞ্চি | ফিনিশ: ন্যাচারাল ল্যাকার পলিশ',
    tags: ['rehal', 'quran stand', 'wooden rehal']
  }
];

// Helper functions for data access
export function getAllIslamicCategories() {
  return ISLAMIC_CATEGORIES;
}

export function getIslamicCategoryBySlug(slug) {
  return ISLAMIC_CATEGORIES.find(c => c.slug === slug) || null;
}

export function getAllIslamicProducts() {
  return ISLAMIC_PRODUCTS;
}

export function getFeaturedIslamicProducts(limit = 8) {
  return ISLAMIC_PRODUCTS.filter(p => p.isFeatured).slice(0, limit);
}

export function getNewArrivalIslamicProducts(limit = 4) {
  return ISLAMIC_PRODUCTS.filter(p => p.isNewArrival).slice(0, limit);
}

export function getBestSellerIslamicProducts(limit = 4) {
  return ISLAMIC_PRODUCTS.filter(p => p.isBestSeller).slice(0, limit);
}

export function getIslamicProductsByCategory(slug) {
  return ISLAMIC_PRODUCTS.filter(p => p.category?.slug === slug);
}

export function getIslamicProductBySlug(slug) {
  return ISLAMIC_PRODUCTS.find(p => p.slug === slug) || null;
}
