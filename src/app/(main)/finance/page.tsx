'use client';
import { FileText, BadgePercent, Clock, CreditCard, ShieldCheck, HelpCircle } from 'lucide-react';

import ApplyForm from '@/components/finance/ApplyForm';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: BadgePercent,
    title: '0% Interest Available',
    description: '0% APR available on selected purchases over 12 months',
  },
  {
    icon: Clock,
    title: 'Quick Approval',
    description: 'Get instant decisions in minutes with our simple online application',
  },
  {
    icon: CreditCard,
    title: 'Flexible Terms',
    description: 'Choose from 6, 12, 24, or 36-month payment plans',
  },
  {
    icon: ShieldCheck,
    title: 'Secure & Safe',
    description: 'FCA regulated finance partners for your peace of mind',
  },
];

const steps = [
  {
    number: '01',
    title: 'Choose Your Design',
    description: 'Select your perfect kitchen or bedroom design from our extensive range',
  },
  {
    number: '02',
    title: 'Get a Quote',
    description: 'Receive a detailed quote including all costs and available finance options',
  },
  {
    number: '03',
    title: 'Apply for Finance',
    description: 'Complete our quick and easy online application form',
  },
  {
    number: '04',
    title: 'Get Approved',
    description: 'Receive an instant decision and complete your purchase',
  },
];

const faqs = [
  {
    question: 'What finance options are available?',
    answer: 'We offer a range of finance options including 0% APR for 12 months, low-rate finance for 24-36 months, and Buy Now Pay Later options. All subject to status and minimum purchase amounts.',
  },
  {
    question: 'How do I apply for finance?',
    answer: 'You can apply for finance online by filling out our simple application form. You\'ll need to provide basic personal and financial information. The process takes just a few minutes and you\'ll receive an instant decision.',
  },
  {
    question: 'What is the minimum purchase amount?',
    answer: 'The minimum purchase amount varies by finance option. Typically, 0% finance requires a minimum purchase of £1,00,000, while other options may have lower minimums starting from £50,000.',
  },
  {
    question: 'Will applying affect my credit score?',
    answer: 'Initially, we perform a soft credit check which doesn\'t affect your credit score. Only when you proceed with a full application will a hard credit check be performed, which may have a small impact on your credit score.',
  },
  {
    question: 'Can I pay off my finance early?',
    answer: 'Yes, you can pay off your finance early without any penalties. This may also reduce the total amount of interest you pay.',
  },
  {
    question: 'What if I\'m not approved?',
    answer: 'If your application is not approved, we can discuss alternative payment options. You can also reapply after improving your credit score or consider a joint application with a co-applicant.',
  },
  {
    question: 'How long does approval take?',
    answer: 'Most applications receive an instant decision within minutes. In some cases, additional verification may be required which can take up to 24 hours.',
  },
  {
    question: 'What documents do I need?',
    answer: 'You\'ll need proof of identity, proof of address (utility bill or bank statement), and proof of income (recent salary slips or bank statements).',
  },
];

export default function FinancePage() {
  const handleFormSubmit = async (data: any) => {
    console.log('Form submitted with data:', data);
  };

  return (
    <div className="min-h-screen bg-neutral-50">

      {/* ── Hero Section ── */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Flexible Finance Options
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8">
              Make your dream kitchen or bedroom a reality with our competitive finance packages
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg bg-lomash-primary text-white hover:bg-lomash-secondary shadow-md hover:shadow-lg"
                onClick={() => {
                  const formSection = document.getElementById('application-form');
                  if (formSection) {
                    formSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <FileText className="mr-2 h-5 w-5" />
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features Section ── */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-18">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-4">
                  <feature.icon className="h-8 w-8 text-lomash-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-neutral-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Application Process ── */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">How to Apply</h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Our simple 4-step process makes financing your dream space easy
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-lomash-primary text-white text-2xl font-bold mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">{step.title}</h3>
                <p className="text-neutral-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button
              size="lg"
              className="bg-lomash-primary hover:bg-lomash-secondary px-8 py-4 text-lg font-semibold text-white shadow-md hover:shadow-lg rounded-full"
              onClick={() => {
                const formSection = document.getElementById('application-form');
                if (formSection) formSection.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <FileText className="mr-2 h-5 w-5" />
              Start Your Application
            </Button>
          </div>
        </div>
      </section>

      {/* ── Apply Form ── */}
      <section id="application-form" className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Apply for Finance</h2>
              <p className="text-lg text-neutral-600">
                Complete the form below to get started with your finance application
              </p>
            </div>
            <ApplyForm onSubmit={handleFormSubmit} />
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <HelpCircle className="h-12 w-12 text-lomash-primary mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-neutral-600">
                Find answers to common questions about our finance options
              </p>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-xl text-lomash-dark font-semibold hover:text-lomash-primary data-[state=open]:text-lomash-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-lg font-medium text-neutral-700">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="py-16 bg-gradient-to-br from-lomash-primary to-lomash-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-lomash-primary-100 mb-8 max-w-2xl mx-auto">
            Speak to our finance experts today or start your online application
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="text-lg bg-white text-lomash-primary hover:bg-lomash-primary hover:text-white shadow-md hover:shadow-lg font-semibold"
              onClick={() => window.location.href = 'tel:+919876543210'}
            >
              Call +91 98765 43210
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg bg-transparent border-white text-white hover:bg-white hover:text-lomash-primary shadow-md hover:shadow-lg"
              onClick={() => {
                const formSection = document.getElementById('application-form');
                if (formSection) formSection.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Apply Online
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}