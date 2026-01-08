"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { mainNavigation, hamburgerMenuLinks } from "@/config/navigation";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:w-[400px] p-0">
        <SheetHeader className="p-6 pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-2xl font-bold text-lomash-primary">
              Lomash Wood
            </SheetTitle>
            <SheetClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-5 w-5" />
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {/* Main Navigation */}
          <nav className="flex-1 px-6 py-4">
            <div className="space-y-1">
              {mainNavigation.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className={cn(
                      "block px-4 py-3 rounded-lg text-base font-medium transition-colors",
                      isActive
                        ? "bg-lomash-primary text-white"
                        : "text-lomash-dark hover:bg-lomash-gray-100"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <Separator className="my-6" />

            {/* Hamburger Menu Links */}
            <div className="space-y-1">
              <p className="px-4 text-xs font-semibold text-lomash-gray-500 uppercase tracking-wider mb-2">
                More
              </p>
              {hamburgerMenuLinks.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className={cn(
                      "block px-4 py-3 rounded-lg text-base font-medium transition-colors",
                      isActive
                        ? "bg-lomash-primary text-white"
                        : "text-lomash-dark hover:bg-lomash-gray-100"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Bottom Actions */}
          <div className="p-6 border-t border-lomash-gray-200 space-y-3">
            <Link href="/book-appointment" onClick={onClose}>
              <Button size="lg" className="w-full font-semibold">
                Book Free Consultation
              </Button>
            </Link>
            <Link href="/my-account" onClick={onClose}>
              <Button
                size="lg"
                variant="outline"
                className="w-full font-semibold"
              >
                My Account
              </Button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}