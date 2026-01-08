"use client";

import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { footerNavigation, socialLinks } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { NewsletterForm } from "./NewsletterForm";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-lomash-dark text-white">
      {/* Main Footer Content */}
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <h3 className="text-2xl font-bold text-white">Lomash Wood</h3>
            </Link>
            <p className="text-lomash-gray-300 mb-6 max-w-sm">
              {siteConfig.description}
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-lomash-accent mt-0.5" />
                <div>
                  <p className="text-sm text-lomash-gray-300">Call us</p>
                  <a
                    href={`tel:${siteConfig.contact.phone}`}
                    className="text-white hover:text-lomash-accent transition-colors"
                  >
                    {siteConfig.contact.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-lomash-accent mt-0.5" />
                <div>
                  <p className="text-sm text-lomash-gray-300">Email us</p>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-white hover:text-lomash-accent transition-colors"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-lomash-accent mt-0.5" />
                <div>
                  <p className="text-sm text-lomash-gray-300">Visit us</p>
                  <p className="text-white">{siteConfig.contact.address}</p>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <NewsletterForm />
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerNavigation.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-lomash-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Products</h4>
            <ul className="space-y-2">
              {footerNavigation.products.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-lomash-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              {footerNavigation.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-lomash-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Separator className="bg-lomash-gray-700" />

      {/* Bottom Footer */}
      <div className="container-custom py-6">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          {/* Copyright */}
          <p className="text-sm text-lomash-gray-400">
            © {currentYear} Lomash Wood. All rights reserved.
          </p>

          {/* Legal Links */}
          <div className="flex items-center space-x-6">
            {footerNavigation.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-lomash-gray-400 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((social) => {
              const Icon = getIconComponent(social.icon);
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lomash-gray-400 hover:text-lomash-accent transition-colors"
                  aria-label={social.name}
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}

// Helper function to get icon component
function getIconComponent(iconName: string) {
  const icons: Record<string, any> = {
    Facebook,
    Instagram,
    Twitter,
    Linkedin,
  };
  return icons[iconName] || Facebook;
}