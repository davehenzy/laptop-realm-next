"use client";

import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { MessageCircle, ShoppingCart, Share2, Star, Truck, Smartphone, CreditCard, RefreshCw, ShieldCheck, Facebook, Twitter, Linkedin } from 'lucide-react';
import ProductCard from './ProductCard';
import { optimizeImage, LATEST_ARRIVALS, NEW_YEAR_SPECIALS, APPLE_STORE } from '../constants';
import { useRouter } from 'next/navigation';
import { useAppContext } from '../context/AppContext';

interface ProductDetailContentProps {
  slug: string;
}

const ProductDetailContent: React.FC<ProductDetailContentProps> = ({ slug }) => {
  const router = useRouter();
  const { addToCart } = useAppContext();
  
  const allProducts = [...LATEST_ARRIVALS, ...NEW_YEAR_SPECIALS, ...APPLE_STORE];
  const product = allProducts.find(p => p.slug === slug);

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'description' | 'reviews' | 'more'>('specs');
  const [reviewRating, setReviewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <button 
          onClick={() => router.push('/shop')}
          className="bg-[#333399] text-white px-6 py-2 rounded-md font-bold hover:bg-[#262673]"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const galleryImages = [
      product.image,
      product.image,
      product.image,
      product.image
  ];

  useEffect(() => {
    if (isZoomed) return;

    const interval = setInterval(() => {
        setActiveImageIndex((prev) => (prev + 1) % galleryImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isZoomed, galleryImages.length, activeImageIndex]);

  const otherProducts = allProducts.filter(p => p.id !== product.id);
  const categoryMatches = otherProducts.filter(p => p.category === product.category);
  const relatedProducts = (categoryMatches.length >= 4 ? categoryMatches : otherProducts).slice(0, 4);
  const topInterests = [...otherProducts].reverse().slice(0, 4);

  const formatter = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const handleSocialShare = (platform: string) => {
    const url = window.location.href;
    const text = `Check out ${product.title}`;
    let shareUrl = '';

    switch (platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
            break;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
        try {
            await navigator.share({
                title: product.title,
                text: `Check out ${product.title}`,
                url: window.location.href,
            });
        } catch (err) {
            console.log('Error sharing:', err);
        }
    } else {
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="bg-white min-h-screen pb-20 animate-in fade-in duration-500 font-sans text-gray-800">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 md:px-8 py-4 text-xs text-gray-500 border-b border-gray-100 mb-6">
        <button onClick={() => router.push('/')} className="hover:text-[#333399]">Home</button>
        <span className="mx-2">/</span>
        <button onClick={() => router.push('/shop')} className="hover:text-[#333399]">Shop</button>
        <span className="mx-2">/</span>
        <span className="text-gray-400">{product.category || 'Computers'}</span>
        <span className="mx-2">/</span>
        <span className="font-bold text-gray-700 truncate">{product.title}</span>
      </div>

      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-9">
             <div className="flex flex-col md:flex-row gap-8 mb-10">
                <div className="w-full md:w-5/12 select-none">
                   <div 
                     className="border border-gray-200 rounded-lg mb-4 h-[350px] md:h-[400px] flex items-center justify-center bg-white relative overflow-hidden group cursor-crosshair"
                     onMouseEnter={() => setIsZoomed(true)}
                     onMouseLeave={() => setIsZoomed(false)}
                     onMouseMove={handleMouseMove}
                   >
                      <button 
                        onClick={handleNativeShare}
                        className="absolute top-2 right-2 text-gray-400 hover:text-[#333399] z-20 p-2 bg-white/80 rounded-full shadow-sm"
                        title="Share"
                      >
                         <Share2 size={20} />
                      </button>
                      
                      <div className="w-full h-full flex items-center justify-center">
                        <img 
                            src={optimizeImage(galleryImages[activeImageIndex], 800)} 
                            alt={product.title} 
                            className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-700 ease-in-out will-change-transform" 
                            style={{
                                transform: isZoomed ? 'scale(2)' : 'scale(1)',
                                transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`
                            }}
                            loading="eager"
                        />
                      </div>
                   </div>

                   <div className="flex gap-2 overflow-x-auto scrollbar-hide py-1">
                      {galleryImages.map((img, i) => (
                        <button 
                          key={i} 
                          onClick={() => setActiveImageIndex(i)}
                          className={`w-16 h-16 border rounded p-1 flex-shrink-0 transition-all ${activeImageIndex === i ? 'border-[#333399] ring-1 ring-[#333399] opacity-100' : 'border-gray-200 opacity-70 hover:opacity-100'}`}
                        >
                           <img 
                             src={optimizeImage(img, 150)} 
                             alt="thumbnail" 
                             className="w-full h-full object-contain" 
                             loading="lazy"
                           />
                        </button>
                      ))}
                   </div>
                   
                   <div className="mt-4 flex gap-4 text-xs text-[#333399] font-bold justify-center">
                      <div className="flex items-center gap-1 cursor-pointer hover:underline">
                         <span className="w-2 h-2 bg-[#333399] rounded-full"></span> Promotions
                      </div>
                   </div>
                   <div className="mt-2 text-[10px] text-gray-500 space-y-1">
                      <p>• Call <span className="text-[#333399] font-bold">08034893890</span> To Place Your Order.</p>
                      <p>• Checkout Instantly with your <span className="font-bold">Payvib</span> Wallet.</p>
                      <p>• <span className="font-bold">Mobile App</span> coming soon.</p>
                   </div>
                </div>

                <div className="w-full md:w-7/12">
                   <h1 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">{product.title}</h1>
                   
                   <div className="flex items-baseline gap-3 mb-4 border-b border-gray-100 pb-4">
                      {product.originalPrice && (
                         <span className="text-gray-400 line-through text-lg">{formatter.format(product.originalPrice)}</span>
                      )}
                      <span className="text-2xl font-bold text-[#ef4444]">{formatter.format(product.price)}</span>
                   </div>

                   <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                      Kindly call or chat us to confirm product price before placing an order. This is due to the Naira-Dollar fluctuation rate in the global market. To contact us kindly WhatsApp or call: <span className="font-bold text-[#ef4444]">08034893890</span> with the exact product link. Thank you.
                   </p>

                   <div className="text-xs text-gray-600 mb-6 space-y-1">
                      <p><span className="font-bold">Categories:</span> {product.category || 'All Products'}, {product.specs?.brand || 'General'}</p>
                   </div>

                   <div className="mb-6">
                      <p className="text-xs font-bold mb-2">In Stock</p>
                      <div className="flex items-center gap-4">
                         <span className="text-xs font-bold text-gray-700">Quantity</span>
                         <div className="flex items-center border border-gray-300 rounded h-8">
                            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 hover:bg-gray-100">-</button>
                            <span className="px-3 font-bold text-sm">{quantity}</span>
                            <button onClick={() => setQuantity(quantity + 1)} className="px-3 hover:bg-gray-100">+</button>
                         </div>
                      </div>
                   </div>

                   <div className="flex flex-wrap gap-2 mb-8">
                      <button className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white px-6 py-2.5 rounded text-sm font-bold flex items-center gap-2 transition-colors">
                         <MessageCircle size={18} /> Order on WhatsApp
                      </button>
                      <button 
                        onClick={() => addToCart(product, quantity)}
                        className="bg-[#6d28d9] hover:bg-[#5b21b6] text-white px-6 py-2.5 rounded text-sm font-bold transition-colors"
                      >
                         Buy Now
                      </button>
                      <button 
                        onClick={() => addToCart(product, quantity)}
                        className="bg-[#5b21b6] hover:bg-[#4c1d95] text-white px-6 py-2.5 rounded text-sm font-bold flex items-center gap-2 transition-colors"
                      >
                         <ShoppingCart size={18} /> Add to cart
                      </button>
                      <button 
                        onClick={handleNativeShare}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2.5 rounded text-sm font-bold flex items-center gap-2 transition-colors"
                        title="Share Product"
                      >
                         <Share2 size={18} /> Share
                      </button>
                   </div>
                </div>
             </div>

             <div className="mb-10">
                <div className="flex flex-wrap gap-2 mb-2">
                   <button 
                     onClick={() => setActiveTab('specs')}
                     className={`px-6 py-3 text-sm font-bold rounded-md transition-colors ${activeTab === 'specs' ? 'bg-[#fbbf24] text-black' : 'bg-[#7e22ce] text-white hover:bg-[#6b21a8]'}`}
                   >
                     Product Specification
                   </button>
                   <button 
                     onClick={() => setActiveTab('description')}
                     className={`px-6 py-3 text-sm font-bold rounded-md transition-colors ${activeTab === 'description' ? 'bg-[#fbbf24] text-black' : 'bg-[#7e22ce] text-white hover:bg-[#6b21a8]'}`}
                   >
                     Full Description
                   </button>
                   <button 
                     onClick={() => setActiveTab('reviews')}
                     className={`px-6 py-3 text-sm font-bold rounded-md transition-colors ${activeTab === 'reviews' ? 'bg-[#fbbf24] text-black' : 'bg-[#7e22ce] text-white hover:bg-[#6b21a8]'}`}
                   >
                     Customer's Review
                   </button>
                   <button 
                     onClick={() => setActiveTab('more')}
                     className={`px-6 py-3 text-sm font-bold rounded-md transition-colors ${activeTab === 'more' ? 'bg-[#fbbf24] text-black' : 'bg-[#7e22ce] text-white hover:bg-[#6b21a8]'}`}
                   >
                     More Products
                   </button>
                </div>

                <div className="border border-[#7e22ce] rounded-lg p-6 bg-white min-h-[300px]">
                   {activeTab === 'specs' && (
                      <div className="text-sm text-gray-700 leading-relaxed">
                         <p className="mb-4 text-gray-600">
                            The <span className="font-bold text-gray-900">{product.title}</span> is designed to deliver performance, reliability, and efficiency for modern professionals. Powered by the latest processor, this machine ensures smooth multitasking, fast responsiveness, and efficient power usage.
                         </p>
                         <ul className="space-y-3">
                            {product.specs ? (
                               Object.entries(product.specs).map(([key, value]) => (
                                  value && value !== 'N/A' && (
                                    <li key={key} className="flex gap-2">
                                       <span className="font-bold text-gray-900 w-32 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                                       <span>{value}</span>
                                    </li>
                                  )
                               ))
                            ) : (
                               <li>No detailed specifications available.</li>
                            )}
                            <li className="flex gap-2"><span className="font-bold text-gray-900 w-32">Display Size:</span><span>{product.specs?.screenSize || 'Standard'}</span></li>
                            <li className="flex gap-2"><span className="font-bold text-gray-900 w-32">Graphics:</span><span>Integrated / Dedicated (Model Dependent)</span></li>
                            <li className="flex gap-2"><span className="font-bold text-gray-900 w-32">Keyboard:</span><span>Backlit Keyboard</span></li>
                            <li className="flex gap-2"><span className="font-bold text-gray-900 w-32">Webcam:</span><span>HD Webcam</span></li>
                            <li className="flex gap-2"><span className="font-bold text-gray-900 w-32">Connectivity:</span><span>Bluetooth, Wi-Fi</span></li>
                            <li className="flex gap-2"><span className="font-bold text-gray-900 w-32">Ports:</span><span>USB Type-C, USB 3.0, HDMI, Audio Jack</span></li>
                            <li className="flex gap-2"><span className="font-bold text-gray-900 w-32">Battery:</span><span>Long-life battery with fast charge</span></li>
                         </ul>
                      </div>
                   )}

                   {activeTab === 'description' && (
                      <div className="text-sm text-gray-700 leading-relaxed space-y-6">
                         <div>
                            <p className="mb-4">
                               The <span className="font-bold">{product.title}</span> is designed to deliver performance, reliability, and efficiency for modern professionals. 
                               Powered by the latest <strong>{product.specs?.brand || 'Intel'}</strong> processor, this laptop ensures smooth multitasking, fast responsiveness, and efficient power usage, making it ideal for business workloads, virtual meetings, and productivity applications.
                            </p>
                            <p className="mb-4">
                               Equipped with <strong>{product.specs?.ram || 'standard'} RAM</strong> and a <strong>{product.specs?.storageCapacity || 'large'} {product.specs?.storageType || 'SSD'}</strong>, the device provides ample memory and storage to handle multiple applications seamlessly while offering quick boot-up times. 
                               The <strong>{product.specs?.screenSize || 'crisp'} display</strong> delivers clear visuals, making it comfortable for long hours of work.
                            </p>
                            <p className="mb-4">
                               For professionals who work in dynamic environments, the <strong>backlit keyboard</strong> ensures productivity even in low-light conditions. 
                               The integrated <strong>HD webcam</strong> and <strong>Bluetooth connectivity</strong> enhance collaboration, whether in the office or working remotely. 
                               Running on <strong>{product.specs?.os || 'Windows 11'}</strong>, this laptop offers advanced security and streamlined management tools.
                            </p>
                            <p className="text-[#333399] font-medium">
                               You can get {product.title} at PC Place Nigeria Online Store. Kindly contact the customer representative for price before placing order by clicking here.
                            </p>
                         </div>

                         <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4 uppercase">SPECIFICATION</h3>
                            <ul className="list-disc pl-5 space-y-2">
                               {product.specs && Object.entries(product.specs).map(([key, value]) => (
                                  value && value !== 'N/A' && (
                                    <li key={key}><span className="font-bold capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span> {value}</li>
                                  )
                               ))}
                               <li><span className="font-bold">Graphics:</span> Integrated UHD / Iris Xe Graphics</li>
                               <li><span className="font-bold">Keyboard:</span> Backlit Keyboard</li>
                               <li><span className="font-bold">Webcam:</span> Integrated HD Webcam</li>
                               <li><span className="font-bold">Connectivity:</span> Bluetooth, Wi-Fi</li>
                               <li><span className="font-bold">Ports:</span> USB Type-C, USB 3.2, HDMI, Audio Jack, Ethernet</li>
                               <li><span className="font-bold">Security:</span> TPM 2.0, optional fingerprint reader</li>
                               <li><span className="font-bold">Battery:</span> Long-life battery with fast charge support</li>
                            </ul>
                         </div>

                         <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4 uppercase">FEATURES</h3>
                            <ul className="list-disc pl-5 space-y-3">
                               <li><span className="font-bold">Powerful Performance</span> – Equipped with the latest processor, this laptop ensures smooth multitasking and efficient handling of business applications.</li>
                               <li><span className="font-bold">Ample Memory & Storage</span> – With {product.specs?.ram} and {product.specs?.storageCapacity} {product.specs?.storageType}, you get fast boot times, quick access to files, and seamless productivity throughout the day.</li>
                               <li><span className="font-bold">{product.specs?.screenSize} Display</span> – The compact screen offers excellent clarity and portability, making it perfect for professionals on the go.</li>
                               <li><span className="font-bold">Backlit Keyboard</span> – Work comfortably in low-light environments with the responsive backlit keyboard.</li>
                               <li><span className="font-bold">Enhanced Connectivity</span> – Features Bluetooth and Wi-Fi for fast and reliable wireless connections, along with multiple ports including USB-C, USB 3.2, and HDMI.</li>
                            </ul>
                         </div>
                      </div>
                   )}

                   {activeTab === 'reviews' && (
                      <div>
                         <h3 className="text-xl font-bold text-gray-900 mb-4">Reviews</h3>
                         <p className="text-sm text-gray-600 mb-6">There are no reviews yet.</p>
                         
                         <div className="bg-white">
                            <h4 className="font-bold text-gray-800 mb-2">Be the first to review "{product.title}"</h4>
                            <p className="text-xs text-gray-500 mb-4">Your email address will not be published. Required fields are marked *</p>
                            
                            <form className="space-y-4 max-w-3xl">
                               <div>
                                  <label className="block text-xs font-bold text-gray-700 mb-1">Your rating *</label>
                                  <div className="flex gap-1 mb-2">
                                     {[1, 2, 3, 4, 5].map((star) => (
                                        <button 
                                          key={star}
                                          type="button"
                                          className="focus:outline-none"
                                          onMouseEnter={() => setHoverRating(star)}
                                          onMouseLeave={() => setHoverRating(0)}
                                          onClick={() => setReviewRating(star)}
                                        >
                                           <Star 
                                             size={16} 
                                             className={`${(hoverRating || reviewRating) >= star ? 'text-[#fbbf24] fill-[#fbbf24]' : 'text-gray-300 fill-gray-300'}`} 
                                           />
                                        </button>
                                     ))}
                                  </div>
                               </div>

                               <div>
                                  <label className="block text-xs font-bold text-gray-700 mb-1">Your review *</label>
                                  <textarea 
                                    rows={5}
                                    className="w-full border border-gray-300 rounded p-3 text-sm focus:border-[#333399] outline-none bg-white"
                                    required
                                  ></textarea>
                               </div>

                               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                     <label className="block text-xs font-bold text-gray-700 mb-1">Name *</label>
                                     <input 
                                       type="text" 
                                       className="w-full border border-gray-300 rounded p-2 text-sm focus:border-[#333399] outline-none bg-white"
                                       required 
                                     />
                                  </div>
                                  <div>
                                     <label className="block text-xs font-bold text-gray-700 mb-1">Email *</label>
                                     <input 
                                       type="email" 
                                       className="w-full border border-gray-300 rounded p-2 text-sm focus:border-[#333399] outline-none bg-white"
                                       required 
                                     />
                                  </div>
                               </div>

                               <div className="flex items-center gap-2">
                                  <input type="checkbox" id="save-info" className="rounded text-[#333399] bg-white border border-gray-300" />
                                  <label htmlFor="save-info" className="text-xs text-gray-600">Save my name, email, and website in this browser for the next time I comment.</label>
                               </div>

                               <button 
                                 type="submit"
                                 className="bg-gray-200 hover:bg-[#333399] hover:text-white text-gray-800 font-bold px-6 py-2 rounded text-sm transition-colors mt-2"
                               >
                                  Submit
                               </button>
                            </form>
                         </div>
                      </div>
                   )}

                   {activeTab === 'more' && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                         {relatedProducts.map(p => (
                            <div key={p.id}>
                               <ProductCard product={p} />
                            </div>
                         ))}
                         {relatedProducts.length === 0 && <p className="text-sm text-gray-500 col-span-full">No related products found.</p>}
                      </div>
                   )}
                </div>
             </div>

             <div className="mb-8 bg-[#6d28d9] text-white p-3 rounded-t-lg font-bold">Explore top interests</div>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                {topInterests.map(p => (
                   <div key={p.id}>
                      <ProductCard product={p} />
                   </div>
                ))}
             </div>

             <div className="mb-8 bg-[#6d28d9] text-white p-3 rounded-t-lg font-bold">Recently Viewed</div>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                   <ProductCard product={product} />
                </div>
             </div>
          </div>

          <div className="lg:col-span-3 space-y-6">
             <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-3 border-b border-gray-200 font-bold text-xs text-[#333399]">BENEFITS & WARRANTY</div>
                <div className="p-4 space-y-4 text-xs text-gray-600">
                   <div className="flex gap-3">
                      <Truck className="text-[#333399] flex-shrink-0" size={16} />
                      <span>Same Day Delivery (T&C Applies)</span>
                   </div>
                   <div className="flex gap-3">
                      <Smartphone className="text-[#333399] flex-shrink-0" size={16} />
                      <span>Mobile App Available</span>
                   </div>
                   <div className="flex gap-3">
                      <CreditCard className="text-[#333399] flex-shrink-0" size={16} />
                      <span>Pay With Your Payvib Wallet</span>
                   </div>
                   <div className="flex gap-3">
                      <CreditCard className="text-[#333399] flex-shrink-0" size={16} />
                      <span>Multiple Payment Option</span>
                   </div>
                   <div className="flex gap-3">
                      <RefreshCw className="text-[#333399] flex-shrink-0" size={16} />
                      <span>7-day return Warranty</span>
                   </div>
                   <div className="flex gap-3">
                      <ShieldCheck className="text-[#333399] flex-shrink-0" size={16} />
                      <span>Product & Price Comparison</span>
                   </div>
                </div>
             </div>

             <div className="bg-[#0e7490] text-white rounded-lg p-6 text-center shadow-md">
                <h3 className="font-bold text-lg mb-1">Need Help</h3>
                <h3 className="font-bold text-lg mb-2">Placing order?</h3>
                <p className="text-sm mb-2">Call :</p>
                <p className="text-2xl font-bold text-yellow-400">(0) 803-489-3890</p>
             </div>

             <div className="bg-gray-100 rounded-lg overflow-hidden relative h-64 border border-gray-200">
                <img 
                  src={optimizeImage("https://images.unsplash.com/photo-1542831371-29b0f74f9713", 600)} 
                  alt="promotion"
                  className="absolute inset-0 w-full h-full object-cover" 
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4 text-white">
                   <div className="font-bold text-xl mb-1">Welcome to</div>
                   <div className="font-black text-3xl text-red-500 mb-2">DEC EMBER</div>
                </div>
             </div>

             <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-2 text-xs font-bold text-[#333399] border-b border-gray-200">Sponsored Product</div>
                <div className="bg-black p-6 text-center text-white">
                   <h3 className="text-2xl font-black text-yellow-400 mb-2">EXPLORE OUR</h3>
                   <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2">
                       <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/HP_logo_2012.svg/100px-HP_logo_2012.svg.png" alt="brands" className="w-10" loading="lazy" />
                   </div>
                   <p className="font-bold">LAPTOPS & DESKTOPS</p>
                   <p className="text-xs text-gray-400 mt-2">1 Year Warranty</p>
                </div>
             </div>

             <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-2 text-xs font-bold text-[#333399] border-b border-gray-200">Promotional Ads</div>
                <div className="bg-[#5b21b6] p-6 text-center text-white">
                    <p className="font-bold mb-2">INSTANT GLOBAL PAYMENTS</p>
                    <p className="font-bold text-yellow-400 text-xl mb-4">WORLDWIDE FOR ALL</p>
                    <img 
                      src={optimizeImage("https://images.unsplash.com/photo-1556742049-0cfed4f7a07d", 300)} 
                      alt="promo card"
                      className="rounded-lg mb-2 mx-auto w-3/4" 
                      loading="lazy"
                    />
                </div>
             </div>

             <div className="border border-gray-200 rounded-lg p-4 bg-white">
                 <h4 className="font-bold text-[#333399] mb-2 text-sm border-b border-gray-100 pb-2">Sell on Laptop Realm</h4>
                 <p className="text-xs text-gray-600 mb-2">Want to become a vendor on our marketplace? Then <a href="#" className="text-[#333399] font-bold">sign up here</a>. It's very simple and straight forward.</p>
             </div>

             <div className="border border-gray-200 rounded-lg p-4 bg-white">
                 <h4 className="font-bold text-[#333399] mb-2 text-sm border-b border-gray-100 pb-2">Share This Product</h4>
                 <div className="flex flex-wrap gap-4 text-gray-500 text-xs mt-2">
                    <span onClick={() => handleSocialShare('facebook')} className="flex items-center hover:text-[#333399] cursor-pointer"><Facebook size={14} className="mr-1"/> Like</span>
                    <span onClick={() => handleSocialShare('whatsapp')} className="flex items-center hover:text-[#333399] cursor-pointer"><MessageCircle size={14} className="mr-1"/> WhatsApp</span>
                    <span onClick={() => handleSocialShare('twitter')} className="flex items-center hover:text-[#333399] cursor-pointer"><Twitter size={14} className="mr-1"/> Tweet</span>
                    <span onClick={() => handleSocialShare('linkedin')} className="flex items-center hover:text-[#333399] cursor-pointer"><Linkedin size={14} className="mr-1"/> LinkedIn</span>
                 </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetailContent;
