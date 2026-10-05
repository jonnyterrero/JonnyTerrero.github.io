import Link from "next/link";

import { SiteNav } from "@/components/site-nav";
import { BRAND } from "@/lib/brand";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur print:hidden">
      <div className="relative mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-baseline gap-3">
          <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.22em] text-foreground">
            {BRAND.company}
          </span>
          <span className="hidden text-[13px] text-muted-foreground sm:inline">{BRAND.founder}</span>
        </Link>
        <SiteNav />
      </div>
    </header>
  );
}
