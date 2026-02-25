export interface TeamMember {
  name: string
  role: string
}

export interface KitchenDisplay {
  name: string
  image: string
  style: string
  isPrimary?: boolean
}

export interface OpeningHour {
  day: string
  date: string
  hours: string
}

export interface Showroom {
  slug: string
  name: string
  city: string
  address: string
  postcode: string
  phone: string
  email: string,
    image?: string
  coordinates?: {
    lat: number;
    lng: number;
  };
  openToday: string
  facilities: string[]
  team: TeamMember[]
  kitchensOnDisplay: KitchenDisplay[]
  openingHours: OpeningHour[]
  nearbyStores: string[]
  distance? : number
}

export const showrooms: Showroom[] = [
  {
    slug: "london-wembley",
    name: "Lomash Wood London Wembley",
    city: "London Wembley",
    address: "Unit 4, Wembley Commercial Centre, East Lane",
    postcode: "HA9 7UR",
    phone: "+442089001234",
    email: "wembley@lomashwood.co.uk",
    coordinates: {
      lat: 51.5560,
      lng: -0.2960,
    },  
    image: "https://asset.nobiadigital.com/fetch/ar_1.4,c_fill,q_auto,w_1600/f_auto/https%3A%2F%2Fwww.magnet.co.uk%2Fglobalassets%2Fshowrooms%2Fleeds%2F6.jpg",
    openToday: "9:00 AM - 6:00 PM",
    facilities: ["Dog friendly", "Expert advice", "Free design appointments", "Free parking", "Free WiFi", "Kitchens on display", "Bedrooms on display"],
    team: [
      { name: "Raj", role: "Store Manager" },
      { name: "Priya", role: "Senior Kitchen Designer" },
      { name: "James", role: "Kitchen Designer" },
      { name: "Aisha", role: "Bedroom Specialist" },
    ],
    kitchensOnDisplay: [
      { name: "Milano Handleless Gloss", image: "https://asset.nobiadigital.com/fetch/ar_1.4,c_fill,q_auto,w_1600/f_auto/https%3A%2F%2Fwww.magnet.co.uk%2Fglobalassets%2Fshowrooms%2Fleeds%2Fkitchen-display-1.jpg", style: "Modern", isPrimary: true },
      { name: "Cambridge Shaker", image: "https://asset.nobiadigital.com/fetch/ar_1.4,c_fill,q_auto,w_1600/f_auto/https%3A%2F%2Fwww.magnet.co.uk%2Fglobalassets%2Fshowrooms%2Fleeds%2Fkitchen-display-2.jpg", style: "Traditional" },
      { name: "Oslo Matt Graphite", image: "https://asset.nobiadigital.com/fetch/ar_1.4,c_fill,q_auto,w_1600/f_auto/https%3A%2F%2Fwww.magnet.co.uk%2Fglobalassets%2Fshowrooms%2Fleeds%2Fkitchen-display-3.jpg", style: "Contemporary" },
    ],
    openingHours: [
      { day: "Monday", date: "24 Feb", hours: "9:00 AM - 6:00 PM" },
      { day: "Tuesday", date: "25 Feb", hours: "9:00 AM - 6:00 PM" },
      { day: "Wednesday", date: "26 Feb", hours: "9:00 AM - 6:00 PM" },
      { day: "Thursday", date: "27 Feb", hours: "9:00 AM - 8:00 PM" },
      { day: "Friday", date: "28 Feb", hours: "9:00 AM - 6:00 PM" },
      { day: "Saturday", date: "01 Mar", hours: "9:00 AM - 5:00 PM" },
      { day: "Sunday", date: "02 Mar", hours: "10:00 AM - 4:00 PM" },
    ],
    nearbyStores: ["birmingham", "leicester", "manchester-trafford"],
  },
  {
    slug: "birmingham",
    name: "Lomash Wood Birmingham",
    city: "Birmingham",
    address: "45 High Street, Digbeth",
    postcode: "B5 6AH",
    phone: "+441211234567",
    email: "birmingham@lomashwood.co.uk",
    coordinates: {
      lat: 52.4862,
      lng: -1.8904,
    },
    image: "https://asset.nobiadigital.com/fetch/ar_1.4,c_fill,q_auto,w_1600/f_auto/https%3A%2F%2Fwww.magnet.co.uk%2Fglobalassets%2Fshowrooms%2Fleeds%2F7.jpg",
    openToday: "9:00 AM - 5:30 PM",
    facilities: ["Expert advice", "Free design appointments", "Free parking", "Free WiFi", "Kitchens on display", "Bedrooms on display", "Toilets"],
    team: [
      { name: "David", role: "Store Manager" },
      { name: "Sophie", role: "Kitchen Designer" },
      { name: "Imran", role: "Kitchen Designer" },
    ],
    kitchensOnDisplay: [
      { name: "Milano Handleless Gloss", image: "https://asset.nobiadigital.com/fetch/ar_1.4,c_fill,q_auto,w_1600/f_auto/https%3A%2F%2Fwww.magnet.co.uk%2Fglobalassets%2Fshowrooms%2Fleeds%2Fkitchen-display-1.jpg", style: "Modern", isPrimary: true },
      { name: "Cambridge Shaker", image: "https://asset.nobiadigital.com/fetch/ar_1.4,c_fill,q_auto,w_1600/f_auto/https%3A%2F%2Fwww.magnet.co.uk%2Fglobalassets%2Fshowrooms%2Fleeds%2Fkitchen-display-2.jpg", style: "Traditional" },
      { name: "Oslo Matt Graphite", image: "https://asset.nobiadigital.com/fetch/ar_1.4,c_fill,q_auto,w_1600/f_auto/https%3A%2F%2Fwww.magnet.co.uk%2Fglobalassets%2Fshowrooms%2Fleeds%2Fkitchen-display-3.jpg", style: "Contemporary" },
    ],
    openingHours: [
      { day: "Monday", date: "24 Feb", hours: "9:00 AM - 5:30 PM" },
      { day: "Tuesday", date: "25 Feb", hours: "9:00 AM - 5:30 PM" },
      { day: "Wednesday", date: "26 Feb", hours: "9:00 AM - 5:30 PM" },
      { day: "Thursday", date: "27 Feb", hours: "9:00 AM - 7:00 PM" },
      { day: "Friday", date: "28 Feb", hours: "9:00 AM - 5:30 PM" },
      { day: "Saturday", date: "01 Mar", hours: "9:00 AM - 5:00 PM" },
      { day: "Sunday", date: "02 Mar", hours: "Closed" },
    ],
    nearbyStores: ["london-wembley", "leicester", "manchester-trafford"],
  },
  {
    slug: "leicester",
    name: "Lomash Wood Leicester",
    city: "Leicester",
    address: "Unit 12, Meridian Business Park, Braunstone Town",
    postcode: "LE19 1WZ",
    phone: "+441162345678",
    email: "leicester@lomashwood.co.uk",
    coordinates: {
      lat: 52.6369,
      lng: -1.1398,
    },
    image: "https://asset.nobiadigital.com/fetch/ar_1.4,c_fill,q_auto,w_1600/f_auto/https%3A%2F%2Fwww.magnet.co.uk%2Fglobalassets%2Fshowrooms%2Fleeds%2F1.jpg",
    openToday: "9:00 AM - 5:30 PM",
    facilities: ["Dog friendly", "Expert advice", "Free design appointments", "Free parking", "Free WiFi", "Kitchens on display"],
    team: [
      { name: "Sarah", role: "Store Manager" },
      { name: "Vikram", role: "Senior Kitchen Designer" },
      { name: "Emma", role: "Kitchen Designer" },
    ],
    kitchensOnDisplay: [
      { name: "Milano Handleless Gloss", image: "https://asset.nobiadigital.com/fetch/ar_1.4,c_fill,q_auto,w_1600/f_auto/https%3A%2F%2Fwww.magnet.co.uk%2Fglobalassets%2Fshowrooms%2Fleeds%2Fkitchen-display-1.jpg", style: "Modern" },
      { name: "Cambridge Shaker", image: "https://asset.nobiadigital.com/fetch/ar_1.4,c_fill,q_auto,w_1600/f_auto/https%3A%2F%2Fwww.magnet.co.uk%2Fglobalassets%2Fshowrooms%2Fleeds%2Fkitchen-display-2.jpg", style: "Traditional" },
    ],
    openingHours: [
      { day: "Monday", date: "24 Feb", hours: "9:00 AM - 5:30 PM" },
      { day: "Tuesday", date: "25 Feb", hours: "9:00 AM - 5:30 PM" },
      { day: "Wednesday", date: "26 Feb", hours: "9:00 AM - 5:30 PM" },
      { day: "Thursday", date: "27 Feb", hours: "9:00 AM - 7:00 PM" },
      { day: "Friday", date: "28 Feb", hours: "9:00 AM - 5:30 PM" },
      { day: "Saturday", date: "01 Mar", hours: "9:00 AM - 5:00 PM" },
      { day: "Sunday", date: "02 Mar", hours: "Closed" },
    ],
    nearbyStores: ["birmingham", "london-wembley", "manchester-trafford"],
  },
  {
    slug: "manchester-trafford",
    name: "Lomash Wood Manchester Trafford",
    city: "Manchester Trafford",
    address: "Unit 8, Trafford Retail Park, Chester Road",
    postcode: "M32 0TL",
    phone: "+441612345678",
    email: "manchester@lomashwood.co.uk",
    coordinates: {
      lat: 53.4631,
      lng: -2.2714,
    },
        image: "https://asset.nobiadigital.com/fetch/ar_1.4,c_fill,q_auto,w_1600/f_auto/https%3A%2F%2Fwww.magnet.co.uk%2Fglobalassets%2Fshowrooms%2Fleeds%2F8.jpg",
    openToday: "9:00 AM - 6:00 PM",
    facilities: ["Dog friendly", "Expert advice", "Free design appointments", "Free parking", "Free WiFi", "Kitchens on display", "Bedrooms on display", "Toilets"],
    team: [
      { name: "Tom", role: "Store Manager" },
      { name: "Nina", role: "Senior Kitchen Designer" },
      { name: "Chris", role: "Kitchen Designer" },
      { name: "Lauren", role: "Bedroom Specialist" },
    ],
    kitchensOnDisplay: [
      { name: "Milano Handleless Gloss", image: "https://asset.nobiadigital.com/fetch/ar_1.4,c_fill,q_auto,w_1600/f_auto/https%3A%2F%2Fwww.magnet.co.uk%2Fglobalassets%2Fshowrooms%2Fleeds%2Fkitchen-display-1.jpg", style: "Modern", isPrimary: true },
      { name: "Cambridge Shaker", image: "https://asset.nobiadigital.com/fetch/ar_1.4,c_fill,q_auto,w_1600/f_auto/https%3A%2F%2Fwww.magnet.co.uk%2Fglobalassets%2Fshowrooms%2Fleeds%2Fkitchen-display-2.jpg", style: "Traditional" },
      { name: "Oslo Matt Graphite", image: "https://asset.nobiadigital.com/fetch/ar_1.4,c_fill,q_auto,w_1600/f_auto/https%3A%2F%2Fwww.magnet.co.uk%2Fglobalassets%2Fshowrooms%2Fleeds%2Fkitchen-display-3.jpg", style: "Contemporary" },
    ],
    openingHours: [
      { day: "Monday", date: "24 Feb", hours: "9:00 AM - 6:00 PM" },
      { day: "Tuesday", date: "25 Feb", hours: "9:00 AM - 6:00 PM" },
      { day: "Wednesday", date: "26 Feb", hours: "9:00 AM - 6:00 PM" },
      { day: "Thursday", date: "27 Feb", hours: "9:00 AM - 8:00 PM" },
      { day: "Friday", date: "28 Feb", hours: "9:00 AM - 6:00 PM" },
      { day: "Saturday", date: "01 Mar", hours: "9:00 AM - 5:00 PM" },
      { day: "Sunday", date: "02 Mar", hours: "10:00 AM - 4:00 PM" },
    ],
    nearbyStores: ["birmingham", "leicester", "london-wembley"],
  },
  {
    slug: "leeds",
    name: "Lomash Wood Leeds",
    city: "Leeds",
    address: "Crown Point Retail Park, Junction 3, M621",
    postcode: "LS10 1ET",
    phone: "+441132345678",
    email: "leeds@lomashwood.co.uk",
    coordinates: {
      lat: 53.7960,
      lng: -1.5548,
    },
    image: "https://asset.nobiadigital.com/fetch/ar_1.4,c_fill,q_auto,w_1600/f_auto/https%3A%2F%2Fwww.magnet.co.uk%2Fglobalassets%2Fshowrooms%2Fleeds%2F9.jpg",
    openToday: "9:00 AM - 5:30 PM",
    facilities: ["Expert advice", "Free design appointments", "Free parking", "Free WiFi", "Kitchens on display", "Toilets"],
    team: [
      { name: "Mark", role: "Store Manager" },
      { name: "Hannah", role: "Kitchen Designer" },
    ],
    kitchensOnDisplay: [
      { name: "Cambridge Shaker", image: "https://asset.nobiadigital.com/fetch/ar_1.4,c_fill,q_auto,w_1600/f_auto/https%3A%2F%2Fwww.magnet.co.uk%2Fglobalassets%2Fshowrooms%2Fleeds%2Fkitchen-display-2.jpg", style: "Traditional" },
      { name: "Oslo Matt Graphite", image: "https://asset.nobiadigital.com/fetch/ar_1.4,c_fill,q_auto,w_1600/f_auto/https%3A%2F%2Fwww.magnet.co.uk%2Fglobalassets%2Fshowrooms%2Fleeds%2Fkitchen-display-3.jpg", style: "Contemporary" },
    ],
    openingHours: [
      { day: "Monday", date: "24 Feb", hours: "9:00 AM - 5:30 PM" },
      { day: "Tuesday", date: "25 Feb", hours: "9:00 AM - 5:30 PM" },
      { day: "Wednesday", date: "26 Feb", hours: "9:00 AM - 5:30 PM" },
      { day: "Thursday", date: "27 Feb", hours: "9:00 AM - 7:00 PM" },
      { day: "Friday", date: "28 Feb", hours: "9:00 AM - 5:30 PM" },
      { day: "Saturday", date: "01 Mar", hours: "9:00 AM - 5:00 PM" },
      { day: "Sunday", date: "02 Mar", hours: "Closed" },
    ],
    nearbyStores: ["manchester-trafford", "birmingham", "leicester"],
  },
  {
    slug: "bristol",
    name: "Lomash Wood Bristol",
    city: "Bristol",
    address: "Unit 3, Longwell Green Retail Park",
    postcode: "BS30 7DY",
    phone: "+441173456789",
    email: "bristol@lomashwood.co.uk",
    coordinates: {
      lat: 51.4545,
      lng: -2.5879,
    },
    image: "https://asset.nobiadigital.com/fetch/ar_1.4,c_fill,q_auto,w_1600/f_auto/https%3A%2F%2Fwww.magnet.co.uk%2Fglobalassets%2Fshowrooms%2Fbristol%2F1.jpg",
    openToday: "9:00 AM - 5:30 PM",
    facilities: ["Dog friendly", "Expert advice", "Free design appointments", "Free parking", "Free WiFi", "Kitchens on display"],
    team: [
      { name: "Oliver", role: "Store Manager" },
      { name: "Kate", role: "Senior Kitchen Designer" },
      { name: "Daniel", role: "Kitchen Designer" },
    ],
    kitchensOnDisplay: [
      { name: "Milano Handleless Gloss", image: "https://asset.nobiadigital.com/fetch/ar_1.4,c_fill,q_auto,w_1600/f_auto/https%3A%2F%2Fwww.magnet.co.uk%2Fglobalassets%2Fshowrooms%2Fbristol%2Fkitchen-display-1.jpg", style: "Modern" },
      { name: "Cambridge Shaker", image: "https://asset.nobiadigital.com/fetch/ar_1.4,c_fill,q_auto,w_1600/f_auto/https%3A%2F%2Fwww.magnet.co.uk%2Fglobalassets%2Fshowrooms%2Fbristol%2Fkitchen-display-2.jpg", style: "Traditional" },
      { name: "Oslo Matt Graphite", image: "https://asset.nobiadigital.com/fetch/ar_1.4,c_fill,q_auto,w_1600/f_auto/https%3A%2F%2Fwww.magnet.co.uk%2Fglobalassets%2Fshowrooms%2Fbristol%2Fkitchen-display-3.jpg", style: "Contemporary" },
    ],
    openingHours: [
      { day: "Monday", date: "24 Feb", hours: "9:00 AM - 5:30 PM" },
      { day: "Tuesday", date: "25 Feb", hours: "9:00 AM - 5:30 PM" },
      { day: "Wednesday", date: "26 Feb", hours: "9:00 AM - 5:30 PM" },
      { day: "Thursday", date: "27 Feb", hours: "9:00 AM - 7:00 PM" },
      { day: "Friday", date: "28 Feb", hours: "9:00 AM - 5:30 PM" },
      { day: "Saturday", date: "01 Mar", hours: "9:00 AM - 5:00 PM" },
      { day: "Sunday", date: "02 Mar", hours: "10:00 AM - 4:00 PM" },
    ],
    nearbyStores: ["london-wembley", "birmingham", "leicester"],
  },
]

export function getShowroomBySlug(slug: string): Showroom | undefined {
  return showrooms.find((s) => s.slug === slug)
}

export function getNearbyStores(slugs: string[]): Showroom[] {
  return slugs.map((slug) => showrooms.find((s) => s.slug === slug)).filter(Boolean) as Showroom[]
}

export function searchShowrooms(query: string): Showroom[] {
  const normalizedQuery = query.toLowerCase().trim()
  if (!normalizedQuery) return showrooms

  return showrooms.filter(
    (s) =>
      s.name.toLowerCase().includes(normalizedQuery) ||
      s.city.toLowerCase().includes(normalizedQuery) ||
      s.address.toLowerCase().includes(normalizedQuery) ||
      s.postcode.toLowerCase().replace(/\s/g, "").includes(normalizedQuery.replace(/\s/g, ""))
  )
}
