import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, TrendingUp, Target, Briefcase, DollarSign } from "lucide-react";
import { Link } from "wouter";
import EmailSubscriptionCTA from "@/components/EmailSubscriptionCTA";

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const ListingsCommercial = () => {

  return (
    <div data-testid="listings-commercial-page">
      {/* Executive Commercial Hero */}
      <section className="executive-section bg-white dark:bg-neutral-950 min-h-[70vh] flex items-center" data-testid="commercial-hero">
        <div className="executive-container">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-8">
              <div className="executive-badge mb-8">
                Commercial Listings
              </div>
              
              <h1 className="font-display text-display-xl text-neutral-900 dark:text-neutral-100 mb-8">
                Manhattan's Premier
                <span className="block text-accent">Commercial Properties</span>
              </h1>
              
              <p className="text-body-xl text-neutral-600 dark:text-neutral-400 mb-12 max-w-2xl">
                Discover exceptional office buildings, retail spaces, and investment opportunities 
                in Manhattan's most sought-after business districts. Each property represents 
                institutional-grade commercial real estate.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" onClick={() => scrollToTop()}>
                  <Button className="executive-button executive-button-primary" data-testid="schedule-tour">
                    Schedule Property Tour
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/services/commercial" onClick={() => scrollToTop()}>
                  <Button className="executive-button executive-button-secondary" data-testid="commercial-services">
                    Commercial Services
                    <Briefcase className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="lg:col-span-4">
              <div className="executive-card bg-neutral-50 dark:bg-neutral-900">
                <div className="p-8">
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-widest mb-8">
                    Commercial Portfolio
                  </div>
                  <div className="space-y-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-display-sm text-neutral-900 dark:text-neutral-100">43</div>
                        <div className="text-body-sm text-neutral-600 dark:text-neutral-400">Available Properties</div>
                      </div>
                      <Building2 className="w-5 h-5 text-accent" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-display-sm text-neutral-900 dark:text-neutral-100">$2.8M</div>
                        <div className="text-body-sm text-neutral-600 dark:text-neutral-400">Average Listing Price</div>
                      </div>
                      <DollarSign className="w-5 h-5 text-accent" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-display-sm text-neutral-900 dark:text-neutral-100">12</div>
                        <div className="text-body-sm text-neutral-600 dark:text-neutral-400">Districts Covered</div>
                      </div>
                      <Target className="w-5 h-5 text-accent" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Executive Property Search */}
      <section className="executive-section bg-neutral-50 dark:bg-neutral-900 hairline-top" data-testid="commercial-listings">
        <div className="executive-container">
          <div className="mb-12 text-center">
            <div className="executive-badge mb-8">
              Live Property Search
            </div>
            <h2 className="font-display text-display-md text-neutral-900 dark:text-neutral-100 mb-6">
              Commercial Property Listings
            </h2>
            <p className="text-body-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Browse our comprehensive database of available commercial properties with advanced search and filtering capabilities.
            </p>
          </div>
          
          <div className="executive-card bg-white dark:bg-neutral-950 p-12 text-center">
            <p className="text-body-lg text-neutral-600 dark:text-neutral-400 mb-6">
              Advanced property search and filtering coming soon. Contact our team for current listings.
            </p>
            <Link href="/contact" onClick={scrollToTop}>
              <Button className="executive-button executive-button-primary">
                Request Listings
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Executive Market Intelligence */}
      <section className="executive-section bg-white dark:bg-neutral-950 hairline-top">
        <div className="executive-container">
          <div className="text-center">
            <EmailSubscriptionCTA 
              title="Prime Commercial Intelligence"
              description="Receive exclusive access to new commercial listings, market analysis, and investment opportunities before they reach the public market"
              context="listing"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ListingsCommercial;