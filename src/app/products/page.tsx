import type { Metadata } from "next";

import { DivisionPage } from "@/components/division-index";
import { DIVISIONS } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Products",
  description: DIVISIONS.product.blurb,
  alternates: { canonical: "/products/" },
};

export default function Page() {
  return <DivisionPage division="product" />;
}
