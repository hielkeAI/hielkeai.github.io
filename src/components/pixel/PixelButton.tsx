'use client';

import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

/**
 * Chunky pixel-retro button — hard borders, offset shadow, bouncy hover.
 * Built on top of shadcn Button so it keeps size/variant accessibility.
 */
const PixelButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn(
          'pixel-font pixel-sm uppercase tracking-wider',
          'bg-primary text-primary-foreground',
          'border-2 border-primary',
          'shadow-[4px_4px_0_0_#000]',
          'hover:shadow-[2px_2px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px]',
          'active:shadow-none active:translate-x-[4px] active:translate-y-[4px]',
          'transition-all duration-100',
          'px-5 py-3 rounded-none',
          className
        )}
        {...props}
      >
        {children}
      </Button>
    );
  }
);
PixelButton.displayName = 'PixelButton';
export { PixelButton };
