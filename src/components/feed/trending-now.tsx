import { useFetch } from "@/utils/reactQuery";
import { apiRoutes } from "@/utils/routes";
import React from "react";
import { ColumnViewVideoCardSkeletons } from "../skeletons/video-card-skeleton";
import { IAPIResponse, IVideo } from "@/types";
import EmptyState from "../empty-state";
import ColumnViewVideoCard from "../videos/column-view-video-card";

function TrendingNow() {
  const { data, isLoading } = useFetch<IAPIResponse<IVideo[]>>(
    apiRoutes.videos.trending,
  );
  if (isLoading) return <ColumnViewVideoCardSkeletons />;
  const trendingNow = data?.data || [];
  if (!trendingNow.length) return <EmptyState text="No trending now content" />;
  return (
    <div className="space-y-3 md:space-y-5">
      {trendingNow.map((history: IVideo, index: number) => (
        <ColumnViewVideoCard
          playerClassName="xs:max-w-[246px]"
          video={history}
          key={index}
        />
      ))}
    </div>
  );
}

export default TrendingNow;
