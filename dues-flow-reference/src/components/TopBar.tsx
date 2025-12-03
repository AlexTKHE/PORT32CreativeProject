import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";

export const TopBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleScroll = useCallback(() => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);
    }, 16); // ~60fps throttling
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleScroll]);

  const handleJoinBeta = useCallback(() => {
    const finalCTASection = document.getElementById('final-cta');
    if (finalCTASection) {
      finalCTASection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'shadow-md' : ''
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center">
                  <img src="/dueslyLogo.svg" alt="Duesly Logo" className="w-8 h-8" />
                  <span className="ml-2 text-xl font-bold text-gray-900">Duesly</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex items-center">
              <Button
                onClick={handleJoinBeta}
                className="bg-duesly-500 hover:bg-duesly-600 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Join Beta
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}; 