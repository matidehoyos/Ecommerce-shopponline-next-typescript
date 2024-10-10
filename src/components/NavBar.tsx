'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../contexts/cartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faTimes } from '@fortawesome/free-solid-svg-icons';
import SearchBar from './SearchBar';
import Categories from './Categories';
import Image from 'next/image';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, toggleCartDrawer } = useCart();

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  
  return (
    <nav className="w-full text-gray-700 bg-gray-200">
      <div className="flex flex-col">
        <div className="container md:w-[94%] mx-auto mb-2 md:mb-3 pt-2 md:py-4 px-1 md:px-3 flex justify-between items-center bg-gray-200">
          <Link href="/" aria-label="Go to homepage">
            <Image 
              src="/logo.png" 
              alt="Tienda Online Logo" 
              layout='responsive' 
              width={200} 
              height={60} 
              className="w-[160px] h-[50px] sm:w-[140px] sm:h-[60px] object-contain" 
            />
          </Link>
          <div className='hidden md:block'>
            <SearchBar />
          </div>
          <div className="flex items-center space-x-6 md:space-x-10">
            <div className="relative">
              <button onClick={toggleCartDrawer} aria-label="View cart">
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
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-[30px] lg:hidden text-gray-400 text-center hover:text-black focus:outline-none focus:text-black"
              aria-label="Toggle menu"
            >
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
        <div className="absolute w-full px-3 py-2 bg-white lg:hidden">
          <Link href="/login" className="block py-2 font-bold hover:text-red-600">
            Login
          </Link>
          <Link href="/register" className="block py-2 font-bold hover:text-red-600">
            Register
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
