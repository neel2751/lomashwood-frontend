import {
  Award,
  ClipboardList,
  Leaf,
  Shield,
  Star,
  Users,
  Hammer,
  TrendingUp,
  CheckCircle2,
  Trophy,
  Palette,
  RefreshCw,
  BadgeCheck,
  Handshake,
  FileCheck,
  Lightbulb,
  Phone,
  BookOpen,
  MapPin,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Why Choose Us | Lomash Wood',
  description:
    'Discover what sets Lomash Wood apart - from our master craftsmanship and sustainable practices to our 5-year guarantee and personalized service.',
};

type LatestProject = {
  id: string;
  title: string;
  image: string;
};

async function getLatestProjects(): Promise<LatestProject[]> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://lomashwood-backend.vercel.app/api/v1';

  try {
    const response = await fetch(`${apiBaseUrl}/projects`, {
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      return [];
    }

    const payload = await response.json();
    const rows = Array.isArray(payload?.data) ? payload.data : Array.isArray(payload) ? payload : [];

    return rows.slice(0, 4).map((project: any) => ({
      id: project.id,
      title: project.title || 'Untitled Project',
      image:
        (Array.isArray(project.images) && project.images[0]) ||
        project.image ||
        '/LomashLogo.png',
    }));
  } catch {
    return [];
  }
}

