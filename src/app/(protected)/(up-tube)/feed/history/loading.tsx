import { ColumnViewVideoCardSkeletons } from "@/components/skeletons/video-card-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function loading() {
  return (
    <div className="space-y-10 py-5 max-w-4xl mx-auto">
      <Skeleton className="w-[300px] h-5" />
      <ColumnViewVideoCardSkeletons />
    </div>
  );
}

export default loading;
