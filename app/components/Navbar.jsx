"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { ShoppingBag, Heart, Search, User, Headphones, Menu, X, LogOut, Home, LayoutGrid } from "lucide-react";
import CartDrawer from "./CartDrawer";
import { useCategories } from "../context/CategoryContext";

export default function Navbar() {
  const { cartCount, cart, loading, updateQuantity, removeFromCart, clearCart } = useCart();
  const { user, loading: authLoading, logout } = useAuth();
  const { isSidebarOpen, toggleSidebar } = useCategories();
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

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
    { href: "/shop", label: "Shop" },
    { href: "/categories", label: "Categories" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      {/* ── Desktop Navigation ─────────────────────────────────────── */}
      <nav className="hidden md:block sticky top-0 z-50"
        style={{
          background: "#FFFFFF",
          borderBottom: "1px solid #E7DED5",
          boxShadow: "0 2px 16px rgba(62,39,35,0.08)",
        }}>

        {/* Top strip */}
        <div className="border-b" style={{ borderColor: "#E7DED5", background: "#FAF6F0" }}>
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-8 text-xs" style={{ color: "#80736B" }}>
            <span>Premium Furniture & Adjustable Desks — Crafted for Bangladesh</span>
            <div className="flex items-center gap-4">
              <Link href="/contact" className="hover:text-[#3E2723] transition-colors">Support</Link>
              <Link href="/orders" className="hover:text-[#3E2723] transition-colors">Track Order</Link>
            </div>
          </div>
        </div>

        {/* Main bar */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 gap-6">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-md transition-transform group-hover:scale-105"
                style={{ background: "linear-gradient(135deg, #3E2723, #795548)" }}>
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tight" style={{ color: "#3E2723", fontFamily: "'Playfair Display', serif" }}>
                THAWBIN
              </span>
            </Link>

            {/* Nav links */}
            <div className="flex items-center gap-1">
              {navLinks.map(link => (
                <Link key={link.href} href={link.href}
                  className="px-3 py-1.5 rounded-lg text-sm font-semibold transition-all hover:bg-[#EFE2D4]"
                  style={{ color: "#2B211D" }}>
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Search */}
            <div className="flex-1 max-w-md">
              <form action="/search" className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#80736B" }} />
                <input
                  type="text" name="q"
                  placeholder="Search desks, furniture..."
                  className="w-full pl-9 pr-24 py-2.5 text-sm rounded-xl focus:outline-none transition-all"
                  style={{
                    background: "#FAF6F0",
                    border: "1.5px solid #E7DED5",
                    color: "#2B211D",
                  }}
                  onFocus={e => { e.target.style.borderColor = "#C49A6C"; e.target.style.boxShadow = "0 0 0 3px rgba(196,154,108,0.12)"; }}
                  onBlur={e => { e.target.style.borderColor = "#E7DED5"; e.target.style.boxShadow = "none"; }}
                />
                <button type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 rounded-lg text-xs font-bold text-white transition-all"
                  style={{ background: "#3E2723" }}>
                  Search
                </button>
              </form>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Wishlist */}
              <Link href="/wishlist"
                className="relative p-2.5 rounded-xl transition-all hover:bg-[#EFE2D4]"
                title="Wishlist">
                <Heart className="w-5 h-5" style={{ color: "#3E2723" }} />
              </Link>

              {/* Cart */}
              <button onClick={() => setCartOpen(true)}
                className="relative p-2.5 rounded-xl transition-all hover:bg-[#EFE2D4]"
                title="Cart">
                <ShoppingBag className="w-5 h-5" style={{ color: "#3E2723" }} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 text-white text-xs rounded-full flex items-center justify-center font-bold"
                    style={{ background: "#C49A6C" }}>
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Auth */}
              {!authLoading && (
                user ? (
                  <div className="flex items-center gap-1.5">
                    <Link href="/profile"
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
                      style={{ background: "#3E2723" }}>
                      <User className="w-4 h-4" />
                      {user.name?.split(" ")[0] || "Profile"}
                    </Link>
                    <button onClick={handleLogout}
                      className="p-2 rounded-xl transition-all hover:bg-[#EFE2D4]"
                      style={{ color: "#3E2723" }} title="Logout">
                      <LogOut className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <Link href="/login"
                    className="px-4 py-2 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
                    style={{ background: "#3E2723" }}>
                    Sign In
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* ── Mobile Top Bar ─────────────────────────────────────────── */}
      <div className="md:hidden sticky top-0 z-50"
        style={{ background: "#FFFFFF", borderBottom: "1px solid #E7DED5", boxShadow: "0 2px 12px rgba(62,39,35,0.08)" }}>
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: "#3E2723" }}>
              <ShoppingBag className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-black tracking-tight" style={{ color: "#3E2723", fontFamily: "'Playfair Display', serif" }}>
              THAWBIN
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <button onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-lg transition-all hover:bg-[#EFE2D4]">
              {searchOpen
                ? <X className="w-5 h-5" style={{ color: "#3E2723" }} />
                : <Search className="w-5 h-5" style={{ color: "#3E2723" }} />}
            </button>
            <button onClick={toggleSidebar}
              className="p-2 rounded-lg transition-all hover:bg-[#EFE2D4]"
              aria-label="Categories">
              <Menu className="w-5 h-5" style={{ color: "#3E2723" }} />
            </button>
          </div>
        </div>

        {/* Expandable Search */}
        {searchOpen && (
          <div className="px-4 pb-3">
            <form action="/search" className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#80736B" }} />
              <input
                type="text" name="q"
                placeholder="Search desks, furniture..."
                className="w-full pl-9 pr-16 py-2.5 text-sm rounded-xl focus:outline-none"
                style={{ background: "#FAF6F0", border: "1.5px solid #C49A6C", color: "#2B211D" }}
                autoFocus
              />
              <button type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 rounded-lg text-xs font-bold text-white"
                style={{ background: "#3E2723" }}>
                Go
              </button>
            </form>
          </div>
        )}
      </div>

      {/* ── Mobile Bottom Navigation Bar ────────────────────────────── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 shadow-[0_-4px_24px_rgba(43,27,24,0.3)]"
        style={{
          background: "#2B1B18",
          borderTop: "1px solid rgba(196,154,108,0.25)",
          paddingBottom: "env(safe-area-inset-bottom, 0px)"
        }}>
        <div className="flex items-center justify-around py-2 px-1 max-w-md mx-auto">

          {/* Home */}
          <Link href="/"
            className="flex flex-col items-center justify-center flex-1 py-1 transition-all active:scale-95 text-[#FAF6F0]/75 hover:text-[#C49A6C]">
            <Home className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-semibold tracking-wide">Home</span>
          </Link>

          {/* Shop */}
          <Link href="/shop"
            className="flex flex-col items-center justify-center flex-1 py-1 transition-all active:scale-95 text-[#FAF6F0]/75 hover:text-[#C49A6C]">
            <LayoutGrid className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-semibold tracking-wide">Shop</span>
          </Link>

          {/* Cart — Raised Center Button */}
          <div className="flex-1 flex justify-center -mt-6">
            <button
              onClick={() => setCartOpen(true)}
              className="relative w-14 h-14 rounded-full flex items-center justify-center active:scale-95 transition-all"
              style={{
                background: "linear-gradient(135deg, #C49A6C 0%, #8D5B32 100%)",
                boxShadow: "0 6px 20px rgba(196,154,108,0.5)",
                border: "3.5px solid #2B1B18"
              }}
              aria-label="Open Cart"
            >
              <ShoppingBag className="w-6 h-6 text-white" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 text-white text-[10px] rounded-full flex items-center justify-center font-bold bg-[#3E2723] border border-[#C49A6C]">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Wishlist */}
          <Link href="/wishlist"
            className="flex flex-col items-center justify-center flex-1 py-1 transition-all active:scale-95 text-[#FAF6F0]/75 hover:text-[#C49A6C]">
            <Heart className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-semibold tracking-wide">Wishlist</span>
          </Link>

          {/* Account */}
          <Link href={user ? "/profile" : "/login"}
            className="flex flex-col items-center justify-center flex-1 py-1 transition-all active:scale-95 text-[#FAF6F0]/75 hover:text-[#C49A6C]">
            <User className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-semibold tracking-wide">{user ? "Account" : "Sign In"}</span>
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
