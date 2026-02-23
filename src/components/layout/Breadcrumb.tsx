"use client";

import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  const pathname = usePathname();

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (items) return items;

    const paths = pathname.split("/").filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [];

    let currentPath = "";
    paths.forEach((path) => {
      currentPath += `/${path}`;
      const label = path
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      breadcrumbs.push({
        label,
        href: currentPath,
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center space-x-2 text-sm", className)}
    >
      <Link
        href="/"
        className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Home"
      >
        <Home className="h-4 w-4" />
      </Link>

      {breadcrumbs.map((item, index) => {
        const isLast = index === breadcrumbs.length - 1;

        return (
          <Fragment key={item.href}>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            {isLast ? (
              <span
                className="font-medium text-foreground"
                aria-current="page"
              >
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}