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
      "Designed and built six internal AI-assisted tools with Claude Code: contractor workflows, spot bonus routing, an HR knowledge assistant, org chart syncing, headcount business case routing, and new hire onboarding.",
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
  screenshots?: string[];
};

export const aiAssistedProjects: CaseStudy[] = [
  {
    slug: "contractor-management-workflow",
    title: "Contractor Management: From Request to Signed Contract",
    problem:
      "Bringing a contractor on used to live in a policy doc: fill out a template, email Finance, email HR, and wait for the right executive to notice the thread. Nobody could tell where a request actually was without digging back through everyone's inbox.",
    approach:
      "A guided form captures who the contractor is, the scope, the budget, and who should approve it. The approval chain is assembled per request — the executive mapped to the contractor's department, then Finance, then People Ops, then IT/Security when the scope needs system access — and any step can be reassigned without touching code. Each approver gets a Slack DM with approve/deny links; a denial goes back to the submitter with the reason and an edit-and-resubmit link. Once the chain clears, the app generates a completed NDA and Consulting Agreement from the request, ready for DocuSign.",
    outcome:
      "I can tell within a minute where any request is stuck instead of digging through inboxes. Notifications run through Slack Workflow Builder rather than a bot token, so nothing needed an IT ticket to stand up. A withdrawal feature lets People Ops close a request that stopped being real without deleting the record — it stays visible, closed, with the reason on it, and reopening puts the chain back in play.",
    tools: ["Next.js", "Slack Workflow Builder", "Google SSO", "DocuSign"],
    stats: "41 tests · built May–September 2026 · live, internal",
    screenshots: [
      "/case-studies/contractor-management-1.jpg",
      "/case-studies/contractor-management-2.jpg",
      "/case-studies/contractor-management-3.jpg",
      "/case-studies/contractor-management-4.jpg",
      "/case-studies/contractor-management-5.jpg",
      "/case-studies/contractor-management-6.jpg",
      "/case-studies/contractor-management-7.jpg",
    ],
  },
  {
    slug: "spot-bonus-request-routing",
    title: "Spot Bonus Requests: Multi-Stage Approvals with an Auto-Generated Award Letter",
    problem:
      "A spot bonus had to reach a department head, then Finance, then People Ops, and end with a letter the employee could keep. Approvals were easy to lose track of, and the person who submitted one rarely knew where it stood.",
    approach:
      "One form routes itself through three stages, with each approver notified in Slack as it's their turn. Nobody can approve their own request — if a manager wants a bonus for someone on their own team, it escalates up the chain instead. When the last approval lands, the app renders the award letter as a PDF in the browser, ready for payroll.",
    outcome:
      "The submitter gets pinged after every decision instead of chasing status by hand. Raising an amount after approval sends the request back to Finance alone rather than restarting the whole chain, and the amount carries its own history — hovering shows what it used to be, who changed it, and when. A resubmission bug that quietly cleared old approvals (and once deleted an approver's comment) was fixed so every resubmission starts a fresh cycle with earlier decisions still visible underneath.",
    tools: ["Next.js", "pdf-lib", "Rippling", "Slack Workflow Builder"],
    stats: "81 tests · built May–September 2026 · live, internal",
    screenshots: [
      "/case-studies/spot-bonus-1.jpg",
      "/case-studies/spot-bonus-2.jpg",
      "/case-studies/spot-bonus-3.jpg",
      "/case-studies/spot-bonus-4.jpg",
      "/case-studies/spot-bonus-5.jpg",
      "/case-studies/spot-bonus-6.jpg",
      "/case-studies/spot-bonus-7.jpg",
      "/case-studies/spot-bonus-8.jpg",
    ],
  },
  {
    slug: "hr-assistant-multi-system",
    title: "HR Assistant: One Question Box Over Four Systems That Don't Talk to Each Other",
    problem:
      "Simple questions — how many people in Canada, who starts in the next two weeks, whether a leave of absence has actually ended — lived across four systems that never synced. Anything crossing two of them meant exporting spreadsheets that were stale before the merge was finished.",
    approach:
      "A question box answers from live data and hands back a sortable, filterable table. Read-only is structural, not a rule to remember: there's no write method anywhere in the code. Questions run through a query engine that classifies intent deterministically — no network call, no model — so the questions I ask most answer the same way every time; anything unrecognized falls through to an LLM through a company proxy, and the app says it doesn't know rather than guessing. Every answer carries its source and pull time, logged for audit.",
    outcome:
      "The most useful output turned out to be the disagreements the tool surfaces on its own: leave cases where one system says someone's out while another still shows them active, or a contractor sitting active in one system after being terminated in another. Both used to surface at quarter-end; now they take a minute to find. As of September 2026 it covers roughly 140 employees across 16 departments and 4 countries, with 205 tests.",
    tools: ["Next.js", "Rippling", "Greenhouse", "Deel"],
    stats: "205 tests · built June–August 2026 · running locally",
    screenshots: [
      "/case-studies/hr-assistant-1.jpg",
      "/case-studies/hr-assistant-2.jpg",
      "/case-studies/hr-assistant-3.jpg",
      "/case-studies/hr-assistant-4.jpg",
      "/case-studies/hr-assistant-5.jpg",
      "/case-studies/hr-assistant-6.jpg",
      "/case-studies/hr-assistant-7.jpg",
      "/case-studies/hr-assistant-8.jpg",
    ],
  },
  {
    slug: "org-chart-live-rippling",
    title: "Org Chart: A Live Read Instead of a Hand-Maintained Slide Deck",
    problem:
      "Every reporting-line question meant opening a Slides deck maintained by hand. It was right on the day it was last touched and quietly wrong every day after, since managers change, people join, and people leave without a slide ever knowing.",
    approach:
      "A plain Node server with zero npm dependencies reads the HR platform's worker API and draws the whole company as a chart. Click anyone to zoom into their team; search by name, title, or department. The sensitive fields — birthdate, compensation, personal email — never leave the server; the page itself only ever receives seven fields: name, title, department, start date, photo, manager, and leave status.",
    outcome:
      "Nothing about it needs maintaining — it re-reads the source through the day on its own, and people who haven't started yet or who've already left drop off automatically. A background refresh (data warmed on a timer, cold requests never wait on the live pull) took response time from about 23 seconds to about 0.02. Print/PDF export puts one team per page across the whole company. The Slides deck it replaced is retired.",
    tools: ["Node.js", "Rippling API"],
    stats: "44 tests · built August–September 2026 · live, internal",
    screenshots: [
      "/case-studies/org-chart-1.jpg",
      "/case-studies/org-chart-2.jpg",
      "/case-studies/org-chart-3.jpg",
      "/case-studies/org-chart-4.jpg",
    ],
  },
  {
    slug: "headcount-business-case-routing",
    title: "Headcount Business Case: A Word Template That Now Routes Itself",
    problem:
      "The headcount process lived in a Word template that got emailed around. Nobody could tell you who had to sign off, in what order, or where a request had been sitting for three weeks — every approval turned into somebody chasing somebody.",
    approach:
      "A hiring manager fills in the business case once — role, level, why it's needed — and it routes through four fixed reviews: the functional leader who owns the team, then Talent Planning, then Finance, then Recruiting. Each reviewer gets a Slack message with approve/decline links. The manager never enters a salary; Talent Planning sets the pay range as part of approving, which flips how the range used to get set by whoever typed into the template first.",
    outcome:
      "A request that used to sit in an inbox for three weeks now shows exactly who it's waiting on and for how long. A single page lists everything still waiting, longest wait first, with a rate-limited reminder button per stage — reminding is the one action safe to repeat, which is also exactly the kind of thing that once sent an executive fifty test messages before the rate limit existed. Every action the app has taken is logged, including messages it suppressed or failed to send.",
    tools: ["Next.js", "Slack Workflow Builder"],
    stats: "254 tests · built August–September 2026 · live, internal",
    screenshots: [
      "/case-studies/headcount-business-case-1.jpg",
      "/case-studies/headcount-business-case-2.jpg",
      "/case-studies/headcount-business-case-3.jpg",
      "/case-studies/headcount-business-case-4.jpg",
      "/case-studies/headcount-business-case-5.jpg",
      "/case-studies/headcount-business-case-6.jpg",
      "/case-studies/headcount-business-case-7.jpg",
      "/case-studies/headcount-business-case-8.jpg",
    ],
  },
  {
    slug: "new-hire-onboarding-checklist",
    title: "New Hire Onboarding: Fifteen Steps in One Place Instead of Four",
    problem:
      "Onboarding is the most predictable work a People team does and the easiest to drop, because none of it happens in one place — offer paperwork with HR, a laptop with IT, a Day 1 calendar with the manager — held together only by whoever remembers to check.",
    approach:
      "A dashboard shows one card per hire: role, manager, days to or since start, current phase, percent complete. Opening a hire shows the full checklist grouped by phase, pre-start through day ninety, with an owner, a due day counted from the start date, and sub-steps on every task. The new hire sees that same checklist and nothing else — no dashboard, no visibility into anyone else's onboarding.",
    outcome:
      "Every task's due date is an offset from the start date rather than a fixed day, so one template works for every hire regardless of when they begin — and it surfaced a real bug: a date parsed at UTC midnight rendered a day early for anyone west of Greenwich, making Day 1 look like Day 2. Fixing it in one shared function instead of fifteen scattered ones is what actually made the tool trustworthy.",
    tools: ["Next.js"],
    stats: "13 tests · built June 2026 · pilot, running locally",
    screenshots: [
      "/case-studies/new-hire-onboarding-1.jpg",
      "/case-studies/new-hire-onboarding-2.jpg",
      "/case-studies/new-hire-onboarding-3.jpg",
      "/case-studies/new-hire-onboarding-4.jpg",
    ],
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
