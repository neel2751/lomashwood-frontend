"use client";

import { formatDistanceToNow } from "date-fns";
import { ThumbsUp, Flag, MoreVertical, CheckCircle2 } from "lucide-react";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

import Rating from "./Rating";

interface Review {
  id: string;
  author: {
    name: string;
    avatar?: string;
    verified: boolean;
  };
  rating: number;
  title: string;
  comment: string;
  date: string;
  helpful: number;
  images?: string[];
  productVariant?: string;
}

interface ReviewCardProps {
  review: Review;
  onMarkHelpful?: (reviewId: string) => void;
  onReport?: (reviewId: string) => void;
  className?: string;
}

export default function ReviewCard({
  review,
  onMarkHelpful,
  onReport,
  className,
}: ReviewCardProps) {
  const [isHelpful, setIsHelpful] = useState(false);
  const [helpfulCount, setHelpfulCount] = useState(review.helpful);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleHelpful = () => {
    if (!isHelpful) {
      setIsHelpful(true);
      setHelpfulCount((prev) => prev + 1);
      onMarkHelpful?.(review.id);
    }
  };

  const handleReport = () => {
    onReport?.(review.id);
  };

  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString: string): string => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch {
      return dateString;
    }
  };

  const shouldTruncate = review.comment.length > 300;
  const displayComment =
    shouldTruncate && !isExpanded
      ? review.comment.slice(0, 300) + "..."
      : review.comment;

  return (
    <>
      <Card className={cn("", className)}>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-3">
                <Avatar className="h-10 w-10">
                  {review.author.avatar && (
                    <AvatarImage
                      src={review.author.avatar}
                      alt={review.author.name}
                    />
                  )}
                  <AvatarFallback>
                    {getInitials(review.author.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{review.author.name}</p>
                    {review.author.verified && (
                      <Badge
                        variant="secondary"
                        className="gap-1 text-xs"
                      >
                        <CheckCircle2 className="h-3 w-3" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(review.date)}
                  </p>
                </div>
              </div>

              {/* Options Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                    <span className="sr-only">More options</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleReport}>
                    <Flag className="mr-2 h-4 w-4" />
                    Report review
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <Rating value={review.rating} readonly />
              {review.productVariant && (
                <Badge variant="outline" className="text-xs">
                  {review.productVariant}
                </Badge>
              )}
            </div>

            {/* Review Title */}
            {review.title && (
              <h4 className="font-semibold">{review.title}</h4>
            )}

            {/* Review Content */}
            <div className="space-y-2">
              <p className="text-sm leading-relaxed text-muted-foreground">
                {displayComment}
              </p>
              {shouldTruncate && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  {isExpanded ? "Show less" : "Read more"}
                </button>
              )}
            </div>

            {/* Review Images */}
            {review.images && review.images.length > 0 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {review.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(image)}
                    className="group relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border transition-all hover:border-primary"
                  >
                    <img
                      src={image}
                      alt={`Review image ${index + 1}`}
                      className="h-full w-full object-cover transition-transform group-hover:scale-110"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-4 pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleHelpful}
                disabled={isHelpful}
                className={cn(
                  "gap-2",
                  isHelpful && "text-primary"
                )}
              >
                <ThumbsUp
                  className={cn(
                    "h-4 w-4",
                    isHelpful && "fill-current"
                  )}
                />
                <span>Helpful</span>
                {helpfulCount > 0 && (
                  <span className="text-muted-foreground">({helpfulCount})</span>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Image Lightbox Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Review Image</DialogTitle>
          </DialogHeader>
          {selectedImage && (
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
              <img
                src={selectedImage}
                alt="Review image"
                className="h-full w-full object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}