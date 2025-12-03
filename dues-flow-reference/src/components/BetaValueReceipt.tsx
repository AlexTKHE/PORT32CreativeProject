import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { CheckCircle, Clock, Eye, MessageSquare, CreditCard, Timer, DollarSign } from 'lucide-react';

interface CountUpProps {
  end: number;
  duration?: number;
  className?: string;
}

const CountUp: React.FC<CountUpProps> = ({ end, duration = 2, className = '' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration]);

  return <span className={className}>{count.toLocaleString()}+</span>;
};

// Visual rotator items with monotone SVG icons
const visualItems = [
  {
    icon: Eye,
    label: "Track Dues",
    color: "text-blue-500"
  },
  {
    icon: MessageSquare,
    label: "Send Reminders",
    color: "text-green-500"
  },
  {
    icon: CreditCard,
    label: "Instant Pay",
    color: "text-purple-500"
  },
  {
    icon: Timer,
    label: "Save Time",
    color: "text-orange-500"
  },
  {
    icon: DollarSign,
    label: "Collect More",
    color: "text-emerald-500"
  }
];

export const BetaValueReceipt: React.FC = () => {
  const [currentVisualIndex, setCurrentVisualIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.4, once: true });
  
  const benefits = [
    { text: 'Saved 3+ hours weekly', icon: CheckCircle },
    { text: 'Tracked 100% of dues', icon: CheckCircle },
    { text: 'Avoided awkward reminders', icon: CheckCircle },
    { text: 'Boosted collections by 23%', icon: CheckCircle },
    { text: 'Skipped 0 setup steps', icon: Clock },
  ];

  // Visual rotator after card is in view
  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setCurrentVisualIndex((prev) => (prev + 1) % visualItems.length);
    }, 2500); // 2.5 seconds

    return () => clearInterval(interval);
  }, [isInView]);

  const currentVisual = visualItems[currentVisualIndex];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="bg-white rounded-xl border border-gray-100 px-6 py-5 max-w-md w-full relative"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Beta Value Receipt</h3>
        
        {/* Rotating visual indicator */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentVisualIndex}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.6 }}
            className="flex items-center space-x-2 bg-gray-50 px-3 py-1.5 rounded-full"
          >
            <currentVisual.icon 
              className={`w-4 h-4 ${currentVisual.color}`} 
            />
            <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
              {currentVisual.label}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Benefits list */}
      <div className="space-y-3 mb-6">
        {benefits.map((benefit, index) => (
          <motion.div
            key={benefit.text}
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{
              delay: 0.2 + index * 0.1,
              duration: 0.8,
              ease: "easeOut"
            }}
            className="flex items-center space-x-3"
          >
            <div className={`flex-shrink-0 ${
              benefit.icon === Clock ? 'text-yellow-500' : 'text-green-500'
            }`}>
              <benefit.icon className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium text-gray-700">
              {benefit.text}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Total Value */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="pt-4 border-t border-gray-100"
      >
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Total Value:</span>
          <span className="text-lg font-bold text-blue-600">
            $<CountUp end={3200} duration={1.5} />
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}; 