"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Send, CheckCircle2, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { contactFormSchema } from "@/schemas/contact.schema";
import Link from "next/link";

type ContactFormData = z.infer<typeof contactFormSchema>;

type SubjectType = "general_inquiry" | "product_inquiry" | "order_status" | "customization_request" | "technical_support" | "complaint" | "feedback" | "partnership" | "media_inquiry" | "career_inquiry" | "other";

interface ContactFormProps {
  onSuccess?: () => void;
  showContactInfo?: boolean;
  defaultSubject?: SubjectType;
  className?: string;
}

export default function ContactForm({
  onSuccess,
  showContactInfo = true,
  defaultSubject,
  className = "",
}: ContactFormProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: defaultSubject,
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to send message");
      }

      return response.json();
    },
    onSuccess: () => {
      setIsSuccess(true);
      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
      });

      if (onSuccess) {
        onSuccess();
      }

      // Reset form after 3 seconds
      setTimeout(() => {
        form.reset();
        setIsSuccess(false);
      }, 3000);
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to Send Message",
        description: error.message || "Please try again later.",
        variant: "error",
      });
    },
  });

  const onSubmit: SubmitHandler<ContactFormData> = (data) => {
    mutation.mutate(data);
  };

  if (isSuccess) {
    return (
      <div className={`flex flex-col items-center justify-center py-12 ${className}`}>
        <div className="rounded-full bg-green-100 p-3 mb-4">
          <CheckCircle2 className="h-12 w-12 text-green-600" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
          Message Sent Successfully!
        </h3>
        <p className="text-gray-600 text-center max-w-md">
          Thank you for contacting us. Our team will review your message and get
          back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 ${showContactInfo ? 'lg:grid-cols-3' : ''} gap-8 ${className}`}>
      {/* Contact Form */}
      <div className={showContactInfo ? 'lg:col-span-2' : ''}>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Get In Touch
          </h2>
          <p className="text-gray-600">
            Have a question or need assistance? Fill out the form below and we'll
            respond promptly.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit as any)} className="space-y-6">
            {/* Name Field */}
            <FormField
              control={form.control as any}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Full Name <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John Doe"
                      {...field}
                      disabled={mutation.isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email and Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control as any}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Email Address <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="john.doe@example.com"
                        {...field}
                        disabled={mutation.isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control as any}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Phone Number <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="+91 98765 43210"
                        {...field}
                        disabled={mutation.isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Subject Field */}
            <FormField
              control={form.control as any}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Subject <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={mutation.isPending}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="general_inquiry">General Inquiry</SelectItem>
                      <SelectItem value="product_inquiry">Product Inquiry</SelectItem>
                      <SelectItem value="order_status">Order Status</SelectItem>
                      <SelectItem value="customization_request">Customization Request</SelectItem>
                      <SelectItem value="technical_support">Technical Support</SelectItem>
                      <SelectItem value="complaint">Complaint</SelectItem>
                      <SelectItem value="feedback">Feedback</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                      <SelectItem value="media_inquiry">Media Inquiry</SelectItem>
                      <SelectItem value="career_inquiry">Career Inquiry</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Message Field */}
            <FormField
              control={form.control as any}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Message <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us more about your inquiry..."
                      className="min-h-[150px] resize-none"
                      {...field}
                      disabled={mutation.isPending}
                    />
                  </FormControl>
                  <FormDescription>
                    Please provide as much detail as possible
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Preferred Contact Method */}
            <FormField
              control={form.control as any}
              name="preferredContact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Contact Method</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={mutation.isPending}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="How should we contact you?" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="phone">Phone</SelectItem>
                      <SelectItem value="either">Either</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    We'll use this method to respond to your inquiry
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Privacy Notice */}
            <div className="text-xs text-gray-500 bg-gray-50 p-4 rounded-md">
              <p>
                By submitting this form, you agree to our{" "}
                <a
                  href="/privacy-policy"
                  className="text-primary hover:underline"
                  target="_blank"
                >
                  Privacy Policy
                </a>
                . We respect your privacy and will only use your information to
                respond to your inquiry.
              </p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Sending Message...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </Form>
      </div>

      {/* Contact Information Sidebar */}
      {showContactInfo && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Contact Information
            </h3>
            <p className="text-gray-600 mb-6">
              You can also reach us through these channels:
            </p>
          </div>

          {/* Phone */}
          <div className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Phone className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
              <Link href="tel:+917912345678" className="text-gray-600 hover:text-primary transition-colors">
                +91 79 1234 5678
              </Link>
              <p className="text-sm text-gray-500 mt-1">Mon-Sat: 10am - 8pm</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Mail className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
              <Link href="mailto:info@lomashwood.com" className="text-gray-600 hover:text-primary transition-colors break-all">
                info@lomashwood.com
              </Link>
              <p className="text-sm text-gray-500 mt-1">
                We reply within 24 hours
              </p>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">
                Head Office
              </h4>
              <p className="text-gray-600">
                123 SG Highway, Bodakdev
                <br />
                Ahmedabad, Gujarat 380054
                <br />
                India
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="pt-6 border-t">
            <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
            <div className="space-y-3">
              <Link href="/book-appointment" className="block text-sm text-gray-600 hover:text-primary transition-colors">
                → Book a Free Consultation
              </Link>
              <Link href="/showrooms" className="block text-sm text-gray-600 hover:text-primary transition-colors">
                → Find a Showroom
              </Link>
              <Link href="/brochure" className="block text-sm text-gray-600 hover:text-primary transition-colors">
                → Download Brochure
              </Link>
              <Link href="/finance" className="block text-sm text-gray-600 hover:text-primary transition-colors">
                → Finance Options
              </Link>
            </div>
          </div>

          {/* Business Hours */}
          <div className="pt-6 border-t">
            <h4 className="font-semibold text-gray-900 mb-4">Business Hours</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Monday - Friday</span>
                <span className="font-medium text-gray-900">10:00 AM - 8:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Saturday</span>
                <span className="font-medium text-gray-900">10:00 AM - 8:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Sunday</span>
                <span className="font-medium text-gray-900">11:00 AM - 6:00 PM</span>
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="rounded-lg bg-red-50 border border-red-100 p-4">
            <h4 className="font-semibold text-red-900 mb-2">
              Urgent Assistance?
            </h4>
            <p className="text-sm text-red-700 mb-3">
              For urgent matters related to existing installations or services:
            </p>
            <Link href="tel:+919876543210" className="text-sm font-medium text-red-900 hover:text-red-700 transition-colors">
              Emergency Hotline: +91 98765 43210
            </Link>
            <p className="text-xs text-red-600 mt-2">Available 24/7</p>
          </div>
        </div>
      )}
    </div>
  );
}