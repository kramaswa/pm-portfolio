"use client";

import { useState } from "react";
import Image from "next/image";
import type { Project } from "@/types";
import ProjectForm from "./ProjectForm";

const STATUS_STYLES: Record<Project["status"], string> = {
  Live: "bg-emerald-500/10 text-emerald-400",
  Beta: "bg-amber-500/10 text-amber-400",
  "In Progress": "bg-blue-500/10 text-blue-400",
  Archived: "bg-zinc-500/10 text-zinc-400",
};

interface Props {
  initialProjects: Project[];
}

export default function ProjectsList({ initialProjects }: Props) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Project | undefined>();
  const [deleting, setDeleting] = useState<string | null>(null);

  async function refresh() {
    const res = await fetch("/api/projects");
    if (res.ok) {
      const data = await res.json();
      setProjects(data);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this project? This cannot be undone.")) return;
    setDeleting(id);
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    setDeleting(null);
    refresh();
  }

  function handleSaved() {
    setShowForm(false);
    setEditing(undefined);
    refresh();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-white font-bold text-xl">Projects</h2>
          <p className="text-zinc-500 text-sm mt-0.5">
            {projects.length} project{projects.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={() => { setEditing(undefined); setShowForm(true); }}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-all"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-16 text-zinc-600">
          No projects yet. Add your first one.
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-4 p-4 rounded-xl bg-[#14141f] border border-white/5 hover:border-white/8 transition-colors"
            >
              {/* Thumbnail */}
              <div className="w-16 h-12 rounded-lg bg-[#080810] overflow-hidden flex-shrink-0 border border-white/5">
                {p.screenshot_url ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={p.screenshot_url}
                      alt={p.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-700">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-white font-semibold text-sm truncate">
                    {p.title}
                  </span>
                  {p.featured && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-400 uppercase tracking-wider flex-shrink-0">
                      Featured
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_STYLES[p.status]}`}>
                    {p.status}
                  </span>
                  {p.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-zinc-600 text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => { setEditing(p); setShowForm(true); }}
                  className="px-3 py-1.5 rounded-lg border border-white/8 text-zinc-400 hover:text-white hover:border-white/20 text-xs font-medium transition-all"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  disabled={deleting === p.id}
                  className="px-3 py-1.5 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 hover:border-red-500/40 text-xs font-medium transition-all disabled:opacity-50"
                >
                  {deleting === p.id ? "..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <ProjectForm
          project={editing}
          onSave={handleSaved}
          onCancel={() => { setShowForm(false); setEditing(undefined); }}
        />
      )}
    </div>
  );
}
