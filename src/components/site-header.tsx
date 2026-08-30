import Link from "next/link";

import { SiteNav } from "@/components/site-nav";
import { cn } from "@/lib/utils";

export function SiteHeader({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur-md",
        className
      )}
    >
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="group flex items-baseline gap-2 transition-colors"
        >
          <span className="text-sm font-semibold tracking-tight text-foreground group-hover:text-primary">
            Jonathan Terrero
          </span>
          <span className="hidden text-[11px] font-medium uppercase tracking-wider text-muted-foreground sm:inline">
            / HeartWire
          </span>
        </Link>
        <SiteNav />
      </div>
    </header>
  );
}
