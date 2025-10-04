import {
  ArrowRight,
  Building2,
  CalendarDays,
  Camera,
  Gauge,
  Handshake,
  MapPin,
  Music,
  Palette,
  Rocket,
  ShieldCheck,
  Sparkles,
  Users,
  Wallet,
} from "lucide-react";

const eventTypes = [
  "Wedding",
  "Baptism",
  "Corporate Summit",
  "18th Birthday",
  "Holiday Party",
  "Anniversary Gala",
];

const vendorCategories = [
  {
    title: "Elegant Venues",
    icon: Building2,
    description: "Top-rated restaurants, ballrooms, and rooftops tailored to capacity and style.",
    matches: [
      { name: "Luna Terrace", tags: ["Rooftop", "City skyline"], price: "from $120 / guest" },
      { name: "Gardenia Hall", tags: ["Indoor & outdoor", "On-site catering"], price: "from $95 / guest" },
    ],
  },
  {
    title: "Storytelling Photographers",
    icon: Camera,
    description: "Capture every emotion with curated photographers and videographers.",
    matches: [
      { name: "Frames & Vows Studio", tags: ["Documentary", "48h preview"], price: "from $1,800" },
      { name: "Northlight Films", tags: ["Cinematic", "Drone coverage"], price: "from $2,250" },
    ],
  },
  {
    title: "Rhythm Architects",
    icon: Music,
    description: "DJs and live bands that read the room and sustain energy all night.",
    matches: [
      { name: "Pulse Collective", tags: ["Hybrid band", "MC included"], price: "from $2,100" },
      { name: "DJ NovaFlow", tags: ["Multi-genre", "Interactive"], price: "from $1,350" },
    ],
  },
  {
    title: "Atmosphere Artists",
    icon: Palette,
    description: "Florists and decorators who craft immersive, share-worthy moments.",
    matches: [
      { name: "Bloom & Ember", tags: ["Seasonal florals", "Tablescapes"], price: "from $980" },
      { name: "Velvet Atlas", tags: ["Lighting design", "Custom installs"], price: "from $1,450" },
    ],
  },
];

const workflowSteps = [
  {
    title: "Tell us your vision",
    description: "Pick celebration type, date, location radius, and a comfort-range budget in under 60 seconds.",
  },
  {
    title: "Match with curated pros",
    description: "We cross-check availability, style, and budget signals to surface vendors that fit like magic.",
  },
  {
    title: "Build a persuasive package",
    description: "Select or swap vendors, then generate a ready-to-share proposal with transparent pricing.",
  },
  {
    title: "Launch with confidence",
    description: "Collaborate with vendors, manage payments, and track to-dos with Eventia’s timeline hub.",
  },
];

const smartPackages = [
  {
    name: "Timeless Wedding",
    perks: "Romantic ballroom, storytelling photography, live quartet dinner set, late-night DJ.",
    total: "$24,600",
  },
  {
    name: "Vibrant Corporate Gala",
    perks: "Skyline venue, experiential decor, keynote media team, premium AV concierge.",
    total: "$31,900",
  },
  {
    name: "Milestone Birthday Bash",
    perks: "Boutique restaurant buyout, immersive lighting, interactive DJ, photo moments corner.",
    total: "$12,400",
  },
];

const vendorGrowthHighlights = [
  {
    title: "Verified leads delivered",
    description: "Vendors receive qualified requests with context around guest count, vibe, and budget expectations.",
    icon: ShieldCheck,
  },
  {
    title: "Performance dashboard",
    description: "Real-time insights reveal conversion rates, reviews, and upsell opportunities across packages.",
    icon: Gauge,
  },
  {
    title: "Co-marketing moments",
    description: "Featured placement in Eventia campaigns that target couples, families, and corporate teams.",
    icon: Rocket,
  },
  {
    title: "Partnership concierge",
    description: "Dedicated success managers help venues and creators craft irresistible bundles.",
    icon: Handshake,
  },
];

