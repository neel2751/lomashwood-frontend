'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'default' | 'sm' | 'lg';
  icon?: boolean;
  className?: string;
}

export default function CTAButton({
  href,
  children,
  variant = 'primary',
  size = 'default',
  icon = true,
  className,
}: CTAButtonProps) {
  const isPrimary = variant === 'primary';

  return (
    <Button
      asChild
      size={size}
      className={cn(
        'group relative overflow-hidden font-semibold transition-all duration-300',
        isPrimary
          ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl'
          : 'bg-white/10 text-white backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-white/30',
        size === 'lg' && 'px-8 py-6 text-base sm:text-lg',
        className
      )}
    >
      <Link href={href}>
        <span className="relative z-10 flex items-center gap-2">
          {children}
          {icon && (
            <ArrowRight
              className={cn(
                'transition-transform duration-300 group-hover:translate-x-1',
                size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'
              )}
            />
          )}
        </span>
        
        {/* Hover Effect */}
        <span
          className={cn(
            'absolute inset-0 z-0 translate-x-[-100%] transition-transform duration-300 group-hover:translate-x-0',
            isPrimary
              ? 'bg-primary-foreground/10'
              : 'bg-white/10'
          )}
        />
      </Link>
    </Button>
  );
}