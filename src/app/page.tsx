import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { createReadClient } from "@/lib/supabase-server";
import type { Project } from "@/types";

export const revalidate = 60;

export default async function Home() {
  const supabase = createReadClient();

  const [projectsRes, resumeRes] = await Promise.allSettled([
    supabase
      .from("projects")
      .select("*")
      .neq("status", "Archived")
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
    <main className="bg-canvas min-h-screen">
      <Navbar />
      <Hero resumeUrl={resumeUrl} />
      <AboutSection />
      <ProjectsSection projects={projects} />
      <ContactSection />
      <Footer />
    </main>
  );
}
