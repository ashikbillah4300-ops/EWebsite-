'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, Loader2, Sparkles, Gift, BookOpen, Heart, 
  HelpCircle, ChevronDown, CheckCircle2, ShieldCheck, Truck, RotateCcw
} from 'lucide-react';
import HeroBanner from './components/HeroBanner';
import Features from './components/Features';
import ProductCard from './components/ProductCard';
import { 
  ISLAMIC_CATEGORIES, 
  ISLAMIC_PRODUCTS, 
  getFeaturedIslamicProducts, 
  getNewArrivalIslamicProducts, 
  getBestSellerIslamicProducts 
} from '@/lib/islamicCatalog';

// ─── Theme Colors ───────────────────────────────────────────
const THEME = {
  darkChocolate: '#2B1B16',
  deepBrown:     '#3A251E',
  warmCream:     '#F7F1E8',
  softBeige:     '#E7D7C4',
  mutedGold:     '#B89558',
  text:          '#2A211D',
  white:         '#FFFFFF',
  border:        '#E7DED5',
  mutedText:     '#80736B',
};

// ─── Section 4: Approved Category Cards ────────────────────
const categoryCards = [
  {
    nameBn: 'পাঞ্জাবি',
    nameEn: 'Panjabi',
    slug: 'panjabi',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&q=80',
    desc: 'প্রিমিয়াম সুতি ও কাবলি'
  },
  {
    nameBn: 'আতর ও সুগন্ধি',
    nameEn: 'Attar',
    slug: 'attar',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&q=80',
    desc: 'অ্যালকোহলমুক্ত দেহন আল উদ'
  },
  {
    nameBn: 'টুপি ও এক্সেসরিজ',
    nameEn: 'Topi',
    slug: 'topi',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&q=80',
    desc: 'তুর্কি ও ওমানি নামাজি টুপি'
  },
  {
    nameBn: 'জায়নামাজ',
    nameEn: 'Prayer Mats',
    slug: 'prayer-mats',
    image: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=600&q=80',
    desc: 'তুর্কি ভেলভেট ও অর্থোপেডিক'
  },
  {
    nameBn: 'তসবিহ ও জিকির',
    nameEn: 'Tasbih',
    slug: 'tasbih',
    image: 'https://images.unsplash.com/photo-1584286595398-a59f21d313f5?w=600&q=80',
    desc: 'জলপাই কাঠ ও ডিজিটাল তসবিহ'
  },
  {
    nameBn: 'কুরআন ও ইসলামিক বই',
    nameEn: 'Quran & Books',
    slug: 'quran-and-books',
    image: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=600&q=80',
    desc: 'তাজবীদসহ কুরআন ও হাদিস'
  },
  {
    nameBn: 'হিজাব ও আবায়া',
    nameEn: 'Hijab & Abaya',
    slug: 'hijab-and-abaya',
    image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=600&q=80',
    desc: 'দুবাই নিদাহ ও তুর্কি হিজাব'
  },
  {
    nameBn: 'ইসলামিক গিফট',
    nameEn: 'Islamic Gifts',
    slug: 'islamic-gifts',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&q=80',
    desc: 'উপহার বক্স ও কম্বো প্যাকেজ'
  },
  {
    nameBn: 'হজ ও ওমরাহ',
    nameEn: 'Hajj & Umrah',
    slug: 'hajj-and-umrah',
    image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=600&q=80',
    desc: 'ইহরাম ও সফরের সামগ্রী'
  },
];

