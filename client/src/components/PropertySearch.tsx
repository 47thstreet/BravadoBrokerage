import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

interface PropertySearchProps {
  onSearch: (filters: SearchFilters) => void;
  type: "residential" | "commercial";
}

interface SearchFilters {
  borough?: string;
  priceRange?: string;
  propertyType?: string;
  bedrooms?: string;
  bathrooms?: string;
  sizeRange?: string;
}

const PropertySearch = ({ onSearch, type }: PropertySearchProps) => {
  const [filters, setFilters] = useState<SearchFilters>({});

  const handleSearch = () => {
    onSearch(filters);
  };

  const updateFilter = (key: keyof SearchFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  if (type === "residential") {
    return (
      <section className="py-12 bg-muted" data-testid="property-search-residential">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-card p-6 border border-border shadow-lg">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <Select onValueChange={(value) => updateFilter("borough", value)} data-testid="search-location">
                    <SelectTrigger>
                      <SelectValue placeholder="All Boroughs" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Boroughs</SelectItem>
                      <SelectItem value="Manhattan">Manhattan</SelectItem>
                      <SelectItem value="Brooklyn">Brooklyn</SelectItem>
                      <SelectItem value="Queens">Queens</SelectItem>
                      <SelectItem value="Bronx">Bronx</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Price Range</label>
                  <Select onValueChange={(value) => updateFilter("priceRange", value)} data-testid="search-price">
                    <SelectTrigger>
                      <SelectValue placeholder="Any Price" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any Price</SelectItem>
                      <SelectItem value="under-1m">Under $1M</SelectItem>
                      <SelectItem value="1m-3m">$1M - $3M</SelectItem>
                      <SelectItem value="3m-5m">$3M - $5M</SelectItem>
                      <SelectItem value="over-5m">$5M+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Property Type</label>
                  <Select onValueChange={(value) => updateFilter("propertyType", value)} data-testid="search-property-type">
                    <SelectTrigger>
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="condo">Condo</SelectItem>
                      <SelectItem value="co-op">Co-op</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                      <SelectItem value="loft">Loft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-end">
                  <Button 
                    onClick={handleSearch}
                    className="w-full text-black hover:text-black font-semibold transition-colors"
                    data-testid="search-button"
                  >
                    Search Properties
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-muted" data-testid="property-search-commercial">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-card p-6 border border-border shadow-lg">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Property Type</label>
                <Select onValueChange={(value) => updateFilter("propertyType", value)} data-testid="search-commercial-type">
                  <SelectTrigger>
                    <SelectValue placeholder="All Commercial" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Commercial</SelectItem>
                    <SelectItem value="office">Office</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="industrial">Industrial</SelectItem>
                    <SelectItem value="restaurant">Restaurant</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Size Range</label>
                <Select onValueChange={(value) => updateFilter("sizeRange", value)} data-testid="search-size">
                  <SelectTrigger>
                    <SelectValue placeholder="Any Size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Size</SelectItem>
                    <SelectItem value="under-1k">Under 1,000 sq ft</SelectItem>
                    <SelectItem value="1k-5k">1,000 - 5,000 sq ft</SelectItem>
                    <SelectItem value="5k-10k">5,000 - 10,000 sq ft</SelectItem>
                    <SelectItem value="over-10k">10,000+ sq ft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <Select onValueChange={(value) => updateFilter("borough", value)} data-testid="search-commercial-location">
                  <SelectTrigger>
                    <SelectValue placeholder="All NYC" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All NYC</SelectItem>
                    <SelectItem value="Manhattan">Manhattan</SelectItem>
                    <SelectItem value="Brooklyn">Brooklyn</SelectItem>
                    <SelectItem value="Queens">Queens</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-end">
                <Button 
                  onClick={handleSearch}
                  className="w-full text-black hover:text-black font-semibold transition-colors"
                  data-testid="search-commercial-button"
                >
                  Search Spaces
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default PropertySearch;
