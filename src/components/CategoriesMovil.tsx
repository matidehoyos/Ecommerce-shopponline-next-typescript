'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useProducts } from '../contexts/productsContext';
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
      url: `/shop?category=${category.toLowerCase().replace(/\s+/g, '-')}`, 
    }));
    setCategories(categoryObjects);
  }, [products]);

  const handleCategoryChange = (categorySlug: string) => {
    router.push(`/shop?category=${categorySlug}`); 
  };

  return (
    <div className="w-full flex flex-col lg:hidden bg-gray-700">
      <div className="px-2 py-4 md:py-4 flex flex-nowrap items-strech justify-start gap-[5px] md:gap-[8px] overflow-x-scroll">
        <Link
          href="/shop"
          className="h-auto md:h-[60px] w-auto px-4 flex items-center justify-center text-white text-xl font-bold text-center rounded-sm bg-red-600 border border-red-50"
        >
          Shop
        </Link>
        {categories.map((category) => (
          <button
            key={category.slug}
            onClick={() => handleCategoryChange(category.slug)} 
            className="min-h-[55px] md:h-[60px] min-w-[140px] md:min-w-[160px] p-2 flex items-center justify-center text-gray-700 text-xl text-center font-bold rounded-sm bg-red-200 leading-[20px] border border-red-50"
            >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoriesMovil;

