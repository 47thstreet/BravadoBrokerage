import { Link } from "wouter";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import BRELogo from "@/components/BRELogo";

const Footer = () => {
  return (
    <footer className="bg-black text-white" data-testid="footer">
      <div className="executive-container py-16">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          {/* Logo Section - Takes 4 columns, pushing content right */}
          <div className="lg:col-span-4 flex items-start">
            <BRELogo height="h-40" />
          </div>
          
          {/* Company Section */}
          <div className="lg:col-span-2">
            <h4 className="font-display text-body-lg text-white mb-6"><span className="text-red-600 mr-1">|</span>Company</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-body-sm text-white hover:text-accent transition-colors" data-testid="footer-link-about">About Us</Link></li>
              <li><Link href="/agents" className="text-body-sm text-white hover:text-accent transition-colors" data-testid="footer-link-team">Our team</Link></li>
              <li><Link href="/services" className="text-body-sm text-white hover:text-accent transition-colors" data-testid="footer-link-services">Services</Link></li>
              <li><Link href="/contact" className="text-body-sm text-white hover:text-accent transition-colors" data-testid="footer-link-media">Media Inquiries</Link></li>
            </ul>
          </div>
          
          {/* Explore Section */}
          <div className="lg:col-span-2">
            <h4 className="font-display text-body-lg text-white mb-6"><span className="text-red-600 mr-1">|</span>Explore</h4>
            <ul className="space-y-3">
              <li><Link href="/markets" className="text-body-sm text-white hover:text-accent transition-colors" data-testid="footer-link-markets">Markets</Link></li>
              <li><Link href="/subscription" className="text-body-sm text-white hover:text-accent transition-colors" data-testid="footer-link-subscribe">Subscribe</Link></li>
            </ul>
          </div>
          
          {/* Contact Section */}
          <div className="lg:col-span-2">
            <h4 className="font-display text-body-lg text-white mb-6"><span className="text-red-600 mr-1">|</span>Contact</h4>
            <ul className="space-y-3">
              <li><Link href="/agents" className="text-body-sm text-white hover:text-accent transition-colors" data-testid="footer-find-agent-link">Find an Agent</Link></li>
              <li><Link href="/contact" className="text-body-sm text-white hover:text-accent transition-colors" data-testid="footer-contact-link">Contact Us</Link></li>
              <li><Link href="/admin" className="text-body-sm text-white hover:text-accent transition-colors" data-testid="footer-agent-login-link">Agent Log In</Link></li>
            </ul>
          </div>
          
          {/* Social Section */}
          <div className="lg:col-span-2">
            <h4 className="font-display text-body-lg text-white mb-6"><span className="text-red-600 mr-1">|</span>Follow</h4>
            <div className="flex space-x-4">
              <button className="text-white hover:text-accent transition-colors" data-testid="social-facebook">
                <Facebook className="h-5 w-5" />
              </button>
              <button className="text-white hover:text-accent transition-colors" data-testid="social-instagram">
                <Instagram className="h-5 w-5" />
              </button>
              <button className="text-white hover:text-accent transition-colors" data-testid="social-linkedin">
                <Linkedin className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="border-t border-neutral-800 pt-8 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black px-3">
            <span className="text-red-600 text-lg font-light">|</span>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-body-sm text-neutral-400" data-testid="copyright">&copy; 2018 Bravado Real Estate. All rights reserved.</p>
            <div className="flex space-x-6">
              <button className="text-body-sm text-neutral-400 hover:text-accent transition-colors" data-testid="footer-privacy">Privacy Policy</button>
              <button className="text-body-sm text-neutral-400 hover:text-accent transition-colors" data-testid="footer-terms">Terms of Service</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
