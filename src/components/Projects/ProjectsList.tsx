import React, { useState, useMemo } from 'react';
import ProjectCard from "@/components/Projects/ProjectCard";
import { Project } from "@/types/project";
import { Search } from 'lucide-react';

const CATEGORIES = [
  "All",
  "AI Agents",
  "RAG",
  "GenAI",
  "Production",
  "Built from Scratch",
] as const;
type Category = typeof CATEGORIES[number];

type ProjectsListProps = {
  posts: Project[];
  minimized?: boolean;
};

const ProjectsList = ({ posts = [], minimized = false }: ProjectsListProps) => {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    return posts
      .filter((post) => !post.hidden)
      .filter((post) => {
        // Category filter
        if (activeCategory !== "All") {
          const categoryMatch =
            post.category?.toLowerCase() === activeCategory.toLowerCase();
          const tagMatch = post.tags?.some(
            (t) => t.toLowerCase() === activeCategory.toLowerCase()
          );
          if (!categoryMatch && !tagMatch) {
            return false;
          }
        }

        // Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const titleMatch = post.title?.toLowerCase().includes(q);
          const descMatch = post.description?.toLowerCase().includes(q);
          const highlightMatch = post.highlight?.toLowerCase().includes(q);
          const tagMatch = post.tags?.some((t) => t.toLowerCase().includes(q));

          return titleMatch || descMatch || highlightMatch || tagMatch;
        }

        return true;
      });
  }, [posts, activeCategory, searchQuery]);

  if (minimized) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.slice(0, 4).map((post, index) => (
          <ProjectCard
            key={post.slug}
            index={index}
            item={post}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 md:space-y-8">
      {/* Page Header */}
      <div className="space-y-1.5">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white">
          Projects
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
          Playground - Small MVP to Production Apps
        </p>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
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
        <div className="relative w-full sm:w-60 md:w-72">
          <Search
            size={14}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500 pointer-events-none"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects"
            className="w-full pl-9 pr-8 py-1.5 bg-neutral-50 hover:bg-neutral-100/60 focus:bg-white dark:bg-[#141417] dark:hover:bg-[#18181c] dark:focus:bg-[#18181c] text-xs text-neutral-800 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 rounded-full border border-neutral-200/90 dark:border-neutral-700 focus:outline-none focus:ring-1 focus:ring-neutral-400 dark:focus:ring-neutral-500 transition-all"
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

      {/* Projects Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
          {filteredPosts.map((post, index) => (
            <ProjectCard
              key={post.slug}
              index={index}
              item={post}
            />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center space-y-2">
          <p className="text-sm font-medium text-neutral-800 dark:text-white">
            No projects found
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Try adjusting your search or category filter.
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveCategory("All");
              setSearchQuery("");
            }}
            className="mt-2 text-xs font-medium text-neutral-900 dark:text-white underline cursor-pointer"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectsList;
