'use client';

import { cn } from '@/lib/utils';

/**
 * Pixel divider — a row of pixel stars between sections.
 */
export function PixelDivider({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex items-center justify-center gap-2 my-8 select-none',
        className
      )}
      aria-hidden
    >
      <span className="text-primary opacity-40 pixel-font pixel-sm">✳</span>
      <span className="text-primary opacity-70 pixel-font pixel-sm">✳</span>
      <span className="text-primary pixel-font pixel-sm pixfloat">✳</span>
      <span className="text-primary opacity-70 pixel-font pixel-sm">✳</span>
      <span className="text-primary opacity-40 pixel-font pixel-sm">✳</span>
    </div>
  );
}

/**
 * Marquee strip — repeating text scrolling horizontally.
 */
export function PixelMarquee({ text, className }: { text: string; className?: string }) {
  // duplicate text so it loops seamlessly
  const items = Array.from({ length: 8 }, (_, i) => (
    <span key={i} className="mx-6 pixel-font pixel-sm text-primary">
      {text} <span className="text-muted-foreground">✳</span>
    </span>
  ));
  return (
    <div
      className={cn(
        'overflow-hidden whitespace-nowrap border-y-2 border-primary bg-secondary py-2',
        className
      )}
    >
      <div className="marquee-track">{items}{items}</div>
    </div>
  );
}
