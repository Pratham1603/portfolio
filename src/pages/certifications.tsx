import React, { useState, useMemo } from "react";
import SEO from "@/components/SEO";
import { siteConfig } from "@/config/site.config";
import certificationsData, { Certification } from "@/data/certificationsData";
import CertificateCard from "@/components/Certifications/CertificateCard";
import { Search } from "lucide-react";

const CATEGORIES = [
  "All",
  "AI Agents",
  "RAG",
  "GenAI",
  "Deep Learning",
  "Cloud ML",
] as const;
type Category = typeof CATEGORIES[number];

const CertificationsPage = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCerts = useMemo(() => {
    return certificationsData.filter((cert) => {
      // Category filter
      if (activeCategory !== "All") {
        const cat = activeCategory.toLowerCase();
        const categoryMatch = cert.category?.toLowerCase() === cat;
        const tagMatch = cert.skills?.some(
          (s) => s.toLowerCase() === cat || s.toLowerCase().includes(cat)
        );
        const aliasMatch =
          (cat === "genai" && (cert.title.toLowerCase().includes("generative") || cert.skills?.some((s) => s.toLowerCase().includes("llm")))) ||
          (cat === "rag" && (cert.title.toLowerCase().includes("rag") || cert.skills?.some((s) => s.toLowerCase().includes("rag")))) ||
          (cat === "ai agents" && (cert.title.toLowerCase().includes("agent") || cert.skills?.some((s) => s.toLowerCase().includes("agent")))) ||
          (cat === "deep learning" && (cert.title.toLowerCase().includes("deep learning") || cert.skills?.some((s) => s.toLowerCase().includes("vision")))) ||
          (cat === "cloud ml" && (cert.title.toLowerCase().includes("aws") || cert.skills?.some((s) => s.toLowerCase().includes("aws"))));

        if (!categoryMatch && !tagMatch && !aliasMatch) return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const titleMatch = cert.title.toLowerCase().includes(q);
        const issuerMatch = cert.issuer.toLowerCase().includes(q);
        const descMatch = cert.description?.toLowerCase().includes(q);
        const skillMatch = cert.skills?.some((s) => s.toLowerCase().includes(q));

        return titleMatch || issuerMatch || descMatch || skillMatch;
      }

      return true;
    });
  }, [activeCategory, searchQuery]);

  return (
    <>
      <SEO
        title="Certifications"
        description={`Licenses and technical certifications earned by ${siteConfig.name}.`}
        keywords="certifications, credentials, licenses, AI, machine learning, Python, Deep Learning, RAG, LangGraph"
        canonicalPath="/certifications"
      />
      <div className="max-w-5xl mx-auto space-y-6 md:space-y-8">
        {/* Page Header */}
        <div className="space-y-1.5">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Certifications
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
            Verified credentials, licenses, and technical certifications
          </p>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1">
          {/* Category Pills */}
          <div className="flex items-center gap-1.5 flex-wrap z-10">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-neutral-900 text-white dark:bg-white dark:text-black shadow-xs"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900 dark:bg-neutral-800/80 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64 z-10">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500 pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search certifications..."
              className="w-full pl-9 pr-8 py-1.5 text-xs bg-white dark:bg-[#141417] border border-neutral-300/80 dark:border-neutral-700 rounded-full text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-neutral-500 dark:focus:border-neutral-400 shadow-2xs transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 text-xs cursor-pointer"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Certifications Grid */}
        {filteredCerts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCerts.map((cert, index) => (
              <CertificateCard
                key={cert.title}
                item={cert}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-neutral-300 dark:border-neutral-800 bg-neutral-200/50 dark:bg-[#121215] p-12 text-center space-y-3">
            <h3 className="font-semibold text-base text-neutral-800 dark:text-white">
              No certifications found
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-md mx-auto">
              No certifications matched your active filter or search query. Try clearing your search.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
              }}
              className="px-4 py-1.5 text-xs bg-neutral-900 dark:bg-white text-white dark:text-black font-medium rounded-md hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CertificationsPage;
