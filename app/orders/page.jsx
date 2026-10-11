'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { Package, Clock, CheckCircle, XCircle, Truck, Loader2, ArrowLeft, ShoppingBag } from 'lucide-react';

export default function OrdersPage() {
  const { user, loading: authLoading, logout } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [fetchingOrders, setFetchingOrders] = useState(false);

  useEffect(() => {
    fetchOrders();
    setLoading(false);
  }, []);

  const fetchOrders = async () => {
    setFetchingOrders(true);
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      if (data.orders) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setFetchingOrders(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'delivered':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#E8F5EE] text-[#32805A]">ডেলিভার্ড</span>;
      case 'shipped':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700">ডেলিভারিতে আছে</span>;
      case 'confirmed':
      case 'processing':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700">নিশ্চিত হয়েছে</span>;
      case 'cancelled':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-50 text-red-600">বাতিল</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700">অপেক্ষমাণ</span>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#FAF6F0' }}>
        <Loader2 className="w-8 h-8 animate-spin text-[#B89558]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 md:py-12" style={{ background: '#FAF6F0', color: '#2A211D' }}>
      <div className="max-w-5xl mx-auto px-4">

        {/* ── Header ─────────────────────────────────────────────────── */}
        <div className="flex items-center gap-2 text-xs text-[#80736B] mb-6">
          <Link href="/" className="hover:text-[#2B1B16]">হোম</Link>
          <span>/</span>
          <span className="text-[#2B1B16] font-semibold">আমার অর্ডার সমূহ</span>
        </div>

        <div className="rounded-3xl p-6 md:p-8 mb-8 text-white shadow-sm flex items-center justify-between"
          style={{ background: '#2B1B16', border: '1px solid rgba(184,149,88,0.25)' }}>
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-[#F7F1E8]" style={{ fontFamily: "'Playfair Display', serif" }}>
              আমার অর্ডার তালিকা
            </h1>
            <p className="text-xs text-[#E7D7C4] mt-1">
              আপনার সমস্ত অর্ডারের স্ট্যাটাস ও ডেলিভারি তথ্য ট্র্যাক করুন
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#3A251E] border border-[#B89558]/30 flex items-center justify-center">
            <Package className="w-6 h-6 text-[#B89558]" />
          </div>
        </div>

        {/* ── Orders Content ─────────────────────────────────────────── */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 md:p-14 text-center border border-[#E7DED5] shadow-sm">
            <div className="w-16 h-16 rounded-full bg-[#FAF6F0] flex items-center justify-center mx-auto mb-4 border border-[#E7DED5]">
              <ShoppingBag className="w-8 h-8 text-[#80736B]" />
            </div>
            <h2 className="text-lg font-bold text-[#2B1B16] mb-2">আপনার কোনো সক্রিয় অর্ডার নেই</h2>
            <p className="text-xs text-[#80736B] mb-6">
              Thawbin-এর চমৎকার পাঞ্জাবি, আতর বা জায়নামাজ কালেকশন থেকে আপনার পছন্দের পণ্য অর্ডার করুন।
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 text-white text-xs md:text-sm font-bold rounded-xl shadow-md transition-all hover:opacity-90"
              style={{ background: '#2B1B16' }}
            >
              <span>পণ্য কেনাকাটা করুন</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order._id || order.orderNumber}
                className="bg-white rounded-3xl p-5 md:p-6 border border-[#E7DED5] shadow-sm space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#E7DED5]">
                  <div>
                    <span className="text-[11px] text-[#80736B]">অর্ডার আইডি:</span>
                    <p className="font-mono font-bold text-xs md:text-sm text-[#2B1B16]">{order.orderNumber}</p>
                  </div>
                  <div>
                    <span className="text-[11px] text-[#80736B]">তারিখ:</span>
                    <p className="text-xs text-[#2B1B16]">
                      {order.createdAt ? new Date(order.createdAt).toLocaleDateString('bn-BD') : 'আজ'}
                    </p>
                  </div>
                  <div>
                    <span className="text-[11px] text-[#80736B]">মোট প্রদেয়:</span>
                    <p className="font-bold text-sm text-[#2B1B16]">৳{order.total?.toLocaleString() || 0}</p>
                  </div>
                  <div>
                    {getStatusBadge(order.status)}
                  </div>
                </div>

                {/* Items in this order */}
                <div className="space-y-2">
                  {(order.items || []).map((it, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs py-1">
                      <span className="font-semibold text-[#2B1B16] truncate max-w-xs">{it.name}</span>
                      <span className="text-[#80736B]">{it.quantity} × ৳{it.price?.toLocaleString() || 0}</span>
                    </div>
                  ))}
                </div>

                {/* Shipping summary */}
                {order.shippingAddress && (
                  <div className="pt-2 border-t border-[#E7DED5]/60 text-[11px] text-[#80736B]">
                    <span>ডেলিভারি ঠিকানা: </span>
                    <span className="text-[#2B1B16]">
                      {order.shippingAddress.name}, {order.shippingAddress.address}, {order.shippingAddress.city} ({order.shippingAddress.phone})
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
