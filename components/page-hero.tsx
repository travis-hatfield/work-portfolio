import Reveal from "@/components/reveal";

export default function PageHero({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="-mx-6 -mt-8 flex flex-wrap items-end justify-between gap-4 rounded-b-2xl px-6 pb-6 pt-10 sm:-mx-8 sm:px-8">
      <Reveal>
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
        <h1 className="mt-1.5 text-3xl font-semibold tracking-tight">{title}</h1>
        {description && <p className="mt-1.5 max-w-xl text-sm text-muted">{description}</p>}
      </Reveal>
      {action && <Reveal delay={100}>{action}</Reveal>}
    </div>
  );
}
