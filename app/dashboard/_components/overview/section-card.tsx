import { cn } from "@/lib/utils";

export function SectionCard({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "bg-card border-depth border-border rounded-xl transition-[box-shadow,background-color] duration-200",
        "hover:bg-bg-secondary/80 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.06)]",
        className,
      )}
      {...props}
    />
  );
}
