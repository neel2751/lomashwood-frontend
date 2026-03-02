import {
  Award,
  Heart,
  Leaf,
  Shield,
  Star,
  Users,
  Hammer,
  TrendingUp,
  CheckCircle2,
  Clock,
  Trophy,
  Zap,
  Ruler,
  Palette,
  RefreshCw,
  Globe,
  BadgeCheck,
  Handshake,
  FileCheck,
  Lightbulb,
  Phone,
  BookOpen,
  MapPin,
  PoundSterling,
} from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Why Choose Us | Lomash Wood',
  description:
    'Discover what sets Lomash Wood apart - from our master craftsmanship and sustainable practices to our lifetime warranty and personalized service.',
};

export default function WhyChooseUsPage() {
  const keyDifferentiators = [
    {
      icon: Hammer,
      title: 'Master Craftsmanship',
      description:
        'Our team of artisans brings over 100 years of combined experience in traditional woodworking techniques, ensuring every piece is a work of art.',
      stats: '25+ years average experience',
    },
    {
      icon: Leaf,
      title: 'Sustainable & Ethical',
      description:
        'We source 100% FSC-certified wood and plant three trees for every one we use. Our workshop runs on renewable energy, making us carbon-neutral.',
      stats: '15,000+ trees planted',
    },
    {
      icon: Palette,
      title: 'Bespoke Design',
      description:
        'Every piece is custom-designed for your space and lifestyle. No two pieces are exactly alike, making your furniture truly one-of-a-kind.',
      stats: '5,000+ unique designs',
    },
    {
      icon: Shield,
      title: 'Lifetime Warranty',
      description:
        "We stand behind our work with a comprehensive lifetime craftsmanship warranty. If our joinery fails, we fix it — no questions asked.",
      stats: 'Lifetime guarantee',
    },
    {
      icon: Heart,
      title: 'Personalized Service',
      description:
        'From initial consultation to delivery, you work with a dedicated project manager who ensures your vision comes to life exactly as you imagined.',
      stats: '98% satisfaction rate',
    },
    {
      icon: Trophy,
      title: 'Award-Winning Quality',
      description:
        'Our commitment to excellence has earned us industry recognition, including the 2024 Craftsmanship Excellence Award and 4.9/5 customer rating.',
      stats: '12 industry awards',
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
      category: 'Design & Customization',
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
        'Lifetime craftsmanship warranty included',
        '5-year finish warranty',
        'Free annual maintenance consultations',
        'Repair and restoration services available',
        'Trade-in program for future purchases',
      ],
    },
  ];

  const comparisonPoints = [
    {
      feature: 'Construction Method',
      us: 'Traditional joinery, hand-crafted',
      others: 'Mass production, mechanical fasteners',
      icon: Hammer,
    },
    {
      feature: 'Materials',
      us: 'FSC-certified premium hardwoods',
      others: 'Particle board, veneer, low-grade wood',
      icon: Leaf,
    },
    {
      feature: 'Customization',
      us: 'Fully bespoke to your specifications',
      others: 'Limited to standard sizes and options',
      icon: Ruler,
    },
    {
      feature: 'Warranty',
      us: 'Lifetime craftsmanship guarantee',
      others: '1-3 years limited warranty',
      icon: Shield,
    },
    {
      feature: 'Production Time',
      us: '6-16 weeks (quality takes time)',
      others: 'Immediate (but mass-produced)',
      icon: Clock,
    },
    {
      feature: 'Environmental Impact',
      us: 'Carbon-neutral, 3 trees planted per 1 used',
      others: 'Often unsustainable practices',
      icon: Globe,
    },
  ];

  const testimonialHighlights = [
    {
      quote: 'The craftsmanship is extraordinary. Our dining table is the centerpiece of our home.',
      author: 'Priya S.',
      project: 'Custom Dining Table',
      rating: 5,
    },
    {
      quote: "Worth every penny. This isn't furniture — it's an investment in quality.",
      author: 'Rajesh M.',
      project: 'Bedroom Suite',
      rating: 5,
    },
    {
      quote: 'The team listened to every detail. They brought our vision to life perfectly.',
      author: 'Anjali K.',
      project: 'Built-in Bookshelf',
      rating: 5,
    },
  ];

  const guarantees = [
    {
      icon: BadgeCheck,
      title: '100% Satisfaction Guarantee',
      description: "We're not finished until you're completely delighted with your furniture.",
    },
    {
      icon: RefreshCw,
      title: 'Free Design Revisions',
      description: 'Unlimited design changes during the planning phase at no extra cost.',
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

  const projects = [
    { label: 'Modern Kitchen', img: '/images/projects/project-1.jpg' },
    { label: 'Classic Bedroom', img: '/images/projects/project-2.jpg', green: true },
    { label: 'Handleless Style', img: '/images/projects/project-3.jpg' },
    { label: 'Shaker Kitchen', img: '/images/projects/project-4.jpg' },
  ];

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

      {/* ─── Personalised Service ─── */}
      <section className="py-28 px-6 md:px-20 mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-lomash-dark mb-6 leading-snug">
              A Personalised Service
            </h2>
            <p className="text-lomash-gray-600 text-sm md:text-base leading-relaxed mb-8 max-w-lg">
              We have an extremely talented, friendly and knowledgeable team. We take the time to
              understand our customers and their needs to craft high-end, custom furniture that fits
              effortlessly with their lifestyles and reflects all tastes. We pride ourselves on our
              customer service and offer complete project management to make your installation as
              seamless as possible.
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
              src="/images/projects/personalised-service.jpg"
              alt="Our friendly design team"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ─── 15 Years Experience Banner ─── */}
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
            Over 15 Years Of Experience…
          </h2>
          <p className="text-white/85 text-sm md:text-base leading-relaxed mb-8">
            With our extensive experience installing beautiful, bespoke furniture, we have honed
            unequalled knowledge in the industry, meaning we truly understand our craft — and thanks
            to our position as a local, family-run, independent business, we also understand people.
            Because of this, our designs are always unique and of the highest quality, perfectly
            reflecting you, your family, and your home.
          </p>
          <Link
            href="/showrooms"
            className="inline-block border border-white text-white text-xs tracking-widest uppercase px-7 py-3 hover:bg-white hover:text-lomash-primary transition-colors duration-200 rounded-full"
          >
            Arrange Your Visit →
          </Link>
        </div>
      </section>

      {/* ─── Award Winning ─── */}
      <section className="py-28 px-6 md:px-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative h-80 md:h-[450px] rounded-sm overflow-hidden shadow-md bg-lomash-gray-200 order-last md:order-first">
            <Image
              src="/images/projects/award.jpg"
              alt="Award winning team"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-lomash-dark mb-6 leading-snug">
              An Award Winning Team To Help You
            </h2>
            <p className="text-lomash-gray-600 text-sm md:text-base leading-relaxed mb-4">
              We won Best Customer Service at the Häfele Studio Partner Awards for the second time,
              thanks to our customer-focused approach, and this means the world to us, as it&apos;s
              you, the customer, who matters the most.
            </p>
            <p className="text-lomash-gray-600 text-sm md:text-base leading-relaxed mb-8">
              Our award also assures you that when you choose Lomash Wood, you are in safe hands.
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
                    <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-lomash-primary/10 text-lomash-primary text-xs font-semibold">
                      <Star className="w-3 h-3" />
                      {item.stats}
                    </div>
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
      <section className="py-16 px-6 md:px-20 bg-lomash-gray-50">
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
      </section>

      {/* ─── Testimonials ─── */}
      <section className="py-16 px-6 md:px-20 container mx-auto">
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
      </section>

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
      <section className="py-16 px-6 md:px-20 container mx-auto">
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
      </section>

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
            {projects.map(({ label, img, green }) => (
              <Link
                key={label}
                href="/inspiration"
                className={`relative group h-56 md:h-72 overflow-hidden ${
                  green ? 'bg-lomash-primary' : ''
                }`}
              >
                {!green && (
                  <Image
                    src={img}
                    alt={label}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                <div
                  className={`absolute inset-0 flex items-end p-4 ${
                    green ? '' : 'bg-gradient-to-t from-black/50 to-transparent'
                  }`}
                >
                  <span className="text-white text-xs tracking-widest font-medium uppercase">
                    {label}
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