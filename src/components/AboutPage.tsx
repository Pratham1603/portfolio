import ContainerTitle from "@/components/Common/ContainerTitle";
import EmailButton from "@/components/Common/EmailButton";
import GetInTouchButton from "@/components/Common/GetInTouchButton";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Timeline } from "@/components/ui/timeline";
import experiencesData from "@/data/experiencesData";
import { siteConfig } from "@/config/site.config";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

const SKILLS = [
  "Python",
  "FastAPI",
  "RAG",
  "Vector DB",
  "LangGraph",
  "MCP",
  "Docker",
  "Evals",
  "Traces",
];

const SECTIONS = [
  {
    title: "Who I Am",
    content: `Hey, I'm Pratham — an AI engineer from Mumbai passionate about building intelligent systems that solve real-world problems. I work at the intersection of AI agents, LLMs, RAG, and backend engineering, turning emerging AI capabilities into practical applications.`,
  },
  {
    title: "What I Do",
    content: `I specialize in AI agents, Generative AI, and Retrieval-Augmented Generation (RAG). I build LLM-powered applications, multi-agent systems, and custom MCP integrations, focusing on scalable backend development, intelligent automation, and practical AI solutions.`,
  },
  {
    title: "Vision",
    content: `My goal is to help people and push the world further ahead than it was yesterday. I want to be part of the generation that makes technology genuinely work for humans – not the other way around. Humanity first, technology second.`,
  },
  {
    title: "Beyond Code",
    content: `Techno & house music, painting, and thinking differently – that's me outside of code.`,
  },
];

const AboutPage = () => {
  const timelineData = experiencesData.map((exp) => ({
    title: exp.date,
    content: (
      <div className="flex flex-col gap-2 text-sm">
        <div className="flex items-center gap-2.5">
          {exp.logo && (
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#18181c] shadow-xs shrink-0 flex items-center justify-center p-0.5">
              <img
                src={exp.logo}
                alt={`${exp.role} logo`}
                className="w-full h-full object-contain rounded-full"
              />
            </div>
          )}
          <span className="text-md md:text-lg font-semibold text-neutral-900 dark:text-white">
            {exp.role} <span className="text-neutral-400 font-normal">·</span> {exp.companyName}
          </span>
        </div>
        <span
          className="text-sm text-neutral-600 dark:text-neutral-400"
          dangerouslySetInnerHTML={{ __html: exp.description }}
        />
        {exp.points && exp.points.length > 0 && (
          <ul className="text-neutral-700 dark:text-neutral-300 text-xs md:text-sm space-y-1.5 mt-1">
            {exp.points.map((point, index) => (
              <li key={index} className="flex items-start">
                <span className="text-neutral-400 mr-2 shrink-0">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        )}
        {exp.techStack && exp.techStack.length > 0 && (
          <div className="mt-2.5">
            <div className="flex flex-wrap gap-2">
              {exp.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="text-xs text-neutral-800 bg-white/80 px-2.5 py-1 rounded-sm border border-neutral-300 font-medium shadow-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
        {exp.proofLink && (
          <div className="pt-2">
            <a
              href={exp.proofLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-900 bg-white border border-neutral-300 rounded-md hover:bg-neutral-900 hover:text-white hover:border-neutral-900 shadow-xs transition-all duration-200"
            >
              <span>Proof</span>
              <ExternalLink size={12} />
            </a>
          </div>
        )}
      </div>
    ),
  }));

  return (
    <div className="max-w-3xl mx-auto relative md:p-8 rounded-2xl">
      <BackgroundBeams />

      <div className="relative z-10 space-y-2 md:space-y-6">
        <ContainerTitle title={siteConfig.name} />

        <h3 className="text-sm uppercase tracking-wide text-gray-500">
          {siteConfig.role}
        </h3>

        <ul className="flex flex-wrap gap-1 md:gap-2">
          {SKILLS.map((skill) => (
            <li key={skill} className="px-3 py-1 bg-gray-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-transparent dark:border-neutral-700 rounded-full text-xs">
              {skill}
            </li>
          ))}
        </ul>

        {SECTIONS.map(({ title, content }) => (
          <section key={title} className="md:space-y-1">
            <h4 className="md:text-lg font-semibold text-neutral-900 dark:text-white">{title}</h4>
            <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300" dangerouslySetInnerHTML={{ __html: content }} />
          </section>
        ))}

        <div className="flex gap-4 pt-4">
          <GetInTouchButton />
          <EmailButton />
        </div>

        {/* Experience Timeline Section */}
        <div className="pt-10 md:pt-14 mt-8 border-t border-gray-200 dark:border-neutral-800">
          <section className="space-y-1 mb-2">
            <h4 className="text-lg md:text-xl font-semibold text-neutral-900 dark:text-white">Experience</h4>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              A timeline of my professional journey in AI engineering, autonomous agents, and data systems.
            </p>
          </section>

          <div className="relative w-full overflow-clip">
            <Timeline data={timelineData} />
          </div>

          {/* Education Section */}
          <div className="pt-8 md:pt-10 space-y-3">
            <h4 className="text-base md:text-lg font-semibold text-neutral-900 dark:text-white">
              Education
            </h4>

            <div className="flex flex-col gap-1.5 text-sm">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#18181c] shadow-xs shrink-0 flex items-center justify-center p-0.5">
                    <img
                      src="/images/experience/ltce-logo.png"
                      alt="Lokmanya Tilak College of Engineering logo"
                      className="w-full h-full object-contain rounded-full"
                    />
                  </div>
                  <div>
                    <a
                      href="https://www.linkedin.com/in/pratham-harer-143112315/details/education/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-neutral-900 dark:text-white text-sm md:text-base hover:underline block leading-snug"
                    >
                      Lokmanya Tilak College of Engineering
                    </a>
                    <div className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400">
                      Bachelor of Technology (B.Tech) · CSE (Artificial Intelligence & Machine Learning)
                    </div>
                  </div>
                </div>
                <span className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 font-medium whitespace-nowrap self-start sm:self-center">
                  2023 – 2027
                </span>
              </div>

              <div className="text-xs text-neutral-600 dark:text-neutral-400">
                <strong className="font-semibold text-neutral-900 dark:text-white">Grade:</strong> 9.68 CGPA
              </div>

              <ul className="text-neutral-700 dark:text-neutral-300 text-xs md:text-sm space-y-1.5 mt-1">
                <li className="flex items-start">
                  <span className="text-neutral-400 mr-2 shrink-0">•</span>
                  <span>Pursuing B.Tech in CSE (AI & ML) at Lokmanya Tilak College of Engineering, with an average CGPA of 9.68 and 1st Rank in 1st & 2nd year.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-neutral-400 mr-2 shrink-0">•</span>
                  <span>Strong foundation in data structures, algorithms, DBMS, AI, and Machine Learning.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-neutral-400 mr-2 shrink-0">•</span>
                  <span>Worked on projects like the Departmental Website, KrishiMarg, FinSight.AI, and Haulage.AI focusing on data-driven and AI-based applications using Python, FastAPI, MySQL, and ML tools.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 md:pt-8">
            <Link
              className="inline-flex cursor-pointer hover:underline items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white font-medium transition-colors"
              href={siteConfig.resume}
              target="_blank"
            >
              View Full Resume <ExternalLink size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
