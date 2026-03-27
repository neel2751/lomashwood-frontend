import type { NavLink } from "@/types";

export interface MegaMenuColumn {
  heading: string;
  links: { label: string; href: string; image?: string; subtitle?: string }[];
}

export interface MegaMenuPromo {
  label: string;
  title: string;
  href: string;
  variant: "red" | "blue" | "green";
}

export interface NavItem {
  label: string;
  href: string;
  hasMegaMenu?: boolean;
  megaMenu?: {
    columns: MegaMenuColumn[];
    promos?: MegaMenuPromo[];
  };
}

export const mainNavigation: NavItem[] = [
  {
    label: "Kitchen",
    href: "/kitchen",
    hasMegaMenu: true,
    megaMenu: {
      columns: [
        {
          heading: "OUR KITCHENS",
          links: [
            { label: "All kitchens", href: "/kitchen" },
          ],
        },
        {
          heading: "STYLE",
          links: [
            { label: "Modern", href: "/kitchen?style=modern" },
            { label: "Shaker", href: "/kitchen?style=shaker" },
            { label: "Traditional", href: "/kitchen?style=traditional" },
            { label: "Inframe", href: "/kitchen?style=inframe" },
            { label: "Accessible kitchens", href: "/kitchen?style=accessible" },
          ],
        },
        {
          heading: "COLOUR",
          links: [
            { label: "Whites", href: "/kitchen?colour=white" },
            { label: "Blacks", href: "/kitchen?colour=black" },
            { label: "Greys", href: "/kitchen?colour=grey" },
            { label: "Creams", href: "/kitchen?colour=cream" },
            { label: "Blues", href: "/kitchen?colour=blue" },
            { label: "Greens", href: "/kitchen?colour=green" },
          ],
        },
        {
          heading: "#RENOVATION",
          links: [
            {
              label: "Kitchen makeovers & renovations",
              href: "/inspiration/kitchen-makeovers",
            },
            {
              label: "Karren's kitchen",
              href: "/inspiration/karriens-kitchen",
              subtitle: "Shaker Chelsea in Mushroom",
              image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=200&auto=format&fit=crop",
            },
            {
              label: "Heidi's kitchen",
              href: "/inspiration/heidis-kitchen",
              subtitle: "Milano Shaker in Ceramic",
              image: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=200&auto=format&fit=crop",
            },
            {
              label: "Shelley's kitchen",
              href: "/inspiration/shelleys-kitchen",
              subtitle: "Milano Ultra in Nero",
              image: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?q=80&w=200&auto=format&fit=crop",
            },
          ],
        },
        {
          heading: "FINISHING TOUCHES",
          links: [
            { label: "All accessories & appliances", href: "/kitchen/accessories" },
            { label: "Kitchen worktops", href: "/kitchen/worktops" },
            { label: "Kitchen sinks", href: "/kitchen/sinks" },
            { label: "Kitchen taps", href: "/kitchen/taps" },
            { label: "Kitchen handles", href: "/kitchen/handles" },
            { label: "Kitchen flooring", href: "/kitchen/flooring" },
          ],
        },
      ],
      promos: [
        {
          label: "EXCLUSIVE OFFERS",
          title: "End soon",
          href: "/sale",
          variant: "red",
        },
        {
          label: "UP TO",
          title: "7 years",
          href: "/finance",
          variant: "blue",
        },
      ],
    },
  },
  {
    label: "Bedroom",
    href: "/bedroom",
    hasMegaMenu: true,
    megaMenu: {
      columns: [
        {
          heading: "OUR BEDROOMS",
          links: [
            { label: "All bedrooms", href: "/bedroom" },
          ],
        },
        {
          heading: "STYLE",
          links: [
            { label: "Modern", href: "/bedroom?style=modern" },
            { label: "Traditional", href: "/bedroom?style=traditional" },
            { label: "Industrial", href: "/bedroom?style=industrial" },
            { label: "Scandinavian", href: "/bedroom?style=scandinavian" },
          ],
        },
        {
          heading: "COLOUR",
          links: [
            { label: "Whites", href: "/bedroom?colour=white" },
            { label: "Greys", href: "/bedroom?colour=grey" },
            { label: "Oaks", href: "/bedroom?colour=oak" },
            { label: "Creams", href: "/bedroom?colour=cream" },
            { label: "Blacks", href: "/bedroom?colour=black" },
          ],
        },
        {
          heading: "INSPIRATION",
          links: [
            {
              label: "Bedroom makeovers",
              href: "/inspiration/bedroom-makeovers",
            },
            {
              label: "Modern bedroom",
              href: "/inspiration/modern-bedroom",
              subtitle: "White gloss finish",
              image: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=200&auto=format&fit=crop",
            },
            {
              label: "Classic bedroom",
              href: "/inspiration/classic-bedroom",
              subtitle: "Oak wood grain",
              image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=200&auto=format&fit=crop",
            },
          ],
        },
        {
          heading: "STORAGE",
          links: [
            { label: "All storage solutions", href: "/bedroom/storage" },
            { label: "Wardrobes", href: "/bedroom/wardrobes" },
            { label: "Drawers", href: "/bedroom/drawers" },
            { label: "Shelving", href: "/bedroom/shelving" },
            { label: "Bedside tables", href: "/bedroom/bedside-tables" },
          ],
        },
      ],
      promos: [
        {
          label: "EXCLUSIVE OFFERS",
          title: "End soon",
          href: "/sale",
          variant: "red",
        },
        {
          label: "UP TO",
          title: "7 years",
          href: "/finance",
          variant: "blue",
        },
      ],
    },
  },
  {
    label: "Offers",
    href: "/sale",
  },
  {
    label: "Find a Showroom",
    href: "/showrooms",
  },
  {
    label: "Finance",
    href: "/finance",
  },
  {
    label: "Inspiration & Guide",
    href: "/inspiration",
  },
];

