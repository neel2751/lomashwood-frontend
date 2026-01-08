"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FeatureCard } from "./FeatureCard";
import { WHY_CHOOSE_US_FEATURES } from "@/lib/constants";

export function WhyChooseUs() {
  return (
    <section className="section-padding bg-lomash-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block px-4 py-2 bg-lomash-primary/10 rounded-full mb-4">
            <span className="text-lomash-primary font-semibold text-sm">
              Why Choose Us
            </span>
          </div>

          <h2 className="heading-2 text-lomash-dark mb-4">
            Why Thousands Choose Lomash Wood
          </h2>

          <p className="text-lg text-lomash-gray-600 max-w-2xl mx-auto">
            We're committed to delivering exceptional quality, service, and value that exceeds your expectations
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {WHY_CHOOSE_US_FEATURES.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Link href="/why-choose-us">
            <Button size="xl" variant="outline" className="group">
              Discover More Benefits
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}