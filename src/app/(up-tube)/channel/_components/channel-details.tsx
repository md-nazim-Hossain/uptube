"use client";

import Follower from "@/components/follower";
import SingleVideoCard from "@/components/single-video-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { youtubeVideos } from "@/data";
import { IYoutubeVideo } from "@/types";
import React from "react";

function ChannelDetails() {
  return (
    <Tabs>
      <TabsList className="bg-transparent h-max p-0 rounded-none border-b w-full flex justify-start">
        <div className="cp-5">
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
      <div className="cp-5">
        <TabsContent value="stations">
          <div className="py-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {youtubeVideos.map((url: IYoutubeVideo) => (
              <SingleVideoCard key={url.songName} {...url} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="shorts">
          <div>Shorts</div>
        </TabsContent>
        <TabsContent value="playlists">
          <div>Playlists</div>
        </TabsContent>
        <TabsContent value="likes">
          <div className="py-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {youtubeVideos.map((url: IYoutubeVideo) => (
              <SingleVideoCard key={url.songName} {...url} />
            ))}
          </div>
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
