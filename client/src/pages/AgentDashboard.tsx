import { useQuery, useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { type Property } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Building, Plus, Home, Upload } from "lucide-react";
import { ObjectUploader } from "@/components/ObjectUploader";

export default function AgentDashboard() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [showForm, setShowForm] = useState(false);

  // Fetch user info
  const { data: user, isError, isLoading } = useQuery({
    queryKey: ['/api/auth/user'],
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (isError && !isLoading) {
      setLocation('/login');
    }
  }, [isError, isLoading, setLocation]);

  const { data: properties = [] } = useQuery<Property[]>({
    queryKey: ['/api/properties'],
  });

  // Property form state
  const [propertyForm, setPropertyForm] = useState({
    title: "",
    address: "",
    price: "",
    priceType: "sale",
    propertyType: "residential",
    subType: "condo",
    bedrooms: "",
    bathrooms: "",
    squareFootage: "",
    spaceAvailable: "",
    leaseTerms: "",
    leaseRate: "",
    leaseDuration: "",
    description: "",
    neighborhood: "",
    borough: "Manhattan",
    images: "",
    floorPlans: "",
    features: "",
    featured: false
  });

  // Create property mutation
  const createPropertyMutation = useMutation({
    mutationFn: async (propertyData: any) => {
      return apiRequest('POST', '/api/properties', {
        ...propertyData,
        price: parseInt(propertyData.price),
        bedrooms: propertyData.bedrooms ? parseInt(propertyData.bedrooms) : null,
        bathrooms: propertyData.bathrooms ? parseInt(propertyData.bathrooms) : null,
        squareFootage: parseInt(propertyData.squareFootage),
        spaceAvailable: propertyData.spaceAvailable ? parseInt(propertyData.spaceAvailable) : null,
        leaseRate: propertyData.leaseRate ? parseInt(propertyData.leaseRate) : null,
        leaseTerms: propertyData.leaseTerms || null,
        leaseDuration: propertyData.leaseDuration || null,
        images: propertyData.images.split('\n').map((s: string) => s.trim()).filter(Boolean),
        floorPlans: propertyData.floorPlans ? propertyData.floorPlans.split('\n').map((s: string) => s.trim()).filter(Boolean) : [],
        features: propertyData.features.split(',').map((s: string) => s.trim()).filter(Boolean)
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/properties'] });
      toast({
        title: "Success",
        description: "Property created successfully"
      });
      setShowForm(false);
      setPropertyForm({
        title: "",
        address: "",
        price: "",
        priceType: "sale",
        propertyType: "residential",
        subType: "condo",
        bedrooms: "",
        bathrooms: "",
        squareFootage: "",
        spaceAvailable: "",
        leaseTerms: "",
        leaseRate: "",
        leaseDuration: "",
        description: "",
        neighborhood: "",
        borough: "Manhattan",
        images: "",
        floorPlans: "",
        features: "",
        featured: false
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create property",
        variant: "destructive"
      });
    }
  });

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">You must be logged in to access the agent dashboard.</p>
            <Button asChild className="w-full">
              <a href="/api/auth/login">Log In</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 py-8" data-testid="agent-dashboard">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold text-neutral-900 dark:text-neutral-100 mb-2">
              Agent Dashboard
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              Manage your property listings
            </p>
          </div>
          <Button onClick={() => setShowForm(!showForm)} data-testid="button-toggle-form">
            <Plus className="w-4 h-4 mr-2" />
            {showForm ? "Cancel" : "Add Property"}
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Listings</p>
                  <p className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">{properties.length}</p>
                </div>
                <Building className="w-12 h-12 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Featured Listings</p>
                  <p className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                    {properties.filter(p => p.featured).length}
                  </p>
                </div>
                <Home className="w-12 h-12 text-accent" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Create Property Form */}
        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Add New Property</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => {
                e.preventDefault();
                createPropertyMutation.mutate(propertyForm);
              }} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Property Title</Label>
                    <Input
                      id="title"
                      value={propertyForm.title}
                      onChange={(e) => setPropertyForm({ ...propertyForm, title: e.target.value })}
                      required
                      data-testid="input-property-title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={propertyForm.address}
                      onChange={(e) => setPropertyForm({ ...propertyForm, address: e.target.value })}
                      required
                      data-testid="input-property-address"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="price">{propertyForm.priceType === "lease" ? "Asking Price ($/year or $/month)" : "Sale Price"}</Label>
                    <Input
                      id="price"
                      type="number"
                      value={propertyForm.price}
                      onChange={(e) => setPropertyForm({ ...propertyForm, price: e.target.value })}
                      required
                      data-testid="input-property-price"
                    />
                  </div>
                  <div>
                    <Label htmlFor="priceType">Transaction Type</Label>
                    <Select value={propertyForm.priceType} onValueChange={(value) => setPropertyForm({ ...propertyForm, priceType: value })}>
                      <SelectTrigger data-testid="select-price-type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sale">For Sale</SelectItem>
                        <SelectItem value="lease">For Lease</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="propertyType">Property Type</Label>
                    <Select value={propertyForm.propertyType} onValueChange={(value) => setPropertyForm({ ...propertyForm, propertyType: value })}>
                      <SelectTrigger data-testid="select-property-type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="residential">Residential</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="subType">Property Sub-Type</Label>
                    <Select value={propertyForm.subType} onValueChange={(value) => setPropertyForm({ ...propertyForm, subType: value })}>
                      <SelectTrigger data-testid="select-property-subtype">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {propertyForm.propertyType === "commercial" ? (
                          <>
                            <SelectItem value="office">Office</SelectItem>
                            <SelectItem value="retail">Retail</SelectItem>
                            <SelectItem value="industrial">Industrial</SelectItem>
                            <SelectItem value="multifamily">Multifamily</SelectItem>
                            <SelectItem value="land">Land</SelectItem>
                            <SelectItem value="mixed-use">Mixed Use</SelectItem>
                          </>
                        ) : (
                          <>
                            <SelectItem value="condo">Condo</SelectItem>
                            <SelectItem value="co-op">Co-op</SelectItem>
                            <SelectItem value="townhouse">Townhouse</SelectItem>
                            <SelectItem value="single-family">Single Family</SelectItem>
                            <SelectItem value="multi-family">Multi-Family</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <Input
                      id="bedrooms"
                      type="number"
                      value={propertyForm.bedrooms}
                      onChange={(e) => setPropertyForm({ ...propertyForm, bedrooms: e.target.value })}
                      data-testid="input-property-bedrooms"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bathrooms">Bathrooms</Label>
                    <Input
                      id="bathrooms"
                      type="number"
                      value={propertyForm.bathrooms}
                      onChange={(e) => setPropertyForm({ ...propertyForm, bathrooms: e.target.value })}
                      data-testid="input-property-bathrooms"
                    />
                  </div>
                  <div>
                    <Label htmlFor="squareFootage">Square Footage</Label>
                    <Input
                      id="squareFootage"
                      type="number"
                      value={propertyForm.squareFootage}
                      onChange={(e) => setPropertyForm({ ...propertyForm, squareFootage: e.target.value })}
                      required
                      data-testid="input-property-sqft"
                    />
                  </div>
                </div>

                {/* Lease-specific fields (LoopNet requirements) */}
                {propertyForm.priceType === "lease" && (
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="spaceAvailable">Space Available (sqft)</Label>
                      <Input
                        id="spaceAvailable"
                        type="number"
                        value={propertyForm.spaceAvailable}
                        onChange={(e) => setPropertyForm({ ...propertyForm, spaceAvailable: e.target.value })}
                        placeholder="Available space"
                        data-testid="input-space-available"
                      />
                    </div>
                    <div>
                      <Label htmlFor="leaseRate">Lease Rate ($/month or $/year)</Label>
                      <Input
                        id="leaseRate"
                        type="number"
                        value={propertyForm.leaseRate}
                        onChange={(e) => setPropertyForm({ ...propertyForm, leaseRate: e.target.value })}
                        placeholder="Monthly or annual rate"
                        data-testid="input-lease-rate"
                      />
                    </div>
                    <div>
                      <Label htmlFor="leaseTerms">Lease Terms</Label>
                      <Select value={propertyForm.leaseTerms} onValueChange={(value) => setPropertyForm({ ...propertyForm, leaseTerms: value })}>
                        <SelectTrigger data-testid="select-lease-terms">
                          <SelectValue placeholder="Select terms" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="NNN">NNN (Triple Net)</SelectItem>
                          <SelectItem value="Modified Gross">Modified Gross</SelectItem>
                          <SelectItem value="Full Service">Full Service</SelectItem>
                          <SelectItem value="Gross">Gross</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="leaseDuration">Lease Duration</Label>
                      <Input
                        id="leaseDuration"
                        value={propertyForm.leaseDuration}
                        onChange={(e) => setPropertyForm({ ...propertyForm, leaseDuration: e.target.value })}
                        placeholder="e.g., 3-5 years"
                        data-testid="input-lease-duration"
                      />
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="neighborhood">Neighborhood</Label>
                    <Input
                      id="neighborhood"
                      value={propertyForm.neighborhood}
                      onChange={(e) => setPropertyForm({ ...propertyForm, neighborhood: e.target.value })}
                      required
                      data-testid="input-property-neighborhood"
                    />
                  </div>
                  <div>
                    <Label htmlFor="borough">Borough</Label>
                    <Input
                      id="borough"
                      value={propertyForm.borough}
                      onChange={(e) => setPropertyForm({ ...propertyForm, borough: e.target.value })}
                      required
                      data-testid="input-property-borough"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={propertyForm.description}
                    onChange={(e) => setPropertyForm({ ...propertyForm, description: e.target.value })}
                    required
                    rows={4}
                    data-testid="input-property-description"
                  />
                </div>

                <div>
                  <Label htmlFor="images">Property Images (up to 10)</Label>
                  {propertyForm.images && propertyForm.images.split('\n').filter(Boolean).length > 0 && (
                    <div className="mb-2 grid grid-cols-3 gap-2">
                      {propertyForm.images.split('\n').filter(Boolean).map((img, idx) => (
                        <img key={idx} src={img} alt={`Property ${idx + 1}`} className="w-full h-24 object-cover rounded" />
                      ))}
                    </div>
                  )}
                  <ObjectUploader
                    maxNumberOfFiles={10}
                    maxFileSize={10485760}
                    onGetUploadParameters={async () => {
                      const response = await fetch('/api/objects/upload', {
                        method: 'POST',
                        credentials: 'include'
                      });
                      const data = await response.json();
                      return {
                        method: 'PUT' as const,
                        url: data.uploadURL,
                      };
                    }}
                    onComplete={(result) => {
                      if (result.successful && result.successful.length > 0) {
                        const existingImages = propertyForm.images ? propertyForm.images.split('\n').filter(Boolean) : [];
                        const newImages = result.successful.map(file => file.uploadURL);
                        const allImages = [...existingImages, ...newImages].join('\n');
                        setPropertyForm({ ...propertyForm, images: allImages });
                        toast({
                          title: "Success",
                          description: `${result.successful.length} image(s) uploaded successfully`
                        });
                      }
                    }}
                    buttonClassName="w-full"
                  >
                    <div className="flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      <span>Upload Property Images</span>
                    </div>
                  </ObjectUploader>
                </div>

                <div>
                  <Label htmlFor="floorPlans">Floor Plans (optional)</Label>
                  {propertyForm.floorPlans && propertyForm.floorPlans.split('\n').filter(Boolean).length > 0 && (
                    <div className="mb-2 grid grid-cols-3 gap-2">
                      {propertyForm.floorPlans.split('\n').filter(Boolean).map((img, idx) => (
                        <img key={idx} src={img} alt={`Floor Plan ${idx + 1}`} className="w-full h-24 object-cover rounded" />
                      ))}
                    </div>
                  )}
                  <ObjectUploader
                    maxNumberOfFiles={5}
                    maxFileSize={10485760}
                    onGetUploadParameters={async () => {
                      const response = await fetch('/api/objects/upload', {
                        method: 'POST',
                        credentials: 'include'
                      });
                      const data = await response.json();
                      return {
                        method: 'PUT' as const,
                        url: data.uploadURL,
                      };
                    }}
                    onComplete={(result) => {
                      if (result.successful && result.successful.length > 0) {
                        const existingFloorPlans = propertyForm.floorPlans ? propertyForm.floorPlans.split('\n').filter(Boolean) : [];
                        const newFloorPlans = result.successful.map(file => file.uploadURL);
                        const allFloorPlans = [...existingFloorPlans, ...newFloorPlans].join('\n');
                        setPropertyForm({ ...propertyForm, floorPlans: allFloorPlans });
                        toast({
                          title: "Success",
                          description: `${result.successful.length} floor plan(s) uploaded successfully`
                        });
                      }
                    }}
                    buttonClassName="w-full"
                  >
                    <div className="flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      <span>Upload Floor Plans</span>
                    </div>
                  </ObjectUploader>
                </div>

                <div>
                  <Label htmlFor="features">Features (comma-separated)</Label>
                  <Input
                    id="features"
                    placeholder="Doorman, Gym, Roof Deck"
                    value={propertyForm.features}
                    onChange={(e) => setPropertyForm({ ...propertyForm, features: e.target.value })}
                    data-testid="input-property-features"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={createPropertyMutation.isPending}
                  data-testid="button-submit-property"
                >
                  {createPropertyMutation.isPending ? "Creating..." : "Create Property"}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Properties List */}
        <Card>
          <CardHeader>
            <CardTitle>Your Listings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {properties.map((property) => (
                <div key={property.id} className="flex items-start justify-between p-4 border rounded-lg" data-testid={`property-card-${property.id}`}>
                  <div className="flex gap-4">
                    {property.images && property.images[0] && (
                      <img src={property.images[0]} alt={property.title} className="w-24 h-24 rounded object-cover" />
                    )}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-neutral-900 dark:text-neutral-100">{property.title}</h4>
                        {property.featured && <Badge>Featured</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground">{property.address}</p>
                      <p className="text-sm text-muted-foreground">{property.neighborhood}, {property.borough}</p>
                      <p className="text-lg font-bold text-accent mt-2">
                        ${property.price.toLocaleString()}
                        {property.priceType === 'rent' ? '/mo' : ''}
                      </p>
                    </div>
                  </div>
                  <Badge variant={property.priceType === 'sale' ? 'default' : 'secondary'}>
                    {property.priceType === 'sale' ? 'For Sale' : 'For Rent'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
