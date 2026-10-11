'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight, X, Sparkles } from 'lucide-react';
import { useCategories } from '../context/CategoryContext';
import CategoryItem from './CategoryItem';
import { ISLAMIC_CATEGORIES } from '@/lib/islamicCatalog';

export default function CategoryMenu() {
  const [categories, setCategories] = useState(ISLAMIC_CATEGORIES);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openMoreDropdown, setOpenMoreDropdown] = useState(false);
  const { isSidebarOpen, closeSidebar } = useCategories();
  const sidebarRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories?nested=true', { cache: 'no-store' });
        const data = await res.json();
        if (data.categories && data.categories.length > 0) {
          setCategories(data.categories);
        }
      } catch (err) {
        // Fallback already set to ISLAMIC_CATEGORIES
      }
    };
    fetchCategories();
  }, []);

  // Primary categories to show in the main bar
  const mainBarSlugs = [
    'panjabi', 'attar', 'topi', 'prayer-mats', 'tasbih',
    'quran-and-books', 'hijab-and-abaya', 'islamic-gifts', 'ramadan-and-eid'
  ];

  const primaryCategories = categories.filter(c => mainBarSlugs.includes(c.slug));
  const moreCategories = categories.filter(c => !mainBarSlugs.includes(c.slug));

  return (
    <>
      {/* ── Desktop Category Navigation Bar ─────────────────────────── */}
      <div className="w-full hidden md:block sticky top-16 z-40 shadow-sm"
        style={{
          background: "#2B1B16",
          borderTop: "1px solid rgba(184,149,88,0.25)",
          borderBottom: "1px solid rgba(184,149,88,0.20)"
        }}>
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center gap-5 py-2.5 text-[13px] font-semibold tracking-wide overflow-x-auto no-scrollbar">
            <li>
              <Link href="/" className="transition-colors hover:text-[#B89558] text-[#F7F1E8]">
                হোম
              </Link>
            </li>
            <li>
              <Link href="/shop" className="transition-colors hover:text-[#B89558] text-[#F7F1E8]">
                সকল পণ্য
              </Link>
            </li>

            {primaryCategories.map((cat, index) => (
              <li
                key={cat._id || cat.slug || index}
                className="relative py-1 cursor-pointer flex items-center gap-1 transition-all"
                style={{ color: "#F7F1E8" }}
                onMouseEnter={() => setOpenDropdown(index)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={`/category/${cat.slug}`}
                  className="flex items-center gap-1 hover:text-[#B89558] transition-colors whitespace-nowrap"
                >
                  <span>{cat.nameBn || cat.name}</span>
                  {cat.subcategories?.length > 0 && <ChevronDown size={12} style={{ color: "#B89558" }} />}
                </Link>

                {/* Subcategories Dropdown */}
                {cat.subcategories?.length > 0 && openDropdown === index && (
                  <div className="absolute top-full left-0 pt-2 z-[9999] min-w-[220px]">
                    <div className="rounded-2xl shadow-2xl py-2 overflow-hidden"
                      style={{ background: "#FFFFFF", border: "1px solid #E7DED5" }}>
                      <div className="px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#B89558] border-b border-[#E7DED5] mb-1">
                        {cat.nameBn || cat.name}
                      </div>
                      {cat.subcategories.map((sub) => (
                        <Link
                          key={sub._id || sub.name}
                          href={`/category/${cat.slug}`}
                          className="flex items-center justify-between px-4 py-2 text-[12px] font-medium transition-colors hover:bg-[#F7F1E8] hover:text-[#2B1B16]"
                          style={{ color: "#2A211D" }}
                        >
                          <span>{sub.nameBn || sub.name}</span>
                          <ChevronRight size={12} style={{ color: "#B89558" }} />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}

            {/* "আরও ক্যাটাগরি" Dropdown */}
            {moreCategories.length > 0 && (
              <li
                className="relative py-1 cursor-pointer flex items-center gap-1 transition-all"
                style={{ color: "#B89558" }}
                onMouseEnter={() => setOpenMoreDropdown(true)}
                onMouseLeave={() => setOpenMoreDropdown(false)}
              >
                <span className="flex items-center gap-1 hover:text-white transition-colors whitespace-nowrap font-bold">
                  <span>আরও ক্যাটাগরি</span>
                  <ChevronDown size={12} />
                </span>

                {openMoreDropdown && (
                  <div className="absolute top-full right-0 pt-2 z-[9999] min-w-[240px]">
                    <div className="rounded-2xl shadow-2xl py-2 overflow-hidden"
                      style={{ background: "#FFFFFF", border: "1px solid #E7DED5" }}>
                      <div className="px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#B89558] border-b border-[#E7DED5] mb-1">
                        অন্যান্য ইসলামিক সংগ্রহ
                      </div>
                      {moreCategories.map((cat) => (
                        <Link
                          key={cat._id || cat.slug}
                          href={`/category/${cat.slug}`}
                          className="flex items-center justify-between px-4 py-2 text-[12px] font-medium transition-colors hover:bg-[#F7F1E8] hover:text-[#2B1B16]"
                          style={{ color: "#2A211D" }}
                        >
                          <span>{cat.nameBn || cat.name}</span>
                          <ChevronRight size={12} style={{ color: "#B89558" }} />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* ── Mobile Sidebar Navigation ─────────────────────────────────── */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-[1000] md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 backdrop"
            onClick={closeSidebar}
          />

          {/* Drawer Content */}
          <div
            ref={sidebarRef}
            className="sidebar flex flex-col justify-between overflow-hidden"
            style={{
              background: "#FAF6F0",
              borderRight: "1px solid #E7DED5"
            }}
          >
            {/* Header */}
            <div>
              <div className="flex items-center justify-between p-4 border-b"
                style={{ borderColor: "#E7DED5", background: "#2B1B16" }}>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-black text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                    THAWBIN
                  </span>
                  <span className="text-[10px] text-[#B89558] font-bold uppercase tracking-wider">
                    ক্যাটাগরি
                  </span>
                </div>
                <button
                  onClick={closeSidebar}
                  className="p-1 rounded-lg text-white hover:bg-white/10 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Category Items List */}
              <div className="p-3 overflow-y-auto max-h-[calc(100vh-140px)] space-y-1">
                <Link
                  href="/shop"
                  onClick={closeSidebar}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl font-bold text-sm text-white mb-2 transition-all"
                  style={{ background: "#2B1B16" }}
                >
                  <Sparkles size={16} className="text-[#B89558]" />
                  <span>সকল ইসলামিক পণ্য দেখুন</span>
                </Link>

                {categories.map((cat) => (
                  <CategoryItem key={cat._id || cat.slug} category={cat} level={0} />
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t text-center text-xs"
              style={{ borderColor: "#E7DED5", background: "#FFFFFF", color: "#80736B" }}>
              <p className="font-semibold text-[#2B1B16]">Thawbin ইসলামিক ই-কমার্স</p>
              <p className="text-[10px] mt-0.5">খাঁটি ও নির্ভরযোগ্য ইসলামিক পণ্য সম্ভার</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
