import React, { useState } from 'react';
import Link from 'next/link';
import { Project } from "@/types/project";
import { FollowerPointerCard } from "@/components/ui/following-pointer";
import { motion } from "framer-motion";

const POINTER_COLORS = [
  "#f472b6", // hot pink
  "#38bdf8", // electric blue
  "#34d399", // vivid green
  "#fbbf24", // bright amber
  "#a78bfa", // soft purple
  "#fb923c", // vibrant orange
];

const HOVER_ACTIONS = [
  "View project",
  "Explore project",
  "Check it out",
  "See details",
  "View live",
  "Open project",
];

type ProjectCardProps = {
  item: Project;
  index?: number;
};

const ProjectCard = ({
  item,
  index = 0,
}: ProjectCardProps) => {
  const {
    title,
    description,
    image,
    link,
    status = "active",
    tags = [],
    slug,
    label,
    secondaryLabel,
    secondaryLink,
    highlight,
  } = item;

  const [hoverText, setHoverText] = useState(
    () => HOVER_ACTIONS[index % HOVER_ACTIONS.length]
  );
  const [badgeColor, setBadgeColor] = useState(
    () => POINTER_COLORS[index % POINTER_COLORS.length]
  );

  const handleMouseEnter = () => {
    setHoverText((prev) => {
      const remaining = HOVER_ACTIONS.filter((action) => action !== prev);
      return remaining[Math.floor(Math.random() * remaining.length)];
    });
    setBadgeColor((prev) => {
      const remaining = POINTER_COLORS.filter((color) => color !== prev);
      return remaining[Math.floor(Math.random() * remaining.length)];
    });
  };

  return (
    <Link
      href={`/projects/${slug}`}
      className="block h-full"
      onMouseEnter={handleMouseEnter}
    >
      <FollowerPointerCard
        title={hoverText}
        badgeColor={badgeColor}
        badgeClassName="text-white font-medium px-3 py-1 text-xs shadow-md"
        className="h-full rounded-2xl"
      >
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
          className="group flex flex-col justify-between rounded-2xl bg-neutral-200 dark:bg-[#121215] border border-neutral-300/70 dark:border-neutral-800 p-2.5 sm:p-3 hover:shadow-lg hover:border-neutral-400 dark:hover:border-neutral-700 transition-all cursor-pointer h-full"
        >
          {/* Framed Image Container (Inner Rectangle) */}
          <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl bg-neutral-100 dark:bg-[#18181c] border border-neutral-300/40 dark:border-neutral-800">
            {image ? (
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-200 dark:from-[#18181c] dark:to-[#121215] text-neutral-400 dark:text-neutral-500 font-semibold text-sm">
                {title}
              </div>
            )}
          </div>

          {/* Card Content */}
          <div className="p-2 sm:p-2.5 flex flex-col flex-1 justify-between gap-3">
            <div className="space-y-1.5">
              {/* Title */}
              <h3 className="font-bold text-base sm:text-lg text-neutral-900 dark:text-white group-hover:text-black dark:group-hover:text-white truncate">
                {title}
              </h3>

              {/* Subtitle / Highlight */}
              {highlight && (
                <p className="text-xs font-medium text-neutral-600 dark:text-neutral-400 line-clamp-1">
                  {highlight}
                </p>
              )}

              {/* Description */}
              <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed pt-0.5">
                {description}
              </p>
            </div>

            <div className="space-y-3 pt-1">
              {/* Action Buttons & Status */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap z-20">
                  {link && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        window.open(link, "_blank", "noopener,noreferrer");
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 text-white text-xs font-medium rounded-md shadow-xs transition-colors cursor-pointer"
                    >
                      {label || "Website"}
                    </button>
                  )}

                  {secondaryLink && secondaryLabel && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        window.open(secondaryLink, "_blank", "noopener,noreferrer");
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 text-white text-xs font-medium rounded-md shadow-xs transition-colors cursor-pointer"
                    >
                      {secondaryLabel}
                    </button>
                  )}
                </div>

                {status && (
                  <span
                    className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full shrink-0 ${
                      status === "active"
                        ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300/50 dark:border-emerald-800/80"
                        : "bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-transparent dark:border-neutral-700"
                    }`}
                  >
                    {status}
                  </span>
                )}
              </div>

              {/* Tags */}
              {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-transparent dark:border-neutral-700 text-xs px-2.5 py-0.5 rounded-full font-medium shadow-2xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </FollowerPointerCard>
    </Link>
  );
};

export default ProjectCard;
