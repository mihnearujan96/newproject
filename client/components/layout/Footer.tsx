import { Link } from "react-router-dom";
import { Linkedin, Mail, MessageSquare } from "lucide-react";

const footerLinks = [
  {
    title: "Explore",
    items: [
      { label: "Plan an Event", href: "#plan" },
      { label: "Vendor Marketplace", href: "#vendors" },
      { label: "Workflow", href: "#workflow" },
    ],
  },
  {
    title: "Solutions",
    items: [
      { label: "Wedding Planning", href: "#vendors" },
      { label: "Corporate Experiences", href: "#vendors" },
      { label: "Milestone Celebrations", href: "#vendors" },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Pricing Guide", href: "#plan" },
      { label: "Success Stories", href: "#growth" },
      { label: "Vendor Onboarding", href: "#growth" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border/70 bg-gradient-to-br from-white via-background to-white">
      <div className="mx-auto grid w-full max-w-6xl gap-14 px-6 py-16 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div className="space-y-6">
          <Link
            to="/"
            className="flex items-center gap-3 text-lg font-semibold text-foreground"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary via-secondary to-secondary text-white shadow-lg shadow-primary/30">
              E
            </span>
            <div className="flex flex-col leading-tight">
              <span className="text-xs font-semibold uppercase tracking-[0.65em] text-primary/80">
                Eventia
              </span>
              <span className="font-heading text-lg font-semibold text-foreground">
                Celebration Hub
              </span>
            </div>
          </Link>
          <p className="max-w-sm text-sm text-foreground/70">
            Eventia Celebration Hub connects hosts with curated venues,
            storytellers, and experience makers. Plan weddings, corporate
            retreats, and milestone parties with persuasive insights guiding
            every decision.
          </p>
          <div className="flex items-center gap-3 text-sm font-medium text-foreground">
            <a
              href="mailto:hello@convince.studio"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white/80 px-4 py-2 shadow-sm transition hover:border-primary hover:text-primary"
            >
              <Mail className="h-4 w-4" />
              hello@convince.studio
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-border bg-white/80 p-2 shadow-sm transition hover:border-primary hover:text-primary"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-border bg-white/80 p-2 shadow-sm transition hover:border-primary hover:text-primary"
            >
              <MessageSquare className="h-5 w-5" />
            </a>
          </div>
        </div>

        {footerLinks.map((group) => (
          <div key={group.title} className="space-y-5">
            <h3 className="text-sm font-semibold uppercase tracking-[0.35em] text-foreground/60">
              {group.title}
            </h3>
            <ul className="space-y-3 text-sm text-foreground/70">
              {group.items.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="transition hover:text-primary">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border/60 bg-white/70">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-6 text-sm text-foreground/60 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} Convince Growth Studio. All rights
            reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a href="#privacy" className="transition hover:text-primary">
              Privacy Policy
            </a>
            <a href="#terms" className="transition hover:text-primary">
              Terms of Use
            </a>
            <a href="#vendors" className="transition hover:text-primary">
              Partner with Eventia
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
