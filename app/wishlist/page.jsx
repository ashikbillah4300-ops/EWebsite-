'use client';

import Link from 'next/link';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';

export default function WishlistPage() {
  return (
    <div className="min-h-screen py-10 md:py-16" style={{ background: "#FAF6F0", color: "#2A211D" }}>
      <div className="max-w-4xl mx-auto px-4">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#80736B] mb-6">
          <Link href="/" className="hover:text-[#2B1B16]">হোম</Link>
          <span>/</span>
          <span className="text-[#2B1B16] font-semibold">পছন্দের তালিকা (উইশলিস্ট)</span>
        </div>

        {/* Header Strip */}
        <div className="rounded-3xl p-6 md:p-8 mb-8 text-white shadow-sm flex items-center justify-between"
          style={{ background: "#2B1B16", border: "1px solid rgba(184,149,88,0.25)" }}>
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-[#F7F1E8]" style={{ fontFamily: "'Playfair Display', serif" }}>
              আমার পছন্দের তালিকা
            </h1>
            <p className="text-xs text-[#E7D7C4] mt-1">
              পছন্দের ইসলামিক পণ্যগুলো পরবর্তীতে অর্ডার করার জন্য সংরক্ষণ করুন
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#3A251E] border border-[#B89558]/30 flex items-center justify-center">
            <Heart className="w-6 h-6 text-[#B89558]" />
          </div>
        </div>

        {/* Empty State */}
        <div className="bg-white rounded-3xl p-10 md:p-14 text-center border border-[#E7DED5] shadow-sm">
          <div className="w-16 h-16 rounded-full bg-[#FAF6F0] flex items-center justify-center mx-auto mb-4 border border-[#E7DED5]">
            <Heart className="w-8 h-8 text-[#80736B]" />
          </div>
          <h2 className="text-xl font-bold text-[#2B1B16] mb-2">আপনার পছন্দের তালিকা বর্তমানে খালি</h2>
          <p className="text-xs md:text-sm text-[#80736B] mb-6">
            পাঞ্জাবি, আতর, জায়নামাজ বা কুরআনের প্রোডাক্ট কার্ডে হার্ট আইকনে ক্লিক করে সহজেই সংরক্ষণ করুন।
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 text-white text-xs md:text-sm font-bold rounded-xl shadow-md transition-all hover:opacity-90"
            style={{ background: "#2B1B16" }}
          >
            <span>পণ্য কেনাকাটা শুরু করুন</span>
            <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </div>
  );
}
