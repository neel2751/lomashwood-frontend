'use client';

import { Calculator as CalcIcon, IndianRupee, TrendingUp } from 'lucide-react';
import { useState } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

export default function Calculator() {
  const [loanAmount, setLoanAmount] = useState(300000);
  const [tenure, setTenure] = useState(12);
  const [interestRate, setInterestRate] = useState(12);

  const calculateEMI = () => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 12 / 100;
    const months = tenure;

    if (interestRate === 0) {
      return principal / months;
    }

    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    return emi;
  };

  const emi = calculateEMI();
  const totalAmount = emi * tenure;
  const totalInterest = totalAmount - loanAmount;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Calculator Input Section */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalcIcon className="h-5 w-5 text-primary" />
            EMI Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Loan Amount */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="loan-amount" className="text-base font-semibold">
                Loan Amount
              </Label>
              <div className="flex items-center gap-1 text-sm font-medium text-primary">
                <IndianRupee className="h-4 w-4" />
                {loanAmount.toLocaleString('en-IN')}
              </div>
            </div>
            <Slider
              id="loan-amount"
              min={25000}
              max={5000000}
              step={5000}
              value={[loanAmount]}
              onValueChange={(value) => setLoanAmount(value[0])}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>₹25,000</span>
              <span>₹50,00,000</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="interest-rate" className="text-base font-semibold">
                Interest Rate (p.a.)
              </Label>
              <span className="text-sm font-medium text-primary">{interestRate}%</span>
            </div>
            <Select
              value={interestRate.toString()}
              onValueChange={(value) => setInterestRate(parseFloat(value))}
            >
              <SelectTrigger id="interest-rate">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">0% (No Cost EMI)</SelectItem>
                <SelectItem value="9.99">9.99%</SelectItem>
                <SelectItem value="10.99">10.99%</SelectItem>
                <SelectItem value="11.99">11.99%</SelectItem>
                <SelectItem value="12.99">12.99%</SelectItem>
                <SelectItem value="13.99">13.99%</SelectItem>
                <SelectItem value="14.99">14.99%</SelectItem>
                <SelectItem value="15.99">15.99%</SelectItem>
                <SelectItem value="17.99">17.99%</SelectItem>
                <SelectItem value="18.99">18.99%</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tenure */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="tenure" className="text-base font-semibold">
                Loan Tenure
              </Label>
              <span className="text-sm font-medium text-primary">{tenure} months</span>
            </div>
            <Slider
              id="tenure"
              min={3}
              max={36}
              step={3}
              value={[tenure]}
              onValueChange={(value) => setTenure(value[0])}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>3 months</span>
              <span>36 months</span>
            </div>
          </div>

          {/* Quick Tenure Options */}
          <div className="space-y-2">
            <Label className="text-sm">Quick Select:</Label>
            <div className="grid grid-cols-4 gap-2">
              {[6, 12, 18, 24].map((months) => (
                <button
                  key={months}
                  onClick={() => setTenure(months)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg border-2 transition-all ${
                    tenure === months
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-primary'
                  }`}
                >
                  {months}M
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      <div className="space-y-6">
        {/* EMI Amount Card */}
        <Card className="bg-gradient-to-br from-primary to-primary/80 text-white border-0">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm opacity-90 mb-2">Monthly EMI</p>
              <div className="flex items-center justify-center gap-2 mb-1">
                <IndianRupee className="h-8 w-8" />
                <p className="text-5xl font-bold">{formatCurrency(emi).replace('₹', '')}</p>
              </div>
              <p className="text-xs opacity-75 mt-2">per month for {tenure} months</p>
            </div>
          </CardContent>
        </Card>

        {/* Breakdown Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Payment Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Principal Amount */}
            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <span className="text-gray-600">Principal Amount</span>
              <span className="font-semibold text-gray-900">{formatCurrency(loanAmount)}</span>
            </div>

            {/* Total Interest */}
            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <span className="text-gray-600">Total Interest</span>
              <span className="font-semibold text-orange-600">
                {formatCurrency(totalInterest)}
              </span>
            </div>

            {/* Total Amount */}
            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <span className="text-gray-600">Total Amount Payable</span>
              <span className="font-semibold text-primary">{formatCurrency(totalAmount)}</span>
            </div>

            {/* Visual Breakdown */}
            <div className="pt-2">
              <div className="h-4 w-full rounded-full overflow-hidden bg-gray-200 flex">
                <div
                  className="bg-primary"
                  style={{ width: `${(loanAmount / totalAmount) * 100}%` }}
                />
                <div
                  className="bg-orange-500"
                  style={{ width: `${(totalInterest / totalAmount) * 100}%` }}
                />
              </div>
              <div className="flex justify-between mt-2 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-gray-600">
                    Principal ({((loanAmount / totalAmount) * 100).toFixed(1)}%)
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-orange-500" />
                  <span className="text-gray-600">
                    Interest ({((totalInterest / totalAmount) * 100).toFixed(1)}%)
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <TrendingUp className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
              <div className="text-sm text-blue-900">
                <p className="font-semibold mb-1">Need Help?</p>
                <p className="text-blue-700">
                  Our finance experts can help you choose the best payment plan. Book a free
                  consultation today.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}