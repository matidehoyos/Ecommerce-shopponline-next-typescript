import Image from "next/image";

interface ProductImageProps {
  images: string[];
  selectedImage: string | null;
  setSelectedImage: (image: string) => void;
}

const ProductImage: React.FC<ProductImageProps> = ({ images, selectedImage, setSelectedImage }) => {
  return (
    <div className="w-[90%] flex items-center justify-end">
      <div className="flex flex-col">
        {images?.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`Product image ${index}`}
            width={100}
            height={100}
            className={`mb-2 cursor-pointer border ${
              selectedImage === image ? "border-gray-500" : "border-gray-300"
            } bg-white`}
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </div>
      <div className="ml-4 overflow-hidden relative group w-[50%] h-auto bg-white border border-gray-300">
        {selectedImage ? (
          <Image
            src={selectedImage}
            alt="Selected Product"
            width={500}
            height={500}
            priority
            className="w-full h-auto scale-90 transition-transform duration-500 ease-in-out transform group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-[500px] flex justify-center items-center bg-gray-200">
            Loading...
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImage;
