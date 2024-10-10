'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useProducts } from '../contexts/productsContext';

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
    <div className="flex flex-col md:hidden">
      <div className="container px-2 py-4 flex flex-nowrap items-center justify-start gap-[2px] overflow-x-scroll scrollbar-hide">
        <Link
          href="/shop"
          className="h-[50px] min-w-[120px] flex items-center justify-center p-2 text-red-500 text-lg font-bold text-center rounded-md bg-gray-600 leading-[20px] border border-red-500"
        >
          All Products
        </Link>
        {categories.map((category) => (
          <Link
            href={category.url}
            key={category.slug}
            className="h-[50px] min-w-[130px] flex items-center justify-center text-gray-50 text-lg text-center font-medium rounded-md bg-gray-600 leading-[20px] border border-gray-50"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesMovil;
