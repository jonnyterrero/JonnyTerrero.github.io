"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/ecosystem", label: "Ecosystem" },
  { href: "/writing", label: "Writing" },
  { href: "/about", label: "About" },
] as const;

function linkActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-6" aria-label="Primary">
      {links.map(({ href, label }) => {
        const active = linkActive(pathname, href);
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "text-sm transition-colors",
              active
                ? "border-b border-primary/50 pb-0.5 text-primary"
                : "border-b border-transparent pb-0.5 text-muted-foreground hover:text-primary/85"
            )}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
