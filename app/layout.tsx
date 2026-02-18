"use client";

import './globals.css';
import { Inter, Playfair_Display } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  style: ['normal', 'italic'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>QanoonAI - Pakistan&apos;s AI-Powered Legal Intelligence Platform</title>
        <meta name="description" content="QanoonAI combines 300,000+ Pakistani court judgments with AI to give judges neutral case briefs, lawyers instant drafting, and citizens free legal guidance." />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>{children}</body>
    </html>
  );
}
