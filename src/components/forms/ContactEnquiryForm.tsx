'use client';

import { CheckCircle2 } from 'lucide-react';
import { useState, type FormEvent, type ReactNode } from 'react';

import { API_BASE_URL } from '@/config/api';

export function ContactEnquiryForm({ children }: { children: ReactNode }) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const field = (name: string) => String(formData.get(name) ?? '').trim();

    setSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: field('firstName'),
          lastName: field('lastName'),
          email: field('email'),
          phone: field('phone'),
          company: field('company'),
          inquiryType: field('inquiryType'),
          subject: field('subject'),
          message: field('message'),
          consent: formData.get('consent') === 'on',
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.message || 'Something went wrong. Please try again.');
      }

      setSubmitted(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error && error.message !== 'Failed to fetch'
          ? error.message
          : 'We could not send your message. Please check your connection and try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div role="status" className="py-10 text-center">
        <div className="w-14 h-14 rounded-full bg-lomash-primary/10 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-7 h-7 text-lomash-primary" />
        </div>
        <h3 className="font-heading text-xl font-bold text-lomash-dark mb-2">
          Thank you for your message
        </h3>
        <p className="text-lomash-gray-600 text-sm mb-6">
          We have received your enquiry and will get back to you within 24 hours.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="text-lomash-secondary text-sm font-semibold underline hover:text-lomash-primary"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} aria-busy={submitting}>
      <fieldset disabled={submitting} className="space-y-5 disabled:opacity-60">
        {children}
        {submitError && (
          <p role="alert" className="text-red-500 text-sm">
            {submitError}
          </p>
        )}
      </fieldset>
    </form>
  );
}
