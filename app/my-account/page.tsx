"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  User, 
  Package, 
  MapPin, 
  Settings, 
  LogOut, 
  LayoutDashboard, 
  ChevronRight, 
  Eye, 
  Lock, 
  Mail,
  Smartphone,
  CheckCircle2,
  Clock,
  AlertCircle,
  Heart,
  ArrowRightLeft,
  Users,
  DollarSign,
  TrendingUp
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

export default function MyAccountPage() {
  const { wishlist, cart, compareList } = useAppContext();
  const [isMounted, setIsMounted] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Mock Data
  const USER = {
    name: "Dave Henzy",
    email: "dave@example.com",
    phone: "08034893890",
    joinDate: "March 2024"
  };

  const ORDERS = [
    { id: '#LR-98231', date: 'March 15, 2024', status: 'Delivered', total: '₦450,000', items: 1 },
    { id: '#LR-97150', date: 'February 28, 2024', status: 'Processing', total: '₦125,500', items: 2 },
    { id: '#LR-96022', date: 'January 10, 2024', status: 'Cancelled', total: '₦85,000', items: 1 }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab('dashboard');
  };

  if (!isLoggedIn) {
    return (
      <div className="bg-[#f9fafb] min-h-screen py-16 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
           <div className="bg-[#333399] p-8 text-center text-white relative">
              <div className="absolute top-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mt-12"></div>
              <h2 className="text-2xl font-black mb-2 uppercase tracking-tight">
                {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-white/70 text-sm font-medium">
                {authMode === 'login' ? 'Login to manage your orders and profile' : 'Join Laptop Realm for exclusive tech deals'}
              </p>
           </div>
           
           <div className="p-8">
              <div className="flex bg-gray-100 p-1 rounded-xl mb-8">
                 <button 
                   onClick={() => setAuthMode('login')}
                   className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${authMode === 'login' ? 'bg-white text-[#333399] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                 >
                   Log In
                 </button>
                 <button 
                   onClick={() => setAuthMode('register')}
                   className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${authMode === 'register' ? 'bg-white text-[#333399] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                 >
                   Register
                 </button>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                 {authMode === 'register' && (
                    <div className="space-y-1">
                       <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Full Name</label>
                       <div className="relative">
                          <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input 
                            type="text" 
                            required
                            placeholder="Full Name" 
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#333399] focus:bg-white transition-all text-sm"
                          />
                       </div>
                    </div>
                 )}
                 
                 <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Email Address</label>
                    <div className="relative">
                       <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                       <input 
                         type="email" 
                         required
                         placeholder="your@email.com" 
                         className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#333399] focus:bg-white transition-all text-sm"
                       />
                    </div>
                 </div>

                 <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Password</label>
                    <div className="relative">
                       <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                       <input 
                         type={showPassword ? "text" : "password"} 
                         required
                         placeholder="••••••••" 
                         className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#333399] focus:bg-white transition-all text-sm"
                       />
                       <button 
                         type="button" 
                         onClick={() => setShowPassword(!showPassword)}
                         className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#333399] transition-colors"
                        >
                          <Eye size={18} />
                       </button>
                    </div>
                 </div>

                 {authMode === 'login' && (
                    <div className="flex justify-end">
                       <Link href="#" className="text-xs font-bold text-[#333399] hover:underline">Forgot Password?</Link>
                    </div>
                 )}

                 <button 
                   type="submit" 
                   className="w-full bg-[#fbbf24] hover:bg-yellow-500 text-gray-900 font-bold py-3.5 rounded-xl shadow-lg transition-all active:scale-[0.98] mt-4"
                 >
                   {authMode === 'login' ? 'Log In to Account' : 'Create My Account'}
                 </button>
              </form>

              <div className="mt-8 flex items-center justify-center gap-2">
                 <div className="h-px bg-gray-200 flex-1"></div>
                 <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">Help</span>
                 <div className="h-px bg-gray-200 flex-1"></div>
              </div>

              <p className="text-center mt-6 text-xs text-gray-500 leading-relaxed">
                By signing in, I agree to Laptop Realm's <Link href="#" className="text-[#333399] font-bold">Terms of Use</Link> and <Link href="#" className="text-[#333399] font-bold">Privacy Policy</Link>.
              </p>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f9fafb] min-h-screen pb-16">
      {/* Header Overlay */}
      <div className="bg-[#333399] text-white pt-16 pb-28 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
           <h1 className="text-3xl font-black uppercase tracking-tight mb-2">My Account</h1>
           <p className="text-white/70 font-medium">Hello, {USER.name} 👋 Welcome back to your dashboard.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 -mt-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Navigation */}
          <aside className="w-full lg:w-1/4 xl:w-1/5 space-y-4">
             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <nav className="p-2 space-y-1">
                   {[
                     { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
                     { id: 'orders', label: 'My Orders', icon: <Package size={20} /> },
                     { id: 'affiliate', label: 'Affiliate Dashboard', icon: <Users size={20} /> },
                     { id: 'addresses', label: 'Addresses', icon: <MapPin size={20} /> },
                     { id: 'settings', label: 'Account Details', icon: <Settings size={20} /> }
                   ].map((item) => (
                     <button 
                       key={item.id}
                       onClick={() => setActiveTab(item.id)}
                       className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm ${activeTab === item.id ? 'bg-[#eef2ff] text-[#333399]' : 'text-gray-500 hover:bg-gray-50'}`}
                     >
                       {item.icon}
                       {item.label}
                       <ChevronRight size={16} className={`ml-auto opacity-0 ${activeTab === item.id ? 'opacity-100' : ''}`} />
                     </button>
                   ))}
                   <div className="h-px bg-gray-100 my-2"></div>
                   <button 
                     onClick={handleLogout}
                     className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm text-red-500 hover:bg-red-50"
                   >
                     <LogOut size={20} />
                     Logout
                   </button>
                </nav>
             </div>

             {/* Support Card */}
             <div className="bg-gradient-to-br from-gray-900 to-[#262673] rounded-2xl p-6 text-white shadow-xl">
                <h4 className="font-bold flex items-center gap-2 mb-2">
                   <AlertCircle size={18} className="text-[#fbbf24]" />
                   Need Help?
                </h4>
                <p className="text-white/60 text-xs mb-4 leading-relaxed">Our support team is available 24/7 if you have issues with your orders.</p>
                <div className="space-y-3">
                   <div className="flex items-center gap-2 text-sm font-bold">
                      <Mail size={16} className="text-[#fbbf24]" /> 
                      support@laptoprealm.com
                   </div>
                   <div className="flex items-center gap-2 text-sm font-bold">
                      <Smartphone size={16} className="text-[#fbbf24]" /> 
                      0803 489 3890
                   </div>
                </div>
             </div>
          </aside>

          {/* Main Workspace */}
          <main className="flex-1 space-y-6">
             
             {activeTab === 'dashboard' && (
                <div className="space-y-6">
                   {/* Overview Stats */}
                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 group">
                         <div className="w-12 h-12 rounded-xl bg-[#eef2ff] flex items-center justify-center text-[#333399] group-hover:bg-[#333399] group-hover:text-white transition-all">
                            <Package size={24} />
                         </div>
                         <div>
                            <p className="text-2xl font-black text-gray-900 leading-none mb-1">03</p>
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Total Orders</p>
                         </div>
                      </div>
                      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 group">
                         <div className="w-12 h-12 rounded-xl bg-[#fffbeb] flex items-center justify-center text-[#d97706] group-hover:bg-[#d97706] group-hover:text-white transition-all">
                            <Clock size={24} />
                         </div>
                         <div>
                            <p className="text-2xl font-black text-gray-900 leading-none mb-1">01</p>
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Pending Orders</p>
                         </div>
                      </div>
                      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 group cursor-pointer hover:border-[#333399]/30 transition-colors" onClick={() => setActiveTab('wishlist' as any)}>
                         <div className="w-12 h-12 rounded-xl bg-[#fef2f2] flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all">
                            <Heart size={24} />
                         </div>
                         <div>
                            <p className="text-2xl font-black text-gray-900 leading-none mb-1">{isMounted ? wishlist.length : 0}</p>
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">In Wishlist</p>
                         </div>
                      </div>
                      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 group cursor-pointer hover:border-[#333399]/30 transition-colors" onClick={() => window.location.href = '/compare'}>
                         <div className="w-12 h-12 rounded-xl bg-[#ecfdf5] flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                            <ArrowRightLeft size={24} />
                         </div>
                         <div>
                            <p className="text-2xl font-black text-gray-900 leading-none mb-1">{isMounted ? compareList.length : 0}</p>
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">To Compare</p>
                         </div>
                      </div>
                   </div>

                   {/* Greeting Card */}
                   <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                      <h3 className="text-xl font-black text-gray-900 mb-4">Hello {USER.name.split(' ')[0]}!</h3>
                      <p className="text-gray-600 leading-relaxed mb-6">
                        From your account dashboard you can view your <button onClick={() => setActiveTab('orders')} className="text-[#333399] font-bold hover:underline">recent orders</button>, 
                        manage your <button onClick={() => setActiveTab('addresses')} className="text-[#333399] font-bold hover:underline">shipping and billing addresses</button>, 
                        and <button onClick={() => setActiveTab('settings')} className="text-[#333399] font-bold hover:underline">edit your password and account details</button>.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Member Since</h4>
                            <p className="font-bold text-gray-800">{USER.joinDate}</p>
                         </div>
                         <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Email Identity</h4>
                            <p className="font-bold text-gray-800">{USER.email}</p>
                         </div>
                      </div>
                   </div>
                </div>
             )}

             {activeTab === 'orders' && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                   <div className="p-6 border-b border-gray-100 bg-gray-50">
                      <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">Recent Orders</h3>
                   </div>
                   <div className="overflow-x-auto">
                      <table className="w-full text-left">
                         <thead>
                            <tr className="bg-gray-50/50 text-xs font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
                               <th className="px-6 py-4">Order ID</th>
                               <th className="px-6 py-4">Date</th>
                               <th className="px-6 py-4">Status</th>
                               <th className="px-6 py-4">Total</th>
                               <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-gray-100">
                            {ORDERS.map((order) => (
                               <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                  <td className="px-6 py-5 font-bold text-gray-900">{order.id}</td>
                                  <td className="px-6 py-5 text-sm text-gray-600 font-medium">{order.date}</td>
                                  <td className="px-6 py-5">
                                     <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                       order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                                       order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                                       'bg-red-100 text-red-700'
                                     }`}>
                                        {order.status}
                                     </span>
                                  </td>
                                  <td className="px-6 py-5 text-sm font-black text-[#333399]">{order.total}</td>
                                  <td className="px-6 py-5 text-right">
                                     <button className="bg-[#eef2ff] text-[#333399] px-4 py-2 rounded-lg text-xs font-bold hover:bg-[#333399] hover:text-white transition-all">
                                        View Details
                                     </button>
                                  </td>
                               </tr>
                            ))}
                         </tbody>
                      </table>
                   </div>
                </div>
             )}

             {activeTab === 'addresses' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-4">
                      <div className="flex items-center justify-between">
                         <h3 className="text-lg font-black text-gray-900 uppercase">Billing Address</h3>
                         <button className="text-[#333399] font-bold text-sm hover:underline">Edit</button>
                      </div>
                      <div className="text-sm text-gray-600 leading-relaxed font-medium">
                         <p className="font-black text-gray-900 mb-1">{USER.name}</p>
                         <p>No 1 Bashiru Oweh Street</p>
                         <p>Off Medical Road, Computer Village</p>
                         <p>Ikeja, Lagos, 100001</p>
                         <p>Nigeria</p>
                      </div>
                   </div>
                   <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-4">
                      <div className="flex items-center justify-between">
                         <h3 className="text-lg font-black text-gray-900 uppercase">Shipping Address</h3>
                         <button className="text-[#333399] font-bold text-sm hover:underline">Edit</button>
                      </div>
                      <div className="text-sm text-gray-600 leading-relaxed font-medium">
                         <p className="font-black text-gray-900 mb-1">{USER.name}</p>
                         <p>No 1 Bashiru Oweh Street</p>
                         <p>Off Medical Road, Computer Village</p>
                         <p>Ikeja, Lagos, 100001</p>
                         <p>Nigeria</p>
                      </div>
                   </div>
                </div>
             )}

             {activeTab === 'settings' && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                   <h3 className="text-lg font-black text-gray-900 uppercase mb-8 pb-4 border-b border-gray-100">Update Profile</h3>
                   <form className="space-y-6 max-w-2xl">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">First Name</label>
                            <input type="text" defaultValue={USER.name.split(' ')[0]} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#333399] focus:bg-white transition-all font-medium text-sm" />
                         </div>
                         <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">Last Name</label>
                            <input type="text" defaultValue={USER.name.split(' ')[1]} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#333399] focus:bg-white transition-all font-medium text-sm" />
                         </div>
                      </div>
                      <div className="space-y-2">
                         <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">Email Display Name</label>
                         <input type="text" defaultValue={USER.name} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#333399] focus:bg-white transition-all font-medium text-sm" />
                         <p className="text-[10px] text-gray-400 italic mt-1 font-medium px-1">This will be how your name will be displayed in the account section and in reviews</p>
                      </div>
                      <div className="space-y-2">
                         <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">Email Address</label>
                         <input type="email" defaultValue={USER.email} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#333399] focus:bg-white transition-all font-medium text-sm" />
                      </div>
                      
                      <div className="pt-8 border-t border-gray-100">
                         <h4 className="text-md font-black text-gray-900 uppercase mb-6">Password Reset</h4>
                         <div className="space-y-6">
                            <div className="space-y-2">
                               <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">Current Password (Leave blank to leave unchanged)</label>
                               <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#333399] focus:bg-white transition-all font-medium text-sm" />
                            </div>
                            <div className="space-y-2">
                               <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">New Password (Leave blank to leave unchanged)</label>
                               <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#333399] focus:bg-white transition-all font-medium text-sm" />
                            </div>
                            <div className="space-y-2">
                               <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">Confirm New Password</label>
                               <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#333399] focus:bg-white transition-all font-medium text-sm" />
                            </div>
                         </div>
                      </div>

                      <button type="submit" className="bg-[#333399] hover:bg-[#262673] text-white font-black px-10 py-3.5 rounded-xl shadow-lg transition-all active:scale-[0.98]">
                         Save Changes
                      </button>
                   </form>
                </div>
             )}

             {activeTab === 'affiliate' && (
                <div className="space-y-6">
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                         <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center mb-4">
                            <DollarSign size={32} />
                         </div>
                         <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Total Earnings</h4>
                         <p className="text-3xl font-black text-gray-900">₦0.00</p>
                      </div>
                      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                         <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center mb-4">
                            <Users size={32} />
                         </div>
                         <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Total Referrals</h4>
                         <p className="text-3xl font-black text-gray-900">0</p>
                      </div>
                      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                         <div className="w-16 h-16 rounded-2xl bg-purple-50 text-purple-500 flex items-center justify-center mb-4">
                            <TrendingUp size={32} />
                         </div>
                         <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Conversion Rate</h4>
                         <p className="text-3xl font-black text-gray-900">0%</p>
                      </div>
                   </div>

                   <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                      <h3 className="text-xl font-black text-gray-900 mb-6 uppercase tracking-tight">Your Affiliate Link</h3>
                      <div className="flex flex-col md:flex-row gap-4 items-center">
                         <div className="flex-1 w-full bg-gray-50 p-4 rounded-xl border border-gray-200 font-mono text-xs break-all selection:bg-[#333399]/10">
                            https://laptoprealm.com?aff=7231
                         </div>
                         <button className="bg-[#333399] hover:bg-[#262673] text-white px-8 py-4 rounded-xl font-bold shadow-lg transition-all active:scale-95 whitespace-nowrap">
                            Copy Link
                         </button>
                      </div>
                      <p className="text-[10px] text-gray-400 mt-4 leading-relaxed">
                         Share this link with your audience to earn commissions on every purchase they make within 30 days of clicking.
                      </p>
                   </div>

                   <div className="bg-gradient-to-br from-[#333399] to-[#262673] rounded-2xl p-8 text-white relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
                      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                         <div className="max-w-md">
                            <h4 className="text-xl font-black mb-2 uppercase tracking-tight">Next Payout Threshold</h4>
                            <p className="text-white/70 text-sm font-medium">Accumulate up to ₦5,000 to request your first withdrawal. Your current balance is ₦0.00.</p>
                         </div>
                         <div className="w-32 h-32 relative">
                            <svg className="w-full h-full transform -rotate-90">
                               <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-white/10" />
                               <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray="364.4" strokeDashoffset="364.4" className="text-[#fbbf24]" />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center text-xl font-black">0%</div>
                         </div>
                      </div>
                   </div>
                </div>
             )}

          </main>
        </div>
      </div>
    </div>
  );
}
