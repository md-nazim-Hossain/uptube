import { useFetch } from "@/utils/reactQuery";
import { apiRoutes } from "@/utils/routes";
import React from "react";
import { ColumnViewVideoCardSkeletons } from "../skeletons/video-card-skeleton";
import { IAPIResponse, IVideo } from "@/types";
import EmptyState from "../empty-state";
import ColumnViewVideoCard from "../videos/column-view-video-card";

function TrendingMusic() {
  const { data, isLoading } = useFetch<IAPIResponse<IVideo[]>>(
    apiRoutes.videos.trending + `?isMusic=true`,
  );
  if (isLoading) return <ColumnViewVideoCardSkeletons />;
  const trendingMusic = data?.data || [];
  if (!trendingMusic.length) return <EmptyState text="No trending music" />;
  return (
    <div className="space-y-5">
      {trendingMusic.map((history: IVideo, index: number) => (
        <ColumnViewVideoCard
          playerClassName="sm:max-w-md lg:max-w-[246px]"
          video={history}
          key={index}
        />
      ))}
    </div>
  );
}

export default TrendingMusic;
