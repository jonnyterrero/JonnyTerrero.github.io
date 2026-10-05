"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

export const NAV_LINKS = [
  { href: "/products", label: "Products" },
  { href: "/engineering", label: "Engineering" },
  { href: "/research", label: "Research" },
  { href: "/about", label: "About" },
  { href: "/writing", label: "Writing" },
  { href: "/resume", label: "Resume" },
] as const;

function linkActive(pathname: string, href: string): boolean {
  const p = pathname.replace(/\/$/, "") || "/";
  return p === href || p.startsWith(`${href}/`);
}

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu on navigation.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
        {NAV_LINKS.map(({ href, label }) => {
          const active = linkActive(pathname, href);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "text-[13px] transition-colors",
                active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {label}
            </Link>
          );
        })}
      </nav>

      <button
        type="button"
        className="-mr-2 inline-flex size-11 items-center justify-center rounded-md text-muted-foreground hover:text-foreground md:hidden"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Primary"
          className="absolute inset-x-0 top-full border-b border-border bg-background md:hidden"
        >
          <ul className="mx-auto max-w-6xl px-4 py-2">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={linkActive(pathname, href) ? "page" : undefined}
                  className="flex min-h-11 items-center text-sm text-muted-foreground hover:text-foreground aria-[current=page]:text-foreground"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </>
  );
}
