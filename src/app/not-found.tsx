import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="space-y-6 py-16">
      <p className="eyebrow">404</p>
      <h1 className="text-2xl font-semibold tracking-tight">Page not found</h1>
      <p className="text-sm text-muted-foreground">That page doesn’t exist, or it moved during the site restructure.</p>
      <div className="flex gap-2">
        <Button asChild>
          <Link href="/work">All work</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/">Home</Link>
        </Button>
      </div>
    </div>
  );
}
