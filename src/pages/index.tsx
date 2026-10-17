import HomePage from "@/components/HomePage";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { fetchMediumPosts, MediumPost } from "@/lib/medium";
import SEO from "@/components/SEO";
import { siteConfig } from "@/config/site.config";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async () => {
  try {
    const mediumPosts = await fetchMediumPosts("prathamharer1603");
    const latestPost = mediumPosts.length > 0 ? mediumPosts[0] : null;

    return {
      props: {
        featuredContent: latestPost,
      },
    };
  } catch {
    return {
      props: {
        featuredContent: null,
      },
    };
  }
};

type HomeProps = {
  featuredContent: MediumPost | any;
};

export default function Home({ featuredContent }: HomeProps) {
  return (
    <>
      <SEO
        title={siteConfig.seo.defaultTitle}
        description={siteConfig.seo.defaultDescription}
        keywords={siteConfig.seo.keywords}
        canonicalPath="/"
      />
      <BackgroundBeamsWithCollision className="min-h-full">
        <HomePage featuredContent={featuredContent} />
      </BackgroundBeamsWithCollision>
    </>
  );
}
