import React from "react";
import { Skeleton } from "../ui/skeleton";
import { ColumnViewVideoCardSkeletons } from "./video-card-skeleton";
import CommentsSkeleton from "./comments-skeleton";

function WatchPageSkeletons() {
  return (
    <div className="container">
      <Skeleton className="w-full h-[300px] sm:h-[400px] lg:h-[500px]" />
      <div className="py-5 flex flex-col lg:flex-row justify-between gap-10">
        <div className="flex-1 space-y-5">
          <Skeleton className="w-1/4 h-6" />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="flex gap-3 items-center">
              <Skeleton className="size-9 rounded-full" />
              <div className="flex-1 space-y-1">
                <Skeleton className="w-24 h-4" />
                <Skeleton className="w-20 h-4" />
              </div>
              <Skeleton className="ml-20 w-24 h-9 rounded-[100vw]" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="w-12 h-3" />
              <Skeleton className="w-12 h-3" />
              <Skeleton className="w-12 h-3" />
            </div>
          </div>
          <Skeleton className="w-full h-12" />

          <CommentsSkeleton />
        </div>
        <ColumnViewVideoCardSkeletons className="w-full lg:max-w-sm" />
      </div>
    </div>
  );
}

export default WatchPageSkeletons;
