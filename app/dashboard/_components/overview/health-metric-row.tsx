import { cn } from "@/lib/utils";
import { AlertCircle, AlertTriangle, CheckCircle2 } from "lucide-react";

const icons = {
  success: CheckCircle2,
  warning: AlertTriangle,
  error: AlertCircle,
} as const;

const iconClass = {
  success: "text-success",
  warning: "text-warning",
  error: "text-error",
} as const;

export function HealthMetricRow({
  label,
  value,
  status,
}: {
  label: string;
  value: string;
  status: keyof typeof icons;
}) {
  const Icon = icons[status];

  return (
    <div className="flex items-center justify-between gap-3 py-2">
      <div className="flex min-w-0 items-center gap-2">
        <Icon
          className={cn("size-4 shrink-0", iconClass[status])}
          strokeWidth={1.75}
          aria-hidden
        />
        <span className="text-muted-foreground truncate text-sm">{label}</span>
      </div>
      <span className="text-foreground shrink-0 font-mono text-sm tabular-nums">
        {value}
      </span>
    </div>
  );
}
