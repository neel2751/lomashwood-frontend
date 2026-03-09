"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

import { mainNavigation } from "@/config/navigation";
import { cn } from "@/lib/utils";
import { MegaMenu } from "./MegaMenu";

interface DesktopNavProps {
  className?: string;
}

export function DesktopNav({ className }: DesktopNavProps) {
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState<"kitchen" | "bedroom" | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement>(null);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setActiveMenu(null);
  }, [pathname]);

  const handleMouseEnter = (type: "kitchen" | "bedroom") => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(type);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 100);
  };

  const handleClick = (type: "kitchen" | "bedroom") => {
    setActiveMenu((prev) => (prev === type ? null : type));
  };

  return (
    <nav ref={navRef} className={cn("flex items-center space-x-8", className)}>
      {mainNavigation.map((link) => {
        const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
        const isMegaMenu = link.href === "/kitchen" || link.href === "/bedroom";
        const menuType = link.href === "/kitchen" ? "kitchen" : "bedroom";

        return (
          <div
            key={link.href}
            className="relative"
            onMouseEnter={() => isMegaMenu && handleMouseEnter(menuType as "kitchen" | "bedroom")}
            onMouseLeave={handleMouseLeave}
          >
            {isMegaMenu ? (
              // Clickable trigger for mega menu items
              <button
                onClick={() => handleClick(menuType as "kitchen" | "bedroom")}
                className={cn(
                  "relative flex items-center gap-1 text-[14px] font-medium transition-colors duration-200 py-8 bg-transparent border-none cursor-pointer",
                  isActive || activeMenu === menuType
                    ? "text-lomash-primary"
                    : "text-lomash-dark hover:text-lomash-primary",
                  "after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-0 after:bg-lomash-primary after:transition-all after:duration-300",
                  (isActive || activeMenu === menuType) && "after:w-full",
                  "hover:after:w-full"
                )}
              >
                {link.label}
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    activeMenu === menuType && "rotate-180"
                  )}
                />
              </button>
            ) : (
              <Link
                href={link.href}
                className={cn(
                  "relative flex items-center gap-1 text-[14px] font-medium transition-colors duration-200 py-8",
                  isActive
                    ? "text-lomash-primary"
                    : "text-lomash-dark hover:text-lomash-primary",
                  "after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-0 after:bg-lomash-primary after:transition-all after:duration-300",
                  isActive && "after:w-full",
                  "hover:after:w-full"
                )}
              >
                {link.label}
              </Link>
            )}

            {/* Mega Menu */}
            {isMegaMenu && (
              <MegaMenu
                type={menuType as "kitchen" | "bedroom"}
                isOpen={activeMenu === menuType}
                onMouseEnter={() => handleMouseEnter(menuType as "kitchen" | "bedroom")}
                onMouseLeave={handleMouseLeave}
                onToggle={() => handleClick(menuType as "kitchen" | "bedroom")}
              />
            )}
          </div>
        );
      })}
    </nav>
  );
}