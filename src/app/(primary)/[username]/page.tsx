"use client";

import React from "react";
import { IAPIResponse, IChannelProfile } from "@/types";
import ChannelProfile from "@/components/channel/channel-profile";
import ChannelDetails from "@/components/channel/channel-details";
import ChannelNotFound from "@/components/channel/channel-not-found";
import { useFetch } from "@/utils/reactQuery";
import ChannelProfileSkeleton from "@/components/skeletons/channel-profile-skeletons";
function UserProfilePage({ params }: { params: { username: string } }) {
  const channelName = decodeURIComponent(params?.username);
  const { data, isLoading } = useFetch<IAPIResponse<IChannelProfile>>(
    `/users/${channelName}/channel-profile`,
    {},
    {
      enabled: !!channelName && channelName.startsWith("@"),
      queryKey: ["/users/" + channelName + "/channel-profile", undefined],
    },
  );

  if (isLoading) return <ChannelProfileSkeleton />;
  const channel = data?.data as IChannelProfile;
  if (!channel) return <ChannelNotFound />;
  return (
    <div className="pb-10 space-y-5 w-full h-full">
      <ChannelProfile channel={channel} />
      <ChannelDetails channel={channel} />
    </div>
  );
}

export default UserProfilePage;
