import { Truck, ShieldCheck, Star, Headphones } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'Free Delivery',
    subtitle: 'On orders over ৳3,000',
    iconBg: '#EFE2D4',
    iconColor: '#3E2723',
  },
  {
    icon: ShieldCheck,
    title: '2-Year Warranty',
    subtitle: 'On all Thawbin desks',
    iconBg: '#E8F5EE',
    iconColor: '#32805A',
  },
  {
    icon: Star,
    title: 'Premium Quality',
    subtitle: 'Certified materials',
    iconBg: '#FFF8EC',
    iconColor: '#E5A33D',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    subtitle: 'Dedicated desk experts',
    iconBg: '#EFE2D4',
    iconColor: '#795548',
  },
];

export default function Features() {
  return (
    <section className="py-4 md:py-6" style={{ background: '#FAF6F0', borderBottom: '1px solid #E7DED5' }}>
      <div className="max-w-7xl mx-auto px-3 md:px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
          {features.map((f, i) => (
            <div key={i}
              className="flex items-center gap-2.5 md:gap-3 p-3 md:p-4 rounded-xl"
              style={{ background: '#FFFFFF', border: '1px solid #E7DED5' }}>
              <div className="p-2 md:p-2.5 rounded-full flex-shrink-0"
                style={{ background: f.iconBg }}>
                <f.icon className="w-4 h-4 md:w-5 md:h-5" style={{ color: f.iconColor }} />
              </div>
              <div>
                <h3 className="font-bold text-xs md:text-sm" style={{ color: '#2B211D' }}>{f.title}</h3>
                <p className="text-[10px] md:text-xs hidden sm:block" style={{ color: '#80736B' }}>{f.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
