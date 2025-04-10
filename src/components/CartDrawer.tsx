'use client'
import React, { useEffect, useState } from 'react';
import { useCart } from '../contexts/cartContext';
import Image from 'next/image';
import { CartItem } from '../contexts/cartContext';
import { BiTrash } from 'react-icons/bi';
import { loadStripe } from '@stripe/stripe-js';
import { Stripe } from '@stripe/stripe-js'; 


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const CartDrawer = () => {
  const { isOpen, toggleCartDrawer, cart, addToCart, removeFromCart } = useCart();
  const [stripe, setStripe] = useState<Stripe | null>(null);

  useEffect(() => {
    const loadStripeInstance = async () => {
      const stripeInstance = await stripePromise;
      setStripe(stripeInstance);
    };

    loadStripeInstance();
  }, []);

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
      {isOpen && <div className="bg-black opacity-40 fixed inset-0 z-[2000]" onClick={toggleCartDrawer}></div>}
      <div className={`fixed w-[98%] md:w-[640px] h-[calc(100vh-65px)] md:h-[calc(100%-120px)] pb-20 md:pb-60 right-0 md:right-[2%] top-[65px] md:top-[118px] bg-gray-200 md:bg-gray-50 shadow-lg z-[2000] transition-transform duration-1000 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-[200%]'} overflow-y-scroll rounded-tl-md rounded-bl-md`}>
        <div className='w-full p-4 mb-4 md:mb-0 flex justify-between items-center'>
          <h2 className="text-xl font-bold text-gray-950">Your cart</h2>
          <button onClick={toggleCartDrawer} className="font-bold text-2xl text-gray-800 hover:text-red-600">X</button>
        </div>
        <div className='w-full md:mt-6 px-[2%] md:px-4 flex flex-col gap-2'>
          {cart.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="w-full flex p-1 md:p-2 justify-between items-center rounded-sm bg-gray-100 border border-gray-200">
                <div className='w-[70px] h-[70px] overflow-hidden'>
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    width={70}
                    height={70}
                    className="w-[60px] md:w-[70px] h-[60px] md:h-[70px] object-cover"
                  />
                </div>
                <div className='flex flex-col md:flex-row w-40 md:w-80 md:justify-between pr-2 md:pr-4 gap-2'>
                  <span className='pl-1 md:pl-2 text-left font-semibold md:font-semibold text-md text-gray-800 truncate'>{item.title}</span>
                  <div className='flex items-center'>
                    <button 
                      onClick={() => handleDecrement(item)} 
                      disabled={item.quantity === 1} 
                      className={`text-md ${item.quantity === 1 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'} text-gray-900 px-2 rounded border border-red-300 bg-red-300 md:hover:scale-110`}>
                      &ndash;
                    </button> 
                    <span className='mx-2 text-md text-gray-800'>{item.quantity}</span>
                    <button 
                      onClick={() => handleIncrement(item)} 
                      className='text-md text-gray-900 px-2 rounded border border-red-300 bg-red-300 md:hover:scale-110'>
                      +
                    </button> 
                  </div> 
                </div>
                <span className='md:text-md font-bold text-gray-800 mr-2 md:mr-0'>${(item.price * item.quantity).toFixed(2)}</span>
                <button onClick={() => removeFromCart(item.id)} className='text-red-500 text-xl md:text-2xl md:mr-4 md:hover:scale-110'><BiTrash /></button>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
           <>
           <div className='px-4 mt-6 flex justify-end'>
             <p className='font-bold text-xl text-gray-900'>Total: ${calculateTotal()}</p>
           </div>
           <div className='px-4 mt-6 flex justify-end'>
             {/*<button onClick={handleCheckout} className='bg-blue-600 text-white px-4 py-2 rounded-md font-semibold'>
               Checkout with Stripe
             </button>*/}
           </div>
         </>
        )}
        
      </div>
    </>
  );
};

export default CartDrawer;



