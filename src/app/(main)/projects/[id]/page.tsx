import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Calendar, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Project Detail | Lomash Wood",
  description: "View the details of this completed project by Lomash Wood.",
};

const project = {
  id: "1",
  title: "Modern White Handleless Kitchen",
  category: "Kitchen",
  location: "London, UK",
  completedAt: "2024-03-01",
  description:
    "A stunning handleless kitchen designed for a young family in South London. The brief was to create a clean, minimal space that maximised storage without compromising on style. We used high-gloss white doors with integrated lighting and a quartz worktop throughout.",
  images: [
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&auto=format&fit=crop",
  ],
  style: "Modern",
  finish: "High Gloss White",
  layout: "L-Shape",
  duration: "3 weeks",
  details: [
    { label: "Style", value: "Modern Handleless" },
    { label: "Finish", value: "High Gloss White" },
    { label: "Worktop", value: "Quartz" },
    { label: "Layout", value: "L-Shape" },
    { label: "Duration", value: "3 Weeks" },
    { label: "Location", value: "London, UK" },
  ],
};

const relatedProjects = [
  {
    id: "2",
    title: "Shaker Style Kitchen",
    category: "Kitchen",
    location: "Manchester",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "5",
    title: "Contemporary Kitchen",
    category: "Kitchen",
    location: "Bristol",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "9",
    title: "Traditional Kitchen",
    category: "Kitchen",
    location: "Cardiff",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=600&auto=format&fit=crop",
  },
];

export default function ProjectDetailPage() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Back Button */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-lomash-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left - Images */}
          <div className="lg:col-span-2 space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-gray-100">
              <Image
                src={project.images[0]}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Thumbnail Grid */}
            <div className="grid grid-cols-3 gap-3">
              {project.images.slice(1).map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-100 cursor-pointer hover:opacity-90 transition-opacity"
                >
                  <Image
                    src={image}
                    alt={`${project.title} ${index + 2}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 mt-4">
              <h2 className="text-xl font-bold text-lomash-dark mb-3">
                About This Project
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {project.description}
              </p>
            </div>
          </div>

          {/* Right - Details */}
          <div className="space-y-6">
            {/* Title & Meta */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-lomash-primary/10 text-lomash-primary border-0 text-xs font-medium">
                  {project.category}
                </Badge>
              </div>

              <h1 className="text-2xl font-bold text-lomash-dark mb-4">
                {project.title}
              </h1>

              <div className="flex flex-col gap-2 text-sm text-gray-500 mb-6">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-lomash-primary" />
                  <span>{project.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-lomash-primary" />
                  <span>
                    Completed{" "}
                    {new Date(project.completedAt).toLocaleDateString("en-GB", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>

              {/* Project Details */}
              <div className="divide-y divide-gray-100">
                {project.details.map((detail) => (
                  <div key={detail.label} className="flex justify-between py-3 text-sm">
                    <span className="text-gray-500">{detail.label}</span>
                    <span className="font-semibold text-lomash-dark">{detail.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-lomash-primary rounded-xl p-6 text-white">
              <h3 className="text-lg font-bold mb-2">
                Love This Design?
              </h3>
              <p className="text-sm text-white/80 mb-4">
                Book a free consultation with our designers to create your dream space.
              </p>
              <Link href="/book-appointment">
                <Button className="w-full bg-white text-lomash-primary hover:bg-white/90 font-semibold">
                  Book Free Consultation
                </Button>
              </Link>
            </div>

            {/* Share */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h3 className="text-sm font-bold text-lomash-dark mb-3">
                Get Inspired
              </h3>
              <Link href="/projects">
                <Button variant="outline" className="w-full group">
                  View More Projects
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Related Projects */}
        <div className="mt-14">
          <h2 className="text-2xl font-bold text-lomash-dark mb-6">
            Related Projects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProjects.map((related) => (
              <Link
                key={related.id}
                href={`/projects/${related.id}`}
                className="group block"
              >
                <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={related.image}
                      alt={related.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-white text-lomash-dark text-xs border-0 shadow-sm">
                        {related.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lomash-dark text-sm mb-1 group-hover:text-lomash-primary transition-colors">
                      {related.title}
                    </h3>
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <MapPin className="h-3 w-3" />
                        <span>{related.location}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs font-semibold text-lomash-primary">
                        <span>View</span>
                        <ArrowRight className="h-3 w-3" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}