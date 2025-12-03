
import { Button } from "@/components/ui/button";
import { PhoneAnimation } from "@/components/PhoneAnimation";
import { Rocket, Play } from "lucide-react";
import React from "react";

export const HeroSection = () => {
  const scrollToWaitlist = () => {
    const finalCTASection = document.getElementById('final-cta');
    if (finalCTASection) {
      finalCTASection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToDemo = () => {
    const demoSection = document.getElementById('demo');
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-visible">
      {/* SVG Blob Background - arc behind text, fills to bottom */}
      <svg
        className="absolute top-0 left-0 w-full h-full z-0 opacity-70 pointer-events-none hidden md:block"
        viewBox="0 0 2600 1200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="dueslyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#dbeafe" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#bfdbfe" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <path
          d="M0,600 Q650,200 1300,400 Q1950,600 2600,400 L2600,1200 L0,1200 Z"
          fill="url(#dueslyGradient)"
        />
      </svg>
      {/* Main Hero Content */}
      <div className="relative z-10 w-full flex justify-center items-center h-full">
        <div className="max-w-7xl w-full mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center px-4 lg:px-8">
          <div className="text-center lg:text-left space-y-8 flex flex-col justify-center h-full">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-neutral-900 leading-tight max-w-4xl mx-auto lg:mx-0">
              Stop Chasing Dues.
              <span className="text-duesly-500 block mt-2 font-extrabold">Start Automating.</span>
            </h1>
            
            <p className="text-xl text-neutral-600 leading-relaxed max-w-lg">
              The easiest way to collect fraternity dues. Send automated SMS invoices, 
              offer flexible payment plans, and get your members to pay on time, every time.
            </p>
            
            <div className="space-y-4">
              <Button 
                onClick={scrollToWaitlist}
                size="lg" 
                className="w-full lg:w-auto bg-duesly-500 hover:bg-duesly-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                ⚡ Join the Beta — Free for Fall 2025
              </Button>
              
              <Button 
                variant="outline"
                size="lg" 
                className="w-full lg:w-auto border-duesly-500 text-duesly-500 hover:bg-duesly-50 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
                onClick={scrollToDemo}
              >
                ▶ View a Quick Demo
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col justify-center items-center space-y-4 overflow-visible -mt-8">
            {/* Caption above phone */}
            <div className="text-center space-y-2">
              <p className="text-sm font-medium text-slate-600" style={{ fontSize: '14px', fontWeight: '500' }}>
                See how a real chapter gets paid
              </p>
              <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                <span className="mr-1">✓</span>
                95% On-Time Payments
              </div>
            </div>
            
            {/* Phone Animation Container with Visual Grounding */}
            <div className="relative w-full max-w-[18rem] lg:w-[26rem] h-[28rem] lg:h-[38rem] mx-auto overflow-visible">
              {/* Visual Grounding - Soft shadow/gradient behind the phone */}
              <div className="absolute inset-0 -bottom-4 lg:-bottom-6 transform scale-95 lg:scale-90 opacity-60">
                {/* Soft gradient shadow that creates the feeling of a surface */}
                <div className="w-full h-full device-grounding rounded-3xl"></div>
              </div>
              
              {/* Phone Animation */}
              <div className="relative z-10 w-full h-full">
              <PhoneAnimation />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile-specific bottom spacing to separate from demo notification */}
      <div className="absolute bottom-0 left-0 right-0 h-8 md:h-0 bg-gradient-to-t from-white via-white to-transparent pointer-events-none"></div>
    </div>
  );
};
