  import type { Metadata } from "next";

  import { ColorOptions } from "@/components/home/ColorOptions";
  import { ExploreBedroom } from "@/components/home/ExploreBedroom";
  import { ExploreKitchen } from "@/components/home/ExploreKitchen";
  import { FinanceSection } from "@/components/home/FinanceSection";
  import { Hero } from "@/components/home/Hero";
  import HomeScrollRestore from "@/components/home/HomeScrollRestore";
  import { MainCTA } from "@/components/home/MainCTA";
  import { MediaWall } from "@/components/home/MediaWall";
  import { OurProcess } from "@/components/home/OurProcess";
  import { PackageSection } from "@/components/home/PackageSection";
  import { Projects } from "@/components/home/Projects";
  import { WhyChooseUs } from "@/components/home/WhyChooseUs";
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
      <main>
        <HomeScrollRestore />

        {/* Hero Section - Full width slider with CTA */}
        <Hero />

        {/* Explore Kitchen - Featured kitchen products */}
        <ExploreKitchen />

        {/* Explore Bedroom - Featured bedroom products */}
        <ExploreBedroom />

        {/* Color Options - Color picker section */}
        <ColorOptions />  

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
      </main>
    );
  }