"use client";

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Product } from '../types';
import { Heart, Eye, X, Check, ShoppingCart, Minus, Plus, MessageCircle, ArrowRightLeft } from 'lucide-react';
import { optimizeImage } from '../constants';
import Link from 'next/link';

import { useRouter } from 'next/navigation';
import { useAppContext } from '../context/AppContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();
  const { 
    wishlist, 
    compareList, 
    addToCart, 
    toggleWishlist, 
    toggleCompare,
  } = useAppContext();

  const isWishlisted = wishlist.includes(product.id);
  const isCompared = compareList.includes(product.id);

  const onToggleWishlist = (id: string) => toggleWishlist(id);
  const onToggleCompare = (id: string) => toggleCompare(id);
  const onAddToCart = (product: Product, quantity: number) => {
    addToCart(product, quantity);
  };
  
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const galleryImages = [
    product.image,
    product.image,
    product.image,
    product.image
  ];

  const formatter = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
  });

  useEffect(() => {
    if (isQuickViewOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isQuickViewOpen]);

  useEffect(() => {
    if (!isQuickViewOpen) {
      setActiveImageIndex(0);
      setIsZoomed(false);
    }
  }, [isQuickViewOpen]);

  useEffect(() => {
    if (!isQuickViewOpen || isZoomed) return;

    const interval = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % galleryImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isQuickViewOpen, isZoomed, galleryImages.length]);

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    router.push(`/product/${product.slug}`);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <>
      <div 
        onClick={handleCardClick}
        className={`group bg-white rounded-lg p-4 border border-gray-100 hover:shadow-xl hover:scale-[1.02] hover:z-10 transition-all duration-300 relative flex flex-col h-full transform backface-hidden cursor-pointer`}
      >
        {/* Wishlist Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 transition-colors z-20 bg-white rounded-full p-1.5 shadow-sm ${isWishlisted ? 'text-red-500' : 'text-gray-300 hover:text-red-500'}`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
        </button>

        {/* Compare Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            if (onToggleCompare) onToggleCompare(product.id);
          }}
          className={`absolute top-12 right-3 transition-all duration-300 z-20 bg-white rounded-full p-1.5 shadow-sm ${
            isCompared 
            ? 'opacity-100 text-white bg-[#333399]' 
            : 'opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 text-gray-300 hover:text-[#333399]'
          }`}
          aria-label={isCompared ? "Remove from compare" : "Add to compare"}
          title="Compare Product"
        >
          <ArrowRightLeft size={18} />
        </button>
        
        {/* Image Area with Quick View Overlay */}
        <div className="relative mb-4 overflow-hidden rounded-md h-48 w-full flex items-center justify-center bg-gray-50">
          <img 
            src={optimizeImage(product.image, 300)} 
            srcSet={`${optimizeImage(product.image, 300)} 300w, ${optimizeImage(product.image, 600)} 600w`}
            sizes="(max-width: 640px) 50vw, 300px"
            alt={product.title} 
            loading="lazy"
            decoding="async"
            className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-125 transition-transform duration-700 ease-in-out" 
          />
          
          {/* Quick View Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/10 backdrop-blur-[1px]">
             <button 
               onClick={(e) => {
                 e.stopPropagation(); // Prevent card click if needed
                 setIsQuickViewOpen(true);
               }}
               className="bg-white text-[#333399] px-4 py-2 rounded-full font-bold text-xs shadow-lg flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-[#333399] hover:text-white"
             >
               <Eye size={16} />
               Quick View
             </button>
          </div>
        </div>

        <Link href={`/product/${product.slug}`} className="block">
          <h3 
            className="text-base font-bold text-[#333399] mb-2 line-clamp-2 min-h-[48px] group-hover:text-[#262673] group-hover:underline transition-colors leading-tight" 
            title={product.title}
          >
            {product.title}
          </h3>
        </Link>

        <div className="mt-auto">
          <div className="flex flex-col mb-3">
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through mb-0.5">
                {formatter.format(product.originalPrice)}
              </span>
            )}
            <span className="text-base font-bold text-[#ef4444]">
              {formatter.format(product.price)}
            </span>
          </div>

          <button 
            onClick={(e) => {
               e.stopPropagation();
               onAddToCart(product, 1);
            }}
            className="w-full bg-[#333399] text-white text-xs font-bold py-2.5 rounded hover:bg-[#262673] transition-colors uppercase tracking-wide"
          >
            Add to cart
          </button>
        </div>
      </div>

      {mounted && isQuickViewOpen && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
           {/* Backdrop */}
           <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
              onClick={() => setIsQuickViewOpen(false)}
              aria-hidden="true"
           />
           
           {/* Modal Content */}
           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative z-10 flex flex-col md:flex-row animate-in fade-in zoom-in duration-200">
              <button 
                onClick={() => setIsQuickViewOpen(false)}
                className="absolute top-4 right-4 z-20 p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              {/* Product Image Gallery Side */}
              <div className="w-full md:w-1/2 p-8 bg-gray-50 flex flex-col items-center justify-between relative">
                 {/* Main Active Image with Zoom */}
                 <div 
                    className="w-full h-[300px] flex items-center justify-center mb-6 relative overflow-hidden cursor-crosshair bg-white rounded-lg"
                    onMouseEnter={() => setIsZoomed(true)}
                    onMouseLeave={() => setIsZoomed(false)}
                    onMouseMove={handleMouseMove}
                 >
                    <img 
                      src={optimizeImage(galleryImages[activeImageIndex], 800)} 
                      alt={`${product.title} view ${activeImageIndex + 1}`} 
                      className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-700 ease-in-out will-change-transform"
                      style={{
                        transform: isZoomed ? 'scale(2)' : 'scale(1)',
                        transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`
                      }}
                    />
                 </div>

                 {/* Thumbnails */}
                 <div className="w-full flex justify-center space-x-3 overflow-x-auto pb-2 scrollbar-hide">
                    {galleryImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        onMouseEnter={() => setActiveImageIndex(idx)}
                        className={`flex-shrink-0 w-16 h-16 rounded-md border-2 overflow-hidden bg-white p-1 transition-all ${
                          activeImageIndex === idx 
                            ? 'border-[#333399] opacity-100 ring-2 ring-[#333399]/20' 
                            : 'border-gray-200 opacity-60 hover:opacity-100 hover:border-gray-300'
                        }`}
                      >
                        <img 
                          src={optimizeImage(img, 100)} 
                          alt="" 
                          className="w-full h-full object-contain mix-blend-multiply" 
                        />
                      </button>
                    ))}
                 </div>

                 {product.tag && (
                    <span className="absolute top-6 left-6 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full shadow-sm z-10 pointer-events-none">
                      {product.tag}
                    </span>
                 )}
              </div>

              {/* Details Side */}
              <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col">
                 <div className="mb-auto">
                    <div className="flex items-center space-x-2 mb-4">
                       <span className="px-2.5 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-bold flex items-center">
                         <Check size={12} className="mr-1" /> In Stock
                       </span>
                       {product.category && (
                          <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded-full">
                            {product.category}
                          </span>
                       )}
                    </div>

                    <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 leading-tight">{product.title}</h2>
                    
                    <div className="flex items-baseline gap-3 mb-6">
                       <span className="text-3xl font-black text-[#ef4444]">
                         {formatter.format(product.price)}
                       </span>
                       {product.originalPrice && (
                         <span className="text-lg text-gray-400 line-through">
                           {formatter.format(product.originalPrice)}
                         </span>
                       )}
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed mb-8">
                       Experience premium performance with the {product.title}. 
                       Featuring high-end specifications perfect for professionals and enthusiasts alike. 
                       Order now for swift nationwide delivery.
                    </p>

                    {/* Actions */}
                    <div className="space-y-4 mb-8">
                        <div className="flex flex-col sm:flex-row gap-4">
                           {/* Quantity Selector */}
                           <div className="flex items-center border border-gray-300 rounded-lg h-12 w-fit">
                              <button 
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="px-4 h-full text-gray-600 hover:bg-gray-100 rounded-l-lg transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="w-12 text-center font-bold text-gray-800">{quantity}</span>
                              <button 
                                onClick={() => setQuantity(quantity + 1)}
                                className="px-4 h-full text-gray-600 hover:bg-gray-100 rounded-r-lg transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus size={16} />
                              </button>
                           </div>

                           {/* Add to Cart Button */}
                           <button 
                              onClick={() => {
                                 onAddToCart(product, quantity);
                                 setIsQuickViewOpen(false);
                              }}
                              className="flex-1 bg-[#333399] hover:bg-[#262673] text-white font-bold h-12 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                           >
                              <ShoppingCart size={20} />
                              Add to Cart
                           </button>

                           {/* Wishlist Button (Modal) */}
                           <button 
                             onClick={() => onToggleWishlist(product.id)}
                             className={`h-12 w-12 rounded-lg border-2 flex items-center justify-center transition-all ${
                               isWishlisted 
                                 ? 'border-red-500 bg-red-50 text-red-500' 
                                 : 'border-gray-200 text-gray-400 hover:border-red-500 hover:text-red-500'
                             }`}
                             title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                           >
                             <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
                           </button>
                        </div>

                        {/* Order on Whatsapp Button */}
                        <a 
                          href={`https://wa.me/2348034893890?text=${encodeURIComponent(`Hi, I am interested in purchasing ${product.title} which is listed for ${formatter.format(product.price)}.`)}`}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold h-12 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                          <MessageCircle size={20} />
                          Order on WhatsApp
                        </a>
                    </div>
                 </div>

                 <div className="pt-6 border-t border-gray-100 text-xs text-gray-500 space-y-2">
                    <div className="flex gap-2">
                       <span className="font-bold text-gray-700">SKU:</span> 
                       <span>LR-{product.id.padStart(5, '0')}</span>
                    </div>
                    <div className="flex gap-2">
                       <span className="font-bold text-gray-700">Category:</span> 
                       <span>{product.category || 'Computers & Accessories'}</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default ProductCard;
