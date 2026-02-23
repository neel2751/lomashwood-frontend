"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import type { ReactNode } from "react";
import type { UseFormReturn, FieldValues, Path } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField as ShadcnFormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type InputType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "tel"
  | "url"
  | "textarea"
  | "select"
  | "checkbox"
  | "radio"
  | "switch"
  | "date";

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

interface FormFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  description?: string;
  type?: InputType;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  inputClassName?: string;
  icon?: ReactNode;
  options?: SelectOption[] | RadioOption[];
  rows?: number;
  min?: number;
  max?: number;
  step?: number;
  maxLength?: number;
  autoComplete?: string;
  showCharCount?: boolean;
  dateFormat?: string;
}

export default function FormField<T extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  description,
  type = "text",
  disabled = false,
  required = false,
  className,
  inputClassName,
  icon,
  options = [],
  rows = 3,
  min,
  max,
  step,
  maxLength,
  autoComplete,
  showCharCount = false,
  dateFormat = "PPP",
}: FormFieldProps<T>) {
  const renderInput = (field: any) => {
    switch (type) {
      case "textarea":
        return (
          <div className="relative">
            {icon && (
              <div className="absolute left-3 top-3 text-muted-foreground">
                {icon}
              </div>
            )}
            <Textarea
              {...field}
              placeholder={placeholder}
              disabled={disabled}
              rows={rows}
              maxLength={maxLength}
              className={cn(icon && "pl-9", inputClassName)}
            />
            {showCharCount && maxLength && (
              <div className="text-xs text-muted-foreground mt-1 text-right">
                {field.value?.length || 0}/{maxLength}
              </div>
            )}
          </div>
        );

      case "select":
        return (
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            disabled={disabled}
          >
            <FormControl>
              <SelectTrigger className={inputClassName}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {(options as SelectOption[]).map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "checkbox":
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={disabled}
              id={name}
            />
            {label && (
              <label
                htmlFor={name}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {label}
                {required && <span className="text-destructive ml-1">*</span>}
              </label>
            )}
          </div>
        );

      case "radio":
        return (
          <RadioGroup
            onValueChange={field.onChange}
            defaultValue={field.value}
            disabled={disabled}
            className="space-y-2"
          >
            {(options as RadioOption[]).map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.value} />
                <label
                  htmlFor={option.value}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {option.label}
                  {option.description && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {option.description}
                    </p>
                  )}
                </label>
              </div>
            ))}
          </RadioGroup>
        );

      case "switch":
        return (
          <div className="flex items-center space-x-2">
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={disabled}
              id={name}
            />
            {label && (
              <label
                htmlFor={name}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {label}
              </label>
            )}
          </div>
        );

      case "date":
        return (
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground",
                    inputClassName
                  )}
                  disabled={disabled}
                >
                  {field.value ? (
                    format(field.value, dateFormat)
                  ) : (
                    <span>{placeholder || "Pick a date"}</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={disabled}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        );

      case "number":
        return (
          <div className="relative">
            {icon && (
              <div className="absolute left-3 top-3 text-muted-foreground">
                {icon}
              </div>
            )}
            <Input
              {...field}
              type="number"
              placeholder={placeholder}
              disabled={disabled}
              min={min}
              max={max}
              step={step}
              autoComplete={autoComplete}
              className={cn(icon && "pl-9", inputClassName)}
              onChange={(e) => {
                const value = e.target.value;
                field.onChange(value === "" ? undefined : Number(value));
              }}
            />
          </div>
        );

      default:
        return (
          <div className="relative">
            {icon && (
              <div className="absolute left-3 top-3 text-muted-foreground">
                {icon}
              </div>
            )}
            <Input
              {...field}
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              maxLength={maxLength}
              autoComplete={autoComplete}
              className={cn(icon && "pl-9", inputClassName)}
            />
            {showCharCount && maxLength && (
              <div className="text-xs text-muted-foreground mt-1 text-right">
                {field.value?.length || 0}/{maxLength}
              </div>
            )}
          </div>
        );
    }
  };

  if (type === "checkbox" || type === "switch") {
    return (
      <ShadcnFormField
        control={form.control as any}
        name={name}
        render={({ field }) => (
          <FormItem className={className}>
            <FormControl>{renderInput(field)}</FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  return (
    <ShadcnFormField
      control={form.control as any}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && type !== "radio" && (
            <FormLabel>
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </FormLabel>
          )}
          <FormControl>{renderInput(field)}</FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function TextField<T extends FieldValues>(props: FormFieldProps<T>) {
  return <FormField {...props} type="text" />;
}

export function EmailField<T extends FieldValues>(props: FormFieldProps<T>) {
  return <FormField {...props} type="email" />;
}

export function PasswordField<T extends FieldValues>(props: FormFieldProps<T>) {
  return <FormField {...props} type="password" />;
}

export function NumberField<T extends FieldValues>(props: FormFieldProps<T>) {
  return <FormField {...props} type="number" />;
}

export function PhoneField<T extends FieldValues>(props: FormFieldProps<T>) {
  return <FormField {...props} type="tel" />;
}

export function TextareaField<T extends FieldValues>(props: FormFieldProps<T>) {
  return <FormField {...props} type="textarea" />;
}

export function SelectField<T extends FieldValues>(props: FormFieldProps<T>) {
  return <FormField {...props} type="select" />;
}

export function CheckboxField<T extends FieldValues>(props: FormFieldProps<T>) {
  return <FormField {...props} type="checkbox" />;
}

export function RadioField<T extends FieldValues>(props: FormFieldProps<T>) {
  return <FormField {...props} type="radio" />;
}

export function SwitchField<T extends FieldValues>(props: FormFieldProps<T>) {
  return <FormField {...props} type="switch" />;
}

export function DateField<T extends FieldValues>(props: FormFieldProps<T>) {
  return <FormField {...props} type="date" />;
}