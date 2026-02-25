import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Create Account | Lomash Wood',
  description: 'Create your Lomash Wood account to book consultations, save designs, and track your orders.',
  robots: {
    index: false,
    follow: false,
  },
};

function RegisterForm() {
  return (
    <form className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="firstName" className="text-sm font-medium text-stone-700">
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            placeholder="John"
            className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="lastName" className="text-sm font-medium text-stone-700">
            Last Name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            placeholder="Doe"
            className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-stone-700">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="phone" className="text-sm font-medium text-stone-700">
          Phone Number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          placeholder="+91 123 456 7890"
          className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium text-stone-700">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          placeholder="••••••••"
          className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
        />
        <p className="text-xs text-stone-500 mt-1">
          Must be at least 8 characters with uppercase, lowercase, and numbers
        </p>
      </div>

      <div className="space-y-2">
        <label htmlFor="confirmPassword" className="text-sm font-medium text-stone-700">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          placeholder="••••••••"
          className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
        />
      </div>

      <div className="flex items-start gap-2">
        <input
          id="terms"
          name="terms"
          type="checkbox"
          required
          className="mt-1 h-4 w-4 rounded border-stone-300 text-amber-700 focus:ring-amber-500"
        />
        <label htmlFor="terms" className="text-sm text-stone-600">
          I agree to the{' '}
          <Link href="/terms" className="text-amber-700 hover:text-amber-800 underline">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="text-amber-700 hover:text-amber-800 underline">
            Privacy Policy
          </Link>
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-amber-700 hover:bg-amber-800 text-white font-medium py-2.5 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
      >
        Create Account
      </button>
    </form>
  );
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-50 via-amber-50/30 to-stone-100 px-4 py-12">
      <div className="w-full max-w-2xl">
        <Card className="shadow-lg border-stone-200">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-3xl font-bold text-stone-900">
              Create Your Account
            </CardTitle>
            <CardDescription className="text-stone-600">
              Join Lomash Wood to access exclusive features and personalized design services
            </CardDescription>
          </CardHeader>

          <CardContent>
            <RegisterForm />

            <div className="mt-6 pt-6 border-t border-stone-200">
              <p className="text-sm text-center text-stone-600">
                Already have an account?{' '}
                <Link href="/login" className="font-medium text-amber-700 hover:text-amber-800 transition-colors">
                  Sign in
                </Link>
              </p>
            </div>

            <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-100">
              <p className="text-xs text-stone-600 text-center">
                <strong>Need assistance?</strong> Contact us at{' '}
                <Link href="mailto:support@lomashwood.com" className="text-amber-700 hover:text-amber-800 underline">
                  support@lomashwood.com
                </Link>{' '}
                or call{' '}
                <Link href="tel:+911234567890" className="text-amber-700 hover:text-amber-800 underline">
                  +91 123 456 7890
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}