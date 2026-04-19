import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Agent } from "@shared/schema";
import { Mail, Phone, Linkedin, Users, ArrowLeft, Building2, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

type AgentWithImageUrl = Agent & { imageUrl?: string | null };

const AgentDetail = () => {
  const [, params] = useRoute("/agents/:id");
  const agentId = params?.id;

  const { data: agent, isLoading, error } = useQuery<AgentWithImageUrl>({
    queryKey: ["/api/agents", agentId],
    enabled: !!agentId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-neutral-950 py-16">
        <div className="executive-container">
          <Skeleton className="h-8 w-32 mb-8" />
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <Skeleton className="w-64 h-64 rounded-full mx-auto mb-6" />
              <Skeleton className="h-8 w-48 mx-auto mb-2" />
              <Skeleton className="h-5 w-32 mx-auto mb-4" />
              <Skeleton className="h-10 w-full mb-3" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="lg:col-span-2">
              <Skeleton className="h-6 w-24 mb-4" />
              <Skeleton className="h-32 w-full mb-8" />
              <Skeleton className="h-6 w-32 mb-4" />
              <Skeleton className="h-20 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !agent) {
    return (
      <div className="min-h-screen bg-white dark:bg-neutral-950 py-16">
        <div className="executive-container text-center">
          <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <Users className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-2xl font-display text-neutral-900 dark:text-neutral-100 mb-4">
            Agent Not Found
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            The agent you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/agents">
            <Button data-testid="back-to-agents">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Team
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const specialties: string[] = agent.specialties || [];

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950" data-testid="agent-detail-page">
      <div className="py-8 lg:py-16">
        <div className="executive-container">
          <Link href="/agents" className="inline-flex items-center text-accent hover:text-accent/80 transition-colors mb-8" data-testid="back-to-agents-link">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Team
          </Link>

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <div className="executive-card p-8 text-center sticky top-24">
                {agent.imageUrl ? (
                  <div className="w-48 h-48 rounded-full overflow-hidden mx-auto mb-6 border-4 border-accent/20">
                    <img 
                      src={agent.imageUrl} 
                      alt={agent.name}
                      className="w-full h-full object-cover"
                      data-testid="agent-photo"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const fallback = document.getElementById('agent-photo-fallback');
                        if (fallback) fallback.classList.remove('hidden');
                      }}
                    />
                  </div>
                ) : null}
                <div 
                  id="agent-photo-fallback"
                  className={`w-48 h-48 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 ${agent.imageUrl ? 'hidden' : ''}`}
                >
                  <Users className="w-20 h-20 text-accent" />
                </div>

                <h1 className="text-2xl font-display text-neutral-900 dark:text-neutral-100 mb-2" data-testid="agent-name">
                  {agent.name}
                </h1>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6" data-testid="agent-title">
                  {agent.title}
                </p>

                <div className="space-y-3">
                  {agent.phone && (
                    <a href={`tel:${agent.phone}`} className="block" data-testid="agent-phone-link">
                      <Button className="w-full" size="lg">
                        <Phone className="w-4 h-4 mr-2" />
                        {agent.phone}
                      </Button>
                    </a>
                  )}
                  {agent.email && (
                    <a href={`mailto:${agent.email}`} className="block" data-testid="agent-email-link">
                      <Button variant="outline" className="w-full" size="lg">
                        <Mail className="w-4 h-4 mr-2" />
                        Send Email
                      </Button>
                    </a>
                  )}
                  {agent.linkedinUrl && (
                    <a href={agent.linkedinUrl} target="_blank" rel="noopener noreferrer" className="block" data-testid="agent-linkedin-link">
                      <Button variant="ghost" className="w-full text-neutral-500 hover:text-accent">
                        <Linkedin className="w-4 h-4 mr-2" />
                        View LinkedIn Profile
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="mb-12">
                <h2 className="text-xl font-display text-neutral-900 dark:text-neutral-100 mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-accent" />
                  About
                </h2>
                <div className="executive-card p-6">
                  <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed whitespace-pre-wrap" data-testid="agent-bio">
                    {agent.bio || "No biography available."}
                  </p>
                </div>
              </div>

              {specialties.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-xl font-display text-neutral-900 dark:text-neutral-100 mb-4 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-accent" />
                    Specialties
                  </h2>
                  <div className="executive-card p-6">
                    <div className="flex flex-wrap gap-2" data-testid="agent-specialties">
                      {specialties.map((specialty: string, index: number) => (
                        <span 
                          key={index}
                          className="px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="executive-card p-8 bg-accent/5 border-accent/20">
                <h3 className="text-xl font-display text-neutral-900 dark:text-neutral-100 mb-4">
                  Ready to Work with {agent.name.split(' ')[0]}?
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                  Contact {agent.name.split(' ')[0]} directly or schedule a consultation to discuss your real estate needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contact" className="flex-1">
                    <Button className="w-full" size="lg" data-testid="schedule-consultation">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Schedule Consultation
                    </Button>
                  </Link>
                  <Link href="/listings" className="flex-1">
                    <Button variant="outline" className="w-full" size="lg" data-testid="browse-listings">
                      Browse Listings
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDetail;
