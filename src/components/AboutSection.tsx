const pillars = [
  {
    icon: "🎯",
    title: "Start with the user",
    description:
      "I don't trust assumptions — mine or anyone else's. Before writing a spec, I need to have actually talked to the people who'll use it.",
  },
  {
    icon: "🚀",
    title: "0–1 Builder",
    description:
      "Give me a blank page over a backlog any day. I like figuring out what to build before figuring out how to build it.",
  },
  {
    icon: "📐",
    title: "Data + Gut",
    description:
      "Metrics tell you what happened. Talking to users tells you why. I need both before committing to a direction.",
  },
  {
    icon: "🤝",
    title: "Works well with builders",
    description:
      "The best way to align engineers and designers isn't a framework — it's being clear about the problem and genuinely curious about their take.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-blue-500" />
          <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">
            About
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — bio */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Building products that{" "}
              <span className="gradient-text">matter</span>.
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed mb-4">
              Most PMs inherit a product. I&apos;d rather build one from
              scratch. I like the early stage — messy, undefined, full of open
              questions. That&apos;s when the decisions matter most, and when
              good judgment beats any process.
            </p>
            <p className="text-zinc-500 leading-relaxed">
              Right now I&apos;m spending a lot of time in AI and consumer apps,
              thinking about where software still feels broken and what it could
              feel like instead.
            </p>
          </div>

          {/* Right — pillars grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="p-5 rounded-xl bg-[#0e0e1a] border border-white/5 hover:border-white/10 transition-colors"
              >
                <div className="text-2xl mb-3">{p.icon}</div>
                <h3 className="text-white font-semibold mb-1.5">{p.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
