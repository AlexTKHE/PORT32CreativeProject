import React, { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  background?: 'white' | 'neutral-50' | 'blue-50' | 'duesly-50' | 'gradient';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  fullHeight?: boolean;
  id?: string;
  animate?: boolean;
  slideDirection?: 'left' | 'right' | 'none';
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  className,
  background = 'white',
  padding = 'lg',
  fullHeight = false,
  id,
  animate = true,
  slideDirection = 'none',
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    amount: 0.05, // Much lower threshold - trigger when just 5% is visible
    margin: "0px 0px -300px 0px" // Larger negative margin to trigger even earlier
  });

  const backgroundClasses = {
    'white': 'bg-white',
    'neutral-50': 'bg-neutral-50',
    'blue-50': 'bg-blue-50',
    'duesly-50': 'bg-duesly-50',
    'gradient': 'bg-gradient-to-br from-blue-50 via-white to-purple-50',
  };

  const paddingClasses = {
    'sm': 'py-16',
    'md': 'py-20',
    'lg': 'py-24',
    'xl': 'py-32',
  };

  // Shadow classes that match section background colors and are proportional to size
  const shadowClasses = {
    'white': 'hover:shadow-[0_-8px_25px_-5px_rgba(0,0,0,0.1),0_-4px_10px_-6px_rgba(0,0,0,0.1)]',
    'neutral-50': 'hover:shadow-[0_-12px_30px_-5px_rgba(107,114,128,0.15),0_-6px_15px_-6px_rgba(107,114,128,0.1)]',
    'blue-50': 'hover:shadow-[0_-16px_35px_-5px_rgba(59,130,246,0.15),0_-8px_20px_-6px_rgba(59,130,246,0.1)]',
    'duesly-50': 'hover:shadow-[0_-20px_40px_-5px_rgba(59,130,246,0.2),0_-10px_25px_-6px_rgba(59,130,246,0.15)]',
    'gradient': 'hover:shadow-[0_-24px_45px_-5px_rgba(147,197,253,0.2),0_-12px_30px_-6px_rgba(147,197,253,0.15)]',
  };

  // Animation variants with slide-in options
  const getAnimationVariants = (): Variants => {
    const baseVariants: Variants = {
      hidden: {
        opacity: 0,
      },
      visible: {
        opacity: 1,
        transition: {
          duration: 0.8,
          ease: "easeOut",
        },
      },
    };

    if (slideDirection === 'left') {
      return {
        hidden: {
          opacity: 0,
          x: -50,
        },
        visible: {
          opacity: 1,
          x: 0,
          transition: {
            duration: 0.8,
            ease: "easeOut",
          },
        },
      };
    }

    if (slideDirection === 'right') {
      return {
        hidden: {
          opacity: 0,
          x: 50,
        },
        visible: {
          opacity: 1,
          x: 0,
          transition: {
            duration: 0.8,
            ease: "easeOut",
          },
        },
      };
    }

    return baseVariants;
  };

  const animationVariants = getAnimationVariants();

  // Only use motion component if animation is enabled
  if (!animate) {
    return (
      <section
        id={id}
        className={cn(
          'relative w-full',
          fullHeight && 'min-h-screen',
          backgroundClasses[background],
          paddingClasses[padding],
          'overflow-hidden',
          shadowClasses[background],
          className
        )}
      >
        <div className="relative z-10 w-full h-full">
          {children}
        </div>
      </section>
    );
  }

  return (
    <motion.section
      ref={ref}
      id={id}
      variants={animationVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={cn(
        'relative w-full',
        fullHeight && 'min-h-screen',
        backgroundClasses[background],
        paddingClasses[padding],
        'overflow-hidden',
        shadowClasses[background],
        className
      )}
    >
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </motion.section>
  );
}; 