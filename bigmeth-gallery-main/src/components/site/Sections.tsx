import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";
import type { PortfolioImage, Service, Testimonial, VisualStory, SiteSettings } from "@/lib/db";

export function SectionHead({
  index,
  title,
  note,
}: {
  index: string;
  title: string;
  note?: string;
}) {
  return (
    <Reveal className="mb-12 flex flex-col gap-4 sm:mb-16">
      <div className="flex items-baseline gap-5">
        <span className="eyebrow text-accent">{index}</span>
        <div className="rule-line flex-1" />
      </div>
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
        <h2 className="display text-5xl sm:text-7xl lg:text-8xl">{title}</h2>
        {note && <p className="max-w-sm text-sm text-muted-foreground">{note}</p>}
      </div>
    </Reveal>
  );
}

export function Manifesto({ tagline }: { tagline: string }) {
  return (
    <section className="px-5 py-28 sm:px-8 sm:py-44">
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <p className="display text-[13vw] leading-[0.85] sm:text-[9vw]">
            It's not
            <br />
            just a photo.
          </p>
        </Reveal>
        <Reveal delay={140} className="mt-6 md:pl-[30%]">
          <p className="display text-[13vw] leading-[0.85] text-accent sm:text-[9vw]">
            It's a story.
          </p>
          <p className="eyebrow mt-8">{tagline}</p>
        </Reveal>
      </div>
    </section>
  );
}

