import Link from "next/link";

import { COURSEWORK } from "@/lib/coursework";

/** Relevant coursework, each course linked to the work it produced. */
export function CourseworkSection() {
  return (
    <section className="space-y-6" aria-labelledby="coursework">
      <div className="max-w-2xl space-y-2">
        <p className="eyebrow">Coursework</p>
        <h2 id="coursework" className="text-2xl font-semibold tracking-tight">
          Relevant courses, and what they produced
        </h2>
      </div>
      <ul className="grid list-none gap-3 p-0 sm:grid-cols-2">
        {COURSEWORK.map((c) => (
          <li key={c.name} className="surface space-y-1.5 p-4">
            <p className="flex flex-wrap items-baseline gap-x-2 text-sm font-medium">
              {c.name}
              {c.code ? <span className="font-mono text-[11px] text-muted-foreground">{c.code}</span> : null}
            </p>
            <p className="text-[13px] leading-relaxed text-muted-foreground">{c.work}</p>
            {c.evidence ? (
              <Link href={c.evidence.href} className="inline-block text-[12px] text-primary underline-offset-4 hover:underline">
                {c.evidence.label} →
              </Link>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
