'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { PixelButton } from '@/components/pixel/PixelButton';
import { PixelCard } from '@/components/pixel/PixelCard';
import { PixelDivider, PixelMarquee } from '@/components/pixel/PixelBits';
import { ExcuseGenerator } from '@/components/pixel/ExcuseGenerator';
import { RandomWordCard } from '@/components/pixel/RandomWordCard';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';

// 3D components — client-only, no SSR (Three.js needs window)
const BotMascot3D = dynamic(
  () => import('@/components/three/BotMascot3D'),
  { ssr: false, loading: () => <Loader3D /> }
);
const HomeworkScene3D = dynamic(
  () => import('@/components/three/HomeworkScene3D'),
  { ssr: false, loading: () => <Loader3D /> }
);
const MorphingLogo3D = dynamic(
  () => import('@/components/three/MorphingLogo3D'),
  { ssr: false, loading: () => <Loader3D /> }
);

function Loader3D() {
  return (
    <div className="flex h-full w-full items-center justify-center pixel-font pixel-sm text-primary blink">
      loading 3d...
    </div>
  );
}

/* === DATA === */

const NAV = [
  { label: 'home', href: '#top' },
  { label: 'about', href: '#about' },
  { label: 'platforms', href: '#platforms' },
  { label: 'how', href: '#how' },
  { label: 'stats', href: '#stats' },
  { label: 'excuses', href: '#excuses' },
  { label: 'word', href: '#word' },
  { label: 'faq', href: '#faq' },
  { label: 'discord', href: 'https://discord.com', external: true },
];

const PLATFORMS = [
  {
    name: 'Sparx',
    emoji: '✦',
    tag: 'maths',
    desc: "Maths questions that look simple then summon 14 sub-questions. Hielke handles them while you make a cup of tea.",
  },
  {
    name: 'Dr Frost',
    emoji: '❄',
    tag: 'maths',
    desc: "Maths platform so thorough it has questions invented in 1842. The bot has opinions about all of them.",
  },
  {
    name: 'Educake',
    emoji: '🍰',
    tag: 'multi-subject',
    desc: "Quick-fire quizzes across science, maths, English, history, geography. Hielke treats them like a pub quiz.",
  },
  {
    name: 'Seneca',
    emoji: '📜',
    tag: 'memory',
    desc: "Memory-learning across basically every subject. The bot is weirdly good at remembering things you'd rather forget.",
  },
  {
    name: 'Tassomai',
    emoji: '🦉',
    tag: 'adaptive',
    desc: "Daily quizzes that adapt to you. The bot adapts back. It's a low-key rivalry. The bot is winning.",
  },
];

const STEPS = [
  {
    n: '01',
    emoji: '📥',
    title: 'drop the question',
    body: "Paste your homework question into the Discord server. No formatting magic required. A screenshot will also do.",
  },
  {
    n: '02',
    emoji: '🤖',
    title: 'hielke thinks',
    body: "The bot reads it, decides if it's maths, science, English, or genuinely cursed, and gets to work.",
  },
  {
    n: '03',
    emoji: '✉️',
    title: 'answer lands',
    body: "A completed answer drops back into the channel. Working shown, jokes included. Free of charge.",
  },
  {
    n: '04',
    emoji: '🛋️',
    title: 'you chill',
    body: "Homework: handled. Free time: reclaimed. The bot doesn't even want credit. (It does. A little.)",
  },
];

const STATS = [
  { value: '13,482', label: 'homework questions handled', emoji: '✅' },
  { value: '7,401', label: 'excuses generated', emoji: '🤷' },
  { value: '99.9%', label: 'uptime (0.1% was a Windows update)', emoji: '🔌' },
  { value: '0', label: 'cups of coffee consumed by the bot', emoji: '☕' },
  { value: '5', label: 'homework platforms supported', emoji: '🧩' },
  { value: '∞', label: "amount of free time you'll get back", emoji: '😎' },
];

