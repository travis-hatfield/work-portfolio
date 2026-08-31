export type Site = "personal" | "professional";

export const SITE_CONFIG: Record<
  Site,
  { label: string; domains: string[]; title: string; description: string }
> = {
  professional: {
    label: "Professional",
    domains: ["work.travishatfield.dev"],
    title: "Travis Hatfield — Work",
    description: "Resume, AI-assisted projects, and resources.",
  },
  personal: {
    label: "Personal",
    domains: ["travishatfield.dev", "www.travishatfield.dev"],
    title: "Travis Hatfield",
    description: "Personal blog and projects.",
  },
};

/** Resolve which site a request belongs to based on hostname. Defaults to "professional". */
export function siteFromHost(host: string | null | undefined): Site {
  if (!host) return "professional";
  const clean = host.split(":")[0].toLowerCase();
  for (const [site, cfg] of Object.entries(SITE_CONFIG) as [Site, (typeof SITE_CONFIG)[Site]][]) {
    if (cfg.domains.includes(clean)) return site;
  }
  // Local dev / preview fallback: default to professional.
  return "professional";
}
