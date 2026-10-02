import { roles as staticRoles, profile } from "@/lib/data";
import { sql, ensureSchema, type RoleRow } from "@/lib/db";
import PageHero from "@/components/page-hero";
import { coreExpertise, careerHighlights, education } from "@/lib/resume";

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

export default async function ResumePage() {
  await ensureSchema();
  const dbRoles = (await sql`SELECT * FROM roles ORDER BY sort_order ASC, id ASC`) as unknown as RoleRow[];
  const roles = dbRoles.length > 0 ? dbRoles : staticRoles;

  return (
    <div className="flex flex-col gap-5">
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

      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        {/* Sidebar — merged into fewer, denser cards */}
        <aside className="flex flex-col gap-4 lg:sticky lg:top-20 lg:self-start">
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              {profile.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profile.photo}
                  alt={profile.name}
                  className="h-14 w-14 shrink-0 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent text-base font-semibold text-white">
                  {initials(profile.name)}
                </div>
              )}
              <div>
                <h2 className="font-display text-lg font-medium leading-tight">{profile.name}</h2>
                <p className="mt-0.5 text-xs leading-snug text-muted">{profile.resumeHeadline}</p>
                <p className="mt-0.5 text-xs leading-snug text-muted">{profile.location}</p>
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-foreground/80">{profile.blurb}</p>

            <div className="mt-4 flex flex-col gap-1 border-t border-border pt-3 text-sm">
              <a href={`mailto:${profile.email}`} className="text-accent hover:underline">
                {profile.email}
              </a>
              <a href={`mailto:${profile.secondaryEmail}`} className="text-muted hover:text-accent hover:underline">
                {profile.secondaryEmail}
              </a>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted">Core expertise</h3>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {coreExpertise.map((s) => (
                <span key={s} className="rounded-full bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent">
                  {s}
                </span>
              ))}
            </div>

            <h3 className="mt-5 text-xs font-semibold uppercase tracking-wide text-muted">Education &amp; certifications</h3>
            <ul className="mt-2.5 flex flex-col gap-2.5 text-sm">
              {education.map((e) => (
                <li key={e.credential}>
                  <p className="font-medium leading-snug">{e.credential}</p>
                  <p className="text-muted">{e.org}</p>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="flex flex-col gap-5">
          {/* Career highlights */}
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted">Career highlights</h3>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              {careerHighlights.map((h) => (
                <div key={h.title}>
                  <p className="font-display text-base font-medium">{h.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-foreground/80">{h.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Role history */}
          <div className="relative flex flex-col gap-2.5 before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-px before:bg-border sm:before:left-[19px]">
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
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 rounded-xl border border-border bg-card px-5 py-3 transition-shadow group-open:shadow-sm">
                  <div>
                    <p className="font-display text-lg font-medium">{role.title}</p>
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
