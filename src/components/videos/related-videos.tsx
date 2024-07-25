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
  const { data, isLoading } = useFetch<IAPIResponse<{ data: IVideo[] }>>(
    apiRoutes.videos.getAllContentByType,
  );
  if (isLoading) return <ColumnViewVideoCardSkeletons />;
  const videos = data?.data?.data || [];
  const sliceVideos = videos?.slice(0, 8);
  return (
    <div className="w-full lg:max-w-sm space-y-5">
      {sliceVideos.map((video: IVideo, index) => {
        if (video?._id === currentVideoId) return null;
        return <ColumnViewVideoCard video={video} key={index} />;
      })}
    </div>
  );
}

export default RelatedVideos;
