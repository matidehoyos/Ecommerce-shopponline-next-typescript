import Image from "next/image";

const Head = () => {
  return (
    <div className=" md:w-[94%] md:mx-auto md:pt-4 md:border md:border-gray-300 rounded-md bg-gradient-to-r from-white to-gray-300">
        <div className="hidden md:block w-full">
          <Image src="/bggg.png" 
                 layout="responsive" 
                 alt="Logo shoppyfy"  
                 width={100} 
                 height={100} 
                 className="w-full md:h-auto object-cover" />
        </div>
        <div className="w-full md:hidden">
          <Image src="/bgMovi.png" 
                 layout="responsive" 
                 alt="Logo shoppyfy"  
                 width={400} 
                 height={300} 
                 className="w-full h-auto object-cover" />
        </div>
    </div>
  );
};

export default Head;
