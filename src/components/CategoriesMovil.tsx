'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useProducts } from '../contexts/productsContext';
import SearchBar from './SearchBar';
import { useRouter } from 'next/navigation';

type Category = {
  slug: string;
  name: string;
  url: string;
};

const CategoriesMovil = () => {
  const router = useRouter();
  const { products } = useProducts();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const categoryNames = Array.from(new Set(products.map(product => product.category)));
    const categoryObjects = categoryNames.map((category) => ({
      slug: category.toLowerCase().replace(/\s+/g, '-'),
      name: category.replace(/-/g, ' '),
      url: `/shop?category=${category.toLowerCase().replace(/\s+/g, '-')}`, // Se corrige el typo "caterogy" a "category"
    }));
    setCategories(categoryObjects);
  }, [products]);

  const handleCategoryChange = (categorySlug: string) => {
    router.push(`/shop?category=${categorySlug}`); 
  };

  return (
    <div className="flex flex-col md:hidden bg-gray-200">
      <div className="py-4 px-[2%] md:hidden">
        <SearchBar />
      </div>
      <div className="container px-2 pb-4 flex flex-nowrap items-center justify-start gap-[5px] overflow-x-scroll scrollbar-hide">
        <Link
          href="/shop"
          className="h-[50px] min-w-[120px] flex items-center justify-center p-2 text-white text-lg font-bold text-center rounded-md bg-red-400 leading-[20px] border border-gray-50"
        >
          Shop
        </Link>
        {categories.map((category) => (
          <button
            key={category.slug}
            onClick={() => handleCategoryChange(category.slug)} // Se usa el slug correcto aquí
            className="h-[50px] min-w-[140px] flex items-center justify-center text-red-400 text-lg text-center font-medium rounded-md bg-white leading-[20px] border border-red-400"
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoriesMovil;

