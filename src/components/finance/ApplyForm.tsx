"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  User,
  MapPin,
  Briefcase,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  FileText,
  ArrowRight,
  ArrowLeft,
  Shield,
  Upload,
  X,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";



const isBrowser = typeof window !== "undefined";



const financeApplicationSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),

  address: z.string().min(10, "Address must be at least 10 characters"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(1, "State is required"),
  postcode: z.string().regex(/^[A-Z0-9\s]{3,8}$/, "Postcode must be 3-8 characters and can include letters, numbers, and spaces"),
  residenceType: z.enum(["owned", "rented", "family"], {
    required_error: "Please select residence type",
  }),
  yearsAtAddress: z.string().min(1, "Required"),

  employmentType: z.enum(["salaried", "self-employed", "business", "professional"], {
    required_error: "Please select employment type",
  }),
  employerName: z.string().min(2, "Employer/Business name is required"),
  designation: z.string().min(2, "Designation/Profession is required"),
  yearsOfEmployment: z.string().min(1, "Required"),
  monthlyIncome: z.string().min(1, "Monthly income is required"),
  officeAddress: z.string().min(10, "Office address is required"),

  loanAmount: z.string().min(1, "Loan amount is required"),
  loanPurpose: z.string().min(10, "Please specify loan purpose (minimum 10 characters)"),
  preferredTenure: z.string().min(1, "Preferred tenure is required"),

  documents: z
  .custom<FileList | undefined>()
  .refine((files) => {
    if (!isBrowser) return true;
    return files && files.length > 0;
  }, "Please upload at least one document")
  .refine((files) => {
    if (!isBrowser) return true;
    return files && files.length <= 2;
  }, "Maximum 2 documents allowed"),

  consentToCredit: z.boolean().refine((val) => val === true, {
    message: "You must consent to credit check",
  }),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to terms and conditions",
  }),
});

type FinanceApplicationFormData = z.infer<typeof financeApplicationSchema>;

interface ApplyFormProps {
  financeOption?: {
    id: string;
    name: string;
    provider: string;
  };
  prefilledData?: Partial<FinanceApplicationFormData>;
  onSubmit: (data: FinanceApplicationFormData) => Promise<void>;
  className?: string;
}

const STEPS = [
  { id: 1, title: "Personal Info", icon: User, description: "Basic personal details" },
  { id: 2, title: "Address", icon: MapPin, description: "Residential information" },
  { id: 3, title: "Employment", icon: Briefcase, description: "Employment details" },
  { id: 4, title: "Loan Details", icon: CreditCard, description: "Loan requirements" },
  { id: 5, title: "Documents", icon: FileText, description: "Consent & documents" },
];

const UKStates = [
  "England", "Scotland", "Wales", "Northern Ireland"
];

