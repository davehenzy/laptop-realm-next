"use client";

import React from 'react';
import Link from 'next/link';
import { 
  Heart, 
  Trash2, 
  ShoppingCart, 
  ArrowLeft, 
  Monitor,
  ShoppingBag
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { LATEST_ARRIVALS, NEW_YEAR_SPECIALS, APPLE_STORE } from '../../constants';

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useAppContext();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const allProducts = [...LATEST_ARRIVALS, ...NEW_YEAR_SPECIALS, ...APPLE_STORE];
  const items = allProducts.filter(p => wishlist.includes(p.id));

  if (!isMounted) return null;

  return (
    <div className="bg-[#f9fafb] min-h-screen pb-16">
      {/* Header Overlay */}
      <div className="bg-[#333399] text-white pt-12 pb-24 relative overflow-hidden text-center">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-16 -mt-16"></div>
        <div className="container mx-auto px-4 md:px-8">
           <Heart size={48} className="mx-auto mb-4 text-[#fbbf24] animate-pulse" />
           <h1 className="text-3xl font-black uppercase tracking-tight mb-2">My Wishlist</h1>
           <p className="text-white/70 font-medium max-w-lg mx-auto">Keep track of the laptops you love. Move them to cart anytime!</p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 -mt-12">
        {items.length > 0 ? (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                   <thead>
                      <tr className="bg-gray-50/50 text-xs font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
                         <th className="px-6 py-4">Product</th>
                         <th className="px-6 py-4">Price</th>
                         <th className="px-6 py-4">Stock Status</th>
                         <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-100">
                      {items.map((product) => (
                         <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-6 py-6">
                               <div className="flex items-center gap-4">
                                  <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-100 bg-gray-50 shrink-0">
                                     <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                                  </div>
                                  <Link href={`/product/${product.slug}`} className="font-bold text-gray-900 hover:text-[#333399] transition-colors leading-tight">
                                     {product.title}
                                  </Link>
                               </div>
                            </td>
                            <td className="px-6 py-6 font-black text-[#333399]">₦{product.price.toLocaleString()}</td>
                            <td className="px-6 py-6">
                               <span className="bg-green-100 text-green-700 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full">In Stock</span>
                            </td>
                            <td className="px-6 py-6 text-right">
                               <div className="flex items-center justify-end gap-3">
                                  <button 
                                    onClick={() => toggleWishlist(product.id)}
                                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                    title="Remove from wishlist"
                                  >
                                     <Trash2 size={20} />
                                  </button>
                                  <button 
                                    onClick={() => addToCart(product, 1)}
                                    className="bg-[#333399] hover:bg-[#262673] text-white px-5 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 shadow-sm transition-all active:scale-[0.98]"
                                  >
                                     <ShoppingCart size={16} /> Add 
                                  </button>
                               </div>
                            </td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-16 text-center shadow-xl border border-gray-100 max-w-2xl mx-auto">
             <div className="w-24 h-24 bg-[#eef2ff] text-[#333399] rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag size={48} strokeWidth={1.5} />
             </div>
             <h2 className="text-2xl font-black text-gray-900 mb-2">Your wishlist is empty</h2>
             <p className="text-gray-500 mb-8 max-w-sm mx-auto font-medium leading-relaxed">Looks like you haven't added anything to your wishlist yet. Discover our premium laptops today!</p>
             <Link 
               href="/shop" 
               className="inline-flex items-center gap-2 bg-[#fbbf24] hover:bg-yellow-500 text-gray-900 font-extrabold px-8 py-4 rounded-xl shadow-lg transition-all active:scale-[0.98]"
             >
                <Monitor size={20} /> Browse Warehouse
             </Link>
          </div>
        )}

        <div className="mt-12 text-center">
           <Link href="/shop" className="inline-flex items-center text-gray-400 hover:text-[#333399] font-bold transition-colors">
              <ArrowLeft size={18} className="mr-2" /> Continue Shopping
           </Link>
        </div>
      </div>
    </div>
  );
}
