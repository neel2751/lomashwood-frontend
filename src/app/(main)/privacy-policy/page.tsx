import { 
  Shield,
  Lock,
  UserCheck,
  Database,
  Cookie,
  Mail,
  Globe,
  CheckCircle2,
  Calendar,
  BookOpen,
  ChevronRight,
  Info,
  FileText,
  Settings,
  Users,
  Share2,
  Smartphone,
  CreditCard,
  ShoppingCart,
  MessageSquare,
  Bell,
  Trash2,
  Download,
  ExternalLink,
  Scale
} from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Privacy Policy | Lomash Wood',
  description: 'Learn how Lomash Wood collects, uses, and protects your personal information.',
  robots: 'noindex, nofollow',
};

export default function PrivacyPolicyPage() {
  const lastUpdated = 'January 1, 2024';

  const sections = [
    {
      id: 'introduction',
      title: 'Introduction',
      icon: BookOpen,
      content: [
        'At Lomash Wood, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you visit our website or use our services.',
        'This policy applies to all information collected through our website, mobile applications, email communications, and any related services.',
        'By using our website or services, you consent to the data practices described in this policy.',
      ],
    },
    {
      id: 'information-collected',
      title: 'Information We Collect',
      icon: Database,
      subsections: [
        {
          title: 'Personal Information',
          icon: UserCheck,
          content: [
            'Name, email address, phone number, and postal address',
            'Billing and delivery addresses',
            'Payment information (processed securely through third-party payment processors)',
            'Account credentials (username and password)',
            'Business information for commercial clients (company name, GST number, etc.)',
          ],
        },
        {
          title: 'Order & Project Information',
          icon: ShoppingCart,
          content: [
            'Product preferences and customization details',
            'Design specifications and measurements',
            'Purchase history and order details',
            'Communication preferences for updates and notifications',
            'Consultation notes and project requirements',
          ],
        },
        {
          title: 'Technical Information',
          icon: Smartphone,
          content: [
            'IP address and browser type',
            'Device information (type, operating system)',
            'Website usage data and navigation patterns',
            'Cookies and similar tracking technologies',
            'Referring website addresses',
          ],
        },
        {
          title: 'Communications',
          icon: MessageSquare,
          content: [
            'Emails, messages, and other communications with us',
            'Customer service inquiries and support tickets',
            'Feedback, reviews, and testimonials',
            'Survey responses and marketing preferences',
          ],
        },
      ],
    },
    {
      id: 'how-we-use',
      title: 'How We Use Your Information',
      icon: Settings,
      content: [
        'To process and fulfill your orders, including custom furniture projects',
        'To communicate with you about your orders, appointments, and deliveries',
        'To provide customer support and respond to your inquiries',
        'To send you updates, newsletters, and marketing communications (with your consent)',
        'To improve our website, products, and services based on your feedback',
        'To detect, prevent, and address technical issues and security concerns',
        'To comply with legal obligations and enforce our terms and conditions',
        'To analyze usage patterns and conduct market research',
        'To personalize your experience and provide tailored recommendations',
      ],
    },
    {
      id: 'sharing',
      title: 'Information Sharing & Disclosure',
      icon: Share2,
      content: [
        'We do not sell, trade, or rent your personal information to third parties.',
        'We may share information with trusted service providers who assist us in operating our business (payment processors, delivery services, etc.)',
        'Service providers are contractually obligated to use your information only for specified purposes and to protect it.',
        'We may disclose information when required by law, legal process, or to protect our rights and safety.',
        'In the event of a business transfer or merger, your information may be transferred to the acquiring entity.',
        'With your explicit consent, we may share testimonials, reviews, or project photos (with identifying information removed if requested).',
      ],
    },
    {
      id: 'cookies',
      title: 'Cookies & Tracking Technologies',
      icon: Cookie,
      content: [
        'We use cookies and similar technologies to enhance your browsing experience and analyze website traffic.',
        'Essential cookies are necessary for website functionality and cannot be disabled.',
        'Analytics cookies help us understand how visitors interact with our website.',
        'Marketing cookies are used to deliver relevant advertisements and track campaign performance.',
        'You can control cookie preferences through your browser settings, though some features may not function properly if cookies are disabled.',
        'Third-party services (Google Analytics, social media platforms) may also use cookies when you interact with our content.',
      ],
    },
    {
      id: 'data-security',
      title: 'Data Security',
      icon: Lock,
      content: [
        'We implement appropriate technical and organizational measures to protect your personal information.',
        'Payment information is encrypted using SSL/TLS technology and processed through PCI-DSS compliant payment gateways.',
        'Access to personal data is restricted to authorized personnel only.',
        'We regularly review and update our security practices to address emerging threats.',
        'Despite our efforts, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.',
        'In the event of a data breach, we will notify affected individuals as required by applicable law.',
      ],
    },
    {
      id: 'data-retention',
      title: 'Data Retention',
      icon: Calendar,
      content: [
        'We retain personal information only as long as necessary to fulfill the purposes outlined in this policy.',
        'Order and transaction records are kept for accounting and tax purposes as required by Indian law (typically 6-7 years).',
        'Marketing communications data is retained until you unsubscribe or request deletion.',
        'Website analytics data may be retained for up to 26 months.',
        'After the retention period, we securely delete or anonymize your information.',
      ],
    },
    {
      id: 'your-rights',
      title: 'Your Rights & Choices',
      icon: UserCheck,
      subsections: [
        {
          title: 'Access & Portability',
          icon: Download,
          content: [
            'You have the right to request a copy of the personal information we hold about you.',
            'You can request your data in a structured, commonly used, and machine-readable format.',
          ],
        },
        {
          title: 'Correction & Updates',
          icon: Settings,
          content: [
            'You can update your account information at any time through your account settings.',
            'You may request correction of inaccurate or incomplete data.',
          ],
        },
        {
          title: 'Deletion',
          icon: Trash2,
          content: [
            'You can request deletion of your personal information, subject to legal retention requirements.',
            'Deletion requests will be processed within 30 days.',
          ],
        },
        {
          title: 'Marketing Opt-Out',
          icon: Bell,
          content: [
            'You can unsubscribe from marketing emails using the link in each email.',
            'You can update communication preferences in your account settings.',
            'Even if you opt out of marketing, we may still send transactional emails related to your orders.',
          ],
        },
      ],
    },
    {
      id: 'third-party',
      title: 'Third-Party Links & Services',
      icon: ExternalLink,
      content: [
        'Our website may contain links to third-party websites and services.',
        'We are not responsible for the privacy practices of these third parties.',
        'We encourage you to review the privacy policies of any third-party sites you visit.',
        'Third-party payment processors (Razorpay, PayU, etc.) have their own privacy policies governing the handling of payment information.',
        'Social media integrations may collect information according to their respective privacy policies.',
      ],
    },
    {
      id: 'children',
      title: 'Children\'s Privacy',
      icon: Users,
      content: [
        'Our services are not directed to individuals under the age of 18.',
        'We do not knowingly collect personal information from children.',
        'If we become aware that we have collected information from a child, we will take steps to delete it.',
        'Parents or guardians who believe their child has provided information to us should contact us immediately.',
      ],
    },
    {
      id: 'international',
      title: 'International Data Transfers',
      icon: Globe,
      content: [
        'Your information may be transferred to and processed in locations outside of India.',
        'We ensure appropriate safeguards are in place to protect your information during international transfers.',
        'By using our services, you consent to the transfer of your information to other countries.',
        'We comply with applicable data protection laws regarding international transfers.',
      ],
    },
    {
      id: 'business-clients',
      title: 'Business & Trade Clients',
      icon: CreditCard,
      content: [
        'Additional information may be collected from business clients for trade accounts and commercial transactions.',
        'Business information (GST numbers, company details) is used for invoicing and compliance purposes.',
        'Trade program participants consent to sharing project photos and case studies for marketing purposes, unless explicitly opted out.',
        'Commercial contracts may include specific data processing terms.',
      ],
    },
    {
      id: 'changes',
      title: 'Changes to This Policy',
      icon: FileText,
      content: [
        'We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements.',
        'The "Last Updated" date at the top of this page indicates when the policy was last revised.',
        'Material changes will be communicated via email or prominent notice on our website.',
        'Continued use of our services after changes indicates acceptance of the updated policy.',
        'We encourage you to review this policy periodically.',
      ],
    },
    {
      id: 'gdpr-compliance',
      title: 'GDPR & Data Protection Compliance',
      icon: Scale,
      content: [
        'While Lomash Wood is based in India, we respect the privacy rights of all our customers, including those in the EU.',
        'We process personal data lawfully, fairly, and transparently.',
        'Data processing is limited to specified, explicit, and legitimate purposes.',
        'We collect only the minimum data necessary for our purposes.',
        'Personal data is kept accurate and up to date.',
        'We implement appropriate security measures to protect personal data.',
        'For EU customers, additional rights under GDPR may apply.',
      ],
    },
  ];

  const quickLinks = [
    { title: 'Terms & Conditions', href: '/terms-conditions', icon: FileText },
    { title: 'Cookie Policy', href: '/cookie-policy', icon: Cookie },
    { title: 'Data Security', href: '/data-security', icon: Lock },
    { title: 'Your Rights', href: '#your-rights', icon: UserCheck },
  ];

  const dataProtectionOfficer = {
    name: 'Privacy Team',
    email: 'privacy@lomashwood.com',
    phone: '+91 79 2658 1234',
  };

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-50 border-2 border-blue-200">
        <CardContent className="pt-12 pb-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-10 h-10 text-blue-600" />
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
                Privacy Policy
              </h1>
            </div>
            <p className="text-lg text-slate-700 mb-4">
              Your privacy is important to us. This policy explains how we collect, use, and protect your personal information when you interact with Lomash Wood.
            </p>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Calendar className="w-4 h-4" />
              <span>Last updated: {lastUpdated}</span>
            </div>
          </div>
        </CardContent>
      </div>

      {/* Key Privacy Highlights */}
      <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
            Your Privacy at a Glance
          </CardTitle>
          <CardDescription className="text-green-800">
            Key points about how we handle your data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              'We never sell your personal information to third parties',
              'Your payment data is encrypted and securely processed',
              'You can request access to or deletion of your data anytime',
              'Marketing emails can be unsubscribed with one click',
              'We use cookies to improve your experience (you can opt out)',
              'Your data is protected with industry-standard security measures',
            ].map((point, idx) => (
              <div key={idx} className="flex items-start gap-2 bg-white rounded-lg p-3 border border-green-200">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-700">{point}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Table of Contents */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-600" />
            Table of Contents
          </CardTitle>
          <CardDescription>
            Quick navigation to different sections
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all group"
                >
                  <Icon className="w-5 h-5 text-slate-400 group-hover:text-blue-600" />
                  <span className="text-sm font-medium text-slate-900">{section.title}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400 ml-auto group-hover:text-blue-600" />
                </a>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Main Content Sections */}
      {sections.map((section, index) => {
        const Icon = section.icon;
        return (
          <Card key={section.id} id={section.id} className="scroll-mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-blue-600" />
                </div>
                {index + 1}. {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {section.subsections ? (
                <div className="space-y-6">
                  {section.subsections.map((subsection, subIdx) => {
                    const SubIcon = subsection.icon;
                    return (
                      <div key={subIdx}>
                        <div className="flex items-center gap-2 mb-3">
                          <SubIcon className="w-5 h-5 text-blue-600" />
                          <h3 className="font-semibold text-lg text-slate-900">{subsection.title}</h3>
                        </div>
                        <ul className="space-y-2 ml-7">
                          {subsection.content.map((item, itemIdx) => (
                            <li key={itemIdx} className="flex items-start gap-2">
                              <span className="text-blue-600 mt-1.5">•</span>
                              <span className="text-slate-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <ul className="space-y-3">
                  {section.content.map((paragraph, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1.5">•</span>
                      <span className="text-slate-700 leading-relaxed">{paragraph}</span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        );
      })}

      {/* Data Protection Officer Contact */}
      <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="w-6 h-6 text-purple-600" />
            Contact Our Privacy Team
          </CardTitle>
          <CardDescription className="text-purple-800">
            For any privacy-related questions or requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 border border-purple-200">
              <Mail className="w-6 h-6 text-purple-600 mb-2" />
              <p className="text-sm font-semibold text-slate-900 mb-1">Email</p>
              <a href={`mailto:${dataProtectionOfficer.email}`} className="text-sm text-purple-600 hover:underline">
                {dataProtectionOfficer.email}
              </a>
            </div>
            <div className="bg-white rounded-lg p-4 border border-purple-200">
              <Smartphone className="w-6 h-6 text-purple-600 mb-2" />
              <p className="text-sm font-semibold text-slate-900 mb-1">Phone</p>
              <a href={`tel:${dataProtectionOfficer.phone}`} className="text-sm text-purple-600 hover:underline">
                {dataProtectionOfficer.phone}
              </a>
            </div>
            <div className="bg-white rounded-lg p-4 border border-purple-200">
              <Users className="w-6 h-6 text-purple-600 mb-2" />
              <p className="text-sm font-semibold text-slate-900 mb-1">Team</p>
              <p className="text-sm text-slate-700">{dataProtectionOfficer.name}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Related Links */}
      <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ExternalLink className="w-5 h-5 text-amber-600" />
            Related Policies
          </CardTitle>
          <CardDescription className="text-amber-800">
            Additional information about your data and rights
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-3">
            {quickLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <Link
                  key={index}
                  href={link.href}
                  className="flex items-center gap-3 p-4 rounded-lg bg-white border border-amber-200 hover:border-amber-300 hover:shadow-sm transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-amber-600" />
                  </div>
                  <span className="font-medium text-slate-900">{link.title}</span>
                  <ChevronRight className="w-5 h-5 text-slate-400 ml-auto" />
                </Link>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Your Rights CTA */}
      <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">
        <CardContent className="pt-8 pb-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Exercise Your Privacy Rights</h2>
            <p className="text-blue-50 mb-6 text-lg">
              You have the right to access, correct, or delete your personal information. Contact us to make a request or if you have any questions about how we handle your data.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button size="lg" variant="secondary">
                <Mail className="w-5 h-5 mr-2" />
                Contact Privacy Team
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                <Download className="w-5 h-5 mr-2" />
                Download Your Data
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Acknowledgment */}
      <Card className="bg-slate-50 border-slate-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Acknowledgment</h3>
              <p className="text-slate-700">
                By using our website and services, you acknowledge that you have read and understood this Privacy Policy and consent to the collection, use, and disclosure of your information as described herein.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}