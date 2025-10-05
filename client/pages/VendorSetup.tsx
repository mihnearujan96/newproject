import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImagePlus, Link as LinkIcon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function VendorSetup() {
  const navigate = useNavigate();
  const {
    /* isAuthenticated, */
  } = useAuth();
  const [service, setService] = useState({
    name: "",
    category: "Photographer",
    price: "",
    profileUrl: "",
    details: "",
    sets: "",
  });
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const arr = Array.from(files).slice(0, 6);
    setImages(arr);
    const urls = arr.map((f) => URL.createObjectURL(f));
    setPreviewUrls(urls);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (!service.name || !service.category || !service.price) {
      setError("Please fill in required fields.");
      return;
    }
    setLoading(true);
    try {
      // persist to localStorage for demo purposes
      const existing = JSON.parse(
        localStorage.getItem("eventia.vendor.services") || "[]",
      );
      const currentUser =
        typeof window !== "undefined"
          ? JSON.parse(localStorage.getItem("eventia.user") || "null")
          : null;
      const owner = currentUser?.email ?? "unknown@eventia.local";
      // assign an id
      const id =
        Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
      existing.push({ id, owner, ...service, images: previewUrls });
      localStorage.setItem("eventia.vendor.services", JSON.stringify(existing));
      // redirect to packages or vendor dashboard
      navigate("/packages");
    } catch (err) {
      console.error(err);
      setError("Unable to save service. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto w-full max-w-4xl px-6 py-20">
      <div className="space-y-4 text-center">
        <h1 className="font-heading text-3xl text-foreground">
          Vendor service setup
        </h1>
        <p className="text-sm text-foreground/70">
          Create your first service listing so hosts in your area can find and
          book you.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-4 rounded-3xl border border-border/70 bg-white/80 p-8"
      >
        <label className="flex flex-col gap-2">
          <span className="text-xs font-medium text-foreground/80">
            Service name
          </span>
          <input
            value={service.name}
            onChange={(e) =>
              setService((p) => ({ ...p, name: e.target.value }))
            }
            className="w-full rounded-2xl border border-border bg-white/95 px-4 py-3 text-sm"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-xs font-medium text-foreground/80">
            Service type / category
          </span>
          <select
            value={service.category}
            onChange={(e) =>
              setService((p) => ({ ...p, category: e.target.value }))
            }
            className="w-full rounded-2xl border border-border bg-white/95 px-4 py-3 text-sm"
          >
            <option>Photographer</option>
            <option>DJ</option>
            <option>Florist</option>
            <option>Church</option>
            <option>Restaurant</option>
            <option>Venue</option>
            <option>Planner</option>
            <option>Other</option>
          </select>
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="text-xs font-medium text-foreground/80">
              Service price
            </span>
            <input
              value={service.price}
              onChange={(e) =>
                setService((p) => ({ ...p, price: e.target.value }))
              }
              className="w-full rounded-2xl border border-border bg-white/95 px-4 py-3 text-sm"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-xs font-medium text-foreground/80">
              Link to vendor profile (optional)
            </span>
            <div className="relative">
              <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-primary" />
              <input
                value={service.profileUrl}
                onChange={(e) =>
                  setService((p) => ({ ...p, profileUrl: e.target.value }))
                }
                className="w-full rounded-2xl border border-border bg-white/95 px-10 py-3 text-sm"
              />
            </div>
          </label>
        </div>

        <label className="flex flex-col gap-2">
          <span className="text-xs font-medium text-foreground/80">
            Details
          </span>
          <textarea
            value={service.details}
            onChange={(e) =>
              setService((p) => ({ ...p, details: e.target.value }))
            }
            className="w-full rounded-2xl border border-border bg-white/95 px-4 py-3 text-sm"
          />
        </label>

        {service.category === "Restaurant" || service.category === "Venue" ? (
          <label className="flex flex-col gap-2">
            <span className="text-xs font-medium text-foreground/80">
              Number of sets / seating options
            </span>
            <input
              value={service.sets}
              onChange={(e) =>
                setService((p) => ({ ...p, sets: e.target.value }))
              }
              className="w-full rounded-2xl border border-border bg-white/95 px-4 py-3 text-sm"
            />
          </label>
        ) : null}

        <label className="flex flex-col gap-2">
          <span className="text-xs font-medium text-foreground/80">
            Photo gallery (max 6)
          </span>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleFiles(e.target.files)}
            className="w-full text-sm"
          />
          <div className="mt-3 grid grid-cols-3 gap-3">
            {previewUrls.map((src) => (
              <img
                key={src}
                src={src}
                className="h-24 w-full rounded-md object-cover"
              />
            ))}
          </div>
        </label>

        {error ? <p className="text-sm text-destructive">{error}</p> : null}

        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-3 text-sm font-semibold text-white shadow-md"
          >
            {loading ? "Saving…" : "Save service & finish"}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-sm text-foreground/70 underline"
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}
