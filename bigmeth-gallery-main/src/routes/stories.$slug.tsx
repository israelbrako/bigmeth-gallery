import { createFileRoute, Link } from "@tanstack/react-router";
import { HeroArtwork } from "@/components/site/HeroArtwork";
import { Reveal } from "@/components/site/Reveal";
import { ContactCTA } from "@/components/site/Sections";
import { useSettings, useStory } from "@/lib/db";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/stories/$slug")({
  head: () => ({
    meta: [
      { title: "Visual Story — BigMeth Photography" },
      {
        name: "description",
        content: "An immersive photographic story by BigMeth Photography.",
      },
      { property: "og:title", content: "Visual Story — BigMeth Photography" },
      {
        property: "og:description",
        content: "An immersive photographic story by BigMeth Photography.",
      },
    ],
  }),
  component: StoryPage,
});

const LAYOUTS: Record<string, string> = {
  full: "col-span-12",
  large: "col-span-12 md:col-span-10 md:col-start-2",
  half: "col-span-12 md:col-span-6",
  portrait: "col-span-12 md:col-span-5 md:col-start-4",
};

function StoryPage() {
  const { slug } = Route.useParams();
  const { data, isLoading } = useStory(slug);
  const { data: settings } = useSettings();

  if (isLoading) {
    return <div className="min-h-screen animate-pulse bg-surface" />;
  }

  if (!data?.story) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6">
        <h1 className="display text-5xl">Story not found</h1>
        <Link to="/stories" className="eyebrow border-b border-accent pb-1 text-accent">
          All visual stories
        </Link>
      </div>
    );
  }

  const { story, images } = data;

  return (
    <>
      <HeroArtwork
        imageUrl={story.cover_image}
        alt={story.title}
        category={story.category}
        caption={story.location}
      >
        <h1 className="display text-[14vw] leading-[0.84] sm:text-[9vw]">{story.title}</h1>
        <div className="mt-6 flex flex-wrap gap-x-10 gap-y-2">
          {story.location && <span className="eyebrow">{story.location}</span>}
          {story.story_date && (
            <span className="eyebrow">
              {new Date(story.story_date).toLocaleDateString(undefined, {
                month: "long",
                year: "numeric",
              })}
            </span>
          )}
        </div>
      </HeroArtwork>

      {story.description && (
        <section className="px-5 py-24 sm:px-8 sm:py-36">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <p className="text-xl leading-relaxed text-foreground/85 sm:text-2xl">
                {story.description}
              </p>
            </Reveal>
          </div>
        </section>
      )}

      <section className="px-5 pb-24 sm:px-8 sm:pb-36">
        <div className="mx-auto grid max-w-[1600px] grid-cols-12 gap-6 sm:gap-10">
          {images.map((image, index) => (
            <Reveal
              as="figure"
              key={image.id}
              className={cn(LAYOUTS[image.layout] ?? LAYOUTS["full"])}
              delay={(index % 2) * 90}
            >
              <img
                src={image.image_url}
                alt={image.caption ?? `${story.title} — frame ${index + 1}`}
                loading="lazy"
                decoding="async"
                className="w-full object-cover"
              />
              {image.caption && <figcaption className="eyebrow mt-3">{image.caption}</figcaption>}
            </Reveal>
          ))}
        </div>
      </section>

      {story.notes && (
        <section className="px-5 pb-28 sm:px-8 sm:pb-40">
          <div className="mx-auto max-w-2xl border-t border-border pt-10">
            <p className="eyebrow mb-4 text-accent">Photographer's notes</p>
            <p className="text-base leading-relaxed text-foreground/80">{story.notes}</p>
          </div>
        </section>
      )}

      <ContactCTA settings={settings} />
    </>
  );
}
