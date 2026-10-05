import Link from "next/link";

import { capabilities } from "@/lib/capabilities";
import { getProjectsForCapabilityDetail } from "@/lib/projects";

/** Capability areas, each tied to the projects that evidence it (outcomes before tools). */
export function CapabilitiesSection({ headingLevel = "h2" }: { headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <section className="space-y-6" aria-labelledby="capabilities">
      <div className="max-w-2xl space-y-2">
        <p className="eyebrow">Capabilities</p>
        <Heading id="capabilities" className="text-2xl font-semibold tracking-tight">
          What I can build, and where it shows
        </Heading>
      </div>
      <ul className="grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((cap) => {
          const Icon = cap.icon;
          const usedIn = getProjectsForCapabilityDetail(cap.id);
          return (
            <li key={cap.id} className="surface space-y-3 p-5">
              <div className="flex items-center gap-2.5">
                <Icon className="size-4 text-primary" aria-hidden />
                <h3 className="text-sm font-semibold">{cap.title}</h3>
              </div>
              <p className="text-[13px] leading-relaxed text-foreground/80">{cap.skills.join(" · ")}</p>
              {usedIn.length ? (
                <p className="text-[12px] leading-relaxed text-muted-foreground">
                  <span className="font-mono uppercase tracking-wider">Evidence: </span>
                  {usedIn.map(({ project }, i) => (
                    <span key={project.slug}>
                      {i > 0 ? ", " : null}
                      <Link href={`/projects/${project.slug}`} className="underline-offset-4 hover:text-foreground hover:underline">
                        {project.name}
                      </Link>
                    </span>
                  ))}
                </p>
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
