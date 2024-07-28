"use client";

import EmptyState from "@/components/empty-state";
import { ColumnViewVideoCardSkeletons } from "@/components/skeletons/video-card-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { Typography } from "@/components/ui/typography";
import ColumnViewVideoCard from "@/components/videos/column-view-video-card";
import { IAPIResponse, IUserFavoriteVideo } from "@/types";
import { useFetch } from "@/utils/reactQuery";
import { apiRoutes } from "@/utils/routes";
import React from "react";

function LikeVideos() {
  const { data, isLoading } = useFetch<IAPIResponse<IUserFavoriteVideo[]>>(
    apiRoutes.likes.getUserLikeVideos,
  );
  if (isLoading)
    return (
      <div className="space-y-10 py-5 max-w-4xl mx-auto">
        <Skeleton className="w-[300px] h-5" />
        <ColumnViewVideoCardSkeletons showDescriptions={false} />
      </div>
    );
  const likeVideos = data?.data || [];
  if (!likeVideos || !likeVideos.length)
    return <EmptyState text="No like videos" />;
  return (
    <div className="space-y-10 py-5 max-w-4xl mx-auto">
      <Typography variant={"h2"}>Like Videos</Typography>
      <div className="space-y-5">
        {likeVideos.map((like: IUserFavoriteVideo, index: number) => (
          <ColumnViewVideoCard
            className="hover:bg-primary/10 p-1.5"
            playerClassName="xs:max-w-[246px]"
            video={like.video}
            showDescriptions={false}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

export default LikeVideos;
