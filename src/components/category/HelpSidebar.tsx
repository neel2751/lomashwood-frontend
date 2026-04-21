"use client";

import {
  Phone,
  Mail,
  MessageCircle,
  Calendar,
  Download,
  MapPin,
  Clock,
  HelpCircle,
  ChevronRight,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface FAQ {
  question: string;
  answer: string;
}

interface HelpSidebarProps {
  className?: string;
}

export default function HelpSidebar({
  className,
}: HelpSidebarProps) {
  const faqs: FAQ[] = [
    {
      question: "How do I measure my space?",
      answer:
        "We recommend measuring the width, height, and depth of your space. Note any obstacles like windows, doors, or radiators. Our design team can help during your free consultation.",
    },
    {
      question: "What's included in the price?",
      answer:
        "Prices shown are estimates for units only. Final quotes include design, manufacturing, delivery, and professional installation. We'll provide a detailed breakdown during consultation.",
    },
    {
      question: "How long does delivery take?",
      answer:
        "Made-to-order items typically take 4-6 weeks for production, plus 2-3 working days for delivery. We'll keep you updated throughout the process.",
    },
    {
      question: "Do you offer finance options?",
      answer:
        "Yes! We offer flexible finance options with 0% APR available. Visit our Finance page or speak with our team to learn more about payment plans.",
    },
    {
      question: "Can I customize the design?",
      answer:
        "Absolutely! All our products can be customised in terms of size, color, finish, and configuration. Book a consultation to discuss your requirements.",
    },
  ];

  return (
    <div className={cn("space-y-4", className)}>
      {/* Quick Contact Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <HelpCircle className="h-5 w-5" />
            Need Help?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Book Consultation */}
          <div className="space-y-3">
            <div className="flex items-start gap-3 rounded-lg bg-primary/5 p-3">
              <Calendar className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">Free Consultation</p>
                <p className="text-xs text-muted-foreground">
                  Book a free design consultation with our experts
                </p>
              </div>
            </div>
            <Button className="w-full" asChild>
              <Link href="/book-appointment">
                <Calendar className="mr-2 h-4 w-4" />
                Book Now
              </Link>
            </Button>
          </div>

          <Separator />

          {/* Contact Options */}
          <div className="space-y-3">
            <p className="text-sm font-medium">Contact Us</p>

            <Button
              variant="outline"
              className="w-full justify-start"
              asChild
            >
              <Link href="tel:01708898755">
                <Phone className="mr-2 h-4 w-4" />
                Call: 01708 898 755
              </Link>
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start"
              asChild
            >
              <Link href="mailto:contact@lomashwood.com">
                <Mail className="mr-2 h-4 w-4" />
                Email Us
              </Link>
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start"
              asChild
            >
              <Link href="/contact">
                <MessageCircle className="mr-2 h-4 w-4" />
                Live Chat
              </Link>
            </Button>
          </div>

          <Separator />

          {/* Opening Hours */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Clock className="h-4 w-4" />
              Opening Hours
            </div>
            <div className="space-y-1 text-xs text-muted-foreground">
              <div className="flex justify-between">
                <span>Mon - Fri:</span>
                <span>9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday:</span>
                <span>10:00 AM - 5:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday:</span>
                <span>11:00 AM - 4:00 PM</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Showroom Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <MapPin className="h-5 w-5" />
            Visit Our Showroom
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            See our products in person and get expert advice from our design team.
          </p>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/showrooms">
              Find Showroom
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Download Brochure */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Download className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div className="flex-1">
                <p className="text-sm font-medium">Download Brochure</p>
                <p className="text-xs text-muted-foreground">
                  Get our latest catalog with designs and inspiration
                </p>
              </div>
            </div>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/brochure">Download PDF</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* FAQ Accordion */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Frequently Asked</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-sm hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <Button
            variant="link"
            className="mt-4 w-full"
            asChild
          >
            <Link href="/contact">
              View All FAQs
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Special Offers Badge */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="pt-6">
          <div className="space-y-3 text-center">
            <Badge variant="secondary" className="mb-2">
              Limited Time Offer
            </Badge>
            <p className="text-sm font-medium">
              Free Design Consultation
            </p>
            <p className="text-xs text-muted-foreground">
              Book now and get a complimentary 3D design visualization
            </p>
            <Button size="sm" className="w-full" asChild>
              <Link href="/book-appointment">Claim Offer</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}