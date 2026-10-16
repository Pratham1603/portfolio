import { Experience } from "@/types";

const experiencesData: Experience[] = [
  {
    date: "May 2026",
    title: "UAI Hawkathon 2026",
    role: "UAI Hawkathon 2026",
    companyName: "Semantic Scene Segmentation",
    logo: "/images/experience/uai-hawkathon-logo.png",
    description: "Secured <strong class=\"font-semibold text-neutral-900\">3rd place</strong> at UAI Hawkathon 2026 by developing an AI-powered off-road semantic scene segmentation system.",
    techStack: ["Python", "Computer Vision", "Vision Transformers", "Deep Learning", "Semantic Segmentation"],
    proofLink: "https://www.linkedin.com/feed/update/urn:li:activity:7453473278272094208/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE_tu0MBLx8jtKoJunk5JZit9m5-A-spB9Q",
    points: [
      "Built a Vision Transformer-based solution using synthetic data to interpret complex off-road environments.",
      "Achieved 79.4% pixel accuracy and 0.412 IoU with real-time segmentation visualization.",
      "Collaborated on an end-to-end AI pipeline covering model training, evaluation, and deployment.",
    ],
  },
  {
    date: "Dec 2025 - Mar 2026",
    title: "Generative AI Engineer",
    role: "Generative AI Engineer",
    companyName: "Jio Platforms Limited (JPL)",
    logo: "/images/experience/jio-logo.png",
    description: "<strong class=\"font-semibold text-neutral-900\">Production RAG</strong> & Intelligent Systems - Building scalable retrieval-augmented generation systems with low-latency search and reliable AI responses.",
    techStack: ["Python", "FastAPI", "Qdrant", "GPT-4", "RAG", "Embeddings"],
    proofLink: "https://www.linkedin.com/in/pratham-harer-143112315/details/experience/",
    points: [
      "Engineered production RAG pipelines using Qdrant, GPT-4, and text-embedding-3.",
      "Processed 25,000 daily queries with under 0.8-second latency.",
      "Improved customer satisfaction from 3.2 to 4.6/5.0, delivering $600K–$800K annual impact.",
    ],
  },
];

export default experiencesData;
