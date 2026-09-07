# BigMeth Gallery

Build a premium, highly visual photography web application for a Ghanaian photographer and videographer called:

BIGMETH PHOTOGRAPHY

Brand tagline:

"A VISUAL STORY UNTOLD."

The Instagram brand is @the_bigmeth.

IMPORTANT:
This is NOT primarily a booking website.

The core purpose of this website is to function as a digital art museum / immersive photography gallery where the photographer's work is the main character.

The booking system is an important secondary conversion feature.

The website should make a visitor feel like they have entered a contemporary photography exhibition, then naturally guide interested visitors toward booking a photography or videography session.

==================================================
1. CORE CREATIVE DIRECTION
==================================================

Think:

Contemporary photography museum
+
Editorial fashion magazine
+
Cinematic portfolio
+
Modern African creative studio
+
Premium digital experience

DO NOT create a generic photographer template.

DO NOT create a typical business website with:
- large rounded cards
- excessive gradients
- generic stock photography
- repetitive three-column cards
- excessive icons
- huge "Our Services" card grids
- generic SaaS-style UI
- excessive glassmorphism
- excessive animations
- cheesy photography slogans

The photography itself must be the visual language of the website.

The website should feel artistic, confident, editorial, cinematic and premium.

The interface should stay restrained so that the photographs dominate.

==================================================
2. BRAND PERSONALITY
==================================================

The brand should communicate:

- creativity
- confidence
- youth
- visual storytelling
- professionalism
- Ghanaian/African creative identity
- editorial quality
- authenticity
- artistic experimentation

The photographer works across different types of photography and videography.

From the supplied Instagram references, the work includes examples of:

- creative portraiture
- individual portraits
- couples
- events
- commercial photography
- fashion/editorial photography
- conceptual photography
- lifestyle photography
- outdoor photography
- black-and-white photography
- videography

Do not force every category into the site if there are not enough real images.

The portfolio should be data-driven so categories can be changed later.

==================================================
3. VISUAL IDENTITY
==================================================

Primary background:

Near-black / deep black.

Use a sophisticated dark palette rather than pure black everywhere.

Suggested:
#080808
#0D0D0D
#111111

Primary text:

Warm white / off-white.

Suggested:
#F4F1EA

Accent:

A vivid editorial orange inspired by the orange typography visible in BigMeth's existing Instagram artwork.

Suggested:
#FF9D00

Use orange sparingly.

The photography should provide most of the color.

DO NOT make the entire interface orange.

The overall experience should remain mostly monochrome with occasional orange accents.

==================================================
4. TYPOGRAPHY
==================================================

Use two complementary typefaces.

DISPLAY:

Use a bold condensed editorial/display font with strong visual presence.

The BIGMETH wordmark and major headings should feel tall, bold, condensed and poster-like.

BODY:

Use a clean modern sans-serif.

Typography hierarchy should be dramatic.

Examples:

BIGMETH

THE COLLECTION

PORTRAITURE

VISUAL STORIES

THE ARTIST

BOOK A SESSION

Use oversized typography when appropriate.

Typography should sometimes overlap imagery, similar to contemporary editorial photography layouts.

Avoid generic startup typography.

==================================================
5. NAVIGATION
==================================================

Desktop navigation should be minimal.

Left:

BIGMETH

Center/right:

WORK
STORIES
ABOUT
BOOK

Optional social icon/link:
INSTAGRAM

The navigation should remain elegant and unobtrusive.

Use a sticky/fixed navigation that changes appearance depending on the background.

For example:
- light text on dark imagery
- dark text only when necessary over light imagery

Mobile:

Use:

BIGMETH

MENU

The mobile navigation should open as a full-screen editorial menu.

Menu items:

WORK
STORIES
ABOUT
BOOK A SESSION
INSTAGRAM

==================================================
6. HOMEPAGE HERO
==================================================

The homepage must immediately communicate that this is a visual art experience.

DO NOT start with a conventional business hero.

DO NOT start with:
"Welcome to BigMeth Photography"

Instead, create a cinematic full-screen hero.

Use one of the strongest supplied photography images as the hero.

Hero structure:

BIGMETH

PHOTOGRAPHY

A VISUAL
STORY UNTOLD.

[ ENTER THE GALLERY ]

Small text:

SCROLL TO EXPLORE

The hero image should occupy most or all of the viewport.

