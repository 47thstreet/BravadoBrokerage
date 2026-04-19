import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Building, 
  Home, 
  Users, 
  DollarSign, 
  ArrowRight,
  Phone,
  MapPin,
  Target,
  Key,
  FileText,
  Briefcase
} from "lucide-react";

const Services = () => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950" data-testid="services-page">
      {/* Streamlined Hero - Mobile First */}
      <section className="py-16 lg:py-24 bg-white dark:bg-neutral-950" data-testid="services-hero">
        <div className="executive-container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block border border-neutral-300 dark:border-neutral-600 px-3 py-1 text-xs font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-widest mb-6 rounded">
              Expert Services
            </div>
            
            <h1 className="text-3xl md:text-5xl font-display text-neutral-900 dark:text-neutral-100 mb-6">
              Manhattan Real Estate
              <span className="block text-accent">Solutions</span>
            </h1>
            
            <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto">
              Commercial investments, luxury residential, and strategic advisory services for Manhattan's discerning clients.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" onClick={scrollToTop}>
                <Button size="lg" className="w-full sm:w-auto" data-testid="consultation-button">
                  Free Consultation
                  <Phone className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/listings" onClick={scrollToTop}>
                <Button size="lg" variant="outline" className="w-full sm:w-auto" data-testid="browse-properties">
                  Browse Properties
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Commercial Services Cards */}
      <section className="py-16 bg-neutral-50 dark:bg-neutral-900" data-testid="commercial-services">
        <div className="executive-container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-display text-neutral-900 dark:text-neutral-100 mb-4">
              Commercial Services
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              Investment opportunities and strategic commercial solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Investment Sales */}
            <div className="executive-card p-6 group hover:border-accent/20 transition-all duration-300" data-testid="investment-sales">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-display text-neutral-900 dark:text-neutral-100 mb-3">
                Investment Sales
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                Maximize returns with data-driven investment opportunities and strategic portfolio growth.
              </p>
              <Link href="/contact" onClick={scrollToTop}>
                <Button variant="ghost" size="sm" className="w-full justify-between group-hover:text-accent" data-testid="investment-cta">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            {/* Commercial Leasing */}
            <div className="executive-card p-6 group hover:border-accent/20 transition-all duration-300" data-testid="commercial-leasing">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                <Building className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-display text-neutral-900 dark:text-neutral-100 mb-3">
                Commercial Leasing
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                Optimize space utilization and rental income for office, retail, and industrial properties.
              </p>
              <Link href="/contact" onClick={scrollToTop}>
                <Button variant="ghost" size="sm" className="w-full justify-between group-hover:text-accent" data-testid="leasing-cta">
                  Get Quote
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            {/* Market Advisory */}
            <div className="executive-card p-6 group hover:border-accent/20 transition-all duration-300" data-testid="advisory">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                <Target className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-display text-neutral-900 dark:text-neutral-100 mb-3">
                Market Advisory
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                Strategic insights and market intelligence to guide your investment decisions.
              </p>
              <Link href="/contact" onClick={scrollToTop}>
                <Button variant="ghost" size="sm" className="w-full justify-between group-hover:text-accent" data-testid="advisory-cta">
                  Schedule Call
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Residential Services Cards */}
      <section className="py-16 bg-white dark:bg-neutral-950" data-testid="residential-services">
        <div className="executive-container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-display text-neutral-900 dark:text-neutral-100 mb-4">
              Residential Services
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              Luxury sales, leasing, and development expertise
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Residential Sales */}
            <div className="executive-card p-6 group hover:border-accent/20 transition-all duration-300" data-testid="residential-sales">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                <Home className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-display text-neutral-900 dark:text-neutral-100 mb-3">
                Luxury Sales
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                Buy or sell Manhattan's finest properties with expert market positioning.
              </p>
              <Link href="/contact" onClick={scrollToTop}>
                <Button variant="ghost" size="sm" className="w-full justify-between group-hover:text-accent" data-testid="sales-cta">
                  Get Valuation
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            {/* Residential Leasing */}
            <div className="executive-card p-6 group hover:border-accent/20 transition-all duration-300" data-testid="residential-leasing">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                <Key className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-display text-neutral-900 dark:text-neutral-100 mb-3">
                Premium Leasing
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                Find the perfect tenant or luxury rental with professional management.
              </p>
              <Link href="/contact" onClick={scrollToTop}>
                <Button variant="ghost" size="sm" className="w-full justify-between group-hover:text-accent" data-testid="leasing-residential-cta">
                  Start Search
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            {/* New Development */}
            <div className="executive-card p-6 group hover:border-accent/20 transition-all duration-300" data-testid="new-development">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                <Briefcase className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-display text-neutral-900 dark:text-neutral-100 mb-3">
                Development
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                Launch successful developments with strategic marketing and sales expertise.
              </p>
              <Link href="/contact" onClick={scrollToTop}>
                <Button variant="ghost" size="sm" className="w-full justify-between group-hover:text-accent" data-testid="development-cta">
                  Discuss Project
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-accent text-white" data-testid="services-cta">
        <div className="executive-container text-center">
          <h2 className="text-2xl md:text-4xl font-display mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Schedule a consultation to discuss your Manhattan real estate needs
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/contact" onClick={scrollToTop}>
              <Button size="lg" variant="secondary" className="w-full sm:w-auto text-accent hover:text-accent/90" data-testid="main-cta">
                Schedule Consultation
                <Phone className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/agents" onClick={scrollToTop}>
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-accent" data-testid="team-cta">
                Meet Our Team
                <Users className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
          
          <div className="flex justify-center items-center gap-8 text-sm opacity-75">
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-2" />
              <span>(212) 555-0000</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              <span>Manhattan Office</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;