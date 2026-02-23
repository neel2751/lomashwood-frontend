"use client";

import { Calendar, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface BookConsultationProps {
  productId: string;
  productName: string;
  category?: string;
  selectedColor?: string;
  selectedFinish?: string;
}

export default function BookConsultation({
  productId,
  productName,
  category,
  selectedColor,
  selectedFinish,
}: BookConsultationProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleBookConsultation = async () => {
    setIsLoading(true);

    try {
      const consultationData = {
        productId,
        productName,
        category,
        selectedColor,
        selectedFinish,
        timestamp: new Date().toISOString(),
      };

      if (typeof window !== "undefined") {
        sessionStorage.setItem(
          "consultation_context",
          JSON.stringify(consultationData)
        );
      }

      router.push(`/book-appointment?product=${productId}`);
    } catch (error) {
      console.error("Error preparing consultation:", error);
      toast({
        title: "Error",
        description: "Failed to proceed to booking. Please try again.",
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Main CTA Button */}
      <Button
        size="lg"
        className="w-full text-base font-semibold"
        onClick={handleBookConsultation}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
            Loading...
          </>
        ) : (
          <>
            <Calendar className="h-5 w-5 mr-2" />
            Book Free Consultation
          </>
        )}
      </Button>

      {/* Quick Book Dialog (Optional - for future enhancement) */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Book Your Free Consultation</DialogTitle>
            <DialogDescription>
              Schedule a consultation for {productName}
              {selectedColor && ` in ${selectedColor}`}
              {selectedFinish && ` with ${selectedFinish} finish`}.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">What happens next?</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">1.</span>
                  <span>Choose your preferred date and time</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">2.</span>
                  <span>Our design expert will contact you</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">3.</span>
                  <span>Discuss your requirements and get personalized advice</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">4.</span>
                  <span>Receive a detailed quote and design proposal</span>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                <strong>100% Free Consultation</strong> - No obligations. Our experts
                will help you make the best decision for your space.
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1"
                onClick={handleBookConsultation}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Calendar className="h-4 w-4 mr-2" />
                )}
                Continue
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}