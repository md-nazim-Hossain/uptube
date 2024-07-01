"use client";

import Follower from "@/components/follower";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Videos from "@/components/videos";
import { youtubeVideos } from "@/data";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

type Props = {
  isMyChannel?: boolean;
};
function ChannelDetails({ isMyChannel = false }: Props) {
  const currentTab = useSearchParams().get("tab") || "stations";
  const [tab, setTab] = React.useState(currentTab);
  useEffect(() => {
    setTab(currentTab);
  }, [currentTab]);
  return (
    <Tabs value={tab} onValueChange={setTab}>
      <TabsList className="sticky z-20 top-14 bg-background h-max p-0 rounded-none border-b w-full flex justify-start">
        <div className="container">
          <TabsTrigger className="font-normal text-foreground" value="stations">
            Stations
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
                className="font-normal text-foreground"
                value="followers"
              >
                Followers
              </TabsTrigger>
              <TabsTrigger
                className="font-normal text-foreground"
                value="following"
              >
                Following
              </TabsTrigger>
            </>
          )}
        </div>
      </TabsList>
      <div className="container">
        <TabsContent value="stations">
          {/* <Videos videos={youtubeVideos} className="py-5" /> */}
        </TabsContent>
        <TabsContent value="shorts">
          <div>Shorts</div>
        </TabsContent>
        <TabsContent value="playlists">
          <div>Playlists</div>
        </TabsContent>
        {isMyChannel && (
          <>
            {" "}
            <TabsContent value="likes">
              {/* <Videos videos={youtubeVideos} className="py-5" /> */}
            </TabsContent>
            <TabsContent value="followers">
              <div className="grid grid-cols-4 gap-5 py-10">
                <Follower
                  fullName="Shadcn"
                  src="https://github.com/shadcn.png"
                  username="shadcn"
                />
              </div>
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
