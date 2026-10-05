import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

import { CapabilitiesSection } from "@/components/capabilities-section";
import { DivisionGrid } from "@/components/division-index";
import { ProjectCard } from "@/components/project-card";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/lib/brand";
import { getFlagship, getProjectsByDivision, hasValidRepoUrl } from "@/lib/projects";
import { GITHUB_URL, LINKEDIN_URL, MAILTO_URL, RESUME_PATH } from "@/lib/site";

const FLAGSHIP_DIAGRAM = `Next.js 15 PWA ── check-in · journal · dashboards
      │
      ▼
server actions ── session refresh · AES-256-GCM
      │            journal encryption (server-only)
      ▼
Supabase ─┬─ Auth
          ├─ Postgres + RLS (per-user rows)
          └─ upsert_mindmap_entry(jsonb)
      ▲
      │ reads entries · writes predictions
Python ML (offline) ── rule baseline · calibrated
                       model · abstains · output gate`;

const flagshipPoints = [
  {
    title: "Atomic daily check-in",
    body: "One Postgres RPC writes a whole day, so a partial submit can’t leave a half-written record and a re-submit overwrites instead of duplicating.",
  },
  {
    title: "Isolation in the database",
    body: "Row-level security on every user table, with a SQL test suite that impersonates two users and asserts neither can see the other’s rows.",
  },
  {
    title: "ML that is allowed to say “not enough data”",
    body: "A calibrated model that abstains on thin evidence, behind a gate that blocks diagnostic phrasing. So far it is validated on synthetic data only, and the model card says so.",
  },
];

const evidenceTiers = [
  {
    label: "Verified",
    body: "Traceable to code, a deployed artifact, or a recorded measurement. This is the only kind of claim on project pages.",
  },
  {
    label: "Pending",
    body: "Marked in amber on each page, with the planned test. Not filled with estimates — a blank is recoverable; a number I can’t reproduce isn’t.",
  },
  {
    label: "Not claimed",
    body: "Every health product states what it isn’t: not a medical device, no FDA evaluation, correlational output only.",
  },
];

