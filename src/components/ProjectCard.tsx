"use client";

import { useState } from "react";
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
  const [caseStudyOpen, setCaseStudyOpen] = useState(false);

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

        {/* Bottom row: links + case study toggle */}
        <div className="flex items-center justify-between gap-4 mt-auto flex-wrap">
          <div className="flex items-center gap-3">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 font-semibold transition-colors group/link"
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
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
                title="View on GitHub"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
            )}
          </div>

          {project.long_description && (
            <button
              onClick={() => setCaseStudyOpen(!caseStudyOpen)}
              className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-300 font-medium transition-colors"
            >
              {caseStudyOpen ? "Hide" : "Case Study"}
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-200 ${caseStudyOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}
        </div>

        {/* Case study expand */}
        {project.long_description && caseStudyOpen && (
          <div className="mt-4 pt-4 border-t border-white/5">
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-3">
              Case Study
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed whitespace-pre-line">
              {project.long_description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
