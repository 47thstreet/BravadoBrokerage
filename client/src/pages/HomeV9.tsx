import { Link } from "wouter";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  ArrowUpRight,
  Building,
  MapPin,
  Phone,
  Mail,
  ChevronDown,
  ChevronRight,
  Award,
  Star,
  Clock,
  TrendingUp,
  Shield,
  Users,
  Eye,
  BarChart3,
  Target,
  Zap,
  X,
  CheckCircle,
} from "lucide-react";
import PropertyGrid from "@/components/PropertyGrid";

// ---------------------------------------------------------------
// PIPE CONSTANT (Skill 4 - Brand Layer)
// ---------------------------------------------------------------
const PIPE_RED = "hsl(0, 100%, 45%)";
const PIPE_RED_LIGHT = "hsl(0, 100%, 65%)";
const PIPE_RED_HOVER = "hsl(0, 100%, 38%)";

// ---------------------------------------------------------------
// PIPE COMPONENT - structural grammar element (Skill 4)
// ---------------------------------------------------------------
const Pipe = ({
  height = "100%",
  width = "3px",
  className = "",
  orientation = "vertical",
  animated = false,
}: {
  height?: string;
  width?: string;
  className?: string;
  orientation?: "vertical" | "horizontal";
  animated?: boolean;
}) => {
  const style =
    orientation === "vertical"
      ? { width, height, background: PIPE_RED }
      : { height: width, width: height, background: PIPE_RED };

  if (animated) {
    return (
      <motion.div
        className={`flex-shrink-0 ${className}`}
        style={style}
        initial={{ scaleY: orientation === "vertical" ? 0 : 1, scaleX: orientation === "horizontal" ? 0 : 1 }}
        whileInView={{ scaleY: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />
    );
  }

  return <div className={`flex-shrink-0 ${className}`} style={style} />;
};

// ---------------------------------------------------------------
// CORNER PIPE ACCENT (Skill 4 - Brand Layer)
// ---------------------------------------------------------------
const CornerPipes = ({ className = "" }: { className?: string }) => (
  <div className={`absolute inset-0 pointer-events-none ${className}`}>
    {/* Top-left corner */}
    <div className="absolute top-0 left-0">
      <div style={{ width: "3px", height: "24px", background: PIPE_RED }} />
      <div style={{ width: "24px", height: "3px", background: PIPE_RED, marginTop: "-3px" }} />
    </div>
    {/* Bottom-right corner */}
    <div className="absolute bottom-0 right-0">
      <div style={{ width: "3px", height: "24px", background: PIPE_RED, marginLeft: "auto" }} />
      <div style={{ width: "24px", height: "3px", background: PIPE_RED, marginLeft: "auto", marginTop: "-3px" }} />
    </div>
  </div>
);

// ---------------------------------------------------------------
// ANIMATED COUNTER HOOK
// ---------------------------------------------------------------
function useAnimatedCounter(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!inView || hasStarted.current) return;
    hasStarted.current = true;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration]);

  return { count, ref };
}

// ---------------------------------------------------------------
// MAGNETIC HOVER HOOK (Skill 3 - Aesthetic Layer)
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
    [strength, x, y],
  );

  const handleLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return { ref, springX, springY, handleMouse, handleLeave };
}

