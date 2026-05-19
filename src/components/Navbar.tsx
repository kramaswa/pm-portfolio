"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#080810]/90 backdrop-blur-md border-b border-white/5 shadow-xl shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-white font-bold text-lg tracking-tight hover:text-blue-400 transition-colors"
        >
          KR<span className="text-blue-400">.</span>
        </Link>

        <div className="flex items-center gap-8">
          <a
            href="#projects"
            className="text-zinc-400 hover:text-white text-sm font-medium transition-colors"
          >
            Projects
          </a>
          <a
            href="#about"
            className="text-zinc-400 hover:text-white text-sm font-medium transition-colors"
          >
            About
          </a>
          <a
            href="#contact"
            className="text-zinc-400 hover:text-white text-sm font-medium transition-colors"
          >
            Contact
          </a>
          <a
            href="http://www.linkedin.com/in/kramaswa"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1.5 rounded-lg border border-blue-500/40 text-blue-300 hover:bg-blue-500/10 text-sm font-medium transition-all"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </nav>
  );
}
