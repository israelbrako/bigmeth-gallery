
CREATE TYPE public.app_role AS ENUM ('admin');

CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  full_name text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own profile" ON public.profiles FOR ALL TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "read own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "admins manage roles" ON public.user_roles FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data ->> 'full_name')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END; $$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- categories / collections
CREATE TABLE public.categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  sort_order int NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.categories TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.categories TO authenticated;
GRANT ALL ON public.categories TO service_role;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read categories" ON public.categories FOR SELECT USING (active = true);
CREATE POLICY "admins manage categories" ON public.categories FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.portfolio_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  category_id uuid REFERENCES public.categories(id) ON DELETE SET NULL,
  image_url text NOT NULL,
  alt_text text,
  orientation text NOT NULL DEFAULT 'portrait',
  featured boolean NOT NULL DEFAULT false,
  is_hero boolean NOT NULL DEFAULT false,
  published boolean NOT NULL DEFAULT true,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.portfolio_images TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.portfolio_images TO authenticated;
GRANT ALL ON public.portfolio_images TO service_role;
ALTER TABLE public.portfolio_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read images" ON public.portfolio_images FOR SELECT USING (published = true);
CREATE POLICY "admins read all images" ON public.portfolio_images FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admins manage images" ON public.portfolio_images FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.visual_stories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  cover_image text,
  category text,
  story_date date,
  location text,
  notes text,
  published boolean NOT NULL DEFAULT false,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.visual_stories TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.visual_stories TO authenticated;
GRANT ALL ON public.visual_stories TO service_role;
ALTER TABLE public.visual_stories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read stories" ON public.visual_stories FOR SELECT USING (published = true);
CREATE POLICY "admins read all stories" ON public.visual_stories FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admins manage stories" ON public.visual_stories FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.story_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  story_id uuid NOT NULL REFERENCES public.visual_stories(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  caption text,
  layout text NOT NULL DEFAULT 'full',
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.story_images TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.story_images TO authenticated;
GRANT ALL ON public.story_images TO service_role;
ALTER TABLE public.story_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read story images" ON public.story_images FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.visual_stories s WHERE s.id = story_id AND s.published = true)
);
CREATE POLICY "admins manage story images" ON public.story_images FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  image_url text,
  active boolean NOT NULL DEFAULT true,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.services TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.services TO authenticated;
GRANT ALL ON public.services TO service_role;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read services" ON public.services FOR SELECT USING (active = true);
CREATE POLICY "admins manage services" ON public.services FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.institutions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  short_name text,
  active boolean NOT NULL DEFAULT true,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.institutions TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.institutions TO authenticated;
GRANT ALL ON public.institutions TO service_role;
ALTER TABLE public.institutions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read institutions" ON public.institutions FOR SELECT USING (active = true);
CREATE POLICY "admins manage institutions" ON public.institutions FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  quote text NOT NULL,
  image_url text,
  service text,
  institution text,
  published boolean NOT NULL DEFAULT false,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.testimonials TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.testimonials TO authenticated;
GRANT ALL ON public.testimonials TO service_role;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read testimonials" ON public.testimonials FOR SELECT USING (published = true);
CREATE POLICY "admins manage testimonials" ON public.testimonials FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference text NOT NULL UNIQUE DEFAULT ('BM-' || upper(substr(md5(random()::text), 1, 6))),
  booking_type text NOT NULL,
  full_name text NOT NULL,
  phone text NOT NULL,
  email text,
  institution_id uuid REFERENCES public.institutions(id) ON DELETE SET NULL,
  institution_other text,
  programme text,
  year_level text,
  preferred_date date,
  preferred_location text,
  session_type text,
  number_of_people int DEFAULT 1,
  notes text,
  reference_image_url text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.bookings TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.bookings TO authenticated;
GRANT ALL ON public.bookings TO service_role;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can submit a booking" ON public.bookings FOR INSERT WITH CHECK (status = 'pending');
CREATE POLICY "admins manage bookings" ON public.bookings FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.site_settings (
  id int PRIMARY KEY DEFAULT 1,
  brand_name text NOT NULL DEFAULT 'BIGMETH',
  tagline text NOT NULL DEFAULT 'A VISUAL STORY UNTOLD.',
  biography text,
  philosophy text,
  phone text,
  whatsapp text,
  whatsapp_secondary text,
  email text,
  instagram_url text,
  location text,
  hero_image text,
  about_image text,
  footer_text text,
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT single_row CHECK (id = 1)
);
GRANT SELECT ON public.site_settings TO anon;
GRANT SELECT, INSERT, UPDATE ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "admins manage settings" ON public.site_settings FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- SEED --------------------------------------------------------------
INSERT INTO public.categories (name, slug, sort_order) VALUES
 ('Portraits','portraits',1),
 ('Events','events',2),
 ('Creative','creative',3),
 ('Commercial','commercial',4),
 ('Couples','couples',5),
 ('Fashion','fashion',6),
 ('Lifestyle','lifestyle',7),
 ('Videography','videography',8);

