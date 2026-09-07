import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useInstitutions, useServices, useSettings } from "@/lib/db";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book a Session — BigMeth Photography" },
      {
        name: "description",
        content:
          "Book a photography session with BigMeth — portraiture, events, creative, commercial, couples and school photography.",
      },
      { property: "og:title", content: "Book a Session — BigMeth Photography" },
    ],
  }),
  component: BookPage,
});

// ─── Types ────────────────────────────────────────────────────────────────────

type BookingType = "personal" | "school" | "corporate" | "event";

interface FormState {
  // Step 1
  booking_type: BookingType | "";
  session_type: string;
  // Step 2
  full_name: string;
  phone: string;
  email: string;
  institution_id: string;
  institution_other: string;
  programme: string;
  year_level: string;
  number_of_people: string;
  // Step 3
  preferred_date: string;
  preferred_location: string;
  notes: string;
  reference_image_url: string;
}

const EMPTY: FormState = {
  booking_type: "",
  session_type: "",
  full_name: "",
  phone: "",
  email: "",
  institution_id: "",
  institution_other: "",
  programme: "",
  year_level: "",
  number_of_people: "",
  preferred_date: "",
  preferred_location: "",
  notes: "",
  reference_image_url: "",
};

// ─── Constants ────────────────────────────────────────────────────────────────

const BOOKING_TYPES: { value: BookingType; label: string; note: string }[] = [
  { value: "personal", label: "Personal", note: "Portraits, couples, lifestyle" },
  { value: "school", label: "School / Institution", note: "Graduation & official photography" },
  { value: "corporate", label: "Corporate", note: "Commercial, brand & product" },
  { value: "event", label: "Event", note: "Conferences, ceremonies, social" },
];

const SESSION_TYPES: Record<BookingType, string[]> = {
  personal: ["Portrait", "Couples", "Family", "Lifestyle", "Creative"],
  school: ["Graduation", "Matriculation", "Hall Photo", "ID Photos", "Annual Shoot", "Other"],
  corporate: ["Brand Shoot", "Headshots", "Product Photography", "Office Event"],
  event: ["Conference", "Ceremony", "Birthday / Party", "Concert", "Other"],
};

const YEAR_LEVELS = ["Level 100", "Level 200", "Level 300", "Level 400", "Level 500+", "Postgrad"];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-3" aria-label={`Step ${current} of ${total}`}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "h-px flex-1 transition-colors duration-500",
            i < current ? "bg-accent" : "bg-border",
          )}
        />
      ))}
      <span className="eyebrow shrink-0">{current} / {total}</span>
    </div>
  );
}

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="eyebrow block text-foreground/70">
      {children}
      {required && <span className="ml-1 text-accent">*</span>}
    </label>
  );
}

function TextInput({
  label,
  required,
  type = "text",
  value,
  onChange,
  placeholder,
  hint,
}: {
  label: string;
  required?: boolean;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  hint?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <FieldLabel required={required}>{label}</FieldLabel>
      {hint && <p className="text-xs text-muted-foreground -mt-1">{hint}</p>}
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border-b border-border bg-transparent px-0 py-3 text-sm text-foreground placeholder:text-foreground/30 focus:border-accent focus:outline-none transition-colors"
      />
    </div>
  );
}

