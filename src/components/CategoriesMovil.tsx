'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useProducts } from '../contexts/productsContext';
import SearchBar from './SearchBar';

type Category = {
  slug: string;
  name: string;
  url: string;
};

const CategoriesMovil = () => {
  const { products } = useProducts();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const categoryNames = Array.from(new Set(products.map(product => product.category)));
    const categoryObjects = categoryNames.map((category) => ({
      slug: category.toLowerCase().replace(/\s+/g, '-'),
      name: category.replace(/-/g, ' '),
      url: `/shop?categories/${category.toLowerCase().replace(/\s+/g, '-')}`,
    }));
    setCategories(categoryObjects);
  }, [products]);

  return (
    <div className="flex flex-col md:hidden bg-gray-400">
    <div className="py-4 px-[3%] md:hidden">
        <SearchBar />
    </div>
      <div className="container px-2 pb-4 flex flex-nowrap items-center justify-start gap-[5px] overflow-x-scroll scrollbar-hide">
        <Link
          href="/shop"
          className="h-[50px] min-w-[120px] flex items-center justify-center p-2 text-red-100 text-lg font-bold text-center rounded-md bg-red-500 leading-[20px] border border-gray-50"
        >
          Shop
        </Link>
        {categories.map((category) => (
          <Link
            href={category.url}
            key={category.slug}
            className="h-[50px] min-w-[130px] flex items-center justify-center text-gray-900 text-lg text-center font-medium rounded-md bg-gray-300 leading-[20px] border border-gray-500"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesMovil;
