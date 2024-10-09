'use client';
import { Suspense, useEffect, useState, useMemo, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { useProducts } from '../../contexts/productsContext';
import { useLoading } from '../../contexts/loadingContext';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types/Product';
import Loader from '@/components/Loader';

export const dynamic = 'force-dynamic';

const ShopPageContent = () => {
  const { products } = useProducts();
  const { loading, setLoading } = useLoading(); 
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortOrder, setSortOrder] = useState<string>('none');
  
  const searchParams = useSearchParams();
  const queryCategory = searchParams.get('category') || 'all';

  const updateProducts = useCallback(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [setLoading]);

  useEffect(() => {
    setFilteredProducts(products);
    updateProducts();
  }, [products, updateProducts]);

  const sortedAndFilteredProducts = useMemo(() => {
    let updatedProducts = [...filteredProducts];

    if (queryCategory !== 'all') {
      updatedProducts = updatedProducts.filter(product => product.category.toLowerCase() === queryCategory.toLowerCase());
    }

    if (sortOrder === 'asc') {
      updatedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'desc') {
      updatedProducts.sort((a, b) => b.price - a.price);
    }

    return updatedProducts;
  }, [queryCategory, sortOrder, filteredProducts]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
    updateProducts();
  };

  useEffect(() => {
    updateProducts();
  }, [queryCategory, updateProducts]);

  if (!products || products.length === 0) {
    return <p>Loading products...</p>;
  }

  return (
    <div className="w-full min-h-screen bg-gray-200">
      {loading && <Loader />}
      <div className="w-[94%] py-6 mx-auto flex justify-end items-center">
        <div>
          <label htmlFor="price" className="mr-2 font-semibold text-gray-600">Sort by Price:</label>
          <select
            id="price"
            value={sortOrder}
            onChange={handleSortChange}
            className="px-4 py-2 text-gray-700 font-bold border rounded-md border-gray-400"
          >
            <option className="text-gray-600" value="none">None</option>
            <option className="text-gray-600" value="asc">Lowest to Highest</option>
            <option className="text-gray-600" value="desc">Highest to Lowest</option>
          </select>
        </div>
      </div>

      <div className="w-[90%] mt-6 pb-20 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedAndFilteredProducts.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
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
