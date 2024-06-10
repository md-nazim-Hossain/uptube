import React from "react";
import ChannelProfile from "../channel/_components/channel-profile";
import ChannelDetails from "../channel/_components/channel-details";

function MyChannelPage() {
  return (
    <div className="space-y-5 w-full h-full">
      <ChannelProfile isMyChannel />
      <ChannelDetails />
    </div>
  );
}

export default MyChannelPage;
