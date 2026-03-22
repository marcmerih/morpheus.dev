import { auth } from "@/lib/auth";
import { OverviewDashboard } from "./_components/overview/overview-dashboard";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const result = await auth.api.getSession({
    headers: await headers(),
  });

  if (!result?.session?.userId) {
    redirect("/sign-in");
  }

  return (
    <div className="bg-bg-primary min-h-full w-full">
      <OverviewDashboard />
    </div>
  );
}
