import { CircleDashed } from "lucide-react";

import {
  SECTION_NUMBERS,
  SECTION_ORDER,
  SECTION_TITLES,
  hasLiveUrl,
  hasValidRepoUrl,
  sectionCoverage,
  type Block,
  type Project,
  type SectionKey,
} from "@/lib/projects";
import { cn } from "@/lib/utils";

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return <p>{block.text}</p>;
    case "list":
      return (
        <ul className="list-disc space-y-2 pl-5 marker:text-muted-foreground/60">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "diagram":
      return (
        <figure className="space-y-2">
          <pre className="diagram" role="img" aria-label={block.caption ?? "System block diagram"}>
            {block.text}
          </pre>
          {block.caption ? (
            <figcaption className="text-xs text-muted-foreground">{block.caption}</figcaption>
          ) : null}
        </figure>
      );
    case "table":
      return (
        <div className="overflow-x-auto rounded-md border border-border">
          <table className="w-full min-w-[34rem] border-collapse text-left text-[13px]">
            <thead>
              <tr className="border-b border-border bg-muted">
                {block.columns.map((c) => (
                  <th key={c} scope="col" className="px-3 py-2 font-mono text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row.join("|")} className="border-b border-border last:border-0 align-top">
                  {row.map((cell, i) => (
                    <td key={i} className={cn("px-3 py-2", i === 0 && "font-mono text-muted-foreground")}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "decision":
      return (
        <div className="surface space-y-2 p-4">
          <p className="font-medium text-foreground">{block.title}</p>
          <dl className="grid gap-x-4 gap-y-1.5 sm:grid-cols-[7rem_1fr]">
            <dt className="eyebrow pt-0.5">Chosen</dt>
            <dd>{block.chosen}</dd>
            {block.alternative ? (
              <>
                <dt className="eyebrow pt-0.5">Alternative</dt>
                <dd>{block.alternative}</dd>
              </>
            ) : null}
            <dt className="eyebrow pt-0.5">Tradeoff</dt>
            <dd>{block.tradeoff}</dd>
          </dl>
        </div>
      );
    case "pending":
      return (
        <p className="flex gap-2.5 rounded-md border border-dashed border-pending/40 bg-pending/[0.04] p-3 text-[13.5px]">
          <CircleDashed className="mt-0.5 size-4 shrink-0 text-pending" aria-hidden />
          <span>
            <span className="mr-1 font-mono text-[10.5px] uppercase tracking-wider text-pending">Pending</span>
            {block.text}
          </span>
        </p>
      );
  }
}

function LinksSection({ project }: { project: Project }) {
  const items: { label: string; href: string }[] = [];
  if (hasLiveUrl(project.liveUrl)) items.push({ label: "Live app", href: project.liveUrl });
  if (hasValidRepoUrl(project.repoUrl)) items.push({ label: "Repository", href: project.repoUrl });
  for (const l of project.extraLinks ?? []) items.push(l);

  return (
    <div className="space-y-4">
      {items.length ? (
        <ul className="space-y-2">
          {items.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline-offset-4 hover:underline"
              >
                {l.label}
              </a>
              <span className="ml-2 break-all font-mono text-[11px] text-muted-foreground">
                {l.href.replace(/^https?:\/\//, "")}
              </span>
            </li>
          ))}
        </ul>
      ) : null}
      {project.caseStudy.links?.map((b, i) => <BlockView key={i} block={b} />)}
      {!items.length && !project.caseStudy.links?.length ? (
        <BlockView block={{ type: "pending", text: "No public repository, demo, or report is linked yet." }} />
      ) : null}
    </div>
  );
}

const DOT: Record<"done" | "partial" | "pending", string> = {
  done: "bg-foreground/80",
  partial: "bg-pending/70",
  pending: "border border-muted-foreground/50",
};

const STATE_LABEL = { done: "documented", partial: "partly documented", pending: "pending" } as const;

/** Shows at a glance which template sections have evidence behind them. */
export function CoverageStrip({ project }: { project: Project }) {
  const coverage = sectionCoverage(project);
  return (
    <div className="space-y-2">
      <p className="eyebrow">Documentation coverage</p>
      <ol className="flex flex-wrap gap-1.5">
        {coverage.map(({ key, state }) => (
          <li key={key}>
            <a
              href={`#${key}`}
              className="flex items-center gap-1.5 rounded border border-border px-1.5 py-1 font-mono text-[10.5px] text-muted-foreground hover:text-foreground"
              title={`${SECTION_TITLES[key]}: ${STATE_LABEL[state]}`}
            >
              <span className={cn("size-2 rounded-full", DOT[state])} aria-hidden />
              {SECTION_NUMBERS[key]}
              <span className="sr-only">
                {SECTION_TITLES[key]}: {STATE_LABEL[state]}
              </span>
            </a>
          </li>
        ))}
      </ol>
      <p className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1.5"><span className={cn("size-2 rounded-full", DOT.done)} aria-hidden />documented</span>
        <span className="flex items-center gap-1.5"><span className={cn("size-2 rounded-full", DOT.partial)} aria-hidden />partly measured</span>
        <span className="flex items-center gap-1.5"><span className={cn("size-2 rounded-full", DOT.pending)} aria-hidden />pending</span>
      </p>
    </div>
  );
}

export function CaseStudyToc() {
  return (
    <nav aria-label="Case study sections" className="space-y-2">
      <p className="eyebrow">Sections</p>
      <ol className="space-y-1 text-[13px]">
        {SECTION_ORDER.map((key) => (
          <li key={key}>
            <a href={`#${key}`} className="flex gap-2 text-muted-foreground hover:text-foreground">
              <span className="w-7 shrink-0 font-mono text-[11px] leading-5">{SECTION_NUMBERS[key]}</span>
              {SECTION_TITLES[key]}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Renders all template sections in order. Empty sections say so instead of disappearing. */
export function CaseStudy({ project }: { project: Project }) {
  return (
    <div className="space-y-12">
      {SECTION_ORDER.map((key: SectionKey) => {
        const blocks = project.caseStudy[key];
        return (
          <section key={key} id={key} className="scroll-mt-24 space-y-4">
            <h2 className="flex items-baseline gap-3 text-lg font-semibold tracking-tight">
              <span className="font-mono text-xs font-normal text-muted-foreground">
                {SECTION_NUMBERS[key]}
              </span>
              {SECTION_TITLES[key]}
            </h2>
            <div className="prose-body space-y-4">
              {key === "links" ? (
                <LinksSection project={project} />
              ) : blocks?.length ? (
                blocks.map((b, i) => <BlockView key={i} block={b} />)
              ) : (
                <BlockView block={{ type: "pending", text: "This section has not been written up yet." }} />
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}
