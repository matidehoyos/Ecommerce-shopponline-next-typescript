import React from 'react';
import ProductCard from '@/components/ProductCard';
import { Product } from '../types/Product';
import ProductMovilCard from './ProductMovilCard';

interface RelatedProductsProps {
  relatedProducts: Product[];
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ relatedProducts }) => {
  return (
    <div className='py-20 bg-gray-200'>
      <div className='md:w-[90%] md:py-10 mx-auto flex flex-col'>
        <h4 className='pl-[3%] md:pl-0 md:mb-10 text-xl md:text-2xl font-bold md:text-center text-gray-700'>Related Products</h4>
        <div className='hidden md:flex px-[3%] md:px-0 mt-4 md:mt-6 pb-4 flex-nowrap gap-2'>
          {relatedProducts.slice(0,5).map((relatedProduct) => (
            <ProductCard product={relatedProduct} key={relatedProduct.id} />
          ))}
        </div>
        <div className='flex md:hidden px-[3%] md:px-0 mt-4 md:mt-6 pb-4 flex-nowrap gap-2 overflow-x-scroll'>
          {relatedProducts.map((relatedProduct) => (
            <ProductMovilCard product={relatedProduct} key={relatedProduct.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;
