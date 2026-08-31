import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-3 py-24 text-center">
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p className="text-muted">The page you're looking for doesn't exist.</p>
      <Link href="/" className="text-accent hover:underline">
        Back to overview
      </Link>
    </div>
  );
}
