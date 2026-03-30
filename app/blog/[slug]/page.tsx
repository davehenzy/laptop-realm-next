"use client";

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  Calendar, 
  User, 
  ChevronRight, 
  Tag, 
  Share2, 
  Facebook, 
  Twitter, 
  Linkedin, 
  ArrowLeft,
  Clock,
  MessageSquare,
  Bookmark
} from 'lucide-react';

// Reusing mock data for lookup
const ALL_POSTS = [
  {
    id: 'blog-1',
    slug: 'ultimate-guide-choosing-laptop-programming-2026',
    title: "The Ultimate Guide to Choosing the Right Laptop for Programming in 2026",
    content: `
      <p className="mb-6">Choosing a laptop for programming is one of the most important decisions a developer can make. In 2026, the landscape has shifted significantly with AI-integrated processors and ultra-fast memory architectures becoming the standard.</p>
      
      <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Processor (CPU) Performance</h2>
      <p className="mb-6">The heart of your development machine. For most developers, a minimum of 8 cores is now the baseline. Look for Apple's M4 series or the latest Intel Core Ultra / AMD Ryzen AI processors. These aren't just faster; they're designed to handle local LLM workloads which are becoming integral to modern IDEs.</p>

      <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. RAM: How Much Do You Really Need?</h2>
      <p className="mb-6">If you're running Docker containers, multiple IDE instances, and a dozen browser tabs, 16GB is the bare minimum. We strongly recommend 32GB or even 64GB for mobile app developers or those working with heavy datasets. Memory speed (DDR5+) is also a factor you shouldn't overlook.</p>

      <blockquote className="border-l-4 border-[#333399] pl-6 py-2 my-8 italic text-gray-700 bg-gray-50 rounded-r-lg">
        "A developer's productivity is often directly limited by their hardware's ability to keep up with their thought process. Don't let your compilation times be your coffee breaks."
      </blockquote>

      <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Display and Ergonomics</h2>
      <p className="mb-6">You'll be staring at this screen for hours. High resolution (2K or 4K) helps with text clarity and reduces eye strain. Color accuracy matters if you're a full-stack dev doing UI work, but for most, brightness and matte finishes are more important for varying light conditions.</p>
      
      <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Conclusion</h2>
      <p className="mb-6">Invest in a machine that will last you at least 3-4 years. At Laptop Realm, we specialize in high-performance machines tailored for the Nigerian tech ecosystem.</p>
    `,
    category: "Buying Guides",
    author: "Admin Tech",
    date: "Oct 24, 2025",
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1000",
    readTime: "8 min read",
    tags: ["Programming", "Setup", "Hardware"]
  },
  {
    id: 'blog-2',
    slug: 'm4-vs-m3-apple-silicon-upgrade-worth-it',
    title: "M4 vs M3 Apple Silicon: Is the Upgrade Worth It?",
    content: "<p>Apple's M4 chip represents a significant leap in neural engine performance...</p>",
    category: "Reviews",
    author: "Jane Doe",
    date: "Sep 15, 2025",
    imageUrl: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80&w=1000",
    readTime: "6 min read",
    tags: ["Apple", "M4", "Silicon"]
  },
  {
    id: 'blog-3',
    slug: '5-tips-extend-laptop-battery-life',
    title: "5 Tips to Extend Your Laptop's Battery Life",
    content: "<p>Keep your battery healthy with these simple tips...</p>",
    category: "Tips & Tricks",
    author: "John Smith",
    date: "Sep 02, 2025",
    imageUrl: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=1000",
    readTime: "4 min read",
    tags: ["Battery", "Maintenance", "Tips"]
  }
];

