'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import ProductCard from '../components/ProductCard';
import { Search, AlertCircle, Sparkles, ArrowLeft } from 'lucide-react';
import { ISLAMIC_PRODUCTS } from '@/lib/islamicCatalog';

const UNRELATED_KEYWORDS = [
  'iphone', 'samsung', 'mobile', 'phone', 'laptop', 'macbook', 'computer',
  'tv', 'electronics', 'gaming', 'ps5', 'xbox', 'desk', 'standing desk',
  'chair', 'sofa', 'table', 'furniture', 'grocery', 'shoe', 'nike', 'adidas',
  'dell', 'camera', 'headphone'
];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = (searchParams.get('q') || '').trim();
  const lowerQuery = query.toLowerCase();

  // Check if query is unrelated to Islamic products
  const isUnrelated = UNRELATED_KEYWORDS.some(k => lowerQuery.includes(k));

  // Search real Islamic products
  const matchingProducts = !query || isUnrelated ? [] : ISLAMIC_PRODUCTS.filter(p => {
    const nameMatch = p.name && p.name.toLowerCase().includes(lowerQuery);
    const nameBnMatch = p.nameBn && p.nameBn.includes(lowerQuery);
    const descMatch = p.description && p.description.toLowerCase().includes(lowerQuery);
    const descBnMatch = p.descriptionBn && p.descriptionBn.includes(lowerQuery);
    const tagMatch = p.tags && p.tags.some(t => t.toLowerCase().includes(lowerQuery));
    return nameMatch || nameBnMatch || descMatch || descBnMatch || tagMatch;
  });

  return (
    <div className="min-h-screen py-8 md:py-12" style={{ background: '#FAF6F0', color: '#2A211D' }}>
      <div className="max-w-7xl mx-auto px-4">

        {/* Search Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-[#80736B] mb-3">
            <Link href="/" className="hover:text-[#2B1B16]">হোম</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-[#2B1B16]">দোকান</Link>
            <span>/</span>
            <span className="text-[#2B1B16] font-semibold">অনুসন্ধান ফলাফল</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-black text-[#2B1B16]" style={{ fontFamily: "'Playfair Display', serif" }}>
            {query ? `"${query}" এর অনুসন্ধান ফলাফল` : 'পণ্য অনুসন্ধান'}
          </h1>
          {query && !isUnrelated && (
            <p className="text-xs md:text-sm text-[#80736B] mt-1">
              মোট {matchingProducts.length} টি ইসলামিক পণ্য পাওয়া গেছে
            </p>
          )}
        </div>

        {/* Unrelated Search Message */}
        {isUnrelated ? (
          <div className="bg-white rounded-3xl p-8 md:p-14 text-center border border-[#E7DED5] shadow-sm max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#F7F1E8] border border-[#B89558] flex items-center justify-center mx-auto mb-5">
              <AlertCircle className="w-8 h-8 text-[#B89558]" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-[#2B1B16] mb-3">
              দুঃখিত, এই পণ্যটি AWBIN-এর ইসলামিক পণ্য সংগ্রহে নেই।
            </h2>
            <p className="text-xs md:text-sm text-[#80736B] leading-relaxed mb-6">
              AWBIN একটি পূর্ণাঙ্গ ও নির্ভরযোগ্য ইসলামিক লাইফস্টাইল শপ। আমরা শুধুমাত্র পাঞ্জাবি, আতর, টুপি, জায়নামাজ, তসবিহ, কুরআন শরীফ ও ইসলামিক উপহার সামগ্রী সরবরাহ করি।
            </p>
            <div className="flex justify-center gap-3">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs md:text-sm font-bold text-white shadow-md transition-all"
                style={{ background: '#2B1B16' }}
              >
                <ArrowLeft size={16} />
                <span>সকল ইসলামিক পণ্য দেখুন</span>
              </Link>
            </div>
          </div>
        ) : !query ? (
          <div className="bg-white rounded-3xl p-10 text-center border border-[#E7DED5]">
            <Search className="w-12 h-12 text-[#80736B] mx-auto mb-3 opacity-40" />
            <p className="text-sm text-[#80736B]">অনুসন্ধান করতে ওপরে কোনো পণ্যের নাম লিখুন।</p>
          </div>
        ) : matchingProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center border border-[#E7DED5] max-w-xl mx-auto">
            <p className="text-base font-bold text-[#2B1B16] mb-2">
              দুঃখিত, "{query}" সম্পর্কিত কোনো পণ্য পাওয়া যায়নি।
            </p>
            <p className="text-xs text-[#80736B] mb-5">
              অনুগ্রহ করে বানান যাচাই করুন অথবা ক্যাটাগরি অনুসারে ব্রাউজ করুন।
            </p>
            <Link
              href="/categories"
              className="inline-block px-5 py-2.5 rounded-xl text-xs font-bold text-white"
              style={{ background: '#2B1B16' }}
            >
              ক্যাটাগরি সমূহ দেখুন
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {matchingProducts.map((p) => (
              <ProductCard key={p._id || p.slug} product={p} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
