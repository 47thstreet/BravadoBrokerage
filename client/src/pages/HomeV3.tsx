import { Link } from "wouter";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Users,
  Mail,
  ChevronRight,
  Shield,
  Briefcase,
  LineChart,
} from "lucide-react";
import PropertyGrid from "@/components/PropertyGrid";

/* ---------------------------------------------------------------------------
   DATA
   --------------------------------------------------------------------------- */

const HERO_IMAGE =
  "/attached_assets/PHOTO-2019-02-04-15-25-38_1757990963195.jpg";

const STATS = [
  { value: "15+", label: "Years Experience", icon: Clock },
  { value: "$140M+", label: "Transaction Volume", icon: DollarSign },
  { value: "2,000+", label: "Deals Closed", icon: Target },
  { value: "98%", label: "Client Satisfaction", icon: Star },
];

const BENTO_SERVICES = [
  {
    title: "Investment Sales",
    description:
      "Institutional discipline applied to New York's most complex commercial transactions. We decode value and execute with precision.",
    icon: TrendingUp,
    span: "col-span-1 md:col-span-2 row-span-1",
    accent: true,
  },
  {
    title: "Residential Brokerage",
    description:
      "Curated residential experiences across Manhattan, Brooklyn, and beyond.",
    icon: HomeIcon,
    span: "col-span-1 row-span-1",
    accent: false,
  },
  {
    title: "Market Intelligence",
    description:
      "Data-driven insights that forecast opportunity before the market catches on.",
    icon: BarChart3,
    span: "col-span-1 row-span-1",
    accent: false,
  },
  {
    title: "Commercial Leasing",
    description:
      "Strategic lease negotiations and tenant representation for premier commercial spaces in NYC.",
    icon: Building,
    span: "col-span-1 row-span-1",
    accent: false,
  },
  {
    title: "Portfolio Advisory",
    description:
      "Comprehensive portfolio analysis and strategic repositioning for institutional and private investors.",
    icon: Briefcase,
    span: "col-span-1 md:col-span-2 row-span-1",
    accent: true,
  },
];

const SUCCESS_METRICS = [
  { value: "$47M", label: "Midtown Investment", detail: "Closed 45 days early" },
  { value: "150K", label: "SQFT Leased", detail: "23% above market" },
  { value: "94%", label: "Pre-Sales", detail: "Brooklyn Heights" },
];

const TESTIMONIALS = [
  {
    name: "Michael Chen",
    title: "Managing Director, Apex Capital",
    quote:
      "Bravado's market intelligence gave us an edge no other brokerage could. Their analysis of the Midtown corridor was spot-on, and execution was flawless.",
    avatar: "MC",
    rating: 5,
  },
  {
    name: "Sarah Williams",
    title: "VP Acquisitions, Sterling REIT",
    quote:
      "The team's institutional approach to our Brooklyn portfolio repositioning resulted in a 23% increase over projected returns. Truly exceptional work.",
    avatar: "SW",
    rating: 5,
  },
  {
    name: "David Park",
    title: "Private Investor",
    quote:
      "From our first conversation, I knew Bravado was different. They don't just find properties -- they build strategies. I've trusted them with every transaction since.",
    avatar: "DP",
    rating: 5,
  },
];

/* ---------------------------------------------------------------------------
   ANIMATION VARIANTS
   --------------------------------------------------------------------------- */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ---------------------------------------------------------------------------
   SECTION LABEL COMPONENT
   --------------------------------------------------------------------------- */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 mb-4">
      <span className="h-px w-8 bg-accent" aria-hidden="true" />
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent font-body">
        {children}
      </span>
      <span className="h-px w-8 bg-accent" aria-hidden="true" />
    </div>
  );
}

/* ---------------------------------------------------------------------------
   HOME V3 PAGE
   --------------------------------------------------------------------------- */

