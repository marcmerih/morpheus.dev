import { Button } from "@/components/ui/button";
import UserProfile from "@/components/user-profile";
import { auth } from "@/lib/auth";
import {
  ArrowRight,
  Boxes,
  Code2,
  Database,
  GitBranch,
  Layers,
  Zap,
} from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const isLoggedIn = Boolean(session?.session?.userId);

  const getStartedHref = isLoggedIn ? "/dashboard" : "/sign-up";
  const dashboardHref = isLoggedIn ? "/dashboard" : "/sign-in";

  return (
    <div className="min-h-screen bg-background">
      <header className="border-border/80 sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
          <Link href="/" className="text-foreground flex items-center gap-2 font-medium tracking-tight">
            <span className="bg-primary/10 text-primary inline-flex size-8 items-center justify-center rounded-lg">
              <Layers className="size-4" aria-hidden />
            </span>
            Morpheus
          </Link>
          <nav className="flex items-center gap-2 sm:gap-3">
            {!isLoggedIn && (
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="text-muted-foreground"
              >
                <Link href="/sign-in">Sign in</Link>
              </Button>
            )}
            <Button asChild size="sm">
              <Link href={getStartedHref}>
                {isLoggedIn ? "Dashboard" : "Get started"}
              </Link>
            </Button>
            {isLoggedIn && (
              <div className="shrink-0">
                <UserProfile mini />
              </div>
            )}
          </nav>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden px-6 pt-16 pb-20 sm:pt-24 sm:pb-28">
          <div
            className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35]"
            aria-hidden
          >
            <div className="bg-primary/20 absolute -top-24 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full blur-3xl" />
          </div>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-primary mb-4 text-sm font-medium tracking-wide uppercase">
              Morpheus.dev
            </p>
            <h1 className="text-foreground text-balance text-4xl tracking-tight sm:text-5xl md:text-6xl">
              Build a backend before your backend exists
            </h1>
            <p className="text-muted-foreground mx-auto mt-6 max-w-xl text-balance text-lg leading-relaxed">
              A visual mock-backend builder for developers. Define tables and
              relationships, generate realistic data, and ship live REST
              endpoints your frontend can call today—no manual API scaffolding.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="min-w-[200px]">
                <Link href={getStartedHref}>
                  {isLoggedIn ? "Go to dashboard" : "Start free"}
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="min-w-[200px]">
                <Link href={dashboardHref}>
                  {isLoggedIn ? "Open dashboard" : "Sign in"}
                </Link>
              </Button>
            </div>
            <p className="text-muted-foreground mt-6 text-sm">
              Schema-first · Isolated runtime per project · GET &amp; POST out of
              the box
            </p>
          </div>
        </section>

        <section className="border-border bg-muted/30 border-y px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center text-2xl tracking-tight sm:text-3xl">
              From empty repo to working API in minutes
            </h2>
            <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-center text-balance">
              Morpheus is built for frontend and full-stack teams who need
              something real to integrate against while the production backend
              is still on the roadmap.
            </p>
            <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Database,
                  title: "Schema is the source of truth",
                  body: "Model tables and fields visually. The system compiles your design into storage and API shape—no ad hoc JSON files.",
                },
                {
                  icon: Zap,
                  title: "Realistic mock data",
                  body: "Generate rows by field type and strategy, with basic relationships so nested flows feel believable.",
                },
                {
                  icon: Code2,
                  title: "Live REST endpoints",
                  body: "List, fetch by id, and create records over HTTP. Copy the base URL into your app and start building.",
                },
                {
                  icon: Boxes,
                  title: "Clean separation",
                  body: "Project definitions live in metadata storage; generated records live in an isolated runtime store per project.",
                },
                {
                  icon: GitBranch,
                  title: "Relationships without SQL",
                  body: "Wire up one-to-many style links in the UI; the runtime enforces foreign keys in generation order.",
                },
                {
                  icon: Layers,
                  title: "Developer-first UX",
                  body: "Serious tooling that still feels fast: preview data, skim routes, and iterate on the schema without fighting the UI.",
                },
              ].map((item) => (
                <li
                  key={item.title}
                  className="group bg-card border-border border-depth rounded-xl border p-6 shadow-sm transition-all duration-300 ease-out will-change-transform hover:-translate-y-1 hover:border-border-strong hover:bg-bg-tertiary hover:shadow-[var(--shadow-lg),var(--glow-green)]"
                >
                  <item.icon
                    className="text-primary mb-3 size-8 transition-colors duration-300 group-hover:text-accent-primary-soft"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  <h3 className="text-base font-medium">{item.title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center text-2xl tracking-tight sm:text-3xl">
              Your first success path
            </h2>
            <ol className="mx-auto mt-12 max-w-2xl space-y-6">
              {[
                "Create a project and name your first table.",
                "Add fields with types and constraints; set how many rows to generate.",
                "Generate mock records and inspect them in the data preview.",
                "Copy the runtime base URL and call list and create endpoints from your app.",
              ].map((step, i) => (
                <li key={step} className="flex gap-4">
                  <span className="bg-primary text-primary-foreground flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-medium">
                    {i + 1}
                  </span>
                  <p className="text-foreground pt-1 leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-muted/30 border-border border-y px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl tracking-tight sm:text-3xl">
              Mock-first today, export-ready tomorrow
            </h2>
            <p className="text-muted-foreground mt-4 text-balance leading-relaxed">
              The MVP focuses on tables, generation, relationships, and GET/POST
              runtime APIs. Export to production systems and advanced query
              tooling come later—your metadata stays structured so that path
              stays open.
            </p>
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="bg-primary text-primary-foreground mx-auto max-w-3xl rounded-2xl px-8 py-12 text-center shadow-lg sm:px-12">
            <h2 className="text-2xl tracking-tight sm:text-3xl">
              Ready to prototype against a real API surface?
            </h2>
            <p className="mt-3 text-balance opacity-90">
              {isLoggedIn
                ? "Jump back in and continue building your mock backend."
                : "Create an account and spin up your first Morpheus project."}
            </p>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="mt-8 bg-background text-foreground hover:bg-background/90"
            >
              <Link href={getStartedHref}>
                {isLoggedIn ? "Go to dashboard" : "Get started"}
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-border border-t py-10">
        <div className="text-muted-foreground mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 text-sm sm:flex-row">
          <p>© {new Date().getFullYear()} Morpheus.dev</p>
          <div className="flex gap-6">
            <Link
              href="/privacy-policy"
              className="hover:text-foreground transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms-of-service"
              className="hover:text-foreground transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
