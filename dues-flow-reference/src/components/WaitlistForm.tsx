import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CheckCircle, ArrowLeft } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

interface WaitlistFormData {
  email: string;
  phone: string;
  school: string;
  fraternity: string;
}

interface WaitlistFormProps {
  onBack: () => void;
}

export const WaitlistForm: React.FC<WaitlistFormProps> = ({ onBack }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<WaitlistFormData>({
    defaultValues: {
      email: "",
      phone: "",
      school: "",
      fraternity: "",
    },
  });

  const onSubmit = async (data: WaitlistFormData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      // TODO: Remove console.log for production
      // console.log("Attempting to save to Firestore:", data);
      const docRef = await addDoc(collection(db, "waitlist"), {
        ...data,
        createdAt: Timestamp.now(),
      });
      // TODO: Remove console.log for production
      // console.log("Document written with ID: ", docRef.id);
      setIsSubmitted(true);
    } catch (err) {
      // TODO: Replace with proper error logging service for production
      console.error("Error saving to Firestore:", err);
      setError(`There was a problem saving your info: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl max-w-md mx-auto">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <CheckCircle className="h-16 w-16 text-success" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">
            You're on the list!
          </h2>
          <p className="text-lg text-neutral-600 leading-relaxed">
            Thanks for joining our beta! We'll be in touch soon with early access details.
          </p>
          <Button
            onClick={onBack}
            variant="outline"
            className="w-full bg-duesly-500 hover:bg-duesly-600 text-white border-duesly-500 hover:border-duesly-600"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl max-w-md mx-auto">
      <div className="mb-6">
        <Button
          onClick={onBack}
          variant="ghost"
          className="p-0 h-auto text-neutral-600 hover:text-neutral-900 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-2">
          Join the Beta
        </h2>
        <p className="text-neutral-600">
          Get early access to revolutionize your chapter's finances.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {error && (
            <div className="text-red-600 text-center text-sm font-medium mb-2">{error}</div>
          )}
          <FormField
            control={form.control}
            name="email"
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please enter a valid email address",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="your.email@university.edu"
                    className="h-12 text-base placeholder:text-neutral-400"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            rules={{
              required: "Phone number is required",
              pattern: {
                value: /^[+]?[1-9][\d]{0,15}$/,
                message: "Please enter a valid phone number",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">Phone Number</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="tel"
                    placeholder="(555) 123-4567"
                    className="h-12 text-base placeholder:text-neutral-400"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="school"
            rules={{
              required: "School is required",
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">School/University</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="ex: University of Florida"
                    className="h-12 text-base placeholder:text-neutral-400"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fraternity"
            rules={{
              required: "Fraternity is required",
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">Fraternity</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="ex: Sigma Phi Epsilon"
                    className="h-12 text-base placeholder:text-neutral-400"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-duesly-500 hover:bg-duesly-600 text-white h-12 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {isSubmitting ? "Submitting..." : "Join Free Beta"}
          </Button>
        </form>
      </Form>
    </div>
  );
}; 