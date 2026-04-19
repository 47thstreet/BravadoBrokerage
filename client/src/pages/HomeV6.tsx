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
} from "lucide-react";
import PropertyGrid from "@/components/PropertyGrid";

// ---------------------------------------------------------------
// SESSION STORAGE KEY FOR EXIT-INTENT
// ---------------------------------------------------------------
const EXIT_INTENT_KEY = "bravado_exit_intent_shown";

// ---------------------------------------------------------------
// ANIMATED COUNTER HOOK (V2 - requestAnimationFrame + easeOutCubic)
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
// MAGNETIC HOVER HOOK (V2)
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
// SECTION REVEAL WRAPPER (V2)
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
// STAGGER ANIMATION VARIANTS (V2)
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
// HERO IMAGERY
// ---------------------------------------------------------------
const HERO_BG =
  "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=85";

// ---------------------------------------------------------------
// TESTIMONIAL DATA (V4)
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
// MARQUEE ITEMS
// ---------------------------------------------------------------
const MARQUEE_ITEMS = [
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
];

// ---------------------------------------------------------------
// MAIN COMPONENT
// ---------------------------------------------------------------
const HomeV6 = () => {
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

  // Animated counters (V2 style with rAF)
  const yearsCounter = useAnimatedCounter(15, 2000);
  const volumeCounter = useAnimatedCounter(140, 2200);
  const dealsCounter = useAnimatedCounter(2000, 2400);
  const sqftCounter = useAnimatedCounter(150, 2000);

  // Magnetic CTA (V2)
  const magnetic = useMagneticHover(0.25);

  // Exit-intent newsletter popup (V4) -- once per session via sessionStorage
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const exitIntentFired = useRef(false);

  useEffect(() => {
    // Check sessionStorage so it only fires once per browser session
    if (sessionStorage.getItem(EXIT_INTENT_KEY) === "true") {
      exitIntentFired.current = true;
    }
    const handler = (e: MouseEvent) => {
      if (e.clientY < 10 && !exitIntentFired.current && !newsletterSubmitted) {
        exitIntentFired.current = true;
        sessionStorage.setItem(EXIT_INTENT_KEY, "true");
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
      className="min-h-screen bg-neutral-950 overflow-x-hidden pb-20"
      data-testid="home-page"
    >
      {/* ================================================================
          1. CINEMATIC PARALLAX HERO (V2) + TRUST BADGES (V4)
          ================================================================ */}
      <section
        ref={heroRef}
        className="relative h-screen min-h-[700px] overflow-hidden"
        aria-label="Hero"
        data-testid="hero"
      >
        {/* Parallax background */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: heroY, scale: heroScale }}
          aria-hidden="true"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            role="img"
            aria-label="Aerial view of New York City skyline"
            style={{ backgroundImage: `url(${HERO_BG})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/50 to-transparent" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(160deg, hsl(0 100% 40% / 0.25) 0%, transparent 50%, hsl(352 60% 28% / 0.15) 100%)",
            }}
          />
          {/* Noise texture */}
          <div
            className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />
        </motion.div>

        {/* Hero content */}
        <motion.div
          className="relative z-10 h-full flex flex-col justify-end pb-16 md:pb-24"
          style={{ opacity: heroOpacity }}
        >
          <div className="executive-container">
            {/* Overline badge */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs tracking-[0.3em] uppercase border border-white/30 text-white/80 backdrop-blur-sm font-body">
                <Shield className="w-3.5 h-3.5" aria-hidden="true" />
                NYC Licensed &mdash; Est. 2018
              </span>
            </motion.div>

            {/* Headline - asymmetric editorial layout (V2) */}
            <div className="relative max-w-5xl">
              <motion.h1
                className="text-display-xl text-white leading-[0.85] tracking-[-0.04em] font-display"
                initial={{
                  opacity: 0,
                  y: 80,
                  clipPath: "inset(100% 0 0 0)",
                }}
                animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
                transition={{
                  duration: 1.2,
                  delay: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                Built on
                <br />
                <span
                  className="italic"
                  style={{ color: "hsl(0, 100%, 65%)" }}
                >
                  Trust.
                </span>
              </motion.h1>

              <motion.p
                className="text-display-md text-white/70 mt-2 md:mt-4 md:ml-[15%] font-display"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
                role="doc-subtitle"
              >
                Strengthened by{" "}
                <span className="text-white font-medium">Expertise.</span>
              </motion.p>
            </div>

            {/* Subtext (V2 editorial) */}
            <motion.p
              className="max-w-lg text-white/60 text-base md:text-lg mt-8 md:ml-[5%] leading-relaxed font-body"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 1.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              Data and technology backed by tenacity and trust. Institutional
              discipline applied to New York's most complex real estate
              challenges -- saving clients an average of{" "}
              <strong className="text-white">$73K per transaction</strong>.
            </motion.p>

            {/* CTA row with magnetic hover (V2) */}
            <motion.div
              className="flex flex-wrap items-center gap-4 mt-10 md:ml-[5%]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 1.5,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link href="/listings/commercial" onClick={scrollToTop}>
                <motion.div
                  ref={magnetic.ref}
                  style={{ x: magnetic.springX, y: magnetic.springY }}
                  onMouseMove={magnetic.handleMouse}
                  onMouseLeave={magnetic.handleLeave}
                >
                  <Button
                    size="lg"
                    className="relative overflow-hidden bg-[hsl(0,100%,45%)] hover:bg-[hsl(0,100%,38%)] text-white px-8 py-6 text-sm tracking-[0.15em] uppercase rounded-none border-0 group font-body"
                    data-testid="hero-cta-primary"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      Browse Properties
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-white/10"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.5 }}
                      aria-hidden="true"
                    />
                  </Button>
                </motion.div>
              </Link>

              <a href="tel:+12125551234">
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-white/80 hover:text-white hover:bg-white/10 px-8 py-6 text-sm tracking-[0.15em] uppercase rounded-none border border-white/20 font-body"
                >
                  <Phone className="w-4 h-4 mr-2" aria-hidden="true" />
                  (212) 555-1234
                </Button>
              </a>
            </motion.div>

            {/* Trust badges grid -- ABOVE the fold (V4) */}
            <motion.div
              className="grid grid-cols-3 gap-4 mt-10 md:ml-[5%] max-w-lg py-4 border-t border-white/15"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 1.8,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {[
                { val: "15+", label: "Years Experience" },
                { val: "$140M+", label: "Transaction Volume" },
                { val: "2,000+", label: "Deals Closed" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div
                    className="text-xl md:text-2xl font-bold tracking-tight font-display"
                    style={{ color: "hsl(0, 100%, 65%)" }}
                  >
                    {stat.val}
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mt-0.5 font-body">
                    {stat.label}
                  </div>
                </div>
              ))}
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
            <ChevronDown className="w-6 h-6" aria-hidden="true" />
          </motion.button>
        </motion.div>
      </section>

      {/* ================================================================
          2. SOCIAL PROOF BAR (V4)
          ================================================================ */}
      <section
        id="social-proof-bar"
        className="py-5 bg-neutral-900 border-y border-white/[0.06]"
        aria-label="Social proof"
      >
        <div className="executive-container">
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-3 text-white text-sm font-body">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[hsl(0,100%,55%)]" aria-hidden="true" />
              <span>Top 1% NYC Brokerage</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-400" aria-hidden="true" />
              <span>4.9/5 Client Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[hsl(0,100%,55%)]" aria-hidden="true" />
              <span>Avg. 14 Days to Close</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-400" aria-hidden="true" />
              <span>$73K Avg. Client Savings</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          3. EDITORIAL BRAND STORY SPLIT (V2)
          ================================================================ */}
      <section className="relative overflow-hidden" aria-label="Our approach">
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
                loading="lazy"
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
              <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs tracking-[0.2em] uppercase font-body">
                <MapPin className="w-3 h-3 inline mr-2" aria-hidden="true" />
                Manhattan, NYC
              </div>
            </motion.div>
          </RevealSection>

          {/* Content side */}
          <div className="bg-neutral-950 flex items-center p-10 md:p-16 lg:p-20">
            <RevealSection delay={0.2}>
              <div className="text-xs tracking-[0.4em] uppercase text-[hsl(0,100%,55%)] mb-6 font-body">
                Our Approach
              </div>
              <h2 className="text-display-md text-white leading-tight mb-8 font-display">
                Institutional discipline.{" "}
                <span
                  className="italic block"
                  style={{ color: "hsl(0, 100%, 65%)" }}
                >
                  Entrepreneurial drive.
                </span>
              </h2>
              <p className="text-white/50 text-base md:text-lg leading-relaxed mb-8 max-w-md font-body">
                We decode value, forecast opportunity, and execute with
                precision. Data and technology backed by tenacity and trust --
                applied to New York's most complex real estate challenges.
              </p>

              <ul className="flex flex-col gap-4 mb-10 list-none p-0">
                {[
                  "Advisory & brokerage for acquisitions and dispositions",
                  "Commercial leasing across all NYC boroughs",
                  "Development consulting and market analysis",
                  "Institutional-grade due diligence",
                ].map((item, i) => (
                  <motion.li
                    key={item}
                    className="flex items-start gap-3 text-white/60 text-sm font-body"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[hsl(0,100%,45%)] mt-1.5 flex-shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>

              <Link href="/services" onClick={scrollToTop}>
                <Button
                  variant="ghost"
                  className="text-white/70 hover:text-white hover:bg-white/5 px-0 text-sm tracking-[0.15em] uppercase rounded-none border-b border-white/20 hover:border-white/50 transition-all group font-body"
                >
                  Our Services
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Button>
              </Link>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ================================================================
          4. FEATURED PROPERTIES + URGENCY BADGE (V4) + EDITORIAL HEADER (V2)
          ================================================================ */}
      <section
        id="featured-section"
        className="relative py-24 md:py-32 bg-neutral-950"
        aria-label="Featured properties"
      >
        {/* Diagonal accent pattern (V2) */}
        <div
          className="absolute top-0 right-0 w-1/3 h-full opacity-[0.04]"
          aria-hidden="true"
          style={{
            background:
              "repeating-linear-gradient(-45deg, hsl(0 100% 40%) 0, hsl(0 100% 40%) 1px, transparent 0, transparent 60px)",
          }}
        />

        <div className="executive-container relative z-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <RevealSection>
              <div className="text-xs tracking-[0.4em] uppercase text-[hsl(0,100%,55%)] mb-4 font-body">
                Portfolio
              </div>
              <h2 className="text-display-md text-white max-w-xl font-display">
                Featured{" "}
                <span
                  className="italic"
                  style={{ color: "hsl(0, 100%, 45%)" }}
                >
                  Properties
                </span>
              </h2>
            </RevealSection>

            <div className="flex flex-wrap items-center gap-4">
              {/* Urgency badge (V4) */}
              <motion.div
                className="flex items-center gap-2 bg-red-950/40 text-red-400 text-sm font-medium px-4 py-2 border border-red-500/20"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Zap className="w-4 h-4" aria-hidden="true" />
                <span>
                  Only <strong>7</strong> properties available this week
                </span>
              </motion.div>

              <RevealSection delay={0.15}>
                <Link href="/listings/commercial" onClick={scrollToTop}>
                  <span className="inline-flex items-center gap-2 text-sm tracking-[0.15em] uppercase text-white/50 hover:text-[hsl(0,100%,45%)] transition-colors group cursor-pointer font-body">
                    View All
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
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
          5. WHY BRAVADO -- PAS BENEFIT CARDS (V4) + EDITORIAL TYPE (V2)
          ================================================================ */}
      <section className="relative py-24 md:py-32 bg-neutral-900 overflow-hidden" aria-label="Why Bravado">
        {/* Background accent glow */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse at 30% 50%, hsl(0 100% 40%), transparent 70%)",
          }}
        />

        <div className="executive-container relative z-10">
          <RevealSection className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-xs tracking-[0.4em] uppercase text-[hsl(0,100%,55%)] mb-4 font-body">
              Why Bravado
            </div>
            <h2 className="text-display-md text-white mb-6 font-display">
              NYC Real Estate Is a Battlefield.{" "}
              <span
                className="italic block mt-2"
                style={{ color: "hsl(0, 100%, 65%)" }}
              >
                We Win It for You.
              </span>
            </h2>
            <p className="text-white/50 text-base md:text-lg leading-relaxed font-body">
              Most buyers rely on outdated listings and overwhelmed agents. We
              deploy institutional-grade research, off-market access, and
              relentless negotiation to tip every deal in your favor.
            </p>
          </RevealSection>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            {[
              {
                icon: Eye,
                title: "Off-Market Access",
                desc: "70% of our best deals never hit public portals. Our network of developers, estate attorneys, and insiders surfaces opportunities before the competition sees them.",
              },
              {
                icon: BarChart3,
                title: "Data-Driven Pricing",
                desc: "We analyze 50+ data points per property -- comp trends, cap rates, zoning changes -- so you never overpay. Our clients save an average of $73K.",
              },
              {
                icon: Target,
                title: "Precision Negotiation",
                desc: "Our agents close 2,000+ deals and know every tactic. We get below-ask pricing 83% of the time on buy-side transactions.",
              },
              {
                icon: Clock,
                title: "14-Day Average Close",
                desc: "Speed wins in NYC. Our pre-vetted lender network and streamlined process means you close faster -- before competing offers stack up.",
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
              <motion.div
                key={item.title}
                className="relative border border-white/[0.08] p-8 group hover:border-[hsl(0,100%,40%,0.3)] transition-all duration-500 bg-neutral-950/50 backdrop-blur-sm"
                variants={staggerItem}
              >
                {/* Animated top border on hover (V2 style) */}
                <div className="absolute top-0 left-0 w-0 h-[2px] bg-[hsl(0,100%,45%)] group-hover:w-full transition-all duration-700" aria-hidden="true" />

                <div className="w-12 h-12 rounded-none border border-white/10 flex items-center justify-center mb-5 group-hover:border-[hsl(0,100%,45%,0.4)] transition-colors duration-500">
                  <item.icon className="w-5 h-5 text-[hsl(0,100%,55%)]" aria-hidden="true" />
                </div>
                <h3 className="text-lg text-white mb-3 font-display">
                  {item.title}
                </h3>
                <p className="text-sm text-white/40 leading-relaxed font-body">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================================================================
          6. ANIMATED STAT COUNTERS (V2)
          ================================================================ */}
      <section
        className="relative py-24 md:py-32 bg-neutral-950 overflow-hidden"
        aria-label="Success metrics"
        data-testid="success-metrics"
      >
        {/* Accent line */}
        <div
          className="absolute top-0 left-0 w-full h-[1px]"
          aria-hidden="true"
          style={{
            background:
              "linear-gradient(90deg, transparent, hsl(0 100% 40% / 0.5), transparent)",
          }}
        />

        {/* 45-degree background pattern */}
        <div className="absolute inset-0 opacity-[0.03]" aria-hidden="true">
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
            <div className="text-xs tracking-[0.4em] uppercase text-[hsl(0,100%,55%)] mb-4 font-body">
              Track Record
            </div>
            <h2 className="text-display-md text-white max-w-2xl mb-16 md:mb-20 font-display">
              We decode value, forecast opportunity, and{" "}
              <span
                className="italic"
                style={{ color: "hsl(0, 100%, 65%)" }}
              >
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
                  className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-3 font-display"
                  style={{ color: "hsl(0, 100%, 55%)" }}
                  aria-label={`${stat.prefix ?? ""}${stat.value.toLocaleString()}${stat.suffix ?? ""} ${stat.label}`}
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

          {/* Highlight deal metrics */}
          <motion.div
            className="grid md:grid-cols-3 gap-6 mt-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            {[
              {
                value: "$47M",
                label: "Midtown Investment",
                detail: "Closed 45 days early",
              },
              {
                value: "150K",
                label: "SQFT Leased",
                detail: "23% above market",
              },
              {
                value: "94%",
                label: "Pre-Sales",
                detail: "Brooklyn Heights",
              },
            ].map((metric) => (
              <motion.div
                key={metric.label}
                className="relative border border-white/[0.08] p-8 group hover:border-[hsl(0,100%,40%,0.3)] transition-all duration-500"
                variants={staggerItem}
              >
                <div className="absolute top-0 left-0 w-0 h-[2px] bg-[hsl(0,100%,45%)] group-hover:w-full transition-all duration-700" aria-hidden="true" />
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
          7. TESTIMONIALS WITH STARS (V4) + EDITORIAL AESTHETIC (V2)
          ================================================================ */}
      <section className="relative py-24 md:py-32 bg-neutral-950 overflow-hidden" aria-label="Client testimonials">
        <div
          className="absolute inset-0 opacity-[0.04]"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse at 70% 30%, hsl(0 100% 40%), transparent 60%)",
          }}
        />

        <div className="executive-container relative z-10">
          <RevealSection className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs tracking-[0.4em] uppercase text-[hsl(0,100%,55%)] mb-4 font-body">
              Client Results
            </div>
            <h2 className="text-display-md text-white mb-6 font-display">
              Real Stories.{" "}
              <span
                className="italic"
                style={{ color: "hsl(0, 100%, 65%)" }}
              >
                Real Savings.
              </span>
            </h2>
            <p className="text-white/50 text-base md:text-lg font-body">
              Do not take our word for it -- hear from New Yorkers who trusted
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
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-0 w-0 h-[2px] bg-[hsl(0,100%,45%)] group-hover:w-full transition-all duration-700" aria-hidden="true" />

                {/* Star rating */}
                <div className="flex gap-1 mb-4" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      aria-hidden="true"
                    />
                  ))}
                </div>

                <blockquote className="text-white/70 leading-relaxed mb-6 italic font-body">
                  &ldquo;{t.text}&rdquo;
                </blockquote>

                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                    aria-hidden="true"
                    style={{
                      background: "hsl(0 100% 45% / 0.15)",
                      color: "hsl(0, 100%, 60%)",
                    }}
                  >
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm font-body">
                      {t.name}
                    </div>
                    <div className="text-xs text-white/40 font-body">
                      {t.role} &middot; {t.location}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================================================================
          8. NEIGHBORHOOD MARQUEE TICKER (V2)
          ================================================================ */}
      <section
        className="relative py-6 bg-neutral-900 overflow-hidden border-y border-white/[0.06]"
        aria-label="Service areas"
      >
        <div className="overflow-hidden">
          <motion.div
            className="flex whitespace-nowrap gap-16"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            aria-hidden="true"
          >
            {[0, 1].map((setIdx) => (
              <div key={setIdx} className="flex gap-16 items-center shrink-0">
                {MARQUEE_ITEMS.map((text) => (
                  <span
                    key={`${setIdx}-${text}`}
                    className="text-sm tracking-[0.3em] uppercase text-neutral-600 flex items-center gap-4 font-body"
                  >
                    {text}
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: "hsl(0, 100%, 45%)" }}
                    />
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
        {/* Screen-reader accessible list of areas */}
        <div className="sr-only">
          Service areas: {MARQUEE_ITEMS.join(", ")}
        </div>
      </section>

      {/* ================================================================
          9. DUAL CTA SECTION (V4) + EDITORIAL DARK AESTHETIC (V2)
          ================================================================ */}
      <section className="relative py-24 md:py-32 overflow-hidden" aria-label="Get started">
        <div className="absolute inset-0 bg-neutral-950" aria-hidden="true" />
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse at 70% 50%, hsl(0 100% 40% / 0.1), transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse at 20% 80%, hsl(352 60% 28% / 0.08), transparent 50%)",
          }}
        />

        {/* Grid lines */}
        <div className="absolute inset-0 opacity-[0.03]" aria-hidden="true">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        {/* Large watermark text */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-bold text-white/[0.02] select-none pointer-events-none whitespace-nowrap font-display"
          aria-hidden="true"
        >
          BRAVADO
        </div>

        <div className="executive-container relative z-10">
          <RevealSection className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-xs tracking-[0.4em] uppercase text-[hsl(0,100%,55%)] mb-6 font-body">
              Start Your Journey
            </div>
            <h2 className="text-display-md text-white mb-4 font-display">
              Ready to Make Your{" "}
              <span
                className="italic"
                style={{ color: "hsl(0, 100%, 65%)" }}
              >
                Move?
              </span>
            </h2>
            <p className="text-white/50 text-base md:text-lg font-body">
              Whether you are browsing or ready to buy, we are here to help you
              navigate New York real estate with confidence.
            </p>
          </RevealSection>

          {/* Dual CTA cards (V4) with dark editorial style */}
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
              <div className="absolute top-0 left-0 w-0 h-[2px] bg-[hsl(0,100%,45%)] group-hover:w-full transition-all duration-700" aria-hidden="true" />
              <div
                className="w-16 h-16 flex items-center justify-center mb-6 border border-white/10"
                style={{ background: "hsl(0 100% 45% / 0.1)" }}
              >
                <Building className="w-8 h-8 text-[hsl(0,100%,55%)]" aria-hidden="true" />
              </div>
              <h3 className="text-xl text-white mb-3 font-display">
                Browse Properties
              </h3>
              <p className="text-sm text-white/40 mb-6 flex-1 font-body">
                Explore curated residential and commercial listings across all
                five boroughs. Filter by price, neighborhood, and property type.
              </p>
              <Link
                href="/listings/commercial"
                onClick={scrollToTop}
                className="w-full"
              >
                <Button
                  size="lg"
                  className="bg-[hsl(0,100%,45%)] hover:bg-[hsl(0,100%,38%)] text-white w-full py-6 text-sm tracking-[0.15em] uppercase rounded-none border-0 font-body"
                >
                  Search Listings
                  <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
                </Button>
              </Link>
            </motion.div>

            {/* CTA 2 -- Talk to Agent */}
            <motion.div
              className="relative border-2 border-[hsl(0,100%,45%,0.3)] p-10 text-center flex flex-col items-center group hover:border-[hsl(0,100%,45%,0.5)] transition-all duration-500 bg-neutral-900/30"
              variants={staggerItem}
            >
              <div className="absolute top-0 left-0 w-0 h-[2px] bg-[hsl(0,100%,45%)] group-hover:w-full transition-all duration-700" aria-hidden="true" />
              <div
                className="w-16 h-16 flex items-center justify-center mb-6 border border-white/10"
                style={{ background: "hsl(0 100% 45% / 0.1)" }}
              >
                <Phone className="w-8 h-8 text-[hsl(0,100%,55%)]" aria-hidden="true" />
              </div>
              <h3 className="text-xl text-white mb-3 font-display">
                Talk to an Agent
              </h3>
              <p className="text-sm text-white/40 mb-6 flex-1 font-body">
                Get a free, no-obligation consultation with a senior Bravado
                agent. We will discuss your goals, timeline, and strategy.
              </p>
              <a href="tel:+12125551234" className="w-full">
                <Button
                  size="lg"
                  className="bg-transparent border-2 border-[hsl(0,100%,45%)] text-[hsl(0,100%,55%)] hover:bg-[hsl(0,100%,45%)] hover:text-white w-full py-6 text-sm tracking-[0.15em] uppercase rounded-none font-body transition-all duration-300"
                >
                  <Phone className="mr-2 w-5 h-5" aria-hidden="true" />
                  Schedule Consultation
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================================================================
          10. STICKY BOTTOM BAR (V4)
          ================================================================ */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 bg-neutral-950 border-t border-white/[0.08] shadow-[0_-4px_24px_rgba(0,0,0,0.4)] py-3 px-4"
        aria-label="Quick contact"
      >
        <div className="executive-container">
          <div className="flex items-center justify-between gap-4">
            <div className="hidden sm:flex items-center gap-3 text-sm text-white/50 font-body">
              <Phone className="w-4 h-4 text-[hsl(0,100%,55%)]" aria-hidden="true" />
              <a
                href="tel:+12125551234"
                className="font-semibold text-white hover:text-[hsl(0,100%,55%)] transition-colors"
              >
                (212) 555-1234
              </a>
              <span className="text-white/20" aria-hidden="true">|</span>
              <span>Available 7 days a week</span>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a href="tel:+12125551234" className="sm:hidden flex-1">
                <Button
                  variant="outline"
                  className="w-full border-[hsl(0,100%,45%)] text-[hsl(0,100%,55%)] bg-transparent rounded-none"
                >
                  <Phone className="mr-2 w-4 h-4" aria-hidden="true" />
                  Call Now
                </Button>
              </a>
              <Link
                href="/about"
                onClick={scrollToTop}
                className="flex-1 sm:flex-none"
              >
                <Button className="bg-[hsl(0,100%,45%)] hover:bg-[hsl(0,100%,38%)] text-white w-full sm:w-auto px-6 rounded-none text-sm tracking-[0.1em] uppercase font-body">
                  Schedule Consultation
                  <ChevronRight className="ml-1 w-4 h-4" aria-hidden="true" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ================================================================
          EXIT-INTENT NEWSLETTER POPUP (V4)
          ================================================================ */}
      <AnimatePresence>
        {showNewsletter && !newsletterSubmitted && (
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="newsletter-dialog-title"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowNewsletter(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") setShowNewsletter(false);
            }}
          >
            <motion.div
              className="bg-neutral-900 border border-white/10 shadow-2xl max-w-md w-full p-8 relative"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                onClick={() => setShowNewsletter(false)}
                className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
                aria-label="Close newsletter popup"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
              <div className="text-center mb-6">
                <div
                  className="w-14 h-14 flex items-center justify-center mx-auto mb-4 border border-white/10"
                  style={{ background: "hsl(0 100% 45% / 0.15)" }}
                >
                  <Mail className="w-7 h-7 text-[hsl(0,100%,55%)]" aria-hidden="true" />
                </div>
                <h3 id="newsletter-dialog-title" className="text-xl text-white mb-2 font-display">
                  Wait -- Before You Go
                </h3>
                <p className="text-sm text-white/50 font-body">
                  Get our free weekly NYC market report with pre-market listings
                  and price alerts that have saved readers an average of $73K.
                </p>
              </div>
              <form
                onSubmit={handleNewsletterSubmit}
                className="flex flex-col gap-3"
                aria-label="Newsletter signup"
              >
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <Input
                  id="newsletter-email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="h-12 bg-neutral-800 border-white/10 text-white placeholder:text-white/30 rounded-none"
                  autoFocus
                />
                <Button
                  type="submit"
                  className="bg-[hsl(0,100%,45%)] hover:bg-[hsl(0,100%,38%)] text-white w-full py-6 text-sm tracking-[0.1em] uppercase rounded-none font-body"
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

export default HomeV6;