// ─── Section 8: Collections Data ───────────────────────────
const curatedCollections = [
  {
    id: 'col-1',
    titleBn: 'প্রিমিয়াম পাঞ্জাবি কালেকশন',
    titleEn: 'Premium Panjabi Collection',
    desc: 'খাঁটি কম্বড সুতির কাবলি ও নামাজি পাঞ্জাবির অনন্য সম্ভার',
    link: '/category/panjabi',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&q=80'
  },
  {
    id: 'col-2',
    titleBn: 'অ্যারাবিয়ান আতর কালেকশন',
    titleEn: 'Arabian Attar Collection',
    desc: '১০০% অ্যালকোহলমুক্ত দেহন আল উদ ও কস্তুরী মাস্কের খাঁটি সুবাস',
    link: '/category/attar',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&q=80'
  },
  {
    id: 'col-3',
    titleBn: 'প্রতিদিনের নামাজের সামগ্রী',
    titleEn: 'Everyday Prayer Essentials',
    desc: 'তুর্কি ভেলভেট জায়নামাজ, জলপাই কাঠের তসবিহ ও নামাজি টুপি',
    link: '/category/prayer-mats',
    image: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=600&q=80'
  },
  {
    id: 'col-4',
    titleBn: 'ইসলামিক উপহার কালেকশন',
    titleEn: 'Islamic Gift Collection',
    desc: 'নিকাহ, ঈদ ও বিশেষ মুহূর্তে প্রিয়জনকে দেওয়ার মতো উপহার বক্স',
    link: '/category/islamic-gifts',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&q=80'
  },
  {
    id: 'col-5',
    titleBn: 'রমজান ও ঈদ কালেকশন',
    titleEn: 'Ramadan and Eid Collection',
    desc: 'মদিনার খাঁটি আজওয়া খেজুর, ইসলামিক লণ্ঠন ও বরকতপূর্ণ সামগ্রী',
    link: '/category/ramadan-and-eid',
    image: 'https://images.unsplash.com/photo-1584286595398-a59f21d313f5?w=600&q=80'
  },
];

