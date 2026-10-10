import Link from 'next/link';

export default function Hero() {
  return (
    <section className="text-white py-16" style={{ background: "linear-gradient(135deg, #2B1B18 0%, #3E2723 100%)" }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3 inline-block"
              style={{ background: "rgba(196,154,108,0.2)", color: "#C49A6C", border: "1px solid rgba(196,154,108,0.3)" }}>
              Premium Ergonomic Workspaces
            </span>
            <h1 className="text-4xl md:text-5xl font-black mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Welcome to THAWBIN
            </h1>
            <p className="text-base mb-8" style={{ color: "rgba(255,255,255,0.75)" }}>
              Custom solid wood table tops & dual-motor electric standing desks crafted in Bangladesh.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/shop"
                className="px-8 py-3.5 rounded-xl font-bold shadow-lg transition-all hover:opacity-90"
                style={{ background: "#C49A6C", color: "#2B1B18" }}>
                Shop Desks
              </Link>
              <Link href="/categories"
                className="px-8 py-3.5 rounded-xl font-bold transition-all hover:bg-white/10"
                style={{ border: "2px solid #C49A6C", color: "#FAF6F0" }}>
                Browse Categories
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="rounded-3xl p-8 backdrop-blur" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(196,154,108,0.2)" }}>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl p-5 text-center" style={{ background: "rgba(255,255,255,0.08)" }}>
                  <div className="text-3xl font-black" style={{ color: "#C49A6C" }}>5-Year</div>
                  <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.7)" }}>Motor Warranty</div>
                </div>
                <div className="rounded-2xl p-5 text-center" style={{ background: "rgba(255,255,255,0.08)" }}>
                  <div className="text-3xl font-black" style={{ color: "#C49A6C" }}>100%</div>
                  <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.7)" }}>Solid Teak Wood</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
