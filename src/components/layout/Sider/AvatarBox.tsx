import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {useRouter} from "next/router";
import {Typewriter} from "react-simple-typewriter";
import { siteConfig } from "@/config/site.config";

type AvatarBoxProps = {
  mobile?: boolean;
};

const AvatarBox = ({ mobile = false }: AvatarBoxProps) => {
  const router = useRouter();

  const returnToHome = () => {
    router.push('/')
  }

  return (
    <div
      className={`flex items-center justify-start space-x-3 ${!mobile ? 'sm:mb-8' : ''} px-2 cursor-pointer`}
      onClick={() => returnToHome()}
    >
      <Avatar>
        <AvatarImage
          className="h-10 w-10 rounded-full object-cover"
          alt={siteConfig.name}
          src={siteConfig.avatar}
        />
        <AvatarFallback>
          {siteConfig.name.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div
        className="text-sm flex flex-col"
      >
        <span className="text-black dark:text-white font-medium md:text-lg">
          {siteConfig.name}
        </span>
        <span className="text-neutral-600 dark:text-neutral-400">
          <Typewriter
            words={[
              "AI Engineer",
              "Gen AI Engineer",
              "RAG Engineer",
              "LLM Engineer",
              "Applied AI",
              "AI Architect",
            ]}
            loop
            cursor
            typeSpeed={70}
            deleteSpeed={40}
            delaySpeed={1500}
          />
        </span>
      </div>
    </div>
  )
};

export default AvatarBox;