// ─── Section 11: Genuine Trust & FAQ ───────────────────────
const faqs = [
  {
    q: 'Thawbin-এর আতর কি সম্পূর্ণ অ্যালকোহলমুক্ত?',
    a: 'হ্যাঁ, Thawbin-এর প্রতিটি আতর শতভাগ অ্যালকোহলমুক্ত খাঁটি কনসেনট্রেটেড পারফিউম অয়েল (Concentrated Perfume Oil), যা নামাজ ও ইবাদতের জন্য সম্পূর্ণরূপে হালাল ও পবিত্র।'
  },
  {
    q: 'ডেলিভারি কত দিনের মধ্যে পাওয়া যায়?',
    a: 'ঢাকা সিটির মধ্যে ২৪ থেকে ৪৮ ঘণ্টার মধ্যে এবং ঢাকার বাইরে সারাদেশের যেকোনো জেলায় ২ থেকে ৩ কার্যদিবসের মধ্যে হোম ডেলিভারি পৌঁছে দেওয়া হয়।'
  },
  {
    q: 'ক্যাশ অন ডেলিভারি (COD) সুবিধা আছে কি?',
    a: 'হ্যাঁ, সারাদেশে পণ্য হাতে পেয়ে দেখে মূল্য পরিশোধের (Cash on Delivery) নির্ভরযোগ্য সুবিধা রয়েছে। এছাড়াও bKash, Nagad বা কার্ডের মাধ্যমে পেমেন্ট করতে পারবেন।'
  },
  {
    q: 'সাইজ না মিললে বা সমস্যা থাকলে কি পরিবর্তন (Exchange) সম্ভব?',
    a: 'হ্যাঁ, পণ্য পাওয়ার পর সাইজ সমস্যা হলে ৭ দিনের মধ্যে আমাদের কাস্টমার সার্ভিসের মাধ্যমে অতি সহজেই এক্সচেঞ্জ বা রিটার্ন করতে পারবেন।'
  }
];

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState(getFeaturedIslamicProducts(8));
  const [newArrivals, setNewArrivals] = useState(getNewArrivalIslamicProducts(4));
  const [bestSellers, setBestSellers] = useState(getBestSellerIslamicProducts(4));
  const [giftProducts, setGiftProducts] = useState(ISLAMIC_PRODUCTS.filter(p => p.category?.slug === 'islamic-gifts'));
  const [loading, setLoading] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const [fRes, nRes] = await Promise.all([
        fetch('/api/products?featured=true&limit=8'),
        fetch('/api/products?isNewArrival=true&limit=4'),
      ]);
      const [fData, nData] = await Promise.all([fRes.json(), nRes.json()]);

      if (fData.products && fData.products.length > 0) {
        setFeaturedProducts(fData.products);
      }
      if (nData.products && nData.products.length > 0) {
        setNewArrivals(nData.products);
      }
    } catch (e) {
      // Fallback already initialized from lib/islamicCatalog
    }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterStatus('Thawbin নিউজলেটারে সফলভাবে সাবস্ক্রাইব করার জন্য ধন্যবাদ!');
    setNewsletterEmail('');
  };

  return (
    <div style={{ background: THEME.warmCream, minHeight: '100vh', color: THEME.text }}>

      {/* ── Section 3: Hero Banner ──────────────────────────── */}
      <HeroBanner />

      {/* ── Features Strip ─────────────────────────────────── */}
      <Features />

      {/* ── Section 4: Shop by Category ─────────────────────── */}
      <section className="py-10 md:py-16" style={{ background: THEME.white }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-8 md:mb-10">
            <div>
              <p className="text-xs uppercase tracking-widest font-bold mb-1.5" style={{ color: THEME.mutedGold }}>
                ক্যাটাগরি সমূহ
              </p>
              <h2 className="text-2xl md:text-3xl font-black" style={{ color: THEME.darkChocolate, fontFamily: "'Playfair Display', serif" }}>
                Shop by Category
              </h2>
            </div>
            <Link
              href="/categories"
              className="inline-flex items-center gap-1.5 text-xs md:text-sm font-bold transition-all hover:text-[#B89558]"
              style={{ color: THEME.darkChocolate }}
            >
              <span>সকল ক্যাটাগরি দেখুন</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-6">
            {categoryCards.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="group relative rounded-2xl md:rounded-3xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                style={{ border: `1px solid ${THEME.border}`, background: THEME.warmCream }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.nameBn}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Gradient Overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(180deg, rgba(43,27,22,0.1) 0%, rgba(43,27,22,0.85) 100%)',
                    }}
                  />
                  <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-end">
                    <span className="text-[10px] md:text-xs font-semibold text-[#E7D7C4] tracking-wider uppercase">
                      {cat.nameEn}
                    </span>
                    <h3 className="text-base md:text-xl font-bold text-white mb-0.5 leading-snug">
                      {cat.nameBn}
                    </h3>
                    <p className="text-[11px] md:text-xs text-[#E7D7C4]/90 line-clamp-1">
                      {cat.desc}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 5: Featured Products (বাছাইকৃত ইসলামিক পণ্য) */}
      <section className="py-10 md:py-16" style={{ background: THEME.warmCream }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-8 md:mb-10">
            <div>
              <p className="text-xs uppercase tracking-widest font-bold mb-1.5" style={{ color: THEME.mutedGold }}>
                বাছাইকৃত সংগ্রহ
              </p>
              <h2 className="text-2xl md:text-3xl font-black" style={{ color: THEME.darkChocolate, fontFamily: "'Playfair Display', serif" }}>
                Featured Products
              </h2>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 text-xs md:text-sm font-bold transition-all hover:text-[#B89558]"
              style={{ color: THEME.darkChocolate }}
            >
              <span>সকল পণ্য দেখুন</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {featuredProducts.slice(0, 8).map((product) => (
              <ProductCard key={product._id || product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 6: New Arrivals (নতুন আগমন) ──────────────── */}
      <section className="py-10 md:py-16" style={{ background: THEME.white }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-8 md:mb-10">
            <div>
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white mb-2"
                style={{ background: THEME.mutedGold }}>
                নতুন কালেকশন
              </span>
              <h2 className="text-2xl md:text-3xl font-black" style={{ color: THEME.darkChocolate, fontFamily: "'Playfair Display', serif" }}>
                New Arrivals
              </h2>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 text-xs md:text-sm font-bold transition-all hover:text-[#B89558]"
              style={{ color: THEME.darkChocolate }}
            >
              <span>সকল নতুন পণ্য</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product._id || product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 7: Best Sellers (জনপ্রিয় পণ্য) ────────────── */}
      <section className="py-10 md:py-16" style={{ background: THEME.warmCream }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-8 md:mb-10">
            <div>
              <p className="text-xs uppercase tracking-widest font-bold mb-1.5" style={{ color: THEME.mutedGold }}>
                সবার পছন্দের তালিকায়
              </p>
              <h2 className="text-2xl md:text-3xl font-black" style={{ color: THEME.darkChocolate, fontFamily: "'Playfair Display', serif" }}>
                জনপ্রিয় ইসলামিক পণ্য (Best Sellers)
              </h2>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 text-xs md:text-sm font-bold transition-all hover:text-[#B89558]"
              style={{ color: THEME.darkChocolate }}
            >
              <span>সকল পণ্য</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product._id || product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 8: Shop by Collection ─────────────────────── */}
      <section className="py-10 md:py-16" style={{ background: THEME.white }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-xs uppercase tracking-widest font-bold mb-2" style={{ color: THEME.mutedGold }}>
              বিশেষায়িত সংগ্রহ
            </p>
            <h2 className="text-2xl md:text-4xl font-black mb-3" style={{ color: THEME.darkChocolate, fontFamily: "'Playfair Display', serif" }}>
              Shop by Collection
            </h2>
            <p className="text-sm" style={{ color: THEME.mutedText }}>
              আপনার প্রয়োজনীয়তা অনুযায়ী সাজানো Thawbin-এর চমৎকার ইসলামিক সংগ্রহশালা
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {curatedCollections.map((col) => (
              <Link
                key={col.id}
                href={col.link}
                className="group relative rounded-2xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 block"
                style={{ border: `1px solid ${THEME.border}` }}
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={col.image}
                    alt={col.titleBn}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(180deg, rgba(43,27,22,0.15) 0%, rgba(43,27,22,0.92) 100%)',
                    }}
                  />
                  <div className="absolute inset-0 p-4 flex flex-col justify-end text-center items-center">
                    <h3 className="text-base font-bold text-white mb-1 leading-snug">
                      {col.titleBn}
                    </h3>
                    <p className="text-[11px] text-[#E7D7C4]/90 mb-3 line-clamp-2">
                      {col.desc}
                    </p>
                    <span
                      className="px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider"
                      style={{ background: THEME.mutedGold }}
                    >
                      কালেকশন দেখুন →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 9: Islamic Gift Collection (ইসলামিক উপহার) ── */}
      <section className="py-12 md:py-18" style={{ background: THEME.darkChocolate, color: THEME.white }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-3 tracking-wider text-white"
                style={{ background: THEME.mutedGold }}>
                <Gift size={13} />
                <span>উপহার ও বরকত</span>
              </div>
              <h2 className="text-2xl md:text-4xl font-black text-[#F7F1E8]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Islamic Gift Collection
              </h2>
              <p className="text-xs md:text-sm mt-2 max-w-xl text-[#E7D7C4]">
                নিকাহ, আকিকা, ঈদ কিংবা প্রিয়জনকে উপহার দিতে খাঁটি জায়নামাজ, দেহন আল উদ আতর ও জলপাই কাঠের তসবিহ সম্বলিত প্রিমিয়াম উপহার বক্স।
              </p>
            </div>
            <Link
              href="/category/islamic-gifts"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold text-white transition-all shadow-md hover:scale-105"
              style={{ background: THEME.mutedGold }}
            >
              <span>সকল গিফট বক্স দেখুন</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {giftProducts.map((product) => (
              <div
                key={product._id || product.slug}
                className="rounded-3xl overflow-hidden p-4 flex flex-col justify-between transition-all hover:shadow-2xl"
                style={{ background: '#3A251E', border: '1px solid rgba(184,149,88,0.3)' }}
              >
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-4">
                  <img
                    src={product.featuredImage}
                    alt={product.nameBn}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <span
                    className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg text-white text-[10px] font-bold"
                    style={{ background: THEME.mutedGold }}
                  >
                    রেডি গিফট প্যাকেজিং
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#F7F1E8] mb-1">
                    {product.nameBn}
                  </h3>
                  <p className="text-xs text-[#E7D7C4] mb-4 line-clamp-2 leading-relaxed">
                    {product.descriptionBn}
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <span className="text-xl font-black text-[#B89558]">
                      ৳{product.sellingPrice.toLocaleString()}
                    </span>
                    <Link
                      href={`/product/${product.slug}`}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-white transition-all hover:opacity-90"
                      style={{ background: THEME.mutedGold }}
                    >
                      অর্ডার করুন
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 10: Brand Introduction ────────────────────── */}
      <section className="py-12 md:py-20" style={{ background: THEME.white }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm"
            style={{ background: THEME.warmCream, border: `1.5px solid ${THEME.mutedGold}` }}>
            <Sparkles className="w-6 h-6" style={{ color: THEME.mutedGold }} />
          </div>

          <h2 className="text-2xl md:text-4xl font-black mb-4 leading-tight"
            style={{ color: THEME.darkChocolate, fontFamily: "'Playfair Display', serif" }}>
            Thawbin — ইসলামিক পণ্যের বিশ্বস্ত ঠিকানা
          </h2>

          <p className="text-sm md:text-base leading-relaxed mb-6" style={{ color: THEME.text }}>
            থওবিন (Thawbin) বাংলাদেশের মুসলিম ভাই-বোনদের জন্য তৈরি একটি নির্ভরযোগ্য ইসলামিক লাইফস্টাইল ও ফ্যাশন প্ল্যাটফর্ম।
            আমরা নিয়ে এসেছি ১০০% কম্বড সুতির শালীন পাঞ্জাবি ও জুব্বা, সম্পূর্ণ অ্যালকোহলমুক্ত খাঁটি আতর, তুরস্কের আরামদায়ক
            ভেলভেট জায়নামাজ, হস্তনির্মিত প্রাকৃতিক কাঠের তসবিহ, প্রামাণ্য ইসলামিক গ্রন্থাবলী এবং মার্জিত ইসলামিক উপহার সামগ্রী।
          </p>

          <p className="text-xs md:text-sm leading-relaxed max-w-2xl mx-auto" style={{ color: THEME.mutedText }}>
            আমাদের প্রতিটি পণ্য নির্বাচিত হয় মান, শালীনতা ও ব্যবহারিক উপযোগিতার মাপকাঠিতে। স্বচ্ছ কেনাকাটার নিশ্চয়তা ও
            সারাদেশে দ্রুত হোম ডেলিভারির মাধ্যমে আপনার ইসলামিক লাইফস্টাইলকে সুন্দর করে তোলাই আমাদের উদ্দেশ্য।
          </p>
        </div>
      </section>

      {/* ── Section 11: Customer Service, Trust & FAQ ─────────── */}
      <section className="py-12 md:py-16" style={{ background: THEME.warmCream }}>
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-widest font-bold mb-1.5" style={{ color: THEME.mutedGold }}>
              স্বচ্ছ ও নির্ভরযোগ্য সেবা
            </p>
            <h2 className="text-2xl md:text-3xl font-black" style={{ color: THEME.darkChocolate, fontFamily: "'Playfair Display', serif" }}>
              কাস্টমার সার্ভিস ও সাধারণ জিজ্ঞাসা (FAQ)
            </h2>
          </div>

          {/* Genuine Policies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <div className="p-5 rounded-2xl bg-white border border-[#E7DED5] flex items-start gap-3.5">
              <Truck className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: THEME.mutedGold }} />
              <div>
                <h3 className="font-bold text-sm text-[#2B1B16] mb-1">দ্রুত ডেলিভারি নীতি</h3>
                <p className="text-xs text-[#80736B] leading-relaxed">
                  ঢাকায় ২৪-৪৮ ঘণ্টা, সারাদেশে ২-৩ কার্যদিবস। ক্যাশ অন ডেলিভারি সুবিধা প্রযোজ্য।
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#E7DED5] flex items-start gap-3.5">
              <RotateCcw className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: THEME.mutedGold }} />
              <div>
                <h3 className="font-bold text-sm text-[#2B1B16] mb-1">৭ দিনের এক্সচেঞ্জ পলিসি</h3>
                <p className="text-xs text-[#80736B] leading-relaxed">
                  পাঞ্জাবি বা পোশাকের সাইজে গরমিল হলে সহজ উপায়ে ৭ দিনের মধ্যে এক্সচেঞ্জ সুবিধা।
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#E7DED5] flex items-start gap-3.5">
              <ShieldCheck className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: THEME.mutedGold }} />
              <div>
                <h3 className="font-bold text-sm text-[#2B1B16] mb-1">নিরাপদ চেকআউট</h3>
                <p className="text-xs text-[#80736B] leading-relaxed">
                  ক্যাশ অন ডেলিভারি, bKash ও Nagad-এ শতভাগ সুরক্ষিত ও নির্ভরযোগ্য লেনদেন।
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Accordions */}
          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl transition-all overflow-hidden"
                  style={{ background: THEME.white, border: `1px solid ${THEME.border}` }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 md:p-5 text-left font-bold text-xs md:text-sm flex items-center justify-between gap-4"
                    style={{ color: THEME.darkChocolate }}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={18}
                      className={`transition-transform flex-shrink-0 text-[#B89558] ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 md:px-5 md:pb-5 text-xs md:text-sm leading-relaxed border-t border-[#E7DED5]/60 pt-3"
                      style={{ color: THEME.text }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Section 12: Newsletter ────────────────────────────── */}
      <section className="py-12 md:py-16" style={{ background: THEME.darkChocolate, color: THEME.white }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-xs uppercase tracking-widest font-bold mb-2 text-[#B89558]">
            যুক্ত থাকুন Thawbin পরিবারের সাথে
          </p>
          <h2 className="text-2xl md:text-3xl font-black mb-3 text-[#F7F1E8]" style={{ fontFamily: "'Playfair Display', serif" }}>
            নতুন কালেকশন ও ঈদ অফারের আপডেট পান
          </h2>
          <p className="text-xs md:text-sm mb-6 text-[#E7D7C4] max-w-lg mx-auto">
            আপনার ইমেইল দিয়ে সাবস্ক্রাইব করুন। কোনো স্প্যাম ছাড়া শুধুমাত্র প্রয়োজনীয় ইসলামিক কালেকশন ও স্পেশাল ছাড়ের আপডেট জানানো হবে।
          </p>

          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="আপনার ইমেইল ঠিকানা দিন..."
              required
              className="flex-1 px-4 py-3 rounded-xl text-sm focus:outline-none"
              style={{ background: THEME.warmCream, border: `1px solid ${THEME.border}`, color: THEME.text }}
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl font-bold text-sm text-white transition-all shadow-md hover:scale-105 active:scale-95"
              style={{ background: THEME.mutedGold }}
            >
              সাবস্ক্রাইব
            </button>
          </form>

          {newsletterStatus && (
            <p className="mt-4 text-xs font-semibold text-[#B89558] flex items-center justify-center gap-1.5">
              <CheckCircle2 size={14} />
              <span>{newsletterStatus}</span>
            </p>
          )}

          <p className="text-[11px] mt-4 text-[#E7D7C4]/60">
            আমরা আপনার গোপনীয়তা রক্ষা করি। যেকোনো সময় আনসাবস্ক্রাইব করতে পারবেন।
          </p>
        </div>
      </section>

    </div>
  );
}
