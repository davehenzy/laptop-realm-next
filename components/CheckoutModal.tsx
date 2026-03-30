"use client";

import React, { useState } from 'react';
import { X, CheckCircle, CreditCard, Loader2 } from 'lucide-react';
import { optimizeImage } from '../constants';
import { useAppContext } from '../context/AppContext';

declare global {
  interface Window {
    PaystackPop: any;
  }
}

const CheckoutModal: React.FC = () => {
  const { isCheckoutOpen, setIsCheckoutOpen, cart, clearCart } = useAppContext();
  
  const [step, setStep] = useState<'details' | 'processing' | 'success'>('details');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  if (!isCheckoutOpen) return null;

  const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const formatter = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePaystackPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');

    const tax = 0.075;
    const finalAmount = total * (1 + tax);
    const amountInKobo = Math.ceil(finalAmount * 100);

    if (window.PaystackPop) {
      const handler = window.PaystackPop.setup({
        key: 'pk_test_7497d232c0c237c0408a19cd95a8a6a2529764b8', 
        email: formData.email,
        amount: amountInKobo,
        currency: 'NGN',
        ref: '' + Math.floor((Math.random() * 1000000000) + 1),
        metadata: {
          custom_fields: [
            {
              display_name: "Customer Name",
              variable_name: "customer_name",
              value: formData.name
            },
            {
              display_name: "Phone Number",
              variable_name: "phone_number",
              value: formData.phone
            },
            {
              display_name: "Delivery Address",
              variable_name: "delivery_address",
              value: formData.address
            }
          ]
        },
        callback: function(response: any) {
          console.log('Payment complete', response);
          setStep('success');
          setTimeout(() => {
             clearCart();
          }, 2000);
        },
        onClose: function() {
          setStep('details');
          alert('Transaction was not completed, window closed.');
        }
      });
      handler.openIframe();
    } else {
      alert("Paystack SDK not loaded. Please check your internet connection.");
      setStep('details');
    }
  };

  const handleClose = () => {
    if (step === 'success') {
      setStep('details');
      setFormData({ name: '', email: '', phone: '', address: '' });
      setIsCheckoutOpen(false);
      clearCart();
    } else {
      setIsCheckoutOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[1200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={step !== 'processing' ? handleClose : undefined} />
      
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]">
        {step !== 'success' && (
           <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50">
             <h2 className="text-2xl font-black text-[#333399]">Checkout</h2>
             <button onClick={handleClose} disabled={step === 'processing'} className="p-2 hover:bg-gray-200 rounded-full text-gray-500 transition-colors">
               <X size={20} />
             </button>
           </div>
        )}

        <div className="flex-1 overflow-y-auto">
          {step === 'details' && (
            <div className="flex flex-col md:flex-row h-full">
              <div className="p-6 md:w-3/5 space-y-6">
                <h3 className="font-bold text-gray-800 border-b pb-2">Shipping Information</h3>
                <form id="checkout-form" onSubmit={handlePaystackPayment} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Full Name</label>
                    <input 
                      required name="name" type="text" value={formData.name} onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded p-2 text-sm focus:border-[#333399] outline-none bg-white" placeholder="John Doe" 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Email</label>
                      <input 
                        required name="email" type="email" value={formData.email} onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded p-2 text-sm focus:border-[#333399] outline-none bg-white" placeholder="john@example.com" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Phone</label>
                      <input 
                        required name="phone" type="tel" value={formData.phone} onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded p-2 text-sm focus:border-[#333399] outline-none bg-white" placeholder="080..." 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Delivery Address</label>
                    <textarea 
                      required name="address" rows={3} value={formData.address} onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded p-2 text-sm focus:border-[#333399] outline-none resize-none bg-white" placeholder="Enter your full address" 
                    />
                  </div>
                  
                  <div className="pt-4">
                    <h3 className="font-bold text-gray-800 border-b pb-2 mb-4">Payment Method</h3>
                    <div className="flex gap-4">
                       <div className="flex-1 border-2 border-[#333399] bg-blue-50 p-3 rounded-lg flex flex-col items-center justify-center cursor-pointer relative">
                          <div className="absolute top-2 right-2 w-3 h-3 bg-[#333399] rounded-full"></div>
                          <CreditCard className="text-[#333399] mb-1" />
                          <span className="text-xs font-bold text-[#333399]">Pay with Paystack</span>
                       </div>
                       <div className="flex-1 border border-gray-200 p-3 rounded-lg flex flex-col items-center justify-center cursor-pointer opacity-50 hover:opacity-100">
                          <span className="font-bold text-gray-500">Pay on Delivery</span>
                          <span className="text-[10px] text-gray-400">Not available for your location</span>
                       </div>
                    </div>
                  </div>
                </form>
              </div>

              <div className="bg-gray-50 p-6 md:w-2/5 border-l border-gray-100 flex flex-col">
                 <h3 className="font-bold text-gray-800 mb-4">Order Summary</h3>
                 <div className="flex-1 overflow-y-auto max-h-[300px] pr-2 space-y-3 mb-4 custom-scrollbar">
                    {cart.map(item => (
                       <div key={item.product.id} className="flex gap-3">
                          <div className="w-12 h-12 bg-white rounded border border-gray-200 flex-shrink-0">
                             <img src={optimizeImage(item.product.image, 100)} className="w-full h-full object-contain p-0.5" />
                          </div>
                          <div className="flex-1 min-w-0">
                             <p className="text-xs font-bold text-gray-800 line-clamp-2">{item.product.title}</p>
                             <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                          </div>
                          <div className="text-xs font-bold text-gray-800">
                             {formatter.format(item.product.price * item.quantity)}
                          </div>
                       </div>
                    ))}
                 </div>
                 
                 <div className="border-t border-gray-200 pt-4 space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                       <span>Subtotal</span>
                       <span>{formatter.format(total)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                       <span>Tax (7.5%)</span>
                       <span>{formatter.format(total * 0.075)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-black text-gray-900 pt-2 border-t border-gray-200">
                       <span>Total</span>
                       <span>{formatter.format(total * 1.075)}</span>
                    </div>
                 </div>
              </div>
            </div>
          )}

          {step === 'processing' && (
            <div className="flex flex-col items-center justify-center p-12 text-center h-full min-h-[400px]">
               <Loader2 size={48} className="text-[#333399] animate-spin mb-4" />
               <h3 className="text-2xl font-bold text-gray-800 mb-2">Processing Payment...</h3>
               <p className="text-gray-500 max-w-sm">Please complete the payment in the Paystack window. Do not close this modal.</p>
            </div>
          )}

          {step === 'success' && (
            <div className="flex flex-col items-center justify-center text-center p-12 bg-white rounded-2xl h-full min-h-[400px]">
               <div className="rounded-full bg-green-100 p-4 mb-6">
                 <CheckCircle size={64} className="text-green-500" />
               </div>
               <h3 className="text-3xl font-black text-gray-800 mb-2">Order Successful!</h3>
               <p className="text-gray-500 mb-8 max-w-sm">
                 Thank you, {formData.name}. Your order has been placed successfully. A confirmation email has been sent to {formData.email}.
               </p>
               <button 
                 onClick={handleClose}
                 className="bg-[#333399] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#262673] transition-colors"
               >
                 Continue Shopping
               </button>
            </div>
          )}
        </div>

        {step === 'details' && (
          <div className="p-6 border-t border-gray-100 bg-white sticky bottom-0 z-20">
             <button 
                type="submit" 
                form="checkout-form"
                onClick={handlePaystackPayment}
                className="w-full bg-[#333399] hover:bg-[#262673] text-white py-4 rounded-lg font-black text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex justify-center items-center"
             >
                Pay {formatter.format(total * 1.075)}
             </button>
             <p className="text-center text-xs text-gray-400 mt-3 flex items-center justify-center gap-1">
                Secured by <span className="font-bold text-[#0BA4DB]">Paystack</span>
             </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;