# Services Page Specification

## Overview
- **Target files:** `src/app/services/page.tsx`, `src/components/ServicesPage.tsx`
- **Source URL:** `https://kitphotography.com.au/services/`
- **Screenshots:** `docs/design-references/services-desktop-original.png`, `docs/design-references/services-mobile-original.png`
- **Interaction model:** Scrollify-style wheel snapping, hover-driven gallery cursor, and click-driven desktop information drawers

## Page Structure
- Fixed cream header with gold logo/nav active state and large navy "GET A QUOTE" circle on desktop.
- Desktop body uses a sticky cream left service menu (`275px` wide) and full-height service panels to the right.
- Overview panel uses image `overview.webp` with dark overlay, H2 "Services", intro H3 and body copy.
- Each service panel has a full-cover image and a right navy "More Information" drawer.
- Mobile removes the side menu and renders service copy inline over dark panels.
- Contact form appears immediately after service panels, then navy footer.

## Extracted Drawer Behavior
- Closed drawer: navy panel width `576px`, height `450px`, translated right by `502px`, leaving a `74px` vertical tab visible.
- Open drawer: translated to `0`, right-aligned over the service image.
- Transition: `transform 0.5s ease-in-out`.
- Tab text uses vertical orientation and reads "More Information".

## Extracted Scroll Animation
- Desktop source uses jQuery Scrollify on `.scrollme` sections.
- Breakpoint: enabled at widths `>=980px`, disabled below `980px`.
- Section selector: overview plus every service panel.
- Easing: `easeInOutExpo`.
- Scroll speed: `1000ms`.
- Standard scroll exclusion: the drawer text scroller keeps native wheel behavior.
- Menu links move to exact section indexes rather than free-scrolling.

## Extracted Gallery Cursor
- Desktop service panels show a floating link that follows the pointer and reads `VIEW GALLERY`.
- Default size: `42px` by `42px`, circular navy background, white uppercase text.
- Default typography: `7px`, weight `300`, centered, line-height `1`.
- Hidden state: `opacity: 0`, `pointer-events: none`.
- Active state: delayed by about `300ms` after entering a service image, `opacity: 1`.
- Movement: pointer position is applied to `transform: translate(x, y)` with the circle offset by `-21px`.
- Transition: `2s cubic-bezier(0.2, 1, 0.1, 1)`.
- Hover size: expands to `82px` by `82px`, text becomes `14px`.
- Hover ring: pseudo-element expands from `22px` to `72px` and gains a gold border.
- Cursor hides while the pointer is over the More Information drawer.

## Extracted Service Images
- `overview.webp`
- `commercial.webp`
- `corporate.webp`
- `headshot.webp`
- `lifestyle.webp`
- `portrait.webp`
- `product.webp`
- `event.webp`
- `fitness.webp`
- `property.webp`
- `food.webp`
- `videography.webp`

## Responsive Behavior
- Desktop (`>=1024px`): sticky side menu, 100vh image panels, Scrollify-style snap animation, drawer hidden until clicked, gallery cursor on image hover.
- Mobile (`<980px`): no side menu, service images hidden, each service renders as a solid navy copy panel.
- Mobile service panel: `30px` padding, cream text, left aligned.
- Mobile heading: `26px`, `600`, uppercase, `33.8px` line height, `20px` bottom margin.
- Mobile body: `14px`, `300`, normal line height, scrollable copy area with a fixed `313px` height.
- Mobile button: full width, `46px` high, `2px` cream border, `15px` radius, `15px` uppercase text.
