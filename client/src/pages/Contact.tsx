import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { insertInquirySchema, type InsertInquiry } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import buildingImage from "@assets/01.433-Broadway_1757449641987.jpg";

// Contact form schema - extends inquiry schema for contact form
const contactFormSchema = insertInquirySchema.extend({
  inquiryType: insertInquirySchema.shape.inquiryType.default("general"),
  serviceType: z.string().optional(),
}).omit({
  propertyId: true,
  agentId: true,
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      inquiryType: "general",
      serviceType: "",
    },
  });

  const createInquiryMutation = useMutation({
    mutationFn: (data: ContactFormData) => 
      apiRequest("POST", "/api/inquiries", data),
    onSuccess: () => {
      setIsSubmitted(true);
      queryClient.invalidateQueries({ queryKey: ["/api/inquiries"] });
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Failed to Send Message",
        description: "Please try again or call us directly.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    createInquiryMutation.mutate(data);
  };
  return (
    <div data-testid="contact-page">
      {/* Executive Contact Hero */}
      <section className="executive-section bg-white dark:bg-neutral-950 min-h-[70vh] flex items-center" data-testid="contact-hero">
        <div className="executive-container">
          <div className="text-center">
            <div className="executive-badge mb-8">
              Connect With Us
            </div>
            
            <h1 className="font-display text-display-xl text-neutral-900 dark:text-neutral-100 mb-8">
              Connect
              <span className="block text-accent">With Us</span>
            </h1>
            
            <p className="text-body-xl text-neutral-600 dark:text-neutral-400 mb-12 max-w-2xl mx-auto">
              Connect with Manhattan's premier real estate professionals for expert guidance 
              on your commercial and residential property needs. Our team provides personalized 
              consultation and strategic advice.
            </p>
          </div>
        </div>
      </section>

      {/* Executive Contact Information */}
      <section className="executive-section bg-neutral-50 dark:bg-neutral-900 hairline-top" data-testid="contact-info">
        <div className="executive-container">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Details */}
            <div>
              <div className="executive-badge mb-8">
                Office Information
              </div>
              <h2 className="font-display text-display-md text-neutral-900 dark:text-neutral-100 mb-12">Manhattan Office</h2>
              <div className="space-y-8 mb-12">
                <div className="executive-card group">
                  <div className="flex items-start space-x-6">
                    <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center group-hover:bg-accent/10 transition-colors duration-300">
                      <MapPin className="h-6 w-6 text-neutral-600 dark:text-neutral-400 group-hover:text-accent transition-colors duration-300" />
                    </div>
                    <div>
                      <h3 className="font-display text-body-lg text-neutral-900 dark:text-neutral-100 mb-2">Office Location</h3>
                      <p className="text-body-md text-neutral-600 dark:text-neutral-400">
                        433 Broadway<br />
                        New York, NY 10013<br />
                        SoHo District
                      </p>
                    </div>
                  </div>
                </div>

                <div className="executive-card group">
                  <div className="flex items-start space-x-6">
                    <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center group-hover:bg-accent/10 transition-colors duration-300">
                      <Phone className="h-6 w-6 text-neutral-600 dark:text-neutral-400 group-hover:text-accent transition-colors duration-300" />
                    </div>
                    <div>
                      <h3 className="font-display text-body-lg text-neutral-900 dark:text-neutral-100 mb-2">Phone</h3>
                      <p className="text-body-md text-neutral-600 dark:text-neutral-400">
                        <a href="tel:+12125550123" className="hover:text-accent transition-colors">
                          (212) 555-0123
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="executive-card group">
                  <div className="flex items-start space-x-6">
                    <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center group-hover:bg-accent/10 transition-colors duration-300">
                      <Mail className="h-6 w-6 text-neutral-600 dark:text-neutral-400 group-hover:text-accent transition-colors duration-300" />
                    </div>
                    <div>
                      <h3 className="font-display text-body-lg text-neutral-900 dark:text-neutral-100 mb-2">Email</h3>
                      <p className="text-body-md text-neutral-600 dark:text-neutral-400">
                        <a href="mailto:info@bravadonyc.com" className="hover:text-accent transition-colors">
                          info@bravadonyc.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="executive-card">
                  <div className="flex items-center space-x-6">
                    <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                      <Clock className="h-6 w-6 text-neutral-600 dark:text-neutral-400" />
                    </div>
                    <div>
                      <h3 className="font-display text-body-lg text-neutral-900 dark:text-neutral-100 mb-2">Office Hours</h3>
                      <p className="text-body-md text-neutral-600 dark:text-neutral-400">
                        Monday - Friday: 9:00 AM - 6:00 PM<br />
                        Saturday: 10:00 AM - 4:00 PM<br />
                        Sunday: By Appointment
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Office Photo */}
              <div className="executive-card overflow-hidden">
                <img 
                  src={buildingImage} 
                  alt="Bravado Real Estate Office at 433 Broadway" 
                  className="w-full h-auto"
                  data-testid="office-building-image"
                />
              </div>
            </div>

            {/* Executive Contact Form */}
            <div className="executive-card bg-white dark:bg-neutral-950">
              {isSubmitted ? (
                <div className="text-center py-8" data-testid="contact-form-success">
                  <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto mb-4" />
                  <h3 className="font-serif text-2xl font-bold mb-2">Message Sent Successfully!</h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for contacting us. We'll get back to you within 24 hours.
                  </p>
                  <Button 
                    onClick={() => setIsSubmitted(false)}
                    variant="outline"
                    data-testid="send-another-message-button"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <>
                  <div className="text-center mb-8">
                    <div className="executive-badge mb-6">
                      Professional Inquiry
                    </div>
                    <h2 className="font-display text-display-md text-neutral-900 dark:text-neutral-100 mb-4">Send Us a Message</h2>
                    <p className="text-body-lg text-neutral-600 dark:text-neutral-400">
                      Have a question or want to discuss your real estate needs? We'd love to hear from you.
                    </p>
                  </div>

                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="contact-form">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name *</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter your full name" 
                                {...field} 
                                data-testid="input-name"
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
                            <FormLabel>Email Address *</FormLabel>
                            <FormControl>
                              <Input 
                                type="email" 
                                placeholder="Enter your email address" 
                                {...field} 
                                data-testid="input-email"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input 
                                type="tel" 
                                placeholder="Enter your phone number (optional)" 
                                {...field} 
                                value={field.value || ""}
                                data-testid="input-phone"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="serviceType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Service Interest</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-service-type">
                                  <SelectValue placeholder="Select the service you're interested in" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="general">General Inquiry</SelectItem>
                                <SelectItem value="residential-sales">Residential Sales</SelectItem>
                                <SelectItem value="residential-leasing">Residential Leasing</SelectItem>
                                <SelectItem value="commercial-sales">Commercial Sales</SelectItem>
                                <SelectItem value="commercial-leasing">Commercial Leasing</SelectItem>
                                <SelectItem value="property-management">Property Management</SelectItem>
                                <SelectItem value="investment-services">Investment Services</SelectItem>
                                <SelectItem value="market-analysis">Market Analysis</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message *</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Tell us about your real estate needs or ask us any questions..."
                                className="min-h-32"
                                {...field} 
                                data-testid="input-message"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="text-center">
                        <Button 
                          type="submit" 
                          disabled={createInquiryMutation.isPending}
                          className="executive-button executive-button-primary w-full"
                          data-testid="button-submit-contact"
                        >
                          <Send className="w-4 h-4 mr-2" />
                          {createInquiryMutation.isPending ? "Sending..." : "Send Message"}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;