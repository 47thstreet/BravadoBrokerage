import { Link } from "wouter";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, Phone, Mail, MapPin, ChevronDown } from "lucide-react";
import PropertyGrid from "@/components/PropertyGrid";

/*
 * V5 — "The Pipe"
 *
 * First-principles design: The red | IS the brand.
 * Not decoration. Not accent. Structure.
 *
 * Every vertical line on this page echoes B|RE.
 * The pipe divides sections, separates stats, marks entries,
 * and connects the bold promise (B) to the craft (RE).
 *
 * Color: near-black backgrounds, white type, red pipe accents only.
 * Typography: Playfair Display display, Inter body. Nothing else.
 * Motion: purposeful reveals. Nothing gratuitous.
 * Layout: vertical rhythm. Columns divided by pipes.
 */

const PIPE = "hsl(0, 100%, 45%)";

// Animated counter hook
function useCounter(end: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return { count, ref };
}

// Red pipe component — the atomic brand element
const Pipe = ({ height = "h-8", className = "" }: { height?: string; className?: string }) => (
  <div className={`w-[3px] rounded-full ${height} ${className}`} style={{ background: PIPE }} />
);

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }
  })
};

const HomeV5 = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -60]);

  const years = useCounter(15, 1800);
  const volume = useCounter(140, 2000);
  const deals = useCounter(2000, 2200);

  const scrollToTop = () => window.scrollTo(0, 0);

  return (
    <div className="bg-neutral-950 text-white min-h-screen" data-testid="home-page">

      {/* ═══════════════════════════════════════════════
          HERO — Full dark. One statement. One image.
          The pipe runs vertically through the center.
          ═══════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-[92vh] flex items-center overflow-hidden">
        {/* Subtle background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=2000&q=60"
            alt=""
            className="w-full h-full object-cover opacity-[0.07]"
          />
        </div>

        {/* Center pipe — the hero's spine */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 hidden lg:block"
          style={{ background: `linear-gradient(to bottom, transparent 10%, ${PIPE} 30%, ${PIPE} 70%, transparent 90%)` }}
        />

        <motion.div className="executive-container relative z-10 w-full" style={{ opacity: heroOpacity, y: heroY }}>
          <div className="grid lg:grid-cols-2 gap-0 items-center min-h-[80vh]">
            {/* Left — The Promise */}
            <div className="lg:pr-20 py-16 lg:py-0">
              <motion.div
                initial="hidden" animate="visible" variants={fadeUp} custom={0}
                className="mb-6"
              >
                <span className="inline-flex items-center gap-2 text-xs font-body uppercase tracking-[0.2em] text-neutral-500">
                  <Pipe height="h-4" /> Est. 2018 — New York City
                </span>
              </motion.div>

              <motion.h1
                initial="hidden" animate="visible" variants={fadeUp} custom={1}
                className="font-display text-display-lg text-white mb-8 leading-[0.92]"
              >
                Built on<br />
                <span className="italic font-light">Trust</span>
                <span className="inline-block mx-3 text-[0.5em] font-light" style={{ color: PIPE }}>|</span>
                Strengthened<br />
                by <span className="italic font-light">Expertise</span>
              </motion.h1>

              <motion.p
                initial="hidden" animate="visible" variants={fadeUp} custom={2}
                className="font-body text-lg text-neutral-400 max-w-lg mb-10 leading-relaxed"
              >
                Institutional discipline applied to New York's most complex real estate.
                We decode value, forecast opportunity, and execute with precision.
              </motion.p>

              <motion.div
                initial="hidden" animate="visible" variants={fadeUp} custom={3}
                className="flex items-center gap-6"
              >
                <Link href="/listings/commercial" onClick={scrollToTop}>
                  <button className="group flex items-center gap-3 bg-white text-neutral-950 px-8 py-4 text-sm font-medium uppercase tracking-wider hover:bg-neutral-200 transition-colors">
                    View Properties
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link href="/contact" onClick={scrollToTop}>
                  <button className="flex items-center gap-3 text-neutral-400 hover:text-white text-sm uppercase tracking-wider transition-colors">
                    <span style={{ color: PIPE }}>|</span> Contact Us
                  </button>
                </Link>
              </motion.div>
            </div>

            {/* Right — The Image */}
            <motion.div
              className="hidden lg:flex items-center justify-center lg:pl-20 relative"
              initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
              animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
            >
              <div className="relative">
                <img
                  src="/attached_assets/PHOTO-2019-02-04-15-25-38_1757990963195.jpg"
                  alt="Manhattan Architecture"
                  className="w-full max-w-md object-contain"
                />
                {/* Pipe frame accent */}
                <div className="absolute -left-4 top-8 bottom-8 w-[2px]" style={{ background: PIPE }} />
              </div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-600">Scroll</span>
            <ChevronDown className="w-4 h-4 text-neutral-600" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════
          STATS — Three numbers divided by red pipes.
          The purest expression of the B|RE brand.
          ═══════════════════════════════════════════════ */}
      <section className="py-0 border-y" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="executive-container">
          <div className="grid grid-cols-3 divide-x" style={{ divideColor: PIPE }}>
            {[
              { ref: years.ref, count: years.count, suffix: "+", label: "Years", sub: "of NYC expertise" },
              { ref: volume.ref, count: volume.count, prefix: "$", suffix: "M+", label: "Volume", sub: "in transactions" },
              { ref: deals.ref, count: deals.count, suffix: "+", label: "Deals", sub: "closed successfully" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="py-16 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                viewport={{ once: true }}
              >
                <span ref={stat.ref} className="font-display text-5xl md:text-6xl font-light text-white">
                  {stat.prefix}{stat.count}{stat.suffix}
                </span>
                <div className="mt-3 text-xs uppercase tracking-[0.2em] text-neutral-500">{stat.label}</div>
                <div className="mt-1 text-sm text-neutral-600">{stat.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          DEAL HIGHLIGHTS — Proof of execution.
          Each deal card has a pipe left-border.
          ═══════════════════════════════════════════════ */}
      <section className="py-24">
        <div className="executive-container">
          <motion.div
            className="flex items-center gap-4 mb-16"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Pipe height="h-6" />
            <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">Recent Transactions</span>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { value: "$47M", title: "Midtown Investment", detail: "Closed 45 days ahead of schedule. Full-building acquisition with complex tenant restructuring.", tag: "Investment Sales" },
              { value: "150K", title: "SQFT Leased", detail: "23% above market rate. Multi-floor commercial lease in Hudson Yards with 12-year commitment.", tag: "Commercial Lease" },
              { value: "94%", title: "Pre-Sale Rate", detail: "Brooklyn Heights development. 47 of 50 units sold before completion with zero price reductions.", tag: "Development" },
            ].map((deal, i) => (
              <motion.div
                key={deal.title}
                className="group relative pl-6 py-2"
                initial="hidden" whileInView="visible" custom={i}
                variants={fadeUp} viewport={{ once: true }}
              >
                {/* Pipe left border */}
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-neutral-800 group-hover:bg-transparent transition-colors">
                  <div
                    className="absolute top-0 left-0 w-full bg-red-600 transition-all duration-500 ease-out"
                    style={{ height: "0%" }}
                    ref={(el) => {
                      if (el) {
                        el.closest('.group')?.addEventListener('mouseenter', () => el.style.height = '100%');
                        el.closest('.group')?.addEventListener('mouseleave', () => el.style.height = '0%');
                      }
                    }}
                  />
                </div>

                <div className="text-xs uppercase tracking-[0.2em] text-neutral-600 mb-4">{deal.tag}</div>
                <div className="font-display text-4xl md:text-5xl font-light text-white mb-3">{deal.value}</div>
                <div className="font-display text-lg text-neutral-300 mb-3">{deal.title}</div>
                <p className="text-sm text-neutral-500 leading-relaxed">{deal.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          PROPERTIES — Featured listings from the DB.
          Clean section with pipe header.
          ═══════════════════════════════════════════════ */}
      <section className="py-24 bg-neutral-900/50">
        <div className="executive-container">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <Pipe height="h-6" />
                <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">Portfolio</span>
              </div>
              <h2 className="font-display text-display-md text-white">
                Featured <span className="italic font-light">Properties</span>
              </h2>
            </div>
            <Link href="/listings/commercial" onClick={scrollToTop}>
              <span className="hidden md:flex items-center gap-2 text-sm text-neutral-500 hover:text-white transition-colors uppercase tracking-wider">
                View All <span style={{ color: PIPE }}>|</span> <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
          <PropertyGrid filters={{ featured: true }} limit={6} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SERVICES — What we do. Pipe-separated columns.
          ═══════════════════════════════════════════════ */}
      <section className="py-24">
        <div className="executive-container">
          <div className="flex items-center gap-4 mb-16">
            <Pipe height="h-6" />
            <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">Capabilities</span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-0 divide-x" style={{ divideColor: "rgba(255,255,255,0.06)" }}>
            {[
              { title: "Investment Sales", desc: "Full-building acquisitions, portfolio dispositions, and 1031 exchanges across all asset classes." },
              { title: "Commercial Leasing", desc: "Office, retail, and industrial space. Tenant representation and landlord advisory." },
              { title: "Residential", desc: "Sales and rentals across Manhattan's most sought-after neighborhoods." },
              { title: "Advisory", desc: "Market analysis, valuation, and strategic consulting for institutional and private clients." },
            ].map((service, i) => (
              <motion.div
                key={service.title}
                className="group px-8 py-8 first:pl-0 last:pr-0"
                initial="hidden" whileInView="visible" custom={i}
                variants={fadeUp} viewport={{ once: true }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: PIPE }}>|</span>
                  <h3 className="font-display text-xl text-white">{service.title}</h3>
                </div>
                <p className="text-sm text-neutral-500 leading-relaxed">{service.desc}</p>
                <Link href="/services/commercial" onClick={scrollToTop}>
                  <span className="inline-flex items-center gap-2 mt-6 text-xs uppercase tracking-wider text-neutral-600 hover:text-white transition-colors">
                    Learn more <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          BRAND STATEMENT — Full-width. Just words.
          The pipe as punctuation.
          ═══════════════════════════════════════════════ */}
      <section className="py-32 border-y" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="executive-container text-center">
          <motion.h2
            className="font-display text-display-md md:text-display-lg text-white max-w-5xl mx-auto leading-[1]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            We don't follow<br />
            the market<span className="inline-block mx-2" style={{ color: PIPE }}>|</span>We<br />
            <span className="italic font-light">decode</span> it.
          </motion.h2>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          NEIGHBORHOODS — The boroughs we serve.
          Horizontal scroll with pipe separators.
          ═══════════════════════════════════════════════ */}
      <section className="py-20 overflow-hidden">
        <div className="flex items-center gap-4 executive-container mb-12">
          <Pipe height="h-6" />
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">Markets We Serve</span>
        </div>
        <motion.div
          className="flex items-center gap-0 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(2)].map((_, dupeIdx) => (
            <div key={dupeIdx} className="flex items-center gap-0">
              {["Tribeca", "SoHo", "Chelsea", "Midtown", "Hudson Yards", "Upper West Side", "Financial District", "Brooklyn Heights", "Williamsburg", "Greenwich Village"].map((hood) => (
                <span key={`${dupeIdx}-${hood}`} className="flex items-center">
                  <span className="font-display text-2xl md:text-3xl text-neutral-700 px-6">{hood}</span>
                  <span className="text-lg font-light" style={{ color: PIPE }}>|</span>
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════
          CTA — Simple. Direct. Pipe-framed.
          ═══════════════════════════════════════════════ */}
      <section className="py-32">
        <div className="executive-container">
          <motion.div
            className="relative border p-16 md:p-24 text-center"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }} viewport={{ once: true }}
          >
            {/* Corner pipe accents */}
            <div className="absolute top-0 left-0 w-[3px] h-12" style={{ background: PIPE }} />
            <div className="absolute top-0 left-0 h-[3px] w-12" style={{ background: PIPE }} />
            <div className="absolute bottom-0 right-0 w-[3px] h-12" style={{ background: PIPE }} />
            <div className="absolute bottom-0 right-0 h-[3px] w-12" style={{ background: PIPE }} />

            <h2 className="font-display text-display-md text-white mb-6">
              Ready to make<br /><span className="italic font-light">your move</span><span style={{ color: PIPE }}>?</span>
            </h2>
            <p className="text-neutral-500 mb-10 max-w-lg mx-auto">
              Whether you're buying, selling, or investing — we bring the same institutional rigor to every engagement.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" onClick={scrollToTop}>
                <button className="bg-white text-neutral-950 px-10 py-4 text-sm font-medium uppercase tracking-wider hover:bg-neutral-200 transition-colors">
                  Schedule a Consultation
                </button>
              </Link>
              <a href="tel:+12125550123" className="flex items-center gap-3 text-neutral-500 hover:text-white transition-colors text-sm">
                <Phone className="w-4 h-4" />
                (212) 555-0123
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomeV5;
