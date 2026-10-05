import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { SUBSTACK_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Writing",
  description: "Essays on building health systems, published on Substack.",
  alternates: { canonical: "/writing/" },
};

/** Topics, not post titles: this page doesn't list articles that aren't linked individually. */
const topics = [
  "Treating physiology and behavior as measurable systems",
  "Longitudinal tracking: why adherence is an engineering variable",
  "Designing health software without presenting correlation as diagnosis",
  "Engineering tradeoffs in consumer health — signal vs. noise",
];

export default function WritingPage() {
  return (
    <article className="max-w-3xl space-y-10">
      <header className="space-y-4">
        <p className="eyebrow">Writing</p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Notes on building health systems</h1>
        <p className="prose-body text-base">
          Longer essays live on Substack. These are the threads I write about, and the reasoning behind the project pages on this site.
        </p>
      </header>
      <ul className="space-y-3 border-l border-border pl-5">
        {topics.map((t) => (
          <li key={t} className="text-[15px] text-foreground/85">{t}</li>
        ))}
      </ul>
      <Button asChild>
        <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer">
          Read on Substack
        </a>
      </Button>
    </article>
  );
}
