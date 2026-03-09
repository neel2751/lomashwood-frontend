"use client";

import { MapPin, Calendar, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.id}`} className="group block">
      <div
        className={cn(
          "overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100",
          className
        )}
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-lomash-gray-100">
          <Image
            src={project.image || "/images/placeholder.jpg"}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <Badge
              variant="default"
              className="capitalize bg-white text-lomash-dark border-0 shadow-sm font-medium text-xs"
            >
              {project.category}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Title */}
          <h3 className="text-base font-bold text-lomash-dark mb-2 line-clamp-1 group-hover:text-lomash-primary transition-colors duration-200">
            {project.title}
          </h3>

          {/* Description */}
          {project.description && (
            <p className="text-sm text-lomash-gray-500 mb-3 line-clamp-2">
              {project.description}
            </p>
          )}

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-xs text-lomash-gray-400 mb-4">
            {project.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3 flex-shrink-0" />
                <span>{project.location}</span>
              </div>
            )}
            {project.completedAt && (
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3 flex-shrink-0" />
                <span>
                  {new Date(project.completedAt).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            )}
          </div>

          {/* View Project Link */}
          <div className="flex items-center gap-1 text-sm font-semibold text-lomash-primary group-hover:gap-2 transition-all duration-200">
            <span>View Project</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}