import type { ActivityRow } from "./activity-table";
import type { ChartRange } from "./placeholder-data";
import {
  activityTimeline,
  dataHealth,
  quickStats,
  recentApiActivity,
  requestsByRange,
  tableDistribution,
  topEndpoints,
} from "./placeholder-data";

export type QuickStatItem = {
  label: string;
  value: string;
  subtext: string;
  subtextTone: "positive" | "negative" | "neutral";
  storagePercent?: number;
};

export type OverviewSnapshot = {
  quickStats: QuickStatItem[];
  requestsByRange: Record<ChartRange, { label: string; requests: number }[]>;
  topEndpoints: { path: string; count: number }[];
  tableDistribution: { name: string; rows: number }[];
  dataHealth: {
    realismScore: number;
    items: (typeof dataHealth.items)[number][];
  };
  recentApiActivity: ActivityRow[];
  activityTimeline: string[];
};

function deepClone<T>(value: T): T {
  return structuredClone(value);
}

export function getDefaultOverviewSnapshot(): OverviewSnapshot {
  return {
    quickStats: deepClone(quickStats) as QuickStatItem[],
    requestsByRange: deepClone(requestsByRange),
    topEndpoints: deepClone(topEndpoints),
    tableDistribution: deepClone(tableDistribution),
    dataHealth: deepClone(dataHealth),
    recentApiActivity: deepClone(recentApiActivity),
    activityTimeline: deepClone(activityTimeline),
  };
}

function parseIntLoose(s: string): number {
  return parseInt(s.replace(/,/g, "").replace(/[^\d.-]/g, ""), 10) || 0;
}

function parsePercent(s: string): number {
  return parseFloat(s.replace("%", "")) || 0;
}

function formatTimeHms(d: Date): string {
  return d.toLocaleTimeString("en-GB", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

/** Regenerate mock metrics with small random drift (simulates a fresh fetch). */
export function generateRefreshedOverviewData(): OverviewSnapshot {
  const base = getDefaultOverviewSnapshot();

  const jitter = (n: number, spread = 0.04) =>
    Math.max(0, Math.round(n * (1 - spread / 2 + Math.random() * spread)));

  const qs: QuickStatItem[] = base.quickStats.map((s, i) => {
    if (i === 0) {
      const n = jitter(parseIntLoose(s.value));
      return {
        ...s,
        value: n.toLocaleString(),
      };
    }
    if (i === 1) {
      const p = Math.min(
        100,
        Math.max(
          90,
          parsePercent(s.value) + (Math.random() - 0.5) * 0.4,
        ),
      );
      return {
        ...s,
        value: `${p.toFixed(1)}%`,
      };
    }
    if (i === 2) {
      const n = jitter(parseIntLoose(s.value));
      return { ...s, value: n.toLocaleString() };
    }
    if (i === 3) {
      const pct = Math.min(
        95,
        Math.max(5, jitter(s.storagePercent ?? 32, 0.08)),
      );
      const mb = (3.2 * (pct / 32)) * (0.97 + Math.random() * 0.06);
      return {
        ...s,
        subtextTone: "neutral" as const,
        value: `${mb.toFixed(1)} MB`,
        subtext: `${pct}% of limit`,
        storagePercent: pct,
      };
    }
    return s;
  });

  const ranges: ChartRange[] = ["24h", "7d", "30d"];
  const nextRange = { ...base.requestsByRange };
  for (const key of ranges) {
    nextRange[key] = base.requestsByRange[key].map((p) => ({
      ...p,
      requests: jitter(p.requests, 0.06),
    }));
  }

  const nextEndpoints = base.topEndpoints.map((e) => ({
    ...e,
    count: jitter(e.count, 0.05),
  }));

  const normalized = base.tableDistribution.map((t) => ({
    ...t,
    rows: jitter(t.rows, 0.04),
  }));

  const realism = Math.min(
    95,
    Math.max(
      72,
      base.dataHealth.realismScore + Math.round((Math.random() - 0.5) * 4),
    ),
  );
  const items = base.dataHealth.items.map((it, idx) => {
    const basePct = parsePercent(it.value);
    const delta = (Math.random() - 0.5) * (idx === 0 ? 2 : 3);
    const next = Math.min(100, Math.max(0, basePct + delta));
    return { ...it, value: `${Math.round(next)}%` };
  });

  const now = new Date();
  const nextActivity: ActivityRow[] = base.recentApiActivity.map((row, i) => ({
    ...row,
    time: formatTimeHms(new Date(now.getTime() - i * 3500 - Math.random() * 800)),
    ms: jitter(row.ms, 0.15),
  }));

  const timeline = [...base.activityTimeline].sort(() => Math.random() - 0.5);

  return {
    quickStats: qs,
    requestsByRange: nextRange,
    topEndpoints: nextEndpoints,
    tableDistribution: normalized,
    dataHealth: { realismScore: realism, items },
    recentApiActivity: nextActivity,
    activityTimeline: timeline,
  };
}
