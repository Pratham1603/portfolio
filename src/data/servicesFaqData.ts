export type ServiceFaq = {
  question: string;
  answer: string;
};

export const servicesFaqData: ServiceFaq[] = [
  {
    question: "Can you work with the tools I already use?",
    answer:
      "Yes. I can connect AI agents to your CRM, email, Slack, spreadsheets, and databases, so your team doesn't have to switch software. If you already have an AI tool that makes mistakes or that your team doesn't trust, I can test it, find the problems, and fix them.",
  },
  {
    question: "How much will it cost, and how will I know it's worth it?",
    answer:
      "Each service has a fixed price, agreed before we start, so there are no surprise bills. We set a clear goal at the start, such as hours saved per week or faster customer replies. The audit estimates the savings before you commit, and after launch I report on the real results.",
  },
  {
    question: "Is my company data safe, and what if the AI makes a mistake?",
    answer:
      "Your data stays protected. The AI only sees what it needs, access is limited by role, and every action is recorded. No AI is perfect, so I test it on real examples before launch, require a person's approval for important actions, and show sources so answers are easy to check. After launch, monitoring catches problems early.",
  },
  {
    question: "Will AI replace my team, and do we need technical skills to use it?",
    answer:
      "The goal is to take repetitive work off your team so they can focus on work that needs people. You don't need any technical skills. If your team can use email or chat, they can use the AI, and I provide simple instructions and a walkthrough.",
  },
  {
    question: "How long does a project take, and what happens after launch?",
    answer:
      "An audit takes 1 to 2 weeks, a knowledge assistant 2 to 4 weeks, and a custom AI agent 3 to 6 weeks. The finished system, your data, and your documents belong to you, with full documentation so you are never locked in. After launch, you can add optional monthly support to monitor performance, fix issues, and keep the AI up to date.",
  },
];

export default servicesFaqData;
