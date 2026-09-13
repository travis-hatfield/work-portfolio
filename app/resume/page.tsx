import { roles as staticRoles, profile } from "@/lib/data";
import { sql, ensureSchema, type RoleRow } from "@/lib/db";
import PageHero from "@/components/page-hero";
import Reveal from "@/components/reveal";
import GlowCard from "@/components/glow-card";

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
    <div className="flex flex-col gap-6">
      <PageHero
        eyebrow="Career history"
        title="Resume"
        action={
          <a
            href={profile.resumePdf}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
          >
            Download PDF ↓
          </a>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        {/* Sidebar */}
        <aside className="flex flex-col gap-4 lg:sticky lg:top-20 lg:self-start">
          <Reveal>
            <GlowCard className="rounded-xl border border-border bg-card p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-base font-semibold text-white">
                {initials(profile.name)}
              </div>
              <h2 className="mt-3 text-lg font-semibold">{profile.name}</h2>
              <p className="mt-0.5 text-sm text-muted">{profile.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-foreground/80">{profile.blurb}</p>
            </GlowCard>
          </Reveal>

          <Reveal delay={80}>
            <GlowCard className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-mono text-[11px] font-semibold uppercase tracking-wide text-muted">Contact</h3>
              <dl className="mt-2 flex flex-col gap-1.5 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-muted">Email</dt>
                  <dd className="text-right">
                    <a href={`mailto:${profile.email}`} className="text-accent hover:underline">
                      {profile.email}
                    </a>
                  </dd>
                </div>
              </dl>
            </GlowCard>
          </Reveal>

          <Reveal delay={160}>
            <GlowCard className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-mono text-[11px] font-semibold uppercase tracking-wide text-muted">At a glance</h3>
              <dl className="mt-2 flex flex-col gap-1.5 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-muted">Roles</dt>
                  <dd>{roles.length}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted">Current</dt>
                  <dd className="text-right">{roles[0]?.company}</dd>
                </div>
              </dl>
            </GlowCard>
          </Reveal>
        </aside>

        {/* Role history */}
        <div className="relative flex flex-col gap-3 before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-px before:bg-border sm:before:left-[19px]">
          {roles.map((role, idx) => (
            <Reveal key={"id" in role ? String(role.id) : role.company + role.dates} delay={idx * 70}>
              <details className="group relative pl-11 sm:pl-12" open={idx === 0}>
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
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
