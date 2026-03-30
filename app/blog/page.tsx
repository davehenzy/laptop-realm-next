"use client";

import React from 'react';
import Link from 'next/link';
import { Calendar, User, ArrowRight, ChevronRight, Tag, Search } from 'lucide-react';

// Mock Blog Data
const FEATURED_POST = {
  id: 'blog-1',
  slug: 'ultimate-guide-choosing-laptop-programming-2026',
  title: "The Ultimate Guide to Choosing the Right Laptop for Programming in 2026",
  excerpt: "Discover the top specifications to look for when buying a coding laptop, from CPU cores and RAM requirements to keyboard comfort and battery life.",
  category: "Buying Guides",
  author: "Admin Tech",
  date: "Oct 24, 2025",
  imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1000",
  readTime: "8 min read"
};

const BLOG_POSTS = [
  {
    id: 'blog-2',
    slug: 'm4-vs-m3-apple-silicon-upgrade-worth-it',
    title: "M4 vs M3 Apple Silicon: Is the Upgrade Worth It?",
    excerpt: "We break down the performance differences between Apple's latest M-series chips and help you decide if you need the extra horsepower.",
    category: "Reviews",
    author: "Jane Doe",
    date: "Sep 15, 2025",
    imageUrl: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80&w=600",
    readTime: "6 min read"
  },
  {
    id: 'blog-3',
    slug: '5-tips-extend-laptop-battery-life',
    title: "5 Tips to Extend Your Laptop's Battery Life",
    excerpt: "Experiencing battery drain? Learn these simple but effective tweaks to make your laptop last longer through the workday.",
    category: "Tips & Tricks",
    author: "John Smith",
    date: "Sep 02, 2025",
    imageUrl: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=600",
    readTime: "4 min read"
  },
  {
    id: 'blog-4',
    slug: 'top-10-must-have-peripherals-home-office',
    title: "Top 10 Must-Have Peripherals for Your Home Office Setup",
    excerpt: "Maximize your productivity with these essential accessories, from ergonomic mice to high-resolution external monitors.",
    category: "Accessories",
    author: "Admin Tech",
    date: "Aug 20, 2025",
    imageUrl: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=600",
    readTime: "5 min read"
  },
  {
    id: 'blog-5',
    slug: 'windows-12-expect-microsoft-next-update',
    title: "Windows 12: What to Expect from Microsoft's Next Update",
    excerpt: "A comprehensive look at the upcoming features, AI integrations, and UI changes coming to the next major Windows release.",
    category: "Tech News",
    author: "Jane Doe",
    date: "Aug 10, 2025",
    imageUrl: "https://images.unsplash.com/photo-1585079542156-2755d9c8a094?auto=format&fit=crop&q=80&w=600",
    readTime: "7 min read"
  },
  {
    id: 'blog-6',
    slug: 'how-to-safely-clean-laptop-screen-keyboard',
    title: "How to Safely Clean Your Laptop Screen and Keyboard",
    excerpt: "Don't ruin your expensive device! Learn the proper techniques and materials needed to keep your laptop looking brand new.",
    category: "Maintenance",
    author: "John Smith",
    date: "Jul 28, 2025",
    imageUrl: "https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?auto=format&fit=crop&q=80&w=600",
    readTime: "3 min read"
  },
  {
    id: 'blog-7',
    slug: 'gaming-laptops-vs-consoles-ultimate-showdown',
    title: "Gaming Laptops vs Consoles: The Ultimate Showdown",
    excerpt: "Debating between a high-end gaming rig or the latest console? We weigh the pros and cons of each platform for modern gamers.",
    category: "Gaming",
    author: "Admin Tech",
    date: "Jul 15, 2025",
    imageUrl: "https://images.unsplash.com/photo-1600861194942-f884de542002?auto=format&fit=crop&q=80&w=600",
    readTime: "9 min read"
  }
];

const CATEGORIES = [
  { name: "Buying Guides", count: 12 },
  { name: "Reviews", count: 24 },
  { name: "Tech News", count: 18 },
  { name: "Tips & Tricks", count: 35 },
  { name: "Maintenance", count: 8 },
  { name: "Gaming", count: 15 }
];

const POPULAR_TAGS = ["Apple", "Windows", "Gaming", "Productivity", "Hardware", "Software", "Deals", "Setup"];

