"use client";

import { X, ChevronRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import {
  mainNavigation,
  hamburgerMenuLinks,
  type MegaMenuColumn,
} from "@/config/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";

const COLOR_SWATCHES: Record<string, string> = {
  whites:  "#FFFFFF",
  blacks:  "#1A1A1A",
  greys:   "#9E9E9E",
  creams:  "#F5F0E8",
  blues:   "#90CAF9",
  greens:  "#81C784",
  oaks:    "#C8A96E",
};

function getColorSwatch(label: string): string | null {
  return COLOR_SWATCHES[label.toLowerCase()] ?? null;
}

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

type PanelLevel = "l1" | "l2" | "l3";

interface ActiveMenu {
  level: PanelLevel;
  l1Label?: string;  
  l1Href?: string;
  l2Column?: MegaMenuColumn;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();
  const [active, setActive] = useState<ActiveMenu>({ level: "l1" });

  const activeNavItem = mainNavigation.find((n) => n.label === active.l1Label);

  const goToL2 = (label: string, href: string) => {
    setActive({ level: "l2", l1Label: label, l1Href: href });
  };

  const goToL3 = (column: MegaMenuColumn) => {
    setActive((prev) => ({ ...prev, level: "l3", l2Column: column }));
  };

  const goBack = () => {
    setActive((prev) => {
      if (prev.level === "l3") return { ...prev, level: "l2" };
      return { level: "l1" };
    });
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => setActive({ level: "l1" }), 300);
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent side="right" className="w-full sm:w-[400px] p-0 overflow-hidden">

        <div
          className={cn(
            "absolute inset-0 flex flex-col transition-transform duration-300 ease-in-out",
            active.level === "l1" ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <SheetHeader className="p-6 pb-4">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-2xl font-bold text-lomash-primary">
                <Image src="/Logo.svg" alt="Lomash Wood Logo" width={120} height={100} />
              </SheetTitle>
              <SheetClose asChild>
                <Button variant="ghost" size="icon">
                  <X className="h-5 w-5" />
                </Button>
              </SheetClose>
            </div>
          </SheetHeader>

          <div className="flex flex-col flex-1 overflow-y-auto">
            <nav className="flex-1 px-6 py-4">
              <div className="space-y-1">
                {mainNavigation.map((link) => {
                  const isActive = pathname === link.href;
                  const hasSub = link.hasMegaMenu && link.megaMenu;

                  if (hasSub) {
                    return (
                      <button
                        key={link.href}
                        onClick={() => goToL2(link.label, link.href)}
                        className={cn(
                          "w-full flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium transition-colors",
                          isActive
                            ? "bg-lomash-primary text-white"
                            : "text-lomash-dark hover:bg-lomash-gray-100"
                        )}
                      >
                        {link.label}
                        <ChevronRight className="h-4 w-4 opacity-50" />
                      </button>
                    );
                  }

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={handleClose}
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
                      onClick={handleClose}
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

            <div className="p-6 border-t border-lomash-gray-200 space-y-3">
              <Link href="/book-appointment" onClick={handleClose}>
                <Button size="lg" className="w-full font-semibold">
                  Book Free Consultation
                </Button>
              </Link>
              <Link href="/my-account" onClick={handleClose}>
                <Button size="lg" variant="outline" className="w-full font-semibold">
                  My Account
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div
          className={cn(
            "absolute inset-0 flex flex-col bg-white transition-transform duration-300 ease-in-out",
            active.level === "l2" ? "translate-x-0" : "translate-x-full"
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-lomash-gray-200">
            <button
              onClick={goBack}
              className="flex items-center gap-1 text-sm font-medium text-lomash-dark hover:text-lomash-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
            <button
              onClick={handleClose}
              className="flex items-center gap-1 text-sm font-medium text-lomash-dark hover:text-lomash-primary transition-colors"
            >
              <X className="h-4 w-4" />
              Close
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4">
            {activeNavItem?.megaMenu?.columns.map((column) => (
              <div key={column.heading} className="mb-6">
                <p className="text-xs font-bold text-lomash-primary uppercase tracking-wider mb-3 px-2">
                  {column.heading}
                </p>

                <div className="space-y-1">
                  {column.links.map((link) => {
                    if (link.image) {
                      return (
                        <button
                          key={link.href}
                          onClick={() => goToL3(column)}
                          className="w-full flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-lomash-gray-100 transition-colors text-left"
                        >
                          <Image
                            src={link.image}
                            alt={link.label}
                            width={48}
                            height={48}
                            className="rounded-md object-cover flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-lomash-dark truncate">
                              {link.label}
                            </p>
                            {link.subtitle && (
                              <p className="text-xs text-lomash-gray-500 truncate">
                                {link.subtitle}
                              </p>
                            )}
                          </div>
                          <ChevronRight className="h-4 w-4 text-lomash-gray-400 flex-shrink-0" />
                        </button>
                      );
                    }

                    const swatch = getColorSwatch(link.label);
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={handleClose}
                        className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-lomash-gray-100 transition-colors"
                      >
                        {swatch ? (
                          <span
                            className="w-5 h-5 rounded-full flex-shrink-0 border border-lomash-gray-300"
                            style={{ backgroundColor: swatch }}
                          />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-lomash-primary flex-shrink-0" />
                        )}
                        <span className="text-sm font-medium text-lomash-dark">
                          {link.label}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}

            {activeNavItem?.megaMenu?.promos && (
              <div className="mt-4 space-y-3">
                {activeNavItem.megaMenu.promos.map((promo) => (
                  <Link
                    key={promo.href}
                    href={promo.href}
                    onClick={handleClose}
                    className={cn(
                      "flex items-center justify-between px-4 py-4 rounded-xl text-white",
                      promo.variant === "red" && "bg-red-600",
                      promo.variant === "blue" && "bg-blue-600",
                      promo.variant === "green" && "bg-lomash-primary"
                    )}
                  >
                    <div>
                      <p className="text-xs font-semibold uppercase opacity-80">
                        {promo.label}
                      </p>
                      <p className="text-xl font-bold">{promo.title}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 opacity-80" />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <div
          className={cn(
            "absolute inset-0 flex flex-col bg-white transition-transform duration-300 ease-in-out",
            active.level === "l3" ? "translate-x-0" : "translate-x-full"
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-lomash-gray-200">
            <button
              onClick={goBack}
              className="flex items-center gap-1 text-sm font-medium text-lomash-dark hover:text-lomash-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
            <button
              onClick={handleClose}
              className="flex items-center gap-1 text-sm font-medium text-lomash-dark hover:text-lomash-primary transition-colors"
            >
              <X className="h-4 w-4" />
              Close
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4">
            {active.l2Column && (
              <>
                <p className="text-xs font-bold text-lomash-primary uppercase tracking-wider mb-4 px-2">
                  {active.l2Column.heading}
                </p>

                <div className="space-y-2">
                  {active.l2Column.links.map((link) => {
                    const swatch = getColorSwatch(link.label);
                    return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={handleClose}
                      className="flex items-center gap-3 px-2 py-3 rounded-lg hover:bg-lomash-gray-100 transition-colors"
                    >
                      {link.image && (
                        <Image
                          src={link.image}
                          alt={link.label}
                          width={56}
                          height={56}
                          className="rounded-md object-cover flex-shrink-0"
                        />
                      )}
                      {!link.image && swatch && (
                        <span
                          className="w-6 h-6 rounded-full flex-shrink-0 border border-lomash-gray-300"
                          style={{ backgroundColor: swatch }}
                        />
                      )}
                      {!link.image && !swatch && (
                        <ChevronRight className="h-4 w-4 text-lomash-primary flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-lomash-dark">
                          {link.label}
                        </p>
                        {link.subtitle && (
                          <p className="text-xs text-lomash-gray-500">
                            {link.subtitle}
                          </p>
                        )}
                      </div>
                      <ChevronRight className="h-4 w-4 text-lomash-gray-400 flex-shrink-0" />
                    </Link>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>

      </SheetContent>
    </Sheet>
  );
}