Use subtle image movement / parallax.

The image should not be hidden behind UI.

The image must remain the dominant element.

==================================================
7. HERO IMAGE SYSTEM
==================================================

Create a reusable "HeroArtwork" component.

It should support:

- full-screen image
- object-position control
- overlay text
- optional caption
- optional category
- subtle zoom
- subtle parallax
- responsive cropping

Do not hardcode one image permanently.

The admin should eventually be able to mark an image as a "Hero Image."

==================================================
8. THE GALLERY / WORK SECTION
==================================================

This is the MOST IMPORTANT section of the website.

Create a highly visual portfolio experience.

Title:

THE COLLECTION

or

SELECTED WORK

Create category filtering.

Categories should initially include:

ALL
PORTRAITS
EVENTS
CREATIVE
COMMERCIAL
COUPLES
FASHION
LIFESTYLE
VIDEOGRAPHY

However, categories must be database-driven so the admin can add/edit/delete them.

==================================================
9. MASONRY / EDITORIAL GALLERY
==================================================

DO NOT use a boring uniform 3-column image grid.

Create an editorial masonry layout with varied image sizes.

Use:

- portrait images
- landscape images
- large feature images
- small supporting images
- occasional full-width images

Images should have different visual weights.

Example composition:

Large portrait
+
small landscape
+
small portrait

then:

full-width feature image

then:

two-image composition

then:

large portrait

This should feel like a physical gallery exhibition.

Images should have generous spacing.

Do not put every image inside a card.

Avoid excessive borders.

Avoid unnecessary rounded corners.

Photography should feel free-form.

==================================================
10. IMAGE INTERACTIONS
==================================================

When hovering over an image on desktop:

- image subtly zooms
- image remains sharp
- category/title appears subtly
- cursor changes to a custom "VIEW" cursor

Example:

VIEW
01

Do not use aggressive animations.

The image should never bounce, rotate or behave like a social media card.

==================================================
11. IMAGE LIGHTBOX
==================================================

Clicking a photograph should open an immersive full-screen lightbox.

Requirements:

- large image
- black background
- image centered appropriately
- previous/next navigation
- close button
- image title
- category
- optional caption
- optional project/story
- keyboard navigation
- swipe navigation on mobile

Allow the user to move through the collection without closing the lightbox.

Make the lightbox feel like viewing artwork in a museum.

==================================================
12. FEATURED ARTWORK
==================================================

Create a section after the initial gallery called:

FEATURED

or

THE WORK

Show 3–6 of the strongest photographs.

These should have much larger visual treatment than normal gallery images.

Each featured work can contain:

01
PORTRAITURE

Short caption

IMAGE

Then:

02
CREATIVE

IMAGE

etc.

The admin should be able to mark photographs as "Featured."

==================================================
13. VISUAL STORIES
==================================================

Create a dedicated section called:

VISUAL STORIES

This should expand the "A Visual Story Untold" philosophy.

A visual story is more than a single photograph.

A story can contain:

- title
- cover photograph
- description
- date
- location
- multiple photographs
- optional videos
- photographer notes
- category

Example:

THE MAKING OF BIGMETH

or any real project uploaded later.

Do NOT invent fake projects.

Use placeholder content only where necessary and clearly structure it for replacement.

==================================================
14. VISUAL STORY PAGE
==================================================

Each story should have its own immersive page.

Example:

THE GRADUATE

A visual story about a graduation session.

Page structure:

FULL SCREEN COVER IMAGE

TITLE

SHORT DESCRIPTION

LOCATION / DATE

Then a cinematic sequence of photographs.

Do not make it look like a blog post.

This is an art exhibition page.

Images should alternate between:

- full-screen
- large centered
- two-column
- portrait
- edge-to-edge

Add optional photographer notes between image sequences.

==================================================
15. CINEMATIC TRANSITIONS
==================================================

Use sophisticated scroll-based transitions.

Examples:

- images fade/slide into view
- slight scale transitions
- text reveals
- horizontal gallery movement where appropriate
- image masking
- subtle parallax
- section transitions

Animations should feel slow, intentional and cinematic.

DO NOT overanimate the website.

The animation should support the photography.

Use performance-friendly animations.

Respect:

prefers-reduced-motion

If the visitor has reduced motion enabled, disable unnecessary animation.

==================================================
16. ARTIST SECTION
==================================================

