export type Certification = {
  title: string;
  issuer: string;
  issueDate: string;
  credentialUrl?: string;
  credentialId?: string;
  image?: string;
  skills?: string[];
  description?: string;
  status?: string;
  category?: string;
};

const certificationsData: Certification[] = [
  {
    title: "Certificate of Excellence — Rank 1 (1st Year)",
    issuer: "Lokmanya Tilak College of Engineering",
    issueDate: "2023 – 2024",
    credentialUrl: "/images/certifications/ltce-rank-1-first-year.jpg",
    credentialId: "LTCE-FE-RANK-1",
    image: "/images/certifications/ltce-rank-1-first-year.jpg",
    status: "Rank 1",
    category: "Academic",
    skills: ["Rank 1", "Academic Excellence", "CSE (AI & ML)"],
    description: "Awarded Certificate of Excellence for securing the 1st Rank (Position I) in First Year Engineering (FE) in Computer Science & Engineering (AI & ML).",
  },
  {
    title: "Certificate of Excellence — Rank 1 (2nd Year)",
    issuer: "Lokmanya Tilak College of Engineering",
    issueDate: "2024 – 2025",
    credentialUrl: "/images/certifications/ltce-rank-1-second-year.jpg",
    credentialId: "LTCE-SE-RANK-1",
    image: "/images/certifications/ltce-rank-1-second-year.jpg",
    status: "Rank 1",
    category: "Academic",
    skills: ["Rank 1", "Academic Excellence", "CSE (AI & ML)"],
    description: "Awarded Certificate of Excellence for securing the 1st Rank (Position I) in Second Year Engineering (SE) in Computer Science & Engineering (AI & ML).",
  },
  {
    title: "Deep Learning Specialization",
    issuer: "DeepLearning.AI",
    issueDate: "2024",
    credentialUrl: "https://coursera.org/verify/specialization",
    credentialId: "DLAI-DL-83921",
    image: "/images/certifications/deep-learning-ai.svg",
    status: "Verified",
    category: "Deep Learning",
    skills: ["Deep Learning", "PyTorch", "Transformers"],
    description: "Mastery of neural network architectures, backpropagation, convolutional networks, transformers, and deep learning parameter optimization.",
  },
  {
    title: "Generative AI with Large Language Models",
    issuer: "DeepLearning.AI & AWS",
    issueDate: "2024",
    credentialUrl: "https://coursera.org/verify",
    credentialId: "AWS-GENAI-44910",
    image: "/images/certifications/generative-ai-llm.svg",
    status: "Verified",
    category: "GenAI",
    skills: ["LLMs", "Fine-Tuning", "PEFT / LoRA"],
    description: "End-to-end LLM lifecycle from pre-training fundamentals to PEFT/LoRA parameter-efficient fine-tuning, RLHF alignment, and reasoning agents.",
  },
  {
    title: "Multi-Agent Systems with LangGraph",
    issuer: "DeepLearning.AI",
    issueDate: "2025",
    credentialUrl: "https://learn.deeplearning.ai",
    credentialId: "LANG-GRAPH-0284",
    image: "/images/certifications/langgraph-agents.svg",
    status: "Verified",
    category: "AI Agents",
    skills: ["LangGraph", "AI Agents", "MCP"],
    description: "Designing cyclical agent workflows, memory systems, human-in-the-loop validation, and distributed multi-agent architectures.",
  },
  {
    title: "Vector Search & Production RAG Pipelines",
    issuer: "Qdrant Academy",
    issueDate: "2025",
    credentialUrl: "https://academy.qdrant.tech",
    credentialId: "QDRANT-RAG-9912",
    image: "/images/certifications/vector-search-qdrant.svg",
    status: "Verified",
    category: "RAG",
    skills: ["Qdrant", "Vector DB", "Production RAG"],
    description: "Architecting high-throughput semantic search engines, dense vector indexing, payload filtering, and sub-second latency retrieval pipelines.",
  },
  {
    title: "AWS Certified Machine Learning – Specialty",
    issuer: "Amazon Web Services",
    issueDate: "2024",
    credentialUrl: "https://aws.amazon.com/verification",
    credentialId: "AWS-MLS-72018",
    image: "/images/certifications/aws-machine-learning.svg",
    status: "Verified",
    category: "Cloud ML",
    skills: ["AWS", "Amazon SageMaker", "MLOps"],
    description: "Enterprise ML architecture, feature engineering, distributed training, SageMaker inference endpoints, and automated monitoring.",
  },
  {
    title: "Certificate of Achievement — 3rd Position",
    issuer: "Universal AI University · UAi Hawkathon 2026",
    issueDate: "May 2026",
    credentialUrl: "/images/certifications/uai-hawkathon-certificate.jpg",
    credentialId: "UAI-HAWK-3RD",
    image: "/images/certifications/uai-hawkathon-certificate.jpg",
    status: "3rd Place",
    category: "Deep Learning",
    skills: ["Vision Transformers", "Semantic Segmentation", "Deep Learning"],
    description: "Secured 3rd Position at UAi Hawkathon 2026 for demonstrating exceptional innovation, technical excellence, and outstanding teamwork.",
  },
];

export default certificationsData;
