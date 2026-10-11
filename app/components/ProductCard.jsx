'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Heart, ShoppingBag, Eye, Check } from 'lucide-react';

export default function ProductCard({ product }) {
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const { addToCart } = useCart();

  const sellingPrice = product.sellingPrice || product.price || 0;
  const regularPrice = product.regularPrice || product.oldPrice || 0;
  const discount = regularPrice > sellingPrice
    ? Math.round(((regularPrice - sellingPrice) / regularPrice) * 100) : 0;
  const productImage = product.featuredImage || product.images?.[0] || 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&q=80';

  const stockQty = typeof product.stockQuantity === 'number' ? product.stockQuantity : 10;
  const inStock = stockQty > 0 && product.stockStatus !== 'out_of_stock';

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAdding || added || !inStock) return;
    setIsAdding(true);
    const result = await addToCart(product._id || product.id, 1);
    setIsAdding(false);
    if (result.success) {
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlisted(!wishlisted);
  };

  return (
    <div
      className="product-card group flex flex-col rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        background: '#FFFFFF',
        border: '1px solid #E7DED5',
        boxShadow: '0 2px 10px rgba(43,27,24,0.05)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '0 10px 30px rgba(43,27,24,0.12)';
        e.currentTarget.style.transform = 'translateY(-3px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = '0 2px 10px rgba(43,27,24,0.05)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* ── Product Image Container ─────────────────────────────── */}
      <Link href={`/product/${product.slug}`} className="relative aspect-square overflow-hidden block" style={{ background: '#F7F1E8' }}>
        {discount > 0 && (
          <span
            className="absolute top-2.5 left-2.5 z-10 px-2 py-0.5 rounded-lg text-white text-[11px] font-bold shadow-sm"
            style={{ background: '#B89558' }}
          >
            {discount}% ছাড়
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className="absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm hover:scale-110"
          style={{ background: '#FFFFFF', border: '1px solid #E7DED5' }}
          aria-label="Wishlist"
        >
          <Heart
            className="w-4 h-4 transition-colors"
            fill={wishlisted ? '#B89558' : 'none'}
            style={{ color: wishlisted ? '#B89558' : '#80736B' }}
          />
        </button>

        <img
          src={productImage}
          alt={product.nameBn || product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Quick View Overlay Bar on hover */}
        <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex justify-center">
          <span className="text-[11px] text-white font-bold flex items-center gap-1 bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm">
            <Eye size={12} /> বিস্তারিত দেখুন
          </span>
        </div>
      </Link>

      {/* ── Product Info ─────────────────────────────────────────── */}
      <div className="flex flex-col flex-grow p-3.5 md:p-4">
        {/* Category Badge */}
        <div className="flex items-center justify-between mb-1">
          <p className="text-[11px] font-bold tracking-wider uppercase text-[#B89558]">
            {product.category?.nameBn || product.category?.name || 'ইসলামিক পণ্য'}
          </p>
          <span
            className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
              inStock ? 'bg-[#E8F5EE] text-[#32805A]' : 'bg-red-50 text-red-600'
            }`}
          >
            {inStock ? 'ইন স্টক' : 'স্টক শেষ'}
          </span>
        </div>

        {/* Bengali Product Name */}
        <Link href={`/product/${product.slug}`}>
          <h3
            className="text-xs md:text-sm font-bold line-clamp-2 mb-1 leading-snug hover:text-[#B89558] transition-colors"
            style={{ color: '#2B1B16' }}
            title={product.nameBn || product.name}
          >
            {product.nameBn || product.name}
          </h3>
        </Link>

        {/* Optional English subtitle */}
        {product.nameBn && product.name && (
          <p className="text-[11px] text-[#80736B] line-clamp-1 mb-2 font-medium">
            {product.name}
          </p>
        )}

        {/* Variants indicator if available */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="flex items-center gap-1 mb-2.5 flex-wrap">
            <span className="text-[10px] text-[#80736B]">সাইজ:</span>
            {product.sizes.slice(0, 3).map((s, idx) => (
              <span
                key={idx}
                className="text-[10px] px-1.5 py-0.5 rounded border border-[#E7DED5] text-[#2B1B16] bg-[#FAF6F0]"
              >
                {s}
              </span>
            ))}
            {product.sizes.length > 3 && (
              <span className="text-[9px] text-[#80736B]">+{product.sizes.length - 3}</span>
            )}
          </div>
        )}

        {/* Price Row */}
        <div className="flex items-baseline gap-2 mt-auto mb-3">
          <span className="text-base md:text-lg font-black" style={{ color: '#2B1B16' }}>
            ৳{sellingPrice.toLocaleString()}
          </span>
          {discount > 0 && (
            <span className="text-xs line-through text-[#80736B] font-medium">
              ৳{regularPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          {inStock ? (
            <button
              onClick={handleAddToCart}
              disabled={isAdding || added}
              className="w-full text-xs font-bold py-2 md:py-2.5 rounded-xl border transition-all flex items-center justify-center gap-1 active:scale-95"
              style={{
                background: added ? '#E8F5EE' : '#FAF6F0',
                color: added ? '#32805A' : '#2B1B16',
                borderColor: added ? '#32805A' : '#E7DED5',
              }}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{isAdding ? 'যুক্ত...' : added ? '✓ যুক্ত' : 'কার্টে'}</span>
            </button>
          ) : (
            <button
              disabled
              className="w-full py-2 text-xs font-bold rounded-xl cursor-not-allowed bg-gray-100 text-gray-400 border border-gray-200"
            >
              স্টক শেষ
            </button>
          )}

          <Link
            href={`/product/${product.slug}`}
            className="w-full text-xs font-bold py-2 md:py-2.5 rounded-xl transition-all flex items-center justify-center text-center text-white active:scale-95 shadow-sm hover:opacity-90"
            style={{ background: '#2B1B16' }}
          >
            অর্ডার করুন
          </Link>
        </div>
      </div>
    </div>
  );
}
