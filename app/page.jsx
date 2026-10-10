'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Loader2, Star, Truck, ShieldCheck, RotateCcw, Award } from 'lucide-react';
import HeroBanner from './components/HeroBanner';
import Features from './components/Features';
import ProductCard from './components/ProductCard';

// ─── Color constants ────────────────────────────────────────
const C = {
  primary:   '#3E2723',
  deep:      '#2B1B18',
  secondary: '#5D4037',
  caramel:   '#C49A6C',
  cream:     '#FAF6F0',
  border:    '#E7DED5',
  text:      '#2B211D',
  muted:     '#80736B',
  success:   '#32805A',
};

const deskCategories = [
  { name: 'Adjustable Desks', slug: 'adjustable-desks', icon: '🖥️', count: '24 styles' },
  { name: 'Standing Desks',   slug: 'standing-desks',   icon: '⬆️', count: '18 styles' },
  { name: 'Corner Desks',     slug: 'corner-desks',     icon: '📐', count: '12 styles' },
  { name: 'Executive Desks',  slug: 'executive-desks',  icon: '💼', count: '16 styles' },
  { name: 'Home Office',      slug: 'home-office',      icon: '🏠', count: '30 styles' },
  { name: 'Accessories',      slug: 'accessories',      icon: '🔧', count: '50+ items' },
];

const reviews = [
  { name: 'Rakibul H.', rating: 5, text: 'Best desk I have ever owned. The adjustable height mechanism is smooth and the build quality is exceptional.', location: 'Dhaka' },
  { name: 'Fatema K.', rating: 5, text: 'Thawbin delivered on time and the assembly was easy. My home office looks like a premium workspace now!', location: 'Chittagong' },
  { name: 'Mehedi A.', rating: 5, text: 'I customized my desk size and it fits perfectly in my room. The dark walnut finish is absolutely stunning.', location: 'Sylhet' },
];

const benefits = [
  { icon: Truck,       title: 'Free Delivery',    desc: 'On orders over ৳3,000' },
  { icon: ShieldCheck, title: '2-Year Warranty',  desc: 'On all Thawbin desks' },
  { icon: RotateCcw,   title: 'Easy Returns',     desc: '30-day return policy' },
  { icon: Award,       title: 'Quality Assured',  desc: 'Certified materials' },
];

