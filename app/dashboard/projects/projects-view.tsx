"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  Hexagon,
  Info,
  MoreVertical,
  Plus,
  Search,
  Upload,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

export type ProjectRow = {
  id: string;
  name: string;
  region: string;
  createdAt: string;
  storage: string;
  computeLastActive: string;
  branches: number;
};

function possessiveProjectsLabel(firstNameOrFallback: string): string {
  const t = firstNameOrFallback.trim();
  if (!t || t.toLowerCase() === "your") return "Your projects";
  const suffix = /s$/i.test(t) ? "'" : "'s";
  return `${t}${suffix} projects`;
}

function usagePeriodStart(): string {
  const d = new Date();
  d.setDate(1);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function ProjectsView({
  ownerFirstName,
  projects,
}: {
  ownerFirstName: string;
  projects: ProjectRow[];
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return projects;
    return projects.filter((p) => p.name.toLowerCase().includes(q));
  }, [projects, query]);

  const title = possessiveProjectsLabel(ownerFirstName);

  if (projects.length === 0) {
    return (
      <div className="flex min-h-[calc(100dvh-5.25rem)] flex-col px-6 py-6">
        <div className="flex flex-1 flex-col items-center justify-center gap-8 text-center">
          <div className="from-accent-secondary/25 via-primary/15 to-accent-tertiary/20 relative flex size-20 items-center justify-center rounded-2xl bg-gradient-to-br ring-1 ring-inset ring-border-depth">
            <Hexagon
              className="text-accent-secondary-soft size-9"
              strokeWidth={1.25}
              aria-hidden
            />
          </div>
          <div className="max-w-md space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              No projects yet
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
              Spin up a mock backend: define tables, generate data, and call
              live REST endpoints from your app—all from one workspace.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              type="button"
              className="gap-2 transition-shadow hover:shadow-[var(--shadow-lg),var(--glow-green)]"
            >
              <Plus className="size-4" aria-hidden />
              Create your first project
            </Button>
            <Button variant="outline" type="button" className="gap-2" asChild>
              <Link href="/dashboard">Back to overview</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 p-6">
      <header className="flex flex-col gap-4 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <div className="from-primary via-accent-secondary-soft to-accent-tertiary h-1 w-14 rounded-full bg-gradient-to-r" />
          <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
          <p className="text-muted-foreground max-w-xl text-sm">
            Each project is an isolated mock backend: schema metadata, SQLite
            runtime, and generated GET/POST routes.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 sm:shrink-0">
          <Button
            type="button"
            className="gap-2 transition-shadow hover:shadow-[var(--shadow-lg),var(--glow-green)]"
          >
            <Plus className="size-4" aria-hidden />
            New project
          </Button>
          <Button variant="outline" type="button" className="gap-2">
            <Upload className="size-4" aria-hidden />
            Import schema
          </Button>
        </div>
      </header>

      <Card className="bg-card border-depth border-border overflow-hidden shadow-sm">
        <CardHeader className="border-border border-b py-4">
          <CardTitle className="text-base font-medium">Workspace usage</CardTitle>
          <CardDescription className="text-quiet">
            Snapshot for billing and capacity planning (placeholder metrics).
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-border grid divide-y sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            {(
              [
                {
                  label: "Compute",
                  value: "0.09 CU-hrs",
                  hint: "Approximate CPU time for mock generation jobs.",
                },
                {
                  label: "Storage",
                  value: "0.06 GB",
                  hint: "Metadata + runtime SQLite footprint.",
                },
                {
                  label: "History",
                  value: "0.01 GB",
                  hint: "Schema revisions and audit trail (planned).",
                },
                {
                  label: "Network transfer",
                  value: "0 GB",
                  hint: "Egress from hosted runtime APIs (planned).",
                },
              ] as const
            ).map((m) => (
              <div
                key={m.label}
                className="hover:bg-bg-tertiary/50 flex items-start gap-2 px-4 py-4 transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <div className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium">
                    {m.label}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          className="text-quiet hover:text-foreground inline-flex rounded p-0.5"
                          aria-label={`About ${m.label}`}
                        >
                          <Info className="size-3.5" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-xs text-xs">
                        {m.hint}
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <p className="text-foreground mt-1 text-lg font-medium tabular-nums">
                    {m.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-quiet border-border border-t px-4 py-3 text-xs leading-relaxed">
            Usage since {usagePeriodStart()}. Metrics may be delayed and do not
            include inactive projects.{" "}
            <Link
              href="/"
              className="text-accent-tertiary hover:text-accent-primary-soft underline-offset-4 hover:underline"
            >
              Learn more
            </Link>
            .
          </p>
        </CardContent>
      </Card>

      <section className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted-foreground text-sm font-medium">
            {filtered.length} {filtered.length === 1 ? "Project" : "Projects"}
          </p>
          <div className="relative w-full sm:max-w-xs">
            <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
            <Input
              placeholder="Search…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="border-depth bg-bg-secondary pl-9"
              aria-label="Search projects"
            />
          </div>
        </div>

        <div className="border-depth bg-card border-border overflow-hidden rounded-xl border shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead>
                <tr className="border-border bg-bg-secondary/80 text-muted-foreground border-b text-xs font-medium tracking-wide uppercase">
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Region</th>
                  <th className="px-4 py-3">Created at</th>
                  <th className="px-4 py-3">Storage</th>
                  <th className="px-4 py-3">Compute last active</th>
                  <th className="px-4 py-3">Tables</th>
                  <th className="px-4 py-3">Integrations</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row) => (
                  <tr
                    key={row.id}
                    className={cn(
                      "border-border/80 border-b transition-all duration-200 last:border-b-0",
                      "hover:bg-bg-tertiary/60 hover:shadow-[var(--shadow-lg),var(--glow-green)]",
                    )}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Hexagon
                          className="text-accent-secondary-soft size-4 shrink-0"
                          strokeWidth={1.5}
                          aria-hidden
                        />
                        <span className="font-medium">{row.name}</span>
                      </div>
                    </td>
                    <td className="text-muted-foreground px-4 py-3">
                      {row.region}
                    </td>
                    <td className="text-muted-foreground px-4 py-3 tabular-nums">
                      {row.createdAt}
                    </td>
                    <td className="text-muted-foreground px-4 py-3 tabular-nums">
                      {row.storage}
                    </td>
                    <td className="text-muted-foreground px-4 py-3 tabular-nums">
                      {row.computeLastActive}
                    </td>
                    <td className="text-muted-foreground px-4 py-3 tabular-nums">
                      {row.branches}
                    </td>
                    <td className="px-4 py-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-depth h-8 gap-1 text-xs"
                        type="button"
                      >
                        <Plus className="size-3.5" aria-hidden />
                        Add
                      </Button>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8"
                            type="button"
                            aria-label={`Actions for ${row.name}`}
                          >
                            <MoreVertical className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44">
                          <DropdownMenuItem>Open workspace</DropdownMenuItem>
                          <DropdownMenuItem>Duplicate</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive focus:text-destructive">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <p className="text-muted-foreground px-4 py-10 text-center text-sm">
              No projects match &ldquo;{query}&rdquo;.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
