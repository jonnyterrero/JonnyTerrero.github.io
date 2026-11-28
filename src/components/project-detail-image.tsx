"use client";

import Image from "next/image";
import { Maximize2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  className?: string;
  /** Preserve the image's natural aspect ratio instead of the 4:3 default. */
  naturalAspect?: boolean;
};

export function ProjectDetailImage({ src, alt, className, naturalAspect = false }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className={cn(
            "group relative w-full max-w-md overflow-hidden rounded-lg border border-primary/20 bg-muted/30 text-left shadow-sm transition hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            className
          )}
        >
          <span className={cn("block w-full", naturalAspect ? "" : "aspect-[4/3]")}>
            <Image
              src={src}
              alt={alt}
              width={1200}
              height={900}
              className={cn("w-full object-contain object-center p-2", naturalAspect ? "h-auto" : "h-full")}
              sizes="(min-width: 1024px) 560px, 100vw"
            />
          </span>
          <span className="absolute bottom-2 right-2 flex items-center gap-1 rounded-md border border-primary/20 bg-card/90 px-2 py-1 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur-sm">
            <Maximize2 className="size-3" aria-hidden />
            Enlarge
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[min(90vh,900px)] max-w-[min(100vw-1.5rem,56rem)] gap-0 overflow-hidden border-primary/20 p-0 sm:max-w-4xl">
        <DialogTitle className="sr-only">{alt}</DialogTitle>
        <DialogDescription className="sr-only">
          Enlarged image. Press Escape or use the close control to dismiss.
        </DialogDescription>
        <div className="relative max-h-[min(90vh,900px)] w-full bg-muted/20">
          <Image
            src={src}
            alt=""
            width={1200}
            height={900}
            className="h-auto max-h-[min(90vh,900px)] w-full object-contain"
            priority
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
