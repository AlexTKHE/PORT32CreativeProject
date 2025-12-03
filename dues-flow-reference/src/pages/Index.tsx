
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { TopBar } from "@/components/TopBar";
import { MidScrollCTA } from "@/components/MidScrollCTA";
import { FinalCTA } from "@/components/FinalCTA";
import { DueslyDemoShowcase } from "@/components/DueslyDemoShowcase";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import CountUp from "@/components/CountUp";
import { useState, useEffect, useRef } from "react";

const DonutProgress = ({ value, size = 160, strokeWidth = 18, duration = 2.5 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(Math.max(value, 0), 100);
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width={size} height={size} style={{ display: 'block' }}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#e5e7eb"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#3B82F6"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{
          transition: 'stroke-dashoffset 0.1s linear'
        }}
      />
    </svg>
  );
};

const Index = () => {
  const [countValue, setCountValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.3 // Trigger when 30% of the section is visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <TopBar />
      
      {/* Hero Section - Full height with gradient background, no animation */}
      <SectionWrapper background="gradient" fullHeight padding="xl" className="pt-28 pb-0" animate={false}>
        <HeroSection />
      </SectionWrapper>
      
      {/* Demo Showcase - Clean white background with animation */}
      <SectionWrapper background="white" padding="lg" id="demo" className="pt-0 md:pt-0" animate={true}>
        <DueslyDemoShowcase />
      </SectionWrapper>
      
      {/* Stats Section - Blue background for contrast with animation */}
      <SectionWrapper background="blue-50" padding="lg" className="relative" animate={true} slideDirection="right">
        <div ref={sectionRef} className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20">
          <div className="flex-shrink-0 flex items-center justify-center w-full md:w-auto relative">
            <DonutProgress value={isVisible ? countValue : 0} duration={2.5} />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-gray-900">
              {isVisible && <CountUp to={100} from={0} duration={2.5} onChange={setCountValue} />}
              {!isVisible && <span>0</span>}
            </span>
          </div>
          <div className="text-center md:text-left flex-1">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Duesly Increases Dues Collection Rates</h2>
            <p className="text-lg text-gray-700 max-w-xl">
              Chapters using SMS-based dues collection see a <span className="font-semibold" style={{ color: '#3B82F6' }}>23% increase in collections rate</span>. Automated reminders and easy payment links mean more members pay on time—no more chasing down payments.
            </p>
          </div>
        </div>
      </SectionWrapper>
      
      {/* Features Section - Neutral background for content focus with animation */}
      <SectionWrapper background="neutral-50" padding="lg" id="features" animate={true} slideDirection="left">
        <FeaturesSection />
      </SectionWrapper>
      
      {/* Mid Scroll CTA - White background for contrast with animation */}
      <SectionWrapper background="white" padding="md" animate={true}>
        <MidScrollCTA />
      </SectionWrapper>
      
      {/* Final CTA - Duesly brand background with animation */}
      <SectionWrapper background="duesly-50" padding="xl" id="final-cta" animate={true}>
        <FinalCTA />
      </SectionWrapper>
    </div>
  );
};

export default Index;
