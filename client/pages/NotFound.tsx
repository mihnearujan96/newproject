import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 px-6 py-24 text-center">
      <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
        404
      </span>
      <h1 className="font-heading text-4xl text-foreground sm:text-5xl">
        This celebration page is off the guest list.
      </h1>
      <p className="max-w-2xl text-base text-foreground/70">
        The link you followed might be outdated or mistyped. Return to Eventia
        Celebration Hub to discover handpicked venues, storytellers, and
        entertainers.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 rounded-full border border-border bg-white/80 px-6 py-3 text-sm font-semibold text-foreground/80 transition hover:border-primary hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to homepage
      </Link>
    </section>
  );
};

export default NotFound;