// ---------------------------------------------------------------
// SECTION REVEAL WRAPPER (Skill 3 - stagger reveals)
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
// STAGGER ANIMATION VARIANTS (Skill 3 - strong motion)
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
// PARALLAX TEXT REVEAL (Skill 3 - wow moment)
// ---------------------------------------------------------------
const ParallaxText = ({
  children,
  className = "",
  offset = 40,
}: {
  children: React.ReactNode;
  className?: string;
  offset?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};

// ---------------------------------------------------------------
// HERO IMAGERY
// ---------------------------------------------------------------
const HERO_BG =
  "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=85";

// ---------------------------------------------------------------
// NOISE TEXTURE SVG
// ---------------------------------------------------------------
const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

// ---------------------------------------------------------------
// TESTIMONIAL DATA
// ---------------------------------------------------------------
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

// ---------------------------------------------------------------
// BENTO GRID SERVICES DATA (Skill 2 - UI/UX System Layer)
// ---------------------------------------------------------------
const SERVICES = [
  {
    icon: Eye,
    title: "Off-Market Access",
    desc: "70% of our best deals never hit public portals. Our network surfaces opportunities before the competition sees them.",
    span: "md:col-span-2 md:row-span-1",
    featured: true,
  },
  {
    icon: BarChart3,
    title: "Data-Driven Pricing",
    desc: "We analyze 50+ data points per property so you never overpay. Clients save an average of $73K.",
    span: "md:col-span-1 md:row-span-1",
    featured: false,
  },
  {
    icon: Target,
    title: "Precision Negotiation",
    desc: "Below-ask pricing 83% of the time on buy-side transactions.",
    span: "md:col-span-1 md:row-span-1",
    featured: false,
  },
  {
    icon: Clock,
    title: "14-Day Average Close",
    desc: "Pre-vetted lender network and streamlined process means you close faster.",
    span: "md:col-span-1 md:row-span-1",
    featured: false,
  },
  {
    icon: Shield,
    title: "Full Legal Protection",
    desc: "Every transaction reviewed by in-house counsel. Zero client lawsuits in 15+ years.",
    span: "md:col-span-1 md:row-span-1",
    featured: false,
  },
  {
    icon: Users,
    title: "Dedicated Agent Team",
    desc: "A senior agent backed by analysts, a transaction coordinator, and 24/7 access.",
    span: "md:col-span-2 md:row-span-1",
    featured: true,
  },
];

// ---------------------------------------------------------------
// MAIN COMPONENT
// ---------------------------------------------------------------
const HomeV9 = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const scrollToContent = () => {
    document
      .getElementById("social-proof-bar")
      ?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToTop = () => window.scrollTo(0, 0);

  // Animated counters
  const yearsCounter = useAnimatedCounter(15, 2000);
  const volumeCounter = useAnimatedCounter(140, 2200);
  const dealsCounter = useAnimatedCounter(2000, 2400);
  const sqftCounter = useAnimatedCounter(150, 2000);

  // Magnetic CTAs (Skill 3)
  const magnetic = useMagneticHover(0.25);
  const magneticSecondary = useMagneticHover(0.15);

  // Exit-intent newsletter popup (Skill 1 - conversion)
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const exitIntentFired = useRef(false);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (e.clientY < 10 && !exitIntentFired.current && !newsletterSubmitted) {
        exitIntentFired.current = true;
        setShowNewsletter(true);
      }
    };
    document.addEventListener("mouseleave", handler);
    return () => document.removeEventListener("mouseleave", handler);
  }, [newsletterSubmitted]);

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
      className="min-h-screen bg-neutral-950 overflow-x-hidden"
      data-testid="home-page"
    >
      {/* ================================================================
          1. CINEMATIC PARALLAX HERO
          Skill 1: Clear value prop + primary CTA + trust signals above fold
          Skill 2: 8pt grid, proper ARIA labels, focus states
          Skill 3: Parallax, stagger reveals, clip-path animation, noise grain
          Skill 4: Pipe in typography "Trust | Expertise"
          ================================================================ */}
      <section
        ref={heroRef}
        className="relative h-screen min-h-[700px] overflow-hidden"
        data-testid="hero"
        aria-label="Hero section - Bravado Real Estate Brokerage"
      >
        {/* Parallax background with noise grain (Skill 3) */}
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
          <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/55 to-transparent" />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(160deg, ${PIPE_RED}40 0%, transparent 50%, hsl(352 60% 28% / 0.15) 100%)`,
            }}
          />
          {/* Noise texture (Skill 3 - rich backgrounds) */}
          <div
            className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
            style={{ backgroundImage: NOISE_SVG }}
          />
        </motion.div>

        {/* Hero content - F-pattern layout (Skill 1) */}
        <motion.div
          className="relative z-10 h-full flex flex-col justify-end pb-16 md:pb-24"
          style={{ opacity: heroOpacity }}
        >
          <div className="executive-container">
            {/* Overline badge with pipe accent (Skill 4) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mb-8"
            >
              <span className="inline-flex items-center gap-3 px-5 py-2 text-xs tracking-[0.3em] uppercase border border-white/20 text-white/80 backdrop-blur-sm font-body">
                <Pipe height="14px" width="3px" />
                <Shield className="w-3.5 h-3.5" />
                NYC Licensed &mdash; Est. 2018
              </span>
            </motion.div>

            {/* Headline with PIPE as structural grammar (Skill 4) */}
            <div className="relative max-w-5xl">
              <motion.h1
                className="text-display-xl text-white leading-[0.85] tracking-[-0.04em] font-display"
                initial={{ opacity: 0, y: 80, clipPath: "inset(100% 0 0 0)" }}
                animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
                transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                Built on
                <br />
                <span className="inline-flex items-baseline gap-4 md:gap-6">
                  <span className="italic" style={{ color: PIPE_RED_LIGHT }}>
                    Trust
                  </span>
                  {/* THE PIPE - structural separator (Skill 4) */}
                  <motion.span
                    className="inline-block w-[4px] md:w-[5px] self-stretch"
                    style={{
                      background: PIPE_RED,
                      minHeight: "clamp(2.5rem, 6vw, 5.5rem)",
                    }}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.8, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <span className="text-white/60">Expertise</span>
                </span>
              </motion.h1>
            </div>

            {/* Subtext - PAS: Agitate the problem (Skill 1) */}
            <motion.p
              className="max-w-lg text-white/60 text-lg md:text-xl mt-8 md:ml-[5%] leading-relaxed font-body"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              NYC real estate is brutal. Most buyers lose deals to faster, better-connected players.
              We deploy institutional-grade research and off-market access to tip every deal in your favor
              {" "}&mdash;{" "}saving clients an average of{" "}
              <strong className="text-white">$73K per transaction</strong>.
            </motion.p>

            {/* CTA row with magnetic hover (Skill 3) */}
            <motion.div
              className="flex flex-wrap items-center gap-4 mt-10 md:ml-[5%]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href="/properties" onClick={scrollToTop}>
                <motion.div
                  ref={magnetic.ref}
                  style={{ x: magnetic.springX, y: magnetic.springY }}
                  onMouseMove={magnetic.handleMouse}
                  onMouseLeave={magnetic.handleLeave}
                >
                  <Button
                    size="lg"
                    className="relative overflow-hidden bg-[hsl(0,100%,45%)] hover:bg-[hsl(0,100%,38%)] text-white px-10 py-7 text-sm tracking-[0.15em] uppercase rounded-none border-0 group font-body focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-neutral-950"
                    data-testid="hero-cta-primary"
                    aria-label="Browse available properties"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      Browse Properties
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

              <a href="tel:+12125551234">
                <motion.div
                  ref={magneticSecondary.ref}
                  style={{ x: magneticSecondary.springX, y: magneticSecondary.springY }}
                  onMouseMove={magneticSecondary.handleMouse}
                  onMouseLeave={magneticSecondary.handleLeave}
                >
                  <Button
                    variant="ghost"
                    size="lg"
                    className="text-white/80 hover:text-white hover:bg-white/10 px-8 py-7 text-sm tracking-[0.15em] uppercase rounded-none border border-white/20 hover:border-white/40 font-body transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
                    aria-label="Call us at (212) 555-1234"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    (212) 555-1234
                  </Button>
                </motion.div>
              </a>
            </motion.div>

            {/* Trust badges - above fold with PIPE separators (Skill 1 + Skill 4) */}
            <motion.div
              className="flex items-center gap-6 md:gap-8 mt-10 md:ml-[5%] max-w-lg py-5 border-t border-white/15"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
              aria-label="Trust metrics"
            >
              {[
                { val: "15+", label: "Years" },
                { val: "$140M+", label: "Volume" },
                { val: "2,000+", label: "Deals" },
              ].map((stat, i) => (
                <div key={stat.label} className="flex items-center gap-6 md:gap-8">
                  <div className="text-center">
                    <div
                      className="text-2xl md:text-3xl font-bold tracking-tight font-display"
                      style={{ color: PIPE_RED_LIGHT }}
                    >
                      {stat.val}
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mt-0.5 font-body">
                      {stat.label}
                    </div>
                  </div>
                  {/* Pipe separator between stats (Skill 4) */}
                  {i < 2 && <Pipe height="32px" width="2px" />}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Scroll indicator (Skill 2 - accessibility) */}
          <motion.button
            onClick={scrollToContent}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 hover:text-white/80 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/40 rounded-full p-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            aria-label="Scroll to content below"
          >
            <ChevronDown className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </section>

      {/* ================================================================
          2. SOCIAL PROOF BAR (Skill 1 - trust near top)
          Pipe separators between items (Skill 4)
          ================================================================ */}
      <section
        id="social-proof-bar"
        className="py-5 bg-neutral-900 border-y border-white/[0.06]"
        aria-label="Social proof indicators"
      >
        <div className="executive-container">
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 text-white text-sm font-body">
            {[
              { icon: Award, text: "Top 1% NYC Brokerage", color: PIPE_RED },
              { icon: Star, text: "4.9/5 Client Rating", color: "hsl(48, 96%, 53%)" },
              { icon: Clock, text: "Avg. 14 Days to Close", color: PIPE_RED },
              { icon: TrendingUp, text: "73K Avg. Client Savings", color: "hsl(142, 76%, 45%)" },
            ].map((item, i) => (
              <div key={item.text} className="flex items-center gap-2">
                {/* Pipe before each item except first (Skill 4) */}
                {i > 0 && (
                  <Pipe height="16px" width="2px" className="mr-2 hidden sm:block" />
                )}
                <item.icon className="w-4 h-4" style={{ color: item.color }} />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          3. EDITORIAL BRAND STORY SPLIT
          Skill 1: Purpose = build credibility. CTA to services.
          Skill 3: Asymmetric layout, image zoom on hover, overlap
          Skill 4: Pipe as list item markers
          ================================================================ */}
      <section className="relative overflow-hidden" aria-label="Our approach">
        <div className="grid lg:grid-cols-2 min-h-[600px]">
          {/* Image side with overlap element (Skill 3 - asymmetry) */}
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
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent lg:bg-gradient-to-l lg:from-transparent lg:to-black/20" />
            </motion.div>

            {/* Floating label with pipe accent (Skill 4) */}
            <motion.div
              className="absolute bottom-8 left-8 md:bottom-12 md:left-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs tracking-[0.2em] uppercase font-body">
                <Pipe height="12px" width="2px" />
                <MapPin className="w-3 h-3" />
                Manhattan, NYC
              </div>
            </motion.div>

            {/* Overlapping stat badge (Skill 3 - grid-breaking) */}
            <motion.div
              className="absolute -bottom-6 right-8 md:right-12 lg:-right-6 z-20 bg-neutral-950 border border-white/10 p-6 hidden md:block"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <CornerPipes />
              <div className="text-3xl font-bold font-display" style={{ color: PIPE_RED_LIGHT }}>
                $73K
              </div>
              <div className="text-xs text-white/50 font-body uppercase tracking-[0.15em] mt-1">
                Avg. Savings
              </div>
            </motion.div>
          </RevealSection>

          {/* Content side */}
          <div className="bg-neutral-950 flex items-center p-10 md:p-16 lg:p-20">
            <RevealSection delay={0.2}>
              <div className="flex items-center gap-3 mb-6">
                <Pipe height="16px" width="3px" animated />
                <span className="text-xs tracking-[0.4em] uppercase font-body" style={{ color: PIPE_RED }}>
                  Our Approach
                </span>
              </div>
              <h2 className="text-display-md text-white leading-tight mb-8 font-display">
                Institutional discipline.{" "}
                <span className="italic block" style={{ color: PIPE_RED_LIGHT }}>
                  Entrepreneurial drive.
                </span>
              </h2>
              <p className="text-white/50 text-lg md:text-xl leading-relaxed mb-8 max-w-md font-body">
                We decode value, forecast opportunity, and execute with
                precision. Data and technology backed by tenacity and trust &mdash;
                applied to New York's most complex real estate challenges.
              </p>

              {/* List items with PIPE markers (Skill 4) */}
              <div className="flex flex-col gap-5 mb-10">
                {[
                  "Advisory & brokerage for acquisitions and dispositions",
                  "Commercial leasing across all NYC boroughs",
                  "Development consulting and market analysis",
                  "Institutional-grade due diligence",
                ].map((item, i) => (
                  <motion.div
                    key={item}
                    className="flex items-start gap-4 text-white/60 text-base font-body"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  >
                    {/* Pipe as list marker (Skill 4) */}
                    <Pipe height="18px" width="3px" className="mt-1" />
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>

              <Link href="/services" onClick={scrollToTop}>
                <Button
                  variant="ghost"
                  className="text-white/70 hover:text-white hover:bg-white/5 px-0 text-sm tracking-[0.15em] uppercase rounded-none border-b border-white/20 hover:border-white/50 transition-all group font-body focus:outline-none focus:ring-2 focus:ring-white/30"
                  aria-label="Learn about our services"
                >
                  Our Services
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ================================================================
          4. FEATURED PROPERTIES
          Skill 1: Urgency badge, clear CTA, purpose = drive browsing
          Skill 4: Pipe before section label
          ================================================================ */}
      <section
        id="featured-section"
        className="relative py-24 md:py-32 bg-neutral-950"
        aria-label="Featured properties"
      >
        {/* Diagonal accent pattern (Skill 3 - rich background) */}
        <div
          className="absolute top-0 right-0 w-1/3 h-full opacity-[0.04]"
          style={{
            background: `repeating-linear-gradient(-45deg, ${PIPE_RED} 0, ${PIPE_RED} 1px, transparent 0, transparent 60px)`,
          }}
        />

        <div className="executive-container relative z-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <RevealSection>
              <div className="flex items-center gap-3 mb-4">
                <Pipe height="16px" width="3px" animated />
                <span className="text-xs tracking-[0.4em] uppercase font-body" style={{ color: PIPE_RED }}>
                  Portfolio
                </span>
              </div>
              <h2 className="text-display-md text-white max-w-xl font-display">
                Featured{" "}
                <span className="italic" style={{ color: PIPE_RED }}>
                  Properties
                </span>
              </h2>
            </RevealSection>

            <div className="flex items-center gap-4">
              {/* Urgency badge (Skill 1 - scarcity) */}
              <motion.div
                className="flex items-center gap-2 bg-red-950/40 text-red-400 text-sm font-medium px-4 py-2 border border-red-500/20"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                role="status"
                aria-label="Limited availability: Only 7 properties available this week"
              >
                <Zap className="w-4 h-4" />
                <span>
                  Only <strong>7</strong> properties available this week
                </span>
              </motion.div>

              <RevealSection delay={0.15}>
                <Link href="/properties" onClick={scrollToTop}>
                  <span className="inline-flex items-center gap-2 text-sm tracking-[0.15em] uppercase text-white/50 hover:text-[hsl(0,100%,45%)] transition-colors group cursor-pointer font-body">
                    View All
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </Link>
              </RevealSection>
            </div>
          </div>

          <RevealSection delay={0.2}>
            <PropertyGrid
              filters={{ featured: true }}
              limit={6}
              showTitle={false}
            />
          </RevealSection>
        </div>
      </section>

      {/* ================================================================
          5. WHY BRAVADO - BENTO GRID (Skill 2 - System Layer)
          Skill 1: PAS framework - Problem, Agitate, Solution
          Skill 2: Bento-grid layout, consistent shadows/borders
          Skill 3: Stagger reveals, hover micro-interactions
          Skill 4: Corner pipe accents on featured cards
          ================================================================ */}
      <section
        className="relative py-24 md:py-32 bg-neutral-900 overflow-hidden"
        aria-label="Why choose Bravado"
      >
        {/* Background accent glow (Skill 3 - depth) */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            background: `radial-gradient(ellipse at 30% 50%, ${PIPE_RED}, transparent 70%)`,
          }}
        />
        {/* Noise grain overlay (Skill 3) */}
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{ backgroundImage: NOISE_SVG }}
        />

        <div className="executive-container relative z-10">
          <RevealSection className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Pipe height="2px" width="24px" orientation="horizontal" animated />
              <span className="text-xs tracking-[0.4em] uppercase font-body" style={{ color: PIPE_RED }}>
                Why Bravado
              </span>
              <Pipe height="2px" width="24px" orientation="horizontal" animated />
            </div>
            {/* PAS: Problem (Skill 1) */}
            <h2 className="text-display-md text-white mb-6 font-display">
              NYC Real Estate Is a Battlefield.{" "}
              <span className="italic block mt-2" style={{ color: PIPE_RED_LIGHT }}>
                We Win It for You.
              </span>
            </h2>
            {/* PAS: Agitate (Skill 1) */}
            <p className="text-white/50 text-lg md:text-xl leading-relaxed font-body">
              Most buyers rely on outdated listings and overwhelmed agents. We
              deploy institutional-grade research, off-market access, and
              relentless negotiation to tip every deal in your favor.
            </p>
          </RevealSection>

          {/* BENTO GRID (Skill 2) */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            {SERVICES.map((item) => (
              <motion.div
                key={item.title}
                className={`relative border border-white/[0.08] p-8 group hover:border-[hsl(0,100%,40%,0.3)] transition-all duration-500 bg-neutral-950/50 backdrop-blur-sm ${item.span}`}
                variants={staggerItem}
                role="article"
                aria-label={item.title}
              >
                {/* Corner pipes on featured cards (Skill 4) */}
                {item.featured && <CornerPipes />}

                {/* Animated top border on hover (Skill 2 - micro-interaction) */}
                <div className="absolute top-0 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-700" style={{ background: PIPE_RED }} />

                <div
                  className="w-12 h-12 rounded-none border border-white/10 flex items-center justify-center mb-5 group-hover:border-[hsl(0,100%,45%,0.4)] transition-colors duration-500"
                  style={{ background: `${PIPE_RED}10` }}
                >
                  <item.icon className="w-5 h-5" style={{ color: PIPE_RED }} />
                </div>
                <h3 className="text-xl text-white mb-3 font-display">
                  {item.title}
                </h3>
                <p className="text-base text-white/40 leading-relaxed font-body">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================================================================
          6. THE "WOW MOMENT" - LARGE PARALLAX STATEMENT (Skill 3)
          Full-width typographic moment that stops the scroll.
          Pipe as structural divider (Skill 4)
          ================================================================ */}
      <section
        className="relative py-32 md:py-48 bg-neutral-950 overflow-hidden"
        aria-label="Brand statement"
      >
        {/* Deep background glow */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 50% 50%, ${PIPE_RED}15, transparent 60%)`,
          }}
        />

        <div className="executive-container relative z-10">
          <ParallaxText offset={30}>
            <div className="text-center">
              {/* Giant pipe divider above (Skill 4) */}
              <motion.div
                className="mx-auto mb-12"
                style={{ width: "4px", height: "80px", background: PIPE_RED }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />

              <motion.h2
                className="text-display-lg md:text-display-xl text-white font-display leading-[0.9] tracking-[-0.03em]"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              >
                We don't follow
                <br />
                <span className="italic" style={{ color: PIPE_RED_LIGHT }}>
                  the market.
                </span>
                <br />
                <span className="text-white/30">
                  We{" "}
                  <span className="text-white">
                    decode
                  </span>{" "}
                  it.
                </span>
              </motion.h2>

              {/* Giant pipe divider below (Skill 4) */}
              <motion.div
                className="mx-auto mt-12"
                style={{ width: "4px", height: "80px", background: PIPE_RED }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </ParallaxText>
        </div>
      </section>

      {/* ================================================================
          7. ANIMATED STAT COUNTERS
          Skill 1: Social proof / track record
          Skill 2: 8pt grid, consistent card system
          Skill 4: Pipe dividers between stat columns
          ================================================================ */}
      <section
        className="relative py-24 md:py-32 bg-neutral-950 overflow-hidden"
        data-testid="success-metrics"
        aria-label="Track record and success metrics"
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 w-full h-[1px]"
          style={{
            background: `linear-gradient(90deg, transparent, ${PIPE_RED}80, transparent)`,
          }}
        />

        {/* 45-degree background pattern (Skill 3 - texture) */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: "repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="executive-container relative z-10">
          <RevealSection>
            <div className="flex items-center gap-3 mb-4">
              <Pipe height="16px" width="3px" animated />
              <span className="text-xs tracking-[0.4em] uppercase font-body" style={{ color: PIPE_RED }}>
                Track Record
              </span>
            </div>
            <h2 className="text-display-md text-white max-w-2xl mb-16 md:mb-20 font-display">
              We decode value, forecast opportunity, and{" "}
              <span className="italic" style={{ color: PIPE_RED_LIGHT }}>
                execute with precision.
              </span>
            </h2>
          </RevealSection>

          {/* Stats grid with pipe dividers (Skill 4) */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.06] overflow-hidden"
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
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                ref={stat.counterRef}
                className="relative bg-neutral-900/80 backdrop-blur-sm p-8 md:p-10 group hover:bg-neutral-800/60 transition-colors duration-500"
                variants={staggerItem}
              >
                {/* Pipe accent on left of each stat (Skill 4) */}
                <div
                  className="absolute top-6 left-0 w-[3px] h-0 group-hover:h-[calc(100%-48px)] transition-all duration-700"
                  style={{ background: PIPE_RED }}
                />
                <div
                  className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-3 font-display"
                  style={{ color: PIPE_RED }}
                >
                  {stat.prefix}
                  {stat.value.toLocaleString()}
                  {stat.suffix}
                </div>
                <div className="text-white/90 text-sm font-medium mb-1 font-body">
                  {stat.label}
                </div>
                <div className="text-white/40 text-xs tracking-wider uppercase font-body">
                  {stat.detail}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Highlight deal metrics with corner pipes (Skill 4) */}
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
                className="relative border border-white/[0.08] p-8 group hover:border-[hsl(0,100%,40%,0.3)] transition-all duration-500"
                variants={staggerItem}
              >
                <CornerPipes />
                <div className="absolute top-0 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-700" style={{ background: PIPE_RED }} />
                <div className="text-3xl md:text-4xl font-bold text-white mb-2 font-display">
                  {metric.value}
                </div>
                <div className="text-white/70 text-sm font-medium mb-1 font-body">
                  {metric.label}
                </div>
                <div className="text-white/40 text-xs font-body">
                  {metric.detail}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================================================================
          8. TESTIMONIALS
          Skill 1: Social proof, trust before ask
          Skill 2: Consistent card system, proper focus states
          Skill 3: Stagger animation, hover effects
          Skill 4: Pipe separator in attribution line
          ================================================================ */}
      <section
        className="relative py-24 md:py-32 bg-neutral-950 overflow-hidden"
        aria-label="Client testimonials"
      >
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            background: `radial-gradient(ellipse at 70% 30%, ${PIPE_RED}, transparent 60%)`,
          }}
        />

        <div className="executive-container relative z-10">
          <RevealSection className="text-center max-w-2xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Pipe height="2px" width="24px" orientation="horizontal" animated />
              <span className="text-xs tracking-[0.4em] uppercase font-body" style={{ color: PIPE_RED }}>
                Client Results
              </span>
              <Pipe height="2px" width="24px" orientation="horizontal" animated />
            </div>
            <h2 className="text-display-md text-white mb-6 font-display">
              Real Stories.{" "}
              <span className="italic" style={{ color: PIPE_RED_LIGHT }}>
                Real Savings.
              </span>
            </h2>
            <p className="text-white/50 text-lg md:text-xl font-body">
              Do not take our word for it &mdash; hear from New Yorkers who trusted
              Bravado with one of the biggest financial decisions of their lives.
            </p>
          </RevealSection>

          <motion.div
            className="grid md:grid-cols-2 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            {TESTIMONIALS.map((t) => (
              <motion.div
                key={t.name}
                className="relative border border-white/[0.08] p-8 group hover:border-[hsl(0,100%,40%,0.3)] transition-all duration-500 bg-neutral-900/40"
                variants={staggerItem}
                role="article"
                aria-label={`Testimonial from ${t.name}`}
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-700" style={{ background: PIPE_RED }} />

                {/* Pipe accent (Skill 4) */}
                <div className="absolute left-0 top-0 w-[3px] h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: PIPE_RED }} />

                {/* Star rating */}
                <div className="flex gap-1 mb-4" aria-label={`Rating: ${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      aria-hidden="true"
                    />
                  ))}
                </div>

                <p className="text-white/70 text-base leading-relaxed mb-6 italic font-body">
                  &ldquo;{t.text}&rdquo;
                </p>

                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{
                      background: `${PIPE_RED}25`,
                      color: PIPE_RED_LIGHT,
                    }}
                  >
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm font-body">
                      {t.name}
                    </div>
                    {/* Pipe in attribution (Skill 4) */}
                    <div className="text-xs text-white/40 font-body flex items-center gap-2">
                      {t.role}
                      <Pipe height="10px" width="1px" />
                      {t.location}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================================================================
          9. NEIGHBORHOOD MARQUEE TICKER
          Skill 3: Continuous motion, visual rhythm
          Skill 4: PIPE separators between items (not dots)
          ================================================================ */}
      <section
        className="relative py-6 bg-neutral-900 overflow-hidden border-y border-white/[0.06]"
        aria-label="Areas we serve"
      >
        <motion.div
          className="flex whitespace-nowrap gap-12"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(2)].map((_, setIdx) => (
            <div key={setIdx} className="flex gap-12 items-center">
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
                  key={`${setIdx}-${i}`}
                  className="text-sm tracking-[0.3em] uppercase text-neutral-500 flex items-center gap-6 font-body"
                >
                  {text}
                  {/* PIPE separator (Skill 4) */}
                  <span
                    className="inline-block w-[2px] h-[14px]"
                    style={{ background: PIPE_RED }}
                  />
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </section>

      {/* ================================================================
          10. DUAL CTA SECTION
          Skill 1: Every section has CTA, dual path for different intents
          Skill 2: Consistent card components, focus states
          Skill 3: Editorial dark aesthetic, grid lines, watermark
          Skill 4: Corner pipe accents on CTA boxes
          ================================================================ */}
      <section
        className="relative py-24 md:py-32 overflow-hidden"
        aria-label="Take the next step"
      >
        <div className="absolute inset-0 bg-neutral-950" />
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 70% 50%, ${PIPE_RED}1A, transparent 60%)`,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at 20% 80%, hsl(352 60% 28% / 0.08), transparent 50%)",
          }}
        />

        {/* Grid lines (Skill 3 - texture) */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        {/* Large watermark text (Skill 3 - unexpected composition) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-bold text-white/[0.02] select-none pointer-events-none whitespace-nowrap font-display">
          BRAVADO
        </div>

        <div className="executive-container relative z-10">
          <RevealSection className="text-center max-w-2xl mx-auto mb-14">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Pipe height="2px" width="32px" orientation="horizontal" animated />
              <span className="text-xs tracking-[0.4em] uppercase font-body" style={{ color: PIPE_RED }}>
                Start Your Journey
              </span>
              <Pipe height="2px" width="32px" orientation="horizontal" animated />
            </div>
            <h2 className="text-display-md text-white mb-4 font-display">
              Ready to Make Your{" "}
              <span className="italic" style={{ color: PIPE_RED_LIGHT }}>
                Move?
              </span>
            </h2>
            <p className="text-white/50 text-lg md:text-xl font-body">
              Whether you are browsing or ready to buy, we are here to help you
              navigate New York real estate with confidence.
            </p>
          </RevealSection>

          {/* Dual CTA cards with corner pipes (Skill 4) */}
          <motion.div
            className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            {/* CTA 1 -- Browse Properties */}
            <motion.div
              className="relative border border-white/[0.08] p-10 text-center flex flex-col items-center group hover:border-[hsl(0,100%,40%,0.3)] transition-all duration-500 bg-neutral-900/30"
              variants={staggerItem}
            >
              <CornerPipes />
              <div className="absolute top-0 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-700" style={{ background: PIPE_RED }} />
              <div
                className="w-16 h-16 flex items-center justify-center mb-6 border border-white/10"
                style={{ background: `${PIPE_RED}1A` }}
              >
                <Building className="w-8 h-8" style={{ color: PIPE_RED }} />
              </div>
              <h3 className="text-xl text-white mb-3 font-display">
                Browse Properties
              </h3>
              <p className="text-base text-white/40 mb-6 flex-1 font-body">
                Explore curated residential and commercial listings across all
                five boroughs. Filter by price, neighborhood, and property type.
              </p>
              <Link href="/properties" onClick={scrollToTop} className="w-full">
                <Button
                  size="lg"
                  className="bg-[hsl(0,100%,45%)] hover:bg-[hsl(0,100%,38%)] text-white w-full py-6 text-sm tracking-[0.15em] uppercase rounded-none border-0 font-body focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-neutral-950"
                  aria-label="Search property listings"
                >
                  Search Listings
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </motion.div>

            {/* CTA 2 -- Talk to Agent */}
            <motion.div
              className="relative border-2 border-[hsl(0,100%,45%,0.3)] p-10 text-center flex flex-col items-center group hover:border-[hsl(0,100%,45%,0.5)] transition-all duration-500 bg-neutral-900/30"
              variants={staggerItem}
            >
              <CornerPipes />
              <div className="absolute top-0 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-700" style={{ background: PIPE_RED }} />
              <div
                className="w-16 h-16 flex items-center justify-center mb-6 border border-white/10"
                style={{ background: `${PIPE_RED}1A` }}
              >
                <Phone className="w-8 h-8" style={{ color: PIPE_RED }} />
              </div>
              <h3 className="text-xl text-white mb-3 font-display">
                Talk to an Agent
              </h3>
              <p className="text-base text-white/40 mb-6 flex-1 font-body">
                Get a free, no-obligation consultation with a senior Bravado
                agent. We will discuss your goals, timeline, and strategy.
              </p>
              <a href="tel:+12125551234" className="w-full">
                <Button
                  size="lg"
                  className="bg-transparent border-2 border-[hsl(0,100%,45%)] text-[hsl(0,100%,55%)] hover:bg-[hsl(0,100%,45%)] hover:text-white w-full py-6 text-sm tracking-[0.15em] uppercase rounded-none font-body transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[hsl(0,100%,45%)] focus:ring-offset-2 focus:ring-offset-neutral-950"
                  aria-label="Schedule a consultation call"
                >
                  <Phone className="mr-2 w-5 h-5" />
                  Schedule Consultation
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================================================================
          11. STICKY BOTTOM BAR
          Skill 1: Persistent CTA, always accessible
          Skill 2: Proper focus states
          Skill 4: Pipe separator in contact info
          ================================================================ */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 bg-neutral-950/95 backdrop-blur-md border-t border-white/[0.08] shadow-[0_-4px_24px_rgba(0,0,0,0.4)] py-3 px-4"
        role="complementary"
        aria-label="Quick actions bar"
      >
        <div className="executive-container">
          <div className="flex items-center justify-between gap-4">
            <div className="hidden sm:flex items-center gap-3 text-sm text-white/50 font-body">
              <Phone className="w-4 h-4" style={{ color: PIPE_RED }} />
              <a
                href="tel:+12125551234"
                className="font-semibold text-white hover:text-[hsl(0,100%,55%)] transition-colors focus:outline-none focus:underline"
              >
                (212) 555-1234
              </a>
              {/* Pipe separator (Skill 4) */}
              <Pipe height="14px" width="2px" />
              <span>Available 7 days a week</span>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a href="tel:+12125551234" className="sm:hidden flex-1">
                <Button
                  variant="outline"
                  className="w-full border-[hsl(0,100%,45%)] text-[hsl(0,100%,55%)] bg-transparent rounded-none focus:outline-none focus:ring-2 focus:ring-[hsl(0,100%,45%)]"
                  aria-label="Call Bravado now"
                >
                  <Phone className="mr-2 w-4 h-4" />
                  Call Now
                </Button>
              </a>
              <Link
                href="/about"
                onClick={scrollToTop}
                className="flex-1 sm:flex-none"
              >
                <Button
                  className="bg-[hsl(0,100%,45%)] hover:bg-[hsl(0,100%,38%)] text-white w-full sm:w-auto px-6 rounded-none text-sm tracking-[0.1em] uppercase font-body focus:outline-none focus:ring-2 focus:ring-white/50"
                  aria-label="Schedule a consultation"
                >
                  Schedule Consultation
                  <ChevronRight className="ml-1 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer so sticky bar does not cover content */}
      <div className="h-16" aria-hidden="true" />

      {/* ================================================================
          EXIT-INTENT NEWSLETTER POPUP
          Skill 1: Lead capture, value-first offer
          Skill 4: Pipe accent in popup
          ================================================================ */}
      <AnimatePresence>
        {showNewsletter && !newsletterSubmitted && (
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Newsletter signup"
          >
            <motion.div
              className="bg-neutral-900 border border-white/10 shadow-2xl max-w-md w-full p-8 relative"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Corner pipes on popup (Skill 4) */}
              <CornerPipes />

              <button
                onClick={() => setShowNewsletter(false)}
                className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/30 rounded p-1"
                aria-label="Close popup"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="text-center mb-6">
                <div
                  className="w-14 h-14 flex items-center justify-center mx-auto mb-4 border border-white/10"
                  style={{ background: `${PIPE_RED}25` }}
                >
                  <Mail className="w-7 h-7" style={{ color: PIPE_RED }} />
                </div>
                <h3 className="text-xl text-white mb-2 font-display">
                  Wait &mdash; Before You Go
                </h3>
                <p className="text-base text-white/50 font-body">
                  Get our free weekly NYC market report with pre-market listings
                  and price alerts that have saved readers an average of $73K.
                </p>
              </div>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="h-12 bg-neutral-800 border-white/10 text-white placeholder:text-white/30 rounded-none focus:ring-2 focus:ring-[hsl(0,100%,45%)]"
                  aria-label="Email address"
                />
                <Button
                  type="submit"
                  className="bg-[hsl(0,100%,45%)] hover:bg-[hsl(0,100%,38%)] text-white w-full py-6 text-sm tracking-[0.1em] uppercase rounded-none font-body focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  Get Free Market Report
                </Button>
              </form>
              <p className="text-white/30 text-xs text-center mt-3 font-body">
                Join 2,000+ subscribers. No spam, ever.
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomeV9;
