import EmailSubscriptionCTA from "@/components/EmailSubscriptionCTA";

const ListingsCommercialSale = () => {

  return (
    <div data-testid="listings-commercial-sale-page">
      {/* Hero Section */}
      <section className="py-4 bg-white border-b border-gray-300" data-testid="commercial-sale-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-sans text-sm md:text-base font-medium text-primary mb-6">
            Commercial Properties for Sale
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Invest in premium commercial real estate across New York City
          </p>
        </div>
      </section>

      {/* Commercial Sale Listings with Filters */}
      <section className="py-12" data-testid="commercial-sale-listings">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold mb-4">Commercial Properties Coming Soon</h3>
            <p className="text-gray-600">Premium commercial real estate opportunities will be available here.</p>
          </div>
        </div>
      </section>

      {/* Email Subscription CTA */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EmailSubscriptionCTA 
            title="Exclusive Commercial Investment Opportunities"
            description="Get first access to premium commercial properties for sale in NYC before they hit the market"
            context="listing"
          />
        </div>
      </section>
    </div>
  );
};

export default ListingsCommercialSale;