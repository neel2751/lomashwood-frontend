import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Forgot Password | Lomash Wood',
  description: 'Reset your Lomash Wood account password. Enter your email to receive password reset instructions.',
  robots: {
    index: false,
    follow: false,
  },
};

function ForgotPasswordForm() {
  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-stone-700">
          Email address
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

      <button
        type="submit"
        className="w-full bg-amber-700 hover:bg-amber-800 text-white font-medium py-2.5 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
      >
        Send Reset Link
      </button>

      <p className="text-xs text-center text-stone-500 mt-3">
        We'll send you an email with a link to reset your password
      </p>
    </form>
  );
}

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-50 via-amber-50/30 to-stone-100 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Back to Login Link */}
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-sm text-stone-600 hover:text-stone-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to login
        </Link>

        <Card className="shadow-lg border-stone-200">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold text-stone-900">
              Forgot Password?
            </CardTitle>
            <CardDescription className="text-stone-600">
              No worries! Enter your email address and we'll send you instructions to reset your password.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <ForgotPasswordForm />

            {/* Additional Help */}
            <div className="mt-6 pt-6 border-t border-stone-200">
              <p className="text-sm text-center text-stone-600">
                Remember your password?{' '}
                <Link
                  href="/login"
                  className="font-medium text-amber-700 hover:text-amber-800 transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>

            {/* Support Information */}
            <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-100">
              <p className="text-xs text-stone-600 text-center">
                <strong>Need help?</strong> Contact our support team at{' '}
                
                  href="mailto:contact@lomashwood.com"
                  className="text-amber-700 hover:text-amber-800 underline"
                  contact@lomashwood.com
                <a>{' '}
                or call{' '}
                
                  href="tel:01708898755"
                  className="text-amber-700 hover:text-amber-800 underline"
                  01708 898 755
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Security Note */}
        <div className="mt-6 text-center">
          <p className="text-xs text-stone-500">
            For your security, password reset links expire after 1 hour.
          </p>
        </div>
      </div>
    </div>
  );
}