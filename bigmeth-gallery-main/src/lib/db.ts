import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  sort_order: number;
  active: boolean;
};

export type PortfolioImage = {
  id: string;
  title: string;
  description: string | null;
  category_id: string | null;
  image_url: string;
  alt_text: string | null;
  orientation: string;
  featured: boolean;
  is_hero: boolean;
  published: boolean;
  sort_order: number;
  created_at: string;
};

export type VisualStory = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  cover_image: string | null;
  category: string | null;
  story_date: string | null;
  location: string | null;
  notes: string | null;
  published: boolean;
  sort_order: number;
};

export type StoryImage = {
  id: string;
  story_id: string;
  image_url: string;
  caption: string | null;
  layout: string;
  sort_order: number;
};

export type Service = {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  active: boolean;
  sort_order: number;
};

export type Institution = {
  id: string;
  name: string;
  short_name: string | null;
  active: boolean;
  sort_order: number;
};

export type Testimonial = {
  id: string;
  client_name: string;
  quote: string;
  image_url: string | null;
  service: string | null;
  institution: string | null;
  published: boolean;
  sort_order: number;
};

export type Booking = {
  id: string;
  reference: string;
  booking_type: string;
  full_name: string;
  phone: string;
  email: string | null;
  institution_id: string | null;
  institution_other: string | null;
  programme: string | null;
  year_level: string | null;
  preferred_date: string | null;
  preferred_location: string | null;
  session_type: string | null;
  number_of_people: number | null;
  notes: string | null;
  reference_image_url: string | null;
  status: string;
  created_at: string;
};

export type SiteSettings = {
  id: number;
  brand_name: string;
  tagline: string;
  biography: string | null;
  philosophy: string | null;
  phone: string | null;
  whatsapp: string | null;
  whatsapp_secondary: string | null;
  email: string | null;
  instagram_url: string | null;
  location: string | null;
  hero_image: string | null;
  about_image: string | null;
  footer_text: string | null;
};

const table = (name: string) => supabase.from(name as never);

async function list<T>(name: string, order: string, ascending = true): Promise<T[]> {
  const { data, error } = await table(name).select("*").order(order, { ascending });
  if (error) throw error;
  return (data ?? []) as unknown as T[];
}

export const useSettings = () =>
  useQuery({
    queryKey: ["site_settings"],
    queryFn: async (): Promise<SiteSettings | null> => {
      const { data, error } = await supabase.from("site_settings").select("*").maybeSingle();
      if (error) throw error;
      return data as unknown as SiteSettings | null;
    },
    staleTime: 60_000,
  });

export const useCategories = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: () => list<Category>("categories", "sort_order"),
    staleTime: 60_000,
  });

export const usePortfolio = () =>
  useQuery({
    queryKey: ["portfolio_images"],
    queryFn: () => list<PortfolioImage>("portfolio_images", "sort_order"),
    staleTime: 30_000,
  });

export const useStories = () =>
  useQuery({
    queryKey: ["visual_stories"],
    queryFn: () => list<VisualStory>("visual_stories", "sort_order"),
    staleTime: 30_000,
  });

export const useServices = () =>
  useQuery({
    queryKey: ["services"],
    queryFn: () => list<Service>("services", "sort_order"),
    staleTime: 60_000,
  });

export const useInstitutions = () =>
  useQuery({
    queryKey: ["institutions"],
    queryFn: () => list<Institution>("institutions", "sort_order"),
    staleTime: 60_000,
  });

export const useTestimonials = () =>
  useQuery({
    queryKey: ["testimonials"],
    queryFn: () => list<Testimonial>("testimonials", "sort_order"),
    staleTime: 60_000,
  });

export const useStory = (slug: string) =>
  useQuery({
    queryKey: ["visual_story", slug],
    queryFn: async () => {
      const { data: story, error } = await supabase
        .from("visual_stories")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();
      if (error) throw error;
      if (!story) return null;
      const { data: images, error: imgError } = await supabase
        .from("story_images")
        .select("*")
        .eq("story_id", (story as unknown as VisualStory).id)
        .order("sort_order");
      if (imgError) throw imgError;
      return {
        story: story as unknown as VisualStory,
        images: (images ?? []) as unknown as StoryImage[],
      };
    },
  });

export const useBookings = () =>
  useQuery({
    queryKey: ["bookings"],
    queryFn: () => list<Booking>("bookings", "created_at", false),
  });

export const useIsAdmin = () =>
  useQuery({
    queryKey: ["is_admin"],
    queryFn: async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return false;
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userData.user.id)
        .eq("role", "admin")
        .maybeSingle();
      if (error) return false;
      return !!data;
    },
  });
