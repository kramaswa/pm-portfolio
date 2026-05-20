import Image from "next/image";
import type { Project } from "@/types";

const STATUS_STYLES: Record<Project["status"], string> = {
  Live: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Beta: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  "In Progress": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Archived: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
};

const STATUS_DOT: Record<Project["status"], string> = {
  Live: "bg-emerald-400",
  Beta: "bg-amber-400",
  "In Progress": "bg-blue-400",
  Archived: "bg-zinc-400",
};

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group flex flex-col bg-[#0e0e1a] border border-white/5 rounded-2xl overflow-hidden card-lift h-full">
      {/* Screenshot area */}
      <div className="relative aspect-video bg-[#080810] overflow-hidden flex-shrink-0">
        {project.screenshot_url ? (
          <Image
            src={project.screenshot_url}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain group-hover:scale-105 transition-transform duration-500 p-2"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 2px 2px, rgba(99,102,241,0.4) 1px, transparent 0)",
                backgroundSize: "28px 28px",
              }}
            />
            <svg
              className="w-12 h-12 text-zinc-700 relative z-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0e0e1a] to-transparent" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        {/* Status */}
        <div className="mb-3">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
              STATUS_STYLES[project.status]
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[project.status]}`}
            />
            {project.status}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors leading-snug">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-zinc-500 text-sm leading-relaxed mb-4 flex-1 line-clamp-4">
          {project.description}
        </p>

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 bg-blue-500/8 text-blue-400 text-xs rounded-md border border-blue-500/15 font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Link */}
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 font-semibold transition-colors group/link mt-auto"
          >
            View Project
            <svg
              className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
}
