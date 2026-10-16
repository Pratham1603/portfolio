import React, { useState } from "react";
import ContainerTitle from "@/components/Common/ContainerTitle";
import { Blog } from "@/types/blog.ts";
import { FaMedium } from "react-icons/fa";
import { ExternalLink } from "lucide-react";
import moment from "moment";
import { motion } from "framer-motion";
import Link from "next/link";
import { FollowerPointerCard } from "@/components/ui/following-pointer";

const POINTER_COLORS = [
  "#f472b6", // hot pink
  "#38bdf8", // electric blue
  "#34d399", // vivid green
  "#fbbf24", // bright amber
  "#a78bfa", // soft purple
  "#fb923c", // vibrant orange
  "#ff6b6b", // vibrant red
];

const HOVER_ACTIONS = [
  "Check this out",
  "Give it a read",
  "Check it out",
  "Read story",
  "Dive in",
  "Take a look",
  "Worth a read",
  "Explore story",
  "Must read",
  "Read now",
];

const BlogCardItem = ({ post, index }: { post: any; index: number }) => {
  const [hoverText, setHoverText] = useState(
    () => HOVER_ACTIONS[index % HOVER_ACTIONS.length]
  );
  const [badgeColor, setBadgeColor] = useState(
    () => POINTER_COLORS[index % POINTER_COLORS.length]
  );

  const handleMouseEnter = () => {
    setHoverText((prev) => {
      const remaining = HOVER_ACTIONS.filter((item) => item !== prev);
      return remaining[Math.floor(Math.random() * remaining.length)];
    });
    setBadgeColor((prev) => {
      const remaining = POINTER_COLORS.filter((color) => color !== prev);
      return remaining[Math.floor(Math.random() * remaining.length)];
    });
  };

  return (
    <Link
      href={`/blogs/${post.slug}`}
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
          className="group flex flex-col justify-between rounded-2xl bg-neutral-200 border border-neutral-300/70 p-2.5 sm:p-3 hover:shadow-lg hover:border-neutral-400 transition-all cursor-pointer h-full"
        >
          {/* Framed Image Container */}
          <div className="w-full aspect-[16/10] overflow-hidden rounded-xl bg-neutral-300">
            {post.image ? (
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-neutral-700 to-neutral-800 flex items-center justify-center">
                <FaMedium className="w-10 h-10 text-white/40" />
              </div>
            )}
          </div>

          {/* Card Body */}
          <div className="p-2 sm:p-3 flex-1 flex flex-col justify-between space-y-2">
            <div className="space-y-1">
              <h3 className="font-bold text-sm sm:text-base text-gray-900 group-hover:text-black line-clamp-1 leading-snug">
                {post.title}
              </h3>
              {(post.summary || post.snippet || post.description) && (
                <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                  {post.summary || post.snippet || post.description}
                </p>
              )}
            </div>

            {/* Footer Row: Date & Check out Button */}
            <div className="flex items-center justify-between text-xs pt-3 mt-auto">
              <span className="text-gray-600 text-xs font-normal">
                {moment(post.date || post.pubDate).format("MMM DD, YYYY")}
              </span>

              <span className="bg-zinc-800 text-white rounded-md px-2.5 py-1 text-[11px] font-medium tracking-wide group-hover:bg-black transition-colors">
                Check out
              </span>
            </div>
          </div>
        </motion.div>
      </FollowerPointerCard>
    </Link>
  );
};

type BlogPostListProps = {
  posts: any[];
  minimized?: boolean;
};

const BlogPostList = ({
  posts = [],
  minimized = false,
}: BlogPostListProps) => {
  const mediumUrl = "https://medium.com/@prathamharer1603";

  if (minimized) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.slice(0, 3).map((post) => (
          <Link
            key={post.slug}
            href={`/blogs/${post.slug}`}
            className="group block p-4 rounded-xl border border-gray-200 bg-white/80 hover:bg-white hover:shadow-md transition-all"
          >
            <h4 className="font-semibold text-sm line-clamp-2 group-hover:text-black">
              {post.title}
            </h4>
            <p className="text-xs text-gray-500 mt-1 line-clamp-2">
              {post.summary || post.description}
            </p>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="mx-auto space-y-6 sm:space-y-8">
      {/* Title & Subtitle */}
      <div className="space-y-2">
        <div className="flex items-baseline justify-between gap-2">
          <ContainerTitle title="Pensieve" />
          <a
            href="https://www.google.com/search?q=what+is+a+pensieve"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-neutral-400 hover:text-black transition-colors"
            title="Search Pensieve on Google"
          >
            <span>What&apos;s a Pensieve?</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
        <p className="text-sm sm:text-base text-gray-600">
          Thoughts I have poured out of my head so I can look at them properly. Some of my older writing still lives on my Medium profile.
        </p>
      </div>

      {/* Medium Profile Connect Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 via-white to-gray-50 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-black text-white flex items-center justify-center flex-shrink-0 shadow-sm">
            <FaMedium className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold text-sm sm:text-base text-primary">
              Pratham Harer on Medium
            </h3>
            <p className="text-xs sm:text-sm text-gray-500">
              Stories, technical deep-dives, and insights from what I build and learn
            </p>
          </div>
        </div>

        <a
          href={mediumUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-black text-white hover:bg-neutral-800 text-xs sm:text-sm font-medium transition-all shadow-sm flex-shrink-0"
        >
          <span>View on Medium</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Articles Grid - Opening internally inside website */}
      {posts && posts.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Latest Stories ({posts.length})
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {posts.map((post, index) => (
              <BlogCardItem key={post.slug} post={post} index={index} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          No articles found.
        </div>
      )}
    </div>
  );
};

export default BlogPostList;
