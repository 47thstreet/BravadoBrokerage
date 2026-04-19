import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool, neonConfig } from "@neondatabase/serverless";
import { properties, agents } from "../shared/schema";
import ws from "ws";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required but not set");
}

// Configure WebSocket for Node.js environment
neonConfig.webSocketConstructor = ws;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

// Seed realistic Manhattan properties
const seedAgents = [
  {
    id: "agent-1",
    name: "Michael Chen",
    title: "Senior Real Estate Advisor",
    email: "mchen@bravadorealestate.com",
    phone: "(212) 555-0123",
    bio: "With over 15 years of experience in Manhattan luxury real estate, Michael specializes in high-end residential properties and has completed over $500M in transactions.",
    experience: "15+ years",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    specialties: ["Luxury Condos", "Investment Properties", "New Developments"]
  },
  {
    id: "agent-2",
    name: "Sarah Martinez",
    title: "Commercial Real Estate Director",
    email: "smartinez@bravadorealestate.com",
    phone: "(212) 555-0124",
    bio: "Sarah leads our commercial division with expertise in retail spaces, office buildings, and mixed-use developments across Manhattan.",
    experience: "12+ years",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    specialties: ["Retail Spaces", "Office Buildings", "Mixed-Use"]
  },
  {
    id: "agent-3",
    name: "James Thompson",
    title: "Residential Specialist",
    email: "jthompson@bravadorealestate.com",
    phone: "(212) 555-0125",
    bio: "James focuses on helping families find their perfect home in Manhattan's most desirable neighborhoods.",
    experience: "8+ years",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    specialties: ["Family Homes", "Townhouses", "Rentals"]
  }
];

