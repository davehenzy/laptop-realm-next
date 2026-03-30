"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';
import { ChevronDown, Grid, List, Phone, SlidersHorizontal, Loader2, X, Filter } from 'lucide-react';
import { optimizeImage, CATEGORIES, LATEST_ARRIVALS, NEW_YEAR_SPECIALS, APPLE_STORE } from '../constants';
import { useRouter, useSearchParams } from 'next/navigation';

// Helper to get unique values for filters from products
const getUniqueValues = (products: Product[], key: keyof NonNullable<Product['specs']>) => {
  const values = new Set<string>();
  products.forEach(p => {
    if (p.specs && p.specs[key]) {
      values.add(p.specs[key]!);
    }
  });
  return Array.from(values).sort();
};

const ShopContent: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const baseProducts = [...LATEST_ARRIVALS, ...NEW_YEAR_SPECIALS, ...APPLE_STORE];
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // Filter States
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedBrand, setSelectedBrand] = useState('Any brands');
  const [selectedOS, setSelectedOS] = useState('Any Operating system');
  const [selectedRAM, setSelectedRAM] = useState('Any RAM');
  const [selectedStorage, setSelectedStorage] = useState('Any Storage type');
  const [selectedCapacity, setSelectedCapacity] = useState('Any Total storage capacity');
  const [selectedScreen, setSelectedScreen] = useState('Any Screen size');
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const [sortOption, setSortOption] = useState<string>('Latest');

  // Infinite Scroll State
  const [displayCount, setDisplayCount] = useState(12);
  const [isLoading, setIsLoading] = useState(false);
  const loadingRef = useRef<HTMLDivElement>(null);

  // Dynamic Options derived from real data
  const brandOptions = ['Any brands', ...getUniqueValues(baseProducts, 'brand')];
  const osOptions = ['Any Operating system', ...getUniqueValues(baseProducts, 'os')];
  const ramOptions = ['Any RAM', ...getUniqueValues(baseProducts, 'ram')];
  const storageOptions = ['Any Storage type', ...getUniqueValues(baseProducts, 'storageType')];
  const capacityOptions = ['Any Total storage capacity', ...getUniqueValues(baseProducts, 'storageCapacity')];
  const screenOptions = ['Any Screen size', ...getUniqueValues(baseProducts, 'screenSize')];

  // Apply Initial Filters from Query Params
  useEffect(() => {
    const categoryQuery = searchParams.get('category');
    const brandQuery = searchParams.get('brand');
    const osQuery = searchParams.get('os');
    const ramQuery = searchParams.get('ram');
    const storageQuery = searchParams.get('storage');

    if (categoryQuery) setSelectedCategory(categoryQuery);
    if (brandQuery) setSelectedBrand(brandQuery);
    if (osQuery) setSelectedOS(osQuery);
    if (ramQuery) setSelectedRAM(ramQuery);
    if (storageQuery) setSelectedCapacity(storageQuery);
    
  }, [searchParams]);

  // Infinite Scroll Logic
  const loadMore = () => {
      if (isLoading) return;
      setIsLoading(true);
      // Simulate network request duration
      setTimeout(() => {
          setDisplayCount(prev => Math.min(prev + 8, baseProducts.length));
          setIsLoading(false);
      }, 1000);
  };

  useEffect(() => {
    // Reset pagination when any filter changes
    setDisplayCount(12);
    // Scroll to top of results on filter change (optional, better UX)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedCategory, selectedBrand, selectedOS, selectedRAM, selectedStorage, selectedCapacity, selectedScreen]);

  // Comprehensive Filtering Logic
  const filteredProducts = baseProducts.filter(p => {
      if (selectedCategory !== 'All Categories' && p.category !== selectedCategory) return false;
      
      // Spec filters - check if specs exist first
      if (!p.specs) return true; // Include items without specs if generic filters are on, or refine logic
      
      if (selectedBrand !== 'Any brands' && p.specs.brand !== selectedBrand) return false;
      if (selectedOS !== 'Any Operating system' && p.specs.os !== selectedOS) return false;
      if (selectedRAM !== 'Any RAM' && p.specs.ram !== selectedRAM) return false;
      if (selectedStorage !== 'Any Storage type' && p.specs.storageType !== selectedStorage) return false;
      if (selectedCapacity !== 'Any Total storage capacity' && p.specs.storageCapacity !== selectedCapacity) return false;
      if (selectedScreen !== 'Any Screen size' && p.specs.screenSize !== selectedScreen) return false;

      // Price filter
      if (minPrice !== '' && p.price < minPrice) return false;
      if (maxPrice !== '' && p.price > maxPrice) return false;

      return true;
  });

  // Apply sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'Price: Low to High') return a.price - b.price;
    if (sortOption === 'Price: High to Low') return b.price - a.price;
    return parseInt(b.id) - parseInt(a.id); // Simple fallback for "Latest" based on id
  });

  const visibleProducts = sortedProducts.slice(0, displayCount);

  // Observer for infinite scroll
  useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
          const target = entries[0];
          if (target.isIntersecting && !isLoading && displayCount < filteredProducts.length) {
              loadMore();
          }
      }, {
          root: null,
          rootMargin: '100px',
          threshold: 0.1
      });

      const currentTarget = loadingRef.current;
      if (currentTarget) {
          observer.observe(currentTarget);
      }

      return () => {
          if (currentTarget) {
              observer.unobserve(currentTarget);
          }
      };
  }, [isLoading, displayCount, filteredProducts.length]);

  const clearFilters = () => {
      setSelectedCategory('All Categories');
      setSelectedBrand('Any brands');
      setSelectedOS('Any Operating system');
      setSelectedRAM('Any RAM');
      setSelectedStorage('Any Storage type');
      setSelectedCapacity('Any Total storage capacity');
      setSelectedScreen('Any Screen size');
      setMinPrice('');
      setMaxPrice('');
      setSortOption('Latest');
  };

  const activeFilterCount = [
    selectedCategory !== 'All Categories',
    selectedBrand !== 'Any brands',
    selectedOS !== 'Any Operating system',
    selectedRAM !== 'Any RAM',
    selectedStorage !== 'Any Storage type',
    selectedCapacity !== 'Any Total storage capacity',
    selectedScreen !== 'Any Screen size',
    minPrice !== '',
    maxPrice !== ''
  ].filter(Boolean).length;

  return (
    <div className="bg-gray-50 min-h-screen pb-20 animate-in fade-in duration-500">
      
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 md:px-8 py-4 text-xs text-gray-500">
        <button onClick={() => router.push('/')} className="hover:text-[#333399]">Home</button>
        <span className="mx-2">/</span>
        <span className="font-bold text-gray-800">Shop</span>
      </div>

      {/* Hero Banner */}
      <div className="container mx-auto px-4 md:px-8 mb-8">
        <div className="relative bg-gray-900 rounded-xl overflow-hidden min-h-[200px] md:h-[280px] flex items-center">
          <img 
            src={optimizeImage("https://images.unsplash.com/photo-1550745165-9bc0b252726f", 1200)}
            alt="Warehouse" 
            className="absolute inset-0 w-full h-full object-cover opacity-40"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent"></div>
          
          <div className="relative z-10 p-8 md:p-12 w-full flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <div className="mb-6 md:mb-0">
              <span className="text-green-400 font-bold tracking-wider text-xs uppercase mb-2 block">Welcome To Laptop Realm</span>
              <h1 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">Online Warehouse</h1>
              <p className="text-gray-300 max-w-lg text-sm md:text-base">
                Explore our wide range of computers and electronics designed for every need. 
                Featuring top brands like Apple, HP, Dell, Microsoft, ASUS, etc.
              </p>
            </div>
            
            <div className="flex flex-col items-center">
               <span className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Call To Place An Order</span>
               <div className="text-3xl md:text-4xl font-black text-white mb-4">08034893890</div>
               <div className="bg-[#333399] p-3 rounded-full animate-bounce">
                  <Phone className="text-white" size={24} />
               </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters (Desktop) */}
          <aside className={`lg:w-1/4 flex-shrink-0 ${showMobileFilters ? 'fixed inset-0 z-50 bg-white p-6 overflow-y-auto' : 'hidden lg:block'}`}>
            <div className="flex justify-between items-center mb-6 lg:hidden">
                <h2 className="text-xl font-bold text-gray-900">Filters</h2>
                <button onClick={() => setShowMobileFilters(false)} className="text-gray-500"><X size={24}/></button>
            </div>

            <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-800 flex items-center gap-2"><Filter size={16}/> Filter Products</h3>
                {activeFilterCount > 0 && (
                    <button onClick={clearFilters} className="text-xs text-red-500 font-bold hover:underline">Clear All</button>
                )}
            </div>

            <div className="space-y-6">
                {/* Categories */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Product categories</label>
                  <div className="relative">
                    <select 
                      className="w-full appearance-none bg-white border border-gray-200 text-gray-600 text-sm rounded-lg px-4 py-3 focus:outline-none focus:border-[#333399] focus:ring-1 focus:ring-[#333399] cursor-pointer shadow-sm hover:bg-gray-50 hover:shadow-md transition-all duration-200"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      <option>All Categories</option>
                      {CATEGORIES.map((c, i) => <option key={i} value={c.name}>{c.name}</option>)}
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Brand */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Choose Brand</label>
                  <div className="relative">
                    <select 
                      className="w-full appearance-none bg-white border border-gray-200 text-gray-600 text-sm rounded-lg px-4 py-3 focus:outline-none focus:border-[#333399] focus:ring-1 focus:ring-[#333399] cursor-pointer shadow-sm hover:bg-gray-50 hover:shadow-md transition-all duration-200"
                      value={selectedBrand}
                      onChange={(e) => setSelectedBrand(e.target.value)}
                    >
                      {brandOptions.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* OS */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Operating System</label>
                  <div className="relative">
                    <select 
                      className="w-full appearance-none bg-white border border-gray-200 text-gray-600 text-sm rounded-lg px-4 py-3 focus:outline-none focus:border-[#333399] focus:ring-1 focus:ring-[#333399] cursor-pointer shadow-sm hover:bg-gray-50 hover:shadow-md transition-all duration-200"
                      value={selectedOS}
                      onChange={(e) => setSelectedOS(e.target.value)}
                    >
                      {osOptions.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* RAM */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">RAM</label>
                  <div className="relative">
                    <select 
                      className="w-full appearance-none bg-white border border-gray-200 text-gray-600 text-sm rounded-lg px-4 py-3 focus:outline-none focus:border-[#333399] focus:ring-1 focus:ring-[#333399] cursor-pointer shadow-sm hover:bg-gray-50 hover:shadow-md transition-all duration-200"
                      value={selectedRAM}
                      onChange={(e) => setSelectedRAM(e.target.value)}
                    >
                      {ramOptions.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Storage Type */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Storage Type</label>
                  <div className="relative">
                    <select 
                      className="w-full appearance-none bg-white border border-gray-200 text-gray-600 text-sm rounded-lg px-4 py-3 focus:outline-none focus:border-[#333399] focus:ring-1 focus:ring-[#333399] cursor-pointer shadow-sm hover:bg-gray-50 hover:shadow-md transition-all duration-200"
                      value={selectedStorage}
                      onChange={(e) => setSelectedStorage(e.target.value)}
                    >
                      {storageOptions.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Capacity */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Total Storage Capacity</label>
                  <div className="relative">
                    <select 
                      className="w-full appearance-none bg-white border border-gray-200 text-gray-600 text-sm rounded-lg px-4 py-3 focus:outline-none focus:border-[#333399] focus:ring-1 focus:ring-[#333399] cursor-pointer shadow-sm hover:bg-gray-50 hover:shadow-md transition-all duration-200"
                      value={selectedCapacity}
                      onChange={(e) => setSelectedCapacity(e.target.value)}
                    >
                       {capacityOptions.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Screen Size */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Screen Size</label>
                  <div className="relative">
                    <select 
                      className="w-full appearance-none bg-white border border-gray-200 text-gray-600 text-sm rounded-lg px-4 py-3 focus:outline-none focus:border-[#333399] focus:ring-1 focus:ring-[#333399] cursor-pointer shadow-sm hover:bg-gray-50 hover:shadow-md transition-all duration-200"
                      value={selectedScreen}
                      onChange={(e) => setSelectedScreen(e.target.value)}
                    >
                       {screenOptions.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              
              {/* Price Filter */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
                  Filter by Price
                </label>
                <div className="flex items-center gap-2">
                   <input type="number" placeholder="Min" value={minPrice} onChange={e => setMinPrice(e.target.value ? Number(e.target.value) : '')} className="w-full bg-white border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#333399]" />
                   <span className="text-gray-400">-</span>
                   <input type="number" placeholder="Max" value={maxPrice} onChange={e => setMaxPrice(e.target.value ? Number(e.target.value) : '')} className="w-full bg-white border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#333399]" />
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            
            {/* Toolbar */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6 flex flex-wrap gap-4 justify-between items-center">
              <div className="flex items-center gap-4">
                 <button 
                   className="lg:hidden flex items-center gap-2 text-sm font-bold text-gray-700 border border-gray-300 px-3 py-2 rounded"
                   onClick={() => setShowMobileFilters(true)}
                 >
                    <SlidersHorizontal size={16} /> Filters
                 </button>
                 <p className="text-sm text-gray-500">
                    Showing {visibleProducts.length} of {filteredProducts.length} results
                 </p>
              </div>

              <div className="flex items-center gap-4 ml-auto">
                 <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 hidden sm:inline">Sort by:</span>
                    <select 
                      value={sortOption} 
                      onChange={(e) => setSortOption(e.target.value)} 
                      className="bg-gray-50 border border-gray-200 text-sm rounded px-2 py-1.5 focus:outline-none cursor-pointer focus:border-[#333399]"
                    >
                       <option value="Latest">Latest</option>
                       <option value="Price: Low to High">Price: Low to High</option>
                       <option value="Price: High to Low">Price: High to Low</option>
                    </select>
                 </div>

                 <div className="flex items-center gap-2 border-l border-gray-200 pl-4">
                    <button 
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded ${viewMode === 'grid' ? 'bg-[#333399] text-white' : 'text-gray-400 hover:text-[#333399]'}`}
                    >
                       <Grid size={18} />
                    </button>
                    <button 
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded ${viewMode === 'list' ? 'bg-[#333399] text-white' : 'text-gray-400 hover:text-[#333399]'}`}
                    >
                       <List size={18} />
                    </button>
                 </div>
              </div>
            </div>

            {/* Active Filters Display */}
            {activeFilterCount > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                    {selectedCategory !== 'All Categories' && <span className="bg-[#333399] text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">{selectedCategory} <button onClick={() => setSelectedCategory('All Categories')}><X size={12}/></button></span>}
                    {selectedBrand !== 'Any brands' && <span className="bg-[#333399] text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">{selectedBrand} <button onClick={() => setSelectedBrand('Any brands')}><X size={12}/></button></span>}
                    {/* Add others as needed for display */}
                </div>
            )}

            {/* Product Grid */}
            {visibleProducts.length > 0 ? (
              <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-1'}`}>
                 {visibleProducts.map((product, idx) => (
                   <div key={`${product.id}-${idx}`} className={viewMode === 'list' ? 'flex flex-row' : ''}>
                      <ProductCard product={product} />
                   </div>
                 ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-12 bg-white rounded-lg border border-gray-200 text-center">
                 <p className="text-gray-500 font-medium mb-4">No products found matching your filters.</p>
                 <button 
                    onClick={clearFilters}
                    className="bg-[#333399] text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-[#262673] transition-colors"
                 >
                    Clear All Filters
                 </button>
              </div>
            )}

            {/* Loading Indicator & Trigger */}
            <div 
              ref={loadingRef}
              className="mt-10 flex flex-col items-center justify-center p-4 min-h-[100px]"
            >
                {isLoading && (
                    <div className="flex flex-col items-center gap-2 text-[#333399]">
                        <Loader2 size={32} className="animate-spin" />
                        <span className="text-sm font-medium">Loading more products...</span>
                    </div>
                )}
                {!isLoading && displayCount >= filteredProducts.length && filteredProducts.length > 0 && (
                    <p className="text-gray-400 text-sm">You have reached the end of the list.</p>
                )}
            </div>

          </main>
        </div>
      </div>
    </div>
  );
};

export default ShopContent;
