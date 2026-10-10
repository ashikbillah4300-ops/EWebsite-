import Link from 'next/link';
import { ShoppingBag, Mail, Phone, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';

const footerLinks = {
  important: [
    { label: 'About Us', href: '/about' },
    { label: 'Track Order', href: '/orders' },
    { label: 'File a Complaint', href: '/contact' },
    { label: 'Return & Refund Policy', href: '/privacy' },
    { label: 'Corporate Orders', href: '/contact' },
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
  ],
};

export default function Footer() {
  return (
    <footer style={{ background: '#2B1B18' }}>
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">

          {/* Col 1 — Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #3E2723, #C49A6C)' }}>
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                THAWBIN
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-5" style={{ color: '#A08070' }}>
              Premium furniture and adjustable desks, thoughtfully crafted to bring comfort, style, and productivity to your workspace in Bangladesh.
            </p>
            {/* Social icons */}
            <div className="flex gap-3">
              {[
                { Icon: Facebook, href: '#', bg: '#3b5998' },
                { Icon: Instagram, href: '#', bg: '#e1306c' },
                { Icon: Youtube, href: '#', bg: '#ff0000' },
              ].map(({ Icon, href, bg }, i) => (
                <a key={i} href={href}
                  className="w-9 h-9 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                  style={{ background: bg }}>
                  <Icon className="w-4 h-4 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Important Links */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest mb-5"
              style={{ color: '#C49A6C', letterSpacing: '0.1em' }}>
              Important Links
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.important.map(link => (
                <li key={link.href}>
                  <Link href={link.href}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: '#C5B0A0' }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Contact */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest mb-5"
              style={{ color: '#C49A6C', letterSpacing: '0.1em' }}>
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#C49A6C' }} />
                <a href="mailto:info@thawbin.com" className="text-sm hover:text-white transition-colors" style={{ color: '#C5B0A0' }}>
                  info@thawbin.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#C49A6C' }} />
                <a href="tel:+8801234567890" className="text-sm hover:text-white transition-colors" style={{ color: '#C5B0A0' }}>
                  +880 1234-567890
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#C49A6C' }} />
                <span className="text-sm" style={{ color: '#C5B0A0' }}>
                  Dhaka, Bangladesh
                </span>
              </li>
            </ul>

            {/* Payment badges */}
            <div className="mt-6">
              <p className="text-xs mb-2" style={{ color: '#6B5040' }}>Accepted Payments</p>
              <div className="flex flex-wrap gap-2">
                {['💳 Visa', '💳 Mastercard', '💰 bKash', '💰 Nagad'].map((p, i) => (
                  <span key={i} className="px-2.5 py-1 rounded text-xs font-medium"
                    style={{ background: '#3D2820', color: '#C5B0A0', border: '1px solid #5D3D2E' }}>
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright row */}
      <div style={{ borderTop: '1px solid #3D2820' }}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-xs" style={{ color: '#6B5040' }}>
            © {new Date().getFullYear()} Thawbin. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: '#6B5040' }}>
            Designed with care for Bangladesh 🇧🇩
          </p>
        </div>
      </div>
    </footer>
  );
}
