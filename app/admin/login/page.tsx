import { signIn, auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminLoginPage() {
  const session = await auth();
  if (session) redirect("/admin");

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-24 text-center">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Admin Access</h1>
        <p className="mt-2 text-muted">Sign in with the site owner&apos;s Google account.</p>
      </div>
      <form
        action={async () => {
          "use server";
          await signIn("google", { redirectTo: "/admin" });
        }}
      >
        <button
          type="submit"
          className="rounded-lg border border-border bg-card px-5 py-2.5 font-medium hover:bg-foreground/[0.03] transition-colors"
        >
          Continue with Google
        </button>
      </form>
    </div>
  );
}
