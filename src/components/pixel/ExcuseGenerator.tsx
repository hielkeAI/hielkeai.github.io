'use client';

import { useState, useRef, useCallback } from 'react';
import { PixelButton } from './PixelButton';
import { PixelCard } from './PixelCard';
import { cn } from '@/lib/utils';

/**
 * Funny homework excuses — kept on-brand with the original site's tone.
 * Each excuse has an emoji + title + body.
 */
const EXCUSES: { emoji: string; title: string; body: string }[] = [
  {
    emoji: '🐶',
    title: 'The Dog Ate It',
    body: "The dog opened 47 browser tabs and lost my worksheet.",
  },
  {
    emoji: '🛸',
    title: 'Alien Abduction',
    body: "A small grey alien took my homework as a 'cultural sample'. He seemed very interested in long division.",
  },
  {
    emoji: '🌧️',
    title: 'Spontaneous Local Rain',
    body: "It only rained on my backpack. The rest of the street was bone dry. Scientists are baffled.",
  },
  {
    emoji: '🖨️',
    title: 'Printer Sentience',
    body: "The printer gained consciousness, read my essay, and refused to print it on moral grounds.",
  },
  {
    emoji: '👻',
    title: 'Homework Ghost',
    body: "A Victorian child ghost living in my wardrobe said it was 'too easy' and floated off with it.",
  },
  {
    emoji: '🪟',
    title: 'Windows 11 Update',
    body: "Windows 11 decided now was the moment. It's been '27% complete' for six hours.",
  },
  {
    emoji: '🤖',
    title: 'Anthropic Ethics Lecture',
    body: "A small AI spent forty minutes explaining why it couldn't do my homework. Respectfully.",
  },
  {
    emoji: '🧊',
    title: 'Frozen in Time',
    body: "My pencil entered cryogenic sleep. It says it will wake up in 2087. I believe it.",
  },
  {
    emoji: '🌪️',
    title: 'Indoor Tornado',
    body: "A tiny tornado formed only above my desk. The worksheet is now in the neighbour's garden.",
  },
  {
    emoji: '🐈',
    title: 'The Cat Sat On It',
    body: "The cat sat on the worksheet for so long it became part of the cat. I cannot disturb her.",
  },
  {
    emoji: '📡',
    title: 'Interference',
    body: "My homework was beamed into space by accident. Astronomers report a strange signal made of maths.",
  },
  {
    emoji: '🧀',
    title: 'Cheese Incident',
    body: "I was making cheese on toast. The cheese won. The homework did not survive.",
  },
];

const ROLL_STEPS = 14;
const ROLL_INTERVAL_MS = 70;

export function ExcuseGenerator() {
  const [current, setCurrent] = useState<typeof EXCUSES[number] | null>(EXCUSES[0]);
  const [rolling, setRolling] = useState(false);
  const [count, setCount] = useState(0);
  const [confetti, setConfetti] = useState<{ id: number; x: number; rot: number; color: string }[]>([]);
  const rollTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const confettiId = useRef(0);

  const roll = useCallback(() => {
    if (rolling) return;
    setRolling(true);
    setCount((c) => c + 1);

    // spawn confetti burst
    const burst = Array.from({ length: 24 }, () => ({
      id: confettiId.current++,
      x: Math.random() * 100,
      rot: Math.random() * 360,
      color: ['#a6ff3d', '#5fe0a0', '#c8ffb0', '#ffd23f'][Math.floor(Math.random() * 4)],
    }));
    setConfetti((prev) => [...prev, ...burst]);
    // cleanup confetti after animation
    setTimeout(() => {
      setConfetti((prev) => prev.filter((c) => !burst.find((b) => b.id === c.id)));
    }, 1300);

    let step = 0;
    if (rollTimer.current) clearInterval(rollTimer.current);
    rollTimer.current = setInterval(() => {
      const idx = Math.floor(Math.random() * EXCUSES.length);
      setCurrent(EXCUSES[idx]);
      step++;
      if (step >= ROLL_STEPS) {
        if (rollTimer.current) clearInterval(rollTimer.current);
        // final pick — ensure it's not the same as last for variety
        const finalIdx = Math.floor(Math.random() * EXCUSES.length);
        setCurrent(EXCUSES[finalIdx]);
        setRolling(false);
      }
    }, ROLL_INTERVAL_MS);
  }, [rolling]);

  return (
    <div className="relative">
      {/* Confetti layer */}
      <div className="pointer-events-none absolute inset-0 overflow-visible" aria-hidden>
        {confetti.map((c) => (
          <span
            key={c.id}
            className="absolute top-1/2 left-1/2 block"
            style={{
              transform: `translate(-50%, -50%) translate(${(c.x - 50) * 8}px, ${-80 - Math.random() * 60}px) rotate(${c.rot}deg)`,
              animation: `confetti-fall 1.2s ease-out forwards`,
              backgroundColor: c.color,
              width: 10,
              height: 14,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes confetti-fall {
          0% { opacity: 1; }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) translate(var(--tx, 0), 220px) rotate(720deg);
          }
        }
      `}</style>

      <PixelCard className="text-center">
        <div className="pixel-font pixel-sm text-muted-foreground mb-2">
          ▸ EXCUSE GENERATOR ◂
        </div>

        <div
          className={cn(
            'min-h-[160px] flex flex-col items-center justify-center gap-2 px-4 py-6',
            rolling && 'shake'
          )}
        >
          {current && (
            <>
              <div className="text-5xl mb-2 pixfloat" aria-hidden>
                {current.emoji}
              </div>
              <div className="pixel-font pixel-h3 text-primary">
                {current.title}
              </div>
              <div className="vt-font text-xl text-foreground/90 leading-snug max-w-md">
                {current.body}
              </div>
            </>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
          <PixelButton onClick={roll} disabled={rolling}>
            {rolling ? '◆ rolling...' : '🎲 roll excuse'}
          </PixelButton>
          <span className="vt-font text-muted-foreground text-base">
            excuses rolled: <span className="text-primary pixel-font pixel-sm">{count}</span>
          </span>
        </div>
      </PixelCard>
    </div>
  );
}
