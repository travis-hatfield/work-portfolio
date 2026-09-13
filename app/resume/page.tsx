import { roles as staticRoles, profile } from "@/lib/data";
import { sql, ensureSchema, type RoleRow } from "@/lib/db";
import PageHero from "@/components/page-hero";

export const dynamic = "force-dynamic";
export const metadata = { title: "Resume — Travis Hatfield" };

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const coreExpertise = [
  "HR Business Partnership",
  "Org Design & Workforce Planning",
  "Employee Relations",
  "Performance Calibration & Succession",
  "Total Rewards & Compensation",
  "People Analytics & HRIS",
  "Global Compliance & Entity Setup",
  "Change Management & RIF Execution",
  "AI-Enabled HR & Automation",
];

const careerHighlights = [
  {
    title: "Executive partnership through change",
    detail:
      "Advised C-level and senior leaders on reorgs and workforce rightsizing; executed compliant RIFs across the Americas, Europe, Asia, and the Middle East, personally handling the most complicated cases, including employees on leave.",
  },
  {
    title: "Technical and creative org support",
    detail:
      "~6 years partnering with Product, Engineering, Design, and GTM teams across Fivetran, TrueNorth, Global Eagle, and 30+ Sequoia client companies.",
  },
  {
    title: "AI and systems at scale",
    detail:
      "Builds internal AI applications with Claude (HR knowledge assistant, automated reporting, onboarding and leave workflows); implemented Aidora, an AI-native leave platform; led two company-wide Rippling migrations.",
  },
  {
    title: "Global expansion",
    detail:
      "Established legal entities in Canada (2x) and Singapore with payroll, benefits, and compliance ready on day one; currently leading Netherlands setup.",
  },
];

const education = [
  { credential: "MS, Human Resources Management", org: "Walden University" },
  { credential: "BS, Organizational Leadership", org: "Middle Tennessee State University" },
  { credential: "SHRM-SCP, Senior Certified Professional", org: "Society for Human Resource Management" },
];

export default async function ResumePage() {
  await ensureSchema();
  const dbRoles = (await sql`SELECT * FROM roles ORDER BY sort_order ASC, id ASC`) as unknown as RoleRow[];
  const roles = dbRoles.length > 0 ? dbRoles : staticRoles;

  return (
    <div className="flex flex-col gap-6">
      <PageHero
        eyebrow="Career history"
        title="Resume"
        action={
          <a
            href={profile.resumePdf}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            Download PDF ↓
          </a>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        {/* Sidebar */}
        <aside className="flex flex-col gap-4 lg:sticky lg:top-4 lg:self-start">
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-base font-semibold text-white">
              {initials(profile.name)}
            </div>
            <h2 className="mt-3 text-lg font-semibold">{profile.name}</h2>
            <p className="mt-0.5 text-sm text-muted">{profile.title}</p>
            <p className="mt-3 text-sm leading-relaxed text-foreground/80">{profile.blurb}</p>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted">Contact</h3>
            <dl className="mt-2 flex flex-col gap-1.5 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-muted">Email</dt>
                <dd className="text-right">
                  <a href={`mailto:${profile.email}`} className="text-accent hover:underline">
                    {profile.email}
                  </a>
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted">Email</dt>
                <dd className="text-right">
                  <a href={`mailto:${profile.secondaryEmail}`} className="text-accent hover:underline">
                    {profile.secondaryEmail}
                  </a>
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted">Site</dt>
                <dd className="text-right">
                  <a href={profile.personalSite} className="text-accent hover:underline">
                    Personal blog
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted">Core expertise</h3>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {coreExpertise.map((s) => (
                <span key={s} className="rounded-full bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted">Education &amp; certifications</h3>
            <ul className="mt-3 flex flex-col gap-3 text-sm">
              {education.map((e) => (
                <li key={e.credential}>
                  <p className="font-medium leading-snug">{e.credential}</p>
                  <p className="text-muted">{e.org}</p>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="flex flex-col gap-6">
        {/* Career highlights */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-muted">Career highlights</h3>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            {careerHighlights.map((h) => (
              <div key={h.title}>
                <p className="text-sm font-medium">{h.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-foreground/80">{h.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Role history */}
        <div className="relative flex flex-col gap-3 before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-px before:bg-border sm:before:left-[19px]">
          {roles.map((role, idx) => (
            <details
              key={"id" in role ? String(role.id) : role.company + role.dates}
              className="group relative pl-11 sm:pl-12"
              open={idx === 0}
            >
              <div
                className={`absolute left-0 top-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ring-4 ring-background ${
                  idx === 0 ? "bg-accent text-white" : "bg-accent-soft text-accent"
                }`}
              >
                {initials(role.company)}
              </div>
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 rounded-xl border border-border bg-card px-5 py-3.5 transition-shadow group-open:shadow-sm">
                <div>
                  <p className="font-medium">{role.title}</p>
                  <p className="text-sm text-muted">
                    {role.company} <span aria-hidden="true">·</span> {role.dates}
                  </p>
                  <p className="mt-1.5 text-sm text-foreground/80">{role.summary}</p>
                </div>
                <span className="mt-1 shrink-0 text-muted transition-transform group-open:rotate-45 text-xl leading-none">
                  +
                </span>
              </summary>
              <ul className="mt-3 list-disc space-y-1.5 rounded-xl bg-card/50 pl-5 text-sm text-foreground/90 marker:text-accent">
                {role.details.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </details>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
}
