import React from 'react';
import ProductCard from '@/components/ProductCard';
import { Product } from '../types/Product';

interface RelatedProductsProps {
  relatedProducts: Product[];
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ relatedProducts }) => {
  return (
    <div className='py-20 bg-white'>
      <div className='w-[90%] mx-auto flex flex-col'>
        <h4 className='w-full mb-10 text-2xl font-bold text-center text-gray-700'>Related Products</h4>
        <div className='w-[90%] mt-6 pb-20 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {relatedProducts.map((relatedProduct) => (
            <ProductCard product={relatedProduct} key={relatedProduct.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;
