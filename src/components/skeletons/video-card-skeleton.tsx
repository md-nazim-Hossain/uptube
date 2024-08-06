"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { Skeleton } from "../ui/skeleton";

type SkeletonProps = {
  className?: string;
  showAvatar?: boolean;
  showDescriptions?: boolean;
  playerClassName?: string;
};
export function VideoCardSkeleton({
  className,
  showAvatar = true,
  showDescriptions,
  playerClassName,
}: SkeletonProps) {
  return (
    <div className={cn("w-full ", className)}>
      <Skeleton
        className={cn("w-full aspect-video rounded-2xl", playerClassName)}
      />
      <div className="flex-1 flex justify-between gap-5">
        <div className="flex justify-between gap-3 pt-2">
          {showAvatar && <Skeleton className="size-9 rounded-full" />}
          <div className="flex-1 space-y-1.5">
            <Skeleton className={cn("h-4", !showAvatar ? "w-40" : "w-11/12")} />
            <Skeleton className="w-1/2 h-3" />
            <div className="flex gap-1">
              <Skeleton className="w-10 h-2" />
              <Skeleton className="w-3 h-2" />
              <Skeleton className="w-10 h-2" />
            </div>
            {showDescriptions && (
              <div>
                <Skeleton className="w-10/12 h-4 xs:h-6 mt-3 xs:mt-5" />
              </div>
            )}
          </div>
        </div>
        <div>
          <Skeleton className="w-1 h-5 mt-2" />
        </div>
      </div>
    </div>
  );
}

type Props = {
  className?: string;
  size?: number;
  showDescriptions?: boolean;
};
export function VideoCardSkeletons({ className, size = 4 }: Props) {
  return (
    <div
      className={cn(
        "py-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5",
        className,
      )}
    >
      {Array.from({ length: size }, (_, i) => (
        <VideoCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ColumnViewVideoCardSkeletons({
  className,
  size = 4,
  showDescriptions = true,
}: Props) {
  return (
    <div className={cn("space-y-5 w-full", className)}>
      {Array.from({ length: size }, (_, i) => (
        <VideoCardSkeleton
          showDescriptions={showDescriptions}
          showAvatar={false}
          className="gap-2 flex flex-col xs:flex-row"
          playerClassName="xs:max-w-[250px]"
          key={i}
        />
      ))}
    </div>
  );
}
