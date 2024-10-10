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
        className="relative w-full p-1 md:p-2 flex flex-col items-center border border-gray-400 rounded-lg bg-white md:mb-4 md:hover:border-gray-500 md:hover:shadow-md md:hover:shadow-gray-500 transition-all overflow-hidden"
        >
        <p className='w-auto py-1 px-1 md:px-2 absolute left-0 top-0 md:font-bold text-white bg-red-600'>
            {Math.ceil(product.discountPercentage)}<span className='md:font-medium'>% OFF!</span> 
        </p>    
        <div className="w-full h-[150px] md:h-[170px] flex justify-center items-center bg-gray-100">
            <Image
            src={product.thumbnail}
            alt={product.title}
            width={200}
            height={170}
            className="w-[100%] h-[100%] object-contain"
            />
        </div>
        <h2 className="w-full mt-2 text-black text-lg font-semibold md:font-bold text-left truncate">
            {product.title}
        </h2>
        <div className="w-full mt-auto flex flex-col md:flex-row justify-between md:items-center">
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
