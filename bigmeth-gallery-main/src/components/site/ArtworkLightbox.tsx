import { useCallback, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { PortfolioImage } from "@/lib/db";

export function ArtworkLightbox({
  images,
  index,
  onClose,
  onIndexChange,
  categoryName,
}: {
  images: PortfolioImage[];
  index: number;
  onClose: () => void;
  onIndexChange: (next: number) => void;
  categoryName?: (image: PortfolioImage) => string | undefined;
}) {
  const touchStart = useRef<number | null>(null);
  const image = images[index];

  const next = useCallback(
    () => onIndexChange((index + 1) % images.length),
    [index, images.length, onIndexChange],
  );
  const prev = useCallback(
    () => onIndexChange((index - 1 + images.length) % images.length),
    [index, images.length, onIndexChange],
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [next, prev, onClose]);

  if (!image) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${image.title}, artwork ${index + 1} of ${images.length}`}
      className="fixed inset-0 z-[80] flex flex-col bg-[oklch(0.115_0_0)]"
      onTouchStart={(event) => {
        touchStart.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        const start = touchStart.current;
        const end = event.changedTouches[0]?.clientX ?? null;
        if (start == null || end == null) return;
        if (start - end > 60) next();
        if (end - start > 60) prev();
      }}
    >
      <div className="flex items-center justify-between px-5 py-4 sm:px-8">
        <span className="eyebrow text-accent">
          {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close artwork"
          className="flex h-11 w-11 items-center justify-center text-foreground/70 hover:text-accent"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-16">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous artwork"
          className="absolute left-1 z-10 hidden h-12 w-12 items-center justify-center text-foreground/60 hover:text-accent sm:flex"
        >
          <ChevronLeft className="h-7 w-7" />
        </button>
        <img
          src={image.image_url}
          alt={image.alt_text ?? image.title}
          className="max-h-full max-w-full object-contain"
        />
        <button
          type="button"
          onClick={next}
          aria-label="Next artwork"
          className="absolute right-1 z-10 hidden h-12 w-12 items-center justify-center text-foreground/60 hover:text-accent sm:flex"
        >
          <ChevronRight className="h-7 w-7" />
        </button>
      </div>

      <div className="px-5 py-6 sm:px-8 sm:py-8">
        <div className="mx-auto flex max-w-4xl flex-col gap-2 text-center">
          <h2 className="display text-2xl sm:text-3xl">{image.title}</h2>
          {categoryName?.(image) && <p className="eyebrow">{categoryName(image)}</p>}
          {image.description && (
            <p className="text-sm text-muted-foreground">{image.description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
