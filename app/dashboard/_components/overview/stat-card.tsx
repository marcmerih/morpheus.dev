import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { SectionCard } from "./section-card";
import { ProgressBar } from "./progress-bar";

export function StatCard({
  label,
  value,
  subtext,
  subtextTone = "neutral",
  icon: Icon,
  progress,
  className,
}: {
  label: string;
  value: string;
  subtext: string;
  subtextTone?: "positive" | "negative" | "neutral";
  icon?: LucideIcon;
  progress?: number;
  className?: string;
}) {
  return (
    <SectionCard className={cn("flex flex-col gap-3 p-4", className)}>
      <div className="flex items-start justify-between gap-2">
        <span className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
          {label}
        </span>
        {Icon ? (
          <Icon
            className="text-muted-foreground size-4 shrink-0 opacity-60"
            strokeWidth={1.5}
            aria-hidden
          />
        ) : null}
      </div>
      <p className="text-foreground text-2xl font-semibold tabular-nums tracking-tight">
        {value}
      </p>
      <p
        className={cn(
          "text-xs tabular-nums",
          subtextTone === "positive" && "text-success",
          subtextTone === "negative" && "text-warning",
          subtextTone === "neutral" && "text-muted-foreground",
        )}
      >
        {subtext}
      </p>
      {progress !== undefined ? (
        <ProgressBar value={progress} className="mt-1 h-1.5" />
      ) : null}
    </SectionCard>
  );
}
