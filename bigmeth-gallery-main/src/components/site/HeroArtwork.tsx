import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function HeroArtwork({
  imageUrl,
  alt,
  caption,
  category,
  children,
  objectPosition = "center",
  height = "h-[100svh]",
  parallax = true,
}: {
  imageUrl?: string | null;
  alt: string;
  caption?: string | null;
  category?: string | null;
  children?: ReactNode;
  objectPosition?: string;
  height?: string;
  parallax?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (!parallax) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const node = ref.current;
        if (!node) return;
        const rect = node.getBoundingClientRect();
        setOffset(Math.max(-80, Math.min(80, -rect.top * 0.12)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [parallax]);

  return (
    <section ref={ref} className={cn("relative w-full overflow-hidden bg-background", height)}>
      <div className="absolute inset-0" style={{ transform: `translate3d(0, ${offset}px, 0)` }}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={alt}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover"
            style={{ objectPosition }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-surface">
            <p className="eyebrow">Hero image not set — add one in the dashboard</p>
          </div>
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/15 to-black/85" />

      <div className="relative flex min-h-inherit h-full w-full items-end">
        <div className="mx-auto w-full max-w-[1600px] px-5 pt-32 pb-14 sm:px-8 sm:pb-20">
          {(category || caption) && (
            <div className="mb-6 flex flex-wrap items-center gap-4">
              {category && <span className="eyebrow text-accent">{category}</span>}
              {caption && <span className="text-xs text-foreground/60">{caption}</span>}
            </div>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
