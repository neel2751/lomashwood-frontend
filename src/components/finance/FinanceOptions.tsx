"use client";

import {
  Calendar,
  TrendingDown,
  CheckCircle2,
  Info,
  ArrowRight,
  Shield,
  Percent,
  FileText,
  AlertCircle,
  Phone,
  Calculator,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

export interface FinanceOption {
  id: string;
  name: string;
  provider: string;
  logo?: string;
  description: string;
  interestRate: number;
  processingFee: number;
  minAmount: number;
  maxAmount: number;
  minTenure: number;
  maxTenure: number;
  features: string[];
  eligibility: string[];
  documents: string[];
  processingTime: string;
  featured?: boolean;
  popular?: boolean;
}

interface FinanceOptionsProps {
  options: FinanceOption[];
  onApply: (optionId: string) => void;
  onCalculate?: (optionId: string) => void;
  showComparison?: boolean;
  className?: string;
}

export default function FinanceOptions({
  options,
  onApply,
  onCalculate,
  className = "",
}: FinanceOptionsProps) {
  const [selectedOption, setSelectedOption] = useState<FinanceOption | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleViewDetails = (option: FinanceOption) => {
    setSelectedOption(option);
    setIsDetailsOpen(true);
  };

  const handleApply = (optionId: string) => {
    onApply(optionId);
    setIsDetailsOpen(false);
  };

  const featuredOptions = options.filter((opt) => opt.featured);
  const popularOptions = options.filter((opt) => opt.popular);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold">Flexible Financing Options</h2>
        <p className="text-muted-foreground">
          Choose from our range of financing partners to make your dream kitchen or bedroom a
          reality
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Options ({options.length})</TabsTrigger>
          <TabsTrigger value="featured">Featured ({featuredOptions.length})</TabsTrigger>
          <TabsTrigger value="popular">Popular ({popularOptions.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {options.map((option) => (
              <FinanceOptionCard
                key={option.id}
                option={option}
                onViewDetails={handleViewDetails}
                onApply={onApply}
                onCalculate={onCalculate}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="featured" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredOptions.map((option) => (
              <FinanceOptionCard
                key={option.id}
                option={option}
                onViewDetails={handleViewDetails}
                onApply={onApply}
                onCalculate={onCalculate}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="popular" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularOptions.map((option) => (
              <FinanceOptionCard
                key={option.id}
                option={option}
                onViewDetails={handleViewDetails}
                onApply={onApply}
                onCalculate={onCalculate}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-blue-100">
                <Shield className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Secure Process</h3>
                <p className="text-sm text-muted-foreground">
                  Bank-grade encryption for all your financial data
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-green-100">
                <TrendingDown className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Competitive Rates</h3>
                <p className="text-sm text-muted-foreground">
                  Best interest rates starting from{" "}
                  {Math.min(...options.map((o) => o.interestRate))}% p.a.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-purple-100">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Flexible Tenure</h3>
                <p className="text-sm text-muted-foreground">
                  Choose from {Math.min(...options.map((o) => o.minTenure))} to{" "}
                  {Math.max(...options.map((o) => o.maxTenure))} months
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Help Section */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-shrink-0">
              <div className="p-3 rounded-full bg-blue-100">
                <Phone className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="flex-1 space-y-1">
              <h3 className="font-semibold">Need Help Choosing?</h3>
              <p className="text-sm text-muted-foreground">
                Our finance experts are here to help you find the best option for your needs
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <Button asChild>
                <Link href="tel:01708898755">Call Us</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contact">Contact Support</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedOption && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedOption.name}</DialogTitle>
                <DialogDescription>by {selectedOption.provider}</DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Overview */}
                <div className="space-y-3">
                  <h3 className="font-semibold">Overview</h3>
                  <p className="text-sm text-muted-foreground">{selectedOption.description}</p>
                </div>

                <Separator />

                {/* Key Terms */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Interest Rate</p>
                    <p className="text-lg font-bold">{selectedOption.interestRate}% p.a.</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Processing Fee</p>
                    <p className="text-lg font-bold">{selectedOption.processingFee}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Loan Amount</p>
                    <p className="text-sm font-semibold">
                      £{selectedOption.minAmount.toLocaleString()} - £
                      {selectedOption.maxAmount.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Tenure</p>
                    <p className="text-sm font-semibold">
                      {selectedOption.minTenure} - {selectedOption.maxTenure} months
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Accordion Sections */}
                <Accordion type="multiple" defaultValue={["features", "eligibility"]}>
                  <AccordionItem value="features">
                    <AccordionTrigger>Features & Benefits</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2">
                        {selectedOption.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="eligibility">
                    <AccordionTrigger>Eligibility Criteria</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2">
                        {selectedOption.eligibility.map((criterion, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <AlertCircle className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                            <span>{criterion}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="documents">
                    <AccordionTrigger>Required Documents</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2">
                        {selectedOption.documents.map((document, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                            <span>{document}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {/* Processing Time */}
                <Card className="bg-muted/50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Info className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Processing Time</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {selectedOption.processingTime}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <DialogFooter className="flex gap-2 sm:gap-2">
                <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
                  Close
                </Button>
                {onCalculate && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      onCalculate(selectedOption.id);
                      setIsDetailsOpen(false);
                    }}
                  >
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate EMI
                  </Button>
                )}
                <Button onClick={() => handleApply(selectedOption.id)}>Apply Now</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface FinanceOptionCardProps {
  option: FinanceOption;
  onViewDetails: (option: FinanceOption) => void;
  onApply: (optionId: string) => void;
  onCalculate?: (optionId: string) => void;
}

function FinanceOptionCard({
  option,
  onViewDetails,
  onApply,
  onCalculate,
}: FinanceOptionCardProps) {
  return (
    <Card
      className={`overflow-hidden hover:shadow-xl transition-shadow ${
        option.featured ? "border-primary border-2" : ""
      }`}
    >
      {/* Header */}
      <CardHeader className="border-b">
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            {option.logo ? (
              <img src={option.logo} alt={option.provider} className="h-8 w-auto mb-2" />
            ) : (
              <CardTitle className="text-lg">{option.provider}</CardTitle>
            )}
            <CardDescription className="text-base font-medium text-foreground">
              {option.name}
            </CardDescription>
          </div>
          <div className="flex flex-col gap-1">
            {option.featured && <Badge>Featured</Badge>}
            {option.popular && <Badge variant="secondary">Popular</Badge>}
          </div>
        </div>
      </CardHeader>

      {/* Content */}
      <CardContent className="p-6 space-y-4">
        {/* Key Highlights */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-muted/50">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                <Percent className="h-3 w-3" />
                <span>Interest Rate</span>
              </div>
              <p className="text-lg font-bold">{option.interestRate}% p.a.</p>
            </CardContent>
          </Card>
          <Card className="bg-muted/50">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                <Calendar className="h-3 w-3" />
                <span>Max Tenure</span>
              </div>
              <p className="text-lg font-bold">{option.maxTenure} months</p>
            </CardContent>
          </Card>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">{option.description}</p>

        {/* Key Features */}
        <div className="space-y-2">
          {option.features.slice(0, 3).map((feature, index) => (
            <div key={index} className="flex items-start gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* Loan Range */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-3">
            <p className="text-xs text-muted-foreground mb-1">Loan Amount Range</p>
            <p className="text-sm font-semibold">
              £{option.minAmount.toLocaleString()} - £{option.maxAmount.toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </CardContent>

      {/* Footer */}
      <CardContent className="p-6 pt-0 flex flex-col gap-2">
        <div className="flex gap-2 w-full">
          <Button variant="outline" onClick={() => onViewDetails(option)} className="flex-1">
            View Details
          </Button>
          <Button onClick={() => onApply(option.id)} className="flex-1">
            Apply Now
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
        {onCalculate && (
          <Button
            variant="ghost"
            onClick={() => onCalculate(option.id)}
            className="w-full"
          >
            <Calculator className="h-4 w-4 mr-2" />
            Calculate EMI
          </Button>
        )}
      </CardContent>
    </Card>
  );
}