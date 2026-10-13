import {
  BarChart3,
  BookOpen,
  Building2,
  Cookie,
  ExternalLink,
  FileText,
  Lock,
  Mail,
  Settings,
  Shield,
  Target,
} from 'lucide-react';
import type { Metadata } from 'next';

import { LegalPage } from '@/components/shared/LegalPage';
import type { LegalSection } from '@/components/shared/LegalPage';

export const metadata: Metadata = {
  title: 'Cookie Policy | Lomash Wood',
  description: 'Learn how Lomash Wood Ltd uses cookies and similar technologies on its website.',
  robots: 'noindex, nofollow',
};

const sections: LegalSection[] = [
  {
    id: 'introduction',
    title: 'Introduction',
    icon: BookOpen,
    blocks: [
      'This Cookie Policy explains how Lomash Wood Ltd ("Lomash Wood", "we", "us" or "our") uses cookies and similar technologies on our website, and the choices you have.',
      'It should be read together with our Privacy Policy, which explains how we use your personal information.',
    ],
  },
  {
    id: 'who-we-are',
    title: 'Who We Are',
    icon: Building2,
    blocks: [
      'Lomash Wood Ltd is a company registered in England and Wales (Reg. No. 16308825), with its trading address at Unit 3B, Tonbridge Works, Tonbridge Rd, Harold Hill, Romford RM3 8TS.',
    ],
  },
  {
    id: 'what-are-cookies',
    title: 'What Are Cookies?',
    icon: Cookie,
    blocks: [
      'Cookies are small text files that a website places on your computer, phone or tablet when you visit it. They allow the website to recognise your device and remember information about your visit.',
      'We also use similar technologies, such as local storage in your browser and pixels. In this policy we refer to all of these as "cookies".',
      'Session cookies are deleted when you close your browser. Persistent cookies stay on your device for a set period or until you delete them.',
    ],
  },
  {
    id: 'strictly-necessary-cookies',
    title: 'Strictly Necessary Cookies',
    icon: Lock,
    blocks: [
      'These cookies are needed for our website to work and cannot be switched off in our systems. They are only set when you use features that need them, such as signing in to your account.',
      {
        list: [
          'auth_token: keeps you signed in to your account and protects account pages.',
          'refresh_token: renews your sign-in securely so you do not have to log in again on every visit.',
          'remember_me: remembers that you asked us to keep you signed in on this device.',
          'cookie-consent: remembers the cookie choices you made in our cookie banner.',
        ],
      },
    ],
  },
  {
    id: 'analytics-cookies',
    title: 'Analytics Cookies',
    icon: BarChart3,
    blocks: [
      'Analytics cookies help us understand how visitors use our website, for example which pages are visited most often, so that we can improve it. The information is collected in a way that does not directly identify you. We only use these cookies if you allow them in our cookie banner.',
      {
        list: [
          'Google Analytics (_ga, _ga_*): where enabled, these cookies distinguish visitors and count page views. They last for up to two years.',
        ],
      },
    ],
  },
  {
    id: 'marketing-cookies',
    title: 'Marketing Cookies',
    icon: Target,
    blocks: [
      'Marketing cookies are used to measure how well our advertising works and to show you adverts that are more relevant to you on other platforms. We only use these cookies if you allow them in our cookie banner.',
      {
        list: [
          'Meta Pixel (_fbp): set by Meta (Facebook and Instagram) to record visits to our website so that we can measure and improve our advertising on those platforms. It lasts for around three months.',
        ],
      },
      'Meta may combine this information with other information it holds about you. Please see Meta\'s own privacy and cookie policies for details.',
    ],
  },
  {
    id: 'third-party-websites',
    title: 'Third-Party Websites',
    icon: ExternalLink,
    blocks: [
      'Our website contains links to other websites, such as our social media pages and Google Maps for directions to our showroom. Those websites set their own cookies, which we do not control. Please check their cookie policies for more information.',
    ],
  },
  {
    id: 'managing-cookies',
    title: 'How to Manage Cookies',
    icon: Settings,
    blocks: [
      'When you first visit our website, our cookie banner lets you accept all cookies, reject the optional ones, or choose which types to allow. You can change your choice at any time using the Cookie Settings link at the bottom of every page.',
      'You can also control and delete cookies through your browser settings. Most browsers let you block all cookies, block third-party cookies only, or clear cookies when you close the browser. Your browser\'s help pages explain how to do this.',
      {
        list: [
          'Google Analytics: you can opt out on all websites by installing the Google Analytics opt-out browser add-on, available at tools.google.com/dlpage/gaoptout.',
          'Meta: you can manage how Meta uses your information for advertising in your Facebook or Instagram ad preferences.',
        ],
      },
      'If you block strictly necessary cookies, some parts of our website, such as signing in to your account, will not work.',
    ],
  },
  {
    id: 'changes',
    title: 'Changes to This Policy',
    icon: FileText,
    blocks: [
      'We may update this Cookie Policy from time to time, for example if we change the cookies we use. The latest version will always be available on this page, with the date it was last updated shown at the top.',
    ],
  },
  {
    id: 'contact-us',
    title: 'Contact Us',
    icon: Mail,
    blocks: [
      'If you have any questions about how we use cookies, please contact us:',
      {
        list: [
          'Email: contact@lomashwood.com',
          'Telephone: 01708 898 755',
          'Post: Lomash Wood Ltd, Unit 3B, Tonbridge Works, Tonbridge Rd, Harold Hill, Romford RM3 8TS',
        ],
      },
    ],
  },
];

export default function CookiesPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      intro="This policy explains what cookies are, how Lomash Wood Ltd uses them on this website, and how you can manage them."
      icon={Cookie}
      accent="orange"
      lastUpdated="12 October 2026"
      sections={sections}
      relatedLinks={[
        { title: 'Privacy Policy', href: '/privacy-policy', icon: Shield },
        { title: 'Terms & Conditions', href: '/terms-conditions', icon: FileText },
      ]}
      contactTitle="Questions About Cookies?"
    />
  );
}
