import type { Metadata } from 'next';
import { Oswald, DM_Sans } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/layout/SmoothScroll';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/layout/CartDrawer';
import Intro from '@/components/ui/Intro';

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-oswald',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'ALBANOTTE — From Dawn to Night',
    template: '%s | ALBANOTTE',
  },
  description:
    'Italian-inspired specialty coffee roasted in Harrington Park, NJ. Five single-origin blends, from dawn to night.',
  keywords: [
    'specialty coffee',
    'Italian coffee',
    'single origin',
    'Harrington Park NJ',
    'ALBANOTTE',
    'small batch roasted',
  ],
  openGraph: {
    title: 'ALBANOTTE — From Dawn to Night',
    description:
      'Italian-inspired specialty coffee roasted in Harrington Park, NJ.',
    url: 'https://albanotte.com',
    siteName: 'ALBANOTTE',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ALBANOTTE — From Dawn to Night',
    description:
      'Italian-inspired specialty coffee roasted in Harrington Park, NJ.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://cdn.shopify.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.shopify.com" />
        <link rel="preconnect" href="https://albanotte.myshopify.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#0B0B0B" />
      </head>
      <body className="bg-alb-black text-alb-off-white grain-overlay grain-overlay--svg">
        <CartProvider>
          <SmoothScroll>
            <Intro />
            <Header />
            <main>{children}</main>
            <Footer />
            <CartDrawer />
          </SmoothScroll>
        </CartProvider>
      </body>
    </html>
  );
}
