export const metadata = {
  title: 'গোপনীয়তা নীতি (Privacy Policy) — Thawbin',
  description: 'Thawbin ইসলামিক ই-কমার্স ওয়েবসাইটের গ্রাহক তথ্য সংরক্ষণ ও গোপনীয়তা নীতি।',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen py-10 md:py-16 px-4" style={{ background: "#FAF6F0", color: "#2A211D" }}>
      <div className="max-w-4xl mx-auto rounded-3xl p-6 md:p-12 bg-white border border-[#E7DED5] shadow-sm">
        <p className="text-xs font-bold uppercase tracking-widest mb-1 text-[#B89558]">Privacy Policy</p>
        <h1 className="text-2xl md:text-4xl font-black mb-2 text-[#2B1B16]" style={{ fontFamily: "'Playfair Display', serif" }}>
          গোপনীয়তা নীতি — Thawbin (থওবিন)
        </h1>
        <p className="text-xs text-[#80736B] mb-8">
          সর্বশেষ সংস্করণ: {new Date().toLocaleDateString('bn-BD')}
        </p>

        <div className="space-y-6 text-xs md:text-sm leading-relaxed">
          <section className="p-5 rounded-2xl bg-[#FAF6F0] border border-[#E7DED5]">
            <h2 className="text-base font-bold mb-2 text-[#2B1B16]">১. আমরা কি তথ্য সংগ্রহ করি</h2>
            <ul className="list-disc pl-5 space-y-1 text-[#5D4037]">
              <li>গ্রাহকের নাম, মোবাইল নম্বর ও ডেলিভারি ঠিকানা (পণ্য পৌঁছে দেওয়ার উদ্দেশ্যে)</li>
              <li>ইমেইল ঠিকানা (অর্ডার কনফার্মেশন ও ইনভয়েস প্রেরণের জন্য)</li>
              <li>অর্ডারের বিস্তারিত তথ্য (আইটেম, পরিমাপ ও সাইজ)</li>
            </ul>
          </section>

          <section className="p-5 rounded-2xl bg-[#FAF6F0] border border-[#E7DED5]">
            <h2 className="text-base font-bold mb-2 text-[#2B1B16]">২. তথ্যের ব্যবহার</h2>
            <p className="text-[#5D4037]">
              আপনার প্রদত্ত তথ্য শুধুমাত্র আপনার অর্ডার প্রসেসিং, কুরিয়ার ডেলিভারি হ্যান্ডলিং এবং কাস্টমার সার্ভিসের প্রয়োজনে ব্যবহৃত হয়। আমরা কোনো অবস্থাতেই গ্রাহকদের ব্যক্তিগত তথ্য কোনো তৃতীয় পক্ষের কাছে বিক্রয় বা অপব্যবহার করি না।
            </p>
          </section>

          <section className="p-5 rounded-2xl bg-[#FAF6F0] border border-[#E7DED5]">
            <h2 className="text-base font-bold mb-2 text-[#2B1B16]">৩. কুকিজ ও সেশন সংরক্ষণ</h2>
            <p className="text-[#5D4037]">
              আমাদের ওয়েবসাইটে আপনার শপিং কার্ট, উইশলিস্ট এবং লগইন সেশন সক্রিয় রাখার জন্য প্রয়োজনীয় প্রযুক্তিগত কুকি ব্যবহৃত হয়।
            </p>
          </section>

          <section className="p-5 rounded-2xl bg-[#FAF6F0] border border-[#E7DED5]">
            <h2 className="text-base font-bold mb-2 text-[#2B1B16]">৪. আপনার অধিকার</h2>
            <p className="text-[#5D4037]">
              আপনি যেকোনো সময় আপনার প্রোফাইল তথ্য সংশোধন বা মুছে ফেলার অনুরোধ করতে পারেন। আমাদের প্রাইভেসি টিমের সাথে যোগাযোগ করতে পারেন: <a href="mailto:support@thawbin.com" className="font-bold underline text-[#B89558]">support@thawbin.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
