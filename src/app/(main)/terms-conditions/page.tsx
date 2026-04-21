import { 
  FileText,
  Scale,
  Shield,
  AlertCircle,
  CheckCircle2,
  Clock,
  DollarSign,
  Package,
  Truck,
  RefreshCw,
  Award,
  Lock,
  Mail,
  Calendar,
  BookOpen,
  Info,
  ExternalLink,
  ChevronRight,
  UserCheck,
  Gavel,
  Eye
} from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Lomash Wood',
  description: 'Read the terms and conditions for purchasing furniture and using services from Lomash Wood.',
  robots: 'noindex, nofollow',
};

export default function TermsConditionsPage() {
  const lastUpdated = 'January 1, 2024';

  const sections = [
    {
      id: 'introduction',
      title: 'Introduction',
      icon: BookOpen,
      content: [
        'Welcome to Lomash Wood. These Terms and Conditions govern your use of our website and the purchase of our products and services.',
        'By accessing our website or placing an order with us, you agree to be bound by these Terms and Conditions. Please read them carefully before making a purchase.',
        'If you do not agree with any part of these terms, please do not use our website or purchase our products.',
      ],
    },
    {
      id: 'definitions',
      title: 'Definitions',
      icon: FileText,
      content: [
        '"We", "Us", "Our" refers to Lomash Wood, registered in Gujarat, India.',
        '"You", "Your", "Customer" refers to the person or entity purchasing our products or services.',
        '"Products" refers to furniture, furnishings, and related items sold by Lomash Wood.',
        '"Services" refers to design consultation, installation, delivery, and other services we provide.',
        '"Website" refers to www.lomashwood.com and all associated subdomains.',
      ],
    },
    {
      id: 'orders',
      title: 'Orders & Quotations',
      icon: FileText,
      content: [
        'All quotations are valid for 30 days from the date of issue unless otherwise specified.',
        'Quotations do not constitute a binding contract until a formal order is placed and accepted by us.',
        'We reserve the right to refuse or cancel any order at our discretion, particularly if product availability changes or if we suspect fraudulent activity.',
        'Custom orders require a deposit (typically 40-50% of total value) before production begins.',
        'Order confirmations will be sent via email within 48 hours of placing your order.',
        'Once production has begun on custom furniture, orders cannot be cancelled without forfeiting the deposit.',
      ],
    },
    {
      id: 'pricing',
      title: 'Pricing & Payment',
      icon: DollarSign,
      content: [
        'All prices are listed in Indian Rupees (INR) unless otherwise stated.',
        'Prices include GST but exclude delivery and installation charges unless explicitly stated.',
        'We reserve the right to change prices at any time, but changes will not affect orders already confirmed.',
        'Payment terms for custom orders: 40-50% deposit, 40-50% before delivery, 10% upon installation completion.',
        'We accept payment via bank transfer, credit/debit cards, UPI, and other approved payment methods.',
        'For bulk or commercial orders, payment terms may be negotiated on a case-by-case basis.',
        'All outstanding payments must be cleared before delivery or installation.',
      ],
    },
    {
      id: 'production',
      title: 'Production & Timeline',
      icon: Clock,
      content: [
        'Production timelines are estimates and may vary based on design complexity, material availability, and current workload.',
        'Standard timeline ranges: Simple pieces (6-8 weeks), Medium complexity (10-14 weeks), Complex projects (16-24 weeks).',
        'We will provide regular updates on production progress throughout the manufacturing process.',
        'Delays due to force majeure events, material shortages, or other unforeseen circumstances do not constitute breach of contract.',
        'Timeline begins from the date of design approval and receipt of deposit, not from initial consultation.',
        'Rush orders may be accommodated for an additional fee, subject to availability and current production schedule.',
      ],
    },
    {
      id: 'materials',
      title: 'Materials & Specifications',
      icon: Package,
      content: [
        'We use premium FSC-certified hardwoods and sustainable materials in our furniture.',
        'Natural wood variations in grain, color, and character are inherent and not considered defects.',
        'Material samples shown during consultation are representative but may vary slightly from final product due to natural variations.',
        'We reserve the right to substitute materials of equal or better quality if specified materials become unavailable.',
        'Any material substitutions will be communicated to and approved by the customer before proceeding.',
        'Custom stains and finishes will be tested on sample pieces for approval before application to final product.',
      ],
    },
    {
      id: 'delivery',
      title: 'Delivery & Installation',
      icon: Truck,
      content: [
        'Delivery charges vary based on location, item size, and accessibility. Charges will be confirmed before order confirmation.',
        'Standard delivery is to ground floor/main entrance. Additional charges apply for upper floors without elevator access.',
        'Customer must ensure clear access to delivery location, including doorways, stairwells, and elevators of adequate size.',
        'Delivery dates are estimates. We will notify you 48 hours before scheduled delivery.',
        'Someone must be present to receive delivery and sign acceptance documentation.',
        'Professional installation is included for complex items. Basic assembly may be required for simple pieces.',
        'We are not responsible for damage to property during delivery if access requirements were not accurately communicated.',
        'If delivery cannot be completed due to access issues or customer unavailability, redelivery fees will apply.',
      ],
    },
    {
      id: 'inspection',
      title: 'Inspection & Acceptance',
      icon: Eye,
      content: [
        'Customers must inspect all items upon delivery and note any damage or defects on the delivery receipt.',
        'Any damage or defects must be reported to us within 48 hours of delivery.',
        'Failure to report issues within 48 hours may result in claims being denied.',
        'Minor variations in wood grain, color, or character are natural and do not constitute grounds for rejection.',
        'Final payment is due upon satisfactory completion of installation, unless other terms were agreed.',
        'Signing the delivery/installation completion certificate indicates acceptance of the furniture.',
      ],
    },
    {
      id: 'warranty',
      title: 'Warranty & Guarantee',
      icon: Shield,
      content: [
        'We offer a lifetime warranty on craftsmanship and joinery for all furniture.',
        'Finish warranty covers defects in our finishing process for 5 years from date of delivery.',
        'Warranty does not cover damage from misuse, accidents, normal wear and tear, or improper care.',
        'Warranty does not cover natural changes in wood color over time due to light exposure.',
        'For commercial applications, warranty terms may differ and will be specified in the contract.',
        'Warranty service requires proof of purchase and original invoice.',
        'Any repairs or modifications by third parties will void the warranty.',
        'Warranty is non-transferable and applies only to the original purchaser.',
      ],
    },
    {
      id: 'returns',
      title: 'Returns & Cancellations',
      icon: RefreshCw,
      content: [
        'Custom-made furniture cannot be returned or refunded once production has begun, except for manufacturing defects.',
        'Standard stock items may be returned within 14 days of delivery if unused and in original condition.',
        'Return shipping costs are the responsibility of the customer unless the return is due to our error.',
        'Cancellations before production begins will result in forfeiture of 10% of deposit to cover design and administrative costs.',
        'Cancellations after production begins will result in forfeiture of full deposit plus costs incurred to date.',
        'Refunds will be processed within 14 business days of receiving and inspecting returned items.',
        'Refunds will be made via the original payment method.',
      ],
    },
    {
      id: 'care',
      title: 'Care & Maintenance',
      icon: Award,
      content: [
        'Customers are responsible for proper care and maintenance of furniture as outlined in provided care instructions.',
        'Failure to follow care instructions may void warranty coverage.',
        'We recommend professional cleaning and maintenance for certain finishes and materials.',
        'Annual maintenance services are available for commercial clients and furniture fleets.',
        'Wood furniture should be kept away from direct sunlight, heat sources, and excessive humidity.',
        'Spills should be cleaned immediately with a soft, dry cloth.',
      ],
    },
    {
      id: 'liability',
      title: 'Limitation of Liability',
      icon: AlertCircle,
      content: [
        'Our liability is limited to the purchase price of the product in question.',
        'We are not liable for indirect, consequential, or incidental damages.',
        'We are not responsible for delays or failures due to circumstances beyond our reasonable control.',
        'We are not liable for damage to property during installation if customer failed to disclose relevant information about the installation site.',
        'Maximum liability for any claim shall not exceed the total amount paid for the specific product.',
      ],
    },
    {
      id: 'intellectual',
      title: 'Intellectual Property',
      icon: Lock,
      content: [
        'All designs, drawings, and creative work remain the intellectual property of Lomash Wood.',
        'Customers may not reproduce, modify, or use our designs for commercial purposes without written permission.',
        'Photographs of completed projects may be used by us for marketing purposes unless customer explicitly requests otherwise.',
        'Customer-provided designs become joint property upon project completion.',
        'We respect the intellectual property rights of others and expect our customers to do the same.',
      ],
    },
    {
      id: 'privacy',
      title: 'Privacy & Data Protection',
      icon: UserCheck,
      content: [
        'We collect and process personal data in accordance with our Privacy Policy and applicable data protection laws.',
        'Customer information will not be shared with third parties except as necessary to fulfill orders.',
        'We implement appropriate security measures to protect customer data.',
        'Customers have the right to access, correct, or delete their personal information.',
        'For full details on data handling, please refer to our Privacy Policy.',
      ],
    },
    {
      id: 'disputes',
      title: 'Dispute Resolution',
      icon: Gavel,
      content: [
        'We encourage customers to contact us directly to resolve any issues or concerns.',
        'All disputes will first be subject to good-faith negotiation between parties.',
        'If negotiation fails, disputes shall be resolved through arbitration in accordance with Indian Arbitration and Conciliation Act.',
        'Arbitration will be conducted in Ahmedabad, Gujarat, India.',
        'The decision of the arbitrator shall be final and binding on both parties.',
        'Each party shall bear their own costs unless the arbitrator decides otherwise.',
      ],
    },
    {
      id: 'governing',
      title: 'Governing Law',
      icon: Scale,
      content: [
        'These Terms and Conditions are governed by the laws of India.',
        'The courts of Ahmedabad, Gujarat, India shall have exclusive jurisdiction over any disputes.',
        'If any provision of these terms is found to be unenforceable, the remaining provisions shall continue in full force.',
      ],
    },
    {
      id: 'changes',
      title: 'Changes to Terms',
      icon: RefreshCw,
      content: [
        'We reserve the right to modify these Terms and Conditions at any time.',
        'Changes will be posted on this page with an updated "Last Updated" date.',
        'Continued use of our website or services after changes constitutes acceptance of modified terms.',
        'For significant changes, we will notify customers via email where reasonably possible.',
        'Orders placed before changes take effect will be governed by the terms in place at time of order.',
      ],
    },
  ];

  const quickLinks = [
    { title: 'Privacy Policy', href: '/privacy-policy', icon: Lock },
    { title: 'Warranty Information', href: '/warranty', icon: Shield },
    { title: 'Return Policy', href: '/returns', icon: RefreshCw },
    { title: 'Shipping Information', href: '/shipping', icon: Truck },
  ];

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 border-2 border-slate-200">
        <CardContent className="pt-12 pb-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <Scale className="w-10 h-10 text-slate-700" />
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
                Terms & Conditions
              </h1>
            </div>
            <p className="text-lg text-slate-700 mb-4">
              Please read these terms and conditions carefully before using our services or purchasing our products. These terms govern your relationship with Lomash Wood.
            </p>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Calendar className="w-4 h-4" />
              <span>Last updated: {lastUpdated}</span>
            </div>
          </div>
        </CardContent>
      </div>

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
                  className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-amber-300 hover:bg-amber-50 transition-all group"
                >
                  <Icon className="w-5 h-5 text-slate-400 group-hover:text-amber-600" />
                  <span className="text-sm font-medium text-slate-900">{section.title}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400 ml-auto group-hover:text-amber-600" />
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
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-amber-600" />
                </div>
                {index + 1}. {section.title}
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

      {/* Related Links */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ExternalLink className="w-5 h-5 text-blue-600" />
            Related Policies
          </CardTitle>
          <CardDescription className="text-blue-800">
            Additional information you may find useful
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
                  className="flex items-center gap-3 p-4 rounded-lg bg-white border border-blue-200 hover:border-blue-300 hover:shadow-sm transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="font-medium text-slate-900">{link.title}</span>
                  <ChevronRight className="w-5 h-5 text-slate-400 ml-auto" />
                </Link>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card className="border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-start justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-amber-600 flex items-center justify-center flex-shrink-0">
                <Info className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">Questions About Our Terms?</h3>
                <p className="text-slate-600 mb-4">
                  If you have any questions about these Terms and Conditions, please don't hesitate to contact us. We're here to help clarify any points.
                </p>
                <div className="flex flex-col gap-2 text-sm text-slate-700">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-amber-600" />
                    <Link href="mailto:contact@lomashwood.com" className="hover:text-amber-600">
                      contact@lomashwood.com
                    </Link>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-amber-600" />
                    <Link href="mailto:contact@lomashwood.com" className="hover:text-amber-600">
                      contact@lomashwood.com
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <Button className="bg-amber-600 hover:bg-amber-700 flex-shrink-0" asChild>
              <Link href="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Acknowledgment */}
      <Card className="bg-slate-50 border-slate-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Acknowledgment</h3>
              <p className="text-slate-700">
                By using our website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our website or purchase our products.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}