"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  Variants,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  }),
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (i: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.9, ease: "easeOut", delay: i * 0.1 },
  }),
};

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const imageReveal: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 },
  visible: (i: number = 0) => ({
    clipPath: "inset(0% 0% 0% 0%)",
    opacity: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
};

function AnimatedSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function PillBadge({ text, centered = true }: { text: string; centered?: boolean }) {
  return (
    <motion.span
      variants={fadeIn}
      custom={0}
      className={`inline-block bg-[#F0F4EC] text-[#2D4A1E] text-xs font-semibold tracking-wide px-4 py-1.5 rounded-full border border-[#D0DCC8] mb-4 ${centered ? "block text-center w-fit mx-auto" : ""}`}
    >
      {text}
    </motion.span>
  );
}

function SectionHeading({
  badge,
  title,
  subtitle,
  align = "center",
}: {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  const c = align === "center";
  return (
    <AnimatedSection className={`mb-12 md:mb-16 ${c ? "text-center" : ""}`}>
      {badge && <PillBadge text={badge} centered={c} />}
      <motion.h2
        variants={fadeUp}
        custom={1}
        className={`text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0F0F0F] leading-tight mb-4 ${c ? "mx-auto max-w-2xl" : ""}`}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeUp}
          custom={2}
          className={`text-[#555] text-base md:text-lg leading-relaxed ${c ? "mx-auto max-w-2xl" : "max-w-xl"}`}
        >
          {subtitle}
        </motion.p>
      )}
    </AnimatedSection>
  );
}

