import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SUBSTACK_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Writing",
};
const featured = {
  title: "Systems, physiology, and building in health",
  excerpt:
    "Notes on treating the body and behavior as measurable systems, and what that implies for tools that people will actually use. No full essays here—only pointers to the archive.",
  href: SUBSTACK_URL,
} as const;

const more = [
  {
    title: "Field notes on longitudinal tracking",
    description: "Short updates on patterns, instrumentation, and product decisions.",
    href: SUBSTACK_URL,
  },
  {
    title: "Engineering tradeoffs in consumer health",
    description: "Signal vs noise, adherence, and when to stop adding features.",
    href: SUBSTACK_URL,
  },
  {
    title: "Reading list and synthesis",
    description: "Curated threads tied back to HeartWire projects and experiments.",
    href: SUBSTACK_URL,
  },
] as const;

export default function WritingPage() {
  return (
    <article className="space-y-12">
      <header className="space-y-3">
        <h1 className="accent-text font-mono text-sm font-semibold uppercase tracking-[0.22em]">
          {`// WRITING & REFLECTION`}
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Essays and longer threads live on Substack. This page is an index only.
        </p>
      </header>

      <section className="space-y-4 rounded-lg border border-primary/12 bg-card/50 p-6">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Featured
        </p>
        <h2 className="text-lg font-semibold tracking-tight">{featured.title}</h2>
        <p className="text-sm font-medium leading-relaxed text-muted-foreground">
          {featured.excerpt}
        </p>
        <Button variant="outline" size="sm" asChild>
          <a href={featured.href} target="_blank" rel="noopener noreferrer">
            Read on Substack →
          </a>
        </Button>
      </section>

      <Separator />

      <section className="space-y-6">
        <h2 className="text-sm font-semibold text-foreground">More</h2>
        <ul className="list-none space-y-6 p-0">
          {more.map((item) => (
            <li key={item.title} className="space-y-2">
              <p className="text-sm font-medium text-foreground">{item.title}</p>
              <p className="text-sm font-medium text-muted-foreground">
                {item.description}
              </p>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Read on Substack →
              </a>
            </li>
          ))}
        </ul>
      </section>

      <Separator />

      <Button variant="ghost" size="sm" className="px-0" asChild>
        <Link href="/">← Home</Link>
      </Button>
    </article>
  );
}
