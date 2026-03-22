import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export function ProgressBar({
  className,
  value = 0,
}: {
  className?: string;
  value?: number;
}) {
  return (
    <Progress
      value={value}
      className={cn("bg-bg-tertiary", className)}
    />
  );
}
