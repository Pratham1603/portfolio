import { siteConfig } from "@/config/site.config";

const XConnectCard = () => {
  if (!siteConfig.social.twitter) return null;

  return (
    <div className="my-4">
      <a
        href={siteConfig.social.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
        aria-label="Follow on X/Twitter"
      >
        <div className="flex flex-row items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border border-gray-200 dark:border-neutral-800 bg-gradient-to-br from-gray-50 to-white dark:from-[#141417] dark:to-[#0f0f12] shadow-sm hover:shadow-md active:shadow-inner transition-all duration-300 group w-full">
          <div className="flex-shrink-0">
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-black dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M12.186 8.672 18.743.947h-2.927l-5.005 5.9-4.44-5.9H0l7.434 9.876-6.986 8.23h2.927l5.434-6.4 4.82 6.4H20L12.186 8.672Zm-2.267 2.671L8.544 9.515 3.2 2.47h2.2l4.312 5.719 1.375 1.828 5.731 7.613h-2.2l-4.699-6.287Z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-xs sm:text-sm font-medium text-gray-800 dark:text-neutral-200 leading-tight">
              <span className="inline">Connect with me on X</span>
              <span className="hidden">Follow me on X for updates</span>
            </p>
          </div>
          <div className="flex-shrink-0">
            <span className="inline-flex items-center px-2.5 sm:px-3 py-1 bg-black text-white dark:bg-white dark:text-black rounded-full text-xs font-medium group-hover:scale-105 group-active:scale-95 transition-transform">
              Follow
            </span>
          </div>
        </div>
      </a>
    </div>
  );
};

export default XConnectCard;
