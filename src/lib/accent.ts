import type { AccentColor } from "@/lib/projects";

/** Left rail accent — pastel, not neon */
export function accentBorderClass(accent: AccentColor): string {
  const map: Record<AccentColor, string> = {
    amber: "border-l-[3px] border-l-amber-400/45",
    blue: "border-l-[3px] border-l-sky-400/45",
    green: "border-l-[3px] border-l-emerald-400/45",
    teal: "border-l-[3px] border-l-teal-400/45",
    violet: "border-l-[3px] border-l-violet-400/45",
  };
  return map[accent];
}

/** Soft hover glow per project accent */
export function accentCardGlowClass(accent: AccentColor): string {
  const map: Record<AccentColor, string> = {
    amber:
      "group-hover:shadow-[0_0_28px_-6px_rgba(251,191,36,0.18)] group-hover:border-amber-400/20",
    blue: "group-hover:shadow-[0_0_28px_-6px_rgba(56,189,248,0.18)] group-hover:border-sky-400/20",
    green:
      "group-hover:shadow-[0_0_28px_-6px_rgba(52,211,153,0.18)] group-hover:border-emerald-400/20",
    teal: "group-hover:shadow-[0_0_28px_-6px_rgba(45,212,191,0.18)] group-hover:border-teal-400/20",
    violet:
      "group-hover:shadow-[0_0_28px_-6px_rgba(167,139,250,0.2)] group-hover:border-violet-400/20",
  };
  return map[accent];
}

export function accentDotClass(accent: AccentColor): string {
  const map: Record<AccentColor, string> = {
    amber: "bg-amber-400/85 shadow-[0_0_12px_rgba(251,191,36,0.35)]",
    blue: "bg-sky-400/85 shadow-[0_0_12px_rgba(56,189,248,0.35)]",
    green: "bg-emerald-400/85 shadow-[0_0_12px_rgba(52,211,153,0.35)]",
    teal: "bg-teal-400/85 shadow-[0_0_12px_rgba(45,212,191,0.35)]",
    violet: "bg-violet-400/85 shadow-[0_0_12px_rgba(167,139,250,0.4)]",
  };
  return map[accent];
}

/** Stack technology chips — tinted outline per project */
export function accentChipClass(accent: AccentColor): string {
  const map: Record<AccentColor, string> = {
    amber:
      "border-amber-400/25 bg-amber-500/[0.07] text-amber-100/90 font-mono text-[10px]",
    blue: "border-sky-400/25 bg-sky-500/[0.07] text-sky-100/90 font-mono text-[10px]",
    green:
      "border-emerald-400/25 bg-emerald-500/[0.07] text-emerald-100/90 font-mono text-[10px]",
    teal: "border-teal-400/25 bg-teal-500/[0.07] text-teal-100/90 font-mono text-[10px]",
    violet:
      "border-violet-400/25 bg-violet-500/[0.07] text-violet-100/90 font-mono text-[10px]",
  };
  return map[accent];
}

/** Status row on cards — low-saturation pastel tint */
export function statusBadgeClass(status: string): string {
  const s = status.toLowerCase();
  if (s.includes("active development") || s === "active")
    return "border border-amber-400/25 bg-amber-500/10 text-amber-100/95 font-normal";
  if (s.includes("prototype"))
    return "border border-violet-400/25 bg-violet-500/10 text-violet-100/95 font-normal";
  if (s.includes("concept"))
    return "border border-sky-400/20 bg-sky-500/10 text-sky-100/95 font-normal";
  if (s.includes("architecture"))
    return "border border-teal-400/25 bg-teal-500/10 text-teal-100/95 font-normal";
  return "border border-border/60 bg-muted/50 text-muted-foreground font-normal";
}
