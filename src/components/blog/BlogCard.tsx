"use client";

import { Calendar, Clock, ArrowRight, Bookmark, Share2, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";


export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  image: string;
  category: {
    name: string;
    slug: string;
    color?: string;
  };
  author: {
    name: string;
    avatar?: string;
    role?: string;
  };
  publishedAt: string;
  readTime?: number;
  tags?: string[];
  views?: number;
  featured?: boolean;
  isBookmarked?: boolean;
}

interface BlogCardProps {
  post: BlogPost;
  variant?: "default" | "featured" | "compact" | "horizontal";
  showExcerpt?: boolean;
  showAuthor?: boolean;
  showCategory?: boolean;
  showImage?: boolean;
  onBookmark?: (postId: string) => void;
  onShare?: (post: BlogPost) => void;
  className?: string;
}

export default function BlogCard({
  post,
  variant = "default",
  showExcerpt = true,
  showAuthor = true,
  showCategory = true,
  showImage = true,
  onBookmark,
  onShare,
  className,
}: BlogCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const getAuthorInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onBookmark?.(post.id);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onShare?.(post);
  };

  if (variant === "featured") {
    return (
      <Card
        className={cn(
          "overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer",
          className
        )}
      >
        <Link href={`/blog/${post.slug}`}>
          {/* Image */}
          {showImage && (
            <div className="relative h-80 md:h-96 overflow-hidden bg-muted">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {showCategory && (
                <Badge
                  className="absolute top-4 left-4"
                  style={{
                    backgroundColor: post.category.color || undefined,
                  }}
                >
                  {post.category.name}
                </Badge>
              )}
              {post.featured && (
                <Badge variant="secondary" className="absolute top-4 right-4">
                  Featured
                </Badge>
              )}
            </div>
          )}

          <CardHeader className="space-y-4">
            {/* Metadata */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              {post.readTime && (
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime} min read</span>
                </div>
              )}
              {post.views !== undefined && (
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span>{post.views.toLocaleString()}</span>
                </div>
              )}
            </div>

            {/* Title */}
            <h2 className="text-2xl md:text-3xl font-bold leading-tight group-hover:text-primary transition-colors">
              {post.title}
            </h2>

            {/* Excerpt */}
            {showExcerpt && (
              <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
            )}
          </CardHeader>

          <CardFooter className="flex items-center justify-between">
            {/* Author */}
            {showAuthor && (
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                  <AvatarFallback>{getAuthorInitials(post.author.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{post.author.name}</p>
                  {post.author.role && (
                    <p className="text-xs text-muted-foreground">{post.author.role}</p>
                  )}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-2">
              {onBookmark && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleBookmark}
                  className={cn(post.isBookmarked && "text-primary")}
                >
                  <Bookmark
                    className={cn("h-4 w-4", post.isBookmarked && "fill-current")}
                  />
                </Button>
              )}
              {onShare && (
                <Button variant="ghost" size="icon" onClick={handleShare}>
                  <Share2 className="h-4 w-4" />
                </Button>
              )}
              <Button variant="ghost" className="gap-1 group/btn">
                Read More
                <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </div>
          </CardFooter>
        </Link>
      </Card>
    );
  }

  if (variant === "horizontal") {
    return (
      <Card
        className={cn(
          "overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer",
          className
        )}
      >
        <Link href={`/blog/${post.slug}`}>
          <div className="flex flex-col sm:flex-row">
            {/* Image */}
            {showImage && (
              <div className="relative h-48 sm:h-auto sm:w-64 flex-shrink-0 overflow-hidden bg-muted">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {showCategory && (
                  <Badge
                    className="absolute top-3 left-3"
                    style={{
                      backgroundColor: post.category.color || undefined,
                    }}
                  >
                    {post.category.name}
                  </Badge>
                )}
              </div>
            )}

            {/* Content */}
            <div className="flex-1 flex flex-col">
              <CardHeader className="flex-1">
                <div className="space-y-3">
                  {/* Metadata */}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>
                    {post.readTime && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{post.readTime} min</span>
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  {showExcerpt && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}
                </div>
              </CardHeader>

              <CardFooter className="pt-0">
                <div className="flex items-center justify-between w-full">
                  {/* Author */}
                  {showAuthor && (
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={post.author.avatar} alt={post.author.name} />
                        <AvatarFallback className="text-xs">
                          {getAuthorInitials(post.author.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{post.author.name}</span>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    {onBookmark && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleBookmark}
                        className={cn("h-8 w-8", post.isBookmarked && "text-primary")}
                      >
                        <Bookmark
                          className={cn("h-3 w-3", post.isBookmarked && "fill-current")}
                        />
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" className="gap-1">
                      <span className="hidden sm:inline">Read</span>
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardFooter>
            </div>
          </div>
        </Link>
      </Card>
    );
  }

  if (variant === "compact") {
    return (
      <Card className={cn("overflow-hidden hover:shadow-md transition-shadow group", className)}>
        <Link href={`/blog/${post.slug}`} className="block p-4">
          <div className="space-y-3">
            {/* Category & Date */}
            <div className="flex items-center justify-between gap-2">
              {showCategory && (
                <Badge
                  variant="secondary"
                  className="text-xs"
                  style={{
                    backgroundColor: post.category.color
                      ? `${post.category.color}20`
                      : undefined,
                    color: post.category.color || undefined,
                  }}
                >
                  {post.category.name}
                </Badge>
              )}
              <span className="text-xs text-muted-foreground">
                {formatDate(post.publishedAt)}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-semibold leading-tight group-hover:text-primary transition-colors line-clamp-2">
              {post.title}
            </h3>

            {/* Meta */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              {showAuthor && <span>{post.author.name}</span>}
              {post.readTime && (
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{post.readTime} min</span>
                </div>
              )}
            </div>
          </div>
        </Link>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        "overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer",
        className
      )}
    >
      <Link href={`/blog/${post.slug}`}>
        {/* Image */}
        {showImage && (
          <div className="relative h-48 overflow-hidden bg-muted">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {showCategory && (
              <Badge
                className="absolute top-3 left-3"
                style={{
                  backgroundColor: post.category.color || undefined,
                }}
              >
                {post.category.name}
              </Badge>
            )}
            {onBookmark && (
              <Button
                variant="secondary"
                size="icon"
                onClick={handleBookmark}
                className={cn(
                  "absolute top-3 right-3 h-8 w-8",
                  post.isBookmarked && "text-primary"
                )}
              >
                <Bookmark className={cn("h-4 w-4", post.isBookmarked && "fill-current")} />
              </Button>
            )}
          </div>
        )}

        <CardHeader className="space-y-3">
          {/* Metadata */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            {post.readTime && (
              <>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{post.readTime} min read</span>
                </div>
              </>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>

          {/* Excerpt */}
          {showExcerpt && (
            <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {post.tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardHeader>

        <CardFooter className="flex items-center justify-between pt-0">
          {/* Author */}
          {showAuthor && (
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                <AvatarFallback className="text-xs">
                  {getAuthorInitials(post.author.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{post.author.name}</p>
              </div>
            </div>
          )}

          {/* Read More */}
          <Button variant="ghost" size="sm" className="gap-1 group/btn">
            Read
            <ArrowRight className="h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
}

export function BlogCardSkeleton({ variant = "default" }: { variant?: string }) {
  return (
    <Card className="overflow-hidden">
      <div className="animate-pulse">
        {variant !== "compact" && <div className="h-48 bg-muted" />}
        <CardHeader className="space-y-3">
          <div className="h-4 bg-muted rounded w-1/4" />
          <div className="h-6 bg-muted rounded w-3/4" />
          {variant !== "compact" && (
            <>
              <div className="h-4 bg-muted rounded w-full" />
              <div className="h-4 bg-muted rounded w-2/3" />
            </>
          )}
        </CardHeader>
        <CardFooter className="pt-0">
          <div className="flex items-center gap-2 w-full">
            <div className="h-8 w-8 bg-muted rounded-full" />
            <div className="h-4 bg-muted rounded flex-1" />
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}