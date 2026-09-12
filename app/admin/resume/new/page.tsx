import RoleEditor from "@/components/role-editor";

export default function NewRolePage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-semibold">New Role</h1>
      <RoleEditor />
    </div>
  );
}
