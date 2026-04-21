"use client";

import { MapPin, Phone, Navigation, Filter, X } from "lucide-react";
import { useState, useMemo } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { Showroom } from "@/types/showrooms.types";

import ShowroomCard from "./ShowroomCard";
import Link from "next/link";




// export interface OpeningHour {
//   day: string
//   date: string
//   hours: string
// }
// export interface Showroom {
//   id: string;
//   name: string;
//   address: string;
//   city: string;
//   postcode: string;
//   phone: string;
//   email?: string;
//   image?: string;
//   coordinates?: {
//     lat: number;
//     lng: number;
//   };
//   openingHours: OpeningHour[];
//   features?: string[];
//   isOpen?: boolean;
//   distance?: number;
// }

interface ShowroomListProps {
  showrooms: Showroom[];
  isLoading?: boolean;
  onShowroomClick?: (showroom: Showroom) => void;
  showSearch?: boolean;
  showFilters?: boolean;
  viewMode?: "grid" | "list";
  className?: string;
}

// const sortOptions = [
//   { value: "name", label: "Name (A-Z)" },
//   { value: "distance", label: "Nearest First" },
//   { value: "city", label: "City (A-Z)" },
// ];

export default function ShowroomList({
  showrooms,
  isLoading = false,
  showSearch = true,
  showFilters = true,
  viewMode = "grid",
  className,
}: ShowroomListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState("All States");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [sortBy, setSortBy] = useState("name");
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  const cities = useMemo(() => {
    const uniqueCities = Array.from(new Set(showrooms.map((s) => s.city))).sort();
    return ["All Cities", ...uniqueCities];
  }, [showrooms]);

  const filteredShowrooms = useMemo(() => {
    let filtered = [...showrooms];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (showroom) =>
          showroom.name.toLowerCase().includes(query) ||
          showroom.city.toLowerCase().includes(query) ||
          showroom.address.toLowerCase().includes(query) ||
          showroom.postcode.includes(query)
      );
    }

    if (selectedCity !== "All Cities") {
      filtered = filtered.filter((showroom) => showroom.city === selectedCity);
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "distance":
          return (a.distance || Infinity) - (b.distance || Infinity);
        case "city":
          return a.city.localeCompare(b.city);
        default:
          return 0;
      }
    });

    return filtered;
  }, [showrooms, searchQuery, selectedCity, sortBy]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedState("All States");
    setSelectedCity("All Cities");
    setSortBy("name");
  };

  const showroomclick = (showroom: Showroom) => {
    // const queryParams = new URLSearchParams({
    //   name: showroom.name,
    //   city: showroom.city,
    //   postcode: showroom.postcode,
    // }).toString();

    window.location.href = `/showrooms/${showroom.slug}`;
  }

  const hasActiveFilters =
    searchQuery || selectedState !== "All States" || selectedCity !== "All Cities";

  return (
    <div className={cn("space-y-6", className)}>
      {/* Search and Filter Section */}
      {(showSearch || showFilters) && (
        <div className="space-y-4">
          {/* Search Bar */}
          {/* {showSearch && (
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by name, city, or pincode..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4"
              />
            </div>
          )} */}

          {/* Filters */}
          {showFilters && (
            <>
              {/* Mobile Filter Toggle */}
              <div className="flex items-center justify-between lg:hidden">
                <p className="text-sm text-muted-foreground">
                  {filteredShowrooms.length} showroom{filteredShowrooms.length !== 1 ? "s" : ""}{" "}
                  found
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilterPanel(!showFilterPanel)}
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                  {hasActiveFilters && (
                    <Badge variant="secondary" className="ml-2">
                      Active
                    </Badge>
                  )}
                </Button>
              </div>

              {/* Filter Panel */}
              <div
                className={cn(
                  "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
                  !showFilterPanel && "hidden lg:grid"
                )}
              >
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select> */}

                {hasActiveFilters && (
                  <Button
                    variant="outline"
                    onClick={handleClearFilters}
                    className="w-full"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Clear Filters
                  </Button>
                )}
              </div>
            </>
          )}

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {searchQuery && (
                <Badge variant="secondary" className="gap-1">
                  Search: {searchQuery}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => setSearchQuery("")}
                  />
                </Badge>
              )}
              {selectedState !== "All States" && (
                <Badge variant="secondary" className="gap-1">
                  State: {selectedState}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => setSelectedState("All States")}
                  />
                </Badge>
              )}
              {selectedCity !== "All Cities" && (
                <Badge variant="secondary" className="gap-1">
                  City: {selectedCity}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => setSelectedCity("All Cities")}
                  />
                </Badge>
              )}
            </div>
          )}
        </div>
      )}

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground hidden lg:block">
          {filteredShowrooms.length} showroom{filteredShowrooms.length !== 1 ? "s" : ""}{" "}
          found
        </p>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div
          className={cn(
            "grid gap-6",
            viewMode === "grid"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1"
          )}
        >
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="p-6">
              <Skeleton className="h-48 w-full mb-4" />
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </Card>
          ))}
        </div>
      )}

      {/* Showroom Grid/List */}
      {!isLoading && filteredShowrooms.length > 0 && (
        <div
          className={cn(
            "grid gap-6",
            viewMode === "grid"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1"
          )}
        >
          {filteredShowrooms.map((showroom) => (
            <ShowroomCard
              key={showroom.slug}
              showroom={showroom}
              onClick={() => showroomclick(showroom)}
              viewMode={viewMode}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredShowrooms.length === 0 && (
        <Card className="p-12">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-4 rounded-full bg-muted">
                <MapPin className="h-8 w-8 text-muted-foreground" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">No Showrooms Found</h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                {hasActiveFilters
                  ? "No showrooms match your search criteria. Try adjusting your filters."
                  : "There are no showrooms available at the moment."}
              </p>
            </div>
            {hasActiveFilters && (
              <Button onClick={handleClearFilters} variant="outline">
                Clear All Filters
              </Button>
            )}
          </div>
        </Card>
      )}

      {/* Help Section */}
      {!isLoading && filteredShowrooms.length > 0 && (
        <Card className="p-6 bg-primary/5 border-primary/20">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-shrink-0">
              <div className="p-3 rounded-full bg-primary/10">
                <Navigation className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="flex-1 space-y-1">
              <h3 className="font-semibold">Need Help Finding a Showroom?</h3>
              <p className="text-sm text-muted-foreground">
                Contact our customer service team and we'll help you locate the nearest
                showroom or arrange a home visit.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <Button variant="default" asChild>
                <Link href="tel:01708898755">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Us
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

export function ShowroomListSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="p-6">
            <Skeleton className="h-48 w-full mb-4" />
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3" />
          </Card>
        ))}
      </div>
    </div>
  );
}