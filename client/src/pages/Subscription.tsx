import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Bell, Mail, CheckCircle2, AlertCircle } from "lucide-react";
import { insertSubscriptionSchema, type InsertSubscription } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const subscriptionFormSchema = insertSubscriptionSchema.extend({
  monthlyReports: insertSubscriptionSchema.shape.monthlyReports.default(false),
  newListings: insertSubscriptionSchema.shape.newListings.default(false),
  isActive: insertSubscriptionSchema.shape.isActive.default(true),
});

type SubscriptionFormData = typeof subscriptionFormSchema._type;

const Subscription = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<SubscriptionFormData>({
    resolver: zodResolver(subscriptionFormSchema),
    defaultValues: {
      email: "",
      name: "",
      phone: "",
      monthlyReports: false,
      newListings: false,
      priceRange: undefined,
      propertyType: undefined,
      neighborhoods: [],
      isActive: true,
    },
  });

  const createSubscriptionMutation = useMutation({
    mutationFn: (data: InsertSubscription) => 
      apiRequest("POST", "/api/subscriptions", data),
    onSuccess: () => {
      setIsSubmitted(true);
      queryClient.invalidateQueries({ queryKey: ["/api/subscriptions"] });
      toast({
        title: "Subscription Successful!",
        description: "You'll receive email notifications based on your preferences.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Subscription Failed",
        description: error.message.includes("Email already subscribed") 
          ? "This email is already subscribed. Please use a different email address."
          : "Failed to create subscription. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: SubscriptionFormData) => {
    createSubscriptionMutation.mutate(data);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white dark:bg-neutral-950" data-testid="subscription-page">
        {/* Success State */}
        <section className="executive-section min-h-screen flex items-center bg-white dark:bg-neutral-950">
          <div className="executive-container">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              
              <div className="inline-block border border-neutral-200 dark:border-neutral-700 rounded-full px-4 py-2 text-xs font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-widest mb-8">
                Subscription Complete
              </div>
              
              <h1 className="font-display text-display-lg text-neutral-900 dark:text-neutral-100 mb-8">
                Welcome to
                <span className="block text-accent">Bravado Insights</span>
              </h1>
              
              <p className="text-body-lg text-neutral-600 dark:text-neutral-400 mb-8">
                Your subscription has been successfully created. You'll start receiving personalized 
                market updates and property notifications based on your preferences.
              </p>
              
              <Button 
                onClick={() => setIsSubmitted(false)}
                className="executive-button executive-button-primary"
                data-testid="button-modify-subscription"
              >
                Modify Subscription
              </Button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950" data-testid="subscription-page">
      {/* Executive Hero Section */}
      <section className="executive-section bg-white dark:bg-neutral-950 min-h-[60vh] flex items-center" data-testid="subscription-hero">
        <div className="executive-container">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-8">
              <div className="w-12 h-12 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-8">
                <Bell className="h-6 w-6 text-accent" />
              </div>
              
              <div className="inline-block border border-neutral-200 dark:border-neutral-700 rounded-full px-4 py-2 text-xs font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-widest mb-8">
                Market Intelligence
              </div>
              
              <h1 className="font-display text-display-lg text-neutral-900 dark:text-neutral-100 mb-8">
                Stay Informed
                <span className="block text-accent">NYC Market Updates</span>
              </h1>
              
              <p className="text-body-lg text-neutral-600 dark:text-neutral-400 mb-12 max-w-2xl">
                Subscribe to receive monthly market reports and instant notifications when new properties 
                match your criteria. Strategic intelligence for informed investment decisions.
              </p>
            </div>
            
            <div className="lg:col-span-4">
              <div className="executive-card bg-neutral-50 dark:bg-neutral-900 p-8">
                <div className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-widest mb-6">
                  Subscription Benefits
                </div>
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-accent"></div>
                    <span className="text-body-sm text-neutral-900 dark:text-neutral-100">Monthly Market Reports</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-accent"></div>
                    <span className="text-body-sm text-neutral-900 dark:text-neutral-100">Instant Property Alerts</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-accent"></div>
                    <span className="text-body-sm text-neutral-900 dark:text-neutral-100">Expert Market Analysis</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Form */}
      <section className="executive-section bg-neutral-50 dark:bg-neutral-900 hairline-top" data-testid="subscription-form-section">
        <div className="executive-container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display text-display-md text-neutral-900 dark:text-neutral-100 mb-6">Create Your Subscription</h2>
              <div className="w-24 h-px bg-accent mx-auto mb-8"></div>
              <p className="text-body-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Customize your preferences to receive the most relevant market insights and property alerts
              </p>
            </div>

            <div className="executive-card p-12">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12" data-testid="subscription-form">
                  {/* Personal Information */}
                  <div>
                    <h3 className="font-display text-body-xl text-neutral-900 dark:text-neutral-100 mb-8 flex items-center">
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center mr-3">
                        <Mail className="h-4 w-4 text-accent" />
                      </div>
                      Contact Information
                    </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="John Doe"
                              data-testid="input-name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="john@example.com"
                              data-testid="input-email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number (Optional)</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="(555) 123-4567"
                            data-testid="input-phone"
                            {...field}
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormDescription>
                          For urgent property alerts (optional)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Subscription Preferences */}
                <div>
                  <h3 className="font-serif text-2xl font-bold mb-6 flex items-center">
                    <Bell className="h-6 w-6 mr-3 text-red-600" />
                    Notification Preferences
                  </h3>

                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="monthlyReports"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value ?? false}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-monthly-reports"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="font-semibold">
                              Monthly Market Reports
                            </FormLabel>
                            <FormDescription>
                              Receive comprehensive market analysis, trends, and insights every month
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="newListings"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value ?? false}
                              onCheckedChange={field.onChange}
                              data-testid="checkbox-new-listings"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="font-semibold">
                              New Property Listings
                            </FormLabel>
                            <FormDescription>
                              Get notified immediately when new properties matching your criteria become available
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Property Preferences */}
                <div>
                  <h3 className="font-serif text-2xl font-bold mb-6">Property Preferences</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="priceRange"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price Range</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value ?? undefined}>
                            <FormControl>
                              <SelectTrigger data-testid="select-price-range">
                                <SelectValue placeholder="Select price range" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="under-500k">Under $500K</SelectItem>
                              <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                              <SelectItem value="1m-2m">$1M - $2M</SelectItem>
                              <SelectItem value="2m-5m">$2M - $5M</SelectItem>
                              <SelectItem value="5m+">$5M+</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="propertyType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Property Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value ?? undefined}>
                            <FormControl>
                              <SelectTrigger data-testid="select-property-type">
                                <SelectValue placeholder="Select property type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="residential">Residential Only</SelectItem>
                              <SelectItem value="commercial">Commercial Only</SelectItem>
                              <SelectItem value="both">Both Residential & Commercial</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={createSubscriptionMutation.isPending}
                  className="w-full bg-primary hover:bg-primary/90 text-white py-3 px-6 font-semibold transition-colors"
                  data-testid="button-subscribe"
                >
                  {createSubscriptionMutation.isPending ? "Creating Subscription..." : "Subscribe to Updates"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50" data-testid="subscription-benefits">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold mb-6">Why Subscribe?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay ahead of the New York City real estate market with insider insights and early access to new listings
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="h-8 w-8" />
              </div>
              <h3 className="font-serif text-xl font-bold mb-3">Instant Alerts</h3>
              <p className="text-gray-600">
                Be the first to know when properties matching your criteria become available
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="h-8 w-8" />
              </div>
              <h3 className="font-serif text-xl font-bold mb-3">Market Insights</h3>
              <p className="text-gray-600">
                Monthly reports with neighborhood trends, pricing analysis, and market forecasts
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="font-serif text-xl font-bold mb-3">Expert Curation</h3>
              <p className="text-gray-600">
                Carefully selected properties and insights from our experienced real estate professionals
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Subscription;