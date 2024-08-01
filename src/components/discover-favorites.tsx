"use client";

import React from "react";
import DiscoverSlider from "./slider/discover-slider";
import { Typography } from "./ui/typography";
import { useFetch } from "@/utils/reactQuery";
import { apiRoutes } from "@/utils/routes";
import { IAPIResponse, IUserFavoriteVideo } from "@/types";
import { Skeleton } from "./ui/skeleton";
import { useUserStore } from "@/zustand/useUserStore";
import cookie from "js-cookie";
function DiscoverFavorites() {
  const loading = useUserStore((state) => state.loading);
  const { data, isLoading } = useFetch<IAPIResponse<IUserFavoriteVideo[]>>(
    apiRoutes.likes.getUserLikeVideos + "?type=video",
    undefined,
    {
      queryKey: [apiRoutes.likes.getUserLikeVideos, { type: "video" }],
      enabled: !!cookie.get("accessToken"),
    },
  );
  if (isLoading || loading)
    return (
      <div className="flex-1 space-y-5 pb-5">
        <Skeleton className="w-1/4 h-6" />
        <Skeleton className="w-full h-[600px]" />
      </div>
    );
  const favoriteVideos = data?.data || [];
  if (!favoriteVideos.length) return null;
  return (
    <>
      <Typography variant={"h3"}>Discover your favorites</Typography>
      <DiscoverSlider favorites={favoriteVideos.slice(0, 10)} />
    </>
  );
}

export default DiscoverFavorites;
