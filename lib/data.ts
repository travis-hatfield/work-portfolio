export const profile = {
  name: "Travis Hatfield",
  title: "Senior HR Business Partner · Global People Operations & AI-Enabled HR Leader",
  blurb:
    "I lead People Operations and HR Business Partnership for high-growth, global teams — org design, workforce planning, employee relations, and compliant execution through RIFs, migrations, and expansion into new countries. I also build the internal AI tools my team runs on: an HR knowledge assistant, automated reporting, and onboarding/offboarding workflows built with Claude.",
  email: "hello@travishatfield.dev",
  resumePdf: "/resume-travis-hatfield.pdf",
};

export type Role = {
  company: string;
  title: string;
  dates: string;
  summary: string;
  details: string[];
};

export const roles: Role[] = [
  {
    company: "Company Name",
    title: "Job Title",
    dates: "2023 — Present",
    summary: "One-line summary of scope and impact goes here.",
    details: [
      "Key responsibility or project #1, written as an outcome.",
      "Key responsibility or project #2.",
      "Tools/stack used in this role.",
    ],
  },
  {
    company: "Previous Company",
    title: "Previous Title",
    dates: "2021 — 2023",
    summary: "One-line summary of scope and impact goes here.",
    details: [
      "Key responsibility or project #1.",
      "Key responsibility or project #2.",
    ],
  },
];

export type CaseStudy = {
  slug: string;
  title: string;
  problem: string;
  approach: string;
  outcome: string;
  tools: string[];
};

export const aiAssistedProjects: CaseStudy[] = [
  {
    slug: "hr-knowledge-assistant-and-automation",
    title: "Building an AI-First People Function with Claude",
    problem:
      "A People Ops team supporting 100+ employees across four countries was answering the same policy questions and running the same manual reporting, onboarding, offboarding, and leave processes by hand — slow for employees and a drag on the HRBP team's time for higher-judgment work.",
    approach:
      "Built internal AI applications with Claude: an HR knowledge assistant employees can ask policy questions directly, automated headcount and people reporting workflows, and automated onboarding, offboarding, and leave processes. Also implemented Aidora, an AI-native leave-of-absence platform, as part of a broader shift to AI-first ways of working across the People function.",
    outcome:
      "Faster, more consistent answers for employees, less manual reporting overhead for the HRBP team, and a leave process that runs with far less back-and-forth — freeing the team to focus on org design, employee relations, and the complex cases that actually need a human.",
    tools: ["Claude", "Aidora", "Rippling"],
  },
];

export const personalAiProjects: CaseStudy[] = [
  {
    slug: "example-personal-ai-1",
    title: "Example: This Portfolio Site",
    problem: "Wanted a professional portfolio site built and deployed with minimal manual setup.",
    approach: "Scaffolded with Next.js + Tailwind, structured content as data, deployed via Vercel from an agentic build session.",
    outcome: "Static, fast, easy to extend — new case studies or resources are just data entries.",
    tools: ["Next.js", "Tailwind CSS", "Vercel"],
  },
];

export type Resource = {
  title: string;
  description: string;
  fileType: string;
  size: string;
  href: string;
  category: string;
};

export const resources: Resource[] = [
  {
    title: "Example Template",
    description: "One-line description of what this file is and who it's for.",
    fileType: "PDF",
    size: "120 KB",
    href: "#",
    category: "Templates",
  },
];
