"use client";

import { Star, ChevronDown } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import Rating from "./Rating";
import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";

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

interface RatingDistribution {
  5: number;
  4: number;
  3: number;
  2: number;
  1: number;
}

interface ReviewsProps {
  productId: string;
  averageRating: number;
  totalReviews: number;
  ratingDistribution: RatingDistribution;
  reviews: Review[];
  onSubmitReview?: (review: any) => void;
}

export default function Reviews({
  productId,
  averageRating,
  totalReviews,
  ratingDistribution,
  reviews,
  onSubmitReview,
}: ReviewsProps) {
  const [sortBy, setSortBy] = useState<string>("most-recent");
  const [filterRating, setFilterRating] = useState<string>("all");
  const [visibleReviews, setVisibleReviews] = useState(5);
  const [activeTab, setActiveTab] = useState<"all-reviews" | "write-review">("all-reviews");

  const getRatingPercentage = (star: number): number => {
    if (totalReviews === 0) return 0;
    return (ratingDistribution[star as keyof RatingDistribution] / totalReviews) * 100;
  };

  const filteredReviews = reviews.filter((review) => {
    if (filterRating === "all") return true;
    return review.rating === parseInt(filterRating);
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case "most-recent":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "highest-rating":
        return b.rating - a.rating;
      case "lowest-rating":
        return a.rating - b.rating;
      case "most-helpful":
        return b.helpful - a.helpful;
      default:
        return 0;
    }
  });

  const displayedReviews = sortedReviews.slice(0, visibleReviews);
  const hasMoreReviews = visibleReviews < sortedReviews.length;

  const handleLoadMore = () => {
    setVisibleReviews((prev) => prev + 5);
  };

  const handleReviewSubmit = (data: any) => {
    if (onSubmitReview) {
      onSubmitReview(data);
    }
  };

  return (
    <div className="space-y-8">
      {/* Rating Summary */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* Overall Rating */}
        <div className="flex flex-col items-center justify-center rounded-lg border bg-muted/50 p-8 text-center">
          <div className="mb-2 text-5xl font-bold">{averageRating.toFixed(1)}</div>
          <Rating value={averageRating} size="lg" readonly />
          <p className="mt-2 text-sm text-muted-foreground">
            Based on {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
          </p>
        </div>

        {/* Rating Distribution */}
        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((star) => (
            <button
              key={star}
              onClick={() => setFilterRating(star.toString())}
              className="flex w-full items-center gap-3 text-sm transition-opacity hover:opacity-70"
            >
              <div className="flex items-center gap-1">
                <span className="w-3 text-right">{star}</span>
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              </div>
              {/* Custom Progress Bar */}
              <div className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400 transition-all"
                  style={{ width: `${getRatingPercentage(star)}%` }}
                />
              </div>
              <span className="w-12 text-right text-muted-foreground">
                {ratingDistribution[star as keyof RatingDistribution]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Custom Tab List */}
          <div className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
            <button
              onClick={() => setActiveTab("all-reviews")}
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                activeTab === "all-reviews"
                  ? "bg-background text-foreground shadow-sm"
                  : "hover:bg-background/50"
              }`}
            >
              All Reviews ({totalReviews})
            </button>
            <button
              onClick={() => setActiveTab("write-review")}
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                activeTab === "write-review"
                  ? "bg-background text-foreground shadow-sm"
                  : "hover:bg-background/50"
              }`}
            >
              Write a Review
            </button>
          </div>

          {/* Filters and Sort - Only show on all-reviews tab */}
          {activeTab === "all-reviews" && (
            <div className="flex flex-wrap gap-3">
              {/* Custom Filter Select */}
              <div className="relative">
                <select
                  value={filterRating}
                  onChange={(e) => setFilterRating(e.target.value)}
                  className="w-[150px] h-10 px-3 py-2 text-sm rounded-md border border-input bg-background ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 appearance-none pr-8"
                >
                  <option value="all">All Ratings</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>

              {/* Custom Sort Select */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-[160px] h-10 px-3 py-2 text-sm rounded-md border border-input bg-background ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 appearance-none pr-8"
                >
                  <option value="most-recent">Most Recent</option>
                  <option value="highest-rating">Highest Rating</option>
                  <option value="lowest-rating">Lowest Rating</option>
                  <option value="most-helpful">Most Helpful</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          )}
        </div>

        {/* All Reviews Tab Content */}
        {activeTab === "all-reviews" && (
          <div className="space-y-6">
            {displayedReviews.length === 0 ? (
              <div className="rounded-lg border border-dashed p-12 text-center">
                <p className="text-muted-foreground">
                  No reviews found. Be the first to review this product!
                </p>
                <Button
                  onClick={() => {
                    setActiveTab("write-review");
                  }}
                  className="mt-4"
                >
                  Write a Review
                </Button>
              </div>
            ) : (
              <>
                <div className="space-y-6">
                  {displayedReviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </div>

                {hasMoreReviews && (
                  <div className="flex justify-center pt-4">
                    <Button
                      variant="outline"
                      onClick={handleLoadMore}
                      className="gap-2"
                    >
                      Load More Reviews
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Write Review Tab Content */}
        {activeTab === "write-review" && (
          <div>
            <ReviewForm
              productId={productId}
              onSubmit={handleReviewSubmit}
              onCancel={() => {
                setActiveTab("all-reviews");
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}