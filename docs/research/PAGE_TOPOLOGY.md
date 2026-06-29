# Page Topology — kitphotography.com.au (homepage)

Background page color: `#EFE4D8` (warm cream). Primary dark: `#2B2D3F` (navy slate).
Accent gold: `#C09166`. Accent orange: `#DD6731`. Font: **Poppins** (300/400/500/600).

Signature motif: a large dark-navy **semicircle ("rising sun" arch)** rises out of the cream
background at the top of the Services area; the page then becomes a navy band, and circular
arch transitions recur between cream and navy bands.

Sections, top to bottom:

1. **Hero** (`.hero-banner--video`) — full-viewport Vimeo background video
   (`player.vimeo.com/video/894418020`, autoplay/loop/muted). Centered light logo +
   "Scroll" indicator with chevron. Cream/overlay. ~820px tall.
2. **Header / Nav** (sticky, `#header`) — logo left, nav center/right
   (About, Services, Case Studies, Portfolio, Blog, Contact Us), social icons
   (LinkedIn, Instagram), "Get a quote" pill button. Transparent over hero → solid on scroll.
3. **Hero copy + arch** — H2 "CAPTURE YOUR BUSINESS IN THE BEST LIGHT",
   H1 "Commercial, Portrait & Product Photography Melbourne", GET A QUOTE outline button.
   Navy arch rises here.
4. **Services** (navy band) — H2 "SERVICES", H3 intro ("Great photography doesn't just
   speak for itself…"), 3×2 grid of 6 services (uppercase centered titles, dotted vertical
   divider, "Find out more" + description). "View All Services" link.
5. **Case Studies & Portfolio** (cream) — H2 "CASE STUDIES AND PORTFOLIO", intro H4,
   masonry/grid of ~11 work photos, links to case studies + portfolio.
6. **Brands We Work With** (cream/navy) — H2 + logo strip image.
7. **Our Approach / Process** — H2 "Our Approach to your photography project",
   "Interested?" intro, 4 steps: Lets meet & brief / The Shoot / Post Production /
   Delivery & Archiving.
8. **About Us** — H2 "About Us", subhead, paragraph, "Meet the team" link.
9. **Why Work With Us** — H2, intro, 5 bullet benefits.
10. **Testimonials** — 4 client reviews (Spectrum Law, Rome 2 Rio, RISE, event).
11. **FAQ** — 11 expandable Q&A (accordion, "+" toggles).
12. **Studio & Service Area + Contact form** — H3 "Our Melbourne Photography Studio &
    Service Area", contact details (phone 0405 260 868, kit@kit.photo, Melbourne),
    enquiry form (service dropdown, how-found dropdown, newsletter checkbox).
13. **Footer** (navy `#2B2D3F`) — logo, newsletter, contact, services links, useful links,
    copyright "© Kit Photography 2026".

## Interaction model
- Header: scroll-driven (transparent→solid). 
- Services: static grid (hover on "Find out more").
- Case studies grid: static/lightbox links.
- FAQ: click-driven accordion.
- Hero: time-driven (autoplay video) + scroll indicator.
- No smooth-scroll library detected (native scroll).
