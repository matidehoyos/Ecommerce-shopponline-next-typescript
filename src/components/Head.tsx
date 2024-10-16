import Image from "next/image";

const Head = () => {
  return (
    <div className="bg-gradient-to-r from-gray-200 to-gray-500 border-b border-gray-800 md:border-gray-500">
        <div className="hidden w-full lg:block">
          <Image src="/bgg.png" 
                 layout="responsive" 
                 alt="Logo shoppyfy"  
                 priority
                 width={6400} 
                 height={2000} 
                 className="w-full h-auto pt-[100px] object-contain" />
        </div>
        <div className="w-full h-auto pt-5 lg:hidden">
            <Image 
                src="/headMov.png" 
                alt="Logo de ShoppOnline"  
                width={1600} 
                height={1200} 
                className="w-full h-[320px] object-cover"
                quality={100} 
              />
        </div>
    </div>
  );
};

export default Head;