export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const [cRes, fRes, nRes] = await Promise.all([
        fetch('/api/categories'),
        fetch('/api/products?featured=true&limit=8'),
        fetch('/api/products?sort=-createdAt&limit=4'),
      ]);
      const [cData, fData, nData] = await Promise.all([cRes.json(), fRes.json(), nRes.json()]);
      setCategories(cData.categories || []);
      setFeaturedProducts(fData.products || []);
      setNewArrivals(nData.products || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const displayCategories = categories.length > 0 ? categories : deskCategories;

  return (
    <div style={{ background: C.cream, minHeight: '100vh' }}>

      {/* ── Hero Banner ────────────────────────────────────── */}
      <HeroBanner />

      {/* ── Features Strip ─────────────────────────────────── */}
      <Features />

      {/* ── Shop by Category ──────────────────────────────── */}
      <section className="py-8 md:py-14" style={{ background: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-3 md:px-4">
          <div className="flex items-end justify-between mb-6 md:mb-8">
            <div>
              <p className="text-xs uppercase tracking-widest font-bold mb-1" style={{ color: C.caramel }}>Browse</p>
              <h2 className="text-2xl md:text-3xl font-black" style={{ color: C.text, fontFamily: "'Playfair Display', serif" }}>
                Shop by Category
              </h2>
            </div>
            <Link href="/categories" className="flex items-center gap-1 text-sm font-bold transition-colors hover:opacity-70"
              style={{ color: C.primary }}>
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-4">
            {displayCategories.slice(0, 6).map((cat, i) => {
              const dc = deskCategories[i] || {};
              return (
                <Link key={cat._id || cat.slug || i}
                  href={`/category/${cat.slug || dc.slug}`}
                  className="group flex flex-col items-center gap-2 p-3 md:p-5 rounded-2xl text-center transition-all"
                  style={{ background: C.cream, border: `1.5px solid ${C.border}` }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#EFE2D4'; e.currentTarget.style.borderColor = C.caramel; }}
                  onMouseLeave={e => { e.currentTarget.style.background = C.cream; e.currentTarget.style.borderColor = C.border; }}>
                  <div className="text-2xl md:text-3xl">{cat.icon || dc.icon || '📦'}</div>
                  <div>
                    <h3 className="font-bold text-[11px] md:text-sm leading-tight" style={{ color: C.text }}>
                      {cat.name || dc.name}
                    </h3>
                    <p className="text-[9px] md:text-xs mt-0.5" style={{ color: C.muted }}>
                      {dc.count || ''}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Customize Banner ───────────────────────────────── */}
      <section className="py-8 md:py-12" style={{ background: C.cream }}>
        <div className="max-w-7xl mx-auto px-3 md:px-4">
          <div className="relative rounded-2xl overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${C.deep} 0%, ${C.primary} 55%, #5D4037 100%)` }}>
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=1200&h=400&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
            <div className="relative z-10 px-6 py-10 md:px-14 md:py-16 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <div className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3"
                  style={{ background: 'rgba(196,154,108,0.25)', color: '#E8C89A', border: '1px solid rgba(196,154,108,0.4)' }}>
                  Made for You
                </div>
                <h2 className="text-2xl md:text-4xl font-black text-white mb-3 leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}>
                  Customize Your Desk
                </h2>
                <p className="text-sm md:text-base leading-relaxed max-w-md" style={{ color: 'rgba(255,255,255,0.80)' }}>
                  Choose your dimensions, finish, and accessories. We craft each Thawbin desk to your exact specifications.
                </p>
              </div>
              <div className="flex flex-col gap-3 flex-shrink-0">
                <Link href="/shop"
                  className="px-7 py-3 rounded-xl font-bold text-sm text-white text-center transition-all hover:opacity-90"
                  style={{ background: C.caramel }}>
                  Start Customizing →
                </Link>
                <Link href="/contact"
                  className="px-7 py-3 rounded-xl font-bold text-sm text-center transition-all"
                  style={{ background: 'rgba(255,255,255,0.12)', color: '#FFF', border: '1.5px solid rgba(255,255,255,0.3)' }}>
                  Talk to an Expert
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Products ──────────────────────────────── */}
      <section className="py-8 md:py-14" style={{ background: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-3 md:px-4">
          <div className="flex items-end justify-between mb-6 md:mb-8">
            <div>
              <p className="text-xs uppercase tracking-widest font-bold mb-1" style={{ color: C.caramel }}>Bestsellers</p>
              <h2 className="text-2xl md:text-3xl font-black" style={{ color: C.text, fontFamily: "'Playfair Display', serif" }}>
                Featured Desks
              </h2>
            </div>
            <Link href="/shop" className="flex items-center gap-1 text-sm font-bold transition-colors hover:opacity-70"
              style={{ color: C.primary }}>
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-14">
              <Loader2 className="w-8 h-8 animate-spin" style={{ color: C.caramel }} />
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
              {featuredProducts.map(p => <ProductCard key={p._id} product={p} />)}
            </div>
          ) : (
            <div className="text-center py-12 rounded-2xl" style={{ background: C.cream }}>
              <p className="text-sm mb-3" style={{ color: C.muted }}>No products yet.</p>
              <Link href="/admin/products" className="text-sm font-bold" style={{ color: C.primary }}>
                Add products from admin →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ── New Arrivals ───────────────────────────────────── */}
      <section className="py-8 md:py-14" style={{ background: C.cream }}>
        <div className="max-w-7xl mx-auto px-3 md:px-4">
          <div className="flex items-end justify-between mb-6 md:mb-8">
            <div>
              <p className="text-xs uppercase tracking-widest font-bold mb-1" style={{ color: C.caramel }}>Fresh In</p>
              <h2 className="text-2xl md:text-3xl font-black" style={{ color: C.text, fontFamily: "'Playfair Display', serif" }}>
                New Arrivals
              </h2>
            </div>
            <Link href="/shop" className="flex items-center gap-1 text-sm font-bold hover:opacity-70 transition-colors"
              style={{ color: C.primary }}>
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-14">
              <Loader2 className="w-8 h-8 animate-spin" style={{ color: C.caramel }} />
            </div>
          ) : newArrivals.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
              {newArrivals.map(p => <ProductCard key={p._id} product={p} />)}
            </div>
          ) : (
            <div className="text-center py-12 rounded-2xl" style={{ background: '#FFF', border: `1px solid ${C.border}` }}>
              <p className="text-sm" style={{ color: C.muted }}>New products coming soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── Delivery & Warranty Benefits ───────────────────── */}
      <section className="py-8 md:py-12" style={{ background: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-3 md:px-4">
          <div className="text-center mb-8">
            <p className="text-xs uppercase tracking-widest font-bold mb-1" style={{ color: C.caramel }}>Why Thawbin</p>
            <h2 className="text-2xl md:text-3xl font-black" style={{ color: C.text, fontFamily: "'Playfair Display', serif" }}>
              Our Promise to You
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
            {benefits.map((b, i) => (
              <div key={i} className="text-center p-5 md:p-7 rounded-2xl"
                style={{ background: C.cream, border: `1px solid ${C.border}` }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                  style={{ background: '#EFE2D4' }}>
                  <b.icon className="w-5 h-5" style={{ color: C.primary }} />
                </div>
                <h3 className="font-black text-sm mb-1" style={{ color: C.text }}>{b.title}</h3>
                <p className="text-xs" style={{ color: C.muted }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Customer Reviews ───────────────────────────────── */}
      <section className="py-8 md:py-14" style={{ background: C.cream }}>
        <div className="max-w-7xl mx-auto px-3 md:px-4">
          <div className="text-center mb-8">
            <p className="text-xs uppercase tracking-widest font-bold mb-1" style={{ color: C.caramel }}>Testimonials</p>
            <h2 className="text-2xl md:text-3xl font-black" style={{ color: C.text, fontFamily: "'Playfair Display', serif" }}>
              What Our Customers Say
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {reviews.map((r, i) => (
              <div key={i} className="p-5 md:p-6 rounded-2xl"
                style={{ background: '#FFFFFF', border: `1px solid ${C.border}` }}>
                <div className="flex gap-0.5 mb-3">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} className="w-4 h-4" fill="#E5A33D" style={{ color: '#E5A33D' }} />
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: C.muted }}>"{r.text}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm text-white"
                    style={{ background: C.primary }}>
                    {r.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-bold" style={{ color: C.text }}>{r.name}</p>
                    <p className="text-xs" style={{ color: C.muted }}>{r.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter ─────────────────────────────────────── */}
      <section className="py-10 md:py-16" style={{ background: C.primary }}>
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Stay in the Loop
          </h2>
          <p className="text-sm md:text-base mb-6" style={{ color: 'rgba(255,255,255,0.75)' }}>
            Get exclusive deals, new arrivals, and workspace inspiration delivered to your inbox.
          </p>
          <form className="flex gap-2 max-w-md mx-auto"
            onSubmit={e => { e.preventDefault(); alert('Thank you for subscribing!'); setEmail(''); }}>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-4 py-3 rounded-xl text-sm focus:outline-none"
              style={{ background: 'rgba(255,255,255,0.12)', color: '#FFF', border: '1.5px solid rgba(255,255,255,0.25)' }}
            />
            <button type="submit"
              className="px-6 py-3 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90 flex-shrink-0"
              style={{ background: C.caramel }}>
              Subscribe
            </button>
          </form>
        </div>
      </section>

    </div>
  );
}
