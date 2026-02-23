"use client";

import {
  User,
  ShoppingBag,
  Heart,
  MapPin,
  CreditCard,
  Settings,
  LogOut,
  Bell,
  FileText,
  MessageSquare,
  Tag,
  ChevronRight,
  Home,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href: string;
  badge?: string | number;
  children?: NavItem[];
}

interface AccountNavProps {
  items?: NavItem[];
  notifications?: number;
  onLogout?: () => void;
  variant?: "default" | "compact" | "horizontal";
  showLogout?: boolean;
  className?: string;
}

const defaultNavItems: NavItem[] = [
  {
    id: "overview",
    label: "Dashboard",
    icon: Home,
    href: "/account",
  },
  {
    id: "profile",
    label: "Profile",
    icon: User,
    href: "/account/profile",
  },
  {
    id: "orders",
    label: "My Orders",
    icon: ShoppingBag,
    href: "/account/orders",
    children: [
      { id: "all-orders", label: "All Orders", icon: ShoppingBag, href: "/account/orders" },
      { id: "pending", label: "Pending", icon: ShoppingBag, href: "/account/orders/pending" },
      { id: "completed", label: "Completed", icon: ShoppingBag, href: "/account/orders/completed" },
    ],
  },
  {
    id: "wishlist",
    label: "Wishlist",
    icon: Heart,
    href: "/account/wishlist",
  },
  {
    id: "addresses",
    label: "Addresses",
    icon: MapPin,
    href: "/account/addresses",
  },
  {
    id: "payments",
    label: "Payment Methods",
    icon: CreditCard,
    href: "/account/payments",
  },
  {
    id: "quotes",
    label: "My Quotes",
    icon: FileText,
    href: "/account/quotes",
  },
  {
    id: "appointments",
    label: "Appointments",
    icon: MessageSquare,
    href: "/account/appointments",
  },
  {
    id: "offers",
    label: "My Offers",
    icon: Tag,
    href: "/account/offers",
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
    href: "/account/notifications",
    badge: "new",
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    href: "/account/settings",
    children: [
      { id: "general", label: "General", icon: Settings, href: "/account/settings" },
      { id: "security", label: "Security", icon: Settings, href: "/account/settings/security" },
      { id: "privacy", label: "Privacy", icon: Settings, href: "/account/settings/privacy" },
    ],
  },
];

