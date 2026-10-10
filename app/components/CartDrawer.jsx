'use client';

import Link from 'next/link';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function CartDrawer({ isOpen, onClose, cart, loading, updateQuantity, removeFromCart, clearCart }) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 transition-opacity duration-300"
        style={{ background: 'rgba(43,27,24,0.5)', backdropFilter: 'blur(2px)' }}
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md z-50 shadow-2xl flex flex-col"
        style={{ background: '#FFFFFF' }}>

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: '#E7DED5' }}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#3E2723' }}>
              <ShoppingBag className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-lg font-black" style={{ color: '#2B211D', fontFamily: "'Playfair Display', serif" }}>
              Your Cart
            </h2>
            {cart?.items?.length > 0 && (
              <span className="px-2 py-0.5 rounded-full text-xs font-bold text-white"
                style={{ background: '#C49A6C' }}>
                {cart.items.length}
              </span>
            )}
          </div>
          <button onClick={onClose}
            className="p-2 rounded-xl transition-all hover:bg-[#EFE2D4]"
            style={{ color: '#3E2723' }}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4" style={{ background: '#FAF6F0' }}>
          {loading ? (
            <div className="flex flex-col items-center justify-center h-48 gap-3">
              <div className="animate-spin rounded-full h-10 w-10 border-2" style={{ borderColor: '#EFE2D4', borderTopColor: '#C49A6C' }} />
              <p className="text-sm font-medium" style={{ color: '#80736B' }}>Loading your cart…</p>
            </div>
          ) : !cart?.items || cart.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 gap-3 text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: '#EFE2D4' }}>
                <ShoppingBag className="w-8 h-8" style={{ color: '#3E2723' }} />
              </div>
              <p className="font-bold" style={{ color: '#2B211D' }}>Your cart is empty</p>
              <p className="text-sm" style={{ color: '#80736B' }}>Add some desks to get started</p>
              <Link href="/shop" onClick={onClose}
                className="mt-2 px-5 py-2 rounded-xl text-sm font-bold text-white"
                style={{ background: '#3E2723' }}>
                Shop Now
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.items.map((item, index) => (
                <div key={item.product?._id || item.productId || index}
                  className="flex gap-3 p-3 rounded-xl"
                  style={{ background: '#FFFFFF', border: '1px solid #E7DED5' }}>
                  {/* Image */}
                  <div className="w-18 h-18 rounded-lg overflow-hidden flex-shrink-0 relative"
                    style={{ width: 72, height: 72, background: '#FAF6F0' }}>
                    {item.product?.featuredImage ? (
                      <Image src={item.product.featuredImage} alt={item.product?.name || 'Product'}
                        fill className="object-contain p-1" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ShoppingBag className="w-6 h-6" style={{ color: '#C49A6C' }} />
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold truncate" style={{ color: '#2B211D' }}>
                      {item.product?.name || 'Product'}
                    </h3>
                    <p className="text-xs mt-0.5" style={{ color: '#C49A6C' }}>
                      {item.product?.category || 'Thawbin'}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      {/* Qty controls */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => updateQuantity(item.product?._id || item.productId, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg border transition-all"
                          style={{ background: '#FAF6F0', borderColor: '#E7DED5' }}
                          disabled={item.quantity <= 1}>
                          <Minus className="w-3 h-3" style={{ color: '#3E2723' }} />
                        </button>
                        <span className="w-7 text-center text-sm font-bold" style={{ color: '#2B211D' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product?._id || item.productId, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg border transition-all"
                          style={{ background: '#FAF6F0', borderColor: '#E7DED5' }}>
                          <Plus className="w-3 h-3" style={{ color: '#3E2723' }} />
                        </button>
                      </div>
                      <button onClick={() => removeFromCart(item.product?._id || item.productId)}
                        className="p-1.5 rounded-lg transition-all hover:bg-red-50">
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-black" style={{ color: '#3E2723' }}>
                      ৳{((item.product?.sellingPrice || 0) * item.quantity).toLocaleString()}
                    </p>
                    {item.quantity > 1 && (
                      <p className="text-[10px] mt-0.5" style={{ color: '#80736B' }}>
                        ৳{item.product?.sellingPrice}/ea
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart?.items?.length > 0 && (
          <div className="p-4 border-t space-y-3" style={{ borderColor: '#E7DED5', background: '#FFFFFF' }}>
            <button onClick={clearCart} className="text-xs font-medium text-red-400 hover:text-red-500 transition-colors">
              Clear Cart
            </button>
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm" style={{ color: '#2B211D' }}>Total:</span>
              <span className="text-xl font-black" style={{ color: '#3E2723' }}>
                ৳{cart?.total?.toLocaleString() || 0}
              </span>
            </div>
            <Link href="/cart" onClick={onClose}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90"
              style={{ background: '#3E2723' }}>
              View Cart & Checkout
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
