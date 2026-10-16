import React from "react";
import BlogPostList from "@/components/Blogs/BlogPostList";
import { fetchMediumPosts, MediumPost } from "@/lib/medium";
import SEO from "@/components/SEO.tsx";
import { GetServerSideProps } from "next";

// This runs on EVERY SINGLE page load and reload - zero static cache!
export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // Prevent any browser or intermediary CDN caching so every reload is live
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");

  const allMediumPosts = await fetchMediumPosts("prathamharer1603");
  const top10Posts = allMediumPosts.slice(0, 10);

  return {
    props: {
      posts: top10Posts,
    },
  };
};

type BlogsListProps = {
  posts: MediumPost[];
};

const BlogsList = ({ posts = [] }: BlogsListProps) => {
  return (
    <>
      <SEO
        title="Pensieve"
        description="Thoughts I have poured out of my head so I can look at them properly."
        keywords="Pratham Harer blog, Medium articles, AI engineer, MCP, Machine Learning"
        canonicalPath="/blogs"
      />
      <BlogPostList posts={posts as any} />
    </>
  );
};

export default BlogsList;
