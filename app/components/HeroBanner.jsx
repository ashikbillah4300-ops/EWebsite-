'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const defaultBanners = [
  {
    id: 1,
    title: 'Build Your Workspace.\nYour Way.',
    description: 'Discover thoughtfully designed desks that bring comfort, style, and productivity to your workspace.',
    image: 'https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=1200&h=600&fit=crop',
    link: '/shop',
    cta: 'Shop Desks',
  },
  {
    id: 2,
    title: 'Adjustable Desks\nfor Every Body.',
    description: 'Sit. Stand. Thrive. Our ergonomic desks adapt to your comfort throughout the day.',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&h=600&fit=crop',
    link: '/shop',
    cta: 'Explore Collection',
  },
  {
    id: 3,
    title: 'Premium Materials.\nTimeless Design.',
    description: 'Crafted from sustainably sourced wood and high-grade steel for furniture that lasts a lifetime.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&h=600&fit=crop',
    link: '/categories',
    cta: 'View Catalogue',
  },
];

const sideBanners = [
  {
    id: 4,
    title: 'Customize\nYour Desk',
    description: 'Choose size, height & finish',
    image: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=600&h=300&fit=crop',
    link: '/shop',
  },
  {
    id: 5,
    title: 'Corporate\nOrders',
    description: 'Bulk pricing available',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=300&fit=crop',
    link: '/contact',
  },
];

export default function HeroBanner({ autoPlayInterval = 4000 }) {
  const [banners, setBanners] = useState(defaultBanners);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch('/api/banners?position=hero');
        const data = await res.json();
        if (data.banners?.length > 0) {
          setBanners(data.banners.map(b => ({
            id: b._id, title: b.title, description: b.description,
            image: b.image, link: b.link || '/shop', cta: 'Shop Now',
          })));
        }
      } catch {
        // use defaults
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();
  }, []);

  useEffect(() => {
    if (banners.length <= 1) return;
    const t = setInterval(() => setCurrentSlide(p => (p + 1) % banners.length), autoPlayInterval);
    return () => clearInterval(t);
  }, [banners.length, autoPlayInterval]);

  if (loading) {
    return (
      <section className="py-4 md:py-6" style={{ background: '#FAF6F0' }}>
        <div className="max-w-7xl mx-auto px-2 md:px-4">
          <div className="h-[280px] md:h-[420px] rounded-2xl animate-pulse" style={{ background: '#EFE2D4' }} />
        </div>
      </section>
    );
  }

  return (
    <section className="py-4 md:py-6" style={{ background: '#FAF6F0' }}>
      <div className="max-w-7xl mx-auto px-2 md:px-4">
        <div className="md:grid md:grid-cols-3 md:gap-4">

          {/* Main Carousel */}
          <div className="md:col-span-2 relative h-[250px] md:h-[420px] rounded-2xl overflow-hidden group">
            {banners.map((banner, i) => (
              <div key={banner.id}
                className={`absolute inset-0 transition-opacity duration-700 ${i === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
                <img src={banner.image} alt={banner.title}
                  className="w-full h-full object-cover" />
                {/* Dark overlay — left half */}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(43,27,24,0.80) 0%, rgba(43,27,24,0.20) 60%, transparent 100%)' }} />
                {/* Content */}
                <div className="absolute inset-0 flex items-center">
                  <div className="p-6 md:p-10 max-w-md">
                    <div className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 uppercase tracking-widest"
                      style={{ background: '#C49A6C', color: '#FFF' }}>
                      Thawbin Collection
                    </div>
                    <h2 className="text-xl md:text-4xl font-black text-white mb-3 leading-tight whitespace-pre-line"
                      style={{ fontFamily: "'Playfair Display', serif", textShadow: '0 2px 12px rgba(0,0,0,0.3)' }}>
                      {banner.title}
                    </h2>
                    <p className="text-sm md:text-base mb-5 leading-relaxed" style={{ color: 'rgba(255,255,255,0.85)' }}>
                      {banner.description}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Link href={banner.link}
                        className="inline-block px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
                        style={{ background: '#C49A6C' }}>
                        {banner.cta}
                      </Link>
                      <Link href="/shop"
                        className="inline-block px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
                        style={{ background: 'rgba(255,255,255,0.15)', color: '#FFF', border: '1.5px solid rgba(255,255,255,0.4)', backdropFilter: 'blur(4px)' }}>
                        Customize Your Desk
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Arrows */}
            {banners.length > 1 && (
              <>
                <button onClick={() => setCurrentSlide(p => (p - 1 + banners.length) % banners.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: 'rgba(255,255,255,0.92)' }}>
                  <ChevronLeft className="w-5 h-5" style={{ color: '#3E2723' }} />
                </button>
                <button onClick={() => setCurrentSlide(p => (p + 1) % banners.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: 'rgba(255,255,255,0.92)' }}>
                  <ChevronRight className="w-5 h-5" style={{ color: '#3E2723' }} />
                </button>
                {/* Dots */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {banners.map((_, i) => (
                    <button key={i} onClick={() => setCurrentSlide(i)}
                      className="h-2 rounded-full transition-all"
                      style={{
                        width: i === currentSlide ? 24 : 8,
                        background: i === currentSlide ? '#C49A6C' : 'rgba(255,255,255,0.5)',
                      }} />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Side Banners */}
          <div className="hidden md:flex flex-col gap-4">
            {sideBanners.map(banner => (
              <Link key={banner.id} href={banner.link}
                className="relative flex-1 rounded-2xl overflow-hidden group">
                <img src={banner.image} alt={banner.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(43,27,24,0.75), rgba(43,27,24,0.30))' }} />
                <div className="absolute inset-0 flex items-center p-5">
                  <div>
                    <h3 className="text-xl font-black text-white leading-tight whitespace-pre-line"
                      style={{ fontFamily: "'Playfair Display', serif" }}>
                      {banner.title}
                    </h3>
                    <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.80)' }}>{banner.description}</p>
                    <span className="inline-block mt-3 px-3 py-1 rounded-full text-xs font-bold"
                      style={{ background: '#C49A6C', color: '#FFF' }}>
                      Learn More →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
