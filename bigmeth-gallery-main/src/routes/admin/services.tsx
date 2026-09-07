import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useServices, type Service } from "@/lib/db";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/services")({
  component: AdminServices,
});

type ServiceForm = Omit<Service, "id">;
const EMPTY: ServiceForm = {
  title: "",
  description: null,
  image_url: null,
  active: true,
  sort_order: 0,
};

function ServiceModal({
  initial,
  onSave,
  onClose,
}: {
  initial: Partial<Service>;
  onSave: (data: ServiceForm & { id?: string }) => Promise<void>;
  onClose: () => void;
}) {
  const [form, setForm] = useState<ServiceForm>({ ...EMPTY, ...initial });
  const [saving, setSaving] = useState(false);
  const patch = (update: Partial<ServiceForm>) => setForm((p) => ({ ...p, ...update }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSave({ ...form, id: initial.id });
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-md bg-background border border-border">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="display text-2xl">{initial.id ? "Edit service" : "New service"}</h2>
          <button type="button" onClick={onClose} className="eyebrow text-foreground/40 hover:text-foreground">Close</button>
        </div>
        <form onSubmit={submit} className="flex flex-col gap-5 p-6">
          <div className="flex flex-col gap-1.5">
            <label className="eyebrow text-foreground/60">Title <span className="text-accent">*</span></label>
            <input required value={form.title} onChange={(e) => patch({ title: e.target.value })} className="input-line" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="eyebrow text-foreground/60">Description</label>
            <textarea value={form.description ?? ""} onChange={(e) => patch({ description: e.target.value || null })} rows={3} className="input-line resize-none" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="eyebrow text-foreground/60">Image URL</label>
            <input type="url" value={form.image_url ?? ""} onChange={(e) => patch({ image_url: e.target.value || null })} className="input-line" placeholder="https://…" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="eyebrow text-foreground/60">Sort order</label>
            <input type="number" value={form.sort_order} onChange={(e) => patch({ sort_order: parseInt(e.target.value, 10) || 0 })} className="input-line" />
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.active} onChange={(e) => patch({ active: e.target.checked })} className="accent-accent" />
            <span className="eyebrow text-foreground/70">Active</span>
          </label>
          <div className="flex gap-4 pt-2">
            <button type="submit" disabled={saving} className="eyebrow border border-accent px-8 py-3 text-accent hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-60">
              {saving ? "Saving…" : "Save"}
            </button>
            <button type="button" onClick={onClose} className="eyebrow border border-border px-8 py-3 text-foreground/60 hover:text-foreground transition-colors">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AdminServices() {
  const { data: services = [], isLoading } = useServices();
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Partial<Service> | null>(null);

  const save = async (data: ServiceForm & { id?: string }) => {
    const { id, ...payload } = data;
    if (id) {
      await supabase.from("services").update(payload).eq("id", id);
    } else {
      await supabase.from("services").insert(payload);
    }
    await qc.invalidateQueries({ queryKey: ["services"] });
    setEditing(null);
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    await supabase.from("services").delete().eq("id", id);
    await qc.invalidateQueries({ queryKey: ["services"] });
  };

  return (
    <main className="px-8 py-10">
      <div className="flex items-end justify-between">
        <h1 className="display text-5xl">Services</h1>
        <button type="button" onClick={() => setEditing({})} className="eyebrow border border-accent px-6 py-3 text-accent hover:bg-accent hover:text-accent-foreground transition-colors">
          Add service
        </button>
      </div>

      <div className="mt-8">
        {isLoading ? (
          <p className="eyebrow animate-pulse text-muted-foreground">Loading…</p>
        ) : services.length === 0 ? (
          <p className="text-sm text-muted-foreground">No services yet.</p>
        ) : (
          <div className="border-t border-border">
            {services.map((service) => (
              <div key={service.id} className="flex items-center justify-between gap-4 border-b border-border py-5">
                <div className="min-w-0">
                  <p className={cn("font-medium text-sm", service.active ? "text-foreground" : "text-muted-foreground")}>
                    {service.title}
                  </p>
                  {service.description && (
                    <p className="mt-1 truncate text-xs text-muted-foreground max-w-sm">{service.description}</p>
                  )}
                </div>
                <div className="flex shrink-0 gap-3">
                  <button type="button" onClick={() => setEditing(service)} className="eyebrow border border-border px-3 py-2 text-foreground/60 hover:border-accent/50 hover:text-foreground transition-colors">Edit</button>
                  <button type="button" onClick={() => remove(service.id)} className="eyebrow border border-border px-3 py-2 text-foreground/40 hover:border-destructive hover:text-destructive transition-colors">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {editing !== null && (
        <ServiceModal initial={editing} onSave={save} onClose={() => setEditing(null)} />
      )}
    </main>
  );
}
