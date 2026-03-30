"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem } from '../types';

interface AppContextType {
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  
  recentlyViewed: Product[];
  addToRecentlyViewed: (product: Product) => void;
  
  compareList: string[];
  toggleCompare: (productId: string) => void;
  clearCompare: () => void;
  
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  updateCartQuantity: (productId: string, delta: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (isOpen: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);

  // Wishlist State
  const [wishlist, setWishlist] = useState<string[]>([]);

  // Recently Viewed State
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  // Compare State
  const [compareList, setCompareList] = useState<string[]>([]);

  // Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Hydrate from localStorage
  useEffect(() => {
    setIsMounted(true);
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

    const savedRecentlyViewed = localStorage.getItem('recentlyViewed');
    if (savedRecentlyViewed) setRecentlyViewed(JSON.parse(savedRecentlyViewed));

    const savedCart = localStorage.getItem('cart');
    if (savedCart) setCart(JSON.parse(savedCart));

    const savedCompare = localStorage.getItem('compareList');
    if (savedCompare) setCompareList(JSON.parse(savedCompare));
  }, []);

  // Save to localStorage whenever they change (after mount)
  useEffect(() => {
    if (isMounted) localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist, isMounted]);

  useEffect(() => {
    if (isMounted) localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
  }, [recentlyViewed, isMounted]);

  useEffect(() => {
    if (isMounted) localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart, isMounted]);

  useEffect(() => {
    if (isMounted) localStorage.setItem('compareList', JSON.stringify(compareList));
  }, [compareList, isMounted]);

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const addToRecentlyViewed = (product: Product) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(p => p.id !== product.id);
      return [product, ...filtered].slice(0, 5);
    });
  };

  const toggleCompare = (productId: string) => {
    setCompareList(prev => {
      if (prev.includes(productId)) return prev.filter(id => id !== productId);
      if (prev.length >= 4) {
        alert("You can only compare up to 4 products at a time.");
        return prev;
      }
      return [...prev, productId];
    });
  };

  const clearCompare = () => setCompareList([]);

  const addToCart = (product: Product, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const updateCartQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => 
      item.product.id === productId ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
  };

  // Skip rendering children until mounted to avoid hydration errors
  // Alternatively, just render but we know the initial state might be empty arrays
  // rendering it directly is usually fine if we handle hydration states in UI, but here it's safer to avoid hydration mismatches if possible.
  // We'll let it render with empty state and update, it's a common pattern.

  return (
    <AppContext.Provider value={{
      wishlist, toggleWishlist,
      recentlyViewed, addToRecentlyViewed,
      compareList, toggleCompare, clearCompare,
      cart, addToCart, updateCartQuantity, removeFromCart, clearCart,
      isCartOpen, setIsCartOpen,
      isCheckoutOpen, setIsCheckoutOpen
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
