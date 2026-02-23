import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Our Process | Lomash Wood',
  description:
    'From consultation to installation, discover how we transform your vision into a bespoke kitchen or bedroom. Our proven 5-step process ensures exceptional quality.',
};
const steps = [
  {
    number: '01',
    title: 'Consultation',
    subtitle: 'Your Journey Begins Here',
    description:
      'We start with a relaxed, no-obligation conversation — in our showroom, at your home, or virtually. Our designers take time to understand how you live, what you love, and what you need from your space. No pressure, just great conversation and creative thinking.',
    details: [
      'In-person, home visit, or virtual options',
      'Discuss your style and functional needs',
      'Initial ideas and inspiration',
      'Completely free, no obligation',
    ],
    image: 'consultation',
    cta: { text: 'Book a Consultation', href: '/book-appointment' },
    align: 'right' as const,
  },
  {
    number: '02',
    title: 'Design',
    subtitle: 'Bringing Your Vision to Life',
    description:
      'After your consultation, our designers create detailed CAD drawings and 3D renders for you to review. This stage is all about refining the layout, style, and details to ensure the design meets your exact needs. Adjustments and revisions are part of the process — we continue until you are completely satisfied.',
    details: [
      'Detailed CAD drawings and 3D renders',
      'Full material and finish selection',
      'Revisions until you are completely satisfied',
      'Final quote provided before proceeding',
    ],
    image: 'design',
    cta: { text: 'View Our Work', href: '/inspiration' },
    align: 'left' as const,
  },
  {
    number: '03',
    title: 'Manufacture',
    subtitle: 'Crafted to Your Exact Specification',
    description:
      'Once the design is finalised, we move into the manufacturing phase. All our kitchen and bedroom furniture is bespoke — ordered to your exact specification. Every component is precision-crafted, and we coordinate with trusted tradespeople throughout the process.',
    details: [
      'Bespoke manufacturing to specification',
      'Premium materials and components',
      'Regular progress updates provided',
      'Full quality control at every stage',
    ],
    image: 'manufacture',
    cta: { text: 'Explore Materials', href: '/kitchen' },
    align: 'right' as const,
  },
  {
    number: '04',
    title: 'Installation',
    subtitle: 'Expert Fitters, Flawless Results',
    description:
      "Our team of expert fitters will transform your space with care and precision. We coordinate every aspect of the installation, working with trusted tradespeople including plumbers, electricians, and tilers. We fully project-manage the entire process so you don't have to worry about a thing.",
    details: [
      'Full project management included',
      'Trusted tradespeople coordinated',
      'Typical installation: 7–14 days',
      'Minimal disruption to your home',
    ],
    image: 'installation',
    cta: { text: 'See Installations', href: '/inspiration' },
    align: 'left' as const,
  },
  {
    number: '05',
    title: 'After Care',
    subtitle: "Our Commitment Doesn't End at Installation",
    description:
      "Upon completion, we won't sign off on your project until we have completed a full inspection and addressed any snagging issues. Our team provides technical demonstrations ensuring you know how to operate every feature. Your satisfaction is our priority — always.",
    details: [
      'Full snagging inspection before sign-off',
      'Technical demonstrations on all appliances',
      'Lifetime craftsmanship warranty',
      'Ongoing support whenever you need it',
    ],
    image: 'aftercare',
    cta: { text: 'Ask Us a Question', href: '/contact' },
    align: 'right' as const,
  },
];

