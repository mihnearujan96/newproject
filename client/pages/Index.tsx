import { ArrowRight, BarChart3, Check, MessageCircle, Sparkles, TrendingUp, Users } from "lucide-react";

const trustLogos = ["NovaPay", "PulseHQ", "Everline", "Brightly", "Optimate", "Fluxon"];

const solutionCards = [
  {
    title: "Persuasion Intelligence Audit",
    description:
      "We analyze every step of your funnel, uncover invisible friction, and map high-leverage experiments that unlock momentum.",
    bullets: ["Behavioral heuristics review", "UX teardown & voice-of-customer", "Prioritized 90-day roadmap"],
  },
  {
    title: "Full-Funnel Story Architecture",
    description:
      "We design conversion paths that weave data-backed storytelling with persuasive design patterns for every persona.",
    bullets: ["High-impact landing systems", "Lifecycle email persuasion", "Onboarding narrative arcs"],
  },
  {
    title: "Experimentation & Enablement",
    description:
      "We embed with your team to launch, measure, and scale persuasive experiments that compound growth month over month.",
    bullets: ["Rapid test deployment", "Team persuasion playbooks", "Executive insights & rituals"],
  },
];

const capabilityHighlights = [
  {
    title: "Data signals amplified",
    description:
      "Integrate qualitative research with quantitative dashboards to spot persuasion gaps before they erode revenue.",
  },
  {
    title: "Behavioral design systems",
    description:
      "Build reusable components engineered to unlock trust, reduce anxiety, and nudge decisive action at every interaction.",
  },
  {
    title: "High-converting narratives",
    description:
      "Translate product value into magnetic storytelling that persuades prospects to convert, upgrade, and advocate.",
  },
];

const resources = [
  {
    title: "The Persuasion Canvas",
    description: "A step-by-step workbook to architect persuasive experiences that feel personal at scale.",
    href: "#resources",
  },
  {
    title: "Voice-of-Customer Playbook",
    description: "Proven rituals to capture qualitative insights and transform them into compelling conversion assets.",
    href: "#resources",
  },
  {
    title: "Executive KPI Dashboard",
    description: "Align teams on the persuasion metrics that matter with plug-and-play reporting templates.",
    href: "#resources",
  },
];

const resultStats = [
  { value: "188%", label: "Average lift in qualified demos" },
  { value: "4.6x", label: "Return on funnel experimentation" },
  { value: "21 days", label: "Median time to first significant win" },
];

