import type { Metadata } from "next";

import { DivisionPage } from "@/components/division-index";
import { DIVISIONS } from "@/lib/projects";

export const metadata: Metadata = {
  title: "HeartWire",
  description: DIVISIONS.product.blurb,
  alternates: { canonical: "/heartwire/" },
};

export default function Page() {
  return <DivisionPage division="product" />;
}
