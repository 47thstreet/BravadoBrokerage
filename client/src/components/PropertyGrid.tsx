import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { type Property } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, MapPin, BedDouble, Bath, Maximize } from "lucide-react";

interface PropertyGridProps {
  filters?: {
    priceType?: string;
    propertyType?: string;
    featured?: boolean;
    borough?: string;
    minPrice?: number;
    maxPrice?: number;
  };
  limit?: number;
  title?: string;
  showTitle?: boolean;
}

export default function PropertyGrid({ filters, limit, title = "Featured Properties", showTitle = true }: PropertyGridProps) {
  const { data: properties, isLoading, error } = useQuery<Property[]>({
    queryKey: ['/api/properties', filters],
    queryFn: async () => {
      // Build query string from filters
      const params = new URLSearchParams();
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            params.append(key, value.toString());
          }
        });
      }
      
      const url = `/api/properties${params.toString() ? `?${params.toString()}` : ''}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch properties');
      }
      return response.json();
    }
  });

  const filteredProperties = properties ? 
    (limit ? properties.slice(0, limit) : properties) : [];

  if (isLoading) {
    return (
      <div className="w-full py-12" data-testid="property-grid-loading">
        <div className="text-center">
          <div className="relative w-12 h-12 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
            <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          </div>
          <div className="text-foreground font-medium text-lg mb-2">Loading Properties</div>
          <div className="text-muted-foreground text-sm">Finding the perfect listings for you...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-12 flex items-center justify-center" data-testid="property-grid-error">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-destructive/10 flex items-center justify-center">
            <svg className="w-8 h-8 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <div className="text-destructive text-xl font-semibold mb-3">
            Unable to Load Properties
          </div>
          <div className="text-muted-foreground leading-relaxed">
            We're having trouble loading our listings. Please refresh the page or try again later.
          </div>
        </div>
      </div>
    );
  }

  if (!filteredProperties || filteredProperties.length === 0) {
    return (
      <div className="w-full py-12 flex items-center justify-center" data-testid="property-grid-empty">
        <div className="text-center max-w-md">
          <Building className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
          <div className="text-foreground text-xl font-semibold mb-3">
            No Properties Available
          </div>
          <div className="text-muted-foreground leading-relaxed">
            We don't have any listings matching your criteria at the moment. Please check back soon or adjust your filters.
          </div>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number, priceType: string) => {
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
    
    return priceType === 'rent' ? `${formatted}/mo` : formatted;
  };

  return (
    <div className="w-full" data-testid="property-grid">
      {showTitle && (
        <h2 className="text-2xl md:text-3xl font-display text-neutral-900 dark:text-neutral-100 mb-8">
          {title}
        </h2>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((property) => (
          <Link 
            key={property.id} 
            href={`/property/${property.id}`}
            data-testid={`property-card-${property.id}`}
          >
            <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden h-full">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={(property.images && property.images[0]) || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=450&fit=crop'} 
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  data-testid={`property-image-${property.id}`}
                />
                {property.featured && (
                  <Badge className="absolute top-3 left-3 bg-accent text-white border-0">
                    Featured
                  </Badge>
                )}
                <Badge className="absolute top-3 right-3 bg-white/90 dark:bg-neutral-900/90 text-neutral-900 dark:text-neutral-100 border-0">
                  {property.priceType === 'sale' ? 'For Sale' : 'For Rent'}
                </Badge>
              </div>
              
              <CardContent className="p-5">
                <div className="mb-3">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 line-clamp-2 flex-1" data-testid={`property-title-${property.id}`}>
                      {property.title}
                    </h3>
                  </div>
                  <p className="text-2xl font-bold text-accent" data-testid={`property-price-${property.id}`}>
                    {formatPrice(property.price, property.priceType)}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                  <MapPin className="w-4 h-4" />
                  <span>{property.neighborhood}, {property.borough}</span>
                </div>

                <div className="flex items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400 pb-3 border-b border-neutral-200 dark:border-neutral-700">
                  {property.bedrooms !== null && property.bedrooms > 0 && (
                    <div className="flex items-center gap-1">
                      <BedDouble className="w-4 h-4" />
                      <span>{property.bedrooms} Bed{property.bedrooms > 1 ? 's' : ''}</span>
                    </div>
                  )}
                  {property.bathrooms !== null && property.bathrooms > 0 && (
                    <div className="flex items-center gap-1">
                      <Bath className="w-4 h-4" />
                      <span>{property.bathrooms} Bath{property.bathrooms > 1 ? 's' : ''}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Maximize className="w-4 h-4" />
                    <span>{property.squareFootage.toLocaleString()} sq ft</span>
                  </div>
                </div>

                <div className="mt-3">
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
                    {property.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
