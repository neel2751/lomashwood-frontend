"use client";

import { Star, Upload, X, Loader2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

interface ReviewFormValues {
  rating: number;
  title: string;
  comment: string;
  name?: string;
  email?: string;
  recommend: boolean;
  images?: Array<{ file: File; preview: string }>;
}

interface ReviewFormProps {
  productId: string;
  onSubmit: (data: ReviewFormValues) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
}

export default function ReviewForm({
  onSubmit,
  onCancel,
  isSubmitting = false,
}: ReviewFormProps) {
  const { toast } = useToast();
  const [hoveredRating, setHoveredRating] = useState(0);
  const [uploadedImages, setUploadedImages] = useState<Array<{ file: File; preview: string }>>([]);

  const [formData, setFormData] = useState<ReviewFormValues>({
    rating: 0,
    title: "",
    comment: "",
    name: "",
    email: "",
    recommend: true,
    images: [],
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ReviewFormValues, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ReviewFormValues, string>> = {};

    if (formData.rating < 1 || formData.rating > 5) {
      newErrors.rating = "Please select a rating";
    }

    if (formData.title.length < 5) {
      newErrors.title = "Title must be at least 5 characters";
    } else if (formData.title.length > 100) {
      newErrors.title = "Title must not exceed 100 characters";
    }

    if (formData.comment.length < 20) {
      newErrors.comment = "Review must be at least 20 characters";
    } else if (formData.comment.length > 1000) {
      newErrors.comment = "Review must not exceed 1000 characters";
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newImages: Array<{ file: File; preview: string }> = [];

    Array.from(files).forEach((file) => {
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload only JPEG, PNG, or WebP images",
          variant: "error",
        });
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        toast({
          title: "File too large",
          description: "Each image must be less than 5MB",
          variant: "error",
        });
        return;
      }

      if (uploadedImages.length + newImages.length >= 5) {
        toast({
          title: "Too many images",
          description: "Maximum 5 images allowed",
          variant: "error",
        });
        return;
      }

      const preview = URL.createObjectURL(file);
      newImages.push({ file, preview });
    });

    const updatedImages = [...uploadedImages, ...newImages];
    setUploadedImages(updatedImages);
    setFormData({ ...formData, images: updatedImages });
  };

  const removeImage = (index: number) => {
    const updatedImages = uploadedImages.filter((_: any, i: number) => i !== index);
    setUploadedImages(updatedImages);
    setFormData({ ...formData, images: updatedImages });

    URL.revokeObjectURL(uploadedImages[index].preview);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const getRatingLabel = (rating: number): string => {
    const labels: Record<number, string> = {
      1: "Poor",
      2: "Fair",
      3: "Good",
      4: "Very Good",
      5: "Excellent",
    };
    return labels[rating] || "";
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating */}
          <div className="space-y-2">
            <label className="text-base font-medium block">
              Overall Rating *
            </label>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, rating: value });
                      setErrors({ ...errors, rating: undefined });
                    }}
                    onMouseEnter={() => setHoveredRating(value)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`h-8 w-8 ${
                        value <= (hoveredRating || formData.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
              {(hoveredRating || formData.rating) > 0 && (
                <p className="text-sm font-medium text-muted-foreground">
                  {getRatingLabel(hoveredRating || formData.rating)}
                </p>
              )}
            </div>
            {errors.rating && (
              <p className="text-sm text-red-500">{errors.rating}</p>
            )}
          </div>

          {/* Review Title */}
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium block">
              Review Title *
            </label>
            <Input
              id="title"
              placeholder="Sum up your experience in one sentence"
              value={formData.title}
              onChange={(e) => {
                setFormData({ ...formData, title: e.target.value });
                setErrors({ ...errors, title: undefined });
              }}
              className={errors.title ? "border-red-500" : ""}
            />
            <p className="text-xs text-muted-foreground">
              {formData.title.length}/100 characters
            </p>
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title}</p>
            )}
          </div>

          {/* Review Comment */}
          <div className="space-y-2">
            <label htmlFor="comment" className="text-sm font-medium block">
              Your Review *
            </label>
            <Textarea
              id="comment"
              placeholder="Tell us about your experience with this product. What did you like or dislike? What did you use it for?"
              className={`min-h-[150px] resize-none ${errors.comment ? "border-red-500" : ""}`}
              value={formData.comment}
              onChange={(e) => {
                setFormData({ ...formData, comment: e.target.value });
                setErrors({ ...errors, comment: undefined });
              }}
            />
            <p className="text-xs text-muted-foreground">
              {formData.comment.length}/1000 characters (minimum 20)
            </p>
            {errors.comment && (
              <p className="text-sm text-red-500">{errors.comment}</p>
            )}
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium block">
              Add Photos (Optional)
            </label>
            <div className="space-y-4">
              {uploadedImages.length > 0 && (
                <div className="grid grid-cols-3 gap-4 sm:grid-cols-5">
                  {uploadedImages.map((image: { file: File; preview: string }, index: number) => (
                    <div
                      key={index}
                      className="group relative aspect-square overflow-hidden rounded-lg border"
                    >
                      <img
                        src={image.preview}
                        alt={`Upload ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute right-1 top-1 rounded-full bg-black/60 p-1 opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <X className="h-4 w-4 text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {uploadedImages.length < 5 && (
                <div className="flex items-center justify-center">
                  <label className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed p-6 transition-colors hover:border-primary hover:bg-muted/50">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <span className="text-sm font-medium">
                      Upload Images
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {5 - uploadedImages.length} remaining (Max 5MB each)
                    </span>
                    <input
                      type="file"
                      accept={ACCEPTED_IMAGE_TYPES.join(",")}
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Upload up to 5 images to show your experience
            </p>
          </div>

          {/* Name (Optional) */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium block">
              Your Name (Optional)
            </label>
            <Input
              id="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <p className="text-xs text-muted-foreground">
              Leave blank to post anonymously
            </p>
          </div>

          {/* Email (Optional) */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium block">
              Email (Optional)
            </label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                setErrors({ ...errors, email: undefined });
              }}
              className={errors.email ? "border-red-500" : ""}
            />
            <p className="text-xs text-muted-foreground">
              We'll never share your email address
            </p>
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            )}
            <Button type="submit" disabled={isSubmitting} className="gap-2">
              {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}