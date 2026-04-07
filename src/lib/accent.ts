import type { AccentColor } from "@/lib/projects";

/** Border / accent utilities driven by projects.json `accentColor`. */
export function accentBorderClass(accent: AccentColor): string {
  const map: Record<AccentColor, string> = {
    amber: "border-l-amber-500/70",
    blue: "border-l-sky-500/70",
    green: "border-l-emerald-500/70",
    teal: "border-l-teal-500/70",
  };
  return map[accent];
}

export function accentDotClass(accent: AccentColor): string {
  const map: Record<AccentColor, string> = {
    amber: "bg-amber-500",
    blue: "bg-sky-500",
    green: "bg-emerald-500",
    teal: "bg-teal-500",
  };
  return map[accent];
}
