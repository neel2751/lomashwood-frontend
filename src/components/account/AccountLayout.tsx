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
  Menu,
  ChevronRight,
  Home,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";


interface AccountLayoutProps {
  children: React.ReactNode;
  user?: {
    name: string;
    email: string;
    avatar?: string;
    memberSince?: string;
  };
  notifications?: number;
  onLogout?: () => void;
  className?: string;
}

const navigationItems = [
  {
    id: "overview",
    label: "Dashboard",
    icon: Home,
    href: "/account",
    badge: null,
  },
  {
    id: "profile",
    label: "Profile",
    icon: User,
    href: "/account/profile",
    badge: null,
  },
  {
    id: "orders",
    label: "My Orders",
    icon: ShoppingBag,
    href: "/account/orders",
    badge: null,
  },
  {
    id: "wishlist",
    label: "Wishlist",
    icon: Heart,
    href: "/account/wishlist",
    badge: null,
  },
  {
    id: "addresses",
    label: "Addresses",
    icon: MapPin,
    href: "/account/addresses",
    badge: null,
  },
  {
    id: "payments",
    label: "Payment Methods",
    icon: CreditCard,
    href: "/account/payments",
    badge: null,
  },
  {
    id: "quotes",
    label: "My Quotes",
    icon: FileText,
    href: "/account/quotes",
    badge: null,
  },
  {
    id: "appointments",
    label: "Appointments",
    icon: MessageSquare,
    href: "/account/appointments",
    badge: null,
  },
  {
    id: "offers",
    label: "My Offers",
    icon: Tag,
    href: "/account/offers",
    badge: null,
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
    badge: null,
  },
];

export default function AccountLayout({
  children,
  user = {
    name: "John Doe",
    email: "john.doe@example.com",
    memberSince: "January 2024",
  },
  notifications = 0,
  onLogout,
  className,
}: AccountLayoutProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const isActive = (href: string) => {
    if (href === "/account") {
      return pathname === href;
    }
    return pathname?.startsWith(href);
  };

  const Sidebar = ({ mobile = false }) => (
    <div className="space-y-6">
      {/* User Info */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-lg">{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold truncate">{user.name}</h3>
              <p className="text-sm text-muted-foreground truncate">{user.email}</p>
              {user.memberSince && (
                <p className="text-xs text-muted-foreground mt-1">
                  Member since {user.memberSince}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <nav className="space-y-1">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          const showBadge = item.badge === "new" && notifications > 0;

          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => mobile && setIsMobileMenuOpen(false)}
              className={cn(
                "flex items-center justify-between px-4 py-3 rounded-lg transition-colors group",
                active
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent text-muted-foreground hover:text-foreground"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon className={cn("h-5 w-5", active && "text-primary-foreground")} />
                <span className="font-medium">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                {showBadge && (
                  <Badge variant="destructive" className="h-5 min-w-5 px-1.5">
                    {notifications}
                  </Badge>
                )}
                <ChevronRight
                  className={cn(
                    "h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity",
                    active && "opacity-100"
                  )}
                />
              </div>
            </Link>
          );
        })}
      </nav>

      <Separator />

      {/* Logout */}
      <Button
        variant="ghost"
        className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
        onClick={() => {
          onLogout?.();
          mobile && setIsMobileMenuOpen(false);
        }}
      >
        <LogOut className="mr-3 h-5 w-5" />
        Logout
      </Button>
    </div>
  );

  return (
    <div className={cn("min-h-screen bg-muted/30", className)}>
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Mobile Menu + Title */}
            <div className="flex items-center gap-4">
              {/* Mobile Menu Toggle */}
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 p-6">
                  <SheetHeader className="mb-6">
                    <SheetTitle>My Account</SheetTitle>
                  </SheetHeader>
                  <Sidebar mobile />
                </SheetContent>
              </Sheet>

              {/* Title */}
              <div>
                <h1 className="text-xl md:text-2xl font-bold">My Account</h1>
                <p className="text-sm text-muted-foreground hidden sm:block">
                  Manage your account and preferences
                </p>
              </div>
            </div>

            {/* Right: User Menu */}
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <Link href="/account/notifications">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {notifications > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-1 -right-1 h-5 min-w-5 px-1 text-xs"
                    >
                      {notifications > 9 ? "9+" : notifications}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* User Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2 hidden sm:flex">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="text-xs">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="space-y-1">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/account/profile">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onLogout} className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24">
              <Sidebar />
            </div>
          </aside>

          {/* Content Area */}
          <main className="lg:col-span-3">
            <div className="space-y-6">{children}</div>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 border-t bg-background">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© 2024 Lomash Wood. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="/help" className="hover:text-foreground transition-colors">
                Help Center
              </Link>
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function AccountBreadcrumb({
  items,
  className,
}: {
  items: Array<{ label: string; href?: string }>;
  className?: string;
}) {
  return (
    <nav className={cn("flex items-center gap-2 text-sm", className)}>
      <Link
        href="/account"
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        Account
      </Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          {item.href ? (
            <Link
              href={item.href}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}

export function AccountPageHeader({
  title,
  description,
  actions,
  className,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1 flex-1">
          <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      <Separator />
    </div>
  );
}