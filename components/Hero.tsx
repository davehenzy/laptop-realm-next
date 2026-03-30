"use client";

import React, { useState, useEffect } from 'react';
import { CATEGORIES, HERO_SLIDES, optimizeImage } from '../constants';
import { ChevronRight, ChevronDown } from 'lucide-react';

const TypingText = ({ text, isActive, speed = 80 }: { text: string, isActive: boolean, speed?: number }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (!isActive) {
      setDisplayedText('');
      return;
    }

    let index = 0;
    setDisplayedText(''); 

    const intervalId = setInterval(() => {
      index++;
      setDisplayedText(text.substring(0, index));
      if (index >= text.length) {
        clearInterval(intervalId);
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [text, isActive, speed]);

  return <span>{displayedText}</span>;
};

export interface HeroSearchFilters {
  brand?: string;
  ram?: string;
  os?: string;
  storage?: string;
}

interface HeroProps {
    onCategoryClick?: (category: string) => void;
    onSearch?: (filters: HeroSearchFilters) => void;
}

const Hero: React.FC<HeroProps> = ({ onCategoryClick, onSearch }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Search Widget State
  const [brand, setBrand] = useState('Select brands');
  const [ram, setRam] = useState('Select RAM');
  const [os, setOs] = useState('Select OS');
  const [storage, setStorage] = useState('Select Total Storage');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleScrollToSection = (slideId: number) => {
    let sectionId = 'latest-arrivals'; // Default fallback
    
    switch (slideId) {
      case 2: // Gaming
        sectionId = 'special-deals';
        break;
      case 3: // Apple
        sectionId = 'apple-store';
        break;
      case 4: // Office (Printers/Servers)
        sectionId = 'latest-arrivals';
        break;
      default:
        sectionId = 'latest-arrivals';
    }

    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFindNow = () => {
    if (onSearch) {
      const filters: HeroSearchFilters = {};
      if (brand !== 'Select brands') filters.brand = brand;
      if (ram !== 'Select RAM') filters.ram = ram;
      if (os !== 'Select OS') filters.os = os;
      if (storage !== 'Select Total Storage') filters.storage = storage;
      onSearch(filters);
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-8 py-6">
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Left Sidebar Categories - Hidden on mobile, visible on lg */}
        <div className="hidden lg:block w-64 flex-shrink-0 bg-white shadow-md rounded-md overflow-hidden border border-gray-100 self-start">
          <div className="bg-gray-50 p-3 font-bold text-gray-800 border-b border-gray-200">
            Categories
          </div>
          <ul className="py-2">
            {CATEGORIES.map((cat) => (
              <li key={cat.id} className="group">
                <button 
                  onClick={() => onCategoryClick?.(cat.name)}
                  className="flex items-center w-full text-left px-4 py-3 text-sm text-gray-600 hover:text-[#333399] hover:bg-[#333399]/10 transition-colors"
                >
                  <span className="mr-3 text-gray-400 group-hover:text-[#333399]">{cat.icon}</span>
                  {cat.name}
                  <ChevronRight size={14} className="ml-auto opacity-50 group-hover:opacity-100" />
                </button>
              </li>
            ))}
            <li className="mt-2 pt-2 border-t border-gray-100">
               <button 
                 onClick={() => onCategoryClick?.('All Categories')}
                 className="flex items-center w-full text-left px-4 py-2 text-xs text-gray-400 hover:text-[#333399]"
               >
                   View all categories
               </button>
            </li>
          </ul>
        </div>

        {/* Main Slider Area */}
        <div className="flex-1 bg-white shadow-md rounded-md overflow-hidden relative group h-[400px] lg:h-auto">
          {/* Sliding Track */}
          <div 
            className="flex h-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {HERO_SLIDES.map((slide, index) => (
              <div 
                key={slide.id}
                className="min-w-full h-full relative"
              >
                <img 
                  src={optimizeImage(slide.image, 1200)}
                  srcSet={`${optimizeImage(slide.image, 600)} 600w, ${optimizeImage(slide.image, 1200)} 1200w`}
                  sizes="(max-width: 768px) 100vw, 1200px"
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding={index === 0 ? "auto" : "async"}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
                
                <div className="relative z-10 h-full flex flex-col justify-center p-8 md:p-12 max-w-lg">
                   <span className={`inline-block px-3 py-1 ${slide.badgeColor} text-black text-xs font-bold uppercase rounded-sm mb-4 w-fit`}>
                     {slide.badge}
                   </span>
                   <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-2 leading-tight min-h-[1.2em]">
                     <TypingText text={slide.title} isActive={index === currentSlide} />
                     <span className={`animate-pulse text-[#333399] ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>|</span>
                   </h2>
                   <p className="text-lg text-gray-600 mb-6 font-medium">{slide.subtitle}</p>
                   
                   <div className="flex items-center space-x-4 mb-8">
                     <div className="bg-orange-500 text-white font-bold text-xl px-4 py-2 rounded-sm -skew-x-6 shadow-md">
                       {slide.discount}
                     </div>
                   </div>

                   <button 
                     onClick={() => handleScrollToSection(slide.id)}
                     className={`${slide.buttonColor} hover:opacity-90 text-white px-8 py-3 rounded-md font-bold text-sm w-fit transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 cursor-pointer`}
                   >
                     {slide.buttonText}
                   </button>
                </div>
              </div>
            ))}
          </div>
             
           {/* Slider Dots */}
           <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
             {HERO_SLIDES.map((_, index) => (
               <button 
                 key={index}
                 onClick={() => setCurrentSlide(index)}
                 className={`w-3 h-3 rounded-full transition-colors duration-300 ${index === currentSlide ? 'bg-[#333399]' : 'bg-gray-300 hover:bg-gray-400'}`}
                 aria-label={`Go to slide ${index + 1}`}
               />
             ))}
           </div>
        </div>

        {/* Right Widget: Finder */}
        <div className="w-full lg:w-72 flex-shrink-0 bg-white shadow-md rounded-md border border-gray-100 p-6 self-start">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Find The Right Computer Faster</h3>
          <p className="text-xs text-gray-500 mb-6">Kindly fill Any or All of the field below to get what you want.</p>
          
          <div className="space-y-4">
             <div className="relative">
                <select 
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded text-sm text-gray-600 outline-none focus:border-[#333399] appearance-none cursor-pointer"
                >
                  <option>Select brands</option>
                  <option>HP</option>
                  <option>Dell</option>
                  <option>Apple</option>
                  <option>Lenovo</option>
                  <option>Asus</option>
                  <option>Microsoft</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
             </div>
             <div className="relative">
                <select 
                  value={ram}
                  onChange={(e) => setRam(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded text-sm text-gray-600 outline-none focus:border-[#333399] appearance-none cursor-pointer"
                >
                  <option>Select RAM</option>
                  <option>8GB</option>
                  <option>16GB</option>
                  <option>32GB</option>
                  <option>64GB</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
             </div>
             <div className="relative">
                <select 
                  value={os}
                  onChange={(e) => setOs(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded text-sm text-gray-600 outline-none focus:border-[#333399] appearance-none cursor-pointer"
                >
                  <option>Select OS</option>
                  <option>Windows 11</option>
                  <option>macOS</option>
                  <option>Linux</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
             </div>
             <div className="relative">
                <select 
                  value={storage}
                  onChange={(e) => setStorage(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded text-sm text-gray-600 outline-none focus:border-[#333399] appearance-none cursor-pointer"
                >
                  <option>Select Total Storage</option>
                  <option>256GB</option>
                  <option>512GB</option>
                  <option>1TB</option>
                  <option>2TB</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
             </div>

             <button 
               onClick={handleFindNow}
               className="w-full bg-[#333399] hover:bg-[#262673] text-white font-bold py-3 rounded text-sm transition-colors mt-4"
             >
               Find Now
             </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;