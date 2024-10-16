'use client';
import { useEffect, useState } from 'react';
import { useProducts } from '../contexts/productsContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    if (selectedCategory) {
      router.push(`/shop?category=${selectedCategory}`);
    }
  };

  return (
    <div className="w-full pb-6 flex justify-start items-stretch lg:hidden bg-gray-200 px-2 pt-6">
      <Link
        href="/shop"
        className="block text-white text-xl font-bold text-center bg-red-500 py-2 px-4 rounded-md border border-red-700"
      >
        Shop
      </Link>
      <select
        onChange={handleCategoryChange}
        className="px-1 ml-3 flex-1 text-gray-800 text-xl font-bold bg-gray-100 rounded-md border border-red-500"
      >
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category.slug} value={category.slug}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoriesMovil;


