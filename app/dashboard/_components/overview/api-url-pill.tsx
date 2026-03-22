"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";

export function ApiUrlPill({
  url,
  className,
}: {
  url: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("API base URL copied");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy");
    }
  }, [url]);

  return (
    <div
      className={cn(
        "border-depth bg-bg-secondary border-border flex max-w-full min-w-0 items-center gap-1 rounded-lg border px-2 py-1",
        className,
      )}
    >
      <code className="text-muted-foreground truncate px-1 font-mono text-[11px] sm:text-xs">
        {url}
      </code>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="text-muted-foreground size-7 shrink-0"
        onClick={copy}
        aria-label="Copy API base URL"
      >
        {copied ? (
          <Check className="size-3.5 text-success" aria-hidden />
        ) : (
          <Copy className="size-3.5" aria-hidden />
        )}
      </Button>
    </div>
  );
}
