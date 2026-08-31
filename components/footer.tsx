import { headers } from "next/headers";
import { profile } from "@/lib/data";
import { siteFromHost } from "@/lib/sites";

export default async function Footer() {
  const headerList = await headers();
  const site = siteFromHost(headerList.get("host"));
  const otherSiteHref = site === "personal" ? "https://work.travishatfield.dev" : "https://travishatfield.dev";
  const otherSiteLabel = site === "personal" ? "Professional site" : "Personal blog";

  return (
    <footer className="border-t border-border mt-16">
      <div className="mx-auto max-w-4xl px-6 py-8 text-sm text-muted flex flex-wrap items-center justify-between gap-3">
        <span>&copy; {new Date().getFullYear()} {profile.name}</span>
        <div className="flex gap-4">
          <a href={otherSiteHref} className="hover:text-foreground transition-colors">
            {otherSiteLabel}
          </a>
          <a href={`mailto:${profile.email}`} className="hover:text-foreground transition-colors">
            {profile.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
