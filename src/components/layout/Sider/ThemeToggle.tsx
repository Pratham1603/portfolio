import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { FaMoon, FaSun } from "react-icons/fa";

type ThemeToggleProps = {
  isMobile?: boolean;
  headerMode?: boolean;
};

const ThemeToggle = ({ isMobile = false, headerMode = false }: ThemeToggleProps) => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    if (headerMode) {
      return (
        <div className="p-2 w-9 h-9" />
      );
    }
    return (
      <div
        className={`flex items-center text-sm ${
          isMobile
            ? "flex-col p-2 min-w-[60px] justify-center text-neutral-400"
            : "px-1 py-1.5 text-neutral-400"
        }`}
      >
        <span className={isMobile ? "text-sm" : "mr-2 text-sm"}>
          <FaMoon />
        </span>
        <span className={isMobile ? "text-xs pt-1" : ""}>Dark Mode</span>
      </div>
    );
  }

  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  if (headerMode) {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 transition-colors cursor-pointer"
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDark ? (
          <FaSun className="h-5 w-5 text-amber-400" />
        ) : (
          <FaMoon className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
        )}
      </button>
    );
  }

  if (isMobile) {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        className="flex flex-col items-center justify-center p-2 min-w-[60px] rounded-md text-sm text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        <span className="text-sm">
          {isDark ? <FaSun className="text-amber-400" /> : <FaMoon />}
        </span>
        <span className="text-xs pt-1">
          {isDark ? "Light" : "Dark"}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="w-full flex items-center justify-between px-1 py-1.5 rounded-md text-sm text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors duration-200 cursor-pointer group"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <div className="flex items-center">
        <span className="mr-2 text-sm flex items-center justify-center">
          {isDark ? (
            <FaSun className="text-amber-400" />
          ) : (
            <FaMoon className="text-neutral-600 dark:text-neutral-400" />
          )}
        </span>
        <span className="group-hover:underline">
          {isDark ? "Light Mode" : "Dark Mode"}
        </span>
      </div>

      {/* Black & White indicator switch */}
      <span
        className={`relative inline-flex h-4 w-7 items-center rounded-full transition-colors duration-200 ${
          isDark ? "bg-neutral-700" : "bg-neutral-300"
        }`}
      >
        <span
          className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform duration-200 shadow-xs ${
            isDark ? "translate-x-3.5" : "translate-x-0.5"
          }`}
        />
      </span>
    </button>
  );
};

export default ThemeToggle;
