import { serviceGalleries, type GalleryImage } from "@/lib/gallery";

export type ServicesPageItem = {
  id: string;
  title: string;
  image: string;
  alt: string;
  paragraphs: string[];
  href: string;
  gallery: readonly GalleryImage[];
};

export const servicesPageItems: ServicesPageItem[] = [
  {
    id: "event-photography",
    title: "Event Photography",
    image: "/images/hero/event.webp",
    alt: "Corporate award recipients on stage",
    paragraphs: [
      "Corporate functions, awards nights, conferences and milestone celebrations, photographed with a calm, documentary approach.",
      "I cover the headline moments  the speeches, the awards, the big reveal  alongside the candid energy in the room, so the event feels exactly like it did on the day.",
    ],
    href: "/services/event-photography",
    gallery: serviceGalleries["event-photography"],
  },
  {
    id: "birthday-parties",
    title: "Birthday Parties",
    image: "/images/hero/birthday.webp",
    alt: "Decorated birthday party venue with balloons",
    paragraphs: [
      "Birthdays photographed for the colour, the atmosphere, the little details and, most of all, the people who came to celebrate.",
      "From decorations and group shots to speeches, cake and the dance floor, I capture the whole story without anyone feeling like they're posing for a camera.",
    ],
    href: "/services/birthday-parties",
    gallery: serviceGalleries["birthday-parties"],
  },
  {
    id: "headshots",
    title: "Headshots",
    image: "/images/hero/portrait.webp",
    alt: "Professional business headshot portrait",
    paragraphs: [
      "Headshots for LinkedIn, websites, teams and personal brands  directed so you feel comfortable and look like the best version of yourself.",
      "Sessions can run on location or in a clean studio-style setup, with consistent lighting and profile-ready files for press, proposals and social channels.",
    ],
    href: "/services/headshots",
    gallery: serviceGalleries.headshots,
  },
  {
    id: "product-photography",
    title: "Product Photography",
    image: "/images/hero/product.webp",
    alt: "Close-up product photography for a luxury bottle",
    paragraphs: [
      "Product photography for jewellery, food, eCommerce and small business, built around detail, texture and the way your product needs to sell.",
      "Whether it's clean and simple for an online store or more styled for a campaign, the images are shaped to sit naturally across your web, social and print.",
    ],
    href: "/services/product-photography",
    gallery: serviceGalleries["product-photography"],
  },
  {
    id: "family-lifestyle",
    title: "Family & Lifestyle",
    image: "/images/hero/family.webp",
    alt: "Family lifestyle portrait beside a lake",
    paragraphs: [
      "Family and lifestyle sessions built around natural connection, gentle direction and the small in-between moments that often turn out to be your favourites.",
      "Warm, personal and easy to relax into  whether you're after family memories, a couple's session, a brand story or lifestyle content.",
    ],
    href: "/services/family-lifestyle",
    gallery: serviceGalleries["family-lifestyle"],
  },
  {
    id: "wedding-photography",
    title: "Wedding Photography",
    image: "/images/hero/wedding.webp",
    alt: "Wedding couple kissing during a sparkler entrance",
    paragraphs: [
      "Weddings, engagements and anniversaries photographed with care for the atmosphere, the emotion and the people around you.",
      "From intimate ceremonies to big celebrations and proposal-style shoots, the process stays relaxed and easy from the first plan through to your final gallery.",
    ],
    href: "/services/wedding-photography",
    gallery: serviceGalleries["wedding-photography"],
  },
  {
    id: "meerkats-pets",
    title: "Meerkats & Pets",
    image: "/images/hero/pet.webp",
    alt: "Pet dog portrait with owner",
    paragraphs: [
      "Pets, animals and the four-legged members of the family  photographed with patience, treats on hand and plenty of room for the unexpected.",
      "Every animal sets its own pace, so sessions stay flexible and fun, chasing the genuine character and personality that make these photos worth keeping.",
    ],
    href: "/services/meerkats-pets",
    gallery: serviceGalleries["meerkats-pets"],
  },
];

export function getServiceById(id: string) {
  return servicesPageItems.find((service) => service.id === id);
}
