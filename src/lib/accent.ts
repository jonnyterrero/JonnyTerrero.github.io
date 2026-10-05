import type { AccentColor, Status } from "@/lib/projects";

/** Product identifier dot — the only place product colour appears. */
export function accentDotClass(accent: AccentColor): string {
  const map: Record<AccentColor, string> = {
    amber: "bg-amber-400",
    blue: "bg-sky-400",
    green: "bg-emerald-400",
    teal: "bg-teal-300",
    violet: "bg-violet-400",
  };
  return map[accent];
}

/** Thin top rail on cards. */
export function accentRailClass(accent: AccentColor): string {
  const map: Record<AccentColor, string> = {
    amber: "before:bg-amber-400/70",
    blue: "before:bg-sky-400/70",
    green: "before:bg-emerald-400/70",
    teal: "before:bg-teal-300/70",
    violet: "before:bg-violet-400/70",
  };
  return map[accent];
}

/** Status is conveyed by text first; colour is secondary (a11y: not colour-only). */
export function statusBadgeClass(status: Status): string {
  switch (status) {
    case "Active development":
      return "border-sky-400/30 text-sky-200";
    case "Prototype":
      return "border-amber-400/30 text-amber-200";
    case "Completed":
      return "border-emerald-400/30 text-emerald-200";
    case "Research":
      return "border-teal-300/30 text-teal-100";
    case "Concept":
    case "Archived":
      return "border-border text-muted-foreground";
  }
}
