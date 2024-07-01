"use client";

import React from "react";
import DiscoverSlider from "../slider/discover-slider";
import { Typography } from "../ui/typography";
import { useFetch } from "@/utils/reactQuery";
import { apiRoutes } from "@/utils/routes";
import { IAPIResponse, IVideo } from "@/types";
function DiscoverFavorites() {
  const { data } = useFetch<IAPIResponse<IVideo[]>>(apiRoutes.users.likeVideos);
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
