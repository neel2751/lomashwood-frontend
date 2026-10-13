import {
  AlertCircle,
  Award,
  BookOpen,
  Camera,
  ClipboardCheck,
  Clock,
  Cookie,
  FileText,
  Gavel,
  Handshake,
  Lock,
  Package,
  PoundSterling,
  Ruler,
  Scale,
  Search,
  ShieldCheck,
  Truck,
  Umbrella,
  UserCheck,
  Users,
  Wrench,
  XCircle,
  Zap,
} from 'lucide-react';
import type { Metadata } from 'next';

import { LegalPage } from '@/components/shared/LegalPage';
import type { LegalSection } from '@/components/shared/LegalPage';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Lomash Wood',
  description: 'Read the Terms and Conditions of Sale that apply to all contracts between Lomash Wood and the Client.',
  robots: 'noindex, nofollow',
};

const sections: LegalSection[] = [
  {
    id: 'introduction',
    title: 'Introduction',
    icon: BookOpen,
    blocks: [
      'These Terms and Conditions of Sale shall apply to all contracts between Lomash Wood and the Client.',
      'In these Terms and Conditions, the following definitions shall apply:-',
      {
        n: '(a)',
        text: '"The Client, you or your" shall mean the individual(s) named in the Order Form/ Sales Agreement.',
      },
      {
        n: '(b)',
        text: '"Lomash Wood, us, we or suppliers" shall mean Lomash Wood Ltd, as named and whose contact details are set out in the Order Form/ Sales Agreement.',
      },
      {
        n: '(c)',
        text: '"The Goods" shall mean the furniture, domestic appliances and accessories specified in the drawing(s)/plan(s), specification and quotation.',
      },
      {
        n: '(c)',
        text: '“Order” shall mean your order for the Goods as summarised in the Order Form/ Sales Agreement/ Online order and confirmed by us in the Acknowledgement Receipt.',
      },
      {
        n: '(d)',
        text: '“Order Form” is the document summarising your Order to which these terms and conditions are attached.',
      },
      {
        n: '(e) (f)',
        text: '“Sales Agreement” is the document signed by the parties as the agreement.',
      },
      'Lomash Wood Ltd, a company registered in England and Wales (Reg. No. 16308825), with its Trading address at Unit 3B, Tonbridge Works, Tonbridge Rd, Harold Hill, Romford RM3 8TS',
      'The drawings, plans and specification sheets produced as part of and referred to in the Order Form/ Sales Agreement as part of this Contract, including the final design choice and drawings, which are what the Order Form/ Sales Agreement and prices will be based upon. You are deemed to understand and accept all the details contained in the final design drawings and specification when you sign the Order Form/ Sales Agreement.',
    ],
  },
  {
    id: 'acceptance-of-orders',
    title: 'Acceptance of Orders',
    icon: ClipboardCheck,
    blocks: [
      {
        n: '2.1.',
        text: 'All Orders placed by the Client will be accepted by Lomash Wood upon receipt of an Acknowledgement Receipt. The Contract shall only come into force when Lomash Wood issues the Acknowledgement Receipt.',
      },
      {
        n: '2.2.',
        text: 'All Sales Agreements shall come into force only upon being duly signed by both parties.',
      },
      {
        n: '2.3.',
        text: 'All Orders and Sales Agreements are subject to these Terms and Conditions of Sale. All other forms, conditions, warranties, guarantees and representations (express or implied, statutory or otherwise) are expressly excluded.',
      },
      {
        n: '2.4.',
        text: 'These Terms and Conditions of Sale are not capable of being varied, supplemented, qualified or interpreted by reference to any prior course of dealings between us unless agreed in writing by both of us.',
      },
      {
        n: '2.5.',
        text: 'Your statutory right to cancel this Contract within 14 days does not apply to any bespoke Goods, as they are made to your bespoke requirements.',
      },
      {
        n: '2.6.',
        text: 'We reserve the right not to accept your Order prior to issuing the Acknowledgement Receipt, but we will reimburse the deposit you have paid in such circumstances.',
      },
    ],
  },
  {
    id: 'design-and-planning',
    title: 'Design and Planning',
    icon: Ruler,
    blocks: [
      {
        n: '3.1.',
        text: "Upon the Client's request, the Supplier may arrange a site visit to take measurements required for the execution of the works or the supply of the Goods.",
      },
      {
        n: '3.2.',
        text: 'Any subsequent or additional measurement visits requested by the Client may be subject to additional charges, which shall be communicated to and approved by the Client prior to the visit.',
      },
      {
        n: '3.3.',
        text: 'Supplier is not responsible for any dimensional errors and/or omissions on any plans/drawings provided by Clients or builders.',
      },
      {
        n: '3.4.',
        text: 'For any dimensional errors arising from alterations to the site following the supplier visit, including but not limited to plastering, flooring, gas and electrical work, the supplier will accept no liability.',
      },
      {
        n: '3.5.',
        text: 'The Supplier reserves the right to impose additional charges for any dimensional changes or modifications requested by the Client after measurements have been confirmed or approved.',
      },
      {
        n: '3.6.',
        text: 'All plans, including the final plan used to prepare the Order Form/Sales Agreement, belong to us, and we own all intellectual property rights arising from the plans and specifications; therefore, you may not reproduce any of our plans or specifications without our consent.',
      },
      {
        n: '3.7.',
        text: 'All plans prepared for the purposes of your Order are for guidance only.',
      },
    ],
  },
  {
    id: 'price-and-payment',
    title: 'Price and Payment',
    icon: PoundSterling,
    blocks: [
      {
        n: '4.1.',
        text: 'All prices quoted are valid for 14 days or until earlier acceptance by the Purchaser.',
      },
      {
        n: '4.2.',
        text: 'All prices that are based on plans or measurements provided by the Purchaser may be subject to an increase in the event of any inaccuracies.',
      },
      {
        n: '4.3.',
        text: "Any changes to the agreed-upon plans and specifications may result in additional costs. The Seller will notify the Purchaser of the cost of any such changes before implementation, and the Purchaser agrees to pay such additional costs upon the Seller's presentation of the invoice.",
      },
      {
        n: '4.4.',
        text: 'Prices include VAT unless otherwise expressly stated.',
      },
      {
        n: '4.5.',
        text: 'Delivery costs are set out with these Goods prices.',
      },
      {
        n: '4.6.',
        text: 'Unless otherwise agreed, payment must be made before the delivery attempt. Payment must be made by UK Debit or Credit Card and cleared prior to delivery. We accept almost every UK-based debit or credit card. However, the Clients can make payment in Cash format if needed.',
      },
      {
        n: '4.7.',
        text: 'Terms of payment are 50% of the total cost with the order as a deposit.',
      },
      {
        n: '4.8.',
        text: 'The remaining 50% of the payment should be split into two instalments.',
      },
      {
        n: '4.9.',
        text: 'The first instalment of 30% must be paid just before delivery or on the day of installation.',
      },
      {
        n: '4.10.',
        text: 'The second instalment of the final 20% of the contract value must be paid upon completion of the installation of the Goods, but before handing over the project/ completion certificate/ Guarantee Certificate.',
      },
      {
        n: '4.11.',
        text: 'If you fail to pay the due amount by the agreed payment date, our delivery team or fitter may refuse to complete the project.',
      },
    ],
  },
  {
    id: 'delivery',
    title: 'Delivery',
    icon: Truck,
    blocks: [
      {
        n: '5.1.',
        text: 'Our delivery agent or we will deliver your Goods within the delivery date agreed at the time of order.',
      },
      {
        n: '5.2.',
        text: 'If delivery is affected by any factor which is beyond our control and cannot be guaranteed, we will let you know about the unexpected delay and rearrange a new delivery date upon agreement with you.',
      },
      {
        n: '5.3.',
        text: 'If you need to reschedule the delivery, you may contact us 7 days prior to the delivery date. We will deliver, subject to our mutual agreement on a suitable delivery date.',
      },
      {
        n: '5.4.',
        text: 'For a missing delivery deadline agreed in 5.3 for any Goods, you may cancel your order if any of the following apply:',
        sub: [
          { n: '5.4.1.', text: 'We have refused to deliver the Goods.' },
          {
            n: '5.4.2.',
            text: 'You told us before we accepted your order that delivery within the delivery deadline was essential.',
          },
        ],
      },
      {
        n: '5.5.',
        text: 'If delivery does not taken place due to your failure, the following terms will apply:',
        sub: [
          { n: '5.5.1.', text: 'We will store your Goods and may charge £20+VAT per day to cover expenses.' },
          { n: '5.5.2.', text: 'We shall have no liability for late delivery.' },
          { n: '5.5.3.', text: 'For a subsequent attempt at delivery, we will charge the standard delivery charge.' },
          {
            n: '5.5.4.',
            text: 'If you fail to accept delivery after our second attempt, we may dispose of part or all of the Goods with written notice.',
          },
        ],
      },
      {
        n: '5.6.',
        text: 'You must inspect Goods upon delivery. If you receive damaged Goods, you must report them to us within 48 hours of delivery and include images.',
      },
      {
        n: '5.7.',
        text: 'You are responsible for ensuring clear and safe access to the delivery address.',
      },
    ],
  },
  {
    id: 'inspection-defect-reporting-and-return',
    title: 'Inspection, Defect Reporting and Return',
    icon: Search,
    blocks: [
      {
        n: '6.1.',
        text: 'The Client shall inspect the Goods within 48 hours of delivery.',
      },
      {
        n: '6.2.',
        text: 'Notice of visible defects must be provided in writing within this period.',
      },
      {
        n: '6.3.',
        text: 'The following shall not constitute defects:',
        sub: [
          { n: '6.3.1.', text: 'Natural variations in timber, stone, or finishes' },
          { n: '6.3.2.', text: 'Minor dimensional tolerances consistent with bespoke manufacturing.' },
        ],
      },
      {
        n: '6.4.',
        text: 'If the Goods do not conform to the guarantees set out in any unlikely event:',
        sub: [
          {
            n: '6.4.1.',
            text: 'You give us written notice during the guarantee period, within a reasonable time of discovery, that some or all the Goods do not comply with the guarantee set out in condition 9.',
          },
          { n: '6.4.2.', text: 'We will ask for a reasonable opportunity to examine Goods.' },
          {
            n: '6.4.3.',
            text: 'You will return such Goods to us at our cost (if asked to do so by us). We shall repair or replace the defective Goods',
          },
        ],
      },
      {
        n: '6.5.',
        text: 'We shall not be liable for the Goods failure to comply with the guaranty set out in condition 9 in any of the following events:',
        sub: [
          {
            n: '6.5.1.',
            text: 'You make any further use of such Goods after giving notice in accordance with condition',
          },
          { n: '6.5.2.', text: 'If the defect arises from third party fitter/installer.' },
          {
            n: '6.5.3.',
            text: 'The defect arises because of our following any drawing, design or specification supplied by you.',
          },
          { n: '6.5.4.', text: 'You alter or repair such Goods without our consent.' },
          { n: '6.5.5.', text: 'The defect arises from willful damage, tear, negligence or abnormal storage.' },
        ],
      },
    ],
  },
  {
    id: 'installation',
    title: 'Installation',
    icon: Wrench,
    blocks: [
      {
        n: '7.1.',
        text: 'Installation services provided by a third party or by us shall be reflected by the following conditions:',
        sub: [
          { n: '7.1.1.', text: 'Upon delivery, our qualified builder will install your Goods.' },
          {
            n: '7.1.2.',
            text: 'We will contact you for a reasonable date and time for installation; you are requested to cooperate with the builders for the Goods installation.',
          },
          {
            n: '7.1.3.',
            text: 'For certain works which will be required in connection with any installation which Lomash Wood does not carry out, these supplementary works will be identified by you so that you can arrange for them to take place.',
          },
        ],
      },
      {
        n: '7.2.',
        text: 'Where we are not providing installation services, the following shall apply:',
        sub: [
          {
            n: '7.2.1.',
            text: 'It is your responsibility to install the Goods. You should not confirm installation arrangements before Goods delivery.',
          },
          {
            n: '7.2.2.',
            text: 'It is your responsibility to monitor the third-party installation process so that they do not damage the Goods.',
          },
          {
            n: '7.2.3.',
            text: 'You must appoint a qualified installer who has knowledge of gas, water, and electricity, joinery, walls, and worktops to ensure proper installation.',
          },
          {
            n: '7.2.4.',
            text: 'Before starting the installation, you are advised to consult a professional trade person for electricity, gas and water work where it is relevant.',
          },
          {
            n: '7.2.5.',
            text: 'We cannot advise on planning permission or building regulations consent issues, which are your responsibility.',
          },
          {
            n: '7.2.6.',
            text: 'If you change the room layout without notifying us, we will neither accept additional costs nor accept any returns of Goods.',
          },
        ],
      },
    ],
  },
  {
    id: 'cancellation-and-termination',
    title: 'Cancellation by the Client & Termination by us',
    icon: XCircle,
    blocks: [
      {
        n: '8.1.',
        text: 'You may cancel or change any order placed within 3 days (Cooling-off period) of order acceptance and/or the first payment.',
      },
      {
        n: '8.2.',
        text: 'To cancel or change your Order during the cooling-off Period, you should contact our Showroom email address, contact@lomashwood.com. If you cancel in accordance with this condition, we will issue a full refund within 30 days of receipt of your cancellation notice.',
      },
      {
        n: '8.3.',
        text: 'You may correct or change during the Cooling Off Period, but we will not accept changes to or cancellation of your Order after the expiry of the Cooling Off Period.',
      },
      {
        n: '8.4.',
        text: 'If the client cancels the order/sales agreement after production is complete at our factory, they will be responsible for the full quoted cost of the work, regardless of whether delivery or installation occurs.',
      },
      {
        n: '8.5.',
        text: 'Termination by us. We may end this Contract with immediate effect if you:',
        sub: [
          {
            n: '8.5.1.',
            text: 'Do not make a payment to us when it is due, and if you still do not make such a payment within 7 days of us reminding you that it is due;',
          },
          {
            n: '8.5.2.',
            text: 'Do not provide us with information that is necessary for us to provide the Goods, for example, site measurements, or there is an adverse survey of where you wish to install the Goods;',
          },
          { n: '8.5.3.', text: 'Do not, within a reasonable time, allow us to deliver the Goods to you; or' },
          {
            n: '8.5.4.',
            text: 'Do not, within a reasonable time, allow us or our subcontractors access to your property for the delivery and installation of the Goods.',
          },
        ],
      },
    ],
  },
  {
    id: 'guarantee',
    title: 'Guarantee',
    icon: ShieldCheck,
    blocks: [
      {
        n: '9.1.',
        text: 'We will consider the claims under the terms of the Goods guarantee, subject to adherence to the aftercare and maintenance instructions.',
      },
      {
        n: '9.2.',
        text: 'We provide maximum 5-year guarantee for the cabinet materials and 3-year for the accessories.',
      },
      {
        n: '9.3.',
        text: 'Warranty does not apply to appliances which have a specific warranty period by the manufacturer.',
      },
      {
        n: '9.4.',
        text: 'If the Client decides to install through their own managed builder or fitter, the unit must be installed in accordance with standard benchmark.',
      },
      {
        n: '9.5.',
        text: "If the Client decides to install through their own managed builder or fitter, all installation work shall be carried out entirely at the Client's own risk and responsibility. The Guarantee would apply only if the installation were performed by the Supplier who represents Lomash Wood Ltd.",
      },
      {
        n: '9.6.',
        text: 'The cabinet must be used for the media wall, the bedroom and the crockery unit, not for any other purpose.',
      },
      {
        n: '9.7.',
        text: 'The warranty excludes fair wear and tear, improper use or maintenance, and third-party interference.',
      },
      {
        n: '9.8.',
        text: 'Warranty does not cover situations where the ownership of purchased Goods or services is transferred to a third party.',
      },
    ],
  },
  {
    id: 'risk',
    title: 'Risk',
    icon: Package,
    blocks: [
      { n: '10.1.', text: 'Goods will be at your risk after delivery.' },
      { n: '10.2.', text: 'Once full payment is made, ownership of the Goods will pass to you.' },
    ],
  },
  {
    id: 'limitation-of-liabilities',
    title: 'Limitation of Liabilities',
    icon: AlertCircle,
    blocks: [
      { n: '11.1.', text: 'The Supplier’s total liability shall not exceed the Contract Price.' },
      {
        n: '11.2.',
        text: 'The Supplier shall not be liable for: Loss of profit, revenue, or business, and indirect or consequential losses',
      },
      {
        n: '11.3.',
        text: 'Nothing in this Agreement shall exclude liability for:',
        sub: [
          { n: '11.3.1.', text: 'Death or personal injury due to negligence' },
          { n: '11.3.2.', text: 'Fraud or fraudulent misrepresentation.' },
        ],
      },
      {
        n: '11.4.',
        text: 'If any Good delivered by Supplier is not in conformity with the agreement, and the other party has timely filed a complaint in accordance with clause 6 of these general terms and conditions, the other party shall be entitled to replacement or repair of the Goods, except where Supplier cannot be held liable for the improper performance (force majeure).',
      },
      {
        n: '11.5.',
        text: 'Entitlement to damages and/or repair of the Goods and/or replacement of the Goods and/or supply of missing components shall lapse if (a) no timely complaint is made, or (b) 6 months after delivery, except where a deviating time period is agreed in writing, e.g. under a warranty agreement.',
      },
    ],
  },
  {
    id: 'liquidated-damages',
    title: 'Liquidated damages (delay)',
    icon: Clock,
    blocks: [
      {
        n: '12.1',
        text: 'If the Supplier fails to achieve Practical Completion by the agreed date (as amended under this Agreement), the Supplier shall pay the Client liquidated damages at the rate of: 10% per week, up to a maximum of 50% of the Contract Price.',
      },
      {
        n: '12.2',
        text: 'Liquidated damages shall be the Client’s sole remedy for delay, except in cases of willful default or fraud.',
      },
      {
        n: '12.3.',
        text: 'No liquidated damages shall apply where delay is caused by:',
        sub: [
          { n: '12.3.2.', text: 'Variations' },
          { n: '12.3.2.', text: 'Client’s acts or omissions' },
          { n: '12.3.3.', text: 'Force majeure events' },
        ],
      },
    ],
  },
  {
    id: 'defects-liability-period',
    title: 'Defects liability period (snagging)',
    icon: ClipboardCheck,
    blocks: [
      { n: '13.1', text: 'A defects liability period of 12 months shall apply from Practical Completion.' },
      {
        n: '13.2.',
        text: 'The Supplier shall, at its own cost, remedy defects notified during this period within a reasonable time.',
      },
      {
        n: '13.3',
        text: 'A formal snagging list shall be agreed upon at Practical Completion, and all items shall be rectified promptly.',
      },
    ],
  },
  {
    id: 'insurance',
    title: 'Insurance',
    icon: Umbrella,
    blocks: [
      {
        n: '14.1.',
        text: 'The Supplier shall maintain:',
        sub: [
          { n: '14.1.1.', text: 'Public Liability Insurance: minimum £5 million' },
          { n: '14.1.2.', text: 'Employer’s Liability Insurance minimum £ 10 million' },
          { n: '14.1.3.', text: 'Product Liability Insurance: minimum £ 5 million' },
        ],
      },
      { n: '14.3.', text: 'Evidence of insurance shall be provided upon request.' },
    ],
  },
  {
    id: 'quality-standards-and-tolerances',
    title: 'Quality standards and tolerances',
    icon: Award,
    blocks: [
      {
        n: '15.1.',
        text: 'The Goods shall be produced to luxury furniture industry standards, including:',
        sub: [
          { n: '15.1.1.', text: 'Fine joinery tolerances' },
          { n: '15.1.2.', text: 'Hand-finished surfaces' },
        ],
      },
      {
        n: '15.2.',
        text: 'Minor deviations consistent with bespoke craftsmanship shall not be considered defects.',
      },
    ],
  },
  {
    id: 'assignment',
    title: 'Assignment',
    icon: Handshake,
    blocks: [
      'Unless otherwise agreed in writing, the Client may not assign or transfer this Contract to any other party. Lomash Wood may delegate its obligations under the Contract and may assign any of its rights or benefits to another organisation.',
    ],
  },
  {
    id: 'force-majeure',
    title: 'Unforeseen Circumstances/ Force Majeure',
    icon: Zap,
    blocks: [
      'Lomash Wood Ltd will not be under any liability for non-performance in whole or in part of its obligation under these Terms and Conditions as a result (whether directly or indirectly) of any strike, lockout, accident, war, fire, flood, inability to obtain materials, breakdown, delay by supplier or by carrier, government act and regulation or any other cause beyond our reasonable control or acts of God.',
    ],
  },
  {
    id: 'use-of-images',
    title: 'Use of Images',
    icon: Camera,
    blocks: [
      {
        n: '18.1',
        text: 'Any images secured or taken of your project may be used by us without charge in all media for bona fide promotional or marketing purposes, including, without limitation, promotional materials of any kind, such as brochures, slides, or magazine publications.',
      },
      {
        n: '18.2',
        text: 'The use of such images will not include any reference to the name or address associated with the project.',
      },
      {
        n: '18.3',
        text: 'We require that you inform us in writing if you wish to withdraw permission for the use of these images. Any written feedback supplied to Us may also be used for promotional purposes as detailed above.',
      },
    ],
  },
  {
    id: 'data-protection',
    title: 'Data Protection',
    icon: UserCheck,
    blocks: [
      'We will use your personal information only as set out in our Privacy Policy, which is available on our website.',
    ],
  },
  {
    id: 'third-party-rights',
    title: 'Third Party Rights',
    icon: Users,
    blocks: [
      'A person who is not a party to the Contract shall not have any rights to enforce any of its provisions.',
    ],
  },
  {
    id: 'governing-law-and-jurisdiction',
    title: 'Governing Law and Jurisdiction',
    icon: Scale,
    blocks: [
      {
        n: '21.1.',
        text: 'Each right or remedy of ours under the sales agreement is without prejudice to any other right or remedy of ours, whether under the agreement or not.',
      },
      {
        n: '21.2.',
        text: 'If any part of these terms is unenforceable (including any provision in which we exclude our liability to you), the enforceability of any other part of these terms and conditions will not be affected.',
      },
      {
        n: '21.3.',
        text: 'Our failure or delay in enforcing, or partial enforcement of, any provision of the agreement shall not be construed as a waiver of any of our rights under the agreement.',
      },
      {
        n: '21.4.',
        text: 'A waiver of any right or remedy under the agreement or law is only effective if given in writing and shall not be deemed a waiver of any subsequent breach or default and shall in no way affect the other provisions of the agreement.',
      },
      {
        n: '21.5.',
        text: 'This agreement and any dispute or claim arising out of or in connection with it or its subject matter or formation shall be governed by and construed in accordance with English law, and the parties irrevocably submit to the exclusive jurisdiction of the courts of England and Wales.',
      },
    ],
  },
  {
    id: 'dispute-resolution',
    title: 'Dispute resolution',
    icon: Gavel,
    blocks: [
      {
        n: '22.1.',
        text: 'The Parties shall attempt to resolve disputes through:',
        sub: [
          { n: '22.1.1.', text: 'Good faith negotiation' },
          { n: '22.1.2.', text: 'Mediation (in London, unless agreed otherwise)' },
        ],
      },
      {
        n: '22.2.',
        text: 'Failing resolution, disputes shall be referred to the courts of England and Wales.',
      },
    ],
  },
];

export default function TermsConditionsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      intro="These Terms and Conditions of Sale apply to all contracts between Lomash Wood and the Client. Please read them carefully before placing an order."
      icon={FileText}
      accent="slate"
      sections={sections}
      relatedLinks={[
        { title: 'Privacy Policy', href: '/privacy-policy', icon: Lock },
        { title: 'Cookie Policy', href: '/cookies', icon: Cookie },
      ]}
      contactTitle="Questions About Our Terms?"
    />
  );
}
