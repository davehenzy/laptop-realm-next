"use client";

import React from 'react';
import Link from 'next/link';
import { 
  History, 
  Target, 
  Users, 
  Award, 
  Globe, 
  ShieldCheck, 
  Server, 
  Cpu, 
  Monitor,
  ArrowRight,
  TrendingUp,
  MapPin,
  Clock,
  Phone
} from 'lucide-react';

export default function AboutPage() {
  const stats = [
    { label: "Founded In", value: "2004" },
    { label: "Active Customers", value: "250K+" },
    { label: "Products Sold", value: "1.2M+" },
    { label: "Brand Partners", value: "15+" }
  ];

  const coreValues = [
    {
      icon: <ShieldCheck className="text-[#333399]" size={28} />,
      title: "100% Originality",
      description: "We don't do 'equivalents'. Every single item is sourced directly from manufacturers or authorized distributors."
    },
    {
      icon: <Users className="text-[#333399]" size={28} />,
      title: "Expert Support",
      description: "Our staff at Ikeja Computer Village are not just sellers; they are certified tech consultants."
    },
    {
      icon: <Award className="text-[#333399]" size={28} />,
      title: "Warranty Guards",
      description: "Full manufacturer warranties applied to every laptop, printer, and server purchased from us."
    }
  ];

  const brandLogos = [
    { name: "HP", url: "https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg" },
    { name: "Dell", url: "https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg" },
    { name: "Lenovo", url: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Lenovo_logo_2015.svg" },
    { name: "Apple", url: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
    { name: "Microsoft", url: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
    { name: "Acer", url: "https://upload.wikimedia.org/wikipedia/commons/a/a7/Acer_Logo.svg" }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-[#333399] overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 -skew-x-12 transform translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#fbbf24]/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[#fbbf24] text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-sm">
                  <Globe size={14} /> Since 2004
               </div>
               <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight uppercase tracking-tight">
                  Nigeria's <br/>
                  <span className="text-[#fbbf24]">Laptop Portal</span> <br/>
                  For Two Decades.
               </h1>
               <p className="text-xl text-white/70 mb-10 leading-relaxed font-medium">
                  We started with a single shop in Ikeja. Today, we power the remote offices, classrooms, and creative studios of 250,000+ Nigerians.
               </p>
               <div className="flex flex-wrap gap-8">
                  {stats.map((stat, idx) => (
                    <div key={idx} className="flex flex-col">
                       <span className="text-3xl font-black text-white">{stat.value}</span>
                       <span className="text-[10px] text-white/50 font-bold uppercase tracking-widest mt-1">{stat.label}</span>
                    </div>
                  ))}
               </div>
            </div>
            <div className="lg:w-1/2 relative">
               <div className="bg-white/10 p-4 rounded-[40px] border border-white/10 backdrop-blur-sm transform rotate-3">
                  <img 
                    src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&h=600&fit=crop" 
                    alt="Laptop Realm Office" 
                    className="rounded-[32px] w-full shadow-2xl grayscale contrast-125 hover:grayscale-0 transition-all duration-700" 
                  />
               </div>
               <div className="absolute -bottom-8 -left-8 bg-[#fbbf24] p-8 rounded-3xl shadow-2xl border-4 border-white transform -rotate-6">
                  <Award className="text-[#333399] mb-2" size={32} />
                  <p className="text-gray-900 font-black text-sm uppercase tracking-tight leading-tight">ISO Certified <br/>Retailing excellence</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24">
         <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
               <div className="lg:w-1/2 order-2 lg:order-1">
                  <div className="grid grid-cols-2 gap-4">
                     <div className="bg-gray-50 p-8 rounded-3xl flex flex-col items-center text-center">
                        <Cpu className="text-[#333399] mb-4" size={32} />
                        <h4 className="font-bold text-gray-900 uppercase tracking-tight">Enterprise IT</h4>
                        <p className="text-xs text-gray-500 mt-2 font-medium">Server and Network solutions for SMEs.</p>
                     </div>
                     <div className="bg-[#fbbf24]/10 p-8 rounded-3xl flex flex-col items-center text-center mt-8">
                        <Monitor className="text-[#333399] mb-4" size={32} />
                        <h4 className="font-bold text-gray-900 uppercase tracking-tight">Retail Tech</h4>
                        <p className="text-xs text-gray-500 mt-2 font-medium">Laptops, desktops, and smart gadgets.</p>
                     </div>
                  </div>
               </div>
               <div className="lg:w-1/2 order-1 lg:order-2 space-y-6">
                  <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Our Journey</h2>
                  <p className="text-gray-600 leading-relaxed font-medium">
                     Founded in the heart of Computer Village, Lagos, Laptop Realm emerged from a simple observation: Nigerian tech buyers deserved more than just 'boxes'. They deserved authenticity, expert advice, and after-sales security.
                  </p>
                  <p className="text-gray-600 leading-relaxed font-medium">
                     Over the last 20 years, we've partnered with global tech giants to bring genuine, high-performance computing to the Nigerian market at competitive prices.
                  </p>
                  <div className="pt-4">
                     <button className="bg-[#333399] hover:bg-[#262673] text-white px-8 py-4 rounded-2xl font-black shadow-xl transition-all active:scale-[0.98] flex items-center gap-3">
                        Meet Our Team <ArrowRight size={18} />
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-gray-50 border-y border-gray-100">
         <div className="container mx-auto px-4 md:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
               <h2 className="text-3xl font-black text-gray-900 mb-4 uppercase tracking-tight">Our Core Values</h2>
               <p className="text-gray-500 font-medium">The principles that have kept us at the top for over two decades.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {coreValues.map((value, idx) => (
                  <div key={idx} className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 group hover:border-[#333399]/20 transition-all">
                     <div className="w-16 h-16 rounded-[20px] bg-gray-50 flex items-center justify-center mb-8 group-hover:rotate-12 transition-transform">
                        {value.icon}
                     </div>
                     <h3 className="text-xl font-black text-gray-900 mb-4 uppercase tracking-tight">{value.title}</h3>
                     <p className="text-gray-500 text-sm leading-relaxed font-medium">{value.description}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* Brand Partners - Infinite Scroll Effect */}
      <section className="py-24 overflow-hidden border-t border-gray-50">
         <div className="container mx-auto px-4 md:px-8 text-center mb-12">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.4em]">Authorized Retail Partners</h3>
         </div>
         
         <div className="relative flex overflow-hidden">
            <div className="flex animate-scroll whitespace-nowrap gap-12 md:gap-24 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700 items-center py-4">
               {/* First set of logos */}
               {brandLogos.map((brand, idx) => (
                  <img key={`b1-${idx}`} src={brand.url} alt={brand.name} className="h-8 md:h-12 w-auto object-contain flex-shrink-0" />
               ))}
               {/* Second set of logos for seamless loop */}
               {brandLogos.map((brand, idx) => (
                  <img key={`b2-${idx}`} src={brand.url} alt={brand.name} className="h-8 md:h-12 w-auto object-contain flex-shrink-0" />
               ))}
            </div>

            <style jsx>{`
               @keyframes scroll {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-50%); }
               }
               .animate-scroll {
                  animation: scroll 30s linear infinite;
                  width: max-content;
               }
               .animate-scroll:hover {
                  animation-play-state: paused;
               }
            `}</style>
         </div>
      </section>

      {/* Visit Us Section (Map CTA) */}
      <section className="py-20 bg-gray-900 overflow-hidden relative">
         <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
               <path d="M0 100 L100 0 L100 100 Z" fill="currentColor" className="text-[#333399]" />
            </svg>
         </div>
         <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
            <div className="max-w-2xl mx-auto">
               <h2 className="text-3xl md:text-5xl font-black text-white mb-8 uppercase tracking-tight leading-tight">Visit Nigeria's <br/> <span className="text-[#fbbf24]">Finest Tech Showroom</span></h2>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                     <MapPin className="text-[#fbbf24] mx-auto mb-4" size={24} />
                     <p className="text-white text-sm font-bold uppercase tracking-tight">Ikeja, Lagos</p>
                  </div>
                  <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                     <Clock className="text-[#fbbf24] mx-auto mb-4" size={24} />
                     <p className="text-white text-sm font-bold uppercase tracking-tight">Mon-Sun (8am-5pm)</p>
                  </div>
                  <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                     <Phone className="text-[#fbbf24] mx-auto mb-4" size={24} />
                     <p className="text-white text-sm font-bold uppercase tracking-tight">08034893890</p>
                  </div>
               </div>
               <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-10">No 1 Bashiru Oweh Street, Off Medical Road, Computer Village, Ikeja.</p>
               <button className="bg-[#fbbf24] hover:bg-yellow-500 text-gray-900 px-12 py-5 rounded-2xl font-black text-lg shadow-2xl transition-all hover:scale-105 active:scale-[0.98]">
                  Get Directions on Google Maps
               </button>
            </div>
         </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
         <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-4xl font-black text-gray-900 mb-6 uppercase tracking-tighter italic">Ready to Upgrade?</h2>
            <p className="text-gray-500 mb-10 font-medium">Browse our catalog of genuine laptops and printers today.</p>
            <div className="flex justify-center gap-4">
               <Link href="/shop" className="bg-[#333399] text-white px-8 py-4 rounded-xl font-black transition-all hover:shadow-xl active:scale-95">Discover Products</Link>
               <Link href="/contact" className="border border-gray-200 text-gray-900 px-8 py-4 rounded-xl font-black transition-all hover:bg-gray-50 active:scale-95">Contact Sales</Link>
            </div>
         </div>
      </section>
    </div>
  );
}
