import type { Metadata } from "next";

import { RedirectPage } from "@/components/redirect-page";

export const metadata: Metadata = { title: "Moved", robots: { index: false } };

export default function EcosystemRedirect() {
  return <RedirectPage to="/work/" label="All work" />;
}
