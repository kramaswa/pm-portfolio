"use client";

import { useState } from "react";
import Image from "next/image";
import type { Project } from "@/types";

type FormData = {
  title: string;
  description: string;
  long_description: string;
  tags: string;
  link: string;
  github_url: string;
  status: Project["status"];
  featured: boolean;
  order_index: number;
  screenshot_url: string;
};

const DEFAULT_FORM: FormData = {
  title: "",
  description: "",
  long_description: "",
  tags: "",
  link: "",
  github_url: "",
  status: "Live",
  featured: false,
  order_index: 0,
  screenshot_url: "",
};

function projectToForm(p: Project): FormData {
  return {
    title: p.title,
    description: p.description,
    long_description: p.long_description ?? "",
    tags: p.tags.join(", "),
    link: p.link ?? "",
    github_url: p.github_url ?? "",
    status: p.status,
    featured: p.featured,
    order_index: p.order_index,
    screenshot_url: p.screenshot_url ?? "",
  };
}

interface Props {
  project?: Project;
  onSave: () => void;
  onCancel: () => void;
}

export default function ProjectForm({ project, onSave, onCancel }: Props) {
  const [form, setForm] = useState<FormData>(
    project ? projectToForm(project) : DEFAULT_FORM
  );
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const set = (key: keyof FormData, value: string | boolean | number) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  async function handleScreenshot(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("bucket", "assets");

    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();

    if (res.ok) {
      set("screenshot_url", data.url);
    } else {
      setError(data.error ?? "Upload failed");
    }
    setUploading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) { setError("Title is required"); return; }
    if (!form.description.trim()) { setError("Description is required"); return; }

    setSaving(true);
    setError("");

    const payload = {
      ...form,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    const url = project ? `/api/projects/${project.id}` : "/api/projects";
    const method = project ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      onSave();
    } else {
      const data = await res.json();
      setError(data.error ?? "Save failed");
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="relative bg-[#0e0e1a] border border-white/8 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-[#0e0e1a] border-b border-white/5 px-6 py-4 flex items-center justify-between">
          <h2 className="text-white font-bold text-lg">
            {project ? "Edit Project" : "Add Project"}
          </h2>
          <button
            onClick={onCancel}
            className="text-zinc-500 hover:text-white transition-colors p-1"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Title */}
          <Field label="Title *">
            <Input
              value={form.title}
              onChange={(v) => set("title", v)}
              placeholder="e.g. NomadAI"
            />
          </Field>

          {/* Description */}
          <Field label="Short Description *">
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="One-two sentence overview of what the product does and why it matters."
              rows={3}
              className="w-full bg-[#080810] border border-white/8 rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500/60 transition-colors resize-none text-sm"
            />
          </Field>

          {/* Case Study */}
          <Field label="Case Study" hint="Optional — shown as an expandable section on the project card">
            <textarea
              value={form.long_description}
              onChange={(e) => set("long_description", e.target.value)}
              placeholder={`What problem were you solving?\nWhat did you decide and why?\nWhat tradeoffs did you make?\nWhat was the outcome?`}
              rows={6}
              className="w-full bg-[#080810] border border-white/8 rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500/60 transition-colors resize-none text-sm leading-relaxed"
            />
          </Field>

          {/* Tags */}
          <Field label="Tags" hint="Comma-separated, e.g. AI, iOS, Consumer">
            <Input
              value={form.tags}
              onChange={(v) => set("tags", v)}
              placeholder="AI, iOS, B2C"
            />
          </Field>

          {/* Link */}
          <Field label="Project Link">
            <Input
              value={form.link}
              onChange={(v) => set("link", v)}
              placeholder="https://..."
              type="url"
            />
          </Field>

          {/* GitHub URL */}
          <Field label="GitHub URL" hint="Optional">
            <Input
              value={form.github_url}
              onChange={(v) => set("github_url", v)}
              placeholder="https://github.com/..."
              type="url"
            />
          </Field>

          {/* Status + Featured row */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Status">
              <select
                value={form.status}
                onChange={(e) => set("status", e.target.value as Project["status"])}
                className="w-full bg-[#080810] border border-white/8 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500/60 transition-colors text-sm"
              >
                {["Live", "Beta", "In Progress", "Archived"].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </Field>
            <Field label="Order (lower = first)">
              <Input
                value={String(form.order_index)}
                onChange={(v) => set("order_index", parseInt(v) || 0)}
                placeholder="0"
                type="number"
              />
            </Field>
          </div>

          {/* Featured toggle */}
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <div
              onClick={() => set("featured", !form.featured)}
              className={`w-10 h-6 rounded-full transition-colors flex items-center ${
                form.featured ? "bg-blue-500" : "bg-zinc-700"
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full bg-white shadow transition-transform mx-1 ${
                  form.featured ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </div>
            <span className="text-zinc-400 text-sm">Featured project</span>
          </label>

          {/* Screenshot upload */}
          <Field label="Cover Image" hint="1 image only — shown as the card thumbnail">
            <div className="space-y-3">
              <label className="flex items-center gap-3 px-4 py-3 rounded-lg border border-dashed border-white/15 hover:border-blue-500/40 cursor-pointer transition-colors bg-[#080810] text-sm text-zinc-400 hover:text-zinc-300">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {uploading ? "Uploading..." : form.screenshot_url ? "Replace cover image" : "Upload cover image"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleScreenshot}
                  className="hidden"
                  disabled={uploading}
                />
              </label>

              {form.screenshot_url && (
                <div className="relative aspect-video rounded-lg overflow-hidden border border-white/5">
                  <Image
                    src={form.screenshot_url}
                    alt="Preview"
                    fill
                    className="object-contain p-2"
                  />
                  <button
                    type="button"
                    onClick={() => set("screenshot_url", "")}
                    className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 text-zinc-300 hover:text-white flex items-center justify-center text-xs transition-colors"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          </Field>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-3 rounded-xl border border-white/8 text-zinc-400 hover:text-white hover:border-white/20 font-medium text-sm transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || uploading}
              className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold text-sm transition-all"
            >
              {saving ? "Saving..." : project ? "Save Changes" : "Add Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-zinc-300 mb-1.5">
        {label}
        {hint && <span className="text-zinc-600 font-normal ml-2 text-xs">{hint}</span>}
      </label>
      {children}
    </div>
  );
}

function Input({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-[#080810] border border-white/8 rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500/60 transition-colors text-sm"
    />
  );
}
