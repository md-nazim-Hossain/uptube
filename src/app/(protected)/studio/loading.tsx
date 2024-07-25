import ChannelAnalyticsSkeleton from "@/components/skeletons/channel-analytics-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function loading() {
  return (
    <div className="studio-container py-5 max-w-4xl">
      <div className="flex justify-between items-center gap-2">
        <Skeleton className="w-1/4 h-6" />
        <div className="flex justify-between items-center gap-5">
          <Skeleton className="size-10 rounded-full" />
          <Skeleton className="size-10 rounded-full" />
          <Skeleton className="size-10 rounded-full" />
        </div>
      </div>
      <div className="py-5 grid md:grid-cols-2 gap-5">
        <div className="w-full p-5 h-[500px] border rounded-2xl flex flex-col justify-center items-center gap-5">
          <Skeleton className="size-[152px]" />
          <Skeleton className="w-[250px] h-6" />
          <Skeleton className="w-[120px] h-10 rounded-[100vw]" />
        </div>
        <ChannelAnalyticsSkeleton />
      </div>
    </div>
  );
}

export default loading;
