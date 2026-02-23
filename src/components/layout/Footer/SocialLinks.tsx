"use client";

import { Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";

import { Button } from "@/components/ui/button";

interface SocialLink {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  ariaLabel: string;
}

const socialLinks: SocialLink[] = [
  {
    name: "Facebook",
    href: "https://facebook.com/lomashwood",
    icon: Facebook,
    ariaLabel: "Follow us on Facebook",
  },
  {
    name: "Instagram",
    href: "https://instagram.com/lomashwood",
    icon: Instagram,
    ariaLabel: "Follow us on Instagram",
  },
  {
    name: "Twitter",
    href: "https://twitter.com/lomashwood",
    icon: Twitter,
    ariaLabel: "Follow us on Twitter",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/lomashwood",
    icon: Linkedin,
    ariaLabel: "Follow us on LinkedIn",
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@lomashwood",
    icon: Youtube,
    ariaLabel: "Subscribe to our YouTube channel",
  },
];

export function SocialLinks() {
  return (
    <div className="flex items-center gap-2">
      {socialLinks.map((social) => {
        const Icon = social.icon;
        return (
          <Button
            key={social.name}
            variant="outline"
            size="icon"
            className="h-9 w-9 rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
            asChild
          >
            
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.ariaLabel}
              <Icon className="h-4 w-4" />
          </Button>
        );
      })}
    </div>
  );
}