import Image from "next/image";

const Head = () => {
  return (
    <div className="bg-gradient-to-r from-white to-gray-300 border-b-2 border-gray-300">
        <div className="hidden w-full md:pt-4 mx-auto md:block">
          <Image src="/bgg.png" 
                 alt="Logo shoppyfy"  
                 priority
                 width={100} 
                 height={100} 
                 className="w-full md:h-auto object-cover" />
        </div>
        <div className="w-full h-auto md:hidden">
            <Image 
                src="/headMov.png" 
                alt="Logo de ShoppOnline"  
                width={1600} 
                height={1200} 
                className="w-full h-auto object-contain"
                quality={100} 
                priority
              />
        </div>
    </div>
  );
};

export default Head;
