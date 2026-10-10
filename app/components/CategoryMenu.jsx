'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight, X, Sparkles } from 'lucide-react';
import { useCategories } from '../context/CategoryContext';
import CategoryItem from './CategoryItem';

const fallbackCategories = [
  {
    _id: 'c1',
    name: 'Standing Desks',
    slug: 'standing-desks',
    subcategories: [
      { _id: 'c1-1', name: 'Dual Motor Desks', slug: 'standing-desks' },
      { _id: 'c1-2', name: 'L-Shaped Corner Desks', slug: 'standing-desks' },
      { _id: 'c1-3', name: 'Single Motor Desks', slug: 'standing-desks' },
    ]
  },
  {
    _id: 'c2',
    name: 'Table Tops',
    slug: 'table-tops',
    subcategories: [
      { _id: 'c2-1', name: 'Solid Teak Wood', slug: 'table-tops' },
      { _id: 'c2-2', name: 'Walnut & Oak Tops', slug: 'table-tops' },
      { _id: 'c2-3', name: 'Ergonomic Curved Tops', slug: 'table-tops' },
    ]
  },
  {
    _id: 'c3',
    name: 'Ergonomic Chairs',
    slug: 'ergonomic-chairs',
    subcategories: [
      { _id: 'c3-1', name: 'Executive Leather Chairs', slug: 'ergonomic-chairs' },
      { _id: 'c3-2', name: 'High-Back Breathable Mesh', slug: 'ergonomic-chairs' },
    ]
  },
  {
    _id: 'c4',
    name: 'Desk Accessories',
    slug: 'accessories',
    subcategories: [
      { _id: 'c4-1', name: 'Cable Management Spines', slug: 'accessories' },
      { _id: 'c4-2', name: 'Monitor Arms & Risers', slug: 'accessories' },
      { _id: 'c4-3', name: 'Under-Desk Drawers', slug: 'accessories' },
    ]
  },
  {
    _id: 'c5',
    name: 'Custom Builds',
    slug: 'custom-builds',
  }
];

