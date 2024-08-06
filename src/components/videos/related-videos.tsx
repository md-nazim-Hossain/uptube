"use client";

import { IAPIResponse, IVideo } from "@/types";
import { useFetch } from "@/utils/reactQuery";
import { apiRoutes } from "@/utils/routes";
import React from "react";
import { ColumnViewVideoCardSkeletons } from "../skeletons/video-card-skeleton";
import ColumnViewVideoCard from "./column-view-video-card";

type Props = {
  currentVideoId: string;
};
function RelatedVideos({ currentVideoId }: Props) {
  const { data, isLoading } = useFetch<IAPIResponse<IVideo[]>>(
    apiRoutes.videos.getAllContentByType,
    undefined,
    {
      queryKey: [
        apiRoutes.videos.getAllContentByType,
        { isRelatedVideos: true },
      ],
      enabled: !!currentVideoId,
    },
  );
  if (isLoading)
    return (
      <ColumnViewVideoCardSkeletons
        showDescriptions={false}
        className="w-full lg:max-w-sm"
      />
    );
  const videos = data?.data || [];
  if (!videos || !videos.length) return null;
  return (
    <div className="w-full lg:max-w-sm space-y-5">
      {videos.map((video: IVideo, index) => {
        if (video?._id === currentVideoId) return null;
        return (
          <ColumnViewVideoCard
            playerClassName="xs:max-w-[160px]"
            showDescriptions={false}
            video={video}
            key={index}
          />
        );
      })}
    </div>
  );
}

export default RelatedVideos;
