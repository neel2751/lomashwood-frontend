import {
  Shield,
  Clock,
  Mail,
  Info
} from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Privacy Policy | Lomash Wood',
  description: 'Our Privacy Policy is currently being updated. Please check back soon.',
  robots: 'noindex, nofollow',
};

export default function PrivacyPolicyPage() {
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
            <p className="text-lg text-slate-700">
              This page is currently under works.
            </p>
          </div>
        </CardContent>
      </div>

      {/* Under Works Notice */}
      <Card className="border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
        <CardContent className="pt-12 pb-12">
          <div className="text-center max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-6">
              <Clock className="w-8 h-8 text-amber-600" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              We&apos;re Updating Our Privacy Policy
            </h2>
            <p className="text-slate-700 text-lg leading-relaxed">
              Our Privacy Policy page is under works because we are updating our privacy policy. The updated version will be available here soon. Thank you for your patience.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card className="bg-slate-50 border-slate-200">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-start justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-amber-600 flex items-center justify-center flex-shrink-0">
                <Info className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">Questions About Your Privacy?</h3>
                <p className="text-slate-600 mb-4">
                  If you have any questions in the meantime, please don&apos;t hesitate to contact us. We&apos;re here to help.
                </p>
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <Mail className="w-4 h-4 text-amber-600" />
                  <Link href="mailto:contact@lomashwood.com" className="hover:text-amber-600">
                    contact@lomashwood.com
                  </Link>
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
    </div>
  );
}
