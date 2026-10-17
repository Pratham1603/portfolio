// Edit this file to make the template yours. Everything about your identity,
// links, SEO, and navigation lives here. Leave a field blank ("") to hide the UI
// that depends on it. For example, an empty `phone` hides the call button.

export const siteConfig = {
  name: "Pratham Harer",
  role: "AI Engineer",
  tagline: "AI Engineer building intelligent backends.",
  bio: "Hey, I’m Pratham, in Mumbai, and I build AI systems that hold up on real work. B.Tech student in CSE (AI & ML) at Lokmanya Tilak College of Engineering, formerly Generative AI Engineer at Jio Platforms.",

  email: "prathamharer1603@gmail.com",
  phone: "", // used by the contact call button; blank hides it
  siteUrl: "https://pratham-harer.is-an.ai",

  avatar: "/images/avatar.png",
  resume: "/resume.pdf",
  calLink: "", // your Cal.com handle (e.g. "yourname/30min"); blank hides the booking embed

  githubUsername: "Pratham1603", // used for the GitHub contributions graph
  githubContributionsCount: 611, // total contributions till date (including private contributions)

  social: {
    twitter: "https://x.com/HarerPrath74363",
    linkedin: "https://www.linkedin.com/in/pratham-harer-143112315/",
    github: "https://github.com/Pratham1603",
    instagram: "",
    medium: "https://medium.com/@prathamharer1603",
  },

  seo: {
    defaultTitle: "Pratham Harer — AI Engineer",
    defaultDescription: "AI Engineer building intelligent backends, ML systems, and scalable APIs.",
    twitterHandle: "@HarerPrath74363",
    keywords: "AI engineer, machine learning, backend, Python, portfolio, Pratham Harer",
  },

  nav: [
    { name: "Home", path: "/", description: "Overview." },
    { name: "About", path: "/about", description: "About me." },
    { name: "Projects", path: "/projects", description: "Things I've built." },
    { name: "Certifications", path: "/certifications", description: "Licenses & certifications." },
    { name: "Blogs", path: "/blogs", description: "Notes and writing." },
    { name: "Services", path: "/services", description: "Services I provide." },
    { name: "Contact", path: "/contact", description: "Get in touch." },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
