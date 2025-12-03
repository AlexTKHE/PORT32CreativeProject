
import { Bell, RefreshCw, Shield, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import SpotlightCard from "./SpotlightCard";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const FeaturesSection = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [showLeftHint, setShowLeftHint] = useState(false);
  const [showRightHint, setShowRightHint] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const features = useMemo(() => [
    {
      icon: Bell,
      title: "Automated Reminders",
      description: "Automatically send gentle reminders to members with outstanding dues so you don't have to have awkward conversations."
    },
    {
      icon: RefreshCw,
      title: "Automatic Payment Plans",
      description: "Make dues more manageable by offering payment plans. Members can set it and forget it with automatic recurring payments for the semester."
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Powered by Stripe for bank-grade security. Members can pay with confidence using Apple Pay and other major payment methods."
    },
    {
      icon: Clock,
      title: "Save Countless Hours",
      description: "Eliminate manual tracking with spreadsheets and trips to the bank. Focus on what matters: your chapter."
    }
  ], []);

  // Throttled scroll handler
  const handleScroll = useCallback(() => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const scrollLeft = container.scrollLeft;
        const scrollWidth = container.scrollWidth;
        const clientWidth = container.clientWidth;
        
        // Update scroll hints
        setShowLeftHint(scrollLeft > 10);
        setShowRightHint(scrollLeft < scrollWidth - clientWidth - 10);
        
        // Update current feature based on scroll position
        const cardWidth = container.children[0]?.clientWidth || 0;
        if (cardWidth > 0) {
          const newCurrentFeature = Math.round(scrollLeft / cardWidth);
          if (newCurrentFeature !== currentFeature && newCurrentFeature >= 0 && newCurrentFeature < features.length) {
            setCurrentFeature(newCurrentFeature);
          }
        }
      }
    }, 16); // ~60fps throttling
  }, [currentFeature, features.length]);

  // Add scroll event listener with throttling
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        container.removeEventListener('scroll', handleScroll);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      };
    }
  }, [handleScroll]);

  // Initialize scroll hints
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollWidth = container.scrollWidth;
      const clientWidth = container.clientWidth;
      setShowRightHint(scrollWidth > clientWidth);
    }
  }, []);

  // Memoize feature cards to prevent unnecessary re-renders
  const desktopFeatureCards = useMemo(() => (
    features.map((feature, index) => (
      <SpotlightCard key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="w-12 h-12 bg-duesly-50 rounded-xl flex items-center justify-center mb-6">
          <feature.icon className="w-6 h-6 text-duesly-500" />
        </div>
        
        <h3 className="text-lg font-semibold text-neutral-900 mb-3">{feature.title}</h3>
        <p className="text-neutral-600 text-sm leading-relaxed">{feature.description}</p>
      </SpotlightCard>
    ))
  ), [features]);

  const mobileFeatureCards = useMemo(() => (
    features.map((feature, index) => (
      <div
        key={index}
        className="flex-shrink-0 w-80 snap-center"
      >
        <SpotlightCard className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
          <div className="w-12 h-12 bg-duesly-50 rounded-xl flex items-center justify-center mb-4">
            <feature.icon className="w-6 h-6 text-duesly-500" />
          </div>
          
          <h3 className="text-lg font-semibold text-neutral-900 mb-3">{feature.title}</h3>
          <p className="text-neutral-600 text-sm leading-relaxed">{feature.description}</p>
        </SpotlightCard>
      </div>
    ))
  ), [features]);

  return (
    <div className="w-full">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-neutral-900 mb-4">Everything You Need to Manage Chapter Finances</h2>
        </div>
        
        {/* Desktop Layout - Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {desktopFeatureCards}
        </div>

        {/* Mobile Layout - Horizontal Scroll */}
        <div className="md:hidden relative">
          {/* Scroll Hints */}
          <AnimatePresence>
            {showLeftHint && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="scroll-hint absolute left-0 top-1/2 -translate-y-1/2 z-10"
              >
                <div className="w-8 h-16 scroll-hint-gradient-left flex items-center justify-center">
                  <ChevronLeft className="w-4 h-4 text-gray-400" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <AnimatePresence>
            {showRightHint && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="scroll-hint absolute right-0 top-1/2 -translate-y-1/2 z-10"
              >
                <div className="w-8 h-16 scroll-hint-gradient flex items-center justify-center">
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Feature Cards Container */}
          <div 
            ref={scrollContainerRef}
            className="horizontal-scroll-container flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none'
            }}
          >
            {mobileFeatureCards}
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {features.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentFeature 
                    ? 'bg-duesly-500 w-6' 
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
