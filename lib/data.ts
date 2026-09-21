export const profile = {
  name: "Travis Hatfield",
  title: "Senior HR Business Partner · Global People Operations & AI-Enabled HR Leader",
  blurb:
    "I lead People Operations and HR Business Partnership for high-growth, global teams — org design, workforce planning, employee relations, and compliant execution through RIFs, migrations, and expansion into new countries. I also build the internal AI tools my team runs on: an HR knowledge assistant, automated reporting, and onboarding/offboarding workflows built with Claude.",
  email: "hello@travishatfield.dev",
  secondaryEmail: "thatfield0720@gmail.com",
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
    company: "Syndio",
    title: "Sr People Operations Specialist",
    dates: "May 2023 — September 2026",
    summary: "Built internal AI tools to automate HR workflows and provide intelligent cross-system knowledge access for the People Ops team and employees.",
    details: [
      "Designed and built five internal AI-assisted tools with Claude API: contractor workflows, spot bonus routing, HR knowledge assistant, org chart syncing, and headcount business case routing.",
      "Reduced manual HR processes by automating approvals, document generation, and data aggregation across Rippling, Greenhouse, Deel, and Aidora.",
      "Implemented compliance-first routing, auto-filled contracts with DocuSign, and real-time Slack notifications for visibility.",
      "Tech: Claude, Next.js, Node.js, Tailwind CSS, Rippling API, pdf-lib, Neon Postgres, Vercel Blob.",
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
  stats?: string;
};

export const aiAssistedProjects: CaseStudy[] = [
  {
    slug: "contractor-management-workflow",
    title: "Contractor Management: From Request to Signed Contract",
    problem:
      "Email-based workflow with no visibility into stuck requests. Documents were lost in thread chains, and approvers had to dig through conversations to find action items.",
    approach:
      "Built a Next.js form-to-approval-chain system: contractor details → multi-stage approval (HM → Finance → HR → IT/Security) → Slack DMs at each stage → auto-fills NDA + Consulting Agreement → auto-submits background check to third-party API.",
    outcome:
      "One unified form instead of email threads. Real-time Slack notifications at each stage keep approvers aware. Generated documents are immediately ready for DocuSign. Full visibility for the People team: no lost requests.",
    tools: ["Claude", "Next.js", "Slack Workflow Builder", "Neon Postgres", "DocuSign", "Google SSO"],
    stats: "34 tests, built May–September 2026",
  },
  {
    slug: "spot-bonus-request-routing",
    title: "Spot Bonus Requests: Multi-Stage Approvals with Auto-Generated Award Letters",
    problem:
      "No visibility into bonus requests. Approvers often missed them. Award letters were typed by hand and inconsistent. Requests were lost in email.",
    approach:
      "Three-stage form-based routing: department head submits request → Finance approves budget → People Ops approves and triggers award letter generation using pdf-lib to render a vector logo and employee details directly into the PDF.",
    outcome:
      "Pinged after every decision via Slack. Award letter prints ready on approval. Handles edge cases: self-approvals, amount adjustments, restricted approver roles.",
    tools: ["Claude", "Next.js", "pdf-lib", "Rippling", "Slack Workflow Builder"],
    stats: "81 tests, built May–September 2026",
  },
  {
    slug: "hr-assistant-multi-system",
    title: "HR Assistant: Unified Q&A Across Four Disconnected HR Systems",
    problem:
      "Every cross-system question required manual spreadsheet merges from four separate systems (Rippling, Greenhouse, Deel, Aidora). People team wasted time collating data.",
    approach:
      "Next.js app reading live APIs from Rippling, Greenhouse, Deel, Aidora; accepts free-text questions routed through Claude via a Syndio proxy. Pre-built pages: org chart, comp ladder (USD), pay equity (with suppression thresholds), time off balances, departures. Runs locally behind SSO.",
    outcome:
      "Single question box gets live answers across all systems. Surfaces cross-system disagreements (e.g., employee marked departed in one system, active in another). Eliminates manual data pulls and spreadsheet work.",
    tools: ["Claude", "Next.js", "Rippling", "Greenhouse", "Deel", "Aidora"],
    stats: "201 tests, built June–August 2026",
  },
  {
    slug: "org-chart-live-rippling",
    title: "Org Chart: A Live-Syncing Replacement for a Hand-Maintained Google Slides",
    problem:
      "Org chart was maintained in a Google Slides deck by hand. It was stale within hours of any hire or departure, and the deck became a bottleneck.",
    approach:
      "Plain Node.js server, zero npm dependencies, polls Rippling workers API every 15 minutes in the background. Token stays server-side to protect sensitive fields. Frontend receives only 7 fields: name, title, department, manager, manager_id, hire_date, status.",
    outcome:
      "Org chart is always current—appears/disappears immediately on hire/departure. Supports search by name, title, or department. Print/PDF per team page. Google Slides deck retired.",
    tools: ["Claude", "Node.js", "Rippling API"],
    stats: "37 tests, built August–September 2026",
  },
  {
    slug: "headcount-business-case-routing",
    title: "Headcount Business Case: From Form to Requisition Without Email",
    problem:
      "Word template circulated via email with no routing visibility. Managers typed in salary figures without pay band context. Recruiting learned of approvals through forwarded emails.",
    approach:
      "Four-reviewer fixed chain: functional leader submits → Talent Planning reviews and sets pay band → Finance approves budget → Recruiting receives ready-to-open requisition. Slack notifications at each stage. No salary field for managers (pay bands enforced upstream).",
    outcome:
      "Transparent, auditable routing. Pay bands vetted before Finance review. Auto-generated business case doc, requisition-ready for Recruiting. Approvers stay in sync via Slack.",
    tools: ["Claude", "Next.js", "Slack Workflow Builder", "Neon Postgres"],
    stats: "193 tests, built August–September 2026",
  },
];

export const personalAiProjects: CaseStudy[] = [
  {
    slug: "nyc-building-report",
    title: "NYC Building Report: Address Intelligence from Open Data",
    problem:
      "Wanted a tool to query NYC property data, cross-reference with Open Street Map, and surface building facts at a glance.",
    approach:
      "Vanilla JS frontend, NYC Open Data APIs (PLUTO, DBN), Overpass API for OSM data, serverless Vercel Functions backend. Single address input → structured JSON output.",
    outcome:
      "Fast, lightweight, fully public. Open-source repo with reusable data fetching patterns.",
    tools: ["Vanilla JS", "NYC Open Data", "Overpass API", "Vercel Functions"],
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
