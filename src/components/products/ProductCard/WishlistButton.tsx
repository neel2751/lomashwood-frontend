'use client';

import { Heart } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface WishlistButtonProps {
  productId: string;
  variant?: 'default' | 'outline' | 'ghost' | 'secondary';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
}

export function WishlistButton({
  variant = 'secondary',
  size = 'icon',
  className,
}: WishlistButtonProps) {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleToggleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      setIsInWishlist(!isInWishlist);

      toast({
        title: isInWishlist ? 'Removed from Wishlist' : 'Added to Wishlist',
        description: isInWishlist
          ? 'Product has been removed from your wishlist'
          : 'Product has been added to your wishlist',
        variant: isInWishlist ? 'default' : 'default',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update wishlist. Please try again.',
        variant: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={cn(
        'transition-all duration-300',
        isInWishlist && 'text-red-500 hover:text-red-600',
        className
      )}
      onClick={handleToggleWishlist}
      disabled={isLoading}
      title={isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
    >
      <Heart
        className={cn(
          'w-5 h-5 transition-all duration-300',
          isInWishlist && 'fill-current',
          isLoading && 'animate-pulse'
        )}
      />
      {size !== 'icon' && (
        <span className="ml-2">
          {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
        </span>
      )}
    </Button>
  );
}