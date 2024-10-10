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

const ProductMovilCard = ({ product }: ProductCardProps) => {
  return (
    <Link
        key={product.id}
        href={`/product/${product.id}`}
        className="w-[300px] p-2 flex flex-col items-center border border-gray-400 rounded-lg bg-white"
        >
        <div className="w-full h-[150px] flex justify-center items-center bg-gray-100">
            <Image
              src={product.thumbnail}
              alt={product.title}
              width={200}
              height={170}
              className="w-full h-[100%] object-scale-down"
            />
        </div>
        <h2 className="w-[250px] mt-2 text-black text-lg font-semibold text-left truncate">
            {product.title}
        </h2>
        <div className="w-full mt-auto flex flex-col justify-between">
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

export default ProductMovilCard;