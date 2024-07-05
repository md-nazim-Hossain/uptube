"use client";

import { IAPIResponse, IUserFavoriteVideo } from "@/types";
import { useFetch } from "@/utils/reactQuery";
import { apiRoutes } from "@/utils/routes";
import React from "react";
import { VideoCardSkeletons } from "../skeletons/video-card-skeleton";
import EmptyState from "../empty-state";
import SingleVideoCard from "../single-video-card";

function ChannelUserFavoriteVideos() {
  const { data, isLoading } = useFetch<IAPIResponse<IUserFavoriteVideo[]>>(
    apiRoutes.likes.getUserLikeVideos,
  );
  if (isLoading) return <VideoCardSkeletons size={4} />;
  const favoriteVideos = data?.data || [];
  if (!favoriteVideos.length)
    return <EmptyState text={"No favorite videos found"} />;
  return (
    <div className="py-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {favoriteVideos.map((video: IUserFavoriteVideo, index) => (
        <SingleVideoCard key={index} {...video?.video} showAvatar={false} />
      ))}
    </div>
  );
}

export default ChannelUserFavoriteVideos;
