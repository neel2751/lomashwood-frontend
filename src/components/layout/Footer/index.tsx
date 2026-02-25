"use client";

import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import React from "react";

import { Separator } from "@/components/ui/separator";
import { footerNavigation, socialLinks } from "@/config/navigation";
import { siteConfig } from "@/config/site";

import { NewsletterForm } from "./NewsletterForm";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-lomash-dark text-white
     px-6 sm:px-10 lg:px-18
    pt-6 md:pt-8 lg:pt-10
      pb-6 md:pb-8 lg:pb-10
    ">
       <div className="border-b border-primary-foreground/10">
        <div className="mx-auto grid container grid-cols-1 gap-6 px-4 pb-4 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <span className="mb-1 text-lg font-semibold">Dedicated Designer</span>
            <span className="text-sm text-primary-foreground/70">
              Your expert, your guide, your go-to.
            </span>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="mb-1 text-lg font-semibold">Premium Quality</span>
            <span className="text-sm text-primary-foreground/70">
              High-quality materials and craftsmanship.
            </span>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="mb-1 text-lg font-semibold">10-Year Guarantee</span>
            <span className="text-sm text-primary-foreground/70">
              All cabinets are guaranteed for 10 years.
            </span>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="mb-1 text-lg font-semibold">Satisfaction Guaranteed</span>
            <span className="text-sm text-primary-foreground/70">
              We’re not happy until you’re happy.
            </span>
            </div>
        </div>
      </div>
      {/* Main Footer Content */}
      <div className="container-custom pt-10 pb-4">
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
      <div className="container-custom py-4">
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
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lomash-gray-400 hover:text-lomash-accent transition-colors"
                  aria-label={social.name}
                >
                  <Icon className="h-5 w-5" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}

function getIconComponent(iconName: string) {
  const icons: Record<string, any> = {
    Facebook,
    Instagram,
    Twitter,
    Linkedin,
  };
  return icons[iconName] || Facebook;
}