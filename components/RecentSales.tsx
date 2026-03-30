"use client";

import React, { useState, useEffect } from 'react';
import { ShoppingBag, X, CheckCircle2 } from 'lucide-react';
import { LATEST_ARRIVALS, NEW_YEAR_SPECIALS, APPLE_STORE } from '../constants';

const CITIES = ['Lagos', 'Abuja', 'Port Harcourt', 'Kano', 'Ibadan', 'Benin City', 'Enugu', 'Kaduna'];
const TIMES = ['2 minutes ago', '5 minutes ago', '12 minutes ago', '24 minutes ago', '1 hour ago'];

export default function RecentSales() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSale, setCurrentSale] = useState<any>(null);

  const allProducts = [...LATEST_ARRIVALS, ...NEW_YEAR_SPECIALS, ...APPLE_STORE];

  useEffect(() => {
    const showNotification = () => {
      const randomProduct = allProducts[Math.floor(Math.random() * allProducts.length)];
      const randomCity = CITIES[Math.floor(Math.random() * CITIES.length)];
      const randomTime = TIMES[Math.floor(Math.random() * TIMES.length)];

      setCurrentSale({
        product: randomProduct,
        city: randomCity,
        time: randomTime
      });

      setIsVisible(true);

      // Hide after 6 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 6000);
    };

    // Initial delay
    const initialTimeout = setTimeout(showNotification, 8000);

    // Repeat every 35 seconds
    const interval = setInterval(showNotification, 35000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [allProducts]);

  if (!currentSale) return null;

  return (
    <div 
      className={`fixed bottom-6 left-6 z-[100] transition-all duration-700 transform ${
        isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
      }`}
    >
      <div className="bg-white/90 backdrop-blur-md border border-gray-100 shadow-2xl rounded-2xl p-4 flex gap-4 max-w-sm group">
        <div className="relative flex-shrink-0 w-16 h-16 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 flex items-center justify-center">
            <img 
              src={currentSale.product.image} 
              alt="" 
              className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute top-1 right-1">
               <CheckCircle2 size={12} className="text-emerald-500 fill-white" />
            </div>
        </div>
        
        <div className="flex flex-col justify-center">
            <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#333399] mb-1">
               <ShoppingBag size={10} /> Verified Purchase
            </div>
            <p className="text-xs text-gray-800 font-medium leading-snug mb-1">
              Someone in <span className="font-bold text-gray-900">{currentSale.city}</span><br />
              just bought <span className="font-bold text-[#333399]">{currentSale.product.title}</span>
            </p>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">{currentSale.time}</span>
        </div>

        <button 
          onClick={() => setIsVisible(false)}
          className="absolute -top-2 -right-2 w-6 h-6 bg-white border border-gray-100 shadow-sm rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors"
        >
          <X size={12} />
        </button>
      </div>
    </div>
  );
}
