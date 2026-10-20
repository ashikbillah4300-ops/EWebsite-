'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, MessageSquare, CheckCircle2, Clock } from 'lucide-react';
import { cleanWhatsAppNumber } from '@/lib/whatsapp';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    phone: '+880 1700-000000',
    whatsappNumber: '01700000000',
    email: 'support@awbin.com',
    address: 'ঢাকা, বাংলাদেশ',
    workingHours: 'সকাল ১০টা থেকে রাত ৮টা (শনিবার - বৃহস্পতিবার)',
  });

  useEffect(() => {
    async function loadContactSettings() {
      try {
        const res = await fetch('/api/contact/settings', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (data?.settings) {
            setContactInfo({
              phone: data.settings.contactPhone || data.settings.whatsappNumber || '+880 1700-000000',
              whatsappNumber: data.settings.whatsappNumber || '01700000000',
              email: data.settings.contactEmail || 'support@awbin.com',
              address: data.settings.contactAddress || 'ঢাকা, বাংলাদেশ',
              workingHours: data.settings.workingHours || 'সকাল ১০টা থেকে রাত ৮টা (শনিবার - বৃহস্পতিবার)',
            });
          }
        }
      } catch (err) {
        console.warn('Could not load dynamic contact info:', err);
      }
    }
    loadContactSettings();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const phoneLink = `tel:${cleanWhatsAppNumber(contactInfo.phone || contactInfo.whatsappNumber)}`;

  return (
    <div className="min-h-screen py-10 md:py-16" style={{ background: "#FAF6F0", color: "#2A211D" }}>
      <div className="max-w-6xl mx-auto px-4">

        {/* Hero Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-bold uppercase tracking-widest mb-2 text-[#B89558]">
            আমরা সহায়তায় প্রস্তুত
          </p>
          <h1 className="text-3xl md:text-5xl font-black text-[#2B1B16] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            যোগাযোগ ও কাস্টমার সাপোর্ট
          </h1>
          <p className="text-xs md:text-sm text-[#80736B] leading-relaxed">
            অর্ডার, ডেলিভারি, সাইজ পরামর্শ বা ইসলামিক উপহার সংক্রান্ত যেকোনো তথ্যে আমাদের সাথে যোগাযোগ করুন।
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">

          {/* Contact Details Card */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#E7DED5] shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-[#2B1B16] pb-3 border-b border-[#E7DED5]">
              যোগাযোগের মাধ্যম
            </h2>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-[#F7F1E8] border border-[#E7DED5] text-[#B89558]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-xs md:text-sm text-[#2B1B16]">হটলাইন ও হোয়াটসঅ্যাপ</h3>
                  <a href={phoneLink} className="text-xs text-[#80736B] hover:text-[#B89558] mt-0.5 block font-medium">
                    {contactInfo.phone}
                  </a>
                  <p className="text-[11px] text-[#80736B] mt-0.5">{contactInfo.workingHours}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-[#F7F1E8] border border-[#E7DED5] text-[#B89558]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-xs md:text-sm text-[#2B1B16]">ইমেইল সাপোর্ট</h3>
                  <a href={`mailto:${contactInfo.email}`} className="text-xs text-[#80736B] hover:text-[#B89558] mt-0.5 block font-medium">
                    {contactInfo.email}
                  </a>
                  <p className="text-[11px] text-[#80736B] mt-0.5">২৪ ঘণ্টার মধ্যে উত্তর প্রদান করা হয়</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-[#F7F1E8] border border-[#E7DED5] text-[#B89558]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-xs md:text-sm text-[#2B1B16]">অফিস ও আউটলেট</h3>
                  <p className="text-xs text-[#80736B] mt-0.5">{contactInfo.address}</p>
                  <p className="text-[11px] text-[#80736B] mt-0.5">সারাদেশে হোম ডেলিভারি সার্ভিসের মাধ্যমে পরিচালিত</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-[#F7F1E8] border border-[#E7DED5] text-[#B89558]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-xs md:text-sm text-[#2B1B16]">ডেলিভারি সময়সূচী</h3>
                  <p className="text-xs text-[#80736B] mt-0.5">ঢাকায় ২৪-৪৮ ঘণ্টা, ঢাকার বাইরে ২-৩ কার্যদিবস</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Inquiry Form */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#E7DED5] shadow-sm">
            <h2 className="text-xl font-bold text-[#2B1B16] pb-3 border-b border-[#E7DED5] mb-5">
              বার্তা পাঠান
            </h2>

            {submitted ? (
              <div className="p-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#32805A] mx-auto" />
                <h3 className="font-bold text-sm text-[#2B1B16]">আপনার বার্তা সফলভাবে পাঠানো হয়েছে!</h3>
                <p className="text-xs text-[#80736B]">আমাদের সাপোর্ট টিম শীঘ্রই আপনার সাথে যোগাযোগ করবে।</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#2B1B16] mb-1">আপনার নাম *</label>
                  <input
                    type="text"
                    required
                    placeholder="উদা: মাহফুজুর রহমান"
                    className="w-full px-4 py-2.5 rounded-xl text-xs md:text-sm border border-[#E7DED5] bg-[#FAF6F0] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2B1B16] mb-1">মোবাইল নম্বর *</label>
                  <input
                    type="tel"
                    required
                    placeholder="উদা: 017XXXXXXXX"
                    className="w-full px-4 py-2.5 rounded-xl text-xs md:text-sm border border-[#E7DED5] bg-[#FAF6F0] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2B1B16] mb-1">ইমেইল (ঐচ্ছিক)</label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    className="w-full px-4 py-2.5 rounded-xl text-xs md:text-sm border border-[#E7DED5] bg-[#FAF6F0] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2B1B16] mb-1">আপনার বার্তা বা অনুসন্ধান *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="পণ্যের সাইজ, আতরের সুবাস বা ডেলিভারি সম্পর্কে বিস্তারিত লিখুন..."
                    className="w-full px-4 py-2.5 rounded-xl text-xs md:text-sm border border-[#E7DED5] bg-[#FAF6F0] focus:outline-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 text-white rounded-xl font-bold text-xs md:text-sm shadow-md transition-all hover:opacity-90 active:scale-98"
                  style={{ background: "#2B1B16" }}
                >
                  বার্তা পাঠান
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
