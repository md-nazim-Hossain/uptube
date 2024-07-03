"use client";
import { IAPIResponse, IVideo } from "@/types";
import React from "react";
import SingleVideoCard from "./single-video-card";
import { cn } from "@/lib/utils";
import { useFetch, useLoadMore } from "@/utils/reactQuery";
import { apiRoutes } from "@/utils/routes";
import { VideoCardSkeletons } from "./skeletons/video-card-skeleton";

type Props = {
  isFeed?: boolean;
  className?: string;
};
function Videos({ isFeed, className }: Props) {
  const { data, isLoading } = useFetch<IAPIResponse<{ data: IVideo[] }>>(
    apiRoutes.videos.getAllContentByType,
  );
  if (isLoading) return <VideoCardSkeletons size={8} />;
  const videos = data?.data?.data || [];
  const sliceVideos = isFeed ? videos : videos?.slice(0, 8);
  return (
    <div
      className={cn(
        "py-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        className,
      )}
    >
      {sliceVideos.map((video: IVideo, index) => (
        <SingleVideoCard key={index} {...video} />
      ))}
    </div>
  );
}

export default Videos;
