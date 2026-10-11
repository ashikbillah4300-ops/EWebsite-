'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';

const islamicHeroBanners = [
  {
    id: 1,
    tag: 'Thawbin Signature',
    title: 'আপনার জীবনে ইসলামিক\nসৌন্দর্যের ছোঁয়া',
    description: 'পাঞ্জাবি থেকে আতর, জায়নামাজ থেকে ইসলামিক উপহার—আপনার পছন্দের সবকিছু এক ঠিকানায়।',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1200&h=650&fit=crop&q=85',
    link: '/shop',
    ctaPrimary: 'এখনই শপিং করুন',
    ctaSecondary: 'সকল ক্যাটাগরি দেখুন',
    secondaryLink: '/categories'
  },
  {
    id: 2,
    tag: 'Attar & Fragrance',
    title: '১০০% অ্যালকোহলমুক্ত\nখাঁটি দেহন আল উদ ও আতর',
    description: 'ঐতিহ্যবাহী কস্তুরী ও বিলাসবহুল এরাবিয়ান সুবাস যা ইবাদত ও নামাজে আনে পরম প্রশান্তি।',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=1200&h=650&fit=crop&q=85',
    link: '/category/attar',
    ctaPrimary: 'আতর সংগ্রহ দেখুন',
    ctaSecondary: 'সকল পণ্য',
    secondaryLink: '/shop'
  },
  {
    id: 3,
    tag: 'Prayer Essentials',
    title: 'তুর্কি ভেলভেট জায়নামাজ\nও জলপাই কাঠের তসবিহ',
    description: 'নরম কুশনযুক্ত আরামদায়ক জায়নামাজ এবং হস্তনির্মিত প্রাকৃতিক কাঠের তসবিহ সম্ভার।',
    image: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=1200&h=650&fit=crop&q=85',
    link: '/category/prayer-mats',
    ctaPrimary: 'জায়নামাজ কালেকশন',
    ctaSecondary: 'তসবিহ সংগ্রহ',
    secondaryLink: '/category/tasbih'
  },
];

const sideBanners = [
  {
    id: 'side-1',
    badge: 'উপহার কালেকশন',
    title: 'ইসলামিক গিফট বক্স',
    desc: 'নিকাহ, ঈদ ও প্রিয়জনের জন্য সুসজ্জিত উপহার সেট',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&h=300&fit=crop&q=80',
    link: '/category/islamic-gifts',
  },
  {
    id: 'side-2',
    badge: 'পবিত্র কুরআন ও হাদিস',
    title: 'কুরআন ও ইসলামিক বই',
    desc: 'তাজবীদ ও বাংলা অনুবাদসহ প্রামাণ্য ইসলামিক গ্রন্থাবলী',
    image: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=600&h=300&fit=crop&q=80',
    link: '/category/quran-and-books',
  },
];

export default function HeroBanner({ autoPlayInterval = 5000 }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setCurrentSlide(p => (p + 1) % islamicHeroBanners.length);
    }, autoPlayInterval);
    return () => clearInterval(t);
  }, [autoPlayInterval]);

  return (
    <section className="py-4 md:py-6" style={{ background: '#FAF6F0' }}>
      <div className="max-w-7xl mx-auto px-3 md:px-4">
        <div className="md:grid md:grid-cols-3 md:gap-4">

          {/* ── Main Hero Carousel ─────────────────────────────────── */}
          <div className="md:col-span-2 relative h-[320px] sm:h-[380px] md:h-[440px] rounded-3xl overflow-hidden group shadow-lg"
            style={{ border: '1px solid #E7DED5' }}>
            {islamicHeroBanners.map((banner, i) => (
              <div
                key={banner.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  i === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover"
                />

                {/* Dark Chocolate Gradient Overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(90deg, rgba(43,27,22,0.92) 0%, rgba(43,27,22,0.70) 50%, rgba(43,27,22,0.30) 100%)',
                  }}
                />

                {/* Text Content */}
                <div className="absolute inset-0 flex items-center">
                  <div className="p-6 md:p-12 max-w-lg">
                    <div
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-3 tracking-wider uppercase shadow-sm"
                      style={{ background: '#B89558', color: '#FFFFFF' }}
                    >
                      <Sparkles size={12} />
                      <span>{banner.tag}</span>
                    </div>

                    <h1
                      className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#F7F1E8] mb-3 leading-[1.2] whitespace-pre-line"
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        textShadow: '0 2px 14px rgba(0,0,0,0.35)',
                      }}
                    >
                      {banner.title}
                    </h1>

                    <p
                      className="text-xs sm:text-sm md:text-base mb-6 leading-relaxed line-clamp-2 md:line-clamp-none"
                      style={{ color: '#E7D7C4' }}
                    >
                      {banner.description}
                    </p>

                    <div className="flex flex-wrap gap-3">
                      <Link
                        href={banner.link}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs md:text-sm font-bold text-white transition-all shadow-md hover:scale-105 active:scale-95"
                        style={{ background: '#B89558' }}
                      >
                        <span>{banner.ctaPrimary}</span>
                        <ArrowRight size={14} />
                      </Link>

                      <Link
                        href={banner.secondaryLink}
                        className="inline-flex items-center px-5 py-3 rounded-xl text-xs md:text-sm font-bold transition-all hover:bg-white/20"
                        style={{
                          background: 'rgba(255,255,255,0.12)',
                          color: '#FFFFFF',
                          border: '1.5px solid rgba(231,215,196,0.4)',
                          backdropFilter: 'blur(4px)',
                        }}
                      >
                        {banner.ctaSecondary}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Carousel Navigation Arrows */}
            <button
              onClick={() =>
                setCurrentSlide(
                  p => (p - 1 + islamicHeroBanners.length) % islamicHeroBanners.length
                )
              }
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
              style={{ background: 'rgba(255,255,255,0.92)' }}
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5 text-[#2B1B16]" />
            </button>
            <button
              onClick={() =>
                setCurrentSlide(p => (p + 1) % islamicHeroBanners.length)
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
              style={{ background: 'rgba(255,255,255,0.92)' }}
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5 text-[#2B1B16]" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {islamicHeroBanners.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className="h-2 rounded-full transition-all"
                  style={{
                    width: i === currentSlide ? 28 : 8,
                    background:
                      i === currentSlide ? '#B89558' : 'rgba(255,255,255,0.5)',
                  }}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* ── Side Islamic Feature Banners ────────────────────────── */}
          <div className="hidden md:flex flex-col gap-4">
            {sideBanners.map(side => (
              <Link
                key={side.id}
                href={side.link}
                className="relative flex-1 rounded-3xl overflow-hidden group shadow-md"
                style={{ border: '1px solid #E7DED5' }}
              >
                <img
                  src={side.image}
                  alt={side.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(43,27,22,0.88) 0%, rgba(43,27,22,0.40) 100%)',
                  }}
                />
                <div className="absolute inset-0 flex items-center p-6">
                  <div>
                    <span
                      className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white mb-2"
                      style={{ background: '#B89558' }}
                    >
                      {side.badge}
                    </span>
                    <h3
                      className="text-xl font-bold text-[#F7F1E8] leading-tight mb-1"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {side.title}
                    </h3>
                    <p className="text-xs text-[#E7D7C4] leading-relaxed line-clamp-2">
                      {side.desc}
                    </p>
                    <span className="inline-flex items-center gap-1 mt-3 text-xs font-bold text-[#B89558] group-hover:translate-x-1 transition-transform">
                      সংগ্রহ দেখুন →
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
