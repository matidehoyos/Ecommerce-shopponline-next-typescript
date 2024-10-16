import Image from "next/image";

interface ProductImageProps {
  images: string[];
  selectedImage: string | null;
  setSelectedImage: (image: string) => void;
}

const ProductImage: React.FC<ProductImageProps> = ({ images, selectedImage, setSelectedImage }) => {
  const displayedImages = images.slice(0, 3); 


  return (
    <div className="md:w-[100%] px-[3%] md:px-0 pt-4 md:pt-0 flex flex-col-reverse md:flex-row items-center md:items-strech justify-center md:justify-end">
      <div className="w-full md:w-auto md:h-full flex justify-center md:flex-col md:justify-between gap-1">
        {displayedImages.length > 1 ?
        (
        displayedImages?.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`Product image ${index}`}
            width={140}
            height={140}
            className={`w-[80px] h-[80px] md:w-[140px] md:h-[140px] md:cursor-pointer object-contain border md:border-2 ${
              selectedImage === image ? "border-gray-800" : "border-gray-200"
            } bg-gray-300 md:bg-gray-100 object-contain md:hover:bg-gray-200`}
            onClick={() => setSelectedImage(image)}
          />
        )))
        :
        null
      }
      </div>
      <div className="md:ml-4 relative group md:w-[50%] md:h-full flex items-center justify-center h-auto bg-transparent md:bg-gray-200 md:border border-gray-300 overflow-hidden">
        {selectedImage ? (
          <Image
            src={selectedImage}
            alt="Selected Product"
            width={500}
            height={500}
            priority
            className="w-full object-scale-down md:object-contain h-[240px] md:h-auto md:scale-90 transition-all duration-1000 ease-in-out transform md:group-hover:scale-[2]"
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
