import './globals.css';
import { Inter } from 'next/font/google';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import UserLayoutWrapper from './components/UserLayoutWrapper';

export const dynamic = 'force-dynamic';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Thawbin — Premium Furniture & Adjustable Desks in Bangladesh',
  description: 'Discover thoughtfully designed premium furniture and adjustable desks by Thawbin. Bringing comfort, style, and productivity to your workspace in Bangladesh.',
  keywords: 'Thawbin, adjustable desk, furniture, premium desk, ergonomic, Bangladesh, workspace',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0',
  openGraph: {
    title: 'Thawbin — Premium Furniture & Adjustable Desks',
    description: 'Build Your Workspace. Your Way.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className} style={{ backgroundColor: '#FAF6F0' }}>
        <AuthProvider>
          <CartProvider>
            <UserLayoutWrapper>
              <main className="min-h-screen -mt-44 md:-mt-[5rem] lg:-mt-0 pt-0 -mb-4">
                {children}
              </main>
            </UserLayoutWrapper>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
