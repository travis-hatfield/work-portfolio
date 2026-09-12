import CaseStudyEditor from "@/components/case-study-editor";

export default function NewProjectPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-semibold">New Project</h1>
      <CaseStudyEditor />
    </div>
  );
}
