import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle } from "lucide-react";
import { BetaValueReceipt } from "./BetaValueReceipt";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

interface WaitlistFormData {
  email: string;
  phone: string;
  school: string;
  fraternity: string;
}

export const FinalCTA = () => {
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

  // Function to normalize phone number to E.164 format
  const normalizePhoneNumber = (phone: string): string => {
    // Remove all non-digit characters except +
    const cleaned = phone.replace(/[^\d+]/g, "");
    
    // If it starts with +, keep it (international format)
    if (cleaned.startsWith("+")) {
      return cleaned;
    }
    
    // If it's 10 digits, assume US number and add +1
    if (cleaned.length === 10) {
      return `+1${cleaned}`;
    }
    
    // If it's 11 digits and starts with 1, add +
    if (cleaned.length === 11 && cleaned.startsWith("1")) {
      return `+${cleaned}`;
    }
    
    // If it's 7 digits, assume US number and add +1 (you might want to prompt for area code)
    if (cleaned.length === 7) {
      return `+1${cleaned}`;
    }
    
    // For other cases, just return as is (could be international)
    return cleaned.startsWith("+") ? cleaned : `+${cleaned}`;
  };

  const onSubmit = async (data: WaitlistFormData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      // Normalize phone number before saving
      const normalizedData = {
        ...data,
        phone: normalizePhoneNumber(data.phone),
        createdAt: Timestamp.now(),
      };
      
      // TODO: Remove console.log for production
      // console.log("Attempting to save to Firestore:", normalizedData);
      const docRef = await addDoc(collection(db, "waitlist"), normalizedData);
      // TODO: Remove console.log for production
      // console.log("Document written with ID: ", docRef.id);
      setIsSubmitted(true);
    } catch (err) {
      console.error("Error saving to Firestore:", err);
      setError(`There was a problem saving your info: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <div className="w-full">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
            <div className="space-y-6 order-2 lg:order-1">
              <div className="text-center lg:text-left space-y-6">
                <div className="flex justify-center lg:justify-start">
                  <CheckCircle className="h-16 w-16 text-green-500" />
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                  You're on the list!
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Thanks for joining our beta! We'll be in touch soon with early access details.
                </p>
              </div>
            </div>
            <div className="flex justify-center order-1 lg:order-2 -mt-4 lg:mt-0">
              <BetaValueReceipt />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          {/* Left: Form - Order 2 on mobile, 1 on desktop */}
          <div className="space-y-6 order-2 lg:order-1">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              You're One Form Away from Simpler Chapter Dues
            </h2>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    validate: {
                      notEmpty: (value) => value.trim() !== "" || "Email cannot be empty",
                      validFormat: (value) => {
                        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
                        return emailRegex.test(value) || "Please enter a valid email address";
                      },
                      maxLength: (value) => value.length <= 254 || "Email is too long (max 254 characters)",
                      noSpaces: (value) => !value.includes(" ") || "Email cannot contain spaces"
                    }
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="your.email@university.edu"
                          className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-duesly-500 focus:border-transparent"
                          maxLength={254}
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
                    validate: {
                      notEmpty: (value) => value.trim() !== "" || "Phone number cannot be empty",
                      validFormat: (value) => {
                        // Remove all non-digit characters except + for validation
                        const cleanPhone = value.replace(/[^\d+]/g, "");
                        
                        // Check if it's a valid phone number format
                        // Supports: +1234567890, 1234567890, (123) 456-7890, 123-456-7890, etc.
                        const phoneRegex = /^[+]?[1-9][\d]{6,14}$/;
                        
                        if (!phoneRegex.test(cleanPhone)) {
                          return "Please enter a valid phone number";
                        }
                        
                        // Additional checks for specific formats
                        const digitsOnly = cleanPhone.replace(/\D/g, "");
                        
                        // US numbers: 10 digits (add +1), 11 digits starting with 1, or 7 digits (local)
                        if (digitsOnly.length === 10 || (digitsOnly.length === 11 && digitsOnly.startsWith("1")) || digitsOnly.length === 7) {
                          return true;
                        }
                        
                        // International numbers: must start with + and have 7-15 digits
                        if (cleanPhone.startsWith("+") && digitsOnly.length >= 7 && digitsOnly.length <= 15) {
                          return true;
                        }
                        
                        return "Please enter a valid phone number format";
                      },
                      minLength: (value) => {
                        const digits = value.replace(/\D/g, "");
                        return digits.length >= 7 || "Phone number must have at least 7 digits";
                      },
                      maxLength: (value) => {
                        const digits = value.replace(/\D/g, "");
                        return digits.length <= 15 || "Phone number cannot exceed 15 digits";
                      },
                      noInvalidChars: (value) => {
                        // Allow digits, spaces, parentheses, hyphens, dots, and +
                        const validCharsRegex = /^[\d\s()\-+.]+$/;
                        return validCharsRegex.test(value) || "Phone number contains invalid characters";
                      }
                    }
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">Phone</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="tel"
                          placeholder="(555) 123-4567 or +1 555 123 4567"
                          className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-duesly-500 focus:border-transparent"
                          maxLength={25}
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
                    validate: {
                      notEmpty: (value) => value.trim() !== "" || "University name cannot be empty",
                      minLength: (value) => value.trim().length >= 2 || "University name must be at least 2 characters",
                      maxLength: (value) => value.length <= 100 || "University name is too long (max 100 characters)",
                      validFormat: (value) => {
                        const schoolRegex = /^[a-zA-Z\s\-&'()]+$/;
                        return schoolRegex.test(value.trim()) || "University name contains invalid characters";
                      },
                      noOnlySpaces: (value) => value.trim().length > 0 || "University name cannot be only spaces"
                    }
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">University Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="University of California"
                          className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-duesly-500 focus:border-transparent"
                          maxLength={100}
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
                    validate: {
                      notEmpty: (value) => value.trim() !== "" || "Fraternity name cannot be empty",
                      minLength: (value) => value.trim().length >= 2 || "Fraternity name must be at least 2 characters",
                      maxLength: (value) => value.length <= 100 || "Fraternity name is too long (max 100 characters)",
                      validFormat: (value) => {
                        const fraternityRegex = /^[a-zA-Z\s\-&'()]+$/;
                        return fraternityRegex.test(value.trim()) || "Fraternity name contains invalid characters";
                      },
                      noOnlySpaces: (value) => value.trim().length > 0 || "Fraternity name cannot be only spaces"
                    }
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">Fraternity Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Sigma Phi Epsilon"
                          className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-duesly-500 focus:border-transparent"
                          maxLength={100}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  size="lg"
                  className="w-full bg-duesly-500 hover:bg-duesly-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  {isSubmitting ? "Submitting..." : "Join the Beta Now"}
                </Button>
                
                <p className="text-sm text-gray-500 text-center">
                  No setup required. Takes 30 seconds.
                </p>
              </form>
            </Form>
          </div>
          
          {/* Right: Beta Value Receipt - Order 1 on mobile, 2 on desktop */}
          <div className="flex justify-center order-1 lg:order-2 -mt-4 lg:mt-0">
            <BetaValueReceipt />
          </div>
        </div>
      </div>
    </div>
  );
}; 