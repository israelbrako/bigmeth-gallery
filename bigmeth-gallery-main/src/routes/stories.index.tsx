import { createFileRoute } from "@tanstack/react-router";
import { VisualStoryCard, ContactCTA } from "@/components/site/Sections";
import { useSettings, useStories } from "@/lib/db";

export const Route = createFileRoute("/stories/")({
  head: () => ({
    meta: [
      { title: "Visual Stories — BigMeth Photography" },
      {
        name: "description",
        content:
          "Immersive photographic projects by BigMeth Photography — each one a complete visual story.",
      },
      { property: "og:title", content: "Visual Stories — BigMeth Photography" },
      {
        property: "og:description",
        content: "Immersive photographic projects, photographed as complete narratives.",
      },
    ],
  }),
  component: StoriesPage,
});

function StoriesPage() {
  const { data: stories = [], isLoading } = useStories();
  const { data: settings } = useSettings();

  return (
    <>
      <section className="px-5 pt-40 pb-16 sm:px-8 sm:pt-56">
        <div className="mx-auto max-w-[1600px]">
          <h1 className="display text-[16vw] leading-[0.84] sm:text-[11vw]">Visual Stories</h1>
          <p className="mt-8 max-w-md text-sm text-muted-foreground">
            A visual story is more than a single photograph — it is a sequence, a place, a day
            and the people inside it.
          </p>
        </div>
      </section>

      <section className="px-5 pb-32 sm:px-8 sm:pb-48">
        <div className="mx-auto max-w-[1600px]">
          {isLoading ? (
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="aspect-[3/4] animate-pulse bg-surface" />
              ))}
            </div>
          ) : stories.length === 0 ? (
            <p className="border-t border-border pt-8 text-sm text-muted-foreground">
              No visual stories published yet. Stories added in the dashboard appear here.
            </p>
          ) : (
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {stories.map((story, index) => (
                <VisualStoryCard key={story.id} story={story} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      <ContactCTA settings={settings} />
    </>
  );
}