const HomeV3 = () => {
  const [email, setEmail] = useState("");

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div
      className="min-h-screen bg-white dark:bg-neutral-950"
      data-testid="home-page"
    >
      {/* ================================================================
          HERO -- Split Layout
          ================================================================ */}
      <section
        className="relative py-20 md:py-28 bg-white dark:bg-neutral-950 overflow-hidden"
        data-testid="hero"
        aria-label="Hero section"
      >
        {/* Subtle background texture */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
          aria-hidden="true"
        />

        <div className="executive-container relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left -- Typography & Content */}
            <motion.div
              className="max-w-xl"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={fadeUp} custom={0} className="mb-6">
                <div className="inline-block border border-neutral-300 dark:border-neutral-600 px-4 py-1.5 text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-[0.2em] bg-white/90 dark:bg-neutral-950/90 rounded-full">
                  Est. 2018 &middot; New York City
                </div>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                custom={1}
                className="text-display-md md:text-display-lg font-display text-neutral-900 dark:text-neutral-100 mb-6"
              >
                Built on Trust.
                <span className="block text-accent mt-1">
                  Strengthened by Expertise.
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                custom={2}
                className="text-body-lg text-neutral-600 dark:text-neutral-400 mb-8 max-w-lg"
              >
                Data and technology backed by tenacity and trust. Institutional
                discipline applied to New York's most complex real estate
                challenges. We decode value, forecast opportunity, and execute
                with precision.
              </motion.p>

              {/* Stat strip */}
              <motion.div
                variants={fadeUp}
                custom={3}
                className="grid grid-cols-3 gap-6 mb-8 py-6 border-y border-neutral-200 dark:border-neutral-800"
              >
                {[
                  { value: "15+", label: "Years" },
                  { value: "$140M+", label: "Volume" },
                  { value: "2,000+", label: "Deals" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-accent mb-1 font-display">
                      {s.value}
                    </div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-widest font-body">
                      {s.label}
                    </div>
                  </div>
                ))}
              </motion.div>

              <motion.div
                variants={fadeUp}
                custom={4}
                className="flex flex-wrap gap-4"
              >
                <Link href="/about" onClick={scrollToTop}>
                  <Button
                    size="lg"
                    className="executive-button executive-button-primary group"
                    data-testid="hero-cta-primary"
                  >
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/properties" onClick={scrollToTop}>
                  <Button
                    size="lg"
                    className="executive-button executive-button-ghost"
                    data-testid="hero-cta-secondary"
                  >
                    View Properties
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right -- Property showcase image */}
            <motion.div
              className="hidden lg:flex items-center justify-center relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 }}
            >
              {/* Decorative frame */}
              <div
                className="absolute -inset-4 border border-accent/10 rounded-2xl -rotate-2"
                aria-hidden="true"
              />
              <div
                className="absolute -inset-4 border border-accent/5 rounded-2xl rotate-1"
                aria-hidden="true"
              />

              <motion.div
                className="relative rounded-xl overflow-hidden shadow-xl"
                initial={{ clipPath: "inset(100% 0 0 0)" }}
                animate={{ clipPath: "inset(0% 0 0 0)" }}
                transition={{
                  duration: 1.4,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.5,
                }}
              >
                <img
                  src={HERO_IMAGE}
                  alt="Manhattan skyline architecture showcasing New York City real estate"
                  className="w-full h-auto max-w-lg object-contain"
                />
              </motion.div>

              {/* Floating stat badge */}
              <motion.div
                className="absolute -bottom-4 -left-6 bg-white dark:bg-neutral-900 rounded-xl p-4 shadow-lg border border-neutral-200 dark:border-neutral-800"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.6, ease: "easeOut" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                      $47M Closed
                    </div>
                    <div className="text-xs text-neutral-500">
                      45 days early
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================================================================
          STATS BAR
          ================================================================ */}
      <section
        className="py-16 bg-neutral-900 dark:bg-neutral-950 border-y border-neutral-800"
        aria-label="Key statistics"
      >
        <div className="executive-container">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
          >
            {STATS.map((stat) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  className="text-center group"
                  variants={fadeUp}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 mb-4 group-hover:bg-accent/20 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-accent" aria-hidden="true" />
                  </div>
                  <div className="text-3xl md:text-4xl font-display font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-neutral-400 tracking-wide font-body">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ================================================================
          BENTO GRID -- Services
          ================================================================ */}
      <section
        className="py-20 md:py-24 bg-white dark:bg-neutral-950"
        aria-label="Our services"
      >
        <div className="executive-container">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>What We Do</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-display-md font-display text-neutral-900 dark:text-neutral-100 mb-4"
            >
              Full-Spectrum Real Estate
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-body-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto"
            >
              From acquisitions to advisory, we bring institutional-grade
              discipline to every engagement.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
          >
            {BENTO_SERVICES.map((service) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  className={`${service.span} group relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 p-8 md:p-10 transition-all duration-300 hover:border-accent/30 hover:shadow-lg hover:-translate-y-1 ${
                    service.accent
                      ? "bg-neutral-900 dark:bg-neutral-900 text-white"
                      : "bg-white dark:bg-neutral-900/50"
                  }`}
                  variants={scaleIn}
                  role="article"
                  aria-label={service.title}
                >
                  {/* Hover gradient overlay */}
                  <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                      service.accent
                        ? "bg-gradient-to-br from-accent/20 to-transparent"
                        : "bg-gradient-to-br from-accent/5 to-transparent"
                    }`}
                    aria-hidden="true"
                  />

                  <div className="relative">
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-6 transition-colors duration-300 ${
                        service.accent
                          ? "bg-accent/20 group-hover:bg-accent/30"
                          : "bg-neutral-100 dark:bg-neutral-800 group-hover:bg-accent/10"
                      }`}
                    >
                      <Icon
                        className={`w-6 h-6 ${
                          service.accent
                            ? "text-accent"
                            : "text-neutral-700 dark:text-neutral-300 group-hover:text-accent"
                        } transition-colors duration-300`}
                        aria-hidden="true"
                      />
                    </div>

                    <h3
                      className={`text-xl font-display font-semibold mb-3 ${
                        service.accent
                          ? "text-white"
                          : "text-neutral-900 dark:text-neutral-100"
                      }`}
                    >
                      {service.title}
                    </h3>

                    <p
                      className={`text-sm leading-relaxed ${
                        service.accent
                          ? "text-neutral-300"
                          : "text-neutral-600 dark:text-neutral-400"
                      }`}
                    >
                      {service.description}
                    </p>

                    <div
                      className={`mt-6 inline-flex items-center text-sm font-medium gap-1 transition-all duration-300 group-hover:gap-2 ${
                        service.accent
                          ? "text-accent"
                          : "text-accent"
                      }`}
                    >
                      Learn more
                      <ChevronRight className="w-4 h-4" aria-hidden="true" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ================================================================
          SUCCESS METRICS
          ================================================================ */}
      <section
        className="py-20 md:py-24 bg-neutral-50 dark:bg-neutral-900/50"
        data-testid="success-metrics"
        aria-label="Success metrics"
      >
        <div className="executive-container">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>Track Record</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-display-md font-display text-neutral-900 dark:text-neutral-100 mb-4"
            >
              Results That Speak
            </motion.h2>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6 md:gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
          >
            {SUCCESS_METRICS.map((metric) => (
              <motion.div
                key={metric.label}
                className="executive-card p-10 text-center group"
                variants={scaleIn}
              >
                <motion.div
                  className="text-5xl md:text-6xl font-bold font-display text-accent mb-4 transition-transform duration-300 group-hover:scale-105"
                  aria-label={`${metric.value} ${metric.label}`}
                >
                  {metric.value}
                </motion.div>
                <div className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2 font-display">
                  {metric.label}
                </div>
                <div className="text-sm text-neutral-500 dark:text-neutral-400 font-body">
                  {metric.detail}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================================================================
          FEATURED PROPERTIES
          ================================================================ */}
      <section
        className="py-20 md:py-24 bg-white dark:bg-neutral-950"
        aria-label="Featured properties"
      >
        <div className="executive-container">
          <motion.div
            className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
          >
            <div>
              <motion.div variants={fadeUp}>
                <SectionLabel>Portfolio</SectionLabel>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="text-display-md font-display text-neutral-900 dark:text-neutral-100"
              >
                Featured Properties
              </motion.h2>
            </div>
            <motion.div variants={fadeUp}>
              <Link href="/properties" onClick={scrollToTop}>
                <Button className="executive-button executive-button-ghost group">
                  View All
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <PropertyGrid
              filters={{ featured: true }}
              limit={6}
              showTitle={false}
            />
          </motion.div>
        </div>
      </section>

      {/* ================================================================
          TESTIMONIALS / TRUST
          ================================================================ */}
      <section
        className="py-20 md:py-24 bg-neutral-50 dark:bg-neutral-900/50"
        aria-label="Client testimonials"
      >
        <div className="executive-container">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>Testimonials</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-display-md font-display text-neutral-900 dark:text-neutral-100 mb-4"
            >
              Trusted by Industry Leaders
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-body-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto"
            >
              Our clients trust us with their most significant real estate
              decisions.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6 md:gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
          >
            {TESTIMONIALS.map((t) => (
              <motion.div
                key={t.name}
                className="executive-card p-8 md:p-10 flex flex-col group"
                variants={scaleIn}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-accent text-accent"
                      aria-hidden="true"
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed mb-8 flex-1">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                {/* Avatar row */}
                <div className="flex items-center gap-4 pt-6 border-t border-neutral-200 dark:border-neutral-800">
                  <div
                    className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent font-semibold text-sm font-body flex-shrink-0"
                    aria-hidden="true"
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm">
                      {t.name}
                    </div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400">
                      {t.title}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Trust badges */}
          <motion.div
            className="mt-16 flex flex-wrap justify-center items-center gap-8 md:gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
          >
            {[
              { icon: Shield, label: "Licensed & Insured" },
              { icon: Award, label: "Top 1% NYC Brokers" },
              { icon: Users, label: "500+ Happy Clients" },
              { icon: LineChart, label: "Data-Driven Approach" },
            ].map((badge) => {
              const Icon = badge.icon;
              return (
                <motion.div
                  key={badge.label}
                  className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400"
                  variants={fadeUp}
                >
                  <Icon className="w-5 h-5" aria-hidden="true" />
                  <span className="text-sm font-medium font-body">
                    {badge.label}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ================================================================
          NEWSLETTER CTA -- Glassmorphism Card
          ================================================================ */}
      <section
        className="py-20 md:py-24 bg-white dark:bg-neutral-950"
        aria-label="Newsletter signup"
      >
        <div className="executive-container">
          <motion.div
            className="relative max-w-3xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={scaleIn}
          >
            {/* Glassmorphism card */}
            <div
              className="relative overflow-hidden rounded-2xl border border-neutral-200/60 dark:border-neutral-700/40 p-10 md:p-14 text-center"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 100%)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
              }}
            >
              {/* Dark mode override */}
              <div
                className="absolute inset-0 hidden dark:block rounded-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(20,20,20,0.9) 0%, rgba(10,10,10,0.7) 100%)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                }}
                aria-hidden="true"
              />

              {/* Accent glow */}
              <div
                className="absolute -top-24 -right-24 w-64 h-64 rounded-full opacity-10"
                style={{
                  background:
                    "radial-gradient(circle, hsl(352, 60%, 28%) 0%, transparent 70%)",
                }}
                aria-hidden="true"
              />
              <div
                className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full opacity-10"
                style={{
                  background:
                    "radial-gradient(circle, hsl(0, 100%, 40%) 0%, transparent 70%)",
                }}
                aria-hidden="true"
              />

              <div className="relative">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 mb-6">
                  <Mail
                    className="w-6 h-6 text-accent"
                    aria-hidden="true"
                  />
                </div>

                <h2 className="text-2xl md:text-3xl font-display text-neutral-900 dark:text-neutral-100 mb-3">
                  Stay Updated with Market Insights
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-8 max-w-lg mx-auto font-body">
                  Get notified about new listings, market reports, and exclusive
                  investment opportunities in New York City.
                </p>

                <form
                  className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                  onSubmit={(e) => {
                    e.preventDefault();
                    /* Delegates to the subscription page for full form */
                    window.location.href = "/contact";
                  }}
                  aria-label="Newsletter signup form"
                >
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 h-12 bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                    aria-label="Email address"
                  />
                  <Button
                    type="submit"
                    className="executive-button executive-button-primary h-12 px-8 rounded-lg group"
                  >
                    Subscribe
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </form>

                <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-4 font-body">
                  No spam. Unsubscribe anytime. We respect your privacy.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================================================================
          FINAL CTA STRIP
          ================================================================ */}
      <section
        className="py-20 md:py-24 bg-neutral-900 dark:bg-neutral-950 border-t border-neutral-800"
        aria-label="Call to action"
      >
        <div className="executive-container">
          <motion.div
            className="text-center max-w-2xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeUp}
              className="text-display-md font-display text-white mb-4"
            >
              Ready to Make Your Move?
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-body-lg text-neutral-400 mb-8"
            >
              Whether you are buying, selling, or investing, our team is ready
              to deliver exceptional results.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link href="/contact" onClick={scrollToTop}>
                <Button
                  size="lg"
                  className="executive-button executive-button-primary group"
                >
                  Get in Touch
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/properties" onClick={scrollToTop}>
                <Button
                  size="lg"
                  className="executive-button bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-colors duration-300"
                >
                  Browse Properties
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomeV3;
