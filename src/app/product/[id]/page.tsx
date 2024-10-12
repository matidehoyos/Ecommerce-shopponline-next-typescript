'use client';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useProducts } from '../../../contexts/productsContext';
import { useCart } from '../../../contexts/cartContext';
import { Product } from '../../../types/Product'; 
import ReviewCard from '@/components/ReviewCard';
import Loader from '@/components/Loader';
import ProductImage from '@/components/ProductImage';
import ProductDetailCard from '@/components/ProductDetailCard';
import RelatedProducts from '@/components/RelatedProducts';
import Footer from '@/components/Footer';

const ProductDetail = () => {
  const params = useParams();
  const { products } = useProducts();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { addToCart } = useCart();

  const fetchRelatedProducts = useCallback((category: string) => {
    const filteredProducts = products.filter((p) => p.category === category && p.id !== product?.id);
    setRelatedProducts(filteredProducts);
  }, [products, product?.id]);

  useEffect(() => {
    if (params?.id) {
      const foundProduct = products.find((p) => p.id === Number(params.id));
      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedImage(foundProduct.images[0]);
        fetchRelatedProducts(foundProduct.category);
      }
    }
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [params.id, products, fetchRelatedProducts]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        thumbnail: product.images[0],
        title: product.title,
        price: product.price,
        quantity: quantity,
      });
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-gradient-to-r from-white to-gray-300 overflow-hidden">
      {loading && <Loader />}
      <div className='w-full md:pt-16 flex flex-col md:flex-row items-center justify-center'>
        {product && (
          <>
            <ProductImage 
              images={product.images} 
              selectedImage={selectedImage} 
              setSelectedImage={setSelectedImage} 
            />
            <ProductDetailCard 
              product={product} 
              handleAddToCart={handleAddToCart} 
              quantity={quantity} 
              setQuantity={setQuantity} 
            />
          </>
        )}
      </div>
      <div className='w-full px-[3%] md:px-0 py-14 md:py-20 flex md:justify-center items-stretch gap-2 overflow-x-scroll md:overflow-hidden'>
        {product?.reviews?.map((review, index) => (
          <ReviewCard review={review} key={index} />
        ))}
      </div>
      <RelatedProducts relatedProducts={relatedProducts} />
      <Footer />
    </div>
  );
};

export default ProductDetail;
