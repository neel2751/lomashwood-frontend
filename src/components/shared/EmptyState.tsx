import React from "react";
import Link from "next/link";
import { LucideIcon, Search, ShoppingBag, Calendar, Heart, FileX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  className?: string;
}

export function EmptyState({
  icon: Icon = FileX,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 px-4 text-center",
        className
      )}
    >
      {/* Icon */}
      <div className="w-20 h-20 rounded-full bg-lomash-gray-100 flex items-center justify-center mb-6">
        <Icon className="h-10 w-10 text-lomash-gray-400" />
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold text-lomash-dark mb-2">{title}</h3>

      {/* Description */}
      {description && (
        <p className="text-lomash-gray-600 max-w-md mb-6">{description}</p>
      )}

      {/* Action Button */}
      {action && (
        <>
          {action.href ? (
            <Link href={action.href}>
              <Button size="lg">{action.label}</Button>
            </Link>
          ) : (
            <Button size="lg" onClick={action.onClick}>
              {action.label}
            </Button>
          )}
        </>
      )}
    </div>
  );
}

// Predefined Empty States

export function NoProductsFound() {
  return (
    <EmptyState
      icon={Search}
      title="No Products Found"
      description="We couldn't find any products matching your criteria. Try adjusting your filters or search terms."
      action={{
        label: "Clear Filters",
        onClick: () => window.location.reload(),
      }}
    />
  );
}

export function EmptyWishlist() {
  return (
    <EmptyState
      icon={Heart}
      title="Your Wishlist is Empty"
      description="Start adding products to your wishlist to keep track of your favorites."
      action={{
        label: "Browse Products",
        href: "/kitchen",
      }}
    />
  );
}

export function EmptyCart() {
  return (
    <EmptyState
      icon={ShoppingBag}
      title="Your Cart is Empty"
      description="Looks like you haven't added anything to your cart yet. Start shopping to fill it up!"
      action={{
        label: "Start Shopping",
        href: "/kitchen",
      }}
    />
  );
}

export function NoAppointments() {
  return (
    <EmptyState
      icon={Calendar}
      title="No Appointments Yet"
      description="You haven't booked any consultations yet. Schedule a free consultation with our design experts."
      action={{
        label: "Book Consultation",
        href: "/book-appointment",
      }}
    />
  );
}

export function NoSearchResults() {
  return (
    <EmptyState
      icon={Search}
      title="No Results Found"
      description="We couldn't find what you're looking for. Try a different search term or browse our collections."
      action={{
        label: "View All Products",
        href: "/kitchen",
      }}
    />
  );
}