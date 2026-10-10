'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Star, Heart, ShoppingBag, ImageIcon } from 'lucide-react';

export default function ProductCard({ product }) {
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const { addToCart } = useCart();

  const sellingPrice  = product.sellingPrice || product.price || 0;
  const regularPrice  = product.regularPrice || product.oldPrice || 0;
  const discount = regularPrice > sellingPrice
    ? Math.round(((regularPrice - sellingPrice) / regularPrice) * 100) : 0;
  const productImage  = product.featuredImage || product.images?.[0] || null;

  const handleAddToCart = async (e) => {
    e.preventDefault(); e.stopPropagation();
    if (isAdding || added) return;
    setIsAdding(true);
    const result = await addToCart(product._id || product.id, 1);
    setIsAdding(false);
    if (result.success) {
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  return (
    <Link href={`/product/${product.slug}`}
      className="product-card group flex flex-col rounded-xl overflow-hidden transition-all duration-300"
      style={{
        background: '#FFFFFF',
        border: '1px solid #E7DED5',
        boxShadow: '0 2px 8px rgba(62,39,35,0.06)',
      }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 28px rgba(62,39,35,0.14)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 8px rgba(62,39,35,0.06)'; e.currentTarget.style.transform = 'translateY(0)'; }}>

      {/* Image */}
      <div className="relative aspect-square overflow-hidden" style={{ background: '#FAF6F0' }}>
        {discount > 0 && (
          <div className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded text-white text-xs font-bold"
            style={{ background: '#C49A6C' }}>
            -{discount}%
          </div>
        )}

        {/* Wishlist heart */}
        <button
          onClick={e => { e.preventDefault(); e.stopPropagation(); setWishlisted(w => !w); }}
          className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
          style={{ background: '#FFFFFF', border: '1px solid #E7DED5', boxShadow: '0 2px 6px rgba(62,39,35,0.12)' }}>
          <Heart className="w-4 h-4" fill={wishlisted ? '#C49A6C' : 'none'}
            style={{ color: wishlisted ? '#C49A6C' : '#80736B' }} />
        </button>

        {productImage ? (
          <img src={productImage} alt={product.name}
            className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ color: '#C49A6C' }}>
            <ImageIcon className="w-14 h-14 opacity-30" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col flex-grow p-3 md:p-4">
        {/* Category */}
        <p className="text-[10px] md:text-xs font-medium mb-1 uppercase tracking-wide" style={{ color: '#C49A6C' }}>
          {product.category?.name || product.category || 'Thawbin'}
        </p>

        {/* Name */}
        <h3 className="text-xs md:text-sm font-bold line-clamp-2 mb-2 leading-snug" style={{ color: '#2B211D' }}>
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex gap-0.5">
            {[1,2,3,4,5].map(s => (
              <Star key={s} className="w-3 h-3" fill="#E5A33D" style={{ color: '#E5A33D' }} />
            ))}
          </div>
          <span className="text-[10px] md:text-xs font-semibold" style={{ color: '#80736B' }}>
            ({(product.rating || 4.8).toFixed(1)})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1.5 mb-3">
          <span className="text-sm md:text-base font-black" style={{ color: '#3E2723' }}>
            ৳{sellingPrice.toLocaleString()}
          </span>
          {discount > 0 && (
            <span className="text-[10px] md:text-xs line-through font-medium" style={{ color: '#80736B' }}>
              ৳{regularPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-auto space-y-2">
          {(product.stockQuantity || product.stock) > 0 ? (
            <button onClick={handleAddToCart} disabled={isAdding || added}
              className="btn-action btn-cart w-full text-xs md:text-sm font-bold py-2 md:py-2.5 rounded-lg border transition-all flex items-center justify-center gap-1.5"
              style={{
                background: added ? '#E8F5EE' : '#FAF6F0',
                color: added ? '#32805A' : '#3E2723',
                borderColor: added ? '#32805A' : '#E7DED5',
              }}>
              <ShoppingBag className="w-3.5 h-3.5" />
              {isAdding ? 'Adding...' : added ? '✓ Added' : 'Add to Cart'}
            </button>
          ) : (
            <button disabled
              className="w-full py-2 md:py-2.5 text-xs md:text-sm font-bold rounded-lg cursor-not-allowed"
              style={{ background: '#F0EAE5', color: '#80736B', border: '1px solid #E7DED5' }}>
              Out of Stock
            </button>
          )}
          <Link href={`/product/${product.slug}`}
            className="btn-action btn-buy w-full text-xs md:text-sm font-bold py-2 md:py-2.5 rounded-lg transition-all flex items-center justify-center"
            style={{ background: '#3E2723', color: '#FFFFFF' }}
            onClick={e => e.stopPropagation()}>
            Buy Now
          </Link>
        </div>
      </div>
    </Link>
  );
}
