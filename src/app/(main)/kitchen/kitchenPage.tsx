'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ArrowRight } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';

interface Product {
  id: string;
  name: string;
  category: string;
  style: string;
  finish: string;
  image: string;
  price: { from: number };
  colors: string[];
  inStock: boolean;
  isNew?: boolean;
  isSale?: boolean;
  discount?: number;
  rating: number;
  reviewCount: number;
}

interface KitchenStyle {
  id: string;
  label: string;
  icon: string;
}

interface KitchenColour {
  id: string;
  label: string;
  hex: string;
}

interface KitchenShowcase {
  id: string;
  customerName: string;
  style: string;
  location: string;
  image: string;
}

interface KitchenPageComProps {
  products?: Product[];
  styles?: KitchenStyle[];
  colours?: KitchenColour[];
  showcases?: KitchenShowcase[];
}

export default function KitchenPageCom({  
  styles = [],
  colours = [],
  showcases = [],
}: KitchenPageComProps) {
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [selectedColour, setSelectedColour] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content - 3 Column Layout */}
      <div className="container mx-auto px-6 lg:px-20 py-12">
        <div className="grid grid-cols-12 gap-12">
          
          {/* LEFT COLUMN - Filters */}
          <div className="col-span-3">
            {/* OUR KITCHENS */}
            <div className="mb-12">
              <h2 className="text-sm font-bold text-teal-600 tracking-wider mb-6">
                OUR KITCHENS
              </h2>
              <Link href="#" className="flex items-center gap-2 text-gray-900 hover:text-teal-600 transition-colors group">
                <ChevronRight className="h-5 w-5 text-teal-600 group-hover:translate-x-1 transition-transform" />
                <span className="text-xl font-bold">All kitchens</span>
              </Link>
            </div>

            {/* STYLE SECTION */}
            <div className="mb-12">
              <h3 className="text-sm font-bold text-teal-600 tracking-wider mb-6">
                STYLE
              </h3>
              <div className="space-y-4">
                {styles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() =>
                      setSelectedStyle(
                        selectedStyle === style.id ? null : style.id
                      )
                    }
                    className={`flex items-center gap-2 text-left transition-all ${ selectedStyle === style.id
                        ? 'text-teal-600 font-bold'
                        : 'text-gray-700 hover:text-teal-600'
                    }`}
                  >
                    <ChevronRight className={`h-4 w-4 transition-all ${selectedStyle === style.id ? 'opacity-100' : 'opacity-0'}`} />
                    <span className="text-base">{style.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* COLOUR SECTION */}
            <div>
              <h3 className="text-sm font-bold text-teal-600 tracking-wider mb-6">
                COLOUR
              </h3>
              <div className="space-y-4">
                {colours.map((colour) => (
                  <button
                    key={colour.id}
                    onClick={() =>
                      setSelectedColour(
                        selectedColour === colour.id ? null : colour.id
                      )
                    }
                    className="flex items-center gap-3 w-full transition-all"
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 transition-all flex-shrink-0 ${
                        selectedColour === colour.id
                          ? 'border-gray-900'
                          : 'border-gray-400'
                      }`}
                      style={{ backgroundColor: colour.hex }}
                    />
                    <span
                      className={`text-left transition-all text-base ${
                        selectedColour === colour.id
                          ? 'text-gray-900 font-bold'
                          : 'text-gray-700'
                      }`}
                    >
                      {colour.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* MIDDLE COLUMN - Kitchen Renovations */}
          <div className="col-span-3">
            <h3 className="text-sm font-bold text-teal-600 tracking-wider mb-2 flex items-center gap-2">
              <ChevronRight className="h-4 w-4" />
              #WRENOVATION
            </h3>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 leading-tight">
              Kitchen makeovers &<br />renovations
            </h2>

            <div className="space-y-5">
              {showcases.map((showcase) => (
                <Link key={showcase.id} href="#">
                  <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer border-0 bg-gray-50">
                    <div className="flex gap-4">
                      <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-sm">
                        <Image
                          src={showcase.image}
                          alt={showcase.customerName}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="p-0 py-2 flex-1 flex flex-col justify-center">
                        <h4 className="font-bold text-gray-900 text-base">
                          {showcase.customerName}
                        </h4>
                        <p className="text-xs text-gray-600 mt-1">
                          {showcase.style}
                        </p>
                      </CardContent>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN - Finishing Touches & Offers */}
          <div className="col-span-3">
            {/* FINISHING TOUCHES */}
            <div className="mb-12">
              <h3 className="text-sm font-bold text-teal-600 tracking-wider mb-2 flex items-center gap-2">
                <ChevronRight className="h-4 w-4" />
                FINISHING TOUCHES
              </h3>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                All accessories &<br />appliances
              </h2>
              <p className="text-gray-700 text-sm mb-6 leading-relaxed">
                Explore our extensive collection of kitchen accessories and appliances and discover the perfect pieces to bring your dream kitchen to life.
              </p>

              {/* Accessories Links */}
              <div className="space-y-3 mb-8">
                <Link href="#" className="flex items-center gap-2 text-gray-900 hover:text-teal-600 transition-colors group text-base">
                  <ChevronRight className="h-4 w-4 text-teal-600 group-hover:translate-x-1 transition-transform" />
                  <span>Kitchen worktops</span>
                </Link>
                <Link href="#" className="flex items-center gap-2 text-gray-900 hover:text-teal-600 transition-colors group text-base">
                  <ChevronRight className="h-4 w-4 text-teal-600 group-hover:translate-x-1 transition-transform" />
                  <span>Kitchen sinks</span>
                </Link>
                <Link href="#" className="flex items-center gap-2 text-gray-900 hover:text-teal-600 transition-colors group text-base">
                  <ChevronRight className="h-4 w-4 text-teal-600 group-hover:translate-x-1 transition-transform" />
                  <span>Kitchen taps</span>
                </Link>
                <Link href="#" className="flex items-center gap-2 text-gray-900 hover:text-teal-600 transition-colors group text-base">
                  <ChevronRight className="h-4 w-4 text-teal-600 group-hover:translate-x-1 transition-transform" />
                  <span>Kitchen handles</span>
                </Link>
                <Link href="#" className="flex items-center gap-2 text-gray-900 hover:text-teal-600 transition-colors group text-base">
                  <ChevronRight className="h-4 w-4 text-teal-600 group-hover:translate-x-1 transition-transform" />
                  <span>Kitchen flooring</span>
                </Link>
              </div>
            </div>

            {/* EXCLUSIVE OFFERS */}
            <div className="space-y-4">
              {/* Offer 1 - Red */}
              <Card className="bg-red-600 border-0 text-white overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <h3 className="text-xs font-bold tracking-widest mb-2">
                    EXCLUSIVE OFFERS
                  </h3>
                  <h2 className="text-4xl font-bold mb-1">
                    End soon
                  </h2>
                  <p className="text-sm mb-4 text-red-100">
                    End of season savings
                  </p>
                  <Link href="#" className="inline-flex items-center gap-2 text-white hover:underline">
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </CardContent>
              </Card>

              {/* Offer 2 - Blue */}
              <Card className="bg-blue-600 border-0 text-white overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <h3 className="text-xs font-bold tracking-widest mb-2">
                    UP TO
                  </h3>
                  <h2 className="text-5xl font-bold mb-1">
                    7 years
                  </h2>
                  <p className="text-sm mb-4 text-blue-100">
                    interest free credit
                  </p>
                  <Link href="#" className="inline-flex items-center gap-2 text-white hover:underline">
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}