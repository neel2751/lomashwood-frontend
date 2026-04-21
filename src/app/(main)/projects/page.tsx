"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { apiClient } from "@/lib/api";
import { QUERY_KEYS } from "@/lib/react-query";

const categories = ["All", "Kitchen", "Bedroom", "Media Wall"];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  // Fetch projects from API
  const { data: projectsData, isLoading, isError } = useQuery({
    queryKey: QUERY_KEYS.projects.all,
    queryFn: () => apiClient.projects.getAll(),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  // Transform API data to match component expectations
  const projects = useMemo(() => {
    if (!projectsData?.data) return [];
    
    return projectsData.data.map((project: any) => ({
      id: project.id,
      title: project.title,
      category: project.category === "Kitchen" ? "Kitchen" : project.category === "Bedroom" ? "Bedroom" : "Media Wall",
      location: project.location || "Location TBA",
      image: project.image || (Array.isArray(project.images) && project.images[0]) || "/LomashLogo.png",
      completedAt: project.completedAt,
    }));
  }, [projectsData?.data]);

  // ── Filter projects by active category ─────────────────────────────────────
  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [activeCategory, projects]);

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
                onClick={() => setActiveCategory(cat)} // ← wired up
                className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat        // ← reflects actual state
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

      {/* Results count */}
      <div className="container mx-auto px-4 pt-6">
        <p className="text-sm text-gray-500">
          Showing{" "}
          <span className="font-semibold text-lomash-dark">
            {isLoading ? "-" : filteredProjects.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-lomash-dark">{isLoading ? "-" : projects.length}</span>{" "}
          projects
          {activeCategory !== "All" && (
            <span className="ml-1">
              in{" "}
              <span className="font-semibold text-lomash-primary">
                {activeCategory}
              </span>
            </span>
          )}
        </p>
      </div>

      {/* Projects Grid */}
      <section className="container mx-auto px-4 py-6">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : isError || filteredProjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              {isError ? "Failed to load projects" : "No projects found"}
            </h3>
            <p className="text-sm text-gray-400 mb-6">
              {isError ? "Please try again later." : "No projects in this category yet. Check back soon!"}
            </p>
            {!isError && (
              <button
                onClick={() => setActiveCategory("All")}
                className="px-5 py-2 rounded-full bg-lomash-primary text-white text-sm font-medium hover:opacity-90 transition"
              >
                View All Projects
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
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
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
        )}
      </section>
    </div>
  );
}