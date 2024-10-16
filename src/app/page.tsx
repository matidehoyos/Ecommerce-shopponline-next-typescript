'use client';
import { useEffect, useState } from 'react';
import Featureds from "@/components/Featureds";
import Populares from "@/components/Populares";
import Footer from "@/components/Footer";
import Oferts from "@/components/Oferts";
import Head from "@/components/Head";
import Loader from '@/components/Loader';
import CategoriesMovil from '@/components/CategoriesMovil';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="w-full pt-[60px] lg:pt-[105px] min-h-screen font-geist-sans bg-gradient-to-r from-white to-gray-300">
      <header>
        {loading && <Loader />}
        <Head />
      </header>
      <main>
        <CategoriesMovil />
        <Populares />
        <Featureds />
        <Oferts />
      </main>
      <Footer />
    </div>
  );
}


