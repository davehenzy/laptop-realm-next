"use client";

import React from 'react';
import Link from 'next/link';
import { 
  Wrench, 
  Settings, 
  Truck, 
  RefreshCw, 
  Database, 
  Network, 
  ShieldCheck, 
  ArrowRight,
  Monitor,
  Cpu,
  Smartphone,
  CheckCircle2,
  Clock,
  PhoneCall,
  Laptop
} from 'lucide-react';

export default function ServicesPage() {
  const mainServices = [
    {
       icon: <Wrench className="text-white" size={32} />,
       title: "Repair & Maintenance",
       description: "From broken screens to motherboard repairs, our certified engineers handle it all with a 90-day guarantee.",
       color: "bg-blue-600",
       features: ["Parts Replacement", "Deep Cleaning", "OS Installation"]
    },
    {
       icon: <RefreshCw className="text-white" size={32} />,
       title: "Laptop Trade-In",
       description: "Swap your old working laptop for a brand new one. Instant valuation and transparent exchange rates.",
       color: "bg-emerald-600",
       features: ["Instant Evaluation", "Fair Pricing", "Same-day Swap"]
    },
    {
       icon: <Network className="text-white" size={32} />,
       title: "Enterprise Solutions",
       description: "Full-scale IT infrastructure setup for offices, including networking, servers, and surveillance.",
       color: "bg-purple-600",
       features: ["Server Setup", "CCTV Installation", "WLAN Optimization"]
    }
  ];

  const additionalServices = [
    {
       icon: <Database className="text-blue-500" size={24} />,
       title: "Data Recovery",
       description: "Recovering lost files from corrupted HDDs, SSDs, and external drives."
    },
    {
       icon: <ShieldCheck className="text-emerald-500" size={24} />,
       title: "Antivirus & Security",
       description: "Installation of premium security software and malware removal."
    },
    {
       icon: <Cpu className="text-orange-500" size={24} />,
       title: "Hardware Upgrades",
       description: "RAM and SSD upgrades to boost your existing machine's speed."
    },
    {
       icon: <Truck className="text-indigo-500" size={24} />,
       title: "Bulk Procurement",
       description: "Supplying bulk tech orders for schools, government, and corporate bodies."
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 border-b border-gray-100 overflow-hidden">
         <div className="absolute top-0 right-0 w-2/3 h-full bg-[#f9fafb] skew-x-12 transform translate-x-1/2"></div>
         <div className="container mx-auto px-4 md:px-8 relative z-10 flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 text-center lg:text-left">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#333399]/10 text-[#333399] text-[10px] font-black uppercase tracking-widest mb-6">
                  <Settings size={14} /> Full IT Ecosystem
               </div>
               <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 leading-tight uppercase tracking-tight">
                  More Than Just <br/>
                  <span className="text-[#333399]">Sales Agents.</span> <br/>
                  We Are Your <span className="underline decoration-[#fbbf24] decoration-8">Tech Team.</span>
               </h1>
               <p className="text-lg text-gray-500 mb-10 leading-relaxed font-medium">
                  At Laptop Realm, we combine world-class hardware with expert local support. Whether you're a single user or a massive corporation, our services scale with you.
               </p>
               <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                  <button className="bg-[#333399] hover:bg-[#262673] text-white px-10 py-4 rounded-2xl font-black text-lg shadow-xl shadow-[#333399]/20 transition-all active:scale-95 flex items-center gap-3">
                     Book an Appointment <ArrowRight size={20} />
                  </button>
               </div>
            </div>
            <div className="lg:w-1/2 relative">
               <div className="bg-white p-4 rounded-[40px] shadow-2xl border border-gray-100 relative z-20 overflow-hidden group">
                  <img 
                    src="https://images.unsplash.com/photo-1597733336794-12d05021d510?w=800&h=600&fit=crop" 
                    alt="Laptop Realm Services" 
                    className="rounded-[32px] w-full group-hover:scale-105 transition-transform duration-1000" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-12 opacity-0 group-hover:opacity-100 transition-opacity">
                     <p className="text-white text-xl font-black uppercase tracking-tight">On-Site Technical Team</p>
                     <p className="text-white/70 text-sm font-medium">Ready to serve you at Computer Village, Ikeja.</p>
                  </div>
               </div>
               <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#fbbf24] rounded-3xl -z-10 animate-pulse"></div>
            </div>
         </div>
      </section>

      {/* Main Core Services */}
      <section className="py-24">
         <div className="container mx-auto px-4 md:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
               <h2 className="text-3xl font-black text-gray-900 mb-4 uppercase tracking-tight">Core Services</h2>
               <p className="text-gray-500 font-medium">Professional grade solutions for every technology need.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               {mainServices.map((service, idx) => (
                  <div key={idx} className="bg-white border border-gray-100 rounded-[40px] p-10 hover:shadow-2xl hover:border-[#333399]/10 transition-all group">
                     <div className={`w-20 h-20 ${service.color} rounded-3xl flex items-center justify-center mb-8 shadow-lg shadow-gray-200 group-hover:-translate-y-2 group-hover:rotate-6 transition-all duration-500`}>
                        {service.icon}
                     </div>
                     <h3 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-tight leading-tight">{service.title}</h3>
                     <p className="text-gray-500 text-sm leading-relaxed mb-8 font-medium">{service.description}</p>
                     <div className="space-y-3 pt-6 border-t border-gray-100">
                        {service.features.map((feature, fidx) => (
                          <div key={fidx} className="flex items-center gap-3">
                             <CheckCircle2 size={16} className="text-emerald-500" />
                             <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{feature}</span>
                          </div>
                        ))}
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* Additional Services Grid */}
      <section className="py-24 bg-gray-50 border-y border-gray-100">
         <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
               <div className="max-w-xl">
                  <h3 className="text-xs font-black text-[#333399] uppercase tracking-[0.4em] mb-4">The Support Hub</h3>
                  <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Comprehensive Technical Care</h2>
               </div>
               <Link href="/contact" className="text-sm font-black text-[#333399] uppercase tracking-widest border-b-2 border-[#333399] pb-1 hover:border-[#fbbf24] transition-all">View All Capabilities</Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
               {additionalServices.map((item, idx) => (
                  <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-100 hover:-translate-y-1 transition-all">
                     <div className="mb-6 w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center">
                        {item.icon}
                     </div>
                     <h4 className="font-bold text-gray-900 mb-3 uppercase tracking-tight">{item.title}</h4>
                     <p className="text-xs text-gray-500 leading-relaxed font-medium">{item.description}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* Service Stats / Trust */}
      <section className="py-24">
         <div className="container mx-auto px-4 md:px-8">
            <div className="bg-gray-900 rounded-[64px] p-12 lg:p-20 text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                     <path d="M0 100 L100 0 L100 100 Z" fill="currentColor" className="text-[#333399]" />
                  </svg>
               </div>
               
               <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16">
                  <div className="lg:w-1/2">
                     <h2 className="text-3xl md:text-5xl font-black mb-8 uppercase tracking-tight leading-tight">Fastest Repairs <br/> <span className="text-[#fbbf24]">In West Africa.</span></h2>
                     <p className="text-white/60 mb-12 text-lg leading-relaxed font-medium">
                        Our technicians are trained by the brands we sell. We use only original spare parts and the most advanced diagnostic equipment available today.
                     </p>
                     <div className="grid grid-cols-2 gap-8">
                        <div>
                           <div className="text-4xl font-black text-[#fbbf24] mb-2">48H</div>
                           <p className="text-[10px] font-bold text-white/50 uppercase tracking-[0.3em]">Avg Turnover</p>
                        </div>
                        <div>
                           <div className="text-4xl font-black text-[#fbbf24] mb-2">90D</div>
                           <p className="text-[10px] font-bold text-white/50 uppercase tracking-[0.3em]">Warranty Period</p>
                        </div>
                     </div>
                  </div>
                  <div className="lg:w-1/2 bg-white/5 border border-white/10 rounded-[48px] p-12 backdrop-blur-sm">
                     <h4 className="text-xl font-black mb-8 uppercase tracking-tight">Contact Technical Support</h4>
                     <div className="space-y-6">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 bg-[#fbbf24] rounded-2xl flex items-center justify-center text-gray-900"><PhoneCall size={24} /></div>
                           <div>
                              <p className="text-xs font-bold text-white/50 uppercase tracking-widest mb-1">Call Our Hotline</p>
                              <p className="text-lg font-black tracking-tight">08034893890</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 bg-white/10 border border-white/10 rounded-2xl flex items-center justify-center text-white"><Clock size={24} /></div>
                           <div>
                              <p className="text-xs font-bold text-white/50 uppercase tracking-widest mb-1">Wait Time (Avg)</p>
                              <p className="text-lg font-black tracking-tight">Less than 5 minutes</p>
                           </div>
                        </div>
                        <div className="pt-6">
                           <button className="w-full bg-white text-gray-900 py-4 rounded-2xl font-black text-lg shadow-xl shadow-white/5 transition-all hover:bg-[#fbbf24] active:scale-95">Open Support Ticket</button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 text-center">
         <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-4xl font-black text-gray-900 mb-6 uppercase tracking-tight">Hardware Is Only Half <br/> Of the Story.</h2>
            <p className="text-gray-500 mb-10 font-medium">Trust Laptop Realm for the expert support your technology deserves.</p>
            <div className="flex justify-center gap-4">
               <Link href="/contact" className="bg-[#333399] text-white px-10 py-4 rounded-xl font-black shadow-xl transition-all hover:-translate-y-1 active:scale-95">Request a Quote</Link>
            </div>
         </div>
      </section>
    </div>
  );
}
