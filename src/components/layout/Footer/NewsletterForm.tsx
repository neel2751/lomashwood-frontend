"use client";

import React, { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setMessage({
        type: "success",
        text: "Thank you for subscribing!",
      });
      setEmail("");
    } catch (error) {
      setMessage({
        type: "error",
        text: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h4 className="text-lg font-semibold mb-3">Subscribe to Newsletter</h4>
      <p className="text-sm text-lomash-gray-300 mb-4">
        Get the latest updates on new products and upcoming sales
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex space-x-2">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 px-4 py-2 bg-white/10 border border-lomash-gray-600 rounded-lg text-white placeholder:text-lomash-gray-400 focus:outline-none focus:ring-2 focus:ring-lomash-accent focus:border-transparent"
          />
          <Button
            type="submit"
            variant="accent"
            size="icon"
            disabled={isLoading}
            className="shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {message && (
          <p
            className={cn(
              "text-sm",
              message.type === "success"
                ? "text-green-400"
                : "text-red-400"
            )}
          >
            {message.text}
          </p>
        )}
      </form>
    </div>
  );
}