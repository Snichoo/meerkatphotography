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
  /** Local settings to discuss, without implying a venue partnership or booking. */
  landmarks: string[];
  /** Approx suburb centre for structured data. */
  geo: { lat: number; lng: number };
  /** Slugs of nearby suburbs for internal cross-linking. */
  nearby: string[];
  /** Unique meta description (~150 chars). */
  metaDescription: string;
  /** Practical advice specific to planning a session in this area. */
  planningTips?: { title: string; description: string }[];
  /** Council information for the local settings mentioned on the page. */
  localGuide?: { label: string; url: string };
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
    nearby: ["kelmscott", "haynes", "byford", "gosnells"],
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
      "For a family session in Gosnells, the paths and native trees around Mary Carroll Park offer a different feel from a celebration at home or an event in a local hall. We can start with the occasion and choose a setting that suits the people in your photos.",
      "I photograph weddings, family milestones, portraits, pets and business stories across Gosnells from my base in Mount Nasura. Gentle direction helps with the group photos, while space to move and chat lets the candid moments happen naturally.",
      "Tell me who is coming, whether anyone needs a shorter walking route, and what you want the photos for. That gives us a useful starting point for choosing the location, timing and coverage.",
    ],
    landmarks: ["Mary Carroll Park", "Canning River foreshore", "Your home or celebration venue", "Local workplaces and community spaces"],
    geo: { lat: -32.081, lng: 115.999 },
    nearby: ["huntingdale", "maddington", "thornlie", "kelmscott"],
    metaDescription:
      "Gosnells photography for weddings, families, portraits, events, pets and business. Plan a relaxed on-location shoot with Meerkat Photography. Enquire today.",
    landmarksIntro: "Local settings and options to discuss for your shoot:",
    planningTips: [
      { title: "Keep the walking route comfortable", description: "For a Mary Carroll Park session, tell me about prams, mobility needs and younger children. We can plan a manageable meeting point and keep the photos close together." },
      { title: "Plan around the occasion", description: "For a birthday or community event, share the schedule for arrivals, speeches and group photos so the important people and moments are included." },
    ],
    localGuide: { label: "Mary Carroll Park information", url: "https://www.gosnells.wa.gov.au/Venues-Facilities-Parks/Parks-and-Outdoor-Spaces/Parks/Gosnells/Mary-Carroll-Park" },
  },
  {
    slug: "thornlie",
    suburb: "Thornlie",
    postcode: "6108",
    region: "City of Gosnells",
    tagline: "Birthday, family and team photography in Thornlie, WA.",
    intro: [
      "A Thornlie shoot can be as simple as meeting in familiar parkland or having the camera come to your backyard celebration. Homestead Park and the Canning River surroundings give us local options to discuss when you want an outdoor setting.",
      "I cover families, couples, weddings, birthdays, headshots and more in Thornlie. You do not need to arrive knowing how to pose: I help with where to stand and what to do, then leave room for the laughs and interactions that make the photos yours.",
      "For a party, we can stay where everything is happening. For portraits, let me know the group size and the feel you like, and we will work out a setting and time together before the day.",
    ],
    landmarks: ["Homestead Park", "Canning River surroundings", "Backyard birthdays and family homes", "Your workplace or booked venue"],
    geo: { lat: -32.0606, lng: 115.953 },
    nearby: ["huntingdale", "langford", "canning-vale", "gosnells"],
    metaDescription:
      "Thornlie photographer for families, weddings, birthdays, headshots and more. Relaxed direction and on-location sessions with Meerkat Photography. Get a quote.",
    landmarksIntro: "Possible settings for a Thornlie session:",
    planningTips: [
      { title: "Make family photos easy", description: "Choose a familiar setting if that helps children settle in. Bring a favourite toy and let me know about nap times so we can plan the session around your family." },
      { title: "Keep the celebration flowing", description: "For a backyard party, a short list of must-have group photos helps us include everyone without pulling you away from your guests for too long." },
    ],
    localGuide: { label: "Homestead Park information", url: "https://gosnells.bookable.net.au/venues/41/homestead-park" },
  },
  {
    slug: "canning-vale",
    suburb: "Canning Vale",
    postcode: "6155",
    region: "City of Gosnells & City of Canning",
    tagline: "Lifestyle, family and brand photography in Canning Vale, WA.",
    intro: [
      "In Canning Vale, a photography session might mean family portraits in a local reserve, headshots at your workplace or a set of product images for your online store. The location should suit what you need the pictures to do.",
      "For outdoor portraits, we can discuss neighbourhood green spaces such as Alexandria Park or Bracadale Park. For business photography, I can work with you on a shot list that brings together the people, products and details behind your brand.",
      "I also photograph weddings, celebrations and pets across Canning Vale. Send through your preferred date, the type of shoot and any examples you like, and we can shape the session around you.",
    ],
    landmarks: ["Alexandria Park", "Bracadale Park", "Your business or home workspace", "Your celebration venue"],
    geo: { lat: -32.073, lng: 115.921 },
    nearby: ["thornlie", "huntingdale", "langford", "cannington"],
    metaDescription:
      "Canning Vale photography for families, brands, headshots, products, weddings and more. Plan a personal or business shoot with Meerkat Photography. Get a quote.",
    landmarksIntro: "Outdoor and on-location options to plan together:",
    planningTips: [
      { title: "Bring a useful business shot list", description: "Think about where your images will appear: a website banner, product listing or social post. Sharing those uses helps us leave the right space and choose the right framing." },
      { title: "Choose the setting for your group", description: "For family or pet portraits, tell me who is coming and how much walking suits you. We can compare an outdoor location with the familiarity of a session at home." },
    ],
    localGuide: { label: "Canning Vale parks information", url: "https://www.gosnells.wa.gov.au/Leisure-and-Community/Parks-and-outdoor-spaces/Find-a-park-or-outdoor-space?dlv_OC+CL+Public+Parks+Reserves+Listing=%28dd_OC+Park+Categories%3DParks+%26+Gardens%29%28dd_OC+Suburb%3DCanning+Vale%29" },
  },
  {
    slug: "huntingdale",
    suburb: "Huntingdale",
    postcode: "6110",
    region: "City of Gosnells",
    tagline: "Family portraits, celebrations and business photography in Huntingdale, WA.",
    intro: [
      "Huntingdale has room for both an outdoor portrait session and a celebration close to home. Sutherlands Park is a local landmark, with sporting grounds and community spaces that help give the area its gathering-place feel.",
      "I photograph families, couples, birthdays, weddings and business portraits in Huntingdale. We can plan a session at your home, at a suitable outdoor location or at the venue you have booked, with direction that keeps everyone comfortable in front of the camera.",
      "For a family milestone, the photographs can include the whole group as well as smaller combinations and candid moments. For a team or business, we can build a clear list of the portraits and working details you need before the shoot.",
    ],
    landmarks: ["Sutherlands Park surroundings", "Family homes and backyard celebrations", "Your booked community or event venue", "Local business premises"],
    geo: { lat: -32.083, lng: 115.967 },
    nearby: ["thornlie", "gosnells", "canning-vale", "maddington"],
    metaDescription: "Huntingdale photographer for family portraits, birthdays, weddings, headshots and more. Relaxed on-location photography with Meerkat Photography. Enquire today.",
    landmarksIntro: "Settings to consider when planning your session:",
    planningTips: [
      { title: "Allow for park activity", description: "Sporting grounds can be busy on match days. If you would like portraits near Sutherlands Park, we can discuss the background you want and check the planned meeting point before your session." },
      { title: "Include the whole family", description: "Send a list of the people and family combinations you would love photographed. That helps keep group photos organised while leaving time for more relaxed moments." },
    ],
    localGuide: { label: "Sutherlands Park information", url: "https://www.gosnells.wa.gov.au/Venues-Facilities-Parks/Parks-and-Outdoor-Spaces/Parks/Huntingdale/Sutherlands-Park" },
  },
  {
    slug: "cannington",
    suburb: "Cannington",
    postcode: "6107",
    region: "City of Canning",
    tagline: "Headshots, events, family and wedding photography in Cannington, WA.",
    intro: [
      "Cannington offers a choice between a business setting and a greener portrait backdrop. Civic Gardens and Wharf Street Basin are local outdoor options to discuss, alongside your own office, home or event venue.",
      "I photograph headshots, teams, products, events and personal milestones across Cannington. For a business session, we can combine individual portraits with a few wider images of your people and workspace, giving you a more useful set of photographs for your website and social channels.",
      "Families and couples are welcome too, whether you are planning an anniversary session, wedding or a gathering with everyone together. I help you choose a simple plan so the photography fits into the day.",
    ],
    landmarks: ["Civic Gardens", "Wharf Street Basin", "Your office or retail space", "Your wedding or celebration venue"],
    geo: { lat: -32.019, lng: 115.938 },
    nearby: ["langford", "kenwick", "maddington", "canning-vale"],
    metaDescription: "Cannington photography for headshots, events, products, families, weddings and more. On-location shoots with Meerkat Photography across Cannington, WA.",
    landmarksIntro: "Local settings and workplace options to discuss:",
    planningTips: [
      { title: "Plan a consistent team session", description: "Share the number of people, the available room and any brand examples. We can plan one consistent look and a practical order for individual headshots." },
      { title: "Match the setting to the story", description: "A workplace can make business portraits feel connected to what you do, while an outdoor setting suits a different mood. Let me know how the images will be used so we can choose together." },
    ],
    localGuide: { label: "Cannington parks and gardens", url: "https://www.canning.wa.gov.au/myneighbourhood" },
  },
  {
    slug: "maddington",
    suburb: "Maddington",
    postcode: "6109",
    region: "City of Gosnells",
    tagline: "Photography for Maddington families, pets, celebrations and local businesses.",
    intro: [
      "Maddington photography can take you outdoors or keep you right where the story is happening. Harmony Fields is a local reserve to consider for a portrait session, while your home, workplace or booked venue may be the better fit for a celebration or business shoot.",
      "I photograph families, pets, birthdays, weddings, headshots and products in Maddington. My approach is to give clear, gentle direction when it helps, then watch for the natural exchanges between the more planned photographs.",
      "For a business, we can focus on the team, products and process that customers want to see. For a personal session, we will start with who you want included and the moments you want to remember.",
    ],
    landmarks: ["Harmony Fields", "Local parks and neighbourhood reserves", "Your home or party venue", "Business premises and workshops"],
    geo: { lat: -32.050, lng: 115.992 },
    nearby: ["kenwick", "gosnells", "huntingdale", "cannington"],
    metaDescription: "Maddington photographer for families, pets, birthdays, weddings, headshots and products. Personal and business photography with Meerkat Photography. Enquire today.",
    landmarksIntro: "Places and settings we can discuss for your shoot:",
    planningTips: [
      { title: "Let pets settle in", description: "Tell me about your pet's temperament and bring a familiar lead and a favourite reward. We can choose a quieter setting and leave space for breaks rather than rushing into posed photos." },
      { title: "Show the work behind the business", description: "For workshop or product photography, list the key steps and details customers should see. A little preparation of the workspace helps the images focus on your work." },
    ],
    localGuide: { label: "Harmony Fields information", url: "https://www.gosnells.wa.gov.au/Venues-Facilities-Parks/Parks-and-Outdoor-Spaces/Parks/Maddington/Harmony-Fields" },
  },
  {
    slug: "haynes",
    suburb: "Haynes",
    postcode: "6112",
    region: "City of Armadale",
    tagline: "Natural family, couple and milestone photography in Haynes, WA.",
    intro: [
      "For families in Haynes, a portrait session can stay close to home. We can discuss a neighbourhood outdoor setting, including the Sienna Wood Shipwreck Park area, or photograph the familiar spaces where your family spends time together.",
      "I am based in nearby Mount Nasura and cover Haynes for family and lifestyle portraits, couples, birthdays, weddings, pets and business photography. The aim is a session that feels manageable, with help for the posed photographs and time for the little interactions in between.",
      "If several generations are coming together, let me know who is joining and any access or timing needs. We can plan the important group combinations first and keep the day comfortable for everyone.",
    ],
    landmarks: ["Sienna Wood Shipwreck Park area", "Neighbourhood green spaces", "At-home family sessions", "Your chosen celebration venue"],
    geo: { lat: -32.157, lng: 115.979 },
    nearby: ["armadale", "kelmscott", "byford", "gosnells"],
    metaDescription: "Haynes photographer for families, couples, birthdays, weddings, pets and more. Natural on-location photography from nearby Mount Nasura. Plan your shoot.",
    landmarksIntro: "Starting points for choosing your Haynes setting:",
    planningTips: [
      { title: "Work around younger children", description: "Let me know the ages and routines of the children coming along. A familiar location, a snack break and a simple plan can make the session easier for everyone." },
      { title: "Make room for every generation", description: "For an extended-family session, share any mobility needs and the group combinations that matter most. We can minimise moving between spots and photograph the larger group together." },
    ],
    localGuide: { label: "Sienna Wood Shipwreck Park information", url: "https://my.armadale.wa.gov.au/see-and-do/sienna-wood-shipwreck-park/" },
  },
  {
    slug: "langford",
    suburb: "Langford",
    postcode: "6147",
    region: "City of Gosnells",
    tagline: "Family, portrait, celebration and business photography in Langford, WA.",
    intro: [
      "Langford's Hester Park follows the Canning River, giving local families an outdoor option to discuss for their portraits. An at-home session or your own event venue can work just as well when the people and occasion are the focus.",
      "I cover Langford for family and lifestyle sessions, birthdays, weddings, pets, headshots and more. We will talk through the feel you want, the people joining you and any must-have photographs before deciding how the session should flow.",
      "For a celebration, that might mean relaxed guest photographs alongside the cake and speeches. For portraits, it can mean a mix of the whole group, individual photographs and the unplanned moments you share along the way.",
    ],
    landmarks: ["Hester Park and the Canning River surroundings", "Neighbourhood parks", "Family homes and celebration venues", "Your workplace"],
    geo: { lat: -32.043, lng: 115.942 },
    nearby: ["thornlie", "cannington", "canning-vale", "kenwick"],
    metaDescription: "Langford photography for family portraits, birthdays, weddings, pets, headshots and more. Plan a relaxed shoot at home or on location with Meerkat Photography.",
    landmarksIntro: "Options to explore for a local session:",
    planningTips: [
      { title: "Choose a practical meeting point", description: "For riverside portraits, tell me about prams, walking distances and anyone who needs easier access. We can agree on the exact meeting point before the day." },
      { title: "Make the most of everyone being together", description: "If family members are visiting for a celebration, let me know which combinations you want photographed. We can build those into the event without making the whole day a photo session." },
    ],
    localGuide: { label: "Hester Park information", url: "https://www.gosnells.wa.gov.au/Venues-Facilities-Parks/Parks-and-Outdoor-Spaces/Rivers-and-waterways/Hester-Park" },
  },
  {
    slug: "kenwick",
    suburb: "Kenwick",
    postcode: "6107",
    region: "City of Gosnells",
    tagline: "Portraits, family milestones and business photography in Kenwick, WA.",
    intro: [
      "Kenwick brings together homes, local businesses and green spaces, so your shoot does not need to follow one formula. Brixton Street Reserve is a neighbourhood option to discuss for outdoor photographs, while a home or workplace can give the images a more personal setting.",
      "I photograph families, couples, weddings, birthdays, pets, headshots and products across Kenwick. For portraits, I help with the small things such as where to stand and how to settle into the frame. For a business, we can plan the people, details and working images you need.",
      "Tell me whether you are marking an occasion, updating your website or simply getting everyone together. That helps us choose the right location and make a clear plan for the photographs that matter to you.",
    ],
    landmarks: ["Brixton Street Reserve", "Kenwick neighbourhood settings", "Your home or celebration venue", "Your business or workshop"],
    geo: { lat: -32.034, lng: 115.980 },
    nearby: ["maddington", "cannington", "langford", "gosnells"],
    metaDescription: "Kenwick photographer for portraits, families, weddings, events, headshots and products. Personal and business shoots with Meerkat Photography. Get a quote.",
    landmarksIntro: "Local settings and on-location options:",
    planningTips: [
      { title: "Keep the background connected to you", description: "For business portraits, a tidy area of your workplace can tell more of your story than a plain backdrop. Share a few phone photos of the space so we can plan the setup." },
      { title: "Choose the right outdoor space", description: "Tell me the size of your group and the look you like before settling on a reserve. We can check the setting and any relevant access or booking arrangements as part of the plan." },
    ],
    localGuide: { label: "Brixton Street Reserve information", url: "https://www.gosnells.wa.gov.au/Venues-Facilities-Parks/Parks-and-Outdoor-Spaces/Parks/Kenwick/Brixton-Street-Reserve" },
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
