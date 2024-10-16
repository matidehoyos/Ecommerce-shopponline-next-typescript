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
      const width = window.innerWidth;
      
      if (width >= 1400) {
        setItemsPerPage(5); 
      } else if (width >= 1200) {
        setItemsPerPage(4); 
      } else if (width >= 940) {
        setItemsPerPage(3); 
      } else if (width >= 640) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(1);
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
    <div className='w-full mx-auto py-20 md:py-24 md:px-[4%] bg-red-300'>
      <div className='mb-6 flex items-center justify-between'>
        <h2 className='pl-[3%] md:pl-0 text-gray-50 font-medium text-3xl md:text-5xl'>ON SALE</h2>
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
      <div className="hidden md:grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {currentProducts.map(product => (
          <OnSaleCard product={product} key={product.id} />
        ))}
      </div>
      <div className="px-[3%] flex flex-nowrap overflow-x-scroll md:hidden gap-4">
        {shuffled.map(product => (
          <OnSaleCardMov product={product} key={product.id} />
        ))}
      </div>

    </div>
  );
};

export default Oferts;

