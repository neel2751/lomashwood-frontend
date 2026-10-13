import { BookOpen, Calendar, ChevronRight, ExternalLink, Info, Mail, Phone } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { siteConfig } from '@/config/site';

export interface LegalClause {
  n?: string;
  text: string;
  sub?: { n?: string; text: string }[];
}

export type LegalBlock = string | LegalClause | { list: string[] };

export interface LegalSection {
  id: string;
  title: string;
  icon: LucideIcon;
  blocks: LegalBlock[];
}

interface LegalPageProps {
  title: string;
  intro: string;
  icon: LucideIcon;
  accent: 'slate' | 'blue' | 'orange';
  lastUpdated?: string;
  sections: LegalSection[];
  relatedLinks: { title: string; href: string; icon: LucideIcon }[];
  contactTitle: string;
}

const accents = {
  slate: {
    hero: 'from-slate-50 via-slate-100 to-slate-50 border-slate-200',
    heroIcon: 'text-slate-700',
    tocHover: 'hover:border-amber-300 hover:bg-amber-50',
    tocIconHover: 'group-hover:text-amber-600',
    badge: 'bg-amber-100',
    icon: 'text-amber-600',
  },
  blue: {
    hero: 'from-blue-50 via-indigo-50 to-blue-50 border-blue-200',
    heroIcon: 'text-blue-600',
    tocHover: 'hover:border-blue-300 hover:bg-blue-50',
    tocIconHover: 'group-hover:text-blue-600',
    badge: 'bg-blue-100',
    icon: 'text-blue-600',
  },
  orange: {
    hero: 'from-orange-50 via-amber-50 to-orange-50 border-orange-200',
    heroIcon: 'text-orange-600',
    tocHover: 'hover:border-orange-300 hover:bg-orange-50',
    tocIconHover: 'group-hover:text-orange-600',
    badge: 'bg-orange-100',
    icon: 'text-orange-600',
  },
};

export function LegalPage({
  title,
  intro,
  icon: HeroIcon,
  accent,
  lastUpdated,
  sections,
  relatedLinks,
  contactTitle,
}: LegalPageProps) {
  const theme = accents[accent];

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className={`relative overflow-hidden rounded-lg bg-gradient-to-br border-2 ${theme.hero}`}>
        <CardContent className="pt-12 pb-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <HeroIcon className={`w-10 h-10 ${theme.heroIcon}`} />
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900">{title}</h1>
            </div>
            <p className="text-lg text-slate-700">{intro}</p>
            {lastUpdated && (
              <div className="flex items-center gap-2 text-sm text-slate-600 mt-4">
                <Calendar className="w-4 h-4" />
                <span>Last updated: {lastUpdated}</span>
              </div>
            )}
          </div>
        </CardContent>
      </div>

      {/* Table of Contents */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className={`w-5 h-5 ${theme.icon}`} />
            Table of Contents
          </CardTitle>
          <CardDescription>Quick navigation to different sections</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={`flex items-center gap-3 p-3 rounded-lg border border-slate-200 transition-all group ${theme.tocHover}`}
                >
                  <Icon className={`w-5 h-5 flex-shrink-0 text-slate-400 ${theme.tocIconHover}`} />
                  <span className="text-sm font-medium text-slate-900">
                    {index + 1}. {section.title}
                  </span>
                  <ChevronRight className={`w-4 h-4 text-slate-400 ml-auto flex-shrink-0 ${theme.tocIconHover}`} />
                </a>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Main Content Sections */}
      {sections.map((section, index) => {
        const Icon = section.icon;
        return (
          <Card key={section.id} id={section.id} className="scroll-mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${theme.badge}`}>
                  <Icon className={`w-5 h-5 ${theme.icon}`} />
                </div>
                {index + 1}. {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {section.blocks.map((block, blockIdx) => {
                  if (typeof block === 'string') {
                    return (
                      <p key={blockIdx} className="text-slate-700 leading-relaxed">
                        {block}
                      </p>
                    );
                  }

                  if ('list' in block) {
                    return (
                      <ul key={blockIdx} className="space-y-2">
                        {block.list.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-start gap-2">
                            <span className={`mt-0.5 ${theme.icon}`}>•</span>
                            <span className="text-slate-700 leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    );
                  }

                  return (
                    <div key={blockIdx}>
                      <div className="flex items-start gap-3">
                        {block.n && (
                          <span className="font-semibold text-slate-900 flex-shrink-0 min-w-[2.75rem]">{block.n}</span>
                        )}
                        <p className="text-slate-700 leading-relaxed">{block.text}</p>
                      </div>
                      {block.sub && (
                        <div className="mt-3 ml-6 md:ml-14 space-y-2">
                          {block.sub.map((sub, subIdx) => (
                            <div key={subIdx} className="flex items-start gap-3">
                              {sub.n && (
                                <span className="font-medium text-slate-600 flex-shrink-0 min-w-[3.5rem]">{sub.n}</span>
                              )}
                              <p className="text-slate-700 leading-relaxed">{sub.text}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        );
      })}

      {/* Related Links */}
      <Card className="bg-slate-50 border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ExternalLink className={`w-5 h-5 ${theme.icon}`} />
            Related Policies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-3">
            {relatedLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 p-4 rounded-lg bg-white border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${theme.badge}`}>
                    <Icon className={`w-5 h-5 ${theme.icon}`} />
                  </div>
                  <span className="font-medium text-slate-900">{link.title}</span>
                  <ChevronRight className="w-5 h-5 text-slate-400 ml-auto" />
                </Link>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card className="border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-start justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-amber-600 flex items-center justify-center flex-shrink-0">
                <Info className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">{contactTitle}</h3>
                <p className="text-slate-600 mb-4">
                  If you have any questions, please don&apos;t hesitate to contact us. We&apos;re here to help.
                </p>
                <div className="flex flex-col gap-2 text-sm text-slate-700">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-amber-600" />
                    <Link href={`mailto:${siteConfig.contact.email}`} className="hover:text-amber-600">
                      {siteConfig.contact.email}
                    </Link>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-amber-600" />
                    <Link href={`tel:${siteConfig.contact.phone}`} className="hover:text-amber-600">
                      {siteConfig.contact.phone}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <Button className="bg-amber-600 hover:bg-amber-700 flex-shrink-0" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
