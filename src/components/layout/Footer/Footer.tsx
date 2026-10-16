import React from 'react';
import Link from 'next/link';
import LiveTime from "@/components/layout/Footer/LiveTime.tsx";
import { siteConfig } from "@/config/site.config";

type FooterProps = {
  isMobile: boolean;
};

const Footer = (
  {isMobile}: FooterProps
) => {

  return (
    <footer className={`flex self-end min-w-full p-3 sm:p-5 flex-col border-t-[0.5px] 
    text-gray-700 dark:text-neutral-400 border-neutral-300 dark:border-neutral-800
    space-x-3 gap-2 text-xs sm:text-sm max-w-xl md:max-w-4xl mx-auto
    ${isMobile ? "mb-20" : ""}
    `}>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          {/*<span className="text-blue-400 mr-2">Currently</span>*/}
          <Link
            className="text-gray-700 dark:text-neutral-300 hover:text-gray-800 dark:hover:text-white hover:underline transition-colors duration-300 ease-in-out"
            href={"/contact"}
          >
            Reach out →
          </Link>
        </div>

        <div className="space-x-1">
          <span className="hidden sm:inline-block">
            Made by {siteConfig.name} |
          </span>
          <span>
            © {new Date().getFullYear()}
          </span>
        </div>

        <div className='flex items-center gap-3'>
          <LiveTime />
        </div>
      </div>

    </footer>
  );
};

export default Footer;
