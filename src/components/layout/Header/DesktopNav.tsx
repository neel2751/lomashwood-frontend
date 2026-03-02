"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { mainNavigation } from "@/config/navigation";
import { cn } from "@/lib/utils";

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
              "relative text-lg font-semibold transition-colors duration-200",
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