export default function BlogPage() {
  return (
    <div className="bg-[#f9fafb] min-h-screen pb-16">
      {/* Page Header */}
      <div className="bg-[#333399] text-white py-12 md:py-20 relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-10">
           <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
             <defs>
               <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                 <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
               </pattern>
             </defs>
             <rect width="100%" height="100%" fill="url(#grid-pattern)"/>
           </svg>
        </div>
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Laptop Realm <span className="text-[#fbbf24]">Blog</span></h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            Stay updated with the latest tech news, in-depth hardware reviews, and expertly crafted buying guides.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 mt-8">
        {/* Breadcrumb */}
        <nav className="flex text-sm text-gray-500 font-medium mb-8">
          <Link href="/" className="hover:text-[#333399]">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800">Blog</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Content Area */}
          <div className="w-full lg:w-2/3 xl:w-3/4">
            
            {/* Featured Post */}
            <Link href={`/blog/${FEATURED_POST.slug}`} className="mb-12 block group cursor-pointer">
              <div className="relative h-[300px] md:h-[450px] w-full rounded-2xl overflow-hidden mb-6 shadow-md">
                <img 
                  src={FEATURED_POST.imageUrl} 
                  alt={FEATURED_POST.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute top-4 left-4 bg-[#ef4444] text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded">
                  {FEATURED_POST.category}
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-3 font-medium">
                <div className="flex items-center gap-1">
                  <User size={16} className="text-[#333399]" />
                  <span>{FEATURED_POST.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={16} className="text-[#333399]" />
                  <span>{FEATURED_POST.date}</span>
                </div>
                <div className="hidden sm:block text-gray-400">&bull; {FEATURED_POST.readTime}</div>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-[#333399] transition-colors leading-tight">
                {FEATURED_POST.title}
              </h2>
              <p className="text-gray-600 text-lg mb-4 line-clamp-2 md:line-clamp-none">
                {FEATURED_POST.excerpt}
              </p>
              <span className="inline-flex items-center font-bold text-[#333399] group-hover:underline">
                Read Full Article <ArrowRight size={16} className="ml-2" />
              </span>
            </Link>

            {/* Grid of Posts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {BLOG_POSTS.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow group flex flex-col h-full cursor-pointer">
                  <div className="h-56 relative overflow-hidden">
                     <img 
                       src={post.imageUrl} 
                       alt={post.title} 
                       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                     />
                     <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#333399] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded shadow-sm">
                        {post.category}
                     </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-3 font-medium flex-wrap">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} className="text-[#333399]"/>
                        <span>{post.date}</span>
                      </div>
                      <span className="text-gray-300">&bull;</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#333399] transition-colors leading-snug line-clamp-2">
                       {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                       {post.excerpt}
                    </p>
                    <span className="inline-flex items-center font-bold text-sm text-[#333399] mt-auto">
                      Read More <ArrowRight size={14} className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Simple Pagination */}
            <div className="flex justify-center items-center gap-2">
               <button className="px-4 py-2 border border-gray-200 text-gray-500 rounded-lg hover:bg-gray-50 hover:text-[#333399] transition-colors font-medium text-sm" disabled>Previous</button>
               <button className="w-10 h-10 bg-[#333399] text-white rounded-lg font-bold flex items-center justify-center shadow-md">1</button>
               <button className="w-10 h-10 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg font-medium flex items-center justify-center transition-colors">2</button>
               <button className="w-10 h-10 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg font-medium flex items-center justify-center transition-colors">3</button>
               <span className="text-gray-400">...</span>
               <button className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 hover:text-[#333399] transition-colors font-medium text-sm">Next</button>
            </div>
            
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-1/3 xl:w-1/4 space-y-8">
            
            {/* Search Widget */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
               <h3 className="font-bold text-lg text-gray-900 mb-4 pb-2 border-b border-gray-100">Search Articles</h3>
               <div className="relative">
                 <input 
                   type="text" 
                   placeholder="Search our blog..." 
                   className="w-full py-2.5 pl-4 pr-10 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:bg-white focus:outline-none focus:border-[#333399] transition-colors"
                 />
                 <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#333399]">
                    <Search size={18} />
                 </button>
               </div>
            </div>

            {/* Categories Widget */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
               <h3 className="font-bold text-lg text-gray-900 mb-4 pb-2 border-b border-gray-100">Categories</h3>
               <ul className="space-y-3">
                 {CATEGORIES.map((category, index) => (
                   <li key={index}>
                     <Link href="#" className="group flex justify-between items-center text-sm font-medium text-gray-600 hover:text-[#333399]">
                       <span className="flex items-center gap-2">
                         <ChevronRight size={14} className="text-gray-400 group-hover:text-[#fbbf24] transition-colors" />
                         {category.name}
                       </span>
                       <span className="bg-gray-100 text-gray-500 py-0.5 px-2 rounded-full text-xs group-hover:bg-[#eef2ff] group-hover:text-[#333399] transition-colors">
                         {category.count}
                       </span>
                     </Link>
                   </li>
                 ))}
               </ul>
            </div>

            {/* Popular Tags Widget */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
               <h3 className="font-bold text-lg text-gray-900 mb-4 pb-2 border-b border-gray-100">Popular Tags</h3>
               <div className="flex flex-wrap gap-2">
                 {POPULAR_TAGS.map((tag, index) => (
                   <Link 
                     key={index} 
                     href="#" 
                     className="bg-gray-100 hover:bg-[#333399] text-gray-600 hover:text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-colors flex items-center gap-1"
                   >
                     <Tag size={12} />
                     {tag}
                   </Link>
                 ))}
               </div>
            </div>

            {/* Promotional Banner */}
            <div className="bg-gradient-to-br from-[#333399] to-[#262673] rounded-xl shadow-md p-6 text-center text-white relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#fbbf24]/20 rounded-full blur-xl"></div>
                <h3 className="text-xl font-black mb-2 relative z-10">Looking for a New Laptop?</h3>
                <p className="text-white/80 text-sm mb-6 relative z-10">We have the best deals on premium laptops in Nigeria.</p>
                <Link 
                  href="/shop" 
                  className="inline-block bg-[#fbbf24] hover:bg-yellow-500 text-gray-900 font-bold px-6 py-2.5 rounded-lg text-sm transition-colors relative z-10 shadow-lg"
                >
                  Shop Now
                </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
