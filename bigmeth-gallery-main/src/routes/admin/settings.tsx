import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSettings, type SiteSettings } from "@/lib/db";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/settings")({
  component: AdminSettings,
});

type SettingsForm = Omit<SiteSettings, "id">;

const EMPTY: SettingsForm = {
  brand_name: "BIGMETH",
  tagline: "A visual story untold.",
  biography: null,
  philosophy: null,
  phone: null,
  whatsapp: null,
  whatsapp_secondary: null,
  email: null,
  instagram_url: null,
  location: null,
  hero_image: null,
  about_image: null,
  footer_text: null,
};

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="eyebrow text-foreground/60">{label}</label>
      {hint && <p className="text-xs text-muted-foreground -mt-0.5">{hint}</p>}
      {children}
    </div>
  );
}

function AdminSettings() {
  const { data: settings, isLoading } = useSettings();
  const qc = useQueryClient();
  const [form, setForm] = useState<SettingsForm>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (settings) {
      const { id: _id, ...rest } = settings;
      setForm(rest);
    }
  }, [settings]);

  const patch = (update: Partial<SettingsForm>) => setForm((p) => ({ ...p, ...update }));

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);

    if (settings) {
      await supabase.from("site_settings").update(form).eq("id", settings.id);
    } else {
      await supabase.from("site_settings").insert(form);
    }
    await qc.invalidateQueries({ queryKey: ["site_settings"] });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (isLoading) {
    return (
      <main className="px-8 py-10">
        <p className="eyebrow animate-pulse text-muted-foreground">Loading…</p>
      </main>
    );
  }

  return (
    <main className="px-8 py-10">
      <h1 className="display text-5xl">Site settings</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        These values appear throughout the site — brand name, contact details, images and copy.
      </p>

      <form onSubmit={save} className="mt-10 max-w-2xl">
        <section className="flex flex-col gap-6">
          <h2 className="display text-2xl border-b border-border pb-4">Brand</h2>
          <Field label="Brand name">
            <input value={form.brand_name} onChange={(e) => patch({ brand_name: e.target.value })} className="input-line" />
          </Field>
          <Field label="Tagline" hint="Appears in hero, footer and manifesto section.">
            <input value={form.tagline} onChange={(e) => patch({ tagline: e.target.value })} className="input-line" />
          </Field>
          <Field label="Location" hint="e.g. Kumasi, Ghana">
            <input value={form.location ?? ""} onChange={(e) => patch({ location: e.target.value || null })} className="input-line" />
          </Field>
          <Field label="Footer text" hint="Short copyright line. Year is appended automatically.">
            <input value={form.footer_text ?? ""} onChange={(e) => patch({ footer_text: e.target.value || null })} className="input-line" placeholder="© BIGMETH PHOTOGRAPHY" />
          </Field>
        </section>

        <section className="mt-10 flex flex-col gap-6">
          <h2 className="display text-2xl border-b border-border pb-4">Contact</h2>
          <Field label="WhatsApp number" hint="Primary. Format: 0XXXXXXXXX">
            <input value={form.whatsapp ?? ""} onChange={(e) => patch({ whatsapp: e.target.value || null })} className="input-line" placeholder="0598416387" />
          </Field>
          <Field label="WhatsApp number 2" hint="Secondary number (optional)">
            <input value={form.whatsapp_secondary ?? ""} onChange={(e) => patch({ whatsapp_secondary: e.target.value || null })} className="input-line" />
          </Field>
          <Field label="Phone">
            <input type="tel" value={form.phone ?? ""} onChange={(e) => patch({ phone: e.target.value || null })} className="input-line" />
          </Field>
          <Field label="Email">
            <input type="email" value={form.email ?? ""} onChange={(e) => patch({ email: e.target.value || null })} className="input-line" />
          </Field>
          <Field label="Instagram URL">
            <input type="url" value={form.instagram_url ?? ""} onChange={(e) => patch({ instagram_url: e.target.value || null })} className="input-line" placeholder="https://instagram.com/the_bigmeth" />
          </Field>
        </section>

        <section className="mt-10 flex flex-col gap-6">
          <h2 className="display text-2xl border-b border-border pb-4">Images</h2>
          <Field label="Hero image URL" hint="Full-bleed image on the homepage hero.">
            <input type="url" value={form.hero_image ?? ""} onChange={(e) => patch({ hero_image: e.target.value || null })} className="input-line" placeholder="https://…" />
          </Field>
          {form.hero_image && (
            <img src={form.hero_image} alt="Hero preview" className="h-40 w-full object-cover opacity-80" loading="lazy" />
          )}
          <Field label="Artist photo URL" hint="Appears on the About page.">
            <input type="url" value={form.about_image ?? ""} onChange={(e) => patch({ about_image: e.target.value || null })} className="input-line" placeholder="https://…" />
          </Field>
          {form.about_image && (
            <img src={form.about_image} alt="Artist photo preview" className="h-40 w-40 object-cover opacity-80" loading="lazy" />
          )}
        </section>

        <section className="mt-10 flex flex-col gap-6">
          <h2 className="display text-2xl border-b border-border pb-4">Biography</h2>
          <Field label="Biography" hint="Main artist statement — shown on the About page and homepage.">
            <textarea
              value={form.biography ?? ""}
              onChange={(e) => patch({ biography: e.target.value || null })}
              rows={5}
              className="input-line resize-none"
            />
          </Field>
          <Field label="Philosophy" hint="Short italicised quote shown below the biography.">
            <textarea
              value={form.philosophy ?? ""}
              onChange={(e) => patch({ philosophy: e.target.value || null })}
              rows={2}
              className="input-line resize-none"
            />
          </Field>
        </section>

        <div className="mt-10 flex items-center gap-6">
          <button
            type="submit"
            disabled={saving}
            className="eyebrow border border-accent px-10 py-4 text-accent hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save settings"}
          </button>
          {saved && <span className="eyebrow text-accent">Saved ✓</span>}
        </div>
      </form>
    </main>
  );
}