export default function BlogDetailPage() {
  const { slug } = useParams();
  
  // Find the post by slug, defaulting to the first one if not found for demo purposes
  const post = ALL_POSTS.find(p => p.slug === slug) || ALL_POSTS[0];

  return (
    <div className="bg-white min-h-screen pb-16">
      {/* Article Hero */}
      <div className="relative h-[40vh] md:h-[60vh] w-full overflow-hidden">
        <img 
          src={post.imageUrl} 
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
          <div className="container mx-auto px-4 md:px-8 pb-12">
            <Link 
              href="/blog" 
              className="inline-flex items-center text-white/80 hover:text-white mb-6 text-sm font-bold bg-white/10 backdrop-blur-md px-4 py-2 rounded-full transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" /> Back up to Blog
            </Link>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="bg-[#fbbf24] text-gray-900 px-3 py-1 rounded text-xs font-black uppercase tracking-wider">
                {post.category}
              </span>
              <span className="text-white/80 text-xs font-bold flex items-center gap-1">
                <Clock size={14} /> {post.readTime}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white max-w-4xl tracking-tight leading-tight">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 mt-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Main Content Area */}
          <div className="w-full lg:w-2/3 xl:w-3/4">
            
            {/* Author & Meta */}
            <div className="flex flex-wrap items-center justify-between gap-6 py-6 border-b border-gray-100 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#eef2ff] flex items-center justify-center text-[#333399]">
                   <User size={24} />
                </div>
                <div>
                  <p className="text-gray-900 font-bold leading-tight">{post.author}</p>
                  <p className="text-gray-500 text-xs font-medium">Published on {post.date}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 text-gray-500 hover:text-[#333399] transition-colors">
                  <Bookmark size={20} />
                  <span className="text-sm font-bold hidden sm:inline">Save</span>
                </button>
                <button className="flex items-center gap-2 text-gray-500 hover:text-[#333399] transition-colors">
                  <Share2 size={20} />
                  <span className="text-sm font-bold hidden sm:inline">Share</span>
                </button>
              </div>
            </div>

            {/* Article Content */}
            <article 
              className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-12"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-12 py-6 border-y border-gray-100">
               <span className="text-gray-900 font-bold text-sm mr-2 flex items-center gap-1">
                 <Tag size={16} /> Tags:
               </span>
               {post.tags?.map((tag, idx) => (
                 <Link 
                   key={idx} 
                   href="#" 
                   className="bg-gray-100 hover:bg-[#333399] text-gray-600 hover:text-white text-xs font-bold px-4 py-1.5 rounded-full transition-colors"
                 >
                   #{tag}
                 </Link>
               ))}
            </div>

            {/* Newsletter Wrapper */}
            <div className="bg-[#f9fafb] rounded-2xl p-8 md:p-12 mb-12 border border-gray-100 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#333399]/5 rounded-full -mr-16 -mt-16"></div>
               <div className="relative z-10">
                 <h3 className="text-2xl font-black text-gray-900 mb-2">Subscribe to Tech Alerts</h3>
                 <p className="text-gray-600 mb-6 max-w-md">Get the latest laptop deals and tech guides delivered straight to your inbox weekly.</p>
                 <form className="flex flex-col sm:flex-row gap-3">
                   <input 
                     type="email" 
                     placeholder="Enter your email" 
                     className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#333399]/20 focus:border-[#333399] transition-all"
                   />
                   <button className="bg-[#333399] hover:bg-[#262673] text-white font-bold px-8 py-3 rounded-xl shadow-md transition-all">
                     Join Now
                   </button>
                 </form>
               </div>
            </div>

          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-1/3 xl:w-1/4 space-y-10">
            
            {/* Social Share Widget */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-6 pb-2 border-b border-gray-100">Share this Article</h3>
              <div className="grid grid-cols-3 gap-4">
                <button className="flex flex-col items-center gap-2 p-3 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all group">
                  <Facebook size={24} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Facebook</span>
                </button>
                <button className="flex flex-col items-center gap-2 p-3 rounded-xl bg-sky-50 text-sky-500 hover:bg-sky-500 hover:text-white transition-all group">
                  <Twitter size={24} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Twitter</span>
                </button>
                <button className="flex flex-col items-center gap-2 p-3 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-700 hover:text-white transition-all group">
                  <Linkedin size={24} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">LinkedIn</span>
                </button>
              </div>
            </div>

            {/* Related Posts */}
            <div>
               <h3 className="font-bold text-lg text-gray-900 mb-6 pb-2 border-b border-gray-100 flex items-center justify-between">
                 <span>Related Articles</span>
                 <ChevronRight size={18} className="text-[#333399]" />
               </h3>
               <div className="space-y-6">
                 {ALL_POSTS.filter(p => p.slug !== slug).slice(0, 3).map((related, idx) => (
                   <Link key={idx} href={`/blog/${related.slug}`} className="flex gap-4 group">
                      <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
                         <img 
                           src={related.imageUrl} 
                           alt={related.title}
                           className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                         />
                      </div>
                      <div>
                         <h4 className="text-sm font-bold text-gray-900 group-hover:text-[#333399] transition-colors line-clamp-2 leading-snug mb-1">
                           {related.title}
                         </h4>
                         <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{related.date}</span>
                      </div>
                   </Link>
                 ))}
               </div>
            </div>

            {/* Sticky Sidebar Ad Banner */}
            <div className="sticky top-24">
               <div className="bg-[#fbbf24] rounded-2xl p-6 text-gray-900 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Tag size={80} />
                  </div>
                  <h4 className="text-xl font-black mb-2">Exclusive Deal!</h4>
                  <p className="text-sm font-bold mb-6 opacity-80 uppercase tracking-widest italic">Laptops Starting From ₦150,000</p>
                  <Link 
                    href="/shop" 
                    className="block w-full text-center bg-gray-900 hover:bg-black text-white font-black py-3 rounded-xl transition-colors shadow-lg"
                  >
                    Browse Catalog
                  </Link>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
