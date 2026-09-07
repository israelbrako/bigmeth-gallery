import { createFileRoute } from "@tanstack/react-router";
import { ArtistSection, ContactCTA, Manifesto, SectionHead, ServiceSection } from "@/components/site/Sections";
import { useServices, useSettings } from "@/lib/db";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "The Artist — BigMeth Photography" },
      {
        name: "description",
        content:
          "Behind the lens with BigMeth — a Ghanaian photographer, videographer and visual storyteller.",
      },
      { property: "og:title", content: "The Artist — BigMeth Photography" },
      {
        property: "og:description",
        content: "Behind the lens with BigMeth, Ghanaian photographer and videographer.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { data: settings } = useSettings();
  const { data: services = [] } = useServices();

  return (
    <>
      <section className="px-5 pt-40 pb-20 sm:px-8 sm:pt-56">
        <div className="mx-auto max-w-[1600px]">
          <h1 className="display text-[16vw] leading-[0.84] sm:text-[11vw]">Behind the lens</h1>
        </div>
      </section>

      <section className="px-5 pb-28 sm:px-8 sm:pb-40">
        <div className="mx-auto max-w-[1600px]">
          <ArtistSection settings={settings} />
        </div>
      </section>

      <Manifesto tagline={settings?.tagline ?? "A visual story untold."} />

      <section className="px-5 pb-28 sm:px-8 sm:pb-40">
        <div className="mx-auto max-w-[1600px]">
          <SectionHead index="01" title="Sessions" />
          <ServiceSection services={services} />
        </div>
      </section>

      <ContactCTA settings={settings} />
    </>
  );
}