const CategoryMenu = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openSubSubDropdown, setOpenSubSubDropdown] = useState(null);
  const { isSidebarOpen, closeSidebar } = useCategories();
  const sidebarRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories?nested=true', { cache: 'no-store' });
        const data = await res.json();
        if (data.categories && data.categories.length > 0) {
          setCategories(data.categories);
        } else {
          setCategories(fallbackCategories);
        }
      } catch (err) {
        setCategories(fallbackCategories);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const displayCategories = categories.length > 0 ? categories : fallbackCategories;

  if (loading) {
    return (
      <div className="w-full h-11 hidden md:block" style={{ background: "#3E2723" }}>
        <div className="max-w-7xl mx-auto px-4 flex items-center h-full">
          <div className="h-4 w-40 rounded animate-pulse" style={{ background: "rgba(255,255,255,0.15)" }}></div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Desktop Category Menu */}
      <div className="w-full hidden md:block sticky top-16 z-40 shadow-sm"
        style={{
          background: "#3E2723",
          borderTop: "1px solid rgba(196,154,108,0.2)",
          borderBottom: "1px solid rgba(196,154,108,0.15)"
        }}>
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center gap-7 py-2.5 text-[12px] font-bold tracking-wider">
            <li>
              <Link href="/" className="transition-colors hover:text-[#C49A6C] uppercase" style={{ color: "#FAF6F0" }}>
                Home
              </Link>
            </li>

            {displayCategories.map((cat, index) => (
              <li
                key={cat._id || cat.name}
                className="relative py-1 cursor-pointer flex items-center gap-1 transition-all uppercase"
                style={{ color: "#FAF6F0" }}
                onMouseEnter={() => setOpenDropdown(index)}
                onMouseLeave={() => { setOpenDropdown(null); setOpenSubSubDropdown(null); }}
              >
                <Link
                  href={cat.slug ? `/category/${cat.slug}` : '/shop'}
                  className="flex items-center gap-1 hover:text-[#C49A6C] transition-colors"
                >
                  <span>{cat.name}</span>
                  {cat.subcategories?.length > 0 && <ChevronDown size={13} style={{ color: "#C49A6C" }} />}
                </Link>

                {/* Level 2 Dropdown */}
                {cat.subcategories?.length > 0 && openDropdown === index && (
                  <div className="absolute top-full left-0 pt-2 z-[9999] min-w-[230px]">
                    <div className="rounded-2xl shadow-2xl py-2 overflow-hidden"
                      style={{ background: "#FFFFFF", border: "1px solid #E7DED5" }}>
                      {cat.subcategories.map((sub, subIndex) => (
                        <div
                          key={sub._id || sub.name}
                          className="relative"
                          onMouseEnter={() => setOpenSubSubDropdown(`${index}-${subIndex}`)}
                        >
                          <Link
                            href={sub.slug ? `/category/${sub.slug}` : '/shop'}
                            className="flex items-center justify-between px-5 py-2.5 text-[12px] font-semibold transition-colors hover:bg-[#FAF6F0] hover:text-[#3E2723]"
                            style={{ color: "#2B211D" }}
                          >
                            <span>{sub.name}</span>
                            {sub.subcategories?.length > 0 && <ChevronRight size={13} style={{ color: "#C49A6C" }} />}
                          </Link>

                          {/* Level 3 Dropdown */}
                          {sub.subcategories?.length > 0 && openSubSubDropdown === `${index}-${subIndex}` && (
                            <div className="absolute top-0 left-full pl-1 z-[1000] min-w-[210px]">
                              <div className="rounded-2xl shadow-2xl py-2"
                                style={{ background: "#FFFFFF", border: "1px solid #E7DED5" }}>
                                {sub.subcategories.map((subSub) => (
                                  <Link
                                    key={subSub._id || subSub.name}
                                    href={subSub.slug ? `/category/${subSub.slug}` : '/shop'}
                                    className="block px-5 py-2.5 text-[12px] font-semibold hover:bg-[#FAF6F0] hover:text-[#3E2723] transition-colors"
                                    style={{ color: "#2B211D" }}
                                  >
                                    {subSub.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}

            <li className="ml-auto">
              <Link href="/shop"
                className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black transition-all hover:opacity-90"
                style={{ background: "#C49A6C", color: "#2B1B18" }}>
                <Sparkles className="w-3 h-3" />
                Customize Desk
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Category Sidebar */}
      {isSidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-50 lg:hidden backdrop-blur-sm"
            onClick={closeSidebar}
          />
          <div
            ref={sidebarRef}
            className="fixed left-0 top-0 h-full w-80 shadow-2xl z-50 lg:hidden flex flex-col"
            style={{ background: "#FFFFFF" }}
          >
            {/* Header */}
            <div className="p-4 flex items-center justify-between"
              style={{ background: "#2B1B18", borderBottom: "1px solid rgba(196,154,108,0.25)" }}>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#C49A6C" }}>Browse</p>
                <h2 className="text-lg font-black text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Categories
                </h2>
              </div>
              <button
                onClick={closeSidebar}
                className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Categories List */}
            <div className="p-4 overflow-y-auto flex-1">
              <nav className="space-y-1">
                {displayCategories.map((category) => (
                  <CategoryItem
                    key={category._id || category.name}
                    category={category}
                    level={0}
                  />
                ))}
              </nav>
            </div>

            {/* Footer banner */}
            <div className="p-4" style={{ background: "#FAF6F0", borderTop: "1px solid #E7DED5" }}>
              <Link
                href="/shop"
                onClick={closeSidebar}
                className="w-full py-3 rounded-xl font-bold text-center block text-xs tracking-wider uppercase text-white shadow-md transition-all active:scale-[0.99]"
                style={{ background: "#3E2723" }}
              >
                Browse All Products
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CategoryMenu;
