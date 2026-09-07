import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useCategories, usePortfolio, type PortfolioImage } from "@/lib/db";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/portfolio")({
  component: AdminPortfolio,
});

type ImageForm = Omit<PortfolioImage, "id" | "created_at">;
const EMPTY_FORM: ImageForm = {
  title: "",
  description: null,
  category_id: null,
  image_url: "",
  alt_text: null,
  orientation: "landscape",
  featured: false,
  is_hero: false,
  published: true,
  sort_order: 0,
};

function ImageCard({
  image,
  categoryName,
  onEdit,
  onDelete,
  onToggle,
}: {
  image: PortfolioImage;
  categoryName?: string;
  onEdit: () => void;
  onDelete: () => void;
  onToggle: (field: "published" | "featured" | "is_hero", value: boolean) => void;
}) {
  return (
    <div className={cn("border border-border bg-surface", !image.published && "opacity-50")}>
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-2">
        <img
          src={image.image_url}
          alt={image.alt_text ?? image.title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        {image.is_hero && (
          <span className="absolute top-2 left-2 eyebrow bg-accent px-2 py-1 text-accent-foreground">
            Hero
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="font-medium text-sm text-foreground truncate">{image.title}</p>
        {categoryName && <p className="eyebrow mt-1">{categoryName}</p>}
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
          <ToggleBtn
            label="Published"
            active={image.published}
            onChange={(v) => onToggle("published", v)}
          />
          <ToggleBtn
            label="Featured"
            active={image.featured}
            onChange={(v) => onToggle("featured", v)}
          />
          <ToggleBtn
            label="Hero"
            active={image.is_hero}
            onChange={(v) => onToggle("is_hero", v)}
          />
        </div>
        <div className="mt-4 flex gap-3">
          <button
            type="button"
            onClick={onEdit}
            className="eyebrow border border-border px-3 py-2 text-foreground/60 transition-colors hover:border-accent/50 hover:text-foreground"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="eyebrow border border-border px-3 py-2 text-foreground/40 transition-colors hover:border-destructive hover:text-destructive"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function ToggleBtn({
  label,
  active,
  onChange,
}: {
  label: string;
  active: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!active)}
      className={cn(
        "eyebrow transition-colors",
        active ? "text-accent" : "text-foreground/30 hover:text-foreground/60",
      )}
    >
      {label}
    </button>
  );
}

function ImageModal({
  initial,
  onSave,
  onClose,
}: {
  initial: Partial<PortfolioImage>;
  onSave: (data: ImageForm & { id?: string }) => Promise<void>;
  onClose: () => void;
}) {
  const { data: categories = [] } = useCategories();
  const [form, setForm] = useState<ImageForm>({
    ...EMPTY_FORM,
    ...initial,
  });
  const [saving, setSaving] = useState(false);

  const patch = (update: Partial<ImageForm>) => setForm((p) => ({ ...p, ...update }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSave({ ...form, id: initial.id });
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-lg overflow-auto bg-background border border-border max-h-[90vh]">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="display text-2xl">{initial.id ? "Edit image" : "Add image"}</h2>
          <button type="button" onClick={onClose} className="eyebrow text-foreground/40 hover:text-foreground">
            Close
          </button>
        </div>
        <form onSubmit={submit} className="flex flex-col gap-5 p-6">
          <Field label="Image URL" required>
            <input
              type="url"
              required
              value={form.image_url}
              onChange={(e) => patch({ image_url: e.target.value })}
              className="input-line"
              placeholder="https://…"
            />
          </Field>
          <Field label="Title" required>
            <input
              required
              value={form.title}
              onChange={(e) => patch({ title: e.target.value })}
              className="input-line"
            />
          </Field>
          <Field label="Alt text">
            <input
              value={form.alt_text ?? ""}
              onChange={(e) => patch({ alt_text: e.target.value || null })}
              className="input-line"
              placeholder="Descriptive text for screen readers"
            />
          </Field>
          <Field label="Category">
            <select
              value={form.category_id ?? ""}
              onChange={(e) => patch({ category_id: e.target.value || null })}
              className="input-line bg-background appearance-none"
            >
              <option value="">No category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Orientation">
            <select
              value={form.orientation}
              onChange={(e) => patch({ orientation: e.target.value })}
              className="input-line bg-background appearance-none"
            >
              <option value="landscape">Landscape</option>
              <option value="portrait">Portrait</option>
              <option value="square">Square</option>
            </select>
          </Field>
          <Field label="Sort order">
            <input
              type="number"
              value={form.sort_order}
              onChange={(e) => patch({ sort_order: parseInt(e.target.value, 10) || 0 })}
              className="input-line"
            />
          </Field>
          <Field label="Description">
            <textarea
              value={form.description ?? ""}
              onChange={(e) => patch({ description: e.target.value || null })}
              rows={2}
              className="input-line resize-none"
            />
          </Field>
          <div className="flex flex-wrap gap-5 pt-2">
            {(["published", "featured", "is_hero"] as const).map((f) => (
              <label key={f} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form[f]}
                  onChange={(e) => patch({ [f]: e.target.checked })}
                  className="accent-accent"
                />
                <span className="eyebrow text-foreground/70 capitalize">{f.replace("_", " ")}</span>
              </label>
            ))}
          </div>
          <div className="flex gap-4 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="eyebrow border border-accent px-8 py-3 text-accent hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="eyebrow border border-border px-8 py-3 text-foreground/60 hover:text-foreground transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="eyebrow text-foreground/60">
        {label}
        {required && <span className="ml-1 text-accent">*</span>}
      </label>
      {children}
    </div>
  );
}

function AdminPortfolio() {
  const { data: images = [], isLoading } = usePortfolio();
  const { data: categories = [] } = useCategories();
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Partial<PortfolioImage> | null>(null);

  const categoryById = Object.fromEntries(categories.map((c) => [c.id, c]));

  const save = async (data: ImageForm & { id?: string }) => {
    const { id, ...payload } = data;
    if (id) {
      await supabase.from("portfolio_images").update(payload).eq("id", id);
    } else {
      await supabase.from("portfolio_images").insert(payload);
    }
    await qc.invalidateQueries({ queryKey: ["portfolio_images"] });
    setEditing(null);
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this image? This cannot be undone.")) return;
    await supabase.from("portfolio_images").delete().eq("id", id);
    await qc.invalidateQueries({ queryKey: ["portfolio_images"] });
  };

  const toggle = async (id: string, field: "published" | "featured" | "is_hero", value: boolean) => {
    await supabase.from("portfolio_images").update({ [field]: value }).eq("id", id);
    await qc.invalidateQueries({ queryKey: ["portfolio_images"] });
  };

  return (
    <main className="px-8 py-10">
      <div className="flex items-end justify-between">
        <h1 className="display text-5xl">Portfolio</h1>
        <button
          type="button"
          onClick={() => setEditing({})}
          className="eyebrow border border-accent px-6 py-3 text-accent hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          Add image
        </button>
      </div>

      <div className="mt-8">
        {isLoading ? (
          <p className="eyebrow animate-pulse text-muted-foreground">Loading…</p>
        ) : images.length === 0 ? (
          <p className="text-sm text-muted-foreground">No images yet.</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {images.map((image) => (
              <ImageCard
                key={image.id}
                image={image}
                categoryName={image.category_id ? categoryById[image.category_id]?.name : undefined}
                onEdit={() => setEditing(image)}
                onDelete={() => remove(image.id)}
                onToggle={(field, value) => toggle(image.id, field, value)}
              />
            ))}
          </div>
        )}
      </div>

      {editing !== null && (
        <ImageModal initial={editing} onSave={save} onClose={() => setEditing(null)} />
      )}
    </main>
  );
}
