"use client";

import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface SectionHeaderProps {
  title: string;
  hasCountdown?: boolean;
  linkText?: string;
  color?: string; // Background color for header
  textColor?: string;
  onNext?: () => void;
  onPrev?: () => void;
  canNext?: boolean;
  canPrev?: boolean;
  onLinkClick?: () => void;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  hasCountdown = false, 
  linkText = "SEE ALL",
  color = "bg-gray-200",
  textColor = "text-gray-700",
  onNext,
  onPrev,
  canNext = false,
  canPrev = false,
  onLinkClick
}) => {
  // Initial time: 5 days, 11 hours, 43 minutes, 55 seconds (in seconds)
  const [timeLeft, setTimeLeft] = useState(474235);

  useEffect(() => {
    if (!hasCountdown) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [hasCountdown]);

  const formatTime = (totalSeconds: number) => {
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const pad = (num: number) => num.toString().padStart(2, '0');

    return {
      d: pad(days),
      h: pad(hours),
      m: pad(minutes),
      s: pad(seconds)
    };
  };

  const time = formatTime(timeLeft);

  return (
    <div className={`flex items-center justify-between px-4 py-3 rounded-t-lg ${color}`}>
      <h2 className={`text-lg font-bold ${textColor}`}>{title}</h2>
      
      {hasCountdown && (
        <div className="hidden sm:flex items-center space-x-2 text-xs font-mono text-gray-600">
           <span>Time Left:</span>
           <div className="bg-gray-300 px-2 py-1 rounded text-gray-800 font-bold">{time.d} d</div>
           <span>:</span>
           <div className="bg-gray-300 px-2 py-1 rounded text-gray-800 font-bold">{time.h} h</div>
           <span>:</span>
           <div className="bg-gray-300 px-2 py-1 rounded text-gray-800 font-bold">{time.m} m</div>
           <span>:</span>
           <div className="bg-gray-300 px-2 py-1 rounded text-gray-800 font-bold">{time.s} s</div>
        </div>
      )}

      <div className="flex items-center">
        {onPrev && onNext && (
          <div className="flex space-x-1 mr-4">
             <button 
               onClick={onPrev} 
               disabled={!canPrev}
               className={`p-1 rounded-full transition-colors ${!canPrev ? 'text-gray-400 cursor-not-allowed' : 'bg-white hover:bg-gray-100 text-[#333399] shadow-sm'}`}
               aria-label="Previous page"
             >
               <ChevronLeft size={18}/>
             </button>
             <button 
               onClick={onNext} 
               disabled={!canNext}
               className={`p-1 rounded-full transition-colors ${!canNext ? 'text-gray-400 cursor-not-allowed' : 'bg-white hover:bg-gray-100 text-[#333399] shadow-sm'}`}
               aria-label="Next page"
             >
               <ChevronRight size={18}/>
             </button>
          </div>
        )}

        <button 
          onClick={onLinkClick}
          className={`text-xs font-bold flex items-center hover:underline ${textColor === 'text-white' ? 'text-white' : 'text-gray-500'}`}
        >
          {linkText}
          {textColor === 'text-white' && <ArrowRight size={14} className="ml-1" />}
        </button>
      </div>
    </div>
  );
};

export default SectionHeader;