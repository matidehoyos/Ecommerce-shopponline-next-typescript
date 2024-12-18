'use client';
import { Suspense, useEffect, useState, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useProducts } from '../../contexts/productsContext';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types/Product';
import Loader from '@/components/Loader';
import Footer from '@/components/Footer';
import MovilShopCard from '@/components/MovilShopCard';

export const dynamic = 'force-dynamic';

const ShopPageContent = () => {
  const { products } = useProducts();
  const [loading, setLoading] = useState<boolean>(true);
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
    <div className="w-full pt-[80px] md:pt-[120px] min-h-screen bg-gradient-to-r from-gray-200 to-gray-500">
      {loading && <Loader />}
      <div className="md:w-full px-[3%] md:px-[2%] py-6 md:py-9 mx-auto flex flex-col md:flex-row justify-between items-start md:items-center">
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
      <div className="grid md:hidden mt-4 px-[3%] pb-20 mx-auto grid-cols-2 gap-2">
        {sortedAndFilteredProducts.map((product: Product) => (
          <MovilShopCard key={product.id} product={product} />
        ))}
      </div>
      <div className="hidden md:grid w-[94%] mt-0 px-[2%] pb-40 mx-auto grid-cols-3 lg:grid-cols-5 gap-x-3 gap-y-4">
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



