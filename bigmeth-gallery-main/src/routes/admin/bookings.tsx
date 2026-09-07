import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useBookings, type Booking } from "@/lib/db";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/bookings")({
  component: AdminBookings,
});

const STATUS_OPTIONS = ["pending", "confirmed", "completed", "cancelled"];

function BookingRow({
  booking,
  onStatusChange,
}: {
  booking: Booking;
  onStatusChange: (id: string, status: string) => Promise<void>;
}) {
  const [expanded, setExpanded] = useState(false);
  const [saving, setSaving] = useState(false);

  const update = async (status: string) => {
    setSaving(true);
    await onStatusChange(booking.id, status);
    setSaving(false);
  };

  return (
    <div className="border-b border-border">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <div className="flex items-center gap-6 min-w-0">
          <span className="eyebrow w-28 shrink-0 text-accent">{booking.reference}</span>
          <span className="truncate text-sm font-medium text-foreground">{booking.full_name}</span>
          <span className="eyebrow shrink-0 text-foreground/50">{booking.booking_type}</span>
          {booking.session_type && (
            <span className="eyebrow shrink-0 text-foreground/40">{booking.session_type}</span>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-5">
          <span
            className={cn(
              "eyebrow",
              booking.status === "pending" && "text-accent",
              booking.status === "confirmed" && "text-foreground",
              booking.status === "completed" && "text-muted-foreground",
              booking.status === "cancelled" && "text-destructive",
            )}
          >
            {booking.status}
          </span>
          <span className="text-sm text-muted-foreground">
            {new Date(booking.created_at).toLocaleDateString()}
          </span>
          <span className="eyebrow text-foreground/30">{expanded ? "▲" : "▼"}</span>
        </div>
      </button>

      {expanded && (
        <div className="pb-8">
          <div className="grid grid-cols-2 gap-x-10 gap-y-4 rounded-none bg-surface p-6 text-sm lg:grid-cols-4">
            <Detail label="Phone" value={booking.phone} />
            <Detail label="Email" value={booking.email} />
            <Detail label="Date" value={booking.preferred_date} />
            <Detail label="Location" value={booking.preferred_location} />
            <Detail label="People" value={booking.number_of_people?.toString()} />
            <Detail label="Year level" value={booking.year_level} />
            <Detail label="Programme" value={booking.programme} />
            <Detail label="Institution other" value={booking.institution_other} />
            {booking.notes && (
              <div className="col-span-2 lg:col-span-4">
                <p className="eyebrow text-foreground/50">Notes</p>
                <p className="mt-1 text-foreground/80">{booking.notes}</p>
              </div>
            )}
            {booking.reference_image_url && (
              <div className="col-span-2 lg:col-span-4">
                <p className="eyebrow text-foreground/50">Reference image</p>
                <a
                  href={booking.reference_image_url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 block text-accent underline-offset-2 hover:underline"
                >
                  {booking.reference_image_url}
                </a>
              </div>
            )}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="eyebrow text-foreground/50">Update status:</span>
            {STATUS_OPTIONS.map((s) => (
              <button
                key={s}
                type="button"
                disabled={saving || booking.status === s}
                onClick={() => update(s)}
                className={cn(
                  "eyebrow border px-4 py-2 transition-colors",
                  booking.status === s
                    ? "border-accent text-accent"
                    : "border-border text-foreground/60 hover:border-accent/50 hover:text-foreground disabled:opacity-40",
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Detail({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div>
      <p className="eyebrow text-foreground/50">{label}</p>
      <p className="mt-1 text-foreground">{value}</p>
    </div>
  );
}

function AdminBookings() {
  const { data: bookings = [], isLoading } = useBookings();
  const qc = useQueryClient();
  const [filter, setFilter] = useState("all");

  const visible = filter === "all" ? bookings : bookings.filter((b) => b.status === filter);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("bookings").update({ status }).eq("id", id);
    await qc.invalidateQueries({ queryKey: ["bookings"] });
  };

  return (
    <main className="px-8 py-10">
      <div className="flex items-end justify-between">
        <h1 className="display text-5xl">Bookings</h1>
        <p className="eyebrow text-muted-foreground">{bookings.length} total</p>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        {["all", ...STATUS_OPTIONS].map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setFilter(s)}
            className={cn(
              "eyebrow border px-4 py-2 transition-colors capitalize",
              filter === s
                ? "border-accent text-accent"
                : "border-border text-foreground/60 hover:border-accent/50",
            )}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {isLoading ? (
          <p className="eyebrow animate-pulse text-muted-foreground">Loading…</p>
        ) : visible.length === 0 ? (
          <p className="text-sm text-muted-foreground">No bookings found.</p>
        ) : (
          <div className="border-t border-border">
            {visible.map((booking) => (
              <BookingRow key={booking.id} booking={booking} onStatusChange={updateStatus} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
