import ChannelProfile from "@/app/(up-tube)/channel/_components/channel-profile";
import React from "react";
import ChannelDetails from "../_components/channel-details";

function page() {
  return (
    <div className="py-10 space-y-5 w-full h-full">
      <ChannelProfile />
      <ChannelDetails />
    </div>
  );
}

export default page;
