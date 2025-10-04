import { useMemo } from "react";
import { Navigate } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  Camera,
  Check,
  Compass,
  Layers,
  MapPin,
  Music,
  Store,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";

const steps = [
  {
    number: 1,
    title: "Review your celebration details",
    description:
      "Confirm the event type, preferred date, and location radius. Adjust the brief to fine-tune recommendations.",
  },
  {
    number: 2,
    title: "Explore available venues and experiences",
    description:
      "Filter restaurants, ballrooms, rooftops, and unique spaces by capacity, vibe, and on-site services.",
  },
  {
    number: 3,
    title: "Handpick storytellers and entertainment",
    description:
      "Compare photographers, filmmakers, DJs, and live acts with transparent pricing and availability.",
  },
  {
    number: 4,
    title: "Assemble your persuasive package",
    description:
      "Add vendors to your offer, preview the total investment, and share a persuasive proposal instantly.",
  },
];

const vendorIconMap: Record<string, React.ElementType> = {
  Venues: Store,
  Photographers: Camera,
  Entertainment: Music,
  "Decor & Florals": Layers,
};

const demoVendors = [
  {
    category: "Venues",
    options: [
      {
        name: "Casa Victoria",
        distance: "2.3 km",
        perks: ["Panoramic terrace", "Five-course tasting"],
        price: "from $118 / guest",
      },
      {
        name: "Atelier 18",
        distance: "5.1 km",
        perks: ["Industrial chic", "On-site mixology"],
        price: "from $92 / guest",
      },
    ],
  },
  {
    category: "Photographers",
    options: [
      {
        name: "Northlight Films",
        distance: "Available",
        perks: ["Cinematic highlight", "Drone coverage"],
        price: "from $2,350",
      },
      {
        name: "Velvet Lens Studio",
        distance: "Waitlist open",
        perks: ["Portrait corner", "48h sneak peek"],
        price: "from $1,980",
      },
    ],
  },
  {
    category: "Entertainment",
    options: [
      {
        name: "Pulse Collective",
        distance: "Available",
        perks: ["Hybrid band", "MC included"],
        price: "from $2,200",
      },
      {
        name: "DJ Aurora",
        distance: "Available",
        perks: ["Interactive sets", "After-hours upgrade"],
        price: "from $1,450",
      },
    ],
  },
  {
    category: "Decor & Florals",
    options: [
      {
        name: "Bloom & Ember",
        distance: "Available",
        perks: ["Suspended installation", "Tablescape styling"],
        price: "from $1,150",
      },
      {
        name: "Velvet Atlas",
        distance: "Available",
        perks: ["Lighting design", "Photo vignette"],
        price: "from $1,380",
      },
    ],
  },
];

export default function Packages() {
  const { isAuthenticated, planDetails } = useAuth();

  const formattedSteps = useMemo(
    () =>
      steps.map((step) => ({
        ...step,
        label: `${step.number}. ${step.title}`,
      })),
    [],
  );

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ redirectTo: "/packages" }} replace />;
  }

  return (
    <div className="relative isolate overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 flex h-[420px] justify-center">
        <div className="h-full w-[720px] rounded-full bg-gradient-to-br from-primary/25 via-secondary/15 to-transparent blur-3xl" />
      </div>

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pb-20 pt-24">
        <header className="space-y-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
            Celebration package builder
          </div>
          <h1 className="font-heading text-4xl leading-tight text-foreground sm:text-5xl">
            Your persuasive package preview is ready.
          </h1>
          <p className="mx-auto max-w-2xl text-base text-foreground/70">
            Follow the guided steps to review event details, explore curated vendors in your area, and craft a proposal every stakeholder will love.
          </p>
        </header>

        {planDetails ? (
          <div className="grid gap-4 rounded-3xl border border-primary/15 bg-white/80 p-6 text-sm text-foreground/70 shadow-[0_30px_80px_-60px_rgba(56,91,253,0.45)] md:grid-cols-4">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.35em] text-foreground/50">Event</p>
              <p className="font-heading text-lg font-semibold text-foreground">{planDetails.eventType}</p>
            </div>
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.35em] text-foreground/50">Date</p>
              <p className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-primary" />
                {planDetails.date || "Flexible"}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.35em] text-foreground/50">Location</p>
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-secondary" />
                {planDetails.location}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.35em] text-foreground/50">Budget</p>
              <p>{planDetails.budget ?? "Let’s explore options"}</p>
            </div>
          </div>
        ) : null}

        <div className="grid gap-6 rounded-3xl border border-border/60 bg-white/85 p-8 shadow-[0_35px_90px_-60px_rgba(255,138,84,0.45)]">
          <h2 className="font-heading text-2xl font-semibold text-foreground">How it works</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {formattedSteps.map((step) => (
              <div key={step.number} className="rounded-2xl border border-border/60 bg-white/80 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-foreground/50">
                  Step {step.number}
                </p>
                <p className="mt-2 font-heading text-lg text-foreground">{step.title}</p>
                <p className="mt-2 text-sm text-foreground/70">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-10">
          {demoVendors.map((category) => {
            const Icon = vendorIconMap[category.category] ?? Compass;
            return (
              <section key={category.category} className="space-y-4 rounded-3xl border border-border/60 bg-white/80 p-8 shadow-[0_20px_60px_-45px_rgba(56,91,253,0.35)]">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-3">
                    <Icon className="h-6 w-6 text-primary" />
                    <h3 className="font-heading text-xl font-semibold text-foreground">{category.category}</h3>
                  </div>
                  <p className="text-sm text-foreground/65">Availability auto-refreshed 3 minutes ago</p>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {category.options.map((vendor) => (
                    <div key={vendor.name} className="rounded-2xl border border-border/60 bg-white/70 p-6">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <p className="font-heading text-lg font-semibold text-foreground">{vendor.name}</p>
                          <p className="text-xs uppercase tracking-[0.35em] text-foreground/40">
                            {vendor.distance}
                          </p>
                        </div>
                        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                          {vendor.price}
                        </span>
                      </div>
                      <ul className="mt-4 space-y-2 text-sm text-foreground/70">
                        {vendor.perks.map((perk) => (
                          <li key={perk} className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-primary" />
                            {perk}
                          </li>
                        ))}
                      </ul>
                      <button className="mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-white/80 px-4 py-2 text-xs font-semibold text-foreground/80 transition hover:border-primary hover:text-primary">
                        Add to package
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <section className="rounded-3xl border border-primary/15 bg-gradient-to-r from-primary/10 via-white to-secondary/10 p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl space-y-2 text-sm text-foreground/70">
              <p className="font-heading text-2xl font-semibold text-primary">Finalize your persuasive offer</p>
              <p>
                Select your favourite venues and creators, send introductions, and generate a branded PDF that outlines investment, timeline, and highlights for every stakeholder.
              </p>
            </div>
            <button className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition hover:shadow-primary/40">
              Generate proposal
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>
      </section>
    </div>
  );
}
