import { IAPIResponse, IVideo } from "@/types";
import { useFetch } from "@/utils/reactQuery";
import { apiRoutes } from "@/utils/routes";
import React from "react";
import { ShortCardSkeletons } from "../skeletons/short-card-skeleton";
import SingleVideoCard from "../single-video-card";
import EmptyState from "../empty-state";

type Props = {
  className?: string;
  userId: string;
};
function ChannelShorts({ className, userId }: Props) {
  const { data, isLoading } = useFetch<IAPIResponse<{ data: IVideo[] }>>(
    apiRoutes.videos.getVideoByUserId + `/${userId}?type=short`,
  );
  if (isLoading)
    return (
      <ShortCardSkeletons
        size={6}
        className="flex gap-5 py-5 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6"
      />
    );
  const shortVideos = data?.data?.data || [];
  if (!shortVideos.length) return <EmptyState text={"No shorts found"} />;
  return (
    <div className="py-5 gap-5 flex flex-col sm:flex-row">
      {shortVideos.map((short, index) => {
        return (
          <SingleVideoCard
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6"
            key={index}
            {...short}
            isShort
            showAvatar={false}
          />
        );
      })}
    </div>
  );
}

export default ChannelShorts;
