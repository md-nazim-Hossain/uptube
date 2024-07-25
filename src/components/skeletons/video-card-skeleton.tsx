"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { Skeleton } from "../ui/skeleton";

type SkeletonProps = {
  className?: string;
  showAvatar?: boolean;
};
export function VideoCardSkeleton({
  className,
  showAvatar = true,
}: SkeletonProps) {
  return (
    <div className={cn("w-full space-y-2", className)}>
      <Skeleton className="w-full aspect-video rounded-2xl" />
      <div className="flex justify-between gap-3">
        {showAvatar && <Skeleton className="size-9 rounded-full" />}
        <div className="flex-1 space-y-1.5">
          <Skeleton className={cn("h-4", !showAvatar ? "w-full" : "w-11/12")} />
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
        "py-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        className,
      )}
    >
      {Array.from({ length: size }, (_, i) => (
        <VideoCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ColumnViewVideoCardSkeletons({ className, size = 4 }: Props) {
  return (
    <div className={cn("space-y-5 w-full md:max-w-md lg:max-w-sm", className)}>
      {Array.from({ length: size }, (_, i) => (
        <VideoCardSkeleton
          showAvatar={false}
          className="flex gap-5 space-y-0 flex-col sm:flex-row"
          key={i}
        />
      ))}
    </div>
  );
}
