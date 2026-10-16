// Core component that receives mouse positions and renders pointer and content

import React, { useEffect, useState } from "react";

import { motion, AnimatePresence, useMotionValue } from "motion/react";
import { cn } from "@/lib/utils";

export const FollowerPointerCard = ({
  children,
  className,
  title,
  badgeColor,
  badgeClassName,
}: {
  children: React.ReactNode;
  className?: string;
  title?: string | React.ReactNode;
  badgeColor?: string;
  badgeClassName?: string;
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const ref = React.useRef<HTMLDivElement>(null);
  const [isInside, setIsInside] = useState<boolean>(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      x.set(e.clientX - rect.left);
      y.set(e.clientY - rect.top);
    }
  };

  const handleMouseLeave = () => {
    setIsInside(false);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      x.set(e.clientX - rect.left);
      y.set(e.clientY - rect.top);
    }
    setIsInside(true);
  };

  return (
    <div
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      style={{
        cursor: "none",
      }}
      ref={ref}
      className={cn("relative", className)}
    >
      <AnimatePresence>
        {isInside && (
          <FollowPointer
            x={x}
            y={y}
            title={title}
            badgeColor={badgeColor}
            badgeClassName={badgeClassName}
          />
        )}
      </AnimatePresence>
      {children}
    </div>
  );
};

const techFamousPeople = [
  "Elon Musk",            // Tesla, SpaceX, X
  "Albert Einstein",      // Physics, Theory of Relativity
  "Nikola Tesla",         // Inventor, AC electricity
  "Marie Curie",          // Radioactivity, Nobel Prize
  "Galileo Galilei",      // Astronomy, Physics
  "Isaac Newton",         // Gravity, Physics
  "Steve Jobs",           // Apple, iPhone
  "Bill Gates",           // Microsoft, Windows
  "Jeff Bezos",           // Amazon, Blue Origin
  "Mark Zuckerberg",      // Facebook, Meta
  "Larry Page",           // Google, Search
  "Sergey Brin",          // Google, AI
  "Satya Nadella",        // Microsoft CEO
  "Tim Cook",             // Apple CEO
  "Sundar Pichai",        // Google, Alphabet CEO
  "Sam Altman",           // OpenAI, AI research
  "Linus Torvalds",       // Linux, Git
  "Ada Lovelace",         // First programmer
  "Grace Hopper",         // Compiler pioneer
  "Hedy Lamarr",          // Wireless tech innovator
];

export const FollowPointer = ({
  x,
  y,
  title,
  badgeColor,
  badgeClassName,
}: {
  x: any;
  y: any;
  title?: string | React.ReactNode;
  badgeColor?: string;
  badgeClassName?: string;
}) => {
  const colors = [
    "#ff6b6b", // vibrant red
    "#fbbf24", // bright amber
    "#34d399", // vivid green
    "#38bdf8", // electric blue
    "#a78bfa", // soft purple
    "#f472b6", // hot pink
    "#fb923c", // vibrant orange
  ];

  const [fallbackColor] = useState(
    () => colors[Math.floor(Math.random() * colors.length)]
  );
  const bgColor = badgeColor || fallbackColor;
  
  return (
    <motion.div
      className="absolute z-50 h-4 w-4 rounded-full pointer-events-none"
      style={{
        top: y,
        left: x,
      }}
      initial={{
        scale: 1,
        opacity: 1,
      }}
      animate={{
        scale: 1,
        opacity: 1,
      }}
      exit={{
        scale: 0,
        opacity: 0,
      }}
    >
      <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="1"
        viewBox="0 0 16 16"
        className="h-6 w-6 -translate-x-[12px] -translate-y-[10px] -rotate-[70deg] transform stroke-sky-600 text-sky-500 drop-shadow-sm"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"></path>
      </svg>
      <motion.div
        style={{
          backgroundColor: bgColor,
        }}
        initial={{
          scale: 0.5,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        exit={{
          scale: 0.5,
          opacity: 0,
        }}
        className={cn(
          "min-w-max rounded-full px-3 py-1 text-xs whitespace-nowrap shadow-md",
          badgeClassName || "text-white bg-neutral-200 px-2 py-2"
        )}
      >
        {title || techFamousPeople[Math.floor(Math.random() * techFamousPeople.length)]}
      </motion.div>
    </motion.div>
  );
};
