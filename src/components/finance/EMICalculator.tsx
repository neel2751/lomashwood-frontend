"use client";

import {
  Calculator,
  Download,
  Share2,
  Info,
  Calendar,
  Percent,
  PoundSterling,
} from "lucide-react";
import { useState, useMemo } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

interface EMICalculatorProps {
  defaultAmount?: number;
  defaultRate?: number;
  defaultTenure?: number;
  minAmount?: number;
  maxAmount?: number;
  minRate?: number;
  maxRate?: number;
  minTenure?: number;
  maxTenure?: number;
  onApply?: (details: EMIDetails) => void;
  className?: string;
}

interface EMIDetails {
  loanAmount: number;
  interestRate: number;
  tenure: number;
  emi: number;
  totalInterest: number;
  totalAmount: number;
  monthlyBreakdown: Array<{
    month: number;
    principal: number;
    interest: number;
    balance: number;
  }>;
}

export default function EMICalculator({
  defaultAmount = 500000,
  defaultRate = 10.5,
  defaultTenure = 24,
  minAmount = 50000,
  maxAmount = 5000000,
  minRate = 7,
  maxRate = 20,
  minTenure = 6,
  maxTenure = 60,
  onApply,
  className = "",
}: EMICalculatorProps) {
  const [loanAmount, setLoanAmount] = useState(defaultAmount);
  const [interestRate, setInterestRate] = useState(defaultRate);
  const [tenure, setTenure] = useState(defaultTenure);
  const { toast } = useToast();

  const calculateEMI = useMemo(() => {
    const principal = loanAmount;
    const ratePerMonth = interestRate / 12 / 100;
    const numberOfMonths = tenure;

    if (ratePerMonth === 0) {
      return principal / numberOfMonths;
    }

    const emi =
      (principal * ratePerMonth * Math.pow(1 + ratePerMonth, numberOfMonths)) /
      (Math.pow(1 + ratePerMonth, numberOfMonths) - 1);

    return emi;
  }, [loanAmount, interestRate, tenure]);

  const emiDetails: EMIDetails = useMemo(() => {
    const emi = calculateEMI;
    const totalAmount = emi * tenure;
    const totalInterest = totalAmount - loanAmount;

    const monthlyBreakdown = [];
    let remainingBalance = loanAmount;
    const monthlyRate = interestRate / 12 / 100;

    for (let month = 1; month <= tenure; month++) {
      const interestPaid = remainingBalance * monthlyRate;
      const principalPaid = emi - interestPaid;
      remainingBalance -= principalPaid;

      monthlyBreakdown.push({
        month,
        principal: principalPaid,
        interest: interestPaid,
        balance: Math.max(0, remainingBalance),
      });
    }

    return {
      loanAmount,
      interestRate,
      tenure,
      emi,
      totalInterest,
      totalAmount,
      monthlyBreakdown,
    };
  }, [calculateEMI, loanAmount, interestRate, tenure]);

  const handleShare = () => {
    const text = `EMI Calculation:
Loan Amount: £${loanAmount.toLocaleString()}
Interest Rate: ${interestRate}% p.a.
Tenure: ${tenure} months
Monthly EMI: £${Math.round(emiDetails.emi).toLocaleString()}
Total Interest: £${Math.round(emiDetails.totalInterest).toLocaleString()}
Total Amount: £${Math.round(emiDetails.totalAmount).toLocaleString()}`;

    if (navigator.share) {
      navigator
        .share({ title: "EMI Calculation", text })
        .then(() => {
          toast({
            title: "Shared Successfully",
            description: "EMI calculation has been shared!",
          });
        })
        .catch(() => {
          navigator.clipboard.writeText(text);
          toast({
            title: "Copied to Clipboard",
            description: "EMI calculation details copied!",
          });
        });
    } else {
      navigator.clipboard.writeText(text);
      toast({
        title: "Copied to Clipboard",
        description: "EMI calculation details copied!",
      });
    }
  };

  const handleDownload = () => {
    const csvContent = [
      ["Month", "Principal (£)", "Interest (£)", "Balance (£)"],
      ...emiDetails.monthlyBreakdown.map((item) => [
        item.month,
        item.principal.toFixed(2),
        item.interest.toFixed(2),
        item.balance.toFixed(2),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "emi-schedule.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Download Complete",
      description: "EMI schedule has been downloaded!",
    });
  };

  const principalPercentage = (loanAmount / emiDetails.totalAmount) * 100;
  const interestPercentage = (emiDetails.totalInterest / emiDetails.totalAmount) * 100;

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-6 w-6 text-primary" />
              EMI Calculator
            </CardTitle>
            <CardDescription>
              Calculate your monthly installments and plan your budget
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleShare}
              title="Share calculation"
            >
              <Share2 className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleDownload}
              title="Download schedule"
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>

          {/* Calculator Tab */}
          <TabsContent value="calculator" className="space-y-6">
            {/* Loan Amount */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2">
                  <PoundSterling className="h-4 w-4 text-muted-foreground" />
                  Loan Amount
                </Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">£</span>
                  <Input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-32 text-right"
                    min={minAmount}
                    max={maxAmount}
                  />
                </div>
              </div>
              <input
                type="range"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                min={minAmount}
                max={maxAmount}
                step={10000}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>£{minAmount.toLocaleString()}</span>
                <span>£{maxAmount.toLocaleString()}</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2">
                  <Percent className="h-4 w-4 text-muted-foreground" />
                  Interest Rate (p.a.)
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-24 text-right"
                    min={minRate}
                    max={maxRate}
                    step={0.1}
                  />
                  <span className="text-sm text-muted-foreground">%</span>
                </div>
              </div>
              <input
                type="range"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                min={minRate}
                max={maxRate}
                step={0.1}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{minRate}%</span>
                <span>{maxRate}%</span>
              </div>
            </div>

            {/* Tenure */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  Loan Tenure
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={tenure}
                    onChange={(e) => setTenure(Number(e.target.value))}
                    className="w-24 text-right"
                    min={minTenure}
                    max={maxTenure}
                  />
                  <span className="text-sm text-muted-foreground">months</span>
                </div>
              </div>
              <input
                type="range"
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                min={minTenure}
                max={maxTenure}
                step={1}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{minTenure} months</span>
                <span>
                  {maxTenure} months ({Math.floor(maxTenure / 12)} years)
                </span>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Results */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">EMI Breakdown</h3>

              {/* Monthly EMI */}
              <div className="p-6 rounded-lg bg-primary text-primary-foreground">
                <p className="text-sm opacity-90 mb-2">Monthly EMI</p>
                <p className="text-4xl font-bold">
                  £{Math.round(emiDetails.emi).toLocaleString()}
                </p>
              </div>

              {/* Summary Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <p className="text-xs text-muted-foreground mb-1">Principal Amount</p>
                    <p className="text-xl font-bold">£{loanAmount.toLocaleString()}</p>
                    <Badge variant="secondary" className="mt-2">
                      {principalPercentage.toFixed(1)}%
                    </Badge>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <p className="text-xs text-muted-foreground mb-1">Total Interest</p>
                    <p className="text-xl font-bold">
                      £{Math.round(emiDetails.totalInterest).toLocaleString()}
                    </p>
                    <Badge variant="secondary" className="mt-2">
                      {interestPercentage.toFixed(1)}%
                    </Badge>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <p className="text-xs text-muted-foreground mb-1">Total Amount</p>
                    <p className="text-xl font-bold">
                      £{Math.round(emiDetails.totalAmount).toLocaleString()}
                    </p>
                    <Badge variant="secondary" className="mt-2">
                      {tenure} months
                    </Badge>
                  </CardContent>
                </Card>
              </div>

              {/* Visual Breakdown */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                    Principal
                  </span>
                  <span className="font-medium">£{loanAmount.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-orange-500" />
                    Interest
                  </span>
                  <span className="font-medium">
                    £{Math.round(emiDetails.totalInterest).toLocaleString()}
                  </span>
                </div>
                <div className="h-8 rounded-full overflow-hidden flex">
                  <div
                    className="bg-blue-500"
                    style={{ width: `${principalPercentage}%` }}
                  />
                  <div
                    className="bg-orange-500"
                    style={{ width: `${interestPercentage}%` }}
                  />
                </div>
              </div>
            </div>

            {onApply && (
              <Button
                onClick={() => onApply(emiDetails)}
                className="w-full"
                size="lg"
              >
                Apply for This Loan
              </Button>
            )}
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Amortisation Schedule</h3>
              <Badge variant="outline">{tenure} Payments</Badge>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <div className="max-h-[500px] overflow-y-auto">
                <table className="w-full">
                  <thead className="bg-muted sticky top-0">
                    <tr>
                      <th className="text-left p-3 text-xs font-medium">Month</th>
                      <th className="text-right p-3 text-xs font-medium">Principal</th>
                      <th className="text-right p-3 text-xs font-medium">Interest</th>
                      <th className="text-right p-3 text-xs font-medium">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {emiDetails.monthlyBreakdown.map((item) => (
                      <tr
                        key={item.month}
                        className="border-t hover:bg-muted/50 transition-colors"
                      >
                        <td className="p-3 text-sm font-medium">{item.month}</td>
                        <td className="p-3 text-sm text-right">
                          £{Math.round(item.principal).toLocaleString()}
                        </td>
                        <td className="p-3 text-sm text-right">
                          £{Math.round(item.interest).toLocaleString()}
                        </td>
                        <td className="p-3 text-sm text-right font-medium">
                          £{Math.round(item.balance).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-blue-900">
                    This amortisation schedule shows how your loan will be paid off month by
                    month, with the breakdown of principal and interest components.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>

      <style dangerouslySetInnerHTML={{__html: `
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: hsl(var(--primary));
          cursor: pointer;
        }

        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: hsl(var(--primary));
          cursor: pointer;
          border: none;
        }
      `}} />
    </Card>
  );
}