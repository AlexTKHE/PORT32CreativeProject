import React from "react";

export const FeaturesCarousel = () => {
  const features = [
    {
      id: 1,
      title: "Easily Import Members",
      description: "Upload your member roster from any spreadsheet format and we'll automatically set up your dues collection system.",
      image: "/members.png",
      alt: "Import members from spreadsheet"
    },
    {
      id: 2,
      title: "Effortlessly Send SMS Invoices",
      description: "Bulk send dues invoices to all your members with just a few clicks. No accounts required to pay.",
      image: "/invoice.png",
      alt: "Send SMS invoices"
    },
    {
      id: 3,
      title: "Get Paid!",
      description: "Dues payments are automatically tracked, saving your treasurer 3+ hours a week in administrative time.",
      image: "/payment_tracking.png",
      alt: "Get Paid"
    }
  ];

  return (
    <section className="py-20 bg-duesly-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex overflow-x-auto gap-6 snap-x snap-mandatory scrollbar-hide">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="min-w-[300px] sm:min-w-[350px] md:min-w-[400px] snap-center flex-shrink-0"
            >
              <div className="bg-white rounded-2xl shadow-lg p-6 h-full flex flex-col">
                {/* Image */}
                <div className="flex justify-center mb-6">
                  <img 
                    src={feature.image} 
                    alt={feature.alt} 
                    className="w-full max-w-sm h-auto rounded-lg shadow-md"
                  />
                </div>
                
                {/* Content */}
                <div className="flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-center">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}; 