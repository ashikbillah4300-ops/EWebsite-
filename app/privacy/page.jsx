export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen py-12 px-4" style={{ background: "#FAF6F0" }}>
      <div className="max-w-4xl mx-auto rounded-3xl p-8 md:p-12 shadow-sm" style={{ background: "#FFFFFF", border: "1px solid #E7DED5" }}>
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#C49A6C" }}>Legal & Trust</p>
        <h1 className="text-3xl md:text-4xl font-black mb-2" style={{ color: "#2B211D", fontFamily: "'Playfair Display', serif" }}>
          Privacy Policy — THAWBIN
        </h1>
        <p className="text-sm mb-8" style={{ color: "#80736B" }}>
          Your privacy is important to us. Last updated: {new Date().toLocaleDateString()}
        </p>
        
        <div className="space-y-6 text-sm leading-relaxed" style={{ color: "#2B211D" }}>
          <section className="p-6 rounded-2xl" style={{ background: "#FAF6F0", border: "1px solid #E7DED5" }}>
            <h2 className="text-lg font-bold mb-3" style={{ color: "#3E2723" }}>1. Information We Collect</h2>
            <ul className="list-disc pl-5 space-y-1.5" style={{ color: "#5D4037" }}>
              <li>Personal contact details (name, email address, phone number, shipping address)</li>
              <li>Custom furniture order specifications & dimensions</li>
              <li>Payment verification details (processed securely via regulated gateways)</li>
            </ul>
          </section>
          
          <section className="p-6 rounded-2xl" style={{ background: "#FAF6F0", border: "1px solid #E7DED5" }}>
            <h2 className="text-lg font-bold mb-3" style={{ color: "#3E2723" }}>2. How We Use Information</h2>
            <p style={{ color: "#5D4037" }}>
              We use your information exclusively to craft, deliver, and warranty your THAWBIN desks and accessories, provide customer support, and keep you updated on order fulfillment.
            </p>
          </section>
          
          <section className="p-6 rounded-2xl" style={{ background: "#FAF6F0", border: "1px solid #E7DED5" }}>
            <h2 className="text-lg font-bold mb-3" style={{ color: "#3E2723" }}>3. Cookies & Preferences</h2>
            <p style={{ color: "#5D4037" }}>
              We use essential cookies to maintain your shopping cart, wishlists, and customized desk build preferences.
            </p>
          </section>
          
          <section className="p-6 rounded-2xl" style={{ background: "#FAF6F0", border: "1px solid #E7DED5" }}>
            <h2 className="text-lg font-bold mb-3" style={{ color: "#3E2723" }}>4. Your Rights</h2>
            <ul className="list-disc pl-5 space-y-1.5" style={{ color: "#5D4037" }}>
              <li>Access, update, or remove your profile information at any time</li>
              <li>Opt-out of marketing communications</li>
              <li>Contact our privacy team at <a href="mailto:support@thawbin.com" className="font-bold underline" style={{ color: "#C49A6C" }}>support@thawbin.com</a></li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
