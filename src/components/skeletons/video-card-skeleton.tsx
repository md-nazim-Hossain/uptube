"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { Skeleton } from "../ui/skeleton";

export function VideoCardSkeleton() {
  return (
    <div className="w-full space-y-2">
      <Skeleton className="w-full aspect-video rounded-2xl" />
      <div className="flex gap-3">
        <Skeleton className="size-9 rounded-full" />
        <div className="flex-1 space-y-1.5">
          <Skeleton className="w-11/12 h-4" />
          <Skeleton className="w-1/2 h-3" />
          <div className="flex gap-1">
            <Skeleton className="w-10 h-2" />
            <Skeleton className="w-3 h-2" />
            <Skeleton className="w-10 h-2" />
          </div>
        </div>
      </div>
    </div>
  );
}

type Props = {
  className?: string;
  size?: number;
};
export function VideoCardSkeletons({ className, size = 4 }: Props) {
  return (
    <div
      className={cn(
        "container py-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        className,
      )}
    >
      {Array.from({ length: size }, (_, i) => (
        <VideoCardSkeleton key={i} />
      ))}
    </div>
  );
}
