import Link from 'next/link';
import { Mail, Phone, MapPin, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen" style={{ background: "#FAF6F0" }}>
      {/* Hero */}
      <div className="text-white py-16 text-center" style={{ background: "#2B1B18", borderBottom: "1px solid rgba(196,154,108,0.3)" }}>
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#C49A6C" }}>We are here to help</p>
          <h1 className="text-4xl md:text-5xl font-black mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Contact THAWBIN
          </h1>
          <p className="text-sm max-w-lg mx-auto" style={{ color: "rgba(255,255,255,0.7)" }}>
            Have questions about custom desk sizing, bulk corporate orders, or delivery? Reach out to our workspace specialists.
          </p>
        </div>
      </div>

      {/* Contact Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="rounded-3xl shadow-sm p-8" style={{ background: "#FFFFFF", border: "1px solid #E7DED5" }}>
            <h2 className="text-2xl font-bold mb-6" style={{ color: "#2B211D", fontFamily: "'Playfair Display', serif" }}>Get in Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl" style={{ background: "#FAF6F0", border: "1px solid #E7DED5" }}>
                  <MapPin className="w-6 h-6" style={{ color: "#3E2723" }} />
                </div>
                <div>
                  <h3 className="font-bold text-sm" style={{ color: "#2B211D" }}>Showroom & Studio</h3>
                  <p className="text-sm mt-0.5" style={{ color: "#80736B" }}>Gulshan-2, Dhaka 1212, Bangladesh</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl" style={{ background: "#FAF6F0", border: "1px solid #E7DED5" }}>
                  <Phone className="w-6 h-6" style={{ color: "#3E2723" }} />
                </div>
                <div>
                  <h3 className="font-bold text-sm" style={{ color: "#2B211D" }}>Direct Hotline</h3>
                  <p className="text-sm mt-0.5" style={{ color: "#80736B" }}>+880 1700-000000 (10 AM – 8 PM)</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl" style={{ background: "#FAF6F0", border: "1px solid #E7DED5" }}>
                  <Mail className="w-6 h-6" style={{ color: "#3E2723" }} />
                </div>
                <div>
                  <h3 className="font-bold text-sm" style={{ color: "#2B211D" }}>Email Support</h3>
                  <p className="text-sm mt-0.5" style={{ color: "#80736B" }}>support@thawbin.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl" style={{ background: "#FAF6F0", border: "1px solid #E7DED5" }}>
                  <MessageSquare className="w-6 h-6" style={{ color: "#3E2723" }} />
                </div>
                <div>
                  <h3 className="font-bold text-sm" style={{ color: "#2B211D" }}>Customization Desk Support</h3>
                  <p className="text-sm mt-0.5" style={{ color: "#80736B" }}>Available Saturday to Thursday</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-3xl shadow-sm p-8" style={{ background: "#FFFFFF", border: "1px solid #E7DED5" }}>
            <h2 className="text-2xl font-bold mb-6" style={{ color: "#2B211D", fontFamily: "'Playfair Display', serif" }}>Send us a Message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "#3E2723" }}>Your Name</label>
                <input type="text" className="w-full px-4 py-3 rounded-xl focus:outline-none text-sm" style={{ background: "#FAF6F0", border: "1.5px solid #E7DED5", color: "#2B211D" }} placeholder="Rahim Ahmed" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "#3E2723" }}>Email Address</label>
                <input type="email" className="w-full px-4 py-3 rounded-xl focus:outline-none text-sm" style={{ background: "#FAF6F0", border: "1.5px solid #E7DED5", color: "#2B211D" }} placeholder="rahim@example.com" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "#3E2723" }}>Phone Number</label>
                <input type="tel" className="w-full px-4 py-3 rounded-xl focus:outline-none text-sm" style={{ background: "#FAF6F0", border: "1.5px solid #E7DED5", color: "#2B211D" }} placeholder="+880 1XXXXXXXXX" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "#3E2723" }}>Message</label>
                <textarea rows={4} className="w-full px-4 py-3 rounded-xl focus:outline-none text-sm" style={{ background: "#FAF6F0", border: "1.5px solid #E7DED5", color: "#2B211D" }} placeholder="Tell us about the desk specs or questions..."></textarea>
              </div>
              <button type="submit" className="w-full py-3.5 text-white rounded-xl font-bold transition-all shadow-md active:scale-[0.99]" style={{ background: "#3E2723" }}>
                Send Inquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
