import Image from "next/image";

const Head = () => {
  return (
    <div className="bg-gradient-to-r from-white to-gray-300 border-b-2 border-gray-300">
        <div className="hidden w-full pt-4 mx-auto md:block">
          <Image src="/bggg.png" 
                 layout="responsive" 
                 alt="Logo shoppyfy"  
                 width={100} 
                 height={100} 
                 className="w-full md:h-auto object-cover" />
        </div>
        <div className="w-full h-auto md:hidden">
          <Image 
            src="/bgMovil.png" 
            alt="Logo de ShoppOnline"  
            width={400} 
            height={300} 
            className="w-full h-auto object-contain" 
          />
        </div>
    </div>
  );
};

export default Head;
