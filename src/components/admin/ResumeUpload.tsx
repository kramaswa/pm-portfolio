"use client";

import { useState } from "react";

interface Props {
  currentUrl: string | null;
}

export default function ResumeUpload({ currentUrl }: Props) {
  const [url, setUrl] = useState<string | null>(currentUrl);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      setError("Only PDF files are allowed.");
      return;
    }

    setUploading(true);
    setError("");
    setSuccess(false);

    const fd = new FormData();
    fd.append("file", file);
    fd.append("bucket", "assets");
    fd.append("path", "resume.pdf");

    const uploadRes = await fetch("/api/upload", { method: "POST", body: fd });
    const uploadData = await uploadRes.json();

    if (!uploadRes.ok) {
      setError(uploadData.error ?? "Upload failed");
      setUploading(false);
      return;
    }

    const saveRes = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: "resume_url", value: uploadData.url }),
    });

    const saveData = await saveRes.json();
    if (saveRes.ok) {
      setUrl(uploadData.url);
      setSuccess(true);
    } else {
      setError(saveData.error ?? "Failed to save resume URL.");
    }

    setUploading(false);
    e.target.value = "";
  }

  return (
    <div className="p-6 rounded-2xl bg-[#14141f] border border-white/5">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h2 className="text-white font-bold text-xl">Resume</h2>
          <p className="text-zinc-500 text-sm mt-0.5">
            Upload a PDF — visitors can download it from the homepage.
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
          Resume uploaded successfully.
        </div>
      )}

      {url && (
        <div className="flex items-center gap-3 mb-5 p-4 rounded-xl bg-[#080810] border border-white/5">
          <svg className="w-8 h-8 text-red-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM8 17v-1h8v1H8zm0-3v-1h8v1H8zm0-3V10h5v1H8z" />
          </svg>
          <div className="flex-1 min-w-0">
            <p className="text-zinc-300 text-sm font-medium">resume.pdf</p>
            <p className="text-zinc-600 text-xs mt-0.5 truncate">{url}</p>
          </div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 px-3 py-1.5 rounded-lg border border-white/8 text-zinc-400 hover:text-white text-xs font-medium transition-colors"
          >
            Preview
          </a>
        </div>
      )}

      <label className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl border border-dashed border-white/15 hover:border-indigo-500/40 cursor-pointer transition-colors bg-[#080810] text-zinc-400 hover:text-zinc-300 text-sm font-medium">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
        {uploading ? "Uploading..." : url ? "Replace Resume (PDF)" : "Upload Resume (PDF)"}
        <input
          type="file"
          accept=".pdf,application/pdf"
          onChange={handleUpload}
          className="hidden"
          disabled={uploading}
        />
      </label>
    </div>
  );
}
