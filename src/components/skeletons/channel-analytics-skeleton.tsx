"use client";

import React from "react";
import { Skeleton } from "../ui/skeleton";

function ChannelAnalyticsSkeleton() {
  return (
    <div className="border p-5 rounded-2xl h-max space-y-3">
      <div className="space-y-3 pb-10 border-b">
        <Skeleton className="w-[60%] h-5" />
        <Skeleton className="w-1/2 h-4" />
        <Skeleton className="size-7 rounded-full" />
      </div>
      <div className="space-y-3 pb-10 border-b">
        <Skeleton className="w-[60%] h-5" />
        <Skeleton className="w-1/2 h-4" />
        <Skeleton className="w-1/2 h-4" />
        <Skeleton className="w-1/4 h-4" />
      </div>
      <div className="space-y-3">
        <Skeleton className="w-[60%] h-4" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
      </div>
    </div>
  );
}

export default ChannelAnalyticsSkeleton;
