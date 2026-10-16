import "@/styles/globals.css";
import "github-contrib-graph/styles.css";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import Layout from "@/components/layout/Layout";
import GoogleAnalytics from "@/scripts/GoogleAnalytics.tsx";
import Head from "next/head";
import Script from "next/script";
import jsonLd from "@/scripts/jsonLd.ts";
import { useRouter } from "next/router";
import { Inter } from "next/font/google";
import { useEffect } from "react";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { siteConfig } from "@/config/site.config";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = siteConfig.siteUrl;
const DEFAULT_IMAGE = `${SITE_URL}${siteConfig.avatar}`;

// Extend NextPage to include noLayout
type NextPageWithLayout = NextPage & {
  noLayout?: boolean;
};

// Extend AppProps to use the custom Component type
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const metadata = {
  title: siteConfig.seo.defaultTitle,
  description: siteConfig.seo.defaultDescription,
  keywords: siteConfig.seo.keywords,
};

const getCanonicalPath = (asPath: string) => {
  const noHash = asPath.split("#")[0];
  const noQuery = noHash.split("?")[0];

  if (!noQuery || noQuery.includes("[")) {
    return "/";
  }

  return noQuery;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const useLayout = !Component.noLayout;

  const router = useRouter();
  const canonicalPath = getCanonicalPath(router.asPath || "/");
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;

  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://eu.i.posthog.com",
      person_profiles: "always",
      defaults: "2025-11-30",
      // Enable debug mode in development
      loaded: (posthog) => {
        if (process.env.NODE_ENV === "development") posthog.debug();
      },
    });
  }, []);

  return (
    <>
      <Head>
        <title key="title">{metadata.title}</title>
        <meta key="description" name="description" content={metadata.description} />
        <meta key="keywords" name="keywords" content={metadata.keywords} />
        <meta name="author" content={siteConfig.name} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          key="robots"
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link key="canonical" rel="canonical" href={canonicalUrl} />
        <link rel="alternate" type="application/rss+xml" title={siteConfig.name} href={`${SITE_URL}/rss.xml`} />

        <meta name="theme-color" content="#ffffff" />
        <meta name="msapplication-TileColor" content="#ffffff" />

        <meta key="og:type" property="og:type" content="website" />
        <meta key="og:title" property="og:title" content={metadata.title} />
        <meta key="og:description" property="og:description" content={metadata.description} />
        <meta key="og:url" property="og:url" content={canonicalUrl} />
        <meta key="og:image" property="og:image" content={DEFAULT_IMAGE} />
        <meta key="og:site_name" property="og:site_name" content={siteConfig.name} />
        <meta key="og:locale" property="og:locale" content="en_US" />

        <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content={siteConfig.seo.twitterHandle} />
        <meta name="twitter:site" content={siteConfig.seo.twitterHandle} />
        <meta key="twitter:title" name="twitter:title" content={metadata.title} />
        <meta key="twitter:description" name="twitter:description" content={metadata.description} />
        <meta key="twitter:image" name="twitter:image" content={DEFAULT_IMAGE} />
      </Head>
      <Script id={"json-ld"} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <GoogleAnalytics />
      <PostHogProvider client={posthog}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <TooltipProvider delayDuration={0}>
            <div className={inter.className}>
              {useLayout ? (
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              ) : (
                <Component {...pageProps} />
              )}
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </PostHogProvider>
    </>
  );
}
