export type Service = {
  id: string;
  title: string;
  tag: string;
  description: string;
  deliverables: string[];
  icon: string;
  image?: string;
};

const servicesData: Service[] = [
  {
    id: "ai-consulting",
    title: "AI Consulting",
    tag: "Strategy and ROI",
    description:
      "Find out where AI agents will save you the most time and money, before you spend on building.",
    deliverables: [
      "Review of your current processes and tools",
      "Top 3 to 5 agent opportunities, ranked by ROI",
      "Risk, cost, and timeline estimates",
      "A clear roadmap you can act on",
    ],
    icon: "Compass",
    image: "/images/services/ai-consulting.jpg",
  },
  {
    id: "ai-agents",
    title: "AI Agents",
    tag: "Autonomous Systems",
    description:
      "One working AI agent that handles a real task in your business, such as support, lead qualification, or invoice processing.",
    deliverables: [
      "Agent that plans, decides, and uses your tools",
      "Connected to your CRM, email, database, or Slack",
      "Human approval for sensitive actions",
      "Fixed scope and fixed price",
    ],
    icon: "Bot",
    image: "/images/services/ai-agents.jpg",
  },
  {
    id: "rag-systems",
    title: "RAG Systems",
    tag: "Knowledge Retrieval",
    description:
      "An assistant that answers questions from your own documents, wikis, and data, with sources shown.",
    deliverables: [
      "Ingests PDFs, docs, websites, and databases",
      "Accurate, grounded answers that cite sources",
      "Works for staff, customers, or both",
      "Permission-aware access to sensitive files",
    ],
    icon: "Database",
    image: "/images/services/rag-systems.jpg",
  },
  {
    id: "evaluation-security",
    title: "Evaluation & Security",
    tag: "Auditing & Guardrails",
    description:
      "Already have an AI agent that fails unpredictably or worries your IT team? We find out why and fix it.",
    deliverables: [
      "Test suite measuring real success rates",
      "Failure analysis and prioritized fix list",
      "Prompt-injection and data-leak testing",
      "Guardrails and permission controls",
    ],
    icon: "ShieldCheck",
    image: "/images/services/evaluation-security.jpg",
  },
  {
    id: "llmops-deployment",
    title: "LLMOps & Deployment",
    tag: "Production Scale",
    description:
      "Turn a working demo into a system your team can trust and your IT department will approve.",
    deliverables: [
      "Cloud deployment (AWS, Azure, or GCP)",
      "Monitoring, tracing, and cost tracking",
      "Access controls and audit logs",
      "Documentation and team handover",
    ],
    icon: "Cloud",
    image: "/images/services/llmops-deployment.jpg",
  },
  {
    id: "observability-monitoring",
    title: "Observability & Monitoring",
    tag: "Continuous Reliability",
    description:
      "Keep your agents accurate, safe, and affordable as your business and the AI models change.",
    deliverables: [
      "Monthly performance and quality reports",
      "Prompt, model, and tool updates",
      "Cost optimization and issue fixes",
      "Small new features every month",
    ],
    icon: "Activity",
    image: "/images/services/observability-monitoring.jpg",
  },
];

export default servicesData;
