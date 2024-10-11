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
        className="relative group w-full p-1 md:p-2 flex flex-col items-center border border-gray-400 rounded-lg bg-white md:mb-4 md:hover:border-gray-500 md:hover:shadow-lg md:hover:shadow-gray-600 transition-all duration-500 overflow-hidden"
        >
        <p className='w-auto py-1 px-1 md:px-2 absolute left-0 top-0 md:font-bold text-white bg-red-500'>
            {Math.ceil(product.discountPercentage)}<span className='md:font-medium'>% OFF!</span> 
        </p>    
        <div className="w-full md:h-[240px] flex justify-center items-center bg-gray-300 group-hover:bg-gray-400 transition-colors duration-500">
            <Image
            src={product.thumbnail}
            alt={product.title}
            width={200}
            height={240}
            className="w-[100%] h-[100%] object-contain"
            />
        </div>
        <h2 className="w-full my-2 text-black text-md font-bold text-left leading-[18px] truncate">
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
