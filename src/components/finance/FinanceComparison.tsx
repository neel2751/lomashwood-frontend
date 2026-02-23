"use client";

import {
  Check,
  X,
  TrendingUp,
  Info,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Star,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface FinanceOptionForComparison {
  id: string;
  name: string;
  provider: string;
  logo?: string;
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
  earlyPayment: boolean;
  partPayment: boolean;
  preApproved: boolean;
  rating?: number;
  popular?: boolean;
  featured?: boolean;
}

interface FinanceComparisonProps {
  options: FinanceOptionForComparison[];
  maxCompare?: number;
  defaultSelected?: string[];
  onApply?: (optionId: string) => void;
  className?: string;
}

const comparisonCategories = [
  {
    id: "basic",
    name: "Basic Details",
    fields: [
      { key: "provider", label: "Provider" },
      { key: "rating", label: "Rating" },
    ],
  },
  {
    id: "rates",
    name: "Rates & Fees",
    fields: [
      { key: "interestRate", label: "Interest Rate (p.a.)" },
      { key: "processingFee", label: "Processing Fee" },
    ],
  },
  {
    id: "loan",
    name: "Loan Details",
    fields: [
      { key: "loanRange", label: "Loan Amount Range" },
      { key: "tenureRange", label: "Tenure Range" },
      { key: "processingTime", label: "Processing Time" },
    ],
  },
  {
    id: "flexibility",
    name: "Flexibility",
    fields: [
      { key: "earlyPayment", label: "Early Payment" },
      { key: "partPayment", label: "Part Payment" },
      { key: "preApproved", label: "Pre-Approved" },
    ],
  },
];

export default function FinanceComparison({
  options,
  maxCompare = 4,
  defaultSelected = [],
  onApply,
  className = "",
}: FinanceComparisonProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    defaultSelected.slice(0, maxCompare)
  );
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["basic", "rates"]);
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState<string | null>(null);

  const toggleOption = (optionId: string) => {
    if (selectedOptions.includes(optionId)) {
      setSelectedOptions(selectedOptions.filter((id) => id !== optionId));
    } else if (selectedOptions.length < maxCompare) {
      setSelectedOptions([...selectedOptions, optionId]);
    }
  };

  const toggleCategory = (categoryId: string) => {
    if (expandedCategories.includes(categoryId)) {
      setExpandedCategories(expandedCategories.filter((id) => id !== categoryId));
    } else {
      setExpandedCategories([...expandedCategories, categoryId]);
    }
  };

  const selectedOptionsData = options.filter((opt) => selectedOptions.includes(opt.id));

  const renderFieldValue = (option: FinanceOptionForComparison, field: string) => {
    switch (field) {
      case "provider":
        return (
          <div className="space-y-1">
            {option.logo ? (
              <img src={option.logo} alt={option.provider} className="h-8 w-auto" />
            ) : (
              <p className="font-semibold">{option.provider}</p>
            )}
            <p className="text-sm text-muted-foreground">{option.name}</p>
          </div>
        );
      case "rating":
        return option.rating ? (
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < option.rating! ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-1 text-sm font-medium">{option.rating.toFixed(1)}</span>
          </div>
        ) : (
          <span className="text-muted-foreground">N/A</span>
        );
      case "interestRate":
        return (
          <p className="text-lg font-bold text-primary">
            {option.interestRate}% <span className="text-sm font-normal">p.a.</span>
          </p>
        );
      case "processingFee":
        return <p className="font-semibold">{option.processingFee}%</p>;
      case "loanRange":
        return (
          <p className="text-sm">
            £{option.minAmount.toLocaleString()} - £{option.maxAmount.toLocaleString()}
          </p>
        );
      case "tenureRange":
        return (
          <p className="text-sm">
            {option.minTenure} - {option.maxTenure} months
          </p>
        );
      case "processingTime":
        return <p className="text-sm">{option.processingTime}</p>;
      case "earlyPayment":
      case "partPayment":
      case "preApproved":
        return option[field] ? (
          <Check className="h-5 w-5 text-green-600" />
        ) : (
          <X className="h-5 w-5 text-muted-foreground" />
        );
      default:
        return null;
    }
  };

  const getBestValue = (field: string) => {
    if (selectedOptionsData.length === 0) return null;

    switch (field) {
      case "interestRate":
        return Math.min(...selectedOptionsData.map((opt) => opt.interestRate));
      case "processingFee":
        return Math.min(...selectedOptionsData.map((opt) => opt.processingFee));
      case "maxAmount":
        return Math.max(...selectedOptionsData.map((opt) => opt.maxAmount));
      case "maxTenure":
        return Math.max(...selectedOptionsData.map((opt) => opt.maxTenure));
      default:
        return null;
    }
  };

  const isBestValue = (option: FinanceOptionForComparison, field: string) => {
    const bestValue = getBestValue(field);
    if (bestValue === null) return false;

    switch (field) {
      case "interestRate":
      case "processingFee":
        return option[field] === bestValue;
      default:
        return false;
    }
  };

  const currentDetailsOption = options.find((o) => o.id === detailsDialogOpen);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold">Compare Finance Options</h2>
        <p className="text-muted-foreground">
          Select up to {maxCompare} options to compare side-by-side
        </p>
      </div>

      {/* Option Selector */}
      <Card>
        <CardHeader>
          <CardTitle>Select Options to Compare</CardTitle>
          <CardDescription>
            {selectedOptions.length} of {maxCompare} selected
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {options.map((option) => {
              const isSelected = selectedOptions.includes(option.id);
              const canSelect = selectedOptions.length < maxCompare || isSelected;

              return (
                <div
                  key={option.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  } ${!canSelect ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={() => canSelect && toggleOption(option.id)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-semibold">{option.provider}</p>
                      <p className="text-sm text-muted-foreground">{option.name}</p>
                    </div>
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        isSelected
                          ? "bg-primary border-primary"
                          : "bg-background border-border"
                      }`}
                    >
                      {isSelected && <Check className="h-3 w-3 text-primary-foreground" />}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm flex-wrap">
                    <Badge variant="secondary">
                      {option.interestRate}% p.a.
                    </Badge>
                    {option.featured && (
                      <Badge>Featured</Badge>
                    )}
                    {option.popular && (
                      <Badge variant="outline">Popular</Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Comparison Table */}
      {selectedOptionsData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="w-[200px] text-left p-3 font-semibold">Feature</th>
                      {selectedOptionsData.map((option) => (
                        <th key={option.id} className="text-center p-3">
                          <div className="space-y-1">
                            <p className="font-semibold">{option.provider}</p>
                            <p className="text-xs text-muted-foreground font-normal">
                              {option.name}
                            </p>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonCategories.map((category) => (
                      <>
                        <tr key={category.id} className="bg-muted/50">
                          <td colSpan={selectedOptionsData.length + 1} className="p-3">
                            <button
                              onClick={() => toggleCategory(category.id)}
                              className="flex items-center gap-2 font-semibold w-full"
                            >
                              {expandedCategories.includes(category.id) ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                              {category.name}
                            </button>
                          </td>
                        </tr>
                        {expandedCategories.includes(category.id) &&
                          category.fields.map((field) => (
                            <tr key={field.key} className="border-b hover:bg-muted/50">
                              <td className="p-3 font-medium">
                                {field.label}
                              </td>
                              {selectedOptionsData.map((option) => (
                                <td key={option.id} className="text-center p-3">
                                  <div className="flex items-center justify-center gap-2">
                                    {renderFieldValue(option, field.key)}
                                    {isBestValue(option, field.key) && (
                                      <Badge variant="default" className="bg-green-600">
                                        Best
                                      </Badge>
                                    )}
                                  </div>
                                </td>
                              ))}
                            </tr>
                          ))}
                      </>
                    ))}

                    {/* Features */}
                    <tr className="bg-muted/50">
                      <td colSpan={selectedOptionsData.length + 1} className="p-3">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">Key Features</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowAllFeatures(!showAllFeatures)}
                          >
                            {showAllFeatures ? "Show Less" : "Show All"}
                          </Button>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td colSpan={selectedOptionsData.length + 1} className="p-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          {selectedOptionsData.map((option) => (
                            <div key={option.id} className="space-y-2">
                              <p className="font-semibold text-sm">{option.provider}</p>
                              <ul className="space-y-1">
                                {(showAllFeatures
                                  ? option.features
                                  : option.features.slice(0, 3)
                                ).map((feature, index) => (
                                  <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                                    <span>{feature}</span>
                                  </li>
                                ))}
                                {!showAllFeatures && option.features.length > 3 && (
                                  <li className="text-sm text-muted-foreground">
                                    +{option.features.length - 3} more
                                  </li>
                                )}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>

                    {/* Action Buttons */}
                    <tr>
                      <td colSpan={selectedOptionsData.length + 1} className="p-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          {selectedOptionsData.map((option) => (
                            <div key={option.id} className="space-y-2">
                              {onApply && (
                                <Button
                                  onClick={() => onApply(option.id)}
                                  className="w-full"
                                >
                                  Apply Now
                                  <ArrowRight className="h-4 w-4 ml-2" />
                                </Button>
                              )}
                              <Button
                                variant="outline"
                                onClick={() => setDetailsDialogOpen(option.id)}
                                className="w-full"
                              >
                                <Info className="h-4 w-4 mr-2" />
                                Full Details
                              </Button>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {selectedOptionsData.length === 0 && (
        <Card>
          <CardContent className="p-12">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="p-4 rounded-full bg-muted">
                  <TrendingUp className="h-8 w-8 text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">No Options Selected</h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  Select at least one finance option above to start comparing features, rates, and
                  benefits
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Details Dialog */}
      <Dialog open={!!detailsDialogOpen} onOpenChange={(open) => !open && setDetailsDialogOpen(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{currentDetailsOption?.name}</DialogTitle>
            <DialogDescription>
              by {currentDetailsOption?.provider}
            </DialogDescription>
          </DialogHeader>
          
          {currentDetailsOption && (
            <Accordion type="multiple" defaultValue={["features"]} className="w-full">
              <AccordionItem value="features">
                <AccordionTrigger>Features</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2">
                    {currentDetailsOption.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="eligibility">
                <AccordionTrigger>Eligibility</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2">
                    {currentDetailsOption.eligibility.map((criterion, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-muted-foreground">{index + 1}.</span>
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
                    {currentDetailsOption.documents.map((document, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-muted-foreground">{index + 1}.</span>
                        <span>{document}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}