"use client";
import ChannelAnalyticsSkeleton from "@/components/skeletons/channel-analytics-skeleton";
import { Typography } from "@/components/ui/typography";
import { IAPIResponse, IChannelAnalytics } from "@/types";
import { useFetch } from "@/utils/reactQuery";
import { apiRoutes } from "@/utils/routes";
import { viewsFormat } from "@/utils/video";
import React from "react";

function ChannelAnalytics() {
  const { data, isLoading } = useFetch<IAPIResponse<IChannelAnalytics>>(
    apiRoutes.users.getChannelAnalytics,
  );
  if (isLoading) return <ChannelAnalyticsSkeleton />;
  const analytics = data?.data;
  return (
    <div className="border p-3 xs:p-5 h-max rounded-2xl space-y-3">
      <div className="space-y-3 pb-10 border-b">
        <Typography variant={"h5"}>Channel Analytics</Typography>
        <div>
          <Typography variant={"xsmall"}>Current Subscribers</Typography>
          <Typography variant={"h3"}>
            {viewsFormat(analytics?.subscribers ?? 0)}
          </Typography>
        </div>
      </div>
      <div className="pb-5 border-b space-y-3">
        <Typography variant={"p"}>Summary</Typography>
        <div className="flex justify-between items-center">
          <Typography variant={"xsmall"}>Views</Typography>
          <Typography variant={"xsmall"}>
            {viewsFormat(analytics?.totalViews ?? 0)}
          </Typography>
        </div>
        <div className="flex justify-between items-center">
          <Typography variant={"xsmall"}>Likes</Typography>
          <Typography variant={"xsmall"}>
            {viewsFormat(analytics?.totalLikes ?? 0)}
          </Typography>
        </div>
        <div className="flex justify-between items-center">
          <Typography variant={"xsmall"}>Comments</Typography>
          <Typography variant={"xsmall"}>
            {viewsFormat(analytics?.totalComments ?? 0)}
          </Typography>
        </div>
      </div>

      <div className="space-y-3">
        <Typography>Top Video</Typography>
        <div className="grid grid-cols-4 gap-2">
          <Typography variant={"small"}>Title</Typography>
          <Typography variant={"small"}>Likes</Typography>
          <Typography variant={"small"}>Comments</Typography>
          <Typography variant={"small"}>Views</Typography>
        </div>
        <div className="grid grid-cols-4 gap-2">
          <Typography variant={"xsmall"} className="w-full truncate">
            {analytics?.topVideo?.title}
          </Typography>
          <Typography variant={"xsmall"}>
            {viewsFormat(analytics?.topVideo?.likes ?? 0)}
          </Typography>
          <Typography variant={"xsmall"}>
            {viewsFormat(analytics?.topVideo?.comments ?? 0)}
          </Typography>
          <Typography variant={"xsmall"}>
            {viewsFormat(analytics?.topVideo?.views ?? 0)}
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default ChannelAnalytics;
