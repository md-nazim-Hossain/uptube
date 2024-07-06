"use client";
import React from "react";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  avatarClassName?: string;
};
function FollowerSkeleton({ className, avatarClassName }: Props) {
  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <Skeleton
        className={cn(
          "size-[230px] md:size-[240px] rounded-full flex-shrink-0",
          avatarClassName,
        )}
      />
      <div className="flex flex-col gap-1.5 items-center">
        <Skeleton className={cn("w-20 h-4")} />
        <Skeleton className={cn("w-24 h-4")} />
      </div>
    </div>
  );
}

export default FollowerSkeleton;
