import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import HomeV2 from "@/pages/HomeV2";
import HomeV3 from "@/pages/HomeV3";
import HomeV4 from "@/pages/HomeV4";
import About from "@/pages/About";
import Agents from "@/pages/Agents";
import Services from "@/pages/Services";
import ServicesCommercial from "@/pages/ServicesCommercial";
import Contact from "@/pages/Contact";
import ApplyNow from "@/pages/ApplyNow";
import Listings from "@/pages/Listings";
import ListingsSale from "@/pages/ListingsSale";
import ListingsLease from "@/pages/ListingsLease";
import ListingsCommercial from "@/pages/ListingsCommercial";
import ListingsCommercialSale from "@/pages/ListingsCommercialSale";
import ListingsCommercialLease from "@/pages/ListingsCommercialLease";
import Markets from "@/pages/Markets";
import PropertyDetail from "@/pages/PropertyDetail";
import Subscription from "@/pages/Subscription";
import NotFound from "@/pages/not-found";
import Login from "@/pages/Login";
import AdminDashboard from "@/pages/AdminDashboard";
import AgentDashboard from "@/pages/AgentDashboard";
import AgentDetail from "@/pages/AgentDetail";
import SetupPassword from "@/pages/SetupPassword";
import { VersionProvider, useVersion } from "@/lib/versionContext";

const HOME_VERSIONS = { v1: Home, v2: HomeV2, v3: HomeV3, v4: HomeV4 } as const;

function VersionedHome() {
  const { version } = useVersion();
  const Component = HOME_VERSIONS[version];
  return <Component />;
}

function ScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={VersionedHome} />
        <Route path="/about" component={About} />
        <Route path="/agents" component={Agents} />
        <Route path="/agents/:id" component={AgentDetail} />
        <Route path="/services" component={Services} />
        <Route path="/services/commercial" component={ServicesCommercial} />
        <Route path="/contact" component={Contact} />
        <Route path="/apply-now" component={ApplyNow} />
        <Route path="/listings" component={Listings} />
        <Route path="/listings/sale" component={ListingsSale} />
        <Route path="/listings/lease" component={ListingsLease} />
        <Route path="/listings/commercial" component={ListingsCommercial} />
        <Route path="/listings/commercial/sale" component={ListingsCommercialSale} />
        <Route path="/listings/commercial/lease" component={ListingsCommercialLease} />
        <Route path="/markets" component={Markets} />
        <Route path="/subscription" component={Subscription} />
        <Route path="/property/:id" component={PropertyDetail} />
        
        {/* Auth pages */}
        <Route path="/login" component={Login} />
        <Route path="/setup-password/:token" component={SetupPassword} />
        
        {/* Dashboard pages */}
        <Route path="/admin" component={AdminDashboard} />
        <Route path="/agent/dashboard" component={AgentDashboard} />
        
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <VersionProvider>
        <TooltipProvider>
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-1">
              <Router />
            </main>
            <Footer />
          </div>
          <Toaster />
        </TooltipProvider>
      </VersionProvider>
    </QueryClientProvider>
  );
}

export default App;
