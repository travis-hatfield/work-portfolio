import ProjectPreviewCard from "@/components/project-preview-card";

type Screenshot = { url: string; caption?: string };

type CaseStudyLike = {
  slug: string;
  title: string;
  listSummary?: string;
  problem: string;
  capabilities: string;
  methodology: string;
  outcome: string;
  tools: string[];
  stats?: string | null;
  link_url?: string | null;
  screenshots?: (string | Screenshot)[];
};

export default function CaseStudyList({
  items,
  basePath,
  category,
}: {
  items: CaseStudyLike[];
  basePath: string;
  category?: string;
}) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((c) => (
        <ProjectPreviewCard
          key={c.slug}
          href={c.link_url || `${basePath}/${c.slug}`}
          category={category || "Project"}
          title={c.title}
          summary={c.listSummary || c.outcome}
          stats={c.stats}
          tools={c.tools}
          screenshots={c.screenshots ?? []}
        />
      ))}
    </div>
  );
}
