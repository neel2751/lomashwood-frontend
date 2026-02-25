'use client';

import { Check, X } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Link from 'next/link';

interface PackageFeature {
  name: string;
  basic: boolean | string;
  premium: boolean | string;
  luxury: boolean | string;
}

interface ComparisonTableProps {
  features: PackageFeature[];
  category: 'kitchen' | 'bedroom';
}

export default function ComparisonTable({ features, category }: ComparisonTableProps) {
  const renderFeatureValue = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="h-5 w-5 text-green-600 mx-auto" />
      ) : (
        <X className="h-5 w-5 text-gray-300 mx-auto" />
      );
    }
    return <span className="text-sm text-gray-700">{value}</span>;
  };

  const packagePrices = {
    kitchen: {
      basic: '₹1,50,000',
      premium: '₹3,00,000',
      luxury: '₹5,00,000',
    },
    bedroom: {
      basic: '₹1,20,000',
      premium: '₹2,50,000',
      luxury: '₹4,00,000',
    },
  };

  const prices = packagePrices[category];

  return (
    <Card className="overflow-hidden">
      {/* Mobile View */}
      <div className="block lg:hidden">
        <div className="divide-y divide-gray-200">
          {/* Package Headers - Mobile */}
          <div className="grid grid-cols-3 gap-2 p-4 bg-gray-50">
            <div className="text-center">
              <Badge variant="secondary" className="mb-2 bg-gray-100 text-gray-700">
                Basic
              </Badge>
              <p className="text-sm font-bold text-gray-900">{prices.basic}</p>
            </div>
            <div className="text-center">
              <Badge variant="secondary" className="mb-2 bg-primary/10 text-primary">
                Premium
              </Badge>
              <p className="text-sm font-bold text-gray-900">{prices.premium}</p>
            </div>
            <div className="text-center">
              <Badge variant="secondary" className="mb-2 bg-amber-100 text-amber-700">
                Luxury
              </Badge>
              <p className="text-sm font-bold text-gray-900">{prices.luxury}</p>
            </div>
          </div>

          {/* Features - Mobile */}
          {features.map((feature, index) => (
            <div key={index} className="p-4">
              <p className="font-semibold text-gray-900 mb-3 text-sm">{feature.name}</p>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="flex items-center justify-center">
                  {renderFeatureValue(feature.basic)}
                </div>
                <div className="flex items-center justify-center">
                  {renderFeatureValue(feature.premium)}
                </div>
                <div className="flex items-center justify-center">
                  {renderFeatureValue(feature.luxury)}
                </div>
              </div>
            </div>
          ))}

          {/* CTA Buttons - Mobile */}
          <div className="grid grid-cols-3 gap-2 p-4 bg-gray-50">
            <Button size="sm" variant="outline" className="text-xs" asChild>
              <Link href="/book-appointment">Select</Link>
            </Button>
            <Button size="sm" className="text-xs" asChild>
              <Link href="/book-appointment">Select</Link>
            </Button>
            <Button size="sm" variant="outline" className="text-xs" asChild>
              <Link href="/book-appointment">Select</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-[300px] font-bold text-gray-900">Features</TableHead>
              <TableHead className="text-center">
                <div className="flex flex-col items-center gap-2">
                  <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                    Basic
                  </Badge>
                  <p className="text-base font-bold text-gray-900">{prices.basic}</p>
                  <p className="text-xs text-gray-500 font-normal">onwards*</p>
                </div>
              </TableHead>
              <TableHead className="text-center bg-primary/5">
                <div className="flex flex-col items-center gap-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    Premium
                  </Badge>
                  <p className="text-base font-bold text-gray-900">{prices.premium}</p>
                  <p className="text-xs text-gray-500 font-normal">onwards*</p>
                </div>
              </TableHead>
              <TableHead className="text-center">
                <div className="flex flex-col items-center gap-2">
                  <Badge variant="secondary" className="bg-amber-100 text-amber-700">
                    Luxury
                  </Badge>
                  <p className="text-base font-bold text-gray-900">{prices.luxury}</p>
                  <p className="text-xs text-gray-500 font-normal">onwards*</p>
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {features.map((feature, index) => (
              <TableRow
                key={index}
                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}
              >
                <TableCell className="font-medium text-gray-900">{feature.name}</TableCell>
                <TableCell className="text-center">
                  {renderFeatureValue(feature.basic)}
                </TableCell>
                <TableCell className="text-center bg-primary/5">
                  {renderFeatureValue(feature.premium)}
                </TableCell>
                <TableCell className="text-center">
                  {renderFeatureValue(feature.luxury)}
                </TableCell>
              </TableRow>
            ))}

            {/* CTA Row */}
            <TableRow className="bg-gray-50">
              <TableCell className="font-semibold text-gray-900">Get Started</TableCell>
              <TableCell className="text-center">
                <Button variant="outline" asChild>
                  <Link href="/book-appointment">Choose Basic</Link>
                </Button>
              </TableCell>
              <TableCell className="text-center bg-primary/5">
                <Button asChild>
                  <Link href="/book-appointment">Choose Premium</Link>
                </Button>
              </TableCell>
              <TableCell className="text-center">
                <Button variant="outline" asChild>
                  <Link href="/book-appointment">Choose Luxury</Link>
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Footer Note */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          * Prices are indicative and may vary based on size, materials, and customization. Final
          quote will be provided after consultation.
        </p>
      </div>
    </Card>
  );
}