const contactLinks = [
  {
    label: "LinkedIn",
    value: "linkedin.com/in/kramaswa",
    href: "http://www.linkedin.com/in/kramaswa",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Email",
    value: "Kishore6487@gmail.com",
    href: "mailto:Kishore6487@gmail.com",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-blue-500" />
          <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">
            Contact
          </span>
        </div>

        {/* Card */}
        <div className="relative rounded-3xl overflow-hidden border border-white/6 bg-[#0e0e1a] p-10 md:p-16">
          {/* Background glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-blue-600/10 blur-[80px]" />
          </div>

          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Let&apos;s work{" "}
              <span className="gradient-text">together.</span>
            </h2>
            <p className="text-zinc-400 text-lg mb-10 max-w-xl">
              Hiring, collaborating, or just want to swap notes on something
              you&apos;re building — my inbox is open.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    link.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="group flex items-start gap-4 p-5 rounded-2xl border border-white/5 hover:border-blue-500/30 bg-[#080810] hover:bg-blue-500/5 transition-all duration-200"
                >
                  <div className="text-blue-400 group-hover:text-blue-300 transition-colors flex-shrink-0 mt-0.5">
                    {link.icon}
                  </div>
                  <div>
                    <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-1">
                      {link.label}
                    </p>
                    <p className="text-zinc-300 text-sm font-medium group-hover:text-white transition-colors break-all">
                      {link.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