export default async function WhyChooseUsPage() {
  const keyDifferentiators: { icon: LucideIcon; title: string; description: string; stats?: string }[] = [
    {
      icon: Hammer,
      title: 'Master Craftsmanship',
      description:
        'Over 100 projects completed, and every one made in our own factory in Romford. Our makers cut, edge, spray and finish each piece by hand, then check it before it leaves the building. That volume is where the skill comes from, and it shows in the details you only notice years later: the drawer that still runs true, the door that still sits flush.',
      stats: '100+ project Experience',
    },
    {
      icon: Leaf,
      title: 'Sustainable & Ethical',
      description:
        'Timber is one of the few materials that grows back. We buy responsibly sourced board, cut every panel to your exact measurements rather than trimming down standard units on site, and recycle the offcuts that remain. Build furniture properly and it stays out of landfill for decades, which is the greenest thing a kitchen can do.',
    },
    {
      icon: Palette,
      title: 'Bespoke Design',
      description:
        'Every piece is custom-designed for your space and lifestyle. Our designers measure your room, listen to how you live, and draw the layout around you, from the height of the worktops to where the last drawer sits. You choose the style, colour, finish and handles, and we build each cabinet to those exact measurements in our own factory. No two pieces are exactly alike, making your furniture truly one-of-a-kind.',
      stats: '5,000+ unique designs',
    },
    {
      icon: Shield,
      title: '5-Year Guarantee',
      description:
        'Every cabinet we make and fit is guaranteed for five years, with three years on accessories. If something we built fails in that time, we come back and put it right at our own cost. Our fitters installed it, so there is nobody to pass you on to.',
    },
    {
      icon: ClipboardList,
      title: 'Project Management',
      description:
        'Every project is assigned a dedicated project manager who oversees it from initial consultation through to final handover. They coordinate the design, manufacture and installation stages, maintain the schedule, and remain your single point of contact throughout. One person accountable for the whole project, and one number to call.',
    },
    {
      icon: Trophy,
      title: 'Top Rated Quality',
      description:
        'Our customers rate us 4.9 out of 5. We regard that figure as something to be earned on each project rather than a milestone already reached, and it reflects the standard applied at every stage: accurate design, controlled manufacture in our own factory, and installation by our own fitting team.',
    },
  ];

  const advantages = [
    {
      category: 'Quality & Craftsmanship',
      icon: Award,
      items: [
        'Hand-selected premium hardwoods',
        'Traditional mortise and tenon joinery',
        'Multiple quality inspections throughout production',
        'Hand-applied, museum-quality finishes',
        'Zero shortcuts or compromise on quality',
        'Heirloom-quality construction built to last generations',
      ],
    },
    {
      category: 'Design & Customisation',
      icon: Lightbulb,
      items: [
        'Fully customizable dimensions and specifications',
        'Expert design consultation included',
        'CAD renderings before production begins',
        "Unlimited design revisions until you're satisfied",
        'Mix and match wood species and finishes',
        'Accommodate unique architectural features',
      ],
    },
    {
      category: 'Customer Experience',
      icon: Users,
      items: [
        'Dedicated project manager for your piece',
        'Weekly progress updates with photos',
        'Transparent pricing with no hidden fees',
        'Flexible payment plans available',
        'White-glove delivery and installation',
        'Complimentary care kit with every piece',
      ],
    },
    {
      category: 'Value & Investment',
      icon: TrendingUp,
      items: [
        'Furniture that appreciates over time',
        'Up to 5-year guarantee on cabinet materials',
        '3-year guarantee on accessories',
        'Free annual maintenance consultations',
        'Repair and restoration services available',
        'Trade-in program for future purchases',
      ],
    },
  ];

  // const comparisonPoints = [
  //   {
  //     feature: 'Construction Method',
  //     us: 'Traditional joinery, hand-crafted',
  //     others: 'Mass production, mechanical fasteners',
  //     icon: Hammer,
  //   },
  //   {
  //     feature: 'Materials',
  //     us: 'FSC-certified premium hardwoods',
  //     others: 'Particle board, veneer, low-grade wood',
  //     icon: Leaf,
  //   },
  //   {
  //     feature: 'Customisation',
  //     us: 'Fully bespoke to your specifications',
  //     others: 'Limited to standard sizes and options',
  //     icon: Ruler,
  //   },
  //   {
  //     feature: 'Warranty',
  //     us: 'Up to 5 years on cabinet materials, 3 years on accessories',
  //     others: '1-3 years limited warranty',
  //     icon: Shield,
  //   },
  //   {
  //     feature: 'Production Time',
  //     us: '6-16 weeks (quality takes time)',
  //     others: 'Immediate (but mass-produced)',
  //     icon: Clock,
  //   },
  //   {
  //     feature: 'Environmental Impact',
  //     us: 'Carbon-neutral, 3 trees planted per 1 used',
  //     others: 'Often unsustainable practices',
  //     icon: Globe,
  //   },
  // ];

  const guarantees = [
    {
      icon: BadgeCheck,
      title: '100% Satisfaction Guarantee',
      description: "We're not finished until you're completely delighted with your furniture.",
    },
    {
      icon: RefreshCw,
      title: 'Free Design Revisions',
      description: 'We work with you until your design is perfect, with unlimited revisions*.',
    },
    {
      icon: FileCheck,
      title: 'Transparent Process',
      description: 'No hidden fees, no surprises. You know exactly what to expect.',
    },
    {
      icon: Handshake,
      title: 'Personal Commitment',
      description: 'Every piece signed by the master craftsman who created it.',
    },
  ];

  const projects = await getLatestProjects();

  return (
    <div className="overflow-hidden">
      {/* ─── Fixed Callback Tab ─── */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50">
        <Link
          href="/contact"
          className="bg-lomash-primary text-white text-[10px] tracking-widest uppercase px-2 py-4 block hover:bg-lomash-secondary transition-colors rounded-full"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          Request A Callback
        </Link>
      </div>

      {/* ─── Hero Section ─── */}
      <section className="relative h-[480px] w-full flex items-center">
        <div className="absolute inset-0 bg-lomash-dark">
          <Image
            src="/images/hero/hero-1.jpg"
            alt="Beautiful bespoke kitchen"
            fill
            priority
            className="object-cover opacity-55"
          />
        </div>
        <div className="relative z-10 max-w-3xl px-8 md:px-20">
          <h1 className="font-heading text-4xl md:text-5xl text-white font-semibold leading-tight mb-4">
            Why Choose Us?
          </h1>
          <p className="text-white/90 text-base md:text-lg max-w-xl leading-relaxed mb-8">
            Discover why our growing list of happy customers continue to recommend Lomash Wood…
          </p>
          <Link
            href="/book-appointment"
            className="inline-block border border-white text-white text-xs tracking-widest uppercase px-7 py-3 hover:bg-white hover:text-lomash-primary transition-colors duration-200 rounded-full"
          >
            Speak To A Designer →
          </Link>
        </div>
      </section>

      {/* ─── Style, Colour and Finish Options ─── */}
      <section className="py-28 px-6 md:px-20 mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-lomash-dark mb-6 leading-snug">
              Unlimited Style, Colour and Finish Options
            </h2>
            <p className="text-lomash-gray-600 text-sm md:text-base leading-relaxed mb-8 max-w-lg">
              Your kitchen should suit your home, not a showroom floor. Choose from hundreds of
              colours across our Modern and Shaker collections, finished in matt, gloss, acrylic or
              hand-painted PU. From Classical Ivory to Slate Black Glass, every door is made to
              order at our own British factory, so nothing is off the shelf.
            </p>
            <Link
              href="/inspiration"
              className="inline-block border border-lomash-primary text-lomash-primary text-xs tracking-widest uppercase px-7 py-3 hover:bg-lomash-primary hover:text-white transition-colors duration-200 rounded-full"
            >
              Explore Our Projects →
            </Link>
          </div>
          <div className="relative h-80 md:h-96 rounded-sm overflow-hidden shadow-md bg-lomash-gray-200">
            <Image
              src="/why/unlimited_colour_finish.webp"
              alt="Kitchen doors in a range of styles, colours and finishes"
              sizes="(max-width: 768px) 100vw, 50vw"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ─── Years of Experience Banner ─── */}
      <section className="relative py-28 px-6 md:px-20 ">
        <div className="absolute inset-0 bg-lomash-dark">
          <Image
            src="/images/projects/experience.jpg"
            alt="Bespoke kitchen installation"
            fill
            className="object-cover opacity-45"
          />
        </div>
        <div className="relative z-10 max-w-2xl">
          <h2 className="font-heading text-3xl md:text-4xl text-white font-semibold leading-snug mb-6">
            Years of Experience
          </h2>
          <p className="text-white/85 text-sm md:text-base leading-relaxed mb-8">
            Years of designing and fitting bespoke furniture have given us a deep understanding of
            our craft. We make every cabinet ourselves, at our own factory in Romford, and fit it
            with our own team rather than subcontractors. But knowing the furniture is only half of
            it. Knowing people is the rest, and after more than 300 homes, we have learned to
            listen first. That is why no two Lomash Wood kitchens are ever quite the same.
          </p>
          <Link
            href="/showrooms"
            className="inline-block border border-white text-white text-xs tracking-widest uppercase px-7 py-3 hover:bg-white hover:text-lomash-primary transition-colors duration-200 rounded-full"
          >
            Arrange Your Visit →
          </Link>
        </div>
      </section>

      {/* ─── Expert Craftsmanship ─── */}
      <section className="py-28 px-6 md:px-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative h-80 md:h-[450px] rounded-sm overflow-hidden shadow-md bg-lomash-gray-200 order-last md:order-first">
            <Image
              src="/why/expert_craftmenship.webp"
              alt="Lomash Wood maker finishing a cabinet door by hand"
              sizes="(max-width: 768px) 100vw, 50vw"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-lomash-dark mb-6 leading-snug">
              Expert Craftsmanship
            </h2>
            <p className="text-lomash-gray-600 text-sm md:text-base leading-relaxed mb-8">
              Every Lomash Wood kitchen is made in Britain, at our own factory in East London. Our
              makers select the materials, cut and edge every panel, and spray and cure each door by
              hand before it passes inspection. Nothing arrives flat-packed from overseas and
              nothing leaves the building unchecked. That is why every cabinet we make and fit
              carries a five-year guarantee.
            </p>
            <Link
              href="/contact"
              className="inline-block border border-lomash-primary text-lomash-primary text-xs tracking-widest uppercase px-7 py-3 hover:bg-lomash-primary hover:text-white transition-colors duration-200 rounded-full"
            >
              Get In Touch →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── What Makes Us Different – Cards ─── */}
      <section className="py-16 px-6 md:px-20 bg-lomash-gray-50">
        <div className="container  mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-lomash-dark mb-3">
              What Makes Us Different
            </h2>
            <p className="text-lomash-gray-500 text-sm md:text-base max-w-xl mx-auto">
              Six compelling reasons to choose Lomash Wood for your furniture needs
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyDifferentiators.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card
                  key={index}
                  className="border-2 border-lomash-gray-200 hover:border-lomash-accent hover:shadow-product-card-hover transition-all duration-200 rounded-lg"
                >
                  <CardContent className="pt-6">
                    <div className="w-14 h-14 rounded-lg bg-lomash-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-7 h-7 text-lomash-primary" />
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-lomash-dark mb-2">
                      {item.title}
                    </h3>
                    <p className="text-lomash-gray-600 text-sm mb-4 leading-relaxed">
                      {item.description}
                    </p>
                    {item.stats && (
                      <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-lomash-primary/10 text-lomash-primary text-xs font-semibold">
                        <Star className="w-3 h-3" />
                        {item.stats}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── The Lomash Advantage ─── */}
      <section className="py-16 px-6 md:px-20">
        <div className="mb-10 container mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-lomash-dark mb-3">
            The Lomash Advantage
          </h2>
          <p className="text-lomash-gray-500 text-sm md:text-base">
            Comprehensive benefits across every aspect of our service
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {advantages.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                className="border border-lomash-gray-200 rounded-lg p-6 bg-white hover:border-lomash-accent transition-colors duration-200"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-lomash-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-lomash-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-lomash-dark text-lg">
                    {category.category}
                  </h3>
                </div>
                <div className="space-y-2">
                  {category.items.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-lomash-secondary flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-lomash-gray-600">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── Comparison Table ─── */}
      {/* <section className="py-16 px-6 md:px-20 bg-lomash-gray-50">
        <div className="container mx-auto">
          <div className="mb-10">
            <h2 className="font-heading text-4xl md:text-5xl font-semibold text-lomash-dark mb-3">
              How We Compare
            </h2>
            <p className="text-lomash-gray-500 text-base md:text-lg">
              See the difference between custom craftsmanship and mass production
            </p>
          </div>
          <div className="overflow-x-auto border border-lomash-gray-200 rounded-sm">
            <table className="w-full bg-white">
              <thead>
                <tr className="border-b-2 border-lomash-gray-200">
                  <th className="text-left py-4 px-6 font-heading font-semibold text-lomash-dark text-base">
                    Feature
                  </th>
                  <th className="text-left py-4 px-6 font-heading font-semibold text-lomash-primary bg-lomash-primary/5 text-sm">
                    Lomash Wood
                  </th>
                  <th className="text-left py-4 px-6 font-heading font-semibold text-lomash-gray-500 text-sm">
                    Mass Market
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonPoints.map((point, index) => {
                  const Icon = point.icon;
                  return (
                    <tr
                      key={index}
                      className="border-b border-lomash-gray-100 hover:bg-lomash-gray-50 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-lomash-gray-400" />
                          <span className="font-medium text-lomash-dark text-sm">
                            {point.feature}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6 bg-lomash-primary/5">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-lomash-secondary flex-shrink-0 mt-0.5" />
                          <span className="text-lomash-gray-700 text-sm">{point.us}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-lomash-gray-500 text-sm">{point.others}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section> */}

      {/* ─── Testimonials ─── */}
      {/* <section className="py-16 px-6 md:px-20 container mx-auto">
        <div className="mb-10">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-lomash-dark mb-3">
            What Our Customers Say
          </h2>
          <p className="text-lomash-gray-500 text-sm md:text-base">
            Real feedback from satisfied clients
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonialHighlights.map((testimonial, index) => (
            <div
              key={index}
              className="border border-lomash-gray-200 rounded-sm p-6 bg-white hover:shadow-product-card-hover transition-shadow"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-lomash-secondary fill-lomash-secondary" />
                ))}
              </div>
              <p className="text-lomash-gray-700 italic text-sm leading-relaxed mb-5">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="border-t border-lomash-gray-100 pt-4">
                <p className="font-heading font-semibold text-lomash-dark text-sm">
                  {testimonial.author}
                </p>
                <p className="text-xs text-lomash-gray-500">{testimonial.project}</p>
              </div>
            </div>
          ))}
        </div>
      </section> */}

      {/* ─── Our Guarantees ─── */}
      <section className="py-16 px-6 md:px-20 bg-lomash-gray-50">
        <div className="container mx-auto">
          <div className="mb-10">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-lomash-dark mb-3">
              Our Guarantees To You
            </h2>
            <p className="text-lomash-gray-500 text-sm md:text-base">
              Promises we make to every customer
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {guarantees.map((guarantee, index) => {
              const Icon = guarantee.icon;
              return (
                <div
                  key={index}
                  className="flex items-start gap-4 bg-white rounded-sm p-6 border border-lomash-gray-200 hover:border-lomash-accent transition-colors duration-200"
                >
                  <div className="w-12 h-12 rounded-full bg-lomash-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-lomash-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lomash-dark mb-1">
                      {guarantee.title}
                    </h3>
                    <p className="text-sm text-lomash-gray-600 leading-relaxed">
                      {guarantee.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Investment Value ─── */}
      {/* <section className="py-16 px-6 md:px-20 container mx-auto">
        <div className="mb-8">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-lomash-dark mb-3">
            An Investment in Quality
          </h2>
          <p className="text-lomash-gray-500 text-sm md:text-base">
            Why custom furniture is worth the investment
          </p>
        </div>
        <p className="text-lomash-gray-600 text-sm md:text-base leading-relaxed mb-8 max-w-3xl">
          While mass-produced furniture depreciates the moment you buy it, custom-crafted hardwood
          furniture actually appreciates over time. Here&apos;s why investing in Lomash Wood makes
          financial sense.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-lomash-gray-200 rounded-sm p-6 bg-white">
            <h3 className="font-heading font-semibold text-lomash-dark mb-4 flex items-center gap-2 text-sm">
              <PoundSterling className="w-5 h-5 text-lomash-secondary" />
              Long-Term Value
            </h3>
            <ul className="space-y-3 text-sm text-lomash-gray-600">
              {[
                'Lasts 50+ years vs 5-10 for mass-market pieces',
                'Can be refinished and restored indefinitely',
                'Becomes a valuable family heirloom',
                'Adds value to your home',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-lomash-secondary flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-lomash-gray-200 rounded-sm p-6 bg-white">
            <h3 className="font-heading font-semibold text-lomash-dark mb-4 flex items-center gap-2 text-sm">
              <Zap className="w-5 h-5 text-lomash-primary" />
              Hidden Costs of Cheap Furniture
            </h3>
            <ul className="space-y-3 text-sm text-lomash-gray-600">
              {[
                'Replacement every 5-10 years adds up',
                'Poor construction leads to costly repairs',
                'Environmental cost of disposal',
                'Never quite fits your space perfectly',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-lomash-primary font-bold mt-0.5">✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section> */}

      {/* ─── Latest Projects ─── */}
      <section className="py-16 px-6 md:px-20 bg-lomash-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-lomash-dark mb-4">
              Discover Some Of Our Latest Projects…
            </h2>
            <p className="text-lomash-gray-600 text-sm md:text-base max-w-3xl mx-auto leading-relaxed">
              Ultimately, the reasons for choosing us are reflected in our work. Our designs speak
              for themselves, and browsing our stunning collection will provide all the information
              you need. From elegant classics to sleek modern layouts, seeing our work will give you
              all the confidence you need.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className="relative group h-56 md:h-72 overflow-hidden"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div
                  className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black/50 to-transparent"
                >
                  <span className="text-white text-xs tracking-widest font-medium uppercase">
                    {project.title}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Take The Next Step CTA ─── */}
      <section className="bg-lomash-dark py-16 px-6 text-center">
        <h2 className="font-heading text-3xl md:text-4xl text-white font-semibold mb-4">
          Take The Next Step…
        </h2>
        <p className="text-white/75 text-sm md:text-base max-w-2xl mx-auto mb-12 leading-relaxed">
          No matter the size of your home or the scale of your project, come and have a friendly,
          no-obligation chat with us to discuss your vision.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-12 sm:gap-24">
          <Link href="/book-appointment" className="flex flex-col items-center gap-3 group">
            <Phone
              className="w-14 h-14 text-white/70 group-hover:text-lomash-accent transition-colors"
              strokeWidth={1}
            />
            <span className="text-white text-[10px] tracking-widest uppercase text-center leading-loose">
              Book A Design
              <br />
              Appointment
            </span>
          </Link>
          <Link href="/brochure" className="flex flex-col items-center gap-3 group">
            <BookOpen
              className="w-14 h-14 text-white/70 group-hover:text-lomash-accent transition-colors"
              strokeWidth={1}
            />
            <span className="text-white text-[10px] tracking-widest uppercase text-center leading-loose">
              Download A
              <br />
              Brochure
            </span>
          </Link>
          <Link href="/showrooms" className="flex flex-col items-center gap-3 group">
            <MapPin
              className="w-14 h-14 text-white/70 group-hover:text-lomash-accent transition-colors"
              strokeWidth={1}
            />
            <span className="text-white text-[10px] tracking-widest uppercase text-center leading-loose">
              Visit Our
              <br />
              Showroom
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}