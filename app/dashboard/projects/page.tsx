import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ProjectsView, { type ProjectRow } from "./projects-view";

/** Replace with DB/API results when project CRUD exists. */
const INITIAL_PROJECTS: ProjectRow[] = [];

export default async function ProjectsPage() {
  const result = await auth.api.getSession({
    headers: await headers(),
  });

  if (!result?.session?.userId) {
    redirect("/sign-in");
  }

  const rawName = result.user?.name?.trim() ?? "";
  const ownerFirstName =
    rawName.split(/\s+/)[0] || (result.user?.email?.split("@")[0] ?? "Your");

  return (
    <ProjectsView
      ownerFirstName={ownerFirstName}
      projects={INITIAL_PROJECTS}
    />
  );
}
