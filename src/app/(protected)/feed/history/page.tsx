"use client";

import EmptyState from "@/components/empty-state";
import { ColumnViewVideoCardSkeletons } from "@/components/skeletons/video-card-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { Typography } from "@/components/ui/typography";
import ColumnViewVideoCard from "@/components/videos/column-view-video-card";
import { IAPIResponse, IVideo } from "@/types";
import { useFetch } from "@/utils/reactQuery";
import { apiRoutes } from "@/utils/routes";
import React from "react";

function WatchHistory() {
  const { data, isLoading } = useFetch<IAPIResponse<IVideo[]>>(
    apiRoutes.users.watchHistory,
  );
  if (isLoading)
    return (
      <div className="space-y-10 py-5 max-w-4xl mx-auto">
        <Skeleton className="w-[300px] h-5" />
        <ColumnViewVideoCardSkeletons className="md:max-w-md !lg:max-w-[350px]" />
      </div>
    );
  const watchHistory = data?.data || [];
  if (!watchHistory || !watchHistory.length)
    return <EmptyState text="No watch history" />;
  return (
    <div className="space-y-10 py-5 max-w-4xl mx-auto">
      <Typography variant={"h2"}>Watch history</Typography>
      <div className="space-y-5">
        {watchHistory.map((history: IVideo, index: number) => (
          <ColumnViewVideoCard
            playerClassName="sm:max-w-md lg:max-w-[246px]"
            isWatchedVideo
            video={history}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

export default WatchHistory;
