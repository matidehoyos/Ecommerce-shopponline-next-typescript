import Link from 'next/link';
import Image from 'next/image';

interface ProductCardProps {
  product: {
    id: number;
    title: string;
    thumbnail: string;
    rating: number;
    price: number;
    category: string;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  const isSmartphone = product.category.toLowerCase() === 'smartphones';
  const isVehicle = product.category.toLowerCase() === 'vehicle';

  return (
    <Link
      key={product.id}
      href={`/product/${product.id}`}
      className="group w-full md:min-w-[250px] p-1 md:p-2 flex flex-col items-center border border-gray-400 rounded-lg bg-white md:mb-0 md:hover:border-gray-500 md:hover:shadow-md md:hover:shadow-gray-600 transition-all duration-500"
    >
      <div
        className={`w-full flex justify-center items-center transition-all duration-500 ${
          isSmartphone ? 'bg-black' : 'bg-gray-300 group-hover:bg-red-300'
        } overflow-hidden`}
        style={{
          height: '200px',
        }}
      >
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={200}
          height={200}
          className={`w-[100%] h-[100%] md:min-w-[250px] object-scale-down md:object-contain ${
            isVehicle ? 'scale-[1.8]' : ''
          } ${
            isSmartphone ? 'h-[80%]' : ''
          }`}
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


