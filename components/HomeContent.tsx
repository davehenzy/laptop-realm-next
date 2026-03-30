"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Hero, { HeroSearchFilters } from './Hero';
import ServicesBar from './ServicesBar';
import SectionHeader from './SectionHeader';
import ProductCard from './ProductCard';
import PromoStrip from './PromoStrip';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  Wrench, 
  Settings, 
  ShieldCheck, 
  PhoneCall 
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LATEST_ARRIVALS, NEW_YEAR_SPECIALS, APPLE_STORE, BLOG_POSTS } from '../constants';

const HomeContent: React.FC = () => {
  const router = useRouter();

  // Combine all products from constants
  const products = useMemo(() => [...LATEST_ARRIVALS, ...NEW_YEAR_SPECIALS, ...APPLE_STORE], []);
  
  // Sales Tabs State
  const [activeSaleTab, setActiveSaleTab] = useState('Dell');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [saleSlideIndex, setSaleSlideIndex] = useState(0);
  
  // Sliders State
  const [newYearSlideIndex, setNewYearSlideIndex] = useState(0);
  const [itemsVisible, setItemsVisible] = useState(6);
  
  // Data Filtering for Homepage Sections
  const latestArrivals = useMemo(() => products.slice(0, 6), [products]);
  const newYearSpecials = useMemo(() => products.slice(6, 18), [products]);
  const appleStoreProducts = useMemo(() => products.filter(p => p.specs?.brand === 'Apple' || p.title.includes('Apple')).slice(0, 4), [products]);

  const saleTabs = ['Acer', 'Air Conditioners', 'Dell', 'HP', 'Lenovo', 'Microsoft', 'Printers'];

  const handleCategoryClick = (category: string) => {
    // In actual app, pass this category to shop page via query params or context
    router.push(`/shop?category=${encodeURIComponent(category)}`);
  };

  const handleHeroSearch = (filters: HeroSearchFilters) => {
    const params = new URLSearchParams();
    if (filters.brand) params.set('brand', filters.brand);
    if (filters.ram) params.set('ram', filters.ram);
    if (filters.os) params.set('os', filters.os);
    if (filters.storage) params.set('storage', filters.storage);
    
    router.push(`/shop?${params.toString()}`);
  };

  const handleTabChange = (tab: string) => {
    if (activeSaleTab === tab || isTransitioning) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveSaleTab(tab);
      setIsTransitioning(false);
    }, 300);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsVisible(2);
      else if (window.innerWidth < 1024) setItemsVisible(3);
      else setItemsVisible(6);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const saleProducts = useMemo(() => {
    let filtered = products.filter(p => 
      p.title.toLowerCase().includes(activeSaleTab.toLowerCase()) || 
      (p.specs?.brand && p.specs.brand.toLowerCase() === activeSaleTab.toLowerCase())
    );

    if (filtered.length < 12) {
      const remaining = products.filter(p => !filtered.includes(p));
      const filler = remaining.sort((a, b) => {
        return (a.title.charCodeAt(0) + activeSaleTab.length) - (b.title.charCodeAt(0) + activeSaleTab.length);
      });
      filtered = [...filtered, ...filler.slice(0, 12 - filtered.length)];
    }
    return filtered.slice(0, 12);
  }, [activeSaleTab, products]);

  useEffect(() => {
    setSaleSlideIndex(0);
  }, [activeSaleTab]);

  useEffect(() => {
    if (isTransitioning) return;
    const interval = setInterval(() => {
      setSaleSlideIndex(prev => {
        const maxIndex = saleProducts.length - itemsVisible;
        if (maxIndex < 0) return 0;
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [saleProducts.length, itemsVisible, isTransitioning]);

  useEffect(() => {
    const interval = setInterval(() => {
      setNewYearSlideIndex(prev => {
        const maxIndex = newYearSpecials.length - itemsVisible;
        if (maxIndex < 0) return 0;
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [itemsVisible, newYearSpecials.length]);

  const handleNewYearScroll = (direction: 'left' | 'right') => {
    const maxIndex = newYearSpecials.length - itemsVisible;
    if (maxIndex < 0) return;
    if (direction === 'left') {
      setNewYearSlideIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
    } else {
      setNewYearSlideIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
    }
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] flex flex-col font-sans relative">
      <main className="flex-grow">
        <Hero onCategoryClick={handleCategoryClick} onSearch={handleHeroSearch} />
        <ServicesBar />

        {/* Latest Arrivals Section */}
        <section id="latest-arrivals" className="container mx-auto px-4 md:px-8 mb-10">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <SectionHeader 
              title="Latest Arrivals" 
              onLinkClick={() => router.push('/shop')}
            />
            <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {latestArrivals.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                />
              ))}
            </div>
          </div>
        </section>

        {/* New Year Special Section */}
        <section id="special-deals" className="container mx-auto px-4 md:px-8 mb-10">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <SectionHeader 
              title="New Year Special" 
              hasCountdown={true} 
              onLinkClick={() => router.push('/shop')}
            />
            
            <div className="relative group px-4 py-4 overflow-hidden">
              <button 
                onClick={() => handleNewYearScroll('left')}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white text-gray-800 hover:bg-[#333399] hover:text-white p-3 rounded-full shadow-lg border border-gray-100 transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0"
                aria-label="Previous products"
              >
                <ChevronLeft size={24} />
              </button>

              <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${newYearSlideIndex * (100 / itemsVisible)}%)` }}
              >
                {newYearSpecials.map(product => (
                  <div 
                    key={product.id} 
                    className="flex-shrink-0 px-2 box-border"
                    style={{ width: `${100 / itemsVisible}%` }}
                  >
                    <ProductCard 
                      product={product} 
                    />
                  </div>
                ))}
              </div>

              <button 
                onClick={() => handleNewYearScroll('right')}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white text-gray-800 hover:bg-[#333399] hover:text-white p-3 rounded-full shadow-lg border border-gray-100 transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
                aria-label="Next products"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </section>

        {/* Sales Banner Red */}
        <section className="container mx-auto px-4 md:px-8 mb-10">
          <div className="bg-[#ef4444] rounded-t-lg p-3 flex flex-col md:flex-row justify-between items-center text-white gap-4">
              <div className="flex flex-col md:flex-row items-center md:space-x-4 w-full md:w-auto">
                <span className="font-bold text-lg whitespace-nowrap mb-2 md:mb-0">Dont Miss This Week Sales On:</span>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-2 text-xs font-medium">
                  {saleTabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => handleTabChange(tab)}
                      disabled={isTransitioning}
                      className={`px-3 py-1 rounded-full transition-all duration-300 ${
                        activeSaleTab === tab 
                          ? 'bg-white text-[#ef4444] font-bold shadow-md transform scale-105' 
                          : 'bg-white/10 hover:bg-white/20 text-white hover:scale-105 hover:shadow-md'
                      } ${isTransitioning ? 'cursor-not-allowed opacity-80' : 'cursor-pointer'}`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
              
              <button 
                onClick={() => router.push('/shop')}
                className="text-xs font-bold flex items-center hover:underline whitespace-nowrap self-end md:self-auto text-white"
              >
                SEE ALL <ArrowRight size={14} className="ml-1"/>
              </button>
          </div>
          
          <div className={`bg-white p-4 border border-t-0 border-gray-200 rounded-b-lg overflow-hidden min-h-[300px] transition-all duration-300 ease-in-out ${isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
              <div 
                  className="flex transition-transform duration-700 ease-in-out"
                  style={{ transform: `translateX(-${saleSlideIndex * (100 / itemsVisible)}%)` }}
              >
                  {saleProducts.map((product, idx) => (
                    <div 
                      key={`${activeSaleTab}-${product.id}-${idx}`} 
                      className="flex-shrink-0 px-2 box-border"
                      style={{ width: `${100 / itemsVisible}%` }}
                    >
                      <ProductCard 
                        product={product} 
                      />
                    </div>
                  ))}
              </div>
          </div>
        </section>

        <PromoStrip />

        {/* Support Banner - Redesigned for Premium Look */}
        <section className="container mx-auto px-4 md:px-8 mb-16">
          <div className="bg-white rounded-[32px] p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between relative overflow-hidden shadow-xl border border-gray-50 group">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-full lg:w-2/3 h-full bg-[#333399]/[0.02] -skew-x-12 transform translate-x-1/4"></div>
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#333399]/5 rounded-full blur-3xl group-hover:bg-[#fbbf24]/5 transition-colors duration-700"></div>
            <div className="absolute right-40 bottom-10 w-24 h-24 bg-[#fbbf24]/10 rounded-full blur-2xl"></div>
            
            <div className="z-10 max-w-2xl text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#333399]/10 text-[#333399] text-[10px] font-black uppercase tracking-widest mb-6">
                  <Wrench size={14} /> Professional Tech Support
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 leading-tight uppercase tracking-tight">
                  We Don't Just Sell Tech,
                  <br />
                  <span className="text-[#333399]">We Support It.</span>
                </h2>
                
                <div className="flex flex-wrap justify-center lg:justify-start items-center gap-x-4 gap-y-2 text-[10px] font-black text-gray-400 mb-10 uppercase tracking-[0.15em]">
                  <span className="flex items-center gap-1.5 hover:text-gray-900 transition-colors cursor-default"><div className="w-1.5 h-1.5 rounded-full bg-[#fbbf24]"></div> Hardware Repair</span>
                  <span className="flex items-center gap-1.5 hover:text-gray-900 transition-colors cursor-default"><div className="w-1.5 h-1.5 rounded-full bg-[#fbbf24]"></div> Software Installation</span>
                  <span className="flex items-center gap-1.5 hover:text-gray-900 transition-colors cursor-default"><div className="w-1.5 h-1.5 rounded-full bg-[#fbbf24]"></div> Surveillance System</span>
                  <span className="flex items-center gap-1.5 hover:text-gray-900 transition-colors cursor-default"><div className="w-1.5 h-1.5 rounded-full bg-[#fbbf24]"></div> Data Recovery</span>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <a 
                    href="https://wa.me/2348034893890?text=Hello%20I%20would%20like%20to%20inquire%20about%20your%20support%20services."
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="group/btn relative bg-[#333399] hover:bg-[#262673] text-white font-black px-10 py-4 rounded-2xl transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-95 flex items-center gap-3 overflow-hidden"
                  >
                    <span className="relative z-10 uppercase tracking-wide">Get Support Now</span>
                    <ArrowRight size={18} className="relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                    <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/10 opacity-40 group-hover/btn:animate-shine"></div>
                  </a>

                  <Link href="/services" className="text-sm font-black text-gray-400 hover:text-gray-900 uppercase tracking-widest px-6 py-4 transition-all">
                    View All Services
                  </Link>
                </div>
            </div>
            
            {/* Visual Abstract - Right Side */}
            <div className="hidden lg:flex relative w-1/3 aspect-square items-center justify-center">
               <div className="absolute inset-0 border-[20px] border-[#333399]/5 rounded-[60px] rotate-12 group-hover:rotate-[20deg] transition-transform duration-1000"></div>
               <div className="relative z-20 bg-white p-8 rounded-[40px] shadow-2xl border border-gray-50 transform -rotate-3 group-hover:rotate-0 transition-transform duration-700">
                  <div className="grid grid-cols-2 gap-4">
                     <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-[#333399]"><Wrench size={24} /></div>
                     <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-[#333399]"><Settings size={24} /></div>
                     <div className="w-12 h-12 bg-[#fbbf24] rounded-xl flex items-center justify-center text-gray-900"><ShieldCheck size={24} /></div>
                     <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-[#333399]"><PhoneCall size={24} /></div>
                  </div>
               </div>
               
               {/* Animated Pulse Ring */}
               <div className="absolute w-48 h-48 bg-[#333399]/5 rounded-full animate-ping opacity-20"></div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default HomeContent;
