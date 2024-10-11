import Image from "next/image";

interface ProductImageProps {
  images: string[];
  selectedImage: string | null;
  setSelectedImage: (image: string) => void;
}

const ProductImage: React.FC<ProductImageProps> = ({ images, selectedImage, setSelectedImage }) => {
  const displayedImages = images.slice(0, 3); 


  return (
    <div className="md:w-[85%] px-[3%] md:px-0 flex flex-col-reverse md:flex-row items-stretch md:items-strech justify-stretch md:justify-end">
      <div className="w-full md:w-auto flex md:flex-col">
        {displayedImages?.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`Product image ${index}`}
            width={100}
            height={100}
            className={`w-[120px] h-[80px] md:w-[120px] md:h-[120px] md:cursor-pointer  border ${
              selectedImage === image ? "border-gray-500" : "border-gray-300"
            } bg-gray-50 md:bg-gray-100 object-contain md:hover:bg-gray-200`}
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </div>
      <div className="md:ml-4 relative group md:w-[50%] md:flex items-center justify-center h-auto bg-gray-200 md:bg-gray-50 border border-gray-300">
        {selectedImage ? (
          <Image
            src={selectedImage}
            alt="Selected Product"
            width={500}
            height={500}
            priority
            className="w-full h-auto scale-90 transition-all duration-1000 ease-in-out transform md:group-hover:scale-[2.5]"
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
