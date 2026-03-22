import { SectionCard } from "./section-card";

export function ActivityTimeline({ events }: { events: string[] }) {
  return (
    <SectionCard className="p-4">
      <h3 className="text-muted-foreground mb-3 text-xs font-medium tracking-wide uppercase">
        Recent events
      </h3>
      <ul className="space-y-3">
        {events.map((text, i) => (
          <li
            key={i}
            className="text-quiet relative pl-3 text-sm leading-snug before:absolute before:top-2 before:left-0 before:size-1 before:rounded-full before:bg-border-strong"
          >
            {text}
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
