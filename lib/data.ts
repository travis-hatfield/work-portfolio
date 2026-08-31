export const profile = {
  name: "Travis Hatfield",
  title: "Builder focused on AI-assisted product & workflow work",
  blurb:
    "I design and ship AI-assisted tools and workflows — from production features to personal automations. This site is the professional side of a two-domain setup; the personal blog and photo journal live at travishatfield.dev.",
  email: "hello@travishatfield.dev",
  personalSite: "https://travishatfield.dev",
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
    slug: "example-ai-assisted-1",
    title: "Example: Automating a Manual Review Workflow",
    problem: "Placeholder — describe the business problem or bottleneck.",
    approach: "Placeholder — describe how AI tooling was applied and why.",
    outcome: "Placeholder — quantify the result (time saved, error rate, adoption).",
    tools: ["Claude", "Internal tooling"],
  },
];

export const personalAiProjects: CaseStudy[] = [
  {
    slug: "example-personal-ai-1",
    title: "Example: This Portfolio Site",
    problem: "Wanted a professional site separate from a personal blog, built and deployed with minimal manual setup.",
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
