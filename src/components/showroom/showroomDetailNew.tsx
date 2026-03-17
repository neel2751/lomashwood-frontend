"use client"

import Image from "next/image"
import Link from "next/link"
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ExternalLink,
  Dog,
  Lightbulb,
  CalendarCheck,
  Car,
  Wifi,
  ChefHat,
  BedDouble,
  Bath,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
// import { ShowroomCard } from "@/components/showroom-card"
import type { Showroom } from "@/types/showrooms.types"
import ShowroomCard from "./ShowroomCard"

const facilityIconMap: Record<string, React.ElementType> = {
  "Dog friendly": Dog,
  "Expert advice": Lightbulb,
  "Free design appointments": CalendarCheck,
  "Free parking": Car,
  "Free WiFi": Wifi,
  "Kitchens on display": ChefHat,
  "Bedrooms on display": BedDouble,
  "Toilets": Bath,
}

interface ShowroomDetailProps {
  showroom: Showroom
  nearbyStores?: Showroom[]
}

export function ShowroomDetail({ showroom, nearbyStores = [] }: ShowroomDetailProps) {
  const currentDayName = new Intl.DateTimeFormat("en-GB", { weekday: "long" }).format(new Date())

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-foreground">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80"
            alt={`${showroom.name} exterior`}
            fill
            className="object-cover opacity-25"
            priority
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-20 animate-in fade-in slide-in-from-bottom-3 duration-700">
          <nav className="mb-6 flex items-center gap-2 text-xs text-primary-foreground/60" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-primary-foreground">
              Home
            </Link>
            <span>/</span>
            <Link href="/find-a-showroom" className="hover:text-primary-foreground">
              Find a Showroom
            </Link>
            <span>/</span>
            <span className="text-primary-foreground">{showroom.city}</span>
          </nav>

          <h1 className="text-3xl font-bold text-primary-foreground lg:text-5xl">
            <span className="text-balance">Kitchen & Bedroom Showrooms {showroom.city}</span>
          </h1>

          <div className="mt-3 flex items-center gap-2 text-sm text-primary-foreground/80">
            <Clock className="h-4 w-4" />
            <span>
              Open today: <span className="font-semibold text-primary-foreground">{showroom.openToday}</span>
            </span>
          </div>
        </div>
      </section>

      {/* Contact + Opening Hours row */}
      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8 animate-in fade-in slide-in-from-bottom-3 duration-700">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Contact info */}
          <div className="lg:col-span-1">
            <div className="rounded-lg border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md">
              <h2 className="mb-5 text-lg font-semibold text-foreground">
                Contact Details
              </h2>

              <div className="flex flex-col gap-4">
                <div>
                  <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Telephone
                  </span>
                  <a
                    href={`tel:${showroom.phone}`}
                    className="flex items-center gap-2 text-sm font-medium text-lomash-primary hover:underline"
                  >
                    <Phone className="h-4 w-4" />
                    {showroom.phone}
                  </a>
                </div>

                <div>
                  <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Email
                  </span>
                  <a
                    href={`mailto:${showroom.email}`}
                    className="flex items-center gap-2 text-sm font-medium text-lomash-primary hover:underline"
                  >
                    <Mail className="h-4 w-4" />
                    {showroom.email}
                  </a>
                </div>

                <div>
                  <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Visit Us
                  </span>
                  <div className="flex items-start gap-2 text-sm text-foreground">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>
                      {showroom.address}
                      <br />
                      {showroom.postcode}
                    </span>
                  </div>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(showroom.address + " " + showroom.postcode)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-lomash-primary hover:underline"
                  >
                    Get directions
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>

              <Button className="mt-6 w-full bg-primary text-primary-foreground hover:bg-primary/90">
                Book a Free Appointment
              </Button>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="lg:col-span-2">
            <div className="rounded-lg border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md">
              <h2 className="mb-5 text-lg font-semibold text-foreground">
                Opening Hours
              </h2>
              <div className="divide-y divide-border">
                {showroom.openingHours.map((oh) => (
                  <div
                    key={oh.day}
                    className={`flex items-center justify-between rounded-md px-2 py-3 text-sm transition-colors ${
                      oh.day === currentDayName ? "bg-muted/70" : "hover:bg-muted/40"
                    }`}
                  >
                    <div>
                      <span className={`font-medium ${oh.day === currentDayName ? "text-primary" : "text-foreground"}`}>
                        {oh.day}
                      </span>
                      <span className="ml-2 text-muted-foreground">{oh.date}</span>
                    </div>
                    <span
                      className={
                        oh.hours === "Closed"
                          ? "font-medium text-destructive"
                          : "text-foreground"
                      }
                    >
                      {oh.hours}
                    </span>
                  </div>
                ))}
              </div>
              <Button className="mt-6 w-full bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto">
                Book a Free Appointment
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Store Facilities */}
      <section className="border-y border-border bg-lomash-secondary/30 animate-in fade-in slide-in-from-bottom-3 duration-700">
        <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-lomash-secondary">
            Welcome to us
          </h2>
          <h3 className="mb-8 text-3xl font-bold">
            Store Facilities
          </h3>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {showroom.facilities.map((facility) => {
              const Icon = facilityIconMap[facility] || Users
              return (
                <div
                  key={facility}
                  className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lomash-secondary">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-base font-medium text-foreground">{facility}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Kitchens on Display */}
      <section className="border-t border-border bg-lomash-secondary/30 animate-in fade-in slide-in-from-bottom-3 duration-700">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
          <h2 className="mb-2 text-3xl font-bold text-lomash-secondary">
            Kitchens on Display in {showroom.city}
          </h2>
          <p className="mb-8 text-sm text-lomash-secondary/90">
            Deviations may occur. Contact your local store to find out about colour and
            design options.
          </p>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {showroom.kitchensOnDisplay.map((kitchen) => (
              <div
                key={kitchen.name}
                className="group overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={kitchen.image}
                    alt={kitchen.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-3 left-3">
                    <span className="rounded-full bg-card/90 px-3 py-1 text-xs font-medium text-lomash-secondary backdrop-blur-sm">
                      {kitchen.style}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="text-xl font-semibold text-foreground">
                    {kitchen.name}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Design Services */}
      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8 animate-in fade-in slide-in-from-bottom-3 duration-700">
        <h2 className="mb-8 text-3xl font-bold text-foreground">
          Our Bespoke Design Service
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* In-store */}
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md">
            <h3 className="mb-4 text-lg font-semibold text-foreground">
              In-Store Design Appointment
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                Meet your dedicated designer
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                Receive a quote tailored to your style and budget
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                3D design to visualise your dream kitchen or bedroom
              </li>
            </ul>
          </div>

          {/* Virtual */}
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md">
            <h3 className="mb-4 text-lg font-semibold text-foreground">
              Virtual Design Appointment
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                Expert design advice from the comfort of your home
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                Receive a quote tailored to your style and budget
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                3D design to visualise your dream kitchen or bedroom
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-6 text-center">
          <Button className="bg-lomash-primary text-base hover:bg-lomash-secondary">
            Book a Free Appointment
          </Button>
        </div>
      </section>

      {/* Consultation CTA with image */}
      <section className="border-y border-border bg-foreground animate-in fade-in slide-in-from-bottom-3 duration-700">
        <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
          <div className="relative hidden lg:block">
            <Image
              src="/images/design-consultation.jpg"
              alt="Kitchen design consultation"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center px-4 py-12 lg:px-12 lg:py-16">
            <h2 className="text-2xl font-bold text-primary-foreground lg:text-3xl">
              Ready to Start Your Project?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-primary-foreground/80">
              Book your free design consultation today. Our expert designers will help
              you create the kitchen or bedroom of your dreams with a personalised 3D
              design plan tailored to your style and budget.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button className="bg-lomash-primary text-base hover:bg-lomash-secondary">
                Book Free Appointment
              </Button>
              <Button
                variant="outline"
                className="text-base hover:bg-lomash-secondary/10"
              >
                Call Us Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Stores */}
      {nearbyStores.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8 animate-in fade-in slide-in-from-bottom-3 duration-700">
          <h2 className="mb-6 text-3xl font-bold text-foreground">
            Other Stores Nearby
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {nearbyStores.map((store) => (
              <ShowroomCard key={store.slug} showroom={store} />
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link
              href="/find-a-showroom"
              className="inline-flex items-center text-sm font-medium text-accent hover:underline"
            >
              See all stores
              <ExternalLink className="ml-1 h-3 w-3" />
            </Link>
          </div>
        </section>
      )}
    </div>
  )
}
