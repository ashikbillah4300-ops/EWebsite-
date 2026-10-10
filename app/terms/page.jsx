export default function TermsOfService() {
  return (
    <div className="min-h-screen py-12 px-4" style={{ background: "#FAF6F0" }}>
      <div className="max-w-4xl mx-auto rounded-3xl p-8 md:p-12 shadow-sm" style={{ background: "#FFFFFF", border: "1px solid #E7DED5" }}>
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#C49A6C" }}>Terms & Conditions</p>
        <h1 className="text-3xl md:text-4xl font-black mb-2" style={{ color: "#2B211D", fontFamily: "'Playfair Display', serif" }}>
          Terms of Service — THAWBIN
        </h1>
        <p className="text-sm mb-8" style={{ color: "#80736B" }}>
          Last updated: {new Date().toLocaleDateString()}
        </p>
        
        <div className="space-y-6 text-sm leading-relaxed" style={{ color: "#2B211D" }}>
          <section className="p-6 rounded-2xl" style={{ background: "#FAF6F0", border: "1px solid #E7DED5" }}>
            <h2 className="text-lg font-bold mb-3" style={{ color: "#3E2723" }}>1. Accounts & Registration</h2>
            <p style={{ color: "#5D4037" }}>
              When creating an account on THAWBIN, you agree to provide authentic and up-to-date contact details for delivery and warranty purposes.
            </p>
          </section>
          
          <section className="p-6 rounded-2xl" style={{ background: "#FAF6F0", border: "1px solid #E7DED5" }}>
            <h2 className="text-lg font-bold mb-3" style={{ color: "#3E2723" }}>2. Custom Orders & Delivery</h2>
            <p style={{ color: "#5D4037" }}>
              Customized electric height-adjustable desks and solid wood table tops are precision-crafted to order. Estimated delivery across Bangladesh is 2-5 business days. Free installation is provided in Dhaka.
            </p>
          </section>
          
          <section className="p-6 rounded-2xl" style={{ background: "#FAF6F0", border: "1px solid #E7DED5" }}>
            <h2 className="text-lg font-bold mb-3" style={{ color: "#3E2723" }}>3. Warranty & Return Policy</h2>
            <p style={{ color: "#5D4037" }}>
              Every THAWBIN motorized adjustable desk frame includes our 5-year official motor warranty. Replacement parts or inspections are provided promptly upon request.
            </p>
          </section>
          
          <section className="p-6 rounded-2xl" style={{ background: "#FAF6F0", border: "1px solid #E7DED5" }}>
            <h2 className="text-lg font-bold mb-3" style={{ color: "#3E2723" }}>4. Customer Inquiries</h2>
            <p style={{ color: "#5D4037" }}>
              For support or corporate order quotes, email us at <a href="mailto:support@thawbin.com" className="font-bold underline" style={{ color: "#C49A6C" }}>support@thawbin.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
