import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const MidScrollCTA = () => {
  const scrollToDemo = () => {
    // Scroll to demo section or animated dashboard
    const demoSection = document.getElementById('demo');
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
          Built to Help Treasurers Win Back Their Time
        </h2>
        
        <div className="flex justify-center">
          <Button 
            onClick={scrollToDemo}
            size="lg"
            className="bg-duesly-500 hover:bg-duesly-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            See How It Works
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}; 