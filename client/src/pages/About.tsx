import { Star, Shield, Lightbulb, Building, Users, TrendingUp, Award, MapPin, Calendar, CheckCircle, ArrowRight, Zap, Target, Globe, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button"; 
import { Link } from "wouter";

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const About = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950" data-testid="about-page">
      {/* Streamlined Hero - Mobile First */}
      <section className="py-16 lg:py-24 bg-white dark:bg-neutral-950" data-testid="about-hero">
        <div className="executive-container">
        </div>
      </section>

      {/* Bravado Real Estate Story */}
      <section className="executive-section bg-neutral-50 dark:bg-neutral-900" data-testid="company-story">
        <div className="executive-container">
          <div className="executive-card p-8 md:p-12 bg-white dark:bg-neutral-900/50 mb-12">
            <div className="max-w-3xl mx-auto">
              <div className="inline-block border border-neutral-300 dark:border-neutral-600 px-3 py-1 text-xs font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-widest mb-6 rounded">
                Our Story
              </div>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                Established in 2018, <span className="font-semibold text-neutral-900 dark:text-neutral-100">Bravado Real Estate (BRE)</span> is a New York City–based commercial brokerage rooted in over a decade of experience in investment sales and commercial leasing. BRE was built to move beyond the traditional broker role — applying institutional rigor and technology-driven intelligence to a market where precision creates advantage.
              </p>
              
              <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                Data is not decoration at BRE — it drives strategy. We deploy advanced analytics and AI-powered tools to decode zoning, underwrite value, forecast emerging demand, and uncover opportunities often overlooked in complex assets. Our clients rely on us for disciplined underwriting, strategic retail and office advisory, and marketing engineered to accelerate decision-making and maximize outcomes.
              </p>
              
              <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                We operate in the most competitive real estate market in the world, where every block behaves differently, every detail influences value, and execution determines results. Whether advising owners, developers, landlords, or tenants, we treat every assignment like a partnership and every property like a portfolio.
              </p>
              
              <div className="pt-6 border-t border-neutral-200 dark:border-neutral-700 grid md:grid-cols-3 gap-8">
                <div>
                  <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">Institutional in Practice</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">Regulated broker standards and rigorous compliance frameworks.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">Entrepreneurial Mindset</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">Agile strategies that adapt to market dynamics and client needs.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">Technology-Forward</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">Advanced analytics and AI tools driving competitive advantage.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Core Strengths */}
          <div className="max-w-5xl mx-auto mb-16">
            <h2 className="text-2xl md:text-3xl font-display text-neutral-900 dark:text-neutral-100 mb-12 pb-6 border-b border-neutral-200 dark:border-neutral-700">
              Core Strengths
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 text-lg mb-2">Institutional Market Access</h3>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Direct relationships with institutional capital, family offices, REITs, and institutional lenders. We navigate complex deal structures and nuanced negotiations across Manhattan's most competitive transactions.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 text-lg mb-2">Disciplined Underwriting</h3>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Rigorous financial analysis, market validation, and risk assessment. We deliver the intelligence needed for confident decision-making on complex, high-value assets.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 text-lg mb-2">Technology & Intelligence</h3>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Advanced analytics platforms, AI-driven market intelligence, and proprietary datasets that provide competitive insight and execution advantage.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 text-lg mb-2">Strategic Execution</h3>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Customized marketing, targeted outreach, and transaction management engineered to accelerate deal closing and maximize outcomes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Expertise Services */}
      <section className="py-16 lg:py-20 bg-white dark:bg-neutral-950" data-testid="services-overview">
        <div className="executive-container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-display text-neutral-900 dark:text-neutral-100 mb-4">
              Our Expertise
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Acquisition & Disposition */}
            <Link href="/services/commercial" className="group" data-testid="service-acquisition">
              <div className="executive-card p-6 h-full hover:border-accent/20 transition-all duration-300">
                <h3 className="text-2xl font-display text-neutral-900 dark:text-neutral-100 mb-4 group-hover:text-accent transition-colors">
                  Acquisition & Disposition
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-3">
                  Buy, sell, and strategically transition commercial assets
                </p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                  From identifying high-value opportunities to executing complex transactions, we deliver disciplined underwriting and market intelligence to maximize returns on acquisitions and optimize exit strategies.
                </p>
                <div className="flex items-center text-sm font-medium text-accent group-hover:translate-x-1 transition-transform">
                  <span className="mr-2">Explore</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>

            {/* Tenant Representation */}
            <Link href="/services/commercial" className="group" data-testid="service-tenant">
              <div className="executive-card p-6 h-full hover:border-accent/20 transition-all duration-300">
                <h3 className="text-2xl font-display text-neutral-900 dark:text-neutral-100 mb-4 group-hover:text-accent transition-colors">
                  Tenant Representation
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-3">
                  Secure optimal spaces and favorable lease terms
                </p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                  We negotiate on your behalf to find premium locations with strategic value, securing competitive rates and terms that support your operational goals and financial performance.
                </p>
                <div className="flex items-center text-sm font-medium text-accent group-hover:translate-x-1 transition-transform">
                  <span className="mr-2">Explore</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>

            {/* Landlord Representation */}
            <Link href="/services/commercial" className="group" data-testid="service-landlord">
              <div className="executive-card p-6 h-full hover:border-accent/20 transition-all duration-300">
                <h3 className="text-2xl font-display text-neutral-900 dark:text-neutral-100 mb-4 group-hover:text-accent transition-colors">
                  Landlord Representation
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-3">
                  Maximize asset value and tenant quality
                </p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                  We optimize your property's revenue potential and tenant mix through strategic leasing, targeted marketing, and disciplined tenant evaluation to ensure long-term stability and asset appreciation.
                </p>
                <div className="flex items-center text-sm font-medium text-accent group-hover:translate-x-1 transition-transform">
                  <span className="mr-2">Explore</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Executive Credentials */}
      <section className="executive-section bg-white dark:bg-neutral-950 hairline-top" data-testid="credentials">
        <div className="executive-container">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-8">
              <div className="executive-badge mb-8">
                Market Recognition
              </div>
              <h2 className="font-display text-display-md text-neutral-900 dark:text-neutral-100 mb-8">
                Industry Credentials
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="flex items-center space-x-4">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span className="text-body-md text-neutral-600 dark:text-neutral-400">Licensed Real Estate Broker, NY</span>
                </div>
                <div className="flex items-center space-x-4">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span className="text-body-md text-neutral-600 dark:text-neutral-400">REBNY Member Since 1985</span>
                </div>
                <div className="flex items-center space-x-4">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span className="text-body-md text-neutral-600 dark:text-neutral-400">Commercial Investment Real Estate</span>
                </div>
                <div className="flex items-center space-x-4">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span className="text-body-md text-neutral-600 dark:text-neutral-400">Manhattan Specialist</span>
                </div>
              </div>
              
              <p className="text-body-lg text-neutral-600 dark:text-neutral-400 mb-8">
                Whether representing institutional investors in complex commercial transactions or guiding 
                individuals through residential acquisitions, our commitment remains unchanged: delivering 
                strategic counsel and market access essential for superior outcomes.
              </p>
            </div>
            
            <div className="lg:col-span-4">
              <div className="executive-card bg-neutral-50 dark:bg-neutral-900">
                <div className="text-center p-8">
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-widest mb-4">
                    Next Steps
                  </div>
                  <h3 className="font-display text-body-xl text-neutral-900 dark:text-neutral-100 mb-6">
                    Strategic Consultation
                  </h3>
                  <p className="text-body-md text-neutral-600 dark:text-neutral-400 mb-8">
                    Schedule a confidential consultation to discuss your real estate objectives 
                    and market positioning strategy.
                  </p>
                  
                  <div className="space-y-4">
                    <Link href="/contact" onClick={() => scrollToTop()}>
                      <Button className="executive-button executive-button-primary w-full" data-testid="consultation-button">
                        Schedule Consultation
                        <Calendar className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                    <Link href="/agents" onClick={() => scrollToTop()}>
                      <Button className="executive-button executive-button-secondary w-full" data-testid="team-link">
                        Meet Our Team
                        <ChevronRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;