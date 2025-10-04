import { FormEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, Lock, Mail, ShieldCheck } from "lucide-react";

import { useAuth } from "@/context/AuthContext";

type LocationState = {
  redirectTo?: string;
};

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, planDetails } = useAuth();
  const [{ email, password }, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const redirectTo =
    (location.state as LocationState | null)?.redirectTo ?? "/packages";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    if (!email || !password) {
      setError("Enter your email and password to continue.");
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
      navigate(redirectTo);
    } catch (err) {
      console.error(err);
      setError("Unable to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col items-center gap-10 px-6 py-24 text-center">
      <div className="space-y-4">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
          <ShieldCheck className="h-3.5 w-3.5" /> Secure access
        </span>
        <h1 className="font-heading text-4xl text-foreground sm:text-5xl">
          Sign in to unlock bespoke celebration packages.
        </h1>
        <p className="max-w-2xl text-base text-foreground/70">
          Save your event preferences, discover available venues, photographers,
          DJs, and florists in your chosen area, and generate persuasive
          proposals in minutes.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl space-y-6 rounded-3xl border border-border/70 bg-white/80 p-8 text-left shadow-[0_35px_90px_-60px_rgba(56,91,253,0.35)]"
      >
        <div className="space-y-2 text-sm">
          <label className="flex flex-col gap-2 font-medium text-foreground/80">
            Email
            <div className="relative flex items-center">
              <Mail className="absolute left-3 h-4 w-4 text-primary" />
              <input
                type="email"
                value={email}
                onChange={(event) =>
                  setCredentials((prev) => ({
                    ...prev,
                    email: event.target.value,
                  }))
                }
                placeholder="you@example.com"
                className="w-full rounded-2xl border border-border bg-white/95 px-10 py-3 text-sm shadow-sm focus:border-primary focus:outline-none"
              />
            </div>
          </label>
          <label className="flex flex-col gap-2 font-medium text-foreground/80">
            Password
            <div className="relative flex items-center">
              <Lock className="absolute left-3 h-4 w-4 text-secondary" />
              <input
                type="password"
                value={password}
                onChange={(event) =>
                  setCredentials((prev) => ({
                    ...prev,
                    password: event.target.value,
                  }))
                }
                placeholder="Enter a secure password"
                className="w-full rounded-2xl border border-border bg-white/95 px-10 py-3 text-sm shadow-sm focus:border-primary focus:outline-none"
              />
            </div>
          </label>
        </div>

        {planDetails ? (
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 text-sm text-foreground/70">
            <p className="font-semibold text-primary">Next up</p>
            <ul className="mt-2 space-y-1">
              <li>Event: {planDetails.eventType}</li>
              <li>
                Date: {planDetails.date ? planDetails.date : "To be decided"}
              </li>
              <li>Location: {planDetails.location}</li>
              {planDetails.budget ? (
                <li>Budget: {planDetails.budget}</li>
              ) : null}
            </ul>
          </div>
        ) : null}

        {error ? (
          <p className="text-sm font-medium text-destructive">{error}</p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-primary/30 transition hover:shadow-primary/40 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Signing in..." : "Continue"}
          <ArrowRight className="h-4 w-4" />
        </button>
        <p className="text-xs text-foreground/60">
          New to Eventia? Sign in to create your profile and save your favorite
          venues and vendors for every celebration.
        </p>
      </form>
    </section>
  );
}
