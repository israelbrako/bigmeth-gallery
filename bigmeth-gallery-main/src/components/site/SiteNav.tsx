import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useSettings } from "@/lib/db";
import { cn } from "@/lib/utils";

const LINKS = [
  { to: "/work", label: "Work" },
  { to: "/stories", label: "Stories" },
  { to: "/about", label: "About" },
  { to: "/book", label: "Book" },
] as const;

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { data: settings } = useSettings();
  const instagram = settings?.instagram_url ?? "https://instagram.com/the_bigmeth";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-background/80 py-3 backdrop-blur-md"
            : "bg-gradient-to-b from-black/60 to-transparent py-6",
        )}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex max-w-[1600px] items-center justify-between px-5 sm:px-8"
        >
          <Link
            to="/"
            data-cursor="Enter"
            className="display text-xl tracking-[0.14em] sm:text-2xl"
            onClick={() => setOpen(false)}
          >
            Bigmeth
          </Link>

          <div className="hidden items-center gap-9 md:flex">
            {LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                data-cursor="Open"
                className="eyebrow text-foreground/75 transition-colors hover:text-accent"
                activeProps={{ className: "text-accent" }}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={instagram}
              target="_blank"
              rel="noreferrer"
              data-cursor="Open"
              className="eyebrow text-foreground/50 transition-colors hover:text-accent"
            >
              Instagram
            </a>
          </div>

          <button
            type="button"
            className="eyebrow text-foreground md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </nav>
      </header>

      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-0 z-40 flex flex-col justify-center gap-2 bg-background px-6 md:hidden"
      >
        {LINKS.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            onClick={() => setOpen(false)}
            className="display border-b border-border py-4 text-5xl text-foreground"
          >
            {link.label}
          </Link>
        ))}
        <a
          href={instagram}
          target="_blank"
          rel="noreferrer"
          className="eyebrow mt-8 text-accent"
          onClick={() => setOpen(false)}
        >
          Instagram — @the_bigmeth
        </a>
      </div>
    </>
  );
}
