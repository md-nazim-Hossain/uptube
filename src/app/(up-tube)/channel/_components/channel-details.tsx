"use client";

import Follower from "@/components/follower";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Videos from "@/components/videos";
import { youtubeVideos } from "@/data";
import React from "react";

function ChannelDetails() {
  return (
    <Tabs defaultValue="stations">
      <TabsList className="sticky z-20 top-14 bg-background h-max p-0 rounded-none border-b w-full flex justify-start">
        <div className="cp-10">
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
          <TabsTrigger className="font-normal text-foreground" value="likes">
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
        </div>
      </TabsList>
      <div className="cp-10">
        <TabsContent value="stations">
          <Videos videos={youtubeVideos} className="py-5" />
        </TabsContent>
        <TabsContent value="shorts">
          <div>Shorts</div>
        </TabsContent>
        <TabsContent value="playlists">
          <div>Playlists</div>
        </TabsContent>
        <TabsContent value="likes">
          <Videos videos={youtubeVideos} className="py-5" />
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
      </div>
    </Tabs>
  );
}

export default ChannelDetails;
