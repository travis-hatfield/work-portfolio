import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-border/80 mt-10">
      <div className="mx-auto max-w-4xl px-6 py-6 text-sm text-muted flex flex-wrap items-center justify-between gap-3">
        <span className="font-mono text-xs">
          © {new Date().getFullYear()} {profile.name}
        </span>
        <div className="flex items-center gap-4">
          <span className="hidden font-mono text-xs text-muted/70 sm:inline">
            Built with <span className="text-accent">Claude</span>
          </span>
          <a href={`mailto:${profile.email}`} className="hover:text-foreground transition-colors">
            {profile.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
