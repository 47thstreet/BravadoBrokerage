import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, TrendingUp, Building2, Home, Key } from "lucide-react";
import { Link } from "wouter";
import ListingsSale from "./ListingsSale";
import ListingsLease from "./ListingsLease";
import EmailSubscriptionCTA from "@/components/EmailSubscriptionCTA";

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const Listings = () => {
  return (
    <div data-testid="listings-page">
      {/* Executive Listings Hero */}
      <section className="executive-section bg-white dark:bg-neutral-950 min-h-[70vh] flex items-center" data-testid="listings-hero">
        <div className="executive-container">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-8">
              <div className="executive-badge mb-8">
                Property Listings
              </div>
              
              <h1 className="font-display text-display-xl text-neutral-900 dark:text-neutral-100 mb-8">
                Manhattan's Premier
                <span className="block text-accent">Property Portfolio</span>
              </h1>
              
              <p className="text-body-xl text-neutral-600 dark:text-neutral-400 mb-12 max-w-2xl">
                Discover exceptional properties available for sale and lease across Manhattan's 
                most distinguished addresses. From luxury residences to premier commercial spaces, 
                every listing represents the pinnacle of New York real estate.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" onClick={() => scrollToTop()}>
                  <Button className="executive-button executive-button-primary" data-testid="schedule-viewing">
                    Schedule Viewing
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Button className="executive-button executive-button-secondary" data-testid="get-market-report">
                  Get Market Report
                  <TrendingUp className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="lg:col-span-4">
              <div className="executive-card bg-neutral-50 dark:bg-neutral-900">
                <div className="p-8">
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-widest mb-8">
                    Active Portfolio
                  </div>
                  <div className="space-y-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-display-sm text-neutral-900 dark:text-neutral-100">127</div>
                        <div className="text-body-sm text-neutral-600 dark:text-neutral-400">Available Properties</div>
                      </div>
                      <Search className="w-5 h-5 text-accent" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-display-sm text-neutral-900 dark:text-neutral-100">43</div>
                        <div className="text-body-sm text-neutral-600 dark:text-neutral-400">Commercial Listings</div>
                      </div>
                      <Building2 className="w-5 h-5 text-accent" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-display-sm text-neutral-900 dark:text-neutral-100">84</div>
                        <div className="text-body-sm text-neutral-600 dark:text-neutral-400">Residential Listings</div>
                      </div>
                      <Home className="w-5 h-5 text-accent" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Executive Property Navigation */}
      <section className="executive-section bg-neutral-50 dark:bg-neutral-900 hairline-top">
        <div className="executive-container">
          <div className="mb-16 text-center">
            <div className="executive-badge mb-8">
              Browse Portfolio
            </div>
            <h2 className="font-display text-display-md text-neutral-900 dark:text-neutral-100 mb-6">
              Available Properties
            </h2>
            <p className="text-body-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Explore our curated selection of premier properties available for immediate purchase or lease.
            </p>
          </div>
          
          <Tabs defaultValue="sale" className="w-full" data-testid="listings-tabs">
            <TabsList className="grid w-full max-w-lg mx-auto grid-cols-2 mb-12 h-14">
              <TabsTrigger value="sale" className="text-body-lg font-medium py-4" data-testid="tab-sale">
                <Key className="mr-2 w-4 h-4" />
                For Sale
              </TabsTrigger>
              <TabsTrigger value="lease" className="text-body-lg font-medium py-4" data-testid="tab-lease">
                <Building2 className="mr-2 w-4 h-4" />
                For Lease
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="sale" data-testid="tab-content-sale">
              <ListingsSale />
            </TabsContent>
            
            <TabsContent value="lease" data-testid="tab-content-lease">
              <ListingsLease />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Executive Market Intelligence */}
      <section className="executive-section bg-white dark:bg-neutral-950 hairline-top">
        <div className="executive-container">
          <div className="text-center">
            <EmailSubscriptionCTA
              title="Exclusive Market Intelligence"
              description="Receive priority access to new listings, market insights, and exclusive opportunities before they reach the public market"
              context="listing"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Listings;