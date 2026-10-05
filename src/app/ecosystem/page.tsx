import type { Metadata } from "next";
import Link from "next/link";

/** Legacy route kept so old links don't break. Static export can't send a 301, so this refreshes. */
export const metadata: Metadata = {
  title: "Moved",
  robots: { index: false },
  alternates: { canonical: "/work/" },
};

export default function EcosystemRedirect() {
  return (
    <>
      <meta httpEquiv="refresh" content="0; url=/work/" />
      <p className="text-sm text-muted-foreground">
        This page moved to <Link href="/work" className="text-primary hover:underline">All work</Link>.
      </p>
    </>
  );
}
