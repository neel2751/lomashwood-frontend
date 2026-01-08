"use client";

import React from "react";
import Link from "next/link";
import { CreditCard, Calculator, ShieldCheck, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const financeFeatures = [
  {
    icon: CreditCard,
    title: "Flexible Payment Plans",
    description: "Choose from various payment options that suit your budget",
  },
  {
    icon: Calculator,
    title: "Easy EMI Options",
    description: "Convert your purchase into affordable monthly installments",
  },
  {
    icon: ShieldCheck,
    title: "Quick Approval",
    description: "Get instant approval with minimal documentation",
  },
  {
    icon: Clock,
    title: "Extended Tenure",
    description: "Flexible repayment periods up to 48 months",
  },
];

export function FinanceSection() {
  return (
    <section className="section-padding bg-lomash-gray-50">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-block px-4 py-2 bg-lomash-primary/10 rounded-full mb-4">
              <span className="text-lomash-primary font-semibold text-sm">
                Finance Options
              </span>
            </div>

            <h2 className="heading-2 text-lomash-dark mb-4">
              Make Your Dream Kitchen or Bedroom Affordable
            </h2>

            <p className="text-lg text-lomash-gray-600 mb-6">
              Don't let budget constraints hold you back. We offer flexible finance options to help you create the home you've always wanted.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-lomash-primary/10 flex items-center justify-center shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-lomash-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-lomash-dark mb-1">
                    Interest rates from 0%
                  </h4>
                  <p className="text-sm text-lomash-gray-600">
                    Special promotional rates available on selected products
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-lomash-primary/10 flex items-center justify-center shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-lomash-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-lomash-dark mb-1">
                    No hidden charges
                  </h4>
                  <p className="text-sm text-lomash-gray-600">
                    Transparent pricing with no processing fees
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-lomash-primary/10 flex items-center justify-center shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-lomash-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-lomash-dark mb-1">
                    Quick & easy process
                  </h4>
                  <p className="text-sm text-lomash-gray-600">
                    Get approved in minutes with minimal paperwork
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link href="/finance">
                <Button size="xl" className="group">
                  Explore Finance Options
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>

              <Link href="/book-appointment">
                <Button size="xl" variant="outline">
                  Speak to an Advisor
                </Button>
              </Link>
            </div>
          </div>

          {/* Right - Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {financeFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-lomash-primary/10 flex items-center justify-center mb-4 group-hover:bg-lomash-primary transition-colors">
                      <Icon className="h-6 w-6 text-lomash-primary group-hover:text-white transition-colors" />
                    </div>
                    <h4 className="font-semibold text-lomash-dark mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-lomash-gray-600">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}