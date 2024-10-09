import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ProductsProvider } from "@/contexts/productsContext";
import { LoadingProvider } from "@/contexts/loadingContext";
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
  title: "ShopOnline",
  description: "Online shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
            <ProductsProvider >
              <LoadingProvider>
                         <NavBar />
                         <CartDrawer />
                         {children}
              </LoadingProvider>
            </ProductsProvider>
        </CartProvider>
      </body>
    </html>
  );
}