Create:

THE ARTIST

or

BEHIND THE LENS

This section introduces BigMeth as a creative artist, not just a service provider.

Suggested visual treatment:

Large portrait of the photographer.

Beside or overlapping the image:

BIGMETH

PHOTOGRAPHER
VIDEOGRAPHER
VISUAL STORYTELLER

Then a short biography.

IMPORTANT:

Do not fabricate personal biography details.

Create editable content fields in the admin panel so the actual biography can be entered later.

Include:

- photographer portrait
- biography
- creative philosophy
- location
- social links

==================================================
17. PHILOSOPHY SECTION
==================================================

Create a dramatic typographic section.

Example:

IT'S NOT
JUST A PHOTO.

IT'S A
STORY.

Then:

A VISUAL STORY UNTOLD.

Use a minimal black background with large typography.

This should act as a visual pause between gallery sections.

==================================================
18. SERVICES
==================================================

Services should exist, but they must NOT dominate the website.

Create a compact editorial services section.

Potential services:

PORTRAIT PHOTOGRAPHY

EVENT PHOTOGRAPHY

COMMERCIAL PHOTOGRAPHY

CREATIVE / EDITORIAL

WEDDING / COUPLES

VIDEOGRAPHY

Do not invent specific services that aren't confirmed.

Make services editable from the admin dashboard.

Each service can have:

- title
- description
- representative image
- active/inactive status

Use visual image-based presentation rather than boring service cards.

==================================================
19. STUDENT PHOTOGRAPHY / BOOKING
==================================================

Booking is a major business feature, but it should come AFTER the visitor has experienced the portfolio.

Create:

BOOK A SESSION

The first question should be:

WHAT ARE YOU BOOKING FOR?

Options:

GRADUATION
MATRICULATION
PORTRAIT
EVENT
COMMERCIAL
VIDEOGRAPHY
CREATIVE / OTHER

Use an elegant interactive form.

==================================================
20. GRADUATION BOOKING
==================================================

If the visitor selects GRADUATION, show:

FULL NAME

PHONE NUMBER

EMAIL

UNIVERSITY / INSTITUTION

PROGRAMME / COURSE

GRADUATION YEAR

PREFERRED DATE

PREFERRED LOCATION

SESSION TYPE

Options:

INDIVIDUAL
COUPLE
FRIENDS
GROUP

NUMBER OF PEOPLE

ADDITIONAL NOTES

OPTIONAL REFERENCE / INSPIRATION IMAGE UPLOAD

==================================================
21. MATRICULATION BOOKING
==================================================

If MATRICULATION is selected, show:

FULL NAME

PHONE NUMBER

EMAIL

UNIVERSITY / INSTITUTION

PROGRAMME / COURSE

LEVEL / YEAR

PREFERRED DATE

PREFERRED LOCATION

SESSION TYPE

INDIVIDUAL
COUPLE
FRIENDS
GROUP

NUMBER OF PEOPLE

ADDITIONAL NOTES

OPTIONAL REFERENCE IMAGE

==================================================
22. UNIVERSITIES / INSTITUTIONS
==================================================

Create a database table for institutions rather than hardcoding the dropdown permanently.

Initially seed common Ghanaian institutions, including:

University of Ghana (UG)

Kwame Nkrumah University of Science and Technology (KNUST)

University of Cape Coast (UCC)

University of Mines and Technology (UMaT)

University of Education, Winneba (UEW)

University for Development Studies (UDS)

Ghana Communication Technology University (GCTU)

Ashesi University

Central University

Accra Technical University (ATU)

Takoradi Technical University (TTU)

Kumasi Technical University (KsTU)

Ho Technical University (HTU)

Cape Coast Technical University (CCTU)

Also provide:

OTHER / MY SCHOOL IS NOT LISTED

If selected, allow the visitor to manually enter the institution name.

The admin must be able to:

- add institutions
- edit institutions
- deactivate institutions
- reorder institutions

==================================================
23. BOOKING CONFIRMATION
==================================================

After submission show a premium confirmation screen.

Example:

YOUR STORY
HAS BEEN SUBMITTED.

Thank you, [Name].

BigMeth Photography will review your request and get back to you.

Display:

Booking reference
Selected service
Institution
Preferred date
Contact method

Then provide:

WHATSAPP
CALL
BACK TO GALLERY

