'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useCart } from '../contexts/cartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faTimes } from '@fortawesome/free-solid-svg-icons';
import SearchBar from './SearchBar';
import Categories from './Categories';
import Image from 'next/image';

const NavBar = () => {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const { cart, toggleCartDrawer } = useCart();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="w-full fixed py-1 md:py-0 pb-2 md:pb-[2px] pr-[2%] md:pr-0 text-gray-950 md:text-gray-700 bg-gradient-to-r from-gray-200 to-gray-500 border-b md:border-b-0 border-gray-600 z-[1000]">
      <div className="flex flex-col">
        <div className="w-[100%] pt-2 md:py-3 px-1 md:px-[2%] md:pr-[3%] flex justify-between items-center">
          <Link href="/" aria-label="Go to homepage">
            <Image 
              src="/logo.png" 
              alt="Tienda Online Logo" 
              width={160} 
              height={50} 
              className="w-[110px] h-[44px] md:w-[160px] md:h-[50px] object-contain" 
            />
          </Link>
          <div className='hidden md:block'>
            <SearchBar setIsOpen={setIsOpen}/>
          </div>
          <div className="flex items-center justify-end space-x-6 md:space-x-3">
            <div className="relative -top-[2px] md:top-0 md:mr-6">
              {
                cartCount > 0 ? (
                  <>
                    <button onClick={toggleCartDrawer} aria-label="View cart">
                        <FontAwesomeIcon icon={faShoppingCart} className="text-2xl md:text-2xl text-gray-900 md:text-gray-800 hover:text-gray-900 relative top-[3px] md:top-0" />
                    </button>
                    <span className="inline-flex items-center justify-center px-1 md:px-2 py-[1px] text-xs lg:text-sm font-bold leading-none text-red-50 bg-red-400 md:bg-red-500 rounded-sm md:rounded-full">
                      {cartCount}
                    </span>
                  </>
                  ) : null
              }
            </div>
            {!user ? (
              <>
                <Link href="/api/auth/login" className="hidden lg:block font-medium text-gray-200 hover:text-gray-900">
                  Register
                </Link>
                <Link href="/api/auth/login" className="hidden lg:block font-medium text-gray-200 hover:text-gray-900">
                  LogIn
                </Link>
              </>
            ) : ( 
              <>
                <Link href="/api/auth/logout" className="hidden lg:block font-bold hover:text-gray-900">Logout</Link>
              </>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-[30px] p-0 lg:hidden text-gray-900 text-center focus:outline-none"
              aria-label="Toggle menu"
            >
              {!isOpen ? (
                <Image 
                    src={'/menu.png'}
                    alt="Tienda Online Logo" 
                    width={110} 
                    height={90} 
                    className='object-contain' />
              ) : (
                <FontAwesomeIcon icon={faTimes} className='text-red-700 text-3xl' />
              )}
            </button>
          </div>
        </div>
        <Categories />
      </div>
      <div
        className={`absolute mt-2 w-full h-screen px-3 py-4 bg-gradient-to-r from-gray-200 to-gray-500 lg:hidden z-50 transition-all duration-1000 ease-in-out ${
          isOpen ? 'max-h-[100vh] opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}
      >
        <SearchBar setIsOpen={setIsOpen} />
        <Link href="/" onClick={() => {setIsOpen(!isOpen)}} className="block mt-4 py-2 text-xl text-red-500 font-bold">
          Home
        </Link>
        <Link href="/shop" onClick={() => {setIsOpen(!isOpen)}} className="block py-2 text-xl text-red-500 font-bold">
          Shop
        </Link>
        {
          !user ? (
          <>
          <Link href="/api/auth/login" className="block py-2 text-xl font-bold">
            Login
          </Link>
          <Link href="/api/auth/login" className="block py-2 text-xl font-bold">
            Register
          </Link>
          </>
          ) : (
          <>
            <Link href="/api/auth/logout" className="lg:hidden text-xl font-bold hover:text-gray-900">Logout</Link>
          </>
          )
        }
      </div>
    </nav>
  );
};

export default NavBar;

