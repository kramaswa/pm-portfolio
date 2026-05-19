import { redirect } from "next/navigation";
import Link from "next/link";
import { isAdminAuthenticated } from "@/lib/auth";
import { createReadClient, createServiceClient } from "@/lib/supabase-server";
import ProjectsList from "@/components/admin/ProjectsList";
import ResumeUpload from "@/components/admin/ResumeUpload";
import LogoutButton from "@/components/admin/LogoutButton";
import type { Project } from "@/types";

export default async function AdminDashboard() {
  const authed = await isAdminAuthenticated();
  if (!authed) redirect("/admin/login");

  const supabase = createServiceClient();

  const [projectsRes, resumeRes] = await Promise.allSettled([
    supabase
      .from("projects")
      .select("*")
      .order("order_index", { ascending: true })
      .order("created_at", { ascending: false }),
    supabase
      .from("site_settings")
      .select("value")
      .eq("key", "resume_url")
      .maybeSingle(),
  ]);

  const projects: Project[] =
    projectsRes.status === "fulfilled" ? (projectsRes.value.data ?? []) : [];
  const resumeUrl: string | null =
    resumeRes.status === "fulfilled"
      ? (resumeRes.value.data?.value ?? null)
      : null;

  return (
    <div className="min-h-screen bg-canvas">
      {/* Header */}
      <header className="border-b border-white/5 bg-[#0e0e1a]/80 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-zinc-600 hover:text-zinc-400 transition-colors"
              title="Back to site"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <div className="w-px h-4 bg-white/10" />
            <span className="text-white font-semibold">Admin Dashboard</span>
          </div>
          <LogoutButton />
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-6 py-10 space-y-10">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <StatCard
            label="Total Projects"
            value={String(projects.length)}
            icon="📦"
          />
          <StatCard
            label="Live Projects"
            value={String(projects.filter((p) => p.status === "Live").length)}
            icon="🚀"
          />
          <StatCard
            label="Resume"
            value={resumeUrl ? "Uploaded" : "Not uploaded"}
            icon="📄"
          />
        </div>

        {/* Projects */}
        <div className="p-6 rounded-2xl bg-[#0e0e1a] border border-white/5">
          <ProjectsList initialProjects={projects} />
        </div>

        {/* Resume */}
        <ResumeUpload currentUrl={resumeUrl} />
      </main>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: string;
}) {
  return (
    <div className="p-5 rounded-2xl bg-[#0e0e1a] border border-white/5">
      <div className="text-2xl mb-3">{icon}</div>
      <div className="text-2xl font-bold text-white mb-0.5">{value}</div>
      <div className="text-zinc-500 text-sm">{label}</div>
    </div>
  );
}
