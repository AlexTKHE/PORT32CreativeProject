
import { Upload, MessageSquare, BarChart3 } from "lucide-react";

export const HowItWorksSection = () => {
  const steps = [
    {
      icon: Upload,
      title: "Import Your Roster",
      description: "Easily upload your entire chapter's member list using a simple CSV file. No manual entry required."
    },
    {
      icon: MessageSquare,
      title: "Send Invoices via SMS",
      description: "Send secure payment links directly to your members' phones. They can pay in full or opt-in to an automatic payment plan."
    },
    {
      icon: BarChart3,
      title: "Track Everything Automatically",
      description: "Our dashboard updates in real-time the moment a member pays. Always know exactly who is paid up."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-neutral-900 mb-4">Get Set Up in Minutes</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
                      <div className="w-16 h-16 bg-duesly-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-duesly-500 transition-all duration-300">
          <step.icon className="w-8 h-8 text-duesly-500 group-hover:text-white transition-colors duration-300" />
              </div>
              
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">{step.title}</h3>
              <p className="text-neutral-600 leading-relaxed">{step.description}</p>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gray-200 transform -translate-y-1/2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
