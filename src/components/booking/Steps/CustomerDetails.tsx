'use client';

import {
  Mail,
  Phone,
  MapPin,
  Home,
  FileText,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { useFormContext } from 'react-hook-form';

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function CustomerDetails() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Your Details</h2>
        <p className="text-gray-600 mt-1">
          Please provide your contact information so we can confirm your appointment
        </p>
      </div>

      {/* Personal Information */}
      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="flex items-center gap-2 pb-2">
            <User className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="firstName" className="text-sm font-medium">
                First Name <span className="text-red-500">*</span>
              </label>
              <Input
                id="firstName"
                type="text"
                placeholder="Enter your first name"
                className={errors.firstName ? 'border-red-500' : ''}
                {...register('firstName')}
              />
              {errors.firstName && (
                <p className="text-sm text-red-500">{errors.firstName.message as string}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="lastName" className="text-sm font-medium">
                Last Name <span className="text-red-500">*</span>
              </label>
              <Input
                id="lastName"
                type="text"
                placeholder="Enter your last name"
                className={errors.lastName ? 'border-red-500' : ''}
                {...register('lastName')}
              />
              {errors.lastName && (
                <p className="text-sm text-red-500">{errors.lastName.message as string}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="flex items-center gap-2 pb-2">
            <Phone className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email Address{' '}
                <span className="text-gray-400 text-sm">(Optional)</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  className={`w-full h-10 pl-10 pr-3 py-2 border rounded-md ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message as string}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="07XXX XXXXXX"
                  className={`w-full h-10 pl-10 pr-3 py-2 border rounded-md ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  {...register('phone')}
                />
              </div>
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message as string}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Address Information */}
      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="flex items-center gap-2 pb-2">
            <MapPin className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-gray-900">Address Information</h3>
          </div>

          {/* Removed: House Number, Street, City/Town */}
          {/* Added: Full Address + Postcode */}

          <div className="space-y-2">
            <label htmlFor="fullAddress" className="text-sm font-medium">
              Full Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Home className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Textarea
                id="fullAddress"
                placeholder="Enter your full address"
                rows={3}
                className={`w-full pl-10 pr-3 py-2 border rounded-md resize-none ${
                  errors.fullAddress ? 'border-red-500' : 'border-gray-300'
                }`}
                {...register('fullAddress')}
              />
            </div>
            {errors.fullAddress && (
              <p className="text-sm text-red-500">{errors.fullAddress.message as string}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="postcode" className="text-sm font-medium">
              Postcode <span className="text-red-500">*</span>
            </label>
            <Input
              id="postcode"
              type="text"
              placeholder="e.g., SW1A 1AA"
              className={`w-full h-10 pl-3 pr-3 py-2 border rounded-md ${
                errors.postcode ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('postcode')}
            />
            {errors.postcode && (
              <p className="text-sm text-red-500">{errors.postcode.message as string}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Additional Information */}
      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="flex items-center gap-2 pb-2">
            <FileText className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-gray-900">Additional Information</h3>
          </div>

          <div className="space-y-2">
            <label htmlFor="notes" className="text-sm font-medium">
              Special Requirements or Notes{' '}
              <span className="text-gray-400 text-sm">(Optional)</span>
            </label>
            <Textarea
              id="notes"
              placeholder="Let us know if you have any specific requirements, questions, or preferences..."
              rows={4}
              className="resize-none"
              {...register('notes')}
            />
            <p className="text-sm text-gray-500">Maximum 500 characters</p>
          </div>
        </CardContent>
      </Card>

      <div className="rounded-lg border border-primary/15 bg-primary/5 p-4 text-sm text-gray-700 space-y-1">
        <p className="font-semibold text-gray-900">Please note</p>
        <p>
          By booking an appointment, you agree to our{' '}
          <Link href="/terms-conditions" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
            Terms & Conditions
          </Link>{' '}
          and{' '}
          <Link href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}