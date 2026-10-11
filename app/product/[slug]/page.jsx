'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Heart, ShoppingBag, Truck, ShieldCheck, RotateCcw, 
  Minus, Plus, Check, ChevronRight, ArrowLeft, Share2, Sparkles 
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import ProductCard from '../../components/ProductCard';
import { getIslamicProductBySlug, ISLAMIC_PRODUCTS } from '@/lib/islamicCatalog';

export default function ProductDetailPage({ params }) {
  const { slug } = params;
  const router = useRouter();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    async function loadProduct() {
      // 1. Try local catalog first for immediate render
      const localProduct = getIslamicProductBySlug(slug);
      if (localProduct) {
        setProduct(localProduct);
        if (localProduct.sizes?.length) setSelectedSize(localProduct.sizes[0]);
        if (localProduct.colors?.length) setSelectedColor(localProduct.colors[0]);
      }

      // 2. Also try API if available
      try {
        const res = await fetch(`/api/products?slug=${slug}`);
        const data = await res.json();
        if (data.products?.[0]) {
          const p = data.products[0];
          setProduct(p);
          if (p.sizes?.length) setSelectedSize(p.sizes[0]);
          if (p.colors?.length) setSelectedColor(p.colors[0]);
        }
      } catch (e) {
        // use localProduct
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20" style={{ background: '#FAF6F0' }}>
        <div className="text-center">
          <div className="w-10 h-10 border-3 border-[#B89558] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-xs text-[#80736B] font-bold">পণ্য লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20 px-4" style={{ background: '#FAF6F0' }}>
        <div className="bg-white rounded-3xl p-8 md:p-12 text-center border border-[#E7DED5] max-w-md w-full shadow-sm">
          <div className="w-14 h-14 bg-[#F7F1E8] rounded-full flex items-center justify-center mx-auto mb-4 text-[#B89558]">
            <Sparkles size={24} />
          </div>
          <h1 className="text-xl font-bold text-[#2B1B16] mb-2">পণ্যটি পাওয়া যায়নি</h1>
          <p className="text-xs text-[#80736B] mb-6">
            দুঃখিত, আপনি যে ইসলামিক পণ্যটি খুঁজছেন তা বর্তমানে উপলব্ধ নেই।
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white"
            style={{ background: '#2B1B16' }}
          >
            <ArrowLeft size={14} />
            <span>সকল পণ্য দেখুন</span>
          </Link>
        </div>
      </div>
    );
  }

  const allImages = product.images?.length > 0
    ? product.images
    : product.featuredImage
      ? [product.featuredImage]
      : ['https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&q=80'];

  const currentImage = allImages[selectedImage] || allImages[0];
  const sellingPrice = product.sellingPrice || product.price || 0;
  const regularPrice = product.regularPrice || product.oldPrice || 0;
  const discount = regularPrice > sellingPrice
    ? Math.round(((regularPrice - sellingPrice) / regularPrice) * 100) : 0;
  const stockQty = typeof product.stockQuantity === 'number' ? product.stockQuantity : 10;
  const inStock = stockQty > 0 && product.stockStatus !== 'out_of_stock';

  const relatedProducts = ISLAMIC_PRODUCTS.filter(p =>
    (p.category?.slug === (product.category?.slug || product.category)) && p.slug !== product.slug
  ).slice(0, 4);

  const handleAddToCart = async () => {
    if (isAdding || added || !inStock) return;
    setIsAdding(true);
    const result = await addToCart(product._id || product.id, quantity, {
      size: selectedSize,
      color: selectedColor,
    });
    setIsAdding(false);
    if (result.success) {
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  const handleBuyNow = async () => {
    if (!inStock) return;
    await addToCart(product._id || product.id, quantity, {
      size: selectedSize,
      color: selectedColor,
    });
    router.push('/checkout');
  };

  return (
    <div className="min-h-screen py-6 md:py-10" style={{ background: '#FAF6F0', color: '#2A211D' }}>
      <div className="max-w-7xl mx-auto px-4">

        {/* ── Breadcrumb ────────────────────────────────────────────── */}
        <div className="flex items-center gap-2 text-xs text-[#80736B] mb-6 overflow-x-auto no-scrollbar">
          <Link href="/" className="hover:text-[#2B1B16] whitespace-nowrap">হোম</Link>
          <ChevronRight size={12} />
          <Link href="/shop" className="hover:text-[#2B1B16] whitespace-nowrap">পণ্যসমূহ</Link>
          <ChevronRight size={12} />
          <Link
            href={`/category/${product.category?.slug || product.category}`}
            className="hover:text-[#2B1B16] whitespace-nowrap"
          >
            {product.category?.nameBn || product.category?.name || 'ক্যাটাগরি'}
          </Link>
          <ChevronRight size={12} />
          <span className="text-[#2B1B16] font-semibold truncate max-w-[200px]">
            {product.nameBn || product.name}
          </span>
        </div>

        {/* ── Main Product Grid ─────────────────────────────────────── */}
        <div className="bg-white rounded-3xl border border-[#E7DED5] p-5 md:p-8 shadow-sm mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">

            {/* Left: Product Images Gallery */}
            <div>
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-3 bg-[#F7F1E8] border border-[#E7DED5]">
                {discount > 0 && (
                  <span
                    className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-lg text-white text-xs font-bold shadow-sm"
                    style={{ background: '#B89558' }}
                  >
                    {discount}% ছাড়
                  </span>
                )}
                <button
                  onClick={() => setWishlisted(!wishlisted)}
                  className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white border border-[#E7DED5] flex items-center justify-center shadow-sm hover:scale-110 transition-all"
                  aria-label="Wishlist"
                >
                  <Heart
                    className="w-4 h-4"
                    fill={wishlisted ? '#B89558' : 'none'}
                    style={{ color: wishlisted ? '#B89558' : '#80736B' }}
                  />
                </button>
                <img
                  src={currentImage}
                  alt={product.nameBn || product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnails */}
              {allImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto no-scrollbar">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                        selectedImage === idx ? 'border-[#B89558] scale-102' : 'border-[#E7DED5] opacity-70'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Details & Purchase Actions */}
            <div className="flex flex-col justify-between">
              <div>
                {/* Category & Stock Tag */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#B89558]">
                    {product.category?.nameBn || product.category?.name || 'Thawbin ইসলামিক পণ্য'}
                  </span>
                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      inStock ? 'bg-[#E8F5EE] text-[#32805A]' : 'bg-red-50 text-red-600'
                    }`}
                  >
                    {inStock ? '✓ ইন স্টক' : 'স্টক শেষ'}
                  </span>
                </div>

                {/* Product Title */}
                <h1 className="text-xl md:text-3xl font-black mb-1 leading-snug text-[#2B1B16]">
                  {product.nameBn || product.name}
                </h1>
                {product.nameBn && product.name && (
                  <p className="text-xs md:text-sm text-[#80736B] mb-4 font-medium">
                    {product.name}
                  </p>
                )}

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-6 p-4 rounded-2xl bg-[#F7F1E8] border border-[#E7DED5]">
                  <span className="text-2xl md:text-3xl font-black text-[#2B1B16]">
                    ৳{sellingPrice.toLocaleString()}
                  </span>
                  {discount > 0 && (
                    <span className="text-sm line-through text-[#80736B] font-medium">
                      ৳{regularPrice.toLocaleString()}
                    </span>
                  )}
                  {discount > 0 && (
                    <span className="text-xs font-bold text-[#B89558] ml-auto">
                      সাশ্রয় ৳{(regularPrice - sellingPrice).toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Variants: Size Selector (for clothing) */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="mb-5">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#2B1B16]">
                        সাইজ নির্বাচন করুন:
                      </label>
                      <span className="text-[11px] text-[#B89558] font-bold">স্ট্যান্ডার্ড ফিট</span>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {product.sizes.map((s) => (
                        <button
                          key={s}
                          onClick={() => setSelectedSize(s)}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                            selectedSize === s
                              ? 'bg-[#2B1B16] text-white border-[#2B1B16] shadow-sm'
                              : 'bg-white text-[#2B1B16] border-[#E7DED5] hover:bg-[#F7F1E8]'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Variants: Color Selector if available */}
                {product.colors && product.colors.length > 0 && (
                  <div className="mb-5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#2B1B16] mb-2">
                      রং:
                    </label>
                    <div className="flex gap-2 flex-wrap">
                      {product.colors.map((c) => (
                        <button
                          key={c}
                          onClick={() => setSelectedColor(c)}
                          className={`px-3 py-1 rounded-xl text-xs font-semibold border transition-all ${
                            selectedColor === c
                              ? 'bg-[#B89558] text-white border-[#B89558]'
                              : 'bg-white text-[#2B1B16] border-[#E7DED5]'
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity Selector */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#2B1B16]">
                    পরিমাণ:
                  </span>
                  <div className="flex items-center border border-[#E7DED5] rounded-xl bg-[#F7F1E8]">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 text-[#2B1B16] hover:bg-white rounded-l-xl transition-colors"
                      disabled={quantity <= 1}
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-10 text-center font-bold text-sm text-[#2B1B16]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 text-[#2B1B16] hover:bg-white rounded-r-xl transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                {/* Action Buttons: Add to Cart & Buy Now */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <button
                    onClick={handleAddToCart}
                    disabled={isAdding || added || !inStock}
                    className="w-full py-3 md:py-3.5 rounded-xl font-bold text-xs md:text-sm border transition-all flex items-center justify-center gap-2 active:scale-98 shadow-sm"
                    style={{
                      background: added ? '#E8F5EE' : '#FAF6F0',
                      color: added ? '#32805A' : '#2B1B16',
                      borderColor: added ? '#32805A' : '#E7DED5',
                    }}
                  >
                    <ShoppingBag size={16} />
                    <span>{isAdding ? 'যুক্ত হচ্ছে...' : added ? '✓ ব্যাগে যুক্ত হয়েছে' : 'কার্টে যোগ করুন'}</span>
                  </button>

                  <button
                    onClick={handleBuyNow}
                    disabled={!inStock}
                    className="w-full py-3 md:py-3.5 rounded-xl font-bold text-xs md:text-sm text-white transition-all shadow-md hover:opacity-90 active:scale-98 flex items-center justify-center gap-1.5"
                    style={{ background: '#2B1B16' }}
                  >
                    <span>সরাসরি অর্ডার করুন</span>
                  </button>
                </div>
              </div>

              {/* Delivery and Trust summary */}
              <div className="border-t border-[#E7DED5] pt-4 space-y-2 text-xs text-[#80736B]">
                <div className="flex items-center gap-2">
                  <Truck size={15} style={{ color: '#B89558' }} />
                  <span>সারাদেশে হোম ডেলিভারি (ক্যাশ অন ডেলিভারি প্রযোজ্য)</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw size={15} style={{ color: '#B89558' }} />
                  <span>৭ দিনের সহজ সাইজ এক্সচেঞ্জ ও রিটার্ন গ্যারান্টি</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={15} style={{ color: '#B89558' }} />
                  <span>১০০% খাঁটি উপাদানের নিশ্চয়তা ও স্বচ্ছ সার্ভিস</span>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* ── Product Tabs: Description, Specs, Delivery ─────────────── */}
        <div className="bg-white rounded-3xl border border-[#E7DED5] p-5 md:p-8 shadow-sm mb-14">
          <div className="flex border-b border-[#E7DED5] gap-4 md:gap-8 mb-6 overflow-x-auto no-scrollbar">
            {[
              { id: 'description', label: 'পণ্যের বিবরণ' },
              { id: 'specifications', label: 'স্পেসিফিকেশন ও সাইজ' },
              { id: 'delivery', label: 'ডেলিভারি ও রিটার্ন পলিসি' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 text-xs md:text-sm font-bold border-b-2 whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'border-[#B89558] text-[#2B1B16]'
                    : 'border-transparent text-[#80736B] hover:text-[#2B1B16]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'description' && (
            <div className="text-xs md:text-sm leading-relaxed space-y-4 text-[#2A211D]">
              <p>{product.descriptionBn || product.description}</p>
              {product.fabric && (
                <p>
                  <strong>কাপড়ের বিবরণ:</strong> {product.fabric}
                </p>
              )}
              {product.fragranceNotes && (
                <p>
                  <strong>সুগন্ধির নোটস:</strong> {product.fragranceNotes}
                </p>
              )}
              {product.boxIncludes && (
                <p>
                  <strong>উপহার বক্সে যা থাকছে:</strong> {product.boxIncludes}
                </p>
              )}
            </div>
          )}

          {activeTab === 'specifications' && (
            <div className="text-xs md:text-sm space-y-3">
              <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#E7DED5]">
                <p className="font-semibold text-[#2B1B16] mb-1">প্রোডাক্ট স্পেসিফিকেশন:</p>
                <p className="text-[#80736B] leading-relaxed">
                  {product.specification || '১০০% খাঁটি ও পরীক্ষিত ইসলামিক লাইফস্টাইল পণ্য।'}
                </p>
              </div>

              {/* Clothing Size Chart Guide */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="p-4 rounded-xl bg-white border border-[#E7DED5]">
                  <p className="font-bold text-[#2B1B16] mb-2">পাঞ্জাবি সাইজ চার্ট (ইঞ্চি):</p>
                  <div className="grid grid-cols-4 gap-2 text-center text-xs">
                    <div className="p-2 bg-[#FAF6F0] rounded-lg font-semibold">সাইজ ৩৮: বুক ৪০", ঝুল ৪০"</div>
                    <div className="p-2 bg-[#FAF6F0] rounded-lg font-semibold">সাইজ ৪০: বুক ৪২", ঝুল ৪২"</div>
                    <div className="p-2 bg-[#FAF6F0] rounded-lg font-semibold">সাইজ ৪২: বুক ৪৪", ঝুল ৪৪"</div>
                    <div className="p-2 bg-[#FAF6F0] rounded-lg font-semibold">সাইজ ৪৪: বুক ৪৬", ঝুল ৪৪"</div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'delivery' && (
            <div className="text-xs md:text-sm space-y-3 text-[#2A211D]">
              <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#E7DED5] space-y-2">
                <p className="font-bold text-[#2B1B16]">ডেলিভারি চার্জ ও সময়সীমা:</p>
                <ul className="list-disc pl-5 space-y-1 text-[#80736B]">
                  <li>ঢাকা সিটির ভেতর: হোম ডেলিভারি ৬০ টাকা (২৪ - ৪৮ ঘণ্টা)</li>
                  <li>ঢাকার বাইরে সারাদেশে: ১২০ টাকা (২ - ৩ কার্যদিবস)</li>
                  <li>ক্যাশ অন ডেলিভারি (COD) সুবিধা সারাদেশে প্রযোজ্য</li>
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#E7DED5] space-y-1">
                <p className="font-bold text-[#2B1B16]">এক্সচেঞ্জ বা রিটার্ন নীতি:</p>
                <p className="text-[#80736B]">
                  পণ্য ডেলিভারি পাওয়ার পর কোনো সাইজ জনিত সমস্যা বা ত্রুটি থাকলে পণ্য পাওয়ার ৭ দিনের মধ্যে আমাদের হটলাইনে কল করে বা হোয়াটসঅ্যাপে মেসেজ দিয়ে এক্সচেঞ্জ সম্পন্ন করতে পারবেন।
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ── Related Islamic Products ──────────────────────────────── */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-black text-[#2B1B16]" style={{ fontFamily: "'Playfair Display', serif" }}>
                সম্পর্কিত ইসলামিক পণ্য
              </h2>
              <Link
                href={`/category/${product.category?.slug || product.category}`}
                className="text-xs font-bold text-[#B89558] hover:underline"
              >
                আরও দেখুন →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p._id || p.slug} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