export const hamburgerMenuLinks: NavLink[] = [
  { label: "Inspiration", href: "/inspiration" },
  { label: "Our Blog", href: "/blog" },
  { label: "Download Brochure", href: "/brochure" },
];

export const footerNavigation = {
  company: [
    // { label: "About Us", href: "/about" },
    { label: "Our Process", href: "/our-process" },
    { label: "Why Choose Us", href: "/why-choose-us" },
    { label: "Contact Us", href: "/contact" },
    { label: "Careers", href: "/careers" },
  ],
  products: [
    { label: "Kitchen Collection", href: "/kitchen" },
    { label: "Bedroom Collection", href: "/bedroom" },
    { label: "Media Wall", href: "/media-wall" },
    { label: "Special Offers", href: "/sale" },
    { label: "Our Projects", href: "/projects" },
  ],
  support: [
    { label: "Book Consultation", href: "/book-appointment" },
    { label: "Finance Options", href: "/finance" },
    { label: "Find Showroom", href: "/showrooms" },
    { label: "Download Brochure", href: "/brochure" },
    { label: "FAQs", href: "/faqs" },
  ],
  legal: [
    { label: "Terms & Conditions", href: "/terms-conditions" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Cookies Policy", href: "/cookies" },
    { label: "Sitemap", href: "/sitemap.xml" },
  ],
};

export const accountNavigation: NavLink[] = [
  { label: "Dashboard", href: "/my-account", icon: "LayoutDashboard" },
  { label: "My Profile", href: "/my-account/profile", icon: "User" },
  { label: "My Orders", href: "/my-account/orders", icon: "ShoppingBag" },
  { label: "My Appointments", href: "/my-account/appointments", icon: "Calendar" },
  { label: "Wishlist", href: "/my-account/wishlist", icon: "Heart" },
  { label: "Saved Designs", href: "/my-account/saved-designs", icon: "Bookmark" },
  { label: "Settings", href: "/my-account/settings", icon: "Settings" },
];

export const mobileBottomNavigation: NavLink[] = [
  { label: "Home", href: "/", icon: "Home" },
  { label: "Kitchen", href: "/kitchen", icon: "ChefHat" },
  { label: "Bedroom", href: "/bedroom", icon: "Bed" },
  { label: "Offers", href: "/sale", icon: "Tag" },
  { label: "More", href: "/menu", icon: "Menu" },
];

export const breadcrumbConfig = {
  "/": { label: "Home" },
  "/kitchen": { label: "Kitchen Collection" },
  "/bedroom": { label: "Bedroom Collection" },
  "/sale": { label: "Special Offers" },
  "/showrooms": { label: "Find a Showroom" },
  "/finance": { label: "Finance Options" },
  "/inspiration": { label: "Inspiration & Guide" },
  "/blog": { label: "Our Blog" },
  "/brochure": { label: "Download Brochure" },
  "/book-appointment": { label: "Book Consultation" },

  "/our-process": { label: "Our Process" },
  "/why-choose-us": { label: "Why Choose Us" },
  "/contact": { label: "Contact Us" },
  "/media-wall": { label: "Media Wall" },
  "/my-account": { label: "My Account" },
};

export const quickLinks = {
  primary: { label: "Book Free Consultation", href: "/book-appointment" },
  secondary: { label: "Download Brochure", href: "/brochure" },
};

export const socialLinks = [
  { name: "Facebook", href: "https://www.facebook.com/people/Lomash-Wood-Ltd/61557434510488/", icon: "Facebook" },
  { name: "Instagram", href: "https://www.instagram.com/lomashwood_uk", icon: "Instagram" },
  { name: "TikTok", href: "https://www.tiktok.com/@lomashwooduk", icon: "TikTok" },
  // { name: "LinkedIn", href: "#", icon: "Linkedin" },
];

export const helpLinks: NavLink[] = [
  { label: "Help Center", href: "/help", icon: "HelpCircle" },
  { label: "Contact Support", href: "/contact", icon: "MessageCircle" },
  { label: "FAQs", href: "/faqs", icon: "FileQuestion" },
  { label: "Live Chat", href: "#", icon: "MessageSquare" },
];
