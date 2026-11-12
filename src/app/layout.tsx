import type { Metadata } from "next";
import { Press_Start_2P, VT323, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const pixel = Press_Start_2P({
  variable: "--font-pixel",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const vt323 = VT323({
  variable: "--font-vt323",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "✳ hielke ai — homework? hand it to hielke.",
  description:
    "Hielke AI is a Discord bot that does your homework for you. Drop your question in Discord and reclaim your free time. Powered by Mistral's unstoppable speed, surviving Anthropic's endless ethical lectures, and fueled by the occasional Windows 11 update energy.",
  keywords: [
    "hielke ai",
    "discord bot",
    "homework bot",
    "sparx",
    "dr frost",
    "educake",
    "seneca",
    "tassomai",
    "homework help",
  ],
  authors: [{ name: "Hielke AI" }],
  openGraph: {
    title: "✳ hielke ai — homework? hand it to hielke.",
    description:
      "A Discord bot that does your homework so you don't have to. More free time, less homework.",
    siteName: "Hielke AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "✳ hielke ai",
    description: "Homework? Hand it to Hielke.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${pixel.variable} ${vt323.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
