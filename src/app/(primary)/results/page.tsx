"use client";

import EmptyState from "@/components/empty-state";
import { VideoCardSkeletons } from "@/components/skeletons/video-card-skeleton";
import ShortsSlider from "@/components/slider/shorts-slider";
import { Typography } from "@/components/ui/typography";
import SingleVideoCard from "@/components/videos/single-video-card";
import { IAPIResponse, IVideo } from "@/types";
import { useFetch } from "@/utils/reactQuery";
import { apiRoutes } from "@/utils/routes";
import { useSearchParams } from "next/navigation";
import React from "react";

function SearchResultsPage() {
  const query = useSearchParams();
  const searchQuery = query.get("search_query");
  const { data, isLoading } = useFetch<IAPIResponse<IVideo[]>>(
    apiRoutes.videos.getAllSearchContent + `?search_query=${searchQuery}`,
  );
  if (isLoading) return <VideoCardSkeletons className="container" size={8} />;
  if (!data || !data.data || data.data.length === 0)
    return <EmptyState text={"No search videos found"} />;
  const shorts = data?.data?.filter((video: IVideo) => video.type === "short");
  const videos = data?.data?.filter((video: IVideo) => video.type === "video");
  return (
    <div className="container">
      <div className="py-5 grid gap-3 md:gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {videos?.map((video: IVideo, index) => (
          <SingleVideoCard key={index} {...video} />
        ))}
      </div>
      <>
        <Typography variant={"h3"}>Shorts</Typography>
        <ShortsSlider shorts={shorts} />
      </>
    </div>
  );
}

export default SearchResultsPage;
