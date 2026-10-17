import React from "react";
import Link from "next/link";
import Head from "next/head";
import BlogPost from "@/components/Blogs/BlogPost";
import SEO from "@/components/SEO.tsx";
import { siteConfig } from "@/config/site.config";
import { fetchMediumPosts, findPostBySlug, MediumPost } from "@/lib/medium";
import { GetStaticPaths, GetStaticProps } from "next";

type BlogsPageProps = {
  post?: MediumPost | any;
};

const BlogPage = ({ post }: BlogsPageProps) => {
  if (!post) {
    return (
      <div className="container px-4 py-20 max-w-2xl mx-auto text-center space-y-4">
        <h2 className="text-xl font-bold">Story not found</h2>
        <Link href="/blogs" className="underline text-sm">
          ← Back to Pensieve
        </Link>
      </div>
    );
  }

  const postCanonicalUrl = post.link || `${siteConfig.siteUrl}/blogs/${post.slug}`;

  const blogPostingNode = {
    "@type": "BlogPosting",
    "@id": `${postCanonicalUrl}#article`,
    headline: post.title,
    description: post.snippet || post.description,
    datePublished: post.date || post.pubDate,
    dateModified: post.date || post.pubDate,
    url: postCanonicalUrl,
    image: post.image || undefined,
    inLanguage: "en-US",
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
    publisher: {
      "@type": "Person",
      "@id": `${siteConfig.siteUrl}/#person`,
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
    isPartOf: {
      "@type": "WebSite",
      "@id": `${siteConfig.siteUrl}/#website`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postCanonicalUrl,
    },
    keywords: post.categories?.join(", "),
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [blogPostingNode],
  };

  return (
    <>
      <Head>
        <meta property="og:type" content="article" />
        <meta property="og:url" content={postCanonicalUrl} />
        <meta property="article:published_time" content={post.date || post.pubDate} />
        <meta property="article:author" content={siteConfig.name} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </Head>

      <SEO
        title={`${post.title} | ${siteConfig.name}`}
        description={post.snippet || post.description || "Article by Pratham Harer."}
        keywords={post.categories?.join(", ")}
        image={post.image}
        canonicalPath={`/blogs/${post.slug}`}
        type="article"
      />

      <div className="container px-2 md:px-4 py-6 max-w-3xl mx-auto space-y-6">
        <Link
          className="text-sm text-gray-500 hover:text-black hover:underline transition-colors inline-block"
          href="/blogs"
        >
          ← Back to Pensieve
        </Link>

        <BlogPost post={post} />
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const mediumPosts = await fetchMediumPosts("prathamharer1603");
    const paths = mediumPosts.map((p) => ({
      params: { slug: p.slug },
    }));
    return {
      paths,
      fallback: false,
    };
  } catch {
    return {
      paths: [],
      fallback: false,
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  if (!slug) {
    return { notFound: true };
  }

  const mediumPosts = await fetchMediumPosts("prathamharer1603");
  let post: any = findPostBySlug(mediumPosts, slug);

  // If not found in Medium feed, try local markdown fallback if exists
  if (!post) {
    try {
      const { getPostData } = await import("@/lib/blogs");
      post = getPostData(slug);
    } catch {}
  }

  if (!post || (!post.content && !post.title)) {
    return { notFound: true };
  }

  return {
    props: {
      post,
    },
  };
};

export default BlogPage;