const seedProperties = [
  // Luxury Residential Sales
  {
    id: "prop-1",
    title: "Stunning Tribeca Penthouse with Panoramic Views",
    description: "Extraordinary 4-bedroom penthouse in the heart of Tribeca featuring floor-to-ceiling windows, private terrace, and breathtaking city views. This architectural masterpiece offers 3,500 sq ft of luxury living space with premium finishes throughout.",
    priceType: "sale",
    price: 8950000,
    propertyType: "residential",
    subType: "condo",
    bedrooms: 4,
    bathrooms: 4,
    squareFootage: 3500,
    address: "123 Franklin Street",
    neighborhood: "Tribeca",
    borough: "Manhattan",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=1200&h=800&fit=crop"
    ],
    features: ["Doorman", "Gym", "Roof Deck", "Storage", "Bike Room"],
    featured: true,
    agentId: "agent-1"
  },
  {
    id: "prop-2",
    title: "Upper West Side Classic Pre-War Residence",
    description: "Charming 3-bedroom pre-war apartment with original details, high ceilings, and elegant living spaces. Located on a tree-lined street near Central Park.",
    priceType: "sale",
    price: 2750000,
    propertyType: "residential",
    subType: "coop",
    bedrooms: 3,
    bathrooms: 2,
    squareFootage: 1850,
    address: "456 West End Avenue",
    neighborhood: "Upper West Side",
    borough: "Manhattan",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=800&fit=crop"
    ],
    features: ["Doorman", "Elevator", "Storage"],
    featured: true,
    agentId: "agent-1"
  },
  {
    id: "prop-3",
    title: "Chelsea Townhouse with Private Garden",
    description: "Rare 5-bedroom townhouse featuring original architectural details, modern amenities, and a stunning private garden. Perfect for families seeking space and elegance.",
    priceType: "sale",
    price: 12500000,
    propertyType: "residential",
    subType: "townhouse",
    bedrooms: 5,
    bathrooms: 5,
    squareFootage: 4200,
    address: "789 West 22nd Street",
    neighborhood: "Chelsea",
    borough: "Manhattan",
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1200&h=800&fit=crop"
    ],
    features: ["Private Garden", "Fireplace", "Central AC", "Washer/Dryer"],
    featured: true,
    agentId: "agent-3"
  },
  // Residential Rentals
  {
    id: "prop-4",
    title: "Modern SoHo Loft with Exposed Brick",
    description: "Spacious 2-bedroom loft featuring 12-foot ceilings, exposed brick walls, and oversized windows. Located in the heart of SoHo's cast-iron district.",
    priceType: "rent",
    price: 8500,
    propertyType: "residential",
    subType: "loft",
    bedrooms: 2,
    bathrooms: 2,
    squareFootage: 1600,
    address: "321 Spring Street",
    neighborhood: "SoHo",
    borough: "Manhattan",
    images: [
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&h=800&fit=crop"
    ],
    features: ["Washer/Dryer", "Dishwasher", "Central AC"],
    featured: false,
    agentId: "agent-3"
  },
  {
    id: "prop-5",
    title: "Financial District Luxury Studio",
    description: "Brand new studio in a modern high-rise with concierge service, gym, and stunning harbor views. Perfect for professionals.",
    priceType: "rent",
    price: 3200,
    propertyType: "residential",
    subType: "condo",
    bedrooms: 0,
    bathrooms: 1,
    squareFootage: 550,
    address: "100 Wall Street",
    neighborhood: "Financial District",
    borough: "Manhattan",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=800&fit=crop"
    ],
    features: ["Doorman", "Gym", "Roof Deck", "Concierge"],
    featured: false,
    agentId: "agent-1"
  },
  {
    id: "prop-6",
    title: "East Village 1-Bedroom Apartment",
    description: "Charming 1-bedroom in a walk-up building with updated kitchen and bathroom. Great neighborhood with restaurants and nightlife.",
    priceType: "rent",
    price: 3800,
    propertyType: "residential",
    subType: "apartment",
    bedrooms: 1,
    bathrooms: 1,
    squareFootage: 750,
    address: "45 Avenue B",
    neighborhood: "East Village",
    borough: "Manhattan",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop"
    ],
    features: ["Washer/Dryer in Building", "Pets Allowed"],
    featured: false,
    agentId: "agent-3"
  },
  // Commercial Properties
  {
    id: "prop-7",
    title: "Prime Retail Space on Fifth Avenue",
    description: "Exceptional ground-floor retail opportunity on Fifth Avenue. High foot traffic, excellent visibility, perfect for flagship stores or showrooms.",
    priceType: "sale",
    price: 15000000,
    propertyType: "commercial",
    subType: "retail",
    bedrooms: 0,
    bathrooms: 2,
    squareFootage: 3000,
    address: "555 Fifth Avenue",
    neighborhood: "Midtown",
    borough: "Manhattan",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&h=800&fit=crop"
    ],
    features: ["High Ceilings", "Corner Location", "Large Windows"],
    featured: true,
    agentId: "agent-2"
  },
  {
    id: "prop-8",
    title: "Boutique Office Building in Hudson Yards",
    description: "Modern 10-story office building with state-of-the-art infrastructure, flexible floor plans, and panoramic city views. Ideal for tech companies or corporate headquarters.",
    priceType: "sale",
    price: 45000000,
    propertyType: "commercial",
    subType: "office",
    bedrooms: 0,
    bathrooms: 20,
    squareFootage: 50000,
    address: "30 Hudson Boulevard",
    neighborhood: "Hudson Yards",
    borough: "Manhattan",
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&h=800&fit=crop"
    ],
    features: ["24/7 Security", "Conference Facilities", "Parking", "High-Speed Internet"],
    featured: true,
    agentId: "agent-2"
  },
  {
    id: "prop-9",
    title: "Restaurant Space in Greenwich Village",
    description: "Turnkey restaurant space with full kitchen, dining area for 80 guests, and outdoor seating. Excellent location with established foot traffic.",
    priceType: "rent",
    price: 18000,
    propertyType: "commercial",
    subType: "restaurant",
    bedrooms: 0,
    bathrooms: 4,
    squareFootage: 2500,
    address: "123 MacDougal Street",
    neighborhood: "Greenwich Village",
    borough: "Manhattan",
    images: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=800&fit=crop"
    ],
    features: ["Full Kitchen", "Liquor License", "Outdoor Seating", "Ventilation"],
    featured: false,
    agentId: "agent-2"
  },
  {
    id: "prop-10",
    title: "Midtown Office Suite",
    description: "Professional office suite with reception area, conference room, and 5 private offices. Ready for immediate occupancy.",
    priceType: "rent",
    price: 12000,
    propertyType: "commercial",
    subType: "office",
    bedrooms: 0,
    bathrooms: 2,
    squareFootage: 2000,
    address: "350 Park Avenue",
    neighborhood: "Midtown",
    borough: "Manhattan",
    images: [
      "https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?w=1200&h=800&fit=crop"
    ],
    features: ["24/7 Access", "High-Speed Internet", "Conference Room"],
    featured: false,
    agentId: "agent-2"
  }
];

async function seed() {
  console.log("Starting database seed...");
  
  try {
    // Seed agents first
    console.log("Seeding agents...");
    for (const agent of seedAgents) {
      await db.insert(agents).values(agent).onConflictDoNothing();
    }
    console.log(`✓ Seeded ${seedAgents.length} agents`);
    
    // Seed properties
    console.log("Seeding properties...");
    for (const property of seedProperties) {
      await db.insert(properties).values(property).onConflictDoNothing();
    }
    console.log(`✓ Seeded ${seedProperties.length} properties`);
    
    console.log("Database seed completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  } finally {
    await pool.end();
  }
}

seed();
