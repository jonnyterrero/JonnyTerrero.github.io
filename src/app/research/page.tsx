import type { Metadata } from "next";

import { DivisionPage } from "@/components/division-index";
import { DIVISIONS } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Research",
  description: DIVISIONS.research.blurb,
  alternates: { canonical: "/research/" },
};

export default function Page() {
  return <DivisionPage division="research" />;
}
