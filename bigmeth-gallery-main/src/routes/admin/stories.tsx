import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useStories, type VisualStory } from "@/lib/db";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/stories")({
  component: AdminStories,
});

type StoryForm = Omit<VisualStory, "id">;
const EMPTY: StoryForm = {
  title: "",
  slug: "",
  description: null,
  cover_image: null,
  category: null,
  story_date: null,
  location: null,
  notes: null,
  published: false,
  sort_order: 0,
};

function toSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function StoryModal({
  initial,
  onSave,
  onClose,
}: {
  initial: Partial<VisualStory>;
  onSave: (data: StoryForm & { id?: string }) => Promise<void>;
  onClose: () => void;
}) {
  const [form, setForm] = useState<StoryForm>({ ...EMPTY, ...initial });
  const [saving, setSaving] = useState(false);
  const patch = (update: Partial<StoryForm>) => setForm((p) => ({ ...p, ...update }));

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
          <h2 className="display text-2xl">{initial.id ? "Edit story" : "New story"}</h2>
          <button type="button" onClick={onClose} className="eyebrow text-foreground/40 hover:text-foreground">Close</button>
        </div>
        <form onSubmit={submit} className="flex flex-col gap-5 p-6">
          <div className="flex flex-col gap-1.5">
            <label className="eyebrow text-foreground/60">Title <span className="text-accent">*</span></label>
            <input
              required
              value={form.title}
              onChange={(e) => {
                patch({ title: e.target.value, slug: toSlug(e.target.value) });
              }}
              className="input-line"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="eyebrow text-foreground/60">Slug <span className="text-accent">*</span></label>
            <input
              required
              value={form.slug}
              onChange={(e) => patch({ slug: toSlug(e.target.value) })}
              className="input-line"
              placeholder="auto-generated-from-title"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="eyebrow text-foreground/60">Cover image URL</label>
            <input
              type="url"
              value={form.cover_image ?? ""}
              onChange={(e) => patch({ cover_image: e.target.value || null })}
              className="input-line"
              placeholder="https://…"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="eyebrow text-foreground/60">Category</label>
              <input
                value={form.category ?? ""}
                onChange={(e) => patch({ category: e.target.value || null })}
                className="input-line"
                placeholder="e.g. Graduation"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="eyebrow text-foreground/60">Location</label>
              <input
                value={form.location ?? ""}
                onChange={(e) => patch({ location: e.target.value || null })}
                className="input-line"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="eyebrow text-foreground/60">Story date</label>
              <input
                type="date"
                value={form.story_date ?? ""}
                onChange={(e) => patch({ story_date: e.target.value || null })}
                className="input-line bg-transparent"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="eyebrow text-foreground/60">Sort order</label>
              <input
                type="number"
                value={form.sort_order}
                onChange={(e) => patch({ sort_order: parseInt(e.target.value, 10) || 0 })}
                className="input-line"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="eyebrow text-foreground/60">Description</label>
            <textarea
              value={form.description ?? ""}
              onChange={(e) => patch({ description: e.target.value || null })}
              rows={3}
              className="input-line resize-none"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="eyebrow text-foreground/60">Photographer's notes</label>
            <textarea
              value={form.notes ?? ""}
              onChange={(e) => patch({ notes: e.target.value || null })}
              rows={2}
              className="input-line resize-none"
            />
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => patch({ published: e.target.checked })}
              className="accent-accent"
            />
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

function AdminStories() {
  const { data: stories = [], isLoading } = useStories();
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Partial<VisualStory> | null>(null);

  const save = async (data: StoryForm & { id?: string }) => {
    const { id, ...payload } = data;
    if (id) {
      await supabase.from("visual_stories").update(payload).eq("id", id);
    } else {
      await supabase.from("visual_stories").insert(payload);
    }
    await qc.invalidateQueries({ queryKey: ["visual_stories"] });
    setEditing(null);
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this story? All story images will also be removed.")) return;
    await supabase.from("story_images").delete().eq("story_id", id);
    await supabase.from("visual_stories").delete().eq("id", id);
    await qc.invalidateQueries({ queryKey: ["visual_stories"] });
  };

  const toggle = async (id: string, published: boolean) => {
    await supabase.from("visual_stories").update({ published }).eq("id", id);
    await qc.invalidateQueries({ queryKey: ["visual_stories"] });
  };

  return (
    <main className="px-8 py-10">
      <div className="flex items-end justify-between">
        <h1 className="display text-5xl">Stories</h1>
        <button
          type="button"
          onClick={() => setEditing({})}
          className="eyebrow border border-accent px-6 py-3 text-accent hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          New story
        </button>
      </div>

      <div className="mt-8">
        {isLoading ? (
          <p className="eyebrow animate-pulse text-muted-foreground">Loading…</p>
        ) : stories.length === 0 ? (
          <p className="text-sm text-muted-foreground">No stories yet.</p>
        ) : (
          <div className="border-t border-border">
            {stories.map((story) => (
              <div key={story.id} className="flex items-center justify-between gap-4 border-b border-border py-5">
                <div className="flex min-w-0 items-center gap-6">
                  {story.cover_image && (
                    <img
                      src={story.cover_image}
                      alt={story.title}
                      className="h-12 w-12 shrink-0 object-cover"
                      loading="lazy"
                    />
                  )}
                  <div className="min-w-0">
                    <p className="truncate font-medium text-sm text-foreground">{story.title}</p>
                    <p className="eyebrow mt-0.5 truncate">/{story.slug}</p>
                  </div>
                  <span
                    className={cn(
                      "eyebrow shrink-0",
                      story.published ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {story.published ? "Published" : "Draft"}
                  </span>
                </div>
                <div className="flex shrink-0 gap-3">
                  <button
                    type="button"
                    onClick={() => toggle(story.id, !story.published)}
                    className="eyebrow border border-border px-3 py-2 text-foreground/60 hover:border-accent/50 hover:text-foreground transition-colors"
                  >
                    {story.published ? "Unpublish" : "Publish"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditing(story)}
                    className="eyebrow border border-border px-3 py-2 text-foreground/60 hover:border-accent/50 hover:text-foreground transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(story.id)}
                    className="eyebrow border border-border px-3 py-2 text-foreground/40 hover:border-destructive hover:text-destructive transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {editing !== null && (
        <StoryModal initial={editing} onSave={save} onClose={() => setEditing(null)} />
      )}
    </main>
  );
}
