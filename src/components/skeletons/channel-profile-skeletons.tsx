"use client";

import React from "react";
import { VideoCardSkeletons } from "./video-card-skeleton";
import { Skeleton } from "../ui/skeleton";

function ChannelProfileSkeleton() {
  return (
    <div className="pb-10 pt-2 space-y-5 w-full h-full">
      <div className="container space-y-5">
        <Skeleton className="w-full h-[200px] sm:h-[300px]" />
        <div className="flex items-center gap-5">
          <Skeleton className="size-32 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="w-1/5 h-5" />
            <Skeleton className="w-1/4 h-6" />
            <Skeleton className="w-1/5 h-5" />
          </div>
        </div>
      </div>
      <div>
        <div className="pb-2 border-b">
          <div className="container flex items-center gap-2">
            <Skeleton className="w-24 h-4" />
            <Skeleton className="w-24 h-4" />
            <Skeleton className="w-24 h-4" />
            <Skeleton className="w-24 h-4" />
          </div>
        </div>
        <VideoCardSkeletons className="container" size={4} />
      </div>
    </div>
  );
}

export default ChannelProfileSkeleton;
