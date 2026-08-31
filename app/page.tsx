import Link from "next/link";
import { headers } from "next/headers";
import { profile } from "@/lib/data";
import { siteFromHost } from "@/lib/sites";

const professionalLinks = [
  { href: "/resume", label: "Resume", desc: "Roles, dates, and a downloadable PDF." },
  { href: "/ai-assisted-projects", label: "AI-Assisted Projects", desc: "Case studies: problem, approach, outcome." },
  { href: "/personal-ai-projects", label: "Personal AI Projects", desc: "Independent builds and experiments." },
  { href: "/resources", label: "Resources", desc: "Templates and files worth sharing." },
];

export default async function Home() {
  const headerList = await headers();
  const site = siteFromHost(headerList.get("host"));

  if (site === "personal") {
    return (
      <div className="flex flex-col gap-12">
        <section>
          <h1 className="text-3xl font-semibold tracking-tight">{profile.name}</h1>
          <p className="mt-2 text-lg text-muted">Personal blog and projects.</p>
          <p className="mt-6 max-w-2xl leading-relaxed text-foreground/90">{profile.blurb}</p>
        </section>
        <section>
          <Link
            href="/blog"
            className="inline-block rounded-lg border border-border bg-card px-5 py-2.5 font-medium hover:border-accent transition-colors"
          >
            Read the blog →
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-12">
      <section>
        <h1 className="text-3xl font-semibold tracking-tight">{profile.name}</h1>
        <p className="mt-2 text-lg text-muted">{profile.title}</p>
        <p className="mt-6 max-w-2xl leading-relaxed text-foreground/90">{profile.blurb}</p>
        <div className="mt-6 flex gap-4 text-sm">
          <a href={`mailto:${profile.email}`} className="text-accent hover:underline">
            {profile.email}
          </a>
          <a href={profile.resumePdf} className="text-accent hover:underline">
            Download resume (PDF)
          </a>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        {professionalLinks.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="rounded-lg border border-border bg-card p-5 transition-colors hover:border-accent"
          >
            <h2 className="font-medium">{l.label}</h2>
            <p className="mt-1 text-sm text-muted">{l.desc}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
