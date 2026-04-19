import { Link } from "wouter";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { ArrowRight, Phone, ChevronDown } from "lucide-react";
import PropertyGrid from "@/components/PropertyGrid";

/**
 * HomeV7 — Premium brokerage homepage
 *
 * Merges the best of V2 (cinematic, editorial, parallax),
 * V4 (conversion psychology, trust signals, PAS copy),
 * and V5 (pipe as structural grammar).
 *
 * Principles: Simple. Premium. Intuitive.
 * Palette: neutral-950 dark. Bodoni Moda display. Red pipe branding.
 * Every element earns its space.
 */

const PIPE = "hsl(0, 100%, 45%)";

// ---------------------------------------------------------------------------
// Animated counter hook — guards against NaN / zero-division edge cases
// ---------------------------------------------------------------------------
function useCounter(end: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    if (end <= 0 || duration <= 0) {
      setCount(end);
      setStarted(true);
      return;
    }

    setStarted(true);
    let current = 0;
    const totalFrames = Math.max(1, Math.floor(duration / 16));
    const step = end / totalFrames;
    const timer = setInterval(() => {
      current += step;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return { count, ref, started };
}

// ---------------------------------------------------------------------------
// Red pipe component
// ---------------------------------------------------------------------------
const Pipe = ({
  height = "h-8",
  className = "",
}: {
  height?: string;
  className?: string;
}) => (
  <div
    className={`w-[3px] rounded-full ${height} ${className}`}
    style={{ background: PIPE }}
    aria-hidden="true"
  />
);

// ---------------------------------------------------------------------------
// Fade-up animation variants
// ---------------------------------------------------------------------------
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.12,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

// ---------------------------------------------------------------------------
// Neighborhood list (extracted to avoid re-creation on each render)
// ---------------------------------------------------------------------------
const NEIGHBORHOODS = [
  "Tribeca",
  "SoHo",
  "Chelsea",
  "Midtown",
  "Hudson Yards",
  "Upper West Side",
  "Financial District",
  "Brooklyn Heights",
  "Williamsburg",
  "Greenwich Village",
] as const;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
const HomeV7 = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  // Stat counters
  const stat47m = useCounter(47, 2000);
  const stat150k = useCounter(150, 2200);
  const stat94 = useCounter(94, 1800);

  const scrollToTop = useCallback(() => window.scrollTo(0, 0), []);
  const scrollToContent = useCallback(() => {
    document
      .getElementById("social-proof")
      ?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div
      className="bg-neutral-950 text-white min-h-screen overflow-x-hidden"
      data-testid="home-page"
    >
      {/* ================================================================
          1. HERO — Full viewport, cinematic, parallax background
          ================================================================ */}
      <section
        ref={heroRef}
        className="relative h-screen min-h-[700px] overflow-hidden"
        aria-label="Hero"
        data-testid="hero"
      >
        {/* Parallax background image */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: heroY, scale: heroScale }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            role="img"
            aria-label="New York City skyline"
            style={{
              backgroundImage:
                "url(/attached_assets/PHOTO-2019-02-04-15-25-38_1757990963195.jpg)",
            }}
          />
          <div className="absolute inset-0 bg-neutral-950/75" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, transparent 0%, hsla(0,0%,4%,0.6) 70%, hsl(0,0%,4%) 100%)",
            }}
          />
        </motion.div>

        {/* Noise texture */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none opacity-[0.03] mix-blend-overlay"
          aria-hidden="true"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        {/* Hero content */}
        <motion.div
          className="relative z-10 h-full flex flex-col justify-center"
          style={{ opacity: heroOpacity }}
        >
          <div className="executive-container">
            {/* Overline */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0}
              className="mb-8"
            >
              <span className="inline-flex items-center gap-3 text-xs font-body uppercase tracking-[0.25em] text-neutral-400">
                <Pipe height="h-4" />
                Est. 2018 — New York City
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={1}
              className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[0.92] tracking-[-0.02em] max-w-4xl mb-8"
            >
              Built on{" "}
              <span className="italic font-light">Trust</span>
              <span
                className="inline-block mx-2 md:mx-3 text-[0.5em] font-light"
                style={{ color: PIPE }}
                aria-hidden="true"
              >
                |
              </span>
              <br className="hidden sm:block" />
              Strengthened by{" "}
              <span className="italic font-light">Expertise</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={2}
              className="font-body text-lg md:text-xl text-neutral-400 max-w-xl mb-12 leading-relaxed"
            >
              Institutional discipline applied to New York's most complex real
              estate. Data-driven strategy. Relentless execution.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={3}
              className="flex flex-wrap items-center gap-5 mb-16"
            >
              <Link
                href="/listings/commercial"
                onClick={scrollToTop}
                className="group inline-flex items-center gap-3 bg-white text-neutral-950 px-8 py-4 text-sm font-medium uppercase tracking-wider hover:bg-neutral-200 transition-colors duration-200"
              >
                View Properties
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                href="/contact"
                onClick={scrollToTop}
                className="inline-flex items-center gap-3 text-neutral-400 hover:text-white text-sm uppercase tracking-wider transition-colors duration-200"
              >
                <span style={{ color: PIPE }} aria-hidden="true">|</span> Contact Us
              </Link>
            </motion.div>

            {/* Trust badges — visible without scrolling */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={4}
              className="flex items-center gap-0 divide-x divide-white/[0.12] max-w-lg"
              role="list"
              aria-label="Key statistics"
            >
              {[
                { value: "15+", label: "Years" },
                { value: "$140M+", label: "Volume" },
                { value: "2,000+", label: "Deals" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex-1 text-center px-4 first:pl-0 last:pr-0"
                  role="listitem"
                >
                  <div className="font-display text-2xl md:text-3xl text-white tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.2em] text-neutral-500 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.button
            onClick={scrollToContent}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-600 hover:text-neutral-400 transition-colors cursor-pointer"
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            aria-label="Scroll to content"
            type="button"
          >
            <span className="text-[10px] uppercase tracking-[0.3em]">
              Scroll
            </span>
            <ChevronDown className="w-4 h-4" aria-hidden="true" />
          </motion.button>
        </motion.div>
      </section>

      {/* ================================================================
          2. SOCIAL PROOF BAR
          ================================================================ */}
      <section
        id="social-proof"
        className="py-5 border-y"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
        aria-label="Social proof"
      >
        <div className="executive-container">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-neutral-500">
            <span>
              Trusted by{" "}
              <strong className="text-neutral-300">2,000+</strong> NYC clients
            </span>
            <span style={{ color: PIPE }} aria-hidden="true">|</span>
            <span>
              <strong className="text-neutral-300">4.9/5</strong> client rating
            </span>
            <span style={{ color: PIPE }} aria-hidden="true">|</span>
            <span>
              Avg.{" "}
              <strong className="text-neutral-300">$73K</strong> client savings
            </span>
          </div>
        </div>
      </section>

      {/* ================================================================
          3. FEATURED PROPERTIES
          ================================================================ */}
      <section className="py-24 md:py-32" aria-label="Featured properties">
        <div className="executive-container">
          <div className="flex items-end justify-between mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-4">
                <Pipe height="h-6" />
                <span className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-body">
                  Portfolio
                </span>
              </div>
              <h2 className="font-display text-display-md text-white">
                Featured{" "}
                <span className="italic font-light">Properties</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Link
                href="/listings/commercial"
                onClick={scrollToTop}
                className="hidden md:inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-white transition-colors uppercase tracking-wider font-body"
              >
                View All{" "}
                <span style={{ color: PIPE }} aria-hidden="true">|</span>{" "}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <PropertyGrid
              filters={{ featured: true }}
              limit={6}
              showTitle={false}
            />
          </motion.div>

          {/* Mobile view-all link */}
          <div className="mt-8 text-center md:hidden">
            <Link
              href="/listings/commercial"
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-white transition-colors uppercase tracking-wider font-body"
            >
              View All Properties{" "}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================================
          4. WHY BRAVADO — 3-column grid
          ================================================================ */}
      <section
        className="py-24 md:py-32 border-y"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
        aria-label="The Bravado advantage"
      >
        <div className="executive-container">
          <motion.div
            className="flex items-center gap-4 mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Pipe height="h-6" />
            <span className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-body">
              The Bravado Advantage
            </span>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12 md:gap-16">
            {[
              {
                title: "Off-Market Access",
                desc: "70% of our best deals never hit public portals. Our network of developers, estate attorneys, and insiders surfaces opportunities before the competition sees them.",
              },
              {
                title: "Data-Driven Pricing",
                desc: "We analyze 50+ data points per property -- comp trends, cap rates, zoning changes -- so you never overpay. Our clients save an average of $73K per transaction.",
              },
              {
                title: "Dedicated Team",
                desc: "Every client gets a senior agent backed by analysts and a transaction coordinator. No hand-offs, no junior associates. Direct access, always.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className="relative pl-6"
                initial="hidden"
                whileInView="visible"
                custom={i}
                variants={fadeUp}
                viewport={{ once: true }}
              >
                {/* Pipe left border */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-[2px]"
                  aria-hidden="true"
                  style={{
                    background: `linear-gradient(to bottom, ${PIPE}, transparent)`,
                  }}
                />
                <h3 className="font-display text-xl md:text-2xl text-white mb-4">
                  {item.title}
                </h3>
                <p className="font-body text-base text-neutral-500 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          5. DEAL HIGHLIGHTS — Animated counters, pipe-divided
          ================================================================ */}
      <section className="py-24 md:py-32" aria-label="Deal highlights">
        <div className="executive-container">
          <motion.div
            className="flex items-center gap-4 mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Pipe height="h-6" />
            <span className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-body">
              Proof of Execution
            </span>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:divide-x md:divide-[hsl(0,100%,45%)]">
            {[
              {
                ref: stat47m.ref,
                count: stat47m.count,
                started: stat47m.started,
                prefix: "$",
                suffix: "M",
                title: "Midtown Investment",
                detail:
                  "Full-building acquisition. Closed 45 days ahead of schedule.",
                tag: "Investment Sales",
              },
              {
                ref: stat150k.ref,
                count: stat150k.count,
                started: stat150k.started,
                prefix: "",
                suffix: "K SQFT",
                title: "Commercial Leased",
                detail:
                  "23% above market rate. Multi-floor lease in Hudson Yards.",
                tag: "Commercial Lease",
              },
              {
                ref: stat94.ref,
                count: stat94.count,
                started: stat94.started,
                prefix: "",
                suffix: "%",
                title: "Pre-Sale Rate",
                detail:
                  "47 of 50 units sold before completion. Zero price reductions.",
                tag: "Development",
              },
            ].map((deal, i) => (
              <motion.div
                key={deal.title}
                className="py-8 md:py-0 md:px-12 first:md:pl-0 last:md:pr-0 border-b md:border-b-0 border-neutral-800 last:border-b-0"
                initial="hidden"
                whileInView="visible"
                custom={i}
                variants={fadeUp}
                viewport={{ once: true }}
              >
                <div className="text-xs uppercase tracking-[0.2em] text-neutral-600 mb-4 font-body">
                  {deal.tag}
                </div>
                <div className="font-display text-5xl md:text-6xl font-light text-white mb-3 tracking-tight">
                  <span ref={deal.ref}>
                    {deal.started
                      ? `${deal.prefix}${deal.count.toLocaleString()}${deal.suffix}`
                      : "\u00A0"}
                  </span>
                </div>
                <div className="font-display text-lg text-neutral-300 mb-3">
                  {deal.title}
                </div>
                <p className="font-body text-sm text-neutral-500 leading-relaxed">
                  {deal.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          6. TESTIMONIALS — Pipe left-borders, specific numbers
          ================================================================ */}
      <section
        className="py-24 md:py-32 border-y"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
        aria-label="Client testimonials"
      >
        <div className="executive-container">
          <motion.div
            className="flex items-center gap-4 mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Pipe height="h-6" />
            <span className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-body">
              Client Voices
            </span>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                quote:
                  "They saw value in our building that three other firms missed entirely. Closed at 18% above our ask -- $4.2M more than our next best offer.",
                name: "David Chen",
                role: "Managing Partner, Gramercy Capital",
              },
              {
                quote:
                  "No theatrics, no wasted showings. They understood what we needed and delivered in under 30 days. Saved us $85K below asking.",
                name: "Sarah Okonkwo",
                role: "VP Operations, Tribeca Hospitality Group",
              },
              {
                quote:
                  "The level of market intelligence they brought to our lease negotiation saved us seven figures. Period.",
                name: "Michael Torres",
                role: "CFO, Hudson Yards Ventures",
              },
            ].map((testimonial, i) => (
              <motion.blockquote
                key={testimonial.name}
                className="relative pl-6"
                initial="hidden"
                whileInView="visible"
                custom={i}
                variants={fadeUp}
                viewport={{ once: true }}
              >
                <div
                  className="absolute left-0 top-0 bottom-0 w-[2px]"
                  aria-hidden="true"
                  style={{ background: PIPE }}
                />
                <p className="font-body text-neutral-300 text-base leading-relaxed italic mb-6">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <footer>
                  <div className="text-sm text-white font-medium font-body">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-neutral-600 mt-1 font-body">
                    {testimonial.role}
                  </div>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          MARQUEE — Neighborhoods ticker
          ================================================================ */}
      <section
        className="py-12 overflow-hidden"
        aria-label="Neighborhoods served"
      >
        <div className="overflow-hidden">
          <motion.div
            className="flex items-center gap-0 whitespace-nowrap w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[0, 1].map((dupeIdx) => (
              <div
                key={dupeIdx}
                className="flex items-center gap-0"
                aria-hidden={dupeIdx === 1 ? "true" : undefined}
              >
                {NEIGHBORHOODS.map((hood) => (
                  <span
                    key={`${dupeIdx}-${hood}`}
                    className="flex items-center flex-shrink-0"
                  >
                    <span className="font-display text-2xl md:text-3xl text-neutral-800 px-6">
                      {hood}
                    </span>
                    <span
                      className="text-lg font-light"
                      style={{ color: PIPE }}
                      aria-hidden="true"
                    >
                      |
                    </span>
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================================================================
          7. CTA — Pipe-framed box, clean and direct
          ================================================================ */}
      <section className="py-24 md:py-32" aria-label="Call to action">
        <div className="executive-container">
          <motion.div
            className="relative border p-8 sm:p-12 md:p-20 text-center"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Corner pipe accents — top-left */}
            <motion.div
              className="absolute top-0 left-0 w-[3px] origin-top"
              style={{ background: PIPE }}
              initial={{ height: 0 }}
              whileInView={{ height: 48 }}
              transition={{
                duration: 0.6,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true }}
              aria-hidden="true"
            />
            <motion.div
              className="absolute top-0 left-0 h-[3px] origin-left"
              style={{ background: PIPE }}
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              transition={{
                duration: 0.6,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true }}
              aria-hidden="true"
            />
            {/* Corner pipe accents — bottom-right */}
            <motion.div
              className="absolute bottom-0 right-0 w-[3px] origin-bottom"
              style={{ background: PIPE }}
              initial={{ height: 0 }}
              whileInView={{ height: 48 }}
              transition={{
                duration: 0.6,
                delay: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true }}
              aria-hidden="true"
            />
            <motion.div
              className="absolute bottom-0 right-0 h-[3px] origin-right"
              style={{ background: PIPE }}
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              transition={{
                duration: 0.6,
                delay: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true }}
              aria-hidden="true"
            />

            <h2 className="font-display text-display-md text-white mb-6">
              Ready to make
              <br />
              <span className="italic font-light">your move</span>
              <span style={{ color: PIPE }} aria-hidden="true">?</span>
            </h2>
            <p className="font-body text-neutral-500 mb-10 max-w-lg mx-auto text-base md:text-lg leading-relaxed">
              Whether you are buying, selling, or investing -- we bring
              institutional rigor and personal commitment to every engagement.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/listings/commercial"
                onClick={scrollToTop}
                className="group inline-flex items-center gap-3 bg-white text-neutral-950 px-10 py-4 text-sm font-medium uppercase tracking-wider hover:bg-neutral-200 transition-colors duration-200"
              >
                View Properties
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                href="/contact"
                onClick={scrollToTop}
                className="inline-flex items-center gap-3 border border-neutral-700 hover:border-neutral-500 text-neutral-400 hover:text-white px-10 py-4 text-sm uppercase tracking-wider transition-all duration-200"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomeV7;
