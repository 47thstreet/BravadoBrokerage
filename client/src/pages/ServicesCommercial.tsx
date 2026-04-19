import { Building2, Users, TrendingUp, Shield, CheckCircle, Briefcase, DollarSign, Key, ArrowRight, Calendar, Target, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const ServicesCommercial = () => {
  return (
    <div data-testid="services-commercial-page" className="min-h-screen bg-white dark:bg-neutral-950">
      {/* Executive Commercial Hero */}
      <section className="executive-section bg-white dark:bg-neutral-950 min-h-[70vh] flex items-center" data-testid="commercial-services-hero">
        <div className="executive-container">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-8">
              <h1 className="font-display text-display-xl text-neutral-900 dark:text-neutral-100 mb-8">
                Manhattan Commercial
                <span className="block text-accent">Real Estate</span>
              </h1>
              
              <p className="text-body-xl text-neutral-600 dark:text-neutral-400 mb-12 max-w-2xl">
                Comprehensive commercial real estate services delivering strategic value through 
                market expertise, analytical rigor, and institutional-grade execution across 
                Manhattan's premier business districts.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="executive-button executive-button-secondary" data-testid="download-capabilities">
                  Download Capabilities
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="lg:col-span-4">
              <div className="executive-card bg-neutral-50 dark:bg-neutral-900">
                <div className="p-8">
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-widest mb-8">
                    Market Performance
                  </div>
                  <div className="space-y-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-display-sm text-neutral-900 dark:text-neutral-100">$97M</div>
                        <div className="text-body-sm text-neutral-600 dark:text-neutral-400">Transaction Volume</div>
                      </div>
                      <Target className="w-5 h-5 text-accent" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-display-sm text-neutral-900 dark:text-neutral-100">1M+ SQFT</div>
                        <div className="text-body-sm text-neutral-600 dark:text-neutral-400">Under Management</div>
                      </div>
                      <Building2 className="w-5 h-5 text-accent" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-display-sm text-neutral-900 dark:text-neutral-100">180+</div>
                        <div className="text-body-sm text-neutral-600 dark:text-neutral-400">Active Transactions</div>
                      </div>
                      <Zap className="w-5 h-5 text-accent" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Executive Service Portfolio */}
      <section className="executive-section bg-neutral-50 dark:bg-neutral-900 hairline-top" data-testid="commercial-overview">
        <div className="executive-container">
          <div className="mb-16 text-center">
            <h2 className="font-display text-display-md text-neutral-900 dark:text-neutral-100 mb-6">
              Commercial Expertise
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            
            <div data-testid="commercial-advisory" className="executive-card group">
              <div className="flex-1">
                  <h3 className="font-display text-2xl text-neutral-900 dark:text-neutral-100 mb-4">
                    Strategic Advisory
                  </h3>
                  <p className="text-body-md text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                    Comprehensive market intelligence and strategic guidance informed by decades of experience 
                    in Manhattan's commercial real estate sector. Data-driven insights for optimal investment decisions.
                  </p>
                  <div className="grid grid-cols-2 gap-y-3 gap-x-6">
                    {["Market Research & Analysis", "Financial Modeling", "Strategic Consulting", "Investment Guidance"].map((item) => (
                      <div key={item} className="flex items-center text-body-sm text-neutral-700 dark:text-neutral-300">
                        <CheckCircle className="h-4 w-4 text-accent mr-3 flex-shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
            </div>

            <div data-testid="investment-sales" className="executive-card group">
              <div className="flex-1">
                  <h3 className="font-display text-2xl text-neutral-900 dark:text-neutral-100 mb-4">
                    Acquisition & Disposition
                  </h3>
                  <p className="text-body-md text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                    Strategic approach to commercial property transactions emphasizing thorough diligence 
                    and optimal market positioning. Maximizing value through disciplined execution and market expertise.
                  </p>
                  <div className="grid grid-cols-2 gap-y-3 gap-x-6">
                    {["Property Sourcing", "Deal Structuring", "Transaction Management", "Exit Strategy Planning"].map((item) => (
                      <div key={item} className="flex items-center text-body-sm text-neutral-700 dark:text-neutral-300">
                        <CheckCircle className="h-4 w-4 text-accent mr-3 flex-shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
            </div>

            <div data-testid="commercial-leasing" className="executive-card group">
              <div className="flex-1">
                  <h3 className="font-display text-2xl text-neutral-900 dark:text-neutral-100 mb-4">
                    Commercial Leasing
                  </h3>
                  <p className="text-body-md text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                    Comprehensive tenant positioning and lease structuring for office, retail, and industrial properties. 
                    From tenant sourcing to lease execution with meticulous attention to terms and market conditions.
                  </p>
                  <div className="grid grid-cols-2 gap-y-3 gap-x-6">
                    {["Tenant Sourcing", "Premium Marketing", "Lease Structuring", "Transaction Execution"].map((item) => (
                      <div key={item} className="flex items-center text-body-sm text-neutral-700 dark:text-neutral-300">
                        <CheckCircle className="h-4 w-4 text-accent mr-3 flex-shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
            </div>

            <div data-testid="landlord-representation" className="executive-card group">
              <div className="flex-1">
                  <h3 className="font-display text-2xl text-neutral-900 dark:text-neutral-100 mb-4">
                    Landlord Representation
                  </h3>
                  <p className="text-body-md text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                    Maximizing property potential through strategic market positioning and comprehensive asset management. 
                    Dedicated expertise ensuring optimal returns and competitive market advantage.
                  </p>
                  <div className="grid grid-cols-2 gap-y-3 gap-x-6">
                    {["Property Optimization", "Market Positioning", "Revenue Maximization", "Asset Management"].map((item) => (
                      <div key={item} className="flex items-center text-body-sm text-neutral-700 dark:text-neutral-300">
                        <CheckCircle className="h-4 w-4 text-accent mr-3 flex-shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
            </div>

            <div data-testid="tenant-representation" className="executive-card group">
              <div className="flex-1">
                  <h3 className="font-display text-2xl text-neutral-900 dark:text-neutral-100 mb-4">
                    Tenant Representation
                  </h3>
                  <p className="text-body-md text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                    Strategic site selection and masterful lease negotiation aligned with business objectives. 
                    Comprehensive market canvassing and expert advisory throughout the transaction process.
                  </p>
                  <div className="grid grid-cols-2 gap-y-3 gap-x-6">
                    {["Market Canvassing", "Site Selection", "Lease Negotiation", "Occupancy Planning"].map((item) => (
                      <div key={item} className="flex items-center text-body-sm text-neutral-700 dark:text-neutral-300">
                        <CheckCircle className="h-4 w-4 text-accent mr-3 flex-shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
            </div>

            <div data-testid="investment-sales-service" className="executive-card group">
              <div className="flex-1">
                  <h3 className="font-display text-2xl text-neutral-900 dark:text-neutral-100 mb-4">
                    Investment Sales
                  </h3>
                  <p className="text-body-md text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                    Institutional-grade acquisition and disposition advisory for portfolio optimization and strategic capital deployment. 
                    Data-driven analysis and market positioning to achieve superior transaction outcomes.
                  </p>
                  <div className="grid grid-cols-2 gap-y-3 gap-x-6">
                    {["Buyer/Seller Representation", "Market Valuation", "Deal Structuring", "Capital Markets Strategy"].map((item) => (
                      <div key={item} className="flex items-center text-body-sm text-neutral-700 dark:text-neutral-300">
                        <CheckCircle className="h-4 w-4 text-accent mr-3 flex-shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Dashboard */}
      <section className="executive-section bg-white dark:bg-neutral-950 hairline-top" data-testid="track-record">
        <div className="executive-container">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5">
              <div className="executive-badge mb-8">
                Track Record
              </div>
              <h2 className="font-display text-display-md text-neutral-900 dark:text-neutral-100 mb-6">
                Performance Metrics
              </h2>
              <div className="w-24 h-px bg-accent mb-8"></div>
              <p className="text-body-lg text-neutral-600 dark:text-neutral-400">
                Representative commercial transactions demonstrating disciplined execution 
                and consistent market expertise across Manhattan's business districts.
              </p>
            </div>
            
            <div className="lg:col-span-7">
              <div className="grid lg:grid-cols-2 gap-8">
                {[
                  { value: "150+", label: "Commercial Leases", period: "Since 2020", trend: "+18%" },
                  { value: "1M+", label: "SQFT Managed", period: "Active Portfolio", trend: "Growing" },
                  { value: "30+", label: "Investment Sales", period: "Past 24 Months", trend: "+12%" },
                  { value: "$97M", label: "Transaction Volume", period: "Annual Average", trend: "YoY" }
                ].map((stat) => (
                  <div key={stat.label} className="executive-card group" data-testid={`commercial-stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}>
                    <div className="flex items-center justify-between mb-6">
                      <div className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                        {stat.trend}
                      </div>
                      <TrendingUp className="w-4 h-4 text-neutral-300 dark:text-neutral-600 group-hover:text-accent transition-colors duration-300" />
                    </div>
                    <div className="text-display-sm text-neutral-900 dark:text-neutral-100 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-body-sm font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                      {stat.label}
                    </div>
                    <div className="text-body-xs text-neutral-500 dark:text-neutral-400">
                      {stat.period}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Executive Methodology */}
      <section className="executive-section bg-neutral-50 dark:bg-neutral-900 hairline-top" data-testid="why-choose-us">
        <div className="executive-container">
          <div className="mb-16 text-center">
            <h2 className="font-display text-display-md text-neutral-900 dark:text-neutral-100 mb-6">
              Methodology
            </h2>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {[
              { 
                icon: Shield, 
                title: "Market Intelligence", 
                description: "Comprehensive analysis of Manhattan's commercial districts and evolving market dynamics across all property types."
              },
              { 
                icon: Users, 
                title: "Professional Network", 
                description: "Established relationships with institutional investors, property owners, and market participants across the commercial sector."
              },
              { 
                icon: TrendingUp, 
                title: "Analytical Framework", 
                description: "Systematic financial modeling and market analysis supporting every strategic recommendation and transaction decision."
              },
              { 
                icon: Building2, 
                title: "Transaction Excellence", 
                description: "Disciplined execution methodology ensuring optimal outcomes through comprehensive diligence and strategic positioning."
              }
            ].map((capability) => (
              <div key={capability.title} className="executive-card group text-center">
                <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/10 transition-colors duration-300">
                  <capability.icon className="h-6 w-6 text-neutral-600 dark:text-neutral-400 group-hover:text-accent transition-colors duration-300" />
                </div>
                <h3 className="font-display text-body-lg text-neutral-900 dark:text-neutral-100 mb-4">
                  {capability.title}
                </h3>
                <p className="text-body-md text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {capability.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesCommercial;