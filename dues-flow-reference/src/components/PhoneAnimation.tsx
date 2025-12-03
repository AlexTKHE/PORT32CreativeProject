
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const PhoneAnimation = () => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const nextStep = useCallback(() => {
    setCurrentStep((prev) => (prev + 1) % 3);
  }, []);
  
  useEffect(() => {
    const interval = setInterval(nextStep, 4000);
    return () => clearInterval(interval);
  }, [nextStep]);

  // Memoize animation variants to prevent recreation
  const animationVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const scaleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1 }
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-visible">
      {/* Phone Frame */}
      <div className="absolute inset-0 bg-gray-900 rounded-3xl shadow-2xl p-3">
        <div className="bg-black rounded-2xl h-full relative overflow-hidden">
          {/* Screen Content */}
          <div className="bg-white h-full rounded-2xl relative overflow-hidden">
            <AnimatePresence mode="wait">
              {currentStep === 0 && (
                <motion.div
                  key="invoice"
                  variants={animationVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="p-6 h-full flex flex-col justify-center"
                >
                  {/* SMS Notification */}
                  <motion.div
                    variants={scaleVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.5, duration: 0.3 }}
                    className="bg-gray-100 rounded-2xl p-4 mb-4 shadow-sm"
                  >
                    <div className="flex items-center mb-2">
                      <img src="/dueslyLogo.svg" alt="Duesly Logo" className="w-8 h-8" />
                      <span className="ml-2 text-sm font-medium text-gray-800">Chapter Dues</span>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Hi John, your semester dues of $500 are payable. Tap to pay: <span className="text-duesly-500 underline">pay.link/abc123</span>
                    </p>
                  </motion.div>
                  
                  <div className="text-center">
                    <p className="text-xs text-gray-500">New message received</p>
                  </div>
                </motion.div>
              )}
              
              {currentStep === 1 && (
                <motion.div
                  key="payment"
                  variants={animationVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="p-6 h-full flex flex-col justify-center"
                >
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <img src="/dueslyLogo.svg" alt="Duesly Logo" className="w-16 h-16" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Sigma Phi Epsilon</h3>
                    <p className="text-2xl font-bold text-gray-900 mt-2">$500.00</p>
                    <p className="text-sm text-gray-600">Semester Dues</p>
                  </div>
                  
                  {/* Apple Pay Button */}
                  <motion.div
                    variants={scaleVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.5, duration: 0.3 }}
                    className="bg-black rounded-lg p-4 text-center"
                  >
                    <span className="text-white font-medium">Pay with Apple Pay</span>
                  </motion.div>
                  
                  {/* Face ID Animation */}
                  <motion.div
                    variants={scaleVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 1, duration: 0.3 }}
                    className="absolute top-4 right-4 w-12 h-12 border-4 border-success rounded-full flex items-center justify-center bg-white"
                  >
                    <span className="text-success text-2xl">✓</span>
                  </motion.div>
                </motion.div>
              )}
              
              {currentStep === 2 && (
                <motion.div
                  key="confirmation"
                  variants={animationVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="p-6 h-full flex flex-col justify-center"
                >
                  {/* Success Message */}
                  <motion.div
                    variants={scaleVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.3, duration: 0.3 }}
                    className="text-center mb-6"
                  >
                    <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-2xl">✓</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">Payment Successful!</h3>
                  </motion.div>
                  
                  {/* Confirmation SMS */}
                  <motion.div
                    variants={scaleVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.8, duration: 0.3 }}
                    className="bg-gray-100 rounded-2xl p-4 shadow-sm"
                  >
                    <div className="flex items-center mb-2">
                      <img src="/dueslyLogo.svg" alt="Duesly Logo" className="w-8 h-8" />
                      <span className="ml-2 text-sm font-medium text-gray-800">Chapter Dues</span>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Thanks, John! Your payment is confirmed. Your dues are up to date.
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      
      {/* Progress Dots */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {[0, 1, 2].map((step) => (
          <div
            key={step}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              step === currentStep ? 'bg-duesly-500' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
