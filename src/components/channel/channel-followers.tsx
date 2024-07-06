"use client";
import { IAPIResponse, IFollower } from "@/types";
import { useFetch } from "@/utils/reactQuery";
import { apiRoutes } from "@/utils/routes";
import React from "react";
import EmptyState from "../empty-state";
import Follower from "../follower";
import FollowerSkeleton from "../skeletons/follower-skeleton";

function ChannelFollowers() {
  const { data, isLoading } = useFetch<IAPIResponse<IFollower[]>>(
    apiRoutes.users.getAllChannelFollower,
  );

  if (isLoading)
    return (
      <div className="py-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {[...Array(5)].map((key) => (
          <FollowerSkeleton key={key} />
        ))}
      </div>
    );
  const followers = data?.data || [];
  if (!followers.length) return <EmptyState text={"No followers found"} />;
  return (
    <div className="py-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {followers.map((follower: IFollower, index) => (
        <Follower
          key={index}
          avatar={follower?.subscriber?.avatar}
          username={follower?.subscriber?.username}
          fullName={follower?.subscriber?.fullName}
          isFollow={follower?.subscriber?.isSubscribed}
          revalidateQueryKey={apiRoutes.users.getAllChannelFollower}
          channelId={follower?.subscriber?._id}
        />
      ))}
    </div>
  );
}

export default ChannelFollowers;
