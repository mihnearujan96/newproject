import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Globe, Key, Mail, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { register, setPlanDetails } = useAuth();
  const [accountType, setAccountType] = useState<'client' | 'vendor'>('client');
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    yob: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      setError("Please complete the required fields.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      await register({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        city: form.city,
        yearOfBirth: Number.isNaN(Number(form.yob))
          ? undefined
          : Number(form.yob),
        password: form.password,
      } as any);

      // If user had plan details saved before, keep them
      try {
        const savedPlan = JSON.parse(localStorage.getItem("eventia.plan") || "null");
        if (savedPlan) setPlanDetails(savedPlan);
      } catch {}

      if (accountType === 'vendor') {
        // Redirect vendor to service creation flow
        navigate('/vendor/setup');
      } else {
        navigate('/packages');
      }
    } catch (err) {
      setError("Unable to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col items-center gap-8 px-6 py-24 text-center">
      <div className="space-y-4">
        <h1 className="font-heading text-3xl text-foreground">
          Create your Eventia account
        </h1>
        <p className="max-w-xl text-sm text-foreground/70">
          Create an account to save favourites, receive availability updates,
          and generate persuasive proposals for every celebration.
        </p>
      </div>

      <div className="mb-4 flex w-full items-center justify-center">
        <div className="inline-flex rounded-2xl bg-white/90 p-1 shadow-sm">
          <button
            type="button"
            onClick={() => setAccountType('client')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition ${accountType === 'client' ? 'bg-primary/10 text-primary' : 'text-foreground/70'}`}
          >
            I am a client
          </button>
          <button
            type="button"
            onClick={() => setAccountType('vendor')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition ${accountType === 'vendor' ? 'bg-primary/10 text-primary' : 'text-foreground/70'}`}
          >
            I am a vendor
          </button>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full space-y-4 rounded-3xl border border-border/70 bg-white/80 p-8 text-left shadow-lg"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="text-xs font-medium text-foreground/80">
              First name
            </span>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-primary" />
              <input
                value={form.firstName}
                onChange={(e) =>
                  setForm((p) => ({ ...p, firstName: e.target.value }))
                }
                className="w-full rounded-2xl border border-border bg-white/95 px-10 py-3 text-sm"
              />
            </div>
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-xs font-medium text-foreground/80">
              Last name
            </span>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-primary" />
              <input
                value={form.lastName}
                onChange={(e) =>
                  setForm((p) => ({ ...p, lastName: e.target.value }))
                }
                className="w-full rounded-2xl border border-border bg-white/95 px-10 py-3 text-sm"
              />
            </div>
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="text-xs font-medium text-foreground/80">
              Email address
            </span>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-primary" />
              <input
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm((p) => ({ ...p, email: e.target.value }))
                }
                className="w-full rounded-2xl border border-border bg-white/95 px-10 py-3 text-sm"
              />
            </div>
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-xs font-medium text-foreground/80">City</span>
            <div className="relative">
              <Globe className="absolute left-3 top-3 h-4 w-4 text-secondary" />
              <input
                value={form.city}
                onChange={(e) =>
                  setForm((p) => ({ ...p, city: e.target.value }))
                }
                className="w-full rounded-2xl border border-border bg-white/95 px-10 py-3 text-sm"
              />
            </div>
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="text-xs font-medium text-foreground/80">
              Year of birth
            </span>
            <input
              value={form.yob}
              onChange={(e) => setForm((p) => ({ ...p, yob: e.target.value }))}
              className="w-full rounded-2xl border border-border bg-white/95 px-4 py-3 text-sm"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-xs font-medium text-foreground/80">
              Password
            </span>
            <div className="relative">
              <Key className="absolute left-3 top-3 h-4 w-4 text-primary" />
              <input
                type="password"
                value={form.password}
                onChange={(e) =>
                  setForm((p) => ({ ...p, password: e.target.value }))
                }
                className="w-full rounded-2xl border border-border bg-white/95 px-10 py-3 text-sm"
              />
            </div>
          </label>
        </div>

        <label className="flex flex-col gap-2 text-sm">
          <span className="text-xs font-medium text-foreground/80">
            Confirm password
          </span>
          <input
            type="password"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm((p) => ({ ...p, confirmPassword: e.target.value }))
            }
            className="w-full rounded-2xl border border-border bg-white/95 px-4 py-3 text-sm"
          />
        </label>

        {error ? <p className="text-sm text-destructive">{error}</p> : null}

        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-3 text-sm font-semibold text-white shadow-md"
          >
            {loading ? "Creating…" : "Create account"}
            <ArrowRight className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-sm text-foreground/70 underline"
          >
            Back
          </button>
        </div>
      </form>
    </section>
  );
}
