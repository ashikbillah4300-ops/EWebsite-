export const metadata = {
  title: 'শর্তাবলী ও নিয়মাবলী — Thawbin',
  description: 'Thawbin ইসলামিক ই-কমার্স প্ল্যাটফর্মের ব্যবহারের নিয়মাবলী ও শর্তসমূহ।',
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen py-10 md:py-16 px-4" style={{ background: "#FAF6F0", color: "#2A211D" }}>
      <div className="max-w-4xl mx-auto rounded-3xl p-6 md:p-12 bg-white border border-[#E7DED5] shadow-sm">
        <p className="text-xs font-bold uppercase tracking-widest mb-1 text-[#B89558]">Terms & Conditions</p>
        <h1 className="text-2xl md:text-4xl font-black mb-2 text-[#2B1B16]" style={{ fontFamily: "'Playfair Display', serif" }}>
          ব্যবহারের শর্তাবলী — Thawbin (থওবিন)
        </h1>
        <p className="text-xs text-[#80736B] mb-8">
          সর্বশেষ সংস্করণ: {new Date().toLocaleDateString('bn-BD')}
        </p>

        <div className="space-y-6 text-xs md:text-sm leading-relaxed">
          <section className="p-5 rounded-2xl bg-[#FAF6F0] border border-[#E7DED5]">
            <h2 className="text-base font-bold mb-2 text-[#2B1B16]">১. ভূমিকা ও পরিধি</h2>
            <p className="text-[#5D4037]">
              Thawbin একটি বিশেষায়িত ইসলামিক লাইফস্টাইল ও মুসলিম ফ্যাশন ই-কমার্স ওয়েবসাইট। এই প্ল্যাটফর্ম ব্যবহার করে যেকোনো পণ্য অর্ডার করার মাধ্যমে আপনি আমাদের শর্তাবলীর সাথে সম্মতি জ্ঞাপন করছেন।
            </p>
          </section>

          <section className="p-5 rounded-2xl bg-[#FAF6F0] border border-[#E7DED5]">
            <h2 className="text-base font-bold mb-2 text-[#2B1B16]">২. অর্ডার ও ডেলিভারি প্রক্রিয়া</h2>
            <p className="text-[#5D4037]">
              অর্ডার করার সময় সঠিক নাম, ঠিকানা ও মোবাইল নম্বর প্রদান করা আবশ্যক। অর্ডার নিশ্চিত হওয়ার পর ঢাকা সিটির মধ্যে ২৪ থেকে ৪৮ ঘণ্টার মধ্যে এবং ঢাকার বাইরে সারাদেশে ২ থেকে ৩ কার্যদিবসের মধ্যে হোম ডেলিভারি পৌঁছে দেওয়া হয়।
            </p>
          </section>

          <section className="p-5 rounded-2xl bg-[#FAF6F0] border border-[#E7DED5]">
            <h2 className="text-base font-bold mb-2 text-[#2B1B16]">৩. পণ্য পরিবর্তন ও এক্সচেঞ্জ নীতি</h2>
            <p className="text-[#5D4037]">
              পাঞ্জাবি বা পোশাকের সাইজে কোনো গরমিল দেখা দিলে পণ্য গ্রহণের ৭ দিনের মধ্যে তা পরিবর্তনের আবেদন করা যাবে। পরিবর্তনের সময় পণ্যের গায়ে থাকা ট্যাগ অক্ষত ও অব্যবহৃত অবস্থায় থাকা আবশ্যক।
            </p>
          </section>

          <section className="p-5 rounded-2xl bg-[#FAF6F0] border border-[#E7DED5]">
            <h2 className="text-base font-bold mb-2 text-[#2B1B16]">৪. মূল্য পরিশোধ ও চেকআউট</h2>
            <p className="text-[#5D4037]">
              আমরা ক্যাশ অন ডেলিভারি (COD) এবং অনুমোদিত পেমেন্ট গেটওয়ের মাধ্যমে নিরাপদ লেনদেন পরিচালনা করি। পণ্যে কোনো অতিরিক্ত লুকায়িত চার্জ নেওয়া হয় না।
            </p>
          </section>

          <section className="p-5 rounded-2xl bg-[#FAF6F0] border border-[#E7DED5]">
            <h2 className="text-base font-bold mb-2 text-[#2B1B16]">৫. কাস্টমার সাপোর্ট</h2>
            <p className="text-[#5D4037]">
              যেকোনো জিজ্ঞাসা বা সহায়তার জন্য আমাদের অফিসিয়াল সাপোর্ট ইমেইল <a href="mailto:support@thawbin.com" className="font-bold underline text-[#B89558]">support@thawbin.com</a> অথবা হটলাইন নম্বরে যোগাযোগ করতে পারেন।
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
