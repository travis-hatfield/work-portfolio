import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-border mt-10">
      <div className="mx-auto max-w-4xl px-6 py-6 text-sm text-muted flex flex-wrap items-center justify-between gap-3">
        <span>&copy; {new Date().getFullYear()} {profile.name}</span>
        <div className="flex gap-4">
          <a
            href="https://linkedin.com/in/travisrhatfield"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            LinkedIn
          </a>
          <a href={`mailto:${profile.email}`} className="hover:text-foreground transition-colors">
            {profile.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
