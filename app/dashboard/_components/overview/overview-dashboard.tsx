"use client";

import { Button } from "@/components/ui/button";
import { Activity, Database, HardDrive, Percent, RefreshCw } from "lucide-react";
import { useCallback, useEffect, useMemo, useState, useTransition } from "react";
import { toast } from "sonner";
import { ActivityTable } from "./activity-table";
import { ActivityTimeline } from "./activity-timeline";
import { ApiUrlPill } from "./api-url-pill";
import { ChartCard } from "./chart-card";
import { EndpointListItem } from "./endpoint-list-item";
import { formatLastUpdatedLabel } from "./format-last-updated";
import { HealthMetricRow } from "./health-metric-row";
import { EnvironmentBadge } from "./overview-badge";
import {
  generateRefreshedOverviewData,
  getDefaultOverviewSnapshot,
  type OverviewSnapshot,
} from "./overview-snapshot";
import { API_BASE_URL_PLACEHOLDER, overviewHeader } from "./placeholder-data";
import { SectionCard } from "./section-card";
import { StatCard } from "./stat-card";

const statIcons = [Activity, Percent, Database, HardDrive] as const;

export function OverviewDashboard() {
  const [snapshot, setSnapshot] = useState<OverviewSnapshot>(() =>
    getDefaultOverviewSnapshot(),
  );
  const [lastUpdatedAt, setLastUpdatedAt] = useState(
    () => new Date(Date.now() - 2 * 60 * 1000),
  );
  const [tick, setTick] = useState(0);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 30_000);
    return () => clearInterval(id);
  }, []);

  // `tick` bumps every 30s so relative copy (e.g. “2 minutes ago”) stays accurate.
  const lastUpdatedLabel = useMemo(
    () => formatLastUpdatedLabel(lastUpdatedAt),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- tick is intentional
    [lastUpdatedAt, tick],
  );

  const refresh = useCallback(() => {
    startTransition(() => {
      setSnapshot(generateRefreshedOverviewData());
      setLastUpdatedAt(new Date());
      toast.success("Overview refreshed");
    });
  }, []);

  const {
    quickStats,
    requestsByRange,
    topEndpoints,
    tableDistribution,
    dataHealth,
    recentApiActivity,
    activityTimeline,
  } = snapshot;

  const maxEndpoint = Math.max(...topEndpoints.map((e) => e.count), 1);
  const maxTableRows = Math.max(...tableDistribution.map((t) => t.rows), 1);

  return (
    <div className="mx-auto w-full max-w-[1440px] px-6 py-6">
      {/* 1. Header */}
      <header className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0 space-y-1">
          <h1 className="text-foreground text-2xl font-semibold tracking-tight md:text-[1.65rem]">
            {overviewHeader.projectName}
          </h1>
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-quiet text-sm">{lastUpdatedLabel}</p>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground size-8 shrink-0"
              onClick={refresh}
              disabled={isPending}
              aria-label="Refresh overview data"
            >
              <RefreshCw
                className={`size-4 ${isPending ? "animate-spin" : ""}`}
                aria-hidden
              />
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <EnvironmentBadge>{overviewHeader.environment}</EnvironmentBadge>
          <ApiUrlPill
            url={API_BASE_URL_PLACEHOLDER}
            className="max-w-[min(100%,420px)] sm:max-w-[min(100%,480px)]"
          />
          <Button
            variant="outline"
            size="sm"
            type="button"
            className="shrink-0"
            onClick={() =>
              toast.message("API docs", {
                description:
                  "OpenAPI-style reference will ship alongside the runtime.",
              })
            }
          >
            Open API Docs
          </Button>
        </div>
      </header>

      <div className="flex flex-col gap-6">
        {/* 2. Quick stats */}
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {quickStats.map((stat, i) => (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              subtext={stat.subtext}
              subtextTone={stat.subtextTone}
              icon={statIcons[i]}
              progress={
                "storagePercent" in stat ? stat.storagePercent : undefined
              }
            />
          ))}
        </section>

        {/* 3. Main analytics */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <ChartCard
              className="h-full"
              requestsByRange={requestsByRange}
            />
          </div>
          <SectionCard className="flex flex-col p-4 lg:col-span-4">
            <h3 className="text-foreground mb-4 text-sm font-semibold tracking-tight">
              Top Endpoints
            </h3>
            <div className="flex min-h-0 flex-1 flex-col gap-1">
              {topEndpoints.map((ep) => (
                <EndpointListItem
                  key={ep.path}
                  path={ep.path}
                  count={ep.count}
                  maxCount={maxEndpoint}
                />
              ))}
            </div>
          </SectionCard>
        </section>

        {/* 4. Data & health */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <SectionCard className="p-4 lg:col-span-6">
            <h3 className="text-foreground mb-4 text-sm font-semibold tracking-tight">
              Table Distribution
            </h3>
            <div className="space-y-4">
              {tableDistribution.map((t) => {
                const pct = Math.round((t.rows / maxTableRows) * 100);
                return (
                  <div key={t.name} className="space-y-2">
                    <div className="flex items-baseline justify-between gap-2 text-sm">
                      <span className="text-foreground font-medium">
                        {t.name}
                      </span>
                      <span className="text-muted-foreground font-mono text-xs tabular-nums">
                        {t.rows.toLocaleString()}
                      </span>
                    </div>
                    <div className="bg-bg-tertiary h-2 overflow-hidden rounded-full">
                      <div
                        className="from-accent-secondary/70 to-accent-secondary-soft/50 h-full rounded-full bg-gradient-to-r"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </SectionCard>

          <SectionCard className="p-4 lg:col-span-6">
            <h3 className="text-foreground mb-4 text-sm font-semibold tracking-tight">
              Data Health
            </h3>
            <div className="border-depth bg-bg-tertiary/40 mb-6 rounded-lg border p-4">
              <p className="text-muted-foreground mb-1 text-xs font-medium tracking-wide uppercase">
                Data Realism Score
              </p>
              <p className="text-primary text-4xl font-semibold tabular-nums">
                {dataHealth.realismScore}%
              </p>
            </div>
            <div className="divide-border divide-y">
              {dataHealth.items.map((item) => (
                <HealthMetricRow
                  key={item.label}
                  label={item.label}
                  value={item.value}
                  status={item.status}
                />
              ))}
            </div>
          </SectionCard>
        </section>

        {/* 5 + 6. Activity + timeline */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <SectionCard className="overflow-hidden p-0 lg:col-span-8">
            <div className="border-border border-b px-4 py-3">
              <h3 className="text-foreground text-sm font-semibold tracking-tight">
                Recent API Activity
              </h3>
            </div>
            <div className="p-2">
              <ActivityTable rows={recentApiActivity} />
            </div>
          </SectionCard>
          <div className="lg:col-span-4">
            <ActivityTimeline events={activityTimeline} />
          </div>
        </section>
      </div>
    </div>
  );
}
