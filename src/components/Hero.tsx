"use client";

export default function Hero({ resumeUrl }: { resumeUrl?: string | null }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[900px] h-[600px] bg-blue-500/12 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[400px] bg-blue-400/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[300px] bg-sky-500/6 rounded-full blur-[100px]" />
      </div>

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "72px 72px",
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Status badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-blue-500/25 bg-blue-500/8 text-blue-300 text-sm font-medium mb-10 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse-slow" />
          Open to new opportunities
        </div>

        {/* Name */}
        <h1 className="text-[clamp(3rem,10vw,7rem)] font-bold leading-[1.0] tracking-tight mb-5 animate-fade-up">
          <span className="gradient-text">Kishore</span>
          <br />
          <span className="text-white">Ramaswamy</span>
        </h1>

        {/* Title */}
        <p className="text-xl md:text-2xl text-zinc-400 font-medium mb-5 tracking-wide animate-fade-up delay-100 opacity-0-init">
          Product Manager
          <span className="mx-3 text-zinc-700">|</span>
          0–1 Builder
        </p>

        {/* Tagline */}
        <p className="text-zinc-500 text-lg md:text-xl max-w-xl mx-auto mb-12 leading-relaxed animate-fade-up delay-200 opacity-0-init">
          I find the problem worth solving, then stay relentless until
          it&apos;s shipped.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14 animate-fade-up delay-300 opacity-0-init">
          <a
            href="#projects"
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-500 to-sky-400 hover:from-blue-400 hover:to-sky-300 text-white font-bold rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-400/50 hover:-translate-y-0.5 text-base"
          >
            View My Work
          </a>
          {resumeUrl ? (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 border border-white/10 hover:border-white/25 text-zinc-300 hover:text-white font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5 text-base flex items-center justify-center gap-2"
            >
              Download Resume
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          ) : (
            <a
              href="#contact"
              className="w-full sm:w-auto px-8 py-4 border border-blue-400/40 text-blue-300 hover:bg-blue-500/10 hover:border-blue-400/70 hover:text-blue-200 font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5 text-base"
            >
              Get In Touch
            </a>
          )}
        </div>

        {/* Contact row */}
        <div className="flex items-center justify-center gap-2 flex-wrap animate-fade-up delay-400 opacity-0-init">
          <a
            href="http://www.linkedin.com/in/kramaswa"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-zinc-500 hover:text-blue-400 hover:bg-blue-500/8 transition-all text-sm font-medium"
          >
            <LinkedInIcon className="w-4 h-4" />
            LinkedIn
          </a>
          <Divider />
          <a
            href="mailto:Kishore6487@gmail.com"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-zinc-500 hover:text-blue-400 hover:bg-blue-500/8 transition-all text-sm font-medium"
          >
            <MailIcon className="w-4 h-4" />
            Kishore6487@gmail.com
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-700 text-xs animate-bounce">
        <span className="uppercase tracking-widest text-[10px]">scroll</span>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}

function Divider() {
  return <span className="w-px h-4 bg-zinc-800 hidden sm:block" />;
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

