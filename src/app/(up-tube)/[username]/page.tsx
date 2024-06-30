import React from "react";
import ChannelProfile from "../channel/_components/channel-profile";
import ChannelDetails from "../channel/_components/channel-details";
import { notFound, redirect } from "next/navigation";
import axios from "@/utils/axios";
import { IChannelProfile } from "@/types";
async function UserProfilePage({ params }: { params: { username: string } }) {
  const username = decodeURIComponent(params?.username);
  if (!username || !username.startsWith("@")) return notFound();
  const user = await axios
    .get(`/users/${username}/channel-profile`, {
      params: {
        username,
      },
    })
    .then((res) => res.data.data as IChannelProfile)
    .catch((e) => redirect("/"));
  if (!user) return redirect("/");
  return (
    <div className="pb-10 space-y-5 w-full h-full">
      <ChannelProfile channel={user} />
      <ChannelDetails />
    </div>
  );
}

export default UserProfilePage;
