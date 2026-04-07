import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { SiteHeader } from "@/components/site-header";

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
        <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground">
          <p>HeartWire — portfolio and deployment router. Apps run on their own infra.</p>
        </footer>
      </body>
    </html>
  );
}
