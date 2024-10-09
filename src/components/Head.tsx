import Image from "next/image";

const Head = () => {
  return (
    <div className="w-[94%] mx-auto pt-4 flex flex-col justify-center items-center border border-gray-300 rounded-md bg-gradient-to-r from-white to-gray-300">
        <div className="w-full flex justify-center"><Image src="/bggg.png" layout="responsive" alt="Logo shoppyfy"  width={100} height={100} className="w-full h-auto object-cover" /></div>
    </div>
  );
};

export default Head;
