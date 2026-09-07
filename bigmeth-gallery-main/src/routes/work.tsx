import { createFileRoute } from "@tanstack/react-router";
import { EditorialGallery } from "@/components/site/EditorialGallery";
import { ContactCTA } from "@/components/site/Sections";
import { useCategories, usePortfolio, useSettings } from "@/lib/db";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "The Collection — BigMeth Photography" },
      {
        name: "description",
        content:
          "The full collection of photographs by BigMeth: portraiture, events, creative, commercial, couples, fashion and lifestyle work.",
      },
      { property: "og:title", content: "The Collection — BigMeth Photography" },
      {
        property: "og:description",
        content: "Browse the full photographic collection by BigMeth Photography.",
      },
    ],
  }),
  component: WorkPage,
});

function WorkPage() {
  const { data: images = [], isLoading } = usePortfolio();
  const { data: categories = [] } = useCategories();
  const { data: settings } = useSettings();

  return (
    <>
      <section className="px-5 pt-40 pb-16 sm:px-8 sm:pt-56">
        <div className="mx-auto max-w-[1600px]">
          <h1 className="display text-[16vw] leading-[0.84] sm:text-[11vw]">The Collection</h1>
          <p className="eyebrow mt-6">
            {images.length} {images.length === 1 ? "photograph" : "photographs"}
          </p>
        </div>
      </section>

      <section className="px-5 pb-32 sm:px-8 sm:pb-48">
        <div className="mx-auto max-w-[1600px]">
          {isLoading ? (
            <div className="grid grid-cols-12 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="col-span-12 aspect-[4/5] animate-pulse bg-surface md:col-span-6"
                />
              ))}
            </div>
          ) : (
            <EditorialGallery images={images} categories={categories} />
          )}
        </div>
      </section>

      <ContactCTA settings={settings} />
    </>
  );
}
