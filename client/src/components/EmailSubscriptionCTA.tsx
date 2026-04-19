import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Mail, CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { insertSubscriptionSchema } from "@shared/schema";

const emailSubscriptionSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email address"),
});

type EmailSubscriptionData = z.infer<typeof emailSubscriptionSchema>;

interface EmailSubscriptionCTAProps {
  title?: string;
  description?: string;
  context?: "market" | "listing";
}

const EmailSubscriptionCTA = ({ 
  title = "Stay Updated with Market Insights", 
  description = "Get notified about new listings and market reports",
  context = "market"
}: EmailSubscriptionCTAProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<EmailSubscriptionData>({
    resolver: zodResolver(emailSubscriptionSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const createSubscriptionMutation = useMutation({
    mutationFn: (data: EmailSubscriptionData) => {
      const subscriptionData = {
        email: data.email,
        name: data.name,
        phone: null,
        monthlyReports: true,
        newListings: true,
        priceRange: null,
        propertyType: null,
        neighborhoods: [],
        isActive: true,
      };
      return apiRequest("POST", "/api/subscriptions", subscriptionData);
    },
    onSuccess: () => {
      setIsSubmitted(true);
      queryClient.invalidateQueries({ queryKey: ["/api/subscriptions"] });
      toast({
        title: "Subscription Successful!",
        description: "You'll receive email notifications about new listings and market updates.",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Subscription Failed",
        description: error.message.includes("Email already subscribed") 
          ? "This email is already subscribed. Thank you for your interest!"
          : "Failed to create subscription. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: EmailSubscriptionData) => {
    createSubscriptionMutation.mutate(data);
  };

  if (isSubmitted) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center" data-testid="email-subscription-success">
        <CheckCircle2 className="h-8 w-8 text-green-600 mx-auto mb-3" />
        <h3 className="font-semibold text-gray-900 mb-2">Thank you for subscribing!</h3>
        <p className="text-sm text-gray-600 mb-4">
          You'll receive email updates about new listings and market insights.
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsSubmitted(false)}
          data-testid="button-subscribe-another"
        >
          Subscribe Another Email
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-start space-x-4" data-testid="email-subscription-cta">
      <div className="flex-shrink-0">
        <Mail className="h-6 w-6 text-red-600" />
      </div>
      <div className="flex-1">
        <h3 className="font-serif text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 text-sm">
          {description}
        </p>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3" data-testid="email-subscription-form">
          <div className="flex space-x-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter your full name"
                className="bg-white text-gray-900 border border-gray-300 placeholder:text-gray-500"
                data-testid="input-subscription-name"
                {...form.register("name")}
              />
              {form.formState.errors.name && (
                <p className="text-red-600 text-xs mt-1" data-testid="error-name">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>
            <div className="flex-1">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="bg-white text-gray-900 border border-gray-300 placeholder:text-gray-500"
                data-testid="input-subscription-email"
                {...form.register("email")}
              />
              {form.formState.errors.email && (
                <p className="text-red-600 text-xs mt-1" data-testid="error-email">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>
          </div>
          <Button
            type="submit"
            disabled={createSubscriptionMutation.isPending}
            className="bg-red-600 hover:bg-red-700 text-white px-6 w-full"
            data-testid="button-subscribe-email"
          >
            {createSubscriptionMutation.isPending ? "Getting Access..." : "Get Access"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EmailSubscriptionCTA;