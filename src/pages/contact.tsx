import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import SEO from "@/components/SEO.tsx";
import { Boxes } from "@/components/ui/background-boxes";
import { Input } from "@/components/ui/input.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Button } from "@/components/ui/button.tsx";
import { siteConfig } from "@/config/site.config";
import { FaLinkedin, FaGithub, FaMedium } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Copy, Check } from "lucide-react";

const Contact = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    if (router.query.service) {
      setFormData((prev) => ({
        ...prev,
        message: prev.message || `Hi Pratham, I'd like to discuss the "${router.query.service}" project with you.`,
      }));
    }
  }, [router.query.service]);
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n\n` +
      `Message:\n${formData.message}`
    );
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const socialLinks = [
    {
      title: "Twitter/X",
      icon: <FaXTwitter className="w-4 h-4 text-black dark:text-white" />,
      link: siteConfig.social.twitter,
    },
    {
      title: "LinkedIn",
      icon: <FaLinkedin className="w-4 h-4 text-[#0077b5]" />,
      link: siteConfig.social.linkedin,
    },
    {
      title: "GitHub",
      icon: <FaGithub className="w-4 h-4 text-black dark:text-white" />,
      link: siteConfig.social.github,
    },
    {
      title: "Medium",
      icon: <FaMedium className="w-4 h-4 text-black dark:text-white" />,
      link: siteConfig.social.medium,
    },
  ].filter((s) => s.link);

  return (
    <>
      <SEO
        title={"Contact Me"}
        description={`Get in touch with ${siteConfig.name} for collaboration, ideas, or services.`}
        keywords={`Contact ${siteConfig.name}, hire AI engineer`}
        canonicalPath="/contact"
      />

      <div className="relative w-full min-h-[calc(100vh-80px)] overflow-hidden flex flex-col justify-start px-4 sm:px-8 lg:px-12 py-8 md:py-12">
        {/* Animated background grid with soft gradient fade */}
        <div className="absolute inset-0 z-0 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,transparent_30%,white_88%)] bg-gradient-to-r from-white to-gray-200 dark:from-[#09090b] dark:to-[#000000]" />
        <Boxes className="-top-1/3 left-1/3 w-[160%] h-[160%]" />

        {/* Content Container */}
        <div className="relative z-20 w-full max-w-[920px] mx-auto space-y-7">
          {/* Header */}
          <div className="space-y-1.5">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-primary dark:text-white">
              Contact Me
            </h1>
            <p className="text-gray-600 dark:text-neutral-400 text-sm max-w-xl">
              You can contact me for any services I am providing and also regarding job recruitment.
            </p>
          </div>

          {/* 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
            {/* Left Column: Form */}
            <div className="lg:col-span-8 bg-white/80 dark:bg-[#121215]/90 backdrop-blur-md rounded-2xl border border-gray-200/90 dark:border-neutral-800 shadow-sm p-6 sm:p-7">
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-neutral-300 mb-1">
                    Name
                  </label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Name"
                    className="bg-white/90 dark:bg-[#16161a] border-gray-200 dark:border-neutral-700 text-neutral-900 dark:text-white focus:border-black dark:focus:border-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 rounded-xl h-10 text-sm shadow-none"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-neutral-300 mb-1">
                    Email
                  </label>
                  <Input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@gmail.com"
                    className="bg-white/90 dark:bg-[#16161a] border-gray-200 dark:border-neutral-700 text-neutral-900 dark:text-white focus:border-black dark:focus:border-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 rounded-xl h-10 text-sm shadow-none"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-neutral-300 mb-1">
                    Message
                  </label>
                  <Textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Message"
                    className="bg-white/90 dark:bg-[#16161a] border-gray-200 dark:border-neutral-700 text-neutral-900 dark:text-white focus:border-black dark:focus:border-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 rounded-xl text-sm shadow-none resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 bg-black dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-black rounded-xl font-medium text-sm transition-all shadow-sm border-none mt-1"
                >
                  {submitted ? "Opening Email..." : "Send Message"}
                </Button>
              </form>
            </div>

            {/* Right Column: Connect & Socials */}
            <div className="lg:col-span-4 space-y-5">
              {/* Let's Connect */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Let&apos;s Connect
                </h3>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="w-full flex items-center justify-between gap-2.5 px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-neutral-800 bg-white/90 dark:bg-[#121215] hover:bg-white dark:hover:bg-[#16161a] hover:border-gray-300 dark:hover:border-neutral-700 text-xs sm:text-sm font-mono text-gray-800 dark:text-neutral-200 shadow-sm transition-all cursor-pointer group"
                  aria-label="Copy email address"
                >
                  <span className="truncate">{siteConfig.email}</span>
                  {copied ? (
                    <span className="flex items-center gap-1 text-emerald-600 font-sans text-xs">
                      <Check className="w-3.5 h-3.5 flex-shrink-0" /> Copied!
                    </span>
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-gray-400 dark:text-neutral-500 group-hover:text-black dark:group-hover:text-white flex-shrink-0 transition-colors" />
                  )}
                </button>
              </div>

              {/* Follow Me */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Follow Me
                </h3>
                <div className="flex flex-col gap-2">
                  {socialLinks.map((item) => (
                    <a
                      key={item.title}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-neutral-800 bg-white/80 dark:bg-[#121215] hover:bg-white dark:hover:bg-[#16161a] hover:border-gray-300 dark:hover:border-neutral-700 hover:shadow-sm text-sm font-medium text-gray-800 dark:text-neutral-200 transition-all"
                    >
                      <span className="flex-shrink-0">{item.icon}</span>
                      <span>{item.title}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
