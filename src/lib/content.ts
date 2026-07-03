import type {
  Faq,
  NavLink,
  ProcessStep,
  Service,
  Testimonial,
  WorkImage,
} from "@/types";
import type { PhotoIconName } from "@/components/photo-icons";

export const site = {
  name: "Meerkat Photography",
  phone: "0408 847 723",
  email: "nora@meerkatphotography.au",
  location: "9/8 Dale Street, Mount Nasura WA 6112, Australia",
  facebook: "https://www.facebook.com/share/17kvRzSwEA/?mibextid=wwXIfr",
  instagram: "https://www.instagram.com/meerkat_photography/",
  copyright: "(c) Meerkat Photography 2026.",
};

export const navLinks: NavLink[] = [
  { label: "About Me", href: "/about-me" },
  { label: "Services", href: "/services" },
  { label: "Contact Us", href: "/contact-us" },
];

export const services: Service[] = [
  {
    title: "Event Photography",
    description:
      "Corporate functions, awards nights and milestone celebrations, captured with a clean documentary eye for both the headline moments and the candid ones.",
    image: "/images/hero/event.webp",
    alt: "Corporate award recipients on stage",
    href: "/services#link-event-photography",
  },
  {
    title: "Birthday Parties",
    description:
      "Decorations, candid guests and all the little in-between moments  the photos that make you feel like you were right back in the room.",
    image: "/images/hero/birthday.webp",
    alt: "Decorated birthday party venue with balloons",
    href: "/services#link-birthday-parties",
  },
  {
    title: "Headshots",
    description:
      "Confident, natural headshots for LinkedIn, teams and personal brands. Relaxed direction, flattering light and profile-ready files.",
    image: "/images/hero/portrait.webp",
    alt: "Professional business headshot portrait",
    href: "/services#link-headshots",
  },
  {
    title: "Product Photography",
    description:
      "Jewellery, food, eCommerce and small-business products, shot with real detail and texture so they look as good online as they do in person.",
    image: "/images/hero/product.webp",
    alt: "Close-up product photography for a luxury bottle",
    href: "/services#link-product-photography",
  },
  {
    title: "Family & Lifestyle",
    description:
      "Warm, natural sessions for families, couples and lifestyle shoots  gently directed, never stiff, and easy to relax into.",
    image: "/images/hero/family.webp",
    alt: "Family lifestyle portrait beside a lake",
    href: "/services#link-family-lifestyle",
  },
  {
    title: "Wedding Photography",
    description:
      "Weddings, engagements and anniversaries photographed with care for the atmosphere, the emotion and the people who matter most.",
    image: "/images/hero/wedding.webp",
    alt: "Wedding couple kissing during a sparkler entrance",
    href: "/services#link-wedding-photography",
  },
  {
    title: "Real Estate",
    description:
      "Homes, apartments, offices and short-stay rentals, photographed with clean lines and balanced light so every listing looks its absolute best.",
    image: "/images/hero/realestate.webp",
    alt: "Styled hotel-quality bedroom interior",
    href: "/services#link-real-estate",
  },
  {
    title: "Travel",
    description:
      "Destination and travel photography from cities, coastlines and landmarks around the world  full of light, colour and atmosphere.",
    image: "/images/hero/travel.webp",
    alt: "Eiffel Tower on a clear day",
    href: "/services#link-travel",
  },
  {
    title: "Meerkats & Pets",
    description:
      "Pets, animals and the four-legged members of the family  photographed with patience, treats on standby and plenty of room for the unexpected.",
    image: "/images/hero/pet.webp",
    alt: "Pet dog portrait with owner",
    href: "/services#link-meerkats-pets",
  },
];

export const work: WorkImage[] = [
  { src: "/images/hero/event.webp", alt: "Event photography gallery preview" },
  { src: "/images/hero/birthday.webp", alt: "Birthday party photography gallery preview" },
  { src: "/images/hero/portrait.webp", alt: "Headshot photography gallery preview" },
  { src: "/images/hero/product.webp", alt: "Product photography gallery preview" },
  { src: "/images/hero/family.webp", alt: "Family lifestyle photography gallery preview" },
  { src: "/images/hero/wedding.webp", alt: "Wedding photography gallery preview" },
  { src: "/images/hero/realestate.webp", alt: "Real estate photography gallery preview" },
  { src: "/images/hero/travel.webp", alt: "Travel photography gallery preview" },
  { src: "/images/hero/pet.webp", alt: "Pet photography gallery preview" },
];

export const processSteps: ProcessStep[] = [
  {
    title: "Let's meet & brief",
    body: [
      "We start with a quick chat  phone, video or in person  to talk through your ideas, locations, the style you're after and how you'll use the final photos.",
    ],
  },
  {
    title: "The Shoot",
    body: [
      "On the day I keep things relaxed and easy, guiding the light, the timing and the flow so everyone feels comfortable and the moments that matter are covered.",
      "For weddings, parties and events I work with the energy of the room. For portraits, headshots and product shoots, I direct the details so every frame feels intentional.",
    ],
  },
  {
    title: "Post Production",
    body: [
      "After the shoot I hand-pick the strongest images and carefully edit them for colour, tone and consistency, so the whole gallery feels polished and cohesive.",
      "Retouching, cropping and web-ready exports are all shaped around exactly how you plan to use the photos.",
    ],
  },
  {
    title: "Delivery & Archiving",
    label: "Delivery",
    body: [
      "Your finished gallery arrives as an easy online download, with high-resolution files and web-ready versions ready to go.",
      "I confirm the delivery timeline before we shoot so you always know what to expect, and I keep your images safely archived for peace of mind.",
    ],
  },
];

