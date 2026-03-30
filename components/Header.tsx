"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Phone, Mail, ChevronDown, Search, Heart, ShoppingCart, User, Menu, Monitor, X, ChevronRight, ArrowRightLeft } from 'lucide-react';
import { CATEGORIES, BRANDS, LATEST_ARRIVALS, NEW_YEAR_SPECIALS, APPLE_STORE } from '../constants';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppContext } from '../context/AppContext';

interface SearchItem {
  term: string;
  category?: string;
  type: 'category' | 'brand' | 'product';
  slug?: string;
}

const Header: React.FC = () => {
  const router = useRouter();
  const { wishlist, compareList, cart, setIsCartOpen } = useAppContext();
  
  const wishlistCount = wishlist.length;
  const compareCount = compareList.length;
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [suggestions, setSuggestions] = useState<SearchItem[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const allSearchItems = React.useMemo(() => {
    const products = [...LATEST_ARRIVALS, ...NEW_YEAR_SPECIALS, ...APPLE_STORE];
    const items: SearchItem[] = [];

    CATEGORIES.forEach(c => items.push({ term: c.name, type: 'category' }));
    BRANDS.forEach(b => items.push({ term: b.name, type: 'brand' }));
    products.forEach(p => {
       items.push({ 
         term: p.title, 
         category: p.category, 
         type: 'product',
         slug: p.slug
       });
    });

    const uniqueItems = new Map<string, SearchItem>();
    items.forEach(i => {
      if(!uniqueItems.has(i.term)){
        uniqueItems.set(i.term, i);
      }
    });
    
    return Array.from(uniqueItems.values());
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (value.length > 0) {
      const filtered = allSearchItems.filter(item => {
        const matchesText = item.term.toLowerCase().includes(value.toLowerCase());
        if (selectedCategory) {
          if (item.type === 'product') {
            return matchesText && item.category === selectedCategory;
          }
          return false;
        }
        return matchesText;
      }).slice(0, 6);

      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      const event = { target: { value: searchQuery } } as React.ChangeEvent<HTMLInputElement>;
      handleSearchChange(event);
    }
  }, [selectedCategory]);

  const clearSearch = () => {
    setSearchQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (item: SearchItem) => {
    setSearchQuery(item.term);
    setShowSuggestions(false);
    if (item.type === 'product' && item.slug) {
      router.push(`/product/${item.slug}`);
    } else {
      router.push(`/shop?query=${encodeURIComponent(item.term)}`);
    }
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      setShowSuggestions(false);
      router.push(`/shop?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleNavClick = (path: string) => {
      router.push(path);
      setIsMobileMenuOpen(false);
  };

  const onCategoryClick = (category: string) => {
     router.push(`/shop?category=${encodeURIComponent(category)}`);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
        document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="flex flex-col w-full text-sm">
      {/* Top Bar */}
      <div className="bg-[#333399] text-white py-2 px-4 md:px-8">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone size={14} />
              <span>You can contact us 24/7: <span className="font-bold">08034893890</span></span>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <Mail size={14} />
              <span>EMAIL SUPPORT: SALES@LAPTOPREALM.COM</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center cursor-pointer">
              <span>English</span>
              <ChevronDown size={14} className="ml-1" />
            </div>
            <div className="flex items-center cursor-pointer">
              <span>NGN</span>
              <ChevronDown size={14} className="ml-1" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Header Area */}
      <div className="bg-white py-4 px-4 md:px-8 shadow-sm relative z-20">
        <div className="container mx-auto flex flex-wrap lg:flex-nowrap items-center justify-between lg:justify-start gap-4">
          
          <button 
            className="lg:hidden p-2 text-gray-700 focus:outline-none hover:text-[#333399]"
            onClick={() => setIsMobileMenuOpen(true)}
          >
              <Menu size={24} />
          </button>

          <Link 
            href="/"
            className="flex items-center lg:order-1 lg:mr-8 cursor-pointer"
          >
            <div className="flex items-center text-2xl md:text-3xl font-extrabold text-[#333399]">
              <span className="mr-1 hidden sm:inline">LAPTOP REALM</span>
              <span className="mr-1 sm:hidden">LR</span>
              <Monitor size={32} className="text-black" />
            </div>
          </Link>

          <div className="flex items-center space-x-3 md:space-x-6 text-gray-600 lg:order-4 lg:ml-auto">
             <div 
               className="flex flex-col items-center cursor-pointer hover:text-[#333399]"
               onClick={() => handleNavClick('/my-account')}
             >
               <User size={24} />
               <div className="text-xs mt-1 leading-tight text-center hidden md:block">
                 <span>Sign In</span><br/>
                 <span className="font-bold">Account</span>
               </div>
             </div>

             <div className="flex flex-col items-center cursor-pointer hover:text-[#333399] relative" onClick={() => handleNavClick('/compare')}>
               <ArrowRightLeft size={24} />
               {compareCount > 0 && (
                   <span className="absolute -top-1 -right-1 bg-[#333399] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in">{compareCount}</span>
               )}
               <div className="text-xs mt-1 hidden md:block">
                 <span className="font-bold">Compare</span>
               </div>
             </div>

             <div 
               className="flex flex-col items-center cursor-pointer hover:text-[#333399] relative" 
               onClick={() => handleNavClick('/wishlist')}
             >
               <Heart size={24} />
               {wishlistCount > 0 && (
                 <span className="absolute -top-1 -right-1 bg-[#333399] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">{wishlistCount}</span>
               )}
               <div className="text-xs mt-1 hidden md:block">
                 <span className="font-bold">Wishlist</span>
               </div>
             </div>
             
             <div 
               className="flex flex-col items-center cursor-pointer hover:text-[#333399] relative"
               onClick={() => setIsCartOpen(true)}
             >
               <ShoppingCart size={24} />
               {cartCount > 0 && (
                 <span className="absolute -top-1 -right-1 bg-[#333399] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in">{cartCount}</span>
               )}
               <div className="text-xs mt-1 hidden md:block">
                 <span className="font-bold">Cart</span>
               </div>
             </div>
          </div>

          <div className="w-full lg:w-auto lg:flex-1 order-last lg:order-3 relative" ref={searchRef}>
            <div className="flex border-2 border-[#333399] rounded-md overflow-hidden bg-white">
              <div className="hidden sm:flex items-center border-r border-gray-200 text-gray-600 relative bg-gray-50">
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none bg-transparent py-2.5 pl-3 pr-8 text-sm outline-none cursor-pointer h-full text-gray-700 font-medium hover:text-[#333399] transition-colors max-w-[150px]"
                >
                  <option value="">All Categories</option>
                  <optgroup label="Categories">
                    {CATEGORIES.map((cat) => (
                      <option key={`cat-${cat.id}`} value={cat.name}>{cat.name}</option>
                    ))}
                  </optgroup>
                </select>
                <ChevronDown size={14} className="absolute right-2 pointer-events-none text-gray-400" />
              </div>
              <input 
                type="text" 
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
                onFocus={() => searchQuery.length > 0 && setShowSuggestions(true)}
                placeholder="Search for products..." 
                className="flex-1 px-4 py-2.5 outline-none text-sm bg-white min-w-0"
              />
              {searchQuery && (
                <button 
                  onClick={clearSearch} 
                  className="px-2 text-gray-400 hover:text-red-500 transition-colors flex items-center justify-center"
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
              <button 
                onClick={handleSearchSubmit}
                className="bg-[#333399] text-white px-6 py-2 flex items-center justify-center hover:bg-[#262673] transition-colors"
              >
                <Search size={20} />
              </button>
            </div>

            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 shadow-xl rounded-b-md mt-1 z-50 overflow-hidden">
                <ul>
                  {suggestions.map((item, index) => (
                    <li 
                      key={index} 
                      onClick={() => handleSuggestionClick(item)}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700 flex items-center"
                    >
                      <Search size={14} className="mr-2 text-gray-400" />
                      <span className="truncate">{item.term}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <nav className="hidden xl:flex items-center space-x-6 text-gray-700 font-medium lg:order-2 lg:mr-8">
            <Link href="/" className="hover:text-[#333399]">Home</Link>
            <Link href="/shop" className="hover:text-[#333399]">Warehouse</Link>
            <Link href="/shop" className="hover:text-[#333399]">Premium Items</Link>
            <Link href="/contact" className="hover:text-[#333399]">Contact</Link>
            <Link href="/blog" className="hover:text-[#333399]">Blog</Link>
          </nav>
        </div>
      </div>

      {/* Mobile Off-Canvas Menu */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      <div className={`fixed top-0 left-0 h-full w-[85%] max-w-[320px] bg-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden shadow-2xl flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50">
              <Link 
                href="/"
                className="flex items-center font-extrabold text-[#333399] text-lg cursor-pointer"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                 <span className="mr-1">LAPTOP REALM</span>
                 <Monitor size={20} className="text-black" />
              </Link>
              <button 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="p-2 text-gray-500 hover:text-red-500 hover:bg-gray-200 rounded-full transition-colors"
                aria-label="Close menu"
              >
                  <X size={24} />
              </button>
          </div>

          <div className="flex-1 overflow-y-auto">
              <div className="p-4 border-b border-gray-100">
                  <ul className="space-y-4 font-semibold text-gray-700">
                      <li><button onClick={() => handleNavClick('/')} className="block hover:text-[#333399] hover:translate-x-1 transition-transform">Home</button></li>
                      <li><button onClick={() => handleNavClick('/shop')} className="block hover:text-[#333399] hover:translate-x-1 transition-transform">Warehouse</button></li>
                      <li><button onClick={() => handleNavClick('/shop')} className="block hover:text-[#333399] hover:translate-x-1 transition-transform">Premium Items</button></li>
                      <li><button onClick={() => handleNavClick('/contact')} className="block hover:text-[#333399] hover:translate-x-1 transition-transform">Contact</button></li>
                      <li><button onClick={() => handleNavClick('/blog')} className="block hover:text-[#333399] hover:translate-x-1 transition-transform">Blog</button></li>
                  </ul>
              </div>

              <div className="p-4 pb-20">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Browse Categories</h3>
                  <ul className="space-y-1">
                      {CATEGORIES.map((cat) => (
                          <li key={cat.id}>
                              <button 
                                onClick={() => {
                                    onCategoryClick(cat.name);
                                    setIsMobileMenuOpen(false);
                                }}
                                className="flex items-center w-full text-left py-2.5 text-gray-600 hover:text-[#333399] hover:bg-gray-50 rounded px-2 -mx-2 transition-colors group"
                              >
                                  <span className="mr-3 text-gray-400 group-hover:text-[#333399]">{cat.icon}</span>
                                  <span className="font-medium">{cat.name}</span>
                                  <ChevronRight size={16} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-[#333399]" />
                              </button>
                          </li>
                      ))}
                  </ul>
              </div>
          </div>
      </div>
    </header>
  );
};

export default Header;
