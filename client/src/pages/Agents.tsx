import { useQuery } from "@tanstack/react-query";
import { Agent } from "@shared/schema";
import { Mail, Phone, Linkedin, Users, ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";

type AgentWithImageUrl = Agent & { imageUrl?: string | null };

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const Agents = () => {
  const [, setLocation] = useLocation();
  const { data: agents, isLoading } = useQuery<AgentWithImageUrl[]>({
    queryKey: ["/api/agents"]
  });

  const navigateToAgent = (agentId: string) => {
    scrollToTop();
    setLocation(`/agents/${agentId}`);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950" data-testid="agents-page">
      {/* Streamlined Hero - Mobile First */}
      <section className="py-16 lg:py-24 bg-white dark:bg-neutral-950" data-testid="agents-hero">
        <div className="executive-container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block border border-neutral-300 dark:border-neutral-600 px-3 py-1 text-xs font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-widest mb-6 rounded">
              Expert Team
            </div>
            
            <h1 className="text-3xl md:text-5xl font-display text-neutral-900 dark:text-neutral-100 mb-6">
              Manhattan Real Estate
              <span className="block text-accent">Experts</span>
            </h1>
            
            <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto">
              Connect with our experienced professionals for personalized guidance on Manhattan's luxury real estate market.
            </p>
          </div>
        </div>
      </section>

      {/* Agent Directory - Grid Focus */}
      <section className="py-16 bg-neutral-50 dark:bg-neutral-900" data-testid="agent-directory">
        <div className="executive-container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-display text-neutral-900 dark:text-neutral-100 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              Direct access to Manhattan's real estate experts
            </p>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="executive-card p-6 animate-pulse" data-testid={`agent-skeleton-${i}`}>
                  <div className="w-16 h-16 bg-neutral-200 dark:bg-neutral-700 rounded-full mb-4"></div>
                  <div className="h-5 bg-neutral-200 dark:bg-neutral-700 rounded mb-2"></div>
                  <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded mb-4 w-2/3"></div>
                  <div className="h-10 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
                </div>
              ))}
            </div>
          ) : agents && agents.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {agents.map((agent) => (
                <div 
                  key={agent.id} 
                  onClick={() => navigateToAgent(agent.id)}
                  className="executive-card p-4 group hover:border-accent/30 hover:shadow-xl transition-all duration-300 cursor-pointer text-center flex flex-col h-80" 
                  data-testid={`agent-card-${agent.id}`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && navigateToAgent(agent.id)}
                >
                  {/* Profile Image - Square - Takes up 3/4 of box */}
                  <div className="flex justify-center flex-1 mb-3">
                    {agent.imageUrl ? (
                      <div className="w-48 h-48 rounded-lg overflow-hidden border-2 border-neutral-100 dark:border-neutral-800 group-hover:border-accent/30 transition-all duration-300 shadow-md group-hover:shadow-lg">
                        <img 
                          src={agent.imageUrl} 
                          alt={agent.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.parentElement?.classList.add('hidden');
                            const fallback = document.getElementById(`fallback-${agent.id}`);
                            if (fallback) fallback.classList.remove('hidden');
                          }}
                        />
                      </div>
                    ) : null}
                    <div 
                      id={`fallback-${agent.id}`}
                      className={`w-48 h-48 bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg flex items-center justify-center border-2 border-neutral-100 dark:border-neutral-800 group-hover:border-accent/30 transition-all duration-300 shadow-md group-hover:shadow-lg ${agent.imageUrl ? 'hidden' : ''}`}
                    >
                      <Users className="w-12 h-12 text-accent" />
                    </div>
                  </div>

                  {/* Agent Info - Takes up 1/4 of box */}
                  <div>
                    <h3 className="text-lg font-display text-neutral-900 dark:text-neutral-100 mb-1 group-hover:text-accent transition-colors">
                      {agent.name}
                    </h3>
                    {agent.title && (
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium uppercase tracking-wide">
                        {agent.title}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="executive-card text-center py-16">
              <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-8">
                <Users className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-display text-neutral-900 dark:text-neutral-100 mb-4">
                Team Directory Coming Soon
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                Contact our main office for immediate assistance
              </p>
              <Link href="/contact" onClick={scrollToTop}>
                <Button data-testid="contact-office-button">
                  Contact Our Office
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Quick Contact CTA */}
      <section className="py-16 bg-accent text-white" data-testid="agents-cta">
        <div className="executive-container text-center">
          <h2 className="text-2xl md:text-4xl font-display mb-4">
            Ready to Connect?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Get personalized guidance from Manhattan's real estate experts
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" onClick={scrollToTop}>
              <Button size="lg" variant="secondary" className="w-full sm:w-auto text-accent hover:text-accent/90" data-testid="contact-cta">
                Schedule Consultation
                <MessageCircle className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/services" onClick={scrollToTop}>
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-accent" data-testid="services-cta">
                View Services
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
          
          <div className="mt-8 text-sm opacity-75">
            <span>Direct: (212) 555-0000</span>
            <span className="mx-4">•</span>
            <span>info@bravadore.com</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Agents;