INSERT INTO public.institutions (name, short_name, sort_order) VALUES
 ('University of Ghana','UG',1),
 ('Kwame Nkrumah University of Science and Technology','KNUST',2),
 ('University of Cape Coast','UCC',3),
 ('University of Mines and Technology','UMaT',4),
 ('University of Education, Winneba','UEW',5),
 ('University for Development Studies','UDS',6),
 ('Ghana Communication Technology University','GCTU',7),
 ('Ashesi University','Ashesi',8),
 ('Central University','Central',9),
 ('Accra Technical University','ATU',10),
 ('Takoradi Technical University','TTU',11),
 ('Kumasi Technical University','KsTU',12),
 ('Ho Technical University','HTU',13),
 ('Cape Coast Technical University','CCTU',14);

INSERT INTO public.services (title, description, sort_order, image_url) VALUES
 ('Portrait Photography','Studio and location portraiture built around light, character and stillness.',1,'/__l5e/assets-v1/7c27424b-87a5-4e87-8c1e-bac11d19be0b/image-9.png'),
 ('Event Photography','Graduations, matriculations, ceremonies and celebrations documented as they happen.',2,'/__l5e/assets-v1/d45406af-eba9-4980-997c-ac93ca0f2500/image-7.png'),
 ('Commercial Photography','Brand, product and campaign imagery for modern African businesses.',3,'/__l5e/assets-v1/7b0c9b44-f680-498c-a6f7-8c7b21a56505/image-4.png'),
 ('Creative / Editorial','Concept-led shoots, art direction and experimental visual work.',4,'/__l5e/assets-v1/46f21857-ceca-4852-a48f-6d97aab66fec/image-3.png'),
 ('Weddings / Couples','Two people, one story — photographed with intention.',5,'/__l5e/assets-v1/0ae31cae-4334-4fdc-8029-b454bb727352/image-6.png'),
 ('Videography','Cinematic films, recap videos and motion storytelling.',6,'/__l5e/assets-v1/6cde75b8-ddc2-4ef9-9b7b-abc48396d676/image-2.png');

INSERT INTO public.site_settings (id, biography, philosophy, phone, whatsapp, whatsapp_secondary, instagram_url, location, hero_image, about_image, footer_text)
VALUES (1,
 'Add the artist biography here from the admin dashboard.',
 'It''s not just a photo. It''s a story.',
 '0598416387','0598416387','0596049803','https://instagram.com/the_bigmeth','Ghana',
 '/__l5e/assets-v1/d1323f86-6c1e-4748-a5ce-74e43b82b644/image.png',
 '/__l5e/assets-v1/7c27424b-87a5-4e87-8c1e-bac11d19be0b/image-9.png',
 '© BIGMETH PHOTOGRAPHY');

INSERT INTO public.portfolio_images (title, description, category_id, image_url, alt_text, orientation, featured, is_hero, sort_order)
SELECT v.title, v.descr, c.id, v.url, v.alt, v.orient, v.feat, v.hero, v.ord
FROM (VALUES
 ('The Making Of BigMeth','Cover artwork from the BigMeth visual series.','creative','/__l5e/assets-v1/d1323f86-6c1e-4748-a5ce-74e43b82b644/image.png','Silhouetted man among palm trees at sunrise','portrait',true,true,1),
 ('Storm Passage','A lone figure on a wooden canoe beneath a lightning sky.','conceptual','/__l5e/assets-v1/6cde75b8-ddc2-4ef9-9b7b-abc48396d676/image-2.png','Young man kneeling on a canoe under a stormy sky','portrait',true,false,2),
 ('Kente Council','Traditional dress photographed in low, sculpted light.','creative','/__l5e/assets-v1/46f21857-ceca-4852-a48f-6d97aab66fec/image-3.png','Three people in traditional Ghanaian dress seated on a rock','portrait',true,false,3),
 ('Off Frame','Studio portrait with a hand reaching toward the lens.','portraits','/__l5e/assets-v1/7b0c9b44-f680-498c-a6f7-8c7b21a56505/image-4.png','Portrait of a person in a cap and sunglasses reaching toward the camera','portrait',false,false,4),
 ('Hold','Monochrome study of hands and connection.','couples','/__l5e/assets-v1/fb4f1cf0-39f5-417e-a1c8-ba2ec9a21638/image-5.png','Black and white photograph of two hands holding','portrait',true,false,5),
 ('Two','Studio couple portrait in black.','couples','/__l5e/assets-v1/0ae31cae-4334-4fdc-8029-b454bb727352/image-6.png','Couple dressed in black posing in a studio','portrait',false,false,6),
 ('Black Stars','Streetwear editorial in a stairwell.','fashion','/__l5e/assets-v1/d45406af-eba9-4980-997c-ac93ca0f2500/image-7.png','Three young people in Ghana football jerseys on concrete steps','portrait',true,false,7),
 ('Ground Level','Overhead lifestyle composition on concrete.','lifestyle','/__l5e/assets-v1/9d1a3b4d-e415-4e09-913b-d2a1c481390e/image-8.png','Overhead photograph of a young man lying on concrete surrounded by his belongings','portrait',false,false,8),
 ('Profile','Low-key profile portrait.','portraits','/__l5e/assets-v1/7c27424b-87a5-4e87-8c1e-bac11d19be0b/image-9.png','Low key profile portrait of a young woman','square',true,false,9)
) AS v(title, descr, cat, url, alt, orient, feat, hero, ord)
LEFT JOIN public.categories c ON c.slug = CASE WHEN v.cat = 'conceptual' THEN 'creative' ELSE v.cat END;