export default function Index() {
  return (
    <div className="relative isolate overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 flex h-[720px] justify-center">
        <div className="h-full w-[780px] rounded-full bg-gradient-to-b from-primary/30 via-primary/10 to-transparent blur-3xl" />
      </div>

      <section
        id="plan"
        className="mx-auto grid w-full max-w-6xl gap-12 px-6 pb-20 pt-24 lg:grid-cols-[1.05fr_1fr] lg:items-center"
      >
        <div className="space-y-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
            <Sparkles className="h-3.5 w-3.5" /> Celebration Intelligence
          </span>
          <h1 className="font-heading text-4xl leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
            Plan magnetic celebrations with curated venues, storytellers, and experience makers in one hub.
          </h1>
          <p className="max-w-xl text-lg text-foreground/75">
            Eventia Celebration Hub orchestrates weddings, baptisms, corporate retreats, and milestone parties by matching your date, location, and budget to persuasive vendor packages that wow every guest.
          </p>
          <div className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-[0_35px_90px_-60px_rgba(56,91,253,0.35)] backdrop-blur">
            <form className="grid gap-4 md:grid-cols-2" aria-label="Event planner form">
              <label className="flex flex-col gap-2 text-sm font-medium text-foreground/80">
                Event type
                <div className="relative">
                  <select className="w-full rounded-2xl border border-border bg-white/90 px-4 py-3 pr-9 text-sm shadow-sm focus:border-primary focus:outline-none">
                    {eventTypes.map((type) => (
                      <option key={type}>{type}</option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-foreground/40">▼</span>
                </div>
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-foreground/80">
                Date
                <div className="relative flex items-center">
                  <CalendarDays className="absolute left-3 h-4 w-4 text-primary" />
                  <input
                    type="date"
                    className="w-full rounded-2xl border border-border bg-white/90 px-10 py-3 text-sm shadow-sm focus:border-primary focus:outline-none"
                  />
                </div>
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-foreground/80">
                Preferred location
                <div className="relative flex items-center">
                  <MapPin className="absolute left-3 h-4 w-4 text-secondary" />
                  <input
                    type="text"
                    placeholder="Cluj-Napoca, within 30 km"
                    className="w-full rounded-2xl border border-border bg-white/90 px-10 py-3 text-sm shadow-sm focus:border-primary focus:outline-none"
                  />
                </div>
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-foreground/80">
                Comfort budget (optional)
                <div className="relative flex items-center">
                  <Wallet className="absolute left-3 h-4 w-4 text-primary" />
                  <input
                    type="text"
                    placeholder="$10k - $20k"
                    className="w-full rounded-2xl border border-border bg-white/90 px-10 py-3 text-sm shadow-sm focus:border-primary focus:outline-none"
                  />
                </div>
              </label>
              <div className="md:col-span-2">
                <button
                  type="button"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-primary/30 transition hover:shadow-primary/40"
                >
                  Build my celebration package
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
            <p className="mt-4 text-xs text-foreground/60">
              Instantly see available venues, photographers, entertainment, florals, planners, and more matched to your celebration.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {["10k+ curated vendors", "Availability synced in real-time", "Package proposals in minutes"].map((stat) => (
              <div
                key={stat}
                className="rounded-2xl border border-white/40 bg-white/70 p-4 text-sm shadow-sm shadow-primary/10"
              >
                <p className="font-heading text-lg font-semibold text-primary">{stat.split(" ")[0]}</p>
                <p className="text-foreground/65">{stat.replace(stat.split(" ")[0] + " ", "")}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative isolate">
          <div className="relative overflow-hidden rounded-3xl border border-white/50 bg-white/85 p-8 shadow-2xl shadow-primary/20 backdrop-blur">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(56,91,253,0.22),_transparent_70%)]" />
            <div className="flex items-center justify-between text-sm text-foreground/70">
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-[0.3em] text-primary/70">Suggested package</p>
                <p className="font-heading text-xl font-semibold text-foreground">Cluj sunset wedding</p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                <Users className="h-3.5 w-3.5" /> 120 guests
              </div>
            </div>
            <div className="mt-6 space-y-4 text-sm">
              <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-white/80 px-4 py-3">
                <Building2 className="mt-1 h-4 w-4 flex-none text-primary" />
                <div>
                  <p className="font-semibold text-foreground">Casa Victoria, golden-hour terrace</p>
                  <p className="text-foreground/70">Exclusive buyout, five-course menu, guided guest flow.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-white/80 px-4 py-3">
                <Camera className="mt-1 h-4 w-4 flex-none text-secondary" />
                <div>
                  <p className="font-semibold text-foreground">Lens of Light Collective</p>
                  <p className="text-foreground/70">Two lead photographers, super 8 film add-on, 72h highlight delivery.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-white/80 px-4 py-3">
                <Music className="mt-1 h-4 w-4 flex-none text-primary" />
                <div>
                  <p className="font-semibold text-foreground">DJ Aurora & live sax</p>
                  <p className="text-foreground/70">Hybrid DJ set, custom first-dance mix, after-party upgrade module.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-white/80 px-4 py-3">
                <Palette className="mt-1 h-4 w-4 flex-none text-secondary" />
                <div>
                  <p className="font-semibold text-foreground">Floristry by Bloom & Ember</p>
                  <p className="text-foreground/70">Suspended ceremony installation, curated tablescapes, keepsake bouquet.</p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between rounded-2xl border border-primary/10 bg-gradient-to-r from-primary/10 via-white to-secondary/10 p-5 text-sm">
              <p className="text-foreground/70">All-inclusive estimate</p>
              <p className="font-heading text-2xl font-semibold text-primary">$27,450</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border/60 bg-white/60 py-12" aria-label="Trusted experiences">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-foreground/60">
            Celebrations powered by Eventia across Romania
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm font-semibold tracking-widest text-foreground/40 sm:grid-cols-3 md:grid-cols-6">
            {["Cluj Ballroom", "Napa Garden", "Aurora Films", "Pulse DJs", "Velvet Atlas", "Maison Lumière"].map((brand) => (
              <div
                key={brand}
                className="flex h-12 items-center justify-center rounded-xl border border-border/70 bg-white/70 shadow-sm"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="vendors"
        className="mx-auto w-full max-w-6xl space-y-12 px-6 py-20"
        aria-labelledby="vendor-heading"
      >
        <div className="space-y-4">
          <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-primary/90">
            Vendors
          </span>
          <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-end">
            <h2 id="vendor-heading" className="font-heading text-3xl leading-tight text-foreground sm:text-4xl">
              Persuasive recommendations curated for restaurants, photographers, DJs, florals, and more.
            </h2>
            <p className="text-base text-foreground/70">
              Browse ready-to-book collaborators with transparent pricing, verified reviews, and availability synced to your event date.
            </p>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {vendorCategories.map((category) => (
            <div
              key={category.title}
              className="group relative flex flex-col gap-4 overflow-hidden rounded-3xl border border-border/60 bg-white/80 p-8 shadow-[0_20px_60px_-40px_rgba(56,91,253,0.5)] transition hover:-translate-y-1 hover:shadow-[0_24px_70px_-40px_rgba(56,91,253,0.65)]"
            >
              <div className="flex items-center gap-3">
                <category.icon className="h-5 w-5 text-primary" />
                <h3 className="font-heading text-xl font-semibold text-foreground">{category.title}</h3>
              </div>
              <p className="text-sm text-foreground/70">{category.description}</p>
              <div className="space-y-3 text-sm text-foreground/75">
                {category.matches.map((match) => (
                  <div key={match.name} className="rounded-2xl border border-border/60 bg-white/70 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-semibold text-foreground">{match.name}</p>
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        {match.price}
                      </span>
                    </div>
                    <p className="text-xs uppercase tracking-[0.35em] text-foreground/40">
                      {match.tags.join(" • ")}
                    </p>
                  </div>
                ))}
              </div>
              <div className="pt-2 text-xs text-foreground/50">
                Availability refreshed 3 minutes ago · Add to package with one click
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="workflow" className="mx-auto w-full max-w-6xl space-y-12 px-6 pb-20">
        <div className="grid gap-10 rounded-3xl border border-border/60 bg-white/80 p-8 shadow-[0_35px_90px_-60px_rgba(255,138,84,0.6)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-secondary/80">
                Workflow
              </span>
              <h2 className="font-heading text-3xl leading-tight text-foreground">
                One intelligent platform from inspiration to event day.
              </h2>
            </div>
            <p className="max-w-xl text-sm text-foreground/70">
              Dynamic checklists, vendor messaging, payment reminders, and persuasion tips guide your planning rhythm.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {workflowSteps.map((step) => (
              <div key={step.title} className="rounded-2xl border border-border/60 bg-white/70 p-6">
                <h3 className="font-heading text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="mt-3 text-sm text-foreground/70">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border/60 bg-gradient-to-br from-primary/6 via-white to-secondary/10 py-20">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl space-y-4">
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/80">
              Smart packages
            </span>
            <h2 className="font-heading text-3xl leading-tight text-foreground sm:text-4xl">
              Generate persuasive proposals that make decision-making effortless.
            </h2>
            <p className="text-base text-foreground/70">
              Mix professionals from any category, see live-adjusted totals, and share branded offers with co-hosts or stakeholders instantly.
            </p>
          </div>
          <div className="grid w-full max-w-lg gap-4 rounded-3xl border border-border/60 bg-white/80 p-8 shadow-[0_30px_80px_-60px_rgba(56,91,253,0.65)]">
            {smartPackages.map((pkg) => (
              <div key={pkg.name} className="rounded-2xl border border-border/60 bg-white/70 p-5 text-sm">
                <div className="flex items-center justify-between">
                  <p className="font-heading text-lg font-semibold text-foreground">{pkg.name}</p>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{pkg.total}</span>
                </div>
                <p className="mt-2 text-foreground/65">{pkg.perks}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="growth"
        className="mx-auto w-full max-w-6xl space-y-12 px-6 py-20"
        aria-labelledby="growth-heading"
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-secondary/80">
              Growth
            </span>
            <h2 id="growth-heading" className="font-heading text-3xl leading-tight text-foreground sm:text-4xl">
              A marketplace designed for restaurants, photographers, planners, and entertainers to thrive.
            </h2>
            <p className="max-w-2xl text-base text-foreground/70">
              Future-ready features include automated availability syncing, upsell prompts, and revenue-share marketing campaigns that keep your calendar full with the right events.
            </p>
          </div>
          <a
            href="mailto:partners@eventia.app"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-white/70 px-6 py-3 text-sm font-semibold text-foreground/80 transition hover:border-secondary hover:text-secondary"
          >
            Join the partner waitlist
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {vendorGrowthHighlights.map((item) => (
            <div key={item.title} className="flex gap-4 rounded-3xl border border-border/60 bg-white/80 p-6">
              <item.icon className="h-10 w-10 flex-none rounded-full bg-gradient-to-br from-primary/15 to-secondary/20 p-2 text-primary" />
              <div>
                <h3 className="font-heading text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-foreground/70">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-3xl border border-primary/15 bg-gradient-to-r from-primary/10 via-white to-secondary/10 p-8 text-sm text-foreground/80 md:flex md:items-center md:justify-between">
          <div className="max-w-2xl space-y-2">
            <p className="font-heading text-xl font-semibold text-primary">“Eventia filled our off-season with premium bookings.”</p>
            <p>
              “Within four weeks we secured three weddings and a corporate launch through Eventia. The persuasive proposals and unified messaging made it effortless for clients to say yes.”
            </p>
            <p className="text-xs uppercase tracking-[0.35em] text-foreground/40">Elena Popescu · Owner, Velvet Atlas Decor</p>
          </div>
          <div className="mt-6 flex flex-col gap-2 rounded-2xl border border-white/40 bg-white/70 p-5 text-xs text-foreground/60 md:mt-0">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" /> 42% faster booking time
            </div>
            <div className="flex items-center gap-2">
              <Gauge className="h-4 w-4 text-secondary" /> Average inquiry response under 2h
            </div>
            <div className="flex items-center gap-2">
              <Rocket className="h-4 w-4 text-primary" /> Featured vendors grow revenue 2.6x
            </div>
          </div>
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
            Ready to celebrate with confidence?
          </span>
          <h2 className="font-heading text-3xl leading-tight sm:text-4xl">
            Start planning today and watch your dream event take shape.
          </h2>
          <p className="max-w-2xl text-base text-white/80">
            Whether you’re hosting an intimate baptism or a 500-guest corporate summit, Eventia curates vendors, budgets, and workflows that persuade every stakeholder to join the celebration.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              id="demo"
              href="mailto:hello@eventia.app"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary transition hover:bg-white/90"
            >
              hello@eventia.app
            </a>
            <a
              href="#plan"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/70 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Build your celebration package
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
