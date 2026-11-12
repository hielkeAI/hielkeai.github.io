'use client';

import { useState, useCallback } from 'react';
import { PixelButton } from './PixelButton';
import { PixelCard } from './PixelCard';
import { cn } from '@/lib/utils';

/**
 * Funny dictionary words — kept on-brand with the original site's tone.
 */
const WORDS: { word: string; def: string }[] = [
  {
    word: 'toaster',
    def: "A small metal friend that makes warm bread and occasionally tries to kill you by being placed near the sink.",
  },
  {
    word: 'procrastinate',
    def: "The art of doing something incredibly productive in order to avoid doing the thing you were supposed to do.",
  },
  {
    word: 'homework',
    def: "A sacred document passed from teacher to student to dog to floor to bin. Often disappears before sunrise.",
  },
  {
    word: 'algorithm',
    def: "A recipe a computer follows, except the computer also wrote the recipe and added 14 secret ingredients.",
  },
  {
    word: 'tuesday',
    def: "The weekday equivalent of 3pm. Not as bad as Monday, not as hopeful as Friday. Just there.",
  },
  {
    word: 'wifi',
    def: "An invisible force more important to modern teenagers than oxygen, water, or parental affection.",
  },
  {
    word: 'deadline',
    def: "An imaginary line in the future that becomes very real at 11:58pm the night before.",
  },
  {
    word: 'discord',
    def: "A place where six people are talking, four are gaming, two are asleep, and one is doing everyone's homework.",
  },
  {
    word: 'mistral',
    def: "A wind from the south of France. Also a very fast AI that does your maths while judging you silently.",
  },
  {
    word: 'anthropic',
    def: "An ancient Greek word meaning 'human'. These days it means 'an AI that wants to discuss your motives first'.",
  },
  {
    word: 'exercise',
    def: "An activity you fully intend to start tomorrow. Tomorrow agrees.",
  },
  {
    word: 'algorithm',
    def: "See: toaster. Just kidding. A list of instructions a computer pretends to understand.",
  },
  {
    word: 'bot',
    def: "A small digital creature. Mostly helpful. Sometimes chaotic. Always awake at 3am.",
  },
];

export function RandomWordCard() {
  const [current, setCurrent] = useState(WORDS[0]);
  const [flipping, setFlipping] = useState(false);
  const [count, setCount] = useState(0);

  const roll = useCallback(() => {
    if (flipping) return;
    setFlipping(true);
    setCount((c) => c + 1);
    // halfway through the flip, swap the content
    setTimeout(() => {
      const idx = Math.floor(Math.random() * WORDS.length);
      setCurrent(WORDS[idx]);
    }, 250);
    setTimeout(() => setFlipping(false), 600);
  }, [flipping]);

  return (
    <div
      className="[perspective:1200px]"
      style={{ perspective: '1200px' }}
    >
      <PixelCard
        className={cn(
          'text-center transition-transform duration-600 [transform-style:preserve-3d]',
          flipping && '[transform:rotateY(180deg)]'
        )}
        style={{ transformStyle: 'preserve-3d' } as React.CSSProperties}
      >
        <div className="pixel-font pixel-sm text-muted-foreground mb-2">
          ▸ RANDOM DICTIONARY ◂
        </div>

        <div className="min-h-[180px] flex flex-col items-center justify-center gap-3 px-4 py-6">
          <div className="text-3xl pixfloat" aria-hidden>
            🎲
          </div>
          <div className="pixel-font pixel-h2 text-primary break-words">
            {current.word}
          </div>
          <div className="vt-font text-xl text-foreground/90 leading-snug max-w-md">
            {current.def}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
          <PixelButton onClick={roll} disabled={flipping}>
            {flipping ? '◆ shuffling...' : '🎲 new word'}
          </PixelButton>
          <span className="vt-font text-muted-foreground text-base">
            words rolled: <span className="text-primary pixel-font pixel-sm">{count}</span>
          </span>
        </div>
      </PixelCard>
    </div>
  );
}
