import './globals.css';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import UserLayoutWrapper from './components/UserLayoutWrapper';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Thawbin (থওবিন) — প্রিমিয়াম ইসলামিক লাইফস্টাইল ও মুসলিম ফ্যাশন',
  description: 'Thawbin-এ স্বাগতম — আপনার পছন্দের প্রিমিয়াম পাঞ্জাবি, অ্যালকোহলমুক্ত আতর, জায়নামাজ, টুপি, তসবিহ, পবিত্র কুরআন ও ইসলামিক উপহারের বিশ্বস্ত অনলাইন ঠিকানা।',
  keywords: 'Thawbin, থওবিন, ইসলামিক পণ্য, পাঞ্জাবি, আতর, জায়নামাজ, টুপি, তসবিহ, পবিত্র কুরআন, হিজাব, আবায়া, ইসলামিক উপহার, বাংলাদেশ',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0',
  openGraph: {
    title: 'Thawbin — আপনার জীবনে ইসলামিক সৌন্দর্যের ছোঁয়া',
    description: 'পাঞ্জাবি থেকে আতর, জায়নামাজ থেকে ইসলামিক উপহার—আপনার পছন্দের সবকিছু এক ঠিকানায়।',
    type: 'website',
    locale: 'bn_BD',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ backgroundColor: '#FAF6F0', color: '#2B211D' }}>
        <AuthProvider>
          <CartProvider>
            <UserLayoutWrapper>
              <main className="min-h-screen">
                {children}
              </main>
            </UserLayoutWrapper>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
