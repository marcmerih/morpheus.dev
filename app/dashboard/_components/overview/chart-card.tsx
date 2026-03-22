"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import type { ChartRange } from "./placeholder-data";
import type { OverviewSnapshot } from "./overview-snapshot";
import { SectionCard } from "./section-card";

const chartConfig = {
  requests: {
    label: "Requests",
    color: "hsl(142 71% 45%)",
  },
} satisfies ChartConfig;

export function ChartCard({
  className,
  requestsByRange,
}: {
  className?: string;
  requestsByRange: OverviewSnapshot["requestsByRange"];
}) {
  const [range, setRange] = React.useState<ChartRange>("24h");

  const data = requestsByRange[range];

  return (
    <SectionCard className={cn("flex flex-col p-4", className)}>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-foreground text-sm font-semibold tracking-tight">
          API Requests
        </h3>
        <ToggleGroup
          type="single"
          value={range}
          onValueChange={(v) => {
            if (v === "24h" || v === "7d" || v === "30d") setRange(v);
          }}
          variant="outline"
          size="sm"
          className="w-fit shrink-0"
        >
          <ToggleGroupItem value="24h" className="px-3 text-xs">
            24h
          </ToggleGroupItem>
          <ToggleGroupItem value="7d" className="px-3 text-xs">
            7d
          </ToggleGroupItem>
          <ToggleGroupItem value="30d" className="px-3 text-xs">
            30d
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <ChartContainer
        config={chartConfig}
        className="aspect-auto h-[260px] w-full [&_.recharts-cartesian-grid_line]:stroke-border/40"
      >
        <LineChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            interval="preserveStartEnd"
            minTickGap={24}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            width={44}
            className="text-[10px]"
          />
          <ChartTooltip
            cursor={{ stroke: "var(--border-strong)", strokeWidth: 1 }}
            content={<ChartTooltipContent className="border-border bg-card" />}
          />
          <Line
            type="monotone"
            dataKey="requests"
            stroke="var(--color-requests)"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: "var(--color-requests)" }}
          />
        </LineChart>
      </ChartContainer>
    </SectionCard>
  );
}
