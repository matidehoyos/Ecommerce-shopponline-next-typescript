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
  const { user, error, isLoading } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const { cart, toggleCartDrawer } = useCart();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="w-full fixed py-1 md:py-0 pb-2 md:pb-2 pr-[2%] md:pr-0 text-gray-950 md:text-gray-700 bg-gradient-to-r from-white to-gray-300 z-[1000]">
      <div className="flex flex-col">
        <div className="container pt-2 md:py-3 px-1 md:px-[3%] md:pr-[4%] flex justify-between items-center ">
          <Link href="/" aria-label="Go to homepage">
            <Image 
              src="/logo.png" 
              alt="Tienda Online Logo" 
              width={160} 
              height={50} 
              className="w-[120px] h-[50px] md:w-[160px] md:h-[50px] object-contain" 
            />
          </Link>
          <div className='hidden md:block'>
            <SearchBar />
          </div>
          <div className="flex items-center justify-end space-x-6 md:space-x-3">
            <div className="relative md:mr-6">
              {
                cartCount > 0 ? (
                  <>
                    <button onClick={toggleCartDrawer} aria-label="View cart">
                        <FontAwesomeIcon icon={faShoppingCart} className="text-2xl md:text-2xl text-gray-900 md:text-gray-700 hover:text-gray-900 relative top-[3px] md:top-0" />
                    </button>
                    <span className="inline-flex items-center justify-center md:px-2 py-1 text-sm font-bold leading-none text-red-500 md:text-red-100 bg-transparent md:bg-red-600 md:rounded-full">
                      {cartCount}
                    </span>
                  </>
                  ) : null
              }
            </div>
            {isLoading ? (
             null
            ) : (
            <div>
              {!user ? (
                <>
                  <Link href="/api/auth/login">Register</Link>
                  <Link href="/api/auth/login">LogIn</Link>
                </>
              ) : (
                <Link href="/api/auth/logout">Logout</Link>
              )}
            </div>
    )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-[30px] p-0 lg:hidden text-gray-900 text-center focus:outline-none"
              aria-label="Toggle menu"
            >
              {!isOpen ? (
                <svg className="text-gray-900 p-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
              ) : (
                <FontAwesomeIcon icon={faTimes} className='text-2xl' />
              )}
            </button>
          </div>
        </div>
        <Categories />
      </div>
      <div
        className={`absolute mt-2 w-full px-3 py-2 bg-gradient-to-r from-white to-gray-300 lg:hidden z-50 transition-all duration-1000 ease-in-out ${
          isOpen ? 'max-h-[100vh] opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}
      >
        {
          isLoading ? 
          null : (
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
          )
        }
      </div>
    </nav>
  );
};

export default NavBar;

