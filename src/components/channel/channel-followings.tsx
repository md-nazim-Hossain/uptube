"use client";
import { IAPIResponse, IFollowing } from "@/types";
import { useFetch } from "@/utils/reactQuery";
import { apiRoutes } from "@/utils/routes";
import React from "react";
import EmptyState from "../empty-state";
import Follower from "../follower";

function ChannelFollowings() {
  const { data, isLoading } = useFetch<IAPIResponse<IFollowing[]>>(
    apiRoutes.follows.getAllFollowingChannel,
  );

  if (isLoading) return <div>Loading...</div>;
  const followingChannel = data?.data || [];
  if (!followingChannel.length)
    return <EmptyState text={"No followers found"} />;
  return (
    <div>
      {followingChannel.map((follower: IFollowing, index) => (
        <Follower
          key={index}
          avatar={follower?.channel?.avatar}
          username={follower?.channel?.username}
          fullName={follower?.channel?.fullName}
          isFollow={follower?.channel?.isSubscribed}
        />
      ))}
    </div>
  );
}

export default ChannelFollowings;
