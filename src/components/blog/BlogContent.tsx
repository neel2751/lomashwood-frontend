"use client";

import {
  Calendar,
  Clock,
  Share2,
  Bookmark,
  Twitter,
  Facebook,
  Linkedin,
  ChevronLeft,
  ChevronRight,
  Eye,
  MessageSquare,
  Copy,
  Check,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";


export interface BlogContentData {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt?: string;
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
    bio?: string;
  };
  publishedAt: string;
  updatedAt?: string;
  readTime?: number;
  views?: number;
  commentsCount?: number;
  tags?: string[];
  isBookmarked?: boolean;
  relatedPosts?: Array<{
    id: string;
    slug: string;
    title: string;
    image: string;
    category: string;
  }>;
  previousPost?: {
    slug: string;
    title: string;
  };
  nextPost?: {
    slug: string;
    title: string;
  };
}

interface BlogContentProps {
  post: BlogContentData;
  onBookmark?: (postId: string) => void;
  showRelatedPosts?: boolean;
  showNavigation?: boolean;
  className?: string;
}

export default function BlogContent({
  post,
  onBookmark,
  showRelatedPosts = true,
  showNavigation = true,
  className,
}: BlogContentProps) {
  const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked || false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;
      setReadingProgress(Math.min(progress, 100));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
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

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    onBookmark?.(post.id);
    toast({
      title: isBookmarked ? "Removed from bookmarks" : "Added to bookmarks",
      description: isBookmarked
        ? "This article has been removed from your bookmarks"
        : "This article has been saved to your bookmarks",
    });
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      toast({
        title: "Link Copied!",
        description: "Article link has been copied to clipboard.",
      });
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      toast({
        variant: "error",
        title: "Failed to copy",
        description: "Please try again.",
      });
    }
  };

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      window.location.href
    )}&text=${encodeURIComponent(post.title)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      window.location.href
    )}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      window.location.href
    )}`,
  };

  return (
    <article className={cn("max-w-4xl mx-auto", className)}>
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-muted z-50">
        <div
          className="h-full bg-primary transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Header */}
      <header className="space-y-6 mb-8">
        {/* Category and Metadata */}
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <Link href={`/blog/category/${post.category.slug}`}>
            <Badge
              className="hover:opacity-80 transition-opacity cursor-pointer"
              style={{
                backgroundColor: post.category.color || undefined,
              }}
            >
              {post.category.name}
            </Badge>
          </Link>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(post.publishedAt)}</span>
          </div>
          {post.readTime && (
            <>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{post.readTime} min read</span>
              </div>
            </>
          )}
          {post.views !== undefined && (
            <>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>{post.views.toLocaleString()} views</span>
              </div>
            </>
          )}
          {post.commentsCount !== undefined && (
            <>
              <span>•</span>
              <div className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <span>{post.commentsCount} comments</span>
              </div>
            </>
          )}
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">{post.title}</h1>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-xl text-muted-foreground leading-relaxed">{post.excerpt}</p>
        )}

        {/* Author and Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Author Info */}
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback>{getAuthorInitials(post.author.name)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{post.author.name}</p>
              {post.author.role && (
                <p className="text-sm text-muted-foreground">{post.author.role}</p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant={isBookmarked ? "default" : "outline"}
              size="sm"
              onClick={handleBookmark}
              className="gap-2"
            >
              <Bookmark className={cn("h-4 w-4", isBookmarked && "fill-current")} />
              {isBookmarked ? "Saved" : "Save"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsShareDialogOpen(true)}
              className="gap-2"
            >
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>
        </div>

        {/* Updated Date */}
        {post.updatedAt && post.updatedAt !== post.publishedAt && (
          <p className="text-xs text-muted-foreground">
            Last updated: {formatDate(post.updatedAt)}
          </p>
        )}
      </header>

      {/* Featured Image */}
      <div className="relative h-96 md:h-[500px] rounded-xl overflow-hidden mb-12">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="mb-12">
          <Separator className="mb-6" />
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-muted-foreground">Tags:</span>
            {post.tags.map((tag, index) => (
              <Link key={index} href={`/blog?tag=${encodeURIComponent(tag)}`}>
                <Badge variant="secondary" className="hover:bg-secondary/80 cursor-pointer">
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Author Bio */}
      {post.author.bio && (
        <Card className="mb-12">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <Avatar className="h-20 w-20 flex-shrink-0">
                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                <AvatarFallback className="text-lg">
                  {getAuthorInitials(post.author.name)}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <div>
                  <p className="font-semibold text-lg">{post.author.name}</p>
                  {post.author.role && (
                    <p className="text-sm text-muted-foreground">{post.author.role}</p>
                  )}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {post.author.bio}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      {showNavigation && (post.previousPost || post.nextPost) && (
        <div className="mb-12">
          <Separator className="mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Previous Post */}
            {post.previousPost ? (
              <Link href={`/blog/${post.previousPost.slug}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardContent className="p-6 h-full flex items-center gap-3">
                    <ChevronLeft className="h-5 w-5 text-muted-foreground flex-shrink-0 group-hover:text-primary transition-colors" />
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground mb-1">Previous Article</p>
                      <p className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
                        {post.previousPost.title}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ) : (
              <div />
            )}

            {/* Next Post */}
            {post.nextPost && (
              <Link href={`/blog/${post.nextPost.slug}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardContent className="p-6 h-full flex items-center gap-3">
                    <div className="min-w-0 flex-1 text-right">
                      <p className="text-xs text-muted-foreground mb-1">Next Article</p>
                      <p className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
                        {post.nextPost.title}
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0 group-hover:text-primary transition-colors" />
                  </CardContent>
                </Card>
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Related Posts */}
      {showRelatedPosts && post.relatedPosts && post.relatedPosts.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {post.relatedPosts.map((related) => (
              <Link key={related.id} href={`/blog/${related.slug}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer">
                  <div className="relative h-48 overflow-hidden bg-muted">
                    <Image
                      src={related.image}
                      alt={related.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4">
                    <Badge variant="secondary" className="mb-2 text-xs">
                      {related.category}
                    </Badge>
                    <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                      {related.title}
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Share Dialog */}
      <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share This Article</DialogTitle>
            <DialogDescription>
              Share "{post.title}" with your network
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <Button
                variant="outline"
                className="h-auto flex-col gap-2 p-4"
                onClick={() => window.open(shareUrls.twitter, "_blank")}
              >
                <Twitter className="h-5 w-5" />
                <span className="text-xs">Twitter</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto flex-col gap-2 p-4"
                onClick={() => window.open(shareUrls.facebook, "_blank")}
              >
                <Facebook className="h-5 w-5" />
                <span className="text-xs">Facebook</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto flex-col gap-2 p-4"
                onClick={() => window.open(shareUrls.linkedin, "_blank")}
              >
                <Linkedin className="h-5 w-5" />
                <span className="text-xs">LinkedIn</span>
              </Button>
            </div>
            <Separator />
            <div className="space-y-2">
              <p className="text-sm font-medium">Copy Link</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={window.location.href}
                  readOnly
                  className="flex-1 px-3 py-2 text-sm border rounded-md bg-muted"
                />
                <Button onClick={handleCopyLink} variant="outline" size="icon">
                  {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </article>
  );
}