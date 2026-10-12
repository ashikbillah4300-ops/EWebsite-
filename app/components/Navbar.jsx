"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { ShoppingBag, Heart, Search, User, Menu, X, LogOut, Home, LayoutGrid, Sparkles } from "lucide-react";
import CartDrawer from "./CartDrawer";
import { useCategories } from "../context/CategoryContext";

export default function Navbar() {
  const { cartCount, cart, loading, updateQuantity, removeFromCart, clearCart } = useCart();
  const { user, loading: authLoading, logout } = useAuth();
  const { isSidebarOpen, toggleSidebar } = useCategories();
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [announcement, setAnnouncement] = useState("AWBIN-এ স্বাগতম — আপনার পছন্দের ইসলামিক পণ্য এখন একসাথে।");

  useEffect(() => {
    if (cartOpen || isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [cartOpen, isSidebarOpen]);

  const handleLogout = async () => {
    await logout();
    window.location.href = "/";
  };

  const navLinks = [
    { href: "/", label: "হোম" },
    { href: "/shop", label: "সকল পণ্য" },
    { href: "/category/panjabi", label: "পাঞ্জাবি" },
    { href: "/category/attar", label: "আতর" },
    { href: "/category/topi", label: "টুপি" },
    { href: "/category/prayer-mats", label: "জায়নামাজ" },
    { href: "/category/tasbih", label: "তসবিহ" },
    { href: "/category/quran-and-books", label: "কুরআন ও বই" },
    { href: "/category/hijab-and-abaya", label: "হিজাব ও আবায়া" },
    { href: "/category/islamic-gifts", label: "ইসলামিক গিফট" },
    { href: "/category/ramadan-and-eid", label: "রমজান ও ঈদ" },
  ];

  return (
    <>
      {/* ── Section 1: Slim Announcement Bar ──────────────────────── */}
      <div className="border-b" style={{ borderColor: "#E7DED5", background: "#2B1B18" }}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-9 text-xs" style={{ color: "#E7D7C4" }}>
          <div className="flex items-center gap-2 truncate">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#B89558" }}></span>
            <span className="font-medium tracking-wide">{announcement}</span>
          </div>
          <div className="hidden sm:flex items-center gap-5 text-xs flex-shrink-0">
            <span className="text-[#B89558] font-bold">সারাদেশে দ্রুত হোম ডেলিভারি ৳</span>
            <Link href="/orders" className="hover:text-white transition-colors">অর্ডার ট্র্যাকিং</Link>
            <Link href="/contact" className="hover:text-white transition-colors">যোগাযোগ</Link>
          </div>
        </div>
      </div>

      {/* ── Section 2: Header and Desktop Navigation ────────────────── */}
      <nav className="hidden md:block sticky top-0 z-50"
        style={{
          background: "#FFFFFF",
          borderBottom: "1px solid #E7DED5",
          boxShadow: "0 2px 16px rgba(43,27,24,0.06)",
        }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 gap-5">

            {/* Awbin Logo */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
              <img
                src="/logo-wordmark.png"
                alt="AWBIN"
                className="h-10 w-auto rounded-lg shadow-sm object-contain transition-transform group-hover:scale-105"
              />
              <span className="text-[10px] font-bold tracking-widest text-[#B89558] uppercase hidden xl:inline-block">
                Islamic Lifestyle
              </span>
            </Link>

            {/* Search Bar for Islamic Products */}
            <div className="flex-1 max-w-lg">
              <form action="/search" method="GET" className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#80736B" }} />
                <input
                  type="text"
                  name="q"
                  placeholder="পাঞ্জাবি, আতর, জায়নামাজ, কুরআন শরীফ খুঁজুন..."
                  className="w-full pl-10 pr-24 py-2.5 text-sm rounded-xl focus:outline-none transition-all"
                  style={{
                    background: "#F7F1E8",
                    border: "1.5px solid #E7DED5",
                    color: "#2A211D",
                  }}
                  onFocus={e => { e.target.style.borderColor = "#B89558"; e.target.style.boxShadow = "0 0 0 3px rgba(184,149,88,0.15)"; }}
                  onBlur={e => { e.target.style.borderColor = "#E7DED5"; e.target.style.boxShadow = "none"; }}
                />
                <button type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white transition-all hover:opacity-90"
                  style={{ background: "#2B1B16" }}>
                  অনুসন্ধান
                </button>
              </form>
            </div>

            {/* Actions: Wishlist, Cart, Account */}
            <div className="flex items-center gap-2">
              {/* Wishlist */}
              <Link href="/wishlist"
                className="relative p-2.5 rounded-xl transition-all hover:bg-[#F7F1E8]"
                title="পছন্দের তালিকা">
                <Heart className="w-5 h-5" style={{ color: "#2B1B16" }} />
              </Link>

              {/* Shopping Cart */}
              <button onClick={() => setCartOpen(true)}
                className="relative p-2.5 rounded-xl transition-all hover:bg-[#F7F1E8]"
                title="শপিং ব্যাগ">
                <ShoppingBag className="w-5 h-5" style={{ color: "#2B1B16" }} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 text-white text-xs rounded-full flex items-center justify-center font-bold"
                    style={{ background: "#B89558" }}>
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Account & Login */}
              {!authLoading && (
                user ? (
                  <div className="flex items-center gap-1.5">
                    <Link href="/profile"
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
                      style={{ background: "#2B1B16" }}>
                      <User className="w-4 h-4 text-[#B89558]" />
                      {user.name?.split(" ")[0] || "অ্যাকাউন্ট"}
                    </Link>
                    <button onClick={handleLogout}
                      className="p-2 rounded-xl transition-all hover:bg-[#F7F1E8]"
                      style={{ color: "#2B1B16" }} title="লগআউট">
                      <LogOut className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <Link href="/login"
                    className="px-4 py-2 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
                    style={{ background: "#2B1B16" }}>
                    লগইন / সাইন আপ
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* ── Mobile Top Bar ─────────────────────────────────────────── */}
      <div className="md:hidden sticky top-0 z-50"
        style={{ background: "#FFFFFF", borderBottom: "1px solid #E7DED5", boxShadow: "0 2px 12px rgba(43,27,24,0.06)" }}>
        <div className="flex items-center justify-between px-4 py-2.5">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/logo-wordmark.png"
              alt="AWBIN"
              className="h-8 w-auto rounded-md object-contain"
            />
          </Link>

          <div className="flex items-center gap-2">
            <button onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-lg transition-all hover:bg-[#F7F1E8]"
              aria-label="Search">
              {searchOpen
                ? <X className="w-5 h-5" style={{ color: "#2B1B16" }} />
                : <Search className="w-5 h-5" style={{ color: "#2B1B16" }} />}
            </button>
            <button onClick={toggleSidebar}
              className="p-2 rounded-lg transition-all hover:bg-[#F7F1E8]"
              aria-label="ক্যাটাগরি মেনু">
              <Menu className="w-5 h-5" style={{ color: "#2B1B16" }} />
            </button>
          </div>
        </div>

        {/* Expandable Search */}
        {searchOpen && (
          <div className="px-4 pb-3">
            <form action="/search" method="GET" className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#80736B" }} />
              <input
                type="text"
                name="q"
                placeholder="পাঞ্জাবি, আতর, জায়নামাজ খুঁজুন..."
                className="w-full pl-9 pr-16 py-2.5 text-sm rounded-xl focus:outline-none"
                style={{ background: "#F7F1E8", border: "1.5px solid #B89558", color: "#2A211D" }}
                autoFocus
              />
              <button type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 rounded-lg text-xs font-bold text-white"
                style={{ background: "#2B1B16" }}>
                খুঁজুন
              </button>
            </form>
          </div>
        )}
      </div>

      {/* ── Mobile Bottom Navigation Bar ────────────────────────────── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 shadow-[0_-4px_24px_rgba(43,27,24,0.3)]"
        style={{
          background: "#2B1B16",
          borderTop: "1px solid rgba(184,149,88,0.25)",
          paddingBottom: "env(safe-area-inset-bottom, 0px)"
        }}>
        <div className="flex items-center justify-around py-2 px-1 max-w-md mx-auto">

          {/* Home */}
          <Link href="/"
            className="flex flex-col items-center justify-center flex-1 py-1 transition-all active:scale-95 text-[#F7F1E8]/80 hover:text-[#B89558]">
            <Home className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-semibold tracking-wide">হোম</span>
          </Link>

          {/* Shop */}
          <Link href="/shop"
            className="flex flex-col items-center justify-center flex-1 py-1 transition-all active:scale-95 text-[#F7F1E8]/80 hover:text-[#B89558]">
            <LayoutGrid className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-semibold tracking-wide">সকল পণ্য</span>
          </Link>

          {/* Cart — Raised Center Button */}
          <div className="flex-1 flex justify-center -mt-6">
            <button
              onClick={() => setCartOpen(true)}
              className="relative w-14 h-14 rounded-full flex items-center justify-center active:scale-95 transition-all"
              style={{
                background: "linear-gradient(135deg, #B89558 0%, #3A251E 100%)",
                boxShadow: "0 6px 20px rgba(184,149,88,0.4)",
                border: "3.5px solid #2B1B16"
              }}
              aria-label="Open Cart"
            >
              <ShoppingBag className="w-6 h-6 text-white" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 text-white text-[10px] rounded-full flex items-center justify-center font-bold bg-[#2B1B16] border border-[#B89558]">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Wishlist */}
          <Link href="/wishlist"
            className="flex flex-col items-center justify-center flex-1 py-1 transition-all active:scale-95 text-[#F7F1E8]/80 hover:text-[#B89558]">
            <Heart className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-semibold tracking-wide">উইশলিস্ট</span>
          </Link>

          {/* Account */}
          <Link href={user ? "/profile" : "/login"}
            className="flex flex-col items-center justify-center flex-1 py-1 transition-all active:scale-95 text-[#F7F1E8]/80 hover:text-[#B89558]">
            <User className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-semibold tracking-wide">{user ? "প্রোফাইল" : "লগইন"}</span>
          </Link>

        </div>
      </div>

      {/* Cart Drawer */}
      <CartDrawer
        key={`cart-${cartCount}`}
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        loading={loading}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
      />

      {/* Mobile spacer */}
      <div className="md:hidden h-20" />
    </>
  );
}
