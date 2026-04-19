import { useQuery, useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { type Agent, type Property } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Users, Building, Plus, Trash2, Edit, Upload, X } from "lucide-react";
import { ObjectUploader } from "@/components/ObjectUploader";

const defaultPropertyForm = {
  title: "",
  address: "",
  price: "",
  priceType: "sale",
  propertyType: "commercial",
  subType: "office",
  bedrooms: "",
  bathrooms: "",
  squareFootage: "",
  spaceAvailable: "",
  lotSize: "",
  floor: "",
  yearBuilt: "",
  stories: "",
  units: "",
  parkingSpaces: "",
  parkingType: "",
  zoning: "",
  propertyCondition: "",
  leaseTerms: "",
  leaseRate: "",
  leaseDuration: "",
  leaseType: "",
  availabilityDate: "",
  capRate: "",
  noi: "",
  propertyTaxes: "",
  occupancyRate: "",
  tenantInfo: "",
  description: "",
  features: "",
  images: [] as string[],
  floorPlans: [] as string[],
  virtualTourUrl: "",
  neighborhood: "",
  borough: "",
  status: "available",
  featured: false,
  agentId: ""
};

type UserData = {
  id: string;
  email: string;
  name: string;
  role: string;
  agentId?: string;
};

export default function AdminDashboard() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("overview");
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [propertyForm, setPropertyForm] = useState(defaultPropertyForm);

  // Fetch user info to verify admin status
  const { data: user, isError, isLoading } = useQuery<UserData>({
    queryKey: ['/api/auth/user'],
  });

  const isAdmin = user?.role === 'admin';
  const isAgent = user?.role === 'agent';

  // Redirect to login if not authenticated or unauthorized
  useEffect(() => {
    if (isError && !isLoading) {
      setLocation('/login');
    }
    // Redirect if not admin or agent
    if (user && !isAdmin && !isAgent) {
      setLocation('/');
    }
  }, [isError, isLoading, setLocation, user, isAdmin, isAgent]);

  const { data: agents = [] } = useQuery<Agent[]>({
    queryKey: ['/api/agents'],
  });

  const { data: properties = [] } = useQuery<Property[]>({
    queryKey: ['/api/properties'],
  });

  // Agent form state
  const [agentForm, setAgentForm] = useState({
    name: "",
    title: "",
    email: "",
    phone: "",
    bio: "",
    image: "",
    specialties: ""
  });

  // Create agent mutation
  const createAgentMutation = useMutation({
    mutationFn: async (agentData: any) => {
      return apiRequest('POST', '/api/agents', {
        ...agentData,
        specialties: agentData.specialties.split(',').map((s: string) => s.trim()).filter(Boolean)
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/agents'] });
      toast({
        title: "Success",
        description: "Agent created successfully"
      });
      setAgentForm({
        name: "",
        title: "",
        email: "",
        phone: "",
        bio: "",
        image: "",
        specialties: ""
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create agent",
        variant: "destructive"
      });
    }
  });

  // Delete agent mutation
  // Update agent mutation
  const updateAgentMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      return apiRequest('PUT', `/api/agents/${id}`, {
        ...data,
        specialties: data.specialties.split(',').map((s: string) => s.trim()).filter(Boolean)
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/agents'] });
      toast({
        title: "Success",
        description: "Agent updated successfully"
      });
      setEditingAgent(null);
      setAgentForm({
        name: "",
        title: "",
        email: "",
        phone: "",
        bio: "",
        image: "",
        specialties: ""
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update agent",
        variant: "destructive"
      });
    }
  });

  const deleteAgentMutation = useMutation({
    mutationFn: async (agentId: string) => {
      return apiRequest('DELETE', `/api/agents/${agentId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/agents'] });
      toast({
        title: "Success",
        description: "Agent deleted successfully"
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete agent",
        variant: "destructive"
      });
    }
  });

  // Send setup link mutation
  const sendSetupLinkMutation = useMutation({
    mutationFn: async (agentId: string) => {
      return apiRequest('POST', `/api/admin/send-setup-link/${agentId}`);
    },
    onSuccess: (data: any) => {
      toast({
        title: "Setup Link Created",
        description: `Link sent to ${data.email}. Copy link: ${window.location.origin}${data.setupLink}`
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create setup link",
        variant: "destructive"
      });
    }
  });

  const handleEditAgent = (agent: Agent) => {
    setEditingAgent(agent);
    setAgentForm({
      name: agent.name,
      title: agent.title || "",
      email: agent.email,
      phone: agent.phone || "",
      bio: agent.bio || "",
      image: agent.image || "",
      specialties: agent.specialties ? agent.specialties.join(', ') : ''
    });
  };

  const handleCancelEdit = () => {
    setEditingAgent(null);
    setAgentForm({
      name: "",
      title: "",
      email: "",
      phone: "",
      bio: "",
      image: "",
      specialties: ""
    });
  };

  // Property mutations
  const createPropertyMutation = useMutation({
    mutationFn: async (data: typeof propertyForm) => {
      const propertyData = {
        ...data,
        price: parseInt(data.price) || 0,
        squareFootage: parseInt(data.squareFootage) || 0,
        bedrooms: data.bedrooms ? parseInt(data.bedrooms) : null,
        bathrooms: data.bathrooms ? parseInt(data.bathrooms) : null,
        spaceAvailable: data.spaceAvailable ? parseInt(data.spaceAvailable) : null,
        lotSize: data.lotSize ? parseInt(data.lotSize) : null,
        yearBuilt: data.yearBuilt ? parseInt(data.yearBuilt) : null,
        stories: data.stories ? parseInt(data.stories) : null,
        units: data.units ? parseInt(data.units) : null,
        parkingSpaces: data.parkingSpaces ? parseInt(data.parkingSpaces) : null,
        leaseRate: data.leaseRate ? parseInt(data.leaseRate) : null,
        noi: data.noi ? parseInt(data.noi) : null,
        propertyTaxes: data.propertyTaxes ? parseInt(data.propertyTaxes) : null,
        features: data.features ? data.features.split(',').map(f => f.trim()).filter(Boolean) : [],
        agentId: data.agentId || null
      };
      return apiRequest('POST', '/api/properties', propertyData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/properties'] });
      toast({ title: "Success", description: "Property created successfully" });
      setPropertyForm(defaultPropertyForm);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create property", variant: "destructive" });
    }
  });

  const updatePropertyMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: typeof propertyForm }) => {
      const propertyData = {
        ...data,
        price: parseInt(data.price) || 0,
        squareFootage: parseInt(data.squareFootage) || 0,
        bedrooms: data.bedrooms ? parseInt(data.bedrooms) : null,
        bathrooms: data.bathrooms ? parseInt(data.bathrooms) : null,
        spaceAvailable: data.spaceAvailable ? parseInt(data.spaceAvailable) : null,
        lotSize: data.lotSize ? parseInt(data.lotSize) : null,
        yearBuilt: data.yearBuilt ? parseInt(data.yearBuilt) : null,
        stories: data.stories ? parseInt(data.stories) : null,
        units: data.units ? parseInt(data.units) : null,
        parkingSpaces: data.parkingSpaces ? parseInt(data.parkingSpaces) : null,
        leaseRate: data.leaseRate ? parseInt(data.leaseRate) : null,
        noi: data.noi ? parseInt(data.noi) : null,
        propertyTaxes: data.propertyTaxes ? parseInt(data.propertyTaxes) : null,
        features: data.features ? data.features.split(',').map(f => f.trim()).filter(Boolean) : [],
        agentId: data.agentId || null
      };
      return apiRequest('PUT', `/api/properties/${id}`, propertyData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/properties'] });
      toast({ title: "Success", description: "Property updated successfully" });
      setEditingProperty(null);
      setPropertyForm(defaultPropertyForm);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update property", variant: "destructive" });
    }
  });

  const deletePropertyMutation = useMutation({
    mutationFn: async (id: string) => apiRequest('DELETE', `/api/properties/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/properties'] });
      toast({ title: "Success", description: "Property deleted successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete property", variant: "destructive" });
    }
  });

  const handleEditProperty = (property: Property) => {
    setEditingProperty(property);
    setPropertyForm({
      title: property.title,
      address: property.address,
      price: property.price.toString(),
      priceType: property.priceType,
      propertyType: property.propertyType,
      subType: property.subType,
      bedrooms: property.bedrooms?.toString() || "",
      bathrooms: property.bathrooms?.toString() || "",
      squareFootage: property.squareFootage.toString(),
      spaceAvailable: property.spaceAvailable?.toString() || "",
      lotSize: property.lotSize?.toString() || "",
      floor: property.floor || "",
      yearBuilt: property.yearBuilt?.toString() || "",
      stories: property.stories?.toString() || "",
      units: property.units?.toString() || "",
      parkingSpaces: property.parkingSpaces?.toString() || "",
      parkingType: property.parkingType || "",
      zoning: property.zoning || "",
      propertyCondition: property.propertyCondition || "",
      leaseTerms: property.leaseTerms || "",
      leaseRate: property.leaseRate?.toString() || "",
      leaseDuration: property.leaseDuration || "",
      leaseType: property.leaseType || "",
      availabilityDate: property.availabilityDate || "",
      capRate: property.capRate || "",
      noi: property.noi?.toString() || "",
      propertyTaxes: property.propertyTaxes?.toString() || "",
      occupancyRate: property.occupancyRate || "",
      tenantInfo: property.tenantInfo || "",
      description: property.description,
      features: property.features?.join(', ') || "",
      images: property.images || [],
      floorPlans: property.floorPlans || [],
      virtualTourUrl: property.virtualTourUrl || "",
      neighborhood: property.neighborhood,
      borough: property.borough,
      status: property.status,
      featured: property.featured || false,
      agentId: property.agentId || ""
    });
  };

  const handleCancelPropertyEdit = () => {
    setEditingProperty(null);
    setPropertyForm(defaultPropertyForm);
  };

  const handlePropertyImageUpload = async (objectPath: string) => {
    try {
      const response = await fetch('/api/objects/get-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ objectPath })
      });
      if (response.ok) {
        const { viewURL } = await response.json();
        setPropertyForm(prev => ({ ...prev, images: [...prev.images, viewURL] }));
        toast({ title: "Success", description: "Image uploaded" });
      }
    } catch (err) {
      toast({ title: "Error", description: "Failed to upload image", variant: "destructive" });
    }
  };

  const removePropertyImage = (index: number) => {
    setPropertyForm(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">You must be logged in to access the admin dashboard.</p>
            <Button asChild className="w-full">
              <a href="/api/auth/login">Log In</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 py-8" data-testid="admin-dashboard">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-neutral-900 dark:text-neutral-100 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Manage agents and property listings
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Agents</p>
                  <p className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">{agents.length}</p>
                </div>
                <Users className="w-12 h-12 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Properties</p>
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
                  <p className="text-sm text-muted-foreground">Featured</p>
                  <p className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                    {properties.filter(p => p.featured).length}
                  </p>
                </div>
                <Building className="w-12 h-12 text-accent" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            {isAdmin && <TabsTrigger value="agents">Agents</TabsTrigger>}
            <TabsTrigger value="properties">Properties</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Welcome to Admin Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Manage your real estate platform from this central hub.
                </p>
                <div className="space-y-2">
                  <p><strong>Agents:</strong> Create and manage agent profiles</p>
                  <p><strong>Properties:</strong> View all property listings</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="agents">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Create/Edit Agent Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {editingAgent ? <Edit className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    {editingAgent ? "Edit Agent" : "Create New Agent"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    if (editingAgent) {
                      updateAgentMutation.mutate({ id: editingAgent.id, data: agentForm });
                    } else {
                      createAgentMutation.mutate(agentForm);
                    }
                  }} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={agentForm.name}
                        onChange={(e) => setAgentForm({ ...agentForm, name: e.target.value })}
                        data-testid="input-agent-name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={agentForm.title}
                        onChange={(e) => setAgentForm({ ...agentForm, title: e.target.value })}
                        required
                        data-testid="input-agent-title"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={agentForm.email}
                        onChange={(e) => setAgentForm({ ...agentForm, email: e.target.value })}
                        data-testid="input-agent-email"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={agentForm.phone}
                        onChange={(e) => setAgentForm({ ...agentForm, phone: e.target.value })}
                        data-testid="input-agent-phone"
                      />
                    </div>
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={agentForm.bio}
                        onChange={(e) => setAgentForm({ ...agentForm, bio: e.target.value })}
                        required
                        data-testid="input-agent-bio"
                      />
                    </div>
                    <div>
                      <Label htmlFor="image">Agent Image</Label>
                      {agentForm.image && (
                        <div className="mb-2 bg-gray-100 dark:bg-gray-800 p-2 rounded">
                          <img 
                            src={agentForm.image} 
                            alt="Agent preview" 
                            className="w-32 h-32 object-cover rounded border border-gray-300 dark:border-gray-600"
                            onError={(e) => {
                              e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"%3E%3Crect fill="%23e5e7eb" width="128" height="128"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999" font-size="12"%3EImage Error%3C/text%3E%3C/svg%3E';
                            }}
                          />
                        </div>
                      )}
                      <ObjectUploader
                        maxNumberOfFiles={1}
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
                            objectPath: data.objectPath,
                          };
                        }}
                        onComplete={async (result) => {
                          if (result.successful && result.successful[0]) {
                            const { objectPath } = result.successful[0];
                            if (objectPath) {
                              try {
                                const viewResponse = await fetch('/api/objects/get-url', {
                                  method: 'POST',
                                  headers: { 'Content-Type': 'application/json' },
                                  credentials: 'include',
                                  body: JSON.stringify({ objectPath })
                                });
                                if (viewResponse.ok) {
                                  const { viewURL } = await viewResponse.json();
                                  setAgentForm(prev => ({ ...prev, image: viewURL }));
                                  toast({
                                    title: "Success",
                                    description: "Image uploaded successfully"
                                  });
                                  return;
                                }
                              } catch (err) {
                                console.error('Error getting view URL:', err);
                              }
                            }
                            toast({
                              title: "Partial Success",
                              description: "Image uploaded. Preview may load after saving."
                            });
                          }
                        }}
                        buttonClassName="w-full"
                      >
                        <div className="flex items-center gap-2">
                          <Upload className="h-4 w-4" />
                          <span>{agentForm.image ? "Change Image" : "Upload Image"}</span>
                        </div>
                      </ObjectUploader>
                    </div>
                    <div>
                      <Label htmlFor="specialties">Specialties (comma-separated)</Label>
                      <Input
                        id="specialties"
                        placeholder="Luxury Condos, Investment Properties"
                        value={agentForm.specialties}
                        onChange={(e) => setAgentForm({ ...agentForm, specialties: e.target.value })}
                        data-testid="input-agent-specialties"
                      />
                    </div>
                    <div className="flex gap-2">
                      {editingAgent && (
                        <Button 
                          type="button"
                          variant="outline"
                          className="flex-1" 
                          onClick={handleCancelEdit}
                          data-testid="button-cancel-edit"
                        >
                          Cancel
                        </Button>
                      )}
                      <Button 
                        type="submit" 
                        className={editingAgent ? "flex-1" : "w-full"}
                        disabled={createAgentMutation.isPending || updateAgentMutation.isPending}
                        data-testid={editingAgent ? "button-update-agent" : "button-create-agent"}
                      >
                        {editingAgent 
                          ? (updateAgentMutation.isPending ? "Updating..." : "Update Agent")
                          : (createAgentMutation.isPending ? "Creating..." : "Create Agent")
                        }
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Agent List */}
              <Card>
                <CardHeader>
                  <CardTitle>Current Agents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {agents.map((agent) => (
                      <div key={agent.id} className="flex items-start justify-between p-4 border rounded-lg" data-testid={`agent-item-${agent.id}`}>
                        <div className="flex gap-3">
                          {agent.image ? (
                            <img src={agent.image} alt={agent.name} className="w-12 h-12 rounded-full object-cover" />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                              <Users className="w-6 h-6 text-accent" />
                            </div>
                          )}
                          <div>
                            <h4 className="font-semibold text-neutral-900 dark:text-neutral-100">{agent.name}</h4>
                            <p className="text-sm text-muted-foreground">{agent.title}</p>
                            <p className="text-xs text-muted-foreground">{agent.email}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => sendSetupLinkMutation.mutate(agent.id)}
                            disabled={sendSetupLinkMutation.isPending}
                            data-testid={`button-setup-link-${agent.id}`}
                            title="Send login setup link"
                          >
                            Send Login Link
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditAgent(agent)}
                            data-testid={`button-edit-agent-${agent.id}`}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteAgentMutation.mutate(agent.id)}
                            disabled={deleteAgentMutation.isPending}
                            data-testid={`button-delete-agent-${agent.id}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="properties">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Property Form */}
              <Card className="xl:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {editingProperty ? <Edit className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    {editingProperty ? "Edit Property" : "Add New Property"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="max-h-[70vh] overflow-y-auto">
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    if (editingProperty) {
                      updatePropertyMutation.mutate({ id: editingProperty.id, data: propertyForm });
                    } else {
                      createPropertyMutation.mutate(propertyForm);
                    }
                  }} className="space-y-6">
                    
                    {/* Basic Info */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg border-b pb-2">Basic Information</h3>
                      <div>
                        <Label>Title *</Label>
                        <Input value={propertyForm.title} onChange={(e) => setPropertyForm({...propertyForm, title: e.target.value})} required data-testid="input-property-title" />
                      </div>
                      <div>
                        <Label>Address *</Label>
                        <Input value={propertyForm.address} onChange={(e) => setPropertyForm({...propertyForm, address: e.target.value})} required data-testid="input-property-address" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Property Type *</Label>
                          <Select value={propertyForm.propertyType} onValueChange={(v) => setPropertyForm({...propertyForm, propertyType: v})}>
                            <SelectTrigger data-testid="select-property-type"><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="commercial">Commercial</SelectItem>
                              <SelectItem value="residential">Residential</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Sub Type *</Label>
                          <Select value={propertyForm.subType} onValueChange={(v) => setPropertyForm({...propertyForm, subType: v})}>
                            <SelectTrigger data-testid="select-sub-type"><SelectValue /></SelectTrigger>
                            <SelectContent>
                              {propertyForm.propertyType === 'commercial' ? (
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
                                </>
                              )}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Listing Type *</Label>
                          <Select value={propertyForm.priceType} onValueChange={(v) => setPropertyForm({...propertyForm, priceType: v})}>
                            <SelectTrigger data-testid="select-price-type"><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sale">For Sale</SelectItem>
                              <SelectItem value="lease">For Lease</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Status</Label>
                          <Select value={propertyForm.status} onValueChange={(v) => setPropertyForm({...propertyForm, status: v})}>
                            <SelectTrigger data-testid="select-status"><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="available">Available</SelectItem>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="sold">Sold</SelectItem>
                              <SelectItem value="leased">Leased</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg border-b pb-2">Pricing</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Price ($) *</Label>
                          <Input type="number" value={propertyForm.price} onChange={(e) => setPropertyForm({...propertyForm, price: e.target.value})} required data-testid="input-price" />
                        </div>
                        {propertyForm.priceType === 'lease' && (
                          <div>
                            <Label>Lease Rate ($/sqft/yr)</Label>
                            <Input type="number" value={propertyForm.leaseRate} onChange={(e) => setPropertyForm({...propertyForm, leaseRate: e.target.value})} data-testid="input-lease-rate" />
                          </div>
                        )}
                      </div>
                      {propertyForm.priceType === 'sale' && (
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <Label>Cap Rate</Label>
                            <Input placeholder="5.5%" value={propertyForm.capRate} onChange={(e) => setPropertyForm({...propertyForm, capRate: e.target.value})} data-testid="input-cap-rate" />
                          </div>
                          <div>
                            <Label>NOI ($)</Label>
                            <Input type="number" value={propertyForm.noi} onChange={(e) => setPropertyForm({...propertyForm, noi: e.target.value})} data-testid="input-noi" />
                          </div>
                          <div>
                            <Label>Property Taxes ($)</Label>
                            <Input type="number" value={propertyForm.propertyTaxes} onChange={(e) => setPropertyForm({...propertyForm, propertyTaxes: e.target.value})} data-testid="input-taxes" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Size & Specs */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg border-b pb-2">Size & Specifications</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Square Footage *</Label>
                          <Input type="number" value={propertyForm.squareFootage} onChange={(e) => setPropertyForm({...propertyForm, squareFootage: e.target.value})} required data-testid="input-sqft" />
                        </div>
                        {propertyForm.priceType === 'lease' && (
                          <div>
                            <Label>Space Available (sqft)</Label>
                            <Input type="number" value={propertyForm.spaceAvailable} onChange={(e) => setPropertyForm({...propertyForm, spaceAvailable: e.target.value})} data-testid="input-space-available" />
                          </div>
                        )}
                      </div>
                      {propertyForm.propertyType === 'residential' && (
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Bedrooms</Label>
                            <Input type="number" value={propertyForm.bedrooms} onChange={(e) => setPropertyForm({...propertyForm, bedrooms: e.target.value})} data-testid="input-bedrooms" />
                          </div>
                          <div>
                            <Label>Bathrooms</Label>
                            <Input type="number" value={propertyForm.bathrooms} onChange={(e) => setPropertyForm({...propertyForm, bathrooms: e.target.value})} data-testid="input-bathrooms" />
                          </div>
                        </div>
                      )}
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label>Year Built</Label>
                          <Input type="number" value={propertyForm.yearBuilt} onChange={(e) => setPropertyForm({...propertyForm, yearBuilt: e.target.value})} data-testid="input-year-built" />
                        </div>
                        <div>
                          <Label>Stories</Label>
                          <Input type="number" value={propertyForm.stories} onChange={(e) => setPropertyForm({...propertyForm, stories: e.target.value})} data-testid="input-stories" />
                        </div>
                        <div>
                          <Label>Lot Size (sqft)</Label>
                          <Input type="number" value={propertyForm.lotSize} onChange={(e) => setPropertyForm({...propertyForm, lotSize: e.target.value})} data-testid="input-lot-size" />
                        </div>
                      </div>
                      {propertyForm.subType === 'multifamily' && (
                        <div>
                          <Label>Number of Units</Label>
                          <Input type="number" value={propertyForm.units} onChange={(e) => setPropertyForm({...propertyForm, units: e.target.value})} data-testid="input-units" />
                        </div>
                      )}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Parking Spaces</Label>
                          <Input type="number" value={propertyForm.parkingSpaces} onChange={(e) => setPropertyForm({...propertyForm, parkingSpaces: e.target.value})} data-testid="input-parking" />
                        </div>
                        <div>
                          <Label>Parking Type</Label>
                          <Select value={propertyForm.parkingType} onValueChange={(v) => setPropertyForm({...propertyForm, parkingType: v})}>
                            <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="surface">Surface</SelectItem>
                              <SelectItem value="garage">Garage</SelectItem>
                              <SelectItem value="covered">Covered</SelectItem>
                              <SelectItem value="street">Street</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Zoning</Label>
                          <Input value={propertyForm.zoning} onChange={(e) => setPropertyForm({...propertyForm, zoning: e.target.value})} placeholder="e.g., C-2, R-1" data-testid="input-zoning" />
                        </div>
                        <div>
                          <Label>Condition</Label>
                          <Select value={propertyForm.propertyCondition} onValueChange={(v) => setPropertyForm({...propertyForm, propertyCondition: v})}>
                            <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="turnkey">Turnkey</SelectItem>
                              <SelectItem value="built-out">Built Out</SelectItem>
                              <SelectItem value="shell">Shell</SelectItem>
                              <SelectItem value="needs-renovation">Needs Renovation</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Lease Terms (if lease) */}
                    {propertyForm.priceType === 'lease' && (
                      <div className="space-y-4">
                        <h3 className="font-semibold text-lg border-b pb-2">Lease Details</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Lease Type</Label>
                            <Select value={propertyForm.leaseType} onValueChange={(v) => setPropertyForm({...propertyForm, leaseType: v})}>
                              <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="nnn">NNN (Triple Net)</SelectItem>
                                <SelectItem value="modified-gross">Modified Gross</SelectItem>
                                <SelectItem value="gross">Full Service Gross</SelectItem>
                                <SelectItem value="net">Net</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>Lease Duration</Label>
                            <Input value={propertyForm.leaseDuration} onChange={(e) => setPropertyForm({...propertyForm, leaseDuration: e.target.value})} placeholder="e.g., 3-5 years" data-testid="input-lease-duration" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Availability Date</Label>
                            <Input type="date" value={propertyForm.availabilityDate} onChange={(e) => setPropertyForm({...propertyForm, availabilityDate: e.target.value})} data-testid="input-availability" />
                          </div>
                          <div>
                            <Label>Current Occupancy</Label>
                            <Input value={propertyForm.occupancyRate} onChange={(e) => setPropertyForm({...propertyForm, occupancyRate: e.target.value})} placeholder="e.g., 95%" data-testid="input-occupancy" />
                          </div>
                        </div>
                        <div>
                          <Label>Tenant Information</Label>
                          <Textarea value={propertyForm.tenantInfo} onChange={(e) => setPropertyForm({...propertyForm, tenantInfo: e.target.value})} placeholder="Current tenant details..." data-testid="input-tenant-info" />
                        </div>
                      </div>
                    )}

                    {/* Location */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg border-b pb-2">Location</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Neighborhood *</Label>
                          <Input value={propertyForm.neighborhood} onChange={(e) => setPropertyForm({...propertyForm, neighborhood: e.target.value})} required data-testid="input-neighborhood" />
                        </div>
                        <div>
                          <Label>Borough *</Label>
                          <Select value={propertyForm.borough} onValueChange={(v) => setPropertyForm({...propertyForm, borough: v})}>
                            <SelectTrigger data-testid="select-borough"><SelectValue placeholder="Select..." /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Manhattan">Manhattan</SelectItem>
                              <SelectItem value="Brooklyn">Brooklyn</SelectItem>
                              <SelectItem value="Queens">Queens</SelectItem>
                              <SelectItem value="Bronx">Bronx</SelectItem>
                              <SelectItem value="Staten Island">Staten Island</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label>Floor/Suite</Label>
                        <Input value={propertyForm.floor} onChange={(e) => setPropertyForm({...propertyForm, floor: e.target.value})} placeholder="e.g., 5th Floor, Suite 500" data-testid="input-floor" />
                      </div>
                    </div>

                    {/* Description & Features */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg border-b pb-2">Description & Features</h3>
                      <div>
                        <Label>Description *</Label>
                        <Textarea value={propertyForm.description} onChange={(e) => setPropertyForm({...propertyForm, description: e.target.value})} required rows={4} data-testid="input-description" />
                      </div>
                      <div>
                        <Label>Features (comma-separated)</Label>
                        <Input value={propertyForm.features} onChange={(e) => setPropertyForm({...propertyForm, features: e.target.value})} placeholder="Central AC, Loading Dock, 24/7 Access" data-testid="input-features" />
                      </div>
                      <div>
                        <Label>Virtual Tour URL</Label>
                        <Input value={propertyForm.virtualTourUrl} onChange={(e) => setPropertyForm({...propertyForm, virtualTourUrl: e.target.value})} placeholder="https://..." data-testid="input-virtual-tour" />
                      </div>
                    </div>

                    {/* Images */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg border-b pb-2">Images</h3>
                      {propertyForm.images.length > 0 && (
                        <div className="grid grid-cols-4 gap-2">
                          {propertyForm.images.map((img, idx) => (
                            <div key={idx} className="relative">
                              <img src={img} alt={`Property ${idx + 1}`} className="w-full h-20 object-cover rounded" />
                              <Button type="button" variant="destructive" size="sm" className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full" onClick={() => removePropertyImage(idx)}>
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                      <ObjectUploader
                        maxNumberOfFiles={10}
                        maxFileSize={10485760}
                        onGetUploadParameters={async () => {
                          const response = await fetch('/api/objects/upload', { method: 'POST', credentials: 'include' });
                          const data = await response.json();
                          return { method: 'PUT' as const, url: data.uploadURL, objectPath: data.objectPath };
                        }}
                        onComplete={async (result) => {
                          if (result.successful) {
                            for (const file of result.successful) {
                              if (file.objectPath) await handlePropertyImageUpload(file.objectPath);
                            }
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

                    {/* Agent & Options */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg border-b pb-2">Assignment & Options</h3>
                      <div>
                        <Label>Assign Agent</Label>
                        <Select value={propertyForm.agentId} onValueChange={(v) => setPropertyForm({...propertyForm, agentId: v})}>
                          <SelectTrigger><SelectValue placeholder="Select agent..." /></SelectTrigger>
                          <SelectContent>
                            {agents.map(agent => (
                              <SelectItem key={agent.id} value={agent.id}>{agent.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch checked={propertyForm.featured} onCheckedChange={(checked) => setPropertyForm({...propertyForm, featured: checked})} data-testid="switch-featured" />
                        <Label>Featured Listing</Label>
                      </div>
                    </div>

                    {/* Submit */}
                    <div className="flex gap-2 pt-4">
                      {editingProperty && (
                        <Button type="button" variant="outline" className="flex-1" onClick={handleCancelPropertyEdit}>Cancel</Button>
                      )}
                      <Button type="submit" className={editingProperty ? "flex-1" : "w-full"} disabled={createPropertyMutation.isPending || updatePropertyMutation.isPending} data-testid={editingProperty ? "button-update-property" : "button-create-property"}>
                        {editingProperty ? (updatePropertyMutation.isPending ? "Updating..." : "Update Property") : (createPropertyMutation.isPending ? "Creating..." : "Create Property")}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Property List */}
              <Card>
                <CardHeader>
                  <CardTitle>All Properties ({properties.length})</CardTitle>
                </CardHeader>
                <CardContent className="max-h-[70vh] overflow-y-auto">
                  <div className="space-y-4">
                    {properties.map((property) => (
                      <div key={property.id} className="flex items-start justify-between p-4 border rounded-lg" data-testid={`property-item-${property.id}`}>
                        <div className="flex gap-3 flex-1">
                          {property.images && property.images[0] && (
                            <img src={property.images[0]} alt={property.title} className="w-16 h-16 object-cover rounded" />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 truncate">{property.title}</h4>
                              {property.featured && <Badge variant="secondary">Featured</Badge>}
                              <Badge variant={property.status === 'available' ? 'default' : 'outline'}>{property.status}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{property.neighborhood}, {property.borough}</p>
                            <p className="text-sm text-muted-foreground">{property.squareFootage.toLocaleString()} sqft • {property.subType}</p>
                            <p className="text-lg font-bold text-accent mt-1">
                              ${property.price.toLocaleString()}
                              {property.priceType === 'lease' ? '/yr' : ''}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-2">
                          <Button variant="ghost" size="sm" onClick={() => handleEditProperty(property)} data-testid={`button-edit-property-${property.id}`}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => deletePropertyMutation.mutate(property.id)} disabled={deletePropertyMutation.isPending} data-testid={`button-delete-property-${property.id}`}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    {properties.length === 0 && (
                      <p className="text-center text-muted-foreground py-8">No properties yet. Create your first listing above.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
