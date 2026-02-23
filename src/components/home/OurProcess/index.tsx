"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import { PROCESS_STEPS } from "@/lib/constants";

import { ProcessStep } from "./ProcessStep";

export function OurProcess() {
  return (
    <section className="section-padding bg-white
    px-6 sm:px-10 lg:px-18
    pt-12 md:pt-16 lg:pt-20
    pb-16 md:pb-20 lg:pb-24
    ">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block px-4 py-2 bg-lomash-primary/10 rounded-full mb-4">
            <span className="text-lomash-primary font-semibold text-sm">
              How It Works
            </span>
          </div>

          <h2 className="heading-2 text-lomash-dark mb-4">
            Our Process
          </h2>

          <p className="text-lg text-lomash-gray-600 max-w-2xl mx-auto">
            From consultation to installation, we guide you through every step to create your dream kitchen or bedroom
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 mb-12">
          {PROCESS_STEPS.map((step) => (
            <React.Fragment key={step.step}>
              <ProcessStep step={step} />
              
              {/* Connector Arrow - Hidden on last item and mobile */}
              {/* {index < PROCESS_STEPS.length - 1 && (
                <div className="hidden lg:flex items-center justify-center -mx-3">
                  <ArrowRight className="h-8 w-8 text-lomash-primary/30" />
                </div>
              )} */}
            </React.Fragment>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link href="/our-process">
            <Button size="xl" className="group">
              Learn More About Our Process
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}