import Image from "next/image";

const Loader = () => {
    return (
         <div className="w-[30%] mx-auto h-screen flex justify-center items-start pt-32">
            <Image src="/bgHeader.png" alt="Logo Shoppify" layout="responsive" width={100} height={100} className={`w-full h-auto object-cover`} />
         </div>  
    );
  };
  
  export default Loader;