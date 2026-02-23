"use client"; 

import ProfileForm from '@/components/account/ProfileForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { User, Mail, Phone, MapPin, Calendar } from 'lucide-react';

// Remove the metadata export - it cannot be used with "use client"

export default function ProfilePage() {
  // This would typically come from useAuth hook or API
  const user = {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+91 98765 43210',
    alternatePhone: '+91 98765 43211',
    dateOfBirth: '1990-05-15',
    gender: 'male',
    address: {
      street: '123 Main Street',
      apartment: 'Apt 4B',
      city: 'Ahmedabad',
      state: 'Gujarat',
      pincode: '380001',
      country: 'India',
    },
    memberSince: '2024-01-15T10:30:00Z',
    lastUpdated: '2024-01-20T14:45:00Z',
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Profile Settings
        </h1>
        <p className="text-gray-600">
          Manage your personal information and account details
        </p>
      </div>

      <Separator />

      {/* Account Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Account Information</span>
          </CardTitle>
          <CardDescription>
            Your account was created on {formatDate(user.memberSince)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <User className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium">{user.firstName} {user.lastName}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <p className="font-medium">{user.phone}</p>
                  {user.alternatePhone && (
                    <p className="text-sm text-gray-600 mt-1">
                      Alt: {user.alternatePhone}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-medium">
                    {user.address.street}
                    {user.address.apartment && `, ${user.address.apartment}`}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {user.address.city}, {user.address.state} {user.address.pincode}
                  </p>
                  <p className="text-sm text-gray-600">{user.address.country}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Date of Birth</p>
                  <p className="font-medium">{formatDate(user.dateOfBirth)}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <User className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Gender</p>
                  <p className="font-medium capitalize">{user.gender}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t">
            <p className="text-xs text-gray-500">
              Last updated: {formatDate(user.lastUpdated)}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Edit Profile Form */}
      <Card>
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
          <CardDescription>
            Update your personal information below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileForm 
            initialData={{
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              phone: user.phone,
              dateOfBirth: user.dateOfBirth,
              gender: user.gender as "male" | "female" | "other" | "prefer-not-to-say" | undefined,
              address: user.address?.street,
              city: user.address?.city,
              state: user.address?.state,
              pincode: user.address?.pincode,
            }}
            onSubmit={async () => {}}
          />
        </CardContent>
      </Card>

      {/* Additional Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Communication Preferences</CardTitle>
          <CardDescription>
            Manage how you receive updates from us
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-gray-600">
                  Receive order updates and promotional emails
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">SMS Notifications</p>
                <p className="text-sm text-gray-600">
                  Receive appointment reminders via SMS
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">WhatsApp Updates</p>
                <p className="text-sm text-gray-600">
                  Get updates on WhatsApp for quick access
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Marketing Communications</p>
                <p className="text-sm text-gray-600">
                  Receive special offers and design inspiration
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Actions */}
      <Card className="border-red-200 bg-red-50/50">
        <CardHeader>
          <CardTitle className="text-red-900">Danger Zone</CardTitle>
          <CardDescription className="text-red-700">
            Irreversible actions that require careful consideration
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-red-900">Deactivate Account</p>
              <p className="text-sm text-red-700">
                Temporarily disable your account
              </p>
            </div>
            <button className="px-4 py-2 text-sm font-medium text-red-700 border border-red-300 rounded-lg hover:bg-red-100 transition-colors">
              Deactivate
            </button>
          </div>

          <Separator className="bg-red-200" />

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-red-900">Delete Account</p>
              <p className="text-sm text-red-700">
                Permanently delete your account and all data
              </p>
            </div>
            <button className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors">
              Delete Account
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}