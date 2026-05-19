export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-zinc-600 text-sm">
          © {new Date().getFullYear()} Kishore Ramaswamy. All rights reserved.
        </div>
        <div className="flex items-center gap-6">
          <a
            href="http://www.linkedin.com/in/kramaswa"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 hover:text-zinc-400 text-sm transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="mailto:Kishore6487@gmail.com"
            className="text-zinc-600 hover:text-zinc-400 text-sm transition-colors"
          >
            Email
          </a>

          <a
            href="/admin/login"
            className="text-zinc-800 hover:text-zinc-600 text-xs transition-colors"
          >
            Admin
          </a>
        </div>
      </div>
    </footer>
  );
}
