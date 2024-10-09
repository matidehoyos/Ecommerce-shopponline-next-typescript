'use client';
import { useProducts } from '../contexts/productsContext';
import { useState, useEffect, useMemo } from 'react';
import Controls from './Controls'; 
import OnSaleCard from './OnSaleCard';

const Oferts = () => {
  const { products } = useProducts();
  const shuffled = useMemo(() => products.filter((product) => product.discountPercentage > 15), [products]);
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
    <div className='w-[92%] my-20 mx-auto pt-14 pb-20 px-[2%] rounded-md bg-red-400'>
      <div className='mb-6 flex justify-between'>
        <h2 className='text-white font-bold text-xl'>ON SALE</h2>
        <Controls
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={shuffled.length}
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
        />
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map(product => (
          <OnSaleCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};

export default Oferts;

