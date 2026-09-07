import { createFileRoute, Link } from "@tanstack/react-router";
import { HeroArtwork } from "@/components/site/HeroArtwork";
import { EditorialGallery } from "@/components/site/EditorialGallery";
import { Reveal } from "@/components/site/Reveal";
import {
  ArtistSection,
  ContactCTA,
  FeaturedArtwork,
  Manifesto,
  SectionHead,
  ServiceSection,
  TestimonialSection,
  VisualStoryCard,
} from "@/components/site/Sections";
import {
  useCategories,
  usePortfolio,
  useServices,
  useSettings,
  useStories,
  useTestimonials,
} from "@/lib/db";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BigMeth Photography — A Visual Story Untold" },
      {
        name: "description",
        content:
          "An immersive gallery of portraiture, editorial and cinematic photography by BigMeth, a Ghanaian photographer and videographer.",
      },
      { property: "og:title", content: "BigMeth Photography — A Visual Story Untold" },
      {
        property: "og:description",
        content: "Portraiture, editorial and cinematic visual stories from Ghana.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const { data: settings } = useSettings();
  const { data: images = [] } = usePortfolio();
  const { data: categories = [] } = useCategories();
  const { data: stories = [] } = useStories();
  const { data: services = [] } = useServices();
  const { data: testimonials = [] } = useTestimonials();

  const hero = images.find((image) => image.is_hero) ?? images[0];
  const featured = images.filter((image) => image.featured).slice(0, 5);
  const gallery = images.slice(0, 9);

  return (
    <>
      <HeroArtwork
        imageUrl={settings?.hero_image ?? hero?.image_url}
        alt={hero?.alt_text ?? "Featured photograph by BigMeth Photography"}
      >
        <h1 className="display text-[13vw] leading-[0.82] sm:text-[10vw] lg:text-[8vw]">
          Bigmeth
        </h1>
        <div className="mt-6 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <p className="display text-2xl leading-[0.95] sm:text-4xl">
            A visual
            <br />
            story untold.
          </p>
          <div className="flex flex-wrap items-center gap-8">
            <Link
              to="/work"
              data-cursor="Enter"
              className="eyebrow border border-foreground/60 px-8 py-4 text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              Enter the gallery
            </Link>
            <span className="eyebrow hidden sm:block">Scroll to explore</span>
          </div>
        </div>
      </HeroArtwork>

      <Manifesto tagline={settings?.tagline ?? "A visual story untold."} />

      {featured.length > 0 && (
        <section className="px-5 sm:px-8">
          <div className="mx-auto max-w-[1600px]">
            <SectionHead
              index="01"
              title="Featured"
              note="A selection of frames that define the work."
            />
            <FeaturedArtwork images={featured} />
          </div>
        </section>
      )}

      <section className="px-5 py-28 sm:px-8 sm:py-40">
        <div className="mx-auto max-w-[1600px]">
          <SectionHead index="02" title="The Collection" note="Browse by collection." />
          <EditorialGallery images={gallery} categories={categories} />
          <Reveal className="mt-14">
            <Link to="/work" className="eyebrow border-b border-accent pb-1 text-accent">
              View the full collection
            </Link>
          </Reveal>
        </div>
      </section>

      {stories.length > 0 && (
        <section className="px-5 pb-28 sm:px-8 sm:pb-40">
          <div className="mx-auto max-w-[1600px]">
            <SectionHead
              index="03"
              title="Visual Stories"
              note="Projects photographed as complete narratives."
            />
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {stories.slice(0, 3).map((story, index) => (
                <VisualStoryCard key={story.id} story={story} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="px-5 pb-28 sm:px-8 sm:pb-40">
        <div className="mx-auto max-w-[1600px]">
          <SectionHead index="04" title="The Artist" />
          <ArtistSection settings={settings} />
        </div>
      </section>

      <section className="px-5 pb-28 sm:px-8 sm:pb-40">
        <div className="mx-auto max-w-[1600px]">
          <SectionHead index="05" title="Sessions" />
          <ServiceSection services={services} />
        </div>
      </section>

      {testimonials.length > 0 && (
        <section className="px-5 pb-28 sm:px-8 sm:pb-40">
          <div className="mx-auto max-w-[1600px]">
            <SectionHead index="06" title="In Their Words" />
            <TestimonialSection testimonials={testimonials} />
          </div>
        </section>
      )}

      <ContactCTA settings={settings} />
    </>
  );
}
