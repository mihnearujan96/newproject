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
  // vendor/account UI state
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState<any>({});
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    current: "",
    next: "",
    confirm: "",
  });
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const [proposals, setProposals] = useState<any[]>([]);

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

      // load proposals for client
      try {
        const allProposals = JSON.parse(
          localStorage.getItem("eventia.proposals") || "[]",
        );
        const my = u
          ? allProposals.filter((p: any) => p.clientEmail === u.email)
          : [];
        setProposals(my);
      } catch {
        setProposals([]);
      }
    };

    read();

    const onStorage = (e: StorageEvent) => {
      if (
        e.key === "eventia.user" ||
        e.key === "eventia.vendor.services" ||
        e.key === "eventia.vendor.requests" ||
        e.key === "eventia.proposals"
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
      const myServices = all.filter(
        (s: any) => s.owner === (effectiveUser?.email || user?.email),
      );
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
    setServices(
      remaining.filter(
        (s: any) => s.owner === (effectiveUser?.email || user?.email),
      ),
    );
  };

  const updateRequestStatus = (id: string, status: string) => {
    const all = JSON.parse(
      localStorage.getItem("eventia.vendor.requests") || "[]",
    );
    const idx = all.findIndex((r: any) => r.id === id);
    if (idx !== -1) {
      all[idx].status = status;
      localStorage.setItem("eventia.vendor.requests", JSON.stringify(all));
      setRequests(
        all.filter(
          (r: any) => r.owner === (effectiveUser?.email || user?.email),
        ),
      );
    }
  };

  // Inline simple calendar component
  function VendorCalendar({ requests }: { requests: any[] }) {
    const [month, setMonth] = useState(() => {
      const d = new Date();
      d.setDate(1);
      return d;
    });

    const nextMonth = () => {
      const d = new Date(month);
      d.setMonth(d.getMonth() + 1);
      setMonth(d);
    };
    const prevMonth = () => {
      const d = new Date(month);
      d.setMonth(d.getMonth() - 1);
      setMonth(d);
    };

    const bookedSet = new Set<string>();
    (requests || []).forEach((r: any) => {
      const d = r?.date || r?.dateISO || r?.bookingDate;
      if (d) {
        try {
          const dt = new Date(d);
          if (!isNaN(dt.getTime())) {
            bookedSet.add(dt.toISOString().slice(0, 10));
          }
        } catch {}
      }
    });

    // build weeks
    const year = month.getFullYear();
    const m = month.getMonth();
    const firstDay = new Date(year, m, 1).getDay();
    const daysInMonth = new Date(year, m + 1, 0).getDate();
    const weeks: Array<Array<number | null>> = [];
    let week: Array<number | null> = Array.from({ length: 7 }, () => null);
    let day = 1;
    for (let i = 0; i < firstDay; i++) week[i] = null;
    for (let i = firstDay; i < 7; i++) {
      week[i] = day++;
    }
    weeks.push(week);
    while (day <= daysInMonth) {
      const w: Array<number | null> = [];
      for (let i = 0; i < 7; i++) {
        w.push(day <= daysInMonth ? day++ : null);
      }
      weeks.push(w);
    }

    return (
      <div className="mt-4">
        <div className="flex items-center justify-between">
          <div className="font-medium">
            {month.toLocaleString(undefined, {
              month: "long",
              year: "numeric",
            })}
          </div>
          <div className="flex gap-2">
            <button
              onClick={prevMonth}
              className="rounded-full border px-2 py-1"
            >
              Prev
            </button>
            <button
              onClick={nextMonth}
              className="rounded-full border px-2 py-1"
            >
              Next
            </button>
          </div>
        </div>
        <table className="w-full mt-3 table-fixed">
          <thead>
            <tr className="text-sm text-foreground/70">
              <th>Sun</th>
              <th>Mon</th>
              <th>Tue</th>
              <th>Wed</th>
              <th>Thu</th>
              <th>Fri</th>
              <th>Sat</th>
            </tr>
          </thead>
          <tbody>
            {weeks.map((w, wi) => (
              <tr key={wi} className="text-sm">
                {w.map((d, di) => {
                  if (d === null) return <td key={di} className="p-2"></td>;
                  const iso = new Date(year, m, d).toISOString().slice(0, 10);
                  const isBooked = bookedSet.has(iso);
                  return (
                    <td key={di} className="p-2">
                      <div
                        className={`w-full rounded-md px-2 py-1 text-xs ${isBooked ? "bg-destructive/20 text-destructive" : "bg-success/10 text-success"}`}
                      >
                        {d}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // profile/account actions handlers
  const startEditingProfile = () => {
    setProfileForm(effectiveUser ?? {});
    setEditingProfile(true);
  };

  const saveProfile = () => {
    try {
      const cur =
        JSON.parse(localStorage.getItem("eventia.user") || "null") || {};
      const updated = { ...cur, ...profileForm };
      localStorage.setItem("eventia.user", JSON.stringify(updated));
      setUser(updated);
      setEditingProfile(false);
    } catch (err) {
      console.error(err);
    }
  };

  const savePassword = () => {
    try {
      const cur =
        JSON.parse(localStorage.getItem("eventia.user") || "null") || {};
      if (passwordForm.next !== passwordForm.confirm)
        return alert("Passwords do not match");
      const updated = { ...cur, password: passwordForm.next };
      localStorage.setItem("eventia.user", JSON.stringify(updated));
      setChangingPassword(false);
      alert("Password updated");
    } catch (err) {
      console.error(err);
    }
  };

  const deleteAccount = () => {
    try {
      const email = effectiveUser?.email || user?.email;
      // remove user
      localStorage.removeItem("eventia.user");
      localStorage.setItem("eventia.auth", "false");
      // remove their services and requests
      const sv = JSON.parse(
        localStorage.getItem("eventia.vendor.services") || "[]",
      ).filter((s: any) => s.owner !== email);
      localStorage.setItem("eventia.vendor.services", JSON.stringify(sv));
      const rq = JSON.parse(
        localStorage.getItem("eventia.vendor.requests") || "[]",
      ).filter((r: any) => r.owner !== email);
      localStorage.setItem("eventia.vendor.requests", JSON.stringify(rq));
      navigate("/");
    } catch (err) {
      console.error(err);
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
          {editingProfile ? (
            <div className="mt-2 space-y-2 text-sm">
              <label className="flex flex-col gap-1">
                <span className="text-xs text-foreground/70">First name</span>
                <input
                  className="rounded border px-3 py-2"
                  value={profileForm.firstName || ""}
                  onChange={(e) =>
                    setProfileForm((p: any) => ({
                      ...p,
                      firstName: e.target.value,
                    }))
                  }
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-xs text-foreground/70">Last name</span>
                <input
                  className="rounded border px-3 py-2"
                  value={profileForm.lastName || ""}
                  onChange={(e) =>
                    setProfileForm((p: any) => ({
                      ...p,
                      lastName: e.target.value,
                    }))
                  }
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-xs text-foreground/70">City</span>
                <input
                  className="rounded border px-3 py-2"
                  value={profileForm.city || ""}
                  onChange={(e) =>
                    setProfileForm((p: any) => ({ ...p, city: e.target.value }))
                  }
                />
              </label>
              <div className="flex gap-2">
                <button
                  onClick={saveProfile}
                  className="rounded-full bg-primary/90 px-3 py-2 text-white"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingProfile(false)}
                  className="rounded-full border px-3 py-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <p className="mt-2 text-sm">
                <strong>
                  {effectiveUser.firstName} {effectiveUser.lastName}
                </strong>
              </p>
              <p className="text-sm text-foreground/70">
                {effectiveUser.email}
              </p>
              <p className="text-sm text-foreground/70">{effectiveUser.city}</p>
              <p className="text-sm text-foreground/70">
                {effectiveUser.yearOfBirth}
              </p>
              <p className="mt-3 text-xs text-foreground/60">
                Account type: {effectiveUser.accountType}
              </p>
            </>
          )}
        </div>

        <div className="col-span-2 space-y-6">
          <div className="rounded-2xl border border-border/60 bg-white/80 p-6">
            <h3 className="font-semibold">Calendar</h3>
            <p className="text-sm text-foreground/70">
              Overview of bookings and availability. Booked dates are red;
              available dates are green.
            </p>
            <div className="mt-4">
              <VendorCalendar requests={requests} />
            </div>
          </div>

          <div className="rounded-2xl border border-border/60 bg-white/80 p-6">
            <h3 className="font-semibold">Account actions</h3>
            <div className="mt-4 flex flex-col gap-3">
              <button
                onClick={startEditingProfile}
                className="inline-flex items-center gap-2 rounded-full border px-4 py-2"
              >
                Edit profile
              </button>
              <button
                onClick={() => setChangingPassword(true)}
                className="inline-flex items-center gap-2 rounded-full border px-4 py-2"
              >
                Change password
              </button>
              <button
                onClick={() => setConfirmingDelete(true)}
                className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-destructive"
              >
                Delete account
              </button>

              {changingPassword ? (
                <div className="mt-3 space-y-2">
                  <label className="flex flex-col gap-1 text-sm">
                    <span className="text-xs text-foreground/70">
                      New password
                    </span>
                    <input
                      type="password"
                      className="rounded border px-3 py-2"
                      value={passwordForm.next}
                      onChange={(e) =>
                        setPasswordForm((p) => ({ ...p, next: e.target.value }))
                      }
                    />
                  </label>
                  <label className="flex flex-col gap-1 text-sm">
                    <span className="text-xs text-foreground/70">
                      Confirm password
                    </span>
                    <input
                      type="password"
                      className="rounded border px-3 py-2"
                      value={passwordForm.confirm}
                      onChange={(e) =>
                        setPasswordForm((p) => ({
                          ...p,
                          confirm: e.target.value,
                        }))
                      }
                    />
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={savePassword}
                      className="rounded-full bg-primary/90 px-3 py-2 text-white"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setChangingPassword(false)}
                      className="rounded-full border px-3 py-2"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : null}

              {confirmingDelete ? (
                <div className="mt-3">
                  <p className="text-sm text-foreground/70 mb-2">
                    Are you sure? This action cannot be undone.
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={deleteAccount}
                      className="rounded-full bg-destructive/90 px-3 py-2 text-white"
                    >
                      Yes, delete
                    </button>
                    <button
                      onClick={() => setConfirmingDelete(false)}
                      className="rounded-full border px-3 py-2"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
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
              <h3 className="font-semibold">Your packages</h3>
              <div className="mt-4 space-y-3">
                {proposals.length === 0 ? (
                  <p className="text-sm text-foreground/70">You don't have any submitted proposals yet.</p>
                ) : (
                  proposals.map((p) => (
                    <div key={p.id} className="rounded-md border border-border/40 p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Proposal {p.id}</div>
                          <div className="text-xs text-foreground/70">Sent: {new Date(p.createdAt).toLocaleString()}</div>
                        </div>
                        <div className="text-sm font-semibold">${p.total.toLocaleString()}</div>
                      </div>
                      <div className="mt-2 text-sm text-foreground/70">Status: {p.status}</div>
                      <div className="mt-3 flex gap-2">
                        <button onClick={()=> navigate(`/proposal/${p.id}`)} className="rounded-full border px-3 py-1 text-sm">View</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
