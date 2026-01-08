"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { NavLink } from "@/types";

interface FooterLinksProps {
  title: string;
  links: readonly NavLink[];
  className?: string;
}

export function FooterLinks({ title, links, className }: FooterLinksProps) {
  return (
    <div className={cn("", className)}>
      <h4 className="text-lg font-semibold mb-4 text-white">{title}</h4>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-lomash-gray-300 hover:text-white transition-colors text-sm inline-block relative group"
            >
              {link.label}
              <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-lomash-accent transition-all duration-300 group-hover:w-full" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}