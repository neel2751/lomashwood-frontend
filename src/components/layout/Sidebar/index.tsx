"use client";

import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  side?: "left" | "right";
  className?: string;
}

export function Sidebar({
  isOpen,
  onClose,
  title,
  children,
  footer,
  side = "left",
  className,
}: SidebarProps) {
  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-40 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar Panel */}
      <aside
        className={cn(
          "fixed top-0 h-full w-full max-w-sm bg-background z-50 transform transition-transform duration-300 ease-in-out shadow-xl",
          side === "left" ? "left-0" : "right-0",
          isOpen
            ? "translate-x-0"
            : side === "left"
            ? "-translate-x-full"
            : "translate-x-full",
          className
        )}
        aria-label={title || "Sidebar"}
        role="complementary"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          {title && (
            <>
              <div className="flex items-center justify-between p-4">
                <h2 className="text-lg font-semibold">{title}</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  aria-label="Close sidebar"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <Separator />
            </>
          )}

          {!title && (
            <div className="flex items-center justify-end p-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                aria-label="Close sidebar"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Content */}
          <ScrollArea className="flex-1">
            <div className="p-4">{children}</div>
          </ScrollArea>

          {/* Footer */}
          {footer && (
            <>
              <Separator />
              <div className="p-4">{footer}</div>
            </>
          )}
        </div>
      </aside>
    </>
  );
}