import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Github, Linkedin } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { GITHUB_URL, LINKEDIN_URL, SUBSTACK_URL } from "@/lib/site";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "HeartWire",
    template: "%s · HeartWire",
  },
  description:
    "HeartWire is a health-tech lab and studio: clinical and consumer tools at the intersection of physiology, data, behavior, and engineering systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen font-sans`}
      >
        <SiteHeader />
        <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
          {children}
        </main>
        <footer className="border-t border-border/80 py-8 text-center text-xs text-muted-foreground">
          <p className="max-w-md mx-auto leading-relaxed">
            HeartWire — portfolio and deployment router. Apps run on their own
            infra.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-primary"
            >
              <Github className="size-3.5 shrink-0" aria-hidden />
              GitHub
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-primary"
            >
              <Linkedin className="size-3.5 shrink-0" aria-hidden />
              LinkedIn
            </a>
            <a
              href={SUBSTACK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              Substack
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
