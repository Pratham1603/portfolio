import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from "framer-motion";
import { Blog } from "@/types/blog.ts";
import { Project } from "@/types/project.ts";
import { ArrowRight } from 'lucide-react';
import { usePostHog } from 'posthog-js/react';

type FeaturedTileProps = {
  content: Blog | Project;
  type: 'blog' | 'project';
}

const FeaturedTile = ({ content, type }: FeaturedTileProps) => {
  const posthog = usePostHog();
  const image = 'image' in content ? content.image : null;
  const title = content.title;
  const description = content.description;
  const slug = content.slug;
  const contentType = type === 'blog' && 'type' in content ? content.type : 'project';

  const href = type === 'blog' ? `/blogs/${slug}` : `/projects/${slug}`;

  const handleClick = () => {
    if (posthog) {
      posthog.capture('featured_tile_clicked', {
        content_type: type,
        content_slug: slug,
        content_title: title,
        content_category: contentType,
      });
    }
  };

  return (
    <div className="mt-6 md:mt-10">
      <Link href={href} onClick={handleClick} className="block -mx-2 md:mx-0">
        <motion.div
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className="cursor-pointer group active:scale-[0.98]"
        >
          <Card className="bg-neutral-200 dark:bg-[#121215] border border-zinc-300 dark:border-neutral-800 hover:border-zinc-600 dark:hover:border-neutral-700 active:border-zinc-600 transition-colors overflow-hidden shadow-sm hover:shadow-md">
            <div className="flex flex-col sm:flex-row">
              {image && (
                <div className="relative w-full sm:w-40 h-32 sm:h-auto flex-shrink-0">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, 160px"
                  />
                </div>
              )}
              <CardContent className="flex-1 p-3 sm:p-4 md:p-5 flex flex-col justify-between min-h-0 sm:min-h-[140px]">
                <div className="space-y-1.5 sm:space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] sm:text-[10px] font-semibold text-zinc-600 dark:text-neutral-400 uppercase tracking-wider">
                      Check this out
                    </span>
                  </div>
                  <h2 className="text-base sm:text-lg md:text-xl font-bold text-primary dark:text-white line-clamp-2 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors leading-tight">
                    {title}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-neutral-400 line-clamp-2 sm:line-clamp-2 leading-snug sm:leading-relaxed">
                    {description}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs sm:text-sm text-zinc-600 dark:text-neutral-400 mt-2 sm:mt-3 group-hover:text-zinc-800 dark:group-hover:text-white transition-colors pt-2 border-t border-zinc-300 dark:border-neutral-800 sm:border-0 sm:pt-0">
                  <span>Read more</span>
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                </div>
              </CardContent>
            </div>
          </Card>
        </motion.div>
      </Link>
    </div>
  );
};

export default FeaturedTile;

