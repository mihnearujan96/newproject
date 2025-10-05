import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function VendorDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();

  // demoVendors export is not default from Packages; import differently.
  // We'll fallback to reading from local demo list in this file to avoid circular import.

  const vendors = [
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

  const all = vendors.flatMap((c) =>
    c.options.map((o) => ({ ...o, category: c.category })),
  );
  const slugToName = (s: string | undefined) => (s || "").replaceAll("-", " ");
  const name = slugToName(slug);
  const vendor = all.find((v) => v.name.toLowerCase() === name.toLowerCase());

  if (!vendor) {
    return (
      <section className="mx-auto w-full max-w-4xl px-6 py-20">
        <p>Vendor not found</p>
        <button onClick={() => navigate(-1)} className="underline mt-4">
          Back
        </button>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-4xl px-6 py-20">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm text-foreground/70"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <h1 className="font-heading text-2xl font-semibold">{vendor.name}</h1>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <div className="col-span-2 space-y-4">
          <p className="text-sm text-foreground/70">
            {vendor.price} • {vendor.distance}
          </p>
          <ul className="mt-4 space-y-2 text-sm text-foreground/70">
            {vendor.perks.map((p) => (
              <li key={p} className="flex items-center gap-2">
                • {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-1">
          <button className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-4 py-3 text-sm font-semibold text-white">
            Request availability
          </button>
        </div>
      </div>
    </section>
  );
}
