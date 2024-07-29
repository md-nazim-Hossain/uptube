"use client";

import React from "react";
import { Typography } from "../ui/typography";
import { useFetch } from "@/utils/reactQuery";
import { apiRoutes } from "@/utils/routes";
import { IAPIResponse, IVideo } from "@/types";
import ShortsSlider from "../slider/shorts-slider";
import { ShortCardSkeletons } from "../skeletons/short-card-skeleton";
function Shorts() {
  const { data, isLoading } = useFetch<IAPIResponse<{ data: IVideo[] }>>(
    apiRoutes.videos.getAllContentByType + "?type=short",
  );
  if (isLoading)
    return (
      <ShortCardSkeletons
        size={6}
        className="flex gap-3 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6"
      />
    );
  const shortVideos = data?.data?.data || [];
  if (!shortVideos.length) return null;
  return (
    <>
      <Typography variant={"h3"}>Shorts</Typography>
      <ShortsSlider shorts={shortVideos?.slice(0, 10)} />
    </>
  );
}

export default Shorts;
