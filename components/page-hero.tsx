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
    <div className="bg-noise-fade -mx-6 -mt-8 flex flex-wrap items-end justify-between gap-4 rounded-b-2xl px-6 pb-8 pt-10 sm:-mx-8 sm:px-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
        <h1 className="mt-2 font-display text-3xl font-medium tracking-tight sm:text-4xl">{title}</h1>
        {description && <p className="mt-2 max-w-xl text-sm text-muted sm:text-base">{description}</p>}
      </div>
      {action}
    </div>
  );
}
