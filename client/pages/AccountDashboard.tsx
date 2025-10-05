import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Edit2, Trash, Check, X } from "lucide-react";

export default function AccountDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<any>({});

  useEffect(() => {
    const read = () => {
      const u =
        typeof window !== "undefined"
          ? JSON.parse(localStorage.getItem("eventia.user") || "null")
          : null;
      setUser(u);
      const allServices = JSON.parse(
        localStorage.getItem("eventia.vendor.services") || "[]",
      );
      const myServices = u
        ? allServices.filter((s: any) => s.owner === u.email)
        : [];
      setServices(myServices);
      const allRequests = JSON.parse(
        localStorage.getItem("eventia.vendor.requests") || "[]",
      );
      const myRequests = u
        ? allRequests.filter((r: any) => r.owner === u.email)
        : [];
      setRequests(myRequests);
    };

    read();

    const onStorage = (e: StorageEvent) => {
      if (
        e.key === "eventia.user" ||
        e.key === "eventia.vendor.services" ||
        e.key === "eventia.vendor.requests"
      ) {
        read();
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const storedUser =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("eventia.user") || "null")
      : null;

  if (!user && !storedUser) {
    return <Navigate to="/login" replace />;
  }

  const effectiveUser = user || storedUser;
  const isVendor = effectiveUser?.accountType === "vendor";

  const startEdit = (svc: any) => {
    setEditingId(svc.id);
    setForm({ ...svc });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({});
  };

  const saveEdit = () => {
    const all = JSON.parse(
      localStorage.getItem("eventia.vendor.services") || "[]",
    );
    const idx = all.findIndex((s: any) => s.id === editingId);
    if (idx !== -1) {
      all[idx] = { ...all[idx], ...form };
      localStorage.setItem("eventia.vendor.services", JSON.stringify(all));
      const myServices = all.filter((s: any) => s.owner === (effectiveUser?.email || user?.email));
      setServices(myServices);
    }
    cancelEdit();
  };

  const deleteService = (id: string) => {
    const all = JSON.parse(
      localStorage.getItem("eventia.vendor.services") || "[]",
    );
    const remaining = all.filter((s: any) => s.id !== id);
    localStorage.setItem("eventia.vendor.services", JSON.stringify(remaining));
    setServices(remaining.filter((s: any) => s.owner === (effectiveUser?.email || user?.email)));
  };

  const updateRequestStatus = (id: string, status: string) => {
    const all = JSON.parse(
      localStorage.getItem("eventia.vendor.requests") || "[]",
    );
    const idx = all.findIndex((r: any) => r.id === id);
    if (idx !== -1) {
      all[idx].status = status;
      localStorage.setItem("eventia.vendor.requests", JSON.stringify(all));
      setRequests(all.filter((r: any) => r.owner === (effectiveUser?.email || user?.email)));
    }
  };

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-20">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl">Account</h1>
          <p className="text-sm text-foreground/70">
            Manage your profile and listings
          </p>
        </div>
        <div>
          <button onClick={() => navigate(-1)} className="text-sm underline">
            Back
          </button>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="col-span-1 rounded-2xl border border-border/60 bg-white/80 p-6">
          <h3 className="font-semibold">Profile</h3>
          <p className="mt-2 text-sm">
            <strong>
              {effectiveUser.firstName} {effectiveUser.lastName}
            </strong>
          </p>
          <p className="text-sm text-foreground/70">{effectiveUser.email}</p>
          <p className="text-sm text-foreground/70">{effectiveUser.city}</p>
          <p className="text-sm text-foreground/70">{effectiveUser.yearOfBirth}</p>
          <p className="mt-3 text-xs text-foreground/60">
            Account type: {effectiveUser.accountType}
          </p>
        </div>

        <div className="col-span-2 space-y-6">
          {isVendor ? (
            <>
              <div className="rounded-2xl border border-border/60 bg-white/80 p-6">
                <h3 className="font-semibold">Your services</h3>
                <div className="mt-4 grid gap-4">
                  {services.length === 0 ? (
                    <p className="text-sm text-foreground/70">
                      No services yet.{" "}
                      <button
                        className="underline text-primary"
                        onClick={() => navigate("/vendor/setup")}
                      >
                        Create one
                      </button>
                    </p>
                  ) : (
                    services.map((s) => (
                      <div
                        key={s.id}
                        className="rounded-2xl border border-border/60 bg-white/70 p-4"
                      >
                        {editingId === s.id ? (
                          <div className="space-y-2">
                            <input
                              className="w-full rounded border px-3 py-2"
                              value={form.name}
                              onChange={(e) =>
                                setForm((p: any) => ({
                                  ...p,
                                  name: e.target.value,
                                }))
                              }
                            />
                            <input
                              className="w-full rounded border px-3 py-2"
                              value={form.price}
                              onChange={(e) =>
                                setForm((p: any) => ({
                                  ...p,
                                  price: e.target.value,
                                }))
                              }
                            />
                            <textarea
                              className="w-full rounded border px-3 py-2"
                              value={form.details}
                              onChange={(e) =>
                                setForm((p: any) => ({
                                  ...p,
                                  details: e.target.value,
                                }))
                              }
                            />
                            <div className="flex gap-2">
                              <button
                                className="inline-flex items-center gap-2 rounded-full bg-primary/90 px-3 py-2 text-white"
                                onClick={saveEdit}
                              >
                                <Check className="h-4 w-4" /> Save
                              </button>
                              <button
                                className="inline-flex items-center gap-2 rounded-full border px-3 py-2"
                                onClick={cancelEdit}
                              >
                                <X className="h-4 w-4" /> Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold">{s.name}</h4>
                              <p className="text-sm text-foreground/70">
                                {s.price}
                              </p>
                              <p className="text-sm text-foreground/70">
                                {s.details}
                              </p>
                            </div>
                            <div className="flex flex-col gap-2">
                              <button
                                onClick={() => startEdit(s)}
                                className="inline-flex items-center gap-2 rounded-full border px-3 py-2"
                              >
                                <Edit2 className="h-4 w-4" /> Edit
                              </button>
                              <button
                                onClick={() => deleteService(s.id)}
                                className="inline-flex items-center gap-2 rounded-full border px-3 py-2 text-destructive"
                              >
                                <Trash className="h-4 w-4" /> Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-border/60 bg-white/80 p-6">
                <h3 className="font-semibold">Client offers & requests</h3>
                <div className="mt-4 grid gap-3">
                  {requests.length === 0 ? (
                    <p className="text-sm text-foreground/70">
                      No incoming requests
                    </p>
                  ) : (
                    requests.map((r) => (
                      <div
                        key={r.id}
                        className="flex items-start justify-between gap-4 rounded-2xl border border-border/60 bg-white/70 p-4"
                      >
                        <div>
                          <p className="font-semibold">
                            {r.clientName} — {r.serviceName}
                          </p>
                          <p className="text-sm text-foreground/70">
                            {r.message}
                          </p>
                          <p className="text-xs text-foreground/60">
                            Status: {r.status}
                          </p>
                        </div>
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() =>
                              updateRequestStatus(r.id, "accepted")
                            }
                            className="inline-flex items-center gap-2 rounded-full bg-primary/90 px-3 py-2 text-white"
                          >
                            <Check className="h-4 w-4" /> Accept
                          </button>
                          <button
                            onClick={() =>
                              updateRequestStatus(r.id, "declined")
                            }
                            className="inline-flex items-center gap-2 rounded-full border px-3 py-2"
                          >
                            <X className="h-4 w-4" /> Decline
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="rounded-2xl border border-border/60 bg-white/80 p-6">
              <h3 className="font-semibold">Your profile</h3>
              <p className="mt-2 text-sm">
                Manage your saved vendors and packages. Coming soon: saved
                favorites and proposals list.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
