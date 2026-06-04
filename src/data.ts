import { ServiceDetail, WorkProcessStep, ClientReview } from "./types";

export const SERVICES_DATA: ServiceDetail[] = [
  {
    id: "automation",
    name: "Automation",
    shortDesc: "Streamline workflows, reduce human error, and scale operational tasks 10x faster.",
    longDesc: "We design and deploy robust robotic process automation (RPA), API integrations, and custom workflow pipelines that save thousands of workforce hours annually.",
    iconName: "Cpu",
    features: [
      "Robotic Process Automation (RPA)",
      "Legacy & API System Integration",
      "Database & Report Automation",
      "Custom Workflow Pipelines"
    ],
    techStack: ["Make", "Zapier", "Python", "Node.js", "Airflow"],
    accentColor: "from-blue-600 to-indigo-500"
  },
  {
    id: "ai-agent",
    name: "AI Agent",
    shortDesc: "Empower your business with intelligent LLM-driven autonomous agents.",
    longDesc: "From custom corporate knowledge-base chatbots to autonomous execution agents, we build tailored intelligent agents that streamline customer support and drive insights.",
    iconName: "Bot",
    features: [
      "Custom RAG-based Chatbots",
      "Autonomous Decision Agents",
      "Dynamic Intent Classification",
      "Voice & Multimodal Agents"
    ],
    techStack: ["Gemini API", "LangChain", "OpenAI API", "Vector DBs"],
    accentColor: "from-purple-600 to-pink-500"
  },
  {
    id: "software-development",
    name: "Software Development",
    shortDesc: "Architect high-performance web, mobile, and custom enterprise platforms.",
    longDesc: "Our elite engineers build scalable, reliable, and secure web and mobile architectures designed to adapt to your enterprise's scaling demands with ease.",
    iconName: "Code",
    features: [
      "Responsive Web Applications",
      "Native & Cross-Platform Mobile Apps",
      "Scalable Microservices Backends",
      "Cloud Infrastructure Architecture"
    ],
    techStack: ["React / Vite", "Next.js", "Node.js", "PostgreSQL", "AWS / GCP"],
    accentColor: "from-emerald-600 to-teal-500"
  },
  {
    id: "digital-marketing",
    name: "Digital Marketing",
    shortDesc: "Dominate search engine results and maximize conversion-rate performance.",
    longDesc: "We fuse data analytics with brilliant marketing creative to grow your enterprise organic presence, optimize advertising spend, and skyrocket acquisition metrics.",
    iconName: "TrendingUp",
    features: [
      "SEO & Semantic Content Strategy",
      "Performance PPC Campaign Management",
      "Social Media Growth Strategy",
      "Conversion Rate Optimization (CRO)"
    ],
    techStack: ["Google Analytics", "SEM Rush", "Meta Ads", "HubSpot"],
    accentColor: "from-amber-600 to-orange-500"
  }
];

export const WORK_PROCESS: WorkProcessStep[] = [
  {
    step: "01",
    title: "Discovery & Analysis",
    description: "We dive deep into your workflow bottlenecks, operational data, and target goals to forge a bulletproof engineering roadmap."
  },
  {
    step: "02",
    title: "Prototype & Architecture",
    description: "Our architects model secure proof-of-concepts, user journeys, and robust database models before writing client-facing code."
  },
  {
    step: "03",
    title: "Agile Development",
    description: "We develop in rapid parallel sprints, keeping you fully in the loop with weekly builds, transparent commits, and live previews."
  },
  {
    step: "04",
    title: "Deployment & Support",
    description: "We coordinate production rollouts on secure cloud environments, offering non-stop performance optimization and active maintenance."
  }
];

export const TESTIMONIALS: ClientReview[] = [
  {
    id: "test-1",
    name: "Sophia Martinez",
    role: "VP of Operations",
    company: "NextGen Logistics",
    avatarText: "SM",
    rating: 5,
    content: "The custom automation dashboard cut our operations scheduling time from 4 hours a day to less than 10 minutes. The software development precision is unmatched!"
  },
  {
    id: "test-2",
    name: "Liam Vance",
    role: "Chief Technology Officer",
    company: "Vertex Fintech",
    avatarText: "LV",
    rating: 5,
    content: "Integrating their intelligent AI Agent into our platform solved 72% of customer support tickets within the first week alone. Outstanding engineering and delivery speed."
  },
  {
    id: "test-3",
    name: "Elena Rostova",
    role: "Founder & CEO",
    company: "Lumina Retail",
    avatarText: "ER",
    rating: 5,
    content: "Our organic Google rankings soared 40% in just two months following their Digital Marketing & SEO audit. They understand high-growth businesses and digital strategy deeply."
  }
];
