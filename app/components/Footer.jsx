'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Mail, Phone, MapPin, Facebook, Instagram, Youtube, Sparkles } from 'lucide-react';
import { ISLAMIC_CATEGORIES } from '@/lib/islamicCatalog';
import { cleanWhatsAppNumber } from '@/lib/whatsapp';

export default function Footer() {
  const [contactInfo, setContactInfo] = useState({
    phone: '+880 1700-000000',
    email: 'support@awbin.com',
    address: 'ঢাকা, বাংলাদেশ',
  });

  useEffect(() => {
    let isMounted = true;
    async function fetchContact() {
      try {
        const res = await fetch('/api/contact/settings', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (data?.settings && isMounted) {
            setContactInfo({
              phone: data.settings.contactPhone || data.settings.whatsappNumber || '+880 1700-000000',
              email: data.settings.contactEmail || 'support@awbin.com',
              address: data.settings.contactAddress || 'ঢাকা, বাংলাদেশ',
            });
          }
        }
      } catch (e) {
        // Keep fallback
      }
    }
    fetchContact();

    const handleUpdate = (e) => {
      if (e?.detail) {
        setContactInfo(prev => ({
          phone: e.detail.contactPhone || e.detail.whatsappNumber || prev.phone,
          email: e.detail.contactEmail || prev.email,
          address: e.detail.contactAddress || prev.address,
        }));
      } else {
        fetchContact();
      }
    };

    window.addEventListener('whatsapp-settings-updated', handleUpdate);
    window.addEventListener('storage', (e) => {
      if (e.key === 'whatsapp_settings_sync') fetchContact();
    });

    return () => {
      isMounted = false;
      window.removeEventListener('whatsapp-settings-updated', handleUpdate);
    };
  }, []);

  const phoneHref = `tel:${cleanWhatsAppNumber(contactInfo.phone)}`;
  return (
    <footer style={{ background: '#2B1B16', color: '#E7D7C4' }}>
      {/* ── Main Footer Grid ───────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-10">

          {/* Col 1: Brand Introduction & Description */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <img
                src="/logo-wordmark.png"
                alt="AWBIN"
                className="h-11 w-auto rounded-lg shadow-md transition-transform group-hover:scale-105"
              />
            </Link>

            <p className="text-xs md:text-sm leading-relaxed mb-5" style={{ color: '#D5C4B4' }}>
              আওবিন (AWBIN) — প্রিমিয়াম পাঞ্জাবি, অ্যালকোহলমুক্ত আতর, আরামদায়ক জায়নামাজ, তসবিহ ও পবিত্র কুরআনের বিশ্বস্ত ইসলামিক অনলাইন শপ।
            </p>

            {/* Social Links */}
            <div className="flex gap-2.5">
              {[
                { Icon: Facebook, href: '#', label: 'Facebook' },
                { Icon: Instagram, href: '#', label: 'Instagram' },
                { Icon: Youtube, href: '#', label: 'Youtube' },
              ].map(({ Icon, href, label }, i) => (
                <a
                  key={i}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{ background: '#3A251E', border: '1px solid rgba(184,149,88,0.3)', color: '#B89558' }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Islamic Product Categories */}
          <div>
            <h4
              className="text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-1.5"
              style={{ color: '#B89558' }}
            >
              <Sparkles size={13} />
              <span>ইসলামিক ক্যাটাগরি</span>
            </h4>
            <ul className="space-y-2 text-xs md:text-sm">
              {ISLAMIC_CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="hover:text-white transition-colors"
                    style={{ color: '#C5B0A0' }}
                  >
                    {cat.nameBn}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/categories" className="text-[#B89558] font-bold hover:underline">
                  সকল ক্যাটাগরি দেখুন →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Service & Policies */}
          <div>
            <h4
              className="text-xs font-black uppercase tracking-widest mb-4"
              style={{ color: '#B89558' }}
            >
              কাস্টমার সার্ভিস ও পলিসি
            </h4>
            <ul className="space-y-2.5 text-xs md:text-sm">
              <li>
                <Link href="/orders" className="hover:text-white transition-colors" style={{ color: '#C5B0A0' }}>
                  অর্ডার ট্র্যাকিং
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors" style={{ color: '#C5B0A0' }}>
                  আমাদের সম্পর্কে
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors" style={{ color: '#C5B0A0' }}>
                  রিটার্ন ও রিফান্ড পলিসি
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors" style={{ color: '#C5B0A0' }}>
                  গোপনীয়তা নীতি (Privacy Policy)
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors" style={{ color: '#C5B0A0' }}>
                  শর্তাবলী ও নিয়ম (Terms & Conditions)
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors" style={{ color: '#C5B0A0' }}>
                  যোগাযোগ ও সহায়তা
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Payment Info */}
          <div>
            <h4
              className="text-xs font-black uppercase tracking-widest mb-4"
              style={{ color: '#B89558' }}
            >
              যোগাযোগ
            </h4>
            <ul className="space-y-3 text-xs md:text-sm mb-6">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#B89558]" />
                <span style={{ color: '#C5B0A0' }}>{contactInfo.address}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#B89558]" />
                <a href={phoneHref} className="hover:text-white transition-colors" style={{ color: '#C5B0A0' }}>
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#B89558]" />
                <a href={`mailto:${contactInfo.email}`} className="hover:text-white transition-colors" style={{ color: '#C5B0A0' }}>
                  {contactInfo.email}
                </a>
              </li>
            </ul>

            {/* Payment methods */}
            <div>
              <p className="text-[11px] mb-2 font-semibold" style={{ color: '#8A7060' }}>
                পেমেন্ট মেথড
              </p>
              <div className="flex flex-wrap gap-1.5 text-[11px]">
                {['ক্যাশ অন ডেলিভারি', 'bKash', 'Nagad', 'Cards'].map((p, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg font-medium"
                    style={{ background: '#3A251E', color: '#E7D7C4', border: '1px solid rgba(184,149,88,0.2)' }}
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Copyright Bottom Strip ─────────────────────────────────── */}
      <div style={{ borderTop: '1px solid #3A251E', background: '#221512' }}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs" style={{ color: '#8A7060' }}>
          <p>
            © {new Date().getFullYear()} AWBIN (আওবিন). সর্বস্বত্ব সংরক্ষিত।
          </p>
          <p className="text-[11px]">
            বাংলাদেশী বিশ্বস্ত ইসলামিক লাইফস্টাইল ব্র্যান্ড 🇧🇩
          </p>
        </div>
      </div>
    </footer>
  );
}
