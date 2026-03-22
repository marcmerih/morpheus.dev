import { cn } from "@/lib/utils";

export type ActivityRow = {
  time: string;
  method: string;
  endpoint: string;
  status: number;
  ms: number;
};

function statusClass(status: number) {
  if (status >= 200 && status < 300) return "text-success";
  if (status >= 400 && status < 500) return "text-warning";
  if (status >= 500) return "text-error";
  return "text-muted-foreground";
}

function methodClass(method: string) {
  if (method === "GET") return "text-accent-tertiary";
  if (method === "POST") return "text-accent-secondary-soft";
  if (method === "PATCH" || method === "PUT") return "text-info";
  return "text-muted-foreground";
}

export function ActivityTable({ rows }: { rows: ActivityRow[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[520px] text-left text-xs">
        <thead>
          <tr className="text-muted-foreground border-border border-b font-medium tracking-wide uppercase">
            <th className="px-3 py-2.5 font-medium">Time</th>
            <th className="px-3 py-2.5 font-medium">Method</th>
            <th className="px-3 py-2.5 font-medium">Endpoint</th>
            <th className="px-3 py-2.5 font-medium">Status</th>
            <th className="px-3 py-2.5 text-right font-medium">Response</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={`${row.time}-${row.endpoint}-${i}`}
              className="border-border/80 hover:bg-bg-tertiary/40 border-b transition-colors duration-150 last:border-b-0"
            >
              <td className="text-muted-foreground px-3 py-2.5 font-mono tabular-nums">
                {row.time}
              </td>
              <td
                className={cn(
                  "px-3 py-2.5 font-mono font-medium",
                  methodClass(row.method),
                )}
              >
                {row.method}
              </td>
              <td className="text-foreground px-3 py-2.5 font-mono">
                {row.endpoint}
              </td>
              <td
                className={cn(
                  "px-3 py-2.5 font-mono font-medium tabular-nums",
                  statusClass(row.status),
                )}
              >
                {row.status}
              </td>
              <td className="text-muted-foreground px-3 py-2.5 text-right font-mono tabular-nums">
                {row.ms}ms
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
