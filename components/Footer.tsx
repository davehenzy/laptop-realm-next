import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1f2937] text-gray-400 text-sm mt-16">
      <div className="container mx-auto px-4 md:px-8 py-10">
        <div className="bg-white rounded-lg p-6 shadow-lg transform -translate-y-16 flex flex-col md:flex-row items-center justify-between gap-6 border-b-4 border-[#333399]">
          <div className="flex-1">
             <h3 className="text-[#333399] font-bold text-lg mb-2">Nationwide Delivery</h3>
             <p className="text-gray-600 text-xs leading-relaxed">
               Laptop Realm is one of the best Online Store to buy Laptops, Desktops, Printers, Servers, Gadgets and Accessories. 
               Laptop Realm is where you can buy Laptops, computer, Desktops, Printers, Gadgets, Servers and Accessories online dealing with all brands HP, Dell, Lenovo, Acer, Microsoft and so on.
             </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mt-4">
           {/* Contact */}
           <div className="lg:col-span-2">
             <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Whatsapp / Call Us Directly</h4>
             <p className="text-[#333399] text-2xl font-bold mb-2">08034893890</p>
             <p className="text-xs mb-4">Chat or call us directly using the number above.</p>
             <p className="text-xs mb-1"><span className="font-bold text-white">EMAIL SUPPORT:</span> sales@laptoprealm.com</p>
             <p className="text-xs mb-4"><span className="font-bold text-white">ADDRESS:</span><br/>No 1 Bashiru Oweh Street, Off Medical Road,<br/>Computer Village, Ikeja, Lagos, Nigeria</p>
             <p className="text-xs"><span className="font-bold text-white">Call Center Hours</span><br/>Mon-Sun 08:00-17:00</p>
           </div>

           {/* Categories */}
           <div>
             <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Trending Categories</h4>
             <ul className="space-y-2 text-xs flex flex-col items-start gap-1">
               <li><Link href="/shop" className="hover:text-white transition-colors">Computers</Link></li>
               <li><Link href="/shop" className="hover:text-white transition-colors">All Printers</Link></li>
               <li><Link href="/shop" className="hover:text-white transition-colors">Electronics</Link></li>
               <li><Link href="/shop" className="hover:text-white transition-colors">Home & Office Appliances</Link></li>
             </ul>
           </div>

           {/* Programs */}
           <div>
             <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Affiliate Programs</h4>
             <ul className="space-y-2 text-xs flex flex-col items-start gap-1">
               <li><Link href="/affiliate" className="hover:text-white transition-colors">Become an Affiliate</Link></li>
               <li><Link href="/affiliate/login" className="hover:text-white transition-colors">Affiliate Login</Link></li>
               <li><Link href="/affiliate" className="hover:text-white transition-colors">Affiliate TOS Page</Link></li>
               <li><Link href="/my-account" className="hover:text-white transition-colors">My Account</Link></li>
             </ul>
           </div>

            {/* Help */}
            <div>
             <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Help Desk</h4>
             <ul className="space-y-2 text-xs flex flex-col items-start gap-1">
               <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
               <li><Link href="/return-policy" className="hover:text-white transition-colors">Return Policy</Link></li>
               <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
               <li><Link href="/services" className="hover:text-white transition-colors">Our Services</Link></li>
               <li><Link href="/contact" className="hover:text-white transition-colors">Make Request</Link></li>
             </ul>
           </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-[#111827] py-6 border-t border-gray-800">
        <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          
          <div className="flex items-center space-x-4">
             <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">JOIN US ON</span>
             <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-[#333399] transition-all transform hover:scale-110 shadow-lg"><Facebook size={16} className="text-white"/></a>
             <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-[#333399] transition-all transform hover:scale-110 shadow-lg"><Twitter size={16} className="text-white"/></a>
             <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-[#333399] transition-all transform hover:scale-110 shadow-lg"><Instagram size={16} className="text-white"/></a>
             <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-[#333399] transition-all transform hover:scale-110 shadow-lg"><Youtube size={16} className="text-white"/></a>
          </div>

          <div className="flex items-center space-x-3">
             <button className="bg-white/5 border border-white/10 hover:bg-white/10 rounded-lg px-4 py-2 flex items-center transition-all">
                <div className="text-left ml-2">
                   <div className="text-[10px] text-gray-400 uppercase tracking-wide">Get it on</div>
                   <div className="text-sm font-bold text-white leading-tight">Google Play</div>
                </div>
             </button>
             <button className="bg-white/5 border border-white/10 hover:bg-white/10 rounded-lg px-4 py-2 flex items-center transition-all">
                <div className="text-left ml-2">
                   <div className="text-[10px] text-gray-400 uppercase tracking-wide">Download on the</div>
                   <div className="text-sm font-bold text-white leading-tight">App Store</div>
                </div>
             </button>
          </div>
        </div>
        
        <div className="container mx-auto px-4 md:px-8 mt-8 pt-8 border-t border-gray-800/50 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
           <p>© 2004 - 2026 LAPTOP REALM. All Rights Reserved. | Developed by TechRuum.com</p>
           <div className="flex space-x-4 mt-4 md:mt-0">
               <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4 opacity-50 hover:opacity-100 transition-opacity" loading="lazy" />
               <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg" alt="MasterCard" className="h-4 opacity-50 hover:opacity-100 transition-opacity" loading="lazy" />
               <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4 opacity-50 hover:opacity-100 transition-opacity" loading="lazy" />
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;