import type { Project } from "@/types";
import ProjectCard from "./ProjectCard";

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-blue-500" />
          <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">
            Work
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            What I&apos;ve{" "}
            <span className="gradient-text">Built</span>
          </h2>
          {projects.length > 0 && (
            <p className="text-zinc-500 text-sm md:text-base">
              {projects.length} project{projects.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>

        {projects.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div
        className="w-20 h-20 rounded-2xl bg-[#0e0e1a] border border-white/5 flex items-center justify-center mb-6"
      >
        <svg
          className="w-8 h-8 text-zinc-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      </div>
      <h3 className="text-zinc-400 font-semibold mb-2 text-lg">
        Projects Coming Soon
      </h3>
      <p className="text-zinc-600 text-sm max-w-xs">
        Currently building in stealth. Check back soon.
      </p>
    </div>
  );
}
