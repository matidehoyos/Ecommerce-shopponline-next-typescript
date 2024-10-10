import Image from "next/image";

const Head = () => {
  return (
    <div className="bg-gray-400 md:bg-transparent">
        <div className="hidden w-[94%] pt-4 mx-auto md:block rounded-md bg-gradient-to-r from-white to-gray-300">
          <Image src="/bggg.png" 
                 layout="responsive" 
                 alt="Logo shoppyfy"  
                 width={100} 
                 height={100} 
                 className="w-full md:h-auto object-cover" />
        </div>
        <div className="w-full h-auto md:hidden bg-gradient-to-b from-white to-gray-200 overflow-hidden">
          <Image 
            src="/bgMov.png" 
            alt="Logo de ShoppOnline"  
            width={100} 
            height={100} 
            className="w-full h-auto object-contain border border-gray-300" 
          />
        </div>
    </div>
  );
};

export default Head;
