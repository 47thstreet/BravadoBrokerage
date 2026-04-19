import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "wouter";
import { useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  TrendingUp,
  ArrowRight,
  CheckCircle,
  BarChart3,
  Star,
  Target,
  Clock,
  Award,
  Users,
  Phone,
  Shield,
  Zap,
  Eye,
  ChevronRight,
  X,
  Mail,
  Building,
} from "lucide-react";
import PropertyGrid from "@/components/PropertyGrid";

// ---------------------------------------------------------------------------
// Animated counter – the ONLY framer-motion animation beyond simple fades
// ---------------------------------------------------------------------------
function AnimatedCounter({
  target,
  prefix = "",
  suffix = "",
  duration = 2,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration * 60);
    const id = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(id);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(id);
  }, [inView, target, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Testimonial data
// ---------------------------------------------------------------------------
const TESTIMONIALS = [
  {
    name: "Michael R.",
    role: "Investment Property Buyer",
    text: "Bravado found me a pre-market deal in the East Village that appreciated 22% in 18 months. Their market intelligence is unmatched.",
    rating: 5,
    location: "East Village, Manhattan",
  },
  {
    name: "Sarah & David L.",
    role: "First-Time Home Buyers",
    text: "We were overwhelmed by the NYC market. Bravado walked us through every step and negotiated $85K below asking. Could not have done it without them.",
    rating: 5,
    location: "Brooklyn Heights",
  },
  {
    name: "James T.",
    role: "Commercial Investor",
    text: "I have worked with a dozen brokerages in New York. Bravado is the only one that combines institutional-level analysis with a personal touch.",
    rating: 5,
    location: "Midtown, Manhattan",
  },
  {
    name: "Linda W.",
    role: "Seller",
    text: "They sold my condo in 9 days, $40K over asking. The staging advice and pricing strategy were spot on from day one.",
    rating: 5,
    location: "DUMBO, Brooklyn",
  },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
const HomeV4 = () => {
  const scrollToTop = () => window.scrollTo(0, 0);
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const exitIntentFired = useRef(false);

  // Exit-intent trigger (desktop only) — fires at most once per session
  useEffect(() => {
    if (sessionStorage.getItem("bravado_exit_intent_shown")) {
      exitIntentFired.current = true;
    }
    const handler = (e: MouseEvent) => {
      if (e.clientY < 10 && !exitIntentFired.current && !newsletterSubmitted) {
        exitIntentFired.current = true;
        sessionStorage.setItem("bravado_exit_intent_shown", "1");
        setShowNewsletter(true);
      }
    };
    document.addEventListener("mouseleave", handler);
    return () => document.removeEventListener("mouseleave", handler);
  }, [newsletterSubmitted]);

  // Close popup on Escape key
  useEffect(() => {
    if (!showNewsletter) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowNewsletter(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [showNewsletter]);

  const handleNewsletterSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!newsletterEmail) return;
      setNewsletterSubmitted(true);
      setShowNewsletter(false);
    },
    [newsletterEmail],
  );

  return (
    <div
      className="min-h-screen bg-white dark:bg-neutral-950 pb-16"
      data-testid="home-page"
    >
      {/* ================================================================= */}
      {/* HERO — Above the fold: value prop, CTA, trust badges             */}
      {/* ================================================================= */}
      <section
        className="relative py-14 md:py-20 bg-white dark:bg-neutral-950 overflow-hidden"
        data-testid="hero"
      >
        <div className="executive-container">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left: Copy + CTA */}
            <div className="max-w-xl">
              {/* Trust chip */}
              <div className="inline-flex items-center gap-2 border border-neutral-300 dark:border-neutral-600 px-3 py-1 text-xs font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-widest bg-white/90 dark:bg-neutral-950/90 rounded mb-4">
                <Shield className="w-3.5 h-3.5 text-accent" />
                NYC Licensed &middot; Est. 2018
              </div>

              {/* Headline — PAS: Problem acknowledged */}
              <h1 className="text-3xl md:text-5xl font-display text-neutral-900 dark:text-neutral-100 leading-[1.1] mb-4">
                Stop Losing Money on{" "}
                <span className="text-accent">NYC Real Estate.</span>
              </h1>

              {/* Sub-head — PAS: Agitate + Solve */}
              <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
                The market moves fast and most buyers overpay. Bravado combines
                institutional-grade data with boots-on-the-ground tenacity to
                find, negotiate, and close deals others miss — saving our
                clients an average of <strong>$73K per transaction</strong>.
              </p>

              {/* Primary CTA */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <Link href="/properties" onClick={scrollToTop}>
                  <Button
                    size="lg"
                    className="executive-button executive-button-primary w-full sm:w-auto text-base px-8 py-6"
                    data-testid="hero-cta-primary"
                  >
                    Browse Properties
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <a href="tel:+12125551234">
                  <Button
                    size="lg"
                    variant="outline"
                    className="executive-button executive-button-ghost w-full sm:w-auto text-base px-8 py-6"
                    data-testid="hero-cta-secondary"
                  >
                    <Phone className="mr-2 w-5 h-5" />
                    (212) 555-1234
                  </Button>
                </a>
              </div>

              {/* Trust badges — always visible above fold */}
              <div className="grid grid-cols-3 gap-4 py-4 border-y border-neutral-200 dark:border-neutral-700">
                <div className="text-center">
                  <div className="text-xl md:text-2xl font-bold text-accent mb-0.5">
                    15+
                  </div>
                  <div className="text-[11px] text-neutral-500 uppercase tracking-wider">
                    Years Experience
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xl md:text-2xl font-bold text-accent mb-0.5">
                    $140M+
                  </div>
                  <div className="text-[11px] text-neutral-500 uppercase tracking-wider">
                    Transaction Volume
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xl md:text-2xl font-bold text-accent mb-0.5">
                    2,000+
                  </div>
                  <div className="text-[11px] text-neutral-500 uppercase tracking-wider">
                    Deals Closed
                  </div>
                </div>
              </div>

              {/* Micro social proof */}
              <div className="mt-4 flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-7 h-7 rounded-full bg-neutral-200 dark:bg-neutral-700 border-2 border-white dark:border-neutral-950 flex items-center justify-center text-[10px] font-semibold text-neutral-600 dark:text-neutral-300"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <span>
                  Trusted by <strong className="text-neutral-700 dark:text-neutral-200">2,000+</strong> New
                  Yorkers
                </span>
              </div>
            </div>

            {/* Right: Hero image */}
            <div className="hidden lg:flex items-center justify-center">
              <img
                src="/attached_assets/PHOTO-2019-02-04-15-25-38_1757990963195.jpg"
                alt="Manhattan Skyline Architecture"
                className="w-full h-auto max-w-md object-contain"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SOCIAL PROOF BAR — Stats strip right below hero                   */}
      {/* ================================================================= */}
      <section className="py-6 bg-neutral-900 dark:bg-neutral-800">
        <div className="executive-container">
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4 text-white text-sm">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-accent" />
              <span>Top 1% NYC Brokerage</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span>4.9/5 Client Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-accent" />
              <span>Avg. 14 Days to Close</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <span>$73K Avg. Client Savings</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* FEATURED PROPERTIES with urgency badges                           */}
      {/* ================================================================= */}
      <section className="py-16 md:py-24 bg-white dark:bg-neutral-950">
        <div className="executive-container">
          {/* Section header with urgency */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-2">
                Featured Listings
              </p>
              <h2 className="text-2xl md:text-4xl font-display text-neutral-900 dark:text-neutral-100">
                Properties Moving Fast
              </h2>
            </div>
            <div className="flex items-center gap-2 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 text-sm font-medium px-4 py-2 rounded-lg">
              <Zap className="w-4 h-4" />
              <span>
                Only <strong>7</strong> properties available this week
              </span>
            </div>
          </div>

          <PropertyGrid
            filters={{ featured: true }}
            limit={6}
            showTitle={false}
          />

          <div className="text-center mt-10">
            <Link href="/properties" onClick={scrollToTop}>
              <Button
                size="lg"
                className="executive-button executive-button-primary text-base px-10 py-6"
              >
                View All Properties
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* WHY BRAVADO — PAS framework with icons                            */}
      {/* ================================================================= */}
      <section className="py-16 md:py-24 bg-neutral-50 dark:bg-neutral-900">
        <div className="executive-container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-2">
              Why Bravado
            </p>
            <h2 className="text-2xl md:text-4xl font-display text-neutral-900 dark:text-neutral-100 mb-4">
              NYC Real Estate Is a Battlefield.{" "}
              <span className="text-accent">We Win It for You.</span>
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-lg">
              Most buyers rely on outdated listings and overwhelmed agents. We
              deploy institutional-grade research, off-market access, and
              relentless negotiation to tip every deal in your favor.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Eye,
                title: "Off-Market Access",
                desc: "70% of our best deals never hit public portals. Our network of developers, estate attorneys, and insiders surfaces opportunities before the competition sees them.",
              },
              {
                icon: BarChart3,
                title: "Data-Driven Pricing",
                desc: "We analyze 50+ data points per property — comp trends, cap rates, zoning changes — so you never overpay. Our clients save an average of $73K.",
              },
              {
                icon: Target,
                title: "Precision Negotiation",
                desc: "Our agents close 2,000+ deals and know every tactic. We get below-ask pricing 83% of the time on buy-side transactions.",
              },
              {
                icon: Clock,
                title: "14-Day Average Close",
                desc: "Speed wins in NYC. Our pre-vetted lender network and streamlined process means you close faster — before competing offers stack up.",
              },
              {
                icon: Shield,
                title: "Full Legal Protection",
                desc: "Every transaction is reviewed by our in-house counsel team. Zero client lawsuits in 15+ years of operation.",
              },
              {
                icon: Users,
                title: "Dedicated Agent Team",
                desc: "You are not passed off to a junior. Every client gets a senior agent backed by analysts, a transaction coordinator, and 24/7 access.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="executive-card p-8 flex flex-col"
              >
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-5">
                  <item.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-display font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed flex-1">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* ANIMATED STATS — Scroll-triggered counters (framer-motion)        */}
      {/* ================================================================= */}
      <section className="py-16 md:py-20 bg-neutral-900 dark:bg-neutral-800">
        <div className="executive-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {[
              { target: 47, prefix: "$", suffix: "M", label: "Largest Single Deal" },
              { target: 150, prefix: "", suffix: "K", label: "SQFT Leased" },
              { target: 94, prefix: "", suffix: "%", label: "Pre-Sale Rate" },
              { target: 2000, prefix: "", suffix: "+", label: "Deals Closed" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl md:text-5xl font-bold text-accent mb-2">
                  <AnimatedCounter
                    target={stat.target}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    duration={2}
                  />
                </div>
                <div className="text-sm text-neutral-400 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* TESTIMONIALS — Grid with star ratings                             */}
      {/* ================================================================= */}
      <section className="py-16 md:py-24 bg-white dark:bg-neutral-950">
        <div className="executive-container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-2">
              Client Results
            </p>
            <h2 className="text-2xl md:text-4xl font-display text-neutral-900 dark:text-neutral-100 mb-4">
              Real Stories. Real Savings.
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400">
              Do not take our word for it — hear from New Yorkers who trusted
              Bravado with one of the biggest financial decisions of their lives.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="executive-card p-8"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm">
                      {t.name}
                    </div>
                    <div className="text-xs text-neutral-500">
                      {t.role} &middot; {t.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* DUAL CTA — Browse Properties vs Talk to an Agent                  */}
      {/* ================================================================= */}
      <section className="py-16 md:py-24 bg-neutral-50 dark:bg-neutral-900">
        <div className="executive-container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-4xl font-display text-neutral-900 dark:text-neutral-100 mb-4">
              Ready to Make Your Move?
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400">
              Whether you are browsing or ready to buy, we are here to help you
              navigate New York real estate with confidence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* CTA 1 — Browse */}
            <div className="executive-card p-10 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                <Building className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-display font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                Browse Properties
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6 flex-1">
                Explore curated residential and commercial listings across all
                five boroughs. Filter by price, neighborhood, and property type.
              </p>
              <Link href="/properties" onClick={scrollToTop} className="w-full">
                <Button
                  size="lg"
                  className="executive-button executive-button-primary w-full py-6"
                >
                  Search Listings
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>

            {/* CTA 2 — Talk to Agent */}
            <div className="executive-card p-10 text-center flex flex-col items-center border-2 border-accent/20">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                <Phone className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-display font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                Talk to an Agent
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6 flex-1">
                Get a free, no-obligation consultation with a senior Bravado
                agent. We will discuss your goals, timeline, and strategy.
              </p>
              <a href="tel:+12125551234" className="w-full">
                <Button
                  size="lg"
                  className="executive-button executive-button-ghost w-full py-6 border-2 border-accent text-accent hover:bg-accent hover:text-white"
                >
                  <Phone className="mr-2 w-5 h-5" />
                  Schedule Consultation
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* NEWSLETTER / EMAIL CAPTURE                                       */}
      {/* ================================================================= */}
      <section className="py-16 bg-accent dark:bg-accent" aria-label="Newsletter signup">
        <div className="executive-container">
          <div className="max-w-2xl mx-auto text-center text-white">
            <Mail className="w-10 h-10 mx-auto mb-4 opacity-80" />
            <h2 className="text-2xl md:text-3xl font-display mb-3">
              Get Exclusive Market Intel
            </h2>
            <p className="text-white/80 mb-6 text-sm md:text-base">
              Join 2,000+ investors and homebuyers receiving our weekly NYC
              market report. Pre-market listings, price trend alerts, and
              neighborhood deep-dives.
            </p>
            {newsletterSubmitted ? (
              <div className="flex items-center justify-center gap-2 text-white font-semibold">
                <CheckCircle className="w-5 h-5" />
                <span>You are in! Check your inbox for confirmation.</span>
              </div>
            ) : (
              <form
                onSubmit={handleNewsletterSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
              >
                <Input
                  type="email"
                  placeholder="Enter your email"
                  required
                  aria-label="Email address for newsletter"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 flex-1 h-12"
                />
                <Button
                  type="submit"
                  size="lg"
                  className="bg-white text-accent hover:bg-white/90 font-semibold h-12 px-8"
                >
                  Subscribe Free
                </Button>
              </form>
            )}
            <p className="text-white/50 text-xs mt-3">
              No spam. Unsubscribe anytime. We respect your inbox.
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* STICKY BOTTOM BAR — Phone + Schedule CTA                          */}
      {/* ================================================================= */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] py-3 px-4"
        aria-label="Contact actions"
      >
        <div className="executive-container">
          <div className="flex items-center justify-between gap-4">
            <div className="hidden sm:flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400">
              <Phone className="w-4 h-4 text-accent" />
              <a
                href="tel:+12125551234"
                className="font-semibold text-neutral-900 dark:text-neutral-100 hover:text-accent transition-colors"
              >
                (212) 555-1234
              </a>
              <span className="text-neutral-300 dark:text-neutral-600">|</span>
              <span>Available 7 days a week</span>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a href="tel:+12125551234" className="sm:hidden flex-1">
                <Button
                  variant="outline"
                  className="w-full border-accent text-accent"
                >
                  <Phone className="mr-2 w-4 h-4" />
                  Call Now
                </Button>
              </a>
              <Link href="/about" onClick={scrollToTop} className="flex-1 sm:flex-none">
                <Button className="executive-button executive-button-primary w-full sm:w-auto px-6">
                  Schedule Consultation
                  <ChevronRight className="ml-1 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* pb-16 on the outer wrapper prevents sticky bar from covering content */}

      {/* ================================================================= */}
      {/* EXIT-INTENT NEWSLETTER POPUP                                      */}
      {/* ================================================================= */}
      {showNewsletter && !newsletterSubmitted && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="exit-intent-title"
        >
          <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-2xl max-w-md w-full p-8 relative">
            <button
              onClick={() => setShowNewsletter(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
              aria-label="Close popup"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-7 h-7 text-accent" />
              </div>
              <h3
                id="exit-intent-title"
                className="text-xl font-display font-semibold text-neutral-900 dark:text-neutral-100 mb-2"
              >
                Wait — Before You Go
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Get our free weekly NYC market report with pre-market listings
                and price alerts that have saved readers an average of $73K.
              </p>
            </div>
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col gap-3"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                required
                aria-label="Email address for market report"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="h-12"
              />
              <Button
                type="submit"
                className="executive-button executive-button-primary w-full py-6 text-base"
              >
                Get Free Market Report
              </Button>
            </form>
            <p className="text-neutral-400 text-xs text-center mt-3">
              Join 2,000+ subscribers. No spam, ever.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeV4;
