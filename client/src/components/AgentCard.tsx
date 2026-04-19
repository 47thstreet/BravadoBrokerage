import { Agent } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, Linkedin } from "lucide-react";

interface AgentCardProps {
  agent: Agent;
}

const AgentCard = ({ agent }: AgentCardProps) => {
  return (
    <div className="executive-card group hover:shadow-xl transition-all duration-300" data-testid={`agent-card-${agent.id}`}>
      <div className="relative overflow-hidden">
        <img 
          src={agent.image} 
          alt={agent.name} 
          className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300" 
          data-testid={`agent-image-${agent.id}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/20 via-transparent to-transparent"></div>
      </div>
      
      <div className="p-8">
        <h3 className="font-display text-body-xl text-neutral-900 dark:text-neutral-100 mb-3" data-testid={`agent-name-${agent.id}`}>
          {agent.name}
        </h3>
        <p className="text-accent font-medium mb-4 text-body-md" data-testid={`agent-title-${agent.id}`}>
          {agent.title}
        </p>
        <p className="text-neutral-600 dark:text-neutral-400 text-body-sm mb-6" data-testid={`agent-experience-${agent.id}`}>
          {agent.experience}
        </p>
        
        <div className="hairline-top pt-6">
          <div className="flex justify-center space-x-6">
            <button 
              className="text-neutral-400 dark:text-neutral-400 hover:text-accent transition-colors duration-300"
              data-testid={`agent-email-${agent.id}`}
            >
              <Mail className="h-5 w-5" />
            </button>
            <button 
              className="text-neutral-400 dark:text-neutral-400 hover:text-accent transition-colors duration-300"
              data-testid={`agent-phone-${agent.id}`}
            >
              <Phone className="h-5 w-5" />
            </button>
            {agent.linkedinUrl && (
              <button 
                className="text-neutral-400 dark:text-neutral-400 hover:text-accent transition-colors duration-300"
                data-testid={`agent-linkedin-${agent.id}`}
              >
                <Linkedin className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentCard;
