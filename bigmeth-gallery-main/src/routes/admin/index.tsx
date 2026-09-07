import { createFileRoute, Link } from "@tanstack/react-router";
import { useBookings, usePortfolio, useStories, useTestimonials } from "@/lib/db";

export const Route = createFileRoute("/admin/")({
  component: AdminOverview,
});

function Stat({ label, value, to }: { label: string; value: number; to: string }) {
  return (
    <Link
      to={to}
      className="group flex flex-col gap-2 border border-border p-6 transition-colors hover:border-accent/50"
    >
      <span className="eyebrow text-foreground/50">{label}</span>
      <span className="display text-6xl transition-colors group-hover:text-accent">{value}</span>
    </Link>
  );
}

function AdminOverview() {
  const { data: bookings = [] } = useBookings();
  const { data: portfolio = [] } = usePortfolio();
  const { data: stories = [] } = useStories();
  const { data: testimonials = [] } = useTestimonials();

  const pending = bookings.filter((b) => b.status === "pending").length;

  return (
    <main className="px-8 py-10">
      <h1 className="display text-5xl">Overview</h1>

      <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat label="Pending bookings" value={pending} to="/admin/bookings" />
        <Stat label="Total bookings" value={bookings.length} to="/admin/bookings" />
        <Stat label="Portfolio images" value={portfolio.length} to="/admin/portfolio" />
        <Stat label="Visual stories" value={stories.length} to="/admin/stories" />
        <Stat label="Testimonials" value={testimonials.length} to="/admin/testimonials" />
      </div>

      <div className="mt-14">
        <h2 className="display text-2xl">Latest bookings</h2>
        {bookings.length === 0 ? (
          <p className="mt-6 text-sm text-muted-foreground">No bookings yet.</p>
        ) : (
          <div className="mt-6 divide-y divide-border border-y border-border">
            {bookings.slice(0, 8).map((booking) => (
              <div key={booking.id} className="flex items-center justify-between gap-4 py-4 text-sm">
                <div className="flex items-center gap-6">
                  <span className="eyebrow w-28 truncate">{booking.reference}</span>
                  <span className="text-foreground">{booking.full_name}</span>
                  <span className="eyebrow text-foreground/50">{booking.booking_type}</span>
                </div>
                <div className="flex items-center gap-6">
                  <span className="eyebrow text-foreground/50">{booking.phone}</span>
                  <span
                    className={
                      booking.status === "pending"
                        ? "eyebrow text-accent"
                        : booking.status === "confirmed"
                          ? "eyebrow text-foreground"
                          : "eyebrow text-muted-foreground"
                    }
                  >
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
        {bookings.length > 8 && (
          <div className="mt-5">
            <Link to="/admin/bookings" className="eyebrow border-b border-accent pb-1 text-accent">
              View all bookings
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
