import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-border mt-16">
      <div className="mx-auto max-w-4xl px-6 py-8 text-sm text-muted flex flex-wrap items-center justify-between gap-3">
        <span>&copy; {new Date().getFullYear()} {profile.name}</span>
        <div className="flex gap-4">
          <a href={profile.personalSite} className="hover:text-foreground transition-colors">
            Personal blog
          </a>
          <a href={`mailto:${profile.email}`} className="hover:text-foreground transition-colors">
            {profile.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