Do not claim a booking is confirmed automatically.

The submission should initially have:

PENDING

status.

==================================================
24. WHATSAPP / CONTACT
==================================================

The Instagram profile provides these phone/WhatsApp contacts:

0598416387
0596049803

Use these for contact/WhatsApp CTAs where appropriate.

Do not invent an email address.

The email displayed in the Instagram screenshot is only partially visible, so make email a configurable admin setting.

The admin should be able to update:

- WhatsApp number
- secondary WhatsApp number
- phone
- email
- Instagram URL
- location

==================================================
25. CONTACT SECTION
==================================================

Final CTA should be dramatic and minimal.

Example:

READY TO
CREATE YOUR
STORY?

[ BOOK A SESSION ]

Then:

WHATSAPP
CALL
INSTAGRAM
EMAIL

Use large typography.

Do not create a boring contact form as the final visual.

==================================================
26. INSTAGRAM INTEGRATION
==================================================

Include an Instagram link to:

@the_bigmeth

Do not attempt to scrape Instagram.

Instead, create an admin-managed "Instagram Preview" section where selected images can be uploaded manually.

This prevents the website from depending on Instagram's API.

==================================================
27. ADMIN DASHBOARD
==================================================

Create a secure admin dashboard.

The public website is the art gallery.

The admin dashboard is the studio management system.

Admin sections:

DASHBOARD
PORTFOLIO
COLLECTIONS
VISUAL STORIES
SERVICES
BOOKINGS
INSTITUTIONS
TESTIMONIALS
SITE SETTINGS

==================================================
28. ADMIN DASHBOARD — PORTFOLIO
==================================================

Admin should be able to:

- upload photographs
- upload multiple photographs
- edit title
- edit caption
- select category
- select collection
- mark as Featured
- set display order
- enable/disable image
- delete image

Each image should support:

title
description
category
collection
featured
sort_order
image_url
created_at

Use proper cloud storage.

Do NOT store large images directly inside the database.

==================================================
29. ADMIN DASHBOARD — VISUAL STORIES
==================================================

Admin can:

CREATE STORY

Fields:

title
slug
description
cover image
category
date
location
photographer notes
published/unpublished

Then add multiple photographs to the story.

Allow drag-and-drop ordering if practical.

==================================================
30. ADMIN DASHBOARD — BOOKINGS
==================================================

Display bookings in an elegant management interface.

Statuses:

PENDING
CONTACTED
CONFIRMED
COMPLETED
CANCELLED

Show:

client name
booking type
institution
programme
date
location
number of people
status
created date

Allow filtering:

All
Graduation
Matriculation
Other

Allow filtering by institution.

Allow searching by client name or phone.

==================================================
31. BOOKING ANALYTICS
==================================================

Dashboard should show useful basic metrics:

TOTAL BOOKINGS

PENDING

CONFIRMED

COMPLETED

GRADUATION BOOKINGS

MATRICULATION BOOKINGS

Optional institution breakdown.

For example:

University of Ghana
KNUST
UCC
UMaT
Other

Keep analytics secondary.

Do NOT turn the admin dashboard into a complicated enterprise analytics platform.

==================================================
32. TESTIMONIALS
==================================================

Create an admin-managed testimonials section.

Fields:

client name
testimonial
optional image
service
institution
published

The Instagram profile includes a Reviews highlight, so allow those reviews to be added later.

Do not fabricate testimonials.

==================================================
33. SITE SETTINGS
==================================================

Admin should be able to update:

Brand name

Tagline

Biography

Phone

WhatsApp

Email

Instagram URL

Location

Hero image

About image

Social links

Footer text

==================================================
34. DATABASE
==================================================

Use a proper relational backend.

Prefer Supabase for:

Authentication
PostgreSQL database
Storage
Row Level Security

Create appropriate tables such as:

profiles
portfolio_images
categories
visual_stories
story_images
services
bookings
institutions
testimonials
site_settings

Use foreign keys appropriately.

Do not put everything into one giant table.

==================================================
35. SECURITY
==================================================

Public visitors should only be able to:

- view published portfolio images
- view published stories
- view active services
- submit bookings

Only authenticated administrators should be able to:

- upload
- edit
- delete
- manage bookings
- manage institutions
- change site settings

Use proper authentication.

Protect admin routes.

Use Row Level Security where applicable.

Never expose service credentials in frontend code.

