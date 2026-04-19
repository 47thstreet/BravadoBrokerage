import { Link } from "wouter";
import { Property } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatPrice = (price: number, priceType: string) => {
    if (priceType === "sale") {
      return `$${(price / 1000000).toFixed(1)}M`;
    } else {
      return `$${price}/sq ft`;
    }
  };

  const getStatusBadge = () => {
    if (property.featured) {
      return <Badge className="bg-primary text-white">FEATURED</Badge>;
    }
    return (
      <Badge className={property.priceType === "sale" ? "bg-primary text-white" : "bg-accent text-white"}>
        {property.priceType === "sale" ? "FOR SALE" : "FOR LEASE"}
      </Badge>
    );
  };

  return (
    <Card className="property-card bg-card border border-border overflow-hidden shadow-lg" data-testid={`property-card-${property.id}`}>
      <img 
        src={property.images?.[0] || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"} 
        alt={property.title} 
        className="w-full h-64 object-cover" 
        data-testid={`property-image-${property.id}`}
      />
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          {getStatusBadge()}
          <span className="text-2xl font-bold" data-testid={`property-price-${property.id}`}>
            {formatPrice(property.price, property.priceType)}
          </span>
        </div>
        <h3 className="font-serif text-xl font-bold mb-2" data-testid={`property-title-${property.id}`}>
          {property.title}
        </h3>
        <p className="text-muted-foreground mb-4" data-testid={`property-address-${property.id}`}>
          {property.address}
        </p>
        
        {property.propertyType === "residential" ? (
          <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground mb-4">
            <span data-testid={`property-bedrooms-${property.id}`}>{property.bedrooms} Beds</span>
            <span data-testid={`property-bathrooms-${property.id}`}>{property.bathrooms} Baths</span>
            <span data-testid={`property-sqft-${property.id}`}>{property.squareFootage?.toLocaleString()} sq ft</span>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-4">
            <span data-testid={`property-sqft-${property.id}`}>{property.squareFootage?.toLocaleString()} sq ft</span>
            {property.floor && <span data-testid={`property-floor-${property.id}`}>{property.floor}</span>}
          </div>
        )}
        
        <Link href={`/property/${property.id}`} onClick={scrollToTop}>
          <Button variant="ghost" className="w-full text-gray-900 hover:text-gray-900 font-semibold transition-colors" data-testid={`property-details-button-${property.id}`}>
            {property.propertyType === "commercial" ? "Schedule Tour" : "View Details"}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
