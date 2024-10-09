import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types/Product';

interface ProductCardProps {
  product: Product;
}

const OnSaleCard = ({ product }: ProductCardProps) => {
  return (
    <Link
        key={product.id}
        href={`/product/${product.id}`}
        className="w-full relative sm:w-[49%] md:w-[32%] lg:w-full p-2 flex flex-col items-center border border-gray-400 rounded-lg bg-white mb-4 hover:border-gray-500 hover:shadow-md hover:shadow-gray-500 transition-all overflow-hidden"
        >
        <p className='w-auto py-1 px-2 absolute left-0 top-0 font-bold text-white bg-red-600'>
            {Math.ceil(product.discountPercentage)}<span className='font-medium'>% OFF!</span> 
        </p>    
        <div className="w-full h-[170px] flex justify-center items-center bg-gray-300">
            <Image
            src={product.thumbnail}
            alt={product.title}
            width={200}
            height={170}
            className="w-[100%] h-[80%] object-contain"
            />
        </div>
        <h2 className="w-full my-2 text-black text-md font-bold text-left leading-[18px]">
            {product.title}
        </h2>
        <div className="w-full mt-auto flex justify-between items-center">
            <div className="flex">
            {[...Array(5)].map((_, index) => (
                <span
                    key={index}
                    className={
                        index < Math.round(product.rating)
                        ? 'text-yellow-500 text-xl'
                        : 'text-gray-300 text-xl'
                    }
                    >
                    ★
                </span>
          ))}
        </div>
        <p className="text-gray-900 font-bold">${product.price}</p>
      </div>
    </Link>
  );
};

export default OnSaleCard;
