"use client";
import {
  ShortCardSkeleton,
  ShortCardSkeletons,
} from "@/components/skeletons/short-card-skeleton";
import ShortVideo from "@/components/videos/short-video";
import { IAPIResponse, IVideo } from "@/types";
import { useFetch } from "@/utils/reactQuery";
import { apiRoutes } from "@/utils/routes";
import React from "react";

function ShortsVideoPage() {
  const { data, isLoading } = useFetch<IAPIResponse<IVideo[]>>(
    apiRoutes.videos.getAllShorts,
  );
  if (isLoading)
    return (
      <div className="flex flex-col gap-5 items-center w-full pb-10">
        <ShortCardSkeleton />
      </div>
    );
  const shorts = data?.data || [];
  return (
    <section className="flex flex-col gap-5 items-center w-full pb-10">
      {shorts.map((short: IVideo, index: number) => (
        <ShortVideo key={index} {...short} />
      ))}
    </section>
  );
}

export default ShortsVideoPage;