export default function AccountNav({
  items = defaultNavItems,
  notifications = 0,
  onLogout,
  variant = "default",
  showLogout = true,
  className = "",
}: AccountNavProps) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const isActive = (href: string) => {
    if (href === "/account") {
      return pathname === href;
    }
    return pathname?.startsWith(href);
  };

  const toggleExpanded = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const renderBadge = (item: NavItem) => {
    if (item.badge === "new" && notifications > 0) {
      return (
        <span className="inline-flex items-center justify-center h-5 min-w-5 px-1.5 bg-red-600 text-white text-xs font-medium rounded">
          {notifications > 9 ? "9+" : notifications}
        </span>
      );
    }
    if (typeof item.badge === "number" && item.badge > 0) {
      return (
        <span className="inline-flex items-center justify-center h-5 min-w-5 px-1.5 bg-gray-100 text-gray-700 text-xs font-medium rounded">
          {item.badge > 99 ? "99+" : item.badge}
        </span>
      );
    }
    if (typeof item.badge === "string" && item.badge !== "new") {
      return (
        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
          {item.badge}
        </span>
      );
    }
    return null;
  };

  const renderNavItem = (item: NavItem, level: number = 0) => {
    const Icon = item.icon;
    const active = isActive(item.href);
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.id);

    if (hasChildren) {
      return (
        <div key={item.id}>
          <button
            onClick={() => toggleExpanded(item.id)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors group ${
              level > 0 ? "pl-12" : ""
            } ${
              active
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
            }`}
          >
            <div className="flex items-center gap-3">
              <Icon className={`h-5 w-5 ${active ? "text-white" : ""}`} />
              <span className="font-medium">{item.label}</span>
            </div>
            <div className="flex items-center gap-2">
              {renderBadge(item)}
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  isExpanded || active ? "rotate-180" : ""
                }`}
              />
            </div>
          </button>
          {(isExpanded || active) && (
            <div className="space-y-1 mt-1">
              {item.children!.map((child) => renderNavItem(child, level + 1))}
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        key={item.id}
        href={item.href}
        className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors group ${
          level > 0 ? "pl-12" : ""
        } ${
          active
            ? "bg-blue-600 text-white"
            : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
        }`}
      >
        <div className="flex items-center gap-3">
          <Icon className={`h-5 w-5 ${active ? "text-white" : ""}`} />
          <span className="font-medium">{item.label}</span>
        </div>
        <div className="flex items-center gap-2">
          {renderBadge(item)}
          <ChevronRight
            className={`h-4 w-4 transition-opacity ${
              active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            }`}
          />
        </div>
      </Link>
    );
  };

  if (variant === "horizontal") {
    return (
      <nav className={`border-b bg-white ${className}`}>
        <div className="w-full overflow-x-auto">
          <div className="flex items-center gap-2 p-2 min-w-max">
            {items.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                    active
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                  {renderBadge(item)}
                </Link>
              );
            })}
            {showLogout && onLogout && (
              <>
                <div className="h-8 w-px bg-gray-200 mx-2" />
                <button
                  onClick={onLogout}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    );
  }

  if (variant === "compact") {
    return (
      <nav className={`space-y-0.5 ${className}`}>
        {items.map((item) => renderNavItem(item))}
        {showLogout && onLogout && (
          <>
            <div className="border-t border-gray-200 my-2" />
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </>
        )}
      </nav>
    );
  }

  return (
    <nav className={`space-y-1 ${className}`}>
      {items.map((item) => renderNavItem(item))}
      {showLogout && onLogout && (
        <>
          <div className="border-t border-gray-200 my-4" />
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </>
      )}
    </nav>
  );
}

export function AccountNavItem({
  item,
  active,
  onClick,
  className = "",
}: {
  item: NavItem;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  const Icon = item.icon;

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors group ${
        active
          ? "bg-blue-600 text-white"
          : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
      } ${className}`}
    >
      <div className="flex items-center gap-3">
        <Icon className={`h-5 w-5 ${active ? "text-white" : ""}`} />
        <span className="font-medium">{item.label}</span>
      </div>
      {item.badge && (
        <span
          className={`px-2 py-1 text-xs font-medium rounded ${
            active ? "bg-white text-blue-600" : "bg-gray-100 text-gray-700"
          }`}
        >
          {item.badge}
        </span>
      )}
    </button>
  );
}

export function AccountBottomNav({
  items,
  className = "",
}: {
  items: NavItem[];
  className?: string;
}) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/account") {
      return pathname === href;
    }
    return pathname?.startsWith(href);
  };

  return (
    <nav className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 ${className}`}>
      <div className="flex items-center justify-around py-2">
        {items.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors min-w-0 ${
                active ? "text-blue-600" : "text-gray-600"
              }`}
            >
              <div className="relative">
                <Icon className="h-5 w-5" />
                {item.badge && (
                  <span className="absolute -top-2 -right-2 inline-flex items-center justify-center h-4 min-w-4 px-1 bg-red-600 text-white text-xs font-medium rounded">
                    {typeof item.badge === "number" && item.badge > 9
                      ? "9+"
                      : item.badge}
                  </span>
                )}
              </div>
              <span className="text-xs font-medium truncate max-w-full">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function AccountQuickLinks({
  items,
  columns = 2,
  className = "",
}: {
  items: NavItem[];
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/account") {
      return pathname === href;
    }
    return pathname?.startsWith(href);
  };

  const gridCols =
    columns === 1
      ? "grid-cols-1"
      : columns === 2
      ? "grid-cols-2"
      : columns === 3
      ? "grid-cols-3"
      : "grid-cols-4";

  return (
    <div className={`grid gap-4 ${gridCols} ${className}`}>
      {items.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.href);

        return (
          <Link
            key={item.id}
            href={item.href}
            className={`p-4 rounded-lg border-2 transition-all hover:shadow-md group ${
              active
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200 hover:border-blue-400"
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`p-2 rounded-lg ${
                  active ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
                }`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3
                  className={`font-semibold mb-1 ${
                    active ? "text-blue-600" : "text-gray-900"
                  }`}
                >
                  {item.label}
                </h3>
                {item.badge && (
                  <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded mt-1">
                    {item.badge}
                  </span>
                )}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}