"use client";

import React from 'react';
import { X, Minus, Plus, Trash2, ArrowRight, ShoppingBag, Clock } from 'lucide-react';
import { optimizeImage } from '../constants';
import { useAppContext } from '../context/AppContext';

const CartDrawer: React.FC = () => {
  const { isCartOpen, setIsCartOpen, cart, updateCartQuantity, removeFromCart, setIsCheckoutOpen } = useAppContext();
  
  const formatter = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
  });

  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const total = subtotal; 

  React.useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isCartOpen]);

  const [timeLeft, setTimeLeft] = React.useState(600); // 10 minutes in seconds

  React.useEffect(() => {
    if (!isCartOpen) return;
    
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isCartOpen]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timerString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/50 z-[1100] transition-opacity duration-300 ${isCartOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={() => setIsCartOpen(false)}
      />

      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[1101] shadow-2xl transform transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          
          <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <ShoppingBag size={20} className="text-[#333399]" />
              Your Cart <span className="text-sm font-normal text-gray-500">({cart.length} items)</span>
            </h2>
            <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-200 rounded-full text-gray-500 transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-0 flex flex-col">
            {cart.length > 0 && (
               <div className="bg-[#fff9e6] border-b border-[#ffeeba] px-5 py-3 flex items-center gap-3 animate-pulse">
                  <div className="w-8 h-8 rounded-full bg-[#fbbf24] flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                     <Clock size={16} strokeWidth={3} />
                  </div>
                  <div className="flex-1">
                     <p className="text-[10px] uppercase font-black tracking-widest text-[#856404] leading-tight">Warehouse Reservation Locked</p>
                     <p className="text-xs font-bold text-[#856404]">Your items are secured for <span className="text-sm font-black text-[#fbbf24] tabular-nums">{timerString}</span></p>
                  </div>
               </div>
            )}

            <div className="p-5 space-y-6 flex-1">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-gray-500">
                <div className="bg-gray-100 p-6 rounded-full mb-4">
                  <ShoppingBag size={48} className="text-gray-300" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Your cart is empty</h3>
                <p className="text-sm mb-6 max-w-xs">Looks like you haven't added anything to your cart yet.</p>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="bg-[#333399] text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-[#262673] transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.product.id} className="flex gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="w-20 h-20 bg-gray-50 rounded-lg border border-gray-100 flex-shrink-0 flex items-center justify-center overflow-hidden">
                    <img src={optimizeImage(item.product.image, 100)} alt={item.product.title} className="w-full h-full object-contain mix-blend-multiply p-1" />
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-gray-800 line-clamp-2 mb-1 leading-tight">{item.product.title}</h4>
                      <p className="text-xs text-gray-500">{item.product.category}</p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-gray-200 rounded">
                        <button 
                          onClick={() => updateCartQuantity(item.product.id, -1)}
                          disabled={item.quantity <= 1}
                          className="p-1 hover:bg-gray-100 disabled:opacity-30 text-gray-600 transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-2 text-xs font-bold w-6 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateCartQuantity(item.product.id, 1)}
                          className="p-1 hover:bg-gray-100 text-gray-600 transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <span className="font-bold text-[#ef4444] text-sm">
                        {formatter.format(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>

                  <button 
                    onClick={() => removeFromCart(item.product.id)}
                    className="self-start text-gray-400 hover:text-red-500 transition-colors p-1"
                    title="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}
            </div>
          </div>

          {cart.length > 0 && (
            <div className="p-5 border-t border-gray-100 bg-gray-50 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatter.format(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 text-xs font-bold">Calculated at checkout</span>
                </div>
                <div className="flex justify-between text-lg font-black text-gray-900 pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>{formatter.format(total)}</span>
                </div>
              </div>

              <button 
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full bg-[#333399] hover:bg-[#262673] text-white py-3.5 rounded-lg font-bold text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
              >
                Proceed to Checkout <ArrowRight size={18} />
              </button>
              
              <button 
                onClick={() => setIsCartOpen(false)}
                className="w-full bg-white border border-gray-300 text-gray-700 py-2.5 rounded-lg font-bold text-sm hover:bg-gray-50 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;