function PrimaryBtn({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 bg-[#2D4A1E] text-white px-7 py-3.5 rounded-md text-sm font-semibold hover:bg-[#3D6B2A] transition-colors duration-200"
    >
      {children}
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  );
}

function OutlineBtn({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 border border-[#2D4A1E] text-[#2D4A1E] px-7 py-3.5 rounded-md text-sm font-semibold hover:bg-[#2D4A1E] hover:text-white transition-colors duration-200"
    >
      {children}
    </Link>
  );
}

function GalleryGrid({
  images,
  layout = "default",
}: {
  images: { src: string; alt: string; span?: string }[];
  layout?: "default" | "masonry" | "feature";
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const gridClass =
    layout === "feature"
      ? "grid grid-cols-12 gap-3 md:gap-4"
      : layout === "masonry"
      ? "grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
      : "grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4";

  return (
    <motion.div
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={gridClass}
    >
      {images.map((img, i) => (
        <motion.div
          key={i}
          variants={imageReveal}
          custom={i}
          className={`relative overflow-hidden group rounded-xl ${img.span || ""} ${
            layout === "masonry" && i % 3 === 1 ? "mt-8" : ""
          }`}
          style={{
            aspectRatio:
              layout === "feature" && img.span?.includes("col-span-8")
                ? "16/9"
                : layout === "masonry"
                ? i % 2 === 0
                  ? "3/4"
                  : "4/5"
                : "4/3",
          }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
        </motion.div>
      ))}
    </motion.div>
  );
}

function MediaWallHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative h-[90vh] min-h-[560px] overflow-hidden">
      {/* Parallax image */}
      <motion.div style={{ y }} className="absolute inset-0 scale-110">
        <Image
          src="https://images.unsplash.com/photo-1662454420647-3d20ddcdb8f8?q=80&w=1702&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Bespoke Media Wall by Lomash Wood"
          fill
          priority
          className="object-cover"
        />
        {/* Dark green tinted overlay matching brand */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a2e10]/80 via-[#1a2e10]/50 to-[#1a2e10]/10" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 flex flex-col justify-center h-full px-6 md:px-16 max-w-screen-xl mx-auto"
      >
        <AnimatedSection>
          <motion.p
            variants={fadeIn}
            custom={0}
            className="text-white/70 text-xs font-bold tracking-[0.2em] uppercase mb-5"
          >
            Lomash Wood — Bespoke Joinery
          </motion.p>

          {/* Bold extrabold heading — exactly matching site style */}
          <motion.h1
            variants={fadeUp}
            custom={1}
            className="text-white text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] mb-5 max-w-2xl"
          >
            Make Your Living Space a Statement
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-white/75 text-base md:text-lg leading-relaxed max-w-lg mb-8"
          >
            Don&apos;t let your living room be ordinary. Our bespoke media and
            feature walls are crafted to transform the heart of your home.
          </motion.p>

          <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-3">
            <Link
              href="/book-appointment"
              className="inline-flex items-center gap-2 bg-[#2D4A1E] text-white px-7 py-3.5 rounded-md text-sm font-bold hover:bg-[#3D6B2A] transition-colors duration-200"
            >
              Book Free Consultation →
            </Link>
            <Link
              href="#gallery"
              className="inline-flex items-center gap-2 border border-white/60 text-white px-7 py-3.5 rounded-md text-sm font-bold hover:bg-white/10 transition-colors duration-200"
            >
              View Gallery
            </Link>
          </motion.div>
        </AnimatedSection>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
          className="w-5 h-8 rounded-full border-2 border-white/40 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 bg-white/60 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function IntroSection() {
  return (
    <section className="py-20 md:py-28 px-6 md:px-16 max-w-screen-xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        {/* Left */}
        <AnimatedSection>
          <motion.h2
            variants={fadeUp}
            custom={0}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0F0F0F] leading-tight mb-5"
          >
            Bespoke Media &amp; Fireplace{" "}
            <span className="text-[#2D4A1E]">Walls</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={1}
            className="text-[#555] text-base leading-relaxed mb-4"
          >
            One of the most striking trends in modern interiors is the bespoke
            feature wall — designed to incorporate a fireplace, TV, or both.
            These architectural focal points bring balance and sophistication to
            any room.
          </motion.p>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-[#555] text-base leading-relaxed mb-6"
          >
            At Lomash Wood, each design is tailored to its surroundings — uniting
            cabinetry, lighting, and material textures to create a cohesive
            feature that enhances both the aesthetic and atmosphere of your home.
          </motion.p>

          {/* Bullet list — matches site Finance section style */}
          <motion.ul variants={staggerContainer} className="space-y-3 mb-8">
            {[
              "Fully bespoke — designed around your exact space",
              "In-house design, manufacture, and installation",
              "No hidden charges — transparent pricing throughout",
            ].map((item, i) => (
              <motion.li key={i} variants={fadeUp} custom={i} className="flex items-start gap-3">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-[#2D4A1E] flex-shrink-0" />
                <span className="text-[#333] text-sm font-medium">{item}</span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-3">
            <PrimaryBtn href="/book-appointment">Explore Options</PrimaryBtn>
            <OutlineBtn href="/contact">Speak to an Advisor</OutlineBtn>
          </motion.div>
        </AnimatedSection>

        {/* Right image */}
        <AnimatedSection>
          <motion.div
            variants={imageReveal}
            className="relative overflow-hidden rounded-xl"
            style={{ aspectRatio: "4/5" }}
          >
            <Image
              src="https://plus.unsplash.com/premium_photo-1683134024478-43c2d7eb5cc6?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Lomash Wood bespoke media wall"
              fill
              className="object-cover"
            />
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function FeatureCards() {
  const features = [
    {
      icon: (
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
          <rect x="2" y="5" width="22" height="16" rx="2" stroke="#2D4A1E" strokeWidth="1.8" />
          <path d="M2 10h22" stroke="#2D4A1E" strokeWidth="1.8" />
          <rect x="6" y="14" width="4" height="3" rx="0.5" fill="#2D4A1E" />
        </svg>
      ),
      title: "Concealed Cabinetry",
      desc: "Flush-front doors and push-to-open for a clean, uninterrupted surface finish.",
    },
    {
      icon: (
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
          <path d="M13 3C7.477 3 3 7.477 3 13s4.477 10 10 10 10-4.477 10-10S18.523 3 13 3z" stroke="#2D4A1E" strokeWidth="1.8" />
          <path d="M13 7v6l4 2" stroke="#2D4A1E" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      ),
      title: "Quick Approval",
      desc: "Get your design concept approved with 3D renders before any work begins.",
    },
    {
      icon: (
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
          <path d="M13 2l2.6 7.9H24l-6.7 4.9 2.6 7.8L13 18.1l-6.9 4.5 2.6-7.8L2 9.9h8.4L13 2z" stroke="#2D4A1E" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      ),
      title: "Feature Backdrops",
      desc: "Marble, stone veneer, fluted or reeded surfaces as dramatic focal points.",
    },
    {
      icon: (
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
          <path d="M21 16s-2 2.5-8 2.5S5 16 5 16" stroke="#2D4A1E" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M5 10s2-2.5 8-2.5 8 2.5 8 2.5" stroke="#2D4A1E" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M5 10v6M21 10v6" stroke="#2D4A1E" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      ),
      title: "Extended Warranty",
      desc: "All our media walls come with an extended warranty for total peace of mind.",
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-[#F5F7F3] px-6 md:px-16">
      <div className="max-w-screen-xl mx-auto">
        <SectionHeading
          badge="What We Offer"
          title="Design Possibilities & Applications"
          subtitle="Media and feature walls can take many forms. We work with proportion, texture, and materials to suit your space perfectly."
        />

        <AnimatedSection>
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {features.map((f, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                className="bg-white rounded-xl p-7 border border-[#E0E5DC] hover:shadow-md transition-shadow duration-300"
              >
                {/* Icon container — matches homepage icon cards */}
                <div className="w-12 h-12 bg-[#F0F4EC] rounded-lg flex items-center justify-center mb-5 border border-[#D0DCC8]">
                  {f.icon}
                </div>
                <h3 className="text-[#0F0F0F] text-base font-bold mb-2">{f.title}</h3>
                <p className="text-[#666] text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function GalleryOne() {
  const images = [
    { src: "/images/media-wall/gallery-1-1.jpg", alt: "Dark wood media wall with fireplace", span: "col-span-12 md:col-span-8" },
    { src: "/images/media-wall/gallery-1-2.jpg", alt: "Minimalist white panelled wall unit", span: "col-span-12 md:col-span-4" },
    { src: "/images/media-wall/gallery-1-3.jpg", alt: "Open shelving media wall oak", span: "col-span-12 md:col-span-4" },
    { src: "/images/media-wall/gallery-1-4.jpg", alt: "Fluted wood panel TV wall", span: "col-span-12 md:col-span-4" },
    { src: "/images/media-wall/gallery-1-5.jpg", alt: "Stone cladding fireplace surround", span: "col-span-12 md:col-span-4" },
  ];

  return (
    <section id="gallery" className="py-16 md:py-24 px-6 md:px-16 max-w-screen-xl mx-auto">
      <SectionHeading
        badge="Our Portfolio"
        title="Recent Installations"
        subtitle="A selection of bespoke media and feature walls designed and installed across the UK."
      />
      <GalleryGrid images={images} layout="feature" />
    </section>
  );
}

function MaterialsSection() {
  const materials = [
    { name: "Rich Wood Veneers", sub: "Oak · Walnut · Ash · Ebony" },
    { name: "Natural Stone Cladding", sub: "Marble · Slate · Quartzite" },
    { name: "Textured Panels", sub: "Reeded · Ribbed · Fluted" },
    { name: "Metal Trims & Accents", sub: "Brass · Gunmetal · Brushed Steel" },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#2D4A1E] overflow-hidden">
      <div className="px-6 md:px-16 max-w-screen-xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Left image */}
          <AnimatedSection>
            <motion.div
              variants={imageReveal}
              className="relative overflow-hidden rounded-xl"
              style={{ aspectRatio: "3/4" }}
            >
              <Image
                src="https://plus.unsplash.com/premium_photo-1664302223105-5e1818f48359?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Lomash Wood material finishes"
                fill
                className="object-cover"
              />
            </motion.div>
          </AnimatedSection>

          {/* Right content */}
          <AnimatedSection>
            <motion.span
              variants={fadeIn}
              className="inline-block bg-white/10 text-white/80 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6 border border-white/15"
            >
              Materials &amp; Finishes
            </motion.span>

            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-white text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-4"
            >
              Built to Last,{" "}
              <span className="text-[#8DC26F]">Crafted to Inspire</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-white/65 text-base leading-relaxed mb-8"
            >
              Our material palette is chosen for durability under heat, lighting,
              and frequent use — without compromising on beauty.
            </motion.p>

            <motion.div variants={staggerContainer} className="space-y-0 mb-8">
              {materials.map((m, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  custom={i}
                  className="flex items-center justify-between py-4 border-b border-white/15"
                >
                  <div>
                    <p className="text-white font-bold text-sm">{m.name}</p>
                    <p className="text-white/45 text-xs mt-0.5">{m.sub}</p>
                  </div>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-white/30">
                    <path d="M4 9h10M10 5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} custom={5}>
              <Link
                href="/our-process"
                className="inline-flex items-center gap-2 bg-white text-[#2D4A1E] px-7 py-3.5 rounded-md text-sm font-bold hover:bg-[#F0F4EC] transition-colors duration-200"
              >
                Our Process →
              </Link>
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

function GalleryTwo() {
  const images = [
    { src: "https://plus.unsplash.com/premium_photo-1664302223105-5e1818f48359?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Bespoke joinery media wall" },
    { src: "https://images.unsplash.com/photo-1583200028472-9c7c8f0f4c5e?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Dark panelled fireplace wall" },
    { src: "https://images.unsplash.com/photo-1596262552974-7b6a0b7c9e4d?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Natural oak shelving unit" },
    { src: "https://images.unsplash.com/photo-1596262552974-7b6a0b7c9e4d?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Contemporary marble surround" },
    { src: "https://images.unsplash.com/photo-1596262552974-7b6a0b7c9e4d?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "White media unit with lighting" },
    { src: "https://images.unsplash.com/photo-1596262552974-7b6a0b7c9e4d?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Ribbed panel feature wall" },
  ];

  return (
    <section className="py-16 md:py-24 px-6 md:px-16 max-w-screen-xl mx-auto">
      <GalleryGrid images={images} layout="masonry" />
    </section>
  );
}

function ProcessSection() {
  const steps = [
    {
      num: "01",
      title: "Consultation & Briefing",
      desc: "We consider your room layout, furniture, AV equipment, fireplace needs, and personal preferences to build a complete brief.",
    },
    {
      num: "02",
      title: "Concept Design & Visuals",
      desc: "3D renders and finish samples help refine proportions, lighting, and materials before any work begins.",
    },
    {
      num: "03",
      title: "Workshop Production",
      desc: "Precision joinery completed under controlled conditions by our master craftsmen at our in-house workshop.",
    },
    {
      num: "04",
      title: "On-Site Installation",
      desc: "Carefully aligning panels, structural elements, and integrating all technology systems with a clean finish.",
    },
    {
      num: "05",
      title: "Finishing Touches & QA",
      desc: "Final finishes, clean lines, cable management, and full integration checks before sign-off.",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#F5F7F3] px-6 md:px-16">
      <div className="max-w-screen-xl mx-auto">
        <SectionHeading
          badge="How It Works"
          title="Our Process"
          subtitle="From consultation to installation, we guide you through every step to create your perfect feature wall."
        />

        <AnimatedSection>
          <motion.div variants={staggerContainer} className="space-y-0">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                className="grid grid-cols-12 gap-4 md:gap-10 py-7 md:py-8 border-b border-[#D8E0D2] items-start hover:bg-white transition-colors duration-200 px-4 -mx-4 rounded-lg group"
              >
                <div className="col-span-2 md:col-span-1">
                  <span className="text-[#2D4A1E] text-2xl font-extrabold">{s.num}</span>
                </div>
                <div className="col-span-10 md:col-span-4">
                  <h3 className="text-[#0F0F0F] font-bold text-base md:text-lg">{s.title}</h3>
                </div>
                <div className="col-span-12 md:col-span-7">
                  <p className="text-[#666] text-sm leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatedSection>

        <AnimatedSection className="mt-12 flex justify-center gap-4 flex-wrap">
          <motion.div variants={fadeUp} custom={0}>
            <PrimaryBtn href="/book-appointment">Book Free Consultation</PrimaryBtn>
          </motion.div>
          <motion.div variants={fadeUp} custom={1}>
            <OutlineBtn href="/contact">Speak to an Advisor</OutlineBtn>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function GalleryThree() {
  const images = [
    { src: "", alt: "Luxury media wall installation" },
    { src: "/images/media-wall/gallery-3-2.jpg", alt: "Bespoke fireplace surround" },
    { src: "/images/media-wall/gallery-3-3.jpg", alt: "Custom joinery living room" },
    { src: "/images/media-wall/gallery-3-4.jpg", alt: "Feature wall with shelving" },
    { src: "/images/media-wall/gallery-3-5.jpg", alt: "Dark panelled TV wall" },
    { src: "/images/media-wall/gallery-3-6.jpg", alt: "Contemporary TV unit" },
    { src: "/images/media-wall/gallery-3-7.jpg", alt: "Stone feature wall" },
    { src: "/images/media-wall/gallery-3-8.jpg", alt: "Integrated lighting unit" },
  ];

  return (
    <section className="py-16 md:py-24 px-6 md:px-16 max-w-screen-xl mx-auto">
      <GalleryGrid images={images} layout="default" />
    </section>
  );
}

function WhySection() {
  const reasons = [
    { title: "Expert Craftsmanship", desc: "Expert experience in luxury media wall design and bespoke joinery across the UK." },
    { title: "Bespoke Solutions", desc: "Every design is calibrated to your specific room, architecture, and lifestyle." },
    { title: "Seamless Integration", desc: "We integrate media walls with your existing joinery for complete visual harmony." },
    { title: "No Hidden Costs", desc: "Transparent pricing — what you're quoted is what you pay, start to finish." },
    { title: "In-House Control", desc: "Design, manufacturing, and installation all handled by our own team." },
    { title: "Long-Term Durability", desc: "Materials and finishes chosen for longevity and performance under daily use." },
  ];

  return (
    <section className="py-20 md:py-28 px-6 md:px-16">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Left */}
          <AnimatedSection>
            <PillBadge text="Why Choose Us" centered={false} />
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0F0F0F] leading-tight mb-5"
            >
              Why Lomash Wood for Your{" "}
              <span className="text-[#2D4A1E]">Feature Wall?</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-[#555] text-base leading-relaxed mb-8">
              A media or fireplace wall designed by Lomash Wood becomes a central
              piece — both in function and in form.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-3">
              <PrimaryBtn href="/book-appointment">Book Free Consultation</PrimaryBtn>
              <OutlineBtn href="/showrooms">Find a Showroom</OutlineBtn>
            </motion.div>
          </AnimatedSection>

          {/* Right — 2-col card grid matching Finance section */}
          <AnimatedSection>
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {reasons.map((r, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  custom={i}
                  className="bg-[#F5F7F3] rounded-xl p-6 border border-[#E0E5DC] hover:bg-white hover:shadow-sm transition-all duration-300"
                >
                  <h3 className="text-[#0F0F0F] font-bold text-lg mb-2">{r.title}</h3>
                  <p className="text-[#666] text-sm leading-relaxed">{r.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

function CTABanner() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);

  return (
    <section ref={ref} className="relative h-[55vh] md:h-[65vh] overflow-hidden">
      <motion.div style={{ scale }} className="absolute inset-0">
        <Image
          src="/images/media-wall/cta-banner.jpg"
          alt="Create your statement media wall with Lomash Wood"
          fill
          className="object-cover"
        />
        {/* Brand green overlay */}
        <div className="absolute inset-0 bg-lomash-secondary" />
      </motion.div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <AnimatedSection>
          <motion.p
            variants={fadeIn}
            custom={0}
            className="text-lomash-secondary text-xs font-bold tracking-[0.2em] uppercase mb-4 bg-lomash-light px-3 py-1 rounded-full border border-white/30 max-w-max mx-auto"
          >
            Ready to Begin?
          </motion.p>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="text-white text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-3 max-w-2xl"
          >
            Create a Statement Wall in Your Home
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-white/70 text-base leading-relaxed max-w-lg mx-auto mb-8"
          >
            Transform your living room with a bespoke media or fireplace wall that
            blends architecture, craftsmanship, and elegance.
          </motion.p>
          <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/book-appointment"
              className="inline-flex items-center gap-2 bg-white text-[#2D4A1E] px-6 py-3 rounded-md text-base font-bold hover:bg-[#F0F4EC] transition-colors duration-200"
            >
              Book Free Consultation →
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-white/60 text-white px-6 py-3 rounded-md text-base font-bold hover:bg-white/10 transition-colors duration-200"
            >
              Speak to an Advisor
            </Link>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function RelatedSections() {
  const related = [
    { title: "Kitchens", sub: "Explore our kitchen range", href: "/kitchen", img: "https://plus.unsplash.com/premium_photo-1683140941523-f1fbbabe54d5?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { title: "Bedrooms", sub: "Bespoke bedroom joinery", href: "/bedroom", img: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=3280&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { title: "Inspiration", sub: "Browse our project gallery", href: "/inspiration", img: "https://plus.unsplash.com/premium_photo-1683120852623-143817d6400b?q=80&w=3276&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  ];

  return (
    <section className="py-20 md:py-28 px-6 md:px-16 bg-[#F5F7F3]">
      <div className="max-w-screen-xl mx-auto">
        <SectionHeading
          badge="Explore More"
          title="Our Other Specialisms"
          subtitle="From kitchens to bedrooms, Lomash Wood brings expert craftsmanship to every space in your home."
        />

        <AnimatedSection>
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {related.map((r, i) => (
              <motion.div key={i} variants={imageReveal} custom={i}>
                <Link
                  href={r.href}
                  className="group block relative overflow-hidden rounded-xl"
                  style={{ aspectRatio: "4/3" }}
                >
                  <Image
                    src={r.img}
                    alt={r.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-white/70 text-xs font-bold tracking-widest uppercase mb-1">{r.sub}</p>
                    <h3 className="text-white text-2xl font-extrabold">{r.title}</h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}

export default function MediaWallPage() {
  return (
    <main className="bg-white">
      <MediaWallHero />
      <IntroSection />
      <FeatureCards />
      <GalleryOne />
      <MaterialsSection />
      <GalleryTwo />
      <ProcessSection />
      <GalleryThree />
      <WhySection />
      <CTABanner />
      <RelatedSections />
    </main>
  );
}