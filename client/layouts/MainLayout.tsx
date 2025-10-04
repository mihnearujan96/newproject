import { PropsWithChildren } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 bg-[radial-gradient(circle_at_top,_rgba(99,123,255,0.12),_transparent_55%),radial-gradient(circle_at_bottom_right,_rgba(255,138,84,0.12),_transparent_50%)]">
        {children}
      </main>
      <Footer />
    </div>
  );
}
