import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useTestimonials, type Testimonial } from "@/lib/db";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/testimonials")({
  component: AdminTestimonials,
});

type TestimonialForm = Omit<Testimonial, "id">;
const EMPTY: TestimonialForm = {
  client_name: "",
  quote: "",
  image_url: null,
  service: null,
  institution: null,
  published: true,
  sort_order: 0,
};

function TestimonialModal({
  initial,
  onSave,
  onClose,
}: {
  initial: Partial<Testimonial>;
  onSave: (data: TestimonialForm & { id?: string }) => Promise<void>;
  onClose: () => void;
}) {
  const [form, setForm] = useState<TestimonialForm>({ ...EMPTY, ...initial });
  const [saving, setSaving] = useState(false);
  const patch = (update: Partial<TestimonialForm>) => setForm((p) => ({ ...p, ...update }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSave({ ...form, id: initial.id });
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-md overflow-auto bg-background border border-border max-h-[90vh]">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="display text-2xl">{initial.id ? "Edit testimonial" : "New testimonial"}</h2>
          <button type="button" onClick={onClose} className="eyebrow text-foreground/40 hover:text-foreground">Close</button>
        </div>
        <form onSubmit={submit} className="flex flex-col gap-5 p-6">
          <div className="flex flex-col gap-1.5">
            <label className="eyebrow text-foreground/60">Client name <span className="text-accent">*</span></label>
            <input required value={form.client_name} onChange={(e) => patch({ client_name: e.target.value })} className="input-line" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="eyebrow text-foreground/60">Quote <span className="text-accent">*</span></label>
            <textarea required value={form.quote} onChange={(e) => patch({ quote: e.target.value })} rows={4} className="input-line resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="eyebrow text-foreground/60">Service</label>
              <input value={form.service ?? ""} onChange={(e) => patch({ service: e.target.value || null })} className="input-line" placeholder="e.g. Graduation" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="eyebrow text-foreground/60">Institution</label>
              <input value={form.institution ?? ""} onChange={(e) => patch({ institution: e.target.value || null })} className="input-line" placeholder="e.g. KNUST" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="eyebrow text-foreground/60">Photo URL</label>
            <input type="url" value={form.image_url ?? ""} onChange={(e) => patch({ image_url: e.target.value || null })} className="input-line" placeholder="https://…" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="eyebrow text-foreground/60">Sort order</label>
            <input type="number" value={form.sort_order} onChange={(e) => patch({ sort_order: parseInt(e.target.value, 10) || 0 })} className="input-line" />
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.published} onChange={(e) => patch({ published: e.target.checked })} className="accent-accent" />
            <span className="eyebrow text-foreground/70">Published</span>
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

function AdminTestimonials() {
  const { data: testimonials = [], isLoading } = useTestimonials();
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Partial<Testimonial> | null>(null);

  const save = async (data: TestimonialForm & { id?: string }) => {
    const { id, ...payload } = data;
    if (id) {
      await supabase.from("testimonials").update(payload).eq("id", id);
    } else {
      await supabase.from("testimonials").insert(payload);
    }
    await qc.invalidateQueries({ queryKey: ["testimonials"] });
    setEditing(null);
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    await supabase.from("testimonials").delete().eq("id", id);
    await qc.invalidateQueries({ queryKey: ["testimonials"] });
  };

  return (
    <main className="px-8 py-10">
      <div className="flex items-end justify-between">
        <h1 className="display text-5xl">Testimonials</h1>
        <button type="button" onClick={() => setEditing({})} className="eyebrow border border-accent px-6 py-3 text-accent hover:bg-accent hover:text-accent-foreground transition-colors">
          Add testimonial
        </button>
      </div>

      <div className="mt-8">
        {isLoading ? (
          <p className="eyebrow animate-pulse text-muted-foreground">Loading…</p>
        ) : testimonials.length === 0 ? (
          <p className="text-sm text-muted-foreground">No testimonials yet.</p>
        ) : (
          <div className="border-t border-border">
            {testimonials.map((t) => (
              <div key={t.id} className="flex items-start justify-between gap-6 border-b border-border py-6">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-4">
                    <p className="font-medium text-sm text-foreground">{t.client_name}</p>
                    {t.institution && <span className="eyebrow">{t.institution}</span>}
                    <span className={cn("eyebrow", t.published ? "text-foreground" : "text-muted-foreground")}>
                      {t.published ? "Published" : "Draft"}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">"{t.quote}"</p>
                </div>
                <div className="flex shrink-0 gap-3">
                  <button type="button" onClick={() => setEditing(t)} className="eyebrow border border-border px-3 py-2 text-foreground/60 hover:border-accent/50 hover:text-foreground transition-colors">Edit</button>
                  <button type="button" onClick={() => remove(t.id)} className="eyebrow border border-border px-3 py-2 text-foreground/40 hover:border-destructive hover:text-destructive transition-colors">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {editing !== null && (
        <TestimonialModal initial={editing} onSave={save} onClose={() => setEditing(null)} />
      )}
    </main>
  );
}
