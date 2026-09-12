import ResourceEditor from "@/components/resource-editor";

export default function NewResourcePage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-semibold">New Resource</h1>
      <ResourceEditor />
    </div>
  );
}
