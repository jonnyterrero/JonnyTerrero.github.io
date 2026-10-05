import type { Metadata } from "next";

import { DivisionPage } from "@/components/division-index";
import { DIVISIONS } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Engineering",
  description: DIVISIONS.engineering.blurb,
  alternates: { canonical: "/engineering/" },
};

export default function Page() {
  return <DivisionPage division="engineering" />;
}
