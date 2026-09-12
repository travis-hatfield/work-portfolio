import { roles as staticRoles, profile } from "@/lib/data";
import { sql, ensureSchema, type RoleRow } from "@/lib/db";

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
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h1 className="text-2xl font-semibold tracking-tight">Resume</h1>
        <a
          href={profile.resumePdf}
          className="rounded-lg bg-accent px-3 py-1.5 text-sm font-medium text-white hover:opacity-90"
        >
          Download PDF ↓
        </a>
      </div>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        {/* Sidebar */}
        <aside className="flex flex-col gap-6 lg:sticky lg:top-8 lg:self-start">
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-lg font-semibold text-white">
              {initials(profile.name)}
            </div>
            <h2 className="mt-4 text-lg font-semibold">{profile.name}</h2>
            <p className="mt-1 text-sm text-muted">{profile.title}</p>
            <p className="mt-4 text-sm leading-relaxed text-foreground/80">{profile.blurb}</p>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted">Contact</h3>
            <dl className="mt-3 flex flex-col gap-2 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-muted">Email</dt>
                <dd className="text-right">
                  <a href={`mailto:${profile.email}`} className="text-accent hover:underline">
                    {profile.email}
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

          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted">At a glance</h3>
            <dl className="mt-3 flex flex-col gap-2 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-muted">Roles</dt>
                <dd>{roles.length}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted">Current</dt>
                <dd className="text-right">{roles[0]?.company}</dd>
              </div>
            </dl>
          </div>
        </aside>

        {/* Role history */}
        <div className="flex flex-col gap-4">
          {roles.map((role, idx) => (
            <details
              key={"id" in role ? String(role.id) : role.company + role.dates}
              className="group rounded-xl border border-border bg-card px-6 py-5 open:shadow-sm"
              open={idx === 0}
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                <div className="flex gap-4">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-xs font-semibold text-accent">
                    {initials(role.company)}
                  </div>
                  <div>
                    <p className="font-medium">{role.title}</p>
                    <p className="text-sm text-muted">
                      {role.company} <span aria-hidden="true">·</span> {role.dates}
                    </p>
                    <p className="mt-1.5 text-sm text-foreground/80">{role.summary}</p>
                  </div>
                </div>
                <span className="mt-1 shrink-0 text-muted transition-transform group-open:rotate-45 text-xl leading-none">
                  +
                </span>
              </summary>
              <ul className="mt-4 list-disc space-y-1.5 pl-5 text-sm text-foreground/90 marker:text-accent">
                {role.details.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
