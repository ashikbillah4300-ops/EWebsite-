import Link from 'next/link';
import { Truck, ShieldCheck, HeartHandshake, Headphones, Sparkles, BookOpen, Gift } from 'lucide-react';

export const metadata = {
  title: 'আমাদের সম্পর্কে — Thawbin (থওবিন)',
  description: 'Thawbin সম্পর্কে জানুন — বাংলাদেশী বিশ্বস্ত ইসলামিক লাইফস্টাইল ও মুসলিম ফ্যাশন অনলাইন স্টোর।',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen py-10 md:py-16" style={{ background: '#FAF6F0', color: '#2A211D' }}>
      <div className="max-w-4xl mx-auto px-4">

        {/* Hero Banner */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-3 tracking-wider text-white"
            style={{ background: '#B89558' }}>
            <Sparkles size={12} />
            <span>আমাদের পরিচিতি</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-[#2B1B16] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Thawbin — ইসলামিক পণ্যের বিশ্বস্ত ঠিকানা
          </h1>
          <p className="text-sm md:text-base text-[#80736B] max-w-2xl mx-auto leading-relaxed">
            শালীন পোশাক, খাঁটি সুবাস ও ইবাদতের প্রয়োজনীয় সামগ্রী নিয়ে আপনার পাশে।
          </p>
        </div>

        {/* Brand Mission */}
        <div className="bg-white rounded-3xl p-6 md:p-10 border border-[#E7DED5] shadow-sm mb-8 space-y-4 text-xs md:text-sm leading-relaxed">
          <h2 className="text-xl md:text-2xl font-bold text-[#2B1B16]">
            আমাদের লক্ষ্য ও উদ্দেশ্য
          </h2>
          <p className="text-[#2A211D]">
            থওবিন (Thawbin) বাংলাদেশের মুসলিম গ্রাহকদের জন্য নিবেদিত একটি ইসলামিক লাইফস্টাইল ও ফ্যাশন প্ল্যাটফর্ম।
            আমরা বিশ্বাস করি দৈনন্দিন জীবনে শালীনতা এবং সুন্নাহভিত্তিক জীবনাচরণ মানব জীবনকে শান্তিময় করে তোলে।
          </p>
          <p className="text-[#80736B]">
            আমাদের সংগ্রহে রয়েছে খাঁটি সুতি কাপড়ে তৈরি আরামদায়ক পাঞ্জাবি ও জুব্বা, ১০০% অ্যালকোহলমুক্ত দেহন আল উদ ও কস্তুরী আতর,
            তুরস্কের নরম ভেলভেট জায়নামাজ, প্রাকৃতিক কাঠের তসবিহ, প্রামাণ্য ইসলামিক গ্রন্থাবলী এবং প্রিয়জনকে উপহার দেওয়ার মতো সুসজ্জিত ইসলামিক উপহার সামগ্রী।
          </p>
        </div>

        {/* Genuine Core Values */}
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          <div className="p-6 rounded-2xl bg-white border border-[#E7DED5] text-center shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-[#F7F1E8] flex items-center justify-center mx-auto mb-3 text-[#B89558]">
              <ShieldCheck size={24} />
            </div>
            <h3 className="font-bold text-sm text-[#2B1B16] mb-1">খাঁটি ও নির্ভরযোগ্য পণ্য</h3>
            <p className="text-xs text-[#80736B] leading-relaxed">
              সরাসরি পরীক্ষিত কাপড় ও অ্যালকোহলমুক্ত সুবাসের নিশ্চয়তা।
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#E7DED5] text-center shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-[#F7F1E8] flex items-center justify-center mx-auto mb-3 text-[#B89558]">
              <Truck size={24} />
            </div>
            <h3 className="font-bold text-sm text-[#2B1B16] mb-1">সারাদেশে হোম ডেলিভারি</h3>
            <p className="text-xs text-[#80736B] leading-relaxed">
              ক্যাশ অন ডেলিভারি সুবিধা সহ দ্রুত ও নিরাপদ ডেলিভারি।
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#E7DED5] text-center shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-[#F7F1E8] flex items-center justify-center mx-auto mb-3 text-[#B89558]">
              <HeartHandshake size={24} />
            </div>
            <h3 className="font-bold text-sm text-[#2B1B16] mb-1">স্বচ্ছ সেবা ও আন্তরিকতা</h3>
            <p className="text-xs text-[#80736B] leading-relaxed">
              পণ্য প্রাপ্তি থেকে শুরু করে যেকোনো প্রয়োজনে সহযোগিতাপূর্ণ কাস্টমার সাপোর্ট।
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-xs md:text-sm text-white shadow-md transition-all hover:scale-105"
            style={{ background: '#2B1B16' }}
          >
            <span>আমাদের পণ্য সংগ্রহ দেখুন</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
