import { Menu, X } from "lucide-react";
import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

const navItems = [
  { label: "Plan", href: "#plan" },
  { label: "Vendors", href: "#vendors" },
  { label: "Workflow", href: "#workflow" },
  { label: "Growth", href: "#growth" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link
          to="/"
          className="flex items-center gap-3 text-lg font-semibold text-foreground"
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary via-secondary to-secondary text-white shadow-lg shadow-primary/30">
            E
          </span>
          <div className="flex flex-col leading-tight">
            <span className="text-xs font-semibold uppercase tracking-[0.65em] text-primary/80">
              Eventia
            </span>
            <span className="font-heading text-xl font-semibold text-foreground">
              Celebration Hub
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 text-sm font-medium text-foreground/80 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="rounded-full px-4 py-2 transition hover:bg-primary/10 hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            to={(() => {
              try {
                const u =
                  typeof window !== "undefined"
                    ? JSON.parse(localStorage.getItem("eventia.user") || "null")
                    : null;
                return u?.accountType === "vendor"
                  ? "/vendor/dashboard"
                  : "/account";
              } catch {
                return "/account";
              }
            })()}
            className="rounded-full px-4 py-2 text-sm font-medium text-foreground/70 transition hover:text-foreground"
          >
            Dashboard
          </Link>
          {isAuthenticated ? (
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full border border-border px-5 py-2 text-sm font-semibold text-foreground/80 transition hover:border-destructive hover:text-destructive"
              onClick={() => logout()}
            >
              Log out
            </button>
          ) : (
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition hover:shadow-primary/40"
              onClick={() => navigate("/login")}
            >
              Start planning
            </button>
          )}
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-border bg-white/40 p-2 text-foreground transition hover:bg-white/70 lg:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-border/60 bg-background/95 shadow-lg lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4 text-base font-medium">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="rounded-2xl px-4 py-3 transition hover:bg-primary/10"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Link
              to="/packages"
              className="rounded-2xl px-4 py-3 transition hover:bg-primary/10"
              onClick={() => setOpen(false)}
            >
              Vendor Portal
            </Link>
            {isAuthenticated ? (
              <button
                type="button"
                className="mt-2 inline-flex items-center justify-center rounded-2xl border border-border px-4 py-3 font-semibold text-foreground transition hover:border-destructive hover:text-destructive"
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
              >
                Log out
              </button>
            ) : (
              <button
                type="button"
                className="mt-2 inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-primary to-secondary px-4 py-3 font-semibold text-white shadow-lg shadow-primary/30 transition hover:shadow-primary/40"
                onClick={() => {
                  setOpen(false);
                  navigate("/login");
                }}
              >
                Start planning
              </button>
            )}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
