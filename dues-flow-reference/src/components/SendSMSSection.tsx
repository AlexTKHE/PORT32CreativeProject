import React from "react";

export const SendSMSSection = () => {
  return (
    <section className="py-20 bg-duesly-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-8">
          <div className="flex-1 flex justify-center lg:justify-start order-1 lg:order-2">
            <img 
              src="/invoice.png" 
              alt="Send SMS invoices" 
              className="max-w-sm h-auto rounded-lg shadow-2xl lg:ml-6"
              style={{ boxShadow: '0 8px 32px 0 rgba(0,0,0,0.28), 0 2px 8px 0 rgba(0,0,0,0.18)' }}
            />
          </div>
          <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Effortlessly Send SMS Invoices
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed max-w-xl">
              Bulk send dues invoices to all your members with just a few clicks. Our platform makes it easy to notify everyone instantly via SMS—no accounts required to pay, so members can settle up in seconds. No one misses a payment deadline and you spend less time chasing down dues.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}; 