==================================================
36. IMAGE PERFORMANCE
==================================================

Photography websites can become extremely heavy.

Implement:

- responsive image sizes
- lazy loading
- optimized formats such as WebP/AVIF where supported
- appropriate image compression
- blur/low-quality placeholders where practical
- lazy loading for gallery images below the fold
- eager loading only for the hero image
- proper aspect ratio containers to prevent layout shift

Do NOT sacrifice image quality unnecessarily.

Photography must still look premium.

==================================================
37. RESPONSIVE DESIGN
==================================================

The website must be exceptional on:

Mobile
Tablet
Laptop
Desktop
Large desktop screens

Mobile is especially important because visitors will likely arrive from Instagram.

Do not simply shrink the desktop design.

Create a proper mobile composition.

On mobile:

- images should remain dominant
- typography should remain dramatic
- galleries should be touch-friendly
- lightbox should support swipe
- navigation should be simple
- booking forms should be easy to complete

==================================================
38. MOBILE GALLERY
==================================================

On mobile, use a carefully designed vertical editorial gallery.

Do not force a tiny masonry grid that makes photographs difficult to appreciate.

Use:

large image
caption
spacing
large image
two-image sequence
full-screen image

The mobile experience should feel like scrolling through a digital exhibition.

==================================================
39. CUSTOM CURSOR
==================================================

Desktop only.

Create a subtle custom cursor.

When hovering over an artwork:

VIEW

When hovering over buttons:

ENTER

or

OPEN

Do not make the cursor distracting.

Disable custom cursor on mobile.

==================================================
40. PAGE TRANSITIONS
==================================================

Use smooth page transitions between:

Home
Gallery
Story
About
Booking

Keep transitions fast enough that navigation never feels slow.

==================================================
41. FOOTER
==================================================

Keep the footer minimal.

BIGMETH

A VISUAL STORY UNTOLD.

WORK
STORIES
ABOUT
BOOK

Instagram

WhatsApp

Contact

Copyright.

==================================================
42. CONTENT RULES
==================================================

IMPORTANT:

Do NOT invent photography.

Do NOT use generic stock images in the final portfolio.

Do NOT create fake client reviews.

Do NOT invent fake awards.

Do NOT invent fake statistics.

Do NOT invent a fake biography.

Use the supplied photography references/assets wherever available.

Where real content is missing, create clearly marked editable placeholders that can easily be replaced from the admin dashboard.

==================================================
43. IMAGE PLACEHOLDER SYSTEM
==================================================

Create a clean image management system so that I can replace all temporary images later.

Every major visual component should receive images from the database.

Do not hardcode image URLs throughout the UI.

For development, use temporary placeholders only where necessary.

Make it easy to replace them.

==================================================
44. HOMEPAGE EXPERIENCE ORDER
==================================================

The homepage should roughly follow this visual rhythm:

1. CINEMATIC HERO

BIGMETH
A VISUAL STORY UNTOLD.

2. SHORT MANIFESTO

IT'S NOT JUST A PHOTO.
IT'S A STORY.

3. FEATURED WORK

Large editorial photography.

4. COLLECTIONS

Portraits
Events
Creative
Commercial
etc.

5. VISUAL STORIES

Immersive projects.

6. ARTIST

Behind the lens.

7. SELECTED SERVICES

Minimal.

8. TESTIMONIALS

Minimal social proof.

9. BOOKING CTA

READY TO CREATE YOUR STORY?

10. FOOTER

==================================================
45. IMPORTANT VISUAL RULE
==================================================

THE PHOTOGRAPHS MUST ALWAYS BE THE MOST IMPORTANT ELEMENT.

When deciding between:

more UI

or

more photography,

choose photography.

When deciding between:

more text

or

more negative space,

choose negative space.

When deciding between:

more cards

or

editorial composition,

choose editorial composition.

The website should feel expensive because it is restrained.

==================================================
46. ART MUSEUM EXPERIENCE
==================================================

The final experience should feel like:

"I am exploring an artist's work."

NOT:

"I am looking at a photographer's business website."

The visitor should be able to:

enter the gallery
discover collections
open artwork
move between photographs
discover visual stories
learn about the artist
then decide to book.

The booking system should feel like the natural conclusion of the artistic experience.

==================================================
47. DESIGN QUALITY
==================================================

The final result must be production-quality.

Pay attention to:

