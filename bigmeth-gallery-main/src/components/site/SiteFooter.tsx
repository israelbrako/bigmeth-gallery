import { Link } from "@tanstack/react-router";
import { useSettings } from "@/lib/db";

export function SiteFooter() {
  const { data: settings } = useSettings();
  const whatsapp = settings?.whatsapp ?? "0598416387";
  const instagram = settings?.instagram_url ?? "https://instagram.com/the_bigmeth";
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="display text-6xl sm:text-8xl">{settings?.brand_name ?? "BIGMETH"}</p>
            <p className="eyebrow mt-4 text-accent">
              {settings?.tagline ?? "A visual story untold."}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-12 gap-y-3">
            <Link to="/work" className="eyebrow hover:text-accent">
              Work
            </Link>
            <a
              href={instagram}
              target="_blank"
              rel="noreferrer"
              className="eyebrow hover:text-accent"
            >
              Instagram
            </a>
            <Link to="/stories" className="eyebrow hover:text-accent">
              Stories
            </Link>
            <a
              href={`https://wa.me/233${whatsapp.replace(/^0/, "")}`}
              target="_blank"
              rel="noreferrer"
              className="eyebrow hover:text-accent"
            >
              WhatsApp
            </a>
            <Link to="/about" className="eyebrow hover:text-accent">
              About
            </Link>
            <a href={`tel:${whatsapp}`} className="eyebrow hover:text-accent">
              {whatsapp}
            </a>
            <Link to="/book" className="eyebrow hover:text-accent">
              Book
            </Link>
            {settings?.email && (
              <a href={`mailto:${settings.email}`} className="eyebrow hover:text-accent">
                Email
              </a>
            )}
          </div>
        </div>
        <div className="mt-14 flex flex-col justify-between gap-3 border-t border-border pt-6 text-[11px] tracking-[0.22em] text-muted-foreground uppercase sm:flex-row">
          <span>
            {settings?.footer_text ?? "© BIGMETH PHOTOGRAPHY"} — {year}
          </span>
          <span>{settings?.location ?? "Ghana"}</span>
        </div>
      </div>
    </footer>
  );
}
