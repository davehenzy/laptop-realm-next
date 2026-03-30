"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  BarChart3,
  ChevronDown,
  ChevronUp,
  UserPlus,
  Share2,
  Gift
} from 'lucide-react';

export default function AffiliatePage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const steps = [
    {
      icon: <UserPlus className="text-white" size={32} />,
      title: "Join for Free",
      description: "Sign up in seconds and get your unique affiliate dashboard instantly.",
      color: "bg-blue-500"
    },
    {
      icon: <Share2 className="text-white" size={32} />,
      title: "Share Laptop Realm",
      description: "Promote our premium laptops and gadgets using your custom links and banners.",
      color: "bg-purple-500"
    },
    {
      icon: <Gift className="text-white" size={32} />,
      title: "Earn Big Rewards",
      description: "Get paid up to 5% commission for every successful referral sale made through you.",
      color: "bg-orange-500"
    }
  ];

  const benefits = [
    {
      title: "Reliable Tracking",
      description: "Advanced cookie technology ensures your referrals are always credited to you.",
      icon: <CheckCircle2 className="text-emerald-500" />
    },
    {
      title: "Fast Payouts",
      description: "Withdraw your earnings directly to your bank account within 48 hours of approval.",
      icon: <DollarSign className="text-emerald-500" />
    },
    {
      title: "Premium Catalog",
      description: "Promote the latest HP, Dell, Apple, and Lenovo tech that people actually want.",
      icon: <Zap className="text-blue-500" />
    },
    {
      title: "Marketing Assets",
      description: "Access high-converting banners, email templates, and product feeds.",
      icon: <BarChart3 className="text-purple-500" />
    }
  ];

  const faqs = [
    {
      q: "How much commission can I earn?",
      a: "Our standard commission rate is 3% for laptops and 5% for accessories. High-performing affiliates can qualify for custom rates up to 7%."
    },
    {
      q: "When and how do I get paid?",
      a: "Payouts are made twice a month. You can withdraw your balance via Direct Bank Transfer or Store Credit once you reach the minimum threshold of ₦5,000."
    },
    {
      q: "Do I need a website to join?",
      a: "No! You can promote Laptop Realm on social media (Instagram, Twitter, WhatsApp), YouTube, or your personal blog."
    },
    {
      q: "How long do the cookies last?",
      a: "Our cookies last for 30 days. If a customer clicks your link and makes a purchase within 30 days, you earn the commission."
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-[#333399] overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#fbbf24]/10 rounded-full -ml-32 -mb-32"></div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[#fbbf24] text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-sm">
              <TrendingUp size={14} /> Affiliate Partner Program
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight uppercase tracking-tight">
              Turn Your <span className="text-[#fbbf24]">Influence</span> Into <span className="border-b-4 border-[#fbbf24]">Income</span>
            </h1>
            <p className="text-xl text-white/80 mb-10 leading-relaxed max-w-2xl font-medium">
              Join Nigeria's leading tech affiliate program. Promote premium laptops, earn massive commissions, and grow with Laptop Realm.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
               <button className="bg-[#fbbf24] hover:bg-yellow-500 text-gray-900 px-8 py-4 rounded-xl font-black text-lg shadow-xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 active:scale-95">
                  Become a Partner <ArrowRight size={20} />
               </button>
               <Link href="/affiliate/login" className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-bold border border-white/20 transition-all backdrop-blur-md active:scale-95 flex items-center justify-center">
                  Affiliate Login
               </Link>
            </div>
            
            <div className="mt-12 flex items-center gap-8 border-t border-white/10 pt-8">
               <div className="flex flex-col">
                  <span className="text-2xl font-black text-white">₦5M+</span>
                  <span className="text-xs text-white/50 font-bold uppercase tracking-wider">Paid to Partners</span>
               </div>
               <div className="flex flex-col">
                  <span className="text-2xl font-black text-white">5%</span>
                  <span className="text-xs text-white/50 font-bold uppercase tracking-wider">Up to Commission</span>
               </div>
               <div className="flex flex-col">
                  <span className="text-2xl font-black text-white">400+</span>
                  <span className="text-xs text-white/50 font-bold uppercase tracking-wider">Active Affiliates</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-10 bg-gray-50 border-b border-gray-100">
         <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all">
            <span className="font-black text-xl text-gray-400 uppercase tracking-tighter italic">Trusted By Content Creators & Techies Nationwide</span>
         </div>
      </section>

      {/* How it Works */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 uppercase tracking-tight">How It Works</h2>
            <p className="text-gray-500 font-medium">Three simple steps to start earning with Nigeria's #1 Laptop store.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-dashed bg-gray-200 -z-10 bg-[linear-gradient(to_right,#e5e7eb_50%,#fff_50%)] bg-[length:10px_1px]"></div>
            
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center p-8 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-xl transition-all group hover:-translate-y-2">
                <div className={`w-20 h-20 ${step.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:rotate-6 transition-all`}>
                  {step.icon}
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-tight">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#333399]/10 skew-x-12"></div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
           <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2">
                 <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight tracking-tight uppercase">Why Partner <br/>With <span className="text-[#fbbf24]">Laptop Realm</span>?</h2>
                 <p className="text-gray-400 mb-12 text-lg leading-relaxed">
                   We provide everything you need to be successful. Whether you're a seasoned marketer or just starting out, our tools and support are world-class.
                 </p>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {benefits.map((benefit, idx) => (
                      <div key={idx} className="flex gap-4">
                         <div className="flex-shrink-0 w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">
                            {benefit.icon}
                         </div>
                         <div>
                            <h4 className="font-black text-sm uppercase tracking-wide mb-1">{benefit.title}</h4>
                            <p className="text-xs text-gray-500 leading-relaxed">{benefit.description}</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
              <div className="lg:w-1/2 bg-[#333399]/20 p-4 rounded-[40px] border border-white/10 backdrop-blur-sm">
                 <div className="bg-white rounded-[32px] p-8 text-gray-900 shadow-2xl">
                    <h3 className="text-2xl font-black mb-6 text-center uppercase tracking-tight">Create Your Account</h3>
                    <form className="space-y-4">
                       <div className="grid grid-cols-2 gap-4">
                          <input type="text" placeholder="First Name" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#333399] transition-all" />
                          <input type="text" placeholder="Last Name" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#333399] transition-all" />
                       </div>
                       <input type="email" placeholder="Email Address" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#333399] transition-all" />
                       <input type="text" placeholder="Phone Number" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#333399] transition-all" />
                       <div className="space-y-2">
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">How will you promote us?</p>
                          <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#333399] transition-all text-sm font-medium">
                             <option>Instagram / Facebook</option>
                             <option>YouTube Channel</option>
                             <option>Twitter (X)</option>
                             <option>WhatsApp Groups</option>
                             <option>Personal Blog / Website</option>
                             <option>Other</option>
                          </select>
                       </div>
                       <button className="w-full bg-[#333399] hover:bg-[#262673] text-white py-4 rounded-xl font-black text-lg shadow-lg transition-all active:scale-[0.98] mt-6">
                          Send Application
                       </button>
                       <p className="text-[10px] text-center text-gray-400 font-medium leading-relaxed">By applying, you agree to our Affiliate Terms and Conditions. Our team reviews all applications manually within 24-48 hours.</p>
                    </form>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8">
           <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 uppercase tracking-tight">Common Questions</h2>
              <p className="text-gray-500 font-medium">Everything you need to know about the partnership.</p>
           </div>

           <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border border-gray-200 rounded-2xl overflow-hidden hover:border-[#333399]/30 transition-all">
                  <button 
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-6 text-left font-bold text-gray-800 transition-colors"
                  >
                    {faq.q}
                    {activeFaq === idx ? <ChevronUp size={20} className="text-[#333399]" /> : <ChevronDown size={20} className="text-gray-400" />}
                  </button>
                  <div className={`px-6 transition-all duration-300 ease-in-out ${activeFaq === idx ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                    <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
         <div className="container mx-auto px-4 md:px-8">
            <div className="bg-gradient-to-r from-[#333399] to-[#262673] rounded-[48px] p-12 text-center text-white relative overflow-hidden">
               <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-32 -mt-32"></div>
               <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#fbbf24]/20 rounded-full -mr-16 -mb-16"></div>
               
               <div className="relative z-10 max-w-2xl mx-auto">
                  <h2 className="text-4xl font-black mb-6 uppercase tracking-tight">Ready to start earning?</h2>
                  <p className="text-white/70 mb-10 font-medium">Join hundreds of successful partners who have turned their tech knowledge into a steady stream of passive income.</p>
                  <button className="bg-white text-gray-900 px-10 py-4 rounded-xl font-black text-lg shadow-xl hover:bg-[#fbbf24] transition-all transform hover:scale-105 active:scale-95">
                     Create Affiliate Account Now
                  </button>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
