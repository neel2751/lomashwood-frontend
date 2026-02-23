import { 
  Cookie,
  Settings,
  Eye,
  Target,
  Shield,
  Clock,
  Globe,
  ChevronRight,
  ExternalLink,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Smartphone,
  Monitor,
  BarChart3,
  Lock,
  FileText,
  X
} from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
  title: 'Cookie Policy | Lomash Wood',
  description: 'Learn about how Lomash Wood uses cookies and similar tracking technologies on our website.',
  robots: 'noindex, nofollow',
};

export default function CookiesPage() {
  const lastUpdated = 'January 1, 2024';

  const cookieTypes = [
    {
      id: 'essential',
      title: 'Strictly Necessary Cookies',
      icon: Shield,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      required: true,
      description: 'These cookies are essential for the website to function properly. They enable core functionality such as security, network management, and accessibility.',
      examples: [
        'Session cookies for maintaining your login state',
        'Security cookies for fraud prevention',
        'Load balancing cookies for website performance',
        'Cookie consent preferences',
      ],
      duration: 'Session or up to 1 year',
      canDisable: false,
    },
    {
      id: 'functional',
      title: 'Functional Cookies',
      icon: Settings,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      required: false,
      description: 'These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings.',
      examples: [
        'Language and currency preferences',
        'Recently viewed products',
        'Shopping cart contents',
        'Design customization preferences',
        'Font size and accessibility settings',
      ],
      duration: 'Up to 1 year',
      canDisable: true,
    },
    {
      id: 'analytics',
      title: 'Analytics & Performance Cookies',
      icon: BarChart3,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      required: false,
      description: 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.',
      examples: [
        'Google Analytics for website traffic analysis',
        'Page view tracking and bounce rates',
        'Session duration and user flow',
        'Device and browser information',
        'Source of referrals and conversions',
      ],
      duration: 'Up to 2 years',
      canDisable: true,
    },
    {
      id: 'marketing',
      title: 'Marketing & Advertising Cookies',
      icon: Target,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      required: false,
      description: 'These cookies are used to deliver advertisements relevant to you and your interests, and to measure the effectiveness of our marketing campaigns.',
      examples: [
        'Facebook Pixel for retargeting',
        'Google Ads conversion tracking',
        'Display advertising preferences',
        'Social media sharing and integration',
        'Email campaign tracking',
      ],
      duration: 'Up to 1 year',
      canDisable: true,
    },
  ];

  const thirdPartyServices = [
    {
      name: 'Google Analytics',
      purpose: 'Website analytics and performance tracking',
      provider: 'Google LLC',
      website: 'https://policies.google.com/privacy',
      cookies: ['_ga', '_gid', '_gat'],
    },
    {
      name: 'Google Ads',
      purpose: 'Advertising and conversion tracking',
      provider: 'Google LLC',
      website: 'https://policies.google.com/technologies/ads',
      cookies: ['_gcl_au', 'IDE', 'test_cookie'],
    },
    {
      name: 'Facebook Pixel',
      purpose: 'Social media marketing and retargeting',
      provider: 'Meta Platforms, Inc.',
      website: 'https://www.facebook.com/privacy/explanation',
      cookies: ['_fbp', 'fr'],
    },
    {
      name: 'Hotjar',
      purpose: 'User behavior analysis and heatmaps',
      provider: 'Hotjar Ltd',
      website: 'https://www.hotjar.com/legal/policies/privacy',
      cookies: ['_hjid', '_hjSessionUser'],
    },
  ];

  const sections = [
    {
      id: 'what-are-cookies',
      title: 'What Are Cookies?',
      icon: Cookie,
      content: [
        'Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.',
        'Cookies allow websites to remember your actions and preferences (such as login, language, font size, and other display preferences) over a period of time, so you don\'t have to keep re-entering them whenever you come back to the site or browse from one page to another.',
        'Cookies can be "persistent" or "session" cookies. Persistent cookies remain on your device for a set period or until you delete them, while session cookies are deleted when you close your browser.',
      ],
    },
    {
      id: 'how-we-use',
      title: 'How We Use Cookies',
      icon: Eye,
      content: [
        'We use cookies to distinguish you from other users of our website, which helps us provide you with a good experience and allows us to improve our site.',
        'Our cookies help us understand how you navigate our site, which pages you visit most often, and whether you experience any errors.',
        'We use cookies to remember your preferences, such as language settings and product customization choices.',
        'Analytics cookies help us measure the effectiveness of our marketing campaigns and understand which products and content interest our visitors.',
        'Marketing cookies enable us to show you relevant advertisements on other websites and social media platforms.',
      ],
    },
    {
      id: 'cookie-duration',
      title: 'Cookie Duration',
      icon: Clock,
      content: [
        'Session cookies: These are temporary cookies that expire when you close your browser.',
        'Persistent cookies: These remain on your device for a predetermined period or until you manually delete them.',
        'The duration of each cookie type varies based on its purpose and is detailed in the cookie types section above.',
        'You can view the expiration date of cookies stored on your device through your browser settings.',
      ],
    },
    {
      id: 'managing-cookies',
      title: 'Managing Your Cookie Preferences',
      icon: Settings,
      content: [
        'You can control and manage cookies in various ways. Please note that removing or blocking cookies can impact your user experience and some functionality may not work as intended.',
        'Most browsers automatically accept cookies, but you can modify your browser settings to decline cookies if you prefer. Instructions for managing cookies are usually found in the "Help" section of your browser.',
        'You can use our cookie consent tool at the bottom of this page to manage your preferences for non-essential cookies.',
        'To opt out of Google Analytics tracking, you can install the Google Analytics Opt-out Browser Add-on.',
        'For information about managing cookies on mobile devices, please refer to your device\'s user manual.',
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-orange-50 via-amber-50 to-orange-50 border-2 border-orange-200">
        <CardContent className="pt-12 pb-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <Cookie className="w-10 h-10 text-orange-600" />
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
                Cookie Policy
              </h1>
            </div>
            <p className="text-lg text-slate-700 mb-4">
              This Cookie Policy explains what cookies are, how we use them on our website, and how you can manage your cookie preferences.
            </p>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Calendar className="w-4 h-4" />
              <span>Last updated: {lastUpdated}</span>
            </div>
          </div>
        </CardContent>
      </div>

      {/* Cookie Consent Manager */}
      <Card className="border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-6 h-6 text-amber-600" />
            Manage Your Cookie Preferences
          </CardTitle>
          <CardDescription className="text-amber-800">
            Control which cookies you allow us to use
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {cookieTypes.map((type) => {
            const Icon = type.icon;
            return (
              <div key={type.id} className={`p-4 rounded-lg border-2 ${type.borderColor} bg-white`}>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`w-10 h-10 rounded-lg ${type.bgColor} flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-5 h-5 ${type.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-slate-900">{type.title}</h3>
                        {type.required && (
                          <span className="text-xs px-2 py-0.5 bg-red-100 text-red-700 rounded-full font-semibold">
                            Required
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-600">{type.description}</p>
                    </div>
                  </div>
                  <Switch 
                    id={type.id}
                    defaultChecked={type.required}
                    disabled={!type.canDisable}
                  />
                </div>
                <Separator className="my-3" />
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-slate-700 mb-2">Examples:</p>
                  {type.examples.map((example, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className={`w-3 h-3 ${type.color} flex-shrink-0 mt-0.5`} />
                      <p className="text-xs text-slate-600">{example}</p>
                    </div>
                  ))}
                  <div className="flex items-center gap-2 mt-3 pt-2 border-t border-slate-200">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <p className="text-xs text-slate-500">Duration: {type.duration}</p>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="flex gap-3 pt-4">
            <Button className="bg-amber-600 hover:bg-amber-700">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Save Preferences
            </Button>
            <Button variant="outline">
              <X className="w-4 h-4 mr-2" />
              Reject All Non-Essential
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Cookie Types Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Cookie className="w-6 h-6 text-amber-600" />
            Types of Cookies We Use
          </CardTitle>
          <CardDescription>
            Understanding different cookie categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {cookieTypes.map((type) => {
              const Icon = type.icon;
              return (
                <div key={type.id} className={`p-4 rounded-lg border-2 ${type.borderColor} ${type.bgColor}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className={`w-6 h-6 ${type.color}`} />
                    <h3 className="font-bold text-slate-900">{type.title}</h3>
                  </div>
                  <p className="text-sm text-slate-700 mb-3">{type.description}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600">Duration: {type.duration}</span>
                    {type.canDisable ? (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full font-semibold">
                        Optional
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full font-semibold">
                        Required
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Main Content Sections */}
      {sections.map((section) => {
        const Icon = section.icon;
        return (
          <Card key={section.id} id={section.id} className="scroll-mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-amber-600" />
                </div>
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {section.content.map((paragraph, idx) => (
                  <p key={idx} className="text-slate-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}

      {/* Third-Party Cookies */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Globe className="w-6 h-6 text-amber-600" />
            Third-Party Cookies & Services
          </CardTitle>
          <CardDescription>
            External services that may set cookies on our website
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {thirdPartyServices.map((service, index) => (
              <div key={index} className="p-4 rounded-lg border-2 border-slate-200 hover:border-amber-200 transition-colors">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 mb-1">{service.name}</h3>
                    <p className="text-sm text-slate-600 mb-2">{service.purpose}</p>
                  </div>
                  <a
                    href={service.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-600 hover:text-amber-700 flex-shrink-0"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
                <Separator className="my-3" />
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-600 mb-1">Provider:</p>
                    <p className="font-semibold text-slate-900">{service.provider}</p>
                  </div>
                  <div>
                    <p className="text-slate-600 mb-1">Cookies Set:</p>
                    <div className="flex flex-wrap gap-1">
                      {service.cookies.map((cookie, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-xs font-mono">
                          {cookie}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Browser Instructions */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="w-6 h-6 text-blue-600" />
            Managing Cookies in Your Browser
          </CardTitle>
          <CardDescription className="text-blue-800">
            How to control cookies through your browser settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { browser: 'Google Chrome', link: 'https://support.google.com/chrome/answer/95647' },
              { browser: 'Mozilla Firefox', link: 'https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer' },
              { browser: 'Safari', link: 'https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac' },
              { browser: 'Microsoft Edge', link: 'https://support.microsoft.com/en-us/windows/manage-cookies-in-microsoft-edge-view-allow-block-delete-and-use-168dab11-0753-043d-7c16-ede5947fc64d' },
            ].map((item, index) => (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-lg bg-white border border-blue-200 hover:border-blue-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-center gap-3">
                  <Monitor className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-slate-900">{item.browser}</span>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400" />
              </a>
            ))}
          </div>
          <div className="mt-4 p-4 bg-white rounded-lg border border-blue-200">
            <div className="flex items-start gap-3">
              <Smartphone className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-900 mb-1">Mobile Devices</p>
                <p className="text-sm text-slate-600">
                  For mobile browsers, please refer to your device's documentation or the browser's help menu for instructions on managing cookies.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Important Notice */}
      <Card className="border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-amber-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Important Notice</h3>
              <p className="text-slate-700 mb-3">
                Blocking or deleting cookies may impact your ability to use certain features of our website. Some functionality may not work as intended if essential cookies are disabled.
              </p>
              <p className="text-slate-700">
                If you use different devices or browsers to access our website, you will need to set your cookie preferences on each device and browser separately.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Related Links */}
      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-600" />
            Related Policies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              { title: 'Privacy Policy', href: '/privacy-policy', icon: Lock },
              { title: 'Terms & Conditions', href: '/terms-conditions', icon: FileText },
            ].map((link, index) => {
              const Icon = link.icon;
              return (
                <Link
                  key={index}
                  href={link.href}
                  className="flex items-center gap-3 p-4 rounded-lg bg-white border border-purple-200 hover:border-purple-300 hover:shadow-sm transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-purple-600" />
                  </div>
                  <span className="font-medium text-slate-900">{link.title}</span>
                  <ChevronRight className="w-5 h-5 text-slate-400 ml-auto" />
                </Link>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Contact Section */}
      <Card className="bg-gradient-to-r from-amber-600 to-orange-600 text-white border-0">
        <CardContent className="pt-8 pb-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Questions About Cookies?</h2>
            <p className="text-amber-50 mb-6 text-lg">
              If you have any questions about our use of cookies or this Cookie Policy, please don't hesitate to contact us.
            </p>
            <Button size="lg" variant="secondary">
              Contact Us
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}