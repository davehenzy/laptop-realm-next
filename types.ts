import React from 'react';

export interface SEOData {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  noIndex?: boolean;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  category?: string;
  tag?: string; // e.g., "New", "Sale"
  description?: string; // Rich text description
  slug: string; // SEO friendly URL part
  seo?: SEOData;
  specs?: {
    brand?: string;
    os?: string;
    ram?: string;
    storageType?: string;
    storageCapacity?: string;
    screenSize?: string;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: React.ReactNode;
  seo?: SEOData;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  image: string;
  author: string;
  category: string;
  slug: string;
  seo?: SEOData;
}

export interface GlobalSEOSettings {
  siteTitle: string;
  siteDescription: string;
  titleSeparator: string;
  defaultOgImage: string;
  twitterHandle: string;
}
