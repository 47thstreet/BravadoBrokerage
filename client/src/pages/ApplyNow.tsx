import { useEffect, useState } from "react";
import { Shield, Phone, CheckCircle, MessageCircleQuestion } from "lucide-react";
import { Link } from "wouter";

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const ApplyNow = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      #application_frame {
        transition: height 0.3s ease;
        min-height: 300px;
      }
    `;
    document.head.appendChild(style);

    const script = document.createElement('script');
    script.src = 'https://quickleasepro.com/assets/driver-embedded/qlp-embedder.js';
    script.async = true;
    document.head.appendChild(script);

    // Fallback: hide skeleton after 5s even if iframe doesn't fire onLoad
    const fallback = setTimeout(() => setIsLoading(false), 5000);

    return () => {
      clearTimeout(fallback);
      if (document.head.contains(style)) document.head.removeChild(style);
      if (document.head.contains(script)) document.head.removeChild(script);
    };
  }, []);

  return (
    <div data-testid="apply-now-page">
      {/* Compact header — gets user to the form fast */}
      <section className="py-12 bg-white dark:bg-neutral-950" data-testid="apply-hero">
        <div className="executive-container text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-[3px] h-5 rounded-full" style={{ background: "hsl(0, 100%, 45%)" }} />
            <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">Tenant Application</span>
          </div>
          <h1 className="font-display text-display-md text-neutral-900 dark:text-neutral-100 mb-3">
            Apply <span className="text-accent">Now</span>
          </h1>
          <p className="text-neutral-500 max-w-lg mx-auto mb-4">
            Complete your application below. All information is encrypted and processed securely.
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-neutral-400">
            <Shield className="h-3.5 w-3.5" />
            <span>256-bit SSL Encrypted</span>
          </div>
        </div>
      </section>

      {/* Application form — the main event, immediately visible */}
      <section className="pb-16 bg-white dark:bg-neutral-950" data-testid="apply-form">
        <div className="executive-container">
          <div className="executive-card overflow-hidden p-0">
            {/* Branded header bar */}
            <div className="bg-neutral-950 px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-[3px] h-4 rounded-full" style={{ background: "hsl(0, 100%, 45%)" }} />
                <span className="text-white text-sm font-medium tracking-wide">Bravado Application Portal</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-neutral-400 text-xs">Secure</span>
              </div>
            </div>

            {/* Iframe */}
            <div className="relative">
              {isLoading && (
                <div className="absolute inset-0 z-10 bg-white flex items-center justify-center min-h-[600px]">
                  <div className="text-center">
                    <div className="w-8 h-8 border-2 border-neutral-200 border-t-accent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-sm text-neutral-400">Loading application...</p>
                  </div>
                </div>
              )}

              <iframe
                id="application_frame"
                width="100%"
                frameBorder="0"
                src="https://bravado.quickleasepro.com/properties/106242/apply?iframe=true&embed_session=true"
                data-testid="application-frame"
                title="Bravado Tenant Application"
                className="min-h-[800px] bg-white"
                style={{ display: "block" }}
                onLoad={() => setIsLoading(false)}
              />
            </div>

            {/* Footer */}
            <div className="bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 px-6 py-3 flex items-center justify-center gap-2 text-xs text-neutral-500">
              <span className="font-medium">Bravado Real Estate</span>
              <span style={{ color: "hsl(0, 100%, 45%)" }}>|</span>
              <span>Secure Tenant Portal</span>
              <span style={{ color: "hsl(0, 100%, 45%)" }}>|</span>
              <a href="tel:+12125550123" className="hover:text-accent transition-colors">(212) 555-0123</a>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements + Support — below the form */}
      <section className="py-16 bg-neutral-50 dark:bg-neutral-900" data-testid="apply-support">
        <div className="executive-container">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="executive-card bg-white dark:bg-neutral-950">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-display text-lg text-neutral-900 dark:text-neutral-100">Application Requirements</h3>
              </div>
              <ul className="text-sm text-neutral-600 dark:text-neutral-400 space-y-3">
                <li className="flex items-center gap-2"><span style={{ color: "hsl(0, 100%, 45%)" }}>|</span> Valid government-issued ID</li>
                <li className="flex items-center gap-2"><span style={{ color: "hsl(0, 100%, 45%)" }}>|</span> Proof of income (last 3 pay stubs, bank statements)</li>
                <li className="flex items-center gap-2"><span style={{ color: "hsl(0, 100%, 45%)" }}>|</span> Tax documents (1040, W2)</li>
                <li className="flex items-center gap-2"><span style={{ color: "hsl(0, 100%, 45%)" }}>|</span> Employment verification letter</li>
                <li className="flex items-center gap-2"><span style={{ color: "hsl(0, 100%, 45%)" }}>|</span> Previous rental history</li>
              </ul>
            </div>

            <div className="executive-card bg-white dark:bg-neutral-950">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                  <Phone className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-display text-lg text-neutral-900 dark:text-neutral-100">Need Help?</h3>
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400 space-y-3">
                <p>Having trouble with your application?</p>
                <p>Call: <a href="tel:+12125550123" className="text-accent hover:text-accent/80 transition-colors">(212) 555-0123</a></p>
                <p>Email: <a href="mailto:info@bravadonyc.com" className="text-accent hover:text-accent/80 transition-colors">info@bravadonyc.com</a></p>
                <p className="text-xs text-neutral-500">Sunday - Friday, 10AM - 6PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating help button */}
      <Link href="/contact" onClick={() => scrollToTop()}>
        <button
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-neutral-900 text-white px-4 py-2.5 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all text-sm font-medium"
          aria-label="Need help? Contact us"
        >
          <MessageCircleQuestion className="w-4 h-4" />
          Need help?
        </button>
      </Link>
    </div>
  );
};

export default ApplyNow;
