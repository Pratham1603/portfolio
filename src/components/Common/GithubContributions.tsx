import React, { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { siteConfig } from "@/config/site.config";
import { useTheme } from "next-themes";

// Client-only: the widget fetches contribution data on mount
const GitHubContributionGraph = dynamic(
  () => import("github-contrib-graph/react").then((m) => m.GitHubContributionGraph),
  {
    ssr: false,
    loading: () => (
      <div className="h-[155px] w-full animate-pulse rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800" />
    ),
  },
);

type GithubContributionsProps = {
  username?: string;
  className?: string;
};

// Compact glacier-aligned base theme
const BASE_THEME = {
  bgColor: "#ffffff",
  textColor: "#334155",
  cellLevel0: "#f1f5f9",
  cellLevel1: "#9be9a8",
  cellLevel2: "#40c463",
  cellLevel3: "#30a14e",
  cellLevel4: "#216e39",
  borderColor: "#e2e8f0",
  cellRadius: 2.5,
  cardPadding: 14,
  cardRadius: 12,
  canvasMarginInline: 0,
};

const DARK_THEME = {
  bgColor: "#121215",
  textColor: "#a1a1aa",
  cellLevel0: "#1e1e24",
  cellLevel1: "#0e4429",
  cellLevel2: "#006d32",
  cellLevel3: "#26a641",
  cellLevel4: "#39d353",
  borderColor: "#27272a",
  cellRadius: 2.5,
  cardPadding: 14,
  cardRadius: 12,
  canvasMarginInline: 0,
};

// Calculate optimal cell size and gap so the 53 weeks span the card width uniformly
const computeTheme = (width: number, isDark = false) => {
  const base = isDark ? DARK_THEME : BASE_THEME;
  const cardPadding = 14;
  // Available width for 53 columns: total width minus card padding minus day labels column (28px)
  const avail = Math.max(width, 580) - cardPadding * 2 - 28;
  const step = avail / 53;
  const cellGap = Math.max(1.8, Math.round(step * 0.21 * 10) / 10);
  const cellSize = Math.floor((step - cellGap) * 10) / 10;

  return {
    ...base,
    cardPadding,
    cellSize,
    cellGap,
  };
};

const GithubContributions = ({
  username = siteConfig.githubUsername,
  className,
}: GithubContributionsProps) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [containerHeight, setContainerHeight] = useState<number | undefined>(undefined);
  const [theme, setTheme] = useState(() => computeTheme(760, false));
  const lastWidthRef = useRef<number>(0);

  useEffect(() => {
    const updateSize = () => {
      if (!containerRef.current) return;
      const cWidth = containerRef.current.clientWidth;
      if (cWidth <= 0) return;

      lastWidthRef.current = cWidth;

      if (cWidth < 580) {
        // Mobile screens: use base 580px layout and scale down proportionally without scrollbars
        const s = cWidth / 580;
        setScale(s);
        setTheme(computeTheme(580, isDark));
        if (innerRef.current) {
          const h = innerRef.current.scrollHeight || 155;
          setContainerHeight(h * s);
        }
      } else {
        // Tablet / Desktop screens: 100% full-width native layout with dynamic edge-to-edge cell sizing
        setScale(1);
        setContainerHeight(undefined);
        setTheme(computeTheme(cWidth, isDark));
      }
    };

    updateSize();

    // Re-check after client-side SVG/DOM renders
    const timer = setTimeout(updateSize, 300);

    const ro = new ResizeObserver(updateSize);
    if (containerRef.current) ro.observe(containerRef.current);

    return () => {
      clearTimeout(timer);
      ro.disconnect();
    };
  }, [isDark]);

  return (
    <div
      ref={containerRef}
      className={`w-full overflow-hidden select-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${className ?? ""}`}
      style={{
        height: containerHeight ? `${containerHeight}px` : "auto",
      }}
    >
      <div
        ref={innerRef}
        className={scale < 1 ? "w-[580px]" : "w-full"}
        style={{
          transform: scale < 1 ? `scale(${scale})` : undefined,
          transformOrigin: "top left",
        }}
      >
        <GitHubContributionGraph
          username={username}
          theme={theme}
          className="w-full"
          style={{ width: "100%" }}
          showHeader
          showFooter={false}
          showThumbnail={false}
          renderHeader={({ user, username: uName, totalContributions }) => {
            const container = document.createElement("div");
            container.className = "ghCalendarHeader";

            const totalSpan = document.createElement("span");
            const minCount = siteConfig.githubContributionsCount ?? 611;
            const count = Math.max(totalContributions || 0, minCount);
            totalSpan.textContent = `${count} contributions`;

            const profileDiv = document.createElement("div");
            const link = document.createElement("a");
            link.href = `https://github.com/${encodeURIComponent(uName)}`;
            link.textContent = uName;
            link.target = "_blank";
            link.rel = "noopener noreferrer";

            const img = document.createElement("img");
            img.src = user?.avatarUrl || `https://github.com/${uName}.png`;
            img.alt = `${uName}'s avatar`;

            profileDiv.appendChild(link);
            profileDiv.appendChild(img);

            container.appendChild(totalSpan);
            container.appendChild(profileDiv);

            return container;
          }}
        />
      </div>
    </div>
  );
};

export default GithubContributions;
