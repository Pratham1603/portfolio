import React, { useState } from "react";
import ContainerTitle from "@/components/Common/ContainerTitle";
import SEO from "@/components/SEO";
import { siteConfig } from "@/config/site.config";
import servicesData, { Service } from "@/data/servicesData";
import servicesFaqData from "@/data/servicesFaqData";
import {
  Compass,
  Bot,
  Database,
  ShieldCheck,
  Cloud,
  Activity,
  ArrowRight,
  CheckCircle2,
  Plus,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FollowerPointerCard } from "@/components/ui/following-pointer";

const POINTER_COLORS = [
  "#f472b6", // hot pink
  "#38bdf8", // electric blue
  "#34d399", // vivid green
  "#fbbf24", // bright amber
  "#a78bfa", // soft purple
  "#fb923c", // vibrant orange
];

const HOVER_ACTIONS = [
  "Discuss the project",
  "Let's build this",
  "Get started",
  "Discuss project",
  "Let's talk",
  "Inquire now",
];

const iconMap: Record<string, React.ReactNode> = {
  Compass: <Compass className="w-7 h-7 text-white" />,
  Bot: <Bot className="w-7 h-7 text-white" />,
  Database: <Database className="w-7 h-7 text-white" />,
  ShieldCheck: <ShieldCheck className="w-7 h-7 text-white" />,
  Cloud: <Cloud className="w-7 h-7 text-white" />,
  Activity: <Activity className="w-7 h-7 text-white" />,
};

