'use client';
import { Suspense, useEffect, useState, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useProducts } from '../../contexts/productsContext';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types/Product';
import Loader from '@/components/Loader';
import Footer from '@/components/Footer';

export const dynamic = 'force-dynamic';

const ShopPageContent = () => {
  const { products } = useProducts();
  const [loading, setLoading] = useState<boolean>(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortOrder, setSortOrder] = useState<string>('none');
  const [categories, setCategories] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter(); 
  const queryCategory = searchParams.get('category') || 'all';

  useEffect(() => {
    setFilteredProducts(products);
    const uniqueCategories = Array.from(new Set(products.map((product) => product.category)));
    setCategories(uniqueCategories);

    const updateFilteredProducts = () => {
      let updatedProducts = [...products];
      if (queryCategory !== 'all') {
        updatedProducts = updatedProducts.filter(product => product.category.toLowerCase() === queryCategory.toLowerCase());
      }
      setFilteredProducts(updatedProducts);
    };

    setLoading(true);
    const timeout = setTimeout(() => {
      updateFilteredProducts();
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [products, queryCategory]);

  const sortedAndFilteredProducts = useMemo(() => {
    const updatedProducts = [...filteredProducts];
    if (sortOrder === 'asc') {
      updatedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'desc') {
      updatedProducts.sort((a, b) => b.price - a.price);
    }
    return updatedProducts;
  }, [sortOrder, filteredProducts]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLoading(true);
    setSortOrder(e.target.value);
    setTimeout(() => setLoading(false), 1000);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLoading(true);
    const selectedCategory = e.target.value;
    router.push(`/shop?category=${selectedCategory}`);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 md:bg-gradient-to-r from-white to-gray-300">
      {loading && <Loader />}
      <div className="md:w-[94%] px-[3%] md:px-[2%] py-6 md:py-10 mx-auto flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="mb-4 md:mb-0 md:hidden">
          <label htmlFor="category" className="mr-2 font-semibold text-gray-600">Filter by Category:</label>
          <select
            id="category"
            className="px-4 py-2 text-gray-700 font-bold border rounded-md border-gray-400"
            onChange={handleCategoryChange}
            value={queryCategory}
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category.toLowerCase()}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="price" className="mr-2 font-semibold text-gray-600">Sort by Price:</label>
          <select
            id="price"
            value={sortOrder}
            onChange={handleSortChange}
            className="px-4 py-2 text-gray-700 font-bold border rounded-md border-gray-400"
          >
            <option value="none">None</option>
            <option value="asc">Lowest to Highest</option>
            <option value="desc">Highest to Lowest</option>
          </select>
        </div>
      </div>

      <div className="md:w-[94%] mt-4 md:mt-0 px-[3%] md:px-[2%] pb-20 md:pb-40 mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-2">
        {sortedAndFilteredProducts.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Footer />
    </div>
  );
};

const ShopPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <ShopPageContent />
    </Suspense>
  );
};

export default ShopPage;



