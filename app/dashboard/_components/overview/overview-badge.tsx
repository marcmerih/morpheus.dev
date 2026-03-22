import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function EnvironmentBadge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "border-border-depth bg-bg-secondary text-muted-foreground font-mono text-[11px] font-normal tracking-wide uppercase",
        className,
      )}
    >
      {children}
    </Badge>
  );
}
