import MarkdownWrapper from "@/components/MarkdownWrapper";
import React, { useState } from "react";
import Lightbox from "@/components/Lightbox";
import { readingTime } from "reading-time-estimator";
import { Blog } from "@/types/blog.ts";
import { siteConfig } from "@/config/site.config";
import { ExternalLink, Calendar, Clock } from "lucide-react";
import moment from "moment";

type BlogPostProps = {
  post: Blog;
};

const BlogPost = ({ post }: BlogPostProps) => {
  const readingResult = readingTime(post?.content || "");
  const [coverOpen, setCoverOpen] = useState(false);

  return (
    <div className="mx-auto space-y-6">
      {/* Header Info */}
      <div className="space-y-3">
        <h1 className="text-primary text-2xl sm:text-4xl font-bold tracking-tight">
          {post.title}
        </h1>

        {post.highlight && (
          <h2 className="text-base text-gray-700 font-medium">
            {post.highlight}
          </h2>
        )}

        {post.description && (
          <p className="text-sm text-gray-600">
            {post.description}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 pt-1">
          <span className="font-medium text-gray-700">By {siteConfig.name}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-gray-400" />
            {moment(post.date).format("MMM DD, YYYY")}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-gray-400" />
            {readingResult.text}
          </span>
        </div>
      </div>

      {/* Cover Image */}
      {post.image && (
        <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm bg-neutral-200">
          <img
            className="rounded-2xl cursor-zoom-in transition hover:opacity-95 max-h-[60vh] w-full object-cover"
            src={post.image}
            alt={post.title}
            onClick={() => setCoverOpen(true)}
          />
          {coverOpen && (
            <Lightbox
              images={[post.image]}
              index={0}
              alt={post.title}
              onClose={() => setCoverOpen(false)}
              onNavigate={() => {}}
            />
          )}
        </div>
      )}

      {/* Article Markdown Body */}
      <MarkdownWrapper className="prose prose-lg py-4" content={post.content} />

      {/* Link to Original on Medium */}
      {post.link && (
        <div className="pt-6 border-t border-gray-200">
          <a
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-black text-white hover:bg-neutral-800 text-sm font-medium transition-all shadow-sm"
          >
            <span>Read original story on Medium</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      )}
    </div>
  );
};

export default BlogPost;
