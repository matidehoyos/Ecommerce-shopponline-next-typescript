import Image from "next/image";

const Footer = () => {
  return (
    <footer className="w-full pt-20 pb-10 px-12 bg-gray-600 overflow-hidden">
      <div className="container py-10 px-20 flex justify-between items-start bg-gray-300">
        <div className="w-auto flex justify-center">
          <Image src="/logo.png" alt="Logo Shop online" width={80} height={80} className="w-[80%] h-auto"/>
        </div>
        <div>
          <h3 className="text-gray-700 text-lg font-extrabold mb-2">Policy Info</h3>
          <ul className="font-semibold text-gray-500 hover:text-gray-600 cursor-pointer">
            <li className="mb-2">
                <a className="hover:underline">Privacy Policy</a>
            </li>
            <li className="mb-2">
                <a className="hover:underline">Terms of Use</a>
            </li>
            <li className="mb-2">
                <a className="hover:underline">Report Abuse</a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-gray-700 text-lg font-extrabold mb-2">Company</h3>
          <ul className="font-semibold text-gray-500 hover:text-gray-600 cursor-pointer">
            <li className="mb-2">
                <a className="hover:underline">About Us</a>
            </li>
            <li className="mb-2">
                <a className="hover:underline">Careers</a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-gray-700 text-lg font-extrabold mb-2">Business</h3>
          <ul className="font-semibold text-gray-500 hover:text-gray-600 cursor-pointer">
            <li className="mb-2">
                <a className="hover:underline">Sell on Platform</a>
            </li>
            <li className="mb-2">
                <a className="hover:underline">Advertise on Platform</a>
            </li>
            <li className="mb-2">
                <a className="hover:underline">Be an Affiliate</a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-gray-700 text-lg font-extrabold mb-2">Subscribe</h3>
          <form>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 mb-2 text-black rounded border border-gray-300"
            />
            <button
              type="submit"
              className="w-full p-2 bg-gray-600 text-white rounded hover:bg-gray-800"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <div className="text-center text-gray-200 font-semibold mt-8">
        <p>Copyright 2024, All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
