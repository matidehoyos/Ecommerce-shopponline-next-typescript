'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useProducts } from '../contexts/productsContext';
import { useCart } from '../contexts/cartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart, faTimes } from '@fortawesome/free-solid-svg-icons';
import SearchBar from './SearchBar';
import Categories from './Categories';
import Image from 'next/image';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { searchProducts, filteredProducts } = useProducts(); 
  const router = useRouter();
  const { cart, toggleCartDrawer } = useCart();

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchProducts(searchQuery); 

    if (filteredProducts.length === 1) {
      router.push(`/product/${filteredProducts[0].id}`);
    } else {
      router.push(`/shop?search=${searchQuery}`);
    }
  };

  return (
    <div className="w-full text-gray-700 bg-gray-200">
      <div className='flex flex-col'>
        <div className="container md:w-[94%] mx-auto mb-2 md:mb-3 pt-2 md:py-4 px-1 md:px-3 flex justify-between items-center bg-gray-200">
          <Link href="/">
              <Image 
                  src="/logo.png" 
                  alt="Tienda Online Logo" 
                  layout='responsive' 
                  width={200} 
                  height={60} 
                  className="w-[200px] h-[60px] md:w-[120px] md:h-[60px] object-contain" 
              />
          </Link>
          <SearchBar />
          <div className="flex items-center space-x-6 md:space-x-10">
            <div className="relative">
              <button onClick={toggleCartDrawer}>
                <FontAwesomeIcon icon={faShoppingCart} className="text-lg md:text-2xl text-gray-700 hover:text-gray-900" />
              </button>
              {cartCount > 0 && (
                <span className="inline-flex items-center justify-center md:px-2 py-1 text-xs font-bold leading-none text-red-500 md:text-red-100 bg-transparent md:bg-red-600 rounded-full">
                  {cartCount} 
                </span>
              )} 
            </div>
            <Link href="/register" className="hidden lg:block font-bold hover:text-red-600">
              SignUp / Login
            </Link>
            <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-gray-400 hover:text-black focus:outline-none focus:text-black">
              {!isOpen ? (
                <svg className="h-5 w-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
              ) : (
                <FontAwesomeIcon icon={faTimes} />
              )}
            </button>
          </div>
        </div>
        <Categories />
      </div>
      {isOpen && (
        <div className="lg:hidden bg-white w-full px-3 py-2">
          <Link href="/shop" className="block py-2 font-bold hover:text-red-600">Shop</Link>
          <Link href="/about" className="block py-2 font-bold hover:text-red-600">About</Link>
          <form onSubmit={handleSearchSubmit} className="mt-2 flex">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search products..."
              className="w-auto p-2 border border-gray-300 focus:outline-none"
            />
            <button type="submit" className="w-auto px-4 bg-gray-800 text-white">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>
          <Link href="/register" className="block py-2 font-bold hover:text-red-600">Register</Link>
          <Link href="/login" className="block py-2 font-bold hover:text-red-600">Login</Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;
