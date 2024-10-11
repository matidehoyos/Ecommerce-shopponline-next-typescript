'use client';
import { useProducts } from '../contexts/productsContext';
import { useState, useEffect, useMemo } from 'react';
import Controls from './Controls'; 
import OnSaleCard from './OnSaleCard';
import OnSaleCardMov from './OnSaleCardMov';

const Oferts = () => {
  const { products } = useProducts();
  const shuffled = useMemo(() => products.filter((product) => product.discountPercentage > 15), [products]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerPage(5);
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
    <div className='w-[94%] md:w-full mx-auto py-16 md:py-24 md:px-[4%] bg-red-200 md:bg-red-300'>
      <div className='mb-6 flex items-center justify-between'>
        <h2 className='text-gray-800 md:text-gray-50 font-bold md:font-medium text-xl md:text-5xl'>ON SALE</h2>
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
      <div className="w-full hidden md:grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1 md:gap-5">
        {currentProducts.map(product => (
          <OnSaleCard product={product} key={product.id} />
        ))}
      </div>
      <div className="w-full flex flex-nowrap overflow-x-scroll md:hidden gap-4">
        {shuffled.map(product => (
          <OnSaleCardMov product={product} key={product.id} />
        ))}
      </div>

    </div>
  );
};

export default Oferts;

