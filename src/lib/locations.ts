/**
 * Suburb landing pages for local SEO. The studio is in Mount Nasura (6112), so
 * this seed set covers the surrounding City of Armadale / City of Gosnells area
 * where ranking is most achievable. Add or remove entries here and the route,
 * sitemap, index page and footer links all update automatically.
 *
 * Each suburb gets genuinely distinct copy (not find-and-replace) so the pages
 * read as useful local content rather than thin doorway pages.
 */
export type Location = {
  /** URL slug, e.g. "armadale" -> /locations/armadale */
  slug: string;
  /** Suburb display name, e.g. "Armadale" */
  suburb: string;
  postcode: string;
  /** Local government area / district shown on the page. */
  region: string;
  /** Short hero subheading under the H1. */
  tagline: string;
  /** Unique intro paragraphs (local context + how I work there). */
  intro: string[];
  /** Real local spots used for shoots / context, woven into the page. */
  landmarks: string[];
  /** Approx suburb centre for structured data. */
  geo: { lat: number; lng: number };
  /** Slugs of nearby suburbs for internal cross-linking. */
  nearby: string[];
  /** Unique meta description (~150 chars). */
  metaDescription: string;
  /**
   * Optional copy overrides for broad areas (e.g. Perth-wide, Australia-wide)
   * where the suburb-specific templating on the landing page would read oddly.
   * Suburb pages leave these unset and use the defaults.
   */
  /** Overrides the hero kicker (default: `Perth Photographer · {region}`). */
  kicker?: string;
  /** Overrides the intro heading (default: `Your local {suburb} photographer`). */
  introHeading?: string;
  /** Overrides the "Around {suburb}" aside lead-in sentence. */
  landmarksIntro?: string;
  /** Overrides the services-section lede paragraph. */
  servicesIntro?: string;
  /** Overrides the aside bottom note about being based nearby. */
  asideNote?: string;
  /** Overrides the schema.org `areaServed` place name (default: `{suburb}, Western Australia {postcode}`). */
  schemaArea?: string;
};

