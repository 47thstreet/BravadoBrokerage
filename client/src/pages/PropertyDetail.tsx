import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Property } from "@shared/schema";
import { MapPin, Bed, Bath, Square, Phone, Mail, Building2, Calendar, Check, Star, Share, Heart, ArrowRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

interface PropertyDetailProps {
  params: { id: string };
}

const PropertyDetail = ({ params }: PropertyDetailProps) => {
  // State to control when to show IDX fallback
  const [showIDXFallback, setShowIDXFallback] = useState(false);

  // Always try internal property API first
  const { data: property, isLoading, error: propertyError } = useQuery<Property>({
    queryKey: ["/api/properties", params.id],
    queryFn: async () => {
      const response = await fetch(`/api/properties/${params.id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch property details");
      }
      return response.json();
    },
  });

  // If internal API failed (404 or error), show fallback
  const shouldShowFallback = propertyError && !isLoading;

  // Show fallback when internal API fails
  if (shouldShowFallback || showIDXFallback) {
    return (
      <div className="min-h-screen bg-white dark:bg-neutral-950" data-testid="property-detail-fallback">
        {/* Executive Header Section */}
        <section className="executive-section">
          <div className="executive-container">
            <div className="max-w-4xl mx-auto">
              {/* Header with breadcrumb style indicator */}
              <div className="inline-block border border-neutral-200 dark:border-neutral-700 rounded-full px-4 py-2 text-xs font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-widest mb-8 bg-white/80 dark:bg-neutral-950/80">
                Property Details
              </div>

              <h1 className="font-display text-display-lg text-neutral-900 dark:text-neutral-100 mb-8">
                Property Listing
                <span className="block text-accent">#{params.id}</span>
              </h1>

              <p className="text-body-lg text-neutral-600 dark:text-neutral-400 mb-12 max-w-2xl">
                For detailed information about this property, please contact our team.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="executive-section hairline-top bg-neutral-50 dark:bg-neutral-900">
          <div className="executive-container">
            <div className="max-w-4xl mx-auto">
              <div className="executive-card p-12 text-center">
                <h3 className="font-display text-display-md text-neutral-900 dark:text-neutral-100 mb-6">
                  Request Property Information
                </h3>
                <p className="text-body-lg text-neutral-600 dark:text-neutral-400 mb-8">
                  Contact our team to get more details about this property, schedule a viewing, or discuss investment opportunities.
                </p>
                <Link href="/contact">
                  <Button className="executive-button executive-button-primary">
                    Contact Our Team
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="executive-section hairline-top">
          <div className="executive-container">
            <div className="max-w-4xl mx-auto">
              <div className="executive-card">
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-display text-display-md text-neutral-900 dark:text-neutral-100 mb-6">
                      Interested in this property?
                    </h3>
                    <p className="text-body-lg text-neutral-600 dark:text-neutral-400 mb-8">
                      Connect with our expert agents to schedule a viewing, request additional information, 
                      or discuss investment opportunities.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <button 
                        className="inline-flex items-center justify-center px-6 py-4 bg-accent hover:bg-accent/90 text-white font-medium text-body rounded-lg transition-all duration-200 hover:transform hover:-translate-y-1 hover:shadow-lg" 
                        data-testid="schedule-viewing"
                      >
                        <Calendar className="h-5 w-5 mr-2" />
                        Schedule Viewing
                      </button>
                      
                      <button 
                        className="inline-flex items-center justify-center px-6 py-4 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-900 font-medium text-body rounded-lg transition-all duration-200" 
                        data-testid="request-info"
                      >
                        <Phone className="h-5 w-5 mr-2" />
                        Request Info
                      </button>
                    </div>
                  </div>

                  <div className="lg:pl-8">
                    <div className="space-y-6">
                      <div className="hairline-bottom pb-6">
                        <h4 className="font-display text-body-lg font-medium text-neutral-900 dark:text-neutral-100 mb-4">
                          Contact Information
                        </h4>
                        <div className="space-y-3">
                          <div className="flex items-center text-neutral-600 dark:text-neutral-400">
                            <Phone className="h-5 w-5 mr-3" />
                            <span className="text-body">(212) 555-0123</span>
                          </div>
                          <div className="flex items-center text-neutral-600 dark:text-neutral-400">
                            <Mail className="h-5 w-5 mr-3" />
                            <span className="text-body">info@bravadonyc.com</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-display text-body-lg font-medium text-neutral-900 dark:text-neutral-100 mb-4">
                          Office Hours
                        </h4>
                        <div className="space-y-2 text-body text-neutral-600 dark:text-neutral-400">
                          <div className="flex justify-between">
                            <span>Monday - Friday</span>
                            <span>9:00 AM - 7:00 PM</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Saturday</span>
                            <span>10:00 AM - 5:00 PM</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Sunday</span>
                            <span>12:00 PM - 5:00 PM</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Loading state with executive design
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-neutral-950 flex items-center justify-center" data-testid="property-detail-loading">
        <div className="executive-container">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800 mb-8">
              <Building2 className="h-8 w-8 text-accent animate-pulse" />
            </div>
            <h2 className="font-display text-display-md text-neutral-900 dark:text-neutral-100 mb-4">
              Loading Property Details
            </h2>
            <p className="text-body-lg text-neutral-600 dark:text-neutral-400">
              Please wait while we retrieve the property information...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Internal property not found
  if (!property) {
    return (
      <div className="min-h-screen bg-white dark:bg-neutral-950 flex items-center justify-center" data-testid="property-not-found">
        <div className="executive-container">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800 mb-8">
              <Building2 className="h-8 w-8 text-accent" />
            </div>
            
            <h2 className="font-display text-display-md text-neutral-900 dark:text-neutral-100 mb-6">
              Property Not Found
            </h2>
            
            <p className="text-body-lg text-neutral-600 dark:text-neutral-400 mb-8">
              The property you're looking for doesn't exist or has been removed.
            </p>

            <button 
              onClick={() => setShowIDXFallback(true)}
              className="inline-flex items-center justify-center px-8 py-4 bg-accent hover:bg-accent/90 text-white font-medium text-body rounded-lg transition-all duration-200 hover:transform hover:-translate-y-1 hover:shadow-lg" 
              data-testid="try-idx-search"
            >
              Search Partner Database
            </button>
          </div>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number, priceType: string) => {
    if (priceType === "sale") {
      return `$${(price / 1000000).toFixed(1)}M`;
    } else {
      return `$${price}/sq ft`;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950" data-testid="property-detail-page">
      {/* Hero Section */}
      <section className="executive-section">
        <div className="executive-container">
          <div className="max-w-6xl mx-auto">
            {/* Property Category Badge */}
            <div className="inline-block border border-neutral-200 dark:border-neutral-700 rounded-full px-4 py-2 text-xs font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-widest mb-8 bg-white/80 dark:bg-neutral-950/80">
              {property.propertyType} Property
            </div>

            {/* Hero Image */}
            <div className="mb-12">
              <img
                src={property.images?.[0] || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600"}
                alt={property.title}
                className="w-full h-96 lg:h-[500px] object-cover rounded-xl shadow-lg"
                data-testid="property-hero-image"
              />
            </div>

            {/* Above-Fold Property Info - Mobile-First Layout */}
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                {/* Title and Key Info */}
                <div className="mb-8">
                  <h1 className="font-display text-display-lg text-neutral-900 dark:text-neutral-100 mb-4" data-testid="property-title">
                    {property.title}
                  </h1>
                  
                  <div className="flex items-center text-neutral-600 dark:text-neutral-400 mb-6">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span className="text-body-lg" data-testid="property-address">{property.address}</span>
                  </div>

                  {/* Quick Action Buttons - Mobile Priority */}
                  <div className="flex flex-wrap gap-3 mb-8 lg:hidden">
                    <button 
                      className="flex-1 min-w-[140px] inline-flex items-center justify-center px-4 py-3 bg-accent hover:bg-accent/90 text-white font-medium text-body rounded-lg transition-all duration-200" 
                      data-testid="mobile-contact-agent"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call Agent
                    </button>
                    <button 
                      className="flex-1 min-w-[140px] inline-flex items-center justify-center px-4 py-3 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-900 font-medium text-body rounded-lg transition-all duration-200" 
                      data-testid="mobile-schedule-tour"
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Tour
                    </button>
                    <button 
                      className="inline-flex items-center justify-center px-4 py-3 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-900 font-medium text-body rounded-lg transition-all duration-200" 
                      data-testid="mobile-save-property"
                    >
                      <Heart className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Key Stats - Compact Display */}
                {property.propertyType === "residential" ? (
                  <div className="grid grid-cols-3 gap-4 mb-8" data-testid="residential-stats">
                    {property.bedrooms && (
                      <div className="text-center p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 mb-3">
                          <Bed className="h-5 w-5 text-accent" />
                        </div>
                        <div className="text-xl font-medium text-neutral-900 dark:text-neutral-100 mb-1">
                          {property.bedrooms}
                        </div>
                        <div className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                          Bedrooms
                        </div>
                      </div>
                    )}
                    
                    {property.bathrooms && (
                      <div className="text-center p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 mb-3">
                          <Bath className="h-5 w-5 text-accent" />
                        </div>
                        <div className="text-xl font-medium text-neutral-900 dark:text-neutral-100 mb-1">
                          {property.bathrooms}
                        </div>
                        <div className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                          Bathrooms
                        </div>
                      </div>
                    )}

                    {property.squareFootage && (
                      <div className="text-center p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 mb-3">
                          <Square className="h-5 w-5 text-accent" />
                        </div>
                        <div className="text-xl font-medium text-neutral-900 dark:text-neutral-100 mb-1">
                          {property.squareFootage.toLocaleString()}
                        </div>
                        <div className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                          Sq Ft
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-4 mb-8" data-testid="commercial-stats">
                    {property.squareFootage && (
                      <div className="text-center p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 mb-3">
                          <Square className="h-5 w-5 text-accent" />
                        </div>
                        <div className="text-xl font-medium text-neutral-900 dark:text-neutral-100 mb-1">
                          {property.squareFootage.toLocaleString()}
                        </div>
                        <div className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                          Sq Ft
                        </div>
                      </div>
                    )}
                    
                    {property.floor && (
                      <div className="text-center p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 mb-3">
                          <Building2 className="h-5 w-5 text-accent" />
                        </div>
                        <div className="text-xl font-medium text-neutral-900 dark:text-neutral-100 mb-1">
                          {property.floor}
                        </div>
                        <div className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                          Floor
                        </div>
                      </div>
                    )}

                    {property.subType && (
                      <div className="text-center p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 mb-3">
                          <Building2 className="h-5 w-5 text-accent" />
                        </div>
                        <div className="text-xl font-medium text-neutral-900 dark:text-neutral-100 mb-1 capitalize">
                          {property.subType}
                        </div>
                        <div className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                          Type
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Price & Contact Card - Above-Fold Priority */}
              <div className="lg:col-span-1">
                <div className="executive-card sticky top-8">
                  {/* Price Display */}
                  <div className="text-center mb-8">
                    <div className="inline-block border border-neutral-200 dark:border-neutral-700 rounded-full px-3 py-1 text-xs font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-widest mb-4">
                      {property.priceType === "sale" ? "For Sale" : "For Lease"}
                    </div>
                    
                    <div className="text-4xl font-medium text-accent mb-2" data-testid="property-price">
                      {formatPrice(property.price, property.priceType)}
                    </div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      {property.priceType === 'sale' ? 'Purchase Price' : 'Lease Rate'}
                    </div>
                  </div>

                  {/* Primary Actions */}
                  <div className="space-y-3 mb-8">
                    <button 
                      className="w-full inline-flex items-center justify-center px-6 py-4 bg-accent hover:bg-accent/90 text-white font-medium text-body rounded-lg transition-all duration-200 hover:transform hover:-translate-y-1 hover:shadow-lg" 
                      data-testid="contact-agent"
                    >
                      <Phone className="h-5 w-5 mr-2" />
                      Contact Agent
                    </button>
                    
                    <button 
                      className="w-full inline-flex items-center justify-center px-6 py-4 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-900 font-medium text-body rounded-lg transition-all duration-200" 
                      data-testid="schedule-tour"
                    >
                      <Calendar className="h-5 w-5 mr-2" />
                      Schedule Tour
                    </button>

                    <div className="grid grid-cols-2 gap-2">
                      <button 
                        className="inline-flex items-center justify-center px-4 py-3 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-900 font-medium text-body-sm rounded-lg transition-all duration-200" 
                        data-testid="save-property"
                      >
                        <Heart className="h-4 w-4 mr-2" />
                        Save
                      </button>
                      <button 
                        className="inline-flex items-center justify-center px-4 py-3 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-900 font-medium text-body-sm rounded-lg transition-all duration-200" 
                        data-testid="share-property"
                      >
                        <Share className="h-4 w-4 mr-2" />
                        Share
                      </button>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="hairline-top pt-6">
                    <h4 className="font-display text-body-lg font-medium text-neutral-900 dark:text-neutral-100 mb-4">
                      Direct Contact
                    </h4>
                    <div className="space-y-3 text-body text-neutral-600 dark:text-neutral-400">
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 mr-3" />
                        <span>(212) 555-0123</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 mr-3" />
                        <span>info@bravadonyc.com</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Property Details with Progressive Disclosure */}
      <section className="executive-section hairline-top bg-neutral-50 dark:bg-neutral-900">
        <div className="executive-container">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Progressive Disclosure Content */}
              <div className="lg:col-span-2">
                <div className="executive-card">
                  <div className="text-center mb-8">
                    <div className="inline-block border border-neutral-200 dark:border-neutral-700 rounded-full px-4 py-2 text-xs font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-widest mb-6">
                      Property Details
                    </div>
                    <h2 className="font-display text-display-md text-neutral-900 dark:text-neutral-100 mb-6">Explore This Property</h2>
                    <div className="w-24 h-px bg-accent mx-auto"></div>
                  </div>

                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-8">
                      <TabsTrigger value="overview" data-testid="tab-overview">Overview</TabsTrigger>
                      <TabsTrigger value="features" data-testid="tab-features">Features</TabsTrigger>
                      <TabsTrigger value="details" data-testid="tab-details">Details</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="mt-6">
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-display text-body-lg font-medium text-neutral-900 dark:text-neutral-100 mb-4">Property Description</h3>
                          <p className="text-body text-neutral-600 dark:text-neutral-400 leading-relaxed" data-testid="property-description">
                            {property.description}
                          </p>
                        </div>
                        
                        {/* Key Highlights */}
                        <div>
                          <h4 className="font-display text-body font-medium text-neutral-900 dark:text-neutral-100 mb-3">Key Highlights</h4>
                          <div className="grid md:grid-cols-2 gap-3">
                            <div className="flex items-center p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                              <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                              <span className="text-body-sm text-neutral-700 dark:text-neutral-300">Premium {property.propertyType} property</span>
                            </div>
                            <div className="flex items-center p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                              <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                              <span className="text-body-sm text-neutral-700 dark:text-neutral-300">Move-in ready condition</span>
                            </div>
                            <div className="flex items-center p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                              <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                              <span className="text-body-sm text-neutral-700 dark:text-neutral-300">Prime location access</span>
                            </div>
                            <div className="flex items-center p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                              <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                              <span className="text-body-sm text-neutral-700 dark:text-neutral-300">Excellent investment potential</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="features" className="mt-6">
                      {property.features && property.features.length > 0 ? (
                        <div>
                          <h3 className="font-display text-body-lg font-medium text-neutral-900 dark:text-neutral-100 mb-6">Features & Amenities</h3>
                          <div className="grid md:grid-cols-2 gap-3">
                            {property.features.map((feature, index) => (
                              <div key={index} className="flex items-center p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg" data-testid={`feature-${index}`}>
                                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent/10 mr-3">
                                  <Check className="h-3 w-3 text-accent" />
                                </div>
                                <span className="text-body-sm text-neutral-900 dark:text-neutral-100">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <Building2 className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
                          <p className="text-body text-neutral-600 dark:text-neutral-400">Detailed features available upon request.</p>
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="details" className="mt-6">
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-display text-body-lg font-medium text-neutral-900 dark:text-neutral-100 mb-4">Property Specifications</h3>
                          <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                              <div className="flex justify-between py-2 border-b border-neutral-200 dark:border-neutral-700">
                                <span className="text-body-sm text-neutral-600 dark:text-neutral-400">Property Type</span>
                                <span className="text-body-sm font-medium text-neutral-900 dark:text-neutral-100 capitalize">{property.propertyType}</span>
                              </div>
                              {property.squareFootage && (
                                <div className="flex justify-between py-2 border-b border-neutral-200 dark:border-neutral-700">
                                  <span className="text-body-sm text-neutral-600 dark:text-neutral-400">Square Footage</span>
                                  <span className="text-body-sm font-medium text-neutral-900 dark:text-neutral-100">{property.squareFootage.toLocaleString()} sq ft</span>
                                </div>
                              )}
                              {property.priceType && (
                                <div className="flex justify-between py-2 border-b border-neutral-200 dark:border-neutral-700">
                                  <span className="text-body-sm text-neutral-600 dark:text-neutral-400">Listing Type</span>
                                  <span className="text-body-sm font-medium text-neutral-900 dark:text-neutral-100 capitalize">{property.priceType}</span>
                                </div>
                              )}
                            </div>
                            <div className="space-y-3">
                              {property.bedrooms && (
                                <div className="flex justify-between py-2 border-b border-neutral-200 dark:border-neutral-700">
                                  <span className="text-body-sm text-neutral-600 dark:text-neutral-400">Bedrooms</span>
                                  <span className="text-body-sm font-medium text-neutral-900 dark:text-neutral-100">{property.bedrooms}</span>
                                </div>
                              )}
                              {property.bathrooms && (
                                <div className="flex justify-between py-2 border-b border-neutral-200 dark:border-neutral-700">
                                  <span className="text-body-sm text-neutral-600 dark:text-neutral-400">Bathrooms</span>
                                  <span className="text-body-sm font-medium text-neutral-900 dark:text-neutral-100">{property.bathrooms}</span>
                                </div>
                              )}
                              {property.floor && (
                                <div className="flex justify-between py-2 border-b border-neutral-200 dark:border-neutral-700">
                                  <span className="text-body-sm text-neutral-600 dark:text-neutral-400">Floor</span>
                                  <span className="text-body-sm font-medium text-neutral-900 dark:text-neutral-100">{property.floor}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>

              {/* Sticky Contact Card - Mobile Optimized */}
              <div className="lg:col-span-1">
                <div className="executive-card sticky top-8">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 mb-4">
                      <Building2 className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="font-display text-display-sm text-neutral-900 dark:text-neutral-100 mb-2">
                      Ready to View?
                    </h3>
                    <p className="text-body-sm text-neutral-600 dark:text-neutral-400">
                      Connect with our expert team for immediate assistance.
                    </p>
                  </div>

                  <div className="space-y-3 mb-8">
                    <button className="w-full inline-flex items-center justify-center px-6 py-4 bg-accent hover:bg-accent/90 text-white font-medium text-body rounded-lg transition-all duration-200 hover:transform hover:-translate-y-1 hover:shadow-lg" data-testid="schedule-viewing">
                      <Calendar className="h-5 w-5 mr-2" />
                      Schedule Viewing
                    </button>
                    <button className="w-full inline-flex items-center justify-center px-6 py-4 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-900 font-medium text-body rounded-lg transition-all duration-200" data-testid="request-info">
                      <Phone className="h-5 w-5 mr-2" />
                      Call Agent
                    </button>
                  </div>

                  <div className="hairline-top pt-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-display text-body font-medium text-neutral-900 dark:text-neutral-100 mb-3">
                          Direct Contact
                        </h4>
                        <div className="space-y-2 text-body-sm text-neutral-600 dark:text-neutral-400">
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-3" />
                            <span>(212) 555-0123</span>
                          </div>
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 mr-3" />
                            <span>info@bravadonyc.com</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-display text-body font-medium text-neutral-900 dark:text-neutral-100 mb-3">
                          Office Hours
                        </h4>
                        <div className="space-y-1 text-body-sm text-neutral-600 dark:text-neutral-400">
                          <div className="flex justify-between">
                            <span>Mon - Fri</span>
                            <span>9AM - 7PM</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Saturday</span>
                            <span>10AM - 5PM</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Sunday</span>
                            <span>12PM - 5PM</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Mobile-Only Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-700 p-4 lg:hidden z-50">
        <div className="flex gap-3">
          <button 
            className="flex-1 inline-flex items-center justify-center px-6 py-4 bg-accent hover:bg-accent/90 text-white font-medium text-body rounded-lg transition-all duration-200" 
            data-testid="mobile-sticky-contact"
          >
            <Phone className="h-5 w-5 mr-2" />
            Call Agent
          </button>
          <button 
            className="flex-1 inline-flex items-center justify-center px-6 py-4 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-900 font-medium text-body rounded-lg transition-all duration-200" 
            data-testid="mobile-sticky-tour"
          >
            <Calendar className="h-5 w-5 mr-2" />
            Tour
          </button>
        </div>
      </div>

      {/* Add bottom padding for mobile sticky CTA */}
      <div className="h-20 lg:hidden"></div>
    </div>
  );
};

export default PropertyDetail;
