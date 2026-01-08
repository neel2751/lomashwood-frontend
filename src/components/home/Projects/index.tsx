"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "./ProjectCard";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { QUERY_KEYS } from "@/lib/react-query";
import { Skeleton } from "@/components/ui/skeleton";

export function Projects() {
  const { data: projectsData, isLoading } = useQuery({
    queryKey: QUERY_KEYS.projects.all,
    queryFn: () => apiClient.projects.getAll(),
  });

  const projects = projectsData?.data || [];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <div>
            <div className="inline-block px-4 py-2 bg-lomash-primary/10 rounded-full mb-4">
              <span className="text-lomash-primary font-semibold text-sm">
                Our Work
              </span>
            </div>
            
            <h2 className="heading-2 text-lomash-dark mb-2">
              Featured Projects
            </h2>
            <p className="text-lg text-lomash-gray-600">
              See how we've transformed homes across the country
            </p>
          </div>
          
          <Link href="/projects" className="hidden md:block">
            <Button variant="outline" size="lg" className="group">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-72 w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.slice(0, 6).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}

        {/* Mobile View All Button */}
        <div className="mt-10 flex justify-center md:hidden">
          <Link href="/projects">
            <Button size="lg" className="w-full sm:w-auto group">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}