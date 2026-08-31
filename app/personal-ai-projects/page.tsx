import { personalAiProjects } from "@/lib/data";
import CaseStudyList from "@/components/case-study-list";

export const metadata = { title: "Personal AI Projects — Travis Hatfield" };

export default function PersonalAiProjectsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Personal AI Projects</h1>
        <p className="mt-2 text-muted">Independent builds and experiments, run outside of work.</p>
      </div>
      <CaseStudyList items={personalAiProjects} />
    </div>
  );
}
