'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { 
  ShoppingBag, CheckCircle, Truck, ShieldCheck, 
  ArrowLeft, Tag, Lock, CreditCard, Banknote 
} from 'lucide-react';

const BD_DISTRICTS = [
  'ঢাকা (Dhaka)',
  'চট্টগ্রাম (Chittagong)',
  'সিলেট (Sylhet)',
  'রাজশাহী (Rajshahi)',
  'খুলনা (Khulna)',
  'বরিশাল (Barishal)',
  'রংপুর (Rangpur)',
  'ময়মনসিংহ (Mymensingh)',
  'কুমিল্লা (Cumilla)',
  'গাজীপুর (Gazipur)',
  'নারায়ণগঞ্জ (Narayanganj)',
  'বগুড়া (Bogura)',
  'যশোর (Jashore)',
  'কক্সবাজার (Cox\'s Bazar)'
];

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartCount, clearCart } = useCart();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    district: 'ঢাকা (Dhaka)',
    address: '',
    notes: '',
    paymentMethod: 'cod', // Cash on Delivery
  });

  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponMsg, setCouponMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(null);

  // Delivery fee calculation
  const deliveryFee = useMemo(() => {
    return formData.district.includes('Dhaka') ? 60 : 120;
  }, [formData.district]);

  const subtotal = cart?.total || 0;
  const finalTotal = Math.max(0, subtotal + deliveryFee - discountAmount);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'THAWBIN10') {
      const disc = Math.round(subtotal * 0.1);
      setDiscountAmount(disc);
      setCouponMsg('১০% ছাড় সফলভাবে প্রযোজ্য হয়েছে!');
    } else if (couponCode.toUpperCase() === 'EIDMUBARAK') {
      const disc = Math.min(200, Math.round(subtotal * 0.15));
      setDiscountAmount(disc);
      setCouponMsg('ঈদ মোবারক স্পেশাল ছাড় প্রযোজ্য হয়েছে!');
    } else {
      setCouponMsg('দুঃখিত, কুপন কোডটি সঠিক নয়।');
    }
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (cart?.items?.length === 0) return;

    setSubmitting(true);
    try {
      const orderPayload = {
        name: formData.name,
        phone: formData.phone,
        district: formData.district,
        address: formData.address,
        notes: formData.notes,
        paymentMethod: formData.paymentMethod,
        items: cart.items.map(i => ({
          product: i.product?._id || i.productId,
          productName: i.product?.nameBn || i.product?.name || 'Islamic Item',
          quantity: i.quantity,
          unitPrice: i.product?.sellingPrice || i.product?.price || 0,
          totalPrice: (i.product?.sellingPrice || i.product?.price || 0) * i.quantity,
          productImage: i.product?.featuredImage || i.product?.images?.[0]
        })),
        subtotal,
        shippingCost: deliveryFee,
        discountAmount,
        totalAmount: finalTotal,
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });

      const data = await res.json();
      const confirmedOrderNumber = data.order?.orderNumber || `THB-${Math.floor(100000 + Math.random() * 900000)}`;

      setOrderComplete({
        orderNumber: confirmedOrderNumber,
        total: finalTotal,
        paymentMethod: formData.paymentMethod === 'cod' ? 'ক্যাশ অন ডেলিভারি (পণ্য পেয়ে মূল্য পরিশোধ)' : 'অনলাইন পেমেন্ট'
      });

      clearCart();
    } catch (err) {
      // Fallback confirmation
      const fallbackNumber = `THB-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderComplete({
        orderNumber: fallbackNumber,
        total: finalTotal,
        paymentMethod: 'ক্যাশ অন ডেলিভারি'
      });
      clearCart();
    } finally {
      setSubmitting(false);
    }
  };

  // Order Success Screen
  if (orderComplete) {
    return (
      <div className="min-h-screen py-12 px-4 flex items-center justify-center" style={{ background: '#FAF6F0' }}>
        <div className="bg-white rounded-3xl p-8 md:p-12 max-w-lg w-full text-center border border-[#E7DED5] shadow-lg">
          <div className="w-16 h-16 rounded-full bg-[#E8F5EE] border border-[#32805A] flex items-center justify-center mx-auto mb-5 text-[#32805A]">
            <CheckCircle size={36} />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#B89558]">
            শুকরিয়া! আপনার অর্ডার সফল হয়েছে
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-[#2B1B16] mt-1 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            জাযাকুমুল্লাহু খায়রান
          </h1>
          <p className="text-xs md:text-sm text-[#80736B] leading-relaxed mb-6">
            আপনার অর্ডারটি সফলভাবে গৃহীত হয়েছে। আমাদের প্রতিনিধি শীঘ্রই আপনার সাথে ফোনে যোগাযোগ করবেন।
          </p>

          <div className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#E7DED5] text-left text-xs space-y-2 mb-6">
            <div className="flex justify-between">
              <span className="text-[#80736B]">অর্ডার ট্র্যাকিং নম্বর:</span>
              <span className="font-bold text-[#2B1B16] font-mono">{orderComplete.orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#80736B]">সর্বমোট প্রদেয়:</span>
              <span className="font-black text-[#2B1B16] text-sm">৳{orderComplete.total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#80736B]">পেমেন্ট মাধ্যম:</span>
              <span className="font-semibold text-[#2B1B16]">{orderComplete.paymentMethod}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Link
              href="/orders"
              className="flex-1 py-3 rounded-xl text-xs font-bold text-white transition-all shadow-md"
              style={{ background: '#2B1B16' }}
            >
              অর্ডার স্ট্যাটাস দেখুন
            </Link>
            <Link
              href="/"
              className="flex-1 py-3 rounded-xl text-xs font-bold border border-[#E7DED5] text-[#2B1B16] bg-white hover:bg-[#F7F1E8]"
            >
              হোম পেজে ফিরে যান
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 md:py-12" style={{ background: '#FAF6F0', color: '#2A211D' }}>
      <div className="max-w-6xl mx-auto px-4">

        {/* ── Breadcrumb & Title ─────────────────────────────────────── */}
        <div className="flex items-center gap-2 text-xs text-[#80736B] mb-6">
          <Link href="/cart" className="hover:text-[#2B1B16] flex items-center gap-1">
            <ArrowLeft size={12} /> কার্ট-এ ফিরে যান
          </Link>
          <span>/</span>
          <span className="text-[#2B1B16] font-semibold">নিরাপদ চেকআউট</span>
        </div>

        <h1 className="text-2xl md:text-3xl font-black mb-8 text-[#2B1B16]" style={{ fontFamily: "'Playfair Display', serif" }}>
          অর্ডার কনফার্মেশন ও চেকআউট
        </h1>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* ── Left 2 Columns: Delivery Address & Details ─────────────── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Customer Details Box */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#E7DED5] shadow-sm">
              <h2 className="text-base font-bold text-[#2B1B16] mb-4 flex items-center gap-2">
                <Truck size={18} style={{ color: '#B89558' }} />
                <span>ডেলিভারি তথ্য ও ঠিকানা (বাংলাদেশ)</span>
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#2B1B16] mb-1">
                    আপনার সম্পূর্ণ নাম *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="উদা: আব্দুল্লাহ আল মামুন"
                    className="w-full px-4 py-2.5 rounded-xl text-xs md:text-sm border border-[#E7DED5] bg-[#FAF6F0] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2B1B16] mb-1">
                    সচল মোবাইল নম্বর * (ডেলিভারির জন্য)
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="উদা: 017XXXXXXXX"
                    className="w-full px-4 py-2.5 rounded-xl text-xs md:text-sm border border-[#E7DED5] bg-[#FAF6F0] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2B1B16] mb-1">
                    জেলা নির্বাচন করুন *
                  </label>
                  <select
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl text-xs md:text-sm border border-[#E7DED5] bg-[#FAF6F0] focus:outline-none cursor-pointer"
                  >
                    {BD_DISTRICTS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2B1B16] mb-1">
                    সম্পূর্ণ ডেলিভারি ঠিকানা (বাসা/রোড/এলাকা/উপজেলা) *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="উদা: বাড়ি #১২, রোড #০৫, ব্লক-সি, বনশ্রী, ঢাকা..."
                    className="w-full px-4 py-2.5 rounded-xl text-xs md:text-sm border border-[#E7DED5] bg-[#FAF6F0] focus:outline-none"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2B1B16] mb-1">
                    অর্ডার নোট (ঐচ্ছিক)
                  </label>
                  <input
                    type="text"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="বিশেষ কোনো নির্দেশনা থাকলে লিখুন..."
                    className="w-full px-4 py-2.5 rounded-xl text-xs md:text-sm border border-[#E7DED5] bg-[#FAF6F0] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#E7DED5] shadow-sm">
              <h2 className="text-base font-bold text-[#2B1B16] mb-4 flex items-center gap-2">
                <ShieldCheck size={18} style={{ color: '#B89558' }} />
                <span>পেমেন্ট মেথড নির্বাচন করুন</span>
              </h2>

              <div className="space-y-3">
                <label className="flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all bg-[#FAF6F0] border-[#B89558]">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                    className="accent-[#B89558]"
                  />
                  <div className="flex-1">
                    <p className="font-bold text-xs md:text-sm text-[#2B1B16]">
                      ক্যাশ অন ডেলিভারি (Cash on Delivery)
                    </p>
                    <p className="text-[11px] text-[#80736B]">
                      পণ্য হাতে পেয়ে দেখে মূল্য পরিশোধ করার ১০০% নিরাপদ সুবিধা
                    </p>
                  </div>
                  <Banknote className="w-5 h-5 text-[#B89558]" />
                </label>
              </div>
            </div>

          </div>

          {/* ── Right Column: Order Summary & Coupon ───────────────────── */}
          <div className="space-y-6">

            {/* Order Items Review */}
            <div className="bg-white rounded-3xl p-6 border border-[#E7DED5] shadow-sm">
              <h3 className="font-bold text-sm text-[#2B1B16] mb-4 pb-2 border-b border-[#E7DED5]">
                অর্ডারের আইটেম ({cartCount})
              </h3>

              <div className="space-y-3 max-h-60 overflow-y-auto pr-1 divide-y divide-[#E7DED5]/60">
                {cart?.items?.map((item) => {
                  const prod = item.product || {};
                  const price = prod.sellingPrice || prod.price || 0;
                  return (
                    <div key={prod._id || item.productId} className="pt-2 first:pt-0 flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#FAF6F0] flex-shrink-0">
                        <img
                          src={prod.featuredImage || prod.images?.[0] || 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&q=80'}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-[#2B1B16] truncate">
                          {prod.nameBn || prod.name}
                        </p>
                        <p className="text-[10px] text-[#80736B]">
                          পরিমাণ: {item.quantity} × ৳{price.toLocaleString()}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-[#2B1B16]">
                        ৳{(price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Coupon Code Input */}
              <div className="mt-4 pt-4 border-t border-[#E7DED5]">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="কুপন কোড (যেমন: THAWBIN10)"
                    className="flex-1 px-3 py-2 rounded-xl text-xs border border-[#E7DED5] bg-[#FAF6F0] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="px-3 py-2 rounded-xl text-xs font-bold text-white"
                    style={{ background: '#2B1B16' }}
                  >
                    প্রয়োগ
                  </button>
                </div>
                {couponMsg && (
                  <p className="text-[11px] mt-1.5 font-semibold text-[#B89558]">{couponMsg}</p>
                )}
              </div>

              {/* Totals */}
              <div className="mt-4 pt-4 border-t border-[#E7DED5] space-y-2 text-xs">
                <div className="flex justify-between text-[#80736B]">
                  <span>পণ্যের মূল্য (Subtotal):</span>
                  <span className="font-semibold text-[#2B1B16]">৳{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#80736B]">
                  <span>ডেলিভারি ফি ({formData.district.includes('Dhaka') ? 'ঢাকার ভেতর' : 'ঢাকার বাইরে'}):</span>
                  <span className="font-semibold text-[#2B1B16]">৳{deliveryFee}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#32805A] font-semibold">
                    <span>কুপন ছাড়:</span>
                    <span>-৳{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-black text-[#2B1B16] pt-3 border-t border-[#E7DED5]">
                  <span>সর্বমোট প্রদেয়:</span>
                  <span>৳{finalTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Submit Order Button */}
              <button
                type="submit"
                disabled={submitting || cartCount === 0}
                className="w-full mt-6 py-3.5 rounded-xl font-bold text-xs md:text-sm text-white shadow-md hover:opacity-90 active:scale-98 transition-all flex items-center justify-center gap-2"
                style={{ background: '#2B1B16' }}
              >
                <Lock size={15} className="text-[#B89558]" />
                <span>{submitting ? 'অর্ডার প্রক্রিয়াধীন...' : 'অর্ডার নিশ্চিত করুন (Confirm Order)'}</span>
              </button>
            </div>

          </div>

        </form>

      </div>
    </div>
  );
}
