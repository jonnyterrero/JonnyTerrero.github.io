import type { Metadata } from "next";

import { DivisionGrid } from "@/components/division-index";
import { DIVISION_ORDER } from "@/lib/projects";

export const metadata: Metadata = {
  title: "All work",
  description: "Products, engineering projects, research, and personal tooling.",
  alternates: { canonical: "/work/" },
};

export default function WorkPage() {
  return (
    <div className="space-y-16">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">All work</h1>
      {DIVISION_ORDER.map((d) => (
        <DivisionGrid key={d} division={d} />
      ))}
    </div>
  );
}
