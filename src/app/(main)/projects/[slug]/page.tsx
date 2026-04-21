
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Calendar, ArrowRight } from "lucide-react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { apiClient } from "@/lib/api";
import { QUERY_KEYS } from "@/lib/react-query";

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params?.slug as string;

  // Fetch single project
  const { data: projectData, isLoading: projectLoading, isError: projectError } = useQuery({
    queryKey: QUERY_KEYS.projects.detail(projectId),
    queryFn: () => projectId ? apiClient.projects.getById(projectId) : Promise.reject("No ID"),
    enabled: !!projectId,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  // Fetch all projects for related projects
  const { data: allProjectsData } = useQuery({
    queryKey: QUERY_KEYS.projects.all,
    queryFn: () => apiClient.projects.getAll(),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  const project = (projectData as any)?.data ?? (projectData as any);

  // Get related projects (same category, different project)
  const relatedProjects = (allProjectsData?.data || [])
    .filter((p: any) => p.id !== projectId && p.category === project?.category)
    .slice(0, 3)
    .map((p: any) => ({
      id: p.id,
      title: p.title,
      category: p.category,
      location: p.location || "Location TBA",
      image: p.image || (Array.isArray(p.images) && p.images[0]) || "/LomashLogo.png",
    }));
  if (projectError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-700 mb-2">Project Not Found</h1>
          <p className="text-gray-500 mb-6">The project you're looking for doesn't exist.</p>
          <Link href="/projects">
            <Button>Back to Projects</Button>
          </Link>
        </div>
      </div>
    );
  }

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
            {projectLoading ? (
              <>
                <Skeleton className="aspect-[16/10] rounded-xl" />
                <div className="grid grid-cols-3 gap-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="aspect-[4/3] rounded-lg" />
                  ))}
                </div>
              </>
            ) : project?.images && project.images.length > 0 ? (
              <>
                {/* Main Image */}
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-gray-100">
                  <Image
                    src={project.images[0]}
                    alt={project.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />
                </div>

                {/* Thumbnail Grid */}
                {project.images.length > 1 && (
                  <div className="grid grid-cols-3 gap-3">
                    {project.images.slice(1).map((image: string, index: number) => (
                      <div
                        key={index}
                        className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-100 cursor-pointer hover:opacity-90 transition-opacity"
                      >
                        <Image
                          src={image}
                          alt={`${project.title} ${index + 2}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, 33vw"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : null}

            {/* Description */}
            {projectLoading ? (
              <div className="bg-white rounded-xl border border-gray-100 p-6 mt-4 space-y-3">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ) : project ? (
              <div className="bg-white rounded-xl border border-gray-100 p-6 mt-4">
                <h2 className="text-xl font-bold text-lomash-dark mb-3">
                  About This Project
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {project.description}
                </p>
              </div>
            ) : null}
          </div>

          {/* Right - Details */}
          <div className="space-y-6">
            {/* Title & Meta */}
            {projectLoading ? (
              <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <div className="space-y-2 pt-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-10 w-full" />
                  ))}
                </div>
              </div>
            ) : project ? (
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
                    <span>{project.location || "Location TBA"}</span>
                  </div>
                  {project.completedAt && (
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
                  )}
                </div>

                {/* Project Details */}
                <div className="divide-y divide-gray-100">
                  {project.style && (
                    <div className="flex justify-between py-3 text-sm">
                      <span className="text-gray-500">Style</span>
                      <span className="font-semibold text-lomash-dark">{project.style}</span>
                    </div>
                  )}
                  {project.finish && (
                    <div className="flex justify-between py-3 text-sm">
                      <span className="text-gray-500">Finish</span>
                      <span className="font-semibold text-lomash-dark">{project.finish}</span>
                    </div>
                  )}
                  {project.layout && (
                    <div className="flex justify-between py-3 text-sm">
                      <span className="text-gray-500">Layout</span>
                      <span className="font-semibold text-lomash-dark">{project.layout}</span>
                    </div>
                  )}
                  {project.duration && (
                    <div className="flex justify-between py-3 text-sm">
                      <span className="text-gray-500">Duration</span>
                      <span className="font-semibold text-lomash-dark">{project.duration}</span>
                    </div>
                  )}
                </div>
              </div>
            ) : null}

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
        {!projectLoading && relatedProjects && relatedProjects.length > 0 && (
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
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
        )}
      </div>
    </div>
  );
}