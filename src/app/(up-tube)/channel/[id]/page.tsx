import React from "react";
import ChannelDetails from "../_components/channel-details";
import ChannelProfile from "../_components/channel-profile";

function MyChannelPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-5 w-full h-full">
      <ChannelProfile isMyChannel />
      <ChannelDetails />
    </div>
  );
}

export default MyChannelPage;
