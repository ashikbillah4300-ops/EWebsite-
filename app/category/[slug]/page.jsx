import Link from 'next/link';
import ProductCard from '../../components/ProductCard';
import { ChevronRight, ArrowLeft, Sparkles } from 'lucide-react';
import { 
  getIslamicCategoryBySlug, 
  getIslamicProductsByCategory, 
  ISLAMIC_CATEGORIES 
} from '@/lib/islamicCatalog';

export async function generateMetadata({ params }) {
  const cat = getIslamicCategoryBySlug(params.slug);
  return {
    title: cat ? `${cat.nameBn} (${cat.name}) — AWBIN` : 'ক্যাটাগরি — AWBIN',
    description: cat?.description || 'AWBIN ইসলামিক পণ্য সংগ্রহ',
  };
}

export default function CategoryPage({ params }) {
  const { slug } = params;
  const category = getIslamicCategoryBySlug(slug);
  const products = getIslamicProductsByCategory(slug);

  const titleBn = category?.nameBn || slug;
  const titleEn = category?.name || '';

  return (
    <div className="min-h-screen py-8 md:py-12" style={{ background: '#FAF6F0', color: '#2A211D' }}>
      <div className="max-w-7xl mx-auto px-4">

        {/* ── Breadcrumb ────────────────────────────────────────────── */}
        <div className="flex items-center gap-2 text-xs text-[#80736B] mb-6">
          <Link href="/" className="hover:text-[#2B1B16]">হোম</Link>
          <ChevronRight size={13} />
          <Link href="/categories" className="hover:text-[#2B1B16]">ক্যাটাগরি সমূহ</Link>
          <ChevronRight size={13} />
          <span className="text-[#2B1B16] font-semibold">{titleBn}</span>
        </div>

        {/* ── Category Header Banner ────────────────────────────────── */}
        <div
          className="rounded-3xl p-6 md:p-10 mb-8 relative overflow-hidden shadow-sm"
          style={{
            background: 'linear-gradient(135deg, #2B1B16 0%, #3A251E 100%)',
            border: '1px solid rgba(184,149,88,0.3)',
            color: '#FFFFFF'
          }}
        >
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-3 tracking-wider"
              style={{ background: '#B89558', color: '#FFFFFF' }}>
              <span>{category?.icon || '🕌'}</span>
              <span>ইসলামিক কালেকশন</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-black mb-2 text-[#F7F1E8]" style={{ fontFamily: "'Playfair Display', serif" }}>
              {titleBn}
            </h1>
            {titleEn && (
              <p className="text-xs uppercase tracking-widest text-[#B89558] font-bold mb-2">
                {titleEn}
              </p>
            )}
            <p className="text-xs md:text-sm text-[#E7D7C4] leading-relaxed">
              {category?.description || 'AWBIN-এর খাঁটি ও বিশ্বস্ত ইসলামিক পণ্য সম্ভার'}
            </p>
          </div>
        </div>

        {/* ── Subcategories Pills if available ───────────────────────── */}
        {category?.subcategories && category.subcategories.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar mb-8 pb-1">
            <span className="text-xs font-bold text-[#80736B] whitespace-nowrap mr-1">
              সাবক্যাটাগরি:
            </span>
            {category.subcategories.map((sub) => (
              <span
                key={sub._id || sub.name}
                className="px-3 py-1.5 rounded-xl text-xs font-medium bg-white border border-[#E7DED5] text-[#2B1B16] whitespace-nowrap shadow-2xs"
              >
                {sub.nameBn || sub.name}
              </span>
            ))}
          </div>
        )}

        {/* ── Products List or Empty State ───────────────────────────── */}
        {products.length > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-4 px-1">
              <p className="text-xs text-[#80736B]">
                মোট <span className="font-bold text-[#2B1B16]">{products.length}</span> টি পণ্য পাওয়া গেছে
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
              {products.map((product) => (
                <ProductCard key={product._id || product.slug} product={product} />
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-10 md:p-14 text-center border border-[#E7DED5] shadow-sm max-w-lg mx-auto">
            <p className="text-base font-bold text-[#2B1B16] mb-2">
              বর্তমানে এই ক্যাটাগরিতে নতুন পণ্য আপলোড প্রক্রিয়াধীন রয়েছে।
            </p>
            <p className="text-xs text-[#80736B] mb-5">
              অন্যান্য ইসলামিক কালেকশন দেখতে আমাদের সম্পূর্ণ দোকান ঘুরে দেখুন।
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white transition-all"
              style={{ background: '#2B1B16' }}
            >
              <ArrowLeft size={14} />
              <span>সকল পণ্য দেখুন</span>
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
