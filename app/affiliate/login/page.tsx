"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Users, 
  Lock, 
  Mail, 
  ArrowRight, 
  ChevronLeft,
  ShieldCheck,
  Zap,
  DollarSign,
  TrendingUp,
  LayoutDashboard
} from 'lucide-react';

export default function AffiliateLoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login
    setTimeout(() => {
      window.location.href = '/my-account'; // Redirect to account where affiliate tab is
    }, 1500);
  };

  return (
    <div className="bg-[#f9fafb] min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Visual/Info */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#333399] p-12 relative overflow-hidden flex-col justify-between">
         <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 animate-pulse"></div>
         <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#fbbf24]/10 rounded-full -ml-32 -mb-32"></div>
         
         <div>
            <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-12">
               <ChevronLeft size={18} /> Back to Homepage
            </Link>
            <div className="flex items-center gap-3 mb-8">
               <div className="bg-[#fbbf24] p-3 rounded-2xl shadow-lg">
                  <LayoutDashboard className="text-[#333399]" size={28} />
               </div>
               <h1 className="text-3xl font-black text-white uppercase tracking-tight">Partner Portal</h1>
            </div>
            
            <h2 className="text-5xl font-black text-white leading-tight mb-8">
               Manage Your <br/>
               <span className="text-[#fbbf24]">Earnings</span> & <br/>
               <span className="border-b-4 border-white/20">Referrals</span>
            </h2>

            <div className="space-y-6 max-w-sm">
               <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/10">
                     <DollarSign size={20} className="text-[#fbbf24]" />
                  </div>
                  <div>
                     <h4 className="font-bold text-white text-sm uppercase tracking-wide">Real-time Tracking</h4>
                     <p className="text-xs text-white/50 leading-relaxed">Instantly see every click and sale generated through your links.</p>
                  </div>
               </div>
               <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/10">
                     <Zap size={20} className="text-[#fbbf24]" />
                  </div>
                  <div>
                     <h4 className="font-bold text-white text-sm uppercase tracking-wide">Instant Marketing Assets</h4>
                     <p className="text-xs text-white/50 leading-relaxed">Download the latest banners, product photos, and more.</p>
                  </div>
               </div>
               <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/10">
                     <TrendingUp size={20} className="text-[#fbbf24]" />
                  </div>
                  <div>
                     <h4 className="font-bold text-white text-sm uppercase tracking-wide">Partner Support</h4>
                     <p className="text-xs text-white/50 leading-relaxed">Dedicated account managers to help you maximize conversions.</p>
                  </div>
               </div>
            </div>
         </div>

         <div className="relative z-10 p-6 bg-black/20 rounded-2xl border border-white/10 backdrop-blur-md">
            <div className="flex items-center gap-4 mb-4">
               <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" className="w-12 h-12 rounded-full border-2 border-[#fbbf24]" />
               <div>
                  <p className="text-white font-bold text-sm leading-tight">"Joining was the best decision for my tech blog."</p>
                  <p className="text-[#fbbf24] text-[10px] uppercase font-bold tracking-widest">— Tobi A. (Top Tier Affiliate)</p>
               </div>
            </div>
         </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex flex-col justify-center p-8 md:p-16 lg:p-24 bg-white relative">
         <div className="lg:hidden mb-12 flex items-center justify-between">
            <Link href="/affiliate" className="inline-flex items-center gap-2 font-bold text-gray-400 hover:text-gray-900 transition-colors">
               <ChevronLeft size={18} /> Exit
            </Link>
            <h1 className="text-xl font-black text-[#333399] uppercase tracking-tighter italic">Laptop Realm</h1>
         </div>

         <div className="max-w-md w-full mx-auto">
            <div className="mb-10">
               <h2 className="text-3xl font-black text-gray-900 mb-2 uppercase tracking-tight">Welcome Back</h2>
               <p className="text-gray-500 font-medium">Log in to your Laptop Realm Partner account.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
               <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2 px-1">Email Address</label>
                  <div className="relative group">
                     <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#333399] transition-colors">
                        <Mail size={18} />
                     </div>
                     <input 
                        required
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-[#333399] focus:bg-white transition-all font-medium text-gray-900 group-hover:border-gray-300" 
                        placeholder="john@example.com"
                     />
                  </div>
               </div>

               <div>
                  <div className="flex justify-between items-center mb-2 px-1">
                     <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Password</label>
                     <Link href="#" className="text-[10px] font-black text-[#333399] hover:underline uppercase tracking-wide">Forgot Password?</Link>
                  </div>
                  <div className="relative group">
                     <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#333399] transition-colors">
                        <Lock size={18} />
                     </div>
                     <input 
                        required
                        type="password" 
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-[#333399] focus:bg-white transition-all font-medium text-gray-900 group-hover:border-gray-300"
                        placeholder="••••••••"
                     />
                  </div>
               </div>

               <div className="flex items-center gap-3 px-1">
                  <input type="checkbox" id="remember" className="w-4 h-4 rounded border-gray-300 text-[#333399] focus:ring-[#333399]" />
                  <label htmlFor="remember" className="text-xs font-medium text-gray-500 select-none">Remember me for 30 days</label>
               </div>

               <button 
                  disabled={isLoading}
                  className="w-full bg-[#333399] hover:bg-[#262673] disabled:opacity-70 text-white py-4 rounded-2xl font-black text-lg shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 active:scale-[0.98] flex items-center justify-center gap-2 group overflow-hidden relative"
               >
                  {isLoading ? (
                    <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                       Login to Dashboard
                       <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
               </button>
            </form>

            <div className="mt-12 text-center">
               <p className="text-gray-500 text-sm font-medium">Don't have a partner account yet?</p>
               <Link href="/affiliate" className="inline-flex items-center gap-2 text-[#333399] font-black uppercase tracking-wide mt-3 hover:gap-3 transition-all">
                  Join the Program Now <ArrowRight size={16} />
               </Link>
            </div>

            <div className="mt-20 pt-8 border-t border-gray-100 flex items-center justify-center gap-2 text-xs text-gray-400 font-bold uppercase tracking-widest">
               <ShieldCheck size={14} className="text-emerald-500" /> Secure Partner Portal
            </div>
         </div>
      </div>
    </div>
  );
}
