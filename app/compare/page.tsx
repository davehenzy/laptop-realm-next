"use client";

import React from 'react';
import Link from 'next/link';
import { 
  ArrowRightLeft, 
  Trash2, 
  ShoppingCart, 
  ArrowLeft, 
  Cpu, 
  Layout, 
  HardDrive, 
  Monitor,
  Check,
  X,
  ShoppingBag
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { LATEST_ARRIVALS, NEW_YEAR_SPECIALS, APPLE_STORE } from '../../constants';

export default function ComparePage() {
  const { compareList, toggleCompare, addToCart, clearCompare } = useAppContext();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const allProducts = [...LATEST_ARRIVALS, ...NEW_YEAR_SPECIALS, ...APPLE_STORE];
  const items = allProducts.filter(p => compareList.includes(p.id));

  if (!isMounted) return null;

  return (
    <div className="bg-[#f9fafb] min-h-screen pb-16">
      <div className="bg-[#333399] text-white pt-12 pb-24 relative overflow-hidden text-center">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
        <div className="container mx-auto px-4 md:px-8">
           <ArrowRightLeft size={48} className="mx-auto mb-4 text-[#fbbf24] animate-bounce" />
           <h1 className="text-3xl font-black uppercase tracking-tight mb-2">Compare Products</h1>
           <p className="text-white/70 font-medium max-w-lg mx-auto">Compare specifications and choose the perfect laptop for your needs.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 -mt-12">
        {items.length > 0 ? (
          <div className="space-y-6">
            <div className="flex justify-end">
               <button 
                 onClick={clearCompare}
                 className="flex items-center gap-2 text-xs font-black text-red-500 hover:text-red-700 transition-colors uppercase tracking-widest bg-white px-4 py-2 rounded-lg shadow-sm"
               >
                  <Trash2 size={16} /> Clear All
               </button>
            </div>
            
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-x-auto">
               <div className="min-w-[800px]">
                  <table className="w-full">
                     <thead>
                        <tr className="border-b border-gray-100">
                           <th className="w-1/4 p-6 bg-gray-50/50"></th>
                           {items.map((product) => (
                              <th key={product.id} className="w-1/4 p-6 border-l border-gray-100 bg-white">
                                 <div className="text-right">
                                    <button 
                                      onClick={() => toggleCompare(product.id)}
                                      className="text-gray-300 hover:text-red-500 transition-colors"
                                    >
                                       <X size={18} />
                                    </button>
                                 </div>
                                 <div className="text-center space-y-4">
                                    <div className="w-32 h-32 mx-auto rounded-xl overflow-hidden border border-gray-100 shadow-sm bg-gray-50">
                                       <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                                    </div>
                                    <h3 className="font-black text-xs text-gray-900 line-clamp-2 min-h-[32px]">{product.title}</h3>
                                    <p className="text-sm font-black text-[#333399]">₦{product.price.toLocaleString()}</p>
                                    <button 
                                      onClick={() => addToCart(product, 1)}
                                      className="w-full bg-[#fbbf24] hover:bg-yellow-500 text-gray-900 font-extrabold py-2.5 rounded-xl transition-all shadow-md active:scale-[0.98] text-xs flex items-center justify-center gap-2"
                                    >
                                       <ShoppingCart size={14} /> Buy Now
                                    </button>
                                 </div>
                              </th>
                           ))}
                           {items.length < 4 && Array.from({ length: 4 - items.length }).map((_, i) => (
                              <th key={`empty-${i}`} className="w-1/4 p-6 border-l border-gray-100 bg-gray-50/20">
                                 <Link href="/shop" className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-300 hover:text-[#333399] transition-all">
                                    <div className="w-12 h-12 rounded-full border-2 border-dashed border-gray-200 flex items-center justify-center">
                                       <ArrowRightLeft size={20} />
                                    </div>
                                    <span className="text-[10px] uppercase font-bold tracking-widest">Add Product</span>
                                 </Link>
                              </th>
                           ))}
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-100">
                        {/* Summary Section */}
                        <tr>
                           <td className="p-6 bg-gray-50/50 text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                              <Layout size={14} /> Summary
                           </td>
                           {items.map((product) => (
                              <td key={`summary-${product.id}`} className="p-6 border-l border-gray-100 text-xs text-gray-600 font-medium leading-relaxed">
                                 {product.description}
                              </td>
                           ))}
                        </tr>
                        {/* Processor Section */}
                        <tr>
                           <td className="p-6 bg-gray-50/50 text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                              <Cpu size={14} /> Processor
                           </td>
                           {items.map((product) => (
                              <td key={`proc-${product.id}`} className="p-6 border-l border-gray-100 text-sm text-gray-900 font-bold text-center">
                                 {product.specs?.os || 'Core i7'}
                              </td>
                           ))}
                        </tr>
                        {/* RAM Section */}
                        <tr>
                           <td className="p-6 bg-gray-50/50 text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                              <Layout size={14} /> RAM / Memory
                           </td>
                           {items.map((product) => (
                              <td key={`ram-${product.id}`} className="p-6 border-l border-gray-100 text-sm text-gray-900 font-bold text-center">
                                 {product.specs?.ram || '16GB DDR5'}
                              </td>
                           ))}
                        </tr>
                        {/* Storage Section */}
                        <tr>
                           <td className="p-6 bg-gray-50/50 text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                              <HardDrive size={14} /> Storage
                           </td>
                           {items.map((product) => (
                              <td key={`ssd-${product.id}`} className="p-6 border-l border-gray-100 text-sm text-gray-900 font-bold text-center">
                                 {product.specs?.storageCapacity || '512GB NVMe SSD'}
                              </td>
                           ))}
                        </tr>
                        {/* Display Section */}
                        <tr>
                           <td className="p-6 bg-gray-50/50 text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                              <Monitor size={14} /> Display
                           </td>
                           {items.map((product) => (
                              <td key={`disp-${product.id}`} className="p-6 border-l border-gray-100 text-sm text-gray-900 font-bold text-center">
                                 {product.specs?.screenSize || '15.6" Full HD'}
                              </td>
                           ))}
                        </tr>
                        {/* Warranty Section */}
                        <tr>
                           <td className="p-6 bg-gray-50/50 text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                              <Check size={14} /> Warranty
                           </td>
                           {items.map((product) => (
                              <td key={`warranty-${product.id}`} className="p-6 border-l border-gray-100 text-sm text-green-600 font-bold text-center">
                                 1 Year Official Warranty
                              </td>
                           ))}
                        </tr>
                     </tbody>
                  </table>
               </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-16 text-center shadow-xl border border-gray-100 max-w-2xl mx-auto">
             <div className="w-24 h-24 bg-[#eef2ff] text-[#333399] rounded-full flex items-center justify-center mx-auto mb-6">
                <ArrowRightLeft size={48} strokeWidth={1.5} />
             </div>
             <h2 className="text-2xl font-black text-gray-900 mb-2">Comparison list empty</h2>
             <p className="text-gray-500 mb-8 max-w-sm mx-auto font-medium leading-relaxed">Add at least two laptops to compare their specs and find the best value for your money.</p>
             <Link 
               href="/shop" 
               className="inline-flex items-center gap-1 bg-[#fbbf24] hover:bg-yellow-500 text-gray-900 font-extrabold px-8 py-4 rounded-xl shadow-lg transition-all active:scale-[0.98]"
             >
                <ShoppingBag size={20} /> Start Adding
             </Link>
          </div>
        )}

        <div className="mt-12 text-center">
           <Link href="/shop" className="flex items-center justify-center text-gray-400 hover:text-[#333399] font-bold transition-colors">
              <ArrowLeft size={18} className="mr-2" /> Return to Warehouse
           </Link>
        </div>
      </div>
    </div>
  );
}
