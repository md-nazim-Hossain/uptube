"use client";

import { IChannelProfile } from "@/types";
import { useUserStore } from "@/zustand/useUserStore";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import ChannelShorts from "./channel-shorts";
import ChannelPlaylists from "./channel-playlists";
import ChannelUserFavoriteVideos from "./channel-user-favorite-videos";
import ChannelFollowers from "./channel-followers";
import ChannelFollowings from "./channel-followings";
import Videos from "../videos/videos";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { viewsFormat } from "@/utils/video";

type Props = {
  channel: IChannelProfile;
};
function ChannelDetails({ channel }: Props) {
  const currentTab = useSearchParams().get("tab") || "stations";
  const user = useUserStore((state) => state.user);
  const isMyChannel = user?._id === channel?._id;
  const [activeTab, setActiveTab] = React.useState(currentTab);
  useEffect(() => {
    setActiveTab(currentTab);
  }, [currentTab]);

  const tabs = [
    { label: "Stations", value: "stations" },
    { label: "Shorts", value: "shorts" },
    { label: "Playlists", value: "playlists" },
    { label: "Likes", value: "likes" },
    { label: "Followers", value: "followers", text: channel.subscribersCount },
    {
      label: "Following",
      value: "following",
      text: channel.channelSubscribedToCount,
    },
  ];

  return (
    <div className="studio-container">
      <div className="border-b w-full sticky z-30 top-14 bg-background">
        <div className={"max-w-[100%] flex items-center overflow-x-auto"}>
          {tabs.map((tab, index) => {
            const isActive = activeTab === tab.value;
            return (
              <div
                role="button"
                onClick={() => setActiveTab(tab.value)}
                className={cn(
                  "capitalize pb-3 relative px-3",
                  isActive ? "text-primary" : "text-secondary",
                )}
                key={index}
              >
                <p className="font-normal text-foreground flex items-center gap-1">
                  <span>{tab.label}</span>
                  {tab?.text && (
                    <span className="text-destructive">
                      {viewsFormat(tab.text ?? 0)}
                    </span>
                  )}
                </p>
                {isActive ? (
                  <motion.div
                    className="absolute left-0 bg-primary bottom-0 w-full h-[3px]"
                    layoutId="contentTab"
                  />
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
      {activeTab === "stations" && (
        <Videos isChannelProfile userId={channel?._id} />
      )}
      {activeTab === "shorts" && <ChannelShorts userId={channel?._id} />}
      {activeTab === "playlists" && <ChannelPlaylists userId={channel?._id} />}
      {isMyChannel && (
        <>
          {activeTab === "likes" && <ChannelUserFavoriteVideos />}
          {activeTab === "followers" && <ChannelFollowers />}
          {activeTab === "following" && <ChannelFollowings />}
        </>
      )}
    </div>
  );
}

export default ChannelDetails;
