import React from 'react';
import experiencesData from "@/data/experiencesData.ts";
import { Timeline } from '@/components/ui/timeline';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import SEO from "@/components/SEO";
import { siteConfig } from "@/config/site.config";

const JourneyPage: React.FC = () => {

  const timelineData = experiencesData.map((exp) => ({
    title: exp.date,
    content: (
      <div
        className='flex flex-col gap-2 text-sm'
      >
        <div className="flex items-center gap-2.5">
          {exp.logo && (
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-neutral-200 bg-white shadow-xs shrink-0 flex items-center justify-center p-0.5">
              <img
                src={exp.logo}
                alt={`${exp.role} logo`}
                className="w-full h-full object-contain rounded-full"
              />
            </div>
          )}
          <span className='text-md md:text-lg lg:text-xl font-semibold text-black'>
            {exp.role} &middot; {exp.companyName}
          </span>
        </div>
        <span
          className='text-md text-gray-500'
          dangerouslySetInnerHTML={{ __html: exp.description }}
        />
        {exp.points && exp.points.length > 0 && (
          <ul className="text-gray-700 text-xs md:text-sm space-y-2">
            {exp.points.map((point, index) => (
              <li key={index} className="flex items-start">
                <span className="text-gray-400 mr-2">•</span>
                  {point}
                </li>
              ))}
            </ul>
          )}
          {exp.techStack && exp.techStack.length > 0 && (
            <div className="mt-2.5">
              <div className="flex flex-wrap gap-2">
                {exp.techStack.map((tech, index) => (
                  <span
                    className="text-xs text-neutral-800 bg-white/80 px-2.5 py-1 rounded-sm border border-neutral-300 font-medium shadow-xs"
                    key={index}
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
    )
  }))

  return (
    <>
      <SEO
        title="Experience"
        description={`Work history and background for ${siteConfig.name}.`}
        keywords={`${siteConfig.name}, experience, career, work history`}
        canonicalPath="/experience"
      />
      <div
        className="mx-auto space-y-3 md:space-y-6"
      >
        <div className="relative w-full overflow-clip">
          <Timeline data={timelineData} />
        </div>

        {/* Education Section */}
        <div className="pt-8 md:pt-10 space-y-3">
          <h4 className="text-base md:text-lg font-semibold text-neutral-900">
            Education
          </h4>

          <div className="flex flex-col gap-1.5 text-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-neutral-200 bg-white shadow-xs shrink-0 flex items-center justify-center p-0.5">
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
                    className="font-semibold text-neutral-900 text-sm md:text-base hover:underline block leading-snug"
                  >
                    Lokmanya Tilak College of Engineering
                  </a>
                  <div className="text-xs md:text-sm text-neutral-600">
                    Bachelor of Technology (B.Tech) · CSE (Artificial Intelligence & Machine Learning)
                  </div>
                </div>
              </div>
              <span className="text-xs md:text-sm text-neutral-500 font-medium whitespace-nowrap self-start sm:self-center">
                2023 – 2027
              </span>
            </div>

            <div className="text-xs text-neutral-600">
              <strong className="font-semibold text-neutral-900">Grade:</strong> 9.68 CGPA
            </div>

            <ul className="text-neutral-700 text-xs md:text-sm space-y-1.5 mt-1">
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
            className='flex cursor-pointer hover:underline items-center gap-2 py-4 text-sm text-neutral-700 hover:text-black font-medium transition-colors'
            href={siteConfig.resume}
            target='_blank'
          >
            View Full Resume <ExternalLink size={14} />
          </Link>
        </div>
      </div>
    </>
  );
};

export default JourneyPage;
