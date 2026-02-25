import { 
  Settings,
  Bell,
  Lock,
  Mail,
  Eye,
  Shield,
  Smartphone,
  Globe,
  Download,
  Trash2,
  AlertCircle,
  CheckCircle2,
  Save
} from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

export const metadata: Metadata = {
  title: 'Settings | My Account | Lomash Wood',
  description: 'Manage your account settings, notifications, and privacy preferences.',
  robots: 'noindex, nofollow',
};

export default function SettingsPage() {
  const settings = {
    notifications: {
      email: {
        orderUpdates: true,
        appointments: true,
        newsletter: true,
        promotions: false,
        productUpdates: true,
        blogPosts: false,
      },
      sms: {
        orderUpdates: true,
        appointments: true,
        promotions: false,
      },
      push: {
        enabled: false,
        orderUpdates: false,
        appointments: false,
      },
    },
    privacy: {
      showProfile: false,
      shareActivity: false,
      allowAnalytics: true,
      personalizedAds: false,
    },
    preferences: {
      language: 'en-GB',
      currency: 'GBP',
      measurementUnit: 'metric',
      theme: 'light',
    },
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <Settings className="w-6 h-6 text-amber-600" />
          Account Settings
        </h2>
        <p className="text-slate-600">
          Manage your preferences, notifications, and privacy settings
        </p>
      </div>

      {/* Email Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Email Notifications
          </CardTitle>
          <CardDescription>
            Choose what emails you'd like to receive
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-orders" className="font-semibold">Order Updates</Label>
              <p className="text-sm text-slate-600">Notifications about order status and delivery</p>
            </div>
            <Switch id="email-orders" defaultChecked={settings.notifications.email.orderUpdates} />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-appointments" className="font-semibold">Appointment Reminders</Label>
              <p className="text-sm text-slate-600">Reminders for upcoming consultations</p>
            </div>
            <Switch id="email-appointments" defaultChecked={settings.notifications.email.appointments} />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-newsletter" className="font-semibold">Newsletter</Label>
              <p className="text-sm text-slate-600">Monthly design tips and inspiration</p>
            </div>
            <Switch id="email-newsletter" defaultChecked={settings.notifications.email.newsletter} />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-promotions" className="font-semibold">Promotions & Offers</Label>
              <p className="text-sm text-slate-600">Special deals and exclusive offers</p>
            </div>
            <Switch id="email-promotions" defaultChecked={settings.notifications.email.promotions} />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-products" className="font-semibold">Product Updates</Label>
              <p className="text-sm text-slate-600">New products and collections</p>
            </div>
            <Switch id="email-products" defaultChecked={settings.notifications.email.productUpdates} />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-blog" className="font-semibold">Blog Posts</Label>
              <p className="text-sm text-slate-600">Latest articles and guides</p>
            </div>
            <Switch id="email-blog" defaultChecked={settings.notifications.email.blogPosts} />
          </div>
        </CardContent>
      </Card>

      {/* SMS Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="w-5 h-5" />
            SMS Notifications
          </CardTitle>
          <CardDescription>
            Receive text message updates
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="sms-orders" className="font-semibold">Order Updates</Label>
              <p className="text-sm text-slate-600">Critical order status updates</p>
            </div>
            <Switch id="sms-orders" defaultChecked={settings.notifications.sms.orderUpdates} />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="sms-appointments" className="font-semibold">Appointment Reminders</Label>
              <p className="text-sm text-slate-600">SMS reminders before appointments</p>
            </div>
            <Switch id="sms-appointments" defaultChecked={settings.notifications.sms.appointments} />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="sms-promotions" className="font-semibold">Promotions</Label>
              <p className="text-sm text-slate-600">Special offers via SMS</p>
            </div>
            <Switch id="sms-promotions" defaultChecked={settings.notifications.sms.promotions} />
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
            <p className="text-sm text-blue-800">
              Standard message rates may apply. You can unsubscribe at any time.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Push Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Push Notifications
          </CardTitle>
          <CardDescription>
            Browser and mobile app notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="push-enabled" className="font-semibold">Enable Push Notifications</Label>
              <p className="text-sm text-slate-600">Allow browser notifications</p>
            </div>
            <Switch id="push-enabled" defaultChecked={settings.notifications.push.enabled} />
          </div>

          {settings.notifications.push.enabled && (
            <>
              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push-orders" className="font-semibold">Order Updates</Label>
                  <p className="text-sm text-slate-600">Real-time order notifications</p>
                </div>
                <Switch id="push-orders" defaultChecked={settings.notifications.push.orderUpdates} />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push-appointments" className="font-semibold">Appointments</Label>
                  <p className="text-sm text-slate-600">Appointment reminders and updates</p>
                </div>
                <Switch id="push-appointments" defaultChecked={settings.notifications.push.appointments} />
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Privacy & Visibility
          </CardTitle>
          <CardDescription>
            Control your privacy and data sharing preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="privacy-profile" className="font-semibold">Public Profile</Label>
              <p className="text-sm text-slate-600">Make your profile visible to other users</p>
            </div>
            <Switch id="privacy-profile" defaultChecked={settings.privacy.showProfile} />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="privacy-activity" className="font-semibold">Share Activity</Label>
              <p className="text-sm text-slate-600">Allow others to see your saved designs and wishlist</p>
            </div>
            <Switch id="privacy-activity" defaultChecked={settings.privacy.shareActivity} />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="privacy-analytics" className="font-semibold">Analytics & Performance</Label>
              <p className="text-sm text-slate-600">Help us improve by sharing usage data</p>
            </div>
            <Switch id="privacy-analytics" defaultChecked={settings.privacy.allowAnalytics} />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="privacy-ads" className="font-semibold">Personalized Advertising</Label>
              <p className="text-sm text-slate-600">Show ads based on your interests</p>
            </div>
            <Switch id="privacy-ads" defaultChecked={settings.privacy.personalizedAds} />
          </div>
        </CardContent>
      </Card>

      {/* Regional Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Regional Preferences
          </CardTitle>
          <CardDescription>
            Language, currency, and regional settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <select 
                id="language"
                className="w-full h-10 px-3 rounded-md border border-slate-200 bg-white text-sm"
                defaultValue={settings.preferences.language}
              >
                <option value="en-GB">English (UK)</option>
                <option value="en-US">English (US)</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <select 
                id="currency"
                className="w-full h-10 px-3 rounded-md border border-slate-200 bg-white text-sm"
                defaultValue={settings.preferences.currency}
              >
                <option value="GBP">GBP (£)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="units">Measurement Units</Label>
              <select 
                id="units"
                className="w-full h-10 px-3 rounded-md border border-slate-200 bg-white text-sm"
                defaultValue={settings.preferences.measurementUnit}
              >
                <option value="metric">Metric (cm, m)</option>
                <option value="imperial">Imperial (in, ft)</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="theme">Theme</Label>
              <select 
                id="theme"
                className="w-full h-10 px-3 rounded-md border border-slate-200 bg-white text-sm"
                defaultValue={settings.preferences.theme}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Security
          </CardTitle>
          <CardDescription>
            Manage password and security options
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div>
              <p className="font-semibold">Password</p>
              <p className="text-sm text-slate-600">Last changed 3 months ago</p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/my-account/profile#security">
                Change Password
              </Link>
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div>
              <p className="font-semibold">Two-Factor Authentication</p>
              <p className="text-sm text-slate-600">Add extra security to your account</p>
            </div>
            <Button variant="outline" size="sm">
              Enable 2FA
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div>
              <p className="font-semibold">Active Sessions</p>
              <p className="text-sm text-slate-600">Manage logged-in devices</p>
            </div>
            <Button variant="outline" size="sm">
              View Sessions
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Data Management
          </CardTitle>
          <CardDescription>
            Download or delete your data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <Download className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-blue-900">Download Your Data</p>
                <p className="text-sm text-blue-800">
                  Request a copy of your account data, orders, and designs
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Request
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start gap-3">
              <Trash2 className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-900">Delete Account</p>
                <p className="text-sm text-red-800">
                  Permanently delete your account and all associated data
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <Card className="bg-slate-50">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-slate-600">
                Changes are automatically saved. Your preferences will be applied immediately.
              </p>
            </div>
            <Button className="bg-amber-600 hover:bg-amber-700">
              <Save className="w-4 h-4 mr-2" />
              Save All Changes
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Notice */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-slate-600">
            <p className="font-semibold mb-1">Privacy & Data Protection</p>
            <p>
              We respect your privacy and protect your data in accordance with GDPR and UK data protection laws. 
              Read our{' '}
              <Link href="/privacy-policy" className="text-amber-600 hover:underline font-semibold">
                Privacy Policy
              </Link>
              {' '}for more information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}