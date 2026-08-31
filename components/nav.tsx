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
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3 px-6 py-4">
        <Link href="/" className="font-mono text-sm font-semibold tracking-tight">
          {label}
        </Link>
        <nav className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-foreground transition-colors">
              {l.label}
            </Link>
          ))}
          <Link href="/admin" className="hover:text-foreground transition-colors">
            Admin Access
          </Link>
        </nav>
      </div>
    </header>
  );
}
