'use client';

import Link from "next/link";
import { useCart } from "../context/CartContext";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ArrowLeft } from "lucide-react";
import Image from "next/image";

export default function CartPage() {
  const { cart, loading, updateQuantity, removeFromCart, clearCart, cartCount } = useCart();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#FAF6F0" }}>
        <div className="text-center">
          <div className="w-10 h-10 border-3 border-[#B89558] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-xs font-bold text-[#80736B]">কার্ট লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  const subtotal = cart?.total || 0;

  return (
    <div className="min-h-screen py-8 md:py-12" style={{ background: "#FAF6F0", color: "#2A211D" }}>
      <div className="max-w-4xl mx-auto px-4">

        {/* ── Breadcrumb & Header ─────────────────────────────────────── */}
        <div className="flex items-center gap-2 text-xs text-[#80736B] mb-6">
          <Link href="/" className="hover:text-[#2B1B16]">হোম</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[#2B1B16]">শপ</Link>
          <span>/</span>
          <span className="text-[#2B1B16] font-semibold">শপিং ব্যাগ ({cartCount})</span>
        </div>

        <div className="rounded-3xl p-6 md:p-8 mb-8 text-white shadow-sm flex items-center justify-between"
          style={{ background: "#2B1B16", border: "1px solid rgba(184,149,88,0.25)" }}>
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-[#F7F1E8]" style={{ fontFamily: "'Playfair Display', serif" }}>
              আপনার শপিং ব্যাগ
            </h1>
            <p className="text-xs text-[#E7D7C4] mt-1">
              ব্যাগে মোট {cartCount} টি ইসলামিক পণ্য রয়েছে
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#3A251E] border border-[#B89558]/30 flex items-center justify-center">
            <ShoppingBag className="w-6 h-6 text-[#B89558]" />
          </div>
        </div>

        {cart?.items?.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 md:p-14 text-center border border-[#E7DED5] shadow-sm">
            <div className="w-16 h-16 rounded-full bg-[#FAF6F0] flex items-center justify-center mx-auto mb-4 border border-[#E7DED5]">
              <ShoppingBag className="w-8 h-8 text-[#80736B]" />
            </div>
            <h2 className="text-xl font-bold text-[#2B1B16] mb-2">আপনার কার্ট বর্তমানে খালি</h2>
            <p className="text-xs md:text-sm text-[#80736B] mb-6">
              পছন্দের পাঞ্জাবি, আতর, জায়নামাজ বা ইসলামিক উপহার নির্বাচন করে ব্যাগে যুক্ত করুন।
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 text-white text-xs md:text-sm font-bold rounded-xl shadow-md transition-all"
              style={{ background: "#2B1B16" }}
            >
              <span>পণ্য দেখতে যান</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <div className="space-y-6">

            {/* Items List */}
            <div className="bg-white rounded-3xl overflow-hidden border border-[#E7DED5] shadow-sm divide-y divide-[#E7DED5]">
              {cart.items.map((item) => {
                const prod = item.product || {};
                const prodImg = prod.featuredImage || prod.images?.[0] || 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&q=80';
                const price = prod.sellingPrice || prod.price || 0;

                return (
                  <div key={prod._id || item.productId} className="p-4 md:p-6 flex gap-4 items-center">
                    {/* Image */}
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden bg-[#FAF6F0] border border-[#E7DED5] flex-shrink-0">
                      <img src={prodImg} alt={prod.nameBn || prod.name} className="w-full h-full object-cover" />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-xs md:text-sm text-[#2B1B16] line-clamp-1 mb-1">
                        {prod.nameBn || prod.name}
                      </h3>
                      <p className="text-[11px] text-[#80736B] mb-2">
                        একক মূল্য: ৳{price.toLocaleString()}
                      </p>

                      {/* Quantity Controller */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-[#E7DED5] rounded-xl bg-[#FAF6F0]">
                          <button
                            onClick={() => updateQuantity(prod._id || item.productId, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="p-1.5 text-[#2B1B16] hover:bg-white rounded-l-xl transition-colors disabled:opacity-40"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-[#2B1B16]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(prod._id || item.productId, item.quantity + 1)}
                            className="p-1.5 text-[#2B1B16] hover:bg-white rounded-r-xl transition-colors"
                          >
                            <Plus size={13} />
                          </button>
                        </div>

                        <span className="font-black text-sm md:text-base text-[#2B1B16] ml-auto">
                          ৳{(price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeFromCart(prod._id || item.productId)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors ml-2"
                      title="মুছে ফেলুন"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Summary & Checkout Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div className="bg-white rounded-3xl p-6 border border-[#E7DED5] shadow-sm">
                <h3 className="font-bold text-sm text-[#2B1B16] mb-4">অর্ডার সংক্ষিপ্তসার</h3>
                <div className="space-y-2 text-xs text-[#80736B] mb-4">
                  <div className="flex justify-between">
                    <span>মোট পণ্যের সংখ্যা:</span>
                    <span className="font-bold text-[#2B1B16]">{cartCount} টি</span>
                  </div>
                  <div className="flex justify-between text-sm font-black text-[#2B1B16] pt-2 border-t border-[#E7DED5]">
                    <span>সাবটোটাল:</span>
                    <span>৳{subtotal.toLocaleString()}</span>
                  </div>
                </div>
                <button
                  onClick={clearCart}
                  className="w-full py-2.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                >
                  <Trash2 size={13} />
                  <span>কার্ট সম্পূর্ণ খালি করুন</span>
                </button>
              </div>

              <div className="space-y-3">
                <Link
                  href="/checkout"
                  className="w-full py-4 px-6 rounded-2xl text-white font-bold text-sm text-center shadow-md flex items-center justify-center gap-2 hover:opacity-90 active:scale-98 transition-all"
                  style={{ background: "#2B1B16" }}
                >
                  <span>চেকআউট ও অর্ডারে এগিয়ে যান</span>
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/shop"
                  className="w-full py-3 px-6 rounded-2xl border border-[#E7DED5] bg-white text-[#2B1B16] font-bold text-xs text-center block hover:bg-[#F7F1E8] transition-all"
                >
                  ← আরও ইসলামিক পণ্য দেখুন
                </Link>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
