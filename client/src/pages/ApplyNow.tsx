import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, FileText, Shield, Clock, ArrowRight, CheckCircle, Phone, Mail } from "lucide-react";
import { Link } from "wouter";

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const ApplyNow = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Add CSS for iframe
    const style = document.createElement('style');
    style.textContent = `
      #qlp_frame {
        transition: height 0.3s ease;
        min-height: 300px;
      }
    `;
    document.head.appendChild(style);

    // Load the QuickLease Pro embedder script
    const script = document.createElement('script');
    script.src = 'https://quickleasepro.com/assets/driver-embedded/qlp-embedder.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup styles and script when component unmounts
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <div data-testid="apply-now-page">
      {/* Executive Application Hero */}
      <section className="executive-section bg-white dark:bg-neutral-950 min-h-[70vh] flex items-center" data-testid="apply-hero">
        <div className="executive-container">
          <div className="text-center">
            <div className="executive-badge mb-8">
              Tenant Application
            </div>
            
            <h1 className="font-display text-display-xl text-neutral-900 dark:text-neutral-100 mb-8">
              Secure Application
              <span className="block text-accent">Portal</span>
            </h1>
            
            <p className="text-body-xl text-neutral-600 dark:text-neutral-400 mb-12 max-w-2xl mx-auto">
              Experience our streamlined application process designed for efficiency and security. 
              Complete your tenant application with confidence using our professional-grade portal.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" onClick={() => scrollToTop()}>
                <Button className="executive-button executive-button-secondary" data-testid="get-help">
                  Get Application Help
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Executive Application Benefits */}
      <section className="executive-section bg-neutral-50 dark:bg-neutral-900 hairline-top" data-testid="apply-benefits">
        <div className="executive-container">
          <div className="mb-16 text-center">
            <div className="executive-badge mb-8">
              Application Benefits
            </div>
            <h2 className="font-display text-display-md text-neutral-900 dark:text-neutral-100 mb-6">
              Professional Application Experience
            </h2>
            <p className="text-body-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Our application process is designed with your convenience and security in mind.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="executive-card group text-center">
              <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/10 transition-colors duration-300">
                <FileText className="h-6 w-6 text-neutral-600 dark:text-neutral-400 group-hover:text-accent transition-colors duration-300" />
              </div>
              <h3 className="font-display text-body-lg text-neutral-900 dark:text-neutral-100 mb-4">Easy Application</h3>
              <p className="text-body-md text-neutral-600 dark:text-neutral-400">Streamlined online process that takes just minutes to complete</p>
            </div>
            
            <div className="executive-card group text-center">
              <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/10 transition-colors duration-300">
                <Shield className="h-6 w-6 text-neutral-600 dark:text-neutral-400 group-hover:text-accent transition-colors duration-300" />
              </div>
              <h3 className="font-display text-body-lg text-neutral-900 dark:text-neutral-100 mb-4">Secure & Private</h3>
              <p className="text-body-md text-neutral-600 dark:text-neutral-400">Your personal information is protected with bank-level security</p>
            </div>

            <div className="executive-card group text-center">
              <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/10 transition-colors duration-300">
                <Clock className="h-6 w-6 text-neutral-600 dark:text-neutral-400 group-hover:text-accent transition-colors duration-300" />
              </div>
              <h3 className="font-display text-body-lg text-neutral-900 dark:text-neutral-100 mb-4">Fast Approval</h3>
              <p className="text-body-md text-neutral-600 dark:text-neutral-400">Get quick decisions so you can move into your new home sooner</p>
            </div>
          </div>
        </div>
      </section>

      {/* Executive Application Portal */}
      <section className="executive-section bg-white dark:bg-neutral-950 hairline-top" data-testid="apply-form">
        <div className="executive-container">
          <div className="text-center mb-12">
            <div className="executive-badge mb-8">
              Secure Application Portal
            </div>
            <h2 className="font-display text-display-md text-neutral-900 dark:text-neutral-100 mb-6">Tenant Application Portal</h2>
            <p className="text-body-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Complete your application below. The form is powered by QuickLease Pro for secure processing.
            </p>
            <div className="flex items-center justify-center mt-6 text-body-sm text-neutral-500 dark:text-neutral-400">
              <Shield className="h-4 w-4 mr-2" />
              <span>Powered by QuickLease Pro</span>
            </div>
          </div>

          {/* Embedded Application */}
          <div className="executive-card overflow-hidden">
            <iframe
              id="qlp_frame"
              width="100%"
              frameBorder="0"
              src="https://bravado.quickleasepro.com/properties/106242/apply?iframe=true&embed_session=true"
              data-testid="quicklease-application-frame"
              title="Tenant Application Portal"
              className="min-h-[600px]"
            />
          </div>

          {/* Executive Help Section */}
          <div className="mt-16 executive-card bg-neutral-50 dark:bg-neutral-900">
            <div className="text-center mb-12">
              <div className="executive-badge mb-6">
                Application Support
              </div>
              <h3 className="font-display text-display-sm text-neutral-900 dark:text-neutral-100 mb-4">Need Assistance?</h3>
              <p className="text-body-lg text-neutral-600 dark:text-neutral-400">
                Our team is here to help you through every step of the application process.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="executive-card bg-white dark:bg-neutral-950">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-accent" />
                  </div>
                  <h4 className="font-display text-body-lg text-neutral-900 dark:text-neutral-100">Application Requirements</h4>
                </div>
                <ul className="text-body-md text-neutral-600 dark:text-neutral-400 space-y-3">
                  <li>• Valid government-issued ID</li>
                  <li>• Proof of income (last 3 pay stubs, last 3 bank statements)</li>
                  <li>• Tax documents (1040, W2)</li>
                  <li>• Employment verification letter</li>
                  <li>• Previous rental history</li>
                </ul>
              </div>
              
              <div className="executive-card bg-white dark:bg-neutral-950">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-accent" />
                  </div>
                  <h4 className="font-display text-body-lg text-neutral-900 dark:text-neutral-100">Contact Support</h4>
                </div>
                <div className="text-body-md text-neutral-600 dark:text-neutral-400 space-y-3">
                  <p>Having trouble with your application?</p>
                  <p>Call: <a href="tel:+12125550123" className="text-accent hover:text-accent/80 transition-colors">(212) 555-0123</a></p>
                  <p>Email: <a href="mailto:info@bravadonyc.com" className="text-accent hover:text-accent/80 transition-colors">info@bravadonyc.com</a></p>
                  <p className="text-body-sm text-neutral-500 dark:text-neutral-400">Sunday - Friday, 10AM - 6PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ApplyNow;