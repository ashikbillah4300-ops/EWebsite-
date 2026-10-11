import { Truck, ShieldCheck, HeartHandshake, Headphones } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'সারাদেশে ডেলিভারি',
    subtitle: 'ক্যাশ অন ডেলিভারি সুবিধা সহ',
    iconBg: '#F7F1E8',
    iconColor: '#B89558',
  },
  {
    icon: ShieldCheck,
    title: '১০০% খাঁটি ইসলামিক পণ্য',
    subtitle: 'অ্যালকোহলমুক্ত আতর ও সেরা ফেব্রিক',
    iconBg: '#F7F1E8',
    iconColor: '#2B1B16',
  },
  {
    icon: HeartHandshake,
    title: 'সহজ রিটার্ন ও এক্সচেঞ্জ',
    subtitle: 'ন্যায্য ও স্বচ্ছ রিটার্ন নীতি',
    iconBg: '#F7F1E8',
    iconColor: '#B89558',
  },
  {
    icon: Headphones,
    title: 'কাস্টমার সাপোর্ট',
    subtitle: 'যেকোনো তথ্যে সহায়তা প্রস্তুত',
    iconBg: '#F7F1E8',
    iconColor: '#2B1B16',
  },
];

export default function Features() {
  return (
    <section className="py-4 md:py-6" style={{ background: '#FFFFFF', borderBottom: '1px solid #E7DED5' }}>
      <div className="max-w-7xl mx-auto px-3 md:px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {features.map((f, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3.5 md:p-4 rounded-2xl transition-all hover:shadow-sm"
              style={{ background: '#FAF6F0', border: '1px solid #E7DED5' }}
            >
              <div
                className="p-2.5 rounded-xl flex-shrink-0"
                style={{ background: f.iconBg, border: '1px solid #E7DED5' }}
              >
                <f.icon className="w-5 h-5" style={{ color: f.iconColor }} />
              </div>
              <div>
                <h3 className="font-bold text-xs md:text-sm" style={{ color: '#2B1B16' }}>
                  {f.title}
                </h3>
                <p className="text-[10px] md:text-xs hidden sm:block mt-0.5" style={{ color: '#80736B' }}>
                  {f.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
