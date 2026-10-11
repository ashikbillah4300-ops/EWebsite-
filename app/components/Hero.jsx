import Link from 'next/link';

export default function Hero() {
  return (
    <section className="text-white py-16" style={{ background: "linear-gradient(135deg, #2B1B16 0%, #3A251E 100%)" }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3 inline-block"
              style={{ background: "rgba(184,149,88,0.2)", color: "#B89558", border: "1px solid rgba(184,149,88,0.3)" }}>
              Islamic Lifestyle & Fashion
            </span>
            <h1 className="text-4xl md:text-5xl font-black mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              আপনার জীবনে ইসলামিক সৌন্দর্যের ছোঁয়া
            </h1>
            <p className="text-base mb-8" style={{ color: "rgba(255,255,255,0.85)" }}>
              পাঞ্জাবি থেকে আতর, জায়নামাজ থেকে ইসলামিক উপহার—আপনার পছন্দের সবকিছু এক ঠিকানায়।
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/shop"
                className="px-8 py-3.5 rounded-xl font-bold shadow-lg transition-all hover:opacity-90"
                style={{ background: "#B89558", color: "#FFFFFF" }}>
                এখনই শপিং করুন
              </Link>
              <Link href="/categories"
                className="px-8 py-3.5 rounded-xl font-bold transition-all hover:bg-white/10"
                style={{ border: "2px solid #B89558", color: "#FAF6F0" }}>
                সকল ক্যাটাগরি দেখুন
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="rounded-3xl p-8 backdrop-blur" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(184,149,88,0.2)" }}>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl p-5 text-center" style={{ background: "rgba(255,255,255,0.08)" }}>
                  <div className="text-3xl font-black" style={{ color: "#B89558" }}>১০০%</div>
                  <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.8)" }}>অ্যালকোহলমুক্ত আতর</div>
                </div>
                <div className="rounded-2xl p-5 text-center" style={{ background: "rgba(255,255,255,0.08)" }}>
                  <div className="text-3xl font-black" style={{ color: "#B89558" }}>খাঁটি</div>
                  <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.8)" }}>কম্বড সুতির পাঞ্জাবি</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