export default function Index() {
  return (
    <div className="relative isolate overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 flex h-[720px] justify-center">
        <div className="h-full w-[680px] rounded-full bg-gradient-to-b from-primary/25 via-primary/8 to-transparent blur-3xl" />
      </div>

      <section className="mx-auto grid w-full max-w-6xl gap-12 px-6 pb-20 pt-24 lg:grid-cols-[1.05fr_1fr] lg:items-center">
        <div className="space-y-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
            <Sparkles className="h-3.5 w-3.5" /> Persuasion Engine
          </span>
          <h1 className="font-heading text-4xl leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
            Design persuasive journeys that convert curiosity into committed customers.
          </h1>
          <p className="max-w-xl text-lg text-foreground/75">
            Convince Growth Studio blends behavioral science, conversion strategy, and premium experience design to build funnels your prospects can’t resist. We partner with teams ready to scale influence with integrity.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/70">
            {["Conversion heuristics", "Lifecycle orchestration", "Story-led experimentation"].map((chip) => (
              <span
                key={chip}
                className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-white/70 px-4 py-2 shadow-sm shadow-primary/5"
              >
                <Check className="h-3.5 w-3.5 text-primary" />
                {chip}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#demo"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-primary/30 transition hover:shadow-primary/40"
            >
              Schedule a Conversion Lab
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#results"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-white/70 px-6 py-3 text-sm font-semibold text-foreground/80 transition hover:border-primary hover:text-primary"
            >
              Explore client results
            </a>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {resultStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/40 bg-white/70 p-4 text-sm shadow-sm shadow-primary/10"
              >
                <p className="font-heading text-2xl font-semibold text-primary">{stat.value}</p>
                <p className="text-foreground/65">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative isolate">
          <div className="relative overflow-hidden rounded-3xl border border-white/50 bg-white/80 p-8 shadow-2xl shadow-primary/20 backdrop-blur">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(56,91,253,0.25),_transparent_70%)]" />
            <div className="flex items-center justify-between text-sm text-foreground/70">
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-[0.3em] text-primary/70">Momentum funnel</p>
                <p className="font-heading text-xl font-semibold text-foreground">Launch sequence</p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                <TrendingUp className="h-3.5 w-3.5" /> +38% lift
              </div>
            </div>
            <div className="mt-6 space-y-4">
              {["Framed clarity", "Social proof surge", "Decisive CTA"].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-border/60 bg-white/70 px-4 py-3">
                  <Check className="mt-1 h-4 w-4 flex-none text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">{item}</p>
                    <p className="text-sm text-foreground/70">
                      Craft copy and design cues that remove anxiety and guide intent-rich users toward the next best action.
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 grid gap-4 rounded-2xl border border-primary/10 bg-gradient-to-r from-primary/10 via-white to-secondary/10 p-5 text-sm text-foreground/75">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-primary" />
                <p>
                  <span className="font-semibold text-foreground">48 high-intent demos</span> booked in 22 days.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle className="h-5 w-5 text-secondary" />
                <p>Automated nurture journeys warmed cold leads with persuasive storytelling and urgency triggers.</p>
              </div>
              <div className="flex items-center gap-3">
                <BarChart3 className="h-5 w-5 text-primary" />
                <p>Executive dashboard reveals experiment velocity, insight quality, and retention impact in real-time.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border/60 bg-white/60 py-12" aria-label="Trusted clients">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-foreground/60">
            Trusted by category-leading teams
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm font-semibold tracking-widest text-foreground/40 sm:grid-cols-3 md:grid-cols-6">
            {trustLogos.map((logo) => (
              <div
                key={logo}
                className="flex h-12 items-center justify-center rounded-xl border border-border/70 bg-white/70 shadow-sm"
              >
                {logo}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="solutions" className="mx-auto w-full max-w-6xl space-y-12 px-6 py-20">
        <div className="space-y-4">
          <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-primary/90">
            Solutions
          </span>
          <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-end">
            <h2 className="font-heading text-3xl leading-tight text-foreground sm:text-4xl">
              Persuasive growth systems designed to influence decisions—ethically and at scale.
            </h2>
            <p className="text-base text-foreground/70">
              We blend qualitative storytelling with quantitative rigor to create experiences that feel personal, build trust, and convert consistently across every touchpoint.
            </p>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {solutionCards.map((card) => (
            <div
              key={card.title}
              className="group relative flex flex-col gap-4 overflow-hidden rounded-3xl border border-border/60 bg-white/80 p-8 shadow-[0_20px_60px_-40px_rgba(56,91,253,0.5)] transition hover:-translate-y-1 hover:shadow-[0_24px_70px_-40px_rgba(56,91,253,0.65)]"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-70" />
              <h3 className="font-heading text-xl font-semibold text-foreground">{card.title}</h3>
              <p className="text-sm text-foreground/70">{card.description}</p>
              <ul className="mt-4 space-y-2 text-sm text-foreground/75">
                {card.bullets.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id="capabilities" className="mx-auto w-full max-w-6xl space-y-12 px-6 pb-20">
        <div className="grid gap-10 rounded-3xl border border-border/60 bg-white/80 p-8 shadow-[0_35px_90px_-60px_rgba(255,138,84,0.6)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-secondary/80">
                Capabilities
              </span>
              <h2 className="font-heading text-3xl leading-tight text-foreground">
                Behavioral science meets premium experience design.
              </h2>
            </div>
            <p className="max-w-xl text-sm text-foreground/70">
              From onboarding flows to enterprise renewal journeys, we redesign persuasion moments to remove friction, amplify credibility, and accelerate confident decisions.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {capabilityHighlights.map((item) => (
              <div key={item.title} className="rounded-2xl border border-border/60 bg-white/70 p-6">
                <h3 className="font-heading text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-3 text-sm text-foreground/70">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="results" className="border-y border-border/60 bg-gradient-to-br from-primary/6 via-white to-secondary/10 py-20">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl space-y-4">
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/80">
              Results
            </span>
            <h2 className="font-heading text-3xl leading-tight text-foreground sm:text-4xl">
              Revenue teams trust us when the next growth chapter demands persuasion breakthroughs.
            </h2>
            <p className="text-base text-foreground/70">
              “Convince rebuilt our go-to-market funnel with persuasive narratives grounded in customer insight. The lift in demos and retention speaks for itself.”
            </p>
            <div className="text-sm text-foreground/60">
              <p className="font-semibold text-foreground">Amelia Warren</p>
              <p>Chief Revenue Officer, NovaPay</p>
            </div>
          </div>
          <div className="grid w-full max-w-lg gap-4 rounded-3xl border border-border/60 bg-white/80 p-8 shadow-[0_30px_80px_-60px_rgba(56,91,253,0.65)]">
            <div className="flex items-center justify-between text-sm text-foreground/70">
              <span>Quarterly pipeline impact</span>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                <TrendingUp className="h-3.5 w-3.5" /> +128%
              </span>
            </div>
            {resultStats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-border/60 bg-white/70 p-5 text-sm">
                <p className="font-heading text-3xl font-semibold text-primary">{stat.value}</p>
                <p className="mt-1 text-foreground/65">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="resources" className="mx-auto w-full max-w-6xl space-y-12 px-6 py-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-secondary/80">
              Resources
            </span>
            <h2 className="font-heading text-3xl leading-tight text-foreground sm:text-4xl">
              Persuasion frameworks your team can deploy today.
            </h2>
            <p className="max-w-2xl text-base text-foreground/70">
              Use our research-backed playbooks to launch conversion experiments faster, communicate impact, and align leadership around persuasive growth.
            </p>
          </div>
          <a
            href="#demo"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-white/70 px-6 py-3 text-sm font-semibold text-foreground/80 transition hover:border-secondary hover:text-secondary"
          >
            View the full library
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {resources.map((resource) => (
            <a
              key={resource.title}
              href={resource.href}
              className="group flex flex-col gap-4 rounded-3xl border border-border/60 bg-white/80 p-6 shadow-[0_20px_50px_-45px_rgba(255,138,84,0.7)] transition hover:-translate-y-1 hover:shadow-[0_24px_60px_-45px_rgba(255,138,84,0.8)]"
            >
              <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-secondary/80">
                Playbook
                <span className="h-px flex-1 bg-secondary/30" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground">{resource.title}</h3>
              <p className="text-sm text-foreground/70">{resource.description}</p>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-secondary">
                Access now <ArrowRight className="h-4 w-4" />
              </span>
            </a>
          ))}
        </div>
      </section>

      <section
        id="contact"
        className="relative overflow-hidden border-t border-border/60 bg-gradient-to-br from-primary/90 via-primary/80 to-secondary/85 py-20"
      >
        <div className="absolute inset-0 opacity-60 mix-blend-screen">
          <div className="mx-auto h-full w-full max-w-6xl bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.45),_transparent_65%)]" />
        </div>
        <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center gap-6 px-6 text-center text-white">
          <span className="text-xs font-semibold uppercase tracking-[0.4em] text-white/70">
            Ready to persuade with purpose?
          </span>
          <h2 className="font-heading text-3xl leading-tight sm:text-4xl">
            Let’s build the conversion engine your buyers can’t ignore.
          </h2>
          <p className="max-w-2xl text-base text-white/80">
            Share your growth goals and we’ll craft a persuasion plan tailored to your funnel, your audience, and your timelines.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              id="demo"
              href="mailto:hello@convince.studio"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary transition hover:bg-white/90"
            >
              hello@convince.studio
            </a>
            <a
              href="#solutions"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/70 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              View our persuasion stack
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
