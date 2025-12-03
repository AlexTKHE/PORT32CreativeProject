import React from "react";

export const ImportMembersSection = () => {
  return (
    <section className="py-20 mt-16 md:mt-0 bg-duesly-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 flex justify-center lg:justify-end relative">
            <img 
              src="/members.png" 
              alt="Import members from spreadsheet" 
              className="w-full max-w-lg h-auto rounded-lg shadow-lg"
            />
          </div>
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Easily Import Members
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed max-w-xl">
              Upload your member roster from any spreadsheet format and we'll automatically 
              set up your dues collection system. No manual data entry required—just import 
              your existing member list and start collecting dues immediately.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}; 