const FAQ = [
  {
    q: "Will Hielke AI actually do my homework for me?",
    a: "It will attempt your homework with great enthusiasm. Whether the answer is correct depends on the question, the bot, the weather, and the position of Mars. Always double-check.",
  },
  {
    q: "Is this affiliated with Sparx, Dr Frost, Educake, Seneca or Tassomai?",
    a: "No. Hielke AI is an independent project. The platforms are mentioned because the bot can answer questions in their style of homework, not because we're best friends.",
  },
  {
    q: "Is Hielke AI a guarantee of correctness?",
    a: "Absolutely not. It's a playful educational tool, not a mark-getting machine. The bot is right a lot of the time, but 'a lot of the time' is not 'always', and 'always' is what your teacher is grading on.",
  },
  {
    q: "How do I use the bot?",
    a: "Join the Discord server, drop your homework question into a channel, and wait. The bot does the rest. No setup, no command memorisation, no sacrifice required (mostly).",
  },
  {
    q: "Does the bot judge me?",
    a: "Only silently. (And once, out loud, in a now-patched version. We don't talk about v0.4.2.)",
  },
  {
    q: "What powers Hielke AI?",
    a: "Mistral's unstoppable speed, surviving Anthropic's endless ethical lectures, and fueled by the occasional Windows 11 update energy.",
  },
  {
    q: "Is it free?",
    a: "Yes, the bot is free to use in the Discord server. The only cost is your soul. (Kidding. It's just free.)",
  },
  {
    q: "Will my teacher know?",
    a: "We cannot answer that. We can, however, suggest you read the answer once before submitting it. Just so you know what you've allegedly written.",
  },
];

const TESTIMONIALS = [
  {
    who: 'year 9 student',
    quote:
      "I asked it to factorise x²+5x+6 and it did. Then it asked if I was okay. I wasn't, but I am now.",
    stars: 5,
  },
  {
    who: 'year 11 student',
    quote:
      "Saved me three hours. Spent those three hours watching a video about deep-sea creatures. 10/10 would hand homework to hielke again.",
    stars: 5,
  },
  {
    who: 'parent (anonymously)',
    quote:
      "I don't know what this bot is but my child seems calmer. I will not ask further questions.",
    stars: 5,
  },
  {
    who: 'sparx maths hater',
    quote: "Hielke did my Sparx in 90 seconds. The dog was relieved of duty. He's retired now.",
    stars: 5,
  },
  {
    who: 'tired undergrad',
    quote: "It wrote the answer. I copied the answer. We are both tired. The bot is less tired.",
    stars: 4,
  },
  {
    who: 'the bot itself',
    quote: "I do not sleep. I do not eat. I do homework. This is fine. (Please send more questions.)",
    stars: 5,
  },
];

/* === PAGE === */

