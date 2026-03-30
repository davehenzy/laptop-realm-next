"use client";

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="bg-[#f9fafb] min-h-screen py-8">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 md:px-8 mb-8">
        <nav className="flex text-sm text-gray-500 font-medium">
          <Link href="/" className="hover:text-[#333399]">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800">Contact Us</span>
        </nav>
      </div>

      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 animate-in slide-in-from-bottom-5 fade-in duration-500">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            Get in <span className="text-[#333399]">Touch</span>
          </h1>
          <p className="text-gray-600 text-lg">
            Have a question about our products, need technical support, or want to establish a corporate partnership? Our team is here to help!
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 mb-16">
          {/* Contact Information Cards */}
          <div className="w-full lg:w-1/3 grid gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow">
              <div className="bg-[#eef2ff] p-3 rounded-xl text-[#333399]">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">Our Location</h3>
                <p className="text-gray-600 leading-relaxed">
                  Computer Village, Ikeja<br />
                  Lagos, Nigeria
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow">
              <div className="bg-[#fee2e2] p-3 rounded-xl text-[#ef4444]">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">Phone Number</h3>
                <p className="text-gray-600 leading-relaxed mb-2">
                  Call us or chat on WhatsApp for quick responses to your inquiries.
                </p>
                <a href="tel:08034893890" className="text-lg font-bold text-[#ef4444] hover:underline">
                  0803 489 3890
                </a>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow">
              <div className="bg-[#fef3c7] p-3 rounded-xl text-[#d97706]">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">Email Address</h3>
                <p className="text-gray-600 leading-relaxed mb-1">
                  Drop us an email anytime and we'll get back to you within 24 hours.
                </p>
                <a href="mailto:SALES@LAPTOPREALM.COM" className="font-mono text-sm font-bold text-[#d97706] hover:underline">
                  SALES@LAPTOPREALM.COM
                </a>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow">
              <div className="bg-gray-100 p-3 rounded-xl text-gray-600">
                <Clock size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">Opening Hours</h3>
                <p className="text-gray-600 leading-relaxed">
                  Monday - Saturday: <span className="font-medium text-gray-900">8:00 AM - 6:00 PM</span><br/>
                  Sunday: <span className="font-medium text-gray-900">Closed</span>
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-gray-100 h-full">
              <div className="mb-8">
                <h2 className="text-2xl font-black text-gray-900 mb-2">Send us a Message</h2>
                <p className="text-gray-500">
                  Fill out the form below and our customer service team will assist you shortly.
                </p>
              </div>

              {isSuccess ? (
                <div className="bg-[#ecfdf5] border border-[#a7f3d0] rounded-xl p-8 text-center animate-in zoom-in-95 duration-300">
                  <div className="inline-flex bg-[#10b981] text-white rounded-full p-4 mb-4">
                    <Send size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-[#065f46] mb-2">Message Sent Successfully!</h3>
                  <p className="text-[#047857]">
                    Thank you for reaching out to Laptop Realm. We have received your message and will respond as soon as possible.
                  </p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="mt-6 font-bold text-[#10b981] hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-bold text-gray-700">Full Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#333399]/20 focus:border-[#333399] transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-bold text-gray-700">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#333399]/20 focus:border-[#333399] transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="block text-sm font-bold text-gray-700">Subject</label>
                    <input 
                      type="text" 
                      id="subject" 
                      name="subject" 
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#333399]/20 focus:border-[#333399] transition-colors"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-bold text-gray-700">Message</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#333399]/20 focus:border-[#333399] transition-colors resize-none"
                      placeholder="Please provide as much detail as possible..."
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className={`w-full py-4 rounded-lg font-bold text-white flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg ${
                      isSubmitting ? 'bg-[#333399]/80 cursor-wait' : 'bg-[#333399] hover:bg-[#262673]'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Map / Additional Section */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col md:flex-row relative">
            <div className="w-full md:w-1/2 p-8 md:p-12 z-10 bg-white">
               <h3 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Need Urgent Technical Support?</h3>
               <p className="text-gray-600 mb-6 leading-relaxed">
                  Our expert technicians are available to troubleshoot both hardware and software issues. We provide repair services for all major laptop brands, including screens, keyboards, battery replacements, and motherboard repairs.
               </p>
               <a 
                  href="https://wa.me/2348034893890?text=Hello,%20I%20have%20an%20urgent%20technical%20issue%20with%20my%20device." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-8 py-3 rounded-full transition-colors w-max"
               >
                  <MessageCircle size={20} />
                  Chat on WhatsApp
               </a>
            </div>
            <div className="w-full md:w-1/2 min-h-[350px] relative bg-gray-200">
               <iframe 
                 src="https://maps.google.com/maps?q=Computer+Village,+Ikeja,+Lagos,+Nigeria&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                 className="absolute inset-0 w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-500" 
                 allowFullScreen 
                 loading="lazy" 
                 referrerPolicy="no-referrer-when-downgrade"
               />
               <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none">
                  <div className="bg-white/95 backdrop-blur-sm px-6 py-3 rounded-lg shadow-lg border border-gray-200 text-center flex items-center gap-3">
                    <div className="bg-red-100 p-2 rounded-full">
                       <MapPin size={20} className="text-[#ef4444]" />
                    </div>
                    <div className="text-left">
                       <span className="font-bold text-gray-900 block leading-none">Laptop Realm Store</span>
                       <span className="text-xs text-gray-500 font-medium">Computer Village, Ikeja</span>
                    </div>
                  </div>
               </div>
            </div>
        </div>

      </div>
    </div>
  );
}
