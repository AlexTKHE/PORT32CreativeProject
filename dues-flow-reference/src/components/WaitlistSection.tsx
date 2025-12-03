
import { WaitlistForm } from "@/components/WaitlistForm";

export const WaitlistSection = () => {
  const handleBack = () => {
    // Scroll to top of page when going back
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="waitlist" className="py-20 bg-duesly-500">
      <div className="max-w-4xl mx-auto px-4">
        <WaitlistForm onBack={handleBack} />
      </div>
    </section>
  );
};
