'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Download,
  FileText,
  Eye,
  Share2,
  Mail,
  Printer,
  Layers,
  CheckCircle2,
  Star,
  Calendar,
  Bookmark,
  Search,
  Filter,
  Package,
  Sparkles,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const featuredBrochures = [
  {
    id: 1,
    title: 'Complete Furniture Catalog 2024',
    description:
      'Our comprehensive catalog featuring all furniture collections, wood species, and customization options.',
    category: 'Complete Catalog',
    pages: 68,
    size: '12.5 MB',
    format: 'PDF',
    publishedDate: '2024-01-15',
    downloads: 2341,
    thumbnail: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80',
    tags: ['Complete', 'All Categories', '2024'],
  },
  {
    id: 2,
    title: 'Kitchen Collection Lookbook',
    description:
      'Beautiful imagery and details of our bespoke kitchen designs, materials, and finishes.',
    category: 'Kitchen',
    pages: 24,
    size: '8.2 MB',
    format: 'PDF',
    publishedDate: '2024-01-10',
    downloads: 1567,
    thumbnail: 'https://plus.unsplash.com/premium_photo-1683140941523-f1fbbabe54d5?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    tags: ['Kitchen', 'Bespoke', 'Design'],
  },
  {
    id: 3,
    title: 'Sustainable Wood Guide',
    description: 'Learn about our commitment to sustainability and the FSC-certified woods we use.',
    category: 'Guide',
    pages: 16,
    size: '4.8 MB',
    format: 'PDF',
    publishedDate: '2023-12-20',
    downloads: 892,
    thumbnail: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80',
    tags: ['Sustainability', 'Wood Species', 'Guide'],
  },
];

const allBrochures = [
  {
    id: 4,
    title: 'Bedroom Furniture Collection',
    description: 'Beds, wardrobes, nightstands, and dressers for your bedroom.',
    category: 'Bedroom',
    pages: 20,
    size: '6.4 MB',
    format: 'PDF',
    publishedDate: '2024-01-08',
    downloads: 1234,
    thumbnail: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80',
    tags: ['Bedroom', 'Beds', 'Storage'],
  },
  {
    id: 5,
    title: 'Living Room Essentials',
    description: 'Coffee tables, TV units, bookshelves, and living room seating.',
    category: 'Living Room',
    pages: 28,
    size: '9.1 MB',
    format: 'PDF',
    publishedDate: '2024-01-05',
    downloads: 1678,
    thumbnail: 'https://images.unsplash.com/photo-1504624975280-0c8f8c0f0c3e?auto=format&fit=crop&w=800&q=80',
    tags: ['Living Room', 'Coffee Tables', 'Storage'],
  },
  {
    id: 6,
    title: 'Office & Study Furniture',
    description: 'Desks, chairs, and storage solutions for your workspace.',
    category: 'Office',
    pages: 18,
    size: '5.7 MB',
    format: 'PDF',
    publishedDate: '2023-12-28',
    downloads: 756,
    thumbnail: 'https://images.unsplash.com/photo-1523580494868-79c0e1d20c7f?auto=format&fit=crop&w=800&q=80',
    tags: ['Office', 'Desks', 'Chairs'],
  },
  {
    id: 7,
    title: 'Custom Design Portfolio',
    description: 'Showcase of bespoke furniture projects and custom commissions.',
    category: 'Portfolio',
    pages: 32,
    size: '15.3 MB',
    format: 'PDF',
    publishedDate: '2023-12-15',
    downloads: 2103,
    thumbnail: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80',
    tags: ['Custom', 'Portfolio', 'Inspiration'],
  },
  {
    id: 8,
    title: 'Wood Finishes & Stains',
    description: 'Complete guide to available wood finishes, stains, and treatments.',
    category: 'Guide',
    pages: 12,
    size: '3.2 MB',
    format: 'PDF',
    publishedDate: '2023-12-10',
    downloads: 1089,
    thumbnail: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80',
    tags: ['Finishes', 'Colors', 'Guide'],
  },
  {
    id: 9,
    title: 'Care & Maintenance Guide',
    description: 'How to care for and maintain your solid wood furniture.',
    category: 'Guide',
    pages: 8,
    size: '2.1 MB',
    format: 'PDF',
    publishedDate: '2023-12-01',
    downloads: 1423,
    thumbnail: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80',
    tags: ['Care', 'Maintenance', 'Guide'],
  },
  {
    id: 10,
    title: 'Outdoor Furniture Catalog',
    description: 'Weather-resistant outdoor tables, benches, and garden furniture.',
    category: 'Outdoor',
    pages: 16,
    size: '7.8 MB',
    format: 'PDF',
    publishedDate: '2023-11-20',
    downloads: 567,
    thumbnail: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80',
    tags: ['Outdoor', 'Garden', 'Weather-Resistant'],
  },
  {
    id: 11,
    title: 'Price List 2024',
    description: 'Current pricing for standard items and customization options.',
    category: 'Pricing',
    pages: 10,
    size: '1.8 MB',
    format: 'PDF',
    publishedDate: '2024-01-01',
    downloads: 3214,
    thumbnail: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80',
    tags: ['Pricing', 'Quotes', '2024'],
  },
  {
    id: 12,
    title: 'Kitchen & Dining Storage',
    description: 'Cabinets, sideboards, and storage solutions for kitchen and dining.',
    category: 'Storage',
    pages: 14,
    size: '4.5 MB',
    format: 'PDF',
    publishedDate: '2023-11-15',
    downloads: 892,
    thumbnail: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80',
    tags: ['Kitchen', 'Storage', 'Cabinets'],
  },
];

