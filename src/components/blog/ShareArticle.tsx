"use client";

import {
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Copy,
  Check,
  MessageCircle,
  Send,
  Printer,
  Link2,
} from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface ShareArticleProps {
  title: string;
  url?: string;
  excerpt?: string;
  variant?: "button" | "icon" | "floating" | "inline";
  size?: "default" | "sm" | "lg" | "icon";
  showLabel?: boolean;
  showCount?: boolean;
  shareCount?: number;
  className?: string;
  onShare?: (platform: string) => void;
}

const socialPlatforms = [
  {
    name: "Twitter",
    icon: Twitter,
    color: "#1DA1F2",
    getUrl: (url: string, title: string) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(
        title
      )}`,
  },
  {
    name: "Facebook",
    icon: Facebook,
    color: "#1877F2",
    getUrl: (url: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    color: "#0A66C2",
    getUrl: (url: string) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
  {
    name: "WhatsApp",
    icon: MessageCircle,
    color: "#25D366",
    getUrl: (url: string, title: string) =>
      `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
  },
  {
    name: "Telegram",
    icon: Send,
    color: "#0088cc",
    getUrl: (url: string, title: string) =>
      `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  {
    name: "Email",
    icon: Mail,
    color: "#EA4335",
    getUrl: (url: string, title: string, excerpt?: string) =>
      `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(
        `${excerpt ? excerpt + "\n\n" : ""}Read more: ${url}`
      )}`,
  },
];

function Tooltip({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function TooltipProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function TooltipTrigger({ children }: { asChild?: boolean; children: React.ReactNode }) {
  return <>{children}</>;
}

function TooltipContent({  children }: { side?: string; children: React.ReactNode }) {
  return (
    <div className="absolute z-50 px-2 py-1 text-xs bg-popover text-popover-foreground rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
      {children}
    </div>
  );
}

function Input({ 
  className, 
  onClick,
  ...props 
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      onClick={onClick}
      {...props}
    />
  );
}

export default function ShareArticle({
  title,
  url,
  excerpt,
  variant = "button",
  size = "default",
  showLabel = true,
  showCount = false,
  shareCount = 0,
  className,
  onShare,
}: ShareArticleProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");

  const handleShare = async (platform: string, shareUrl?: string) => {
    onShare?.(platform);

    if (shareUrl) {
      window.open(shareUrl, "_blank", "noopener,noreferrer,width=600,height=600");
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
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

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: excerpt,
          url: shareUrl,
        });
        onShare?.("native");
      } catch (error) {
        console.error("Native share failed:", error);
      }
    } else {
      setIsDialogOpen(true);
    }
  };

  const handlePrint = () => {
    window.print();
    onShare?.("print");
  };

  if (variant === "floating") {
    return (
      <div
        className={cn(
          "fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-2",
          className
        )}
      >
        <TooltipProvider>
          {socialPlatforms.slice(0, 4).map((platform) => {
            const Icon = platform.icon;
            return (
              <Tooltip key={platform.name}>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleShare(platform.name, platform.getUrl(shareUrl, title, excerpt))}
                    className="h-10 w-10 shadow-lg hover:shadow-xl transition-all group relative"
                    style={{
                      borderColor: platform.color,
                    }}
                  >
                    <Icon className="h-4 w-4" style={{ color: platform.color }} />
                    <TooltipContent side="right">
                      <p>Share on {platform.name}</p>
                    </TooltipContent>
                  </Button>
                </TooltipTrigger>
              </Tooltip>
            );
          })}
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopyLink}
                className="h-10 w-10 shadow-lg hover:shadow-xl transition-all group relative"
              >
                {isCopied ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Link2 className="h-4 w-4" />
                )}
                <TooltipContent side="right">
                  <p>{isCopied ? "Copied!" : "Copy Link"}</p>
                </TooltipContent>
              </Button>
            </TooltipTrigger>
          </Tooltip>
        </TooltipProvider>

        {showCount && shareCount > 0 && (
          <Badge variant="secondary" className="justify-center">
            {shareCount}
          </Badge>
        )}
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <div className={cn("flex items-center gap-2 flex-wrap", className)}>
        {showLabel && <span className="text-sm font-medium text-muted-foreground">Share:</span>}
        {socialPlatforms.slice(0, 5).map((platform) => {
          const Icon = platform.icon;
          return (
            <Button
              key={platform.name}
              variant="outline"
              size="icon"
              onClick={() => handleShare(platform.name, platform.getUrl(shareUrl, title, excerpt))}
              className="h-8 w-8"
            >
              <Icon className="h-4 w-4" style={{ color: platform.color }} />
            </Button>
          );
        })}
        <Button
          variant="outline"
          size="icon"
          onClick={handleCopyLink}
          className="h-8 w-8"
        >
          {isCopied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
    );
  }

  if (variant === "icon") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size={size} className={className}>
            <Share2 className="h-4 w-4" />
            {showCount && shareCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {shareCount}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Share Article</DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          {socialPlatforms.map((platform) => {
            const Icon = platform.icon;
            return (
              <DropdownMenuItem
                key={platform.name}
                onClick={() => handleShare(platform.name, platform.getUrl(shareUrl, title, excerpt))}
              >
                <Icon className="mr-2 h-4 w-4" style={{ color: platform.color }} />
                {platform.name}
              </DropdownMenuItem>
            );
          })}

          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={handleCopyLink}>
            {isCopied ? (
              <>
                <Check className="mr-2 h-4 w-4 text-green-600" />
                Link Copied!
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" />
                Copy Link
              </>
            )}
          </DropdownMenuItem>

          <DropdownMenuItem onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            Print Article
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <>
      <Button
        variant="outline"
        size={size}
        onClick={handleNativeShare}
        className={cn("gap-2", className)}
      >
        <Share2 className="h-4 w-4" />
        {showLabel && "Share"}
        {showCount && shareCount > 0 && (
          <Badge variant="secondary">{shareCount}</Badge>
        )}
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share This Article</DialogTitle>
            <DialogDescription>
              Share "{title}" with your network
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Social Platforms */}
            <div className="grid grid-cols-3 gap-3">
              {socialPlatforms.map((platform) => {
                const Icon = platform.icon;
                return (
                  <Button
                    key={platform.name}
                    variant="outline"
                    className="h-auto flex-col gap-2 p-4 hover:bg-accent"
                    onClick={() => {
                      handleShare(platform.name, platform.getUrl(shareUrl, title, excerpt));
                      setIsDialogOpen(false);
                    }}
                  >
                    <Icon className="h-5 w-5" style={{ color: platform.color }} />
                    <span className="text-xs font-medium">{platform.name}</span>
                  </Button>
                );
              })}
            </div>

            {/* Copy Link */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Copy Link</label>
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="flex-1 bg-muted"
                  onClick={(e: React.MouseEvent<HTMLInputElement>) => e.currentTarget.select()}
                />
                <Button onClick={handleCopyLink} variant="outline" className="flex-shrink-0">
                  {isCopied ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Additional Actions */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  handlePrint();
                  setIsDialogOpen(false);
                }}
              >
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function ShareButtons({
  title,
  url,
  excerpt,
  className,
}: {
  title: string;
  url?: string;
  excerpt?: string;
  className?: string;
}) {
  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {socialPlatforms.slice(0, 4).map((platform) => {
        const Icon = platform.icon;
        return (
          <Button
            key={platform.name}
            variant="outline"
            size="icon"
            onClick={() => {
              window.open(
                platform.getUrl(shareUrl, title, excerpt),
                "_blank",
                "noopener,noreferrer,width=600,height=600"
              );
            }}
            className="h-9 w-9"
          >
            <Icon className="h-4 w-4" style={{ color: platform.color }} />
          </Button>
        );
      })}
    </div>
  );
}

export function ShareCount({
  count,
  className,
}: {
  count: number;
  className?: string;
}) {
  if (count === 0) return null;

  return (
    <div className={cn("flex items-center gap-1 text-sm text-muted-foreground", className)}>
      <Share2 className="h-4 w-4" />
      <span>{count.toLocaleString()} shares</span>
    </div>
  );
}