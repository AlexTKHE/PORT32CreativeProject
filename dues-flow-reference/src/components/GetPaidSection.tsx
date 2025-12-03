import React from "react";

export const GetPaidSection = () => {
  return (
    <section className="py-20 bg-duesly-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 flex justify-center lg:justify-end relative">
            <img 
              src="/payment_tracking.png" 
              alt="Get Paid" 
              className="max-w-lg h-auto rounded-lg shadow-2xl object-contain lg:scale-125 lg:origin-right overflow-hidden"
              style={{ boxShadow: '0 8px 32px 0 rgba(0,0,0,0.28), 0 2px 8px 0 rgba(0,0,0,0.18)', maxWidth: '100%' }}
            />
          </div>
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Get Paid!
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed max-w-xl">
              Dues payments are automatically tracked, saving your treasurer 3+ hours a week in administrative time. Instantly see who owes what and review recent payments with our easy dashboard summary. Send automatic text reminders with a click and keep your chapter's finances organized and up to date.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}; 