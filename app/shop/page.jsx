'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import ProductCard from '../components/ProductCard';
import { 
  Search, SlidersHorizontal, ArrowUpDown, X, Filter, Sparkles, AlertCircle 
} from 'lucide-react';
import { ISLAMIC_CATEGORIES, ISLAMIC_PRODUCTS } from '@/lib/islamicCatalog';

const UNRELATED_KEYWORDS = [
  'iphone', 'samsung', 'mobile', 'phone', 'laptop', 'macbook', 'computer',
  'tv', 'electronics', 'gaming', 'ps5', 'xbox', 'desk', 'standing desk',
  'chair', 'sofa', 'table', 'furniture', 'grocery', 'shoe', 'nike', 'adidas'
];

export default function ShopPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialQuery = searchParams.get('q') || '';

  const [products, setProducts] = useState(ISLAMIC_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [priceFilter, setPriceFilter] = useState('all');
  const [stockOnly, setStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    const fetchApiProducts = async () => {
      try {
        const res = await fetch('/api/products?limit=50');
        const data = await res.json();
        if (data.products && data.products.length > 0) {
          setProducts(data.products);
        }
      } catch (e) {
        // Fallback to ISLAMIC_PRODUCTS
      }
    };
    fetchApiProducts();
  }, []);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  // Check if search query is unrelated
  const isUnrelatedSearch = useMemo(() => {
    if (!searchQuery) return false;
    const q = searchQuery.toLowerCase().trim();
    return UNRELATED_KEYWORDS.some(k => q.includes(k));
  }, [searchQuery]);

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    if (isUnrelatedSearch) return [];

    let list = [...products];

    // Category filter
    if (selectedCategory !== 'all') {
      list = list.filter(p => {
        const catSlug = p.category?.slug || p.category;
        return catSlug === selectedCategory;
      });
    }

    // Search filter (Bengali + English)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(p => {
        const nameMatch = p.name && p.name.toLowerCase().includes(q);
        const nameBnMatch = p.nameBn && p.nameBn.includes(q);
        const descMatch = p.description && p.description.toLowerCase().includes(q);
        const descBnMatch = p.descriptionBn && p.descriptionBn.includes(q);
        const tagMatch = p.tags && p.tags.some(t => t.toLowerCase().includes(q));
        return nameMatch || nameBnMatch || descMatch || descBnMatch || tagMatch;
      });
    }

    // Price filter
    if (priceFilter === 'under-1000') {
      list = list.filter(p => (p.sellingPrice || 0) < 1000);
    } else if (priceFilter === '1000-2500') {
      list = list.filter(p => (p.sellingPrice || 0) >= 1000 && (p.sellingPrice || 0) <= 2500);
    } else if (priceFilter === 'above-2500') {
      list = list.filter(p => (p.sellingPrice || 0) > 2500);
    }

    // Stock availability filter
    if (stockOnly) {
      list = list.filter(p => (p.stockQuantity || 10) > 0 && p.stockStatus !== 'out_of_stock');
    }

    // Sorting
    if (sortBy === 'price-low') {
      list.sort((a, b) => (a.sellingPrice || 0) - (b.sellingPrice || 0));
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => (b.sellingPrice || 0) - (a.sellingPrice || 0));
    } else if (sortBy === 'newest') {
      // Keep default newest order
    }

    return list;
  }, [products, selectedCategory, searchQuery, priceFilter, stockOnly, sortBy, isUnrelatedSearch]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setPriceFilter('all');
    setStockOnly(false);
    setSortBy('newest');
  };

  return (
    <div className="min-h-screen" style={{ background: '#FAF6F0', color: '#2A211D' }}>

      {/* ── Page Header Strip ─────────────────────────────────────── */}
      <div className="py-8 md:py-12 border-b"
        style={{ background: '#2B1B16', borderColor: 'rgba(184,149,88,0.25)' }}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs uppercase tracking-widest font-bold mb-2 text-[#B89558]">
            AWBIN ইসলামিক সংগ্রহ
          </p>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            সকল ইসলামিক পণ্য
          </h1>
          <p className="text-xs md:text-sm text-[#E7D7C4] max-w-lg mx-auto">
            পাঞ্জাবি, আতর, জায়নামাজ, টুপি, তসবিহ ও পবিত্র কুরআনের শতভাগ খাঁটি ও নির্ভরযোগ্য কালেকশন
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* ── Controls Bar: Search, Category Quick Pills & Sort ─────── */}
        <div className="bg-white rounded-2xl p-4 md:p-5 border border-[#E7DED5] shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">

            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#80736B]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="বাংলা বা ইংরেজিতে পণ্য খুঁজুন..."
                className="w-full pl-10 pr-9 py-2.5 text-xs md:text-sm rounded-xl focus:outline-none transition-all"
                style={{ background: '#F7F1E8', border: '1.5px solid #E7DED5', color: '#2A211D' }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Filter Toggle (Mobile) & Sort Selector */}
            <div className="flex items-center gap-3 justify-between md:justify-end">
              <button
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className="md:hidden flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold border border-[#E7DED5] bg-[#F7F1E8]"
              >
                <Filter size={14} />
                <span>ফিল্টার</span>
              </button>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#80736B] hidden sm:inline">সর্ট:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 text-xs md:text-sm rounded-xl border border-[#E7DED5] bg-[#F7F1E8] focus:outline-none font-medium cursor-pointer"
                >
                  <option value="newest">নতুন আগমন (Newest)</option>
                  <option value="price-low">মূল্য: কম থেকে বেশি</option>
                  <option value="price-high">মূল্য: বেশি থেকে কম</option>
                </select>
              </div>
            </div>

          </div>

          {/* Quick Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-4 mt-3 border-t border-[#E7DED5]">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === 'all'
                  ? 'bg-[#2B1B16] text-white shadow-sm'
                  : 'bg-[#F7F1E8] text-[#2A211D] hover:bg-[#EFE2D4]'
              }`}
            >
              সকল ({products.length})
            </button>
            {ISLAMIC_CATEGORIES.map((cat) => {
              const count = products.filter(p => (p.category?.slug || p.category) === cat.slug).length;
              return (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    selectedCategory === cat.slug
                      ? 'bg-[#2B1B16] text-white shadow-sm'
                      : 'bg-[#F7F1E8] text-[#2A211D] hover:bg-[#EFE2D4]'
                  }`}
                >
                  <span>{cat.nameBn}</span>
                  {count > 0 && <span className="opacity-70 text-[10px]">({count})</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Main Layout: Sidebar Filters + Products Grid ───────────── */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">

          {/* Desktop Left Sidebar Filters */}
          <aside className="hidden md:block md:col-span-1 bg-white rounded-2xl p-5 border border-[#E7DED5] shadow-sm space-y-6 sticky top-28">
            <div className="flex items-center justify-between pb-3 border-b border-[#E7DED5]">
              <h3 className="font-bold text-sm text-[#2B1B16] flex items-center gap-1.5">
                <SlidersHorizontal size={15} style={{ color: '#B89558' }} />
                <span>ফিল্টার অপশন</span>
              </h3>
              {(selectedCategory !== 'all' || priceFilter !== 'all' || stockOnly || searchQuery) && (
                <button
                  onClick={resetFilters}
                  className="text-[11px] text-[#B89558] font-bold hover:underline"
                >
                  রিসেট
                </button>
              )}
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-xs font-bold text-[#80736B] uppercase tracking-wider mb-2.5">
                ক্যাটাগরি
              </h4>
              <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                    selectedCategory === 'all'
                      ? 'font-bold bg-[#F7F1E8] text-[#2B1B16] border-l-2 border-[#B89558]'
                      : 'text-[#80736B] hover:text-[#2B1B16]'
                  }`}
                >
                  সকল ক্যাটাগরি
                </button>
                {ISLAMIC_CATEGORIES.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors truncate block ${
                      selectedCategory === cat.slug
                        ? 'font-bold bg-[#F7F1E8] text-[#2B1B16] border-l-2 border-[#B89558]'
                        : 'text-[#80736B] hover:text-[#2B1B16]'
                    }`}
                  >
                    {cat.nameBn}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="pt-3 border-t border-[#E7DED5]">
              <h4 className="text-xs font-bold text-[#80736B] uppercase tracking-wider mb-2.5">
                মূল্য সীমা (৳ BDT)
              </h4>
              <div className="space-y-2 text-xs">
                {[
                  { id: 'all', label: 'সকল মূল্য' },
                  { id: 'under-1000', label: '৳১,০০০ এর নিচে' },
                  { id: '1000-2500', label: '৳১,০০০ – ৳২,৫০০' },
                  { id: 'above-2500', label: '৳২,৫০০ এর উপরে' },
                ].map((p) => (
                  <label key={p.id} className="flex items-center gap-2 cursor-pointer text-[#2A211D]">
                    <input
                      type="radio"
                      name="priceRange"
                      checked={priceFilter === p.id}
                      onChange={() => setPriceFilter(p.id)}
                      className="accent-[#B89558]"
                    />
                    <span>{p.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Stock Availability */}
            <div className="pt-3 border-t border-[#E7DED5]">
              <h4 className="text-xs font-bold text-[#80736B] uppercase tracking-wider mb-2.5">
                স্টক উপস্থিতি
              </h4>
              <label className="flex items-center gap-2 cursor-pointer text-xs text-[#2A211D]">
                <input
                  type="checkbox"
                  checked={stockOnly}
                  onChange={(e) => setStockOnly(e.target.checked)}
                  className="accent-[#B89558] rounded"
                />
                <span>শুধুমাত্র স্টকে থাকা পণ্য</span>
              </label>
            </div>
          </aside>

          {/* ── Products Grid or Empty / Unrelated State ────────────── */}
          <main className="md:col-span-3">

            {/* Unrelated Search Notice */}
            {isUnrelatedSearch ? (
              <div className="bg-white rounded-3xl p-8 md:p-12 text-center border border-[#E7DED5] shadow-sm">
                <div className="w-16 h-16 rounded-full bg-[#F7F1E8] border border-[#B89558] flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-[#B89558]" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-[#2B1B16] mb-3">
                  দুঃখিত, এই পণ্যটি AWBIN-এর ইসলামিক পণ্য সংগ্রহে নেই।
                </h3>
                <p className="text-xs md:text-sm text-[#80736B] max-w-md mx-auto mb-6 leading-relaxed">
                  AWBIN একটি বিশেষায়িত ইসলামিক লাইফস্টাইল শপ। আমরা শুধুমাত্র পাঞ্জাবি, আতর, টুপি, জায়নামাজ, তসবিহ, পবিত্র কুরআন ও ইসলামিক উপহার সামগ্রী সরবরাহ করি।
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <button
                    onClick={resetFilters}
                    className="px-6 py-2.5 rounded-xl font-bold text-xs md:text-sm text-white shadow-md transition-all"
                    style={{ background: '#2B1B16' }}
                  >
                    সকল ইসলামিক পণ্য ব্রাউজ করুন
                  </button>
                </div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-8 md:p-12 text-center border border-[#E7DED5] shadow-sm">
                <p className="text-gray-500 text-base mb-4">কোনো পণ্য পাওয়া যায়নি।</p>
                <button
                  onClick={resetFilters}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white"
                  style={{ background: '#2B1B16' }}
                >
                  ফিল্টার রিসেট করুন
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4 px-1">
                  <p className="text-xs text-[#80736B]">
                    মোট <span className="font-bold text-[#2B1B16]">{filteredProducts.length}</span> টি পণ্য পাওয়া গেছে
                  </p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product._id || product.slug} product={product} />
                  ))}
                </div>
              </>
            )}

          </main>

        </div>

      </div>

    </div>
  );
}
