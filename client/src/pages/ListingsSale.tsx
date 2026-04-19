import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Property } from "@shared/schema";
import PropertyCard from "@/components/PropertyCard";
import PropertySearch from "@/components/PropertySearch";
import EmailSubscriptionCTA from "@/components/EmailSubscriptionCTA";

const ListingsSale = () => {
  const [searchFilters, setSearchFilters] = useState<any>({});

  const { data: properties, isLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties", "sale", searchFilters],
    queryFn: async () => {
      const params = new URLSearchParams({
        priceType: "sale",
        ...searchFilters,
      });
      const response = await fetch(`/api/properties?${params}`);
      if (!response.ok) {
        throw new Error("Failed to fetch properties for sale");
      }
      return response.json();
    },
  });

  const handleSearch = (filters: any) => {
    setSearchFilters(filters);
  };

  return (
    <div data-testid="listings-sale-page">
      {/* Search & Filters */}
      <PropertySearch onSearch={handleSearch} type="residential" />

      {/* Property Listings */}
      <section className="py-12" data-testid="sale-listings">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="bg-card border border-border h-96 animate-pulse rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties?.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && (!properties || properties.length === 0) && (
            <div className="text-center py-16" data-testid="no-properties">
              <h3 className="text-2xl font-bold mb-4">No Properties Found</h3>
              <p className="text-muted-foreground">Try adjusting your search filters to see more results.</p>
            </div>
          )}
        </div>
      </section>

      {/* Email Subscription CTA */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EmailSubscriptionCTA 
            title="Never Miss Your Dream Home"
            description="Get instant alerts when new residential properties matching your criteria become available"
            context="listing"
          />
        </div>
      </section>
    </div>
  );
};

export default ListingsSale;
