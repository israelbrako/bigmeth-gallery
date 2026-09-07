import { useMemo, useState } from "react";
import { Reveal } from "./Reveal";
import { ArtworkLightbox } from "./ArtworkLightbox";
import type { Category, PortfolioImage } from "@/lib/db";
import { cn } from "@/lib/utils";

/** Editorial rhythm: repeating composition of varied visual weights. */
const RHYTHM = [
  "col-span-12 md:col-span-7 aspect-[4/5]",
  "col-span-12 md:col-span-5 aspect-[4/5] md:aspect-[3/4] md:mt-24",
  "col-span-12 md:col-span-12 aspect-[16/10]",
  "col-span-12 md:col-span-5 aspect-[3/4]",
  "col-span-12 md:col-span-7 aspect-[4/5] md:aspect-[4/3] md:mt-20",
  "col-span-12 md:col-span-6 aspect-[3/4]",
  "col-span-12 md:col-span-6 aspect-[3/4] md:mt-16",
];

export function ArtworkCard({
  image,
  index,
  categoryName,
  className,
  onOpen,
}: {
  image: PortfolioImage;
  index: number;
  categoryName?: string | undefined;
  className?: string | undefined;
  onOpen: () => void;
}) {
  return (
    <Reveal className={cn("group", className)} delay={(index % 3) * 90}>
      <button
        type="button"
        onClick={onOpen}
        data-cursor="View"
        aria-label={`Open ${image.title}`}
        className="relative block h-full w-full overflow-hidden bg-surface text-left"
      >
        <img
          src={image.image_url}
          alt={image.alt_text ?? image.title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.045]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100 group-focus-visible:opacity-100" />
        <div className="pointer-events-none absolute right-5 bottom-5 left-5 translate-y-3 opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
          <p className="display text-lg">{image.title}</p>
          {categoryName && <p className="eyebrow mt-1 text-accent">{categoryName}</p>}
        </div>
        <span className="absolute top-4 left-4 text-[11px] tracking-[0.24em] text-foreground/45">
          {String(index + 1).padStart(2, "0")}
        </span>
      </button>
    </Reveal>
  );
}

export function CollectionFilter({
  categories,
  active,
  onChange,
  counts,
}: {
  categories: Category[];
  active: string;
  onChange: (slug: string) => void;
  counts: Record<string, number>;
}) {
  return (
    <div
      role="tablist"
      aria-label="Collections"
      className="flex flex-wrap items-center gap-x-7 gap-y-3"
    >
      {[{ id: "all", name: "All", slug: "all" } as Partial<Category>, ...categories]
        .filter((category) => category.slug === "all" || (counts[category.slug!] ?? 0) > 0)
        .map((category) => {
          const slug = category.slug!;
          const selected = active === slug;
          return (
            <button
              key={slug}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => onChange(slug)}
              className={cn(
                "eyebrow pb-1 transition-colors",
                selected
                  ? "border-b border-accent text-accent"
                  : "border-b border-transparent text-foreground/60 hover:text-foreground",
              )}
            >
              {category.name}
            </button>
          );
        })}
    </div>
  );
}

export function EditorialGallery({
  images,
  categories,
  showFilter = true,
}: {
  images: PortfolioImage[];
  categories: Category[];
  showFilter?: boolean;
}) {
  const [active, setActive] = useState("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const categoryBySlug = useMemo(
    () => Object.fromEntries(categories.map((category) => [category.slug, category])),
    [categories],
  );
  const categoryById = useMemo(
    () => Object.fromEntries(categories.map((category) => [category.id, category])),
    [categories],
  );

  const counts = useMemo(() => {
    const result: Record<string, number> = {};
    images.forEach((image) => {
      const slug = image.category_id ? categoryById[image.category_id]?.slug : undefined;
      if (slug) result[slug] = (result[slug] ?? 0) + 1;
    });
    return result;
  }, [images, categoryById]);

  const visible = useMemo(() => {
    if (active === "all") return images;
    const categoryId = categoryBySlug[active]?.id;
    return images.filter((image) => image.category_id === categoryId);
  }, [images, active, categoryBySlug]);

  return (
    <div>
      {showFilter && categories.length > 0 && (
        <div className="mb-12">
          <CollectionFilter
            categories={categories}
            active={active}
            onChange={setActive}
            counts={counts}
          />
        </div>
      )}

      {visible.length === 0 ? (
        <p className="py-20 text-center text-sm text-muted-foreground">
          No photographs in this collection yet.
        </p>
      ) : (
        <div className="grid grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
          {visible.map((image, index) => (
            <ArtworkCard
              key={image.id}
              image={image}
              index={index}
              categoryName={
                image.category_id ? categoryById[image.category_id]?.name : undefined
              }
              className={RHYTHM[index % RHYTHM.length]}
              onOpen={() => setOpenIndex(index)}
            />
          ))}
        </div>
      )}

      {openIndex !== null && (
        <ArtworkLightbox
          images={visible}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onIndexChange={setOpenIndex}
          categoryName={(image) =>
            image.category_id ? categoryById[image.category_id]?.name : undefined
          }
        />
      )}
    </div>
  );
}
