"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Calendar, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/types";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.id}`} className="group">
      <div
        className={cn(
          "relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300",
          className
        )}
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-lomash-gray-100">
          <Image
            src={project.image || "/images/placeholder.jpg"}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <Badge variant="default" className="capitalize shadow-md">
              {project.category}
            </Badge>
          </div>

          {/* View Button (appears on hover) */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition-transform">
              <Eye className="h-6 w-6 text-lomash-primary" />
            </div>
          </div>

          {/* Bottom Info (appears on hover) */}
          <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-xl font-bold text-white mb-2">
              {project.title}
            </h3>
            
            <p className="text-sm text-white/90 mb-3 line-clamp-2">
              {project.description}
            </p>

            <div className="flex flex-wrap items-center gap-3 text-white/80 text-xs">
              {project.location && (
                <div className="flex items-center space-x-1">
                  <MapPin className="h-3 w-3" />
                  <span>{project.location}</span>
                </div>
              )}
              
              {project.completedAt && (
                <div className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span>
                    {new Date(project.completedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Default Content (when not hovering) */}
        <div className="p-4 bg-white group-hover:opacity-0 transition-opacity duration-300">
          <h3 className="font-semibold text-lomash-dark mb-1 line-clamp-1">
            {project.title}
          </h3>
          
          {project.location && (
            <div className="flex items-center text-sm text-lomash-gray-600">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{project.location}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}