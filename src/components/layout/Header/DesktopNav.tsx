"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { mainNavigation } from "@/config/navigation";

interface DesktopNavProps {
  className?: string;
}

export function DesktopNav({ className }: DesktopNavProps) {
  const pathname = usePathname();

  return (
    <nav className={cn("flex items-center space-x-8", className)}>
      {mainNavigation.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "relative text-sm font-medium transition-colors duration-200",
              isActive
                ? "text-lomash-primary"
                : "text-lomash-dark hover:text-lomash-primary",
              "after:absolute after:bottom-[-8px] after:left-0 after:h-[2px] after:w-0 after:bg-lomash-primary after:transition-all after:duration-300",
              isActive && "after:w-full",
              "hover:after:w-full"
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}