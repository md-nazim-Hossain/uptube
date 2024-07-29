"use client";
import React from "react";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  size?: number;
  showTotalCommentSkeleton?: boolean;
};
function CommentsSkeleton({
  className,
  size = 3,
  showTotalCommentSkeleton = true,
}: Props) {
  return (
    <div className={cn("space-y-5", className)}>
      {showTotalCommentSkeleton && <Skeleton className="w-1/2 sm:w-1/5 h-6" />}
      <div className="space-y-5">
        {Array.from({ length: size }, (_, i) => (
          <div key={i} className="flex justify-between gap-3 ">
            <div className="flex-1 flex gap-3 items-center">
              <Skeleton className="size-9 rounded-full" />
              <div className="space-y-1 flex-1">
                <Skeleton className="w-full sm:w-1/2 md:w-1/3 h-2" />
                <Skeleton className="w-full sm:w-1/3 md:w-1/4 h-2" />
                <Skeleton className="w-1/2 sm:w-1/4 md:w-24 h-2" />
              </div>
            </div>
            <Skeleton className="w-1 h-8" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentsSkeleton;
