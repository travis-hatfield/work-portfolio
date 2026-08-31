import { aiAssistedProjects } from "@/lib/data";
import CaseStudyList from "@/components/case-study-list";

export const metadata = { title: "AI-Assisted Projects — Travis Hatfield" };

export default function AiAssistedProjectsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">AI-Assisted Projects</h1>
        <p className="mt-2 text-muted">Work done using AI tooling to ship faster or better — problem, approach, outcome.</p>
      </div>
      <CaseStudyList items={aiAssistedProjects} />
    </div>
  );
}
