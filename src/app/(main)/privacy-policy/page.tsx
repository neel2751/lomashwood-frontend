import {
  Bell,
  BookOpen,
  Building2,
  Calendar,
  Camera,
  Cookie,
  Database,
  ExternalLink,
  FileText,
  Globe,
  Lock,
  Mail,
  Scale,
  Settings,
  Share2,
  Shield,
  UserCheck,
  Users,
} from 'lucide-react';
import type { Metadata } from 'next';

import { LegalPage } from '@/components/shared/LegalPage';
import type { LegalSection } from '@/components/shared/LegalPage';

export const metadata: Metadata = {
  title: 'Privacy Policy | Lomash Wood',
  description: 'Learn how Lomash Wood Ltd collects, uses and protects your personal information.',
  robots: 'noindex, nofollow',
};

const sections: LegalSection[] = [
  {
    id: 'introduction',
    title: 'Introduction',
    icon: BookOpen,
    blocks: [
      'This Privacy Policy explains how Lomash Wood Ltd ("Lomash Wood", "we", "us" or "our") collects, uses, shares and protects your personal information when you visit our website, contact us, visit our showroom, or place an Order with us.',
      'It should be read together with our Terms and Conditions of Sale. Under those Terms, we will use your personal information only as set out in this Privacy Policy.',
    ],
  },
  {
    id: 'who-we-are',
    title: 'Who We Are',
    icon: Building2,
    blocks: [
      'Lomash Wood Ltd is a company registered in England and Wales (Reg. No. 16308825), with its trading address at Unit 3B, Tonbridge Works, Tonbridge Rd, Harold Hill, Romford RM3 8TS.',
      'Lomash Wood Ltd is the data controller responsible for your personal information. If you have any questions about this policy or how we handle your information, please contact us at contact@lomashwood.com or on 01708 898 755.',
    ],
  },
  {
    id: 'information-we-collect',
    title: 'Information We Collect',
    icon: Database,
    blocks: [
      'Depending on how you deal with us, we may collect the following information:',
      {
        list: [
          'Contact details: your name, email address, telephone number, postcode and address.',
          'Enquiry and appointment details: the information you give us when you contact us, book a consultation, request a brochure, sign up to our newsletter or make a business enquiry.',
          'Order details: the Goods you order, your Order Form or Sales Agreement, quotations, drawings, plans and specifications, and the delivery and installation address.',
          'Site information: measurements, surveys and photographs of the property where the Goods are to be installed.',
          'Payment information: records of the deposit and instalments you pay to us and the payment method used.',
          'Account information: your login details and the appointments, orders and saved items linked to your account, if you create one.',
          'Aftercare information: details of any defect reports, guarantee claims, complaints and related photographs.',
          'Project images and feedback: images taken of your completed project and any written feedback you give us.',
          'Website information: technical information about your device and how you use our website, collected through cookies and similar technologies. See our Cookie Policy for details.',
        ],
      },
      'We collect most of this information directly from you. We do not knowingly collect special category (sensitive) personal information, and we ask that you do not send it to us.',
    ],
  },
  {
    id: 'how-we-use-your-information',
    title: 'How We Use Your Information',
    icon: Settings,
    blocks: [
      'We use your personal information to:',
      {
        list: [
          'Respond to your enquiries and arrange consultations, showroom visits and site measurement visits.',
          'Prepare designs, plans, specifications and quotations for you.',
          'Accept and acknowledge your Order, and manufacture, deliver and install your Goods.',
          'Take payment of your deposit and instalments and keep our accounting records.',
          'Deal with defect reports, snagging, guarantee claims, cancellations and complaints.',
          'Send you service messages about your Order, delivery and installation.',
          'Send you marketing communications where you have agreed to receive them.',
          'Operate, secure and improve our website and understand how it is used.',
          'Comply with our legal and regulatory obligations and protect our legal rights.',
        ],
      },
    ],
  },
  {
    id: 'lawful-bases',
    title: 'Our Lawful Bases for Processing',
    icon: Scale,
    blocks: [
      'Under UK data protection law, we must have a lawful basis for using your personal information. We rely on the following:',
      {
        list: [
          'Contract: where we need your information to take steps at your request before entering into a contract with you, or to perform our contract with you (for example, to design, deliver and install your Goods).',
          'Legal obligation: where we need to keep or disclose information to comply with the law, such as tax and accounting rules.',
          'Legitimate interests: where it is necessary for running and improving our business, keeping our website secure, handling claims and using images of completed projects for promotion, and where these interests are not overridden by your rights.',
          'Consent: where you have agreed, for example to receive marketing emails or to the use of non-essential cookies. You can withdraw your consent at any time.',
        ],
      },
    ],
  },
  {
    id: 'project-images-and-feedback',
    title: 'Project Images and Feedback',
    icon: Camera,
    blocks: [
      'As set out in our Terms and Conditions of Sale, images taken of your project may be used by us for bona fide promotional or marketing purposes, such as on our website, in brochures and in other promotional materials. Written feedback you give us may be used in the same way.',
      'The use of such images will not include any reference to the name or address associated with the project.',
      'If you wish to withdraw permission for the use of these images, please inform us in writing at contact@lomashwood.com.',
    ],
  },
  {
    id: 'sharing-your-information',
    title: 'Who We Share Your Information With',
    icon: Share2,
    blocks: [
      'We do not sell your personal information. We share it only where necessary, with:',
      {
        list: [
          'Delivery agents, builders, fitters and other subcontractors who deliver and install your Goods.',
          'Payment providers and banks that process your card payments.',
          'Suppliers and manufacturers, where needed to fulfil your Order or deal with a guarantee claim.',
          'IT, website hosting, email and analytics or advertising service providers who support our business.',
          'Professional advisers, insurers and mediators, where needed to obtain advice or resolve a dispute.',
          'Regulators, courts, law enforcement or other authorities, where we are required to do so by law.',
          'Another organisation, if we assign our rights or delegate our obligations under a contract with you, or if our business is sold or reorganised.',
        ],
      },
      'We ask those we share your information with to use it only for the purpose for which it was shared and to keep it secure.',
    ],
  },
  {
    id: 'international-transfers',
    title: 'International Transfers',
    icon: Globe,
    blocks: [
      'Some of our service providers may process personal information outside the United Kingdom. Where this happens, we take steps to make sure your information is protected by appropriate safeguards, such as UK adequacy regulations or approved contractual clauses.',
    ],
  },
  {
    id: 'data-retention',
    title: 'How Long We Keep Your Information',
    icon: Calendar,
    blocks: [
      'We keep your personal information only for as long as we need it for the purposes set out in this policy.',
      {
        list: [
          'Enquiries that do not lead to an Order are kept for a limited period so that we can follow up with you.',
          'Order, payment and contract records are kept for the length of your guarantee period and for as long as we are required to keep them for legal, tax and accounting purposes, which is generally six years.',
          'Marketing details are kept until you unsubscribe or ask us to stop.',
        ],
      },
      'When we no longer need your information, we securely delete or anonymise it.',
    ],
  },
  {
    id: 'data-security',
    title: 'How We Protect Your Information',
    icon: Lock,
    blocks: [
      'We use appropriate technical and organisational measures to protect your personal information against loss, misuse and unauthorised access, and we limit access to those who need it to do their job.',
      'No method of transmission over the internet is completely secure, so we cannot guarantee absolute security. If you believe your information has been compromised, please contact us straight away.',
    ],
  },
  {
    id: 'your-rights',
    title: 'Your Rights',
    icon: UserCheck,
    blocks: [
      'Under UK data protection law, you have the right to:',
      {
        list: [
          'Ask for a copy of the personal information we hold about you.',
          'Ask us to correct information that is inaccurate or incomplete.',
          'Ask us to delete your information, where we have no good reason to keep it.',
          'Ask us to restrict how we use your information, or object to our use of it.',
          'Ask us to transfer your information to you or another organisation.',
          'Withdraw your consent at any time, where we rely on consent.',
        ],
      },
      'To exercise any of these rights, please contact us at contact@lomashwood.com. We will respond within one month.',
      'If you are unhappy with how we have handled your information, please contact us first so we can try to put things right. You also have the right to complain to the Information Commissioner\'s Office (ICO) at ico.org.uk or on 0303 123 1113.',
    ],
  },
  {
    id: 'marketing',
    title: 'Marketing',
    icon: Bell,
    blocks: [
      'We will only send you marketing emails where you have asked to receive them or where the law otherwise allows us to. You can opt out at any time by using the unsubscribe link in our emails or by contacting us at contact@lomashwood.com.',
      'If you opt out of marketing, we will still send you messages about your Order, delivery and installation.',
    ],
  },
  {
    id: 'cookies',
    title: 'Cookies',
    icon: Cookie,
    blocks: [
      'Our website uses cookies and similar technologies. For details of what we use and how you can control them, please see our Cookie Policy.',
    ],
  },
  {
    id: 'children',
    title: "Children's Privacy",
    icon: Users,
    blocks: [
      'Our products and services are not directed at anyone under the age of 18, and we do not knowingly collect personal information from children.',
    ],
  },
  {
    id: 'third-party-links',
    title: 'Third-Party Links',
    icon: ExternalLink,
    blocks: [
      'Our website contains links to other websites, such as social media pages and map services. We are not responsible for the privacy practices of those websites, and we encourage you to read their privacy policies.',
    ],
  },
  {
    id: 'changes',
    title: 'Changes to This Policy',
    icon: FileText,
    blocks: [
      'We may update this Privacy Policy from time to time. The latest version will always be available on this page, with the date it was last updated shown at the top.',
    ],
  },
  {
    id: 'contact-us',
    title: 'Contact Us',
    icon: Mail,
    blocks: [
      'If you have any questions about this Privacy Policy or your personal information, please contact us:',
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

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="Your privacy is important to us. This policy explains how Lomash Wood Ltd collects, uses and protects your personal information."
      icon={Shield}
      accent="blue"
      lastUpdated="12 October 2026"
      sections={sections}
      relatedLinks={[
        { title: 'Terms & Conditions', href: '/terms-conditions', icon: FileText },
        { title: 'Cookie Policy', href: '/cookies', icon: Cookie },
      ]}
      contactTitle="Questions About Your Privacy?"
    />
  );
}