const categories = [
  'All Categories',
  'Complete Catalog',
  'Kitchen',
  'Bedroom',
  'Living Room',
  'Office',
  'Outdoor',
  'Storage',
  'Portfolio',
  'Guide',
  'Pricing',
];

const requestBrochures = [
  {
    id: 'kitchen',
    label: 'Lomash Wood Premium Kitchen Brochure',
    thumbnail: 'https://plus.unsplash.com/premium_photo-1683140941523-f1fbbabe54d5?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    tags: ['Kitchen', 'Bespoke', 'Design'],
  },
  {
    id: 'bedroom',
    label: 'Lomash Wood Luxury Bedroom Brochure',
    thumbnail: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=3280&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    tags: ['Bedroom', 'Luxury', 'Design'],
  },
];

export default function BrochurePage() {
  const [selectedBrochures, setSelectedBrochures] = useState<string[]>([]);
  const [deliveryMethod, setDeliveryMethod] = useState<'download' | 'post' | ''>('');
  const [commsPreference, setCommsPreference] = useState<'yes' | 'no' | ''>('');
  const [submitted, setSubmitted] = useState(false);

  const toggleBrochure = (id: string) => {
    setSelectedBrochures((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-lomash-primary flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-lomash-primary" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-lomash-dark mb-3">
            Request Received!
          </h2>
          <p className="text-lomash-gray-600 text-sm leading-relaxed mb-6">
            {deliveryMethod === 'download'
              ? 'Your brochure is ready to download. Check your email for the link.'
              : 'Your brochure will be delivered within 3–5 working days.'}
          </p>
          <Link
            href="/"
            className="inline-block bg-lomash-primary text-white text-xs tracking-widest uppercase px-8 py-3 hover:bg-lomash-secondary transition-colors duration-200"
          >
            Back To Home
          </Link>
        </div>
      </div>
    );
  }

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

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 1 — Hero banner (matching screenshot 1)
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative h-[260px] w-full flex items-center justify-center">
        <div className="absolute inset-0 bg-lomash-secondary/70">
          <Image
            src="https://images.unsplash.com/photo-1758448511322-8bfc73daf606?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Request a free brochure"
            fill
            priority
            className="object-cover opacity-50"
          />
        </div>
        <h1 className="relative z-10 font-heading text-3xl md:text-6xl text-white font-medium text-center px-6">
          Request A Free Brochure
        </h1>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 2 — Request form (matching screenshots 1-3)
          Marble side strips + 2-column form layout
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 px-6 bg-white">
        {/* Marble side strips */}
        <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-20 bg-lomash-gray-100 border-r border-lomash-gray-200" />
        <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-20 bg-lomash-gray-100 border-l border-lomash-gray-200" />

        <form onSubmit={handleSubmit} className="relative max-w-7xl mx-auto lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">

            {/* ── Left: Brochure selection ── */}
            <div>
              <p className="text-lomash-gray-400 text-xs mb-6">
                *Please note all fields are mandatory
              </p>
              <h2 className="font-heading text-xl font-semibold text-lomash-dark mb-6">
                Which brochure(s) would you like?
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {requestBrochures.map((brochure) => {
                  const selected = selectedBrochures.includes(brochure.id);
                  return (
                    <button
                      type="button"
                      key={brochure.id}
                      onClick={() => toggleBrochure(brochure.id)}
                      className={`relative border-2 rounded-xl overflow-hidden text-left transition-all duration-200 ${
                        selected
                          ? 'border-lomash-primary shadow-product-card'
                          : 'border-lomash-gray-200 hover:border-lomash-accent'
                      }`}
                    >
                      {/* Checkbox top-right */}
                      <div className="absolute top-3 right-3 z-10">
                        <div
                          className={`w-5 h-5 border-2 flex rounded-lg items-center justify-center transition-colors ${
                            selected
                              ? 'bg-lomash-primary border-lomash-primary'
                              : 'bg-white border-lomash-gray-300'
                          }`}
                        >
                          {selected && (
                            <svg viewBox="0 0 12 10" fill="none" className="w-3 h-3">
                              <path
                                d="M1 5l3.5 3.5L11 1"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </div>
                      </div>
                      {/* Image */}
                      <div className="relative h-44 bg-lomash-gray-100">
                        <Image
                          src={brochure.thumbnail}
                          alt={brochure.label}
                          fill
                          className="object-cover"
                        />
                      </div>
                      {/* Label */}
                      <div className="p-3 bg-white">
                        <p className={`text-base font-medium text-center leading-snug
                          ${selected ? 'text-lomash-primary font-semibold' : 'text-lomash-dark'}
                          `}>
                          {brochure.label}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── Right: Delivery + personal details ── */}
            <div className="space-y-8">
              {/* How to receive */}
              <div>
                <h2 className="font-heading text-xl font-semibold text-lomash-dark mb-6">
                  How would you like to receive your brochure?*
                </h2>

                {/* Download */}
                <label className="flex items-start gap-4 cursor-pointer mb-6 group">
                  <div
                    className={`mt-0.5 w-5 h-5 border-2 flex-shrink-0 flex items-center rounded-lg justify-center transition-colors ${
                      deliveryMethod === 'download'
                        ? 'border-lomash-primary bg-lomash-primary/10'
                        : 'border-lomash-gray-300 group-hover:border-lomash-accent'
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      value="download"
                      className="sr-only"
                      required
                      onChange={() => setDeliveryMethod('download')}
                    />
                    {deliveryMethod === 'download' && (
                      <div className="w-2.5 h-2.5 bg-lomash-primary rounded-sm" />
                    )}
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-lomash-secondary text-sm mb-0.5">
                      Download
                    </p>
                    <p className="text-lomash-gray-500 text-xs leading-relaxed">
                      Can&apos;t wait? Download the brochure as a PDF immediately.
                    </p>
                  </div>
                </label>

                {/* Post */}
                <label className="flex items-start gap-4 cursor-pointer group">
                  <div
                    className={`mt-0.5 w-5 h-5 border-2 flex-shrink-0 flex items-center rounded-lg justify-center transition-colors ${
                      deliveryMethod === 'post'
                        ? 'border-lomash-primary bg-lomash-primary/10'
                        : 'border-lomash-gray-300 group-hover:border-lomash-accent'
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      value="post"
                      className="sr-only"
                      onChange={() => setDeliveryMethod('post')}
                    />
                    {deliveryMethod === 'post' && (
                      <div className="w-2.5 h-2.5 bg-lomash-primary rounded-sm" />
                    )}
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-lomash-secondary text-sm mb-0.5">
                      Post
                    </p>
                    <p className="text-lomash-gray-500 text-xs leading-relaxed">
                      Your brochure will be delivered within 3–5 working days.
                    </p>
                  </div>
                </label>
              </div>

              {/* Personal details — bottom-border-only inputs */}
              <div className="space-y-6">
                {[
                  { label: 'First name', type: 'text', id: 'firstName' },
                  { label: 'Last name', type: 'text', id: 'lastName' },
                  { label: 'Postcode', type: 'text', id: 'postcode', info: true },
                  { label: 'Email address', type: 'email', id: 'email' },
                  { label: 'Phone number', type: 'tel', id: 'phone' },
                ].map(({ label, type, id, info }) => (
                  <div key={id} className="relative">
                    <label
                      htmlFor={id}
                      className="block text-sm text-lomash-dark mb-2"
                    >
                      {label} <span className="text-red-500">*</span>
                    </label>
                    <input
                      id={id}
                      type={type}
                      required
                      className={`w-full border-b border-lomash-gray-300 py-2 text-sm text-lomash-dark bg-transparent focus:outline-none focus:border-lomash-primary transition-colors ${info ? 'pr-6' : ''}`}
                    />
                    {info && (
                      <div className="absolute right-0 top-8 text-lomash-gray-400">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          className="w-4 h-4"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 16v-4M12 8h.01" strokeLinecap="round" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}

                {/* Communication preferences */}
                <div>
                  <p className="text-sm text-lomash-dark mb-4 font-semibold">
                    Communication preferences <span className="text-red-500">*</span>
                  </p>
                  {[
                    {
                      value: 'yes' as const,
                      text: 'Yes, I would like to receive discounts and special offers from Lomash Wood.',
                    },
                    {
                      value: 'no' as const,
                      text: 'No, I do not want to receive discounts and special offers from Lomash Wood.',
                    },
                  ].map(({ value, text }) => (
                    <label key={value} className="flex items-start gap-3 cursor-pointer mb-4 group">
                      <div className="mt-0.5 w-4 h-4 rounded-full border-2 border-lomash-gray-300 flex-shrink-0 flex items-center justify-center group-hover:border-lomash-accent transition-colors">
                        <input
                          type="radio"
                          name="comms"
                          value={value}
                          className="sr-only"
                          required
                          onChange={() => setCommsPreference(value)}
                        />
                        {commsPreference === value && (
                          <div className="w-2 h-2 rounded-full bg-lomash-primary" />
                        )}
                      </div>
                      <p className="text-lomash-gray-600 text-sm tracking-tight font-medium leading-relaxed">{text}</p>
                    </label>
                  ))}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-lomash-primary text-white font-heading font-semibold text-sm py-4 rounded-full hover:bg-lomash-secondary transition-colors duration-200"
                >
                  Send me a brochure
                </button>

                <p className="text-center text-lomash-gray-500 text-sm leading-relaxed">
                  For further information about how we use your personal data please see our{' '}
                  <Link
                    href="/privacy-policy"
                    className="text-lomash-secondary underline font-semibold hover:text-lomash-primary"
                  >
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </form>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 3 — Stats
      ═══════════════════════════════════════════════════════════════════════ */}
      {/* <section className="py-12 px-6 bg-lomash-gray-50">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: FileText, value: '15', label: 'Total Brochures', color: 'text-lomash-primary' },
            { icon: Download, value: '18,756', label: 'Total Downloads', color: 'text-lomash-secondary' },
            { icon: Star, value: '4.8/5', label: 'Average Rating', color: 'text-lomash-accent' },
            { icon: ThumbsUp, value: '100%', label: 'Free Access', color: 'text-lomash-primary' },
          ].map(({ icon: Icon, value, label, color }) => (
            <div
              key={label}
              className="border border-lomash-gray-200 rounded-sm bg-white p-6 text-center hover:shadow-product-card transition-shadow"
            >
              <Icon className={`w-8 h-8 mx-auto mb-2 ${color}`} />
              <p className="font-heading text-2xl font-bold text-lomash-dark">{value}</p>
              <p className="text-xs text-lomash-gray-500">{label}</p>
            </div>
          ))}
        </div>
      </section> */}

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 4 — Filter & Search
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-8 px-6 max-w-7xl mx-auto mt-12">
        <div className="border border-lomash-gray-200 bg-white p-6 rounded-lg">
          <h2 className="font-heading font-semibold text-lomash-dark flex items-center gap-2 mb-5">
            <Filter className="w-5 h-5 text-lomash-primary" />
            Filter &amp; Search
          </h2>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-lomash-gray-400" />
              <input
                type="text"
                placeholder="Search brochures..."
                className="w-full h-10 pl-10 pr-4 border border-lomash-gray-300 rounded-sm text-sm text-lomash-dark focus:outline-none focus:border-lomash-primary"
              />
            </div>
            <select className="w-full md:w-48 h-10 px-3 border border-lomash-gray-300 rounded-sm text-sm text-lomash-dark bg-white focus:outline-none focus:border-lomash-primary">
              {categories.map((cat) => (
                <option key={cat} value={cat.toLowerCase()}>
                  {cat}
                </option>
              ))}
            </select>
            <select className="w-full md:w-48 h-10 px-3 border border-lomash-gray-300 rounded-sm text-sm text-lomash-dark bg-white focus:outline-none focus:border-lomash-primary">
              <option value="recent">Most Recent</option>
              <option value="popular">Most Popular</option>
              <option value="name">Name A-Z</option>
              <option value="pages">Pages (Low to High)</option>
            </select>
          </div>
          {/* <div className="flex gap-2">
            <button className="flex items-center gap-1.5 border border-lomash-gray-300 text-lomash-dark text-xs px-3 py-2 hover:border-lomash-primary hover:text-lomash-primary transition-colors">
              <Grid3x3 className="w-4 h-4" /> Grid
            </button>
            <button className="flex items-center gap-1.5 border border-lomash-gray-300 text-lomash-dark text-xs px-3 py-2 hover:border-lomash-primary hover:text-lomash-primary transition-colors">
              <List className="w-4 h-4" /> List
            </button>
          </div> */}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 5 — Featured Brochures
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-8 px-6 max-w-7xl mx-auto">
        <div className="mb-6">
          <h2 className="font-heading text-2xl font-bold text-lomash-dark flex items-center gap-2 mb-1">
            <Sparkles className="w-6 h-6 text-lomash-primary" />
            Featured Brochures
          </h2>
          <p className="text-lomash-gray-500 text-base font-medium">
              Our most popular and highly-rated brochures, handpicked for you
              with beautiful cover images, detailed descriptions, and all the key info at a glance.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {featuredBrochures.map((brochure) => (
            <div
              key={brochure.id}
              className="border-2 border-lomash-accent/30 bg-lomash-primary/5 rounded-lg overflow-hidden hover:shadow-product-card-hover transition-shadow"
            >
              {/* Brochure cover */}
              <div className="relative h-52 bg-lomash-gray-100 border-b border-lomash-gray-200">
                <Image
                  src={brochure.thumbnail}
                  alt={brochure.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-5">
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-3.5 h-3.5 text-lomash-secondary fill-lomash-secondary" />
                  <span className="text-xs font-semibold text-lomash-secondary uppercase tracking-wider">
                    Featured
                  </span>
                </div>

                <h3 className="font-heading font-semibold text-lomash-dark mb-2 text-lg leading-snug">
                  {brochure.title}
                </h3>
                <p className="text-lomash-gray-600 text-sm mb-4 leading-relaxed">
                  {brochure.description}
                </p>

                <div className="space-y-1 mb-4 text-xs text-lomash-gray-500">
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5" />
                      {brochure.pages} pages
                    </span>
                    <span>{brochure.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1">
                      <Download className="w-3.5 h-3.5" />
                      {brochure.downloads.toLocaleString()} downloads
                    </span>
                    <span>{brochure.format}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {brochure.tags.map((tag) => (
                    <Badge
                      key={tag}
                      className="px-2 py-0.5 bg-white border border-lomash-accent/30 rounded-full text-lomash-secondary hover:bg-lomash-secondary hover:text-white transition-colors cursor-pointer"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 flex items-center justify-center gap-1.5 bg-lomash-primary text-white text-base py-2 hover:bg-lomash-secondary transition-colors">
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                  <Button variant="outline" size="icon" className="border border-lomash-gray-300 text-lomash-gray-600  hover:text-white hover:border-lomash-secondary transition-colors hover:border-none">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="border border-lomash-gray-300 text-lomash-gray-600 hover:text-white hover:border-lomash-secondary transition-colors hover:border-none">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 6 — All Brochures list
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-8 px-6 bg-lomash-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h2 className="font-heading text-2xl font-bold text-lomash-dark flex items-center gap-2 mb-1">
              <Layers className="w-6 h-6 text-lomash-primary" />
              All Brochures &amp; Catalogs
            </h2>
            <p className="text-lomash-gray-500 text-base font-medium">
              Explore our complete library of brochures and catalogs, featuring detailed information on every product category, from kitchens and bedrooms to outdoor furniture and custom designs.
            </p>
          </div>

          <div className="space-y-3">
            {allBrochures.map((brochure) => (
              <div
                key={brochure.id}
                className="flex flex-col md:flex-row gap-4 p-4 border-2 border-lomash-gray-200 bg-white hover:border-lomash-accent hover:shadow-product-card transition-all rounded-lg group cursor-pointer"
              >
                {/* Thumb */}
                <div className="w-full md:w-20 h-28 bg-lomash-gray-100 rounded-sm flex items-center justify-center border border-lomash-gray-200 flex-shrink-0">
                  {brochure.thumbnail ? (
                    <img
                      src={brochure.thumbnail}
                      alt={brochure.title}
                      className="w-full h-full object-cover rounded-sm"
                    />
                  ) : (
                    <FileText className="w-10 h-10 text-lomash-gray-300" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                    <h3 className="font-heading font-semibold text-lomash-dark text-xl leading-snug group-hover:text-lomash-secondary transition-colors">
                      {brochure.title}
                    </h3>
                    <span className="text-[10px] px-2 py-0.5 bg-lomash-primary/10 text-lomash-primary rounded-full font-semibold flex-shrink-0">
                      {brochure.category}
                    </span>
                  </div>
                  <p className="text-lomash-gray-600 text-base mb-3 leading-relaxed">
                    {brochure.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {brochure.tags.map((tag) => (
                      <Badge
                        key={tag}
                        className="px-2 py-0.5 bg-lomash-gray-100 border border-lomash-gray-200 rounded-full text-lomash-gray-600"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-lomash-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5" />
                      {brochure.pages} pages
                    </span>
                    <span className="flex items-center gap-1">
                      <Package className="w-3.5 h-3.5" />
                      {brochure.size}
                    </span>
                    <span className="flex items-center gap-1">
                      <Download className="w-3.5 h-3.5" />
                      {brochure.downloads.toLocaleString()} downloads
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(brochure.publishedDate).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {[
                      { icon: Download, label: 'Download PDF' },
                      { icon: Eye, label: 'Preview' },
                      { icon: Share2, label: 'Share' },
                      { icon: Bookmark, label: 'Save' },
                    ].map(({ icon: Icon, label }) => (
                      <button
                        key={label}
                        className="flex items-center gap-1.5 font-medium border rounded-full text-sm border-lomash-gray-300 text-lomash-dark px-3 py-1.5 hover:border-lomash-primary hover:text-lomash-primary transition-colors first:bg-lomash-primary first:text-white first:hover:text-white first:border-lomash-primary first:hover:bg-lomash-secondary"
                      >
                        <Icon className="w-3.5 h-3.5" />
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button className="border border-lomash-primary font-medium text-white text-base px-8 py-3 hover:bg-lomash-primary hover:text-white transition-colors duration-200">
              Load More Brochures
            </Button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 7 — Request physical + Help
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-8  max-w-7xl mx-auto space-y-4">
        {/* Physical catalog */}
        <div className="border border-lomash-gray-200 rounded-sm bg-lomash-primary/5 p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-lomash-primary/10 flex items-center justify-center flex-shrink-0">
                <Printer className="w-6 h-6 text-lomash-primary" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-lomash-dark mb-1">
                  Request Physical Catalogs
                </h3>
                <p className="text-sm text-lomash-gray-600 leading-relaxed max-w-lg">
                  Prefer a printed version? We&apos;ll send you a beautiful printed catalog with
                  premium photography and detailed product information. Available for customers across
                  India.
                </p>
              </div>
            </div>
            <Link
              href="/contact"
              className="flex-shrink-0 flex rounded-full items-center gap-2 border border-lomash-primary text-lomash-primary text-xs font-semibold tracking-widest uppercase px-6 py-3 hover:bg-lomash-primary hover:text-white transition-colors duration-200"
            >
              <Mail className="w-4 h-4" />
              Request Catalog
            </Link>
          </div>
        </div>

        {/* Need help */}
        <div className="border-2 border-lomash-accent/40 rounded-sm bg-lomash-secondary/5 p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-lomash-secondary flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-heading font-semibold text-lomash-dark mb-1">
                  Need Help Choosing?
                </h3>
                <p className="text-sm text-lomash-gray-600 leading-relaxed max-w-lg">
                  Not sure which catalog to download? Our design team can recommend the best
                  resources for your project and send you personalized selections.
                </p>
              </div>
            </div>
            <Link
              href="/contact"
              className="flex-shrink-0 flex rounded-full border border-lomash-primary text-lomash-primary text-xs font-semibold tracking-widest uppercase px-6 py-3 hover:bg-lomash-primary hover:text-white transition-colors duration-200"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}