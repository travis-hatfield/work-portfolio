import Link from "next/link";

const sections = [
  { href: "/admin/resume", label: "Resume", desc: "Roles shown on the resume page." },
  { href: "/admin/projects", label: "Projects", desc: "AI-assisted and personal AI case studies." },
  { href: "/admin/resources", label: "Resources", desc: "Downloadable templates and files." },
];

export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-semibold">Admin</h1>
      <div className="flex flex-col divide-y divide-border rounded-lg border border-border bg-card">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-foreground/[0.03] transition-colors"
          >
            <div>
              <p className="font-medium">{s.label}</p>
              <p className="text-sm text-muted">{s.desc}</p>
            </div>
            <span className="shrink-0 text-muted" aria-hidden="true">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
