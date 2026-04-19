import { AlertCircle, Home } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 flex items-center justify-center" data-testid="not-found-page">
      <section className="executive-section">
        <div className="executive-container">
          <div className="max-w-2xl mx-auto text-center">
            {/* Error Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-neutral-100 dark:bg-neutral-800 mb-8">
              <AlertCircle className="h-10 w-10 text-accent" />
            </div>

            {/* Error Code */}
            <div className="inline-block border border-neutral-200 dark:border-neutral-700 rounded-full px-4 py-2 text-xs font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-widest mb-8 bg-white/80 dark:bg-neutral-950/80">
              Error 404
            </div>

            {/* Main Heading */}
            <h1 className="font-display text-display-md text-neutral-900 dark:text-neutral-100 mb-8">
              Page Not Found
            </h1>

            {/* Description */}
            <p className="text-body-lg text-neutral-600 dark:text-neutral-400 mb-12 max-w-lg mx-auto">
              The page you're looking for doesn't exist or may have been moved. 
              Let us help you find what you're looking for.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/" data-testid="button-home">
                <div className="inline-flex items-center justify-center px-8 py-4 bg-accent hover:bg-accent/90 text-white font-medium text-body rounded-lg transition-all duration-200 hover:transform hover:-translate-y-1 hover:shadow-lg">
                  <Home className="h-5 w-5 mr-2" />
                  Return Home
                </div>
              </Link>
              
              <Link href="/listings" data-testid="button-listings">
                <div className="inline-flex items-center justify-center px-8 py-4 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-900 font-medium text-body rounded-lg transition-all duration-200">
                  Browse Listings
                </div>
              </Link>
            </div>

            {/* Additional Help */}
            <div className="executive-card mt-16 text-left">
              <h3 className="font-display text-body-lg font-medium text-neutral-900 dark:text-neutral-100 mb-4">
                Need Assistance?
              </h3>
              <p className="text-body text-neutral-600 dark:text-neutral-400 mb-6">
                If you believe this is an error or need help finding a specific property, 
                our team is here to assist you.
              </p>
              <Link href="/contact" data-testid="link-contact">
                <div className="inline-flex items-center text-accent hover:text-accent/80 font-medium text-body transition-colors">
                  Contact Our Team →
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
