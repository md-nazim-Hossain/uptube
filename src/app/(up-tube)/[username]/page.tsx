import React from "react";
import ChannelProfile from "../channel/_components/channel-profile";
import ChannelDetails from "../channel/_components/channel-details";
import { notFound } from "next/navigation";

function UserProfilePage({ params }: { params: { username: string } }) {
  const username = decodeURIComponent(params?.username);
  if (!username || !username.startsWith("@")) return notFound();
  return (
    <div className="pb-10 space-y-5 w-full h-full">
      <ChannelProfile />
      <ChannelDetails />
    </div>
  );
}

export default UserProfilePage;
