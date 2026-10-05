import Link from "next/link";

/** Static export can't send a 301, so moved routes refresh to their new home. */
export function RedirectPage({ to, label }: { to: string; label: string }) {
  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${to}`} />
      <p className="text-sm text-muted-foreground">
        This page moved to{" "}
        <Link href={to} className="text-primary hover:underline">
          {label}
        </Link>
        .
      </p>
    </>
  );
}
