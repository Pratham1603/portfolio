import React from 'react';
import socialLinks from "@/data/socialLinks.tsx";
import ThemeToggle from "@/components/layout/Sider/ThemeToggle";

type SocialButtonsProps = {
  isMobile?: boolean;
};

const SocialButtons = (
  {
    isMobile = false
  }: SocialButtonsProps
) => {

  return (
    <div className={isMobile ? "flex space-x-4" : "space-y-3 py-5"}>
      {!isMobile && <span className="text-sm mb-2 block text-neutral-500 dark:text-neutral-400">Connect</span>}
      <div className={isMobile ? "flex space-x-4" : "space-y-1"}>
        {socialLinks.map((socialLink, index) => {
          return (
            <a
              className={`
                flex items-center cursor-pointer rounded-md text-sm text-neutral-700 dark:text-neutral-300
                ${isMobile
                ? "flex-col p-2 min-w-[60px] justify-center hover:text-black dark:hover:text-white"
                : "px-1 py-1.5 hover:text-black dark:hover:text-white hover:underline transition-colors duration-200"
              }
              `}
              href={socialLink.link}
              key={index}
              target="_blank"
              rel="noopener noreferrer"
            >
              {isMobile ? (
                <>
                  <span key="icon">{socialLink.icon}</span>
                  <span key="title" className="text-xs pt-1">
                    {socialLink.title}
                  </span>
                </>
              ) : (
                <>
                  <div className="flex items-center flex-grow">
                    <span key="icon" className="mr-2">{socialLink.icon}</span>
                    <span key="title">{socialLink.title}</span>
                  </div>
                </>
              )}
            </a>
          );
        })}
        {/* Dark mode button directly below Email */}
        <ThemeToggle isMobile={isMobile} />
      </div>
    </div>
  );
};

export default SocialButtons;
