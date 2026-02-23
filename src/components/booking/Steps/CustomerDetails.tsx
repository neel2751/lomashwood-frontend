'use client';

import {
  User,
  Mail,
  Phone,
  MapPin,
  Home,
  Building2,
  FileText,
  Shield,
  InfoIcon,
} from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';

const TITLE_OPTIONS = ['Mr', 'Mrs', 'Ms', 'Miss', 'Dr', 'Prof'];

const CONTACT_PREFERENCES = [
  { id: 'email', label: 'Email', icon: Mail },
  { id: 'phone', label: 'Phone', icon: Phone },
  { id: 'sms', label: 'SMS', icon: Phone },
];

export default function CustomerDetails() {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();

  const marketingConsent = watch('marketingConsent');
  const contactPreferences = watch('contactPreferences') || [];

  const handleContactPreferenceToggle = (preferenceId: string) => {
    const current = contactPreferences as string[];
    const updated = current.includes(preferenceId)
      ? current.filter((id: string) => id !== preferenceId)
      : [...current, preferenceId];
    setValue('contactPreferences', updated, { shouldValidate: true });
  };

  const isPreferenceSelected = (preferenceId: string) => {
    return (contactPreferences as string[]).includes(preferenceId);
  };

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

          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Title <span className="text-red-500">*</span>
              </label>
              <select
                id="title"
                className={`w-full h-10 px-3 py-2 border rounded-md bg-white ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
                {...register('title')}
              >
                <option value="">Select title</option>
                {TITLE_OPTIONS.map((title) => (
                  <option key={title} value={title.toLowerCase()}>
                    {title}
                  </option>
                ))}
              </select>
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message as string}</p>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <label htmlFor="firstName" className="text-sm font-medium">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                id="firstName"
                type="text"
                placeholder="Enter your first name"
                className={`w-full h-10 px-3 py-2 border rounded-md ${
                  errors.firstName ? 'border-red-500' : 'border-gray-300'
                }`}
                {...register('firstName')}
              />
              {errors.firstName && (
                <p className="text-sm text-red-500">{errors.firstName.message as string}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="lastName" className="text-sm font-medium">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              id="lastName"
              type="text"
              placeholder="Enter your last name"
              className={`w-full h-10 px-3 py-2 border rounded-md ${
                errors.lastName ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('lastName')}
            />
            {errors.lastName && (
              <p className="text-sm text-red-500">{errors.lastName.message as string}</p>
            )}
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
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
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
                <input
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

          <div className="space-y-2">
            <label htmlFor="alternatePhone" className="text-sm font-medium">
              Alternate Phone Number{' '}
              <span className="text-gray-400 text-sm">(Optional)</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                id="alternatePhone"
                type="tel"
                placeholder="07XXX XXXXXX"
                className="w-full h-10 pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                {...register('alternatePhone')}
              />
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

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="houseNumber" className="text-sm font-medium">
                House Number/Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Home className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  id="houseNumber"
                  type="text"
                  placeholder="e.g., 123 or Apartment A"
                  className={`w-full h-10 pl-10 pr-3 py-2 border rounded-md ${
                    errors.houseNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                  {...register('houseNumber')}
                />
              </div>
              {errors.houseNumber && (
                <p className="text-sm text-red-500">{errors.houseNumber.message as string}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="street" className="text-sm font-medium">
                Street <span className="text-red-500">*</span>
              </label>
              <input
                id="street"
                type="text"
                placeholder="Street name"
                className={`w-full h-10 px-3 py-2 border rounded-md ${
                  errors.street ? 'border-red-500' : 'border-gray-300'
                }`}
                {...register('street')}
              />
              {errors.street && (
                <p className="text-sm text-red-500">{errors.street.message as string}</p>
              )}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="city" className="text-sm font-medium">
                City/Town <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  id="city"
                  type="text"
                  placeholder="City or town"
                  className={`w-full h-10 pl-10 pr-3 py-2 border rounded-md ${
                    errors.city ? 'border-red-500' : 'border-gray-300'
                  }`}
                  {...register('city')}
                />
              </div>
              {errors.city && (
                <p className="text-sm text-red-500">{errors.city.message as string}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="postcode" className="text-sm font-medium">
                Postcode <span className="text-red-500">*</span>
              </label>
              <input
                id="postcode"
                type="text"
                placeholder="e.g., SW1A 1AA"
                className={`w-full h-10 px-3 py-2 border rounded-md ${
                  errors.postcode ? 'border-red-500' : 'border-gray-300'
                }`}
                {...register('postcode')}
              />
              {errors.postcode && (
                <p className="text-sm text-red-500">{errors.postcode.message as string}</p>
              )}
            </div>
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

      {/* Preferences & Consent */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-2 pb-2">
            <Shield className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-gray-900">Preferences & Consent</h3>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium">Preferred Contact Method</label>
            <div className="grid gap-3 sm:grid-cols-3">
              {CONTACT_PREFERENCES.map((preference) => {
                const Icon = preference.icon;
                return (
                  <Card
                    key={preference.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      isPreferenceSelected(preference.id)
                        ? 'ring-2 ring-primary/50 border-primary/50 bg-primary/5'
                        : 'border-gray-200'
                    }`}
                    onClick={() => handleContactPreferenceToggle(preference.id)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center gap-3">
                        <Checkbox
                          id={preference.id}
                          checked={isPreferenceSelected(preference.id)}
                          onCheckedChange={() => handleContactPreferenceToggle(preference.id)}
                        />
                        <Icon className="h-4 w-4 text-gray-600" />
                        <label
                          htmlFor={preference.id}
                          className="cursor-pointer font-medium text-sm"
                        >
                          {preference.label}
                        </label>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
            <Checkbox
              id="marketingConsent"
              checked={marketingConsent}
              onCheckedChange={(checked: boolean) =>
                setValue('marketingConsent', checked, { shouldValidate: true })
              }
            />
            <div className="space-y-1 flex-1">
              <label htmlFor="marketingConsent" className="cursor-pointer font-medium text-sm">
                Keep me updated with offers and news
              </label>
              <p className="text-sm text-gray-600">
                Receive updates about new products, special offers, and design inspiration.
                You can unsubscribe at any time.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
            <Checkbox
              id="termsAccepted"
              {...register('termsAccepted')}
              className={errors.termsAccepted ? 'border-red-500' : ''}
            />
            <div className="space-y-1 flex-1">
              <label htmlFor="termsAccepted" className="cursor-pointer font-medium text-sm">
                I agree to the terms and conditions{' '}
                <span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-gray-600">
                By booking an appointment, you agree to our{' '}
                <a
                  href="/terms-conditions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
                >
                  Terms & Conditions
                </a>{' '}
                and{' '}
                <a
                  href="/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
                >
                  Privacy Policy
                </a>
                .
              </p>
              {errors.termsAccepted && (
                <p className="text-sm text-red-500">{errors.termsAccepted.message as string}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert>
        <InfoIcon className="h-4 w-4" />
        <AlertDescription>
          <strong>Please note:</strong> All appointments are subject to availability.
          We will contact you within 24 hours to confirm your booking.
        </AlertDescription>
      </Alert>
    </div>
  );
}