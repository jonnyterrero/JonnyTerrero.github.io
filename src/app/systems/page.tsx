import type { Metadata } from "next";

import { DivisionPage } from "@/components/division-index";
import { DIVISIONS } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Systems",
  description: DIVISIONS.systems.blurb,
  alternates: { canonical: "/systems/" },
};

export default function Page() {
  return <DivisionPage division="systems" />;
}
