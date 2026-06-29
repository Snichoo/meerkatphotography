# Testimonials Specification

## Overview
- **Target file:** `src/components/Testimonials.tsx`
- **Interaction model:** time-driven carousel
- **Original selector:** `.testimonials-carousel-block_5c28d52450945244614d16aa591c6b8e_8032`

## Original Behavior
- Original library: Swiper.
- Config extracted from live page:
  - `slidesPerView: 1`
  - `spaceBetween: 40`
  - `loop: true`
  - `speed: 1000`
  - `autoplay.delay: 4700`
- Runtime movement: the `.swiper-wrapper` translates horizontally, so the entire testimonial slide/circle moves out while the next circle moves in.
- Transition samples showed `transitionDuration: 1s`, `transitionTimingFunction: ease`, and X transforms stepping by one slide width plus 40px.

## Important Match Note
- Do not fade text inside a fixed circle. The original slides the whole testimonial item horizontally.

## Content
- Includes the Chiara / RISE / 101 Collins testimonial as a normal carousel slide.
