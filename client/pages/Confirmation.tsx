import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export default function Confirmation() {
  const navigate = useNavigate();
  const { items, total, clear } = useCart();
  const { planDetails } = useAuth();

  const handleConfirm = () => {
    // persist a proposal summary in localStorage for demo
    const id = Date.now().toString(36);
    const currentUser = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('eventia.user') || 'null') : null;
    const proposal = {
      id,
      plan: planDetails,
      items,
      total,
      clientEmail: currentUser?.email,
      createdAt: new Date().toISOString(),
      status: 'pending',
    };
    try {
      const all = JSON.parse(localStorage.getItem('eventia.proposals') || '[]');
      all.push(proposal);
      localStorage.setItem('eventia.proposals', JSON.stringify(all));
    } catch (err) {
      localStorage.setItem('eventia.proposals', JSON.stringify([proposal]));
    }
    clear();
    navigate(`/proposal/${id}`);
  };

  return (
    <section className="mx-auto w-full max-w-4xl px-6 py-20">
      <h1 className="font-heading text-2xl font-semibold">Confirmation</h1>
      <p className="text-sm text-foreground/70 mt-2">Review your selected services and confirm the proposal.</p>

      <div className="mt-6 space-y-4">
        <div className="rounded-2xl border border-border/60 bg-white/80 p-4">
          <h3 className="font-semibold">Event details</h3>
          <p className="text-sm text-foreground/70">{planDetails?.eventType ?? '—'}</p>
          <p className="text-sm text-foreground/70">Date: {planDetails?.date ?? 'Flexible'}</p>
          <p className="text-sm text-foreground/70">Location: {planDetails?.location ?? '—'}</p>
        </div>

        <div className="rounded-2xl border border-border/60 bg-white/80 p-4">
          <h3 className="font-semibold">Selected services</h3>
          <ul className="mt-3 space-y-2">
            {items.length === 0 ? (
              <li className="text-sm text-foreground/70">No services selected</li>
            ) : (
              items.map((it) => (
                <li key={it.id} className="flex items-center justify-between text-sm">
                  <div>
                    <div className="font-medium">{it.name}</div>
                    <div className="text-foreground/70 text-xs">{it.category}</div>
                  </div>
                  <div className="font-semibold">${it.price.toLocaleString()}</div>
                </li>
              ))
            )}
          </ul>
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-foreground/70">Total</div>
            <div className="font-heading text-lg font-semibold">${total.toLocaleString()}</div>
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={handleConfirm} className="rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-3 text-white font-semibold">Confirm & finish</button>
          <button onClick={() => navigate(-1)} className="rounded-full border px-6 py-3">Back</button>
        </div>
      </div>
    </section>
  );
}
