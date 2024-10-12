import { Product } from '../types/Product'; 
import { FaShoppingCart } from 'react-icons/fa';

interface ProductDetailCardProps {
    product: Product | null;
    handleAddToCart: () => void;
    quantity: number;
    setQuantity: (value: number) => void;
  }
  
  const ProductDetailCard: React.FC<ProductDetailCardProps> = ({ product, handleAddToCart, quantity, setQuantity }) => {
    if (!product) {
      return <p>Product not found.</p>;
    }

  return (
    <div className='px-[3%] pt-6 md:pt-0 md:px-0 md:pl-8 text-black'> 
      <p className="font-semibold text-md opacity-70">{product?.category}</p>
      <h1 className="text-2xl font-bold mt-2">{product?.title}</h1>
      <p className="text-md font-medium mb-4">{product?.brand}</p>
      <div className="flex">
        {[...Array(5)].map((_, index) => (
          <span key={index} className={index < Math.round(product?.rating ?? 0) ? "text-yellow-600 text-2xl" : "text-gray-500 text-2xl"}>★</span>
        ))}
      </div>
      <div className='flex items-center justify-start'>
        <p className="w-auto text-2xl my-6 md:pl-2 font-semibold">${product?.price}</p>
        <p className="w-auto ml-2 text-sm text-red-300 font-bold">{product?.discountPercentage}% OFF</p>
      </div>
      <p className="w-[86%] md:w-[60%] text-md">{product?.description}</p>
      <div className='mt-4 flex items-center justify-start'>
        <p className="w-auto text-lg font-medium">{product?.stock > 0 ? 'In Stock' : 'Out of Stock'} -</p>
        <p className="w-auto ml-2 text-md font-semibold text-gray-500">{product?.warrantyInformation}</p>
      </div>
      <div className="flex items-stretch mt-8">
        <div className="flex items-center">
          <input
            type="number"
            min="1"
            max={product?.stock}
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="w-12 border border-gray-400 text-center text-bold rounded-none"
          />
        </div>
        <button
          onClick={handleAddToCart}
          className="ml-4 px-4 py-2 bg-red-500 text-white font-semibold rounded-md flex items-center hover:bg-red-600"
        >
          <FaShoppingCart className="mr-2" /> Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetailCard;

