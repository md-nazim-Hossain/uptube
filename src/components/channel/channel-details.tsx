"use client";

import Follower from "@/components/follower";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IChannelProfile, IFollower } from "@/types";
import { useUserStore } from "@/zustand/useUserStore";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import Videos from "../videos";
import ChannelShorts from "./channel-shorts";
import ChannelPlaylists from "./channel-playlists";
import ChannelUserFavoriteVideos from "./channel-user-favorite-videos";
import EmptyState from "../empty-state";

type Props = {
  channel: IChannelProfile;
};
function ChannelDetails({ channel }: Props) {
  const currentTab = useSearchParams().get("tab") || "stations";
  const user = useUserStore((state) => state.user);
  const isMyChannel = user?._id === channel?._id;
  const [tab, setTab] = React.useState(currentTab);
  useEffect(() => {
    setTab(currentTab);
  }, [currentTab]);

  return (
    <Tabs value={tab} onValueChange={setTab}>
      <TabsList className="sticky z-20 top-14 bg-background h-max p-0 rounded-none border-b w-full flex justify-start">
        <div className="container">
          <TabsTrigger
            className="font-normal space-x-1 text-foreground"
            value="stations"
          >
            <span>Stations</span>{" "}
            <span className="text-destructive">{channel?.totalVideos}</span>
          </TabsTrigger>
          <TabsTrigger className="font-normal text-foreground" value="shorts">
            Shorts
          </TabsTrigger>
          <TabsTrigger
            className="font-normal text-foreground"
            value="playlists"
          >
            Playlists
          </TabsTrigger>
          {isMyChannel && (
            <>
              <TabsTrigger
                className="font-normal text-foreground"
                value="likes"
              >
                Likes
              </TabsTrigger>
              <TabsTrigger
                className="font-normal text-foreground space-x-1"
                value="followers"
              >
                <span>Followers</span>{" "}
                <span className="text-destructive">
                  {channel?.subscribersCount}
                </span>
              </TabsTrigger>
              <TabsTrigger
                className="font-normal text-foreground space-x-1"
                value="following"
              >
                <span>Followings</span>{" "}
                <span className="text-destructive">
                  {channel?.channelSubscribedToCount}
                </span>
              </TabsTrigger>
            </>
          )}
        </div>
      </TabsList>
      <div className="container">
        <TabsContent value="stations">
          <Videos isChannelProfile userId={channel?._id} />
        </TabsContent>
        <TabsContent value="shorts">
          <ChannelShorts userId={channel?._id} />
        </TabsContent>
        <TabsContent value="playlists">
          <ChannelPlaylists userId={channel?._id} />
        </TabsContent>
        {isMyChannel && (
          <>
            <TabsContent value="likes">
              <ChannelUserFavoriteVideos />
            </TabsContent>
            <TabsContent value="followers">
              {channel?.subscribersCount > 0 ? (
                <div className="grid grid-cols-4 gap-5 py-10">
                  {/* {subscribers?.map((subscriber: IFollower, index) => (
                    <Follower key={index} {...subscriber?.subscriber} />
                  ))} */}
                </div>
              ) : (
                <EmptyState text={"No followers found"} />
              )}
            </TabsContent>
            <TabsContent value="following">
              <div>Following</div>
            </TabsContent>
          </>
        )}
      </div>
    </Tabs>
  );
}

export default ChannelDetails;
