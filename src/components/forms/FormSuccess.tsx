"use client";

import { CheckCircle2, PartyPopper, Mail, Calendar, Download, ArrowRight, Home } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface FormSuccessAction {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link";
  icon?: ReactNode;
}

interface FormSuccessProps {
  title?: string;
  message?: string;
  description?: string;
  variant?: "default" | "celebration" | "minimal" | "card";
  icon?: ReactNode;
  showConfetti?: boolean;
  details?: Array<{
    label: string;
    value: string | ReactNode;
    icon?: ReactNode;
  }>;
  actions?: FormSuccessAction[];
  className?: string;
  children?: ReactNode;
}

export default function FormSuccess({
  title = "Success!",
  message = "Your submission has been received.",
  description,
  variant = "default",
  icon,
  showConfetti = false,
  details,
  actions,
  className,
  children,
}: FormSuccessProps) {
  const defaultIcon = variant === "celebration" ? (
    <PartyPopper className="h-12 w-12 text-primary" />
  ) : (
    <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400" />
  );

  if (variant === "minimal") {
    return (
      <div className={cn("flex items-start gap-3 p-4 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800", className)}>
        <div className="flex-shrink-0 mt-0.5">
          {icon || <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />}
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-green-900 dark:text-green-100">
            {title}
          </p>
          {message && (
            <p className="text-sm text-green-700 dark:text-green-300 mt-1">
              {message}
            </p>
          )}
          {children}
        </div>
      </div>
    );
  }

  if (variant === "card") {
    return (
      <Card className={cn("border-green-200 dark:border-green-800", className)}>
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
              {icon || defaultIcon}
            </div>
          </div>
          <CardTitle className="text-2xl">{title}</CardTitle>
          {message && <CardDescription className="text-base">{message}</CardDescription>}
        </CardHeader>

        {(details || description || children) && (
          <CardContent className="space-y-4">
            {description && (
              <p className="text-sm text-muted-foreground text-center">
                {description}
              </p>
            )}

            {details && details.length > 0 && (
              <>
                <Separator />
                <div className="space-y-3">
                  {details.map((detail, index) => (
                    <div key={index} className="flex items-start gap-3">
                      {detail.icon && (
                        <div className="flex-shrink-0 mt-0.5 text-muted-foreground">
                          {detail.icon}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          {detail.label}
                        </p>
                        <p className="text-sm font-medium mt-1">
                          {detail.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {children}
          </CardContent>
        )}

        {actions && actions.length > 0 && (
          <CardFooter className="flex flex-col sm:flex-row gap-3 pt-4">
            {actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant || (index === 0 ? "default" : "outline")}
                className="w-full sm:w-auto"
                onClick={action.onClick}
                asChild={!!action.href}
              >
                {action.href ? (
                  <a href={action.href}>
                    {action.icon}
                    {action.label}
                  </a>
                ) : (
                  <>
                    {action.icon}
                    {action.label}
                  </>
                )}
              </Button>
            ))}
          </CardFooter>
        )}
      </Card>
    );
  }

  return (
    <div className={cn("text-center py-12 px-4", className)}>
      {/* Icon */}
      <div className="flex justify-center mb-6">
        <div className={cn(
          "p-4 rounded-full",
          variant === "celebration" 
            ? "bg-gradient-to-br from-primary/20 to-primary/10 animate-bounce" 
            : "bg-green-100 dark:bg-green-900"
        )}>
          {icon || defaultIcon}
        </div>
      </div>

      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-bold mb-3">
        {title}
      </h2>

      {/* Message */}
      {message && (
        <p className="text-base md:text-lg text-muted-foreground mb-6 max-w-md mx-auto">
          {message}
        </p>
      )}

      {/* Description */}
      {description && (
        <p className="text-sm text-muted-foreground mb-8 max-w-lg mx-auto">
          {description}
        </p>
      )}

      {/* Details */}
      {details && details.length > 0 && (
        <div className="max-w-lg mx-auto mb-8">
          <div className="bg-muted/50 rounded-lg p-6 space-y-4 text-left">
            {details.map((detail, index) => (
              <div key={index}>
                {index > 0 && <Separator className="my-4" />}
                <div className="flex items-start gap-3">
                  {detail.icon && (
                    <div className="flex-shrink-0 mt-1 text-muted-foreground">
                      {detail.icon}
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      {detail.label}
                    </p>
                    <p className="text-sm font-medium mt-1">
                      {detail.value}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Children */}
      {children && (
        <div className="max-w-lg mx-auto mb-8">
          {children}
        </div>
      )}

      {/* Actions */}
      {actions && actions.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant || (index === 0 ? "default" : "outline")}
              size="lg"
              onClick={action.onClick}
              asChild={!!action.href}
            >
              {action.href ? (
                <a href={action.href}>
                  {action.icon}
                  {action.label}
                </a>
              ) : (
                <>
                  {action.icon}
                  {action.label}
                </>
              )}
            </Button>
          ))}
        </div>
      )}

      {/* Confetti effect placeholder */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {/* Add confetti animation library here if needed */}
        </div>
      )}
    </div>
  );
}

export function AppointmentSuccess({
  appointmentDetails,
  onViewAppointment,
  onBookAnother,
}: {
  appointmentDetails?: {
    date: string;
    time: string;
    service: string;
    location?: string;
  };
  onViewAppointment?: () => void;
  onBookAnother?: () => void;
}) {
  return (
    <FormSuccess
      variant="card"
      title="Appointment Booked!"
      message="Your appointment has been confirmed. We've sent a confirmation email with all the details."
      details={appointmentDetails ? [
        {
          label: "Date & Time",
          value: `${appointmentDetails.date} at ${appointmentDetails.time}`,
          icon: <Calendar className="h-4 w-4" />,
        },
        {
          label: "Service",
          value: appointmentDetails.service,
        },
        ...(appointmentDetails.location ? [{
          label: "Location",
          value: appointmentDetails.location,
        }] : []),
      ] : undefined}
      actions={[
        ...(onViewAppointment ? [{
          label: "View Appointment",
          onClick: onViewAppointment,
          icon: <Calendar className="mr-2 h-4 w-4" />,
        }] : []),
        ...(onBookAnother ? [{
          label: "Book Another",
          onClick: onBookAnother,
          variant: "outline" as const,
        }] : []),
        {
          label: "Go Home",
          href: "/",
          variant: "ghost" as const,
          icon: <Home className="mr-2 h-4 w-4" />,
        },
      ]}
    />
  );
}

export function ContactSuccess({
  referenceNumber,
  onContinueBrowsing,
}: {
  referenceNumber?: string;
  onContinueBrowsing?: () => void;
}) {
  return (
    <FormSuccess
      variant="card"
      title="Message Sent!"
      message="Thank you for contacting us. We'll get back to you within 24 hours."
      details={referenceNumber ? [
        {
          label: "Reference Number",
          value: referenceNumber,
          icon: <Mail className="h-4 w-4" />,
        },
      ] : undefined}
      description="We've sent a confirmation email to your inbox."
      actions={[
        {
          label: "Continue Browsing",
          onClick: onContinueBrowsing,
          href: onContinueBrowsing ? undefined : "/",
          icon: <ArrowRight className="mr-2 h-4 w-4" />,
        },
      ]}
    />
  );
}

export function BrochureSuccess({
  downloadUrl,
  onDownload,
}: {
  downloadUrl?: string;
  onDownload?: () => void;
}) {
  return (
    <FormSuccess
      variant="celebration"
      title="Brochure Request Received!"
      message="We've sent the brochure to your email address."
      description="You can also download it directly using the button below."
      actions={[
        ...(downloadUrl || onDownload ? [{
          label: "Download Brochure",
          href: downloadUrl,
          onClick: onDownload,
          icon: <Download className="mr-2 h-4 w-4" />,
        }] : []),
        {
          label: "Explore Products",
          href: "/kitchen",
          variant: "outline" as const,
          icon: <ArrowRight className="mr-2 h-4 w-4" />,
        },
      ]}
    />
  );
}

export function NewsletterSuccess() {
  return (
    <FormSuccess
      variant="minimal"
      title="Successfully subscribed!"
      message="Check your email to confirm your subscription."
    />
  );
}

export function BusinessInquirySuccess({
  referenceNumber,
}: {
  referenceNumber?: string;
}) {
  return (
    <FormSuccess
      variant="card"
      title="Partnership Inquiry Received!"
      message="Thank you for your interest in partnering with Lomash Wood. Our business development team will review your application and contact you within 48 hours."
      details={referenceNumber ? [
        {
          label: "Reference Number",
          value: referenceNumber,
          icon: <Mail className="h-4 w-4" />,
        },
      ] : undefined}
      actions={[
        {
          label: "Back to Home",
          href: "/",
          icon: <Home className="mr-2 h-4 w-4" />,
        },
      ]}
    />
  );
}

export function QuoteSuccess({
  quoteDetails,
}: {
  quoteDetails?: {
    quoteNumber: string;
    product: string;
  };
}) {
  return (
    <FormSuccess
      variant="card"
      title="Quote Request Submitted!"
      message="Our team will prepare a detailed quote and send it to you within 24 hours."
      details={quoteDetails ? [
        {
          label: "Quote Number",
          value: quoteDetails.quoteNumber,
        },
        {
          label: "Product",
          value: quoteDetails.product,
        },
      ] : undefined}
      actions={[
        {
          label: "View My Account",
          href: "/my-account",
          icon: <ArrowRight className="mr-2 h-4 w-4" />,
        },
        {
          label: "Continue Shopping",
          href: "/kitchen",
          variant: "outline" as const,
        },
      ]}
    />
  );
}