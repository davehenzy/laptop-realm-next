"use client";

import React from 'react';
import Link from 'next/link';
import { 
  RefreshCcw, 
  Clock, 
  ShieldCheck, 
  ClipboardCheck, 
  MessageSquare,
  AlertTriangle,
  FileText,
  Truck,
  HelpCircle,
  ArrowRight
} from 'lucide-react';

export default function ReturnPolicyPage() {
  const highlights = [
    {
      icon: <Clock className="text-[#333399]" size={24} />,
      title: "7-Day Return Window",
      description: "You have 7 working days from the date of delivery to initiate a return for eligible items."
    },
    {
      icon: <ShieldCheck className="text-[#333399]" size={24} />,
      title: "Full Refund / Replace",
      description: "Get a full refund to your original payment method or an instant replacement for defective units."
    },
    {
      icon: <ClipboardCheck className="text-[#333399]" size={24} />,
      title: "Easy Process",
      description: "Simple online request followed by a quick inspection at our service center."
    }
  ];

  const steps = [
    {
      num: "01",
      title: "Initiate Request",
      description: "Visit our 'Contact Us' page or call 08034893890 within 7 days of receiving your order."
    },
    {
      num: "02",
      title: "Validation",
      description: "Our support team will verify your claim and provide a return authorization code."
    },
    {
      num: "03",
      title: "Drop-off / Pickup",
      description: "Drop the item at our Ikeja office or we can arrange a pickup (charges may apply for non-defective items)."
    },
    {
      num: "04",
      title: "Inspection",
      description: "Our technical team inspects the unit to ensure it's in original condition with all accessories."
    },
    {
      num: "05",
      title: "Resolution",
      description: "Refund or replacement is processed within 48-72 hours after successful inspection."
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="bg-gray-50 border-b border-gray-100 py-20 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-[#333399]/5 rounded-full -mr-32 -mt-32"></div>
         <div className="container mx-auto px-4 md:px-8 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#333399]/10 text-[#333399] text-[10px] font-black uppercase tracking-widest mb-4">
               <RefreshCcw size={14} /> Shop With Confidence
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 uppercase tracking-tight">Return & Refund Policy</h1>
            <p className="text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">
               At Laptop Realm, customer satisfaction is our priority. If you're not entirely satisfied with your purchase, we're here to help.
            </p>
         </div>
      </section>

      {/* Highlights */}
      <section className="py-16 -mt-12 relative z-20">
         <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {highlights.map((item, idx) => (
                  <div key={idx} className="bg-white p-8 rounded-2xl shadow-xl border border-gray-50 flex flex-col items-center text-center group hover:border-[#333399]/20 transition-all">
                     <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        {item.icon}
                     </div>
                     <h3 className="text-lg font-black text-gray-900 mb-3 uppercase tracking-tight">{item.title}</h3>
                     <p className="text-gray-500 text-sm leading-relaxed font-medium">{item.description}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* Detailed Content */}
      <section className="py-20">
         <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col lg:flex-row gap-16">
               {/* Left column - Policy Details */}
               <div className="lg:w-2/3 space-y-12">
                  <div className="space-y-6">
                     <div className="flex items-center gap-3">
                        <div className="w-1 h-8 bg-[#333399] rounded-full"></div>
                        <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">1. Eligibility</h2>
                     </div>
                     <p className="text-gray-600 leading-relaxed">
                        To be eligible for a return, your item must meet the following criteria:
                     </p>
                     <ul className="space-y-4">
                        <li className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                           <CheckCircle2 className="text-emerald-500 flex-shrink-0" size={20} />
                           <p className="text-sm font-medium text-gray-700">The item must be in the same condition that you received it.</p>
                        </li>
                        <li className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                           <CheckCircle2 className="text-emerald-500 flex-shrink-0" size={20} />
                           <p className="text-sm font-medium text-gray-700">It must be in the original packaging, including all manuals, cables, and accessories.</p>
                        </li>
                        <li className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                           <CheckCircle2 className="text-emerald-500 flex-shrink-0" size={20} />
                           <p className="text-sm font-medium text-gray-700">Proof of purchase (invoice or receipt) is required.</p>
                        </li>
                     </ul>
                  </div>

                  <div className="space-y-6">
                     <div className="flex items-center gap-3">
                        <div className="w-1 h-8 bg-[#333399] rounded-full"></div>
                        <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">2. Non-Returnable Items</h2>
                     </div>
                     <div className="bg-amber-50 border border-amber-100 p-6 rounded-2xl flex gap-4">
                        <AlertTriangle className="text-amber-500 flex-shrink-0" size={24} />
                        <div>
                           <h4 className="font-bold text-amber-900 mb-2">Important Notice</h4>
                           <p className="text-sm text-amber-800/80 leading-relaxed font-medium">
                              Certain items cannot be returned for health and licensing reasons once opened:
                           </p>
                           <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold text-amber-900/60 uppercase tracking-wider">
                              <li>• Software Licenses / Product Keys</li>
                              <li>• In-ear Headphones / Earpods</li>
                              <li>• Consumables (Printer Ink/Toner)</li>
                              <li>• Items with physical damage</li>
                           </ul>
                        </div>
                     </div>
                  </div>

                  <div className="space-y-6">
                     <div className="flex items-center gap-3">
                        <div className="w-1 h-8 bg-[#333399] rounded-full"></div>
                        <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">3. Refund Timeline</h2>
                     </div>
                     <p className="text-gray-600 leading-relaxed">
                        Once we receive and inspect your return, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed:
                     </p>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-6 border border-gray-100 rounded-2xl">
                           <h4 className="font-black text-gray-900 mb-2 uppercase text-sm">Bank Transfer</h4>
                           <p className="text-xs text-gray-500 font-medium tracking-wide">3 - 5 Business Days</p>
                        </div>
                        <div className="p-6 border border-gray-100 rounded-2xl">
                           <h4 className="font-black text-gray-900 mb-2 uppercase text-sm">Store Credit</h4>
                           <p className="text-xs text-gray-500 font-medium tracking-wide">Instant after Approval</p>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Right column - Process Timeline */}
               <div className="lg:w-1/3">
                  <div className="bg-gray-900 rounded-3xl p-8 sticky top-32">
                     <h3 className="text-xl font-black text-white mb-8 uppercase tracking-tight">The Return Process</h3>
                     <div className="space-y-8 relative">
                        <div className="absolute top-0 left-6 h-full w-px bg-white/10 -z-0"></div>
                        {steps.map((step, idx) => (
                           <div key={idx} className="flex gap-6 relative z-10">
                              <div className="w-12 h-12 bg-white rounded-xl flex-shrink-0 flex items-center justify-center font-black text-[#333399] shadow-lg">
                                 {step.num}
                              </div>
                              <div>
                                 <h4 className="font-bold text-white mb-1 uppercase tracking-tight text-sm">{step.title}</h4>
                                 <p className="text-xs text-white/50 leading-relaxed">{step.description}</p>
                              </div>
                           </div>
                        ))}
                     </div>
                     
                     <div className="mt-12 pt-8 border-t border-white/10">
                        <Link href="/contact" className="w-full bg-[#fbbf24] hover:bg-yellow-500 text-gray-900 py-4 rounded-xl font-black text-center block transition-all active:scale-[0.98]">
                           Start a Return
                        </Link>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Support CTA */}
      <section className="py-20 bg-gray-50">
         <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-4xl mx-auto rounded-[32px] overflow-hidden flex flex-col md:flex-row">
               <div className="md:w-1/2 bg-[#333399] p-10 text-white">
                  <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">Need Urgent Help?</h3>
                  <p className="text-white/70 mb-8 font-medium italic">Our support team is available Mon-Sat (8am - 5pm) to resolve any issues with your order.</p>
                  <div className="space-y-4">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center"><Truck size={18} /></div>
                        <div>
                           <p className="text-[10px] uppercase font-black text-white/40 tracking-widest">Logistics Support</p>
                           <p className="font-bold">08034893890</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center"><MessageSquare size={18} /></div>
                        <div>
                           <p className="text-[10px] uppercase font-black text-white/40 tracking-widest">Chat on WhatsApp</p>
                           <p className="font-bold">08034893890</p>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="md:w-1/2 bg-white border border-gray-100 p-10 flex flex-col justify-center">
                  <h4 className="text-lg font-black text-gray-900 mb-4 uppercase tracking-tight">Check Order Status</h4>
                  <p className="text-gray-500 text-sm mb-8 font-medium leading-relaxed">You can also track your return progress or view your order details directly in your account dashboard.</p>
                  <Link href="/my-account" className="inline-flex items-center gap-2 text-[#333399] font-black uppercase tracking-widest text-xs h-10 group">
                     Go to My Account <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
               </div>
            </div>
            
            <div className="text-center mt-12 text-gray-400 text-[10px] font-bold uppercase tracking-[0.3em]">
               Last Updated: March 2026
            </div>
         </div>
      </section>
    </div>
  );
}

const CheckCircle2 = ({ className, size }: { className?: string, size?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size || 24} 
    height={size || 24} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/>
  </svg>
);
