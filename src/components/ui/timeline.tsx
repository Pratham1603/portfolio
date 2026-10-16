"use client";
import {
  useScroll,
  useTransform,
  motion,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({
  data,
  title,
  description,
}: {
  data: TimelineEntry[];
  title?: string;
  description?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    const updateHeight = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setHeight(rect.height);
      }
    };
    updateHeight();
    const ro = new ResizeObserver(updateHeight);
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 35%", "end 80%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full font-sans"
      ref={containerRef}
    >
      {(title || description) && (
        <div className="max-w-7xl mx-auto pt-4 sm:pt-8 px-1 sm:px-3 md:px-6">
          {title && (
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1.5 text-black max-w-4xl tracking-tight">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-neutral-600 text-xs sm:text-sm md:text-base max-w-xl">
              {description}
            </p>
          )}
        </div>
      )}

      <div ref={ref} className="relative max-w-7xl mx-auto py-6">
        {data.map((item, index) => (
          <div
            key={index}
            className={`flex justify-start ${index !== 0 ? 'pt-8 sm:pt-12 md:pt-24' : 'pt-2 pb-6'} md:gap-8`}
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start md:w-60 lg:w-64 shrink-0">
              <div className="hidden h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white md:flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-neutral-200 border border-neutral-300 p-2" />
              </div>
              <h3 className="hidden md:block text-sm md:text-base md:pl-16 font-medium text-neutral-500 whitespace-nowrap">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-3 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-sm mb-1 text-left text-neutral-500">
                {item.title}
              </h3>
              {item.content}{" "}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="hidden md:block absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
