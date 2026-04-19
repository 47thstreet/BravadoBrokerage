import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import EmailSubscriptionCTA from "@/components/EmailSubscriptionCTA";

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const ListingsCommercialLease = () => {
  return (
    <div data-testid="listings-commercial-lease-page">
      {/* Hero Section */}
      <section className="py-16 bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800" data-testid="commercial-lease-hero">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-display text-neutral-900 dark:text-neutral-100 mb-6">
            Commercial Properties for Lease
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            Find the perfect commercial space for your business in Manhattan's premier business districts
          </p>
        </div>
      </section>

      {/* Commercial Lease Listings Section */}
      <section className="py-12 bg-neutral-50 dark:bg-neutral-900" data-testid="commercial-lease-listings">
        <div className="max-w-4xl mx-auto px-4">
          <div className="executive-card bg-white dark:bg-neutral-950 p-12 text-center">
            <p className="text-body-lg text-neutral-600 dark:text-neutral-400 mb-6">
              Advanced property search and filtering coming soon. Contact our team for current commercial lease opportunities.
            </p>
            <Link href="/contact" onClick={scrollToTop}>
              <Button className="executive-button executive-button-primary">
                Request Commercial Listings
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Email Subscription CTA */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EmailSubscriptionCTA 
            title="Prime Commercial Lease Opportunities"
            description="Get alerted when new commercial spaces for lease become available in your target areas"
            context="listing"
          />
        </div>
      </section>
    </div>
  );
};

export default ListingsCommercialLease;