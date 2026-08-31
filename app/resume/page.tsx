import { roles, profile } from "@/lib/data";

export const metadata = { title: "Resume — Travis Hatfield" };

export default function ResumePage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h1 className="text-2xl font-semibold tracking-tight">Resume</h1>
        <a href={profile.resumePdf} className="text-sm text-accent hover:underline">
          Download PDF ↓
        </a>
      </div>

      <div className="flex flex-col divide-y divide-border rounded-lg border border-border bg-card">
        {roles.map((role) => (
          <details key={role.company + role.dates} className="group px-5 py-4">
            <summary className="flex items-start justify-between gap-4">
              <div>
                <p className="font-medium">
                  {role.title} <span className="text-muted">· {role.company}</span>
                </p>
                <p className="text-sm text-muted">{role.dates}</p>
                <p className="mt-1 text-sm text-foreground/80">{role.summary}</p>
              </div>
              <span className="mt-1 text-muted transition-transform group-open:rotate-45 text-xl leading-none">
                +
              </span>
            </summary>
            <ul className="mt-4 list-disc space-y-1.5 pl-5 text-sm text-foreground/90">
              {role.details.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </details>
        ))}
      </div>
    </div>
  );
}
