import { 
  Award,
  Heart,
  Users,
  Leaf,
  Hammer,
  Target,
  TrendingUp,
  MapPin,
  Clock,
  CheckCircle2,
  Star,
  Trophy,
  Sparkles,
  HandHeart,
  Trees,
  Recycle
} from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
  title: 'About Us | Lomash Wood',
  description: 'Learn about Lomash Wood\'s commitment to quality craftsmanship, sustainable practices, and bespoke furniture design since our founding.',
};

export default function AboutPage() {
  const milestones = [
    {
      year: '2010',
      title: 'Founded',
      description: 'Lomash Wood was established with a vision to create timeless furniture pieces',
    },
    {
      year: '2015',
      title: 'Workshop Expansion',
      description: 'Doubled our production capacity and welcomed skilled craftspeople to our team',
    },
    {
      year: '2018',
      title: 'Sustainability Initiative',
      description: 'Committed to 100% sustainable sourcing and carbon-neutral operations',
    },
    {
      year: '2020',
      title: 'Digital Transformation',
      description: 'Launched our online platform to serve customers nationwide',
    },
    {
      year: '2024',
      title: 'Award Recognition',
      description: 'Received the Craftsmanship Excellence Award for innovative design',
    },
  ];

  const values = [
    {
      icon: Award,
      title: 'Excellence in Craft',
      description: 'We pursue perfection in every joint, finish, and detail. Our craftspeople bring decades of experience to every piece.',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
    },
    {
      icon: Leaf,
      title: 'Sustainable Practices',
      description: 'Every piece of wood is responsibly sourced. We plant three trees for every one used in our furniture.',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: Heart,
      title: 'Customer First',
      description: 'Your vision guides our hands. We listen, collaborate, and create furniture that tells your story.',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      icon: Sparkles,
      title: 'Timeless Design',
      description: 'We create pieces that transcend trends, combining classic techniques with contemporary aesthetics.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  const team = [
    {
      name: 'Rajesh Patel',
      role: 'Master Craftsman & Founder',
      experience: '25+ years',
      specialty: 'Traditional Joinery',
    },
    {
      name: 'Priya Sharma',
      role: 'Design Director',
      experience: '15+ years',
      specialty: 'Contemporary Design',
    },
    {
      name: 'Amit Kumar',
      role: 'Head of Production',
      experience: '20+ years',
      specialty: 'Workshop Management',
    },
    {
      name: 'Neha Singh',
      role: 'Sustainability Officer',
      experience: '10+ years',
      specialty: 'Environmental Impact',
    },
  ];

  const achievements = [
    {
      icon: Trophy,
      stat: '5000+',
      label: 'Pieces Crafted',
    },
    {
      icon: Users,
      stat: '3500+',
      label: 'Happy Customers',
    },
    {
      icon: Trees,
      stat: '15000+',
      label: 'Trees Planted',
    },
    {
      icon: Star,
      stat: '4.9/5',
      label: 'Average Rating',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 border border-amber-200">
        <CardContent className="pt-12 pb-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Crafting Timeless Furniture for Modern Living
            </h1>
            <p className="text-lg text-slate-700 mb-6">
              For over a decade, Lomash Wood has been dedicated to creating exceptional furniture that combines traditional craftsmanship with contemporary design. Every piece tells a story of passion, precision, and purpose.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button className="bg-amber-600 hover:bg-amber-700" asChild>
                <Link href="/products">
                  Explore Our Work
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contact">
                  Get in Touch
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {achievements.map((achievement, index) => {
          const Icon = achievement.icon;
          return (
            <Card key={index}>
              <CardContent className="pt-6 text-center">
                <Icon className="w-8 h-8 text-amber-600 mx-auto mb-3" />
                <p className="text-3xl font-bold text-slate-900 mb-1">{achievement.stat}</p>
                <p className="text-sm text-slate-600">{achievement.label}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Our Story */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Heart className="w-6 h-6 text-amber-600" />
            Our Story
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-slate-700">
          <p>
            Lomash Wood began in a small workshop in Gujarat, where founder Rajesh Patel transformed his passion for woodworking into a mission to preserve traditional craftsmanship while embracing modern design principles. What started as a one-man operation has grown into a celebrated furniture studio, known for creating pieces that seamlessly blend heritage techniques with contemporary aesthetics.
          </p>
          <p>
            Our journey has been guided by a simple yet profound belief that furniture should be more than functional. It should inspire, comfort, and endure. Each piece we create is a testament to this philosophy, handcrafted with meticulous attention to detail and an unwavering commitment to quality.
          </p>
          <p>
            Today, our team of skilled artisans continues this tradition, working with sustainably sourced materials to create bespoke furniture that reflects the unique personality and needs of each client. From intimate dining tables to grand bedroom suites, every project receives the same dedication and care that has defined Lomash Wood from the beginning.
          </p>
        </CardContent>
      </Card>

      {/* Our Values */}
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <Target className="w-6 h-6 text-amber-600" />
            Our Values
          </h2>
          <p className="text-slate-600">
            The principles that guide everything we do
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <Card key={index} className="border-2 hover:border-amber-200 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${value.bgColor} flex-shrink-0`}>
                      <Icon className={`w-6 h-6 ${value.color}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-slate-900 mb-2">{value.title}</h3>
                      <p className="text-slate-600">{value.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <TrendingUp className="w-6 h-6 text-amber-600" />
            Our Journey
          </CardTitle>
          <CardDescription>
            Key milestones in the Lomash Wood story
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {milestones.map((milestone, index) => (
              <div key={index}>
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-amber-100 border-2 border-amber-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-amber-700">{milestone.year}</span>
                    </div>
                    {index < milestones.length - 1 && (
                      <div className="w-0.5 h-full bg-amber-200 mt-2" />
                    )}
                  </div>
                  <div className="pb-8 flex-1">
                    <h3 className="font-semibold text-lg text-slate-900 mb-1">{milestone.title}</h3>
                    <p className="text-slate-600">{milestone.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Meet the Team */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Users className="w-6 h-6 text-amber-600" />
            Meet the Team
          </CardTitle>
          <CardDescription>
            The craftspeople and designers behind Lomash Wood
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {team.map((member, index) => (
              <div key={index} className="flex gap-4 p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                <div className="w-16 h-16 rounded-full bg-amber-100 border-2 border-amber-600 flex items-center justify-center flex-shrink-0">
                  <Users className="w-8 h-8 text-amber-700" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-slate-900">{member.name}</h3>
                  <p className="text-sm text-amber-600 font-medium mb-1">{member.role}</p>
                  <div className="flex flex-wrap gap-3 text-sm text-slate-600">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {member.experience}
                    </span>
                    <span className="flex items-center gap-1">
                      <Hammer className="w-4 h-4" />
                      {member.specialty}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sustainability Commitment */}
      <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Recycle className="w-6 h-6 text-green-600" />
            Sustainability Commitment
          </CardTitle>
          <CardDescription className="text-green-800">
            Our promise to the planet and future generations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <Trees className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="font-semibold text-slate-900 mb-2">Responsible Sourcing</h3>
              <p className="text-sm text-slate-600">
                100% of our wood comes from FSC-certified sustainable forests
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <Leaf className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="font-semibold text-slate-900 mb-2">Carbon Neutral</h3>
              <p className="text-sm text-slate-600">
                Our workshop operates on 100% renewable energy
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <HandHeart className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="font-semibold text-slate-900 mb-2">Tree Planting Program</h3>
              <p className="text-sm text-slate-600">
                We plant 3 trees for every tree used in our furniture
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Our Workshop */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <MapPin className="w-6 h-6 text-amber-600" />
            Visit Our Workshop
          </CardTitle>
          <CardDescription>
            See where the magic happens
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-700">
            We welcome visitors to our workshop in Ahmedabad, Gujarat. Experience firsthand the craftsmanship, dedication, and passion that goes into every piece of Lomash Wood furniture. Watch our artisans at work, explore our showroom, and discuss your custom furniture ideas with our design team.
          </p>
          <div className="bg-slate-50 rounded-lg p-4 space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-900">Location</p>
                <p className="text-sm text-slate-600">123 Craftsman Lane, Ahmedabad, Gujarat 380001, India</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-900">Workshop Hours</p>
                <p className="text-sm text-slate-600">Monday - Saturday: 9:00 AM - 6:00 PM</p>
                <p className="text-sm text-slate-600">Sunday: By appointment only</p>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button className="bg-amber-600 hover:bg-amber-700" asChild>
              <Link href="/contact">
                Schedule a Visit
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/media-wall">
                Virtual Tour
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Why Choose Us */}
      <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <CheckCircle2 className="w-6 h-6 text-amber-600" />
            Why Choose Lomash Wood
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Handcrafted excellence in every piece',
              'Bespoke designs tailored to your space',
              'Sustainable and ethical sourcing',
              'Lifetime craftsmanship warranty',
              'Expert consultation and design support',
              'Premium quality hardwoods',
              'Traditional joinery techniques',
              'Modern finishing processes',
            ].map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-slate-700">{feature}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* CTA Section */}
      <Card className="bg-gradient-to-r from-amber-600 to-orange-600 text-white border-0">
        <CardContent className="pt-8 pb-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Create Your Dream Furniture?</h2>
            <p className="text-amber-50 mb-6 text-lg">
              Let's bring your vision to life with custom craftsmanship that stands the test of time.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">
                  Start Your Project
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10" asChild>
                <Link href="/products">
                  Browse Collections
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}