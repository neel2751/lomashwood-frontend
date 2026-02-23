"use client";

import {
  User,
  LogOut,
  Settings,
  Heart,
  Calendar,
  Package,
  Palette,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

interface UserMenuProps {
  className?: string;
}

export function UserMenu({ className }: UserMenuProps) {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (!isAuthenticated) {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <Button variant="ghost" asChild>
          <Link href="/login">Login</Link>
        </Button>
        <Button asChild>
          <Link href="/register">Sign Up</Link>
        </Button>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "flex items-center gap-2 px-2 hover:bg-accent",
            className
          )}
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
              {getInitials(user?.name)}
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:flex flex-col items-start">
            <span className="text-sm font-medium leading-none">
              {user?.name || "User"}
            </span>
            <span className="text-xs text-muted-foreground">My Account</span>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground hidden md:block" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link
              href="/my-account"
              className="flex items-center cursor-pointer"
            >
              <User className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link
              href="/my-account/appointments"
              className="flex items-center cursor-pointer"
            >
              <Calendar className="mr-2 h-4 w-4" />
              <span>Appointments</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link
              href="/my-account/orders"
              className="flex items-center cursor-pointer"
            >
              <Package className="mr-2 h-4 w-4" />
              <span>Orders</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link
              href="/my-account/wishlist"
              className="flex items-center cursor-pointer"
            >
              <Heart className="mr-2 h-4 w-4" />
              <span>Wishlist</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link
              href="/my-account/saved-designs"
              className="flex items-center cursor-pointer"
            >
              <Palette className="mr-2 h-4 w-4" />
              <span>Saved Designs</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link
            href="/my-account/settings"
            className="flex items-center cursor-pointer"
          >
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="flex items-center cursor-pointer text-destructive focus:text-destructive"
          onClick={handleLogout}
          disabled={isLoggingOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>{isLoggingOut ? "Logging out..." : "Log out"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}