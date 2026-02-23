import { 
  Briefcase,
  Building2,
  Users,
  TrendingUp,
  Award,
  Handshake,
  Package,
  CheckCircle2,
  Star,
  Target,
  Clock,
  Sparkles,
  Layers,
  FileText,
  Phone,
  Mail,
  Calendar,
  ArrowRight,
  Home,
  Hotel,
  ShoppingBag,
  GraduationCap,
  Heart,
  Settings,
  ThumbsUp,
  Truck,
  BadgeCheck,
  Percent
} from 'lucide-react';
import type { Metadata } from 'next';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
  title: 'Business & Trade | Lomash Wood',
  description: 'Partner with Lomash Wood for commercial furniture projects, bulk orders, and trade partnerships. Special pricing and dedicated support for businesses.',
};

export default function BusinessPage() {
  const businessSectors = [
    {
      icon: Hotel,
      title: 'Hospitality',
      description: 'Hotels, resorts, restaurants, and cafes',
      examples: ['Hotel room furniture', 'Restaurant dining sets', 'Lobby seating', 'Bar counters'],
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
    {
      icon: Building2,
      title: 'Corporate Offices',
      description: 'Office spaces, coworking, and corporate environments',
      examples: ['Executive desks', 'Conference tables', 'Reception furniture', 'Breakroom seating'],
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
    },
    {
      icon: ShoppingBag,
      title: 'Retail & Showrooms',
      description: 'Retail stores, boutiques, and display spaces',
      examples: ['Display units', 'Counter desks', 'Shelving systems', 'Fitting room benches'],
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200',
    },
    {
      icon: GraduationCap,
      title: 'Education',
      description: 'Schools, universities, libraries, and learning centers',
      examples: ['Classroom furniture', 'Library tables', 'Study carrels', 'Administrative desks'],
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
    },
    {
      icon: Heart,
      title: 'Healthcare',
      description: 'Hospitals, clinics, and wellness centers',
      examples: ['Waiting room seating', 'Reception desks', 'Staff lounges', 'Consultation rooms'],
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
    },
    {
      icon: Home,
      title: 'Real Estate & Developers',
      description: 'Model homes, apartments, and staged properties',
      examples: ['Furnished apartments', 'Show homes', 'Common areas', 'Clubhouse furniture'],
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
    },
  ];

  const businessBenefits = [
    {
      icon: Percent,
      title: 'Volume Discounts',
      description: 'Competitive pricing for bulk orders with tiered discounts based on order value.',
      stats: 'Up to 35% off',
    },
    {
      icon: Clock,
      title: 'Priority Production',
      description: 'Fast-track your commercial projects with dedicated production scheduling.',
      stats: '20% faster turnaround',
    },
    {
      icon: Users,
      title: 'Dedicated Account Manager',
      description: 'Single point of contact for all your business needs and ongoing support.',
      stats: '24/7 support available',
    },
    {
      icon: Truck,
      title: 'Nationwide Delivery',
      description: 'Professional installation and delivery services across India with white-glove service.',
      stats: 'Pan-India coverage',
    },
    {
      icon: FileText,
      title: 'Custom CAD Drawings',
      description: 'Detailed technical drawings and 3D renderings for your approval and planning.',
      stats: 'Free with projects',
    },
    {
      icon: BadgeCheck,
      title: 'Extended Warranty',
      description: 'Commercial-grade warranty covering high-traffic use and intensive applications.',
      stats: '5-year guarantee',
    },
  ];

  const serviceOfferings = [
    {
      title: 'Complete Fit-Outs',
      description: 'Full-service furniture solutions from design to installation for entire spaces.',
      features: [
        'Space planning and layout design',
        'Custom furniture manufacturing',
        'Professional installation teams',
        'Project management and coordination',
      ],
    },
    {
      title: 'Trade Partnership Program',
      description: 'Join our network of interior designers, architects, and contractors.',
      features: [
        'Trade pricing on all products',
        'Priority production scheduling',
        'Marketing support and materials',
        'Commission on client referrals',
      ],
    },
    {
      title: 'Contract Manufacturing',
      description: 'White-label manufacturing for furniture retailers and distributors.',
      features: [
        'Custom designs to your specifications',
        'Consistent quality and standards',
        'Flexible MOQ requirements',
        'Confidentiality agreements available',
      ],
    },
    {
      title: 'Maintenance & Refinishing',
      description: 'Ongoing care programs for commercial furniture fleets.',
      features: [
        'Scheduled maintenance visits',
        'Refinishing and restoration services',
        'Repair and replacement parts',
        'Annual inspection programs',
      ],
    },
  ];

  const projectProcess = [
    {
      step: 1,
      title: 'Consultation & Briefing',
      description: 'Discuss your project requirements, timeline, and budget',
      icon: Phone,
    },
    {
      step: 2,
      title: 'Site Survey',
      description: 'Visit your location to take measurements and assess requirements',
      icon: Building2,
    },
    {
      step: 3,
      title: 'Proposal & Quote',
      description: 'Detailed proposal with drawings, specifications, and pricing',
      icon: FileText,
    },
    {
      step: 4,
      title: 'Design Approval',
      description: 'Refine designs and finalize all details before production',
      icon: CheckCircle2,
    },
    {
      step: 5,
      title: 'Manufacturing',
      description: 'Dedicated production with regular progress updates',
      icon: Settings,
    },
    {
      step: 6,
      title: 'Delivery & Installation',
      description: 'Professional delivery and on-site installation',
      icon: Truck,
    },
  ];

  const caseStudies = [
    {
      client: 'The Grand Palace Hotel',
      sector: 'Hospitality',
      scope: '120 guest rooms + lobby furniture',
      value: '₹45 lakhs',
      testimonial: 'Exceptional craftsmanship and professionalism throughout the project.',
    },
    {
      client: 'TechCorp Solutions',
      sector: 'Corporate Office',
      scope: '15,000 sq ft office complete fit-out',
      value: '₹32 lakhs',
      testimonial: 'Met our tight deadline without compromising on quality.',
    },
    {
      client: 'Riverside Residences',
      sector: 'Real Estate',
      scope: '25 model apartments furnished',
      value: '₹58 lakhs',
      testimonial: 'The furniture elevated our show homes significantly.',
    },
  ];

  const stats = {
    projectsCompleted: '250+',
    corporateClients: '85+',
    satisfaction: '98%',
    repeatBusiness: '72%',
  };

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 border border-amber-200">
        <CardContent className="pt-12 pb-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <Briefcase className="w-10 h-10 text-amber-600" />
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
                Business & Trade Solutions
              </h1>
            </div>
            <p className="text-lg text-slate-700 mb-6">
              Partner with Lomash Wood for your commercial furniture projects. We deliver exceptional craftsmanship, competitive pricing, and dedicated support for businesses across India. From hospitality to corporate offices, we create furniture that enhances your space and delights your customers.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button className="bg-amber-600 hover:bg-amber-700">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Business Consultation
              </Button>
              <Button variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Download Business Brochure
              </Button>
            </div>
          </div>
        </CardContent>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Briefcase className="w-8 h-8 text-amber-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-slate-900">{stats.projectsCompleted}</p>
              <p className="text-sm text-slate-600">Projects Completed</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Building2 className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-slate-900">{stats.corporateClients}</p>
              <p className="text-sm text-slate-600">Corporate Clients</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <ThumbsUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-slate-900">{stats.satisfaction}</p>
              <p className="text-sm text-slate-600">Satisfaction Rate</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-slate-900">{stats.repeatBusiness}</p>
              <p className="text-sm text-slate-600">Repeat Business</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Business Sectors */}
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <Target className="w-6 h-6 text-amber-600" />
            Industries We Serve
          </h2>
          <p className="text-slate-600">
            Specialized furniture solutions for diverse commercial sectors
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {businessSectors.map((sector, index) => {
            const Icon = sector.icon;
            return (
              <Card key={index} className={`border-2 ${sector.borderColor} hover:shadow-lg transition-shadow`}>
                <CardContent className="pt-6">
                  <div className={`w-14 h-14 rounded-lg ${sector.bgColor} flex items-center justify-center mb-4`}>
                    <Icon className={`w-7 h-7 ${sector.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{sector.title}</h3>
                  <p className="text-sm text-slate-600 mb-3">{sector.description}</p>
                  <div className="space-y-1">
                    {sector.examples.map((example, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className={`w-4 h-4 ${sector.color} flex-shrink-0 mt-0.5`} />
                        <p className="text-sm text-slate-700">{example}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Business Benefits */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Sparkles className="w-6 h-6 text-amber-600" />
            Why Partner With Us
          </CardTitle>
          <CardDescription>
            Exclusive benefits for our business clients
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businessBenefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">{benefit.title}</h3>
                    <p className="text-sm text-slate-600 mb-2">{benefit.description}</p>
                    <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                      {benefit.stats}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Service Offerings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Package className="w-6 h-6 text-amber-600" />
            Our Business Services
          </CardTitle>
          <CardDescription>
            Comprehensive solutions tailored to your commercial needs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {serviceOfferings.map((service, index) => (
              <div key={index} className="p-6 rounded-lg border-2 border-slate-200 hover:border-amber-200 transition-colors">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
                <p className="text-slate-600 mb-4">{service.description}</p>
                <div className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-slate-700">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Project Process */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Layers className="w-6 h-6 text-amber-600" />
            Our Commercial Project Process
          </CardTitle>
          <CardDescription>
            Streamlined workflow from consultation to completion
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {projectProcess.map((phase, index) => {
              const Icon = phase.icon;
              return (
                <div key={index}>
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-amber-100 border-2 border-amber-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-amber-700">{phase.step}</span>
                      </div>
                      {index < projectProcess.length - 1 && (
                        <div className="w-0.5 h-full bg-amber-200 mt-2" />
                      )}
                    </div>

                    <div className="pb-8 flex-1">
                      <div className="flex items-start gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-amber-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-slate-900">{phase.title}</h3>
                          <p className="text-slate-600">{phase.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Case Studies */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Award className="w-6 h-6 text-blue-600" />
            Recent Success Stories
          </CardTitle>
          <CardDescription className="text-blue-800">
            Real projects from satisfied business clients
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {caseStudies.map((study, index) => (
              <div key={index} className="bg-white rounded-lg p-6 border border-blue-200">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                  ))}
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-1">{study.client}</h3>
                <p className="text-sm text-blue-600 font-semibold mb-3">{study.sector}</p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Scope:</span>
                    <span className="font-semibold text-slate-900">{study.scope}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Value:</span>
                    <span className="font-semibold text-slate-900">{study.value}</span>
                  </div>
                </div>
                <Separator className="my-3" />
                <p className="text-sm text-slate-700 italic">"{study.testimonial}"</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Trade Program CTA */}
      <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
        <CardContent className="pt-8 pb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                <Handshake className="w-8 h-8 text-purple-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Join Our Trade Program</h3>
                <p className="text-slate-600 mb-4">
                  Interior designers, architects, and contractors receive exclusive trade pricing, priority service, and marketing support. Build your business with our quality furniture.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Trade Pricing', 'Priority Production', 'Marketing Materials', 'Referral Commissions'].map((benefit, idx) => (
                    <span key={idx} className="text-xs px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-semibold">
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 flex-shrink-0">
              <ArrowRight className="w-5 h-5 mr-2" />
              Apply Now
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Contact CTA */}
      <Card className="bg-gradient-to-r from-amber-600 to-orange-600 text-white border-0">
        <CardContent className="pt-8 pb-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Commercial Project?</h2>
            <p className="text-amber-50 mb-6 text-lg">
              Let's discuss how we can furnish your commercial space with quality craftsmanship and exceptional service. Our business team is ready to help.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button size="lg" variant="secondary">
                <Phone className="w-5 h-5 mr-2" />
                Call Business Line
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                <Mail className="w-5 h-5 mr-2" />
                Email Business Team
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}