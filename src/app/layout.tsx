import type { Metadata } from "next";
import localFont from "next/font/local";
import "../../globals.css";
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { ProductsProvider } from "@/contexts/productsContext";
import { CartProvider } from "@/contexts/cartContext";
import NavBar from "@/components/NavBar";
import CartDrawer from "@/components/CartDrawer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ShopOnline - Your One Stop Online Shop",
  description: "Discover a wide range of products at ShopOnline, where quality meets convenience.",
  icons: {
    icon: '/icon.png',
  },
  openGraph: {
    title: 'ShopOnline',
    description: 'Shop the best products online with ease and convenience.',
    url: 'https://shoponline.vercel.app',
    siteName: 'ShopOnline',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ShopOnline Banner',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ShopOnline',
    description: 'Explore quality products at ShopOnline.',
    images: ['/images/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="icon" href="icon.png" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <UserProvider>
          <CartProvider>
            <ProductsProvider>
                  <header>
                    <NavBar />
                  </header>
                  <main>
                    {children}
                  </main>
                  <CartDrawer />
            </ProductsProvider>
          </CartProvider>
        </UserProvider>
      </body>
    </html>
  );
}