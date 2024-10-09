'use client';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useProducts } from '../contexts/productsContext';
import { useLoading } from '@/contexts/loadingContext';
import { useRouter } from 'next/navigation'; 
type Category = {
  slug: string;
  name: string;
  url: string;
};

type GroupedCategories = {
  [key: string]: string[];
};

const Categories = () => {
  const { products } = useProducts();
  const { setLoading } = useLoading();
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();

  const groupedCategories: GroupedCategories = {
    'Electronics': ['laptops', 'smartphones', 'tablets', 'mobile-accessories'],
    'Men\'s': ['mens-shirts', 'mens-shoes', 'mens-watches'],
    'Women\'s': ['womens-bags', 'womens-dresses', 'womens-jewellery', 'womens-shoes', 'womens-watches', 'Tops'],
    'Beauty': ['beauty', 'fragrances', 'skin-care'],
    'Home': ['furniture', 'home-decoration', 'kitchen-accessories'],
    'Sports': ['sports-accessories', 'sunglasses'],
    'Vehicles': ['motorcycle', 'vehicle']
  };

  useEffect(() => {
    const categoryNames = Array.from(new Set(products.map(product => product.category)));
    const filteredCategories = categoryNames
      .filter(name => name !== 'groceries')
      .map(name => ({
        slug: name,
        name: name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()), 
        url: `/shop?category=${encodeURIComponent(name)}`
      }));
    setCategories(filteredCategories);
  }, [products]);

  const groupedCategoryNames = Object.values(groupedCategories).flat();

  const ungroupedCategories = categories.filter(
    category => !groupedCategoryNames.includes(category.slug)
  );

  const handleCategoryChange = (subCategory: string) => {
    setLoading(true); 
    router.push(`/shop?category=${encodeURIComponent(subCategory)}`); 
  };

  return (
    <div className="md:w-[94%] mx-auto overflow-hidden md:overflow-visible ">
      <div className="container w-auto md:w-full flex flex-nowrap items-center justify-start md:justify-between overflow-x-scroll bg-gray-700 md:bg-gray-800">
        <Link href="/shop" className="px-2 md:px-[25px] md:py-2 text-center text-red-500 text-base md:text-xl font-semibold md:font-bold md:cursor-pointer md:hover:text-red-500 ">
          All Products
        </Link>

        {Object.keys(groupedCategories).map((mainCategory, index) => (
          <div key={index} className="md:py-2 relative group md:flex-1">
            <button className="w-full h-full text-gray-100 text-base md:text-xl font-semibold md:font-bold md:cursor-pointer md:hover:text-red-500">
              {mainCategory}
            </button>
            <div className="w-full py-0 absolute max-h-0 overflow-hidden group-hover:max-h-[200px] bg-gray-800 z-10 transition-height duration-1000 ease-in-out">
              {groupedCategories[mainCategory].map((subCategory, subIndex) => (
                <button key={subIndex} onClick={() => handleCategoryChange(subCategory)} className="w-full flex flex-col justify-center items-center text-center px-2 py-1">
                  <h2 className='w-full text-gray-100 text-center font-semibold hover:bg-red-500'>{subCategory.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</h2>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="container py-12 px-8 xl:hidden">
        <Carousel
          showArrows={true}
          showThumbs={false}
          showStatus={false}
          infiniteLoop={true}
          autoPlay={true}
          interval={3000}
        >
          {ungroupedCategories.map((category, index) => (
            <div key={index} className="w-full p-0 pb-6 flex flex-col items-center justify-center border-2 border-gray-300 bg-gray-50 rounded-xl overflow-hidden">
              <p className="mt-4 text-gray-800 text-2xl font-bold">
                {category.name}
              </p>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Categories;

