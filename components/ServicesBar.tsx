import React from 'react';
import { CreditCard, RotateCcw, Truck, Headphones } from 'lucide-react';
import Link from 'next/link';

const ServicesBar: React.FC = () => {
  const services = [
    {
      icon: <CreditCard className="text-[#333399]" size={32} />,
      title: "Multiple Payment Option",
      desc: "We now support wallet pay, naira and dollar credit card via Payvib instant payment.",
      linkText: "Click To Signup Now",
      href: "#"
    },
    {
      icon: <RotateCcw className="text-[#333399]" size={32} />,
      title: "30 DAYS RETURN",
      desc: "If goods have problems",
      linkText: "Read Return Policy",
      href: "/return-policy"
    },
    {
      icon: <Truck className="text-[#333399]" size={32} />,
      title: "Order Tracking",
      desc: "Customer can now track the status of their purchase item via our website and mobile app.",
      linkText: "Start Tracking Now",
      href: "#"
    },
    {
      icon: <Headphones className="text-[#333399]" size={32} />,
      title: "24/7 SUPPORT",
      desc: "Dedicated support",
      linkText: "Contact Us",
      href: "/contact"
    }
  ];

  return (
    <div className="container mx-auto px-4 md:px-8 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-gray-100 p-6 rounded-lg border border-gray-200">
        {services.map((service, idx) => (
          <div key={idx} className="flex gap-4 items-start">
             <div className="p-2 bg-white rounded-full shadow-sm">
                {service.icon}
             </div>
             <div>
               <h4 className="font-bold text-gray-800 text-sm mb-1">{service.title}</h4>
               <p className="text-xs text-gray-500 leading-relaxed mb-1">{service.desc}</p>
               <Link 
                 href={service.href} 
                 className="text-xs text-[#333399] font-semibold hover:underline"
               >
                 {service.linkText}
               </Link>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesBar;