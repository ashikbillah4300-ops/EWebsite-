import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ISLAMIC_CATEGORIES } from '@/lib/islamicCatalog';

export const metadata = {
  title: 'সকল ইসলামিক ক্যাটাগরি — AWBIN',
  description: 'AWBIN-এর সকল অনুমোদিত ইসলামিক ক্যাটাগরি ব্রাউজ করুন। পাঞ্জাবি, আতর, জায়নামাজ, টুপি, তসবিহ, কুরআন ও ইসলামিক বই।',
};

export default function CategoriesPage() {
  return (
    <div className="min-h-screen py-8 md:py-14" style={{ background: '#FAF6F0', color: '#2A211D' }}>
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-3 tracking-wider text-white"
            style={{ background: '#B89558' }}>
            <Sparkles size={12} />
            <span>ইসলামিক সংগ্রহ</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black mb-3 text-[#2B1B16]" style={{ fontFamily: "'Playfair Display', serif" }}>
            সকল ইসলামিক ক্যাটাগরি
          </h1>
          <p className="text-xs md:text-sm text-[#80736B]">
            আপনার প্রয়োজনীয় পণ্য সহজে খুঁজে নিতে নিচের ইসলামিক ক্যাটাগরিগুলো থেকে নির্বাচন করুন
          </p>
        </div>

        {/* Categories Grid (Top 6 Categories) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
          {ISLAMIC_CATEGORIES.slice(0, 6).map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="group bg-white rounded-3xl p-5 border border-[#E7DED5] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-[#F7F1E8]">
                  <img
                    src={cat.image}
                    alt={cat.nameBn}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  <span className="absolute top-2.5 right-2.5 text-2xl p-2 rounded-xl bg-white/90 backdrop-blur-sm shadow-sm">
                    {cat.icon}
                  </span>
                </div>

                <h3 className="font-bold text-base md:text-lg text-[#2B1B16] group-hover:text-[#B89558] transition-colors mb-1">
                  {cat.nameBn}
                </h3>
                <p className="text-[11px] font-semibold text-[#80736B] uppercase tracking-wider mb-2">
                  {cat.name}
                </p>
                <p className="text-xs text-[#80736B] line-clamp-2 leading-relaxed mb-4">
                  {cat.description}
                </p>
              </div>

              {/* Subcategories preview */}
              <div className="pt-3 border-t border-[#E7DED5] flex items-center justify-between text-xs font-bold text-[#B89558]">
                <span>{cat.subcategories?.length || 0} টি সাবক্যাটাগরি</span>
                <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  দেখুন <ArrowRight size={13} />
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
