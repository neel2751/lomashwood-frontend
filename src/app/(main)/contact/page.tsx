import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  User,
  Building2,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Navigation,
  Smartphone,
  Video,
  HeadphonesIcon,
  Store,
  Map,
  Monitor,
} from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const metadata: Metadata = {
  title: 'Contact Us | Lomash Wood',
  description:
    'Get in touch with Lomash Wood for custom furniture consultations, inquiries, or to schedule a workshop visit.',
};

export default function ContactPage() {
  const contactMethods = [
    {
      icon: Phone,
      title: 'Call Us',
      primary: '+91 79 2658 1234',
      secondary: '+91 98250 12345',
      description: 'Monday - Saturday: 9:00 AM - 6:00 PM',
      action: 'tel:+917926581234',
    },
    {
      icon: Mail,
      title: 'Email Us',
      primary: 'hello@lomashwood.com',
      secondary: 'projects@lomashwood.com',
      description: 'We respond within 24 hours',
      action: 'mailto:hello@lomashwood.com',
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      primary: 'Chat with our team',
      secondary: 'Available now',
      description: 'Get instant answers to your questions',
      action: '#',
    },
    {
      icon: Video,
      title: 'Video Consultation',
      primary: 'Schedule a virtual tour',
      secondary: 'Free 30-minute session',
      description: 'Discuss your project from home',
      action: '#',
    },
  ];

  const locations = [
    {
      name: 'Main Workshop & Showroom',
      address: '123 Craftsman Lane, Satellite Road',
      city: 'Ahmedabad, Gujarat 380015',
      country: 'India',
      phone: '+91 79 2658 1234',
      email: 'ahmedabad@lomashwood.com',
      hours: [
        'Monday - Friday: 9:00 AM - 7:00 PM',
        'Saturday: 10:00 AM - 6:00 PM',
        'Sunday: By appointment only',
      ],
      isPrimary: true,
    },
    {
      name: 'Design Studio',
      address: '456 Ashram Road',
      city: 'Ahmedabad, Gujarat 380009',
      country: 'India',
      phone: '+91 79 2658 5678',
      email: 'design@lomashwood.com',
      hours: [
        'Monday - Friday: 10:00 AM - 6:00 PM',
        'Saturday: By appointment',
        'Sunday: Closed',
      ],
      isPrimary: false,
    },
  ];

  const socialMedia = [
    { icon: Facebook, name: 'Facebook', url: '#', handle: '@lomashwood' },
    { icon: Instagram, name: 'Instagram', url: '#', handle: '@lomashwood' },
    { icon: Twitter, name: 'Twitter', url: '#', handle: '@lomashwood' },
    { icon: Linkedin, name: 'LinkedIn', url: '#', handle: 'lomash-wood' },
    { icon: Youtube, name: 'YouTube', url: '#', handle: 'Lomash Wood' },
  ];

  const inquiryTypes = [
    'General Inquiry',
    'Custom Furniture Quote',
    'Schedule Consultation',
    'Workshop Visit',
    'Existing Order',
    'Maintenance & Care',
    'Partnership Opportunity',
    'Other',
  ];

  const faqCategories = [
    {
      value: 'design-services',
      label: 'Design Services',
      items: [
        {
          q: 'How do I book a design appointment?',
          a: 'You can book a design appointment online through our booking page, by calling us, or by visiting your nearest showroom. Our designers will work with you to create your perfect kitchen or bedroom.',
        },
        {
          q: 'How long does a design appointment take?',
          a: 'A typical design appointment lasts between 1.5 to 2 hours. This gives us enough time to understand your requirements, take measurements, and begin exploring design options.',
        },
        {
          q: 'Is the design appointment free?',
          a: 'Yes, all our design consultations are completely free and carry no obligation.',
        },
      ],
    },
    {
      value: 'measuring',
      label: 'Measuring Your Space',
      items: [
        {
          q: 'Do I need to measure my space before the appointment?',
          a: 'It helps to have rough dimensions, but our designers can also arrange a home survey to take precise measurements. We offer free measuring surveys across all locations.',
        },
        {
          q: 'What information should I bring to my appointment?',
          a: 'Bring any photos of your current space, inspiration images, a rough floor plan if you have one, and details of any fixed elements like windows, doors, or radiators.',
        },
      ],
    },
    {
      value: 'product-info',
      label: 'Product Information',
      items: [
        {
          q: 'What materials do you use?',
          a: 'We use 100% FSC-certified premium hardwoods. All our timber is responsibly sourced and our finishes are food-safe and long-lasting.',
        },
        {
          q: 'Do you offer a warranty?',
          a: 'Yes. We offer a lifetime craftsmanship warranty on all joinery. Finishes carry a 5-year warranty.',
        },
        {
          q: 'Can I customise colours and finishes?',
          a: 'Absolutely. Every piece is bespoke. You can choose from our extensive range of paints, stains, and lacquers, or we can match any colour you provide.',
        },
      ],
    },
    {
      value: 'press',
      label: 'Press Enquiries',
      items: [
        {
          q: 'How do I contact the Lomash Wood press team?',
          a: 'For media and press enquiries please email us at press@lomashwood.com. We aim to respond within 2 business days.',
        },
        {
          q: 'Do you offer press samples or showroom access for journalists?',
          a: 'Yes. We welcome journalists and photographers into our showrooms. Please reach out to our press team to arrange a visit.',
        },
      ],
    },
  ];

  const differentiators = [
    { icon: '🏅', highlight: 'Lifetime guarantee', rest: 'on all craftsmanship' },
    { icon: '🏠', highlight: '5+ Showrooms', rest: 'across the region' },
    { icon: '🪵', highlight: 'Over 15 years', rest: 'of design expertise' },
    { icon: '🇮🇳', highlight: 'Beautifully crafted', rest: 'with Indian hardwoods' },
    { icon: '♻️', highlight: '100% Responsibly', rest: 'sourced timber' },
  ];

  const reviews = [
    {
      name: 'Priya S.',
      date: '2 days ago',
      title: 'Absolutely stunning craftsmanship',
      body: 'The team at Lomash Wood were exceptional from start to finish. Our kitchen looks incredible and the quality is outstanding. Would highly recommend to anyone.',
      rating: 5,
    },
    {
      name: 'Rajesh M.',
      date: '3 days ago',
      title: 'Patience and product knowledge',
      body: 'The designer listened patiently to all our requirements and was so knowledgeable about their ranges. Offered great advice and let us take our time to see what was right.',
      rating: 5,
    },
    {
      name: 'Anjali K.',
      date: '3 days ago',
      title: 'Brilliant service throughout',
      body: 'From the initial appointment to installation, the whole process was seamless. The team kept us updated at every stage and the final result is beyond what we imagined.',
      rating: 5,
    },
    {
      name: 'Vikram T.',
      date: '4 days ago',
      title: 'Excellent quality and experience',
      body: 'Brought my furniture from Lomash Wood. The quality of the cabinets is superb and the finish is perfect. The installer was professional and tidy throughout.',
      rating: 5,
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* ─── Fixed Callback Tab ─── */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50">
        <Link
          href="/contact"
          className="bg-lomash-primary text-white text-[10px] tracking-widest uppercase px-2 py-4 block hover:bg-lomash-secondary transition-colors"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          Request A Callback
        </Link>
      </div>

      {/* ─── Page Header ─── */}
      <section className="px-6 md:px-16 pt-10 pb-2 max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-sm text-lomash-gray-500 mb-6">
          <Link href="/" className="hover:text-lomash-primary transition-colors underline">
            Home
          </Link>
          <span className="mx-2">›</span>
          <span className="text-lomash-dark">Contact us</span>
        </nav>

        <h1 className="font-heading text-4xl md:text-5xl font-bold text-lomash-dark mb-3">
          Contact us
        </h1>
        <p className="text-lomash-gray-600 text-base md:text-lg mb-10">
          Expert advice at your fingertips
        </p>

        {/* ─── 3-Column Contact Cards ─── */}
        <div className="grid md:grid-cols-3 gap-5 mb-16">
          {/* Card 1 – Book appointment */}
          <div className="bg-lomash-gray-50 border border-lomash-gray-200 rounded-sm p-8 flex flex-col justify-between min-h-[280px]">
            <div>
              <h2 className="font-heading text-xl font-bold text-lomash-dark mb-5">
                Book a design appointment
              </h2>
              <p className="text-lomash-gray-600 text-sm leading-relaxed">
                Get expert guidance and bespoke furniture design advice when you book a design
                appointment.
              </p>
            </div>
            <div className="mt-8">
              <Link
                href="/book-appointment"
                className="block w-full bg-lomash-dark text-white text-center text-sm font-semibold py-4 px-6 hover:bg-lomash-primary transition-colors duration-200"
              >
                Book an appointment
              </Link>
            </div>
          </div>

          {/* Card 2 – Find showroom */}
          <div className="bg-lomash-gray-50 border border-lomash-gray-200 rounded-sm p-8 flex flex-col justify-between min-h-[280px]">
            <div>
              <h2 className="font-heading text-xl font-bold text-lomash-dark mb-5">
                Find a showroom
              </h2>
              <p className="text-lomash-gray-600 text-sm leading-relaxed">
                Chat with a Lomash Wood expert in-store, get a closer look and feel of our
                furniture on display and book some time with a designer.
              </p>
            </div>
            <div className="mt-8">
              <Link
                href="/showrooms"
                className="text-lomash-dark text-sm underline underline-offset-4 hover:text-lomash-primary transition-colors"
              >
                Find a showroom
              </Link>
            </div>
          </div>

          {/* Card 3 – Customer care */}
          <div className="bg-lomash-gray-50 border border-lomash-gray-200 rounded-sm p-8 flex flex-col justify-between min-h-[280px]">
            <div>
              <h2 className="font-heading text-xl font-bold text-lomash-dark mb-5">
                Speak to customer care
              </h2>
              <div className="text-lomash-gray-600 text-sm leading-loose space-y-0.5">
                <p>Monday to Friday: 9:00am – 6:00pm</p>
                <p>Saturday: 10:00am – 4:00pm</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              <a
                href="tel:+917926581234"
                className="block text-lomash-dark text-sm underline underline-offset-4 hover:text-lomash-primary transition-colors"
              >
                Telephone: +91 79 2658 1234
              </a>
              <a
                href="mailto:hello@lomashwood.com"
                className="block text-lomash-dark text-sm underline underline-offset-4 hover:text-lomash-primary transition-colors"
              >
                hello@lomashwood.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Get In Touch – Contact Methods ─── */}
      <section className="px-6 md:px-16 pb-16 max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-lomash-dark mb-2">
            Get in Touch
          </h2>
          <p className="text-lomash-gray-600 text-sm md:text-base">
            Choose your preferred way to connect with us
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <div
                key={index}
                className="border border-lomash-gray-200 rounded-sm p-6 bg-white hover:border-lomash-accent hover:shadow-product-card-hover transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-lg bg-lomash-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-lomash-primary" />
                </div>
                <h3 className="font-heading font-bold text-lomash-dark mb-2">{method.title}</h3>
                <p className="text-sm font-semibold text-lomash-secondary mb-1">{method.primary}</p>
                <p className="text-sm text-lomash-gray-600 mb-2">{method.secondary}</p>
                <p className="text-xs text-lomash-gray-500 mb-4">{method.description}</p>
                <Link
                  href={method.action}
                  className="block w-full border border-lomash-primary text-lomash-primary text-xs tracking-widest uppercase text-center py-2 hover:bg-lomash-primary hover:text-white transition-colors duration-200"
                >
                  Connect
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── Contact Form + Sidebar ─── */}
      <section className="px-6 md:px-16 pb-16 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Form */}
          <div className="md:col-span-2 border border-lomash-gray-200 rounded-sm bg-white p-8">
            <div className="mb-6">
              <h2 className="font-heading text-2xl font-bold text-lomash-dark flex items-center gap-2 mb-1">
                <Send className="w-5 h-5 text-lomash-primary" />
                Send Us a Message
              </h2>
              <p className="text-lomash-gray-500 text-sm">
                Fill out the form below and we&apos;ll get back to you within 24 hours
              </p>
            </div>

            <form className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <Label htmlFor="firstName" className="text-sm font-medium text-lomash-dark">
                    First Name <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-lomash-gray-400" />
                    <input
                      id="firstName"
                      type="text"
                      required
                      placeholder="John"
                      className="w-full h-10 pl-10 pr-4 border border-lomash-gray-300 rounded-sm text-sm text-lomash-dark placeholder:text-lomash-gray-400 focus:outline-none focus:border-lomash-primary"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="lastName" className="text-sm font-medium text-lomash-dark">
                    Last Name <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-lomash-gray-400" />
                    <input
                      id="lastName"
                      type="text"
                      required
                      placeholder="Doe"
                      className="w-full h-10 pl-10 pr-4 border border-lomash-gray-300 rounded-sm text-sm text-lomash-dark placeholder:text-lomash-gray-400 focus:outline-none focus:border-lomash-primary"
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-sm font-medium text-lomash-dark">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-lomash-gray-400" />
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="john@example.com"
                      className="w-full h-10 pl-10 pr-4 border border-lomash-gray-300 rounded-sm text-sm text-lomash-dark placeholder:text-lomash-gray-400 focus:outline-none focus:border-lomash-primary"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone" className="text-sm font-medium text-lomash-dark">
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-lomash-gray-400" />
                    <input
                      id="phone"
                      type="tel"
                      required
                      placeholder="+91 98250 12345"
                      className="w-full h-10 pl-10 pr-4 border border-lomash-gray-300 rounded-sm text-sm text-lomash-dark placeholder:text-lomash-gray-400 focus:outline-none focus:border-lomash-primary"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="company" className="text-sm font-medium text-lomash-dark">
                  Company / Organization{' '}
                  <span className="text-lomash-gray-400 font-normal">(Optional)</span>
                </Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-lomash-gray-400" />
                  <input
                    id="company"
                    type="text"
                    placeholder="Your company name"
                    className="w-full h-10 pl-10 pr-4 border border-lomash-gray-300 rounded-sm text-sm text-lomash-dark placeholder:text-lomash-gray-400 focus:outline-none focus:border-lomash-primary"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="inquiryType" className="text-sm font-medium text-lomash-dark">
                  Type of Inquiry <span className="text-red-500">*</span>
                </Label>
                <select
                  id="inquiryType"
                  required
                  className="w-full h-10 px-3 border border-lomash-gray-300 rounded-sm text-sm text-lomash-dark bg-white focus:outline-none focus:border-lomash-primary"
                >
                  <option value="">Select inquiry type</option>
                  {inquiryTypes.map((type) => (
                    <option key={type} value={type.toLowerCase()}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="subject" className="text-sm font-medium text-lomash-dark">
                  Subject <span className="text-red-500">*</span>
                </Label>
                <input
                  id="subject"
                  type="text"
                  required
                  placeholder="Brief description of your inquiry"
                  className="w-full h-10 px-4 border border-lomash-gray-300 rounded-sm text-sm text-lomash-dark placeholder:text-lomash-gray-400 focus:outline-none focus:border-lomash-primary"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="message" className="text-sm font-medium text-lomash-dark">
                  Message <span className="text-red-500">*</span>
                </Label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  placeholder="Tell us about your project, questions, or how we can help..."
                  className="w-full px-4 py-3 border border-lomash-gray-300 rounded-sm text-sm text-lomash-dark placeholder:text-lomash-gray-400 focus:outline-none focus:border-lomash-primary resize-none"
                />
              </div>

              {/* File upload */}
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-lomash-dark">
                  Attachments{' '}
                  <span className="text-lomash-gray-400 font-normal">(Optional)</span>
                </Label>
                <div className="border-2 border-dashed border-lomash-gray-200 rounded-sm p-6 text-center hover:border-lomash-accent transition-colors">
                  <ImageIcon className="w-8 h-8 text-lomash-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-lomash-gray-600 mb-1">
                    Upload design inspiration, measurements, or photos
                  </p>
                  <p className="text-xs text-lomash-gray-400 mb-3">PNG, JPG, PDF up to 10MB</p>
                  <button
                    type="button"
                    className="border border-lomash-gray-300 text-lomash-dark text-xs px-4 py-2 hover:border-lomash-primary hover:text-lomash-primary transition-colors"
                  >
                    Choose Files
                  </button>
                </div>
              </div>

              {/* Consent */}
              <div className="flex items-start gap-2">
                <input type="checkbox" id="consent" required className="mt-1" />
                <label htmlFor="consent" className="text-xs text-lomash-gray-600 leading-relaxed">
                  I agree to be contacted by Lomash Wood regarding my inquiry and consent to the
                  processing of my personal data as per the{' '}
                  <Link
                    href="/privacy-policy"
                    className="text-lomash-primary underline hover:text-lomash-secondary"
                  >
                    Privacy Policy
                  </Link>
                  .
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-lomash-primary text-white font-heading font-semibold text-sm py-4 hover:bg-lomash-secondary transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </form>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Info card */}
            <div className="border border-lomash-gray-200 rounded-sm bg-lomash-gray-50 p-6 space-y-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-lomash-primary flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lomash-dark mb-1 text-sm">
                    Response Time
                  </h3>
                  <p className="text-xs text-lomash-gray-600 leading-relaxed">
                    We typically respond within 24 hours on business days
                  </p>
                </div>
              </div>
              <Separator className="bg-lomash-gray-200" />
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-lomash-secondary flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lomash-dark mb-1 text-sm">
                    Free Consultation
                  </h3>
                  <p className="text-xs text-lomash-gray-600 leading-relaxed">
                    First consultation is always complimentary
                  </p>
                </div>
              </div>
              <Separator className="bg-lomash-gray-200" />
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-lomash-accent flex items-center justify-center flex-shrink-0">
                  <HeadphonesIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lomash-dark mb-1 text-sm">
                    Expert Support
                  </h3>
                  <p className="text-xs text-lomash-gray-600 leading-relaxed">
                    Speak directly with our craftsmen and designers
                  </p>
                </div>
              </div>
            </div>

            {/* Social media */}
            <div className="border border-lomash-gray-200 rounded-sm bg-white p-6">
              <h3 className="font-heading font-semibold text-lomash-dark mb-4 text-sm">
                Follow Us
              </h3>
              <div className="space-y-2">
                {socialMedia.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <Link
                      key={index}
                      href={social.url}
                      className="flex items-center gap-3 p-2 rounded-sm hover:bg-lomash-gray-50 transition-colors"
                    >
                      <Icon className="w-5 h-5 text-lomash-primary" />
                      <div>
                        <p className="text-sm font-medium text-lomash-dark">{social.name}</p>
                        <p className="text-xs text-lomash-gray-500">{social.handle}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ Section ─── */}
      <section className="px-6 md:px-16 pb-16 max-w-7xl mx-auto">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-lomash-dark text-center mb-10">
          Frequently Asked Questions
        </h2>
        <Accordion
          type="single"
          collapsible
          className="w-full divide-y divide-lomash-gray-200 border-t border-lomash-gray-200"
        >
          {faqCategories.map((cat) => (
            <AccordionItem
              key={cat.value}
              value={cat.value}
              className="border-b border-lomash-gray-200"
            >
              <AccordionTrigger className="font-heading text-base md:text-lg font-normal text-lomash-dark py-5 hover:text-lomash-primary hover:no-underline">
                {cat.label}
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <div className="space-y-5">
                  {cat.items.map((item, i) => (
                    <div key={i}>
                      <h4 className="font-heading font-semibold text-lomash-dark text-sm mb-1">
                        {item.q}
                      </h4>
                      <p className="text-lomash-gray-600 text-sm leading-relaxed">{item.a}</p>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* ─── Bespoke Design Service ─── */}
      <section className="bg-lomash-gray-50 py-14 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-lomash-dark mb-6">
            Our bespoke design service
          </h2>
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 bg-white border border-lomash-gray-200 rounded-full px-4 py-2 text-sm text-lomash-dark shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-lomash-secondary inline-block" />
              Appointments filling up fast
            </span>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-white border border-lomash-gray-200 rounded-sm p-8">
              <div className="w-12 h-12 flex items-center justify-center mb-5">
                <Monitor className="w-8 h-8 text-lomash-dark" strokeWidth={1.2} />
              </div>
              <h3 className="font-heading text-lg font-bold text-lomash-dark mb-4">
                In-store design appointment
              </h3>
              <ul className="space-y-2">
                {[
                  'Meet your dedicated designer',
                  'Receive a quote tailored to your style and budget',
                  '3D design to visualise your dream space',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-lomash-gray-600">
                    <span className="text-lomash-gray-400 mt-0.5">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white border border-lomash-gray-200 rounded-sm p-8">
              <div className="w-12 h-12 flex items-center justify-center mb-5">
                <Store className="w-8 h-8 text-lomash-dark" strokeWidth={1.2} />
              </div>
              <h3 className="font-heading text-lg font-bold text-lomash-dark mb-4">
                Virtual design appointment
              </h3>
              <ul className="space-y-2">
                {[
                  'Expert design advice from the comfort of your home',
                  'Receive a quote tailored to your style and budget',
                  '3D design to visualise your dream space',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-lomash-gray-600">
                    <span className="text-lomash-gray-400 mt-0.5">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/book-appointment"
              className="inline-block bg-lomash-dark text-white text-sm font-semibold px-12 py-4 hover:bg-lomash-primary transition-colors duration-200"
            >
              Book a free appointment
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Locations ─── */}
      <section className="py-16 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-lomash-dark mb-2 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-lomash-primary" />
            Our Locations
          </h2>
          <p className="text-lomash-gray-500 text-sm md:text-base">
            Visit our workshop and showroom to see our craftsmanship firsthand
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {locations.map((location, index) => (
            <div
              key={index}
              className={`p-6 rounded-sm border-2 ${
                location.isPrimary
                  ? 'border-lomash-accent bg-lomash-primary/5'
                  : 'border-lomash-gray-200 bg-lomash-gray-50'
              }`}
            >
              {location.isPrimary && (
                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-lomash-primary text-white text-xs font-semibold mb-3">
                  <Store className="w-3 h-3" />
                  Main Location
                </div>
              )}
              <h3 className="font-heading font-bold text-lg text-lomash-dark mb-4">
                {location.name}
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Navigation className="w-5 h-5 text-lomash-gray-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-lomash-gray-700">{location.address}</p>
                    <p className="text-sm text-lomash-gray-700">{location.city}</p>
                    <p className="text-sm text-lomash-gray-700">{location.country}</p>
                  </div>
                </div>
                <Separator className="bg-lomash-gray-200" />
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-lomash-gray-500 flex-shrink-0" />
                  <a
                    href={`tel:${location.phone}`}
                    className="text-sm text-lomash-primary hover:underline"
                  >
                    {location.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-lomash-gray-500 flex-shrink-0" />
                  <a
                    href={`mailto:${location.email}`}
                    className="text-sm text-lomash-primary hover:underline"
                  >
                    {location.email}
                  </a>
                </div>
                <Separator className="bg-lomash-gray-200" />
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-lomash-gray-500 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-lomash-gray-600 space-y-1">
                    {location.hours.map((hour, idx) => (
                      <p key={idx}>{hour}</p>
                    ))}
                  </div>
                </div>
                <Link
                  href="#"
                  className="flex items-center justify-center gap-2 w-full border border-lomash-primary text-lomash-primary text-xs tracking-widest uppercase py-3 mt-2 hover:bg-lomash-primary hover:text-white transition-colors duration-200"
                >
                  <Map className="w-4 h-4" />
                  Get Directions
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── The Lomash Difference ─── */}
      <section className="py-16 px-6 md:px-16 bg-lomash-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-lomash-dark mb-2">
              The Lomash Difference
            </h2>
            <p className="text-lomash-gray-600 text-sm md:text-base">
              Inspiring better living through purposeful design.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {differentiators.map((item, index) => (
              <div
                key={index}
                className="border border-lomash-gray-200 rounded-sm p-6 text-center hover:border-lomash-accent hover:shadow-product-card transition-all duration-200 bg-white"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <p className="text-sm text-lomash-dark leading-snug">
                  <span className="font-semibold text-lomash-secondary">{item.highlight}</span>{' '}
                  {item.rest}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Trustpilot Reviews ─── */}
      <section className="bg-lomash-gray-50 py-14 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <p className="font-heading text-2xl font-bold text-lomash-dark mb-2">Excellent</p>
            <div className="flex justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 flex items-center justify-center ${
                    i < 4 ? 'bg-[#00B67A]' : 'bg-[#00B67A]/60'
                  }`}
                >
                  <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
              ))}
            </div>
            <p className="text-lomash-gray-600 text-sm">
              Rated 4.5 / 5 based on{' '}
              <span className="underline underline-offset-2">1,200+ reviews</span> on{' '}
              <span className="font-semibold text-lomash-dark">★ Trustpilot</span>
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="bg-white border border-lomash-gray-200 rounded-sm p-5 hover:shadow-product-card transition-shadow"
              >
                <div className="flex gap-0.5 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <div key={i} className="w-5 h-5 bg-[#00B67A] flex items-center justify-center">
                      <svg viewBox="0 0 24 24" fill="white" className="w-3 h-3">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-lomash-gray-500 mb-1">
                  <span className="font-semibold text-lomash-dark">{review.name}</span>,{' '}
                  {review.date}
                </p>
                <h4 className="font-heading font-bold text-lomash-dark text-sm mb-2">
                  {review.title}
                </h4>
                <p className="text-lomash-gray-600 text-xs leading-relaxed line-clamp-4">
                  {review.body}
                </p>
                <button className="mt-3 text-lomash-secondary text-xs font-medium hover:underline">
                  Read more
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ Quick Links ─── */}
      <section className="py-14 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="mb-6">
          <h2 className="font-heading text-xl font-bold text-lomash-dark flex items-center gap-2 mb-1">
            <AlertCircle className="w-5 h-5 text-lomash-primary" />
            Have Questions?
          </h2>
          <p className="text-lomash-gray-500 text-sm">
            You might find your answer in our FAQ section
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          {[
            'How long does a custom project take?',
            'What types of wood do you use?',
            'Do you offer financing options?',
            'Can I visit the workshop?',
            'What is your warranty policy?',
            'Do you ship internationally?',
          ].map((question, index) => (
            <Link
              key={index}
              href="/faq"
              className="flex items-center gap-2 p-3 rounded-sm bg-lomash-gray-50 border border-lomash-gray-200 hover:border-lomash-accent hover:shadow-sm transition-all"
            >
              <CheckCircle2 className="w-4 h-4 text-lomash-secondary flex-shrink-0" />
              <span className="text-sm text-lomash-gray-700">{question}</span>
            </Link>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link
            href="/faq"
            className="inline-block border border-lomash-primary text-lomash-primary text-xs tracking-widest uppercase px-8 py-3 hover:bg-lomash-primary hover:text-white transition-colors duration-200"
          >
            View All FAQs
          </Link>
        </div>
      </section>
    </div>
  );
}