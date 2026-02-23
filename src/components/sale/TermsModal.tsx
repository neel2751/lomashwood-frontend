"use client";

import {
  CheckCircle2,
  AlertCircle,
  Calendar,
  Info,
  FileText,
  Printer,
  Download,
  Shield,
  Tag,
  CreditCard,
  Truck,
  Percent,
} from "lucide-react";
import { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface TermsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  offerDetails?: {
    discountValue: string;
    validFrom: string;
    validTo: string;
    minPurchase?: number;
    category?: string;
  };
  terms: string[];
  conditions?: string;
  additionalInfo?: {
    paymentTerms?: string[];
    deliveryInfo?: string[];
    returnPolicy?: string[];
    warranty?: string[];
  };
  requireAcceptance?: boolean;
  onAccept?: () => void;
  showPrint?: boolean;
  showDownload?: boolean;
  className?: string;
}

export default function TermsModal({
  open,
  onOpenChange,
  title,
  offerDetails,
  terms,
  conditions,
  additionalInfo,
  requireAcceptance = false,
  onAccept,
  showPrint = true,
  showDownload = false,
  className,
}: TermsModalProps) {
  const [hasAccepted, setHasAccepted] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const content = `
${title}
${"=".repeat(title.length)}

${offerDetails ? `
Offer Details:
- Discount: ${offerDetails.discountValue}
- Valid From: ${offerDetails.validFrom}
- Valid To: ${offerDetails.validTo}
${offerDetails.minPurchase ? `- Minimum Purchase: ₹${offerDetails.minPurchase}` : ""}
${offerDetails.category ? `- Category: ${offerDetails.category}` : ""}
` : ""}

Terms & Conditions:
${terms.map((term, i) => `${i + 1}. ${term}`).join("\n")}

${conditions ? `\nAdditional Conditions:\n${conditions}` : ""}

${additionalInfo?.paymentTerms ? `\nPayment Terms:\n${additionalInfo.paymentTerms.map((term, i) => `${i + 1}. ${term}`).join("\n")}` : ""}

${additionalInfo?.deliveryInfo ? `\nDelivery Information:\n${additionalInfo.deliveryInfo.map((info, i) => `${i + 1}. ${info}`).join("\n")}` : ""}

${additionalInfo?.returnPolicy ? `\nReturn Policy:\n${additionalInfo.returnPolicy.map((policy, i) => `${i + 1}. ${policy}`).join("\n")}` : ""}

${additionalInfo?.warranty ? `\nWarranty:\n${additionalInfo.warranty.map((warranty, i) => `${i + 1}. ${warranty}`).join("\n")}` : ""}
    `.trim();

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.replace(/\s+/g, "-").toLowerCase()}-terms.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleAcceptAndClose = () => {
    if (requireAcceptance && !hasAccepted) {
      return;
    }
    onAccept?.();
    onOpenChange(false);
  };


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-2xl max-h-[90vh] flex flex-col", className)}>
        <DialogHeader>
          <DialogTitle className="text-2xl">{title}</DialogTitle>
          <DialogDescription>
            Please review the terms and conditions carefully
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-6 py-4">
            {/* Offer Details */}
            {offerDetails && (
              <div className="p-4 rounded-lg border bg-primary/5 border-primary/20 space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <Tag className="h-4 w-4 text-primary" />
                  Offer Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Percent className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Discount</p>
                      <p className="font-semibold">{offerDetails.discountValue}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Valid Period</p>
                      <p className="font-medium text-xs">
                        {offerDetails.validFrom} - {offerDetails.validTo}
                      </p>
                    </div>
                  </div>
                  {offerDetails.minPurchase && (
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Minimum Purchase</p>
                        <p className="font-semibold">₹{offerDetails.minPurchase.toLocaleString()}</p>
                      </div>
                    </div>
                  )}
                  {offerDetails.category && (
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Category</p>
                        <Badge variant="secondary">{offerDetails.category}</Badge>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Main Terms */}
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Terms & Conditions
              </h3>
              <ul className="space-y-2">
                {terms.map((term, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="flex-1">{term}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Additional Conditions */}
            {conditions && (
              <>
                <Separator />
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-amber-600" />
                    Important Notes
                  </h4>
                  <p className="text-sm text-muted-foreground">{conditions}</p>
                </div>
              </>
            )}

            {/* Additional Information Accordion */}
            {additionalInfo && (
              <>
                <Separator />
                <Accordion type="multiple" className="w-full">
                  {additionalInfo.paymentTerms && additionalInfo.paymentTerms.length > 0 && (
                    <AccordionItem value="payment">
                      <AccordionTrigger className="text-sm font-semibold">
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          Payment Terms
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2">
                          {additionalInfo.paymentTerms.map((term, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <span className="text-muted-foreground">{index + 1}.</span>
                              <span>{term}</span>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  )}

                  {additionalInfo.deliveryInfo && additionalInfo.deliveryInfo.length > 0 && (
                    <AccordionItem value="delivery">
                      <AccordionTrigger className="text-sm font-semibold">
                        <div className="flex items-center gap-2">
                          <Truck className="h-4 w-4" />
                          Delivery Information
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2">
                          {additionalInfo.deliveryInfo.map((info, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <span className="text-muted-foreground">{index + 1}.</span>
                              <span>{info}</span>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  )}

                  {additionalInfo.returnPolicy && additionalInfo.returnPolicy.length > 0 && (
                    <AccordionItem value="returns">
                      <AccordionTrigger className="text-sm font-semibold">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4" />
                          Return Policy
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2">
                          {additionalInfo.returnPolicy.map((policy, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <span className="text-muted-foreground">{index + 1}.</span>
                              <span>{policy}</span>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  )}

                  {additionalInfo.warranty && additionalInfo.warranty.length > 0 && (
                    <AccordionItem value="warranty">
                      <AccordionTrigger className="text-sm font-semibold">
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4" />
                          Warranty Information
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2">
                          {additionalInfo.warranty.map((warranty, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <span className="text-muted-foreground">{index + 1}.</span>
                              <span>{warranty}</span>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  )}
                </Accordion>
              </>
            )}

            {/* Disclaimer */}
            <div className="p-3 rounded-lg bg-muted/50 border">
              <p className="text-xs text-muted-foreground">
                <strong>Disclaimer:</strong> Lomash Wood reserves the right to modify or withdraw
                this offer at any time without prior notice. All offers are subject to
                availability and may vary by location. For complete details, please contact our
                customer service team.
              </p>
            </div>
          </div>
        </ScrollArea>

        {/* Acceptance Checkbox */}
        {requireAcceptance && (
          <div className="flex items-start space-x-2 py-4 border-t">
            <Checkbox
              id="accept-terms"
              checked={hasAccepted}
              onCheckedChange={(checked) => setHasAccepted(checked as boolean)}
            />
            <label
              htmlFor="accept-terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              I have read and agree to the terms and conditions
            </label>
          </div>
        )}

        <DialogFooter className="flex-row justify-between sm:justify-between gap-2">
          <div className="flex gap-2">
            {showPrint && (
              <Button variant="outline" size="sm" onClick={handlePrint}>
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
            )}
            {showDownload && (
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            {requireAcceptance && (
              <Button onClick={handleAcceptAndClose} disabled={!hasAccepted}>
                Accept & Continue
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function SimpleTermsDialog({
  open,
  onOpenChange,
  title,
  terms,
  className,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  terms: string[];
  className?: string;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-lg", className)}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>Terms and Conditions</DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[400px] pr-4">
          <ul className="space-y-2 py-4">
            {terms.map((term, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span>{term}</span>
              </li>
            ))}
          </ul>
        </ScrollArea>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function TermsTrigger({
  onClick,
  variant = "link",
  size = "sm",
  className,
}: {
  onClick: () => void;
  variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost";
  size?: "sm" | "default" | "lg" | "icon";
  className?: string;
}) {
  return (
    <Button
      variant={variant}
      size={size}
      onClick={onClick}
      className={cn("gap-2", className)}
    >
      <Info className="h-3 w-3" />
      Terms & Conditions
    </Button>
  );
}