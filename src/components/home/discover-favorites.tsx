"use client";

import React from "react";
import DiscoverSlider from "../slider/discover-slider";
import { Typography } from "../ui/typography";
import { useFetch } from "@/utils/reactQuery";
import { apiRoutes } from "@/utils/routes";
import { IAPIResponse, IUserFavoriteVideo, IVideo } from "@/types";
import { Skeleton } from "../ui/skeleton";
function DiscoverFavorites() {
  const { data, isLoading } = useFetch<IAPIResponse<IUserFavoriteVideo[]>>(
    apiRoutes.likes.getUserLikeVideos,
  );
  if (isLoading)
    return (
      <div className="flex-1 space-y-5 pb-5">
        <Skeleton className="w-1/4 h-6" />
        <Skeleton className="w-full h-[600px]" />
      </div>
    );
  const favoriteVideos = data?.data || [];
  if (!favoriteVideos.length) return null;
  console.log(favoriteVideos);
  return (
    <>
      <Typography variant={"h3"}>Discover your favorites</Typography>
      <DiscoverSlider favorites={favoriteVideos.slice(0, 10)} />
    </>
  );
}

export default DiscoverFavorites;
