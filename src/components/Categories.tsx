'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; 

type GroupedCategories = {
  [key: string]: string[];
};

const Categories = () => {
  const router = useRouter();

  const groupedCategories: GroupedCategories = {
    'Electronics': ['laptops', 'tablets', 'mobile-accessories'],
    'Sports': ['sports-accessories', 'sunglasses'],
    'Vehicles': ['motorcycle', 'vehicle'],
    'Men\'s': ['mens-shirts', 'mens-shoes', 'mens-watches'],
    'Women\'s': ['womens-bags', 'womens-dresses', 'womens-jewellery', 'womens-shoes', 'womens-watches', 'Tops'],
    'Home': ['furniture', 'home-decoration', 'kitchen-accessories'],
    'Beauty': ['beauty', 'skin-care'],
  };

  const handleCategoryChange = (subCategory: string) => {
    router.push(`/shop?category=${encodeURIComponent(subCategory)}`); 
  };

  return (
    <div className="hidden md:block w-full overflow-visible">
      <div className="container w-[94%] mx-auto mt-2 flex flex-nowrap items-center justify-between rounded-md bg-gray-800">
        <Link href="/shop" className="px-2 md:px-[25px] md:py-1 text-center text-red-400 md:text-lg font-semibold md:font-bold md:cursor-pointer md:hover:text-red-600 transition-colors duration-500">
          All Products
        </Link>

        {Object.keys(groupedCategories).map((mainCategory, index) => (
          <div key={index} className="md:py-1 relative group md:flex-1">
            <button className="w-full h-full text-gray-100 text-lg font-semibold md:font-bold md:cursor-pointer md:hover:text-red-500 transition-colors duration-500">
              {mainCategory}
            </button>
            <div className="w-full py-0 absolute max-h-0 overflow-hidden group-hover:max-h-[200px] bg-gray-800 z-10 transition-height duration-1000">
              {groupedCategories[mainCategory].map((subCategory, subIndex) => (
                <button key={subIndex} onClick={() => handleCategoryChange(subCategory)} className="w-full flex flex-col justify-center items-center text-center px-2 py-1">
                  <h2 className='w-full text-gray-100 text-center font-semibold hover:bg-red-500 transition-colors duration-300'>{subCategory.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</h2>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;

