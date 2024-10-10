'use client';
import React from 'react';
import { useCart } from '../contexts/cartContext';
import Image from 'next/image';
import { CartItem } from '../contexts/cartContext';
import { BiTrash } from 'react-icons/bi';

const CartDrawer = () => {
  const { isOpen, toggleCartDrawer, cart, addToCart, removeFromCart } = useCart();

  const handleIncrement = (item: CartItem) => {
    addToCart({ ...item, quantity: 1 });
  };

  const handleDecrement = (item: CartItem) => {
    addToCart({ ...item, quantity: -1 });
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <>
      {isOpen && <div className="bg-black opacity-30 fixed inset-0 z-40" onClick={toggleCartDrawer}></div>}
      <div className={`fixed w-[94%] md:w-[600px] h-[calc(100vh-120px)] md:h-[calc(100%-80px)] pb-20 right-0 md:right-[3%] md:top-40 bg-white shadow-lg z-50 transition-transform duration-1000 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-[200%]'} overflow-y-scroll`}>
        <div className='w-full p-4 flex justify-between items-center'>
          <h2 className="text-xl font-bold text-gray-950">Your cart</h2>
          <button onClick={toggleCartDrawer} className="font-bold text-2xl text-red-300 hover:text-red-500">X</button>
        </div>
        <div className='w-full md:mt-6 px-[2%] md:px-4 flex flex-col gap-2'>
          {cart.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="w-full flex p-1 md:p-2 justify-between items-center rounded-sm bg-gray-200 border border-gray-200">
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  width={80}
                  height={80}
                  className="w-[50px] h-[50px] md:w-[80px] md:h-[80px] object-contain bg-gray-50 border border-gray-200"
                />
                <span className='pl-1 md:pl-3 w-32 md:w-40 text-left font-semibold md:font-medium text-md text-gray-800 truncate'>{item.title}</span>
                <div className='flex items-center mr-2 md:mr-0'>
                  <button 
                    onClick={() => handleDecrement(item)} 
                    disabled={item.quantity === 1} 
                    className={`bg-white text-sm ${item.quantity === 1 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'} text-gray-900 px-1 md:px-2 rounded border border-gray-300 md:hover:scale-110`}>
                    &ndash;
                  </button> 
                  <span className='mx-1 md:mx-2 text-sm text-gray-800'>{item.quantity}</span>
                  <button 
                    onClick={() => handleIncrement(item)} 
                    className='text-sm bg-white text-gray-900 px-1 md:px-2 rounded border border-gray-300 md:hover:scale-110'>
                    +
                  </button> 
                </div> 
                <span className='md:text-md font-bold text-gray-800 mr-2 md:mr-0'>${(item.price * item.quantity).toFixed(2)}</span>
                <button onClick={() => removeFromCart(item.id)} className='text-red-500 md:text-2xl md:mr-4 md:hover:scale-110'><BiTrash /></button>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className='px-4 mt-6 flex justify-end'>
            <p className='font-bold text-xl text-gray-900'>Total: ${calculateTotal()}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;


