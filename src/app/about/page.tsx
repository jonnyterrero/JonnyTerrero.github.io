import type { Metadata } from "next";
import Link from "next/link";

import { CapabilitiesSection } from "@/components/capabilities-section";
import { CourseworkSection } from "@/components/coursework-section";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/lib/brand";
import { RESUME_PATH } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `${BRAND.founder} — ${BRAND.founderRole}.`,
  alternates: { canonical: "/about/" },
};

const education = [
  {
    school: "Florida Gulf Coast University",
    credential: `B.S. Biomedical Engineering · minors in ${BRAND.minors}`,
    period: BRAND.gradDate,
  },
  {
    school: "Florida SouthWestern State College",
    credential: "A.A., focus in Bioengineering and Biochemistry",
    period: "December 2023",
  },
];

const leadership = [
  { org: "National Society of Black Engineers (NSBE)", role: "Treasurer" },
  { org: "Collegiate 100", role: "Head of Development" },
  { org: "Biomedical Engineering Society (BMES)", role: "Member" },
  { org: "Florida Engineering Society (FES)", role: "Member" },
];

export default function AboutPage() {
  return (
    <article className="space-y-16">
      <header className="max-w-3xl space-y-5">
        <p className="eyebrow">About</p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Engineer, builder, and systems thinker.
        </h1>
        <div className="prose-body space-y-4 text-base">
          <p>
            I’m {BRAND.founder}, a Software Engineer I at OmniFlex Fitness and a biomedical engineering student at Florida Gulf Coast University. {BRAND.companyLine}
          </p>
          <p>{BRAND.startupLine}</p>
          <p>
            I treat the body and mind as systems: inputs, outputs, and patterns that can be measured, understood, and improved over time. Structured inputs and explicit hypotheses beat anecdotes when you’re trying to understand something that changes constantly — and the same rule applies to my own work, which is why every project here says what has and hasn’t been verified.
          </p>
          <p>
            Outside engineering, I’m an Orthodox Christian, a powerlifter, and a Brazilian Jiu-Jitsu practitioner. Those shape how I approach problems: consistent, deliberate, and grounded in reality.
          </p>
        </div>
      </header>

      <section className="grid gap-8 lg:grid-cols-12" aria-labelledby="education">
        <h2 id="education" className="eyebrow lg:col-span-3">Education</h2>
        <ul className="space-y-4 lg:col-span-9">
          {education.map((ed) => (
            <li key={ed.school} className="flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <p className="font-medium">{ed.school}</p>
                <p className="text-sm text-muted-foreground">{ed.credential}</p>
              </div>
              <span className="font-mono text-xs text-muted-foreground">{ed.period}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-8 lg:grid-cols-12" aria-labelledby="leadership">
        <h2 id="leadership" className="eyebrow lg:col-span-3">Leadership</h2>
        <ul className="grid gap-2 sm:grid-cols-2 lg:col-span-9">
          {leadership.map((item) => (
            <li key={item.org} className="text-sm">
              <span className="font-medium">{item.role}</span>
              <span className="text-muted-foreground"> · {item.org}</span>
            </li>
          ))}
        </ul>
      </section>

      <CourseworkSection />

      <CapabilitiesSection />

      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <Link href={RESUME_PATH}>Resume</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/work">All work</Link>
        </Button>
      </div>
    </article>
  );
}
