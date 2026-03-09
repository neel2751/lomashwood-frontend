import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Projects | Lomash Wood",
  description: "Browse our completed kitchen and bedroom projects across the UK.",
};

const categories = ["All", "Kitchen", "Bedroom", "Media Wall"];

const projects = [
  {
    id: "1",
    title: "Modern White Kitchen",
    category: "Kitchen",
    location: "London",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=600&auto=format&fit=crop",
    completedAt: "2024-03-01",
  },
  {
    id: "2",
    title: "Shaker Style Kitchen",
    category: "Kitchen",
    location: "Manchester",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=600&auto=format&fit=crop",
    completedAt: "2024-02-15",
  },
  {
    id: "3",
    title: "Fitted Bedroom Wardrobe",
    category: "Bedroom",
    location: "Birmingham",
    image: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=600&auto=format&fit=crop",
    completedAt: "2024-01-20",
  },
  {
    id: "4",
    title: "Luxury Master Bedroom",
    category: "Bedroom",
    location: "Leeds",
    image: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=600&auto=format&fit=crop",
    completedAt: "2024-01-10",
  },
  {
    id: "5",
    title: "Contemporary Kitchen",
    category: "Kitchen",
    location: "Bristol",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=600&auto=format&fit=crop",
    completedAt: "2023-12-05",
  },
  {
    id: "6",
    title: "Media Wall Living Room",
    category: "Media Wall",
    location: "Sheffield",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=600&auto=format&fit=crop",
    completedAt: "2023-11-20",
  },
  {
    id: "7",
    title: "Handleless Kitchen",
    category: "Kitchen",
    location: "Liverpool",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=600&auto=format&fit=crop",
    completedAt: "2023-11-01",
  },
  {
    id: "8",
    title: "Walk-in Wardrobe",
    category: "Bedroom",
    location: "Edinburgh",
    image: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=600&auto=format&fit=crop",
    completedAt: "2023-10-15",
  },
  {
    id: "9",
    title: "Traditional Kitchen",
    category: "Kitchen",
    location: "Cardiff",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=600&auto=format&fit=crop",
    completedAt: "2023-10-01",
  },
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-lomash-dark py-14 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Projects
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Real homes transformed by our expert designers and craftsmen
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  cat === "All"
                    ? "bg-lomash-primary text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-lomash-primary/10 hover:text-lomash-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="group block"
            >
              <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-white text-lomash-dark text-xs font-medium border-0 shadow-sm">
                      {project.category}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-bold text-lomash-dark text-base mb-1 group-hover:text-lomash-primary transition-colors">
                    {project.title}
                  </h3>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <MapPin className="h-3 w-3" />
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-semibold text-lomash-primary group-hover:gap-2 transition-all">
                      <span>View</span>
                      <ArrowRight className="h-3 w-3" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}