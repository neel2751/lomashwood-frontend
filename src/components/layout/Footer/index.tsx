"use client";

import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
            <Image src="/logo.jpg" alt="Lomash Wood Logo" width={150} height={120} />
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
    TikTok: () => (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48" id="Tiktok--Streamline-Plump" height="24" width="24">
  <g id="tiktok">
    <path id="Union" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M17.0453 20.667C10.5636 21.1171 5 25.736 5 32.8154 5 39.5448 10.3929 45 17.0453 45c6.6524 0 12.0453 -5.4552 12.0453 -12.1846l-0.348 -15.19c3.0271 2.3352 7.8621 3.7477 12.3364 3.9734 0.8005 0.0404 1.5682 -0.3232 1.7552 -1.1026 0.0953 -0.3971 0.1658 -0.9137 0.1658 -1.573s-0.0705 -1.1759 -0.1658 -1.5729c-0.187 -0.7796 -0.9565 -1.118 -1.7542 -1.1978 -6.0495 -0.6056 -11.7467 -5.5 -12.5614 -11.27969 -0.1032 -0.73153 -0.513 -1.40612 -1.228 -1.59216C26.7222 3.13273 25.9644 3 25.0755 3c-0.89 0 -1.6485 0.13304 -2.2171 0.28116 -0.7139 0.18595 -1.1394 0.85621 -1.1564 1.59373l-0.6416 27.94051c0 2.2431 -1.7976 4.0615 -4.0151 4.0615 -2.2175 0 -4.0151 -1.8184 -4.0151 -4.0615 0 -2.332 1.949 -3.8331 4.0151 -4.2176" strokeWidth="3" />
  </g>
</svg>
    ),
    // Add more icons as needed
  };
  return icons[iconName] || Facebook;
}