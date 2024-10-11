import Image from "next/image";

const Loader = () => {
    return (
      <div className="w-[30%] md:w-full h-screen mx-auto flex justify-center items-start pt-32 md:bg-gradient-to-r from-white to-gray-300">
      <div className="w-full md:w-[30%]">
        <Image 
          src="/bgHeader.png" 
          alt="Logo Shoppify" 
          layout="responsive" 
          width={900} 
          height={400} 
          className="object-cover"
        />
      </div>
    </div>
     
    );
  };
  
  export default Loader;