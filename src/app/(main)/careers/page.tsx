
import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Clock, ArrowRight, Briefcase, Heart, Zap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Careers | Lomash Wood",
  description: "Join the Lomash Wood team. Explore open roles and build your career with us.",
};

const perks = [
  {
    icon: Heart,
    title: "People First",
    description: "We care about our team's wellbeing with flexible working and great benefits.",
  },
  {
    icon: Zap,
    title: "Fast Growth",
    description: "Clear progression paths and real opportunities to develop your skills.",
  },
  {
    icon: Users,
    title: "Great Team",
    description: "Work alongside passionate, talented people who love what they do.",
  },
  {
    icon: Briefcase,
    title: "Meaningful Work",
    description: "Help transform people's homes and make a real difference every day.",
  },
];

const jobs = [
  {
    id: "1",
    title: "Kitchen Designer",
    department: "Design",
    location: "London",
    type: "Full-time",
    description:
      "We're looking for a talented Kitchen Designer to join our growing design team. You'll work directly with clients to create bespoke kitchen designs that bring their vision to life.",
  },
  {
    id: "2",
    title: "Bedroom Designer",
    department: "Design",
    location: "Manchester",
    type: "Full-time",
    description:
      "Join our bedroom design team and help clients create their perfect bedroom spaces. Experience with CAD software and a passion for interior design are essential.",
  },
  {
    id: "3",
    title: "Installation Manager",
    department: "Operations",
    location: "Birmingham",
    type: "Full-time",
    description:
      "Oversee and manage our installation teams across the Midlands region. You'll ensure every project is delivered on time and to the highest standard.",
  },
  {
    id: "4",
    title: "Sales Consultant",
    department: "Sales",
    location: "Leeds",
    type: "Full-time",
    description:
      "As a Sales Consultant you'll be the first point of contact for our customers, guiding them through our product range and helping them find their perfect solution.",
  },
  {
    id: "5",
    title: "Marketing Executive",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
    description:
      "Drive our digital marketing strategy across social media, email, and paid channels. You'll help grow our brand and generate leads for our showrooms.",
  },
  {
    id: "6",
    title: "Showroom Assistant",
    department: "Retail",
    location: "Bristol",
    type: "Part-time",
    description:
      "Support our showroom team in delivering an outstanding customer experience. You'll greet visitors, assist with queries, and help maintain our beautiful showroom displays.",
  },
];

const departmentColors: Record<string, string> = {
  Design: "bg-blue-50 text-blue-700",
  Operations: "bg-orange-50 text-orange-700",
  Sales: "bg-green-50 text-green-700",
  Marketing: "bg-purple-50 text-purple-700",
  Retail: "bg-pink-50 text-pink-700",
};

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <section className="bg-lomash-dark py-20 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <div className="inline-block px-4 py-1.5 bg-lomash-primary/20 rounded-full mb-5">
            <span className="text-lomash-primary font-semibold text-sm">
              We're Hiring
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5">
            Build Your Career at Lomash Wood
          </h1>
          <p className="text-lg text-white/70 mb-8">
            Join a team that's passionate about great design, quality craftsmanship, and making customers happy.
          </p>
          <a href="#open-roles">
            <Button size="lg" className="bg-lomash-primary hover:bg-lomash-primary/90 text-white font-semibold px-8">
              See Open Roles
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </a>
        </div>
      </section>

      {/* Perks */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-lomash-dark mb-3">
              Why Work With Us
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              We believe great work comes from happy people. Here's what makes Lomash Wood a great place to work.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {perks.map((perk) => (
              <div
                key={perk.title}
                className="bg-gray-50 rounded-xl p-6 text-center border border-gray-100"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-lomash-primary/10 mb-4">
                  <perk.icon className="h-6 w-6 text-lomash-primary" />
                </div>
                <h3 className="font-bold text-lomash-dark mb-2">{perk.title}</h3>
                <p className="text-sm text-gray-500">{perk.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section id="open-roles" className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-lomash-dark mb-3">
              Open Positions
            </h2>
            <p className="text-gray-500">
              Find the role that's right for you and apply today.
            </p>
          </div>

          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 p-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    {/* Title & Badges */}
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold text-lomash-dark">
                        {job.title}
                      </h3>
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                          departmentColors[job.department] || "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {job.department}
                      </span>
                    </div>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{job.type}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {job.description}
                    </p>
                  </div>

                  {/* Apply Button */}
                  <div className="flex-shrink-0">
                    <Link href={`/careers/${job.id}`}>
                      <Button
                        size="sm"
                        className="bg-lomash-primary hover:bg-lomash-primary/90 text-white font-semibold group"
                      >
                        Apply Now
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Role Match */}
          <div className="mt-10 bg-white rounded-xl border border-gray-100 p-8 text-center">
            <h3 className="text-lg font-bold text-lomash-dark mb-2">
              Don't See the Right Role?
            </h3>
            <p className="text-sm text-gray-500 mb-5">
              We're always looking for great people. Send us your CV and we'll be in touch when something suitable comes up.
            </p>
            <a href="mailto:careers@lomashwood.co.uk">
              <Button variant="outline" size="lg" className="font-semibold">
                Send Your CV
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}