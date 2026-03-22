import { cn } from "@/lib/utils";

export function EndpointListItem({
  path,
  count,
  maxCount,
  className,
}: {
  path: string;
  count: number;
  maxCount: number;
  className?: string;
}) {
  const pct = maxCount > 0 ? Math.round((count / maxCount) * 100) : 0;

  return (
    <button
      type="button"
      className={cn(
        "border-border/60 hover:bg-bg-tertiary/50 group w-full rounded-lg border border-transparent px-2 py-2.5 text-left transition-colors duration-150",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-foreground font-mono text-xs tracking-tight">
          {path}
        </span>
        <span className="text-muted-foreground shrink-0 font-mono text-xs tabular-nums">
          {count.toLocaleString()}
        </span>
      </div>
      <div className="bg-bg-tertiary mt-2 h-1 overflow-hidden rounded-full">
        <div
          className="from-primary to-accent-primary-soft h-full rounded-full bg-gradient-to-r transition-all duration-300 group-hover:opacity-90"
          style={{ width: `${pct}%` }}
        />
      </div>
    </button>
  );
}
