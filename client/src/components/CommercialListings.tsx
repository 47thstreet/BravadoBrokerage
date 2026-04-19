import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

interface CommercialListingsProps {
  initialStatus?: string; // "1,11" for sales, "2,21" for rentals
  showFilters?: boolean;
  className?: string;
  'data-testid'?: string;
}

const CommercialListings = ({ 
  initialStatus = "1,11", // Default to sales + in contract
  showFilters = true,
  className = '',
  'data-testid': testId 
}: CommercialListingsProps) => {
  const [filters, setFilters] = useState({
    status: initialStatus,
    type: "commercial,retail,office,building", // Commercial property types
    minPrice: undefined as number | undefined,
    maxPrice: undefined as number | undefined,
    sort: "price,beds",
    order: "asc,desc",
    page: 'properties' as const,
    isGrid: true
  });

  const [tempFilters, setTempFilters] = useState({
    propertyType: "all",
    minPrice: "",
    maxPrice: "",
    listingType: initialStatus.includes("1") ? "sale" : "rent"
  });

  const applyFilters = () => {
    const newFilters = { ...filters };

    // Handle listing type (sale vs rent)
    if (tempFilters.listingType === "sale") {
      newFilters.status = "1,11"; // For Sale + In Contract
    } else {
      newFilters.status = "2,21"; // For Rent + App Pending
    }

    // Handle property type
    if (tempFilters.propertyType === "office") {
      newFilters.type = "office";
    } else if (tempFilters.propertyType === "retail") {
      newFilters.type = "retail";
    } else if (tempFilters.propertyType === "building") {
      newFilters.type = "building";
    } else if (tempFilters.propertyType === "investment") {
      newFilters.type = "investment";
    } else if (tempFilters.propertyType === "mixed") {
      newFilters.type = "mixed use";
    } else {
      newFilters.type = "commercial,retail,office,building,investment,mixed use";
    }

    // Handle price range
    newFilters.minPrice = tempFilters.minPrice ? parseInt(tempFilters.minPrice) : undefined;
    newFilters.maxPrice = tempFilters.maxPrice ? parseInt(tempFilters.maxPrice) : undefined;

    setFilters(newFilters);
  };

  const resetFilters = () => {
    setTempFilters({
      propertyType: "all",
      minPrice: "",
      maxPrice: "",
      listingType: initialStatus.includes("1") ? "sale" : "rent"
    });
    setFilters({
      status: initialStatus,
      type: "commercial,retail,office,building",
      minPrice: undefined,
      maxPrice: undefined,
      sort: "price,beds",
      order: "asc,desc",
      page: 'properties',
      isGrid: true
    });
  };


  return (
    <div className={className} data-testid={testId}>
      {showFilters && (
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Listing Type */}
              <div>
                <label className="block text-sm font-medium mb-2">Listing Type</label>
                <Select 
                  value={tempFilters.listingType} 
                  onValueChange={(value) => setTempFilters(prev => ({ ...prev, listingType: value }))}
                >
                  <SelectTrigger data-testid="commercial-listing-type-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sale">For Sale</SelectItem>
                    <SelectItem value="rent">For Lease</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-sm font-medium mb-2">Property Type</label>
                <Select 
                  value={tempFilters.propertyType} 
                  onValueChange={(value) => setTempFilters(prev => ({ ...prev, propertyType: value }))}
                >
                  <SelectTrigger data-testid="commercial-property-type-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="office">Office</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="building">Building</SelectItem>
                    <SelectItem value="investment">Investment</SelectItem>
                    <SelectItem value="mixed">Mixed Use</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Min Price */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Min {tempFilters.listingType === "sale" ? "Price" : "Rent"}
                </label>
                <Input
                  type="number"
                  placeholder={tempFilters.listingType === "sale" ? "Min Price" : "Min Rent"}
                  value={tempFilters.minPrice}
                  onChange={(e) => setTempFilters(prev => ({ ...prev, minPrice: e.target.value }))}
                  data-testid="commercial-min-price-input"
                />
              </div>

              {/* Max Price */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Max {tempFilters.listingType === "sale" ? "Price" : "Rent"}
                </label>
                <Input
                  type="number"
                  placeholder={tempFilters.listingType === "sale" ? "Max Price" : "Max Rent"}
                  value={tempFilters.maxPrice}
                  onChange={(e) => setTempFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
                  data-testid="commercial-max-price-input"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 justify-end">
                <Button onClick={applyFilters} data-testid="commercial-apply-filters-btn">
                  Apply Filters
                </Button>
                <Button variant="outline" onClick={resetFilters} data-testid="commercial-reset-filters-btn">
                  Reset
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="text-center py-16">
        <h3 className="text-2xl font-semibold mb-4">Commercial Properties Coming Soon</h3>
        <p className="text-gray-600">Explore premium commercial real estate opportunities.</p>
      </div>
    </div>
  );
};

export default CommercialListings;