export default function HomePage() {
  const flagship = getFlagship();
  const products = getProjectsByDivision("product").filter((p) => p.slug !== flagship.slug);
  const systems = getProjectsByDivision("systems");

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: BRAND.founder,
    url: BRAND.siteUrl,
    jobTitle: "Software Engineer",
    alumniOf: "Florida Gulf Coast University",
    sameAs: [GITHUB_URL, LINKEDIN_URL],
    founder: { "@type": "Organization", name: BRAND.company },
  };

  return (
    <div className="space-y-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />

      {/* 1 — who, and what Terrero Labs is */}
      <section className="max-w-3xl space-y-7 pt-2">
        <p className="eyebrow">
          {BRAND.company} · {BRAND.companyDescriptor}
        </p>
        <h1 className="text-[2rem] font-semibold leading-[1.15] tracking-tight sm:text-5xl">
          I build software and hardware that turn physiology, behavior, and biosignals into measurable systems.
        </h1>
        <div className="prose-body max-w-2xl space-y-3 text-base">
          <p>
            I’m {BRAND.founder}: a Software Engineer I at OmniFlex Fitness and a biomedical engineering student at Florida Gulf Coast University. {BRAND.companyLine}
          </p>
          <p className="text-muted-foreground">
            Every project here states what is built, what has been measured, and what it doesn’t claim.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href="/work">
              Explore the work <ArrowRight aria-hidden />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href={`/projects/${flagship.slug}`}>View {flagship.name}</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href={RESUME_PATH}>Resume</Link>
          </Button>
        </div>
      </section>

      {/* 2 — HeartWire, the startup, led by its flagship */}
      <div className="space-y-6">
      <div className="max-w-2xl space-y-2">
        <p className="eyebrow">
          {BRAND.startup} · {BRAND.startupStatus}
        </p>
        <h2 className="text-2xl font-semibold tracking-tight">
          <Link href="/heartwire" className="hover:text-primary">{BRAND.startup}</Link>
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">{BRAND.startupLine}</p>
      </div>
      <section aria-labelledby="flagship" className="surface overflow-hidden">
        <div className="grid lg:grid-cols-12">
          <div className="space-y-6 p-6 sm:p-8 lg:col-span-7">
            <div className="space-y-3">
              <p className="eyebrow">{BRAND.startup} · flagship product</p>
              <h2 id="flagship" className="flex items-center gap-3 text-3xl font-semibold tracking-tight">
                <span className="size-2.5 rounded-full bg-violet-400" aria-hidden />
                {flagship.name}
              </h2>
              <p className="text-lg leading-relaxed text-foreground/85">{flagship.tagline}</p>
              <StatusBadge project={flagship} />
            </div>
            <ul className="space-y-4">
              {flagshipPoints.map((pt) => (
                <li key={pt.title} className="space-y-1">
                  <p className="text-sm font-medium">{pt.title}</p>
                  <p className="text-[13.5px] leading-relaxed text-muted-foreground">{pt.body}</p>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              <Button asChild>
                <Link href={`/projects/${flagship.slug}`}>Read the case study</Link>
              </Button>
              {flagship.liveUrl ? (
                <Button asChild variant="outline">
                  <a href={flagship.liveUrl} target="_blank" rel="noopener noreferrer">
                    Launch {flagship.name} <ExternalLink aria-hidden />
                  </a>
                </Button>
              ) : null}
              {hasValidRepoUrl(flagship.repoUrl) ? (
                <Button asChild variant="outline">
                  <a href={flagship.repoUrl} target="_blank" rel="noopener noreferrer">
                    Source <ExternalLink aria-hidden />
                  </a>
                </Button>
              ) : null}
            </div>
          </div>
          <figure className="flex flex-col justify-center gap-3 border-t border-border bg-[#0e1114] p-6 sm:p-8 lg:col-span-5 lg:border-l lg:border-t-0">
            <p className="eyebrow">System architecture</p>
            <pre className="overflow-x-auto font-mono text-[11px] leading-[1.5] text-foreground/80" role="img" aria-label="MindMap architecture: Next.js client, server actions with journal encryption, Supabase with RLS, and an offline Python ML layer">
              {FLAGSHIP_DIAGRAM}
            </pre>
          </figure>
        </div>
      </section>

      {/* 3 — the rest of HeartWire */}
      <section aria-label={`More from ${BRAND.startup}`}>
        <ul className="grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <li key={p.slug}>
              <ProjectCard project={p} />
            </li>
          ))}
        </ul>
      </section>
      </div>

      {/* 4, 5 — engineering and research proof */}
      <DivisionGrid division="engineering" />
      <DivisionGrid division="research" />

      {/* how claims are made */}
      <section className="space-y-6" aria-labelledby="evidence">
        <div className="max-w-2xl space-y-2">
          <p className="eyebrow">How this portfolio is written</p>
          <h2 id="evidence" className="text-2xl font-semibold tracking-tight">
            Evidence over adjectives
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Each project follows a ten-part template — problem, requirements, architecture, decisions, scope, implementation, verification, failures, limitations, and links — and every claim is tagged before it’s published.
          </p>
        </div>
        <ul className="grid list-none gap-4 p-0 sm:grid-cols-3">
          {evidenceTiers.map((t) => (
            <li key={t.label} className="surface space-y-2 p-5">
              <p className="font-mono text-[11px] uppercase tracking-wider text-primary">{t.label}</p>
              <p className="text-[13.5px] leading-relaxed text-foreground/80">{t.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* experience */}
      <section className="grid gap-8 lg:grid-cols-12" aria-labelledby="experience">
        <div className="space-y-2 lg:col-span-4">
          <p className="eyebrow">Experience</p>
          <h2 id="experience" className="text-2xl font-semibold tracking-tight">
            Production software
          </h2>
        </div>
        <div className="space-y-8 lg:col-span-8">
          <div className="space-y-3">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-medium">
                Software Engineer I <span className="text-muted-foreground">· OmniFlex Fitness (remote)</span>
              </p>
              <p className="font-mono text-xs text-muted-foreground">May 2026 – present</p>
            </div>
            <ul className="list-disc space-y-2 pl-5 text-[14px] leading-relaxed text-foreground/80 marker:text-muted-foreground/60">
              <li>Built a batched Firestore write pipeline and typed data-access layer that cut Firestore reads/writes per session by 10%.</li>
              <li>Removed a class of subscription-leak concurrency bugs with OnPush change detection and takeUntilDestroyed subscription hygiene.</li>
              <li>Ship features across an Angular task platform and a real-time multiplayer trivia app (Firebase, Flutter) on a weekly release cadence.</li>
            </ul>
          </div>
          <div className="flex flex-wrap items-baseline justify-between gap-2 border-t border-border pt-6">
            <p className="font-medium">
              {BRAND.degree} <span className="text-muted-foreground">· minors in {BRAND.minors}</span>
            </p>
            <p className="font-mono text-xs text-muted-foreground">{BRAND.gradDate}</p>
          </div>
        </div>
      </section>

      <CapabilitiesSection />

      {/* systems + contact */}
      <section className="grid gap-6 border-t border-border pt-12 lg:grid-cols-2">
        <div className="space-y-3">
          <p className="eyebrow">Personal tooling</p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            I also build infrastructure for my own work — not a product, and documented the same way:{" "}
            {systems.map((s, i) => (
              <span key={s.slug}>
                {i > 0 ? " and " : null}
                <Link href={`/projects/${s.slug}`} className="text-foreground underline-offset-4 hover:underline">
                  {s.name}
                </Link>
              </span>
            ))}
            .
          </p>
          <p className="text-sm text-muted-foreground">
            I write about building health systems on <Link href="/writing" className="text-foreground underline-offset-4 hover:underline">Substack</Link>.
          </p>
        </div>
        <div className="space-y-3 lg:text-right">
          <p className="eyebrow">Contact</p>
          <p className="text-sm text-muted-foreground">Open to software, biomedical device, and health-tech roles.</p>
          <div className="flex flex-wrap gap-2 lg:justify-end">
            <Button asChild>
              <a href={MAILTO_URL}>Email me</a>
            </Button>
            <Button asChild variant="outline">
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </Button>
            <Button asChild variant="outline">
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">GitHub</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
