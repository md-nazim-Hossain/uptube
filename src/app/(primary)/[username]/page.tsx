import React from "react";

import { notFound, redirect } from "next/navigation";
import axios from "@/utils/axios";
import { IChannelProfile } from "@/types";
import ChannelProfile from "@/components/channel/channel-profile";
import ChannelDetails from "@/components/channel/channel-details";
async function UserProfilePage({ params }: { params: { username: string } }) {
  const channelName = decodeURIComponent(params?.username);
  if (!channelName || !channelName.startsWith("@")) return notFound();
  const channel = await axios
    .get(`/users/${channelName}/channel-profile`)
    .then((res) => res.data.data as IChannelProfile)
    .catch((e) => redirect("/"));
  if (!channel) return redirect("/");
  return (
    <div className="pb-10 space-y-5 w-full h-full">
      <ChannelProfile channel={channel} />
      <ChannelDetails channel={channel} />
    </div>
  );
}

export default UserProfilePage;
