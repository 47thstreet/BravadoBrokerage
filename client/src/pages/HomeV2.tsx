import { Link } from "wouter";
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Phone,
  Mail,
  ChevronDown,
} from "lucide-react";
import PropertyGrid from "@/components/PropertyGrid";

// ---------------------------------------------------------------
// ANIMATED COUNTER HOOK
// ---------------------------------------------------------------
function useAnimatedCounter(target: number, duration = 2000, startOnView = true) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!startOnView || !inView || hasStarted.current) return;
    hasStarted.current = true;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration, startOnView]);

  return { count, ref };
}

// ---------------------------------------------------------------
// MAGNETIC HOVER HOOK
// ---------------------------------------------------------------
function useMagneticHover(strength = 0.35) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouse = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set((e.clientX - centerX) * strength);
      y.set((e.clientY - centerY) * strength);
    },
    [strength, x, y]
  );

  const handleLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return { ref, springX, springY, handleMouse, handleLeave };
}

// ---------------------------------------------------------------
// SECTION REVEAL WRAPPER
// ---------------------------------------------------------------
const RevealSection = ({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    viewport={{ once: true, margin: "-80px" }}
  >
    {children}
  </motion.div>
);

// ---------------------------------------------------------------
// STAGGER CHILDREN
// ---------------------------------------------------------------
const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

// ---------------------------------------------------------------
// NYC IMAGERY
// ---------------------------------------------------------------
const HERO_BG =
  "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=85";
const SECONDARY_IMG =
  "https://images.unsplash.com/photo-1534430480872-3498386e7856?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80";
const DETAIL_IMG =
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";

// ---------------------------------------------------------------
// MAIN COMPONENT
// ---------------------------------------------------------------
const HomeV2 = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const scrollToContent = () => {
    document.getElementById("featured-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => window.scrollTo(0, 0);

  // Stats counters
  const yearsCounter = useAnimatedCounter(15, 2000);
  const volumeCounter = useAnimatedCounter(140, 2200);
  const dealsCounter = useAnimatedCounter(2000, 2400);
  const sqftCounter = useAnimatedCounter(150, 2000);

  // Magnetic CTA
  const magnetic = useMagneticHover(0.25);

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 overflow-x-hidden" data-testid="home-page">

      {/* ============================================================
          HERO - CINEMATIC FULL-BLEED WITH PARALLAX
          ============================================================ */}
      <section ref={heroRef} className="relative h-screen min-h-[700px] overflow-hidden" data-testid="hero">
        {/* Parallax Background */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: heroY, scale: heroScale }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${HERO_BG})` }}
            role="img"
            aria-label="Aerial view of New York City skyline"
          />
          {/* Cinematic gradient overlay - diagonal sweep */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/50 to-transparent" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(160deg, hsl(0 100% 40% / 0.25) 0%, transparent 50%, hsl(352 60% 28% / 0.15) 100%)",
            }}
          />
          {/* Noise texture overlay */}
          <div
            className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />
        </motion.div>

        {/* Hero Content */}
        <motion.div
          className="relative z-10 h-full flex flex-col justify-end pb-16 md:pb-24"
          style={{ opacity: heroOpacity }}
        >
          <div className="executive-container">
            {/* Overline badge */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mb-6"
            >
              <span
                className="inline-block px-4 py-1.5 text-xs tracking-[0.3em] uppercase border border-white/30 text-white/80 backdrop-blur-sm font-body"
              >
                Est. 2018 &mdash; New York City
              </span>
            </motion.div>

            {/* Main headline - overlapping, editorial layout */}
            <div className="relative max-w-5xl">
              <motion.h1
                className="text-display-xl text-white leading-[0.85] tracking-[-0.04em] font-display"
                initial={{ opacity: 0, y: 80, clipPath: "inset(100% 0 0 0)" }}
                animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
                transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                Built on
                <br />
                <span className="italic text-accent">
                  Trust.
                </span>
              </motion.h1>

              <motion.h2
                className="text-display-md text-white/70 mt-2 md:mt-4 md:ml-[15%] font-display"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                Strengthened by{" "}
                <span className="text-white font-medium">Expertise.</span>
              </motion.h2>
            </div>

            {/* Subtext - offset to the right for asymmetry */}
            <motion.p
              className="max-w-lg text-white/60 text-base md:text-lg mt-8 md:ml-[5%] leading-relaxed font-body"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              Data and technology backed by tenacity and trust. Institutional
              discipline applied to New York's most complex real estate challenges.
            </motion.p>

            {/* CTA row */}
            <motion.div
              className="flex flex-wrap items-center gap-4 mt-10 md:ml-[5%]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href="/about" onClick={scrollToTop}>
                <motion.div
                  ref={magnetic.ref}
                  style={{ x: magnetic.springX, y: magnetic.springY }}
                  onMouseMove={magnetic.handleMouse}
                  onMouseLeave={magnetic.handleLeave}
                >
                  <Button
                    size="lg"
                    className="relative overflow-hidden bg-accent hover:bg-accent/90 text-white px-8 py-6 text-sm tracking-[0.15em] uppercase rounded-none border-0 group font-body"
                    data-testid="hero-cta-primary"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      Learn More
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-white/10"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                  </Button>
                </motion.div>
              </Link>

              <Link href="/listings" onClick={scrollToTop}>
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-white/80 hover:text-white hover:bg-white/10 px-8 py-6 text-sm tracking-[0.15em] uppercase rounded-none border border-white/20 font-body"
                >
                  View Listings
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.button
            onClick={scrollToContent}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 hover:text-white/80 transition-colors cursor-pointer"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            aria-label="Scroll to content"
          >
            <ChevronDown className="w-6 h-6" />
          </motion.button>
        </motion.div>

        {/* Side stats strip - editorial flourish */}
        <motion.div
          className="absolute top-1/2 right-6 md:right-12 -translate-y-1/2 z-10 hidden lg:flex flex-col gap-8 items-end"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          {[
            { val: "15+", label: "Years" },
            { val: "$140M+", label: "Volume" },
            { val: "2000+", label: "Deals" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-right"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 2 + i * 0.15 }}
            >
              <div
                className="text-2xl md:text-3xl font-bold text-white/90 tracking-tight font-display"
              >
                {stat.val}
              </div>
              <div
                className="text-[10px] uppercase tracking-[0.3em] text-white/40 mt-1 font-body"
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ============================================================
          STATS / CREDIBILITY - ANIMATED COUNTERS
          ============================================================ */}
      <section className="relative py-24 md:py-32 bg-neutral-950 dark:bg-neutral-950 overflow-hidden" data-testid="success-metrics">
        {/* Diagonal accent line */}
        <div
          className="absolute top-0 left-0 w-full h-[1px]"
          style={{
            background:
              "linear-gradient(90deg, transparent, hsl(0 100% 40% / 0.5), transparent)",
          }}
        />

        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="executive-container relative z-10">
          <RevealSection>
            <div
              className="text-xs tracking-[0.4em] uppercase text-accent mb-4 font-body"
            >
              Track Record
            </div>
            <h2
              className="text-display-md text-white max-w-2xl mb-16 md:mb-20 font-display"
            >
              We decode value, forecast opportunity, and{" "}
              <span className="italic text-accent">
                execute with precision.
              </span>
            </h2>
          </RevealSection>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.06] rounded-lg overflow-hidden"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            {[
              {
                counterRef: yearsCounter.ref,
                value: yearsCounter.count,
                suffix: "+",
                label: "Years Experience",
                detail: "Since 2018",
              },
              {
                counterRef: volumeCounter.ref,
                value: volumeCounter.count,
                prefix: "$",
                suffix: "M+",
                label: "Transaction Volume",
                detail: "Closed deals",
              },
              {
                counterRef: dealsCounter.ref,
                value: dealsCounter.count,
                suffix: "+",
                label: "Deals Closed",
                detail: "And counting",
              },
              {
                counterRef: sqftCounter.ref,
                value: sqftCounter.count,
                suffix: "K",
                label: "SQFT Leased",
                detail: "23% above market",
              },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                ref={stat.counterRef}
                className="bg-neutral-900/80 backdrop-blur-sm p-8 md:p-10 group hover:bg-neutral-800/60 transition-colors duration-500"
                variants={staggerItem}
              >
                <div
                  className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-3 font-display text-accent"
                >
                  {stat.prefix}
                  {stat.value.toLocaleString()}
                  {stat.suffix}
                </div>
                <div
                  className="text-white/90 text-sm font-medium mb-1 font-body"
                >
                  {stat.label}
                </div>
                <div
                  className="text-white/40 text-xs tracking-wider uppercase font-body"
                >
                  {stat.detail}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Highlight deals */}
          <motion.div
            className="grid md:grid-cols-3 gap-6 mt-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            {[
              { value: "$47M", label: "Midtown Investment", detail: "Closed 45 days early" },
              { value: "150K", label: "SQFT Leased", detail: "23% above market" },
              { value: "94%", label: "Pre-Sales", detail: "Brooklyn Heights" },
            ].map((metric) => (
              <motion.div
                key={metric.label}
                className="relative border border-white/[0.08] p-8 group hover:border-accent/30 transition-all duration-500"
                variants={staggerItem}
              >
                <div className="absolute top-0 left-0 w-0 h-[2px] bg-accent group-hover:w-full transition-all duration-700" />
                <div
                  className="text-3xl md:text-4xl font-bold text-white mb-2 font-display"
                >
                  {metric.value}
                </div>
                <div
                  className="text-white/70 text-sm font-medium mb-1 font-body"
                >
                  {metric.label}
                </div>
                <div
                  className="text-white/40 text-xs font-body"
                >
                  {metric.detail}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          FEATURED PROPERTIES - ASYMMETRIC GRID
          ============================================================ */}
      <section
        id="featured-section"
        className="relative py-24 md:py-32 bg-white dark:bg-neutral-950"
      >
        {/* Diagonal accent */}
        <div
          className="absolute top-0 right-0 w-1/3 h-full opacity-[0.02] dark:opacity-[0.04]"
          style={{
            background:
              "repeating-linear-gradient(-45deg, hsl(0 100% 40%) 0, hsl(0 100% 40%) 1px, transparent 0, transparent 60px)",
          }}
        />

        <div className="executive-container relative z-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <RevealSection>
              <div
                className="text-xs tracking-[0.4em] uppercase text-accent mb-4 font-body"
              >
                Portfolio
              </div>
              <h2
                className="text-display-md text-neutral-900 dark:text-white max-w-xl font-display"
              >
                Featured{" "}
                <span className="italic text-accent">
                  Properties
                </span>
              </h2>
            </RevealSection>

            <RevealSection delay={0.15}>
              <Link href="/listings" onClick={scrollToTop}>
                <span
                  className="inline-flex items-center gap-2 text-sm tracking-[0.15em] uppercase text-neutral-500 dark:text-white/50 hover:text-accent transition-colors group cursor-pointer font-body"
                >
                  View All
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </Link>
            </RevealSection>
          </div>

          <RevealSection delay={0.2}>
            <PropertyGrid filters={{ featured: true }} limit={6} showTitle={false} />
          </RevealSection>
        </div>
      </section>

      {/* ============================================================
          EDITORIAL SPLIT - BRAND STORY
          ============================================================ */}
      <section className="relative overflow-hidden">
        <div className="grid lg:grid-cols-2 min-h-[600px]">
          {/* Image side */}
          <RevealSection className="relative overflow-hidden">
            <motion.div
              className="absolute inset-0"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src="/attached_assets/PHOTO-2019-02-04-15-25-38_1757990963195.jpg"
                alt="Manhattan skyline at dusk"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent lg:bg-gradient-to-l lg:from-transparent lg:to-black/20" />
            </motion.div>

            {/* Floating label */}
            <motion.div
              className="absolute bottom-8 left-8 md:bottom-12 md:left-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div
                className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs tracking-[0.2em] uppercase font-body"
              >
                <MapPin className="w-3 h-3 inline mr-2" aria-hidden="true" />
                Manhattan, NYC
              </div>
            </motion.div>
          </RevealSection>

          {/* Content side */}
          <div className="bg-neutral-950 flex items-center p-6 sm:p-10 md:p-16 lg:p-20">
            <RevealSection delay={0.2}>
              <div
                className="text-xs tracking-[0.4em] uppercase text-accent mb-6 font-body"
              >
                Our Approach
              </div>
              <h2
                className="text-display-md text-white leading-tight mb-8 font-display"
              >
                Institutional discipline.{" "}
                <span className="italic block text-accent">
                  Entrepreneurial drive.
                </span>
              </h2>
              <p
                className="text-white/50 text-base md:text-lg leading-relaxed mb-8 max-w-md font-body"
              >
                We decode value, forecast opportunity, and execute with precision.
                Data and technology backed by tenacity and trust -- applied to New
                York's most complex real estate challenges.
              </p>

              <div className="flex flex-col gap-4 mb-10">
                {[
                  "Advisory & brokerage for acquisitions and dispositions",
                  "Commercial leasing across all NYC boroughs",
                  "Development consulting and market analysis",
                  "Institutional-grade due diligence",
                ].map((item, i) => (
                  <motion.div
                    key={item}
                    className="flex items-start gap-3 text-white/60 text-sm font-body"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>

              <Link href="/services" onClick={scrollToTop}>
                <Button
                  variant="ghost"
                  className="text-white/70 hover:text-white hover:bg-white/5 px-0 text-sm tracking-[0.15em] uppercase rounded-none border-b border-white/20 hover:border-white/50 transition-all group font-body"
                >
                  Our Services
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ============================================================
          AGENT SPOTLIGHT - CREATIVE CARDS
          ============================================================ */}
      <section className="relative py-24 md:py-32 bg-white dark:bg-neutral-950 overflow-hidden">
        {/* Background accent */}
        <div
          className="absolute top-0 left-0 w-1/2 h-full opacity-[0.015] dark:opacity-[0.03]"
          style={{
            background: "radial-gradient(ellipse at 30% 50%, hsl(0 100% 40%), transparent 70%)",
          }}
        />

        <div className="executive-container relative z-10">
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-16 items-start">
            {/* Left column - header */}
            <RevealSection className="lg:sticky lg:top-32">
              <div
                className="text-xs tracking-[0.4em] uppercase text-accent mb-4 font-body"
              >
                The Team
              </div>
              <h2
                className="text-display-md text-neutral-900 dark:text-white mb-6 font-display"
              >
                Meet our{" "}
                <span className="italic text-accent">
                  agents.
                </span>
              </h2>
              <p
                className="text-neutral-500 dark:text-white/50 text-base leading-relaxed mb-8 max-w-sm font-body"
              >
                Our team brings decades of combined experience navigating New York
                City's most competitive real estate markets.
              </p>
              <Link href="/agents" onClick={scrollToTop}>
                <Button
                  variant="ghost"
                  className="text-neutral-600 dark:text-white/60 hover:text-accent px-0 text-sm tracking-[0.15em] uppercase rounded-none border-b border-neutral-300 dark:border-white/20 hover:border-accent transition-all group font-body"
                >
                  View All Agents
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </RevealSection>

            {/* Right column - agent cards grid with creative layout */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
            >
              {[
                {
                  name: "Oluwatobi Bello",
                  title: "Founder & Principal Broker",
                  speciality: "Commercial & Investment Sales",
                  image: SECONDARY_IMG,
                },
                {
                  name: "Expert Agent",
                  title: "Senior Associate",
                  speciality: "Residential & Luxury Leasing",
                  image: DETAIL_IMG,
                },
              ].map((agent, i) => (
                <motion.div
                  key={agent.name}
                  className={`group relative overflow-hidden ${i === 0 ? "sm:row-span-2" : ""}`}
                  variants={staggerItem}
                >
                  <div
                    className={`relative overflow-hidden ${i === 0 ? "aspect-[3/4]" : "aspect-square"}`}
                  >
                    <img
                      src={agent.image}
                      alt={`${agent.name}, ${agent.title}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* Hover reveal overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

                    {/* Content - slides up on hover */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <div
                        className="text-xs tracking-[0.3em] uppercase mb-2 text-accent font-body"
                      >
                        {agent.speciality}
                      </div>
                      <h3
                        className="text-xl md:text-2xl text-white font-medium mb-1 font-display"
                      >
                        {agent.name}
                      </h3>
                      <p
                        className="text-white/60 text-sm font-body"
                      >
                        {agent.title}
                      </p>

                      {/* Contact icons - appear on hover */}
                      <div className="flex gap-3 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        <button
                          className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-all"
                          aria-label={`Email ${agent.name}`}
                        >
                          <Mail className="w-4 h-4" />
                        </button>
                        <button
                          className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-all"
                          aria-label={`Call ${agent.name}`}
                        >
                          <Phone className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================
          MARKET TICKER - HORIZONTAL SCROLL MARQUEE
          ============================================================ */}
      <section
        className="relative py-6 bg-neutral-100 dark:bg-neutral-900 overflow-hidden border-y border-neutral-200 dark:border-neutral-800"
        aria-label="Service areas and capabilities"
      >
        <motion.div
          className="flex whitespace-nowrap gap-16"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(2)].map((_, setIdx) => (
            <div key={setIdx} className="flex gap-16 items-center">
              {[
                "Manhattan",
                "Brooklyn",
                "Queens",
                "Bronx",
                "Staten Island",
                "Commercial",
                "Residential",
                "Investment",
                "Development",
                "Advisory",
              ].map((text, i) => (
                <span
                  key={`${setIdx}-${text}-${i}`}
                  className="text-sm tracking-[0.3em] uppercase text-neutral-400 dark:text-neutral-600 flex items-center gap-4 font-body"
                >
                  {text}
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-accent"
                    aria-hidden="true"
                  />
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </section>

      {/* ============================================================
          CTA SECTION - VISUALLY STRIKING
          ============================================================ */}
      <section className="relative py-32 md:py-44 overflow-hidden">
        {/* Dark background with brand gradient */}
        <div className="absolute inset-0 bg-neutral-950" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 70% 50%, hsl(0 100% 40% / 0.12), transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 20% 80%, hsl(352 60% 28% / 0.08), transparent 50%)",
          }}
        />

        {/* Decorative grid lines */}
        <div className="absolute inset-0 opacity-[0.04]">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        {/* Large decorative text behind */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-bold text-white/[0.02] select-none pointer-events-none whitespace-nowrap font-display"
          aria-hidden="true"
        >
          BRAVADO
        </div>

        <div className="executive-container relative z-10 text-center">
          <RevealSection>
            <div
              className="text-xs tracking-[0.4em] uppercase text-accent mb-6 font-body"
            >
              Start Your Journey
            </div>

            <h2
              className="text-display-lg text-white max-w-3xl mx-auto mb-8 font-display"
            >
              Ready to make your{" "}
              <span className="italic text-accent">
                next move?
              </span>
            </h2>

            <p
              className="text-white/50 text-base md:text-lg max-w-xl mx-auto mb-12 leading-relaxed font-body"
            >
              Whether buying, selling, or leasing -- our team is ready to deliver
              results that exceed expectations.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" onClick={scrollToTop}>
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-white px-10 py-6 text-sm tracking-[0.15em] uppercase rounded-none border-0 font-body"
                >
                  Contact Us
                  <ArrowRight className="w-4 h-4 ml-3" />
                </Button>
              </Link>

              <Link href="/apply" onClick={scrollToTop}>
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-white/60 hover:text-white hover:bg-white/5 px-10 py-6 text-sm tracking-[0.15em] uppercase rounded-none border border-white/15 hover:border-white/30 font-body"
                >
                  Join Our Team
                </Button>
              </Link>
            </div>
          </RevealSection>
        </div>
      </section>
    </div>
  );
};

export default HomeV2;
