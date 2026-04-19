import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Building, 
  Home as HomeIcon, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle,
  DollarSign,
  BarChart3,
  Star,
  Target,
  Clock,
  MapPin,
  Award,
  Users
} from "lucide-react";
import PropertyGrid from "@/components/PropertyGrid";

// Single compelling Manhattan hero image
const HERO_IMAGE = "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80";

const Home = () => {

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950" data-testid="home-page">
      {/* Streamlined Hero - Two Column Layout */}
      <section className="relative py-12 bg-white dark:bg-neutral-950 overflow-hidden" data-testid="hero">
        <div className="executive-container">
          <div className="grid lg:grid-cols-2 gap-6 items-center">
            {/* Left Column - Content */}
            <div className="max-w-2xl">
              <div className="mb-3">
                <div className="inline-block border border-neutral-300 dark:border-neutral-600 px-3 py-1 text-xs font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-widest bg-white/90 dark:bg-neutral-950/90 rounded">
                  Est. 2018
                </div>
              </div>
              
              <h1 className="text-2xl md:text-4xl font-display text-neutral-900 dark:text-neutral-100 leading-tight mb-3">
                Built on Trust.
                <span className="block text-accent">Strengthened by Expertise.</span>
              </h1>
              
              <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 mb-4">
                Data and technology backed by tenacity and trust. Institutional discipline applied to New York's most complex real estate challenges. We decode value, forecast opportunity, and execute with precision.
              </p>

              <div className="grid grid-cols-3 gap-4 mb-4 py-4 border-y border-neutral-200 dark:border-neutral-700">
                <div className="text-center">
                  <div className="text-lg md:text-2xl font-bold text-accent mb-0.5">15+</div>
                  <div className="text-xs text-neutral-500 uppercase tracking-wider">Years</div>
                </div>
                <div className="text-center">
                  <div className="text-lg md:text-2xl font-bold text-accent mb-0.5">$140M+</div>
                  <div className="text-xs text-neutral-500 uppercase tracking-wider">Volume</div>
                </div>
                <div className="text-center">
                  <div className="text-lg md:text-2xl font-bold text-accent mb-0.5">2000+</div>
                  <div className="text-xs text-neutral-500 uppercase tracking-wider">Deals</div>
                </div>
              </div>
              
              <div className="flex justify-start mt-4">
                <Link href="/about" onClick={scrollToTop}>
                  <Button size="lg" className="executive-button executive-button-primary" data-testid="hero-cta-primary">
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Right Column - NYC Skyline Image with "Draw Up" Animation */}
            <motion.div 
              className="hidden lg:flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeOut", delay: 0.2 }}
            >
              <motion.img 
                src="/attached_assets/PHOTO-2019-02-04-15-25-38_1757990963195.jpg" 
                alt="Manhattan Skyline Architecture" 
                className="w-full h-auto max-w-md object-contain"
                initial={{ clipPath: "inset(100% 0 0 0)" }}
                animate={{ clipPath: "inset(0% 0 0 0)" }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                whileHover={{ scale: 1.02 }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Simplified Success Metrics */}
      <section className="py-24 bg-neutral-50 dark:bg-neutral-900" data-testid="success-metrics">
        <div className="executive-container">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { value: "$47M", label: "Midtown Investment", detail: "Closed 45 days early" },
              { value: "150K", label: "SQFT Leased", detail: "23% above market" },
              { value: "94%", label: "Pre-Sales", detail: "Brooklyn Heights" }
            ].map((metric, index) => (
              <motion.div 
                key={metric.label}
                className="executive-card p-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <motion.div 
                  className="text-6xl font-bold text-accent mb-4"
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.2 + 0.2, ease: "easeOut" }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  {metric.value}
                </motion.div>
                <div className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">{metric.label}</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">{metric.detail}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;