function SelectInput({
  label,
  required,
  value,
  onChange,
  options,
  placeholder = "Select…",
}: {
  label: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <FieldLabel required={required}>{label}</FieldLabel>
      <select
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border-b border-border bg-transparent px-0 py-3 text-sm text-foreground focus:border-accent focus:outline-none transition-colors appearance-none cursor-pointer"
      >
        <option value="" disabled className="bg-background">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-background">
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function TextareaInput({
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <div className="flex flex-col gap-2">
      <FieldLabel>{label}</FieldLabel>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full resize-none border-b border-border bg-transparent px-0 py-3 text-sm text-foreground placeholder:text-foreground/30 focus:border-accent focus:outline-none transition-colors"
      />
    </div>
  );
}

// ─── Steps ────────────────────────────────────────────────────────────────────

function Step1({
  form,
  onChange,
  onNext,
}: {
  form: FormState;
  onChange: (patch: Partial<FormState>) => void;
  onNext: () => void;
}) {
  return (
    <div>
      <Reveal>
        <h2 className="display text-5xl sm:text-7xl">What brings you in?</h2>
        <p className="mt-4 text-sm text-muted-foreground">Choose the type of session you need.</p>
      </Reveal>

      <Reveal delay={80} className="mt-12 grid gap-4 sm:grid-cols-2">
        {BOOKING_TYPES.map((type) => (
          <button
            key={type.value}
            type="button"
            onClick={() => onChange({ booking_type: type.value, session_type: "" })}
            className={cn(
              "group flex flex-col items-start border p-6 text-left transition-colors duration-300",
              form.booking_type === type.value
                ? "border-accent bg-accent/5"
                : "border-border hover:border-accent/50",
            )}
          >
            <span className="display text-2xl transition-colors group-hover:text-accent">
              {type.label}
            </span>
            <span className="eyebrow mt-2">{type.note}</span>
          </button>
        ))}
      </Reveal>

      {form.booking_type && (
        <Reveal delay={60} className="mt-10">
          <p className="eyebrow mb-5 text-foreground/60">Session type</p>
          <div className="flex flex-wrap gap-3">
            {SESSION_TYPES[form.booking_type].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => onChange({ session_type: st })}
                className={cn(
                  "eyebrow border px-5 py-3 transition-colors duration-300",
                  form.session_type === st
                    ? "border-accent text-accent"
                    : "border-border text-foreground/60 hover:border-accent/50 hover:text-foreground",
                )}
              >
                {st}
              </button>
            ))}
          </div>
        </Reveal>
      )}

      <div className="mt-14">
        <button
          type="button"
          onClick={onNext}
          disabled={!form.booking_type || !form.session_type}
          className="eyebrow border border-accent px-10 py-4 text-accent transition-colors hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:border-border disabled:text-muted-foreground"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

function Step2({
  form,
  onChange,
  onNext,
  onBack,
}: {
  form: FormState;
  onChange: (patch: Partial<FormState>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const { data: institutions = [] } = useInstitutions();
  const isSchool = form.booking_type === "school";

  const canContinue =
    form.full_name.trim() &&
    form.phone.trim() &&
    (!isSchool || form.institution_id || form.institution_other.trim());

  return (
    <div>
      <Reveal>
        <h2 className="display text-5xl sm:text-7xl">Who are we shooting?</h2>
        <p className="mt-4 text-sm text-muted-foreground">Your contact details.</p>
      </Reveal>

      <Reveal delay={80} className="mt-12 grid gap-8 sm:grid-cols-2">
        <TextInput
          label="Full name"
          required
          value={form.full_name}
          onChange={(v) => onChange({ full_name: v })}
          placeholder="Your full name"
        />
        <TextInput
          label="Phone number"
          required
          type="tel"
          value={form.phone}
          onChange={(v) => onChange({ phone: v })}
          placeholder="0XX XXX XXXX"
        />
        <TextInput
          label="Email"
          type="email"
          value={form.email}
          onChange={(v) => onChange({ email: v })}
          placeholder="Optional"
          hint="For booking confirmation"
        />
        {isSchool && (
          <>
            <SelectInput
              label="Institution"
              required={!form.institution_other}
              value={form.institution_id}
              onChange={(v) => onChange({ institution_id: v, institution_other: "" })}
              options={institutions
                .filter((i) => i.active)
                .map((i) => ({ value: i.id, label: i.name }))}
              placeholder="Select your school…"
            />
            {!form.institution_id && (
              <TextInput
                label="School not listed? Enter name"
                value={form.institution_other}
                onChange={(v) => onChange({ institution_other: v })}
                placeholder="School / university name"
              />
            )}
            <SelectInput
              label="Year level"
              value={form.year_level}
              onChange={(v) => onChange({ year_level: v })}
              options={YEAR_LEVELS.map((l) => ({ value: l, label: l }))}
            />
            <TextInput
              label="Programme / course"
              value={form.programme}
              onChange={(v) => onChange({ programme: v })}
              placeholder="e.g. Computer Science"
            />
          </>
        )}
        <TextInput
          label="Number of people"
          type="number"
          value={form.number_of_people}
          onChange={(v) => onChange({ number_of_people: v })}
          placeholder="1"
          hint="Approximate headcount"
        />
      </Reveal>

      <div className="mt-14 flex gap-6">
        <button
          type="button"
          onClick={onBack}
          className="eyebrow border border-border px-10 py-4 text-foreground/60 transition-colors hover:border-accent/50 hover:text-foreground"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!canContinue}
          className="eyebrow border border-accent px-10 py-4 text-accent transition-colors hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:border-border disabled:text-muted-foreground"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

function Step3({
  form,
  onChange,
  onSubmit,
  onBack,
  submitting,
}: {
  form: FormState;
  onChange: (patch: Partial<FormState>) => void;
  onSubmit: () => void;
  onBack: () => void;
  submitting: boolean;
}) {
  return (
    <div>
      <Reveal>
        <h2 className="display text-5xl sm:text-7xl">The details.</h2>
        <p className="mt-4 text-sm text-muted-foreground">
          When, where and anything else we should know.
        </p>
      </Reveal>

      <Reveal delay={80} className="mt-12 grid gap-8 sm:grid-cols-2">
        <TextInput
          label="Preferred date"
          type="date"
          value={form.preferred_date}
          onChange={(v) => onChange({ preferred_date: v })}
        />
        <TextInput
          label="Preferred location"
          value={form.preferred_location}
          onChange={(v) => onChange({ preferred_location: v })}
          placeholder="Studio, campus, outdoors…"
        />
        <TextInput
          label="Reference image URL"
          value={form.reference_image_url}
          onChange={(v) => onChange({ reference_image_url: v })}
          placeholder="Pinterest, Instagram link…"
          hint="Paste a link to a photo that inspires your vision"
        />
        <div className="sm:col-span-2">
          <TextareaInput
            label="Additional notes"
            value={form.notes}
            onChange={(v) => onChange({ notes: v })}
            placeholder="Anything specific you want us to know — outfits, mood, special requests…"
            rows={4}
          />
        </div>
      </Reveal>

      <div className="mt-14 flex gap-6">
        <button
          type="button"
          onClick={onBack}
          className="eyebrow border border-border px-10 py-4 text-foreground/60 transition-colors hover:border-accent/50 hover:text-foreground"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={submitting}
          className="eyebrow border border-accent px-10 py-4 text-accent transition-colors hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Sending…" : "Submit booking"}
        </button>
      </div>
    </div>
  );
}

function Step4({ reference, form }: { reference: string; form: FormState }) {
  const { data: settings } = useSettings();
  const whatsapp = settings?.whatsapp ?? "0598416387";
  const wa = `https://wa.me/233${whatsapp.replace(/^0/, "")}`;

  return (
    <div>
      <Reveal>
        <span className="eyebrow text-accent">Booking received</span>
        <h2 className="display mt-4 text-5xl sm:text-7xl">
          We'll be in touch.
        </h2>
        <p className="mt-6 max-w-lg text-base leading-relaxed text-foreground/80">
          Your booking request has been submitted. We'll review it and reach out on{" "}
          <strong className="text-foreground">{form.phone}</strong>
          {form.email ? ` or ${form.email}` : ""} to confirm your session.
        </p>
      </Reveal>

      <Reveal delay={80} className="mt-10 border border-border p-6">
        <p className="eyebrow text-accent">Reference</p>
        <p className="display mt-2 text-3xl tracking-wider">{reference}</p>
        <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="eyebrow">Type</p>
            <p className="mt-1 capitalize text-foreground">{form.booking_type}</p>
          </div>
          <div>
            <p className="eyebrow">Session</p>
            <p className="mt-1 text-foreground">{form.session_type}</p>
          </div>
          <div>
            <p className="eyebrow">Name</p>
            <p className="mt-1 text-foreground">{form.full_name}</p>
          </div>
          <div>
            <p className="eyebrow">Phone</p>
            <p className="mt-1 text-foreground">{form.phone}</p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={140} className="mt-10 flex flex-wrap gap-5">
        <a
          href={wa}
          target="_blank"
          rel="noreferrer"
          className="eyebrow border border-accent px-8 py-4 text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          Chat on WhatsApp
        </a>
        <Link
          to="/"
          className="eyebrow border border-border px-8 py-4 text-foreground/60 transition-colors hover:border-accent/50 hover:text-foreground"
        >
          Back to gallery
        </Link>
      </Reveal>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function BookPage() {
  const { data: services = [] } = useServices();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reference, setReference] = useState<string>("");

  const patch = (update: Partial<FormState>) => setForm((prev) => ({ ...prev, ...update }));

  const submit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const payload = {
        booking_type: form.booking_type,
        session_type: form.session_type || null,
        full_name: form.full_name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim() || null,
        institution_id: form.institution_id || null,
        institution_other: form.institution_other.trim() || null,
        programme: form.programme.trim() || null,
        year_level: form.year_level || null,
        number_of_people: form.number_of_people ? parseInt(form.number_of_people, 10) : null,
        preferred_date: form.preferred_date || null,
        preferred_location: form.preferred_location.trim() || null,
        notes: form.notes.trim() || null,
        reference_image_url: form.reference_image_url.trim() || null,
        status: "pending",
      };

      const { data, error: dbError } = await supabase
        .from("bookings")
        .insert(payload)
        .select("reference")
        .single();

      if (dbError) throw dbError;
      setReference((data as { reference: string }).reference);
      setStep(4);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const totalSteps = 3;
  const activeServices = services.filter((s) => s.active);

  return (
    <>
      <section className="px-5 pt-40 pb-16 sm:px-8 sm:pt-56">
        <div className="mx-auto max-w-[1600px]">
          <h1 className="display text-[14vw] leading-[0.84] sm:text-[9vw]">Book a session</h1>
        </div>
      </section>

      <section className="px-5 pb-32 sm:px-8 sm:pb-48">
        <div className="mx-auto max-w-3xl">
          {step < 4 && (
            <div className="mb-14">
              <StepIndicator current={step} total={totalSteps} />
            </div>
          )}

          {step === 1 && <Step1 form={form} onChange={patch} onNext={() => setStep(2)} />}
          {step === 2 && (
            <Step2 form={form} onChange={patch} onNext={() => setStep(3)} onBack={() => setStep(1)} />
          )}
          {step === 3 && (
            <Step3
              form={form}
              onChange={patch}
              onSubmit={submit}
              onBack={() => setStep(2)}
              submitting={submitting}
            />
          )}
          {step === 4 && <Step4 reference={reference} form={form} />}

          {error && (
            <p className="mt-6 text-sm text-destructive">
              {error}
            </p>
          )}
        </div>
      </section>

      {activeServices.length > 0 && step < 4 && (
        <section className="border-t border-border px-5 py-20 sm:px-8">
          <div className="mx-auto max-w-[1600px]">
            <p className="eyebrow mb-8 text-foreground/60">Sessions available</p>
            <ul className="flex flex-wrap gap-6">
              {activeServices.map((service) => (
                <li key={service.id}>
                  <span className="eyebrow text-foreground">{service.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
