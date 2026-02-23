"use client";

import { Grid3x3, LayoutList } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ViewMode = "grid" | "list";

interface ViewToggleProps {
  view?: ViewMode;
  onChange?: (view: ViewMode) => void;
  className?: string;
}

export default function ViewToggle({
  view = "grid",
  onChange = () => {},
  className,
}: ViewToggleProps) {
  return (
    <div
      className={cn("flex items-center gap-1 rounded-lg border p-1", className)}
      role="group"
      aria-label="View mode toggle"
    >
      <Button
        variant={view === "grid" ? "secondary" : "ghost"}
        size="sm"
        onClick={() => onChange("grid")}
        className={cn(
          "h-8 w-8 p-0 transition-colors",
          view === "grid" && "bg-secondary"
        )}
        aria-label="Grid view"
        aria-pressed={view === "grid"}
        title="Grid view"
      >
        <Grid3x3 className="h-4 w-4" />
      </Button>

      <Button
        variant={view === "list" ? "secondary" : "ghost"}
        size="sm"
        onClick={() => onChange("list")}
        className={cn(
          "h-8 w-8 p-0 transition-colors",
          view === "list" && "bg-secondary"
        )}
        aria-label="List view"
        aria-pressed={view === "list"}
        title="List view"
      >
        <LayoutList className="h-4 w-4" />
      </Button>
    </div>
  );
}