"use client";

import { Check, ChevronDown, X, Filter } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const Popover = ({

  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}) => {
  return <div className="relative">{children}</div>;
};

const PopoverTrigger = ({
  children,
}: {
  asChild?: boolean;
  children: React.ReactNode;
}) => <div>{children}</div>;

const PopoverContent = ({
  className,
  children,
}: {
  className?: string;
  align?: string;
  children: React.ReactNode;
}) => (
  <div
    className={cn(
      "absolute z-50 mt-2 w-full rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none",
      className
    )}
  >
    {children}
  </div>
);

const ScrollArea = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <div className={cn("overflow-x-auto", className)}>
    {children}
  </div>
);

export interface Category {
  id: string;
  name: string;
  slug: string;
  count?: number;
  color?: string;
  description?: string;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategories: string[];
  onCategoryChange: (categoryIds: string[]) => void;
  variant?: "default" | "compact" | "sidebar" | "pills";
  multiSelect?: boolean;
  showCount?: boolean;
  showAllOption?: boolean;
  className?: string;
}

export default function CategoryFilter({
  categories,
  selectedCategories,
  onCategoryChange,
  variant = "default",
  multiSelect = false,
  showCount = true,
  showAllOption = true,
  className,
}: CategoryFilterProps) {
  const [open, setOpen] = useState(false);

  const handleCategoryToggle = (categoryId: string) => {
    if (categoryId === "all") {
      onCategoryChange([]);
      setOpen(false);
      return;
    }

    if (multiSelect) {
      const newSelection = selectedCategories.includes(categoryId)
        ? selectedCategories.filter((id) => id !== categoryId)
        : [...selectedCategories, categoryId];
      onCategoryChange(newSelection);
    } else {
      onCategoryChange([categoryId]);
      setOpen(false);
    }
  };

  const handleClearAll = () => {
    onCategoryChange([]);
  };

  const isSelected = (categoryId: string) => {
    if (categoryId === "all") {
      return selectedCategories.length === 0;
    }
    return selectedCategories.includes(categoryId);
  };

  const getSelectedLabel = () => {
    if (selectedCategories.length === 0) {
      return "All Categories";
    }
    if (selectedCategories.length === 1) {
      const category = categories.find((c) => c.id === selectedCategories[0]);
      return category?.name || "Category";
    }
    return `${selectedCategories.length} categories`;
  };

  if (variant === "pills") {
    return (
      <div className={cn("space-y-3", className)}>
        <ScrollArea className="w-full">
          <div className="flex items-center gap-2 pb-2">
            {showAllOption && (
              <Button
                variant={selectedCategories.length === 0 ? "default" : "outline"}
                size="sm"
                onClick={() => handleClearAll()}
                className="flex-shrink-0"
              >
                All
                {showCount && (
                  <Badge variant="secondary" className="ml-2">
                    {categories.reduce((sum, cat) => sum + (cat.count || 0), 0)}
                  </Badge>
                )}
              </Button>
            )}
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={isSelected(category.id) ? "default" : "outline"}
                size="sm"
                onClick={() => handleCategoryToggle(category.id)}
                className="flex-shrink-0"
                style={
                  isSelected(category.id) && category.color
                    ? { backgroundColor: category.color }
                    : undefined
                }
              >
                {category.name}
                {showCount && category.count !== undefined && (
                  <Badge
                    variant={isSelected(category.id) ? "secondary" : "outline"}
                    className="ml-2"
                  >
                    {category.count}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>
    );
  }

  if (variant === "sidebar") {
    return (
      <div className={cn("space-y-4", className)}>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Categories</h3>
          {selectedCategories.length > 0 && (
            <Button variant="ghost" size="sm" onClick={handleClearAll}>
              <X className="h-3 w-3 mr-1" />
              Clear
            </Button>
          )}
        </div>

        <div className="space-y-2">
          {showAllOption && (
            <>
              <button
                onClick={() => handleClearAll()}
                className={cn(
                  "w-full flex items-center justify-between p-2 rounded-md hover:bg-accent transition-colors text-left",
                  selectedCategories.length === 0 && "bg-accent"
                )}
              >
                <span className="font-medium">All Categories</span>
                {showCount && (
                  <Badge variant="secondary">
                    {categories.reduce((sum, cat) => sum + (cat.count || 0), 0)}
                  </Badge>
                )}
              </button>
              <Separator />
            </>
          )}

          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryToggle(category.id)}
              className={cn(
                "w-full flex items-center justify-between p-2 rounded-md hover:bg-accent transition-colors text-left group",
                isSelected(category.id) && "bg-accent"
              )}
            >
              <div className="flex items-center gap-2 flex-1 min-w-0">
                {multiSelect && (
                  <div
                    className={cn(
                      "h-4 w-4 border-2 rounded flex items-center justify-center flex-shrink-0",
                      isSelected(category.id)
                        ? "bg-primary border-primary"
                        : "border-muted-foreground"
                    )}
                  >
                    {isSelected(category.id) && <Check className="h-3 w-3 text-primary-foreground" />}
                  </div>
                )}
                {category.color && (
                  <div
                    className="h-3 w-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: category.color }}
                  />
                )}
                <span className="font-medium truncate">{category.name}</span>
              </div>
              {showCount && category.count !== undefined && (
                <Badge variant="secondary" className="flex-shrink-0">
                  {category.count}
                </Badge>
              )}
            </button>
          ))}
        </div>

        {selectedCategories.length > 0 && (
          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground mb-2">Selected:</p>
            <div className="flex flex-wrap gap-1">
              {selectedCategories.map((categoryId) => {
                const category = categories.find((c) => c.id === categoryId);
                if (!category) return null;
                return (
                  <Badge
                    key={categoryId}
                    variant="secondary"
                    className="gap-1"
                    style={
                      category.color
                        ? {
                            backgroundColor: `${category.color}20`,
                            color: category.color,
                          }
                        : undefined
                    }
                  >
                    {category.name}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        handleCategoryToggle(categoryId);
                      }}
                    />
                  </Badge>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className={cn("gap-2", className)}>
            <Filter className="h-4 w-4" />
            {getSelectedLabel()}
            {selectedCategories.length > 0 && (
              <Badge variant="secondary">{selectedCategories.length}</Badge>
            )}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {showAllOption && (
            <>
              <DropdownMenuItem onClick={() => handleClearAll()}>
                <div className="flex items-center justify-between w-full">
                  <span>All Categories</span>
                  {selectedCategories.length === 0 && <Check className="h-4 w-4" />}
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}
          {categories.map((category) => (
            <DropdownMenuItem
              key={category.id}
              onClick={() => handleCategoryToggle(category.id)}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  {category.color && (
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                  )}
                  <span>{category.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  {showCount && category.count !== undefined && (
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  )}
                  {isSelected(category.id) && <Check className="h-4 w-4" />}
                </div>
              </div>
            </DropdownMenuItem>
          ))}
          {selectedCategories.length > 0 && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleClearAll}>
                <X className="h-4 w-4 mr-2" />
                Clear Selection
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className={cn("w-full justify-between", className)}
        >
          {getSelectedLabel()}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      {open && (
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput placeholder="Search categories..." />
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandList>
              <CommandGroup>
                {showAllOption && (
                  <CommandItem
                    value="all"
                    onSelect={() => handleCategoryToggle("all")}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedCategories.length === 0 ? "opacity-100" : "opacity-0"
                      )}
                    />
                    All Categories
                    {showCount && (
                      <Badge variant="secondary" className="ml-auto">
                        {categories.reduce((sum, cat) => sum + (cat.count || 0), 0)}
                      </Badge>
                    )}
                  </CommandItem>
                )}
                {categories.map((category) => (
                  <CommandItem
                    key={category.id}
                    value={category.name}
                    onSelect={() => handleCategoryToggle(category.id)}
                  >
                    {multiSelect ? (
                      <div
                        className={cn(
                          "mr-2 h-4 w-4 border-2 rounded flex items-center justify-center",
                          isSelected(category.id)
                            ? "bg-primary border-primary"
                            : "border-muted-foreground"
                        )}
                      >
                        {isSelected(category.id) && (
                          <Check className="h-3 w-3 text-primary-foreground" />
                        )}
                      </div>
                    ) : (
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          isSelected(category.id) ? "opacity-100" : "opacity-0"
                        )}
                      />
                    )}
                    {category.color && (
                      <div
                        className="mr-2 h-3 w-3 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                    )}
                    <span className="flex-1">{category.name}</span>
                    {showCount && category.count !== undefined && (
                      <Badge variant="secondary" className="ml-2">
                        {category.count}
                      </Badge>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            {multiSelect && selectedCategories.length > 0 && (
              <>
                <Separator />
                <div className="p-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearAll}
                    className="w-full justify-center"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Clear All ({selectedCategories.length})
                  </Button>
                </div>
              </>
            )}
          </Command>
        </PopoverContent>
      )}
    </Popover>
  );
}

export function CategoryBadges({
  categories,
  selectedCategories,
  onCategoryClick,
  className,
}: {
  categories: Category[];
  selectedCategories: string[];
  onCategoryClick?: (categoryId: string) => void;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {categories.map((category) => {
        const isSelected = selectedCategories.includes(category.id);
        return (
          <Badge
            key={category.id}
            variant={isSelected ? "default" : "outline"}
            className={cn(
              "cursor-pointer hover:opacity-80 transition-opacity",
              className
            )}
            style={
              isSelected && category.color
                ? { backgroundColor: category.color }
                : category.color
                ? {
                    borderColor: category.color,
                    color: category.color,
                  }
                : undefined
            }
            onClick={() => onCategoryClick?.(category.id)}
          >
            {category.name}
            {category.count !== undefined && (
              <span className="ml-1">({category.count})</span>
            )}
          </Badge>
        );
      })}
    </div>
  );
}

export function SelectedCategoryChips({
  categories,
  selectedCategories,
  onRemove,
  className,
}: {
  categories: Category[];
  selectedCategories: string[];
  onRemove: (categoryId: string) => void;
  className?: string;
}) {
  const selectedCats = categories.filter((c) => selectedCategories.includes(c.id));

  if (selectedCats.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {selectedCats.map((category) => (
        <Badge
          key={category.id}
          variant="secondary"
          className="gap-1"
          style={
            category.color
              ? {
                  backgroundColor: `${category.color}20`,
                  color: category.color,
                }
              : undefined
          }
        >
          {category.name}
          <X
            className="h-3 w-3 cursor-pointer hover:opacity-80"
            onClick={() => onRemove(category.id)}
          />
        </Badge>
      ))}
    </div>
  );
}