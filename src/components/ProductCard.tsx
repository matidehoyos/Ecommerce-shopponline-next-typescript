import Link from 'next/link';
import Image from 'next/image';

interface ProductCardProps {
  product: {
    id: number;
    title: string;
    thumbnail: string;
    rating: number;
    price: number;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link
        key={product.id}
        href={`/product/${product.id}`}
        className="w-full p-1 md:p-2 flex flex-col items-center border border-gray-400 rounded-lg bg-white md:mb-4 md:hover:border-gray-500 md:hover:shadow-md md:hover:shadow-gray-500 transition-all"
        >
        <div className="w-full h-[150px] md:h-[170px] flex justify-center items-center bg-gray-200">
            <Image
            src={product.thumbnail}
            alt={product.title}
            width={200}
            height={170}
            className="w-[100%] h-[100%] object-scale-down md:object-contain"
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

export default ProductCard;