export function FeaturedArtwork({ images }: { images: PortfolioImage[] }) {
  if (images.length === 0) return null;
  return (
    <div className="flex flex-col gap-24 sm:gap-40">
      {images.map((image, index) => (
        <Reveal key={image.id} as="figure" className="group">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:gap-14">
            <div className={index % 2 === 0 ? "md:order-1 md:w-2/3" : "md:order-2 md:w-2/3"}>
              <div className="overflow-hidden bg-surface">
                <img
                  src={image.image_url}
                  alt={image.alt_text ?? image.title}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03] md:aspect-[16/11]"
                />
              </div>
            </div>
            <figcaption
              className={
                index % 2 === 0 ? "md:order-2 md:w-1/3 md:pb-6" : "md:order-1 md:w-1/3 md:pb-6"
              }
            >
              <span className="eyebrow text-accent">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="display mt-3 text-4xl sm:text-5xl">{image.title}</h3>
              {image.description && (
                <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
                  {image.description}
                </p>
              )}
            </figcaption>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export function VisualStoryCard({ story, index }: { story: VisualStory; index: number }) {
  return (
    <Reveal delay={(index % 2) * 120}>
      <Link
        to="/stories/$slug"
        params={{ slug: story.slug }}
        data-cursor="Enter"
        className="group block"
      >
        <div className="overflow-hidden bg-surface">
          {story.cover_image ? (
            <img
              src={story.cover_image}
              alt={story.title}
              loading="lazy"
              decoding="async"
              className="aspect-[3/4] w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
            />
          ) : (
            <div className="flex aspect-[3/4] w-full items-center justify-center">
              <span className="eyebrow">No cover image</span>
            </div>
          )}
        </div>
        <div className="mt-5 flex items-baseline justify-between gap-4">
          <h3 className="display text-3xl transition-colors group-hover:text-accent sm:text-4xl">
            {story.title}
          </h3>
          <span className="eyebrow shrink-0">
            {story.story_date ? new Date(story.story_date).getFullYear() : ""}
          </span>
        </div>
        {story.location && <p className="eyebrow mt-2">{story.location}</p>}
      </Link>
    </Reveal>
  );
}

export function ArtistSection({ settings }: { settings: SiteSettings | null | undefined }) {
  return (
    <div className="grid grid-cols-12 items-center gap-8 lg:gap-16">
      <Reveal className="col-span-12 md:col-span-6">
        <div className="overflow-hidden bg-surface">
          {settings?.about_image ? (
            <img
              src={settings.about_image}
              alt="Portrait of the photographer behind BigMeth Photography"
              loading="lazy"
              decoding="async"
              className="aspect-[4/5] w-full object-cover"
            />
          ) : (
            <div className="flex aspect-[4/5] items-center justify-center">
              <span className="eyebrow">Artist portrait — add in dashboard</span>
            </div>
          )}
        </div>
      </Reveal>
      <Reveal delay={120} className="col-span-12 md:col-span-6">
        <h2 className="display text-6xl sm:text-8xl">{settings?.brand_name ?? "BIGMETH"}</h2>
        <ul className="mt-6 space-y-1">
          {["Photographer", "Videographer", "Visual storyteller"].map((role) => (
            <li key={role} className="eyebrow text-accent">
              {role}
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-lg text-base leading-relaxed text-foreground/80">
          {settings?.biography ?? "Add the artist biography from the admin dashboard."}
        </p>
        {settings?.philosophy && (
          <p className="mt-6 max-w-lg border-l border-accent pl-5 text-sm text-muted-foreground italic">
            {settings.philosophy}
          </p>
        )}
        <p className="eyebrow mt-8">{settings?.location ?? "Ghana"}</p>
      </Reveal>
    </div>
  );
}

export function ServiceSection({ services }: { services: Service[] }) {
  if (services.length === 0) return null;
  return (
    <ul className="divide-y divide-border border-y border-border">
      {services.map((service, index) => (
        <Reveal as="li" key={service.id} delay={(index % 3) * 70}>
          <div className="group grid grid-cols-12 items-center gap-4 py-7">
            <span className="eyebrow col-span-2 sm:col-span-1">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="display col-span-10 text-2xl transition-colors group-hover:text-accent sm:col-span-4 sm:text-3xl">
              {service.title}
            </h3>
            <p className="col-span-12 text-sm text-muted-foreground sm:col-span-5">
              {service.description}
            </p>
            <div className="col-span-12 sm:col-span-2">
              {service.image_url && (
                <img
                  src={service.image_url}
                  alt={service.title}
                  loading="lazy"
                  className="h-20 w-full object-cover opacity-60 transition-opacity duration-700 group-hover:opacity-100 sm:h-16"
                />
              )}
            </div>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}

export function TestimonialSection({ testimonials }: { testimonials: Testimonial[] }) {
  if (testimonials.length === 0) return null;
  return (
    <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
      {testimonials.map((testimonial, index) => (
        <Reveal key={testimonial.id} delay={(index % 3) * 90}>
          <blockquote className="border-t border-border pt-6">
            <p className="text-base leading-relaxed text-foreground/85">"{testimonial.quote}"</p>
            <footer className="eyebrow mt-5">
              {testimonial.client_name}
              {testimonial.institution ? ` — ${testimonial.institution}` : ""}
            </footer>
          </blockquote>
        </Reveal>
      ))}
    </div>
  );
}

export function ContactCTA({ settings }: { settings: SiteSettings | null | undefined }) {
  const whatsapp = settings?.whatsapp ?? "0598416387";
  const secondary = settings?.whatsapp_secondary;
  const instagram = settings?.instagram_url ?? "https://instagram.com/the_bigmeth";
  const wa = (number: string) => `https://wa.me/233${number.replace(/^0/, "")}`;

  return (
    <section className="px-5 py-28 sm:px-8 sm:py-40">
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <h2 className="display text-[14vw] leading-[0.84] sm:text-[10vw]">
            Ready to
            <br />
            create your
            <br />
            <span className="text-accent">story?</span>
          </h2>
        </Reveal>
        <Reveal delay={120} className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-5">
          <Link
            to="/book"
            data-cursor="Enter"
            className="eyebrow border border-accent px-8 py-4 text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Book a session
          </Link>
          <a href={wa(whatsapp)} target="_blank" rel="noreferrer" className="eyebrow hover:text-accent">
            WhatsApp {whatsapp}
          </a>
          {secondary && (
            <a href={wa(secondary)} target="_blank" rel="noreferrer" className="eyebrow hover:text-accent">
              WhatsApp {secondary}
            </a>
          )}
          <a href={`tel:${whatsapp}`} className="eyebrow hover:text-accent">
            Call
          </a>
          <a href={instagram} target="_blank" rel="noreferrer" className="eyebrow hover:text-accent">
            Instagram
          </a>
          {settings?.email && (
            <a href={`mailto:${settings.email}`} className="eyebrow hover:text-accent">
              Email
            </a>
          )}
        </Reveal>
      </div>
    </section>
  );
}
