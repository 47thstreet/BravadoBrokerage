import { TrendingUp, Building, Home, BarChart3, Globe, Target, Award } from "lucide-react";
import EmailSubscriptionCTA from "@/components/EmailSubscriptionCTA";

const Markets = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950" data-testid="markets-page">
      {/* Executive Hero Section */}
      <section className="executive-section bg-white dark:bg-neutral-950 min-h-[50vh] flex items-center" data-testid="markets-hero">
        <div className="executive-container">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-8">
              <div className="inline-block border border-neutral-200 dark:border-neutral-700 rounded-full px-4 py-2 text-xs font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-widest mb-8 bg-white/80 dark:bg-neutral-950/80">
                Market Intelligence
              </div>
              
              <h1 className="font-display text-display-lg text-neutral-900 dark:text-neutral-100 mb-8">
                NYC Real Estate
                <span className="block text-accent">Market Intelligence</span>
              </h1>
              
              <p className="text-body-lg text-neutral-600 dark:text-neutral-400 mb-12 max-w-2xl">
                Comprehensive market analysis and real-time insights across Manhattan's commercial districts 
                and Brooklyn's distinguished residential neighborhoods. Strategic intelligence for informed 
                investment decisions.
              </p>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-8 border-t border-neutral-200 dark:border-neutral-700">
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-medium text-accent mb-1">$31.2B</div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Total Volume</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-medium text-accent mb-1">487M SF</div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Commercial</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-medium text-accent mb-1">8,234</div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Transactions</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-medium text-accent mb-1">Q4 2024</div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Latest Data</div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-4">
              <div className="executive-card bg-neutral-50 dark:bg-neutral-900 p-8">
                <div className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-widest mb-6">
                  Market Highlights
                </div>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-body-sm text-neutral-600 dark:text-neutral-400">Commercial Growth</span>
                    <span className="text-body-sm font-medium text-green-600">+2.1M SF</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-body-sm text-neutral-600 dark:text-neutral-400">Residential Growth</span>
                    <span className="text-body-sm font-medium text-green-600">+4.2%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-body-sm text-neutral-600 dark:text-neutral-400">Avg. Days on Market</span>
                    <span className="text-body-sm font-medium text-neutral-900 dark:text-neutral-100">54 days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commercial Market Report */}
      <section className="executive-section bg-white dark:bg-neutral-950 hairline-top">
        <div className="executive-container">
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mr-4">
                <Building className="h-6 w-6 text-accent" />
              </div>
              <h2 className="font-display text-display-md text-neutral-900 dark:text-neutral-100">Commercial Market Report</h2>
            </div>
            <div className="w-24 h-px bg-accent mb-8"></div>
          </div>
          
          {/* Commercial Overview */}
          <div className="mb-16">
            <h3 className="font-display text-body-xl text-neutral-900 dark:text-neutral-100 mb-8">Market Overview</h3>
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="executive-card">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="font-display text-body-lg font-medium text-neutral-900 dark:text-neutral-100">Sales Market</h4>
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-accent" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between py-3 hairline-bottom">
                    <span className="text-body-sm text-neutral-600 dark:text-neutral-400">Total Sales Volume</span>
                    <span className="text-body-sm font-medium text-neutral-900 dark:text-neutral-100" data-testid="commercial-sales-volume">$12.8B</span>
                  </div>
                  <div className="flex justify-between py-3 hairline-bottom">
                    <span className="text-body-sm text-neutral-600 dark:text-neutral-400">Average Price/SF</span>
                    <span className="text-body-sm font-medium text-neutral-900 dark:text-neutral-100" data-testid="commercial-avg-price-sf">$892</span>
                  </div>
                  <div className="flex justify-between py-3 hairline-bottom">
                    <span className="text-body-sm text-neutral-600 dark:text-neutral-400">Total Transactions</span>
                    <span className="text-body-sm font-medium text-neutral-900 dark:text-neutral-100" data-testid="commercial-transactions">1,347</span>
                  </div>
                  <div className="flex justify-between py-3 hairline-bottom">
                    <span className="text-body-sm text-neutral-600 dark:text-neutral-400">YoY Sales Growth</span>
                    <span className="text-body-sm font-medium text-accent" data-testid="commercial-sales-yoy">-8.3%</span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span className="text-body-sm text-neutral-600 dark:text-neutral-400">Average Cap Rate</span>
                    <span className="text-body-sm font-medium text-neutral-900 dark:text-neutral-100" data-testid="commercial-cap-rate">5.8%</span>
                  </div>
                </div>
              </div>
              
              <div className="executive-card">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="font-display text-body-lg font-medium text-neutral-900 dark:text-neutral-100">Leasing Market</h4>
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                    <Building className="w-4 h-4 text-accent" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between py-3 hairline-bottom">
                    <span className="text-body-sm text-neutral-600 dark:text-neutral-400">Total Leasing Activity</span>
                    <span className="text-body-sm font-medium text-neutral-900 dark:text-neutral-100" data-testid="commercial-leasing-volume">47.2M SF</span>
                  </div>
                  <div className="flex justify-between py-3 hairline-bottom">
                    <span className="text-body-sm text-neutral-600 dark:text-neutral-400">Average Asking Rent</span>
                    <span className="text-body-sm font-medium text-neutral-900 dark:text-neutral-100" data-testid="commercial-avg-rent">$67.25/SF</span>
                  </div>
                  <div className="flex justify-between py-3 hairline-bottom">
                    <span className="text-body-sm text-neutral-600 dark:text-neutral-400">Overall Vacancy</span>
                    <span className="text-body-sm font-medium text-neutral-900 dark:text-neutral-100" data-testid="commercial-vacancy">13.7%</span>
                  </div>
                  <div className="flex justify-between py-3 hairline-bottom">
                    <span className="text-body-sm text-neutral-600 dark:text-neutral-400">Net Absorption</span>
                    <span className="text-body-sm font-medium text-green-600" data-testid="commercial-absorption">+2.1M SF</span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span className="text-body-sm text-neutral-600 dark:text-neutral-400">Under Construction</span>
                    <span className="text-body-sm font-medium text-neutral-900 dark:text-neutral-100" data-testid="commercial-construction">18.4M SF</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Manhattan Commercial Neighborhoods */}
          <div className="mb-12">
            <h3 className="font-serif text-3xl font-bold mb-8">Manhattan Commercial Districts</h3>
            
            <div className="space-y-8">
              <div>
                <h4 className="font-serif text-xl font-bold mb-4 border-b border-gray-200 pb-2">Core Business Districts</h4>
                <div className="space-y-6">
                  <div className="bg-white p-4 rounded border border-gray-200">
                    <h5 className="font-semibold text-lg mb-2">Midtown</h5>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm border-t border-gray-200 pt-3">
                      <div>Sale Price/SF: <span className="font-semibold" data-testid="midtown-sale-sf">$945</span></div>
                      <div>Lease Price/SF: <span className="font-semibold" data-testid="midtown-rent">$78.50</span></div>
                      <div>Vacancy Rate: <span className="font-semibold" data-testid="midtown-vacancy">19.4%</span></div>
                      <div>Sales Volume: <span className="font-semibold" data-testid="midtown-sales">$4.2B</span></div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded border border-gray-200">
                    <h5 className="font-semibold text-lg mb-2">Financial District</h5>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm border-t border-gray-200 pt-3">
                      <div>Sale Price/SF: <span className="font-semibold" data-testid="fidi-sale-sf">$867</span></div>
                      <div>Lease Price/SF: <span className="font-semibold" data-testid="fidi-rent">$65.75</span></div>
                      <div>Vacancy Rate: <span className="font-semibold" data-testid="fidi-vacancy">15.8%</span></div>
                      <div>Sales Volume: <span className="font-semibold" data-testid="fidi-sales">$2.8B</span></div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded border border-gray-200">
                    <h5 className="font-semibold text-lg mb-2">Hudson Yards</h5>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm border-t border-gray-200 pt-3">
                      <div>Sale Price/SF: <span className="font-semibold" data-testid="hudson-yards-sale-sf">$1,123</span></div>
                      <div>Lease Price/SF: <span className="font-semibold" data-testid="hudson-yards-rent">$89.25</span></div>
                      <div>Vacancy Rate: <span className="font-semibold" data-testid="hudson-yards-vacancy">12.3%</span></div>
                      <div>Sales Volume: <span className="font-semibold" data-testid="hudson-yards-sales">$1.8B</span></div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-serif text-xl font-bold mb-4 border-b border-gray-200 pb-2">Mixed-Use Districts</h4>
                <div className="space-y-6">
                  <div className="bg-white p-4 rounded border border-gray-200">
                    <h5 className="font-semibold text-lg mb-2">SoHo</h5>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm border-t border-gray-200 pt-3">
                      <div>Sale Price/SF: <span className="font-semibold" data-testid="soho-sale-sf">$1,245</span></div>
                      <div>Lease Price/SF: <span className="font-semibold" data-testid="soho-rent">$95.80</span></div>
                      <div>Vacancy Rate: <span className="font-semibold" data-testid="soho-vacancy">8.4%</span></div>
                      <div>Sales Volume: <span className="font-semibold" data-testid="soho-sales">$987M</span></div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded border border-gray-200">
                    <h5 className="font-semibold text-lg mb-2">Tribeca</h5>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm border-t border-gray-200 pt-3">
                      <div>Sale Price/SF: <span className="font-semibold" data-testid="tribeca-sale-sf">$912</span></div>
                      <div>Lease Price/SF: <span className="font-semibold" data-testid="tribeca-rent">$72.40</span></div>
                      <div>Vacancy Rate: <span className="font-semibold" data-testid="tribeca-vacancy">11.6%</span></div>
                      <div>Sales Volume: <span className="font-semibold" data-testid="tribeca-sales">$1.4B</span></div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded border border-gray-200">
                    <h5 className="font-semibold text-lg mb-2">Chelsea</h5>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm border-t border-gray-200 pt-3">
                      <div>Sale Price/SF: <span className="font-semibold" data-testid="chelsea-sale-sf">$834</span></div>
                      <div>Lease Price/SF: <span className="font-semibold" data-testid="chelsea-rent">$68.90</span></div>
                      <div>Vacancy Rate: <span className="font-semibold" data-testid="chelsea-vacancy">14.7%</span></div>
                      <div>Sales Volume: <span className="font-semibold" data-testid="chelsea-sales">$756M</span></div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded border border-gray-200">
                    <h5 className="font-semibold text-lg mb-2">Flatiron District</h5>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm border-t border-gray-200 pt-3">
                      <div>Sale Price/SF: <span className="font-semibold" data-testid="flatiron-sale-sf">$876</span></div>
                      <div>Lease Price/SF: <span className="font-semibold" data-testid="flatiron-rent">$71.25</span></div>
                      <div>Vacancy Rate: <span className="font-semibold" data-testid="flatiron-vacancy">16.2%</span></div>
                      <div>Sales Volume: <span className="font-semibold" data-testid="flatiron-sales">$892M</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Brooklyn Commercial Neighborhoods */}
          <div className="mb-12">
            <h3 className="font-serif text-3xl font-bold mb-8">Brooklyn Commercial Districts</h3>
            
            <div className="space-y-6">
              <div className="bg-white p-4 rounded border border-gray-200">
                <h5 className="font-semibold text-lg mb-2">DUMBO/Brooklyn Heights</h5>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm border-t border-gray-200 pt-3">
                  <div>Sale Price/SF: <span className="font-semibold" data-testid="dumbo-comm-sale-sf">$754</span></div>
                  <div>Lease Price/SF: <span className="font-semibold" data-testid="dumbo-rent">$58.90</span></div>
                  <div>Vacancy Rate: <span className="font-semibold" data-testid="dumbo-vacancy">6.8%</span></div>
                  <div>Sales Volume: <span className="font-semibold" data-testid="dumbo-sales">$892M</span></div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded border border-gray-200">
                <h5 className="font-semibold text-lg mb-2">Williamsburg</h5>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm border-t border-gray-200 pt-3">
                  <div>Sale Price/SF: <span className="font-semibold" data-testid="williamsburg-comm-sale-sf">$687</span></div>
                  <div>Lease Price/SF: <span className="font-semibold" data-testid="williamsburg-comm-rent">$52.40</span></div>
                  <div>Vacancy Rate: <span className="font-semibold" data-testid="williamsburg-comm-vacancy">7.9%</span></div>
                  <div>Sales Volume: <span className="font-semibold" data-testid="williamsburg-comm-sales">$645M</span></div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded border border-gray-200">
                <h5 className="font-semibold text-lg mb-2">Downtown Brooklyn</h5>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm border-t border-gray-200 pt-3">
                  <div>Sale Price/SF: <span className="font-semibold" data-testid="downtown-bk-sale-sf">$623</span></div>
                  <div>Lease Price/SF: <span className="font-semibold" data-testid="downtown-bk-rent">$48.75</span></div>
                  <div>Vacancy Rate: <span className="font-semibold" data-testid="downtown-bk-vacancy">12.3%</span></div>
                  <div>Sales Volume: <span className="font-semibold" data-testid="downtown-bk-sales">$567M</span></div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded border border-gray-200">
                <h5 className="font-semibold text-lg mb-2">Industry City</h5>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm border-t border-gray-200 pt-3">
                  <div>Sale Price/SF: <span className="font-semibold" data-testid="industry-city-sale-sf">$445</span></div>
                  <div>Lease Price/SF: <span className="font-semibold" data-testid="industry-city-rent">$32.80</span></div>
                  <div>Vacancy Rate: <span className="font-semibold" data-testid="industry-city-vacancy">5.4%</span></div>
                  <div>Sales Volume: <span className="font-semibold" data-testid="industry-city-sales">$289M</span></div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded border border-gray-200">
                <h5 className="font-semibold text-lg mb-2">Red Hook</h5>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm border-t border-gray-200 pt-3">
                  <div>Sale Price/SF: <span className="font-semibold" data-testid="red-hook-sale-sf">$512</span></div>
                  <div>Lease Price/SF: <span className="font-semibold" data-testid="red-hook-rent">$38.25</span></div>
                  <div>Vacancy Rate: <span className="font-semibold" data-testid="red-hook-vacancy">8.7%</span></div>
                  <div>Sales Volume: <span className="font-semibold" data-testid="red-hook-sales">$156M</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Residential Market Report */}
      <section className="executive-section bg-neutral-50 dark:bg-neutral-900 hairline-top">
        <div className="executive-container">
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mr-4">
                <Home className="h-6 w-6 text-accent" />
              </div>
              <h2 className="font-display text-display-md text-neutral-900 dark:text-neutral-100">Residential Market Report</h2>
            </div>
            <div className="w-24 h-px bg-accent mb-8"></div>
          </div>

          {/* Residential Overview */}
          <div className="mb-16">
            <h3 className="font-serif text-3xl font-bold mb-8">Market Overview</h3>
            <div className="grid md:grid-cols-2 gap-16">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h4 className="font-serif text-xl font-bold mb-4">Sales Market</h4>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Total Sales Volume</span>
                    <span className="font-semibold" data-testid="residential-sales-volume">$18.4B</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Average Price/SF</span>
                    <span className="font-semibold" data-testid="residential-avg-price-sf">$1,123</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Total Transactions</span>
                    <span className="font-semibold" data-testid="residential-transactions">8,234</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">YoY Sales Growth</span>
                    <span className="font-semibold text-green-600" data-testid="residential-sales-yoy">+2.7%</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Median Days on Market</span>
                    <span className="font-semibold" data-testid="residential-dom">54 days</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h4 className="font-serif text-xl font-bold mb-4">Rental Market</h4>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Average Monthly Rent</span>
                    <span className="font-semibold" data-testid="residential-avg-rent">$3,245</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Rent/SF (Monthly)</span>
                    <span className="font-semibold" data-testid="residential-rent-sf">$4.67</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Vacancy Rate</span>
                    <span className="font-semibold" data-testid="residential-vacancy">2.8%</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">YoY Rent Growth</span>
                    <span className="font-semibold text-green-600" data-testid="residential-rent-yoy">+4.2%</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Average Lease Term</span>
                    <span className="font-semibold" data-testid="residential-lease-term">13.2 months</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Manhattan Residential Neighborhoods */}
          <div className="mb-12">
            <h3 className="font-serif text-3xl font-bold mb-8">Manhattan Residential Neighborhoods</h3>
            
            <div className="space-y-8">
              <div>
                <h4 className="font-serif text-xl font-bold mb-4 border-b border-gray-200 pb-2">Upper Manhattan</h4>
                <div className="space-y-6">
                  <div className="bg-white p-4 rounded border border-gray-200">
                    <h5 className="font-semibold text-lg mb-2">Upper East Side</h5>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm border-t border-gray-200 pt-3">
                      <div>Median Sale Price: <span className="font-semibold" data-testid="ues-median-price">$1.89M</span></div>
                      <div>Price/SqFt: <span className="font-semibold" data-testid="ues-price-sqft">$1,634</span></div>
                      <div>YoY Change: <span className="font-semibold text-green-600" data-testid="ues-yoy">+2.8%</span></div>
                      <div>Inventory: <span className="font-semibold" data-testid="ues-inventory">1,892 units</span></div>
                      <div>Avg. DOM: <span className="font-semibold" data-testid="ues-dom">52 days</span></div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded border border-gray-200">
                    <h5 className="font-semibold text-lg mb-2">Upper West Side</h5>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm border-t border-gray-200 pt-3">
                      <div>Median Sale Price: <span className="font-semibold" data-testid="uws-median-price">$1.67M</span></div>
                      <div>Price/SqFt: <span className="font-semibold" data-testid="uws-price-sqft">$1,523</span></div>
                      <div>YoY Change: <span className="font-semibold text-green-600" data-testid="uws-yoy">+3.4%</span></div>
                      <div>Inventory: <span className="font-semibold" data-testid="uws-inventory">1,654 units</span></div>
                      <div>Avg. DOM: <span className="font-semibold" data-testid="uws-dom">48 days</span></div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-serif text-xl font-bold mb-4 border-b border-gray-200 pb-2">Midtown & Downtown</h4>
                <div className="space-y-6">
                  <div className="bg-white p-4 rounded border border-gray-200">
                    <h5 className="font-semibold text-lg mb-2">Midtown East</h5>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm border-t border-gray-200 pt-3">
                      <div>Median Sale Price: <span className="font-semibold" data-testid="midtown-east-median-price">$1.45M</span></div>
                      <div>Price/SqFt: <span className="font-semibold" data-testid="midtown-east-price-sqft">$1,389</span></div>
                      <div>YoY Change: <span className="font-semibold text-green-600" data-testid="midtown-east-yoy">+1.9%</span></div>
                      <div>Inventory: <span className="font-semibold" data-testid="midtown-east-inventory">987 units</span></div>
                      <div>Avg. DOM: <span className="font-semibold" data-testid="midtown-east-dom">58 days</span></div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded border border-gray-200">
                    <h5 className="font-semibold text-lg mb-2">Chelsea</h5>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm border-t border-gray-200 pt-3">
                      <div>Median Sale Price: <span className="font-semibold" data-testid="chelsea-res-median-price">$1.23M</span></div>
                      <div>Price/SqFt: <span className="font-semibold" data-testid="chelsea-res-price-sqft">$1,298</span></div>
                      <div>YoY Change: <span className="font-semibold text-green-600" data-testid="chelsea-res-yoy">+4.1%</span></div>
                      <div>Inventory: <span className="font-semibold" data-testid="chelsea-res-inventory">1,234 units</span></div>
                      <div>Avg. DOM: <span className="font-semibold" data-testid="chelsea-res-dom">45 days</span></div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded border border-gray-200">
                    <h5 className="font-semibold text-lg mb-2">Greenwich Village</h5>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm border-t border-gray-200 pt-3">
                      <div>Median Sale Price: <span className="font-semibold" data-testid="greenwich-village-median-price">$1.56M</span></div>
                      <div>Price/SqFt: <span className="font-semibold" data-testid="greenwich-village-price-sqft">$1,445</span></div>
                      <div>YoY Change: <span className="font-semibold text-green-600" data-testid="greenwich-village-yoy">+3.7%</span></div>
                      <div>Inventory: <span className="font-semibold" data-testid="greenwich-village-inventory">756 units</span></div>
                      <div>Avg. DOM: <span className="font-semibold" data-testid="greenwich-village-dom">41 days</span></div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded border border-gray-200">
                    <h5 className="font-semibold text-lg mb-2">SoHo</h5>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm border-t border-gray-200 pt-3">
                      <div>Median Sale Price: <span className="font-semibold" data-testid="soho-res-median-price">$2.34M</span></div>
                      <div>Price/SqFt: <span className="font-semibold" data-testid="soho-res-price-sqft">$1,823</span></div>
                      <div>YoY Change: <span className="font-semibold text-green-600" data-testid="soho-res-yoy">+5.2%</span></div>
                      <div>Inventory: <span className="font-semibold" data-testid="soho-res-inventory">423 units</span></div>
                      <div>Avg. DOM: <span className="font-semibold" data-testid="soho-res-dom">38 days</span></div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded border border-gray-200">
                    <h5 className="font-semibold text-lg mb-2">NoLita</h5>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm border-t border-gray-200 pt-3">
                      <div>Median Sale Price: <span className="font-semibold" data-testid="nolita-median-price">$1.98M</span></div>
                      <div>Price/SqFt: <span className="font-semibold" data-testid="nolita-price-sqft">$1,567</span></div>
                      <div>YoY Change: <span className="font-semibold text-green-600" data-testid="nolita-yoy">+4.8%</span></div>
                      <div>Inventory: <span className="font-semibold" data-testid="nolita-inventory">334 units</span></div>
                      <div>Avg. DOM: <span className="font-semibold" data-testid="nolita-dom">42 days</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Brooklyn Residential Neighborhoods */}
          <div className="mb-12">
            <h3 className="font-serif text-3xl font-bold mb-8">Brooklyn Residential Neighborhoods</h3>
            
            <div className="space-y-6">
              <div className="bg-white p-4 rounded border border-gray-200">
                <h5 className="font-semibold text-lg mb-2">Park Slope</h5>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm border-t border-gray-200 pt-3">
                  <div>Median Sale Price: <span className="font-semibold" data-testid="park-slope-median-price">$1.23M</span></div>
                  <div>Price/SqFt: <span className="font-semibold" data-testid="park-slope-price-sqft">$1,034</span></div>
                  <div>YoY Change: <span className="font-semibold text-green-600" data-testid="park-slope-yoy">+6.2%</span></div>
                  <div>Inventory: <span className="font-semibold" data-testid="park-slope-inventory">567 units</span></div>
                  <div>Avg. DOM: <span className="font-semibold" data-testid="park-slope-dom">68 days</span></div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded border border-gray-200">
                <h5 className="font-semibold text-lg mb-2">Carroll Gardens</h5>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm border-t border-gray-200 pt-3">
                  <div>Median Sale Price: <span className="font-semibold" data-testid="carroll-gardens-median-price">$1.08M</span></div>
                  <div>Price/SqFt: <span className="font-semibold" data-testid="carroll-gardens-price-sqft">$923</span></div>
                  <div>YoY Change: <span className="font-semibold text-green-600" data-testid="carroll-gardens-yoy">+5.7%</span></div>
                  <div>Inventory: <span className="font-semibold" data-testid="carroll-gardens-inventory">389 units</span></div>
                  <div>Avg. DOM: <span className="font-semibold" data-testid="carroll-gardens-dom">72 days</span></div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded border border-gray-200">
                <h5 className="font-semibold text-lg mb-2">DUMBO</h5>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm border-t border-gray-200 pt-3">
                  <div>Median Sale Price: <span className="font-semibold" data-testid="dumbo-res-median-price">$1.45M</span></div>
                  <div>Price/SqFt: <span className="font-semibold" data-testid="dumbo-res-price-sqft">$1,234</span></div>
                  <div>YoY Change: <span className="font-semibold text-green-600" data-testid="dumbo-res-yoy">+4.3%</span></div>
                  <div>Inventory: <span className="font-semibold" data-testid="dumbo-res-inventory">234 units</span></div>
                  <div>Avg. DOM: <span className="font-semibold" data-testid="dumbo-res-dom">55 days</span></div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded border border-gray-200">
                <h5 className="font-semibold text-lg mb-2">Williamsburg</h5>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm border-t border-gray-200 pt-3">
                  <div>Median Sale Price: <span className="font-semibold" data-testid="williamsburg-res-median-price">$1.19M</span></div>
                  <div>Price/SqFt: <span className="font-semibold" data-testid="williamsburg-res-price-sqft">$1,089</span></div>
                  <div>YoY Change: <span className="font-semibold text-green-600" data-testid="williamsburg-res-yoy">+5.8%</span></div>
                  <div>Inventory: <span className="font-semibold" data-testid="williamsburg-res-inventory">678 units</span></div>
                  <div>Avg. DOM: <span className="font-semibold" data-testid="williamsburg-res-dom">61 days</span></div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded border border-gray-200">
                <h5 className="font-semibold text-lg mb-2">Fort Greene</h5>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm border-t border-gray-200 pt-3">
                  <div>Median Sale Price: <span className="font-semibold" data-testid="fort-greene-median-price">$945K</span></div>
                  <div>Price/SqFt: <span className="font-semibold" data-testid="fort-greene-price-sqft">$834</span></div>
                  <div>YoY Change: <span className="font-semibold text-green-600" data-testid="fort-greene-yoy">+7.1%</span></div>
                  <div>Inventory: <span className="font-semibold" data-testid="fort-greene-inventory">445 units</span></div>
                  <div>Avg. DOM: <span className="font-semibold" data-testid="fort-greene-dom">64 days</span></div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded border border-gray-200">
                <h5 className="font-semibold text-lg mb-2">Prospect Heights</h5>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm border-t border-gray-200 pt-3">
                  <div>Median Sale Price: <span className="font-semibold" data-testid="prospect-heights-median-price">$876K</span></div>
                  <div>Price/SqFt: <span className="font-semibold" data-testid="prospect-heights-price-sqft">$789</span></div>
                  <div>YoY Change: <span className="font-semibold text-green-600" data-testid="prospect-heights-yoy">+6.8%</span></div>
                  <div>Inventory: <span className="font-semibold" data-testid="prospect-heights-inventory">523 units</span></div>
                  <div>Avg. DOM: <span className="font-semibold" data-testid="prospect-heights-dom">69 days</span></div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded border border-gray-200">
                <h5 className="font-semibold text-lg mb-2">Crown Heights</h5>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm border-t border-gray-200 pt-3">
                  <div>Median Sale Price: <span className="font-semibold" data-testid="crown-heights-median-price">$723K</span></div>
                  <div>Price/SqFt: <span className="font-semibold" data-testid="crown-heights-price-sqft">$656</span></div>
                  <div>YoY Change: <span className="font-semibold text-green-600" data-testid="crown-heights-yoy">+8.4%</span></div>
                  <div>Inventory: <span className="font-semibold" data-testid="crown-heights-inventory">789 units</span></div>
                  <div>Avg. DOM: <span className="font-semibold" data-testid="crown-heights-dom">73 days</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Intelligence Summary */}
      <section className="executive-section bg-white dark:bg-neutral-950 hairline-top">
        <div className="executive-container">
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mr-4">
                <BarChart3 className="h-6 w-6 text-accent" />
              </div>
              <h2 className="font-display text-display-md text-neutral-900 dark:text-neutral-100">Market Intelligence Summary</h2>
            </div>
            <div className="w-24 h-px bg-accent mb-8"></div>
          </div>

          <div className="executive-card mb-16">
            <div className="space-y-6">
              <div className="flex justify-between py-4 hairline-bottom">
                <span className="text-body-md text-neutral-600 dark:text-neutral-400">Total Commercial Square Footage</span>
                <span className="text-body-md font-medium text-neutral-900 dark:text-neutral-100" data-testid="total-inventory">487M SF</span>
              </div>
              <div className="flex justify-between py-4 hairline-bottom">
                <span className="text-body-md text-neutral-600 dark:text-neutral-400">Residential Sales (Q4 2024)</span>
                <span className="text-body-md font-medium text-neutral-900 dark:text-neutral-100" data-testid="total-sales">8,234 transactions</span>
              </div>
              <div className="flex justify-between py-4 hairline-bottom">
                <span className="text-body-md text-neutral-600 dark:text-neutral-400">Total Sales Volume</span>
                <span className="text-body-md font-medium text-neutral-900 dark:text-neutral-100" data-testid="investment-volume">$31.2B</span>
              </div>
              <div className="flex justify-between py-4">
                <span className="text-body-md text-neutral-600 dark:text-neutral-400">Average Days on Market</span>
                <span className="text-body-md font-medium text-neutral-900 dark:text-neutral-100" data-testid="avg-dom">54 days</span>
              </div>
            </div>
          </div>

          {/* Email Subscription CTA */}
          <div className="mb-20">
            <EmailSubscriptionCTA 
              title="Stay Ahead of NYC Market Trends"
              description="Get exclusive market reports and new property alerts delivered to your inbox"
              context="market"
            />
          </div>

          {/* Data Sources */}
          <div className="hairline-top pt-16">
            <div className="text-center">
              <h3 className="font-display text-body-xl text-neutral-900 dark:text-neutral-100 mb-6">
                Market Data Sources
              </h3>
              <p className="text-body-md text-neutral-600 dark:text-neutral-400 mb-6">
                Our market intelligence is powered by comprehensive data integration from industry-leading platforms.
              </p>
              <p className="text-body-sm text-neutral-500 dark:text-neutral-400">
                Last updated: December 2024 • Reports generated quarterly with real-time market alerts
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Markets;