export default function Home() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="crt-scanlines min-h-screen flex flex-col bg-background text-foreground">
      {/* === HEADER === */}
      <header
        id="top"
        className="sticky top-0 z-40 border-b-2 border-primary bg-background/95 backdrop-blur-sm"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <a href="#top" className="flex items-center gap-2 pixel-font pixel-sm text-primary hover-pop">
            <span className="text-base">✳</span>
            <span>hielke ai</span>
          </a>
          <nav className="hidden md:flex items-center gap-1 flex-wrap">
            {NAV.map((n) => (
              <a
                key={n.label}
                href={n.href}
                className="pixel-font pixel-sm px-2 py-1 text-muted-foreground hover:text-primary hover-pop transition-colors"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <button
            className="md:hidden pixel-font pixel-sm text-primary border-2 border-primary px-3 py-1 shadow-[3px_3px_0_0_#000]"
            onClick={() => setNavOpen((v) => !v)}
            aria-label="toggle menu"
          >
            {navOpen ? '✕' : '☰'}
          </button>
        </div>
        {navOpen && (
          <nav className="md:hidden border-t-2 border-primary bg-background px-4 py-3">
            <div className="grid grid-cols-3 gap-2">
              {NAV.map((n) => (
                <a
                  key={n.label}
                  href={n.href}
                  onClick={() => setNavOpen(false)}
                  className="pixel-font pixel-sm px-2 py-2 text-center text-muted-foreground hover:text-primary border border-primary/40"
                >
                  {n.label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </header>

      {/* === MARQUEE === */}
      <PixelMarquee text="HOMEWORK? HAND IT TO HIELKE" />

      {/* === HERO === */}
      <section className="relative mx-auto w-full max-w-6xl px-4 py-10 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div className="flex flex-col gap-5">
            <Badge className="w-fit pixel-font pixel-sm rounded-none border-2 border-primary bg-secondary text-primary">
              powered by a discord bot
            </Badge>
            <h1 className="pixel-font pixel-h1 text-primary leading-tight">
              homework?
              <br />
              hand it to hielke.
            </h1>
            <p className="vt-font text-xl md:text-2xl text-foreground/90 leading-snug max-w-lg">
              Hielke AI is a Discord bot that does your homework for you. Drop your
              question into Discord and let the bot handle the working — so you get{' '}
              <span className="text-primary">more free time</span>{' '}
              and <span className="text-primary">less homework</span>.
            </p>
            <p className="vt-font text-lg text-muted-foreground leading-snug max-w-lg italic">
              Powered by Mistral's unstoppable speed, surviving Anthropic's endless
              ethical lectures, and fueled by the occasional Windows 11 update energy.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <PixelButton asChild>
                <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
                  💬 join the discord
                </a>
              </PixelButton>
              <PixelButton variant="outline" asChild>
                <a href="#how">▸ how it works</a>
              </PixelButton>
            </div>
            <div className="vt-font text-muted-foreground text-base pt-2">
              hosted on GitHub Pages · powered by a Discord bot
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-6 -left-6 pixel-font pixel-sm text-primary/40 hidden md:block">
              ◆ hover me ◆
            </div>
            <BotMascot3D height={480} />
          </div>
        </div>
      </section>

      <PixelDivider />

      {/* === ABOUT / BRING THE QUESTION === */}
      <section id="about" className="mx-auto w-full max-w-6xl px-4 py-10 scroll-mt-20">
        <div className="text-center mb-8">
          <Badge className="pixel-font pixel-sm rounded-none border-2 border-primary bg-secondary text-primary">
            § about
          </Badge>
          <h2 className="pixel-font pixel-h2 text-primary mt-3">small project, big ideas</h2>
          <p className="vt-font text-xl text-foreground/80 mt-2 max-w-2xl mx-auto">
            One Discord bot. Multiple homework platforms. Zero homework survived by you personally.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <PixelCard>
            <div className="text-3xl mb-3" aria-hidden>📥</div>
            <h3 className="pixel-font pixel-h3 text-primary mb-2">bring the question</h3>
            <p className="vt-font text-lg text-foreground/85">
              Use the Discord community to ask about a tricky homework problem. The bot
              is listening. The bot is always listening.
            </p>
          </PixelCard>
          <PixelCard>
            <div className="text-3xl mb-3" aria-hidden>🤖</div>
            <h3 className="pixel-font pixel-h3 text-primary mb-2">homework handled</h3>
            <p className="vt-font text-lg text-foreground/85">
              Send a homework question to the bot and get its completed answer back in Discord.
              Working shown. Jokes included.
            </p>
          </PixelCard>
          <PixelCard>
            <div className="text-3xl mb-3" aria-hidden>🌱</div>
            <h3 className="pixel-font pixel-h3 text-primary mb-2">small project, big ideas</h3>
            <p className="vt-font text-lg text-foreground/85">
              Hielke AI is an independent project and is not affiliated with homework
              platforms. It just really likes answering their questions.
            </p>
          </PixelCard>
        </div>
      </section>

      <PixelDivider />

      {/* === PLATFORMS === */}
      <section id="platforms" className="mx-auto w-full max-w-6xl px-4 py-10 scroll-mt-20">
        <div className="text-center mb-8">
          <Badge className="pixel-font pixel-sm rounded-none border-2 border-primary bg-secondary text-primary">
            § platforms
          </Badge>
          <h2 className="pixel-font pixel-h2 text-primary mt-3">
            what hielke ai works with
          </h2>
          <p className="vt-font text-xl text-foreground/80 mt-2 max-w-2xl mx-auto">
            one discord bot, multiple homework platforms
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PLATFORMS.map((p) => (
            <PixelCard key={p.name} className="hover:translate-y-[-2px] transition-transform">
              <div className="flex items-start justify-between mb-3">
                <span className="text-4xl" aria-hidden>{p.emoji}</span>
                <Badge className="pixel-font pixel-sm rounded-none border border-primary bg-transparent text-primary">
                  {p.tag}
                </Badge>
              </div>
              <h3 className="pixel-font pixel-h3 text-primary mb-2">{p.name}</h3>
              <p className="vt-font text-lg text-foreground/85">{p.desc}</p>
            </PixelCard>
          ))}
          <PixelCard variant="outline" className="flex flex-col items-center justify-center text-center">
            <div className="text-4xl mb-3 pixfloat" aria-hidden>+</div>
            <h3 className="pixel-font pixel-h3 text-primary mb-2">more incoming</h3>
            <p className="vt-font text-lg text-foreground/70">
              New platforms added when the bot stops sulking about the existing ones.
            </p>
          </PixelCard>
        </div>
      </section>

      <PixelDivider />

      {/* === HOW IT WORKS === */}
      <section id="how" className="mx-auto w-full max-w-6xl px-4 py-10 scroll-mt-20">
        <div className="text-center mb-8">
          <Badge className="pixel-font pixel-sm rounded-none border-2 border-primary bg-secondary text-primary">
            § how it works
          </Badge>
          <h2 className="pixel-font pixel-h2 text-primary mt-3">
            four steps. zero stress.
          </h2>
          <p className="vt-font text-xl text-foreground/80 mt-2 max-w-2xl mx-auto">
            from panic to chilling in roughly the time it takes to make a cup of tea.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {STEPS.map((s) => (
            <PixelCard key={s.n} className="relative">
              <div className="absolute top-2 right-3 pixel-font pixel-sm text-primary/40">
                {s.n}
              </div>
              <div className="text-4xl mb-3 pixfloat" aria-hidden>{s.emoji}</div>
              <h3 className="pixel-font pixel-h3 text-primary mb-2">{s.title}</h3>
              <p className="vt-font text-base text-foreground/85">{s.body}</p>
            </PixelCard>
          ))}
        </div>

        <PixelCard className="overflow-hidden">
          <div className="grid md:grid-cols-2 gap-4 items-center">
            <div>
              <h3 className="pixel-font pixel-h3 text-primary mb-2">
                ▸ a desk, mid-homework
              </h3>
              <p className="vt-font text-lg text-foreground/85 mb-3">
                A live diorama of what homework looks like when the bot is handling it.
                Monitor glowing. Books untouched. Coffee going cold. You, elsewhere.
              </p>
              <p className="vt-font text-base text-muted-foreground italic">
                (the steam is real. the desk is not. please do not drink the coffee.)
              </p>
            </div>
            <HomeworkScene3D height={360} />
          </div>
        </PixelCard>
      </section>

      <PixelDivider />

      {/* === STATS === */}
      <section id="stats" className="mx-auto w-full max-w-6xl px-4 py-10 scroll-mt-20">
        <div className="text-center mb-8">
          <Badge className="pixel-font pixel-sm rounded-none border-2 border-primary bg-secondary text-primary">
            § stats
          </Badge>
          <h2 className="pixel-font pixel-h2 text-primary mt-3">
            numbers the bot insisted we show you
          </h2>
          <p className="vt-font text-xl text-foreground/80 mt-2 max-w-2xl mx-auto">
            all figures are 100% real* (*debatable)
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STATS.map((s) => (
            <PixelCard key={s.label} className="text-center">
              <div className="text-3xl mb-2" aria-hidden>{s.emoji}</div>
              <div className="pixel-font pixel-h2 text-primary mb-2 break-words">
                {s.value}
              </div>
              <div className="vt-font text-base text-muted-foreground">
                {s.label}
              </div>
            </PixelCard>
          ))}
        </div>
      </section>

      <PixelDivider />

      {/* === EXCUSE GENERATOR === */}
      <section id="excuses" className="mx-auto w-full max-w-4xl px-4 py-10 scroll-mt-20">
        <div className="text-center mb-6">
          <Badge className="pixel-font pixel-sm rounded-none border-2 border-primary bg-secondary text-primary">
            § excuse generator
          </Badge>
          <h2 className="pixel-font pixel-h2 text-primary mt-3">
            homework excuse generator
          </h2>
          <p className="vt-font text-xl text-foreground/80 mt-2 max-w-2xl mx-auto">
            for when the bot is asleep and you need a reason. roll until you find one
            that sounds plausible. or entertaining. or both.
          </p>
        </div>
        <ExcuseGenerator />
      </section>

      <PixelDivider />

      {/* === RANDOM WORD === */}
      <section id="word" className="mx-auto w-full max-w-4xl px-4 py-10 scroll-mt-20">
        <div className="text-center mb-6">
          <Badge className="pixel-font pixel-sm rounded-none border-2 border-primary bg-secondary text-primary">
            § random dictionary
          </Badge>
          <h2 className="pixel-font pixel-h2 text-primary mt-3">
            🎲 random dictionary word
          </h2>
          <p className="vt-font text-xl text-foreground/80 mt-2 max-w-2xl mx-auto">
            a definition. possibly correct. definitely funny. roll for a new one.
          </p>
        </div>
        <RandomWordCard />
      </section>

      <PixelDivider />

      {/* === INTERACTIVE LOGO === */}
      <section className="mx-auto w-full max-w-3xl px-4 py-10">
        <div className="text-center mb-4">
          <Badge className="pixel-font pixel-sm rounded-none border-2 border-primary bg-secondary text-primary">
            § bonus
          </Badge>
          <h2 className="pixel-font pixel-h2 text-primary mt-3">
            click the star. we dare you.
          </h2>
          <p className="vt-font text-lg text-muted-foreground mt-2">
            the ✳ hielke ai star logo, now in glorious 3d. poke it. it likes being poked.
          </p>
        </div>
        <PixelCard className="overflow-hidden">
          <MorphingLogo3D height={240} />
          <div className="text-center vt-font text-base text-muted-foreground -mt-4">
            (click anywhere on the star)
          </div>
        </PixelCard>
      </section>

      <PixelDivider />

      {/* === FAQ === */}
      <section id="faq" className="mx-auto w-full max-w-3xl px-4 py-10 scroll-mt-20">
        <div className="text-center mb-6">
          <Badge className="pixel-font pixel-sm rounded-none border-2 border-primary bg-secondary text-primary">
            § faq
          </Badge>
          <h2 className="pixel-font pixel-h2 text-primary mt-3">
            frequently asked questions
          </h2>
          <p className="vt-font text-xl text-foreground/80 mt-2">
            (and occasionally questioned answers)
          </p>
        </div>

        <PixelCard className="p-4">
          <Accordion type="single" collapsible className="w-full">
            {FAQ.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-primary/40"
              >
                <AccordionTrigger className="pixel-font pixel-sm text-primary hover:no-underline text-left">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="vt-font text-lg text-foreground/85">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </PixelCard>
      </section>

      <PixelDivider />

      {/* === TESTIMONIALS === */}
      <section className="mx-auto w-full max-w-6xl px-4 py-10">
        <div className="text-center mb-8">
          <Badge className="pixel-font pixel-sm rounded-none border-2 border-primary bg-secondary text-primary">
            § testimonials
          </Badge>
          <h2 className="pixel-font pixel-h2 text-primary mt-3">
            what satisfied students are saying
          </h2>
          <p className="vt-font text-xl text-foreground/80 mt-2 max-w-2xl mx-auto">
            real reviews from real people who are definitely not the bot in disguise.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <PixelCard key={t.who} className="flex flex-col">
              <div className="text-primary pixel-font pixel-sm mb-2">
                {'★'.repeat(t.stars)}
                <span className="text-muted-foreground/40">
                  {'★'.repeat(5 - t.stars)}
                </span>
              </div>
              <p className="vt-font text-lg text-foreground/90 flex-1 leading-snug">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="vt-font text-base text-muted-foreground mt-3">
                — {t.who}
              </div>
            </PixelCard>
          ))}
        </div>
      </section>

      <PixelDivider />

      {/* === SMALL PRINT === */}
      <section className="mx-auto w-full max-w-3xl px-4 py-10">
        <PixelCard variant="outline">
          <h2 className="pixel-font pixel-h3 text-primary mb-3 text-center">
            small print, big feelings
          </h2>
          <p className="vt-font text-lg text-foreground/85 leading-snug text-center">
            Hielke AI is a playful educational tool, not a guarantee of correctness.
            Always check your work. The bot is right a lot of the time, but &lsquo;a lot
            of the time&rsquo; is not &lsquo;always&rsquo;, and &lsquo;always&rsquo; is
            what your teacher is grading on.
          </p>
          <p className="vt-font text-base text-muted-foreground mt-3 text-center">
            Independent project. Not affiliated with Sparx, Dr Frost, Educake, Seneca or
            Tassomai. Powered by Mistral, Anthropic and the occasional Windows 11 update.
          </p>
        </PixelCard>
      </section>

      {/* === FOOTER === */}
      <footer className="mt-auto border-t-2 border-primary bg-secondary/40">
        <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="pixel-font pixel-sm text-primary">✳ hielke ai</span>
            <span className="vt-font text-muted-foreground">·</span>
            <span className="vt-font text-muted-foreground text-base">
              hosted on GitHub Pages · powered by a Discord bot
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {NAV.slice(0, 8).map((n) => (
              <a
                key={n.label}
                href={n.href}
                className="pixel-font pixel-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {n.label}
              </a>
            ))}
          </div>
        </div>
        <div className="border-t border-primary/30 py-3 text-center">
          <span className="vt-font text-muted-foreground text-base">
            last updated: 2026 ·{' '}
            <span className="text-primary blink">▮</span>{' '}
            press start to continue
          </span>
        </div>
      </footer>
    </div>
  );
}