export const locations: Location[] = [
  {
    slug: "armadale",
    suburb: "Armadale",
    postcode: "6112",
    region: "City of Armadale",
    tagline: "Weddings, families, events and business photography in Armadale, WA.",
    intro: [
      "Armadale sits where the Perth plains meet the Darling Scarp, and it's one of my favourite parts of the city to photograph  from the heritage streets and Minnawarra Park through to the lakes and bushland on the edge of the hills.",
      "Being based just up the road in Mount Nasura, I know Armadale inside out. Whether it's a family session at Champion Lakes, a wedding in the Perth Hills or headshots for a local business, I can be on location in minutes with the camera ready.",
    ],
    landmarks: ["Minnawarra Park", "Champion Lakes", "Araluen Botanic Park", "Armadale Hills"],
    geo: { lat: -32.1461, lng: 116.0093 },
    nearby: ["kelmscott", "byford", "gosnells"],
    metaDescription:
      "Armadale photographer based minutes away in Mount Nasura. Weddings, families, birthdays, headshots and product photography across Armadale, WA. Get a quote.",
  },
  {
    slug: "kelmscott",
    suburb: "Kelmscott",
    postcode: "6111",
    region: "City of Armadale",
    tagline: "Relaxed, natural photography across Kelmscott, WA.",
    intro: [
      "Kelmscott is one of Perth's oldest districts, with the Canning River, leafy reserves and a strong community feel that lends itself beautifully to relaxed, natural photography.",
      "As a Kelmscott-local photographer, I shoot everything here from milestone birthdays and family portraits to weddings and small-business product shoots  always with the easy, unhurried approach the area is known for.",
    ],
    landmarks: ["Rushton Park", "John Okey Davis Park", "Canning River", "Kelmscott town centre"],
    geo: { lat: -32.1236, lng: 116.0257 },
    nearby: ["armadale", "byford", "gosnells"],
    metaDescription:
      "Kelmscott photographer for weddings, families, birthdays, headshots and products. Relaxed, natural sessions across Kelmscott, WA, from a local studio nearby.",
  },
  {
    slug: "byford",
    suburb: "Byford",
    postcode: "6122",
    region: "Shire of Serpentine-Jarrahdale",
    tagline: "Outdoor family, wedding and lifestyle photography in Byford, WA.",
    intro: [
      "Byford has that semi-rural, edge-of-the-hills character  wide skies, paddocks, wineries and space to breathe  which makes it perfect for outdoor family sessions, engagements and relaxed lifestyle shoots.",
      "I regularly travel the short hop south to Byford for shoots on rural properties, at local venues or wherever suits you, bringing studio-quality lighting and a calm, friendly presence to every session.",
    ],
    landmarks: ["Byford Districts", "Beenyup Road bushland", "local wineries", "Darling Range foothills"],
    geo: { lat: -32.2214, lng: 116.006 },
    nearby: ["armadale", "kelmscott"],
    metaDescription:
      "Byford photographer for outdoor family sessions, weddings, engagements and lifestyle shoots. Semi-rural Byford, WA, covered by a nearby local photographer.",
  },
  {
    slug: "gosnells",
    suburb: "Gosnells",
    postcode: "6110",
    region: "City of Gosnells",
    tagline: "Family, event and portrait photography in Gosnells, WA.",
    intro: [
      "Gosnells wraps around the Canning River and the Mary Carroll wetlands, with established parks and quiet streets that give family and portrait sessions a warm, green backdrop all year round.",
      "From event coverage at local halls and clubs to family portraits down by the river, I photograph right across Gosnells with relaxed direction and a fast, polished turnaround.",
    ],
    landmarks: ["Mary Carroll Park", "Canning River", "Gosnells Railway Markets", "Sutherlands Park"],
    geo: { lat: -32.081, lng: 115.999 },
    nearby: ["thornlie", "canning-vale", "kelmscott"],
    metaDescription:
      "Gosnells photographer for family portraits, events, birthdays and headshots. Warm, natural photography across Gosnells, WA, with a quick local turnaround.",
  },
  {
    slug: "thornlie",
    suburb: "Thornlie",
    postcode: "6108",
    region: "City of Gosnells",
    tagline: "Birthday, family and team photography in Thornlie, WA.",
    intro: [
      "Thornlie is a friendly, family-first suburb  think Tom Bateman Reserve, local sporting clubs and plenty of parkland  which makes it a natural home for birthday parties, family portraits and team photography.",
      "As a nearby photographer, I'm a quick drive from Thornlie and happy to come to you, whether it's a backyard birthday, a newborn at home, or headshots for your business.",
    ],
    landmarks: ["Tom Bateman Reserve", "Thornlie Square", "Spencer Village", "local sporting clubs"],
    geo: { lat: -32.0606, lng: 115.953 },
    nearby: ["gosnells", "canning-vale"],
    metaDescription:
      "Thornlie photographer for birthday parties, family portraits, newborns and team headshots. Friendly, on-location photography across Thornlie, WA.",
  },
  {
    slug: "canning-vale",
    suburb: "Canning Vale",
    postcode: "6155",
    region: "City of Gosnells & City of Canning",
    tagline: "Lifestyle, family and brand photography in Canning Vale, WA.",
    intro: [
      "Canning Vale is one of Perth's busiest young-family suburbs, with modern parks, The Vale and Livingston Marketplace close by  ideal for lifestyle, family and small-business photography.",
      "I cover Canning Vale for everything from cake-smash birthdays and family sessions to product and brand photography for the area's many home-run and local businesses.",
    ],
    landmarks: ["The Vale", "Livingston Marketplace", "Ranford Road parks", "Canning Vale reserves"],
    geo: { lat: -32.073, lng: 115.921 },
    nearby: ["thornlie", "gosnells"],
    metaDescription:
      "Canning Vale photographer for family sessions, cake-smash birthdays, product and brand photography. Lifestyle photography across Canning Vale, WA.",
  },
  {
    slug: "perth",
    suburb: "Perth",
    postcode: "6000",
    region: "Greater Perth",
    tagline: "Weddings, families, events and business photography right across Perth, WA.",
    intro: [
      "While I'm based in the south-east of the city, I photograph right across greater Perth  from the coast at Cottesloe and Scarborough through the CBD, Fremantle and the Swan Valley to the Perth Hills and everywhere in between.",
      "Wherever you are in the metro area, I bring the same relaxed approach, studio-quality lighting and quick, polished turnaround. Just tell me the location and I'll come to you.",
    ],
    landmarks: ["Kings Park & Botanic Garden", "Elizabeth Quay & the Swan River", "Cottesloe & Scarborough beaches", "Fremantle & the Swan Valley"],
    geo: { lat: -31.9523, lng: 115.8613 },
    nearby: ["armadale", "gosnells", "canning-vale"],
    metaDescription:
      "Perth photographer for weddings, families, events, headshots and products. On-location photography right across the Perth metro area, WA. Get a quote.",
    kicker: "Perth Photographer · City-wide",
    introHeading: "Your Perth-wide photographer",
    landmarksIntro: "Favourite settings for shoots across the metro area:",
    servicesIntro:
      "Whatever you're celebrating or building, here's what I photograph right across Perth  each with relaxed direction and a beautifully finished gallery.",
    asideNote:
      "Based in the south-east metro and happy to travel anywhere across greater Perth, so planning stays easy wherever you are.",
    schemaArea: "Perth, Western Australia",
  },
  {
    slug: "australia",
    suburb: "Australia",
    postcode: "",
    region: "Australia-wide",
    tagline: "Available to travel Australia-wide for weddings, events and destination shoots.",
    intro: [
      "Not in Perth? No problem. I regularly travel interstate and to regional Australia for weddings, milestone events, brand shoots and destination sessions  from coastal elopements to multi-day event coverage.",
      "Travel is arranged simply as part of your quote, so you get the same photographer, the same style and the same polished galleries wherever in Australia you're planning to shoot.",
    ],
    landmarks: ["Destination weddings anywhere in Australia", "Interstate & regional travel by arrangement", "Elopements & multi-day coverage", "Fly-in shoots for events & brands"],
    geo: { lat: -25.2744, lng: 133.7751 },
    nearby: ["perth", "armadale"],
    metaDescription:
      "Australia-wide photographer available to travel interstate and regionally for weddings, events, brands and destination shoots. Based in Perth, WA. Get a quote.",
    kicker: "Destination Photographer · Australia-wide",
    introHeading: "Your Australia-wide photographer",
    landmarksIntro: "How Australia-wide travel works:",
    servicesIntro:
      "Whatever you're planning, here's what I photograph on destination and interstate shoots  each with relaxed direction and a beautifully finished gallery.",
    asideNote:
      "Based in Perth and happy to travel Australia-wide, with travel arranged simply as part of your quote.",
    schemaArea: "Australia",
  },
];

export function getLocationBySlug(slug: string) {
  return locations.find((location) => location.slug === slug);
}
