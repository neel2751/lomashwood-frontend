import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { ExploreKitchen } from "@/components/home/ExploreKitchen";
import { ExploreBedroom } from "@/components/home/ExploreBedroom";
import { ColorOptions } from "@/components/home/ColorOptions";
import { OfferSection } from "@/components/home/OfferSection";
import { PackageSection } from "@/components/home/PackageSection";
import { MediaWall } from "@/components/home/MediaWall";
import { FinanceSection } from "@/components/home/FinanceSection";
import { OurProcess } from "@/components/home/OurProcess";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { Projects } from "@/components/home/Projects";
import { MainCTA } from "@/components/home/MainCTA";
import { pageSEO } from "@/config/site";

export const metadata: Metadata = {
  title: pageSEO.home.title,
  description: pageSEO.home.description,
  keywords: [...pageSEO.home.keywords],
  openGraph: {
    title: pageSEO.home.title,
    description: pageSEO.home.description,
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      {/* Hero Section - Full width slider with CTA */}
      <Hero />

      {/* Explore Kitchen - Featured kitchen products */}
      <ExploreKitchen />

      {/* Explore Bedroom - Featured bedroom products */}
      <ExploreBedroom />

      {/* Color Options - Color picker section */}
      <ColorOptions />

      {/* Offer Section - Special offers slider */}
      <OfferSection />

      {/* Package Section - Kitchen & Bedroom packages */}
      <PackageSection />

      {/* Media Wall - Large CTA section with image/video */}
      <MediaWall />

      {/* Finance Section - Finance options and benefits */}
      <FinanceSection />

      {/* Our Process - 4 step process */}
      <OurProcess />

      {/* Why Choose Us - 6 key features */}
      <WhyChooseUs />

      {/* Projects - Featured projects showcase */}
      <Projects />

      {/* Main CTA - Final call to action with image */}
      <MainCTA />
    </>
  );
}