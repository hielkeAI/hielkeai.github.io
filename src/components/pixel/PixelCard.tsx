'use client';

import { cn } from '@/lib/utils';
import { HTMLAttributes, forwardRef } from 'react';

/**
 * Pixel-retro card: chunky stepped border, offset shadow.
 * Use variant="solid" for filled, "outline" for ghosted.
 */
const PixelCard = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & {
  variant?: 'solid' | 'outline';
}>(
  ({ className, children, variant = 'solid', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative',
          variant === 'solid'
            ? 'bg-card text-card-foreground border-2 border-primary'
            : 'bg-transparent text-foreground border-2 border-primary',
          'shadow-[6px_6px_0_0_#000]',
          'p-5',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
PixelCard.displayName = 'PixelCard';
export { PixelCard };