export default function ApplyForm({
  financeOption,
  prefilledData,
  onSubmit,
  className,
}: ApplyFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FinanceApplicationFormData>({
    resolver: zodResolver(financeApplicationSchema),
    defaultValues: prefilledData || {
      residenceType: "owned",
      employmentType: "salaried",
      consentToCredit: false,
      agreeToTerms: false,
    },
    mode: "onChange",
  });

  // 1. Get the current files from watch
const files = form.watch("documents");

// Change the array conversion to this:
const fileArray = (isBrowser && files instanceof FileList) 
  ? Array.from(files) 
  : [];

const removeFile = (indexToRemove: number) => {
  // 1. Filter the array to remove the specific index
  const updatedFiles = fileArray.filter((_, index) => index !== indexToRemove);
  
  // 2. Create a new DataTransfer object to reconstruct a FileList
  const dataTransfer = new DataTransfer();
  updatedFiles.forEach((file) => dataTransfer.items.add(file));
  
  // 3. Update the form state
  form.setValue("documents", dataTransfer.files, { shouldValidate: true });
};

const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const selectedFiles = e.target.files;
  if (!selectedFiles) return;

  const existingFiles = fileArray;
  const limitedFiles = [...existingFiles, ...Array.from(selectedFiles)].slice(0, 2);

  for (const file of limitedFiles) {
    if (file.size > 5 * 1024 * 1024) {
     alert(`File "${file.name}" exceeds the 5MB size limit and will not be added.`);
      
      // CRITICAL: Reset the physical input so the browser doesn't hold the files
      e.target.value = ""; 
      return; 
    }
  }

  const dataTransfer = new DataTransfer();
  limitedFiles.forEach((file) => dataTransfer.items.add(file));

  form.setValue("documents", dataTransfer.files, { 
    shouldValidate: true,
    shouldDirty: true 
  });
};

  const onFormSubmit = async (data: FinanceApplicationFormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      toast({
        title: "Application Submitted Successfully! 🎉",
        description: "We'll review your application and get back to you within 24 hours.",
      });

      form.reset();
      setCurrentStep(1);
    } catch (error) {
      toast({
        variant: "error",
        title: "Submission Failed",
        description: "Please try again or contact support if the issue persists.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = async () => {
    const fields = getFieldsForStep(currentStep);
    const isValid = await form.trigger(fields as any);
    
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      toast({
        variant: "error",
        title: "Validation Error",
        description: "Please fill in all required fields correctly.",
      });
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getFieldsForStep = (step: number): (keyof FinanceApplicationFormData)[] => {
    switch (step) {
      case 1:
        return ["firstName", "lastName", "email", "phone", "dateOfBirth"];
      case 2:
        return ["address", "city", "state", "postcode", "residenceType", "yearsAtAddress"];
      case 3:
        return ["employmentType", "employerName", "designation", "yearsOfEmployment", "monthlyIncome", "officeAddress"];
      case 4:
        return ["loanAmount", "loanPurpose", "preferredTenure"];
      case 5:
        return ["consentToCredit",  "agreeToTerms", "documents"];
      default:
        return [];
    }
  };

  const progress = (currentStep / STEPS.length) * 100;

  return (
    <div className={cn("space-y-6", className)}>
      {/* Finance Option Info */}
      {financeOption && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-primary/10">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Applying for</p>
                <p className="font-semibold text-lg">{financeOption.name}</p>
                <p className="text-sm text-muted-foreground">by {financeOption.provider}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Progress Stepper */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Application Progress</h3>
              <Badge variant="outline">
                Step {currentStep} of {STEPS.length}
              </Badge>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            
            {/* Step Indicators */}
            <div className="flex justify-between">
              {STEPS.map((step) => {
                const Icon = step.icon;
                const isCompleted = currentStep > step.id;
                const isCurrent = currentStep === step.id;

                return (
                  <div key={step.id} className="flex flex-col items-center gap-2">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                        isCompleted && "bg-primary border-primary text-primary-foreground",
                        isCurrent && "border-primary text-primary scale-110",
                        !isCompleted && !isCurrent && "border-muted text-muted-foreground"
                      )}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        <Icon className="h-5 w-5" />
                      )}
                    </div>
                    <span className="text-xs text-center hidden sm:block max-w-[80px]">
                      {step.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form */}
      <form onSubmit={form.handleSubmit(onFormSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {(() => {
                const StepIcon = STEPS[currentStep - 1].icon;
                return <StepIcon className="h-5 w-5 text-primary" />;
              })()}
              {STEPS[currentStep - 1].title}
            </CardTitle>
            <CardDescription>
              {STEPS[currentStep - 1].description}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium">
                      First Name <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="firstName"
                      {...form.register("firstName")}
                      placeholder="John"
                      className={cn(
                        form.formState.errors.firstName && "border-destructive"
                      )}
                    />
                    {form.formState.errors.firstName && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.firstName.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium">
                      Last Name <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="lastName"
                      {...form.register("lastName")}
                      placeholder="Doe"
                      className={cn(
                        form.formState.errors.lastName && "border-destructive"
                      )}
                    />
                    {form.formState.errors.lastName && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email Address <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="email"
                      type="email"
                      {...form.register("email")}
                      placeholder="john.doe@example.com"
                      className={cn(
                        form.formState.errors.email && "border-destructive"
                      )}
                    />
                    {form.formState.errors.email && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">
                      Phone Number <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      {...form.register("phone")}
                      placeholder="9876543210"
                      maxLength={10}
                      className={cn(
                        form.formState.errors.phone && "border-destructive"
                      )}
                    />
                    {form.formState.errors.phone && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="dateOfBirth" className="text-sm font-medium">
                      Date of Birth <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      {...form.register("dateOfBirth")}
                      max={new Date().toISOString().split('T')[0]}
                      className={cn(
                        form.formState.errors.dateOfBirth && "border-destructive"
                      )}
                    />
                    {form.formState.errors.dateOfBirth && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.dateOfBirth.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Address Information */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="address" className="text-sm font-medium">
                    Residential Address <span className="text-destructive">*</span>
                  </label>
                  <Textarea
                    id="address"
                    {...form.register("address")}
                    placeholder="House/Flat No., Street, Area, Landmark"
                    rows={3}
                    className={cn(
                      form.formState.errors.address && "border-destructive"
                    )}
                  />
                  {form.formState.errors.address && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.address.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="city" className="text-sm font-medium">
                      City <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="city"
                      {...form.register("city")}
                      placeholder="E.g. 'London'"
                      className={cn(
                        form.formState.errors.city && "border-destructive"
                      )}
                    />
                    {form.formState.errors.city && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.city.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="state" className="text-sm font-medium">
                      State <span className="text-destructive">*</span>
                    </label>
                     <Select onValueChange={(value) => form.setValue("state", value, { shouldValidate: true })}>
                <SelectTrigger className={`w-full h-10 pl-3 pr-3 py-2 border rounded-md ${
                  form.formState.errors.state ? 'border-red-500' : 'border-gray-300'
                }`}>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>State</SelectLabel>
                    {UKStates.map((state) => (
                      <SelectItem key={state} value={state.toLowerCase()}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

                    {form.formState.errors.state && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.state.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="postcode" className="text-sm font-medium">
                      Postcode <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="postcode"
                      type="tel"
                      {...form.register("postcode")}
                      placeholder="E.g. 'CR4 7BU'"
                      maxLength={8}
                      className={cn(
                        form.formState.errors.postcode && "border-destructive"
                      )}
                    />
                    {form.formState.errors.postcode && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.postcode.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Residence Type <span className="text-destructive">*</span>
                    </label>
                    <RadioGroup defaultValue={form.getValues("residenceType")} className="space-y-2">
                      {[
                        { value: "owned", label: "Owned" },
                        { value: "rented", label: "Rented" },
                        { value: "family", label: "Family Owned" },
                      ].map((option) => (
                        <div key={option.value} className="flex items-center space-x-2">
                          <RadioGroupItem
                            id={`residence-${option.value}`}
                            value={option.value}
                            {...form.register("residenceType")}
                            className="w-4 h-4 text-primary focus:ring-primary"
                          />
                          <Label htmlFor={`residence-${option.value}`} className="cursor-pointer text-sm">
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="yearsAtAddress" className="text-sm font-medium">
                      Years at Current Address <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="yearsAtAddress"
                      type="number"
                      {...form.register("yearsAtAddress")}
                      placeholder="3"
                      min="0"
                      className={cn(
                        form.formState.errors.yearsAtAddress && "border-destructive"
                      )}
                    />
                    {form.formState.errors.yearsAtAddress && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.yearsAtAddress.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Employment Information */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Employment Type <span className="text-destructive">*</span>
                  </label>
                  <RadioGroup defaultValue={form.getValues("employmentType")} className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {[
                      { value: "salaried", label: "Salaried" },
                      { value: "self-employed", label: "Self Employed" },
                      { value: "business", label: "Business" },
                      { value: "professional", label: "Professional" },
                    ].map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <RadioGroupItem
                          id={`employment-${option.value}`}
                          value={option.value}
                          {...form.register("employmentType")}
                          className="w-4 h-4 text-lomash-primary focus:ring-lomash-primary"
                        />
                        <Label htmlFor={`employment-${option.value}`} className="cursor-pointer text-sm">
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="employerName" className="text-sm font-medium">
                      Employer/Business Name <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="employerName"
                      {...form.register("employerName")}
                      placeholder="Company Name"
                      className={cn(
                        "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lomash-primary",
                        form.formState.errors.employerName && "border-destructive"
                      )}
                    />
                    {form.formState.errors.employerName && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.employerName.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="designation" className="text-sm font-medium">
                      Designation/Profession <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="designation"
                      {...form.register("designation")}
                      placeholder="Software Engineer"
                      className={cn(
                        "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lomash-primary",
                        form.formState.errors.designation && "border-destructive"
                      )}
                    />
                    {form.formState.errors.designation && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.designation.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="yearsOfEmployment" className="text-sm font-medium">
                      Years of Employment <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="yearsOfEmployment"
                      type="number"
                      {...form.register("yearsOfEmployment")}
                      placeholder="5"
                      min="0"
                      className={cn(
                        "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lomash-primary",
                        form.formState.errors.yearsOfEmployment && "border-destructive"
                      )}
                    />
                    {form.formState.errors.yearsOfEmployment && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.yearsOfEmployment.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="monthlyIncome" className="text-sm font-medium">
                      Monthly/Yearly Income (£) <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="monthlyIncome"
                      type="number"
                      {...form.register("monthlyIncome")}
                      placeholder="enter income"
                      min="0"
                      className={cn(
                        "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lomash-primary",
                        form.formState.errors.monthlyIncome && "border-destructive"
                      )}
                    />
                    {form.formState.errors.monthlyIncome && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.monthlyIncome.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="officeAddress" className="text-sm font-medium">
                    Office Address <span className="text-destructive">*</span>
                  </label>
                  <Textarea
                    id="officeAddress"
                    {...form.register("officeAddress")}
                    placeholder="Office/Business address"
                    rows={3}
                    className={cn(
                      "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lomash-primary",
                      form.formState.errors.officeAddress && "border-destructive"
                    )}
                  />
                  {form.formState.errors.officeAddress && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.officeAddress.message}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Step 4: Loan Information */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="loanAmount" className="text-sm font-medium">
                      Loan Amount (£) <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="loanAmount"
                      type="number"
                      {...form.register("loanAmount")}
                      placeholder="Enter loan amount"
                      min="50000"
                      className={cn(
                        "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lomash-primary",
                        form.formState.errors.loanAmount && "border-destructive"
                      )}
                    />
                    {form.formState.errors.loanAmount && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.loanAmount.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="preferredTenure" className="text-sm font-medium">
                      Preferred Tenure <span className="text-destructive">*</span>
                    </label>
                    <Select
                      onValueChange={(value) => form.setValue("preferredTenure", value, { shouldValidate: true })}
                    >
                      <SelectTrigger
                        id="preferredTenure"
                        className={cn(
                          "w-full h-10 pl-3 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lomash-primary",
                          form.formState.errors.preferredTenure && "border-destructive"
                        )}
                      >
                        <SelectValue placeholder="Select tenure" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Tenure</SelectLabel>
                          {[6, 12, 18, 24, 36, 48, 60].map((months) => (
                            <SelectItem key={months} value={months.toString()}>
                              {months} months ({Math.floor(months / 12)} {months >= 24 ? 'years' : 'year'})
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {/* <select
                      id="preferredTenure"
                      {...form.register("preferredTenure")}
                      className={cn(
                        "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lomash-primary",
                        form.formState.errors.preferredTenure && "border-destructive"
                      )}
                    >
                      <option value="">Select tenure</option>
                      {[6, 12, 18, 24, 36, 48, 60].map((months) => (
                        <option key={months} value={months.toString()}>
                          {months} months ({Math.floor(months / 12)} {months >= 24 ? 'years' : 'year'})
                        </option>
                      ))}
                    </select>
                      */}
                    {form.formState.errors.preferredTenure && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.preferredTenure.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="loanPurpose" className="text-sm font-medium">
                    Loan Purpose <span className="text-destructive">*</span>
                  </label>
                  <Textarea
                    id="loanPurpose"
                    {...form.register("loanPurpose")}
                    placeholder="Please specify the purpose of the loan (e.g., Kitchen renovation, Bedroom furniture, Modular kitchen installation)"
                    rows={4}
                    className={cn(
                      "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lomash-primary",
                      form.formState.errors.loanPurpose && "border-destructive"
                    )}
                  />
                  {form.formState.errors.loanPurpose && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.loanPurpose.message}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Step 5: Documents & Consent */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="p-4 rounded-lg bg-muted/50 border">
                  <div className="flex items-start gap-2 mb-4">
                    <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium mb-1">Required Documents</h4>
                      <p className="text-sm text-muted-foreground">
                        Please keep the following documents ready for upload:
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      Last 3 months' salary slips
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      Last 6 months' bank statements
                    </li>
                  </ul>
                </div>

                {/* Upload Documents Section */}
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-4 mb-4">
  {fileArray.map((file, index) => {
    const isImage = file.type.startsWith("image/");
    
    return (
      <div key={index} className="relative group w-24 h-24 border rounded-lg p-1 bg-white shadow-sm">
        {isImage ? (
          <Image
            src={URL.createObjectURL(file)}
            alt={`Preview ${index}`}
            height={96}
            width={96}
            className="w-full h-full object-cover rounded-md"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 rounded-md">
            <FileText className="h-8 w-8 text-gray-400" />
            <span className="text-[10px] truncate w-full px-1 text-center">{file.name}</span>
          </div>
        )}

        {/* Delete Button */}
        <button
          type="button"
          onClick={() => removeFile(index)}
          className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-md"
          title="Remove file"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
    );
  })}
</div>
                
                <div className="space-y-2">
                  <label htmlFor="documents" className="text-sm font-medium">
                    Upload Documents
                  </label>
                  <div className="border rounded-md p-4">
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="documents"
                        className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg  bg-gray-50  transition-colors duration-200 text-center
                          ${(form.watch("documents")?.length ?? 0) >= 2 ? "cursor-not-allowed opacity-50 " : "cursor-pointer hover:border-lomash-primary hover:bg-lomash-primary/10"}
                          `}
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-4 text-gray-500" />
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">PDF, DOCX, JPG (MAX. 10MB)</p>
                        </div>
                        <input
                        {...form.register("documents",{
                          onChange(event) {
                            handleFileChange(event);
                          },
                          validate: {
                            fileCount: (files) => {
                              if (files && files.length > 2) {
                                return "You can upload a maximum of 2 documents";
                              }
                              if (files && files.length < 1) {
                                return "Please upload at least one document";
                              }
                              return true;
                            },
                            fileSize: (files) => {
                              if (files) {
                                for (let i = 0; i < files.length; i++) {
                                  if (files[i].size > 10 * 1024 * 1024) {
                                    return `File ${files[i].name} exceeds the maximum size of 10MB`;
                                  }
                                }
                              }
                              return true;
                            },
                            fileType: (files) => {
                              const allowedTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "image/jpeg", "image/png"];
                              if (files) {
                                for (let i = 0; i < files.length; i++) {
                                  if (!allowedTypes.includes(files[i].type)) {
                                    return `File ${files[i].name} is not an allowed type`;
                                  }
                                }
                              }
                              return true;
                            },
                          }
                        })}
                        disabled={
                          (form.watch("documents")?.length ?? 0) >= 2
                        }
                        className= {cn(
                          "hidden",
                          form.formState.errors.documents && "border-destructive"
                        )}
                        min={1}
                        max={2}
                        multiple
                        accept=".pdf, .docx, .jpg, .jpeg, .png"
                         id="documents" type="file"/>
                      </label>
                    </div>
                  </div>
                 
                  {
                    form.formState.errors.documents && (
                      <p className="text-sm text-destructive">
                        {typeof form.formState.errors.documents.message === 'string'
                          ? form.formState.errors.documents.message
                          : 'Please upload at least one document'}
                      </p>
                    )
                  }
                </div>
                </div>
                <Separator />

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="consentToCredit"
                      checked={form.watch("consentToCredit")}
                      onCheckedChange={(checked: boolean) =>
                        form.setValue("consentToCredit", checked, { shouldValidate: true })
                      }
                    />
                    <div className="space-y-1 leading-none">
                      <label
                        htmlFor="consentToCredit"
                        className="cursor-pointer font-normal text-sm"
                      >
                        I authorize Lomash Wood and its finance partners to access my credit
                        information from credit bureaus for loan processing{" "}
                        <span className="text-destructive">*</span>
                      </label>
                    </div>
                  </div>
                  {form.formState.errors.consentToCredit && (
                    <p className="text-sm text-destructive ml-7">
                      {form.formState.errors.consentToCredit.message}
                    </p>
                  )}

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="agreeToTerms"
                      checked={form.watch("agreeToTerms")}
                      onCheckedChange={(checked: boolean) =>
                        form.setValue("agreeToTerms", checked, { shouldValidate: true })
                      }
                    />
                    <div className="space-y-1 leading-none">
                      <label
                        htmlFor="agreeToTerms"
                        className="cursor-pointer font-normal text-sm"
                      >
                        I agree to the{" "}
                        <a href="/terms-conditions" className="text-primary hover:underline">
                          terms and conditions
                        </a>{" "}
                        and{" "}
                        <a href="/privacy-policy" className="text-primary hover:underline">
                          privacy policy
                        </a>{" "}
                        <span className="text-destructive">*</span>
                      </label>
                    </div>
                  </div>
                  {form.formState.errors.agreeToTerms && (
                    <p className="text-sm text-destructive ml-7">
                      {form.formState.errors.agreeToTerms.message}
                    </p>
                  )}
                </div>

                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium mb-1">Your data is secure</h4>
                      <p className="text-sm text-muted-foreground">
                        All information is encrypted and handled in accordance with industry
                        standards and regulatory requirements. We never share your personal
                        information without your consent.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                className="text-lg font-medium"
                disabled={currentStep === 1}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>

              <div className="text-sm font-medium text-muted-foreground">
                Step {currentStep} of {STEPS.length}
              </div>

              {currentStep < STEPS.length ? (
                <Button
                className="text-lg font-medium"
                 type="button" onClick={nextStep}>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <span className="mr-2">Submitting...</span>
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    </>
                  ) : (
                    <>
                      Submit Application
                      <CheckCircle2 className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}