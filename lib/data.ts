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

export type Screenshot = {
  url: string;
  caption?: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  listSummary?: string;
  problem: string;
  capabilities: string;
  methodology: string;
  outcome: string;
  tools: string[];
  stats?: string;
  screenshots?: (string | Screenshot)[];
};

export const aiAssistedProjects: CaseStudy[] = [
  {
    slug: "contractor-management-workflow",
    title: "Contractor Management: From Request to Signed Contract",
    listSummary:
      "A guided intake routes each contractor request through the right approvers and generates the NDA and consulting agreement automatically.",
    problem:
      "Bringing a contractor on used to live in a policy doc: fill out a template, email Finance, email HR, and wait for the right executive to notice the thread. Nobody could tell where a request actually was without digging back through everyone's inbox.",
    capabilities:
      "A guided intake form walks the requester through contractor details, scope, budget, and department in a few steps. The app assembles an approval chain automatically for each request, routes it through Slack, generates a completed NDA and Consulting Agreement once approved, and lets People Ops withdraw a request without erasing its history.",
    methodology:
      "The approval chain is data-driven rather than hardcoded: it's assembled per request by mapping the contractor's department to the right executive, then Finance, then People Ops, then IT/Security only when the scope needs system access. Any step can be reassigned without a code change. Notifications run through Slack Workflow Builder instead of a bot token, which kept the whole thing shippable without an IT ticket. Document generation from the approved request straight into DocuSign removes a manual re-entry step that used to be its own source of errors.",
    outcome:
      "I can tell within a minute where any request is stuck instead of digging through inboxes. Notifications run through Slack Workflow Builder rather than a bot token, so nothing needed an IT ticket to stand up. A withdrawal feature lets People Ops close a request that stopped being real without deleting the record — it stays visible, closed, with the reason on it, and reopening puts the chain back in play.",
    tools: ["Next.js", "Slack Workflow Builder", "Google SSO", "DocuSign"],
    stats: "41 tests · built May–September 2026 · live, internal",
    screenshots: [
      { url: "/case-studies/contractor-management-1.jpg", caption: "Landing page — the entry point for anyone starting a new contractor request." },
      { url: "/case-studies/contractor-management-2.jpg", caption: "Case list — every request at a glance, with status so nobody has to ask where it's stuck." },
      { url: "/case-studies/contractor-management-3.jpg", caption: "New request wizard — captures scope, budget, and department in a guided flow." },
      { url: "/case-studies/contractor-management-4.jpg", caption: "Override mode on a case awaiting review — shows exactly who's holding it up." },
      { url: "/case-studies/contractor-management-5.jpg", caption: "Permissions and roles — the full team directory that drives who approves what." },
      { url: "/case-studies/contractor-management-6.jpg", caption: "A fully approved case — flat-rate terms and a document-action banner ready for DocuSign." },
      { url: "/case-studies/contractor-management-7.jpg", caption: "A withdrawn request — closed with its reason intact rather than deleted." },
    ],
  },
  {
    slug: "spot-bonus-request-routing",
    title: "Spot Bonus Requests: Three Approvals, One Auto-Generated Letter",
    listSummary:
      "One form routes a bonus through three approval stages and renders a payroll-ready award letter the moment it clears.",
    problem:
      "A spot bonus had to reach a department head, then Finance, then People Ops, and end with a letter the employee could keep. Approvals were easy to lose track of, and the person who submitted one rarely knew where it stood.",
    capabilities:
      "One form routes a bonus request through three approval stages — department head, then Finance, then People Ops — notifying each approver in Slack as it becomes their turn. On final approval, the app renders a payroll-ready award letter as a PDF in the browser. Amounts can be revised mid-flight without restarting the whole chain, and every change to an amount keeps its own visible history.",
    methodology:
      "Self-approval is blocked structurally: if a manager requests a bonus for someone on their own team, the request escalates up the chain instead of allowing a sign-off. Raising an amount after approval routes back to Finance alone, not the full chain, since only Finance's math changes. A resubmission bug that quietly cleared prior approvals (and once deleted an approver's comment) led to a fix where every resubmission starts a fresh review cycle while keeping earlier decisions visible underneath, rather than erasing them.",
    outcome:
      "The submitter gets pinged after every decision instead of chasing status by hand. Raising an amount after approval sends the request back to Finance alone rather than restarting the whole chain, and the amount carries its own history — hovering shows what it used to be, who changed it, and when. A resubmission bug that quietly cleared old approvals (and once deleted an approver's comment) was fixed so every resubmission starts a fresh cycle with earlier decisions still visible underneath.",
    tools: ["Next.js", "pdf-lib", "Rippling", "Slack Workflow Builder"],
    stats: "81 tests · built May–September 2026 · live, internal",
    screenshots: [
      { url: "/case-studies/spot-bonus-1.jpg", caption: "Dashboard — every bonus request in flight, sorted by where it's stuck." },
      { url: "/case-studies/spot-bonus-2.jpg", caption: "New request form — routes itself through department head, Finance, then People Ops." },
      { url: "/case-studies/spot-bonus-3.jpg", caption: "A request pending its department head — the approval pipeline shown step by step." },
      { url: "/case-studies/spot-bonus-4.jpg", caption: "Pending Finance — the next stage in the chain, with reviewer and wait time visible." },
      { url: "/case-studies/spot-bonus-5.jpg", caption: "Changes requested — the approver's note comes back to the submitter with an edit-and-resubmit link." },
      { url: "/case-studies/spot-bonus-6.jpg", caption: "Decision history — earlier rounds stay visible even after a resubmission." },
      { url: "/case-studies/spot-bonus-7.jpg", caption: "Fully approved — a payroll-ready award letter PDF generates automatically." },
      { url: "/case-studies/spot-bonus-8.jpg", caption: "Slack outbox — every notification the app has sent, logged as the audit trail." },
    ],
  },
  {
    slug: "hr-assistant-multi-system",
    title: "HR Assistant: One Question Box, Four Systems That Never Synced",
    listSummary:
      "A plain-language question box answers from four HR systems at once and surfaces the disagreements between them on its own.",
    problem:
      "Simple questions — how many people in Canada, who starts in the next two weeks, whether a leave of absence has actually ended — lived across four systems that never synced. Anything crossing two of them meant exporting spreadsheets that were stale before the merge was finished.",
    capabilities:
      "A plain-language question box answers from four live HR systems (Rippling, Greenhouse, Deel, Aidora) and returns a sortable, filterable table. It surfaces cross-system disagreements automatically, such as a leave case marked active in one system but ended in another, or a contractor still active after being terminated elsewhere. Every answer carries its data source and the time it was pulled.",
    methodology:
      "The system is read-only by construction, not by convention — there is no write method anywhere in the codebase. Questions are classified by a deterministic query engine with no network call and no model involved, so common questions answer identically every time; only unrecognized questions fall through to an LLM via a company proxy, and the app says it doesn't know rather than guessing. That split kept the common path fast and predictable while still handling open-ended questions.",
    outcome:
      "The most useful output turned out to be the disagreements the tool surfaces on its own: leave cases where one system says someone's out while another still shows them active, or a contractor sitting active in one system after being terminated in another. Both used to surface at quarter-end; now they take a minute to find. As of September 2026 it covers roughly 140 employees across 16 departments and 4 countries, with 205 tests.",
    tools: ["Next.js", "Rippling", "Greenhouse", "Deel"],
    stats: "205 tests · built June–August 2026 · running locally",
    screenshots: [
      { url: "/case-studies/hr-assistant-1.jpg", caption: "The question box — plain-language questions answered from live data, read-only by design." },
      { url: "/case-studies/hr-assistant-2.jpg", caption: "A sourced answer — every result carries where it came from and when it was pulled." },
      { url: "/case-studies/hr-assistant-3.jpg", caption: "HR dashboard — headcount, hiring, and attrition pulled live rather than exported by hand." },
      { url: "/case-studies/hr-assistant-4.jpg", caption: "Employee directory — read-only records across systems that don't otherwise sync." },
      { url: "/case-studies/hr-assistant-5.jpg", caption: "A cross-system disagreement surfaced automatically — the tool's most useful output." },
      { url: "/case-studies/hr-assistant-6.jpg", caption: "Org chart view — reporting lines drawn from the same live source." },
      { url: "/case-studies/hr-assistant-7.jpg", caption: "Compensation view — flagged confidential and handled with the same care as the underlying HR system." },
      { url: "/case-studies/hr-assistant-8.jpg", caption: "EOR reconciliation — contractor records checked against a second system for drift." },
    ],
  },
  {
    slug: "org-chart-live-rippling",
    title: "Org Chart: A Live Read Instead of a Hand-Maintained Slide Deck",
    listSummary:
      "A zero-dependency server reads the HR platform directly and draws a company org chart that never goes stale.",
    problem:
      "Every reporting-line question meant opening a Slides deck maintained by hand. It was right on the day it was last touched and quietly wrong every day after, since managers change, people join, and people leave without a slide ever knowing.",
    capabilities:
      "A plain Node server with zero npm dependencies reads the HR platform's worker API directly and renders the entire company as an interactive chart. Anyone can click a person to zoom into their team, or search by name, title, or department. It exports to print/PDF with one team per page.",
    methodology:
      "Sensitive fields — birthdate, compensation, personal email — never leave the server; the page itself only ever receives seven fields (name, title, department, start date, photo, manager, leave status). A background refresh warms the data on a timer so cold requests never wait on a live pull, which took response time from roughly 23 seconds down to about 0.02. Because it re-reads the source through the day, people who haven't started yet or who've already left drop off automatically — no manual maintenance required.",
    outcome:
      "Nothing about it needs maintaining — it re-reads the source through the day on its own, and people who haven't started yet or who've already left drop off automatically. A background refresh (data warmed on a timer, cold requests never wait on the live pull) took response time from about 23 seconds to about 0.02. Print/PDF export puts one team per page across the whole company. The Slides deck it replaced is retired.",
    tools: ["Node.js", "Rippling API"],
    stats: "44 tests · built August–September 2026 · live, internal",
    screenshots: [
      { url: "/case-studies/org-chart-1.jpg", caption: "Whole-company view — every top-level report, drawn live from the HR platform." },
      { url: "/case-studies/org-chart-2.jpg", caption: "Zoomed into a team — click anyone to see just their reports." },
      { url: "/case-studies/org-chart-3.jpg", caption: "Search — find anyone by name, title, or department in one box." },
      { url: "/case-studies/org-chart-4.jpg", caption: "Outline view — the same org as a flat, scannable list for print or export." },
    ],
  },
  {
    slug: "headcount-business-case-routing",
    title: "Headcount Business Case: A Word Template That Now Routes Itself",
    listSummary:
      "A single business case form routes itself through four fixed reviews, so nobody has to chase down who's holding up a request.",
    problem:
      "The headcount process lived in a Word template that got emailed around. Nobody could tell you who had to sign off, in what order, or where a request had been sitting for three weeks — every approval turned into somebody chasing somebody.",
    capabilities:
      "A hiring manager fills out a business case once — role, level, justification — and it routes through four fixed reviews: the functional leader, then Talent Planning, then Finance, then Recruiting. Each reviewer gets a Slack message with approve/decline links. A single dashboard lists every open request sorted by longest wait, with a one-click reminder per stage.",
    methodology:
      "The manager never sets a salary; Talent Planning sets the pay range as part of approving, which flips how the range used to get decided by whoever typed into the Word template first. The reminder button is rate-limited per stage since reminding is the one repeatable action — a lesson learned after an earlier version let a reminder fire fifty times to the same executive before the limit existed. Every action the app takes, including suppressed or failed messages, is logged for audit.",
    outcome:
      "A request that used to sit in an inbox for three weeks now shows exactly who it's waiting on and for how long. A single page lists everything still waiting, longest wait first, with a rate-limited reminder button per stage — reminding is the one action safe to repeat, which is also exactly the kind of thing that once sent an executive fifty test messages before the rate limit existed. Every action the app has taken is logged, including messages it suppressed or failed to send.",
    tools: ["Next.js", "Slack Workflow Builder"],
    stats: "254 tests · built August–September 2026 · live, internal",
    screenshots: [
      { url: "/case-studies/headcount-business-case-1.jpg", caption: "Landing page — start a request or see everything still waiting on a decision." },
      { url: "/case-studies/headcount-business-case-2.jpg", caption: "How approval works — four fixed reviews, shown up front so nobody has to ask." },
      { url: "/case-studies/headcount-business-case-3.jpg", caption: "Request queue — open cases sorted by how they're moving through the review." },
      { url: "/case-studies/headcount-business-case-4.jpg", caption: "New business case form — role, level, and justification captured once." },
      { url: "/case-studies/headcount-business-case-5.jpg", caption: "Request queue view — status and stage visible for every open case at once." },
      { url: "/case-studies/headcount-business-case-6.jpg", caption: "New request form — the same guided flow, department-first." },
      { url: "/case-studies/headcount-business-case-7.jpg", caption: "Mid-approval — pay range set by Talent Planning, Finance reviewing next, with a wait timer." },
      { url: "/case-studies/headcount-business-case-8.jpg", caption: "'Where everything is' — the longest-waiting requests, with a one-click reminder per stage." },
    ],
  },
  {
    slug: "new-hire-onboarding-checklist",
    title: "New Hire Onboarding: Fifteen Steps in One Place Instead of Four",
    listSummary:
      "One dashboard replaces four disconnected onboarding threads with a single phase-by-phase checklist per hire.",
    problem:
      "Onboarding is the most predictable work a People team does and the easiest to drop, because none of it happens in one place — offer paperwork with HR, a laptop with IT, a Day 1 calendar with the manager — held together only by whoever remembers to check.",
    capabilities:
      "A dashboard shows one card per hire — role, manager, days to or since start, current phase, percent complete. Opening a hire reveals the full fifteen-step checklist grouped by phase, from pre-start through day ninety, each task with an owner and a due date. The new hire sees only their own checklist, with no visibility into anyone else's onboarding.",
    methodology:
      "Every task's due date is computed as an offset from the hire's actual start date rather than a fixed calendar day, so a single template works regardless of when someone starts. That design surfaced a real bug: a date parsed at UTC midnight rendered a day early for anyone west of Greenwich, making Day 1 look like Day 2. Fixing the date logic once, in a single shared function instead of the fifteen places it had been duplicated, is what made the tool trustworthy enough to rely on.",
    outcome:
      "Every task's due date is an offset from the start date rather than a fixed day, so one template works for every hire regardless of when they begin — and it surfaced a real bug: a date parsed at UTC midnight rendered a day early for anyone west of Greenwich, making Day 1 look like Day 2. Fixing it in one shared function instead of fifteen scattered ones is what actually made the tool trustworthy.",
    tools: ["Next.js"],
    stats: "13 tests · built June 2026 · pilot, running locally",
    screenshots: [
      { url: "/case-studies/new-hire-onboarding-1.jpg", caption: "New hires dashboard — one card per hire, with days to start and percent complete." },
      { url: "/case-studies/new-hire-onboarding-2.jpg", caption: "The full checklist — every task grouped by phase, pre-start through day ninety." },
      { url: "/case-studies/new-hire-onboarding-3.jpg", caption: "A task expanded — owner, due date, and sub-steps in one place." },
      { url: "/case-studies/new-hire-onboarding-4.jpg", caption: "Filtered by owner — HR, manager, or the new hire's own six tasks." },
    ],
  },
];

export const personalAiProjects: CaseStudy[] = [
  {
    slug: "nyc-building-report",
    title: "NYC Building Report: Address Intelligence from Open Data",
    listSummary:
      "Pulls NYC Open Data and OpenStreetMap together so a single address returns structured building facts.",
    problem:
      "Wanted a tool to query NYC property data, cross-reference with Open Street Map, and surface building facts at a glance.",
    capabilities:
      "A single address input returns structured building facts pulled from NYC's own open data — property records, zoning, and nearby context layered in from OpenStreetMap.",
    methodology:
      "Built as a vanilla JS frontend backed by serverless Vercel Functions, with NYC Open Data's PLUTO and DBN datasets doing the heavy lifting and the Overpass API filling in OpenStreetMap context. Kept intentionally lightweight and fully public, with reusable data-fetching patterns in the open-source repo.",
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
