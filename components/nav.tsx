import Link from "next/link";
import { headers } from "next/headers";
import { siteFromHost, SITE_CONFIG } from "@/lib/sites";

const professionalLinks = [
  { href: "/", label: "Overview" },
  { href: "/resume", label: "Resume" },
  { href: "/ai-assisted-projects", label: "AI-Assisted Projects" },
  { href: "/personal-ai-projects", label: "Personal AI Projects" },
  { href: "/resources", label: "Resources" },
];

const personalLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
];

export default async function Nav() {
  const headerList = await headers();
  const site = siteFromHost(headerList.get("host"));
  const links = site === "personal" ? personalLinks : professionalLinks;
  const label = site === "personal" ? "travishatfield.dev" : "travishatfield.dev/work";

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/85 backdrop-blur-sm">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3 px-6 py-4">
        <Link href="/" className="font-mono text-sm tracking-tight text-foreground/90">
          {label}
        </Link>
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm text-muted">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="transition-colors hover:text-foreground">
              {l.label}
            </Link>
          ))}
          <Link
            href="/admin"
            className="rounded-sm border border-border px-3 py-1 text-xs text-muted transition-colors hover:border-accent-2 hover:text-foreground"
          >
            Admin Access
          </Link>
        </nav>
      </div>
    </header>
  );
}