const ServiceCard = ({
  service,
  index,
}: {
  service: Service;
  index: number;
}) => {
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

  const numberStr = `0${index + 1}`;

  return (
    <Link
      href={`/contact?service=${encodeURIComponent(service.title)}`}
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
          className="group flex flex-col justify-between rounded-2xl bg-neutral-200 dark:bg-[#121215] border border-neutral-300/70 dark:border-neutral-800 p-2.5 sm:p-3 hover:shadow-lg hover:border-neutral-400 dark:hover:border-neutral-700 transition-all cursor-pointer h-full"
        >
          {/* Framed Visual Header (Matching Blog Card Image Frame) */}
          {service.image ? (
            <div className="w-full aspect-[16/8] overflow-hidden rounded-xl bg-white dark:bg-[#18181c] p-3 sm:p-4 flex flex-col justify-between relative border border-neutral-300/80 dark:border-neutral-800 shadow-inner">
              {/* Image in frame */}
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              {/* Top row: Tag & Number */}
              <div className="flex items-center justify-between relative z-10">
                <span className="text-[11px] font-semibold tracking-wider uppercase text-neutral-900 dark:text-white bg-white/90 dark:bg-neutral-800/90 px-2.5 py-0.5 rounded-full backdrop-blur-md border border-neutral-300 dark:border-neutral-700 shadow-sm">
                  {service.tag}
                </span>
                <span className="text-xs font-mono font-bold text-neutral-700 dark:text-neutral-300 bg-white/90 dark:bg-neutral-800/90 px-2 py-0.5 rounded-full backdrop-blur-md border border-neutral-300 dark:border-neutral-700 shadow-sm">
                  {numberStr}
                </span>
              </div>
            </div>
          ) : (
            <div className="w-full aspect-[16/8] overflow-hidden rounded-xl bg-gradient-to-br from-neutral-800 via-neutral-900 to-black p-4 flex flex-col justify-between relative shadow-inner">
              {/* Top row: Tag & Number */}
              <div className="flex items-center justify-between relative z-10">
                <span className="text-[11px] font-semibold tracking-wider uppercase text-neutral-300 bg-white/10 px-2.5 py-0.5 rounded-full backdrop-blur-sm border border-white/10">
                  {service.tag}
                </span>
                <span className="text-xs font-mono font-bold text-white/40">
                  {numberStr}
                </span>
              </div>

              {/* Center Icon */}
              <div className="flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform duration-300">
                <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md flex items-center justify-center shadow-lg">
                  {iconMap[service.icon]}
                </div>
              </div>

              {/* Subtle bottom decorative glow */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/5 rounded-full blur-xl pointer-events-none" />
            </div>
          )}

          {/* Card Body */}
          <div className="p-2 sm:p-3 flex-1 flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <h3 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white group-hover:text-black dark:group-hover:text-white leading-snug">
                {service.title}
              </h3>

              <p className="text-xs sm:text-sm text-gray-600 dark:text-neutral-400 leading-relaxed">
                {service.description}
              </p>

              {/* Deliverables List */}
              <div className="pt-2 border-t border-neutral-300/60 dark:border-neutral-800">
                <ul className="space-y-1.5">
                  {service.deliverables.map((item, dIdx) => (
                    <li
                      key={dIdx}
                      className="flex items-start gap-2 text-xs text-neutral-700 dark:text-neutral-300 leading-normal"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-neutral-900 dark:text-neutral-100 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer Row: Status & Discuss the project Button */}
            <div className="flex items-center justify-between text-xs pt-4 mt-auto border-t border-neutral-300/70 dark:border-neutral-800">
              <div className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-medium">Available</span>
              </div>

              <span className="bg-zinc-800 dark:bg-white text-white dark:text-black rounded-md px-3 py-1.5 text-xs font-medium tracking-wide group-hover:bg-black dark:group-hover:bg-neutral-200 transition-colors inline-flex items-center gap-1.5 shadow-sm">
                <span>Discuss the project</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </motion.div>
      </FollowerPointerCard>
    </Link>
  );
};

const ServicesFaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4 pt-4 sm:pt-6 border-t border-neutral-300/70 dark:border-neutral-800">
      <div className="space-y-1">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-neutral-400">
          Everything you need to know about working together, timelines, data privacy, and deliverables.
        </p>
      </div>

      <div className="space-y-3 pt-2">
        {servicesFaqData.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className="rounded-2xl border border-neutral-300/80 dark:border-neutral-800 bg-neutral-200 dark:bg-[#121215] transition-all overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left transition-colors cursor-pointer group"
                aria-expanded={isOpen}
              >
                <span className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white pr-4 group-hover:text-black dark:group-hover:text-neutral-200">
                  {item.question}
                </span>
                <div className="w-8 h-8 rounded-full bg-neutral-300/80 dark:bg-neutral-800 flex items-center justify-center flex-shrink-0 text-gray-800 dark:text-neutral-200 group-hover:bg-neutral-300 dark:group-hover:bg-neutral-700 transition-colors">
                  {isOpen ? (
                    <X className="w-4 h-4 text-black dark:text-white" />
                  ) : (
                    <Plus className="w-4 h-4 text-gray-700 dark:text-neutral-300" />
                  )}
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 border-t border-neutral-300/70 dark:border-neutral-800">
                      <p className="text-xs sm:text-sm text-gray-700 dark:text-neutral-300 leading-relaxed pt-3">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ServicesPage = () => {
  return (
    <>
      <SEO
        title="Services"
        description={`Engineering services and consulting offered by ${siteConfig.name}: AI Consulting, AI Agents, RAG Systems, Evaluation & Security, LLMOps & Deployment, and Observability & Monitoring.`}
        keywords="AI Consulting, AI Agents, RAG Systems, LLMOps, AI Security, Observability, Python, FastAPI"
        canonicalPath="/services"
      />
      <div className="mx-auto space-y-6 sm:space-y-8">
        {/* Title & Subtitle */}
        <div className="space-y-2">
          <ContainerTitle title="Services" />
          <p className="text-sm sm:text-base text-gray-600">
            Specialized engineering services to take AI agents, RAG pipelines, and intelligent backends from concept to reliable production.
          </p>
        </div>

        {/* 6 Services Grid: 2 cards in each row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {servicesData.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Frequently Asked Questions Section */}
        <ServicesFaqSection />

        {/* Bottom Banner */}
        <div className="p-6 rounded-2xl border border-neutral-300 bg-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-bold text-base text-gray-900">
              Need a custom architecture or technical consultation?
            </h4>
            <p className="text-xs sm:text-sm text-gray-600">
              Let&apos;s map out your agent opportunities, timeline, and exact scope.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-5 py-2.5 rounded-xl bg-black text-white hover:bg-neutral-800 text-xs sm:text-sm font-medium transition-all shadow-sm flex-shrink-0"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </>
  );
};

export default ServicesPage;
