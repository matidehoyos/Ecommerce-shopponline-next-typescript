import React from 'react';
import ProductCard from '@/components/ProductCard';
import { Product } from '../types/Product';

interface RelatedProductsProps {
  relatedProducts: Product[];
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ relatedProducts }) => {
  return (
    <div className='py-20 bg-white'>
      <div className='w-[90%] py-10 mx-auto flex flex-col'>
        <h4 className='w-full mb-10 text-2xl font-bold text-center text-gray-700'>Related Products</h4>
        <div className='mt-6 pb-4 flex flex-nowrap gap-2 overflow-x-scroll' style={{scrollbarWidth: 'thin'}}>
          {relatedProducts.map((relatedProduct) => (
            <ProductCard product={relatedProduct} key={relatedProduct.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;
