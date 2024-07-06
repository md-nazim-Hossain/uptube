"use client";
import { IAPIResponse, IVideo } from "@/types";
import React from "react";
import { cn } from "@/lib/utils";
import { useFetch, useLoadMore } from "@/utils/reactQuery";
import { apiRoutes } from "@/utils/routes";
import { VideoCardSkeletons } from "../skeletons/video-card-skeleton";
import EmptyState from "../empty-state";
import SingleVideoCard from "./single-video-card";

type Props = {
  isFeed?: boolean;
  className?: string;
  isChannelProfile?: boolean;
  userId?: string;
};
function Videos({
  isFeed,
  className,
  isChannelProfile = false,
  userId,
}: Props) {
  const { data, isLoading } = useFetch<IAPIResponse<{ data: IVideo[] }>>(
    isChannelProfile
      ? apiRoutes.videos.getVideoByUserId + `/${userId}`
      : apiRoutes.videos.getAllContentByType,
  );
  if (isLoading) return <VideoCardSkeletons size={isChannelProfile ? 4 : 8} />;
  const videos = data?.data?.data || [];
  const sliceVideos = isFeed ? videos : videos?.slice(0, 8);
  if (!sliceVideos.length && isChannelProfile)
    return <EmptyState text={"No videos found"} />;
  return (
    <div
      className={cn(
        "py-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        className,
      )}
    >
      {sliceVideos.map((video: IVideo, index) => (
        <SingleVideoCard
          showAvatar={!isChannelProfile}
          key={index}
          {...video}
        />
      ))}
    </div>
  );
}

export default Videos;
