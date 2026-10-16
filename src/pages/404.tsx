import React from "react";
import Link from "next/link";
import SEO from "@/components/SEO";
import { siteConfig } from "@/config/site.config";
import { ArrowLeft } from "lucide-react";

export default function Custom404() {
  return (
    <>
      <SEO
        title="Page Not Found"
        description="The page you are looking for does not exist."
        canonicalPath="/404"
      />
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4 space-y-4">
        <span className="text-6xl font-bold tracking-tight text-neutral-900">404</span>
        <h1 className="text-xl sm:text-2xl font-semibold text-neutral-800">
          Page Not Found
        </h1>
        <p className="text-sm text-neutral-600 max-w-md">
          The page you are looking for doesn&apos;t exist, has been removed, or was never here to begin with.
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-medium rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </>
  );
}
