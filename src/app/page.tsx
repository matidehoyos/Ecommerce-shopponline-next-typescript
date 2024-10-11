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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [setLoading]);

  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)] bg-gray-200">
      <header>
        {loading && ( <Loader /> )}
        <Head />
      </header>
      <main>
        <CategoriesMovil />
        <Populares />
        <Featureds />
        <Oferts />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

