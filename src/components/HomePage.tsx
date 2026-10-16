import React from "react";
import XConnectCard from "@/components/Common/XConnectCard.tsx";
import FeaturedTile from "@/components/Common/FeaturedTile.tsx";
import GithubContributions from "@/components/Common/GithubContributions.tsx";
import { PointerHighlight } from "./ui/pointer-highlight";
import { Blog } from "@/types/blog.ts";
import { Project } from "@/types/project.ts";
import { siteConfig } from "@/config/site.config";

type HomePageProps = {
  featuredContent?: Blog | Project | null;
};

const CURRENTLY_SHIPPING = [
  {
    title: "AI Consulting",
    description: "Find where agents save you the most time and money.",
  },
  {
    title: "AI Agents",
    description: "One working agent for a real task in your business.",
  },
  {
    title: "RAG Systems",
    description: "An assistant that answers from your own documents, with sources.",
  },
  {
    title: "Evaluation & Security",
    description: "Tests and guardrails for agents that fail unpredictably.",
  },
  {
    title: "LLMOps & Deployment",
    description: "Turn a working demo into a system your team can trust.",
  },
  {
    title: "Observability & Monitoring",
    description: "Keep your agents accurate, safe, and affordable over time.",
  },
];

const HomePage = ({ featuredContent }: HomePageProps) => {
  return (
    <>
      <div className="sm:p-0 pb-2 break-words max-w-[100vw] mx-auto space-y-5 md:space-y-8">
        <div className="space-y-2">
          <h1 className={"text-2xl md:text-5xl font-medium text-primary dark:text-white"}>
            <PointerHighlight
              containerClassName="inline-block"
              pointerClassName="text-yellow-500"
              rectangleClassName="bg-neutral-200 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700"
            >
              <span className="relative z-10 px-1">{`Hey, I'm ${siteConfig.name}`}</span>
            </PointerHighlight>
          </h1>
          <h2 className="text-xl md:text-4xl font-medium text-gray-500 dark:text-neutral-400">{siteConfig.role}</h2>
        </div>

        <XConnectCard />

        <div className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed space-y-4">
          <p>
            Hey, I’m Pratham, in{" "}
            <u className="underline underline-offset-[3px] decoration-neutral-400 dark:decoration-neutral-600 font-medium text-neutral-900 dark:text-white">
              Mumbai
            </u>
            , and I build AI systems that hold up on real work. I’m a B.Tech student in CSE (
            <u className="underline underline-offset-[3px] decoration-neutral-400 dark:decoration-neutral-600 font-medium text-neutral-900 dark:text-white">
              AI & ML
            </u>
            ) at Lokmanya Tilak College of Engineering, and I recently worked as a{" "}
            <u className="underline underline-offset-[3px] decoration-neutral-400 dark:decoration-neutral-600 font-medium text-neutral-900 dark:text-white">
              Generative AI Engineer
            </u>{" "}
            at Jio Platforms.
          </p>

          <p>
            A demo agent is easy and a production one is not, so I care about evals and traces as much as the model. At{" "}
            <u className="underline underline-offset-[3px] decoration-neutral-400 dark:decoration-neutral-600 font-medium text-neutral-900 dark:text-white">
              Jio
            </u>{" "}
            I built production RAG pipelines on Qdrant, GPT-4, and text-embedding-3 that handled 25,000 queries a day in under 0.8 seconds, lifting customer satisfaction from 3.2 to 4.6 out of 5.
          </p>

          <p>
            The rest of my work sits around agents, using LangGraph, MCP, and FastAPI. In May 2026 I took 3rd place at{" "}
            <u className="underline underline-offset-[3px] decoration-neutral-400 dark:decoration-neutral-600 font-medium text-neutral-900 dark:text-white">
              UAI Hawkathon
            </u>{" "}
            with a Vision Transformer system for off-road scene segmentation, reaching 79.4% pixel accuracy.
          </p>

          <p>
            I hold a 9.68 CGPA and ranked{" "}
            <u className="underline underline-offset-[3px] decoration-neutral-400 dark:decoration-neutral-600 font-medium text-neutral-900 dark:text-white">
              1st twice
            </u>{" "}
            in Engineering. Outside code it’s techno, house, and painting. I want to help make technology work for people,{" "}
            <u className="underline underline-offset-[3px] decoration-neutral-400 dark:decoration-neutral-600 font-medium text-neutral-900 dark:text-white">
              humanity first
            </u>
            , technology second.
          </p>
        </div>

        <GithubContributions />

        {/* CURRENTLY SHIPPING */}
        <div className="pt-2 sm:pt-4">
          <h3 className="text-xs font-semibold tracking-wider text-neutral-400 dark:text-neutral-500 uppercase mb-3">
            CURRENTLY SHIPPING
          </h3>
          <div className="border-y border-neutral-300/80 dark:border-neutral-800 divide-y divide-neutral-300/80 dark:divide-neutral-800">
            {CURRENTLY_SHIPPING.map((item) => (
              <div
                key={item.title}
                className="grid grid-cols-1 sm:grid-cols-[200px_1fr] md:grid-cols-[220px_1fr] gap-x-6 gap-y-1 py-2.5 sm:py-3 items-baseline"
              >
                <div className="font-semibold text-neutral-900 dark:text-white text-sm sm:text-base">
                  {item.title}
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 pt-2 sm:pt-3">
          <span>You can talk to me about</span>{" "}
          <span className="text-primary dark:text-white font-medium">work, new ideas, life, or anything else.</span>
        </div>

        {featuredContent && (
          <FeaturedTile content={featuredContent} type={"status" in featuredContent ? "project" : "blog"} />
        )}
      </div>
    </>
  );
};

export default HomePage;