const principles = [
  {
    title: 'Personalised Service',
    description: 'Every project is unique. We tailor every detail to your lifestyle and preferences.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
  },
  {
    title: 'Bespoke Products',
    description: 'Furniture manufactured precisely to your specification — nothing off the shelf.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
  },
  {
    title: 'Exquisite Quality',
    description: 'Premium materials and expert craftsmanship in every single piece we produce.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
  {
    title: 'Discerning Style',
    description: 'Timeless designs that reflect your taste and enhance your home for years to come.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function OurProcessPage() {
  return (
    <div className="bg-white overflow-x-hidden">

      {/* ══════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════ */}
      <section className="relative h-[72vh] min-h-[520px] flex items-center justify-center overflow-hidden bg-lomash-dark">
        {/* Background image — replace with your real hero */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{ backgroundImage: "url('/images/hero/hero-1.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-lomash-dark/40 via-transparent to-lomash-dark/70" />

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.35em] text-lomash-accent mb-5">
            Project Management
          </p>
          <h1 className="font-heading text-5xl md:text-7xl font-semibold text-white leading-tight">
            Your Journey
          </h1>
          <p className="mt-6 font-sans text-lg md:text-xl text-white/75 max-w-xl mx-auto leading-relaxed font-light">
            From conception to completion, our process starts and ends with you.
            Discover how we bring your dream space to life.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          STEP OVERVIEW BAR
      ══════════════════════════════════════════════ */}
      <section className="bg-lomash-gray-50 border-b border-lomash-gray-200 py-14">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-center font-sans text-sm text-lomash-gray-500 mb-10 leading-relaxed max-w-2xl mx-auto">
            From conception to completion, our kitchen and bedroom design process starts and ends
            with the client in mind. Find out how we can help you create your perfect space.
          </p>

          <div className="grid grid-cols-3 md:grid-cols-5 gap-6 text-center">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full border-2 border-lomash-primary/25 bg-white flex items-center justify-center shadow-sm">
                  <span className="font-heading font-bold text-lomash-primary text-lg">
                    {step.number}
                  </span>
                </div>
                <p className="font-heading font-semibold text-lomash-dark text-sm leading-tight">
                  {step.title}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/book-appointment"
              className="inline-flex items-center gap-2 bg-lomash-primary text-white font-sans font-semibold px-8 py-3.5 text-sm uppercase tracking-widest hover:bg-lomash-secondary transition-colors duration-200"
            >
              Come See Us!
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          STEP DETAIL SECTIONS  (alternating image/text)
      ══════════════════════════════════════════════ */}
      {steps.map((step, index) => (
        <section
          key={step.number}
          className={index % 2 === 0 ? 'bg-white' : 'bg-lomash-gray-50'}
        >
          <div
            className={`flex flex-col ${
              step.align === 'left' ? 'lg:flex-row' : 'lg:flex-row-reverse'
            }`}
          >
            {/* ── Image ── */}
            <div className="w-full lg:w-1/2 min-h-[380px] lg:min-h-[580px] relative bg-lomash-gray-200 overflow-hidden group">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                style={{
                  backgroundImage: `url('/images/projects/${step.image}.jpg')`,
                }}
              />
              <div className="absolute inset-0 bg-lomash-dark/10" />
              {/* Big number watermark */}
              <span className="absolute bottom-6 left-7 font-heading font-bold text-[7rem] leading-none text-white/10 select-none pointer-events-none">
                {step.number}
              </span>
            </div>

            {/* ── Text ── */}
            <div className="w-full lg:w-1/2 flex items-center relative">
              {/* Decorative botanical shape (very subtle) */}
              <div className="absolute top-6 right-8 opacity-[0.04] pointer-events-none select-none hidden lg:block">
                <svg width="110" height="170" viewBox="0 0 110 170" fill="currentColor" className="text-lomash-primary">
                  <path d="M55 160 C55 160 5 115 5 65 C5 15 105 15 105 65 C105 115 55 160 55 160Z" />
                </svg>
              </div>

              <div className="px-8 md:px-14 lg:px-16 py-16 max-w-lg">
                {/* Step label */}
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-lomash-accent mb-3">
                  Step {step.number}
                </p>

                {/* Heading */}
                <h2 className="font-heading text-4xl md:text-5xl font-semibold text-lomash-dark leading-tight mb-2">
                  {step.title}
                </h2>

                {/* Subtitle */}
                <p className="font-sans text-sm font-semibold text-lomash-secondary mb-7 uppercase tracking-wide">
                  {step.subtitle}
                </p>

                {/* Body */}
                <p className="font-sans text-lomash-gray-600 leading-relaxed mb-8">
                  {step.description}
                </p>

                {/* Tick list */}
                <ul className="space-y-3 mb-10">
                  {step.details.map((detail, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 font-sans text-sm text-lomash-gray-600"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        className="w-4 h-4 text-lomash-primary mt-0.5 shrink-0"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                      {detail}
                    </li>
                  ))}
                </ul>

                {/* CTA button */}
                <Link
                  href={step.cta.href}
                  className="inline-flex items-center gap-2 bg-lomash-primary text-white font-sans font-semibold px-7 py-3.5 text-sm uppercase tracking-widest hover:bg-lomash-secondary transition-colors duration-200"
                >
                  {step.cta.text}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ══════════════════════════════════════════════
          PRINCIPLES DARK BAND
      ══════════════════════════════════════════════ */}
      <section className="bg-lomash-primary py-14">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {principles.map((p, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <div className="text-white/60">{p.icon}</div>
                <p className="font-sans font-semibold text-white text-xs uppercase tracking-widest">
                  {p.title}
                </p>
                <p className="font-sans text-white/55 text-xs leading-relaxed">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════════ */}
      <section className="bg-lomash-gray-50 py-24 text-center px-4 relative overflow-hidden">
        {/* Decorative botanical right edge */}
        <div className="absolute right-0 top-0 bottom-0 w-44 opacity-[0.04] pointer-events-none select-none hidden lg:block">
          <svg viewBox="0 0 200 600" fill="currentColor" className="h-full text-lomash-primary">
            <path d="M150 500 C150 500 20 380 20 220 C20 60 180 60 180 220 C180 380 150 500 150 500Z" />
            <path d="M120 580 C120 580 40 480 40 360 C40 240 160 240 160 360 C160 480 120 580 120 580Z" opacity="0.5" />
          </svg>
        </div>

        <p className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-lomash-accent mb-4">
          Design Consultation
        </p>
        <h2 className="font-heading text-4xl md:text-5xl font-semibold text-lomash-dark mb-6 max-w-2xl mx-auto leading-tight">
          Ready to Take the Next Step?
        </h2>
        <p className="font-sans text-lomash-gray-600 max-w-xl mx-auto mb-4 leading-relaxed">
          If you are ready to begin designing your dream kitchen or bedroom, booking a
          consultation with us is the ideal next step. Whether you already have some
          initial ideas or are starting completely fresh, we are here to help.
        </p>
        <p className="font-sans text-lomash-gray-600 max-w-xl mx-auto mb-10 leading-relaxed">
          Together, we will discuss how you'd like your new space to look and function,
          explore ideas, and create something that is uniquely yours.
        </p>
        <Link
          href="/book-appointment"
          className="inline-flex items-center gap-2 bg-lomash-primary text-white font-sans font-semibold px-10 py-4 text-sm uppercase tracking-widest hover:bg-lomash-secondary transition-colors duration-200"
        >
          Book Your Appointment
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </section>

    </div>
  );
}