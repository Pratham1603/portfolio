import React from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';
import {getPostData, getSortedPostsData} from '@/lib/projects';
import Head from 'next/head';
import SEO from "@/components/SEO.tsx";
import ProjectsPost from "@/components/Projects/ProjectsPost.tsx";
import ProjectsList from "@/components/Projects/ProjectsList.tsx";
import {Project} from "@/types/project.ts";
import { siteConfig } from "@/config/site.config";

type ProjectPageProps = {
  posts: Project[]
  post: Project
}

const ProjectPage = ({posts, post}: ProjectPageProps) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <>
      {post && (
        <Head>
          {/* JSON-LD structured data for SEO */}
          <script
            type="application/ld+json"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'CreativeWork',
                '@id': `${siteConfig.siteUrl}/projects/${post.slug}#project`,
                headline: post.title,
                description: post.description,
                datePublished: post.date,
                dateModified: post.date,
                url: `${siteConfig.siteUrl}/projects/${post.slug}`,
                image: post.image ? `${siteConfig.siteUrl}${post.image}` : undefined,
                inLanguage: 'en-US',
                author: {
                  '@type': 'Person',
                  name: siteConfig.name,
                  url: siteConfig.siteUrl,
                },
                publisher: {
                  '@type': 'Person',
                  '@id': `${siteConfig.siteUrl}/#person`,
                  name: siteConfig.name,
                  url: siteConfig.siteUrl,
                },
                isPartOf: {
                  '@type': 'WebSite',
                  '@id': `${siteConfig.siteUrl}/#website`,
                },
                mainEntityOfPage: {
                  '@type': 'WebPage',
                  '@id': `${siteConfig.siteUrl}/projects/${post.slug}`,
                },
                keywords: post.tags?.join(', '),
                programmingLanguage: post.techStack?.join(', '),
                about: post.label,
                sameAs: post.link,
              }),
            }}
          />
        </Head>
      )}
      <SEO
        title={post ? `${post.title} | Project` : "Projects"}
        description={post?.description || `Projects by ${siteConfig.name}.`}
        keywords={post?.tags?.join(',')}
        canonicalPath={post ? `/projects/${post.slug}` : "/projects"}
        type={post ? "article" : "website"}
      />
      <div className="container mx-auto max-w-2xl px-2 md:px-4 py-5 md:py-8">
        <Link
          className="hover:tracking-wide hover:underline transition-colors mb-4 inline-block"
          href="/projects"
        >
          ← All Projects
        </Link>
        {post ? (
          <ProjectsPost post={post}/>
        ) : (
          <>
            <p className="text-gray-200 mb-8">
              Playground - Small MVP to Production Apps
            </p>
            <ProjectsList minimized posts={posts}/>
          </>
        )}
      </div>
    </>
  );
};

export async function getStaticPaths() {
  const posts = getSortedPostsData();
  const paths = posts.map((post) => ({
    params: {slug: post.slug},
  }));

  return {paths, fallback: 'blocking'};
}

export async function getStaticProps({params}: any) {
  if (params?.slug) {
    const post = getPostData(params.slug);
    return {props: {post}};
  }

  const posts = getSortedPostsData();
  return {props: {posts}};
}

export default ProjectPage;
