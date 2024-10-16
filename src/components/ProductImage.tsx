import Image from "next/image";

interface ProductImageProps {
  images: string[];
  selectedImage: string | null;
  setSelectedImage: (image: string) => void;
}

const ProductImage: React.FC<ProductImageProps> = ({ images, selectedImage, setSelectedImage }) => {
  const displayedImages = images.slice(0, 3); 


  return (
    <div className="lg:w-[100%] px-[3%] lg:px-0 pt-4 lg:pt-0 flex flex-col-reverse lg:flex-row items-center lg:items-strech justify-center lg:justify-end">
      <div className="w-full lg:w-auto lg:h-full flex justify-center lg:flex-col lg:justify-between gap-1">
        {displayedImages.length > 1 ?
        (
        displayedImages?.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`Product image ${index}`}
            width={140}
            height={140}
            className={`w-[80px] h-[80px] lg:w-[140px] lg:h-[140px] lg:cursor-pointer object-contain border lg:border-2 ${
              selectedImage === image ? "border-gray-800" : "border-gray-300"
            } bg-gray-300 lg:bg-gray-300 object-contain lg:hover:bg-gray-200`}
            onClick={() => setSelectedImage(image)}
          />
        )))
        :
        null
      }
      </div>
      <div className="w-full lg:ml-4 relative group lg:w-[50%] lg:h-full flex items-center justify-center h-auto bg-transparent lg:bg-gray-300 lg:border border-gray-300 overflow-hidden">
        {selectedImage ? (
          <Image
            src={selectedImage}
            alt="Selected Product"
            width={500}
            height={500}
            priority
            className="w-full object-scale-down lg:object-contain h-[240px] lg:h-auto lg:scale-90 transition-all duration-1000 ease-in-out transform lg:group-hover:scale-[2]"
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
