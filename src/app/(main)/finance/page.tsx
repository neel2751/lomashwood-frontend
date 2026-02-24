'use client';
import { Calculator, CreditCard, FileText, CheckCircle2, BadgePercent, Clock, ShieldCheck, HelpCircle } from 'lucide-react';
import Link from 'next/link';

import ApplyForm from '@/components/finance/ApplyForm';
import EMICalculator from '@/components/finance/EMICalculator';
import FinanceComparison from '@/components/finance/FinanceComparison';
import FinanceOptions from '@/components/finance/FinanceOptions';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';


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

const financeOptionsData = [
  {
    id: '1',
    name: '0% APR Finance',
    provider: 'Lomash Finance',
    logo: undefined,
    description: 'Interest-free credit for 12 months on purchases over £1,00,000. No hidden charges, flexible payment options.',
    interestRate: 0,
    processingFee: 0,
    minAmount: 100000,
    maxAmount: 5000000,
    minTenure: 6,
    maxTenure: 12,
    features: [
      'Zero interest for 12 months',
      'No hidden charges or processing fees',
      'Quick online application process',
      'Instant approval decision',
      'Flexible payment options',
      'No prepayment penalties',
    ],
    eligibility: [
      'Age between 21-65 years',
      'Minimum monthly income £25,000',
      'Good credit score (700+)',
      'No recent bankruptcies or defaults',
      'Stable employment or business',
    ],
    documents: [
      'Last 3 months salary slips',
      'Last 6 months bank statements',
      'Address proof',
    ],
    processingTime: 'Instant to 24 hours',
    earlyPayment: true,
    partPayment: true,
    preApproved: false,
    rating: 4.5,
    featured: true,
    popular: false,
  },
  {
    id: '2',
    name: 'Low-Rate Finance',
    provider: 'Clearpay Finance',
    logo: undefined,
    description: 'Competitive interest rates starting from 9.99% p.a. with flexible tenure options up to 5 years.',
    interestRate: 9.99,
    processingFee: 2,
    minAmount: 50000,
    maxAmount: 10000000,
    minTenure: 6,
    maxTenure: 60,
    features: [
      'Competitive interest rates from 9.99%',
      'Tenure up to 5 years',
      'No prepayment charges',
      'Minimal documentation required',
      'Quick disbursal process',
      'Pre-approved offers available',
    ],
    eligibility: [
      'Age between 23-60 years',
      'Minimum monthly income £3,000',
      'Credit score above 650',
      'Stable employment history',
      'No history of loan defaults',
    ],
    documents: [
      'Identity proof',
      'Address proof',
      'Income proof (salary slips)',
      'Bank statements (6 months)',
    ],
    processingTime: '24-48 hours',
    earlyPayment: true,
    partPayment: true,
    preApproved: true,
    rating: 4.3,
    featured: false,
    popular: true,
  },
  {
    id: '3',
    name: 'Buy Now Pay Later',
    provider: 'Klarna',
    logo: undefined,
    description: 'Defer your payment by 3-6 months with zero interest. Perfect for immediate needs with delayed payment.',
    interestRate: 0,
    processingFee: 1,
    minAmount: 25000,
    maxAmount: 2000000,
    minTenure: 3,
    maxTenure: 6,
    features: [
      'No payment for first 3-6 months',
      'Zero interest if paid in full',
      'Simple application process',
      'Instant approval for existing customers',
      'Digital process - no paperwork',
    ],
    eligibility: [
      'Age 21+ years',
      'Minimum monthly income £2,000',
      'Good credit history',
      'Regular income source',
    ],
    documents: [
      'Identity proof',
      'Address proof',
      'Bank statements (3 months)',
      'Proof of income (salary slips)',
    ],
    processingTime: '2-4 hours',
    earlyPayment: true,
    partPayment: false,
    preApproved: true,
    rating: 4.2,
    featured: false,
    popular: true,
  },
  {
    id: '4',
    name: 'EMI on Credit Card',
    provider: 'Multiple Banks',
    logo: undefined,
    description: 'Convert your purchase into easy EMIs using your existing credit card. Available across all major banks.',
    interestRate: 12.5,
    processingFee: 0,
    minAmount: 10000,
    maxAmount: 3000000,
    minTenure: 3,
    maxTenure: 24,
    features: [
      'Use existing credit card',
      'No additional documentation',
      'Tenure from 3 to 24 months',
      'Instant conversion',
      'Available on most credit cards',
    ],
    eligibility: [
      'Valid credit card holder',
      'Sufficient credit limit',
      'Good payment history',
      'Age 21-60 years',
    ],
    documents: [
      'Credit card details',
      'Identity proof',
      'No additional documents required',
    ],
    processingTime: 'Instant',
    earlyPayment: true,
    partPayment: true,
    preApproved: true,
    rating: 4.0,
    featured: false,
    popular: false,
  },
];