export const servicesSpecialise: { icon: PhotoIconName; label: string }[] = [
  { icon: "rings", label: "Weddings, engagements and anniversaries" },
  { icon: "cake", label: "Birthday parties and family celebrations" },
  { icon: "family", label: "Family, couple and lifestyle portraits" },
  { icon: "headshot", label: "Headshots for LinkedIn, teams and personal brands" },
  { icon: "briefcase", label: "Corporate, brand and commercial shoots" },
  { icon: "cart", label: "Product, food and eCommerce photography" },
  { icon: "events", label: "Events, from corporate functions to milestone parties" },
  { icon: "paw", label: "Pets, animals and the occasional meerkat" },
];

export const whyPoints: { lead: string; rest: string }[] = [
  { lead: "15+ years' experience", rest: "across weddings, portraits, events and products" },
  { lead: "Relaxed, natural direction", rest: "even if you usually hate being photographed" },
  { lead: "Studio or on-location", rest: "anywhere across Perth and Western Australia" },
  { lead: "Clear communication", rest: "from first enquiry through to your final gallery" },
  { lead: "Fast, polished turnaround", rest: "with galleries that are ready to share and use" },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "Nora captured our product launch exactly how we'd imagined  sharp, warm and full of energy. The whole process was easy and the turnaround beat the deadline. Couldn't recommend her more.",
    author: "Hannah Reyes, Lumen & Co",
  },
  {
    quote:
      "She made everyone relaxed for our team headshots, even the camera-shy ones. Polished, consistent and genuinely flattering results  we've already booked her again.",
    author: "Marcus Feld, Brightside Collective",
  },
  {
    quote:
      "Nora shot our two-day conference and didn't miss a beat. Flexible with a changing schedule and delivered a gallery that told the whole story. Worth every cent.",
    author: "Priya Nandakumar, Harbourline Group",
  },
  {
    quote:
      "The easiest vendor we've ever worked with. Nora understood the brief straight away and turned everything around faster than we expected. Highly recommend.",
    author: "Tom Whitaker, Wattle & Pine Studio",
  },
  {
    quote:
      "The photos from our gala were stunning  natural, vibrant and beautifully composed. Nora has a real eye for the small moments. Our whole team was thrilled.",
    author: "Eleanor Voss, Northcliffe Events",
  },
];

export const faqs: Faq[] = [
  {
    q: "What types of photography do you do?",
    a: "A real mix  weddings, engagements and anniversaries, birthday parties, family and lifestyle sessions, headshots, product photography, events, and of course pets. If it's worth photographing, there's a good chance I shoot it.",
  },
  {
    q: "Do you shoot on location around Perth or only in-studio?",
    a: "Both. I shoot on location right across Perth and greater Western Australia, and can arrange a studio-style setup whenever a shoot needs a more controlled space.",
  },
  {
    q: "Can you photograph our team at our office?",
    a: "Absolutely. I can bring mobile lighting and simple backdrops to your workplace for consistent, professional headshots and team photos.",
  },
  {
    q: "How long does a typical session take?",
    a: "Headshots are usually 10-15 minutes per person. Parties, events, family sessions, weddings and product shoots vary with the brief, so we'll work out the right amount of time when you enquire.",
  },
  {
    q: "How quickly will I get my photos?",
    a: "Most galleries are ready within 7-10 business days as an online download of edited, high-resolution files. Need them sooner? Just ask and we'll sort it out before the shoot.",
  },
  {
    q: "Do you provide retouching, hair and makeup?",
    a: "Colour correction and light retouching are always included. Hair, makeup and styling can be arranged on request.",
  },
  {
    q: "Can you match my brand or visual style?",
    a: "Definitely. I can align the lighting, colour and composition to your brand, your existing photos or the overall look you're going for.",
  },
  {
    q: "Do I get usage rights to the images?",
    a: "Yes. Your final images come with usage rights for your agreed purpose, across web, social, marketing and personal use. Extended commercial licensing can be arranged if you need it.",
  },
  {
    q: "Do you really photograph pets and animals?",
    a: "Yes, and they're some of my favourite shoots. Pet sessions come with patient direction and a flexible pace, so the shoot works around your animal rather than the other way round.",
  },
  {
    q: "How do I book or get a quote?",
    a: "Hit Get a Quote or fill in the enquiry form below with your ideas and preferred dates, and I'll come back to you with availability and pricing.",
  },
];

export const serviceOptions = [
  "Wedding / Engagement / Anniversary",
  "Birthday Party",
  "Family and Lifestyle",
  "Headshots",
  "Product",
  "Event",
  "Real Estate",
  "Travel",
  "Meerkats and Pets",
  "Other",
];

export const referralOptions = [
  "Google Search",
  "Google Maps",
  "Recommendation",
  "Friend",
  "Social Media",
  "Other Site",
];
