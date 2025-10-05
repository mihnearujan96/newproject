import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Confetti() {
  // lightweight confetti using animated divs
  const pieces = Array.from({ length: 24 });
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      {pieces.map((_, i) => {
        const left = Math.random() * 100;
        const bg = ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#9B6BFF"][Math.floor(Math.random() * 5)];
        const style: any = {
          position: "absolute",
          left: `${left}%`,
          top: `-10%`,
          width: `${8 + Math.random() * 12}px`,
          height: `${8 + Math.random() * 12}px`,
          background: bg,
          transform: `rotate(${Math.random() * 360}deg)`,
          borderRadius: "2px",
          animation: `fall 1600ms ${Math.random() * 600}ms both ease-out`,
          opacity: 0.95,
        };
        return <div key={i} style={style} />;
      })}
      <style>{`@keyframes fall { 0% { transform: translateY(-10vh) rotate(0deg); } 100% { transform: translateY(120vh) rotate(360deg); } }`}</style>
    </div>
  );
}

export default function ProposalSent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [proposal, setProposal] = useState<any>(null);

  useEffect(() => {
    try {
      const all = JSON.parse(localStorage.getItem("eventia.proposals") || "[]");
      const p = all.find((x: any) => x.id === id);
      setProposal(p || null);
    } catch {
      setProposal(null);
    }
  }, [id]);

  if (!proposal) {
    return (
      <section className="mx-auto w-full max-w-3xl px-6 py-20">
        <p>Proposal not found.</p>
        <button onClick={() => navigate(-1)} className="underline mt-4">Back</button>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-20 text-center">
      <Confetti />
      <div className="mx-auto max-w-xl rounded-2xl border border-border/60 bg-white/90 p-10">
        <h1 className="font-heading text-3xl font-semibold">Congratulations!</h1>
        <p className="mt-4 text-sm text-foreground/70">Your proposal has been sent to the selected vendors. Please wait for confirmation from the vendors — we expect responses within 24 hours.</p>
        <div className="mt-6 grid gap-3">
          <div className="rounded-md bg-primary/10 p-4 text-left text-sm">
            <strong>Proposal ID:</strong> {proposal.id}
            <div className="mt-2">We sent your request to the selected providers. You’ll receive confirmation or updates as soon as possible (max 24h).</div>
          </div>
          <Link to="/account" className="inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2">Go to my dashboard</Link>
          <button onClick={() => navigate('/')} className="rounded-full bg-primary/90 px-4 py-2 text-white">Back to home</button>
        </div>
      </div>
    </section>
  );
}
