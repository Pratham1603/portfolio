import React from "react";
import BlogPostList from "@/components/Blogs/BlogPostList";
import { fetchMediumPosts, MediumPost } from "@/lib/medium";
import SEO from "@/components/SEO.tsx";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async () => {
  try {
    const allMediumPosts = await fetchMediumPosts("prathamharer1603");
    const top10Posts = allMediumPosts.slice(0, 10);
    return {
      props: {
        posts: top10Posts,
      },
    };
  } catch {
    return {
      props: {
        posts: [],
      },
    };
  }
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
