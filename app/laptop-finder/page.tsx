"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { 
  Laptop, 
  Gamepad2, 
  Briefcase, 
  GraduationCap, 
  Zap, 
  Battery, 
  Monitor, 
  Cpu, 
  ArrowRight, 
  RotateCcw,
  CheckCircle2,
  Trophy,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Search
} from 'lucide-react';
import { LATEST_ARRIVALS, NEW_YEAR_SPECIALS, APPLE_STORE, optimizeImage } from '../../constants';
import ProductCard from '../../components/ProductCard';

type Step = 'persona' | 'priority' | 'budget' | 'results';

export default function LaptopFinderPage() {
  const [step, setStep] = useState<Step>('persona');
  const [selections, setSelections] = useState({
    persona: '',
    priority: '',
    budget: 0
  });
  const [isCalculating, setIsCalculating] = useState(false);

  const allProducts = useMemo(() => [
    ...LATEST_ARRIVALS, 
    ...NEW_YEAR_SPECIALS, 
    ...APPLE_STORE
  ].filter(p => p.category === 'Computers'), []);

  const personas = [
    { id: 'creative', icon: <Sparkles size={32} />, title: 'Creative Pro', description: 'Design, Video, Photography' },
    { id: 'gamer', icon: <Gamepad2 size={32} />, title: 'Hardcore Gamer', description: 'AAA Gaming, Streaming' },
    { id: 'student', icon: <GraduationCap size={32} />, title: 'Student', description: 'Note-taking, Research, Portability' },
    { id: 'corporate', icon: <Briefcase size={32} />, title: 'Corporate', description: 'Meetings, Excel, Long Battery' },
  ];

  const priorities = [
    { id: 'power', icon: <Cpu size={32} />, title: 'Raw Power', description: 'Highest performance possible' },
    { id: 'portability', icon: <Battery size={32} />, title: 'Portability', description: 'Ultra-light & long battery life' },
    { id: 'display', icon: <Monitor size={32} />, title: 'Stunning Display', description: 'Color accuracy & 4K resolution' },
    { id: 'value', icon: <TrendingUp size={32} />, title: 'Best Value', description: 'Maximum features for the price' },
  ];

  const budgets = [
    { id: 1, label: 'Standard', range: 'Below ₦1,000,000', max: 1000000 },
    { id: 2, label: 'Performance', range: '₦1.5M - ₦3.5M', max: 3500000 },
    { id: 3, label: 'Elite', range: 'Above ₦5,000,000', max: 999999999 },
  ];

  const handleSelection = (key: keyof typeof selections, value: any) => {
    setSelections(prev => ({ ...prev, [key]: value }));
    if (key === 'persona') setStep('priority');
    if (key === 'priority') setStep('budget');
    if (key === 'budget') {
      setIsCalculating(true);
      setTimeout(() => {
        setStep('results');
        setIsCalculating(false);
      }, 2000);
    }
  };

  const results = useMemo(() => {
    if (step !== 'results') return [];
    
    return allProducts.map(product => {
      let score = 0;
      const specs = product.specs || {};

      // Persona matching
      if (selections.persona === 'creative' && specs.brand === 'Apple') score += 40;
      if (selections.persona === 'gamer' && product.title.toLowerCase().includes('gaming')) score += 50;
      if (selections.persona === 'corporate' && specs.brand === 'Dell') score += 30;

      // Priority matching
      if (selections.priority === 'power' && (parseInt(specs.ram || '0') >= 32)) score += 30;
      if (selections.priority === 'portability' && (specs.screenSize?.includes('13') || specs.screenSize?.includes('14'))) score += 30;
      
      // Budget matching
      if (product.price <= selections.budget) score += 30;
      else score -= 20;

      return { ...product, matchScore: Math.min(Math.max(score, 45), 98) };
    }).sort((a, b) => b.matchScore - a.matchScore).slice(0, 3);
  }, [step, selections, allProducts]);

  const resetQuiz = () => {
    setStep('persona');
    setSelections({ persona: '', priority: '', budget: 0 });
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] py-20">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        
        {/* Progress Header */}
        {step !== 'results' && !isCalculating && (
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 uppercase tracking-tight">
              Find Your <span className="text-[#333399]">Ideal Match.</span>
            </h1>
            <div className="flex justify-center gap-4 mt-8">
               <div className={`h-1.5 w-12 rounded-full transition-all duration-500 ${step === 'persona' ? 'bg-[#333399] w-24' : 'bg-gray-200'}`}></div>
               <div className={`h-1.5 w-12 rounded-full transition-all duration-500 ${step === 'priority' ? 'bg-[#333399] w-24' : 'bg-gray-200'}`}></div>
               <div className={`h-1.5 w-12 rounded-full transition-all duration-500 ${step === 'budget' ? 'bg-[#333399] w-24' : 'bg-gray-200'}`}></div>
            </div>
          </div>
        )}

        {/* Quiz Steps */}
        <div className="relative min-h-[500px]">
          
          {/* Step 1: Persona */}
          {step === 'persona' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
              {personas.map((p) => (
                <button 
                  key={p.id}
                  onClick={() => handleSelection('persona', p.id)}
                  className="bg-white border-2 border-transparent hover:border-[#333399] p-8 rounded-[32px] shadow-sm hover:shadow-xl transition-all text-left flex items-start gap-6 group"
                >
                  <div className="w-16 h-16 bg-gray-50 group-hover:bg-[#333399] group-hover:text-white rounded-2xl flex items-center justify-center transition-all">
                    {p.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-gray-900 mb-2 uppercase tracking-tight">{p.title}</h3>
                    <p className="text-gray-500 text-sm font-medium">{p.description}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Step 2: Priority */}
          {step === 'priority' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-right-8 duration-700">
              {priorities.map((p) => (
                <button 
                  key={p.id}
                  onClick={() => handleSelection('priority', p.id)}
                  className="bg-white border-2 border-transparent hover:border-[#333399] p-8 rounded-[32px] shadow-sm hover:shadow-xl transition-all text-left flex items-start gap-6 group"
                >
                  <div className="w-16 h-16 bg-gray-50 group-hover:bg-[#333399] group-hover:text-white rounded-2xl flex items-center justify-center transition-all">
                    {p.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-gray-900 mb-2 uppercase tracking-tight">{p.title}</h3>
                    <p className="text-gray-500 text-sm font-medium">{p.description}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Step 3: Budget */}
          {step === 'budget' && !isCalculating && (
            <div className="grid grid-cols-1 gap-6 max-w-2xl mx-auto animate-in fade-in zoom-in-95 duration-700">
              {budgets.map((b) => (
                <button 
                  key={b.id}
                  onClick={() => handleSelection('budget', b.max)}
                  className="bg-white border-2 border-transparent hover:border-[#333399] p-8 rounded-[32px] shadow-sm hover:shadow-xl transition-all flex items-center justify-between group"
                >
                  <div className="text-left">
                    <h3 className="text-xl font-black text-gray-900 mb-1 uppercase tracking-tight">{b.label}</h3>
                    <p className="text-[#333399] font-black">{b.range}</p>
                  </div>
                  <ChevronRight className="text-gray-300 group-hover:text-[#333399] group-hover:translate-x-2 transition-all" size={32} />
                </button>
              ))}
            </div>
          )}

          {/* Intermediate: Calculating */}
          {isCalculating && (
            <div className="flex flex-col items-center justify-center h-[400px] text-center">
              <div className="w-24 h-24 border-8 border-gray-100 border-t-[#333399] rounded-full animate-spin mb-8"></div>
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight animate-pulse">Matching your needs...</h2>
              <p className="text-gray-500 mt-4 font-medium uppercase text-xs tracking-[0.3em]">Analyzing Specs & Inventory</p>
            </div>
          )}

          {/* Step 4: Results */}
          {step === 'results' && (
            <div className="animate-in fade-in duration-1000">
              <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
                 <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-widest mb-4">
                      <CheckCircle2 size={14} /> Analysis Complete
                    </div>
                    <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tight">Your Recommended <span className="text-[#333399]">Laptops.</span></h2>
                 </div>
                 <button 
                  onClick={resetQuiz}
                  className="flex items-center gap-2 text-sm font-black text-gray-400 hover:text-[#ef4444] uppercase tracking-widest transition-all"
                 >
                   <RotateCcw size={16} /> Start Over
                 </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {results.map((product, idx) => (
                  <div key={product.id} className="relative group">
                    {idx === 0 && (
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20 bg-[#fbbf24] text-gray-900 px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-[0.2em] shadow-lg flex items-center gap-2">
                        <Trophy size={14} /> Best Match
                      </div>
                    )}
                    <div className={`p-1 rounded-[42px] h-full ${idx === 0 ? 'bg-gradient-to-br from-[#fbbf24] via-[#333399] to-purple-600' : 'bg-transparent'}`}>
                       <div className="bg-white rounded-[40px] h-full hover:shadow-2xl transition-all overflow-hidden flex flex-col">
                          <ProductCard product={product} />
                          <div className="p-8 pt-0 border-t border-gray-50 mt-auto">
                              <div className="mb-4">
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
                                  <span>Match Score</span>
                                  <span className="text-[#333399]">{product.matchScore}%</span>
                                </div>
                                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                  <div className={`h-full rounded-full transition-all duration-1000 delay-500 bg-[#333399]`} style={{ width: `${product.matchScore}%` }}></div>
                                </div>
                              </div>
                              <button className="w-full bg-[#f9fafb] hover:bg-gray-900 hover:text-white p-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all">
                                View Full Specs
                              </button>
                          </div>
                       </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Referral / CTA */}
              <div className="mt-16 bg-white border border-gray-100 rounded-[40px] p-12 text-center shadow-sm">
                 <h3 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-tight">Need a Custom Quote?</h3>
                 <p className="text-gray-500 mb-8 max-w-xl mx-auto font-medium">If none of these machines perfectly fit your workflow, our specialized procurement team can source custom configurations from our global partners.</p>
                 <Link href="/contact" className="inline-flex items-center gap-3 bg-[#333399] text-white px-10 py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:shadow-2xl hover:-translate-y-1 transition-all">
                    Talk to an Expert <ArrowRight size={18} />
                 </Link>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
