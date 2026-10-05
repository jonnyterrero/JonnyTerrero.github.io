import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";

import { SiteHeader } from "@/components/site-header";
import { BRAND } from "@/lib/brand";
import { DIVISIONS } from "@/lib/projects";
import {
  CONTACT_EMAIL,
  GITHUB_URL,
  LINKEDIN_URL,
  MAILTO_URL,
  RESUME_PATH,
  SUBSTACK_URL,
} from "@/lib/site";

import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.siteUrl),
  title: {
    default: `${BRAND.founder} — ${BRAND.company}`,
    template: `%s · ${BRAND.founder}`,
  },
  description: BRAND.description,
  openGraph: {
    type: "website",
    siteName: `${BRAND.founder} — ${BRAND.company}`,
    title: `${BRAND.founder} — ${BRAND.company}`,
    description: BRAND.description,
    url: "/",
  },
  alternates: { canonical: "/" },
};

const footerLinks = [
  { href: GITHUB_URL, label: "GitHub" },
  { href: LINKEDIN_URL, label: "LinkedIn" },
  { href: SUBSTACK_URL, label: "Substack" },
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen font-sans`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded focus:bg-card focus:px-3 focus:py-2"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
          {children}
        </main>
        <footer className="border-t border-border print:hidden">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 text-sm sm:grid-cols-[1fr_auto_auto] sm:px-6">
            <div className="space-y-1">
              <p className="font-medium">{BRAND.founder}</p>
              <p className="text-muted-foreground">{BRAND.founderRole}</p>
              <a href={MAILTO_URL} className="inline-block pt-2 text-muted-foreground hover:text-foreground">
                {CONTACT_EMAIL}
              </a>
            </div>
            <ul className="space-y-1.5">
              {Object.values(DIVISIONS).map((d) => (
                <li key={d.href}>
                  <Link href={d.href} className="text-muted-foreground hover:text-foreground">
                    {d.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={RESUME_PATH} className="text-muted-foreground hover:text-foreground">
                  Resume
                </Link>
              </li>
            </ul>
            <ul className="space-y-1.5">
              {footerLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </footer>
      </body>
    </html>
  );
}
