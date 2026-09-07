import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useIsAdmin } from "@/lib/db";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/_layout")({
  component: AdminLayout,
});

const NAV_LINKS = [
  { to: "/admin", label: "Overview", end: true },
  { to: "/admin/bookings", label: "Bookings" },
  { to: "/admin/portfolio", label: "Portfolio" },
  { to: "/admin/stories", label: "Stories" },
  { to: "/admin/services", label: "Services" },
  { to: "/admin/testimonials", label: "Testimonials" },
  { to: "/admin/settings", label: "Settings" },
] as const;

function AdminLayout() {
  const navigate = useNavigate();
  const { data: isAdmin, isLoading } = useIsAdmin();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      void navigate({ to: "/auth/sign-in" });
    }
  }, [isAdmin, isLoading, navigate]);

  const signOut = async () => {
    await supabase.auth.signOut();
    await navigate({ to: "/auth/sign-in" });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="eyebrow animate-pulse">Loading…</p>
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="flex w-60 shrink-0 flex-col border-r border-border bg-surface">
        <div className="px-6 py-7">
          <Link to="/" className="display text-lg tracking-[0.12em]">
            Bigmeth
          </Link>
          <p className="eyebrow mt-1 text-accent">Admin</p>
        </div>

        <nav className="flex flex-1 flex-col gap-1 px-3">
          {NAV_LINKS.map((link) => {
            const active = link.end
              ? pathname === link.to
              : pathname.startsWith(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "eyebrow rounded-none px-3 py-3 transition-colors",
                  active
                    ? "text-accent"
                    : "text-foreground/60 hover:text-foreground",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-6 py-6">
          <button
            type="button"
            onClick={signOut}
            className="eyebrow text-foreground/40 transition-colors hover:text-foreground"
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
