'use client';
import { useProducts } from '../contexts/productsContext';
import { useState, useEffect, useMemo } from 'react';
import ProductCard from './ProductCard';
import Controls from './Controls'; 
import ProductMovilCard from './ProductMovilCard';

const Featureds = () => {
  const { products } = useProducts();
  const shuffled = useMemo(() => products.sort(() => 0.5 - Math.random()).slice(0, 20), [products]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerPage(4);
      } else if (window.innerWidth >= 768) {
        setItemsPerPage(3);
      } else if (window.innerWidth >= 640) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(2);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); 

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNextPage = () => {
    if ((currentPage + 1) * itemsPerPage < shuffled.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentProducts = shuffled.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className='w-full px-[3%] md:px-[5%] py-16 md:pt-14 md:pb-20 bg-gray-50'>
      <div className='mb-2 md:mb-6 flex justify-between'>
        <h2 className='text-gray-800 md:text-gray-900 md:font-bold text-xl'>Featured products</h2>
        <div className='hidden md:block'>
            <Controls
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              totalItems={shuffled.length}
              handlePreviousPage={handlePreviousPage}
              handleNextPage={handleNextPage}
            />
        </div>
      </div>
      <div className="w-full hidden md:grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 md:gap-6">
        {currentProducts.map(product => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
      <div className="w-full flex flex-nowrap overflow-x-scroll md:hidden gap-1">
          {shuffled.map(product => (
              <ProductMovilCard product={product} key={product.id} />
          ))}
      </div>
    </div>
  );
};

export default Featureds;