- spacing
- typography
- image cropping
- composition
- transitions
- hierarchy
- accessibility
- loading states
- empty states
- error states
- responsive behavior
- keyboard navigation
- contrast
- form validation

Do not generate a generic template.

Every section should feel intentionally art-directed.

==================================================
48. ACCESSIBILITY
==================================================

Include:

- alt text for images
- keyboard navigation
- focus states
- accessible buttons
- accessible form labels
- sufficient contrast
- reduced-motion support
- semantic HTML

==================================================
49. SEO
==================================================

Implement basic SEO.

Site title:

BigMeth Photography — A Visual Story Untold

Meta description should describe BigMeth Photography as a photography and videography creative studio.

Add appropriate Open Graph metadata.

Use descriptive URLs:

/work
/stories
/stories/[slug]
/about
/book

Use meaningful image alt text.

==================================================
50. TECHNICAL IMPLEMENTATION
==================================================

Use:

React
TypeScript
Tailwind CSS
shadcn/ui where appropriate
Supabase for backend/auth/storage/database

Use clean reusable components.

Avoid creating huge monolithic components.

Create reusable components such as:

HeroArtwork
EditorialGallery
ArtworkCard
ArtworkLightbox
CollectionFilter
FeaturedArtwork
VisualStoryCard
VisualStoryGallery
ArtistSection
ServiceSection
TestimonialSection
BookingWizard
InstitutionSelector
ContactCTA
AdminSidebar
PortfolioManager
BookingManager

==================================================
51. BOOKING WIZARD UX
==================================================

Do not show one giant form.

Break the booking experience into steps.

STEP 1

WHAT ARE YOU BOOKING?

STEP 2

YOUR DETAILS

STEP 3

SESSION DETAILS

STEP 4

REVIEW

STEP 5

SUBMITTED

Use a progress indicator.

The form should feel premium and simple.

==================================================
52. BOOKING VALIDATION
==================================================

Validate:

name required
phone required
valid email if supplied
institution required for student bookings
programme required for student bookings
date required
number of people must be valid

Show useful validation messages.

Do not erase entered information if validation fails.

==================================================
53. ADMIN SEED DATA
==================================================

Create initial institution seed data from the list above.

Create initial categories.

Do not create fake portfolio photographs or fake testimonials as real records.

Use placeholder records only if needed for development and clearly mark them as demo content.

==================================================
54. FINAL DESIGN FEEL
==================================================

The final website should feel like a combination of:

A contemporary African photography exhibition
+
high-end editorial magazine
+
cinematic portfolio
+
modern creative studio

It should be:

DARK
EDITORIAL
MINIMAL
CINEMATIC
IMAGE-DRIVEN
CONFIDENT
ARTISTIC
PREMIUM

Avoid:

GENERIC
CORPORATE
COLORFUL
CLUTTERED
CARD-HEAVY
TEMPLATE-LIKE
AI-GENERATED LOOKING

==================================================
55. MOST IMPORTANT PRIORITY ORDER
==================================================

Prioritize the project in this exact order:

1. PHOTOGRAPHY / VISUAL EXPERIENCE
2. PORTFOLIO / ART GALLERY
3. VISUAL STORIES
4. ARTIST BRAND
5. BOOKING EXPERIENCE
6. SERVICES
7. ADMIN MANAGEMENT
8. ANALYTICS

Do not let the booking system visually dominate the homepage.

==================================================
56. FINAL REQUEST
==================================================

Build the entire application, not just a static landing page.

Create:

PUBLIC WEBSITE
+
IMMERSIVE GALLERY
+
VISUAL STORY SYSTEM
+
BOOKING SYSTEM
+
STUDENT GRADUATION/MATRICULATION BOOKING
+
UNIVERSITY DATABASE
+
ADMIN DASHBOARD
+
PORTFOLIO MANAGEMENT
+
BOOKING MANAGEMENT
+
STORY MANAGEMENT
+
TESTIMONIAL MANAGEMENT
+
SITE SETTINGS

Make the first impression exceptionally strong.

The first 5 seconds of the website should communicate:

"This is an artist."

The next 30 seconds should communicate:

"This photographer is seriously good."

And the final experience should make the visitor think:

"I want BigMeth to tell my story."

Build with that principle guiding every design decision.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/c5102355-f4b8-4669-bf9b-6146bf8ea073).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
