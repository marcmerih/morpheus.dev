export type ChartRange = "24h" | "7d" | "30d";

export const API_BASE_URL_PLACEHOLDER =
  "https://api.morpheus.dev/runtime/demo-shop";

export const overviewHeader = {
  projectName: "Demo Shop Backend",
  lastUpdated: "Last updated 2 minutes ago",
  environment: "Development",
} as const;

export const quickStats = [
  {
    label: "Requests (24h)",
    value: "12,482",
    subtext: "+8.2%",
    subtextTone: "positive" as const,
  },
  {
    label: "Success Rate",
    value: "98.7%",
    subtext: "↓ 0.3%",
    subtextTone: "negative" as const,
  },
  {
    label: "Total Records",
    value: "8,420",
    subtext: "Across 4 tables",
    subtextTone: "neutral" as const,
  },
  {
    label: "Storage",
    value: "3.2 MB",
    subtext: "32% of limit",
    subtextTone: "neutral" as const,
    storagePercent: 32,
  },
];

export const requestsByRange: Record<
  ChartRange,
  { label: string; requests: number }[]
> = {
  "24h": Array.from({ length: 24 }, (_, i) => ({
    label: `${i.toString().padStart(2, "0")}:00`,
    requests: Math.round(200 + Math.sin(i / 3) * 120 + i * 15),
  })),
  "7d": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, i) => ({
    label: d,
    requests: Math.round(1800 + Math.sin(i / 2) * 400 + i * 200),
  })),
  "30d": Array.from({ length: 30 }, (_, i) => ({
    label: `${i + 1}`,
    requests: Math.round(1500 + Math.sin(i / 5) * 500 + (i % 7) * 80),
  })),
};

export const topEndpoints = [
  { path: "GET /users", count: 4320 },
  { path: "GET /orders", count: 3102 },
  { path: "POST /orders", count: 1220 },
  { path: "GET /products", count: 980 },
];

export const tableDistribution = [
  { name: "Users", rows: 1200 },
  { name: "Orders", rows: 5000 },
  { name: "Products", rows: 800 },
  { name: "Reviews", rows: 420 },
];

export const dataHealth = {
  realismScore: 84,
  items: [
    { label: "Valid relationships", value: "96%", status: "success" as const },
    {
      label: "Missing optional fields",
      value: "12%",
      status: "warning" as const,
    },
    { label: "Orphaned records", value: "4%", status: "error" as const },
  ],
};

export const recentApiActivity = [
  {
    time: "12:01:22",
    method: "GET",
    endpoint: "/users",
    status: 200,
    ms: 42,
  },
  {
    time: "12:01:18",
    method: "POST",
    endpoint: "/orders",
    status: 201,
    ms: 88,
  },
  {
    time: "12:01:10",
    method: "GET",
    endpoint: "/products",
    status: 200,
    ms: 35,
  },
  {
    time: "12:00:58",
    method: "GET",
    endpoint: "/orders",
    status: 200,
    ms: 51,
  },
  {
    time: "12:00:44",
    method: "POST",
    endpoint: "/users",
    status: 422,
    ms: 12,
  },
];

export const activityTimeline = [
  "Generated 1,000 users",
  "Created table \"orders\"",
  "POST /orders called 53 times",
  "Regenerated mock data for products",
];