export default function FinancePage() {
  const handleApply = async (optionId: string) => {
    console.log('Applying for finance option:', optionId);
    const formSection = document.getElementById('application-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCalculate = (_optionId: string) => {
    const calculatorTab = document.querySelector('[value="calculator"]');
    if (calculatorTab) {
      (calculatorTab as HTMLElement).click();

      setTimeout(() => {
        const tabsSection = document.getElementById('finance-tabs');
        if (tabsSection) {
          tabsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const handleFormSubmit = async (data: any) => {
    // Here you would typically send the data to your backend API for processing
    console.log('Finance application submitted:', data);
      alert('Your finance application has been submitted successfully! Our team will review your application and get back to you within 24-48 hours.');
  };

  const handleEMIApply = (details: any) => {
    
    console.log('Apply with EMI details:', details);

    const formSection = document.getElementById('application-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
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
                  const calculatorTab = document.querySelector('[value="calculator"]');
                  if (calculatorTab) {
                    (calculatorTab as HTMLElement).click();
                    setTimeout(() => {
                      const tabsSection = document.getElementById('finance-tabs');
                      if (tabsSection) {
                        tabsSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }, 100);
                  }
                }}
              >
                <Calculator className="mr-2 h-5 w-5" />
                Calculate EMI
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg bg-white text-primary-600 hover:bg-lomash-primary hover:text-white shadow-md hover:shadow-lg"
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

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-18">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-4">
                  <feature.icon className="h-8 w-8 text-lomash-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-neutral-600 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Finance Options Tabs */}
      <section id="finance-tabs" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Choose Your Finance Plan
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Select the finance option that best suits your budget and requirements
            </p>
          </div>

          <Tabs defaultValue="calculator" className="max-w-6xl mx-auto">
             <TabsList className="flex justify-center gap-2 bg-lomash-light backdrop-blur-md py-7 px-1 max-w-max mx-auto rounded-2xl border border-lomash-dark/20 mb-10">
              <TabsTrigger 
               className="flex items-center gap-2 rounded-xl px-4 py-3 text-base font-semibold text-muted-foreground data-[state=active]:bg-lomash-primary data-[state=active]:text-white"
              value="calculator">EMI Calculator</TabsTrigger>
              <TabsTrigger 
                className="flex items-center gap-2 rounded-xl px-4 py-3 text-base font-semibold text-muted-foreground data-[state=active]:bg-lomash-primary data-[state=active]:text-white"
              value="options">Finance Options</TabsTrigger>
              <TabsTrigger 
                className="flex items-center gap-2 rounded-xl px-4 py-3 text-base font-semibold text-muted-foreground data-[state=active]:bg-lomash-primary data-[state=active]:text-white"
              value="compare">Compare Plans</TabsTrigger>
            </TabsList>

            <TabsContent value="calculator">
              <EMICalculator 
                defaultAmount={5000}
                defaultRate={3.5}
                defaultTenure={24}
                minAmount={5000}
                maxAmount={50000}
                minRate={0.5}
                maxRate={18}
                minTenure={2}
                maxTenure={60}
                onApply={handleEMIApply}
              />
            </TabsContent>

            <TabsContent value="options">
              <FinanceOptions 
                options={financeOptionsData}
                onApply={handleApply}
                onCalculate={handleCalculate}
                showComparison={true}
              />
            </TabsContent>

            <TabsContent value="compare">
              <FinanceComparison 
                options={financeOptionsData}
                maxCompare={4}
                defaultSelected={['1', '2']}
                onApply={handleApply}
              />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              How to Apply
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Our simple 4-step process makes financing your dream space easy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-lomash-primary text-white text-2xl font-bold mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    {step.description}
                  </p>
                </div>
                {/* {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-neutral-200 -z-10">
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full bg-lomash-primary">
                    </div>
                  </div>
                )} */}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              size="lg"
              className='bg-lomash-primary hover:bg-lomash-secondary
              px-8 py-4 text-lg font-semibold
               text-white shadow-md hover:shadow-lg rounded-full'
              onClick={() => {
                const formSection = document.getElementById('application-form');
                if (formSection) {
                  formSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <FileText className="mr-2 h-5 w-5" />
              Start Your Application
            </Button>
          </div>
        </div>
      </section>

      {/* Apply Form Section */}
      <section id="application-form" className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                Apply for Finance
              </h2>
              <p className="text-lg text-neutral-600">
                Complete the form below to get started with your finance application
              </p>
            </div>

            <ApplyForm 
              onSubmit={handleFormSubmit}
            />
          </div>
        </div>
      </section>

      {/* Representative Example */}
      <section className="py-12 bg-lomash-light">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold mb-4">
              Representative Example
            </h3>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <p className="text-sm text-neutral-600 mb-4">
                If you borrow £4,50,000 over 36 months at a representative APR of 9.9%, you would make 36 monthly payments of £14,420. The total amount payable would be £5,69,120.
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-lomash-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Amount of credit: £4,50,000</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-lomash-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Representative APR: 9.9%</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-lomash-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>36 monthly payments of £14,420</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-lomash-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Total amount payable: £5,69,120</span>
                </li>
              </ul>
              <p className="text-xs text-neutral-500 mt-4">
                This is a representative example. The rate you are offered will depend on your individual circumstances.
                Finance is subject to status and available to UK residents aged 18 or over. Minimum income requirements apply. See full terms and conditions on our website.
                <Link href="/finance/terms" className="text-lomash-primary hover:underline"> Read more</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
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
                  <AccordionTrigger className={`
                  text-left text-xl text-lomash-dark font-semibold hover:text-lomash-primary
                  data-[state=open]:text-lomash-primary
                  `}>
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

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-lomash-primary to-lomash-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
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
                if (formSection) {
                  formSection.scrollIntoView({ behavior: 'smooth' });
                }
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